# Validator

pom.xml

```xml
<dependency>
    <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>8.0.0.Final</version>
</dependency>

<dependency>
    <groupId>org.glassfish</groupId>
    <artifactId>jakarta.el</artifactId>
    <version>4.0.1</version>
</dependency>
```

validator/UserValidator.java

```java
public class UserValidator implements Validator {
    // validate User Class
    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    // Validation rule
    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        // name Field
        ValidationUtils.rejectIfEmpty(errors, "name", "name.empty", "name is null");
        // age Field
        if (user.getAge() < 0 || user.getAge() > 200) {
            errors.rejectValue("age", "age.value.error", "age is error");
        }
    }
}
```

Test

```java
User user = new User();
DataBinder binder = new DataBinder(user);
binder.setValidator(new UserValidator());
binder.validate();
BindingResult result = binder.getBindingResult();
int errorCount = result.getErrorCount();
List<ObjectError> allErrors = result.getAllErrors();
```

# Validator Bean

## Java Validator Bean

ValidationConfiguration.java, 配置 LocalValidatorFactoryBean Bean

```java
@Configuration
public class ValidationConfiguration {
    @Bean
    public LocalValidatorFactoryBean validator() {
        return new LocalValidatorFactoryBean();
    }
}
```

User.java, 配置 Validation rule

```java
@NotNull(message = "name is null")
private String name;
@Min(value = 0, message = "age is error")
@Max(value = 200, message = "age is error")
private Integer age;
```

Validation/UserValidation.java, 配置 Validation, 调用 validator 进行 validate

```java
@Service
public class UserValidation {
    @Autowired
    Validator validator; // jakarta.validation.Validator

    public boolean validate(User user) {
        Set<ConstraintViolation<User>> validate = validator.validate(user);
        // 如果 error, 返回 false
        return validate.isEmpty();
    }
}
```

Test

```java
ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);
UserValidation userValidation = applicationContext.getBean(UserValidation.class);
User user = new User();
boolean isValidate = userValidation.validate(user);
```

## Spring Validator Bean

ValidationConfiguration.java

```java
@Configuration
public class ValidationConfiguration {
    @Bean
    public LocalValidatorFactoryBean validator() {
        return new LocalValidatorFactoryBean();
    }
}
```

User.java

```java
@NotNull(message = "name is null")
private String name;
@Min(value = 0, message = "age is error")
@Max(value = 200, message = "age is error")
private Integer age;
```

Validation/UserValidation.java

```java
@Service
public class UserValidation {
    @Autowired
    Validator validator; // org.springframework.validation.Validator

    public boolean validate(User user) {
        // user 为 target Object, "user" 为 target Object name
        BindException exception = new BindException(user, "user");
        validator.validate(user, exception);
        List<ObjectError> allErrors = exception.getAllErrors();
        // 如果 error, 返回 false
        return !exception.hasErrors();
    }
}
```

Test

```java
ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);
UserValidation userValidation = applicationContext.getBean(UserValidation.class);
User user = new User();
boolean isValidate = userValidation.validate(user);
```

# method Validation

ValidationConfiguration.java

```java
@Configuration
public class ValidationConfiguration {
    @Bean
    public MethodValidationPostProcessor methodValidationPostProcessor() {
        return new MethodValidationPostProcessor();
    }
}
```

User.java

```java
@NotNull(message = "name is null")
private String name;
@Min(value = 0, message = "age is error")
@Max(value = 200, message = "age is error")
private Integer age;
```

TestService.java, 添加 @Validated 开启 method Validation

```java
@Service
@Validated
public class TestService {
    // 如果 error, 就 throw Exception
    public void show(@NotNull @Valid User user) {
        System.out.println(user);
    }
}
```

Test

```java
ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);
TestService testService = applicationContext.getBean(TestService.class);
testService.show(new User());
```

# custom Validation

MyNotBlankValidator.java, 配置 Validator

```java
public class MyNotBlankValidator implements ConstraintValidator<MyNotBlank, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // default constraint message
        String defaultConstraintMessage = context.getDefaultConstraintMessageTemplate();
        // disable default constraint message
        context.disableDefaultConstraintViolation();
        if (value == null || value.trim().equals("")) {
            // new constraint message
            context.buildConstraintViolationWithTemplate("can not be blank").addConstraintViolation();
            return false;
        }
        return true;
    }
}
```

MyNotBlank.java, 配置 MyNotBlank Annotation

```java
@Documented
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {MyNotBlankValidator.class}) // 配置 MyNotBlankValidator
public @interface MyNotBlank {
    String message() default "can not be blank";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    @Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    public @interface List {
        MyNotBlank[] value();
    }
}
```

User.java

```java
@MyNotBlank
private String name;
```

TestService.java

```java
@Service
@Validated
public class TestService {
    public void show(@Valid User user) {
        System.out.println(user);
    }
}
```

Test

```java
ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);
TestService testService = applicationContext.getBean(TestService.class);
testService.show(new User(1, "", 18, "F"));
```






