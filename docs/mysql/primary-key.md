## 该如何选择主键

选择数据库主键是设计数据库时的一项重要决策。主键不仅要保证数据的唯一性，还要考虑性能、存储效率、分布式系统的支持等因素。以下是选择主键时需要考虑的一些关键点和常见的主键生成策略。

选择主键时的关键考虑因素：

- 唯一性：主键必须保证全局唯一性，不能有重复值。
- 稳定性：主键值一旦生成，应尽量不发生变化。
- 性能：主键的选择应有助于提高插入、更新和查询操作的性能。尽量选择顺序递增的主键，以减少聚簇索引的分裂和重组。
- 存储效率：主键应尽量短小，以节省存储空间和提高索引效率。
- 分布式系统支持：在分布式系统中，主键应能保证全局唯一性，并能在多个节点上独立生成。

常见的主键生成策略：

- 自增 ID
- UUID
- 自增 ID

## 自增 ID

### 自增 ID 的优点

- 简单易用：自增 ID 是最简单的主键生成策略，易于理解和实现。
- 顺序性：自增 ID 是顺序递增的，有利于聚簇索引的维护和查询性能。

### 自增 ID 的缺点

- 分布式问题：在分布式系统中，不同的数据库分布在不同的机子上，就需要保证主键全局唯一，而 自增 ID 难以保证。
- 数据迁移问题：在数据迁移或合并时，可能会出现 ID 冲突。
- 性能瓶颈：在高并发环境下，自增 ID 可能成为性能瓶颈，因为需要锁定表或行来生成下一个 ID。
- 用户数据暴露风险：自增 ID 是连续的，这意味着通过观察某个记录的 ID，攻击者可以推测出系统中有多少记录。例如，如果用户注册时获得的用户 ID 是 1001，那么攻击者可以推测系统中可能已经有 1000 个用户。
- 用户行为跟踪风险：如果 ID 公开暴露（例如在 URL 中），攻击者可以通过猜测其他 ID 来访问其他用户的数据。例如，访问 /user/1001 后，攻击者可以尝试访问 /user/1002、/user/1003 等，来获取其他用户的信息。
- 批量删除或更新风险：攻击者可以利用连续的 ID 执行批量删除或更新操作。例如，攻击者可以构造一个 SQL 语句来删除一段连续 ID 的记录，从而造成数据破坏。

## UUID

### UUID 的优点

- 全局唯一性：UUID 的生成算法保证了每个生成的 UUID 在空间和时间上的唯一性，非常适合分布式系统。
- 无中心化生成：UUID 可以在任何节点独立生成，不需要中心化服务或协调机制。
- 标准化：UUID 标准（RFC 4122）被广泛接受和使用，许多编程语言和库都提供了生成 UUID 的功能。

### UUID 的缺点

- 长度问题：UUID 通常为 128 位（16 字节），以 32 个字符的十六进制字符串表示。这会占用更多的存储空间和带宽。
- 无序性：UUID 是无序的，插入数据库时会导致聚簇索引频繁分裂，影响性能。
- 可读性差：UUID 不易读，不便于调试和日志记录。

### Mysql8 改进 UUID

MySQL8 引入了 `UUID_TO_BIN()` 和 `BIN_TO_UUID()` 函数，以及优化的 UUID 存储格式，使得 UUID 的使用更加高效。

- `UUID_TO_BIN(uuid, swap_flag)`：将 UUID 字符串转换为二进制格式。如果 `swap_flag` 为 1，则对 UUID 的时间戳部分进行字节交换，以便按时间顺序存储。
- `BIN_TO_UUID(binary, swap_flag)`：将二进制格式的 UUID 转换回字符串格式。如果 `swap_flag` 为 1，则对 UUID 的时间戳部分进行字节交换，以便按时间顺序解析。

```sql
select uuid_to_bin(uuid());
```

```console
+----------------------------------------+
| uuid_to_bin(@uuid)                     |
+----------------------------------------+
| 0x4DC731028E6611EEBD06A92FED1AB953     |
+----------------------------------------+
```

