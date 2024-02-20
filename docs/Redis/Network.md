# Network Model

Server Socket 注册 FD 到 EventLoop 上 (epoll 实例)

通过 Connection Acceptance Handler 处理 Server Socket 的可读事件, Client Socket 连接到 Server Socket, Server Socket 会发送请求后, 就会触发 Handler, 将 Client 的 FD 注册到 EventLoop. Server Socket 注册 FD 之后, 就会立刻绑定 Connection Acceptance Handler

通过 Command Request Handler 处理 Client Socket 的可读事件, Client Socket 发送请求后, 就会触发 Handler, 封装一个 Client Obj, 先将请求数据写入 c->queryBuf 中, 再解析 c->queryBuf 的数据转换成命令, 将命令的执行结果写入到 c->buf 和 c->reply 中, 再将这个 Client Obj 塞入 server.clients_pending_write 中. Client Socket 注册 FD 之后, 就会立刻绑定 Command Request Handler 

通过 Command Reply Handler 读取 server.clients_pending_write 中的 Client Obj, 将数据写入到 Client Socket, 完成响应. 在调用 epoll_wait() 之前, 会调用 beforeSleep() 遍历 server.clients_pending_write 给所有的 Client Obj 绑定 Command Reply Handler

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401021459048.png)

# RESP

Redis Client 和 Redis Server 之间通信需要遵守 RESP, 现在主流使用的是 RESP2, 虽然 RESP3 非常强悍, 但是兼容性较差, 没有广泛使用

RESP 中, 通过 Prefix 来区分不同的数据类型, 下面是常用的几种数据类型

- Simple Strings, 以 `+` 开头, 以 `\r\n` 结尾 (eg: `+OK\r\n`)
- Errors, 以 `-` 开头, 以 `\r\n` 结尾 (eg: `-Error Message\r\n`)
- Integers, 以 `:` 开头, 以 `\r\n` 结尾 (eg: `:10\r\n`)
- Bulk Strings, 以 `$` 开头, 后面跟一个数字表示字符串的长度 (eg: `$6\r\nfoobar\r\n`)
- Arrays, 以 `*` 开头, 后面跟一个数字表示元素个数 (eg: `set k1 v1` 就是 `*3\r\n$3\r\nset\r\n$2\r\nk1\r\n$2\r\nv1\r\n`)

# Simple Redis Client

```java
Socket socket = new Socket("127.0.0.1", 6379);

OutputStream outputStream = socket.getOutputStream();

String command = "";

command = "*2\r\n$4\r\nauth\r\n$3\r\n111\r\n";
outputStream.write(command.getBytes());

command = "*3\r\n$3\r\nSET\r\n$2\r\nk1\r\n$2\r\nv1\r\n";
outputStream.write(command.getBytes());

BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));

String response = reader.readLine();
System.out.println("Response from Redis: " + response);

socket.close();
```
