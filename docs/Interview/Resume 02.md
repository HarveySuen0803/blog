基于 SpringBoot + SpringCloudAlibaba + SpringSecurity + OAuth2 + Spring Authorization Server + Redis 的分布式客户关系管理系统, 实现了分布式授权认证, 用户管理, 活动管理, 数据统计, 数据展示等功能

- 授权认证
  - 通过 SpringSecurity + JWT + RBAC 实现了分布式授权认证
  - 通过 Spring OAuth2 接入了 Github 的授权中心, 基于授权码模式对用户进行授权认证.
  - 通过 Spring Authorization Server 自建授权中心, 基于授权码模式对用户进行授权认证.
- 微服务处理: 
  - 通过 Nacos 实现注册中心, 配置中心, 将一个完整的服务拆分成多个微服务.
  - 通过 Gateway 在网关层解决跨域, 用户鉴权, 黑白名单, 内网服务保护等问题.
  - 通过 LoadBalancer 实现负载均衡.
  - 通过 OpenFeign 实现微服务之间的远程调用.
- 文件处理:
  - 通过 MinIO 存储文件, 上传时, 对大文件进行分块, 实现断点续传.
  - 通过 XXL-JOB 增量式扫表处理任务, 降低 CPU 压力.
  - 通过 XXL-JOB + ThreadPool + CountDownLatch 批量进行文件转码, 提高转码效率.