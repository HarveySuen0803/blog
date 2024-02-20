# starter dependency

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>6.0.9</version>
</dependency>
```

# Java version

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241808962.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241808963.png)

```xml
<properties>
    <maven.compiler.source>20</maven.compiler.source>
    <maven.compiler.target>20</maven.compiler.target>
</properties>
```

# program args

## command Impl

通过 command 配置 program args

```shell
java -jar spring-demo1-0.0.1-SNAPSHOT.jar -Dserver.port=8001 --server.port=8002
```

## IDEA Impl

通过 IDEA 配置 program args

![image-20230602223947423](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241808964.png)

- VM options 配置 Java attrs (eg. -Dserver.prot=8001)
- Program arguments 配置 cmd args (eg. --server.port=8002)

# Spring config

通过 program args 配置 Spring config

```shell
java -jar spring-demo1-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

