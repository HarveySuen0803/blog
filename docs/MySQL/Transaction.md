# Explicit Transaction

```sql
start transaction;
insert into stu values(1, 'tom');
insert into stu values(2, 'jerry');
insert into stu values(3, 'king');
commit;

start transaction;
insert into stu values(1, 'tom');
savepoint a;
insert into stu values(2, 'jerry');
savepoint b;
insert into stu values(3, 'king');
rollback to b; -- rollback to b point

start transaction;
insert into stu values(1, 'tom');
savepoint a;
insert into stu values(2, 'jerry');
savepoint b;
insert into stu values(3, 'king');
rollback; -- rollback to start point
```

# Implicit Transaction

执行 `alter`, `create`, `drop`, `grant`, `revoke`, `rename`, `set`, `password`, `lock`, `unlock`, `load data`, `start slave`, `stop salve`, `restart slave`, `change master to` 时, 会隐式提交当前语句和之前的语句.

```sql
start transaction;
insert into stu values(1, 'tom');
insert into stu values(2, 'jerry');
insert into stu values(3, 'king');
alter table stu add age int; -- auto commit
```

# Transaction ACID

Atomicity 是指一个 TRX 是一个不可分割的工作单元, 要么全成功提交, 要么全失败回滚, 成王败寇, 没有妥协之说.

Consistency 是指数据需要从一个合法性状态变化到另一个合法性状态, 这个合法是业务层面的合法 (eg: A 扣钱, 扣成了负数, 则不符合业务层面的要求, 即不合法). 

Isolation 是指一个 TRX 内部使用到的数据对其他 TRX 隔离, 不会受到其他 TRX 的影响.

Durability 是指一个 TRX 一旦被提交, 它对数据库中数据的改变就是永久性的. Durability 是通过 TRX Log 保障的, 先将数据库的变化信息记录到 Redo Log 中, 再对数据进行修改, 这样做, 即使数据库崩掉了, 也可以根据 Redo Log 进行恢复.

# Transaction Status

Active 是指 TRX 正在执行.

Partially Committed 是指 TRX 已经执行了最后一个提交, 操作的都是内存中的数据, 还没有进行刷盘.

Failed 是指 TRX 在 Active 和 Partially Committed 阶段遇到了某些错误, 而无法继续执行.

Aborted 是指 TRX 在 Failed 阶段后, 进行回滚, 恢复了到 TRX 最初的状态.

Committed 是指 TRX 在 Partially Committed 后, 成功进行了刷盘.

# Concurrency Issue

这里 B 修改了 A 未提交的数据, 发生了 Dirty Write.

```txt
A: update tbl set col = 'a' where id = 1;
B: update tbl set col = 'A' where id = 1;
A: commit
```

这里 B 读取到了 A 未提交的数据, 发生了 Dirty Read.

```txt
A: update tbl set col = 'a' where id = 1;
B: select * from tbl where id = 1; -- 'a'
```

这里 A 先读取到了 'a', 后读到了 B 提交后的数据 'A', 发生了 Non-Repeatable Read, 这其实也是一种 Dirty Read.

```txt
A: select * from tbl where id = 1; -- 'a'
B: update tbl set col = 'A' where id = 1;
A: select * from tbl where id = 1; -- 'A'
```

这里 A 一开始没有读到 'a', 后来读取到了 'a', 发生了 Phantom Read.

```txt
A: select * from tbl where id > 1 and id < 5; -- null
B: update tbl set col = 'a' where id = 2;
A: select * from tbl where id > 1 and id < 5; -- 'a'
```

# Isolation Level

从严重程度上来讲, Dirty Write > Dirty Read > Non-Repeatable Read > Phantom Read. Dirty Write 是一定不能接受的, 而 Non-Repeatable Read 和 Phantom Read 在一定场景下, 是可以接受的.

MySQL 提供的 Isolation Level 包含 `read-uncommitted`, `read-committed`, `repeatable-read` 和 `serializable` 用于解决一定的并发问题.

