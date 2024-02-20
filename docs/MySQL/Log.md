# Log

# General Query Log

查看 General Query Log 状态.

```sql
show variables like 'general_log%';
```

永久配置 General Query Log. (file: my.cnf)

```
[mysqld]
general_log=on
general_log_file=/var/lib/mysql/mysql.general.log
```

临时配置 General Query Log.

```sql
set global general_log = on;
set global general_log_file = '/var/lib/mysql/mysql.general.log';
```

存档 General Query Log.

```shell
mv mysql.general.log mysql.general.log.old
mysqladmin -uroot -p111 flush-logs
```

# Error Log

查看 Error Log 状态.

```sql
show variables like 'log_err%';
```

永久配置 Error Log. (file: my.cnf)

```
[mysqld]
log-error=/var/log/mysqld.log
```

存档 Error Log.

```shell
mv mysqld.log mysqld.log.old
install -omysql -gmysql -m0644 /dev/null /var/log/mysqld.log
mysqladmin -uroot -p111 flush-logs
```

# Bin Log

在 TRX 提交之前, 会记录 DDL 和 DML 到 Bin Log 中, 通过这些信息, 我们可以再现数据更新的全过程.

Bin Log 可以用于数据恢复, 如果 MySQL Server 挂掉了, 可以通过 Bin Log 查询到用户执行了哪些修改操作, 可以根据 Bin Log 来恢复数据.

Bin Log 可以用于主从复制, Log 具有延续性和时效性, 可以根据 Bin Log 同步 Master 和 Slave 之间的数据.

执行一条更新语句时, 会将数据写入内存, 再写入 Redo Log, 此时的状态为 Prepare, 然后写入 Bin Log, 再将状态修改为 Commit. 如果这两个阶段的数据不一致, 则会进行回滚, 保证数据一致性, 这就是两阶段提交.

查看 Bin Log 状态.

```sql
show variables like '%log_bin%';

show binary logs;
```

配置 Bin Log. (file: my.cnf)

```
[mysqld]
log-bin=mysql-bin
binlog_expire_logs_seconds=600
max_binlog_size=100M
```

Bin Log 是一对二进制文件, 所以无法直接查看, 这里通过 `mysqlbinlog` 查看 Bin Log

```shell
mysqlbinlog '/var/lib/mysql/mysql-bin.000004'
```

查看 Bin Log Events.

```sql
show binlog events \G

show binlog events in 'msyql-bin.000004';

-- 从 236 行开始向后查 5 条
show binlog events in 'msyql-bin.000004' from 236 limit 5;
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241732538.png)

# Data Recovery

先生成一个新的 Bin Log, 在这个新的 Bin Log 中执行恢复操作.

```sql
flush logs
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241732539.png)

查看之前的 Bin Log Events.

```sql
show binlog events in 'mysql-bin.000007';
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241732540.png)

找到想要恢复的行, 进行恢复.

```shell
/usr/bin/mysqlbinlog --start-position=318 --stop-position=826 --database=db /var/lib/mysql/mysql-bin.000007 | /usr/bin/mysql -uroot -p111 -v db
```

# Delete Bin Log

删除 `mysql-bin.000003` 之前的全部日志.

```sql
purge master logs to 'mysql-bin.000003';
```

删除 2023.12.23 之前的全部日志.

```sql
purge master logs before '20231223';
```

删除所有的日志 !!!

```sql
reset master;
```

# Bin Log Format

Statement Format, 将修改的操作 SQL 记录到 Bin Log 中 (eg: `insert ... select 1, 2, 3` 是记录的 `insert ... select 1, 2, 3`). 记录的内容很短, 占用小, 性能差, 执行时, 还需要进行查询等操作, 会添加更多的 Lock. 执行一些 `UUID()` 等函数时, 会导致同步结果不一致.

Row Format, 将修改的结果 SQL 记录到 Bin Log 中 (eg: `insert ... select 1, 2, 3` 是记录的 `insert 1`, `insert 2`, `insert 3`). 记录的内容多, 占用大, 性能强, 执行时, 直接插入即可, 不需要进行额外的操作.

Mixed Format, 根据操作自动选择 Statement 或 Row, 一般的修改会选择 Statement, 如果遇到一些函数, Statement 无法保证一致性, 就会选择 Row.

查看 Bin Log Format.

```sql
show variables like 'binlog_format';
```
