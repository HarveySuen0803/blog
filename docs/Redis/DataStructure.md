# DataStructure

Redis 的 DB 通过 RedisDB 这个结构体实现

RedisDb 的 Dict* dict 存储了所有的 Key-Val, dict 的 Key 就对应 Key-Val 的 Key, dict 的 Val 就是一个 RedisObject, RedisObject 内部有一个 ptr 指向具体存储 Val 的不同数据结构

RedisDb 的 Dict* expires 存储所有 Key 的 Expiration, 根据 hash(key) % dict.size() 存储 Entry 到 Dict* dict 

# SDS

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742538.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742539.png)

# IntSet

IntSet 将所有整数元素保存在一个整数数组中，并且数组中的元素永远是有序的。当我们需要增删改查元素时，IntSet可以利用二分法快速地找到目标元素，大大提升了效率。

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742540.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742541.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742543.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742544.png)

# Dict

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742545.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742546.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742547.png)

# Dict Expand Size

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742548.png)

# Dict Shrink Size

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742549.png)

# Dict Rehash

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742550.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403120818117.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742551.png)

# ZipList

Dict 使用的内存不连续, 通过指针指向内存, 存在大量的内存碎片, 非常浪费内存, ZipList 非常节省内存

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742552.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742553.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742554.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742555.png)

# ZipList Encoding

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742556.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742557.png)

# ZipList Chaining Update

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742558.png)

# QuickList

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742559.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742560.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742561.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742562.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742563.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742564.png)

# SkipList

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742565.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742566.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742567.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742568.png)

# RedisObject

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742569.png)

# RedisObject Type

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742570.png)

# RedisObject Encoding

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742571.png)

# String Encoding

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742572.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742573.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742574.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742575.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742576.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742577.png)

查看 Encoding

```
OBJECT ENCODING k1
```

# List Encoding

List 使用了 Ziplist 和 LinkedList

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742578.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742579.png)

# Set Encoding

Set 刚开始存储的都是整数时, 会采用 IntSet 进行存储, 当要存储一个字符串时, 会先转换成 Dict, 再进行存储

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742580.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742581.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742582.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403122034993.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403122035402.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403122035604.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403122035513.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403122034531.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403122037829.png)

# ZSet Encoding

ZSet 是由 Ziplist, Skiplist, Dict 实现的

向一个 ZSet（Sorted Set） 中添加数据时，Redis 需要同时在 HashTable 和 SkipList 中添加对应的数据。

- Redis 首先会在 HashTable 中添加一组键值对，其中键是要添加的成员（也就是元素），值是这个成员对应的分数（score）
- 然后，Redis 会在 SkipList 中按照 score 的大小插入一个节点，这个节点包括了成员和分数

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742583.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742585.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742586.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742587.png)

# Hash Encoding

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742588.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742589.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742590.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742591.png)

# Bitmap Encoding

Bitmap 本质上可以抽象为一个数组, 每个索引位上存储 0 或 1, 

Bitmap 是通过 SDS 实现的, char buf[] 存储的最小单位是 1B, 每次操作二进制位就是在操作这 1B 的数据, SETBIT k1 10 1 就是在操作 buf[1] 的 1B 数据, 10 对应到第二个字节嘛
