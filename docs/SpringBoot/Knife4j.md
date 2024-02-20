# Knife4j

import denpendency

```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
```

set Knife4j Docket generator

```java
@Bean
public Docket docket() {
    ApiInfo apiInfo = new ApiInfoBuilder()
            .title("Knife4j Docket")
            .version("2.0")
            .description("Knife4j Ddocket description")
            .build();
    Docket docket = new Docket(DocumentationType.SWAGGER_2)
            .groupName("user Controller")
            .apiInfo(apiInfo)
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.harvey.controller.user"))
            .paths(PathSelectors.any())
            .build();
    return docket;
}
```

set static resource handler

```java
@Configuration
public class WebMvcConfiguration extends WebMvcConfigurationSupport {
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/doc.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
```

access http://host/doc.html

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241810208.png)

# @Api

```java
@RestController
@Api("UserController API")
public class UserController {}
```

# @ApiOperation

```java
@GetMapping("/user/{id}")
@ApiOperation("get user by id")
public User getUserById(@PathVariable Integer id) { return null; }
```

# @ApiModel

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("User Domain")
public class User {
}
```

# @ApiModelProperty

```java
@ApiModelProperty("primary key")
private Integer id;
```

