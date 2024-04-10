# RESP

配置 Redis Client 采用 RESP 发送请求给 Redis Server

```java
@Slf4j
public class RedisClient {
    public static void main(String[] args) throws IOException {
        EventLoopGroup eventLoopGroup = new NioEventLoopGroup();
        try {
            Bootstrap bootstrap = new Bootstrap();
            bootstrap.group(eventLoopGroup);
            bootstrap.channel(NioSocketChannel.class);
            bootstrap.handler(new ChannelInitializer<Channel>() {
                @Override
                protected void initChannel(Channel ch) {
                    ch.pipeline().addLast(new LoggingHandler());
                    ch.pipeline().addLast(new ChannelInboundHandlerAdapter() {
                        @Override
                        public void channelActive(ChannelHandlerContext ctx) throws Exception {
                            auth(ctx);
                            setKey(ctx);
                        }
                        
                        @Override
                        public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
                            ByteBuf buf = (ByteBuf) msg;
                            System.out.println(buf.toString(Charset.defaultCharset()));
                            ctx.close();
                        }
                    });
                }
            });
            ChannelFuture channelFuture = bootstrap.connect("127.0.0.1", 6379).sync();
            channelFuture.channel().closeFuture().sync();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            eventLoopGroup.shutdownGracefully();
        }
    }
    
    private static byte[] CRLF = {13, 10}; // \r\n
    
    private static void auth(ChannelHandlerContext ctx) {
        ByteBuf buf = ctx.alloc().buffer();
        buf.writeBytes("*2".getBytes());
        buf.writeBytes(CRLF);
        buf.writeBytes("$4".getBytes());
        buf.writeBytes(CRLF);
        buf.writeBytes("auth".getBytes());
        buf.writeBytes(CRLF);
        buf.writeBytes("$3".getBytes());
        buf.writeBytes(CRLF);
        buf.writeBytes("111".getBytes());
        buf.writeBytes(CRLF);
        ctx.writeAndFlush(buf);
    }
    
    private static void setKey(ChannelHandlerContext ctx) {
        ByteBuf buf = ctx.alloc().buffer();
        buf.writeBytes("*3".getBytes());
        buf.writeBytes(CRLF);
        buf.writeBytes("$3".getBytes());
        buf.writeBytes(CRLF);
        buf.writeBytes("set".getBytes());
        buf.writeBytes(CRLF);
        buf.writeBytes("$2".getBytes());
        buf.writeBytes(CRLF);
        buf.writeBytes("k1".getBytes());
        buf.writeBytes(CRLF);
        buf.writeBytes("$2".getBytes());
        buf.writeBytes(CRLF);
        buf.writeBytes("v1".getBytes());
        buf.writeBytes(CRLF);
        ctx.writeAndFlush(buf);
    }
}
```

# HTTP

配置 HTTP Server 接受 HTTP Client 的 HTTP Request

```java
@Slf4j
public class NettyServer {
    public static void main(String[] args) {
        EventLoopGroup boss = new NioEventLoopGroup(1);
        EventLoopGroup worker = new NioEventLoopGroup(2);
        ServerBootstrap serverBootstrap = new ServerBootstrap();
        serverBootstrap.group(boss, worker);
        serverBootstrap.channel(NioServerSocketChannel.class);
        serverBootstrap.childHandler(new ChannelInitializer<NioSocketChannel>() {
            @Override
            protected void initChannel(NioSocketChannel ch) {
                ch.pipeline().addLast(new LoggingHandler(LogLevel.DEBUG));
                ch.pipeline().addLast(new HttpServerCodec());
                
                // Client 发送请求, 可能是 GET 或 POST, 所以有可能只发送了请求头, 也有可能既发送了请求头, 也发送了请求体
                
                // 添加一个 Handler, 只关心 HttpRequest 请求头
                ch.pipeline().addLast(new SimpleChannelInboundHandler<HttpRequest>() {
                    @Override
                    protected void channelRead0(ChannelHandlerContext ctx, HttpRequest msg) throws Exception {
                        // 接受请求信息
                        log.debug("HttpRequest: {}", msg);
                        log.debug("uri: {}", msg.uri());
                        log.debug("headers: {}", msg.headers());
                        
                        byte[] bytes = "<h1>hello world</h1>".getBytes();
                        
                        // 返回响应信息
                        DefaultFullHttpResponse rep = new DefaultFullHttpResponse(msg.protocolVersion(), HttpResponseStatus.OK);
                        rep.headers().setInt(HttpHeaderNames.CONTENT_LENGTH, bytes.length); // 设置响应数据的长度 (必须, 否则会一直转圈圈, 因为不知道具体要返回多长的数据)
                        rep.content().writeBytes(bytes); // 设置响应数据
                        ctx.writeAndFlush(rep);
                    }
                });
                
                // 添加一个 Handler, 只关心 HttpContent 请求体
                ch.pipeline().addLast(new SimpleChannelInboundHandler<HttpContent>() {
                    @Override
                    protected void channelRead0(ChannelHandlerContext ctx, HttpContent msg) throws Exception {
                        log.debug("HttpContent: {}", msg);
                    }
                });
            }
        });
        try {
            ChannelFuture channelFuture = serverBootstrap.bind(10100).sync();
            channelFuture.channel().closeFuture().sync();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            boss.shutdownGracefully();
            worker.shutdownGracefully();
        }
    }
}
```

HTTP Client 访问 http://127.0.0.1:10100 发送请求给 HTTP Server, 接收到 HTTP Server 响应的 "hello world"





