# IOC

IOC: 容器管理 Cls, 容器提供 Obj

Bean: 容器创建的 Obj

DI: 容器提供 Obj

# create Bean

pom.xml

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>6.0.9</version>
</dependency>
```

resources/applicationContext.xml, 配置 Bean

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!-- 配置 MainServiceImpl Bean, mainService 为 Bean name -->
    <bean name="mainService" class="com.harvey.service.impl.MainServiceImpl"></bean>
</beans>
```

# get Bean

```java
// 创建 ApplicationContext Obj, 访问 applicationContext.xml
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");

// 根据 Bean name 获取 Bean
DeptController bean1 = (DeptController) applicationContext.getBean("deptController");

// 根据 Bean Cls 获取 Bean
DeptController bean2 = applicationContext.getBean(DeptController.class);

// 根据 Bean name 和 Bean Cls 获取 Bean
DeptController bean3 = applicationContext.getBean("deptController", DeptController.class);
```

# Bean name

```xml
<!-- name attr 可以配置多个 Bean name-->
<bean name="mainService1, mainService2, mainService3" class="com.harvey.service.impl.MainServiceImpl"></bean>

<!-- id attr 只能配置一个 Bean name -->
<bean id="mainService" class="com.harvey.service.impl.MainServiceImpl"></bean>
```

# Bean scope

singleton 单例 (def)

```xml
<bean name="mainService"class="com.harvey.service.impl.MainServiceImpl" scope="singleton"></bean>
```

```java
MainService bean1 = applicationContext.getBean(MainService.class);
MainService bean2 = applicationContext.getBean(MainService.class);
System.out.println(bean1 == bean2); // true
```

prototype 非单例

```xml
<bean name="mainService"class="com.harvey.service.impl.MainServiceImpl" scope="prototype"></bean>
```

```java
MainService bean1 = applicationContext.getBean(MainService.class);
MainService bean2 = applicationContext.getBean(MainService.class);
System.out.println(bean1 == bean2); // false
```

# Bean instantiation

## Ctor Impl

IOC 默认通过 reflect 访问 Ctor() 实例化 Bean

```java
public class MainServiceImpl implements MainService {
    public MainServiceImpl() {
        System.out.println("MainServiceImpl() ...");
    }
}
```

applicationContext.xml, 配置 Bean

```xml
<bean id="mainService" class="com.harvey.service.impl.UserServiceImpl"></bean>
```

## Factory Impl

factory/MainServiceFactory.java, 配置 Factory, 返回 Obj

```java
public class MainServiceFactory {
    public MainService getMainService() {
        return new MainServiceImpl();
    }
}
```

applicationContext.xml, 配置 Bean

```xml
<!-- 创建 MainServiceFactory Bean -->
<bean name="mainServiceFactory" class="com.harvey.factory.MainServiceFactory"></bean>
<!-- 指定 MainServiceFactory 的 getMainService() 返回的 Obj 为 Bean -->
<bean name="mainService" factory-bean="mainServiceFactory" factory-method="getMainService"></bean>
```

## static Factory Impl

factory/MainServiceFactory.java, 配置 static factory, 返回 Obj

```java
public class MainServiceFactory {
    public static MainService getMainService() {
        return new MainServiceImpl();
    }
}
```

applicationContext.xml, 配置 Bean

```xml
<!-- 指定 MainServiceFactory 的 getMainService() 返回的 Obj 为 Bean-->
<bean name="mainService" class="com.harvey.factory.MainServiceFactory" factory-method="getMainService"></bean>
```

## FactoryBean Impl

factory/MainServiceFactory.java, 配置 Factory Bean, 返回 Obj, Cls

```java
public class MainServiceFactory implements FactoryBean {
    // 返回 Obj
    @Override
    public Object getObject() throws Exception {
        return new MainServiceImpl();
    }

    // 返回 Cls
    @Override
    public Class<?> getObjectType() {
        return MainService.class;
    }

    // 配置 Bean scope
    @Override
    public boolean isSingleton() {
        return true;
    }
}
```

applicationContext.xml, 配置 Bean

```xml
<!-- 直接创建 factory Bean, 不需要指定 factory-bean, factory-method -->
<bean name="mainService" class="com.harvey.factory.MainServiceFactory"></bean>
```

# Bean lifecycle

## manual Impl

MainServiceImpl.java, 配置 lifecycle method

```java
public class MainServiceImpl implements MainService {
    public void init() {
        System.out.println("init()");
    }

    public void destroy() {
        System.out.println("destroy()");
    }
}
```

applicationContext.xml, 配置 lifecycle method

