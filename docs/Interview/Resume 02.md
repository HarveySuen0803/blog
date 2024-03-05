基于 SpringBoot + SpringCloudAlibaba + SpringSecurity + OAuth2 + Spring Authorization Server + Redis 的分布式
客户关系管理系统, 实现了分布式授权认证, 用户管理, 活动管理, 数据统计, 数据展示等功能.

[Github](https://github.com/HarveySuen0803/crm-server)

- 分布式授权认证: 通过 SpringSecurity + JWT + RBAC 实现了分布式授权认证.

- 授权中心 (第三方): 接入了 Github 的授权中心, 基于授权码模式对用户进行授权认证.

- 授权中心 (自定义): 通过 SAS 自建了一套授权中心, 基于授权码模式对用户进行授权认证.

- 微服务: 通过 SpringCloudAlibaba 构建了一套微服务系统.

- 断点续传: 对大文件进行分块上传.

- 日志记录: 通过 AOP + Strategy Pattern + ThreadPool 能根据不同类型的日志做统一的记录.

- 文件转码: 通过 XXL-JOB + ThreadPool + CountDownLatch 批量进行文件转码, 提高转码效率.


基于 SpringBoot + JWT + Redis + Redisson + RabbitMQ + XXL-JOB + Sentinel + Vue + ElementPlus + UniApp 的分布式校园外卖平台, 实现基本的登录, 浏览, 点赞, 关注, 评论, 下单, 提醒, 统计, 安全防控等功能.

[Github](https://github.com/HarveySuen0803/take-out-server)

- 分布式登录: 通过 Redis + JWT + List 存储用户的 Token, 限制 Token 数量.

- 商品秒杀：通过 Redis + Lua + Redisson 实现库存的预检, 通过 MQ 异步创建订单.

- 防止重复下单: 通过 Redis + Token + Redisson 防止重复请求, 通过 Lua 保证多个操作的原子性.

- 超时订单处理: 通过 MQ 在多个时间点处理超时个订单, 通过定时调度兜底.

- 缓存问题处理: 通过 Bitmap + Bloom Filter 处理缓存击穿. 针对热点数据, 通过 Redis + Mutex + Logic Expiration 处理缓存失效. 通过 N + n 的过期策略, 处理缓存雪崩. 通过 Sentinel 配置流控熔断降级策略.

