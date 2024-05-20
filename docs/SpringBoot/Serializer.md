# @JsonFormat

添加 Jackson 依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.15.2</version>
</dependency>
```

可以在实体类中的日期字段上使用 ﻿`@JsonFormat` 注解来指定日期格式。这个注解可以直接用于日期类型的属性上，控制序列化输出和反序列化输入的格式。

```java
@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
private LocalDateTime createTime;
```

输出结果：

```json
{
    "createTime": "2023-08-13 12:35:24"
}
```
