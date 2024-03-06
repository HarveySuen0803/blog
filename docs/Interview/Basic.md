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


# Bug Solution

- RabbitMQ 消息重试, RPC 重试, 导致重复订单, Idempotent