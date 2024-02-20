# MVC

pom.xml

```xml
<dependency>
    <groupId>jakarta.servlet</groupId>
    <artifactId>jakarta.servlet-api</artifactId>
    <version>6.0.0</version>
    <!-- 防止和 tomcat 冲突 -->
    <scope>provided</scope>
</dependency>

<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>6.0.9</version>
</dependency>
```

SpringMVCConfiguration.java, SpringMVC 扫描 Controller

```java
@Configuration
@ComponentScan("com.harvey.controller")
public class SpringMVCConfiguration {}
```

SpringConfiguration.java, Spring 不扫描 Controller, 需要排除 Controller

```java
@Configuration
@ComponentScan(value = "com.harvey", excludeFilters = @ComponentScan.Filter (
        type = FilterType.ANNOTATION,
        classes = {RestController.class, Controller.class} // org.springframework.stereotype.Controller
))
public class SpringConfiguration {}
```

ServletConfiguration.java, 配置 IOC

```java
@Configuration
public class ServletConfiguration extends AbstractDispatcherServletInitializer {
    // 创建 SpringMVC IOC, 加载 SpringMVCConfiguration.class
    @Override
    protected WebApplicationContext createServletApplicationContext() {
        AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext();
        applicationContext.register(SpringMVCConfiguration.class);
        return applicationContext;
    }

    // 配置 SpringMVC 处理的 req
    @Override
    protected String[] getServletMappings() {
        // 处理 /** 的 req
        return new String[]{"/"};
    }

    // 创建 Spring IOC, 加载 SpringConfiguration.class
    @Override
    protected WebApplicationContext createRootApplicationContext() {
        AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext();
        applicationContext.register(SpringConfiguration.class);
        return applicationContext;
    }
}
```

UserController.java

```java
// @RestController 是支持了 Restful 的 Controller, 底层包含 @Controller, @ResponseBody
@RestController
public class UserController {
    @RequestMapping("/show")
    // 返回的 Obj 转 JSON
    @ResponseBody
    public String show() {
        return "hello world";
    }
}
```

# AbstractAnnotationConfigDispatcherServletInitializer

ServletConfiguration.java, 通过 AbstractAnnotationConfigurationDispatcherServletInitializer 代替 AbstractDispatcherServletInitializer 配置 IOC

```java
@Configuration
public class ServletConfiguration extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{SpringConfiguration.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMVCConfiguration.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
```

# HttpServletRequest

获取 HttpServletRequest

```java
@RequestMapping("/show")
public void show(HttpServletRequest req) {
    String name = req.getParameter("name");
    String ageStr = req.getParameter("age");
    int age = Integer.parseInt(ageStr);
}
```

访问 `http://localhost:8080/show?name=sun&age=18`

# req encoding

设置接收请求的编码格式

```java
@Configuration
public class ServletConfiguration extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        return new Filter[]{filter};
    }
}
```

# resp Obj JSON

pom.xml

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.15.1</version>
</dependency>
```

响应 Obj, Obj -> JSON

```java
@RequestMapping("/show")
@ResponseBody
public User show() {
    return new User();
}
```

resp body

```json
{
    "name": "sun",
    "age": 18
}
```

# resp Collection JSON

pom.xml

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.15.1</version>
</dependency>
```

响应 Collection, Collection -> JSON

```java
@RequestMapping("/show")
public Map show() {
    Map map = new HashMap();
    map.put("name", "sun");
    map.put("age", 18);
    return map;
}
```

resp body

```json
{
    "name": "sun",
    "age": 18
}
```

# Interceptor

UserInterceptor.java

```java
@Component
public class UserInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }
}
```

SpringMVCConfiguration.java, 扫描 Interceptor

```java
@Configuration
@ComponentScan({"com.harvey.controller", "com.harvey.configuration", "com.harvey.interceptor"})
@EnableWebMvc
public class SpringMVCConfiguration {}
```

SpringMVCConfigurationSupport.java, 注册 Interceptor

```java
@Configuration
public class SpringMVCConfigurationSupport extends WebMvcConfigurationSupport {
    @Autowired
    UserInterceptor userInterceptor;

    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(userInterceptor).addPathPatterns("/users/**");
    }
}
```

# WebMvcConfigurer

SpringMVCConfiguration.java, 通过 WebMvcConfigurer 代替 WebMvcConfigurationSupport 配置 SpringMVC

```java
@Configuration
// 不需要扫描 com/harvey/configuration
@ComponentScan({"com.harvey.controller", "com.harvey.interceptor"})
@EnableWebMvc
public class SpringMVCConfiguration implements WebMvcConfigurer {
    @Autowired
    UserInterceptor userInterceptor;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/page/**").addResourceLocations("/page/");
        registry.addResourceHandler("/js/**").addResourceLocations("/js/");
        registry.addResourceHandler("/css/**").addResourceLocations("/css/");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(userInterceptor).addPathPatterns("/users/**");
    }
}
```

# Exercise

## select by page

请求参数

- pageNum 当前页码
- pageSize 每页展示的记录数量

响应参数

- list 查询记录集合
- total 总记录数量

mapper/EmpMapper.java

