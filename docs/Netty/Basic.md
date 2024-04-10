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
    // 配置 Server 的 EventLoopGroup, 用于处理所有通过网络传输的事件, 可以简单理解为 ThreadPool + Selector
    .group(new NioEventLoopGroup())
    // 配置 Server 的 SocketChannel
    .channel(NioServerSocketChannel.class)
    // 配置 Handler 处理 Event, 当触发 OP_ACCEPT 时, 由 Netty 底层处理 OP_ACCEPT Event, 然后就会同时调用 Server 和 Client 的 initChannel()
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
                    log.info({}, msg);
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
    // 配置 Client 的 EventLoopGroup
    .group(new NioEventLoopGroup())
    // 配置 Client 的 SocketChannel
    .channel(NioSocketChannel.class)
    // 配置 Handler 处理 Event
    .handler(new ChannelInitializer<Channel>() {
        @Override
        protected void initChannel(Channel ch) {
            ch.pipeline().addLast(new StringEncoder());
        }
    })
    .connect("127.0.0.1", 8080)
    // 同步堵塞, 等待连接后
    .sync()
    // 获取 Channel
    .channel()
    // 通过 Channel 发送 "hello world" 字符串, 然后通过 Handler 中的 new StringEncoder 将 String 转成 ByteBuf 发送给 Server
    .writeAndFlush("hello world!");
```

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

一个 EventLoop 可以绑定多个 SocketChannel, 后续该 SocketChannel 上的所有 Event 都由该 EventLoop 处理

```java
new ServerBootstrap()
    // 指定 EVentLoopGroup 内部有两个 EventLoop, 当连接的 SocketChannel 数量超出 2 后, 就会由一个 EventLoop 绑定多个 SocketChannel
    .group(new NioEventLoopGroup(2))
    .channel(NioServerSocketChannel.class)
    .childHandler(new ChannelInitializer<NioSocketChannel>() {
        @Override
        protected void initChannel(NioSocketChannel ch) {
            ch.pipeline().addLast(new ChannelInboundHandlerAdapter() {
                @Override
                public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
                    ByteBuf buf = (ByteBuf) msg;
                    log.info(buf.toString(Charset.defaultCharset()));
                }
            });
        }
    })
    .bind(8080);
```

```txt
Client A send "a msg1"
Client B send "b msg1"
Client C send "c msg1"
Server EventLoop A handle "a msg1"
Server EventLoop B handle "a msg1"
Server EventLoop A handle "c msg1" # EventLoopGroup 内部只设置了两个 EventLoop, 所以这里超出后, 由 EventLoop A 同时绑定了 Client A 和 Client C 的 SocketChannel

Client A send "a msg2"
Client B send "b msg2"
Server EventLoop A handle "a msg2" # EventLoop 绑定 SocketChannel 后, 后续该 SocketChannel 上的所有 Event 都由该 EventLoop 处理 
Server EventLoop B handle "a msg2"
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202404061246417.png)

细分任务, 单独指定一个 EventLoopGroup 作为 Boss 负责 OP_ACCEPT, 单独指定一个 EventLoopGroup 作为 Worker 负责 OP_READ, OP_WRITE

```java
// Boss 负责 OP_ACCEPT
EventLoopGroup boss = new NioEventLoopGroup(1);
// Worker 负责 OP_READ, OP_WRITE
EventLoopGroup worker = new NioEventLoopGroup(1);
new ServerBootstrap()
    .group(boss, worker)
    .channel(NioServerSocketChannel.class)
    .childHandler(new ChannelInitializer<NioSocketChannel>() {
        @Override
        protected void initChannel(NioSocketChannel ch) {
            ch.pipeline().addLast(new ChannelInboundHandlerAdapter() {
                @Override
                public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
                    ByteBuf buf = (ByteBuf) msg;
                    log.info(buf.toString(Charset.defaultCharset()));
                }
            });
        }
    })
    .bind(8080);
```

细分任务, ShortTermWorker 作为默认 Worker 处理耗时短的 Handler, 单独指定一个 LongTermWoker 执行耗时久的 Handler, 避免因为一个耗时较久的 Handler 卡住了 Woker, 导致堵塞

