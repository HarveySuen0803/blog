# MyBatis

import Dependency

```xml
<!-- MySQL -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.0.33</version>
</dependency>

<!-- JDBC -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>6.0.9</version>
</dependency>

<!-- MyBatis -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.13</version>
</dependency>

<!-- MyBatis Spring -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>3.0.2</version>
</dependency>
```

set SqlSessionFactoryBean and MapperScannerConfigurer to replace mybatis-config.xml

```java
@Configuration
public class MyBatisConfiguration {
    @Bean
    public SqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource) {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        
        // set Domain, similar to <typeAliases>
        sqlSessionFactoryBean.setTypeAliasesPackage("com.harvey.domain");
        
        // set DataSource, similar to <dataSource>
        sqlSessionFactoryBean.setDataSource(dataSource);
        
        return sqlSessionFactoryBean;
    }

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        
        // set Mapper Package, similar to <mapper>
        mapperScannerConfigurer.setBasePackage("com.harvey.mapper");
        
        return mapperScannerConfigurer;
    }
}
```

set Mapper

```java
@Mapper
public interface UserMapper {
    @Select("select * from users where id = #{id}")
    User selectById(Integer id);
}
```

test

```java
ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);
UserMapper bean = applicationContext.getBean(UserMapper.class);
User user = bean.selectById(1);
```
