# Basic

Netty 是一个异步的, 基于事件驱动的网络应用框架, 用于快速开发可维护, 高性能的网络服务器和客户端

配置 Dependency

```xml
<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-all</artifactId>
    <version>4.1.39.Final</version>
</dependency>
```

配置 Server

```java
new ServerBootstrap()
    // 创建 Server 的 EventLoopGroup, 用于处理所有通过网络传输的事件, 可以简单理解为 ThreadPool + Selector
    .group(new NioEventLoopGroup())
    // 配置 Server 的 SocketChannel
    .channel(NioServerSocketChannel.class)
    // 配置 Handler 处理 SocketChannel, 当触发 OP_ACCEPT 时, 就会去执行 initChannel()
    .childHandler(new ChannelInitializer<NioSocketChannel>() {
        @Override
        protected void initChannel(NioSocketChannel ch) {
            // SocketChannel 的 Pipeline 实际上是一个 Handler Chain, 专门设计用于处理网络 IO Event
        
            // 该 Handler 用来将 ByteBuf 解码成 String
            ch.pipeline().addLast(new StringDecoder());
            
            // 该 Handler 用来处理业务, 接收到上一个 Handler 的处理结果作为 msg 参数 (接收到上面 Decoder 返回的 String)
            ch.pipeline().addLast(new SimpleChannelInboundHandler<String>() {
                // 处理读事件
                @Override
                protected void channelRead0(ChannelHandlerContext ctx, String msg) {
                    System.out.println(msg);
                }
            });
        }
    })
    // ServerSocketChannel 绑定的监听端口
    .bind(8080);
```

配置 Client

```java
new Bootstrap()
    .group(new NioEventLoopGroup())
    .channel(NioSocketChannel.class)
    //
    .handler(new ChannelInitializer<Channel>() {
        @Override
        protected void initChannel(Channel ch) {
            ch.pipeline().addLast(new StringEncoder());
        }
    })
    .connect("127.0.0.1", 8080)
    .sync()
    .channel()
    .writeAndFlush("hello world!");
```

Netty 工作流程

- https://www.bilibili.com/video/BV1py4y1E7oA?p=56
- https://www.bilibili.com/video/BV1py4y1E7oA?p=57

# EventLoop

EventLoopGroup 的实现非常多, 常见的有 NioEventLoopGroup 和 DefaultEventLoop

- NioEventLoopGroup 可以处理 IO Event, 普通任务, 定时任务
- DefaultEventLoop 可以处理普通任务, 定时任务

```java
EventLoopGroup group = new NioEventLoopGroup();
EventLoopGroup group = new DefaultEventLoop();
```

可以指定 EventLoopGroup 内部包含的 EventLoop 的数量, 循环利用 EventLoop, 类似于 ThreadPool 和 Thread 的关系

```java
EventLoopGroup group = new NioEventLoopGroup(2);

System.out.println(group.next()); // io.netty.channel.nio.NioEventLoop@56cbfb61
System.out.println(group.next()); // io.netty.channel.nio.NioEventLoop@1134affc
System.out.println(group.next()); // io.netty.channel.nio.NioEventLoop@56cbfb61
```

通过 EventLoopGroup 执行普通任务

```java
group.next().submit(() -> {
    System.out.println("hello world");
});
```

通过 EventLoopGroup 执行定时任务

```java
// ScheduledFuture<?> scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit);
group.next().scheduleAtFixedRate(() -> {
    System.out.println("hello world");
}, 3, 1, TimeUnit.SECONDS);
```

通过 EventLoopGroup 处理 IO Event

- https://www.bilibili.com/video/BV1py4y1E7oA?p=60
- https://www.bilibili.com/video/BV1py4y1E7oA?p=61
- https://www.bilibili.com/video/BV1py4y1E7oA?p=62
- https://www.bilibili.com/video/BV1py4y1E7oA?p=63

# Channel

Channel

- https://www.bilibili.com/video/BV1py4y1E7oA?p=64