```java
EventLoopGroup boss = new NioEventLoopGroup(1);
EventLoopGroup shortTermWorker = new NioEventLoopGroup(2);
EventLoopGroup longTermWorker = new DefaultEventLoop();
new ServerBootstrap()
    .group(boss, shortTermWorker)
    .channel(NioServerSocketChannel.class)
    .childHandler(new ChannelInitializer<NioSocketChannel>() {
        @Override
        protected void initChannel(NioSocketChannel ch) {
            // 默认是 shortTermWorker 执行 Handler
            ch.pipeline().addLast("handler 1", new ChannelInboundHandlerAdapter() {
                @Override
                public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
                    ByteBuf buf = (ByteBuf) msg;
                    log.info(buf.toString(Charset.defaultCharset()));
                    // 传递 ctx 和 msg 给下一个 Handler
                    super.channelRead(ctx, msg);
                }
            });
            // 这里指定 longTermWorker 执行耗时较久的 Handler
            ch.pipeline().addLast(longTermWorker, "handler 2", new ChannelInboundHandlerAdapter() {
                @Override
                public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
                    ByteBuf buf = (ByteBuf) msg;
                    log.info(buf.toString(Charset.defaultCharset()));
                }
            });
        }
    })
    .bind(8080);
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202404061246419.png)

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

# Channel

Client 执行 connect() 后拿到的就是 ChannelFuture 用于表示异步操作的结果, 允许用户以非阻塞的方式获取操作的完成状态

```java
ChannelFuture channelFuture = new Bootstrap()
    .group(new NioEventLoopGroup())
    .channel(NioSocketChannel.class)
    .handler(new ChannelInitializer<Channel>() {
        @Override
        protected void initChannel(Channel ch) {
            ch.pipeline().addLast(new StringEncoder());
        }
    })
    // 异步非堵塞
    .connect("127.0.0.1", 8080);
```

connect() 是异步非堵塞的, Main Thread 只发起调用, 真正执行连接的是 Nio Thread, 所以 Main Thread 想要执行 IO, 就需要等待 Nio Thread 先建立连接, 有下面两种方式

1. Main Thread 同步堵塞等待 Nio Thread 完成连接后, 执行 IO

```java
channelFuture.sync();
Channel channel = channelFuture.channel();
channel.writeAndFlush("hello world");
```

2. Main Thread 异步监听, 回掉执行 IO

```java
channelFuture.addListener(new ChannelFutureListener() {
    @Override
    public void operationComplete(ChannelFuture future) throws Exception {
        Channel channel = future.channel();
        channel.writeAndFlush("hello world");
    }
})
```

# Close Channel

通过 channel.close() 关闭 Channel, 这里 Netty 采用了异步的手段, 如果想要在关闭后做一些其他的操作, 无法保证同步

```java
EventLoopGroup eventLoopGroup = new NioEventLoopGroup();
Bootstrap bootstrap = new Bootstrap()
    .group(eventLoopGroup)
    .channel(NioSocketChannel.class)
    .handler(new ChannelInitializer<Channel>() {
        @Override
        protected void initChannel(Channel ch) {
            ch.pipeline().addLast(new LoggingHandler(LogLevel.INFO));
            ch.pipeline().addLast(new StringEncoder());
        }
    });
ChannelFuture channelFuture = bootstrap.connect("127.0.0.1", 8080).sync();
Channel channel = channelFuture.channel();
Scanner scanner = new Scanner(System.in);
while (true) {
    String line = scanner.next();
    if ("quit".equals(line)) {
        channel.close(); // Nio Thread 执行这一行
        log.info("Do something after channel closed"); // Main Thread 执行这一行
        break;
    }
    channel.writeAndFlush(line);
}
```

```txt
[main] INFO com.harvey.NettyClient -- Do something after channel closed
[nioEventLoopGroup-2-1] INFO io.netty.handler.logging.LoggingHandler -- [...] CLOSE
[nioEventLoopGroup-2-1] INFO io.netty.handler.logging.LoggingHandler -- [...] INACTIVE
[nioEventLoopGroup-2-1] INFO io.netty.handler.logging.LoggingHandler -- [...] UNREGISTERED
```

通过 closeFuture() 处理 Channel 关闭后的操作

1. Main Thread 同步堵塞等待 Nio Thread 完成关闭后, 执行后续操作

```java
while (true) {
    String line = scanner.next();
    if ("quit".equals(line)) {
        channel.close(); // Nio Thread 执行这一行
        channel.closeFuture().sync(); // Main Thread 堵塞在这里等待 Nio Thread 执行完
        log.info("Do something after channel closed");
        eventLoopGroup.shutdownGracefully();
        break;
    }
    channel.writeAndFlush(line);
}
```

2. Nio Thread 异步回掉执行后续操作

```java
ChannelFuture closeFuture = channel.closeFuture();
closeFuture.addListener(new ChannelFutureListener() {
    @Override
    public void operationComplete(ChannelFuture future) throws Exception {
        log.info("Do something after channel closed");
        eventLoopGroup.shutdownGracefully();
    }
});