```xml
<!-- 配置 lifecycle method 为 init() 和 destroy() -->
<bean name="mainService" class="com.harvey.service.impl.MainServiceImpl" init-method="init" destroy-method="destroy"></bean>
```

App.java

```java
ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
MainService mainService = (MainService) applicationContext.getBean("mainService");
// 程序执行完, 就会关闭 JVM, 来不及调用 destroy(), 可以主动关闭 IOC, 触发 destroy()
applicationContext.close();
```

## Interface Impl

MainServiceImpl.java, 实现 InitializingBean, DisposableBean

```java
public class MainServiceImpl implements MainService, InitializingBean, DisposableBean {
    // ctor 后执行, 相当于 init()
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("afterPropertiesSet()");
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("destroy()");
    }
}
```

applicationContext.xml

```xml
<!-- 省略 init-method, destroy-method -->
<bean name="mainService" class="com.harvey.service.impl.MainServiceImpl"></bean>
```

# post processor

通过 post processor 在 Bean init 前后进行处理

processor/MyBeanProcessor.java

```java
public class MyBeanProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println(beanName + " before initialization");
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println(beanName + " after initialization");
        return bean;
    }
}
```

console out

```shell
springConfiguration before initialization
springConfiguration after initialization
userController before initialization
userController after initialization
userServiceImpl before initialization
userServiceImpl after initialization
```

# lazy initialize Bean

添加 @Lazy 设置 Bean 使用时 init (def. IOC 启动时 init)

```xml
<bean name="mainService" class="com.harvey.service.impl.MainServiceImpl" lazy-init="true"></bean>
```

# namespace

```xml
<!-- 配置 xmlns:util, xsi:schemaLocation -->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/util
       http://www.springframework.org/schema/util.xsd
">
    <!-- util namespace -->
    <util:list id="nameList">
        <value>sun</value>
        <value>xue</value>
        <value>cheng</value>
    </util:list>
    <!-- 调用 util namespace -->
    <bean id="userController" class="com.harvey.controller.UserController">
        <property name="list" ref="nameList"></property>
    </bean>
</beans>
```

## p namespace

通过 p namespace 直接给 Bean 赋值

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
">
    <bean id="user" class="com.harvey.domain.User" p:id="1" p:name="sun" p:age="18" p:sex="F"></bean>
</beans>
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

applicationContext.xml, 配置 Bean

```xml
<bean name="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
    <property name="url" value="jdbc:mysql://localhost:3306/db"></property>
    <property name="username" value="root"></property>
    <property name="password" value="111"></property>
</bean>
```

访问 Bean

```java
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
DruidDataSource druidDataSource = applicationContext.getBean(DruidDataSource.class);
```

# load properties

druid.properties, 存储 properties

```properties
driverClassName=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/db
username=root
password=111
```

applicationContext.xml, 读取 properties

```xml
<!-- 配置 context namespace -->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context.xsd
">
    <!-- 通过 context namespace, 加载 jdbc.properties -->
    <context:property-placeholder location="jdbc.properties"></context:property-placeholder>

    <!-- 访问 jdbc.properties -->
    <bean name="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driverClassName}"></property>
        <property name="url" value="${jdbc.url}"></property>
        <property name="username" value="${jdbc.username}"></property>
        <property name="password" value="${jdbc.password}"></property>
    </bean>
</beans>
```

## system-properties-mode

通过 system-properties-mode 避免 custom property 和 system property 冲突

```xml
<context:property-placeholder location="jdbc.properties" system-properties-mode="NEVER"></context:property-placeholder>
```

## location

加载多个 propreties

```xml
<context:property-placeholder location="jdbc.properties, jdbc2.properties, jdbc3.properties"></context:property-placeholder>
```

匹配加载 properties

```xml
<!-- 加载 project/classes/**/*.properties -->
<context:property-placeholder location="classpath:*.properties"></context:property-placeholder>

<!-- 加载 */classes/**/*.properties (加载所有项目, 包括导入的 jar) -->
<context:property-placeholder location="classpath*:*.properties"></context:property-placeholder>
```

# DI

## setter Impl

通过 setter 注入 data, 可以选择性的注入 prop

- 优点: 灵活
- 缺点: 不严谨, 不注入的 property 为 null

applicationContext.xml, 配置 prop

```xml
<bean name="mainService" class="com.harvey.service.impl.MainServiceImpl"></bean>
<!-- MainController 内, 自动注入 prop -->
<bean name="mainController" class="com.harvey.controller.MainController">
    <!-- 注入 Obj prop, name 为 data name, ref 为 Bean name-->
    <property name="mainService" ref="mainService"></property>
    <!-- 注入 base prop -->
    <property name="description" value="hello world"></property>
</bean>
```