- `read-uncommitted` 可以解决 Dirty Write.
- `read-committed` 可以解决 Dirty Write, Dirty Read.
- `repeatable-read` 可以解决 Dirty Write, Dirty Read, Non-Repeatable Read. MySQL 的 `repeatable-read` 可以解决一定的 Phantom Read, 并且提供了一系列的 Lock 来解决 Phantom Read.
- `serializable` 可以解决 Dirty Write, Dirty Read, Non-Repeatable Read, Phantom Read.

查看当前的 Isolation Level.

```sql
select @@transaction_isolation;
```

设置 Session 的 Isolation Level 会在当前 Session 中立即生效. 设置 Global 的 Isolation Level 会在下一次 Session 中生效.

```sql
set session transaction_isolation = 'read-uncommitted';
```

# Redo Log

Redo Log 和 Undo Log 都是一种恢复操作, 他们回滚数据是逻辑层面的回滚, 而不是物理层面的回滚. 插入一条记录后, 就会记录一条对应的删除操作. 开辟了一个数据页后回滚, 是无法回滚到开辟数据页之前的, 只是通过操作相反的命令达到数据上的统一. 

```txt
start transaction;

select col; -- ''

-- Record col = '' to Undo Log
update col = 'a';
-- Record col = 'a' to Redo Log

-- Record col = 'a' to Undo Log
update col = 'b';
-- Record col = 'b' to Redo Log

-- Flush Disk
commit;
```

InnoDB 采用 WAL (Write-Ahead Logging), 先写日志, 再写硬盘, 只有日志写成功了, 才算事务提交成功. 发生宕机且数据未刷到磁盘时, 就可以根据 Redo Log 恢复数据, 保证了 ACID 的 D.

如果不采用 Redo Log, 为了保证数据安全性, 每次执行 SQL, 就需要进行 Random IO, 将硬盘的数据读取到内存中, 修改完再进行刷盘, 不仅效率低, 丢失数据的风险更高, 而且为了修改一点数据, 就将 Page 来回折腾, 非常不划算.

Redo Log 可以保障一定的安全性, 所以就没有必要实时进行内存到硬盘的刷盘操作, 可以稍微间隔长一点 (eg: 1s 刷盘一次).

Redo Log 占用非常小, 而且是通过 Sequential IO 存储到硬盘上的, 可以说成本非常低.

Redo Log 是在 Storage Engine 层面产生的, Bin Log 是 DB 层面产生的, 两者有着很大的区别 (eg: 插入 100 的过程中, Redo Log 是不断更新的, 等全部加载完, 再一次性写入到 Bin Log 中).

MySQL Server 启动后, 会立即申请一块 Redo Log Buffer, 用来存储 Redo Log, 这块空间被分成若干个连续的 Redo Log Block, 1 个 Block 占 512B.

执行一个修改操作后, 会生成一条 Redo Log 写入到 Redo Log Buffer 中, 记录的是修改后的数值, 当提交后, 就会将 Redo Log Buffer 中的数据追加写入到 OS 的 Page Cache 中, 再进行刷盘, 追加写入到硬盘的 Log File 中.

通过 `innodb_log_buffer_size` 设置 Redo Log Buffer 的大小 (def: 16M).

通过 `innodb_flush_log_at_trx_commit` 设置不同的刷新策略 (def: 1).

- `0`: 提交后, 不会进行任何操作, 等待 Server 自动进行一秒一次自动同步. 将数据存储在 Buffer 中, 依靠自动同步, 风险最高, 但是性能最强.
- `1`: 提交后, 将数据写入到 Page Cache, 再从 Page Cache 写入到硬盘. 直接写会到了硬盘中, 非常安全, 但是性能最差, 默认就是如此.
- `2`: 提交后, 将数据写入到 Page Cache. 将数据写入到 OS 到 Page Cache 中, 一般 OS 宕机的几率是非常低的, 还是蛮安全的, 性能也比较好.

# Undo Log

Undo Log 可用于回滚数据, 可用于 MVCC. 