while (true) {
    String line = scanner.next();
    if ("quit".equals(line)) {
        channel.close(); // Nio Thread 执行这一行
        channel.closeFuture().addListener(new ChannelFutureListener() { // Main Thread 绑定了 Listener 后, 就直接 break 走人了, Nio Thread 关闭 Channel 后, 就异步回掉该方法执行后续操作
            @Override
            public void operationComplete(ChannelFuture future) throws Exception {
                log.info("Do something after channel closed");
                eventLoopGroup.shutdownGracefully();
            }
        });
        break;
    }
    channel.writeAndFlush(line);
}
```

通过 ctx.close() 关闭 Channel, 类似于 channel.close() 都是通过 Nio Thread 去异步的关闭 Thread, 而且返回的是一个 ChannelFuture, 所以依旧可以采用上面的几种方式来处理, 下面就列出一个最基本的用法, 其他的关闭方法就省略了

```java
bootstrap.handler(new ChannelInitializer<Channel>() {
    @Override
    protected void initChannel(Channel ch) {
        ch.pipeline().addLast(new ChannelInboundHandlerAdapter() {
            @Override
            public void channelActive(ChannelHandlerContext ctx) throws Exception {
                // ctx.writeAndFlush() 和 ctx.close() 都是异步执行的, 所以有可能还没有写入完成, 就执行了 ctx.close(), 非常不安全
                ctx.writeAndFlush(msg);
                ctx.close();
            }
        });
    }
})
ChannelFuture channelFuture = bootstrap.connect("127.0.0.1", 10100).sync();
channelFuture.channel().closeFuture().sync(); // Main Thread 堵塞在这里等待 Channel 关闭
eventLoopGroup.shutdownGracefully();
```

推荐给 ChannelFuture 添加 addListener(ChannelFutureListener.CLOSE), 在执行完异步操作后, 回掉 ChannelFutureListener.CLOSE 完成关闭 Channel 的操作

```java
bootstrap.handler(new ChannelInitializer<Channel>() {
    @Override
    protected void initChannel(Channel ch) {
        ch.pipeline().addLast(new ChannelInboundHandlerAdapter() {
            @Override
            public void channelActive(ChannelHandlerContext ctx) throws Exception {
                ctx.writeAndFlush(msg).addListener(ChannelFutureListener.CLOSE);
            }
        });
    }
})
ChannelFuture channelFuture = bootstrap.connect("127.0.0.1", 10100).sync();
channelFuture.channel().closeFuture().sync(); // Main Thread 堵塞在这里等待 Channel 关闭
eventLoopGroup.shutdownGracefully();
```

通过下面这段优化, 可以让主线程只去进行绑定 Listener 的工作, 而不需要去堵塞等待连接, 提高效率

```java
ChannelFuture channelFuture = bootstrap.connect("127.0.0.1", 10100);

CountDownLatch latch = new CountDownLatch(1);

// Main Thread 只需要绑定一个 Listener 即可, 不需要堵塞等待连接完成, 可以继续执行后续操作
channelFuture.addListener(new ChannelFutureListener() {
    @Override
    public void operationComplete(ChannelFuture future) throws Exception {
        if (future.isSuccess()) {
            log.debug("Connection established");
            // Nio Thread 来绑定 Listener
            channelFuture.channel().closeFuture().addListener(new ChannelFutureListener() {
                @Override
                public void operationComplete(ChannelFuture future) throws Exception {
                    latch.countDown();
                }
            });
        } else {
            log.debug("Connection attempt failed");
            future.cause().printStackTrace();
            latch.countDown();
        }
    }
});

