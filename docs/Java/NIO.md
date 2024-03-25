# NIO

NIO (New IO) 通过非阻塞模式的 IO 操作增强性能和可伸缩性, 特别是在构建需要高速 IO 的网络应用时

NIO vs BIO

- BIO 通过 Stream 实现, 双工, 仅支持阻塞式 API, 不会自动缓存数据, 更高层
- NIO 通过 Channel 实现, 双工, 支持阻塞式 API 和 非堵塞式 API, 可以利用系统提供的发送缓冲区和接受缓冲区, 可以配合 Selector 实现 Multiplexing IO, 更底层

如果每建立一个 Socket 连接, 就开启一个线程去处理 Socket, 资源消耗非常多, 上下文切换成本也非常高, 只适合连接数较少的情况

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403200957870.png)

如果通过线程池去固定线程资源, 就会导致其他 Socket 连接的堵塞, 体验非常不好, 早期的 Tomcat 就是采用这种实现方式, 为了避免一个 Socket 长期占用线程资源, 所以只适合短连接的场景 (eg: Http)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403201005809.png)

Java NIO 通过 Select + Channel 实现了 Multiplexing IO 的效果, Selector 可以配合一个线程来管理多个 Channel, 一个 Channel 对应一个 Socket, Selector 的 select() 会堵塞等待 Channel 的读写就绪事件, 然后交给线程去处理, 从而避免了让一个线程吊死在了一个 Socket 上, 可以高效处理多个连接

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403201016077.png)

# ByteBuffer

使用 NIO 实现 Byte IO

```java
try (FileChannel channel = new FileInputStream("test.txt").getChannel()) {
    // Allocate a new byte buffer
    ByteBuffer buffer = ByteBuffer.allocate(10);
    while (channel.read(buffer) != -1) {
        // Switch to R Mode, and set lim_ptr
        buffer.flip();
        // Read data from buffer
        while (buffer.hasRemaining()) {
            System.out.print((char) buffer.get());
        }
        // Switch to W Mode, and clear buffer
        buffer.clear();
    }
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

allocate() 是创建的 HeapByteBuffer, 存储在 Java Memory 的 Heap 中, 分配速度快, 读写效率低 (需要多次拷贝), 存在 GC

allocateDirect() 是创建的 DirectByteBuffer, 存储在 Direct Memory 中, 涉及 OS 的操作, 分配速度慢, 读写效率高 (少一次拷贝), 不存在 GC

```java
System.out.println(ByteBuffer.allocate(10).getClass()); // HeapByteBuffer
System.out.println(ByteBuffer.allocateDirect(10).getClass()); // DirectByteBuffer
```

通过 get(int index) 可以直接访问指定索引处的数据, 不会移动 pos 的位置

```java
ByteBuffer buffer = ByteBuffer.allocate(10);
buffer.put(new byte[]{'a', 'b', 'c', 'd', 'e'});
buffer.flip();

System.out.println((char) buffer.get(0)); // a
System.out.println((char) buffer.get(1)); // b
System.out.println((char) buffer.get(2)); // c
```

通过 mark() 和 reset() 可以标记访问的位置

```java
ByteBuffer buffer = ByteBuffer.allocate(10);
buffer.put(new byte[]{'a', 'b', 'c', 'd', 'e'});
buffer.flip();

System.out.println((char) buffer.get()); // a
System.out.println((char) buffer.get()); // b
buffer.mark();
System.out.println((char) buffer.get()); // c
System.out.println((char) buffer.get()); // d
buffer.reset();
System.out.println((char) buffer.get()); // c
System.out.println((char) buffer.get()); // d
```

# ByteBuffer Structure

ByteBuffer 由 pos, lim, cap 三个关键部分组成, 实现读写操作

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403201119789.png)

默认 W Mode 下, pos 指向当前写入的位置, 每次写入一个 Byte 到 Buffer 中, 就移动一下 pos, 如果此时执行 get() 读取的 pos 指向的空数据

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403201119790.png)


执行 flip() 后, 从 W Mode 切换为 R Mode, 重制 pos 的位置, lim 指向上次最后一次写入的位置, 此时可以调用 get() 一边读取数据一边移动 pos, 而且只需要读取到 lim 的位置即可, 不需要读满 cap 了

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403201119791.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403201119792.png)

执行 clear() 后, 从 R Mode 切换为 W Mode, 重制 pos, lim 的位置, 清空 Buffer

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403201119789.png)

执行 compact(), 是把未读完的部分向前压缩, 然后从 R Mode 切换为 W Mode, 相比 clear(), 这里会保留那些未读取完的数据, 注意区分 clear() 和 compact() 的使用场景

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403201119793.png)

# ByteBuffer Conversion

通过 StandardCharsets 的 encode() 和 decode() 实现 String 和 ByteBuffer 之间的转换

```java
// String to ByteBuffer
ByteBuffer buffer = StandardCharsets.UTF_8.encode("hello");

// ByteBuffer to String
String str = StandardCharsets.UTF_8.decode(buffer).toString();
```

通过 ByteBuffer 的 wrap 实现 String 和 ByteBuffer 之间的转换

```java
// String to ByteBuffer
ByteBuffer buffer = ByteBuffer.wrap("hello".getBytes());

