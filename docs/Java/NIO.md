# NIO

Java NIO (New IO) 提供了 Channel 和 Selector, 通过他们配置可以实现 Multiplexing IO 的效果.

- Channel 相当于 IO Stream, 但支持非阻塞数据流的读写
- Selector 相当于 OS Level 的 Multiplexer, 可以注册多个 Channel, 并通过轮询方式检查哪个 Channel 的 IO 事件已经就绪, 从而实现高效处理多个连接

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403041142180.png)