```java
@Mapper
public interface EmpMapper {
    @Select("select count(*) from emp;")
    Long count();

    @Select("select * from emp limit #{start}, #{pageSize};")
    List<Emp> selectByPage(Integer start, Integer pageSize);
}
```

domain/PageBean.java

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageBean {
    private Long total;
    private List rows;
}
```

service/EmpService.java

```java
public interface EmpService {
    PageBean getPageBean(Integer pageNum, Integer pageSize);
}
```

service/impl/EmpServiceImpl.java

```java
@Service
public class EmpServiceImpl implements EmpService {
    @Autowired
    EmpMapper empMapper;

    @Override
    public PageBean getPageBean(Integer pageNum, Integer pageSize) {
        // 分页查询
        List<Emp> empList = empMapper.selectByPage((pageNum - 1) * pageSize, pageSize);
        // 记录总数量
        Long total = empMapper.count();
        // 封装成 PageBean 返回
        return new PageBean(total, empList);
    }
}
```

controller/EmpController.java

```java
@Slf4j
@RequestMapping("/emps")
@RestController
public class EmpController {
    @Autowired
    EmpService empService;

    @GetMapping
    public Result getByPage(@RequestParam(defaultValue = "1") Integer pageNum, @RequestParam(defaultValue = "10") Integer pageSize) {
        PageBean pageBean = empService.getPageBean(pageNum, pageSize);
        return Result.success("success", pageBean);
    };
}
```

## select by condition

EmpMapper.java

```java
public interface EmpMapper {
    List<Emp> selectByCondition(String name, Integer gender, LocalDate start, LocalDate end);
}
```

EmpMapper.xml

```xml
<mapper namespace="com.harvey.mapper.EmpMapper">
    <select id="selectByCondition" resultType="com.harvey.domain.Emp">
        select *
        from emp
        <where>
            <if test="name != null and name != ''">
                name like concat('%', #{name}, '%')
            </if>
            <if test="gender != null">
                and gender = #{gender}
            </if>
            <if test="entrydate != null">
                and entrydate between #{start} and #{end}
            </if>
        </where>
    </select>
</mapper>
```

EmpService.java

```java
public interface EmpService {
    PageBean getPageBean(Integer page, Integer pageSize, String name, Integer gender, LocalDate start, LocalDate end);
}
```

EmpServiceImpl.java

```java
@Service
public class EmpServiceImpl implements EmpService {
    @Autowired
    EmpMapper empMapper;

    @Override
    public PageBean getPageBean(Integer pageNum, Integer pageSize, String name, Integer gender, LocalDate start, LocalDate end) {
        PageHelper.startPage(pageNum, pageSize);
        Page<Emp> page = (Page<Emp>) empMapper.selectByCondition(name, gender, start, end);
        return new PageBean(page.getTotal(), page.getResult());
    }
}
```

EmpController.java

```java
@Slf4j
@RequestMapping("/emps")
@RestController
public class EmpController {
    @Autowired
    EmpService empService;

    @GetMapping
    public Result getPageBean(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "5") Integer pageSize,
            String name,
            Integer gender,
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate start,
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate end
    ) {
        PageBean pageBean = empService.getPageBean(page, pageSize, name, gender, start, end);
        return Result.success("success", pageBean);
    };
}
```

## delete by ids

EmpMapper.java

```java
@Mapper
public interface EmpMapper {
    void deleteByIds(List<Integer> ids);
}
```

EmpMapper.xml

```xml
<mapper namespace="com.harvey.mapper.EmpMapper">
    <delete id="deleteByIds">
        delete 
        from emp
        where id in 
            <foreach collection="ids" item="id" separator="," open="(" close=")">
                #{id}
            </foreach>
    </delete>
</mapper>
```

EmpService.java

```java
public interface EmpService {
    void deleteEmps(List<Integer> ids);
}
```

EmpServiceImpl.java

```java
@Service
public class EmpServiceImpl implements EmpService {
    @Autowired
    EmpMapper empMapper;

    @Override
    public void deleteEmps(List<Integer> ids) {
        empMapper.deleteByIds(ids);
    }
}
```

EmpController.java

```java
@Slf4j
@RequestMapping("/emps")
@RestController
public class EmpController {
    @Autowired
    EmpService empService;

    @DeleteMapping("/{ids}")
    public Result deleteEmps(@PathVariable List<Integer> ids) {
        empService.deleteEmps(ids);
        return Result.success("success");
    }
}
```

## login

EmpMapper.java

```java
@Mapper
public interface EmpMapper {
    @Select("select * from emp where username = #{username} and password = #{password}")
    Emp selectByUsernameAndPassword(Emp emp);
}
```

EmpService.java

```java
public interface EmpService {
    Emp login(Emp emp);
}
```

EmpServiceImpl.java

```java
@Service
public class EmpServiceImpl implements EmpService {
    @Autowired
    EmpMapper empMapper;

    @Override
    public Emp login(Emp emp) {
        return empMapper.selectByUsernameAndPassword(emp);
    }
}
```

LoginController.java

```java
@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    EmpService empService;

    @PostMapping
    public Result login(@RequestBody Emp emp) {
        return empService.login(emp) != null ? Result.success() : Result.failure("username or password is error");
    }
}
```






























