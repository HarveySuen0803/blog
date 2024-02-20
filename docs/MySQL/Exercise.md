# copy table

```sql
create table `emp_copy` like `emp`;

insert into `emp_copy` (select * from `emp`);
```

# table deduplication

```sql
create table `emp_copy` like `emp`;

insert into `emp_copy` (select distinct * from `emp`);

delete from `emp`;

insert into `emp` (select * from `emp_copy`);
```

# query single table

```sql
-- 查询每种岗位的雇员总数, 平均工资
select `job`, count(*), avg(`sal`) from `emp` group by `job`;

-- 查询雇员总数, 以及获得补助的雇员数
select count(*), count(`comm`) from `emp`;

-- 统计没有获得补助的雇员数
select count(*), count(if(`comm` is null, 1, null)) from `emp`;

-- 统计管理者的总人数
select count(distinct `mgr`) from emp;

-- 统计 job 为 'MANAGER' 的人数
select count(if(`job` = "MANAGER", 1, null)) from `emp`;

-- 查询所有员工的年收入
select `ename`, 12 * (`sal` + ifnull(`comm`, 0)) from `emp`;

-- 查询入职时间在 1981-2-1 到 1981-5-1 内的员工
select * from `emp` where `hiredate` between '1981-2-1' and '1981-5-1';

-- 统计各个部门的平均工资, 并且是大于 1000 的, 并且按照平均工资从高到低排序, 取出前两行记录
select `deptno`, avg(`sal`)
from `emp`
group by `deptno`
having avg(`sal`) > 1000
order by avg(`sal`) desc
limit 0, 2;

-- 查询当月最后三天内入职的员工
select * from `emp` where `hiredate` between last_day(`hiredate`) - 3 and last_day(`hiredate`);

-- 查询 40 年前入职的员工
select * from `emp` where year(`hiredate`) < year(now()) - 40;

-- 首字母大写
select concat(ucase(substr(`ename`, 1, 1)), lcase(substr(`ename`, 2))) from `emp`;

-- 统计入职时长
select `ename`,
       datediff(now(), `hiredate`)                  as `total_day`,
       format(datediff(now(), `hiredate`) / 30, 1)  as `total_month`,
       format(datediff(now(), `hiredate`) / 365, 1) as `total_year`
from emp;
```

# query sub table

```sql
-- 查询至少有一名员工的部门的信息
select dept.deptno, dept.dname, temp.count
from (
    select deptno, count(*) as count_emp
    from emp
    group by deptno
    having count_emp > 0
) temp
inner join dept on temp.deptno = dept.deptno;

-- 查询工资比 SMITH 高的员工信息
select *
from emp
where sal > (
    select sal
    from emp
    where ename = 'SMITH'
);

-- 查询薪资高于部门平均薪资的员工信息
select *
from (
    select deptno, avg(sal) as avg_sal
    from emp
    group by deptno
) temp
inner join emp on emp.deptno = temp.deptno
where sal > temp.avg_sal;

-- 查询每个部门工资最高的人的详细信息
select *
from (
    select deptno, max(sal) max_sal
    from emp
    group by deptno
) temp
inner join emp on emp.deptno = temp.deptno
where emp.sal = temp.max_sal;

-- 查询部门信息, 并且显示员工人数
select *
from dept
left join (
    select deptno, count(*)
    from emp
    group by deptno
) temp on dept.deptno = temp.deptno;

-- 查询职务和 "SCOTT" 相同的其他员工
select *
from emp
where job = (
    select job
    from emp
    where ename = 'SCOTT'
) and ename != 'SCOTT';

-- 查询薪资高于部门 30 的所有员工的员工的信息
select *
from emp
where sal > all(
    select sal
    from emp
    where deptno = 30
);
```

# query multi table

```sql
-- 查询入职日期晚于上级的员工信息
select *
from emp e1
left join emp e2 on e1.mgr = e2.empno
where e1.hiredate < e2.hiredate;

-- 查询部门信息, 员工信息, 以及没有员工的部门信息
select *
from dept
left join emp on dept.deptno = emp.deptno;

-- 查询所有职务为 "CLERK" 的员工信息和部门信息
select emp.*, dept.*
from emp
left join dept on emp.deptno = dept.deptno
where emp.job = "CLERK";
```

# Stored Procedure

```sql
create procedure page_emp(in page_no int, in page_size int)
begin
    declare param1 int default 1;
    declare param2 int default 5;

    set param1 = (page_no - 1) * page_size;
    set param2 = page_size;
    
    select * from emp limit param1, param2;
end;

call page_emp(3, 10)
```

```sql
-- 查询员工和上级的薪资差距
create procedure diff_sal(in emp_id int, out result double)
begin
    declare emp_sal double default 0.0;
    declare mgr_sal double default 0.0;
    declare mgr_id int default 0;

    select emp.mgr_id into mgr_id from emp where emp.id = emp_id;

    select emp.sal into emp_sal from emp where emp.id = emp_id;

    select emp.sal into mgr_sal from emp where emp.id = mgr_id;

    select mgr_sal - emp_sal into result;
end;

call diff_sal(7369, @result);
```

```sql
-- 模拟数据
create procedure stu_fake_data(in line int)
begin
    declare i int default 0;

    while i < line do
        insert into stu (name, age) values (concat("name_", i), round(rand() * 100));
        set i = i + 1;
    end while;
end;

call stu_fake_data(10);
```

```sql
-- 根据入职年份的不同, 按照比率涨工资
create procedure update_sal()
begin
    declare emp_id int;
    declare emp_hiredate date;
    declare emp_count int default 0;
    declare emp_sal_rate int;
    declare emp_cursor cursor for select id, hiredate from emp;
    select count(*) into emp_count from emp;

    open emp_cursor;

    while emp_count > 0 do
        fetch emp_cursor into emp_id, emp_hiredate;

        select emp_id, emp_hiredate;

        if (year(emp_hiredate) > 1985) then
            set emp_sal_rate = 1.2;
        elseif (year(emp_hiredate > 1980)) then
            set emp_sal_rate = 1.5;
        else
            set emp_sal_rate = 2;
        end if;

        update emp set sal = sal * emp_sal_rate where id = emp_id;

        set emp_count = emp_count - 1;
    end while;

    close emp_cursor;
end;

call update_sal;
```