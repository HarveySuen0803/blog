# Network

- HTTP
- TCP
- UDP
- Cookie, Session
- IO

# JDK

- Collection
  - List
    - Vector
    - ArrayList
    - Linkedlist
  - Set
    - HashSet
      - LinkedHashSet
    - TreeSet
- Map
  - HashTable
    - Properties
  - HashMap
    - LinkedHashMap
  - ConcurrentHashMap
  - TreeMap
- Reflect
  - performance
- String, StringBuffer, StringBuilder
- final
- JDK's Dynamic Proxy, CGLib's Dynamic Proxy
- Reflect
- JDK8
  - StampedLock + LockSupport
  - Stream API

# Redis

- Cache Penetration
- Cache Breakdown
- Cache Avalanche
- Dual write consistency
- Persistence
- Expiration
- Distributed Lock
- Replication
- Sentinel
- Cluster
- Full Bandwidth
  - Local Cache
  - Sentinel
  - update Bandwidth
  - OpenResty
  - Multi Cache

# MySQL

- Transaction ACID
- Slow Query
- SQL Optimization
- Explain
- Index
- Clustered Index
- Unified Index
- Covering Index
- Index Invalidation
- Replication
- Storage Engine
- Canal
- Split DB
- Split DB and Table
- Optimization
  - Field 缩写, Field 设置为 Not Null 或 Default Value, 节省 Null List , 避免 Index Invalidation, 辅助 Optimizer 选择 Index
  - inner join, not outer join
  - no order by, group by, distinct

# Spring

- Bean Life Cycle
- Bean Circular Reference
- Transaction Invalidation
- Transaction Propagation
- Spring AOP
- AspectJ Aop
- MVC Process
- Auto Configuration
- Design Pattern
- Spring or SpringMVC or SpringBoot
- Multi Thread (sychronized, Lock, ThreadLocal (SpringSecurity, Transaction))
- BeanFactory or ApplicationContext

# MyBatis

- MyBatis Process
- Lazy Loading
- Cache

# Micro Service

- Micor Service
- Registry Center
- Configuration Center
- Load Balancing
- Remote Invocation
- Gateway
- Service Security
- Service Monitoring
- Limit Request
- Idempotence
- Distributed Scheduling
- OpenFeign RPC

# MQ

- MQ Reliability
    - Publisher Retry, Consumer Retry
    - Publisher Confirm 
    - Publisher Return
    - Consumer Confirm
    - Persistence
    - Mirroring Queue

# Project

- Bloom Filter
- Redis Idempotence
- Spring Security, JWT Token, UserDetails, Token Expiration, Auth Update, Security Data, Data Mapping
- Redis Cache
    - [Explain](https://www.bilibili.com/video/BV1zs4y1R79v/?spm_id_from=333.788.recommend_more_video.0&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)
- Overtime Orders
    - [Explain](https://www.bilibili.com/video/BV14a4y1k74d/?spm_id_from=333.1007.tianma.1-2-2.click&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)
    - [Explain](https://www.bilibili.com/video/BV1NP411k7du/?spm_id_from=333.337.search-card.all.click&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)
    - JDK DelayQueue
    - RabbitMQ DelayedQuque
    - RocketMQ DelayedQueue
    - Redis, EX Notify
    - Scheduler

# JUC

- Semaphore
- ThreadPool
  - Batch Import Data, ThreadPool + CountDownLatch
  - Data Aggregation, ThreadPool + Future
  - Async Invocation
- ThreadLocal
  - UserContext

# JVM

- JVM Structure
- PC Register
- Object Strcuture
- Object Memory Allocation
- Object Reference

# Service

Idempotent

- 实现 Idempotent 的方法就是在数据表上添加一个字段, 最好是一个业务字段, 在插入前, 先查询该字段, 判断操作是否已经执行过了, 但是在高并发场景下, 可能两个线程同时查到都没有执行过, 这时就需要采用锁的方案保证串行, 单机就采用 JDK 提供的锁, 分布式就采用分布式锁

用户重复点击按钮导致的表单重复提交

- 前端按钮置灰, 提示加载中, 避免重复点击
- 在用户进入下单页面时, 就由后端派发一个 Token 给前端, 或者由前端生成一个 Token, 前端下单前携带这个 Token 请求后端, 后端根据这个 Token 向 Redis 执行 SETNX 实现幂等
- 如果是提交表单时, 去前端生成 Token 或者由后端派发 Token 都无法保证幂等性 !!!

Nginx 和 Gateway 导致的表单重复提交

- 上面的方案都可以采用, 而且在提交表单时, 去由前端生成 Token 或者由后端派发 Token 也可以解决这里的表单重复提交问题
- 直接通过 Redis 存储 `<user_id>:<goods_id>`, 下单成功后, 去删除这个

RabbitMQ 重复消费消息导致的表单重复提交

- 根据每个消息的 messageid 向 Redis 执行 SETNX 保证幂等

# Bug Solution

- RabbitMQ 消息重试, RPC 重试, 导致重复订单, Idempotent