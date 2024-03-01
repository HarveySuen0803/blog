# 专业技能

熟悉 Java, 理解 OOP, 熟练使用 Stream,  Collection,  IO,  Reflection,  Generics.

熟悉 JUC, 熟练使用 Lock, Future, Semaphore, ThreadLocal, ThreadPool. 理解 Monitor, JMM, volatile, AQS, CAS.

熟悉 JVM, 理解 JVM Memory Model, Class Loading, GC, Execution Engine.

熟悉 SpringSecurity 和 Spring Authorizatioin Server, 理解 RBAC, 理解 OAuth2 四种授权认证, 熟练使用框架构建授权认证服务.

熟悉 MySQL, 具有部分 SQL 分析, SQL 调优, 索引优化的能力. 理解索引结构, 锁机制, 事务隔离机制, Bin Log.

熟悉 Spring, SpringMVC, SpringBoot, MyBatis, MyBatisPlus. 理解 IOC, AOP, Three-Level Cache, Bean Lifecycle.

熟悉 Redis, Redisson, SpringCache. 理解主从, 哨兵, 集群, 分布式锁, 网络模型.

熟悉 RabbitMQ 实现服务之间的解耦通信, 异步任务处理, 延迟消息. 理解 RabbitMQ 的消息确认机制, 消息可靠保证原理.

熟悉 SpringCloud, Nacos, Gateway, OpenFeign, LoadBalancer, Skywalking, Seata, Sentinel. 理解 Nacos 的同步机制, Seata 的 XA, AT, TCC.

熟悉 Vue, HTML, CSS, JavaScript, TypeScript, Ajax, WebPack, Vite, Promise, Node, UniAPP, MiniProgramming. 

熟悉 Linux, Shell, Docker, Maven, Git.

# 项目经验

## CRM System

基于 SpringBoot + SpringCloudAlibaba + SpringSecurity + OAuth2 + Spring Authorization Server + Redis 的分布式客户关系管理系统, 实现了分布式授权认证, 用户管理, 活动管理, 数据统计, 数据展示等功能

- 授权认证: 通过 SpringSecurity + JWT + RBAC 实现了分布式授权认证, 给每个接口设置了响应的访问权限, 控制用户访问.
- OAuth2 授权认证 (第三方授权中心): 通过 Spring OAuth2 接入了 Github 的授权中心, 基于 Authorization Code Grant 对用户进行授权认证.
- OAuth2 授权认证 (自定义授权中心): 通过 Spring Authorization Server 搭建了一个自定义的授权中心, 基于 Authorization Code Grant 对用户进行授权认证.
- 微服务: 通过 Nacos 实现注册中心, 配置中心, 将一个完整的服务拆分成多个微服务, 通过 Gateway 在网关层解决跨域, 用户鉴权, 黑白名单, 内网服务保护等问题, 通过 LoadBalancer 实现负载均衡, 通过 OpenFeign 实现微服务之间的远程调用.
- 断点续传大文件: 通过 Minio + CountDownLatch ...

## Take-Out System

基于 SpringBoot + JWT + Redis + Redisson + RabbitMQ + XXL-JOb + Sentinel + Vue + ElementPlus + UniApp 的分布式校园外卖平台, 分为用户前台和商家后台两部分, 实现基本的登录, 浏览, 点赞, 关注, 评论, 下单, 提醒, 统计, 安全防控等功能.

- 短信登录：通过 Redis + Aliyun Web Service 实现手机验证码登录功能, 通过 Redis 巧妙的实现了验证码的存储和校验.
- 分布式登录状态同步: 通过 Redis + JWT 解决分布式环境下登录状态同步的问题. 通过 Redis 的 Hash 存储用户的 Token, 限制 Token 数量. 通过 Redis 的 Set 维护了一个黑名单拦截废弃的 Token. 通过 XXL-JOB 周期性扫表处理黑名单中过时的 Token.
- 查询附近商铺: 通过 Redis 的 Geo 处理商户地址, 通过 Hash 处理商户信息.
- 日活跃用户: 通过 MQ + HyperLogLog 统计日活跃用户数量.
- 商品秒杀：通过 Redis + Lua + Redisson 实现库存的预检, 通过 MQ 异步创建订单, 大大提升并发性能.
- 防止重复下单: 通过 Redis + Token + Redisson 防止重复请求, 通过 Lua 保证获取令牌, 对比令牌, 生成订单, 删除令牌多个操作的原子性.
- 超时订单: 通过 Redis + MQ + Delayed Queue 实现超时订单处理, 通过 XXL-JOB 进行兜底处理.
- 数据预热：使用 ThreadPool + CountDownLatch 分批从 MySQL 导入数据到 Redis.
- 当日签到: 使用 Redis 的 Bitmap 实现当日签到, 当月签到统计, 当月最长连续天数统计.
- 缓存击穿处理：通过 Bitmap + Bloom Filter 处理缓存击穿.
- 缓存失效处理: 针对热点数据, 通过 Redis + Mutex + Logic Expiration 处理缓存失效.
- 缓存雪崩处理：通过 N + n 的过期策略, 处理缓存雪崩.
- 限流降级处理: 通过 Sentinel 对热点请求进行限流, 并通过熔断降级策略, 向前端返回一个友好的提示信息.
