# MyBatis

spring-boot-starter-jdbc 可以配置 DataSource, JdbcTemplate, Transaction

mybatis-spring-boot-autoconfigure 可以配置 SqlSessionFactory, SqlSessionTemplate

通过 MapperScannerRegister.class 扫描 pkg, 给 Mapper Interface 创建 proxy Obj 配置成 Bean

import dependency

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>3.0.1</version>
</dependency>
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

set datasource

```properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/db?serverTimezone=UTC&characterEncoding=utf8&useUnicode=true&useSSL=false&rewriteBatchedStatements=true
spring.datasource.username=root
spring.datasource.password=111
```

set Domain

```java
@Data
public class User {
    private Integer id;
    private String name;
    private Integer age;
    private String sex;
}
```

set Mapper Interface

```java
@Mapper
public interface UserMapper {
    public List<User> getUserList();
}
```

set Mapper XML 

```xml
<mapper namespace="com.harvey.mapper.UserMapper">
    <select id="selectAll" resultType="com.harvey.domain.User">
        select * from users;
    </select>
</mapper>
```

set Mapper XML location

```properties
mybatis.mapper-locations=classpath*:**/mapper/*Mapper.xml
```

Test

```java
@SpringBootTest
class SpringProjectApplicationTests {
    @Autowired
    private UserMapper userMapper;
    
    @Test
    void contextLoads() {
        List<User> userList = userMapper.getUserList();
    }
}
```

# MyBatis Process

- MyBatis 读取 XML, Annotation 和 Profile 加载 Env 和 Mapping File, 构建 SqlSessionFactory
    - SqlSessionFactory 全局唯一, 可以批量生产 SqlSession
- SqlSessionFactory 创建 SqlSession
    - SqlSession 包含需要执行的 SQL, 一次操作就是一个 SqlSession
- Executor 读取 MappedStatement, 封装 JDBC, 执行 DB Operation
    - MappedStatement 包含了各种信息 (eg: Resource Path, Mapper Id, SQL, ResultMaps)
    - Execturo 和 DB 交互时, 还需要转换 MappedStatement 的数据类型, 将 Java Type 转换为 DB Type, 操作 DB, 再将 DB Type 转换为 Java Type 操作 Java Obj

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221740211.png)

# Auto Camel Case Mapping

自动驼峰命名: 自动将 SQL 字段 的 user-name 转成 domain 属性 的 userName

```properties
mybatis.configuration.map-underscore-to-camel-case=true
```

# Mapper Location

```properties
mybatis.mapper-locations=classpath:/com/harvey/mapper/*.xml
```

# Hikari Connection Pool

Hikari 是 Spring 默认的连接池, 可以省略配置

```properties
spring.datasource.type=com.zaxxer.hikari.HikariDataSource
```

# Durid Connection Pool

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.16</version>
</dependency>
```

```properties
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
```

# Log

```properties
mybatis.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

# @ResultMap

```java
@Select("select * from users where id = #{id}")
@ResultMap("userResultMap")
User select(int id);
```

```xml
<resultMap id="userResultMap" type="com.harvey.domain.User">
    <id column="user_id" property="userId"/>
    <result column="user_name" property="userName"/>
    <result column="user_age" property="userAge"/>
</resultMap>
```

# @Results

```java
@Results({
        @Result(column = "user_name", property = "userName"),
        @Result(column = "user_age", property = "userAge")
})
@Select("select * from users where id = #{id}")
User select(int id);
```

# @One

User 和 IdCard 是 1:1 的关系, 需要使用 @One

这里调用 getUserById() 后, 就会自动调用指定的 getIdCardByUserId 查询 IdCard 填充数据到本次查询的 idCard Field 中

```java
@Select("SELECT * FROM user WHERE id=#{id}")
@Results({
    @Result(property = "id", column = "id"),
    @Result(property = "name", column = "name"),
    @Result(property = "idCard", column = "id", 
            one = @One(select = "com.example.mapper.IdCardMapper.getIdCardByUserId"))
})
User getUserById(@Param("id") Integer id);
```

# @Many

User 和 Order 是 1:n 的关系, 需要使用 @Many

这里调用 getUserById() 后, 就会自动调用指定的 getOrdersByUserId 查询 orders 填充数据到本次查询的 orders Field 中

```java
@Select("SELECT * FROM user WHERE id=#{id}")
@Results({
    @Result(property = "id", column = "id"),
    @Result(property = "name", column = "name"),
    @Result(property = "orders", column = "id", 
            many = @Many(select = "com.example.mapper.OrderMapper.getOrdersByUserId"))
})
User getUserById(@Param("id") Integer id);
```

# acheive simple param

```java
User selectByCondition(@Param("username") String name, Integer password);
```

```java
User user = userMapper.selectByCondition("sun", "111");
```

