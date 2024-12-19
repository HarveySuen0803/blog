### NTP

NTP（Network Time Protocol，网络时间协议）是用来同步计算机时间的网络协议，设计目的是在分布式网络中为所有设备提供精确和一致的时间。

- 目标：使计算机时钟同步到 UTC（协调世界时）。
- 层次结构：NTP 采用层次化结构，分为多个“层”（stratum），第 0 层为时间源（如原子钟、GPS），第 1 层通过第 0 层同步，依此类推。

NTP 的工作原理

1. 时间服务器与客户端模型

- NTP 客户端通过网络向时间服务器发送请求，服务器返回精确时间。
- 客户端根据网络延迟和时间差调整本地时间。

3. 时钟层次

- Stratum 0：物理时钟（如 GPS、原子钟），无法直接连接到网络。
- Stratum 1：通过直接连接 Stratum 0 获得时间的服务器。
- Stratum 2+：通过同步更高层次的服务器获得时间，层次越高，精确度越低。

3. 算法修正

- NTP 不仅传递时间，还通过复杂算法（如延迟、抖动、偏移计算）来校正时间。

NTP 协议运行在 UDP 协议之上，使用固定端口 123。报文的关键字段包括：

- LI (Leap Indicator)：表示闰秒调整。
- Stratum：当前服务器的层次。
- Reference Timestamp：上次同步的时间戳。
- Transmit Timestamp：发送请求的时间戳。

NTP 时间同步过程：

- 客户端向服务器发送请求，记录发送时间  T_1 。
- 服务器收到请求时记录接收时间  T_2 ，随后处理并记录响应发送时间  T_3 。
- 客户端收到响应时记录接收时间  T_4 。
- 通过这些时间戳，客户端可以计算以下值：
  - 偏移量 (Offset)：客户端时钟与服务器时钟的差值。
  - 往返延迟 (Delay)：请求和响应在网络中的总延迟。