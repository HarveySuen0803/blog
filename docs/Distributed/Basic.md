# CAP

CAP: Consistency, Availability, Partition 同时只能满足两个, 结点之间形成分区后, 要么拒绝请求, 保证 Consistency, 放弃 Availability, 要么依旧提供服务, 保证 Availability, 放弃 Consistency

下面的 node_1, node_2, node_3 发生分区，无法同步数据给 node_3，并且 node_3 的数据版本落后了，如果要保证 AP 就需要 node_3 依旧对外提供落后版本的数据。

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202407281408190.png)

下面的 node_1, node_2, node_3 发生分区，无法同步数据给 node_3，并且 node_3 的数据版本落后了，如果要保证 CP 就需要 node_3 对外相应 Error。

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202407281411686.png)

# BASE

BASE: 对 CAP 的一种解决方案, 结点之间形成分区后, 允许 Partial Availability, 要求 Core Availability, 允许 Temporary Incosistency, 要求 Eventual Consistency

- AP Mode: Sub Transaction 分别执行 Operation 和 Commit, 允许 Temporary Incosistency, 后续采用 Remedy, 保证 Eventual Consistency (eg: Redis)
- CP mode: Sub Transaction 分别执行 Operation, 相互等待, 放弃 Partial Availability, 保证 Core Availability, 共同执行 Commit (eg: ElasticSearch)

# Two Phase Commit

Two Phase Commit (2PC) 是一种原子提交协议, 是 MySQL 对分布式事务的 XA Mode 的实现, 用于协调参与分布式原子事务的所有进程, 决定提交或回滚, 该协议在许多临时系统失败的情况下依然能实现其目标, 因此得到了广泛的使用. 然而, 两阶段提交协议并不能抵御所有可能的失败配置, 在极少数情况下, 需要人工干预来纠正结果, 为了从失败中恢复 (大部分情况下是自动的), 协议的参与者使用日志记录协议的状态

Two Phase Commit 由两个阶段组成, 如果这两个阶段的数据不一致, 则会进行回滚, 保证数据一致性

- Prepare Phase: TC 通知 RM 去执行修改操作, RM 先记录 Undo Log, 接着执行修改操作, 再记录 Redo Log, RM 通知 TC 是否执行完毕
- Commit Phase: TC 根据 RM 的响应结果进行处理, 如果都是 Ready, 则 TC 通知 RM 进行 Commit, 如果有 Fail, 则 TC 通知 RM 进行 Rollback

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403091222615.png)

Two Phase Commit 缺点

- 同步阻塞问题: 在二阶段提交协议中, 所有参与者在等待协调者的决定阶段都处于阻塞状态, 无法进行其它操作
- 单点故障: 如果在二阶段提交过程中, 协调者出现故障, 会导致所有参与者一直等待, 不能进行其它操作
- 数据不一致: 如果 RM 接收到 Prepare 请求后, 未发送 ACK 确认就宕机, 而在此之后其它 RM 都发送了 ACK 确认, 则此时 TC 将发起 Commit 请求, 导致数据状态不一致

# Three Phase Commit

Three Phase Commit (3PC) 对 Two Phase Commit 进行了优化, 引入了 Timeout 和 CanCommit Phase, 以避免阻塞和单点故障问题

- CanCommit Phase: TC 向所有 RM 发送 CanCommit 请求询问是否可以提交事务, RM 返回 Yes / No
- PreCommit Phase: 如果所有 RM 都返回 Yes, TC 向 RM 发送 PreCommit 请求, 接收到请求的 RM 表示接受 TC 的决定, 并回复 ACK
- doCommit Phase: TC 收到 RM 的 ACK 后, 向所有 RM 发送 doCommit 请求, RM 接受到请求后进行真正的事务提交并回复 ACK

Three Phase Commit 的任一阶段, 只要有 RM 回复 No 或者超时未回复, TC 都会向所有 RM 发送 Abort 请求, 所有 RM 在执行完事务的回滚操作后回复 ACK