try {
    latch.await(); // Main Thread 堵塞在这里等待
} catch (InterruptedException e) {
    throw new RuntimeException(e);
} finally {
    eventLoopGroup.shutdownGracefully();
}
```

# LoggingHandler

LoggingHandler 是一个方便的工具, 用于在 Netty 应用程序中添加日志记录功能, 它是一个 ChannelHandler, 可以很容易地添加到 ChannelPipeline 中, 用于自动记录 IO Event, 开发者可以快速获得网络事件的详细日志输出, 这对于调试和监控网络应用的行为至关重要

```java
ChannelInitializer<SocketChannel> initializer = new ChannelInitializer<SocketChannel>() {
    @Override
    protected void initChannel(SocketChannel ch) throws Exception {
        // other handlers ...
        ch.pipeline().addLast("logger", new LoggingHandler(LogLevel.INFO));
        // other handlers ...
    }
};
```

# Future

Netty Future 代表了一个异步操作的结果, 与 JUC Future 不同, Netty Future 提供了更加丰富的功能, 特别是对于异步 IO 的支持, 这些特性使得 Netty Future 成为开发高性能网络应用时处理异步操作的关键组件

```java
EventLoop eventLoop = new NioEventLoopGroup().next();
Future<Object> future = eventLoop.submit(new Callable<Object>() {
    @Override
    public Object call() throws Exception {
        return new Object();
    }
});

log.info("waiting for result");
log.info("result: {}", future.get());
```

```java
log.info("waiting for result");
future.addListener(new GenericFutureListener<Future<? super Object>>() {
    @Override
    public void operationComplete(Future<? super Object> future) throws Exception {
        // 只有得到结果了才会回掉该监听器, 所以这里直接通过 getNow() 来获取即可, 不会有任何阻塞
        log.info("result: {}", future.getNow());
    }
});
```

# Promise

Promise 是 Future 的一个子接口, 它不仅代表了一个异步操作的结果, 还提供了设置这个结果的方法, 相当于一个可以由操作执行者显式完成的 Future

```java
EventLoop eventLoop = new NioEventLoopGroup().next();
Promise<Integer> promise = new DefaultPromise<>(eventLoop);

new Thread(() -> {
    log.info("Start calculating");
    try {
        TimeUnit.SECONDS.sleep(1);
        promise.setSuccess(10);
    } catch (InterruptedException e) {
        e.printStackTrace();
        promise.setFailure(e);
    }
}).start();