// ByteBuffer to String
String str = StandardCharsets.UTF_8.decode(buffer).toString();
```

通过 ByteBuffer 的 put() 实现 String 和 ByteBuffer 之间的转换, 可以直接将 String 转成 byte[] 进行存储, 但是这样会移动 pos 的位置, 所以在 ByteBuffer to String 的过程中, 需要先调用 flip() 从 W Mode 转换为 R Mode, 重制 pos 的位置

而 encode() 和 wrap() 底层都是在执行 put() 后帮助我们执行了 flip(), 所以不需要我们再去重复执行 flip() 了

```java
// String to ByteBuffer
ByteBuffer buffer = ByteBuffer.allocate(10);
buffer.put("hello".getBytes());

// ByteBuffer to String
buffer.flip();
String str = StandardCharsets.UTF_8.decode(buffer).toString(); // hello
```

# Scattering Reads

将一个 File 的数据分散读取到多个 Buffer 中

```java
try (FileChannel channel = new RandomAccessFile("test.txt", "r").getChannel()) {
    ByteBuffer b1 = ByteBuffer.allocate(3);
    ByteBuffer b2 = ByteBuffer.allocate(3);
    ByteBuffer b3 = ByteBuffer.allocate(5);
    channel.read(new ByteBuffer[]{b1, b2, b3});
    b1.flip();
    b2.flip();
    b3.flip();
    System.out.println(StandardCharsets.UTF_8.decode(b1)); // one
    System.out.println(StandardCharsets.UTF_8.decode(b2)); // two
    System.out.println(StandardCharsets.UTF_8.decode(b3)); // three
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

# Gathering Writes

将多个 Buffer 的数据集中写入到一个 File 中

```java
try (FileChannel channel = new RandomAccessFile("test.txt", "rw").getChannel()) {
    ByteBuffer b1 = StandardCharsets.UTF_8.encode("one");
    ByteBuffer b2 = StandardCharsets.UTF_8.encode("two");
    ByteBuffer b3 = StandardCharsets.UTF_8.encode("three");
    channel.write(new ByteBuffer[]{b1, b2, b3});
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

# Packet Problem

粘包 (Sticky Packet) 发生在接收数据时, 多个数据包粘合在一起作为一个数据包进行处理的现象. 这是因为 TCP 为了效率, 可能会将多个小的数据包合并为一个大的数据包进行发送, 或者接收方在读取数据时, 一次读取操作读到了多个数据包的数据

半包 (Partial Packet) 发生在接收数据时, 一个数据包被分成了多个部分进行接收的现象. 这可能是因为数据包太大, 超过了接收缓冲区的大小, 或者接收方读取数据的速度不够快, 导致一个完整的数据包被拆分成了多次读取操作

Sticky Packet 和 Partial Packet 需要在应用层解决, 可以通过下面这些方式解决

- 固定长度: 每个数据包固定长度, 不足部分可以用空字节填充
- 分隔符: 在数据包之间添加特殊的分隔符来区分不同的数据包
- 长度字段: 在数据包的头部加上长度字段, 指明数据包的长度

```java
public static void main(String[] args) throws IOException {
    ByteBuffer buf = ByteBuffer.allocate(100);
    buf.put("Hi, I'am harvey\n I'm bruce\n I'm Ja".getBytes());
    split(buf);
    buf.put("ck\n".getBytes());
    split(buf);
}

public static void split(ByteBuffer src) {
    src.flip();
    for (int i = 0; i < src.limit(); i++) {
        if (src.get(i) == '\n') {
            // p         i  i+1
            // 0 1 2 3 4 5
            // a b c d e \n
            int len = i + 1 - src.position();
            ByteBuffer tar = ByteBuffer.allocate(len);
            for (int j = 0; j < len; j++) {
                tar.put(src.get());
            }
            ByteBufferUtil.debugAll(tar);
        }
    }
    src.compact();
}
```

```txt
position: [16], limit: [16]
+--------+-------------------------------------------------+----------------+
|00000000| 48 69 2c 20 49 27 61 6d 20 68 61 72 76 65 79 0a |Hi, I'am harvey.|
+--------+-------------------------------------------------+----------------+

position: [11], limit: [11]
+--------+-------------------------------------------------+----------------+
|00000000| 20 49 27 6d 20 62 72 75 63 65 0a                | I'm bruce.     |
+--------+-------------------------------------------------+----------------+

position: [10], limit: [10]
+--------+-------------------------------------------------+----------------+
|00000000| 20 49 27 6d 20 4a 61 63 6b 0a                   | I'm Jack.      |
+--------+-------------------------------------------------+----------------+
```

# Transfer

FileChannel 的 transferTo() 和 transferFrom() 可以直接在两个通道之间高效地传输数据, 这可以用于快速地复制或移动文件的内容, 这两个方法利用了底层操作系统的零拷贝优化, 以减少数据从内核空间到用户空间的拷贝, 从而提高传输效率

```java
try (
    FileChannel src = new FileInputStream("src.txt").getChannel();
    FileChannel tar = new FileOutputStream("tar.txt").getChannel()
) {
    // long transferTo(long position, long count, WritableByteChannel target)
    src.transferTo(src.position(), src.size(), tar);
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

FileChannel 的 transferTo() 和 transferFrom() 可以传输的大小是有限制的, 一次最多只能传输 2G, 所以需要传输完整数据就修改写法

```java
try (
    FileChannel src = new FileInputStream("src.txt").getChannel();
    FileChannel tar = new FileOutputStream("tar.txt").getChannel()
) {
    long remaining = src.size();
    while (remaining > 0) {
        remaining -= src.transferTo(src.size() - remaining, remaining, tar);
    }
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

# Directory Traversal

通过 Files.walkFileTree() 遍历一个目录及其所有子目录中的文件, 统计目录数量和文件数量

```java
AtomicInteger countFile = new AtomicInteger();
AtomicInteger countDirc = new AtomicInteger();
Files.walkFileTree(Paths.get("/Users/HarveySuen/Downloads"), new SimpleFileVisitor<Path>() {
    @Override
    public FileVisitResult preVisitDirectory(Path dirc, BasicFileAttributes attrs) throws IOException {
        System.out.println("Dirc: " + dirc);
        countDirc.incrementAndGet();
        return super.preVisitDirectory(dirc, attrs);
    }
    
    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
        System.out.println("File: " + file);
        countFile.incrementAndGet();
        return super.visitFile(file, attrs);
    }
});
System.out.println(countDirc);
System.out.println(countFile);
```

通过 Files.walkFileTree() 统计 txt 文件

```java
AtomicInteger countTxtFile = new AtomicInteger();
Files.walkFileTree(Paths.get("/Users/HarveySuen/Downloads"), new SimpleFileVisitor<Path>() {
    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
        if (file.toString().endsWith(".txt")) {
            System.out.println("File: " + file);
            countTxtFile.incrementAndGet();
        }
        return super.visitFile(file, attrs);
    }
});
System.out.println(countTxtFile);
```

直接通过 Files.delete() 无法删除带有文件的目录, 可以通过 Files.walkFileTree() 先删除文件, 再删除文件夹

```java
Files.walkFileTree(Paths.get("/Users/HarveySuen/Downloads/temp/"), new SimpleFileVisitor<>() {
    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
        System.out.println("Delete the file: " + file);
        Files.delete(file);
        return super.visitFile(file, attrs);
    }
    
    @Override
    public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
        System.out.println("Delete the dir: " + dir);
        Files.delete(dir);
        return super.postVisitDirectory(dir, exc);
    }
})
```

```txt
Delete the file: /Users/HarveySuen/Downloads/temp/.DS_Store
Delete the file: /Users/HarveySuen/Downloads/temp/test1/test1.txt
Delete the file: /Users/HarveySuen/Downloads/temp/test1/test2.txt
Delete the file: /Users/HarveySuen/Downloads/temp/test1/test3.txt
Delete the dir: /Users/HarveySuen/Downloads/temp/test1
Delete the file: /Users/HarveySuen/Downloads/temp/test2/test1.txt
Delete the file: /Users/HarveySuen/Downloads/temp/test2/test2.txt
Delete the file: /Users/HarveySuen/Downloads/temp/test2/test3.txt
Delete the dir: /Users/HarveySuen/Downloads/temp/test2
Delete the dir: /Users/HarveySuen/Downloads/temp
```

通过 Files.walk() 拷贝多级目录

```java
String src = "/Users/HarveySuen/Downloads/src";
String tar = "/Users/HarveySuen/Downloads/tar";
Files.walk(Paths.get(src)).forEach((srcPath) -> {
    try {
        Path tarPath = Path.of(srcPath.toString().replace(src, tar));
        if (Files.isDirectory(srcPath)) {
            Files.createDirectories(tarPath);
        } else if (Files.isRegularFile(srcPath)) {
            Files.copy(srcPath, tarPath);
        }
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
});
```

# Blocking Network IO

通过堵塞的方式处理客户端连接, 会导致一个客户端没有处理完, 后续的客户端请求卡住  [Explain](https://www.bilibili.com/video/BV1py4y1E7oA?p=22&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

- Server 在等待客户端连接和等待客户端可读可写时都会进入堵塞, 如果 Client A 连接 Server 后, 一直不触发可读可写事件, 就会一直堵塞, Client B 也无法连接 Server

```java
public class Server {
    public static void main(String[] args) throws IOException {
        ByteBuffer buf = ByteBuffer.allocate(16);
        ServerSocketChannel ssc = ServerSocketChannel.open();
        ssc.bind(new InetSocketAddress(8080));
        List<SocketChannel> channels = new ArrayList<>();
        while (true) {
            // 堵塞, 等待客户端连接
            System.out.println("connection...");
            SocketChannel sc = ssc.accept();
            System.out.println("connected..." + sc);
            channels.add(sc);
            for (SocketChannel channel : channels) {
                System.out.println("reading...");
                // 堵塞, 等待客户端可读
                channel.read(buf);
                buf.flip();
                ByteBufferUtil.debugAll(buf);
                buf.clear();
            }
        }
    }
}
```

```java
public class Client {
    public static void main(String[] args) throws IOException {
        SocketChannel sc = SocketChannel.open();
        sc.connect(new InetSocketAddress("127.0.0.1", 8080));
        sc.write(StandardCharsets.UTF_8.encode("hello world"));
        sc.close();
    }
}
```

# Non-Blocking Network IO

通过 configureBlocking(false) 就可以将 SocketChannel 设置为非堵塞的模式, 通过非堵塞循环的方式处理请求, 就不会因为 Client A 一直不触发可读可写事件而导致 Client B 一直等待的情况  [Explain](https://www.bilibili.com/video/BV1py4y1E7oA?p=25&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public class Server {
    public static void main(String[] args) throws IOException {
        ByteBuffer buf = ByteBuffer.allocate(16);
        ServerSocketChannel ssc = ServerSocketChannel.open();
        // 设置 ServerSocketChannel 为非堵塞模式
        ssc.configureBlocking(false);
        ssc.bind(new InetSocketAddress(8080));
        List<SocketChannel> channels = new ArrayList<>();
        while (true) {
            // 非堵塞, 循环等待客户端连接
            SocketChannel sc = ssc.accept();
            if (sc != null) {
                System.out.println("connected..." + sc);
                // 设置 SocketChannel 为非堵塞模式
                sc.configureBlocking(false);
                channels.add(sc);
            }
            
            for (SocketChannel channel : channels) {
                // 非堵塞, 循环等待客户端可读
                int read = channel.read(buf);
                if (read > 0) {
                    System.out.println("readed..." + read);
                    buf.flip();
                    ByteBufferUtil.debugAll(buf);
                    buf.clear();
                }
            }
        }
    }
}
```

# New Network IO

Selector 允许单个线程处理多个 Channel 的 IO 事件, 类似于 Multiplexing IO, 这种机制提高了网络应用的效率和性能  

- 通过 selector.select() 去监听 IO 事件, 如果 Channel 有就绪的 IO 事件就会将事件封装成 SelectionKey 存储到 Set 中, 后续只需要遍历该 Set 去处理事件即可
- 每个 IO 操作都采用非堵塞的方式进行处理, 当没有可读可写的数据时, 就会立即返回, 不会一直堵塞

通过 Selector 监控一个或多个非阻塞模式的 Channel, 并且指定每个 Channel 需要关注的事件 (eg: OP_ACCEPT, OP_CONNECT, OP_READ, OP_WRITE)

```java
SelectionKey key = channel.register(selector, SelectionKey.OP_READ | SelectionKey.OP_WRITE);
```

通过 Selector 实现高效的 Network IO [Explain](https://www.bilibili.com/video/BV1py4y1E7oA?p=27&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public class Server {
    public static void main(String[] args) throws IOException {
        ServerSocketChannel ssc = ServerSocketChannel.open();
        ssc.bind(new InetSocketAddress(8080));
        ssc.configureBlocking(false);
        
        // 通过 Selector 来管理多个 channel
        Selector selector = Selector.open();
        // 注册 SocketChannel 到 Selector 上, 封装为 SelectionKey 存储到 SelectionKey[] 中, 后续通过 SelectionKey 处理 Event
        // SelectionKey register(Selector sel, int ops)
        //   ops: OP_ACCEPT, OP_CONNECT, OP_WAITE, OP_READ
        SelectionKey sscKey = ssc.register(selector, SelectionKey.OP_ACCEPT);
        
        while (true) {
            // 如果没有 Event 发生, 就会堵塞, 如果有 Event 就会将 Event 封装成 SelectionKey 存储到 Set<SelectionKey> selectedKeys 中
            selector.select();
            // 遍历 Set<SelectionKey> 处理 Event
            Iterator<SelectionKey> iter = selector.selectedKeys().iterator();
            while (iter.hasNext()) {
                // 获取 SelectionKey, 根据 Event 类型, 处理 Event
                SelectionKey key = iter.next();
                
                // 将 SelectionKey 从 Set<SelectionKey> 中移除
                // 如果一直不将 SelectionKey 从 Set<SelectionKey> 中移除, 就会导致下次循环依旧需要去处理该 SelectionKey, 而如果 SelectionKey 已经处理完
                iter.remove();
                
                // Server 的 SocketChannel 触发了 Accept Event, 即 Client 想要建立连接
                if (key.isAcceptable()) {
                    // 这里的 key 就是上面的 sscKey, key.channel() 就是上面的 ServerSocketChannel
                    ServerSocketChannel channel = (ServerSocketChannel) key.channel();
                    // sc 就是请求连接的 Client 的 SocketChannel (这两行其实可以通过 ssc.accept() 来代替)
                    SocketChannel sc = channel.accept();
                    sc.configureBlocking(false);
                    // 注册 Client 的 SocketChannel 到 selector 上, 并且关联一个 ByteBuffer 作为 Attachment
                    SelectionKey scKey = sc.register(selector, SelectionKey.OP_READ, ByteBuffer.allocate(16));
                }
                
                // Client 的 SocketChannel 触发了 Read Event
                else if (key.isReadable()) {
                    try {
                        SocketChannel channel = (SocketChannel) key.channel();
                        // 从 SelectionKey 中取出 Attachment
                        ByteBuffer buffer = (ByteBuffer) key.attachment();
                        int read = channel.read(buffer);
                        // 如果读不到数据了, 就应该将 SelectionKey 从 SelectionKey[] 中移除, 防止下次循环依会去处理该 SelectionKey
                        // 如果客户端异常断开, 还会触发一次读事件, 所以这里通过 if (read == -1) 可以有效防止空读现象
                        if (read == -1) {
                            // 调用 channel.close() 将 SelectionKey 从 SelectionKey[] 和 Set<SelectionKey> 中移除, 并且关闭连接的 SocketChannel
                            // 调用 key.cancel() 将 SelectionKey 从 SelectionKey[] 中移除, 但不会关闭连接的 SocketChannel
                            key.cancel();
                        }
                        // 如果读到了数据
                        else {
                            // 处理 Packet Problem
                            split(buffer);
                            // 如果读取的内容过长, 超出了 ByteBuffer 的 capacity 也没有遇到 '\n', split() 会执行 compact() 进行压缩, 压缩后 pos 就和 lim 指向了同一个位置, 此时进行扩容
                            if (buffer.position() == buffer.limit()) {
                                ByteBuffer bufferNew = ByteBuffer.allocate(buffer.capacity() * 2);
                                buffer.flip();
                                bufferNew.put(buffer);
                                key.attach(bufferNew);
                            }
                        }
                    } catch (IOException e) {
                        // 如果客户端异常断开, Open JDK 会抛出 IOException, Zulu JDK 不会抛出异常, 未来防止异常导致服务端程序崩溃, 这里捕获异常, 打印异常, 并且将 SelectionKey 从 SelectionKey[] 中移除
                        e.printStackTrace();
                        key.cancel();
                    }
                }
            }
        }
    }
    
    public static void split(ByteBuffer src) {
        src.flip();
        for (int i = 0; i < src.limit(); i++) {
            if (src.get(i) == '\n') {
                int len = i + 1 - src.position();
                ByteBuffer tar = ByteBuffer.allocate(len);
                for (int j = 0; j < len; j++) {
                    tar.put(src.get());
                }
                ByteBufferUtil.debugAll(tar);
            }
        }
        src.compact();
    }
}
```

# OP_ACCEPT Event

OP_ACCEPT: 当一个 ServerSocketChannel 在非阻塞模式下准备好接受一个新的客户端连接时, OP_ACCEPT 事件就会被触发, 这意味着如果有客户端尝试建立连接, Selector 会识别到这个 ServerSocketChannel 上的 OP_ACCEPT 事件

- OP_ACCEPT 通常用于服务器端, 用来接受客户端的连接请求
- OP_ACCEPT 事件被触发时, 服务器可以调用 ServerSocketChannel 的 accept() 来接受这个连接, 这将返回一个新的 SocketChannel 对象, 代表与客户端的连接

```java
ServerSocketChannel ssc = ServerSocketChannel.open();
ssc.configureBlocking(false);
ssc.bind(new InetSocketAddress(8080));

Selector sel = Selector.open();
serverChannel.register(sel, SelectionKey.OP_ACCEPT);

while (true) {
    sel.select();
    Iterator<SelectionKey> iter = sel.selectedKeys().iterator();
    while (iter.hasNext()) {
        SelectionKey key = iter.next();
        iter.remove();
        if (key.isAcceptable()) {
            SocketChannel sc = ssc.accept();
            sc.configureBlocking(false);
            // ...
        }
    }
}
```

# OP_CONNECT Event

OP_CONNECT: 当一个 SocketChannel 在非阻塞模式下成功连接到服务器时, OP_CONNECT 事件就会被触发, 这通常发生在客户端尝试连接服务器后, 连接过程完成时

- OP_CONNECT 主要用于客户端，用来监测连接请求的完成

```java
SocketChannel sc = SocketChannel.open();
sc.configureBlocking(false);
sc.connect(new InetSocketAddress("127.0.0.1", 8080));

Selector sel = Selector.open();
SelectionKey scKey = sc.register(sel, SelectionKey.OP_CONNECT);

while (true) {
    sel.select();
    Iterator<SelectionKey> iter = sel.selectedKeys().iterator();
    while (iter.hasNext()) {
        SelectionKey key = iter.next();
        iter.remove();
        if (key.isConnectable()) {
            SocketChannel channel = (SocketChannel) key.channel();
            // 由于是非堵塞模式, 所以 sc.connect() 可能还没执行完成, 就已经执行到了这一步, 即连接还没有成功建立, 所以必须调用 finishConnect() 方法来完成连接过程
            if (channel.finishConnect()) {
                // ...
            }
        }
    }
}
```

# OP_READ Event

OP_READ: 当 SocketChannel 中有新数据可读时, 即数据已经从远程端点发送过来并到达本地缓冲区, OP_READ 事件会被触发, 此时, 应用程序可以从 Channel 读取数据而不会阻塞

- OP_READ 事件触发后, 应该创建或准备一个 ByteBuffer, 然后使用 read() 从 SocketChannel 中读取数据, 继续读取直到没有更多数据可读或 read() 返回 -1, 表示连接已经被远程端点关闭

```java
ServerSocketChannel ssc = ServerSocketChannel.open();
ssc.configureBlocking(false);
ssc.bind(new InetSocketAddress(8080));

Selector sel = Selector.open();
serverChannel.register(sel, SelectionKey.OP_ACCEPT);

while (true) {
    sel.select();
    Iterator<SelectionKey> iter = sel.selectedKeys().iterator();
    while (iter.hasNext()) {
        SelectionKey key = iter.next();
        iter.remove();
        if (key.isReadable()) {
            SocketChannel sc = (SocketChannel) key.channel();
            ByteBuffer buf = ByteBuffer.allocate(1024); // 准备缓冲区
            int bytesRead = channel.read(buf); // 读取数据
            if (bytesRead == -1) {
                // 读取完数据或者连接已被远程关闭, 执行 channel.close() 或 key.cancel() 将 SelectionKey 从 SelectionKey[] 中移除
                key.cancel();
            } else {
                buffer.flip(); // 为数据处理做准备
                // 处理数据...
            }
        }
    }
}
```

无论客户端是正常断开还是异常断开, 都会触发一次 OP_READ, 即我们从 read() 中读取到的是 -1, 我们需要针对这种情况做额外的处理

```java
if (key.isReadable()) {
    try {
        SocketChannel channel = (SocketChannel) key.channel();
        // 从 SelectionKey 中取出 Attachment
        ByteBuffer buffer = (ByteBuffer) key.attachment();
        int read = channel.read(buffer);
        // 如果读不到数据了, 就应该将 SelectionKey 从 SelectionKey[] 中移除, 防止下次循环依会去处理该 SelectionKey
        // 如果客户端断开时, 还会触发一次读事件, 所以这里通过 if (read == -1) 可以有效防止空读现象
        if (read == -1) {
            // 调用 channel.close() 将 SelectionKey 从 SelectionKey[] 和 Set<SelectionKey> 中移除, 并且关闭连接的 SocketChannel
            // 调用 key.cancel() 将 SelectionKey 从 SelectionKey[] 中移除, 但不会关闭连接的 SocketChannel
            key.cancel();
        }
        // 如果读到了数据
        else {
            // 处理 Packet Problem
            split(buffer);
            // 如果读取的内容过长, 超出了 ByteBuffer 的 capacity 也没有遇到 '\n', split() 会执行 compact() 进行压缩, 压缩后 pos 就和 lim 指向了同一个位置, 此时进行扩容
            if (buffer.position() == buffer.limit()) {
                ByteBuffer bufferNew = ByteBuffer.allocate(buffer.capacity() * 2);
                buffer.flip();
                bufferNew.put(buffer);
                key.attach(bufferNew);
            }
        }
    } catch (IOException e) {
        // 如果客户端异常断开, Open JDK 会抛出 IOException, Zulu JDK 不会抛出异常, 未来防止异常导致服务端程序崩溃, 这里捕获异常, 打印异常, 并且将 SelectionKey 从 SelectionKey[] 中移除
        e.printStackTrace();
        key.cancel();
    }
}
```

# OP_WRITE Event

OP_WRITE: SocketChannel 准备好接受新数据写入了, 也就是说, 它的内部缓冲区有足够空间进行非阻塞写操作

- 因为大部分时间写通道都是准备好写入的, 所以 OP_WRITE 事件一般只在需要确认能够写入数据时才注册
- 通常只在写缓冲区满 (即上一次写操作没有完全成功) 时才注册 OP_WRITE 事件, 一旦 OP_WRITE 被触发, 你应该尝试再次写入之前未成功写入的数据, 数据完全写入后, 最好取消对 OP_WRITE 的监听, 以避免高 CPU 占用

```java
public class Server {
    public static void main(String[] args) throws IOException {
        ServerSocketChannel ssc = ServerSocketChannel.open();
        ssc.configureBlocking(false);
        ssc.bind(new InetSocketAddress(8080));
        
        Selector sel = Selector.open();
        SelectionKey sscKey = ssc.register(sel, SelectionKey.OP_ACCEPT, null);
        
        while (true) {
            sel.select();
            Iterator<SelectionKey> iter = sel.selectedKeys().iterator();
            while (iter.hasNext()) {
                SelectionKey key = iter.next();
                iter.remove();
                if (key.isWritable) {
                    SocketChannel sc = (SocketChannel) key.channel();
                    
                    // 模拟一份数据
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < 100000000; i++) {
                        sb.append("a");
                    }
                    ByteBuffer buf = StandardCharsets.UTF_8.encode(sb.toString());
                    
                    // SocketChannel 的大小是有限制的, 所以需要循环写入数据
                    while (buf.hasRemaining()) {
                        int len = sc.write(buf);
                        System.out.println(len);
                    }
                }
            }
        }
    }
}
```

如果服务器要发送大量的数据给客户端, 服务端需要循环调用 SocketChannel 的 write() 向网络通道写入数据, 有可能将网络通道写满了, 写满之后, 服务器就没法再写入了, 即可能后续多次写入的长度都是 0, 这个循环写入 0 的操作非常浪费资源, 需要进行优化

这里 int len = sc.write(buf) 写入的长度为 0 就是因为将通道写满了, 无法再写入了, 这种无效的写入非常没必要, 而且会一直占用着单线程的资源, 需要进行优化

```txt
261676
1120380
1455836
0
0
0
0
0
1619832
2618788
2463972
0
0
0
0
0
13808412
3495644
0
0
0
0
0
3700496
4527212
41752812
19920868
2193012
0
0
751272
309788
```

一次事件中没有处理完全部的写入操作, 可以再发送一次写事件进行二次写入, 通过 Attachment 的方式进行数据共享, 避免使用 while 循环写入, 高效利用资源

```java
if (key.isAcceptable()) {
    SocketChannel sc = ssc.accept();
    sc.configureBlocking(false);
    SelectionKey scKey = sc.register(sel, 0, null);
    scKey.interestOps(SelectionKey.OP_READ);
    
    // 准备一份大数据
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 100000000; i++) {
        sb.append("a");
    }
    ByteBuffer buf = StandardCharsets.UTF_8.encode(sb.toString());
    
    // 向客户端写入数据
    int len = sc.write(buf);
    System.out.println(len);
    
    // 如果没有写入完, 就将没写完的数据作为 Attachment 挂到 scKey 上, 并且添加一个 OP_WRITE Event, 在下次事件中处理
    if (buf.hasRemaining()) {
        scKey.interestOps(scKey.interestOps() + SelectionKey.OP_WRITE);
        scKey.attach(buf);
    }
} else if (key.isWritable()) {
    // 从 Attachment 中取出上次没有写完的数据, 再进行写入
    ByteBuffer buf = (ByteBuffer) key.attachment();
    SocketChannel sc = (SocketChannel) key.channel();
    int len = sc.write(buf);
    System.out.println(len);
    // 如果全部写完了, 就清除 Attachment 和 Write Event
    if (!buf.hasRemaining()) {
        key.attach(null);
        key.interestOps(key.interestOps() - SelectionKey.OP_WRITE);
    }
}
```

```txt
# 这次就没有产生大片的 0 了, 高效利用了资源