Three Phase Commit 中的 TC 出现单点故障, 无法通知 RM 进行提交, 则 RM 会在等待一段时间后自动提交事务, 但是这也会导致一些问题. 如果某一个 RM 出现异常, 返回了 No, 刚好此时 TC 单点故障, 则会导致其他 RM 超时后自动提交, 造成不一致

Three Phase Commit 虽然解决了 Two Phase 的一些问题, 但是增加了一次网络往返, 而且在处理网络分区和多数故障的情况下, Three Phase Commit 也无法保证一致性, 当前实际使用中更常见的是使用具有超时和故障恢复机制的 Two Phase Commit (eg: Paxos, Raft)

# Quorum

Quorum (法定人数机制) 是分布式系统中的重要共识技术, 被设计用来提高分布式系统的可用性和容错能力, 尤其在面对节点故障或网络问题时

Quorum 的核心思想是一个请求在一个多节点分布式系统中被认为有效, 并在多数节点 (法定数量) 上一致同意后才会被执行, 所以在一个包含 N 个节点的系统中, 至少需要 N / 2 + 1 个节点同意, 这个请求才会被看做是已经达成共识

Quorum 中的节点包括 R (Read) 和 W (Write), 只要 R + W > N 就可以保证系统的一致性, 通常设置 R = N / 2 + 1, W = N / 2 + 1 (eg: N = 5, R = 3, W = 3)

- C1 写入数据 X, 会在 3 个节点上写入数据 (W)
- C2 读取数据 X, 会从 3 个节点上读取数据 (R), 所以总能保证至少读取到一条最新的数据, 再通过 Version Id 去区分哪一条是最新数据

Quorum 优点

- 容错能力: 即使系统中一部分节点发生故障或无法达成共识, 只要有超过半数的节点可以正常运行并且能够彼此通信, 系统就能够继续提供服务, 这使得系统能够在网络分区或节点宕机时保持可用性
- 数据一致性: 由于一个请求需要在大多数节点上被接受, 所以可以保证只要有一个最新数据的副本在正常工作的节点集合中, 那么所有的读请求都可以返回最新的数据

Quorum 在许多分布式系统中都有应用 (eg: Zookeeper 的 ZAB, Google's Spanner 的 Paxos), 通过 Quorum 来保证分布式数据一致性和高容错

# WARO

WARO (Write All Read One) 是一种在分布式数据存储系统中常用的数据一致性策略

- Write All: 所有的写操作都必须在所有的副本节点上完成, 在所有的参与节点中同步更新信息, 这保证了在完成写操作后, 所有的副本都持有最新的数据
- Read One: 读操作只需要在任何一个副本上进行就可以了, 由于写操作保证了所有副本的数据一致性, 因此无论从哪个副本读取数据, 读取的数据都是最新的

WARO 同时考虑了系统性能和数据一致性, 尽管需要在所有副本上完成写操作可能会导致性能开销, 但它可以保证数据的强一致性, 另一方面, 只需要在一个节点上完成读操作可以显著提高读操作的性能

WARO 模型的性能会受到系统负载, 网络延时和副本数量等因素的影响 (eg: 如果有大量的写操作, 就需要维护大量的副本, 调整网络延时和副本数量也可能影响系统的性能)

# Paxos

Paxos 是解决分布式系统中的一致性问题的一种算法, 能在一个可靠的系统中, 在任何时候提供一致性的保证, 在面对网络延迟, 分区和节点故障的时候依然可以正确地工作

Paxos 角色

- Proposer: 提案发起者, 可以理解为客户端或者是服务请求者, 负责发起一个提议, Paxos 将程序中的操作抽象成提议 Value (eg: 修改某个变量的值)
- Acceptor: 提案接收者, 主要负责接收 Proposer 的提议, 并对提议给予反馈, 至少 N / 2 + 1的 Acceptor 批准后, 才可以通过提议
- Learner: 观察者, 不参与提议过程, 仅在提议决议确定后, 通过监听 Proposer 和 Acceptor 的交互, 得知决议结果, 这个角色可以实际观察到系统状态的改变, 进行相应的操作, 在实际应用中, Learner 可以是 Acceptor 自身, 也可以是独立的角色
- Leader: Proposer 的一种特殊形式, 主要负责对外部请求的初步处理, 并发起提议, Leader 的选举是通过 Paxos 协议进行的, 通过不断抛出提案, 最终形成一个决议来达成 Leader

Paxos 选举过程

- Proposer 生成全局唯一且递增的 Proposal Id, 向 Paxos 集群的所有机器发送 Prepare 请求, 这里不携带 Value, 只携带 Proposal Id (N)
- Acceptor 接受到 Prepare 后, 判断 Proposal Id 是否比 Max_N 大, Max_N 记录了之前响应的 Proposal Id
  - 如果大, 就记录 Proposal Id 到 Max_N 中, 并返回之前的 Max_N
  - 如果小, 就不回复或者回复 Error
- 进行 P2a, P2b, P2c 三个步骤 (省略)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403091509474.png)

