# Resource

```java
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
Resource resource = applicationContext.getResource("classpath:test.txt");
boolean isExists = resource.exists();
boolean isReadable = resource.isReadable();
boolean isFile = resource.isFile();
File file = resource.getFile();
String fileName = resource.getFilename();
URI uri = resource.getURI();
URL url = resource.getURL();
String desc = resource.getDescription();
InputStream is = resource.getInputStream();
```

# UrlResource

## access http url

```java
UrlResource resource = new UrlResource("https://localhost:8080/page/index.html");
String fileName = resource.getFilename(); // index.html
URI uri = resource.getURI(); // https://localhost:8080/page/index.html
URL url = resource.getURL(); // https://localhost:8080/page/index.html
String desc = resource.getDescription(); // URL [https://localhost:8080/page/index.html]
InputStream is = resource.getInputStream();
```

## access file url

```java
// access project/test.txt
UrlResource resource = new UrlResource("file:test.txt");
```

# ClassPathResource

```java
// access project/classes/**/test.txt
ClassPathResource resource = new ClassPathResource("test.txt");
```

# FileSystemResource

## access absolute path

```java
FileSystemResource resource = new FileSystemResource("/Users/HarveySuen/Downloads/test.txt");
```

## access relative path

```java
FileSystemResource resource = new FileSystemResource("../resources/test.txt");
```

# ResourceLoader

ApplicationContext Obj 调用 getResource() 获取 Resource Obj, 底层是创建 ResourceLoader Obj 调用 getResource(), 根据 ApplicationContext 匹配 Resource

- ClassPathXmlApplicationContext 匹配 ClassPathResource
- FileSystemXmlApplicationContext 匹配 FileSystemResource

# ResourceLoaderAware

ResourceLoaderAware 的 setResourceLoader() 的 ResourceLoader obj 指向 ApplicationContext

```java
@Component
public class TestComponent implements ResourceLoaderAware {
    private ResourceLoader resourceLoader;
    
    @Override
    public void setResourceLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public ResourceLoader getResourceLoader() {
        return resourceLoader;
    }
}
```

```java
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
ResourceLoader resourceLoader = applicationContext.getBean(TestComponent.class).getResourceLoader();
System.out.println(resourceLoader == applicationContext); // true
```

# DI Resource

通过 getResource() 访问 Resource 存在 coupling

```java
ApplicationContext applicationContext = new ClassPathXmlApplicationContext();
Resource resource = applicationContext.getResource("test.txt");
```

将 Resource 配置成 Bean, 通过 DI 解决 coupling

```java
public class ResourceBean {
    private Resource resource;

    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public void show() {
        System.out.println(resource.getFilename());
    }
}
```

```xml
<bean name="resourceBean" class="com.harvey.bean.ResourceBean">
    <!-- prop name 为 resource 对应 setResource()-->
    <property name="resource" value="classpath:test.txt"></property>
</bean>
```


