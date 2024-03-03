# Take Out System

断点续传

- 前端调用浏览器的 API 对大文件进行分块, 每次上传分块文件前请求后端查询该分块是否已经存在后端, 如果不存在, 则不上传这一块了
- 后端接受到分块后, 保存在 service 本地, 如果出现异常, 就返回该分块的序号给前端, 通知他重新上传
- 前端全部上传完之后, 再发送一个请求给后端, 后端将保存在本地的分块文件进行合并, 再上传完整文件到 MINIO 中
  - 也可以直接将分块上传到 MINIO 中, 合并时就直接调用一个 API 通知 MINIO 进行合并
- 完整文件存储形式 `"/" + fileMd5.charAt(0) + "/" + fileMd5.charAt(1) + "/" + fileMd5 + "/" + fileName`
- 分块文件存储形式 `"/" + fileMd5.charAt(0) + "/" + fileMd5.charAt(1) + "/" + fileMd5 + "/" + chunkNo;`

视频处理

- 上传视频的时候可以指定修改文件编码 (eg: avi -> mp4), 上传之后, 判断是否需要转换编码, 如果要转换, 就存储一个编码消息到 DB 中, 类似于 MQ, 通过 XXL-JOB 代替 MQ 实现相同的效果
- 通过 shardIndex 和 shardTotal 给 XXL-JOB 的服务分配任务 `select * from media_process where id % #{shardTotal} = #{shardIndex} and (status = 1 or status = 3) and fail_count < #{maxFailCount} limit #{maxRecordCount};`
- 通过 ThreadPool + CountDownLatch 处理获取到的 MediaProcessList
- 如果要节省一部分 CPU, 就可以通过增量式的扫表方式, 通过 limit 获取 MediaProcessList

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

权限校验

- SpringSecurity
- AOP

记录请求日志, 记录请求耗时

- AOP

用户状态

- UserHolder
- RequestContextHolder

OJ 重复提交表单 (重复提交订单)

Auto Increment ID -> UUID -> Snowflake ID

ThreadPool + AOP + Strategy Pattern 实现异步日志记录, 代码无侵入, 满足开闭原则

