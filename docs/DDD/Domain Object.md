# Domain Primitive

领域原语（Domain Primitive）封装单个属性，封装基本的验证逻辑，确保每次创建的数据都是合法的，通常用于代表简单但有业务含义的值（如：电子邮件地址、用户名、货币金额）。

定义一个 EmailAddress Dp 和 Password Dp：

```java
public class EmailAddress {
    private final String value;

    public EmailAddress(String value) {
        if (value == null || !value.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("Invalid email address");
        }
        this.value = value;
    }

    public String getValue() { return value; }
    
    public boolean isSameDomain(EmailAddress other) { 
        return this.value.split("@")[1].equals(other.value.split("@")[1]);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmailAddress that = (EmailAddress) o;
        return value.equals(that.value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }

    @Override
    public String toString() {
        return value;
    }
}
```

# Value Object

值对象（Value Object）封装多个属性，不具唯一标识，通过属性值进行比较，通常不可变，表示复杂的领域概念（如：地址、货币、时间范围）。

定义一个 Address Vo：

```java
public class Address {
    private final String street;
    private final String city;
    private final String zipCode;

    public Address(String street, String city, String zipCode) {
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
    }

    // 行为 - 验证邮编格式
    public boolean isValidZipCode() {
        return zipCode.matches("^\\d{5}(?:[-\\s]\\d{4})?$");
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return street.equals(address.street) && city.equals(address.city) && zipCode.equals(address.zipCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(street, city, zipCode);
    }

    @Override
    public String toString() {
        return street + ", " + city + ", " + zipCode;
    }
}
```

# Entity

实体（Entity）封装了 Domain Primitive、Value Object、普通属性。实体是具有唯一标识（ID）的领域对象，封装了与其相关的业务逻辑，确保其一致性和业务规则的正确性。实体有生命周期，并且可以经历状态变化。

假设我们有一个用户实体（User），它包含了用户的基本信息和业务逻辑。用户的基本信息可以由领域原语和值对象组成。

```java
public class User {
    private UserId id;
    private String name;
    private EmailAddress email;
    private Password password;
    private Address address;

    public User(UserId id, String name, EmailAddress email, Password password, Address address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
    }

    public void changeEmail(EmailAddress newEmail) {
        if (!this.email.isSameDomain(newEmail)) {
            throw new IllegalArgumentException("Domain of new email must be the same as the old one");
        }
        this.email = newEmail;
    }

    public void changePassword(Password newPassword) {
        if (this.password.matches(newPassword.getValue())) {
            throw new IllegalArgumentException("New password must be different from the old one");
        }
        this.password = newPassword;
    }

    // Getter 方法
    public UserId getId() { return id; }
    public String getName() { return name; }
    public EmailAddress getEmail() { return email; }
    public Password getPassword() { return password; }
    public Address getAddress() { return address; }
}
```

# Aggregate

聚合根（Aggregate Root）是聚合的入口点和唯一外部访问点，保证聚合内数据一致性。它管理聚合内部的所有对象的生命周期、行为和一致性。

- 聚合根是一种特殊的实体，它不仅具有实体的所有特征，还承担着管理和维护整个聚合内所有对象一致性和完整性的职责。

聚合（Aggregate）由一组相关对象（实体和值对象）组成的集合，由聚合根来管理。聚合确保它内部对象的一致性和业务规则。

假设我们有一个电商系统，其中订单（Order）是一个聚合根，订单项（OrderItem）是订单的一个组成部分（实体），Order 作为聚合根，是唯一的外部访问入口，管理着 OrderItem。整个 Order 就是一个聚合。

```java
public class Order {
    private String orderId;
    private String customerId;
    private List<OrderItem> items;
    private OrderStatus status;

    public Order(String customerId) {
        this.orderId = UUID.randomUUID().toString();
        this.customerId = customerId;
        this.items = new ArrayList<>();
        this.status = OrderStatus.CREATED;
    }

    // 添加订单项
    public void addItem(String productId, int quantity, double unitPrice) {
        if (this.status != OrderStatus.CREATED) {
            throw new IllegalStateException("Cannot add items to a processed order");
        }
        OrderItem item = new OrderItem(productId, quantity, unitPrice);
        this.items.add(item);
    }

    // 确认订单
    public void confirm() {
        if (this.items.isEmpty()) {
            throw new IllegalStateException("Cannot confirm an empty order");
        }
        this.status = OrderStatus.CONFIRMED;
    }

    // 取消订单
    public void cancel() {
        this.status = OrderStatus.CANCELLED;
    }

    // 获取订单总金额
    public double getTotalAmount() {
        return items.stream().mapToDouble(OrderItem::getTotalPrice).sum();
    }

    // Getters
    public String getOrderId() { return orderId; }
    public String getCustomerId() { return customerId; }
    public List<OrderItem> getItems() { return items; }
    public OrderStatus getStatus() { return status; }

    // Other necessary methods
}
```