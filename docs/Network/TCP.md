# TCP

TCP (Transmission Control Protocol) 是互联网协议套件的主要协议之一, 提供了在通过 IP 网络通信的主机上运行的应用程序之间的可靠, 有序和错误检查的字节流传输. TCP 是 TCP/IP 套件的传输层的一部分, SSL/TLS 经常在 TCP 上运行. 诸如万维网, 电子邮件, 远程管理和文件传输等主要的互联网应用都依赖于 TCP.

# 3-Way Handshake

TCP 的三次握手, 是建立 TCP 连接的重要过程, 以保证连接的双向通信

- Client 发送 SYN 给 Server, 表示要建立连接, Client 切换状态为 SYN_SEND
- Server 接受到 SYN 后, 返回 SYN 和 ACK 给 Client, Server 切换状态为 SYN_RCVD
- Client 接受到 SYN 和 ACK 后, 返回 ACK 给 Server, Client 切换状态为 ESTABLISHED. Server 接受到 ACK 后, Server 切换状态为 ESTABLISHED, 完成 TCP 的三次握手, 可以开始传输数据了

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402151439103.png)

TCP 的三次握手以最少的通信次数确认了双方的接收和发送能力是否正常, 确认了双方的初始序列号以便后续的数据传输

如果只进行两次握手, 就会因为网络延迟导致的 Client 和 Server 的连接状态不一致

- Client 发送 SYN1 给 Server, 但因为网络延迟没有到达 Server, 于是 Client 又发送一个 SYN2 给 Server
- Server 接受到 SYN2 后, 返回 SYN2 和 ACK2 给 Client 建立 Connection2
- 等 SYN1 到达 Server 后, Server 会以为是 Client 想要建立 Connection1, 于是返回一个 ACK1 给 Client, 在 Server 视角会认为已经建立了两个连接
- Client 接受到 SYN1 和 ACK1 后, 会判断该连接失败, 在 Client 视角会认为只建立一个连接

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402151451792.png)

# 4-Way Wavehand

TCP 的四次挥手是指在 TCP 连接中, Client 和 Server 中任意一方在数据传输结束后, 想要结束连接, 就务器必须要做的四个动作

- Client 发送 FIN 给 Server, 表示要关闭连接, Client 切换状态为 FIN_WAIT_1
- Server 接受到 FIN 后, 返回 ACK 给 Client, Server 切换状态为 CLOSE_WAIT, 在这个过程中, Server 还可以发送数据给 Client, Server 发送完数据后, 发送 FIN 给 Client, Server 切换状态为 LAST_ACK
- Client 接受到 FIN 后, 返回 ACK 给 Server, Client 切换状态为 TIME_WAIT, 在这过程中, Client 会进入等待, 防止 Server 没有接受到刚才的 ACK 重新发送 FIN 要求结束, Client 等待两倍的 MSL 的时间后没有重新接受到 FIN, 就会切换状态为 CLOSED
- Server 接受到 ACK 后, 直接切换状态为 CLOSED

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402151515308.png)

# SYN, FIN, ACK

SYN (Synchronize), FIN (Finish) 和 ACK (Acknowledgment) 是 TCP 用于建立连接和确认数据包成功到达的标志位, 本质上 TCP 的数据包 Segment 在二进制位上做一些标识来标识的

SYN 和 FIN 会在 Sequence Number 中存储一个随机的数字 x, Node1 发送给 Node2 后, Node2 需要返回一个 ACK, ACK 会在 Acknowledgment Number 中存储 x+1, Node1 接受到 Segment 后, 去判断是否返回正确, 从而实现一次握手

- Sequence Number 可以处理乱序问题, Sequence Number 是顺序递增的, 可以确认 Segment 的顺序
- Sequence Number 可以处理丢包问题, 一个数据是被切分成多个数据包的, 如果因为网络问题丢包了, 就可以通过 Sequence Number 确认少的是哪一个包, 重新向对方申请这个包即可

# SYN Flood

SYN Flood 是一种常见的 DoS 攻击, 它通过 Client 大量伪造 IP 发送 SYN 给 Server，Server 需要返回 SYN 和 ACK 给 Client, 而 Client 又不回复 Server, 就会导致 Server 有大量的连接处于 SYN_RCVD 状态, 这些 Half-Open Connection 会一直占用 Half-Open Connection Queue, 当 Queue 满后, 就无法处理正常的请求连接了

# RTT

RTT (Round Trip Time) 表示往返延迟, 是指一个信号被发送出去到收到确认该信号已被接收的总时间. 这个时间延迟包括了两个通信端点之间的路径传播时间. 在计算机网络的语境中, 这个信号通常是一个数据包. RTT 也被称为 ping 时间, 可以通过 ping 确认. RTT 的一半通常被近似计算为端到端的延迟

# TFO

TFO (TCP Fast Open) 是对 TCP 的一种简化握手流程的拓展, 用于提高两端点间连接的打开速度

- Client 发送 SYN 给 Server, 通过一个标识符表示要开启 Fast Open
- Server 接受到 SYN 后, 不仅返回 SYN 和 ACK, 还会返回一个 Cookie 给 Client
- Client 接受到 SYN 和 ACK 后, 返回 ACK 给 Server 完成三次握手后, 存储 Cookie 到本地, 后续请求都携带这个 Cookie, Server 只需要校验 Cookie 是否正确, 既可以直接进入连接状态, 不需要三次握手了

TFO 在后续的每次请求中都会少一个 RTT, 效率提升很多

TFO 能有效解决 SYN Flood, Server 接受到 SYN 后, 会去检查是否携带 Cookie, 如果没有 Cookie 就不会再进行后续的三次握手了

TFO 存在一定安全风险, TFO 默认不会对结果的 TCP 连接提供任何形式的加密保护, 也不对端点进行身份保证, 如果需要这类防护, 可以与 TLS 或 IPsec 这样的加密协议组合使用

# MSL

MSL (Maximum Segment Life) 指的是网络数据包 (Segment) 在网络中可能存在的最长寿命, MSL 定义了一个数据包从发送到不能再被使用也就是丢弃所需的时间, 这是为了防止网络中的数据包过多导致网络拥塞, 数据包超过 MSL 时限后, 将被自动丢弃

TCP 中, MSL 常常关联到 TIME_WAIT 状态, 当一个 TCP 连接关闭后, 为了保证确保最后的 ACK 确认包能够成功送达, 或是为了避免已经关闭的连接的延迟数据包在新的连接中被错误处理, TCP 会进入一种叫做 TIME_WAIT 的状态, 并等待 2 倍的 MSL 时长, 这样设定的原因是要让网络中该连接两端可能存在的任何数据包都在网络中消失