log.info("Waiting for the result");
log.info("Result is {}", promise.get());
```

# Pipeline

ChannelHandler 用来处理 Channel 上的各种事件, 分为入站, 出站两种, 所有 ChannelHandler 被连成一串, 就是 Pipeline

- 入站处理器通常是 ChannelInboundHandlerAdapter 的子类, 主要用来读取客户端数据, 写回结果
- 出站处理器通常是 ChannelOutboundHandlerAdapter 的子类, 主要对写回结果进行加工

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202404061715527.png)

```java
// head <-> in_1 <-> in_2 <-> in_3 <-> out_3 <-> out_2 <-> out_1 <-> tail
serverBootstrap.childHandler(new ChannelInitializer<NioSocketChannel>() {
    @Override
    protected void initChannel(NioSocketChannel ch) {
        ch.pipeline().addLast("in_1", new ChannelInboundHandlerAdapter() {
            @Override
            public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
                log.info("in_1");
                // 执行 ctx.fireChannelRead() 会调用后一个 Inbound Handler
                ctx.fireChannelRead(msg);
            }
        });
        ch.pipeline().addLast("in_2", new ChannelInboundHandlerAdapter() {
            @Override
            public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
                log.info("in_2");
                // 执行 ctx.fireChannelRead() 会调用后一个 Inbound Handler
                ctx.fireChannelRead(msg);
            }
        });
        ch.pipeline().addLast("in_3", new ChannelInboundHandlerAdapter() {
            @Override
            public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
                log.info("in_3");
        
                // 执行 ch.write() 会依次执行 tail -> out_1 -> out_2 -> out_3
                // ch.writeAndFlush(ctx.alloc().buffer().writeBytes("hello world".getBytes()));
                
                // 执行 ctx.channel().write() 会依次执行 tail -> out_1 -> out_2 -> out_3
                // ctx.channel().writeAndFlush(ctx.alloc().buffer().writeBytes("hello world".getBytes()));

                ctx.channel().writeAndFlush(ctx.alloc().buffer().writeBytes("hello world".getBytes()));
            }
        });
        ch.pipeline().addLast("out_3", new ChannelOutboundHandlerAdapter() {
            @Override
            public void write(ChannelHandlerContext ctx, Object msg, ChannelPromise promise) throws Exception {
                log.info("out_3");
                // 执行 ctx.write() 会调用前一个 Outbound Handler
                ctx.write(msg, promise);
            }
        });
        ch.pipeline().addLast("out_2", new ChannelOutboundHandlerAdapter() {
            @Override
            public void write(ChannelHandlerContext ctx, Object msg, ChannelPromise promise) throws Exception {
                log.info("out_2");
                // 执行 ctx.write() 会调用前一个 Outbound Handler
                ctx.write(msg, promise);
            }
        });
        ch.pipeline().addLast("out_1", new ChannelOutboundHandlerAdapter() {
            @Override
            public void write(ChannelHandlerContext ctx, Object msg, ChannelPromise promise) throws Exception {
                log.info("out_1");
                // 执行 ctx.write() 会调用前一个 Outbound Handler
                ctx.write(msg, promise);
            }
        });
    }
})
```

```txt
in_1
in_2
in_3
out_1
out_2
out_3
```

# EmbeddedChannel

EmbeddedChannel 是 Netty 提供的一个特殊的 Channel 实现, 用于测试和模拟场景, 它允许开发者在不实际建立网络连接的情况下测试 ChannelHandler 和 ChannelPipeline 的行为, 执行和验证入站和出站处理逻辑, 这对于单元测试非常有用

```java
ChannelInboundHandlerAdapter h1 = new ChannelInboundHandlerAdapter() {
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        log.info("h1");
        ctx.fireChannelRead(msg);
    }
};
ChannelInboundHandlerAdapter h2 = new ChannelInboundHandlerAdapter() {
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        log.info("h2");
        ctx.fireChannelRead(msg);
    }
};
ChannelInboundHandlerAdapter h3 = new ChannelInboundHandlerAdapter() {
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        log.info("h3");
        ctx.fireChannelRead(msg);
    }
};

EmbeddedChannel embeddedChannel = new EmbeddedChannel(h1, h2, h3);
embeddedChannel.writeInbound(ByteBufAllocator.DEFAULT.buffer().writeBytes("hello world".getBytes()));
```

# ByteBuf

ByteBuf 是 Netty 中用于处理字节数据的一个核心类, 与 JDK ByteBuffer 不同, Netty ByteBuf 提供了更高效, 更灵活的数据操作接口, 特别适合用于网络数据的读写操作, 通过优化的内存管理和访问模式, 大幅提升了网络应用的性能

基于 Heap Memory 的 ByteBuf, 创建和销毁的成本低, 读写性能差 (需要额外一次复制), 受 JVM GC 限制

```java
ByteBuf buf = ByteBufAllocator.DEFAULT.heapBuffer(10);
```

基于 Direct Memory 的 ByteBuf, 创建和销毁成本高, 读写性能强 (不需要额外一次复制), 不受 JVM GC 限制

```java
ByteBuf buf = ByteBufAllocator.DEFAULT.directBuffer(10);
```

# ByteBuf Pool

基于 Direct Memory 的 ByteBuf 的创建和销毁成本太高, 可以参考 ThreadPool 和 ConnectionPool 的思想, 将 ByteBuf 池化起来, 避免了创建和销毁的开销, 更高效利用的资源

- Netty 4.1 之后, 除了 Android, 都默认开启了池化

```java
ByteBufAllocator.DEFAULT.directBuffer(10).getClass(); // PooledUnsafeDirectByteBuf
  
