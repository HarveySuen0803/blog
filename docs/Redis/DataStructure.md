# SDS

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742538.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742539.png)

# IntSet

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

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742578.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742579.png)

# Set Encoding

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742580.png)

Set 刚开始存储的都是整数时, 会采用 IntSet 进行存储, 当要存储一个字符串时, 会先转换成 Dict, 再进行存储

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742581.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742582.png)

# ZSet Encoding

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742583.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742585.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742586.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742587.png)

# Hash

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742588.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742589.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742590.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221742591.png)

