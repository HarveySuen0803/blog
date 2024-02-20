# Flow Limited

Flow Limited 在 Architecture 中是非常有必要的, 不仅可以处理突发的流量, 处理高并发, 还可以防止恶意攻击, 一般可以在 Tomcat, Sentinel, Nginx, Gateway 中设置 Flow Limited

Nginx 的 Flow Limited 采用 Leaky Bucket Algo, 以固定的速度处理请求, 来不及处理的都会溢出抛弃

SpringCloud Gateway 的 Flow Limited 采用 Token Bucket Algo, 以固定的速率生成令牌, 申请到令牌的请求才会被处理, 相比 Leaky Bucket Algo, 处理请求的速度不是固定的 (eg: 令牌桶中存放了 3 个令牌, 此时有 6 个请求过来, 立即派发掉 3 个令牌, 1s 后又生成 3 个令牌, 即在 1s 内处理了 6 个请求)

# Idempotent

Idempotent 要求重复多次调用接口不会改变业务状态, 保证单次调用结果和多次调用结果一致 (eg: 用户重复点击下单, 要求只能有一个订单生效)

- GET 和 DELETE 符合 Idempotent, PUT 和 POST 不符合 Idempotent

通过 Token + Redis 实现 Idempotent

- Client 访问就在 Redis 中生成一个 Unique Token, 下单时就去删除该 Token, 删除成功才可以创建订单, 实现 Idempotent, 这里的 Unique Token 就是一个 Distributed Lock