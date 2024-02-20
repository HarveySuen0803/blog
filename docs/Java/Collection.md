# Collection structure

| 集合          | 结构                              |
| ------------- | --------------------------------- |
| ArrayList     | 可变数组 (Object[] elementData)   |
| Vector        | 可变数组 (Object[] elementData)   |
| LinkedList    | 双向链表                          |
| HashSet       | 哈希表 (数组 + 单向链表 + 红黑树) |
| LinkedHashSet | 哈希表 (数组 + 双向链表)          |
| TreeSet       | 哈希表 (数组 + 单向链表 + 红黑树) |
| HashMap       | 哈希表 (数组 + 单向链表 + 红黑树) |
| Hashtable     | 哈希表 (数组 + 单向链表 + 红黑树) |
| TreeMap       | 哈希表 (数组 + 单向链表 + 红黑树) |
| Properties    | 哈希表 (数组 + 单向链表 + 红黑树) |

# Collection feature

| 集合          | 默认      | 扩容倍数  | 线程安全 | 有序✓/无序✗/排序○ | null |
| ------------- | --------- | --------- | -------- | ----------------- | ---- |
| ArrayList     | 10        | 1.5       | ✗        | ✓                 | ✓    |
| Vector        | 10        | 2         | ✓        | ✓                 | ✓    |
| LinkedList    | \         | \         | ✗        | ✓                 | ✓    |
| HashSet       | 16 (0.75) | 2         | ✗        | ✗                 | ✓    |
| LinkedHashSet | 16 (0.75) | 2         | ✗        | ✓                 | ✓    |
| TreeSet       | 16 (0.75) | 2         | ✗        | ○                 | ✓    |
| HashMap       | 16 (0.75) | 2         | ✗        | ✗                 | ✓    |
| Hashtable     | 16 (0.75) | 2         | ✓        | ✗                 | ✗    |
| TreeMap       | 8 (0.75)  | 2 * x + 1 | ✗        | ○                 | ✗    |
| Properties    | 16 (0.75) | 2         | \        | ✗                 | ✗    |

# Interation

## iterator()

Collection 实现了 Iterable, 可以使用 iterator() 完成遍历

- 迭代器的数据结构是栈

```java
Collection col = new ArrayList();

col.add("sun");
col.add("xue");
col.add("cheng");

// 获取 list 的迭代器
Iterator iterator = col.iterator();

// hasNext() 判断下一个元素是否存在
while (iterator.hasNext()) {
    // next() 访问下一个元素
    Object obj = iterator.next();
    System.out.println(obj);
}

// 迭代器指向了栈的底端, 再次遍历, 需要重新获取迭代器
iterator = col.iterator();

while (iterator.hasNext()) {
    Object next = iterator.next();
    System.out.println(next);
}
```

## for()

```java
Collection col = new ArrayList();

col.add("sun");
col.add("xue");
col.add("cheng");

// 遍历集合
for (Object obj : col) {
    System.out.println(obj);
}

int[] nums = {1, 2, 3, 4, 5};

// 遍历数组
for (int num : nums) {
    System.out.println(num);
}
```

# Collection

## Collection

Collection 单列集合

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202206170912678.png)

```java
ArrayList arrayList = new ArrayList();

arrayList.add("sun");
arrayList.add("xue");
arrayList.add("cheng");

System.out.println(arrayList); // [sun, xue, cheng]
```

### add()

```java
Collection col = new ArrayList();

col.add("jack"); 
col.add(10);
col.add(true);
col.add(new Dog());

// 返回一个 Boolean, 表示是否添加成功
System.out.println(col.add(1)); // true
```

### remove()

```java
// 删除 索引 0 的元素
col.remove(0); 

// 删除"jack"对象
col.remove("jack"); 
```

### contains()

```java
// 判断 "jack" 是否存在
boolean b = col.contains("jack");
```

### isEmpty()

```java
// 判断 col 是否为空
boolean b = col.isEmpty();
```

### clear()

```java
// 清空 col
col.clear();
```

### addAll()

```java
Collection col1 = new ArrayList();
Collection col2 = new ArrayList();
Collection col3 = new ArrayList();

col1.add("aaa");
col2.add("bbb");
col2.add("ccc");
col3.add("eee");
col3.add("fff");

// 在 col1 末尾, 添加 col3 的所有元素
col1.addAll(col3); 
```

### cotainsAll()

```java
Collection col1 = new ArrayList();
Collection col2 = new ArrayList();

col1.add("aaa");
col1.add("bbb");
col1.add("ccc");
col2.add("bbb");
col2.add("ccc");

// 判断 col1 是否有 col2 的所有元素
Boolean b = col1.containsAll(col2);
```

### removeAll() 