# achieve Domain param

```java
User selectByCondition(User user);
```

```java
User user = userMapper.selectByCondition(new User("sun", "111"));
```

# achieve Map param

```java
User selectByCondition(Map map);
```

```java
HashMap hashMap = new HashMap();
hashMap.put("username", "sun");
hashMap.put("password", "111")
User user = userMapper.selectByCondition(hashMap);
```

# param substitution

#{} 替换 SQL, 不存在 SQL Injection

```xml
<mapper namespace="com.harvey.mapper.UserMapper">
    <select id="selectById" resultType="com.harvey.domainUser">
        select * from users where id = #{id}
    </select>
</mapper>
```

${} 拼接 SQL, 存在 SQL Injection

```xml
<mapper namespace="com.harvey.mapper.UserMapper">
    <select id="selectById" resultType="com.harvey.domainUser">
        select * from users where id = ${id}
    </select>
</mapper>
```

# select

```java
public interface UserMapper {
    List<User> selectAll();
}
```

```xml
<mapper namespace="com.harvey.mapper.UserMapper">
    <select id="selectAll" resultType="com.harvey.domain.User">
        select * from users;
    </select>
</mapper>
```

```java
InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(is);
SqlSession session = factory.openSession();
UserMapper userMapper = session.getMapper(UserMapper.class);
List<User> users = userMapper.selectAll();
session.close();
```

# insert

```java
public interface UserMapper {
    void insert(User user);
}
```

```xml
<mapper namespace="com.harvey.mapper.UserMapper">
    <insert id="insert">
        insert into users (name, age, sex) values (#{name}, #{age}, #{sex});
    </insert>
</mapper>
```

```java
InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(is);
SqlSession session = factory.openSession();
UserMapper userMapper = session.getMapper(UserMapper.class);
User user = new User();
user.setName("sun");
user.setAge(18);
user.setSex("F");
userMapper.insert(user);
session.commit();
session.close();
```

# update

```java
public interface UserMapper {
    void updateById(User user);
}
```

```xml
<mapper namespace="com.harvey.mapper.UserMapper">
    <update id="updateById" parameterType="integer">
        update users set name = #{name}, age = #{age} where id = #{id};
    </update>
</mapper>
```

```java
InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(is);
SqlSession session = factory.openSession();
UserMapper userMapper = session.getMapper(UserMapper.class);
User user = new User();
user.setId(1);
user.setName("sun");
user.setAge(18);
userMapper.updateById(user);
session.commit();
session.close();
```

# delete

```java
public interface UserMapper {
    void deleteById(Integer id);
}
```

```xml
<mapper namespace="com.harvey.mapper.UserMapper">
    <delete id="deleteById" parameterType="integer">
        delete from users where id = #{id};
    </delete>
</mapper>
```

```java
InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(is);
SqlSession session = factory.openSession();
UserMapper userMapper = session.getMapper(UserMapper.class);
userMapper.deleteById(1);
session.commit();
session.close();
```

# dynamic where

```xml
<select id="selectByCondition" resultType="com.harvey.domain.User">
    select *
    from users
    <where>
        <!-- 如果不满足 test 条件, 会删除 <if> -->
        <if test="name != null and name != ''">
            and name = #{name}
        </if>
        <if test="sex != null and sex != ''">
            and sex = #{sex}
        </if>
        <if test="age != null and age != 0">
            and age = #{age}
        </if>
    </where>
</select>
```

# dynamic choose

```xml
<select id="selectByCondition" resultType="com.harvey.domain.User">
    select *
    from users
    where
        <!-- <choose> 相当于 switch -->
        <choose>
            <!-- <when> 相当于 case -->
            <when test="name != null and name != ''">
                name = #{name}
            </when>
            <when test="age != null and age != 0">
                age = #{age}
            </when>
            <when test="sex != null and sex != ''">
                sex = #{sex}
            </when>
            <!-- <otherwise> 相当于 default -->
            <otherwise>
                1 = 1
            </otherwise>
        </choose>
</select>
```

# dynamic set

```xml
<update id="update">
    update users
    <set>
        <if test="name != null and name != ''">
            name = #{name}, 
        </if>
        <if test="age != null and age != ''">
            age = #{age}, 
        </if>
    </set>
    where id = #{id}
</update>
```

# batch operation

```java
List<User> selectByIds(@Param("ids") Integer[] ids);
```

```xml
<mapper namespace="com.harvey.mapper.UserMapper">
    <select id="selectByIds" resultType="com.harvey.domain.User">
        select *
        from users
        where id in (
            <!-- <foreach> 遍历 ids, 通过 "," 分割, 相当于 where id in (1, 2, 3, 4, 5) -->
            <foreach collection="ids" item="id" separator=",">
                #{id}
            </foreach>
        )
    </select>
</mapper>
```

