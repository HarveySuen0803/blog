# Domain

核心子域（Core Domain）是该领域的关键子域，高度定制，是区分其他领域的核心部分。

- 例如：电商领域的订单管理就是核心子域，电商独有的订单管理，直接区分其他的领域，并且订单管理是直接决定了电商业务的发展，是非常重要的。

支撑子域（Supporting Domain）不是领域的核心部分，但是支持了核心子域。

- 例如：电商领域的库存管理就是支撑资源，库存管理虽然也是电商独有的业务，但他并不是最核心的，往往是辅助订单管理的。

通用子域（Generic Domain）并非领域的独特部分，通用子域往往在其他领域都有几户相同的实现。

- 例如：电商领域的用户管理就是通用领域，很多领域都有用户管理。

# Ubiquitous Language

通用语言（Ubiquitous Language）是一个非常关键的概念，旨在创建一个整个项目团队共享的语言，确保开发人员、业务专家、及其他相关干系人之间在交流中使用一致的术语和概念。

- 例如：定义 "用户" 为中文通用语言，"User" 为英文通用语言，如果使用 "账户", "Person", "Account" 来表达，则是违反了通用语言的规定，在代码开发中也要使用 "User" 来表示

分享一下我在学习 DDD 的 DP (Domain Primitive) 时的一些感受，以及在实战中的轻度使用，因为 DP 最理想的状态非常复杂，难以在团队中落地，所以我这里给出了一个简单的使用场景。

我们在接受参数时，一定会对参数进行大量的异常值处理，这些代码就是胶水代码，他们高度重复且与业务割裂。

```java
@PostMapping("/register")
public Result<Void> register(UserRegisterDto userRegisterDto) {
    if (StrUtil.isBlank(username)) {
        throw new ClientException(UserResult.USERNAME_INVALID);
    }
    if (StrUtil.isBlank(password)) {
        throw new ClientException(UserResult.PASSWORD_INVALID);
    }
    if (StrUtil.isBlank(email)) {
        throw new ClientException(UserResult.EMAIL_INVALID);
    }
    
    UserDo userDo = new UserDo();
    BeanUtils.copyProperties(userDo, userRegisterDto);
    // ...
}
```

这些胶水代码其实就可以放在参数对象的构造器里，在创建参数对象时，就做好了异常值处理。这里接受的 UserRegisterDto 作为参数对象，那我们就可以在 UserRegisterDto 的构造器里进行异常值处理。

```java
@Data
public class UserRegisterDto {
    private String username;
    
    private String password;
    
    private String email;
    
    public UserRegisterDto(String username, String password, String email) {
        if (StrUtil.isBlank(username)) {
            throw new ClientException(UserResult.USERNAME_INVALID);
        }
        if (StrUtil.isBlank(password)) {
            throw new ClientException(UserResult.PASSWORD_INVALID);
        }
        if (StrUtil.isBlank(email)) {
            throw new ClientException(UserResult.EMAIL_INVALID);
        }
        
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
```

```java
@PostMapping("/register")
public Result<Void> register(UserRegisterDto userRegisterDto) {
    UserDo userDo = new UserDo();
    BeanUtils.copyProperties(userDo, userRegisterDto);
    // ...
}
```