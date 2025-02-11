# MapperConfig

```java
private final TypeAliasRegistry typeAliasRegistry = new TypeAliasRegistry();

public MapperConfig() {
    typeAliasRegistry.registerAlias("jdbc", JdbcTransactionFactory.class);
    typeAliasRegistry.registerAlias("druid", DruidDataSourceFactory.class);
    typeAliasRegistry.registerAlias("unpooled", UnpooledDataSourceFactory.class);
    typeAliasRegistry.registerAlias("pooled", PooledDataSourceFactory.class);
}
```

```java
private final Map<String, MappedStatement> mappedStatementMap = new HashMap<>();
```

```java
private final MapperProxyRegistry mapperProxyRegistry = MapperProxyRegistry.getInstance();
```

# MapperConfigBuilder

```xml
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="jdbc"/>
            <dataSource type="pooled">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://127.0.0.1:3306/db?useUnicode=true"/>
                <property name="username" value="root"/>
                <property name="password" value="111"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <mapper resource="mapper/UserMapper.xml"/>
    </mappers>
</configuration>
```

Get DataSource.

```java
Properties properties = new Properties();
for (Element propertyEle : propertyEleList) {
    String name = propertyEle.attributeValue("name");
    String value = propertyEle.attributeValue("value");
    properties.setProperty(name, value);
}

DataSource dataSource = dataSourceFactory.getDataSource(properties);
```

Get TransactionFactory.

```java
Element transactionManagerEle = environmentEle.element("transactionManager");
String transactionManagerType = transactionManagerEle.attributeValue("type");
TransactionFactory transactionFactory;
try {
    transactionFactory = (TransactionFactory) typeAliasRegistry.resolveAlias(transactionManagerType)
        .getDeclaredConstructor()
        .newInstance();
} catch (InstantiationException | IllegalAccessException | InvocationTargetException |
         NoSuchMethodException e) {
    throw new RuntimeException(e);
}
```

```java
Environment environment = new Environment.Builder()
    .id(id)
    .transactionFactory(transactionFactory)
    .dataSource(dataSource)
    .build();
```

Parse Sql.

```java
MappedStatement mappedStatement = new MappedStatement();
mappedStatement.setId(mappedStatementId);
mappedStatement.setMapperConfig(mapperConfig);
mappedStatement.setSqlCommandType(sqlCommandType);
mappedStatement.setParameterType(parameterType);
mappedStatement.setResultType(resultType);
mappedStatement.setSql(sql);
mappedStatement.setParameter(parameterMapping);
mappedStatement.setBoundSql(boundSql);

mapperConfig.addMappedStatement(mappedStatement);
```

# MapperProxyFactory

```java
public class MapperProxyFactory<T> {
    private final Map<String, MapperMethod> mapperMethodMap = new ConcurrentHashMap<>();
    
    private final Class<T> mapperInterface;
    
    public MapperProxyFactory(Class<T> mapperInterface) {
        this.mapperInterface = mapperInterface;
    }
    
    public T getMapperProxy(SqlSession sqlSession) {
        MapperProxyInvocationHandler mapperProxyInvocationHandler = new MapperProxyInvocationHandler(sqlSession, mapperInterface, mapperMethodMap);
        
        Object mapperProxy = Proxy.newProxyInstance(mapperInterface.getClassLoader(), new Class[]{mapperInterface}, mapperProxyInvocationHandler);
        
        return mapperInterface.cast(mapperProxy);
    }
    
    private class MapperProxyInvocationHandler implements InvocationHandler, Serializable {
        private final SqlSession sqlSession;
        
        private final Class<T> mapperInterfaceClass;
        
        private final Map<String, MapperMethod> mapperMethodCacheMap;
        
        @Serial
        private static final long serialVersionUID = 1L;
        
        public MapperProxyInvocationHandler(SqlSession sqlSession, Class<T> mapperInterfaceClass, Map<String, MapperMethod> mapperMethodCacheMap) {
            this.sqlSession = sqlSession;
            this.mapperInterfaceClass = mapperInterfaceClass;
            this.mapperMethodCacheMap = mapperMethodCacheMap;
        }
        
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            if (Object.class.equals(method.getDeclaringClass())) {
                return method.invoke(this, args);
            }
            
            String mappedStatementId = mapperInterfaceClass.getName() + "." + method.getName();
            
            MapperMethod mapperMethod = mapperMethodCacheMap.get(mappedStatementId);
            if (mapperMethod == null) {
                MapperConfig mapperConfig = sqlSession.getMapperConfig();
                mapperMethod = new MapperMethod(mapperConfig, mapperInterfaceClass, method);
                mapperMethodCacheMap.put(mappedStatementId, mapperMethod);
            }
            
            return mapperMethod.execute(sqlSession, args);
        }
    }
}
```

