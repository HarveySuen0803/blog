# Storage Engine

Storage Engine 就是 Table 的类型, 处理 Table 的方式.

查看 Storage Engine.

```sql
show engines;

show variables like '%storage_engine%';
```

设置默认 Storage Engine.

```sql
set DEFAULT_STORAGE_ENGINE=MyISAM;
```

设置默认 Storage Engine (file: my.cnf).

```
default-storage_engine=MyISAM
```

创建表时, 指定 Storage Engine.

```sql
create table stu (
	`id` int,
	`name` varchar(32)
) engine myisam;

create table stu (
	`id` int,
	`name` varchar(32)
) engine memory;
```

# InnoDB

InnoDB (def) 支持 Transaction, 需要保证 ACID 就首选 InnoDB.

InnoDB 支持 Row Lock, 适合 Multi Thread.

InnoDB 的 Data 和 Index 都存储在 ibd File 中, 所有首次加载时, 耗时久一些, 占用资源也多一些.

InnoDB 相比 MyISAM 处理 Write 的效率差一些, 还需要占用更多的 Disk 来存储 Data 和 Index.

MySQL 8.0 前, ibd File 存储 Table Data 和 Table Index, frm File 存储 Table Frame.

```
+ db01
    + emp.ibd
    + emp.frm
```

MySQL 8.0 后, ibd File 存储 Table Data, Table Index, Table Frame.

```
+ db01
    + emp.ibd
```

通过 ibd2sdi 处理 ibd File.

```shell
ibd2sdi --dump-file=emp.ibd emp.txt
```

# MyISAM

MyISAM 不支持 Transaction, 不支持 Foreign Key, 访问速度快, 但是无法保证 ACID, 即崩溃后无法恢复数据.

MyISAM 不支持 Row Lock, 支持 Table Lock, 不适合 Multi Thread.

MySQL 8.0 前, MYD 存储 Table Data, MYI 存储 Table Index, frm 存储 Table Structure

```
+ db01
    + emp.frm
    + emp.MYD
    + emp.MYI
```

MySQL 8.0 后, sdi 存储 Table Structure

```
+ db01
    + emp.sdi
    + emp.MYD
    + emp.MYI
```

# Memory

Memory 存储在内存中, 效率非常强, 支持 Hash 索引, 一个 Memory 表对应一个磁盘, 一旦服务关闭, 数据全部丢失, 表结构还在.