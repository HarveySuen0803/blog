### Quorum 介绍

Quorum (法定人数机制) 是分布式系统中的重要共识技术, 被设计用来提高分布式系统的可用性和容错能力, 尤其在面对节点故障或网络问题时

Quorum 的核心思想是一个请求在一个多节点分布式系统中被认为有效, 并在多数节点 (法定数量) 上一致同意后才会被执行, 所以在一个包含 N 个节点的系统中, 至少需要 N / 2 + 1 个节点同意, 这个请求才会被看做是已经达成共识

Quorum 中的节点包括 R (Read) 和 W (Write), 只要 R + W > N 就可以保证系统的一致性, 通常设置 R = N / 2 + 1, W = N / 2 + 1 (eg: N = 5, R = 3, W = 3)

- C1 写入数据 X, 会在 3 个节点上写入数据 (W)
- C2 读取数据 X, 会从 3 个节点上读取数据 (R), 所以总能保证至少读取到一条最新的数据, 再通过 Version Id 去区分哪一条是最新数据

Quorum 优点

- 容错能力: 即使系统中一部分节点发生故障或无法达成共识, 只要有超过半数的节点可以正常运行并且能够彼此通信, 系统就能够继续提供服务, 这使得系统能够在网络分区或节点宕机时保持可用性
- 数据一致性: 由于一个请求需要在大多数节点上被接受, 所以可以保证只要有一个最新数据的副本在正常工作的节点集合中, 那么所有的读请求都可以返回最新的数据

