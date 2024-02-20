# create Bean

通过 anno 代替 applicationContext.xml 配置 Bean

@Component 通用

```java
@Component
public class UserController {}
```

applicationContext.xml, 扫描 Bean 所在 pkg

```xml
<!-- 配置 context namespace-->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    <!-- 扫描 com.harvey.* -->
    <context:component-scan base-package="com.harvey"></context:component-scan>
</beans>
```

访问 Bean

```java
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
UserController userController = applicationContext.getBean(UserController.class);
```

# load external Bean

pom.xml

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.16</version>
</dependency>
```

JDBCConfiguration.java, 配置 Bean

```java
@Configuration
public class JDBCConfiguration {
    @Bean
    public DruidDataSource druidDataSource() {
        DruidDataSource druidDataSource = new DruidDataSource();
        druidDataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        druidDataSource.setUrl("jdbc:mysql://localhost:3306/db");
        druidDataSource.setUsername("root");
        druidDataSource.setPassword("111");
        return druidDataSource;
    }
}
```

访问 Bean

```java
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
DruidDataSource druidDataSource = applicationContext.getBean(DruidDataSource.class);
```

# load properties

配置 properties

```properties
url=jdbc:mysql://localhost:3306/db
```

读取 properties

```java
@Configuration
// 加载 jdbc.properties
@PropertySource("classpath:jdbc.properties")
public class JDBCConfiguration {
    // 访问 jdbc.properties
    @Value("${jdbc.url}")
    private String url;
}
```

# Profile

配置 Bean 的作用 Profile

```java
// 作用于 dev profile, test profile, prod profile (def. default)
@Profile({"dev", "test", "prod"})
@Controller
public class UserController {}
```

# configuration class

configuration/SpringConfiguration.java, 代替 applicationContext.xml 配置 IOC

```java
@Configuration
@ComponentScan("com.harvey")
public class SpringConfiguration {}
```

加载 SpringConfiguration.java, 通过 ApplicationContext 访问 Bean

```java
ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);
MainController mainController = applicationContext.getBean(MainController.class);
```