```java
Collection col1 = new ArrayList();
Collection col2 = new ArrayList();

col1.add("aaa");
col1.add("bbb");
col1.add("ccc");
col2.add("bbb");
col2.add("ccc");

// 删除 col1 中, 所有和 col2 相同的数据
col1.removeAll(col2);
```

## List

### List

List 的实现类的集合, 存储的元素有序, 支持索引, 可以存储重复元素, 可以存储 null

- 比如: ArrayList, LinkedList, Vector, Stack, AbstractList, RoleList

```java
List list = new ArrayList();

list.add(100);
list.add(true);
list.add("haha");

// 返回 索引 0 的元素
System.out.println(list.get(0)); // 100

System.out.println(list); // [100, true, haha]
```

ArrayList, Vector, LinkedList

- 改查结点多, 使用 ArrayList (大部分操作都是查询, 一般都使用 ArrayList)
- 增删结点多, 使用 LinkedList
- 多线程, 使用 Vector

#### get()

List 的实现类可以通过 get() 访问元素

```java
List list = new ArrayList();

list.add("sun");
list.add("xue");
list.add("cheng");

for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
```

#### add()

```java
List list = new ArrayList();

list.add("aa");
list.add("bb");
list.add("cc");

// 在 索引 1 处, 插入 "AA"
list.add(1, "AA"); 

System.out.println(list); // [aa, AA, bb, cc]
```

#### addAll()

```java
List list1 = new ArrayList();
List list2 = new ArrayList();

list1.add("aa");
list1.add("bb");
list1.add("cc");
list2.add("AA");
list2.add("BB");

// 在 list1 的索引 1 处, 插入 list2 的所有元素
list1.addAll(1, list2); 

System.out.println(list1); // [aa, AA, BB, bb, cc]
```

#### indexOf()

```java
List list = new ArrayList();

list.add("sun");
list.add("xue");
list.add("cheng");
list.add("sun");
list.add("xue");

// 返回 "sun" 首次出现的索引
int firstIndex = list.indexOf("sun"); // 0
```

#### lastIndexOf()

```java
// 返回 "sun" 最后出现的索引
int lastIndex = list.lastIndexOf("sun"); // 3
```

#### set()

```java
// 将 索引 1 的元素替换为 "AA"
list.set(1, "AA");
```

#### subList()

```java
// 返回 [2, 3) 的元素
List returnList = list.subList(2, 3);
```

### ArrayList

ArrayList 线程不安全, 数据存储在 Object[] elementData 中

elementData 扩容机制

- 访问无参构造器
    - 初始容量为 0
    - 第一次添加元素时, 扩容 10
    - 后续扩容, 每次扩容 1.5 倍
- 访问有参构造器
    - 初始容量为指定参数大小
    - 后续扩容, 每次扩容 1.5 倍

### Vector

Vector 线程安全, 数据存储在 Object[] elementData 中

elementData 扩容机制

- 访问无参构造器
    - 初始容量为 0
    - 第一次添加元素时, 扩容 10
    - 后续扩容, 每次扩容 2 倍
- 访问有参构造器
    - 初始容量为指定参数大小
    - 后续扩容, 每次扩容 2 倍

### LinkedList

LinkedList 线程不安全, 数据存储在双向链表中

## Set

Set 的实现类, 存储的元素无序, 不支持索引, 不可以存储重复元素, 可以存储一个 null

- 比如: HashSet, LinkedHashSet, TreeSet, AbstractSet

```java
Set set = new HashSet();

set.add(10);
set.add("sun");
set.add(true);
set.add(new String("xue"));
set.add(null);

System.out.println(set); // [xue, 10, sun, true, null]
```

Set 根据 hashCode 判断添加的对象是否重复

```java
public class Main {
    public static void main(String[] args) throws Exception {
        HashSet<Person> hashSet = new HashSet<>();
        hashSet.add(new Person("sun", 18));
        hashSet.add(new Person("sun", 18)); // 添加无效
    }
}

class Person {
    public String name;
    public int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

### HashSet

HashSet 数据存储在数组中, 数组存储单向链表, 采用 HashMap 的存储机制, 扩容机制

### LinkedHashSet

HashSet 数据存储在数组中, 数组存储双向链表, 采用 HashMap 的存储机制

### TreeSet

TreeSet 存储的数据可以通过 Comparator 排序

```java
TreeSet treeSet = new TreeSet(new Comparator() {
    @Override
    public int compare(Object o1, Object o2) {
        String str1 = (String) o1;
        String str2 = (String) o2;

        return str2.compareTo(str1);
    }
});

treeSet.add("d");
treeSet.add("a");
treeSet.add("g");
treeSet.add("e");
treeSet.add("c");
treeSet.add("f");
treeSet.add("b");