ByteBufAllocator.DEFAULT.heapBuffer(10).getClass(); // PooledUnsafeHeapByteBuf
```

# ByteBuf Structure

Netty ByteBuf 相比 JDK ByteBuffer, 采用了两个 Ptr 实现读写分离, 不需要非常麻烦的切换读写模式, 大致分为了四个部分

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202404061246425.png)

# ByteBuf Write

指定初始容量为 5B, 写入 {1, 2, 3, 4}

```java
ByteBuf buf = ByteBufAllocator.DEFAULT.buffer(5);
buf.writeBytes(new byte[]{1, 2, 3, 4});
```

```txt
read index: 0,  write index: 4,  capacity: 5
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 01 02 03 04                                     |....            |
+--------+-------------------------------------------------+----------------+
```

再写入 {5, 6, 7, 8} 超出了初始的 5B 容量, 自动扩容

- 如果写入后数据大小未超过 512B, 则扩容到下一个 16 的整数倍 (eg: 写入后为 12B, 则扩容到 16B)
- 如果写入后数据大小已超过 512B, 则扩容到下一个 2^n (eg: 写入后为 513B, 则扩容到 2^10 = 1024, 因为 2^9 = 512 已经不够了)
- 扩容不能超过 max capacity, 否则会报错

```java
buf.writeBytes(new byte[]{5, 6, 7, 8});
byteBufLog(buf);
```

```txt
read index: 0,  write index: 8,  capacity: 64
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 01 02 03 04 05 06 07 08                         |........        |
+--------+-------------------------------------------------+----------------+
```

# ByteBuf Read

ByteBuf 会根据 Read Index 进行读取, 读过的内容, 就属于废弃部分了, 再读只能读那些尚未读取的部分

```java
ByteBuf buf = ByteBufAllocator.DEFAULT.buffer(16);
buf.writeBytes("hello world".getBytes());

System.out.println((char) buf.readByte()); // h
System.out.println((char) buf.readByte()); // e
System.out.println((char) buf.readByte()); // l
System.out.println((char) buf.readByte()); // l

byteBufLog(buf);
```

```txt
read index: 4,  write index: 11,  capacity: 16
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 6f 20 77 6f 72 6c 64                            |o world         |
+--------+-------------------------------------------------+----------------+
```

通过 markReaderIndex() 标记当前的读索引位置, 通过 resetReaderIndex() 重置到之前标记的位置

```java
ByteBuf buf = ByteBufAllocator.DEFAULT.buffer(16);
buf.writeBytes("hello world".getBytes());

System.out.println((char) buf.readByte()); // h
System.out.println((char) buf.readByte()); // e
System.out.println((char) buf.readByte()); // l

buf.markReaderIndex();

System.out.println((char) buf.readByte()); // l
System.out.println((char) buf.readByte()); // o

buf.resetReaderIndex();

