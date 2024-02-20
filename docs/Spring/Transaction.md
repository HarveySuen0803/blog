# Transaction

impl Transaction by manual

```java
DataSource dataSource = applicationContext.getBean(DataSource.class);
Connection connection = dataSource.getConnection();
try {
    connection.setAutoCommit(false);
    Statement statement = connection.createStatement();
    statement.executeUpdate("delete from user where id = 1");
    connection.commit();
} catch (SQLException e) {
    connection.rollback();
} finally {
    connection.close();
}
```

add @EnableTransactionManagement to enable Transaction for Spring, if an error occurs during Method execution, the Method is rolled back

```java
@Configuration
@ComponentScan({"com.harvey"})
@EnableTransactionManagement
public class SpringConfiguration {}
```

add @Transactional to Interface Method to enable Transaction for the Method

- it is generally to add @Transaction to Interface Method to decoupling

```java
@Transactional
void deleteById(Integer id);
```

add @Transactional to Interface to enable Transaction for all Method

```java
@Transactional
public interface UserService {}
```

set Transaction Manager

```java JdbcConfiguration.java
@Bean
public PlatformTransactionManager transactionManager(DataSource dataSource) {
    DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager();
    dataSourceTransactionManager.setDataSource(dataSource);
    return dataSourceTransactionManager;
}
```

# Transaction timeout

```java
@Transactional(timeout = 500) // def. -1
```

# Transaction readOnly

```java
@Transactional(readOnly = true) // def. false
```

# propagation

set Propagation

```java
@Transactional(propagation = Propagation.REQUIRED)
public void test() {}
```

## Propagation.REQURIED

`Propagation.REQURIED` (def): 如果所在 Method 有 Transaction, 就加入该 Transcation, 如果所在方法没有 Transaction, 就创建新的 Transaction

```java
@Transactional(propagation = Propagation.REQUIRED)
public void test1() {
    try {
        // Exception
    } finally {
        test2()
    }
}
```

```java
// test1() 有 Transcation, test2() 就加入 test1() 的 Transaction, 如果 try {} 有 Exception 就 roll back, finllay {} 中的 test2() 也 roll back
@Transactional(propagation = Propagation.REQUIRED)
public void test2() {}
```

## Propagation.REQUIRES_NEW

`Propagation.REQUIRES_NEW`: 无论所在方法有没有 Transcation, 都创建新的 Transcation

```java
@Transactional
public void test1() {
    try {
        // Exception
    } finally {
        test2()
    }
}
```

```java
// test2() 创建新 Transaction, 如果 try {} 有 Exception 就 roll back, finally {} 中的 test2() 不 roll back
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void test2() {}
```

# Exercise

## Operation Log

DeptLogServiceImpl.java

```java
@Service
public class DeptLogServiceImpl implements DeptLogService {
    @Autowired
    DeptLogMapper deptLogMapper;

    // 开启新事务, 不受调用者的的事务影响
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Override
    public void insert(DeptLog deptLog) {
        deptLogMapper.insert(deptLog);
    }
}
```

DeptServiceImpl.java

```java
@Service
public class DeptServiceImpl implements DeptService {
    @Autowired
    private DeptMapper deptMapper;
    @Autowired
    private EmpMapper empMapper;
    @Autowired
    private DeptLogService deptLogService;

    @Transactional
    @Override
    public void delete(Integer id) {
        // deptLogService.insert() 开启新的 Transaction, 如果 try{} 中的 delete() 有 Exception 就 roll back, finally{} 中的 deptLogService.insert() 不 roll back
        try {
            deptMapper.deleteById(id);
            empMapper.deleteByDeptId(id);
        } finally {
            // 无乱是否有 Exception, 都要记录 Operation Log
            deptLogService.insert(new DeptLog("delete dept by id " + id, LocalDateTime.now()));
        }
    }
}
```