System.out.println(treeSet); // [g, f, e, d, c, b, a]
```

去重机制

- 如果传入的 Comparator != null, 就通过 compare() 进行比较
    - 如果相同, 返回 0, 就不添加元素
    - 如果不同, 返回非 0, 就添加元素
- 如果传入的 Comparator == null, 就通过传入的对象实现的 Comparable 接口的 compareTo() 比较
    - 比如: 添加一个 "abc", 就通过 String 实现的 Compareable 接口的 compareTo() 去重

```java
final int compare(Object k1, Object k2) {
    return comparator == null ? ((Comparable<? super K>)k1).compareTo((K)k2) : comparator.compare((K)k1, (K)k2);
}
```

## Collections

Collections 工具类, 可以操作 Set, List, Map

### reverse()

```java
// 反转元素顺序, List 有序, 可以反转, Set 无序, 没有意义
Collections.reverse(arrayList); // [cc, bb, aa]
```

### shuffle()

```java
// 随机排序
Collections.shuffle(arrayList);
```

### sort()

自然排序: 根据字符大小, 数值大小排序

```java
Collections.sort(arrayList); // [aa, bb, cc, dd, ee, ff]
```

定制排序

```java
Collections.sort(arrayList, new Comparator<Object>() {
    @Override
    public int compare(Object o1, Object o2) {
        return ((String)o1).length() - ((String)o2).length();
    }
});
```

手动定制排序

```java
@SuppressWarnings("all")
public class Main {
    public static void main(String[] args) throws Exception {
        List<Person> list = new ArrayList();
        list.add(new Person("sun", 18));
        list.add(new Person("xue", 16));
        list.add(new Person("cheng", 20));
        sort(list);
    }

    public static void sort(List list) {
        for (int i = 0; i < list.size() - 1; i++) {
            for (int j = 0; j < list.size() - 1 - i; j++) {
                Person p1 = (Person) list.get(j);
                Person p2 = (Person) list.get(j + 1);
                if (p1.age > p2.age) {
                    list.set(j, p2);
                    list.set(j + 1, p1);
                }
            }
        }
    }
}

class Person {
    public String name;
    public int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

### swap()

```java
// 交换 索引 0 和 索引 1 的元素
Collections.swap(arrayList, 0, 1);
```

### max()

根据自然排序, 返回最大的元素

```java
// 
Object maxObj1 = Collections.max(arrayList);
```

通过定制排序, 返回最小的元素

```java
Object maxObj2 = Collections.max(arrayList, new Comparator<Object>() {
    @Override
    public int compare(Object o1, Object o2) {
        return ((String)o1).length() - ((String)o2).length();
    }
});
```

### min()

根据自然排序, 返回最小的元素

```java
Object minobj1 = Collections.min(arrayList);
```

通过定制排序, 返回最大的元素

```java
Object minobj2 = Collections.min(arrayList, new Comparator<Object>() {
    @Override
    public int compare(Object o1, Object o2) {
        return ((String)o2.length()) - ((String)o1).length();
    }
});
```

### requency()

```java
// 返回 "aa" 出现的次数
int count = Collections.frequency(arrayList, "aa");
```

### copy()

```java
ArrayList destList = new ArrayList();

// 需要 destList.size() >= sourceList.size(), 直接进行 Collections.copy(), 会报 IndexOutOfBoundsException
for (int i = 0; i < sourceList.size(); i++) {
    destList.add("");
}

// 拷贝 sourceList 到 destList
Collections.copy(destList, sourceList);
```

### replaceAll()

```java
// 替换所有的 "aa" 为 "AA"
Collections.replaceAll(arrayList, "aa", "AA");
```

# Map

## Map

Map 双列集合: 存储 key-value

- key 和 value 可以是任意类型的数据, 会被封装到到 HashMap$Node 中
- key 不可以重复存储, value 可以重复存储
- key 和 value 都可以存储 null, key 只可以存储一个 null

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202206170912690.png)

```java
HashMap hashMap = new HashMap();

hashMap.put("no1", "sun");
hashMap.put("no2", "xue");
hashMap.put("no3", "cheng");

System.out.println(hashMap); // {no1=sun, no2=xue, no3=cheng}
```

### entrySet()

一对 k-v 对应 HashMap.Node object, 存储在 Node<K, V>\[\] table 中

HashMap.Node 实现了 Map.Entry, 一个 HashMap.Node object 对应一个 Map.Entry object, 存储在 Set<Map.Entry<K, V>> entrySet 中

```java
public class HashMap<K,V> extends AbstractMap<K,V> {
    Node<K,V>[] table;
    
    Set<Map.Entry<K, V>> entrySet;
    
    static class Node<K,V> implements Map.Entry<K,V> {}
}
```

HashMap.Node object 的简化存储过程