261676
932536
703888
12409868
46619588
28609772
3152076
3152076
1045248
1045248
1045248
1022776
```

# Multi Thread

NIO 采用 Multiplexing IO 的方式处理事件, 在单线程环境下不能处理耗时较久的任务, 只能处理耗时短的任务, 而且无法发挥 CPU 多核的优势, 所以需要进行优化

Boss Thread 去处理客户端连接的事件, 然后分配一个 Worker Thread 去处理该客户端的可读可写事件, 高效利用 CPU 的多核优势

```java
public class Server {
    public static void main(String[] args) throws IOException {
        ServerSocketChannel ssc = ServerSocketChannel.open();
        ssc.configureBlocking(false);
        ssc.bind(new InetSocketAddress(8080));
        
        Selector boss = Selector.open();
        SelectionKey bossKey = ssc.register(boss, SelectionKey.OP_ACCEPT, null);

        // 准备一批 Woker Thread, 这里就类似于一个线程池
        Worker[] workers = new Worker[4];
        for (int i = 0; i < workers.length; i++) {
            workers[i] = new Worker();
        }
        AtomicInteger idx = new AtomicInteger(0);
        
        while (true) {
            boss.select();
            Iterator<SelectionKey> iter = boss.selectedKeys().iterator();
            while (iter.hasNext()) {
                SelectionKey key = iter.next();
                iter.remove();

                // Boss Thread 就负责处理客户端的连接事件, 然后分配一个 Worker 去处理可读可写事件
                if (key.isAcceptable()) {
                    SocketChannel sc = ssc.accept();
                    sc.configureBlocking(false);
                    // 采用轮询的方式选择一个 Worker 去处理事件
                    workers[idx.getAndIncrement() % workers.length].register(sc);
                }
            }
        }
    }
    