```java
List<User> users = userMapper.selectByIds(new int[]{1, 2, 3, 4 ,5});
session.close();
```

replace brackets with open attr and close attr

```xml
<select id="selectByIds" resultType="com.harvey.domain.User">
    select *
    from users
    where id in
    <!-- <foreach> 遍历 ids, 通过 "," 分割, 相当于 where id in (1, 2, 3, 4, 5) -->
    <foreach collection="ids" item="id" separator="," open="(" close=")">
        #{id}
    </foreach>
</select>
```

# col alias

如果 SQL Col name 和 Domian Field name 不相同, 会匹配失败

```xml
<insert id="insert", resultType="com.harvey.domain.User">
    insert into users (user_name, user_age) values (#{userName}, #{userAge});
</insert>
```

# SQL alias 

```xml
<select id="selectAll" resultType="com.harvey.domain.User">
    select user_name as userName from users;
</select>
```

抽出 SQL Snippet

```xml
<sql id="user_column">
    user_name as userName, user_age as userAge, user_sex as userSex
</sql>

<select id="select">
    select <include refid="user_column"/> from users;
</select>
```

# ResultMap

```xml
<resultMap id="userResultMap" type="com.harvey.domain.User">
    <!-- primary key alias, column 为 Col name, property 为 Field name-->
    <id column="user_id" property="userId"/>
    <!-- col alias -->
    <result column="user_name" property="userName"/>
    <result column="user_age" property="userAge"/>
</resultMap>

<!-- 调用 userResultMap, 上面配置 type 了, 这里就不需要 resultType 属性了 -->
<select id="select" resultMap="userResultMap">
    select * from users;
</select>
```

# Generate Primary Key

generate primary key by XML prop

```xml
<!-- userGeneratedKey 开启自动生成 primary key, keyColumn 为 SQL Col name, keyProperty 为 Domain Field name -->
<insert id="insert" useGeneratedKeys="true" keyColumn="id" keyProperty="id">
    insert into users (name, age, sex) values (#{name}, #{age}, #{sex});
</insert>
```

get primary key

```java
User user = new User("sun", 18, "F");
userMapper.insert(user);
System.out.println(user.getId());
```

generate primary key by Annotation prop

```java
@Options(useGeneratedKeys = true, keyColumn = "id", keyProperty = "id")
@Insert("insert into users (name, age, sex) values (#{name}, #{age}, #{sex});")
User select(User user);
```

# Lazy Loading

MyBatis 通过 CGLIB 创建 Proxy Obj, 在需要时去加载关联数据, 提高查询性能, 当调用 getOrderList() 时, 会被 Proxy Obj 的 invoke() 拦截, 判断 orderList 是否为空, 如果为空才去执行 SQL 查询数据, 填充到 orderList, 再去调用 getOrderList() 执行后续逻辑, 实现 Lazy Loading

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221740212.png)

全局配置 Lazy Loading

```properties
# 全局开启或关闭 Lazy Loading (def: true)
mybatis.configuration.lazy-loading-enabled=true

# 开启后, 会一次性加载该对象全部的延迟属性, 关闭后, 会按需加载延迟属性  (def: true)
mybatis.configuration.aggressive-lazy-loading=true
```

局部配置 Lazy Loading

```java
@Select("select * from user where id = #{id}")
@Result(property = "id", column = "id", one = @One(fetchType = FetchType.LAZY))
User getUserById(int id);
```

# Cache

Local Cache 基于 PerpetualCache, 本质是一个 HashMap

Lv1 Cache 基于 PerpetualCache, 作用于 Session, 执行 close() 和 flush() 后, 就会清空 Cache (def: enable)

Lv2 Cache 作用于 Namespace 和 Mapper, 不依赖 Session (def: disable)

这里 userMapper1 和 userMapper2 的操作在同一个 Session 下, 所以 userMapper1 执行了 SQL 后, 缓存数据到 Cache 中, userMapper2 再次执行 selectById(1) 就是查询的 Cache 中的数据

```java
SqlSession sqlSession = sqlSessionFactory.openSession();

UserMapper userMapper1 = sqlSession.getMapper(UserMapper.class);
User user = userMapper1.selectById(1);

UserMapper userMapper2 = sqlSession.getMapper(UserMapper.class);
User user = userMapper2.selectById(1);
```

这里 userMapper1 和 userMapper2 的操作在不同的 Session 下, 所以无法共享 Cache

```java
SqlSession sqlSession1 = sqlSessionFactory.openSession();
UserMapper userMapper1 = sqlSession1.getMapper(UserMapper.class);
User user = userMapper1.selectById(1);

SqlSession sqlSession2 = sqlSessionFactory.openSession();
UserMapper userMapper2 = sqlSession2.getMapper(UserMapper.class);
User user = userMapper2.selectById(1);
```
