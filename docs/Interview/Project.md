# Take Out System

 短信登录：通过 Redis + Aliyun Web Service 实现手机验证码登录功能, 通过 Redis 存储验证码信息.

- Key 2m 过期, 验证的时候如何没有查询到 Key, 就说明验证码过期
- 创建验证码时, 先查询 Redis 中的验证码 Key 是否存在, 如果存在，就说明是频繁申请了
- 校验成功后, 登录成功后, 就删除这个 验证码 Key, 清空验证码统计 Key
- 通过 INCR, DECR 统计验证码, 1h 过期, 超过 3 次, 就拒绝访问

分布式登录状态同步：通过 Redis + JWT 解决分布式环境下登录状态同步的问题, 通过 Redis + Hash 存储用户的 Token, 限制 Token 数量, 并通过 Redis 维护了一个黑名单拦截报废的 Token.

- 用户登入后, 会存储到一个 Hash 中, Key 为 `token:login:<userid>`, Field 为 Create Time, Val 为 Token, 每次存储 New Token 前会先判断 Hash 存储的 Token 数量是否达到了存储上限, 如果达到了, 就移除 Oldest Token, 并将该 Oldest Token 加入 BlackList
- 用户登出后, 需要删除 Hash 中的 Token, 并且将 Token 加入 BlackList
- 拦截器拒绝该 BlackList 中 Token 的访问

日活跃统计: 通过 MQ + Interceptor + Redis 的 HyperLogLog 统计日活跃用户数量

- Interceptor 拦截到请求后, 将 IP 封装成 Msg, 由 MQ 异步处理, 以 `statistic:user:daily:2022:01:01` 的 Key, IP 为 Val 操作 HyperLogLog 统计日活跃用户
- 讲述由 List => Set => BitMap => HyperLogLog 的选择过程

缓存击穿处理：通过 Bitmap + Bloom Filter 解决缓存击穿

- Guava -> Hutool -> Redis -> Redisson + Interceptor

超时订单: 通过 Redis + MQ + Delayed Queue 实现超时订单处理, 通过 XXL-JOB 进行兜底处理.

- 通过 RabbitMQ 的 Delayed Queue 实现超时订单, 分为 10s, 20s, 30s, 40s, 50s, 1m, 5m, 10m 去检查订单状态, 如果支付, 直接退出, 如果超过 10m 也未支付, 则直接恢复库存, 允许其他用户下单
- 通过 XXL-JOB 每隔 10s 进行一次分页查询, 处理一部分超时订单, 总共在 10m 内完成一次全表扫描, 不仅可以兜底, 也可以防止 MQ 消息丢失和 MQ 宕机的问题


