# Junit4

import Dependency

```xml
<!-- Spring Test -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>6.0.9</version>
</dependency>

<!-- Junit -->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>
```

configure by XML

```java
// load Junit
@RunWith(SpringJUnit4ClassRunner.class)
// load SpringConfiguration
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class AppTest {
    @Autowired
    UserService userService;

    @Test
    public void show() {
        System.out.println(userService);
    }
}
```

configure by Annotation

```java
@ContextConfiguration(classes = SpringConfiguration.class)
```

# Junit5

import Dependency

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>6.0.10</version>
</dependency>

<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.9.2</version>
</dependency>
```

configure by Annotation

```java
@SpringJUnitConfig(SpringConfiguration.class)
public class AppTest {
    @Autowired
    UserService userService;

    @Test
    public void show() {
        System.out.println(userService);
    }
}
```






