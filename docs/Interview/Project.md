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

分布式登录状态同步：通过 Redis + JWT + Hash 解决分布式环境下登录状态同步的问题, 通过 Redis + Hash 存储用户的 Token, 限制 Token 数量, 并通过 Redis 维护了一个黑名单拦截报废的 Token.

- 用户登入后, 会存储到一个 Hash 中, Key 为 `token:login:<userid>`, Field 为 Create Time, Val 为 Token, 每次存储 New Token 前会先判断 Hash 存储的 Token 数量是否达到了存储上限, 如果达到了, 就移除 Oldest Token, 并将该 Oldest Token 加入 BlackList
- 用户登出后, 需要删除 Hash 中的 Token, 并且将 Token 加入 BlackList
- 拦截器拒绝该 BlackList 中 Token 的访问

分布式登录状态同步：通过 Redis + JWT + List 解决分布式环境下登录状态同步的问题

- lpush 添加 token, 执行 ltrim 保留 0 ~ 2 的 token, 删除超出的 token
- 每次请求都查询一次 Redis 都 Token list, 对比 token 是否相同
- 也不需要通过 XXL-JOB 来实现周期性删除 Redis 中过期的 Token

日活跃统计: 通过 MQ + Interceptor + Redis 的 HyperLogLog 统计日活跃用户数量

- Interceptor 拦截到请求后, 将 IP 封装成 Msg, 由 MQ 异步处理, 以 `statistic:user:daily:2022:01:01` 的 Key, IP 为 Val 操作 HyperLogLog 统计日活跃用户
- 讲述由 List => Set => BitMap => HyperLogLog 的选择过程

缓存击穿处理：通过 Bitmap + Bloom Filter 解决缓存击穿

- Guava -> Hutool -> Redis -> Redisson + Interceptor

超时订单: 通过 Redis + MQ + Delayed Queue 实现超时订单处理, 通过 XXL-JOB 进行兜底处理.

- 通过 RabbitMQ 的 Delayed Queue 实现超时订单, 分为 10s, 20s, 30s, 40s, 50s, 1m, 5m, 10m 去检查订单状态, 如果支付, 直接退出, 如果超过 10m 也未支付, 则直接恢复库存, 允许其他用户下单
- 通过 XXL-JOB 每隔 10s 进行一次分页查询, 处理一部分超时订单, 总共在 10m 内完成一次全表扫描, 不仅可以兜底, 也可以防止 MQ 消息丢失和 MQ 宕机的问题
- 成本高, 需要额外存储消息, 就需要搭建集群, 如果存储的延迟任务过多, 会导致峰值压力, 适合延时较短的任务

超时订单: 通过 XXL-JOB 实现超时订单

- 单独维护一个超时库, 将所有需要处理超时的任务, 塞入这个库, 通过 XXL-JOB 一次性或者增量式全部捞出来, 然后通过批量修改的方式操作数据库
- 稳定, 成本低, 延时高, 不存在峰值压力, 适合存储延时较长的任务

超时订单: 时间轮算法

- MQ 的延迟消息也有用到时间轮算法

在线人数统计: MySQL 实现

- 登录设置 user tbl 的 is_login 为 1, 登出设置为 0, 统计时直接查询 is_login 为 1 的数量

在线人数统计: Redis 实现

- `sadd uid_login <uid>` 和 `srem uid_login <uid>` 维护一个登录统计缓存, 通过 scard 获取总数量

在线人数统计: BitMap 实现

- `setbit user_login <uid> 1` 和 `setbit user_login <uid> 0` 维护一个位图登录统计, 通过 `bitcount` 统计在线人数
- 通过 `setbit user_ios <uid> 1` 维护一个 ios 用户位图, 通过 `user_ios & user_login` 统计 ios 用户在线人数

在线人数统计: HyperLogLog 实现

秒杀商品

[Explain](https://www.bilibili.com/video/BV1Uz4y137UA/?spm_id_from=333.337.search-card.all.click&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

- 单机锁 -> 分布式锁 (Redis SETNX / Zookeeper)
- 业务执行耗时太久, 就可以适当增加锁的过期时间, 或者开启一个子线程定时检查主线程是否依旧在线处理任务, 如果在就重设过期时间, 续命嘛, watch dog
  - Watch Dog 就是通过时间轮算法实现的, 一般使用 Netty 的 HashedWheelTimer
  - 一般续期都需要先判断是否过期, 然后再去修改过期时间, 是多个操作, 需要保证原子性, 就通过 Lua, 通过递归的方式继续进行续期操作
- Key 设定为当前线程对应的 UUID, 每次删除 key, 只会释放属于自己的锁

Redis 实现功能

- String 的 INCR 实现分布式环境下的自增 ID
- Hash 实现购物车 `hset cart:<user_id> <goods_id> <goods_number>`
- List 的 LPUSH, LRANGE 获取最新的微博消息
- Set 实现抽奖功能 
  - SADD 参加抽奖活动
  - SMEMBERS 查看抽奖人员信息
  - SRANDMEMBER 随机抽奖
  - SPOP 抽一二三等奖, 将抽到奖的用户移除 SET, 防止重复抽奖
- Set 实现朋友圈功能
  - `SADD like:<msg_id> <user_id>` 实现点赞
  - `SREM like:<msg_id> <user_id>` 实现取消点赞
  - `SMEMBERS like<msg_id>` 查看点赞列表
  - `SCARD like<msg_id>` 获取点赞用户数量
- Set 实现微博关系功能
  - `SINTER following:harvey following:bruce` 实现共同关注
  - `SDIFF following:harvey following:brude` 实现可能认识的人
- ZSet 实现微信点赞功能, 以时间戳作为 Priority, 实现热搜排行, 实现新闻排行- 