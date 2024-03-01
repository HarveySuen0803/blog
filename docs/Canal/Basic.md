# Canal

Canal 阿里巴巴开源的一种基于数据库增量日志解析的数据同步工具, 主要用于 MySQL 数据库的 Binlog 增量订阅和消费

Canal 会模拟 MySQL Slave 的交互协议, 伪装自己为 MySQL Slave, 向 MySQL Master 发送 dump 协议




Canal 是阿里巴巴开源的一种基于数据库增量日志解析的数据同步工具，主要用于 MySQL 数据库的 Binlog 增量订阅和消费。
Canal 工作机制可以简述为：
	1.	模拟Slave：Canal 模拟 MySQL Slave 的交互协议，伪装自己为 MySQL Slave，向 MySQL Master 发送dump 协议。
	2.	解析binary log事件：MySQL Master 收到 dump 请求后，开始推送 binary log 给 Slave (即 Canal)。Canal 解析 binary log 对象成原始的 SQL 语句。
	3.	提供增量数据订阅和消费：应用程序通过 Canal 提供的 Client-Server模式或MQ模式，订阅 Canal 中解析的增量数据进行消费。
这样，我们就实现了MySQL的任何数据变动，Canal 都能监听到并提供给客户端进行处理。在实际应用中，Canal 通常用于数据同步，譬如同步MySQL数据到搜索引擎、缓存、其他数据库，或者用于实时数据分析等等。


# Canal Server

Pull Canal image

```shell
sudo docker image pull canal/canal-server:v1.1.7
```

Set volume for Canal

```shell
sudo docker volume create canal-config
sudo docker volume create canal-log
sudo docker volume create canal-plugin

sudo mkdir -p /opt/canal

sudo ln -s /var/lib/docker/volumes/canal-config/_data /opt/canal/config
sudo ln -s /var/lib/docker/volumes/canal-log/_data /opt/canal/log
sudo ln -s /var/lib/docker/volumes/canal-plugin/_data /opt/canal/plugin
```

Startup Canal

```shell
sudo docker container run \
    --name canal \
    --restart always \
    --privileged \
    -p 11111:11111 \
    -e canal.destinations=example \
    -e canal.instance.master.address=192.168.10.41:3306  \
    -e canal.instance.dbUsername=canal  \
    -e canal.instance.dbPassword=canal  \
    -e canal.instance.connectionCharset=UTF-8 \
    -e canal.instance.tsdb.enable=true \
    -e canal.instance.gtidon=false  \
    -v canal-config:/home/admin/canal-server/conf \
    -v canal-log:/home/admin/canal-server/logs \
    -v canal-plugin:/home/admin/canal-server/plugin \
    -d canal/canal-server:v1.1.7
```

Set Canal config (file: /opt/canal/config/example/instance.properties)

```properties
# MySQL address
canal.instance.master.address=127.0.0.1:3306

# MySQL user
canal.instance.dbUsername=canal
canal.instance.dbPassword=canal
```

```shell
sudo docker container restart canal
```

# Canal Client

Set binlog in MySQL (file: my.cnf)

```
[mysqld]
log-bin=mysql-bin
binlog-format=row
server_id=1
```

Check binlog status

```sql
show variables like 'binlog_format';
show variables like 'log_bin';
show master status;
```

Create a canal user in MySQL

```sql
create user 'canal'@'%' identified by 'canal';
grant all privileges on *.* to 'canal'@'%';
flush privileges;
```

Import dependency

```xml
<dependency>
    <groupId>top.javatool</groupId>
    <artifactId>canal-spring-boot-starter</artifactId>
    <version>1.2.1-RELEASE</version>
</dependency>
```

Set properties

```properties
canal.destination=example
canal.server=127.0.0.1:11111
```

Set DTO

```java
@Data
@TableName("user")
public class UserDTO {
    // Mark the primary key
    @Id
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String name;
    
    // Mark fields that do not exist
    @Transient
    private deleted
}
```

Set listener

```java
@Slf4j
@Component
@CanalTable("user")
public class UserHandler implements EntryHandler<UserDO> {
    @Override
    public void insert(UserDO user) {
        log.info("insert message  {}", user);
    }
    
    @Override
    public void update(UserDO before, UserDO after) {
        log.info("update before {} ", before);
        log.info("update after {}", after);
    }
    
    @Override
    public void delete(UserDO user) {
        log.info("delete  {}", user);
    }
}
```