    public static class Worker implements Runnable {
        private Selector selector;
        private AtomicBoolean isFirst = new AtomicBoolean(true);
        private ConcurrentLinkedQueue<Runnable> tasks = new ConcurrentLinkedQueue();
        
        public void register(SocketChannel sc) throws IOException {
            // 第一次进来时创建 selector
            if (isFirst.getAndSet(false)) {
                selector = Selector.open();
                new Thread(this).start();
            }
            
            // 通过 MQ 实现线程之间的通信, 通知 selector 去进行事件绑定
            tasks.offer(() -> {
                try {
                    sc.register(selector, SelectionKey.OP_READ);
                } catch (ClosedChannelException e) {
                    e.printStackTrace();
                }
            });
            // 子线程启动后, 没有绑定事件, 就会堵塞在 selector.select() 这一步, 需要我们手动唤醒 selector 去从 MQ 中获取消息进行事件绑定
            // 不需要担心 selector.wakeup() 在 selector.select() 之前执行导致无法唤醒的问题, wakeup() 唤醒的方式类似于 LockSupport 的 unpark(), 都是采用 permit 的方式进行唤醒
            selector.wakeup();
        }
        
        @Override
        public void run() {
            while (true) {
                try {
                    selector.select();
                    
                    // 通过 MQ 获取需要注册的事件进行注册
                    Runnable task = tasks.poll();
                    if (task != null) {
                        task.run();
                    }
                    
                    Iterator<SelectionKey> iter = selector.selectedKeys().iterator();
                    while (iter.hasNext()) {
                        SelectionKey key = iter.next();
                        iter.remove();
                        // 处理可读事件
                        if (key.isReadable()) {
                            SocketChannel channel = (SocketChannel) key.channel();
                            ByteBuffer buffer = ByteBuffer.allocate(16);
                            int len = channel.read(buffer);
                            if (len == -1) {
                                key.channel();
                            } else {
                                buffer.flip();
                                ByteBufferUtil.debugRead(buffer);
                            }
                        }
                        // 处理可写事件
                        else if (key.isWritable) {
                            // ...
                        }
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

# Zero Copy

传统 IO 进行下面这种读取本地文件, 再传输给客户端的操作, 涉及四次数据拷贝, 三次状态切换, 步骤非常繁琐

- 调用 read(), 从 User Space 切换为 Kernel Space, 从 Disk 读取数据到 Kernel Buffer 中
  - Java 本身并不具备 IO 读写能力, 因此需要从 Java 程序的 User Space 切换为 Kernel Space, 调用 Kernel 的 IO 函数实现 IO
  - 这里可以利用 DMA (Direct Memory Access) 来进行数据传输, 不需要 CPU 参与, 非常适合数据传输
- 从 Kernel Buffer 拷贝数据到 User Buffer 中, 从 Kernel Space 切换为 User Space
  - 这里无法利用 DMA 进行数据传输, 需要 CPU 参与
- 调用 write(), 从 User Buffer 拷贝数据到 Socket Buffer 中
  - 这里无法利用 DMA 进行数据传输, 需要 CPU 参与
- 从 Kernel Space 切换为 User Space, 从 Socket Buffer 拷贝数据到 NIC 中
  - 这里可以利用 DMA 来进行数据传输, 不需要 CPU 介入, 非常适合数据传输

```java
RandomAccessFile raf = new RandomAccessFile(new File("test.txt"), "r");
byte[] buf = new byte[16];
raf.read(buf);
socket.getOutputStream().write(buf);
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403201119803.png)

通过 DirectByteBuffer 进行优化, Java NIO 的 ByteBuffer.allocateDirect() 使用的是操作系统内存, 不同于 ByteBuffer.allocate() 使用的是 Java 内存, 总共涉及三次数据拷贝, 三次状态切换

- DirectByteBuffer 将堆外内存映射到 JVM 内存中来直接访问使用, 这块内存不受 JVM 垃圾回收的影响, 内存地址固定, 有助于 IO
- DirectByteBuffer Obj 只维护了内存的虚引用, 垃圾回收时, DirectByteBuffer Obj 被垃圾回收, 虚引用加入引用队列, 通过专门线程访问引用队列, 根据虚引用释放堆外内存

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403201119804.png)

Linux v2.1 提供了 sendFile() 可以进一步优化, 实现 Zero Copy, Java 对 sendFile() 又进行了一步封装得到 transferTo() 和 transferFrom() 方便我们使用, 总共涉及三次数据拷贝, 一次状态切换, 效率非常高了

- 调用 transferTo(), 从 User Space 切换为 Kernel Space, 使用 DMA 从 Disk 读取数据到 Kernel Buffer 中
- 使用 CPU 从 Kernel Buffer 拷贝数据到 Socket Buffer 中
- 使用 DMA 从 Socket Buffer 拷贝数据到 INC 中

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403201119805.png)

Linux v2.4 对 sendFile() 又进一步优化, 还是对于 Java 的 transferTo() 和 transferFrom(), 总共涉及两次数据拷贝, 一次状态切换, 效率拉满了

- 调用 transferTo(), 从 User Space 切换为 Kernel Space, 使用 DMA 从 Disk 读取数据到 Kernel Buffer 中
- 使用 DMA 从 Kernel Space 拷贝一些 Offset 和 Length 到 Socket Buffer 中, 这个过程几乎没有损耗
- 使用 DMA 从 Kernel Space 拷贝数据到 INC 中

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403201119806.png)

Zero Copy 并不是真正无拷贝, 而是不拷贝重复数据到 JVM 内存中, 适合小文件传输, 通过 DMA 减少 CPU 压力, 减少 CPU 缓存伪共享

# AIO

AIO (Asynchronous IO), 也称为 NIO.2, 是 JDK7 中引入的一种新的 IO模型, 是对 NIO 的扩展, 引入了异步通道的概念, 使得 IO 操作可以完全异步执行, 从而提高了大规模 IO 处理的性能和可伸缩性

AIO 中, 应用程序可以直接向操作系统发起 IO 请求, 并立即返回继续执行其他任务, 当 IO 操作完成后, 操作系统会通知应用程序

AIO 在 Windows 上的实现非常好, 但是在 Linux 上的实现就很糟糕了, Linux 的 AIO 本质上还是 Multiplexing IO, 所以下面的代码图个乐就行

```java
try (AsynchronousFileChannel channel = AsynchronousFileChannel.open(Paths.get("test.txt"), StandardOpenOption.READ)) {
    ByteBuffer bufferDist = ByteBuffer.allocate(16);
    ByteBuffer bufferAttach = ByteBuffer.allocate(16);

    System.out.println("bf reading...");

    // void read(ByteBuffer dst, long position, A attachment, CompletionHandler<Integer,? super A> handler)
    channel.read(bufferDist, 0, bufferAttach, new CompletionHandler<Integer, ByteBuffer>() {
        @Override
        public void completed(Integer result, ByteBuffer attachment) {
            System.out.println("on reading..." + result);
            attachment.flip();
            ByteBufferUtil.debugAll(attachment);
            attachment.clear();
        }

        @Override
        public void failed(Throwable exc, ByteBuffer attachment) {
            exc.printStackTrace();
        }
    });

    System.out.println("af reading");
} catch (IOException e) {
    e.printStackTrace();
}

// AsynchronousFileChannel 的 read() 绑定的回掉函数是通过 Daemon Thread 执行的, 所以这里需要等待其执行完, 不然看不到输出结果
System.in.read();
```