# Raft

Raft 主要用于分布式集群环境下, 从众多从节点中选举一个主节点, 如 RocketMQ, Nacos, Redis Sentinel 都采用了 Raft 来选举主节点

Raft 角色

- Leader: 领导者负责处理所有的客户端请求, 并将日志条目复制到其他的服务器, 在任何时候, 只有一个 Leader, 在更换 Leader 的过程中, 可能会短暂的出现没有 Leader 的情况, Leader 只会在它的日志里增加新的条目, 不会去删除或修改已存在的条目
- Follower: 响应 Leader 的请求, 如果 Leader 挂了, 会参与投票选举新的 Leader
- Candidate: 候选者通过 RPC 请求其他节点给自己投票

Log Entry 日志条目, 是一个基本的数据结构, 通常用于记录系统中发生的操作或事件, 每一次的客户端请求, 或者系统状态的改变, 都会生成一条日志条目, 添加到日志中

Log Entry 组成

- Term: 任期号, 也可以理解为该日志条目创建的时间点, 在 Raft 协议中, 每当有新一轮的领导者选举开始, Term 就会增加
- Command: 命令, 这通常是客户端请求的一部分 (eg: 一个键值对的 PUT 操作)
- Index: 索引, 这是日志条目在日志中的位置
- Command Parameter: 一些命令可能需要附带其它参数 (eg: 一个键值对的 PUT 操作, 需要知道要 PUT 的值)

Raft 选举流程

1. 初始状态

- A, B, C 在初始状态都是 Follower, 此时还没有 Leader, 所以不会接受到 Leader 的 PING, 都会进入超时等待的状态
- 每个节点的超时时间都是随机的, 防止同时有多个 Candicate 去拉票导致平票的情况, 假如这里 A 150ms, B 300ms, C 200ms, 其中 A 最先完成超时等待
- A 从 Follower 切换为 Candidate, 将自身的 Term 从 0 更新为 1
- A 先投自己一票, 然后通过 RPC 向其他节点请求投自己一票, 这里 B, C 最先收到 A 的拉票请求后, 就会立即给他 A 投一票, 并且也跟着修改自己的 Term 为 A 的 Term, 后续如果还有节点想要来拉票, 这里的 B, C 都会直接拒绝
- A 的票数为 3 >= 2 (N / 2 + 1 = 3 / 2 + 1 = 2) 完成选举, 成为 Leader, 开始处理客户端请求

2. Leader 宕机, 选举新的 Leader

- A 宕机或者网络堵塞了, B 和 C 都接受不到 A 的 PING, 进入超时等待的状态, 假如这里 B 150ms, C 300ms, 其中 B 最先完成超时等待
- B 从 Follower 切换为 Candidate, 将自身的 Term 从 1 更新为 2
- B 先投自己一票, 然后通过 RPC 向其他节点请求投自己一票, 这里 C 最先收到 B  的拉票请求后, 就会立即给他 B 投一票, 并且也跟着修改自己的 Term 为 B 的 Term
- B 的票数为 2 >= 2 完成选举, 成为 Leader, 开始处理客户端请求

3. Old Leader 恢复

- A 恢复健康后, 发现自己的 Term 比其他节点的 Term 小, 则自动成为 Follower