InnoDB 默认有 2 个提供给 Undo Log 的 Table Space, 共包含 128 个 Rollback Segment, 每个 Rollback Segment 中包含 1024 个 Undo Log Segment.

1 个 Rollback Segment 可能同时服务于 n 个 TRX, 开启 1 个 TRX 后, 就会去制定 1 个 Rollback Segment, 如果 TRX 中的数据被修改了, 原始的数据就会记录到 Rollback Segment 中.

通过 `innodb_undo_directory` 设置 Rollback Segment 的存储位置 (def: ./).

通过 `innodb_undo_tablespaces` 设置 Rollback Segment 的文件数量 (def: 2).

通过 `innodb_rollback_segments` 设置 Rollback Segment 的数量 (def: 128).

InnoDB 的 Record Header 还会有一些隐藏列.

- `DB_TRX_ID`: 每个 TRX 都会自动分配一个 TRX ID.
- `DB_ROLL_PTR`: 指向 Undo Log 的 Pointer.

执行 `insert` 后, 会产生一个 Undo Log, 提交后, 立即删除.

执行 `delete` 和 `update` 后, 会产生一个 Undo Log, 提交后, 放入 Linked List 中, 提供 MVCC 使用, 等待 Purge Thread 删除. Purge Thread 在删除数据时, 只是进行逻辑删除, 将 deletemark 标记为 1, 后续采用覆盖的方式插入数据实现删除.

Undo Log 的存储是离散的, 要回收非常麻烦, 所以 TRX 提交后, 不会立即删除 Undo Log, 而会放入到一个 Linked List 中, 然后判断 Undo Log 所属 Page 的使用空间是否小于 3/4, 如果小于 3/4, 那么它就不会被回收, 其他 TRX 的 Undo Log 会继续使用当前 Page.

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241733175.png)

更新 Priamry Key 时, 会将 Old Record 的 deletemark 标识为 1, 再新建一个 New Record, 递增 Undo Log 的 no, 保证回滚时向前可以找到 Undo log.

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241733176.png)

# MVCC

MVCC 可以在不加锁的情况下, 采用非堵塞的方式解决读写冲突.

MVCC 主要有 Undo Log 和 Page View 实现的, 通过 Undo Log 构成一个 Version Linked List, 通过 Page View 选择一个 Version 供访问.

MVCC 在 RC 和 RR 中生效, 不在 RU 中生效, 因为 RU 可以读到未提交的事务, 所以直接读取最新版本即可.

当 TRX 来读取数据时, 会生成一个 Page View, 该 Page View 包含了几个属性.

- `creator_trx_id` 记录了 Cur TRX 的 ID, TRX ID 是会自增的, 所以后面的 TRX ID 一定要大于前面的 TRX ID, 这里 `creator_trx_id = 50`.
- `trx_ids` 记录了所有正在活跃的 TRX, 这里 `trx_ids = 20, 30`.
- `min_trx_id` 记录了 `trx_ids` 中最小的 `trx_id`, 这里 `min_trx_id = 20`.
- `max_trx_id` 记录了 `trx_ids` 中最大的 `trx_Id` + 1, 这里 `max_trx_Id = 31`.

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241733177.png)

依次遍历 Version Linked List, 根据下面这四步查找规则, 找到一个合适的 Version.

- `trx_id == creator_trx_id`, 表示当前的 Version 就是由 Cur TRX 创建的, 可以访问.
- `trx_id < min_trx_id`, 表示当前 Version 已经提交, 可以访问.
- `trx_id > max_trx_id`, 表示当前 Version 是在当前 Page View 生成之后才开启的, 不能访问, 直接退出, 不需要进行后续的遍历判断了.
- `trx_id not in trx_ids`, 表示当前 Version 已经提交了, 可以访问.

InnoDB 的 RC, 每次执行 `select`, 就会创建一个 Page View, 可以解决 Dirty Read.

InnoDB 的 RR, 只有第一次执行 `select`, 才会创建 Page View, 后续执行插入后, 不影响第一次查询的 Page View, 所以不仅可以解决 Dirty Rad, 还可以解决 Non-Repatable 和 Phantom Read.