通过使用 `UUID_TO_BIN()` 函数并启用 `swap_flag`，可以将 UUID 的时间戳部分放在前面，从而使得 UUID 按时间顺序存储。这种格式可以提高插入和查询性能。

```sql
select uuid_to_bin(uuid(), true);
```

```console
+----------------------------------------------------+
| uuid_to_bin(@uuid, true)                           |
+----------------------------------------------------+
| 0x11EE8E664DC73102BD06A92FED1AB953                 |
+----------------------------------------------------+
```

## 雪花 ID

雪花 ID（Snowflake ID）是 Twitter 开源的分布式 ID 生成算法，生成的 ID 是一个 64 位的长整型数字，通常包含时间戳、机器 ID 和序列号，可以保证趋势递增。

### 雪花 ID 的结构

一个典型的雪花 ID 由以下部分组成：

- 1 位：符号位，始终为 0。
- 41 位：时间戳，表示自某个时间点（通常是纪元时间）以来的毫秒数。
- 10 位：机器 ID，表示生成 ID 的机器或节点。
- 12 位：序列号，在同一毫秒内生成的 ID 序列号。

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202408021306140.png)

### 雪花 ID 的优点

- 全局唯一性：雪花 ID 保证全局唯一性，适合分布式系统。
- 有序性：雪花 ID 基于时间戳生成，具有一定的顺序性，有利于聚簇索引的维护。
- 高性能：雪花 ID 的生成性能高，可以满足高并发环境下的需求。

### 雪花 ID 的缺点

- 依赖时钟：雪花 ID 依赖系统时钟，如果时钟回拨（时间倒退），可能会导致 ID 冲突。
- 实现复杂：雪花 ID 的实现比自增 ID 和 UUID 复杂，需要额外的配置和维护。
- 分布式协调：在跨数据中心的分布式系统中，需要协调机器 ID，确保唯一性。

### 时钟回拨问题

#### 什么时钟回拨

时钟回拨（Clock Skew）是指系统时钟向后调整的现象，导致当前时间变得比之前记录的时间要早。时间回拨可能由多种原因引起，这些原因可以分为硬件问题、软件问题和外部因素。

#### 时钟回拨导致 ID 重复

时钟回拨问题发生在系统时间向后调整时。由于雪花 ID 依赖于时间戳，时钟回拨会导致时间戳变小，从而可能生成重复的 ID。

假设我们有一个雪花 ID 生成器，当前时间戳为 1620000000000 毫秒，并且机器 ID 为 1，在正常情况下，接下来的 5 毫秒内，生成了 5 个 ID 为 1620000000001-1-0, 1620000000002-1-0, 1620000000003-1-0, 1620000000004-1-0, 1620000000005-1-0。如果在 1620000000005 毫秒时，系统时钟突然回拨到 1620000000002 毫秒，那么在 1620000000002 毫秒时生成的 ID 可能会与之前生成的 ID 冲突，例如重复生成 1620000000002-1-0。

#### 该如何解决时钟回拨问题

常见的解决方案：

- 拒绝策略：当检测到时钟回拨时，拒绝生成新的 ID 并抛出异常。这种方法简单但会导致服务不可用
- 等待策略：检测到时钟回拨时，等待直到系统时间恢复到回拨前的时间。这种方法可以避免冲突，但会导致延迟。
- NTP 同步时钟：使用 NTP（Network Time Protocol）同步系统时钟，尽量减少时钟回拨的发生。

如果一个服务部署 128 台机器就够用的话，可以从机器码中拿出来 3 表示回拨次数，这样就在同一毫秒内，在同一台机器上进行 8 次时钟回拨的尝试，以避免冲突。

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202411181328406.png)

### 机器 ID 冲突问题

在分布式环境中，不同节点可能生成相同的机器 ID，导致 ID 冲突。

可以通过配置文件、Zookeeper 等方式分配唯一的机器 ID。

### 顺序性问题

虽然雪花 ID 基于时间戳生成，但在高并发环境下，生成的 ID 可能不完全有序。

可以在 ID 中增加更多的时间戳位，或使用数据库的自增列作为辅助索引。