MainController.java, 通过 setter 注入

```java
public class MainController {
    MainService mainService;
    String description;

    // 注入 MainService Obj
    public void setMainService(MainService mainService) {
        this.mainService = mainService;
    }

    // 注入 description
    public void setDescription(String description) {
        this.description = description;
    }
}
```

## Ctor Impl

通过 Ctor 注入 prop, 强制初始化 prop

- 优点: 严谨
- 缺点: 不灵活, 存在 coupling

applicationContext.xml, 配置 prop

```xml
<bean name="mainService" class="com.harvey.service.impl.MainServiceImpl"></bean>
<bean name="mainController" class="com.harvey.controller.MainController">
    <!-- 注入 Obj prop, name 为 Ctor(arg) 的 arg -->
    <constructor-arg name="mainService" ref="mainService"></constructor-arg>
    <!-- 注入 base prop -->
    <constructor-arg name="description" value="hello world"></constructor-arg>
</bean>
```

MainController.java, 通过 Ctor 注入

```java
public class MainController {
    MainService mainService;
    String description;
    
    public MainController(MainService mainService, String description) {
        // 注入 MainService Obj
        this.mainService = mainService;
        // 注入 description
        this.description = description;
    }
}
```

### resolve coupling

通过 ctor 注入 prop, 需要保证 constructor-arg 的 name 和 ctor(arg) 的 arg 相同, 存在 coupling

```xml
<constructor-arg name="mainService" ref="mainService"></constructor-arg>
```

通过 type 解决 coupling

```xml
<!-- 注入到 type 为 MainService 的 arugment -->
<constructor-arg type="com.harvey.service.MainService" ref="mainService"></constructor-arg>
<!-- 注入到 type 为 String 的 argument -->
<constructor-arg type="java.lang.String" value="hello world"></constructor-arg>
```

通过 index 解决 coupling

```xml
<!-- 注入到 index 为 0 的 argument -->
<constructor-arg index="0" ref="mainService"></constructor-arg>
<!-- 注入到 index 为 1 的 argument -->
<constructor-arg index="1" value="hello world"></constructor-arg>
```

## DI Array

```xml
<property name="array">
    <array>
        <!-- base data -->
        <value>100</value>
        <value>200</value>
        <!-- Obj data -->
        <ref bean="mainService"></ref>
    </array>
</property>
```

## DI List

```xml
<property name="list">
    <list>
        <value>sun</value>
        <value>xue</value>
        <value>cheng</value>
    </list>
</property>
```

## DI Set

```xml
<property name="set">
    <set>
        <value>sun</value>
        <value>xue</value>
        <value>cheng</value>
    </set>
</property>
```

## DI Map

```xml
<property name="map">
    <map>
        <entry key="name" value="sun"></entry>
        <entry key="age" value="18"></entry>
        <entry key="sex" value="M"></entry>
    </map>
</property>
```

## DI Properties

```xml
<property name="properties">
    <props>
        <prop key="name">sun</prop>
        <prop key="age">18</prop>
        <prop key="sex">M</prop>
    </props>
</property>
```

## DI null

```xml
<property name="text">
    <null></null>
</property>
```

## DI ESC

```xml
<property name="text">
    <value>10 &gt; 100</value>
</property>
```

## DI CDATA

```xml
<property name="text">
    <value><![CDATA[10 < 100]]></value>
</property>
```

## DI dependency data

pom.xml

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.18</version>
</dependency>
```

applicationContext.xml

```xml
<bean name="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
    <property name="url" value="jdbc:mysql://localhost:3306/db"></property>
    <property name="username" value="root"></property>
    <property name="password" value="111"></property>
</bean>
```

App.java

```java
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
DataSource dataSource = (DataSource) applicationContext.getBean("druidDataSource");
```

## autowire

### ByType

通过 Bean type 匹配

```xml
<bean id="userService" class="com.harvey.service.impl.UserServiceImpl" autowire="byType"></bean>
```

### ByName

通过 Bean name 匹配

```xml
<bean id="userService" class="com.harvey.service.impl.UserServiceImpl" autowire="byName"></bean>
```

# shutdown IOC

## manual Impl

```java
// ApplicationContext 没有 close(), ClassPathXmlApplicationContext 有 close(), 可以主动关闭 IOC
ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
// 主动关闭 IOC
applicationContext.close();
```

## auto Impl

```java
ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
// 配置 JVM 关闭前, 自动关闭 IOC
applicationContext.registerShutdownHook();
```