System.out.println((char) buf.readByte()); // l
System.out.println((char) buf.readByte()); // o
```

# ByteBuf Memory Recovery

基于 Direct Memory 的 ByteBuf Obj 最好是手动来释放, 而不是等 GC 垃圾回收, 可以更加及时的释放内存, 避免内存泄漏

- UnpooledHeapByteBuf 使用的是 JVM 内存, 只需等 GC 回收内存即可
- UnpooledDirectByteBuf 使用的就是直接内存了, 需手动回收内存
- PooledByteBuf 和它的子类使用了池化机制, 需要更复杂的规则来回收内存

Netty 这里采用了引用计数法来控制回收内存, 每个 ByteBuf 都实现了 ReferenceCounted 接口

- 每个 ByteBuf 对象的初始计数为 1
- 调用 release() 计数减 1, 当计数为 0 时, 底层内存会被回收
- 调用 retain() 计数加 1, 表示调用者没用完之前, 其它 handler 即使调用了 release() 也不会造成回收

一般是谁最后使用了该 ByteBuf Obj, 就由谁执行 release() 释放内存

- head <-> h1 <-> h2 <-> h3 <-> tail 中, h1 使用了 ByteBuf Obj 传递给了 h2, h2 使用了 ByteBuf Obj, 并将 ByteBuf Obj 转成了 String Obj 传递给了 h3, 则这里的 h2 就是最后一个使用者, 应该在 h2 中执行 release() 释放内存

HeadContext 和 TailContext 作为整个 HandlerChain 的头和尾, 他们内部都包含了对 ByteBuf Obj 的释放操作, 防止中间的 Handler 没有使用到该 ByteBuf Obj

- 如果中间的 Handler 拿到 ByteBuf Obj 后, 转成了 String Obj 传递给了下一个 Handler, 并且忘记执行 release(), 则最终的 HeadContext 和 TailContext 就都不会拿到 ByteBuf Obj 完成释放内存的操作了, 这就导致了内存泄漏

# ByteBuf Log Util

```java
private static void byteBufLog(ByteBuf buffer) {
    int length = buffer.readableBytes();
    int rows = length / 16 + (length % 15 == 0 ? 0 : 1) + 4;
    StringBuilder buf = new StringBuilder(rows * 80 * 2)
        .append("read index: ").append(buffer.readerIndex())
        .append(",  write index: ").append(buffer.writerIndex())
        .append(",  capacity: ").append(buffer.capacity())
        .append(StringUtil.NEWLINE);
    ByteBufUtil.appendPrettyHexDump(buf, buffer);
    System.out.println(buf.toString());
}
```

```txt
read index: 0,  write index: 11,  capacity: 256
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 68 65 6c 6c 6f 20 77 6f 72 6c 64                |hello world     |
+--------+-------------------------------------------------+----------------+
```

# slice()

slice() 是对 Zero Copy 的体现之一, 对原始 ByteBuf 进行切片成多个 ByteBuf, 切片后的 ByteBuf 并没有发生内存复制, 还是使用原始 ByteBuf 的内存, 切片后的 ByteBuf 维护独立的 Read Ptr 和 Write Ptr

- 对切片进行修改, 会影响到原先的 ByteBuf Obj
- 切片的容量也不能修改, 只能在最初指定的范围内操作

```java
ByteBuf buf = ByteBufAllocator.DEFAULT.buffer(16);
buf.writeBytes(new byte[]{'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'});
// ByteBuf slice(int index, int length)
ByteBuf slice1 = buf.slice(0, 5);
ByteBuf slice2 = buf.slice(5, 5);
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202404061246426.png)

# duplicate()

duplicate() 是对 Zero Copy 的体现之一, 截取了原始 ByteBuf 所有内容, 并且没有 max capacity 的限制, 也是与原始 ByteBuf 使用同一块底层内存, 只是读写指针是独立的

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202404061246427.png)

# CompositeByteBuf

CompositeByteBuf 是对 Zero Copy 的体现之一, 可以将多个 ByteBuf 合并为一个逻辑上的 ByteBuf, 避免拷贝

```java
ByteBuf buf1 = ByteBufAllocator.DEFAULT.buffer(5);
buf1.writeBytes(new byte[]{1, 2, 3, 4, 5});
ByteBuf buf2 = ByteBufAllocator.DEFAULT.buffer(5);
buf2.writeBytes(new byte[]{6, 7, 8, 9, 10});

CompositeByteBuf buf3 = ByteBufAllocator.DEFAULT.compositeBuffer();
// true 表示增加新的 ByteBuf 自动递增 write index, 否则 write index 会始终为 0
buf3.addComponents(true, buf1, buf2);
```

```txt
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 01 02 03 04 05 06 07 08 09 0a                   |..........      |
+--------+-------------------------------------------------+----------------+
```

# Unpooled

Unpooled 是一个工具类, 类如其名, 提供了非池化的 ByteBuf 创建, 组合, 复制等操作, 还可以用来包装零拷贝的 ByteBuf

```java
ByteBuf buf1 = ByteBufAllocator.DEFAULT.buffer(5);
buf1.writeBytes(new byte[]{1, 2, 3, 4, 5});
ByteBuf buf2 = ByteBufAllocator.DEFAULT.buffer(5);
buf2.writeBytes(new byte[]{6, 7, 8, 9, 10});

// 当包装 ByteBuf 个数超过一个时, 底层使用了 CompositeByteBuf
ByteBuf buf3 = Unpooled.wrappedBuffer(buf1, buf2);
System.out.println(ByteBufUtil.prettyHexDump(buf3));
```

```txt
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 01 02 03 04 05 06 07 08 09 0a                   |..........      |
+--------+-------------------------------------------------+----------------+
```

# Exercise

echo server

- https://www.bilibili.com/video/BV1py4y1E7oA/?p=94

```
为什么建议使用 ctx.alloc().buffer() 创建 ByteBuf Obj, 而不是 ByteBufAllocator.DEFAULT.buffer()?

Java IO 双工? Netty IO 双工?
```