```java
Node<K,V>[] table;

HashMap.Node node1 = newNode(hash, key, value, null)
HashMap.Node node2 = newNode(hash, key, value, null)
HashMap.Node node3 = newNode(hash, key, value, null)

table[0] = node1;
node1.next = node2;
table[1] = node3;
```

Map.Entry object 的简化存储过程

```java
Set<Map.Entry<K, V>> entrySet;

Map.Entry entry1 = node1;
Map.Entry entry2 = node2;

entrySet.add(entry1);
entrySet.add(entry2);
```

通过 Map.Entry object 的 getKey() 和 getValue 访问 HashMap.Node object

```java
String key = entry.getKey;
String value = entry.getValule;
```

遍历 Map 集合

```java
Map map = new HashMap();

map.put("no1", "sun");
map.put("no2", "xue");
map.put("no3", "cheng");

// 获取 map 的 entrySet
Set entrySet = map.entrySet(); // [no2=xue, no1=sun, no3=cheng]

// 通过 Iterator 遍历 entrySet
Iterator iterator = entrySet.iterator();
while (iterator.hasNext()) {
    Map.Entry entry = (Map.Entry) iterator.next();

    System.out.println(entry.getKey() + ": " + entry.getValue());
}
/*
    no2: xue
    no1: sun
    no3: cheng
 */

// 通过 for 遍历 entrySet
for (Object obj : entrySet) {
    Map.Entry entry = (Map.Entry) obj;

    System.out.println(entry.getKey() + ": " + entry.getValue());
}
/*
    no2: xue
    no1: sun
    no3: cheng
 */
```

### keySet()

key 引用 不仅存储在 entrySet 中, 也存储在 keySet 中

```java
Set<K> keySet();
```

```java
Set keySet = map.keySet();

Iterator iterator = keySet.iterator();

while (iterator.hasNext()) {
    Object obj = iterator.next();
    System.out.println(obj + " - " + map.get(obj));
}

for (Object key : keySet) {
    System.out.println(key + " - " + map.get(key));
}
```

### values()

value 引用 不仅存储在 entrySet 中, 也存储在 values 中

```java
Collection<V> values();
```

```java
Collection values = map.vlaues(); // 获取到values集合

Iterator iterator = values.iterator();

while (iterator.hasNext()) {
    Object obj = iterator.next();
    System.out.println(obj);
}

for (Object value : values) {
    System.out.println(value);
}
```

### put()

```java
Map map = new HashMap();

map.put("no1", "sun");
map.put(null, "cheng");
map.put("no2", null);

System.out.println(map); // {null=cheng, no2=null, no1=sun}

// 添加的相同 key 的元素, 覆盖上一个
map.put("no1", "xue");
```

### get()

```java
// 根据 key, 返回 value
Object val = map.get("no3");
```

### replace()

```java
// 根据 key, 替换 value
map.replace("no1", "sun");
```

### size()

```java
// 返回元素个数
int size = map.size();
```

### isEmpty()

```java
// 判断集合是否为空
boolean isEmpty = map.isEmpty();
```

### containsKey()

```java
// 判断 key 是否存在
boolean containsKey = map.containsKey("no4"); // true
```

### remove()

```java
// 根据 key, 删除元素
map.remove("no2");
```

### clear()

```java
// 清除所有的元素
map.clear();
```

## HashMap

HashMap 线程不安全, 数据存储在数组中, 数组存储单向链表, key 和 value 都可以存储 null, key 只能存储一个 null

- 添加元素, 获取元素的 hashCode 值, 转成 hash 值, 转成索引值
- 根据索引值, 找到指定位置, 判断该索引处是否存储了数据
    - 如果没有, 直接存储
    - 如果有, 通过 equals() 判断是否相同
        - 如果相同, 放弃存储
        - 如果不同, 在索引处, 建立链表, 通过链表存储数据

数组的扩容机制

- 初始容量为 0
- 第一次添加元素时, 扩容为 16
- 达到 临界值 (容量 * 0.75) 时, 后续扩容, 每次扩容 2 倍
- 一条链表上的元素个数 >= 8 时, 每添加一个元素, 就扩容 2 倍

一条链表上的元素个数 >= 8 && 数组的容量 >= 64 就会将链表转成红黑树

## HashTable

HashTable 线程安全, 数据存储在数组中, 数组存储单向链表, key 和 value 都不可以存储 null

数组的扩容机制

- 初始容量为 0
- 第一次添加元素时, 扩容为 11
- 达到 临界值 (容量 * 0.75) 时, 后续扩容, 每次扩容 2 倍 + 1

## Properties

Properties 继承 Hashtable, 实现 Map, key 和 value 都不可以存储 null

Properties 可以读取 xxx.properties 配置文件, 加载数据到 Properties 对象中

## TreeMap

TreeMap 和 TreeSet 类似, 存储的数据可以通过 Comparator 排序