Quorum 在许多分布式系统中都有应用 (eg: Zookeeper 的 ZAB, Google's Spanner 的 Paxos), 通过 Quorum 来保证分布式数据一致性和高容错

### WARO 介绍

WARO (Write All Read One) 是一种在分布式数据存储系统中常用的数据一致性策略

- Write All: 所有的写操作都必须在所有的副本节点上完成, 在所有的参与节点中同步更新信息, 这保证了在完成写操作后, 所有的副本都持有最新的数据
- Read One: 读操作只需要在任何一个副本上进行就可以了, 由于写操作保证了所有副本的数据一致性, 因此无论从哪个副本读取数据, 读取的数据都是最新的

WARO 同时考虑了系统性能和数据一致性, 尽管需要在所有副本上完成写操作可能会导致性能开销, 但它可以保证数据的强一致性, 另一方面, 只需要在一个节点上完成读操作可以显著提高读操作的性能

WARO 模型的性能会受到系统负载, 网络延时和副本数量等因素的影响 (eg: 如果有大量的写操作, 就需要维护大量的副本, 调整网络延时和副本数量也可能影响系统的性能)

### ZAB 介绍

ZAB（Zookeeper Atomic Broadcast）协议是 Zookeeper 专门设计的分布式一致性协议，用于实现高可用、高性能的分布式协调服务。它是 Zookeeper 集群的一致性核心，支持 Leader 选举、事务日志同步和广播。

- 提供线性一致性：保证所有写请求的全局顺序一致。
- 高可用性：即使部分节点宕机，系统仍能处理读操作，写操作会等到重新选出 Leader。
- 崩溃恢复：在集群故障后能够快速恢复一致性。

ZAB 协议分为两个状态：

- 崩溃恢复（Crash Recovery）：当集群首次启动或 Leader 宕机时，集群会进入崩溃恢复状态。主要任务是通过 Leader 选举，选出新的 Leader 并同步数据，确保所有节点的状态一致。
- 消息广播（Atomic Broadcast）：当集群进入稳定状态后，Leader 将客户端的写请求以事务的形式广播给所有 Follower。提交成功后，数据的写操作才会生效。

ZAB 核心机制：

- Leader 选举：通过投票机制选出一个 Leader，Leader 负责处理所有写请求并广播事务。
- 事务日志同步：Follower 在崩溃恢复阶段从 Leader 同步缺失的事务日志。
- Quorum：ZAB 使用多数派（Quorum）机制，确保写操作被超过半数节点确认后才提交。

### ZAB Leader 选举

在 Zookeeper 的 ZAB 协议中，Leader 选举是整个协议的核心组件之一。它在集群首次启动或现有 Leader 宕机时被触发，通过广播投票机制选出一个 Leader，确保分布式系统的一致性。

Leader 选举过程：

1. 节点初始化：所有节点的状态被设置为 LOOKING，表示正在寻找 Leader。
2. 广播投票：每个节点将自己的投票广播给其他节点。
3. 投票比较：节点根据收到的投票，比较优先级并更新自己的投票。
4. Quorum 判断：当某个候选节点获得 Quorum（多数派）支持时，该节点成为 Leader。
5. 角色切换：胜出的节点切换为 LEADING 状态，其他节点切换为 FOLLOWING 或 OBSERVING 状态。

QuorumPeer 是 Zookeeper 中的核心类，负责管理节点的状态以及 Leader 选举的入口。

```java
public class QuorumPeer extends Thread {
    private ServerState state = ServerState.LOOKING; // 初始状态为 LOOKING
    private QuorumCnxManager manager; // 负责网络通信
    private FastLeaderElection electionAlg; // 选举算法

    public void run() {
        while (true) {
            switch (state) {
                case LOOKING:
                    // 进入 Leader 选举
                    try {
                        leader = electionAlg.lookForLeader();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    break;
                case LEADING:
                    // 当前节点为 Leader，开始处理事务
                    leader.lead();
                    break;
                case FOLLOWING:
                    // 当前节点为 Follower，开始同步状态
                    follower.followLeader();
                    break;
            }
        }
    }
}
```

FastLeaderElection 是 Zookeeper 中的快速选举算法实现。

```java
public class FastLeaderElection implements Election {
    private QuorumPeer self; // 当前节点
    private Messenger messenger; // 负责接收和发送投票消息

    public Vote lookForLeader() throws InterruptedException {
        Map<Long, Vote> votes = new HashMap<>(); // 存储收到的投票
        Vote currentVote = self.getCurrentVote(); // 初始化投票为当前节点

        while (self.getPeerState() == ServerState.LOOKING) {
            sendNotifications(); // 广播投票给其他节点

            Notification n = messenger.pollNotification(); // 接收投票
            if (n != null) {
                if (isValidVote(n)) {
                    updateVote(n); // 根据优先级更新自己的投票
                }

                // 检查是否达成 Quorum
                if (hasQuorum(votes)) {
                    self.setPeerState(ServerState.LEADING); // 成为 Leader
                    return currentVote;
                }
            }
        }
        return null;
    }

    private void sendNotifications() {
        for (QuorumServer server : self.getVotingView().values()) {
            // 创建投票通知
            Notification n = new Notification();
            n.leader = self.getCurrentVote().getLeader();
            n.zxid = self.getCurrentVote().getZxid();
            n.epoch = self.getCurrentVote().getEpoch();
            n.state = self.getPeerState();
    
            // 广播投票
            messenger.queueNotification(n);
        }
    }

    private boolean hasQuorum(Map<Long, Vote> votes) {
        Map<Long, Integer> voteCounts = new HashMap<>();
        for (Vote vote : votes.values()) {
            long leader = vote.getLeader();
            voteCounts.put(leader, voteCounts.getOrDefault(leader, 0) + 1);
        }
    
        // 检查是否有某个节点获得 Quorum 支持
        for (Map.Entry<Long, Integer> entry : voteCounts.entrySet()) {
            if (entry.getValue() >= quorumSize) {
                return true;
            }
        }
        return false;
    }

    private void updateVote(Notification n) {
        // 比较投票优先级，并决定是否更新当前投票
        if (compareVotes(n, currentVote) > 0) {
            currentVote = new Vote(n.getLeaderId(), n.getEpoch());
        }
    }
}
```

compareVotes 比较投票优先级，并决定是否更新当前投票

```java
private int compareVotes(Vote v1, Vote v2) {
    // Epoch（时代）优先级最高，代表事务日志的最新状态。
    if (v1.getEpoch() > v2.getEpoch()) {
        return 1;
    } else if (v1.getEpoch() < v2.getEpoch()) {
        return -1;
    } else {
        // 如果 Epoch 相同，比较事务 ID。
        if (v1.getZxid() > v2.getZxid()) {
            return 1;
        } else if (v1.getZxid() < v2.getZxid()) {
            return -1;
        } else {
            // 如果 Zxid 相同，选择节点 ID 较大的节点。
            return Long.compare(v1.getLeaderId(), v2.getLeaderId());
        }
    }
}
```

### Paxos 介绍

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

### Raft 介绍

Raft 是一种分布式一致性协议，用于在分布式系统中确保多个节点对同一组操作（如日志条目）达成一致。它解决的问题是：即使部分节点发生故障或网络分裂，系统仍能确保所有节点最终一致并且能够继续工作

Raft 角色

- Leader: 领导者负责处理所有的客户端请求, 并将日志条目复制到其他的服务器, 在任何时候, 只有一个 Leader, 在更换 Leader 的过程中, 可能会短暂的出现没有 Leader 的情况, Leader 只会在它的日志里增加新的条目, 不会去删除或修改已存在的条目
- Follower: 响应 Leader 的请求, 如果 Leader 挂了, 会参与投票选举新的 Leader
- Candidate: 候选者通过 RPC 请求其他节点给自己投票

### Raft Leader 选举

1. 初始状态

- A, B, C 在初始状态都是 Follower, 此时还没有 Leader, 所以不会接受到 Leader 的 PING, 都会进入超时等待的状态
- 每个节点的超时时间都是随机的, 防止同时有多个 Candicate 去拉票导致平票的情况, 假如这里 A 150ms, B 300ms, C 200ms, 其中 A 最先完成超时等待
- A 从 Follower 切换为 Candidate, 将自身的 Term 从 0 更新为 1
- A 先投自己一票, 然后向其他节点请求投自己一票, 这里 B, C 最先收到 A 的拉票请求后, 就会立即给他 A 投一票, 并且也跟着修改自己的 Term 为 A 的 Term, 后续如果还有节点想要来拉票, 这里的 B, C 都会直接拒绝
- A 的票数为 3 >= 2 (N / 2 + 1 = 3 / 2 + 1 = 2) 完成选举, 成为 Leader, 开始处理客户端请求

2. Leader 宕机, 选举新的 Leader

- A 宕机或者网络堵塞了, B 和 C 都接受不到 A 的 PING, 进入超时等待的状态, 假如这里 B 150ms, C 300ms, 其中 B 最先完成超时等待
- B 从 Follower 切换为 Candidate, 将自身的 Term 从 1 更新为 2
- B 先投自己一票, 然后通过 RPC 向其他节点请求投自己一票, 这里 C 最先收到 B  的拉票请求后, 就会立即给他 B 投一票, 并且也跟着修改自己的 Term 为 B 的 Term
- B 的票数为 2 >= 2 完成选举, 成为 Leader, 开始处理客户端请求

3. Old Leader 恢复

- A 恢复健康后, 发现自己的 Term 比其他节点的 Term 小, 则自动成为 Follower

### Raft 日志条目

Log Entry 日志条目, 是一个基本的数据结构, 通常用于记录系统中发生的操作或事件, 每一次的客户端请求, 或者系统状态的改变, 都会生成一条日志条目, 添加到日志中

Log Entry 组成

- Term: 任期号, 也可以理解为该日志条目创建的时间点, 在 Raft 协议中, 每当有新一轮的领导者选举开始, Term 就会增加
- Command: 命令, 这通常是客户端请求的一部分 (eg: 一个键值对的 PUT 操作)
- Index: 索引, 这是日志条目在日志中的位置
- Command Parameter: 一些命令可能需要附带其它参数 (eg: 一个键值对的 PUT 操作, 需要知道要 PUT 的值)

```
Log[1] -> Term: 1, Command: set x=5
```

### Raft 状态机

状态机的核心作用是记录并维护系统的 最终状态，例如键值对的状态。在分布式系统中，状态机不仅代表最终的状态，还定义了系统如何从一系列输入（日志操作）中计算出这些状态。

- 日志条目是输入，状态机是输出
  - 日志条目记录了所有客户端的请求（操作），是系统状态更新的依据。
  - 状态机将这些操作应用到当前状态，生成最终的系统状态。
- 日志条目保证一致性，状态机保证正确性。
  - Raft 确保所有节点的日志条目按相同顺序一致。
  - 状态机根据一致的日志，独立计算出相同的最终状态。

### Raft 日志复制

领导者负责处理客户端请求，并需要将指令（如写入或修改数据）复制到所有节点：

1. 客户端向 A 发送一条命令 set x = 5。
2. A 将命令添加到自己的日志中，并生成一个索引号（如 Log[1]）。
3. A 向 B、C、D、E 发送 AppendEntries 请求，包含日志项 Log[1]: set x = 5。
4. Follower 节点收到日志后，返回成功确认。
5. A 收到大多数节点（如 B、C、D）的确认后，将该日志项标记为已提交（Committed）。
6. A 将提交结果返回给客户端。
7. A 的状态机应用已提交的日志 Log[1]，修改 x=5。
8. Follower 节点稍后也会应用该日志。

