# 数据结构与算法

## 数据结构与算法的关系

数据结构是一种组织数据方式的学科,数据结构是算法的基础,想要学好算法,就得要学好数据结构

程序 = 数据结构 + 算法

## 线性结构与非线性结构

> 线性结构

线性结构为最常见的数据结构,数据元素之间存在一对一的线性关系,线性结构有两种不同的存储结构: 顺序存储结构 和 链式存储结构

顺序存储结构的线性表称为 顺序表,顺序表中存储的元素都是连续的

链式存储结构的线性表称为 链表,链表中的元素不一定是连续的,元素结点中存放着该数据元素以及相邻元素的地址信息

线性结构常见的有: 数组, 队列, 链表 ,栈

> 非线性结构

非线性结构就不存在数据元素一对一的关系了

非线性结构常见的有: 二维数组, 多维数组, 广义表, 树结构, 图结构

# 算法的复杂度

## 时间频度

### Info

一个算法花费的时间与算法中语句的执行次数成正比例，哪个算法中语句执行次数多，它花费时间就多。一个算法中的语句执行次数称为语句频度或时间频度。记为T(n)

对于一个时间频度的表达式,如: T(n) = 2n^2+3n+10 我们可以采取 忽略常数, 忽略低次项, 忽略系数 这些方式来处理

### 忽略常数

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523461.png)

### 忽略低次项

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523462.png)

### 忽略系数

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523463.png)

对于两个二次方的数来讲,可以忽略系数,而对于高次项,比如三次方,就不可以忽略了,会拉开很大的差距

## 时间复杂度

### Info

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523464.png)

### 常见的时间复杂度

> Info

* 常数阶O(1)
* 对数阶O(log2n)
* 线性阶O(n)
* 线性对数阶O(nlog2n)
* 平方阶O(n^2)
* 立方阶O(n^3)
* k 次方阶O(n^k)
* 指数阶O(2^n)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523465.png)

> 对数阶O(log2n)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523466.png)

> 线性阶O(n)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523467.png)

> 线性对数阶O(nlogN)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523468.png)

> 平方阶O(n²)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523469.png)

### 平均 | 最坏 复杂度

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523470.png)
![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523471.png)

## 空间复杂度

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523472.png)

# 稀疏数组

## Info

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523473.png)![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523474.png)

* 二维数组存储,存储了很多默认值0,这种没有啥意义的数据,因此我们可以使用稀疏数组来解决该问题

* 稀疏数组存储

  * 第一行存放的是原始二维数组的行的个数,列的个数,以及有效数据的个数(这里即是不为默认值0的数)

  * 从第二行开始,第一列和第二列存储 二维数组元素的索引,第三列存储元素的值

* 存储效率比较

  * 二维数组: 6 * 7 = 42
  * 稀疏数组: 3 * 9 = 27

## Employ

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523475.png)

* 处理逻辑

  * 对五子棋的处理,是先将五子棋转化为一个二维数组

  * 进行存储的时候,需要将二维数组转成稀疏数组

  * 需要使用的时候,在将稀疏数组转换成二维数组

* 二维数组 转 稀疏数组 的思路

  * 遍历二维数组,得到有效数据的个数 sum
  * 根据sum就可以创建稀疏数组`sparseArr int[sum + 1][3]`
  * 将二维数组的有效数据存入到稀疏数组中

* 稀疏数组 转 二维数组 的思路

  * 先读取稀疏数组的第一行,根据第一行的数据,创建原始的二维数组,比如上面的`chessArr = int[11][11]`,因为稀疏数组的第一行存放了原始二维数的行和列的个数,以及有效数据的个数
  * 在读取稀疏数组后几行(即从第二行开始向后)的数据,并赋给原始的二维数组即可

```java
// 创建一个原始的二维数组, 11 * 11
// 0: 没有棋子, 1: 黑子, 2: 白子
int chessArr1[][] = new int[11][11];
chessArr1[1][2] = 1;
chessArr1[2][3] = 2;
// 遍历输出整个棋盘
System.out.println("----原始数组----");
for (int[] row : chessArr1) {
    for (int data : row) {
        System.out.print(data + "\t");
    }
    System.out.println();
}
System.out.println();

// 将 二维数组 转 稀疏数组
// 通过遍历的方式将有效数据个数记录在sum里
int sum = 0;
for (int[] row : chessArr1) {
    for (int data : row) {
        if (data != 0) {
            sum++;
        }
    }
}
// 创建对应的稀疏数组,并进行初始化操作
int sparseArr[][] = new int[sum + 1][3];
sparseArr[0][0] = 11;
sparseArr[0][1] = 11;
sparseArr[0][2] = sum;

// 遍历二维数组,将有效值存放到sparseArr中
int count = 0;
for(int i = 0; i < chessArr1.length; i++) {
    for(int j = 0; j < chessArr1[i].length; j++) {
        if (chessArr1[i][j] != 0) {
            count++;
            sparseArr[count][0] = i;
            sparseArr[count][1] = j;
            sparseArr[count][2] = chessArr1[i][j];
        }
    }
}

// 输出稀疏数组的形式
System.out.println("----稀疏数组----");
for(int i = 0; i < sparseArr.length; i++) {
    System.out.printf("%d\t%d\t%d\t", sparseArr[i][0], sparseArr[i][1], sparseArr[i][2]);
    System.out.println();
}

// 将稀疏数组存储到配置文件中去
String destFile = "src\\sparseArrData.txt";
BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(destFile));
for(int i = 1; i < sparseArr.length; i++) {
    String content = sparseArr[i][0] + "\t" + sparseArr[i][1] + "\t" + sparseArr[i][2];
    bufferedWriter.write(content);
    bufferedWriter.newLine();
}
bufferedWriter.close();

// 将 稀疏数组 转 二维数组, 读取配置文件
BufferedReader bufferedReader = new BufferedReader(new FileReader("src\\sparseArrData.txt"));
// 读取文本的第一行,即稀疏数组的第一行,第一行存储的是: 原先数组的行数 原先数组的列数 原先数组的有效元素个数
String line = bufferedReader.readLine();
// 通过split()分割字符串为数组
String[] splits = line.split("\t");
// 初始化原先的二维数组,因为splits是String类型的,需要通过Integer.parseInt()将String转成Integer类型
int chessArr2[][] = new int[Integer.parseInt(splits[0])][Integer.parseInt(splits[1])];
// 从第二行开始读取文本
while ((line = bufferedReader.readLine()) != null) {
    splits = line.split("\t");
    // 将row,col,val分别进行类型转换
    int row = Integer.parseInt(splits[0]);
    int col = Integer.parseInt(splits[1]);
    int val = Integer.parseInt(splits[2]);
    // 给原先的数组赋值
    chessArr2[row][col] = val;
}
bufferedReader.close();

System.out.println("----原始数组----");
for (int[] row : chessArr2) {
    for (int data : row) {
        System.out.print(data + "\t");
    }
    System.out.println();
}
```

# 队列

## Info

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523476.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523477.png)

rear表示尾部,front表示头部

由此可以看出,队列存储数据是遵循先进先出的规则,加数据是从尾部加入,取数据是从首部取出

## 数组模拟队列

* 我们会创建一个Queue类,来表示队列,该类的属性有:

  * 一个数组,该数组里存储的就是数据

  * maxSize,表示该队列的最大容量

  * front,记录队列的前端,队列最前元素(不含),front会随着数据的输出(减少数据)而改变

  * rear,记录队里的后端,队列最后(含),rear会随着数据的输入(增加数据)而改变


* 我们将数据存入队列时,称为"addQueue",addQueue的处理需要有两步骤

  * 当队里还没有满的时候(rear < maxSize - 1),将尾指针后移: rear + 1,将数据存入rear所指的数组中

  * 当队里满了之后(rear = maxSize - 1),就无法存入数据了

```java
// 这段代码实现存在一些问题,这里的取出数据,只是让front向后移一位,而没有真正的从arr数组中,这一个元素剔除,所以当添加满之后,再取出,再添加数据会添加不进去,因为已经已经达到了最大的容量
// 可以通过将普通队列优化成一个环形队列(取模 %),来解决这个问题
public class Test_ {
    public static void main(String[] args){
        ArrayQueue arrayQueue = new ArrayQueue(3); // 创建了一个容量为3的队列
        Scanner scanner = new Scanner(System.in);
        boolean loop = true;
        while (loop) {
            System.out.println("s  展示数据");
            System.out.println("a  添加数据");
            System.out.println("g  获取数据");
            System.out.println("h  查看队列头的数据");
            System.out.println("q  退出");
            System.out.print("请输入你的选择: ");
            char key = scanner.next().toLowerCase().charAt(0);
            switch (key) {
                case 's':
                    arrayQueue.showQueue();
                    break;
                case 'a':
                    System.out.print("输入你要添加的数据: ");
                    int n = scanner.nextInt();
                    arrayQueue.addQueue(n);
                    System.out.println("添加完毕");
                    break;
                case 'g':
                    System.out.println("取出的数据是: " + arrayQueuegetQueue());
                    break;
                case 'q':
                    loop =  false;
                    System.out.println("退出成功");
                    break;
                case 'h':
                    System.out.println("队里头的数据是: " + arrayQueue.headQueue());
                    break;
                default:
                    System.out.println("输出错误,请重新输入");
                    break;
            }
        }

    }
}

// 使用数组模拟队列
class ArrayQueue {
    private int maxSize; // 表示数组的最大容量
    private int front = -1; // 队列头,这里front = -1 表示指向队列头的前一个位置,即不包含第一个数据
    private int rear = -1; // 队列尾,这里rear = -1 表示指向了队列尾的数据,即就是队列的最后一个数据
    private int[] arr; // 存放数据,模拟队列

    // 通过构造器进行初始化操作
    public ArrayQueue(int maxSize) {
        this.maxSize = maxSize;
        arr = new int[maxSize];
    }

    // 判断队列是否满
    public boolean isFull() {
        return rear == maxSize - 1;
    }

    // 判断队里是否为空
    public boolean isEmpty() {
        return front == rear;
    }

    // 进队列,添加数据到队列的尾部
    public void addQueue(int n) {
        if (this.isFull()) {
            System.out.println("队列已满,无法添加数据");
            return;
        }
        rear++; // 让rear后移,即指向这个添加的数据
        arr[rear] = n;
    }

    // 出队列,获取队列的数据
    public int getQueue() {
        if (this.isEmpty()) {
            // 这里可以通过抛出异常,来终止操作
            throw new RuntimeException("该队列里没有数据,无法取出数据");
        }
        front++;
        return arr[front];
    }

    // 显示队列的所有的数据
    public void showQueue() {
        if (isEmpty()) {
            System.out.println("队列空, 没有数据");
            return;
        }
        System.out.print("队列的数据有: ");
        for (int i = front + 1; i <= rear; i++) {
            System.out.print(arr[i] + "\t");
        }
        System.out.println();
    }

    // 显示队列的头数据,注意不是取出数据
    public int headQueue() {
        if (isEmpty()) {
            throw new RuntimeException("队列为空,没有数据～～");
        }
        return arr[front + 1]; // 注意这里不能用front++,不然就修改了front的值了,会有问题
    }
}
```

## 数组模拟环形队列

* 对front和rear两个属性的概念做一个调整

  * front初始值为0,表示 指向队列的第一个元素,

  * rear初始值为0,表示 指向队列的最后一个元素的后一个位置,因为希望空出一个空间作为约定,即maxSize为6,最大存储5个元素

* 队列为满的条件: (rear + 1) % maxSize = front

* 队列为空的条件: rear == front

* 队列中有效数据的个数: (rear + maxSize - front) % maxSize

  * 注意这样写的目的是为了保证取到的结果为正数,因为在环形队列中的rear会可能小于front

```java
class CircleArrayQueue {
    private int maxSize; // 表示数组的最大容量,可以存储 maxSize - 1 个元素
    private int front = 0; // 队列头, 指向第一个元素
    private int rear = 0; // 队列尾, 指向最后一个元素的后一位
    private int[] arr; // 存放数据,模拟队列

    // 通过构造器进行初始化操作
    public CircleArrayQueue(int maxSize) {
        this.maxSize = maxSize; // 注意这里真实的容量为maxSize - 1,因为空出了一个空为作为约定
        arr = new int[maxSize];
    }

    // 判断队列是否满
    public boolean isFull() {
        // maxSize = 6,front = 0, rear = 5
        // (5 + 1) % 6 == 0;
        // 所以manSize为6,最多存放5个元素
        return (rear + 1) % maxSize == front;
    }

    // 判断队里是否为空
    public boolean isEmpty() {
        return front == rear;
    }

    // 进队列,添加数据到队列的尾部
    public void addQueue(int n) {
        if (isFull()) {
            System.out.println("队列已满");
            return;
        }
        // 先添加数据,再让rear后移,因为rear是指向了最后一个元素的后一位
        arr[rear] = n;
        // 必须要 % maxSize,这样可以做成一个环形队列,自己在草稿纸上走一圈就明白了
        rear = (rear + 1) % maxSize;
    }

    // 出队列,获取队列的数据
    public int getQueue() {
        if (isEmpty()) {
            // 这里可以通过抛出异常,来终止操作
            throw new RuntimeException("该队列里没有数据,无法取出数据");
        }
        // 第一个元素的值(front指向的元素)保留到一个临时变量中
        int value = arr[front];
        front = (front + 1) % maxSize; // 这样写可以做成一个环形的队列
        return value;
    }

    // 求出当前队列有效数据的个数
    public int dataSize() {
        return (rear + maxSize - front) % maxSize;
    }

    // 显示队列中的所有的数据
    public void showQueue() {
        if (isEmpty()) {
            System.out.println("队列空, 没有数据");
            return;
        }
        System.out.println("队列的数据有: ");
        for (int i = front; i < front + dataSize(); i++) { // 从front开始,然后向后dataSize()个有效数据
            System.out.println(i % maxSize + " : " + arr[i % maxSize]); // i % maxSize 自己在草稿纸上跑一圈就明白了
        }
        System.out.println(maxSize);
        System.out.println();
    }

    // 显示队列的头数据,注意不是取出数据
    public int headQueue() {
        if (isEmpty()) {
            throw new RuntimeException("队列为空,没有数据～～");
        }
        return arr[front]; // 这里的front就是指向了第一个元素,直接返回即可
    }
}
```

# 链表

## 单向链表

### Info

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523478.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523479.png)

### 顺序添加

```java
public class Test_ {
    public static void main(String[] args) throws Exception {
        SingleLinkedList singleLinkedList = new SingleLinkedList();
        Node node1 = new Node(1, "sun");
        Node node2 = new Node(2, "xue");
        Node node3 = new Node(3, "cheng");
        singleLinkedList.add(node1);
        singleLinkedList.add(node2);
        singleLinkedList.add(node3);
        singleLinkedList.list();
    }
}

class SingleLinkedList {
    // 初始化一个头结点
    private Node head = new Node(0, "");
    
    // 添加结点到单链表的最后
    public void add(Node node) {
        // 定义一个辅助指针,让temp指向头结点来进行遍历,不可以用head来遍历
        Node temp = head;
        // 找到链表的最后一个结点
        while (true) {
            if (temp.next == null) {
                break;
            }
            temp = temp.next;
        }
        // 将node结点添加到链表的最后
        temp.next = node;
    }
    
    // 显示链表
    public void list() {
        // 判断链表是否为空
        if (head.next == null) {
            System.out.println("链表为空");
            return;
        }
        // 从单链表的第一个结点开始遍历输出(不包括头结点)
        Node temp = head.next;
        while (true) {
            if (temp == null) {
                break;
            }
            System.out.println(temp);
            temp = temp.next;
        }
    }
}

// 定义Node类,表示结点,一个Node对象就是一个Node结点
class Node {
    public int no; // data域
    public String name; // data域
    public Node next; // 指向下一个结点

    public Node(int no, String name) {
        this.no = no;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Node{" +
                "no=" + no +
                ", name='" + name + '\'' +
                '}';
    }
}
```

### 插入结点

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523480.png)

```java
// 根据node结点的no属性,来插入结点
public void addByOrder(Node node) {
    Node temp = head;
    boolean flag = false; // 标志要添加的结点的编号是否存在链表中了
    // 根据node.no找到要插入的位置
    while (true) {
        // 判断找到了链表的最后,即node应该插入在最后
        if (temp.next == null) {
            break;
        }
        if (temp.next.no > node.no) { // 应该插入在temp.next.no的前面
            break;
        } else if (temp.next.no == node.no) { // 该结点的标号已经存在链表中了
            flag = true;
            break;
        }
        temp = temp.next;
    }
    if (flag) {
        System.out.println("要添加的结点的编号已经在链表中存在了");
        return;
    }
    node.next = temp.next;
    temp.next = node;
}
```

### 修改结点

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523481.png)

```java
// 修改结点,找到指定的编号,然后修改数据
public void update(Node node) {
    Node temp = head.next;
    boolean flag = false; // 标识是否找到了该节点
    while (true) {
        if (temp == null) { // 没找到
            break;
        }
        if (temp.no == node.no) { // 找到了
            flag = true;
            break;
        }
        temp = temp.next;
    }
    // 如果直接修改 temp.name = node.name会出现问题,因为不确定是否找到,如果没找到就是 null.name // error
    if (flag) {
        temp.name = node.name;
    } else {
        System.out.println("没有找到");
    } 
}
```

### 删除结点

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523482.png)

```java
// 删除结点
public void del(int no) {
    Node temp = head;
    boolean flag = false; // 标识 找到了要删除的结点
    while (true) {
        if (temp.next == null) {
            break;
        }
        if (temp.next.no == no) { // 找到了要删除的结点
            flag = true;
            break;
        }
        temp = temp.next;
    }
    if (flag) {
        temp.next = temp.next.next;
    } else {
        System.out.println("没找到");
    }
}
```

## 双向链表

### Info

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523483.png)

### 顺序添加

```java
public class Test_ {
    public static void main(String[] args) throws Exception {
        Node node1 = new Node(1, "sun");
        Node node2 = new Node(2, "xue");
        Node node3 = new Node(3, "cheng");
        DoubleLinkedList doubleLinkedList = new DoubleLinkedList();
        doubleLinkedList.add(node1);
        doubleLinkedList.add(node2);
        doubleLinkedList.add(node3);
        doubleLinkedList.list();
    }
}

class DoubleLinkedList {
    Node head = new Node(0, "");
    // 添加结点
    public void add(Node node) {
        Node temp = head;
        // 找到链表的最后一个结点
        while (true) {
            if (temp.next == null) {
                break;
            }
            temp = temp.next;
        }
        temp.next = node;
        node.pre = temp;
    }

    // 显示链表
    public void list() {
        if (head.next == null) {
            System.out.println("链表为空");
            return;
        }
        Node temp = head.next;
        while (true) {
            if (temp == null) {
                break;
            }
            System.out.println(temp);
            temp = temp.next;
        }
    }
}

// 定义Node类,表示结点,一个Node对象就是一个Node结点
class Node {
    public int no; // data域
    public String name; // data域
    public Node next; // 指向后一个结点
    public Node pre; // 指向前一个结点

    public Node(int no, String name) {
        this.no = no;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Node{" +
            "no=" + no +
            ", name='" + name + '\'' +
            '}';
    }
}
```

### 插入结点

```java
// 根据no属性来插入结点
public void addByOrder(Node node) {
    Node temp = head;
    while (true) {
        // 找到了链表的最后,即node结点要添加到链表的最后
        if (temp.next == null) {
            temp.next = node;
            node.pre = temp;
            return;
        }
        if (temp.next.no > node.no) { // 找到了要插入的位置
            node.next = temp.next;
            node.pre = temp;
            temp.next.pre = node;
            temp.next = node;
            return;
        } else if (temp.next.no == node.no) { // 找到了编号相同的,即不添加
            System.out.println("该编号的结点已经存在");
            return;
        }
        temp = temp.next;
    }
}
```

### 修改结点

```java
// 修改结点
public void update(Node node) {
    Node temp = head.next;
    boolean flag = false; // 标识 是否找到了要修改的结点
    while (true) {
        if (temp == null) {
            break;
        }
        if (temp.no == node.no) {
            flag = true;
            break;
        }
        temp = temp.next;
    }
    if (flag) {
        temp.name = node.name;
    } else {
        System.out.println("没找到");
    }
}
```

### 删除结点

```java
// 删除结点,写法1
public void del1(int no) {
    Node temp = head;
    boolean flag = false;
    while (true) {
        if (temp.next == null) {
            break;
        }
        if (temp.next.no == no) {
            flag = true;
            break;
        }
        temp = temp.next;
    }
    if (flag) {
        // 当temp.next为最后一个结点时,情况比较特殊
        if (temp.next.next == null) {
            temp.next = null;
            return;
        }
        temp.next.next.pre = temp;
        temp.next = temp.next.next;
    } else {
        System.out.println("没有找到要删除的结点");
    }
}
// 删除结点, 写法2
public void del2(int no) {
    if (head.next == null) {
        System.out.println("链表为空");
        return;
    }
    Node temp = head.next;
    boolean flag = false;
    while (true) {
        if (temp == null) {
            break;
        }
        if (temp.no == no) {
            flag = true;
            break;
        }
        temp = temp.next;
    }
    if (flag) {
        // 当temp为最后一个结点是
        if (temp.next == null) {
            temp.pre.next = null;
            return;
        }
        temp.pre.next = temp.next;
        temp.next.pre = temp.pre;

        /*
            // 简化代码,自己品一品
            temp.pre.next = temp.next;
            if (temp.next != null) {
                temp.pre.next = temp.next;
            }
        */
    } else {
        System.out.println("没有找到要删除的结点");
    } 
}
```

## 环形链表

### Info

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523484.png)

### 顺序添加

```java
// 这里是单向
class CircleSingleLinkedList {
    // 创建first结点
    Node first = null;
    // 顺序添加结点
    public void add(int nums) {
        // 对nums进行校验
        if (nums < 1) {
            System.out.println("nums值不正确");
            return;
        }
        Node temp = null; // 赋值指针
        // 创建环形链表
        for (int i = 1; i <= nums; i++) {
            Node node = new Node(i);
            if (i == 1) { // 当添加第一个结点时
                first = node;
                node.next = first; // 让第一个结点的next指向自己,构成环状
                temp = node; // 让temp指向最新添加的结点,好操作后续的结点添加
            } else { // 添加后续结点
                temp.next = node; // 添加结点
                node.next = first; // 指向第一个结点,即first结点
                temp = node; // 让temp指向最新添加的结点,好操作后续的结点添加
            }
        }
    }

    // 展示结点
    public void list() {
        if (first == null) {
            System.out.println("链表为空");
            return;
        }
        Node temp = first;
        while (true) {
            System.out.println(temp);
            if (temp.next == first) {
                break;
            }
            temp = temp.next;
        }
    }

}

class Node {
    public int no;
    public Node next;

    public Node(int no) {
        this.no = no;
    }

    @Override
    public String toString() {
        return "Node{" +
                "no=" + no +
                '}';
    }
}
```

### 约瑟夫问题

N个人围成一圈,从第一个开始报数,第M个将被杀掉,然后从被杀掉的那个人的下一个开始重新数,第M个人又将被杀掉,循环往复,最后剩下一个人结束

例如N=6，M=5，被杀掉的顺序是: 5, 4, 6, 2, 3

```java
/**
 * 统计 约瑟夫问题出圈的顺序
 * @param startNo 表示从第几个结点开始数数
 * @param countNum 表示数几下
 * @param nums 表示最初有多少结点在圈中
 */
public void countNode(int startNo, int countNum, int nums) {
    // 对数据进行校验
    if (first == null || startNo < 1 || startNo > nums) {
        System.out.println("输入参数有误");
        return;
    }
    // 让first指向开始startNo所属的结点
    for (int i = 0; i < startNo - 1; i++) {
        first = first.next;
    }
    Node temp = first; // 辅助指针
    // 让temp指向最后一个结点,即temp.next就是first
    while (true) {
        if (temp.next == first) {
            break;
        }
        temp = temp.next;
    }
	// 循环出圈
    while (true) {
        // 说明圈中只有一个结点了
        if (temp == first) {
            break;
        }
        // 让first和temp移动countNum-1次,即first指向要出圈的结点
        for (int i = 0; i < countNum - 1; i++) {
            first = first.next;
            temp = temp.next;
        }
        // 输出first所指向的结点
        System.out.println(first.no + "号结点出圈");
        // 让first指向下一个结点,进行下一轮的循环
        first = first.next;
        // 删除该出圈的结点!!!
        temp.next = first;
    }
    // 剩余最后一个结点,就是temp==first的时候出来的
    System.out.println(first.no + "号结点出圈");
}
```

# 栈

## Info

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523485.png)

## 数组模拟栈

```java
class ArrayStack {
    private int maxSize; // 栈的大小
    private int[] stack; // 数组,用数组模拟栈
    private int top = -1; // top表示栈顶,从0开始存储第一个元素

    public ArrayStack(int maxSize) {
        this.maxSize = maxSize;
        stack = new int[maxSize];
    }

    // 栈满的判断
    public boolean isFull() {
        return top == maxSize - 1;
    }

    // 栈空的判断
    public boolean isEmpty() {
        return top == -1;
    }

    // 入栈(push)
    public void push(int value) {
        // 先判断栈是否满
        if (isFull()) {
            System.out.println("栈已满,无法添加");
            return;
        }
        top++;
        stack[top] = value;
    }

    // 出栈(pop)
    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("栈空,没有数据");
        }
        return stack[top--];
    }

    // 显示栈的情况(遍历栈),遍历时,需要从栈顶开始显示数据
    public void list() {
        if (isEmpty()) {
            System.out.println("栈空,没有数据");
            return;
        }
        for (int i = top; i >= 0; i--) {
            System.out.printf("stack[%d] = %d\n", i, stack[i]);
        }
    }
}
```

## 前缀,中缀,后缀表达式

### Info

前缀,中缀,后缀表达式 就是 符号所在的位置不同

* 中缀表达式(符号在中间)：1 + (2 + 3) × 4 - 5
* 前缀表达式(符号在前面)：- + 1 × + 2 3 4 5
  * (2 + 3) -> + 2 3
  * (2 + 3) * 4 -> * + 2 3 4
  * 1 + (2 + 3) * 4 -> + 1 * + 2 3 4
  * 1 + (2 + 3) × 4 - 5 -> - + 1 × + 2 3 4 5
* 后缀表达式(符号在后面)：1 2 3 + 4 × + 5 -
  * (2 + 3) -> 2 3 +
  * (2 + 3) * 4 -> 2 3 + 4 *
  * 1 + (2 + 3) * 4 -> 1 2 3 + 4 * +
  * 1 + (2 + 3) × 4 - 5 -> 1 2 3 + 4 * + 5 -

### 前缀表达式

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523486.png)

### 中缀表达式

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523487.png)

* 准备两个栈: 一个数栈,一个符号栈
* 通过index来遍历扫描中序表达式
  * 如果发现扫描到一个数字,就直接入数栈
  * 如果发现扫描到一个符号,就分如下情况
    * 如果当前符号栈为空,就直接入栈
    * 如果当前符号栈不为空,就进行比较: 当前的操作符的优先级 和 栈中的操作符的优先级
      * 如果当前的 大于 栈中的, 直接入符号栈 
      * 如果当前的 小于 栈中的, 从数栈pop出两个数,从符号栈中pop出一个符号,进行运算,得到的结果入数栈
  * 当扫描完毕,就顺序从数栈和符号栈中pop处相应的数和符号,并计算
  * 最后再数栈中只有一个数字,就是表达式的结果

```java
public class TestStack {
    public static void main(String[] args) {
        String expression = "70+2*6-2*5";
        ArrayStack numStack = new ArrayStack(10);
        ArrayStack operStack = new ArrayStack(10);
        int index = 0; // 用来遍历获取expression表达式的每个字符
        int num1 = 0; // pop出栈,拿来运算的两个数 num1,num2
        int num2 = 0;
        int oper = 0; // 运算符
        int res = 0; // 计算的结果
        char ch = ' '; // 将每次扫描得到char保存到ch
        String keepNum = ""; // 用来拼接字符
        while (true) {
            // 得到expression的每一个字符
            ch = expression.substring(index, index + 1).charAt(0);
            if (operStack.isOper(ch)) { // 判断ch为符号,需要压入符号栈,但是需要进行一些操作
                if (!operStack.isEmpty()) { // 判断当前符号栈不为空
                    // 判断将要压入栈的ch运算符的优先级小于等于栈顶的运算符
                    if (operStack.priority(ch) <= operStack.priority(operStack.peek())) { 
                        // 从符号栈中取出一个符号,进行运算,将得到的结果,压入数栈,然后将当前的操作符(ch)压入符号栈
                        num1 = numStack.pop();
                        num2 = numStack.pop();
                        oper = operStack.pop();
                        res = numStack.cal(num1, num2, oper);
                        numStack.push(res);
                        operStack.push(ch);
                    } else { // 将要压入栈的运算符ch,大于当前符号栈顶的运算符
                        // 直接将ch这个运算符压入栈
                        operStack.push(ch);
                    }
                } else { // 判断当前的栈为空
                    operStack.push(ch);
                }
            } else { // 如果是数,则直接入数栈
                // 当处理多位数时,不能发现是一个数就立即入栈,因为它可能是多位数
                keepNum += ch;
                if (index == expression.length() - 1) { // 当index指向了字符串的最后一个字符,即不可能为多位数了,就直接压入栈
                    numStack.push(Integer.parseInt(keepNum)); // Integer.parseInt()强转成整形
                } else { // index并不是指向字符串的最后一个字符
                    // 如果下一个位字符为运算符,就直接将keepNum压入栈
                    // 如果下一个还是数,就进入while的第二次循环,让index++,进来继续拼接数字,接着判断
                    if (operStack.isOper(expression.substring(index + 1, index + 2).charAt(0))) { 
                        numStack.push(Integer.parseInt(keepNum));
                        keepNum = ""; // 重要!!! 需要进行清空字符串的操作,以方便后续的使用
                    }
                }
                /*
                	// 这里ch是字符,没有进行强转直接传入push()中,会转成ascii值,这时就需要-48才能得到最终答案
                	// 比如 '1' 转成 十进制的ascii值后就是 49, 49 - 48 后才能得到 1
                	numStack.push(ch); // ×
                	numStack.push(ch - 48); // √
                */
            }
            index++;
            if (index >= expression.length()) {
                break;
            }
        }

        // 当表达式扫描完毕,就顺序的从 数栈和符号栈pop处相应的数和符号,并运行
        while (true) {
            if (operStack.isEmpty()) {
                break;
            }
            num1 = numStack.pop();
            num2 = numStack.pop();
            oper = operStack.pop();
            res = numStack.cal(num1, num2, oper);
            numStack.push(res);
        }
        // 此时整个数栈,就只剩下一个最终的结果了,就直接pop出即可
        System.out.println("表达式的结果为: " + numStack.pop()); // 72
    }
}

// 定义一个ArrayStack 表示 栈
class ArrayStack {
    private int maxSize; // 栈的大小
    private int[] stack; // 数组,用数组模拟栈,数据就放在数组中
    private int top = -1; // top表示栈顶,初始化为-1

    public ArrayStack(int maxSize) {
        this.maxSize = maxSize;
        stack = new int[maxSize];
    }

    // 栈满的判断
    public boolean isFull() {
        return top == maxSize - 1;
    }

    // 栈空的判断
    public boolean isEmpty() {
        return top == -1;
    }

    // 入栈(push)
    public void push(int value) {
        // 先判断栈是否满
        if (isFull()) {
            System.out.println("栈已满,无法添加");
            return;
        }
        top++;
        stack[top] = value;
    }

    // 出栈(pop)
    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("栈空,没有数据");
        }
        return stack[top--];
    }

    // 显示栈的情况(遍历栈),遍历时,需要从栈顶开始显示数据
    public void list() {
        if (isEmpty()) {
            System.out.println("栈空,没有数据");
            return;
        }
        for (int i = top; i >= 0; i--) {
            System.out.printf("stack[%d] = %d\n", i, stack[i]);
        }
    }

    // 返回当前栈顶的值,而不是真正的pop()
    public int peek() {
        return stack[top];
    }

    // 返回运算符的优先级,优先级用数字表示,数字越大,优先级越高
    public int priority(int oper) {
        if (oper == '*' || oper == '/') {
            return 1;
        } else if (oper == '+' || oper == '-') {
            return 0;
        } else {
            return -1;
        }
    }

    // 判断是否为运算分
    public boolean isOper(char val) {
        return val == '+' || val == '-' || val == '*' || val == '/';
    }

    // 计算方法
    public int cal(int num1, int num2, int oper) {
        int res = 0; // res 用于存放计算结果
        switch (oper) {
            case '+':
                res = num2 + num1;
                break;
            case '-':
                res = num2 - num1;
                break;
            case '*':
                res = num2 * num1;
                break;
            case '/':
                res = num2 / num1;
                break;
            default:
                break;
        }
        return res;
    }
}
```

### 后缀表达式

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523488.png)

```java
public class PolandNotation {
    public static void main(String[] args) {
        // 先定义一个逆波兰表达式
        String suffixExpression = "3 4 + 5 * 6 -"; // 为了方便,逆波兰表达式的 数字和符号 使用空格隔开
        // 将 "3 4 + 5 * 6 -" 放入到ArrayList中
        // 将ArrayList传递给一个方法,遍历ArrayList配合栈,完成计算
        List<String> list = getListString(suffixExpression);
        System.out.println(list);
        int res = calculate(list);
        System.out.println(res); // 29
    }

    // 将一个逆波兰表达式,依次将数据和运算符放入到ArrayList中
    public static List<String> getListString(String suffixExpression) {
        String[] split = suffixExpression.split(" ");
        List<String> list = new ArrayList<>();
        // 将整个字符串,按照 " " 分割,然后将每个部分放入到list集合中
        for (String ele : split) {
            list.add(ele);
        }
        return list;
    }

    // 完成对逆波兰表达式的运算符
    public static int calculate(List<String> list) {
        // 创建一个栈
        Stack<String> stack = new Stack<>();
        // 遍历ls
        for (String item : list) {
            if (item.matches("\\d+")) { // 使用正则表达式,判断整个item是数字
                stack.push(item); // 直接压入栈中
            } else { // 判断是符号,进行运算操作
                int num2 = Integer.parseInt(stack.pop());
                int num1 = Integer.parseInt(stack.pop());
                int res = 0;
                if (item.equals("+")) {
                    res = num1 + num2;
                } else if (item.equals("-")) {
                    res = num1 - num2;
                } else if (item.equals("*")) {
                    res = num1 * num2;
                } else if (item.equals("/")) {
                    res = num1 / num2;
                } else {
                    throw new RuntimeException("运算符有误");
                }
                stack.push(res + ""); // 将结果压入栈中, 因为stack的泛型为String,所以需要将res从int - > String
            }
        }
        // 最后留在stack中的数据是运算结果
        return Integer.parseInt(stack.pop());
    }
}
```

### 中缀 -> 后缀

* 初始化两个栈：运算符栈s1 和储存中间结果的栈s2；
* 从左至右扫描中缀表达式；
* 遇到操作数时，将其压s2；
* 遇到运算符时，比较其与s1栈顶运算符的优先级：
  * 如果s1为空，或栈顶运算符为左括号“(”，则直接将此运算符入栈；
  * 如果s1不为空
    * 若优先级比栈顶运算符高, 也将运算符压入s1；
    * 若优先级比栈顶运算符低, 将s1栈顶的运算符弹出并压入到s2中, 再次与s1中新的栈顶运算符相比较优先级...
* 遇到括号时：
  * 如果是左括号“(”，则直接压入s1
  * 如果是右括号“)”，则依次弹出s1 栈顶的运算符，并压入s2，直到遇到左括号为止，此时将这一对括号丢弃
* 等从左到右,全部运行完之后,将s1中剩余的运算符依次弹出并压入s2
* 依次弹出s2中的所有元素并输出，**结果的逆序** 即为 **中缀表达式 对应的 后缀表达式**

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523489.png)

```java
public class PolandNotation {
    public static void main(String[] args) {
        // 1. 完成 将 中缀表达式 -> 后缀表达式 的功能, 即: 1 + ( ( 2 + 3) * 4 ) - 5  -->  1 2 3 + 4 * + 5 -
        // 2. 因为直接 对 1 + ( ( 2 + 3) * 4 ) - 5 操作,非常的不方便,所以可以将 该中缀表达式 转成 一个对应的 List, 即: 转成[1, +, (, (, 2, +, 3,) ,* ,4, ), -, 5 ]这样一个集合
        // 3. 将得到的中缀表达式对应的list --> 后缀表达式对应的list, 即: [1, +, (, (, 2, +, 3, ) , *, 4, ), -, 5 ] --> [1, 2, 3, +, 4, *, +, 5, -]
        String expression = "1+((2+3)*4)-5";
        List<String> infixExpressionList = toInfixExpressionList(expression); // 中缀表达式对应的List
        System.out.println("中缀表达式: " + infixExpressionList); // 中缀表达式: [1, +, (, (, 2, +, 3, ), *, 4, ), -, 5]

        List<String> parseSuffixExpression = parseSuffixExpression(infixExpressionList); // 后缀表达式对应的List
        System.out.println("后缀表达式: " + parseSuffixExpression); // 后缀表达式: [1, 2, 3, +, 4, *, +, 5, -]
        
        int res = calculate(parseSuffixExpression);
        System.out.println("结果为: " + res); // 结果为: 16
    }

    // 将 中缀表达式对应的list 转成 后缀表达式对应的list
    public static List<String> parseSuffixExpression(List<String> list) {
        // 定义两个栈
        Stack<String> s1 = new Stack<>(); // 符号栈
        // 因为s2这个栈,在存储的过程中,没有pop()操作,而且后面我还需要逆序输出,非常的麻烦,所以我们干脆不定义栈,直接定义一个ArrayList来完成存储
        // Stack<String> s2 = new Stack<>(); // 存储中间结果的栈
        List<String> s2 = new ArrayList<>(); // 存储中间结果的集合, 效果和上面一样, 不过会方便很多

        // 遍历list
        for (String item : list) {
            if (item.matches("\\d+")) { // 如果是一个数,就直接加入到s2中
                s2.add(item); // 因为s2是一个集合,所以这里用的是add(),而不是push(),理解一下
            } else if (item.equals("(")) { // 如果是"(", 就直接压入s1中
                s1.push(item);
            } else if (item.equals(")")) { // 如果是")", 则依次弹出s1栈顶的运算符,并压入到s2,直到遇到"("为止,此时将这一对括号丢弃
                while (!s1.peek().equals("(")) {
                    s2.add(s1.pop());
                }
                s1.pop(); // 此时栈顶为 "(" ,因为要把这一对括号给丢弃,所以,这里就不用把")"压入栈,直接把当前栈顶的"("给pop()即可
            } else {
                // 当item的优先级小于等于s1栈顶的运算符,将s1栈顶的运算符弹出并加入到s2中,然后将item再次与s1中新的栈顶运算符,进行优先级比较,接着执行...
                while (s1.size() != 0 && Operation.getPriority(item) <= Operation.getPriority(s1.peek())) {
                    s2.add(s1.pop());
                }
                // 最后还是需要将item加入到s1中
                s1.push(item);
            }
        }

        // 将s1中剩余的运算符依次弹出并加入s2
        while (s1.size() != 0) {
            s2.add(s1.pop());
        }

        return s2; // 因为s2不是栈,而是一个集合,所以可以返回该结果
    }

    // 将 中缀表达式 转成 对应的 List
    public static List<String> toInfixExpressionList(String s) {
        // 定义一个List, 存放 中缀表达式的对应的内容
        List<String> list = new ArrayList<>();
        int i = 0; // 这是一个指针, 用于遍历中缀表达式字符串
        String str; // 多位数拼接
        char c; // 每遍历到一个字符,就放入到c
        do {
            if ((c = s.charAt(i)) < 48 || (c = s.charAt(i)) > 57) { // 判断c是一个非数字, 0 - 9 对应的ascii值是 48 - 57
                list.add("" + c);
                i++;
            } else { // 判断c是一个数字,需要考虑多位数的情况
                str = ""; // 这里需要对str进行一个清空操作,以便后续,还需要添加多位数到list集合中
                while (i < s.length() && ((c = s.charAt(i)) >= 48 && (c = s.charAt(i)) < 57)) { // 判断 该位上的数字,向后,如果还是数字,就执行里面的拼接操作,目的就是为了得到多位数的结果
                    str += c; // 拼接多位数
                    i++; // 向后移动一位,接着判断操作,如果还是数字,就自动拼接到str上,直到匹配到后面的字符为符号,就停止匹配了
                }
                list.add(str);
            }
        } while (i < s.length());
        return list;
    }

    // 将一个逆波兰表达式,依次将数据和运算符放入到ArrayList中
    public static List<String> getListString(String suffixExpression) {
        String[] split = suffixExpression.split(" ");
        List<String> list = new ArrayList<>();
        // 将整个字符串,按照 " " 分割,然后将每个部分放入到list集合中
        for (String ele : split) {
            list.add(ele);
        }
        return list;
    }

    // 完成对逆波兰表达式的运算符
    public static int calculate(List<String> list) {
        // 创建一个栈
        Stack<String> stack = new Stack<>();
        // 遍历ls
        for (String item : list) {
            if (item.matches("\\d+")) { // 使用正则表达式,判断整个item是数字
                stack.push(item); // 直接压入栈中
            } else { // 判断是符号,进行运算操作
                int num2 = Integer.parseInt(stack.pop());
                int num1 = Integer.parseInt(stack.pop());
                int res = 0;
                if (item.equals("+")) {
                    res = num1 + num2;
                } else if (item.equals("-")) {
                    res = num1 - num2;
                } else if (item.equals("*")) {
                    res = num1 * num2;
                } else if (item.equals("/")) {
                    res = num1 / num2;
                } else {
                    throw new RuntimeException("运算符有误");
                }
                stack.push(res + ""); // 将结果压入栈中, 因为stack的泛型为String,所以需要将res从int - > String
            }
        }
        // 最后留在stack中的数据是运算结果
        return Integer.parseInt(stack.pop());
    }
}

class Operation {
    private static final int ADD = 1;
    private static final int SUB = 1;
    private static final int MUL = 2;
    private static final int DIV = 2;

    // 返回对应运算符的优先级
    public static int getPriority(String operation) {
        int result = 0;
        switch (operation) {
            case "+":
                result = ADD;
                break;
            case "-":
                result = SUB;
                break;
            case "*":
                result = MUL;
                break;
            case "/":
                result = DIV;
                break;
            default:
                // System.out.println("异常: " + operation);
                System.out.println("不存在该运算符!!!");
                break;
        }
        return result;
    }
}
```

# 哈希表

## Info

<img src="https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523490.png"  />

## Employ

<img src="https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523491.png"  />

<img src="https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523492.png" style="zoom:;" />

```java
public class Test_ {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        HashTab hashTab = new HashTab(5);
        while (true) {
            System.out.println("添加雇员(add)");
            System.out.println("显示雇员(list)");
            System.out.println("查找雇员(find)");
            System.out.println("退出系统(exit)");
            System.out.print("请输入你的选择: ");
            String key = scanner.next();
            switch (key) {
                case "add":
                    System.out.println("\n--------添加--------");
                    System.out.print("请输入id: ");
                    int id = scanner.nextInt();
                    System.out.print("请输入name: ");
                    String name = scanner.next();
                    hashTab.add(new Emp(id, name));
                    System.out.println("--------结束--------\n");
                    break;
                case "list":
                    System.out.println("\n--------显示--------");
                    hashTab.list();
                    System.out.println("--------结束--------\n");
                    break;
                case "find":
                    System.out.println("\n--------查找--------");
                    System.out.print("请输入要查找的id: ");
                    id = scanner.nextInt();
                    hashTab.findEmpById(id);
                    System.out.println("--------结束--------\n");
                    break;
                case "exit":
                    scanner.close();
                    System.exit(0);
                default:
                    System.out.println("\n输入错误!!\n");
                    break;
            }
        }
    }
}

class HashTab {
    private EmpLinkedList[] empLinkedListArray; // 存放链表的数组
    private int size; // 表示共有几条链表

    public HashTab(int size) {
        this.size = size;
        empLinkedListArray = new EmpLinkedList[size];
        // 注意创建好数组后,也要初始化每一条链表, 不然empLinkedListArray上的每一位都还是null,待会添加结点的时候,会报空指针异常
        for (int i = 0; i < empLinkedListArray.length; i++) {
            empLinkedListArray[i] = new EmpLinkedList();
        }
    }

    // 添加雇员
    public void add(Emp emp) {
        // 得到该emp的id对应的链表的编号
        int empLinkedListNo = hashFun(emp.id);
        // 根据该编号,将emp添加到指定的链表中
        empLinkedListArray[empLinkedListNo].add(emp);
        System.out.println("添加成功");
    }

    // 编写散列函数,使用一个简单的取模方法,以得到一个emp对象所要添加的链表的编号
    public int hashFun(int id) {
        return id % size;
    }

    public void findEmpById(int id) {
        int empLinkedListNo = hashFun(id);
        Emp findEmp = empLinkedListArray[empLinkedListNo].findEmpById(id);
        if (findEmp == null) {
            System.out.println("没有找到该链表");
        } else {
            System.out.println("找到了,第" + empLinkedListNo + "条链表上的结点=> " + findEmp.id + ": " + findEmp.name);
        }
    }

    // 展示全体雇员的信息
    public void list() {
        for(int i = 0; i < empLinkedListArray.length; i++) {
            empLinkedListArray[i].list(i);
        }
    }
}

class EmpLinkedList {
    private Emp head; // 定义一个头结点,默认为 null

    public void add(Emp emp) {
        if (head == null) { // 如果是第一个结点,就直接让head指向该结点即可
            head = emp;
            return;
        }
        // 如果不是第一个结点,就通过一个curEmp遍历到当前链表的最后一个结点,将emp结点添加到最后一个结点的后面
        Emp curEmp = head;
        while (curEmp.next != null) {
            curEmp = curEmp.next;
        }
        curEmp.next = emp;
    }

    // 根据id查找雇员
    public Emp findEmpById(int id) {
        if (head == null) {
            System.out.println("链表为空");
            return null;
        }
        Emp curEmp = head;
        while (curEmp != null) {
            if (curEmp.id == id) { // 如果找到了就返回该emp对象
                return curEmp;
            }
            curEmp = curEmp.next;
        }
        return null; // 如果没有找到就返回null
    }

    public void list(int no) {
        if (head == null) {
            System.out.println("链表为空");
            return;
        }
        Emp curEmp = head;
        System.out.print("第" + (no + 1) + "条链表的信息 ");
        while (curEmp != null) {
            System.out.print("=> " + curEmp.id + ": " + curEmp.name + " ");
            curEmp = curEmp.next;
        }
        System.out.println();
    }
}

class Emp {
    public int id;
    public String name;
    public Emp next;

    public Emp(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Emp{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
```

# 树结构

## Info

> 为什么需要树结构

数组存储方式的分析

* 优点：通过下标方式访问元素，速度快。对于有序数组，还可使用二分查找提高检索速度。
* 缺点：如果要检索具体某个值，或者插入值(按一定顺序)会整体移动，效率较

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523493.png)

链式存储方式的分析

* 优点：在一定程度上对数组存储方式有优化(比如：插入一个数值节点，只需要将插入节点，链接到链表中即可，删除效率也很好)。
* 缺点：在进行检索时，效率仍然较低，比如(检索某个值，需要从头节点开始遍历)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523494.png)

树存储方式的分析

能提高数据存储，读取的效率, 比如利用二叉排序树(Binary Sort Tree)，既可以保证数据的检索速度，同时也可以保证数据的插入，删除，修改的速度

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523495.png)

> 树的常用术语

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523496.png)

## 二叉树

### Info

树有很多种，每个节点最多只能有两个子节点的一种形式称为二叉树,二叉树的子节点分为左节点和右节点

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523497.png)

如果该二叉树的所有叶子节点都在最后一层，并且结点总数= 2^n -1 , n 为层数，则我们称为满二叉树。

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523498.png)

如果该二叉树的所有叶子节点都在最后一层或者倒数第二层，而且最后一层的叶子节点在左边连续，倒数第二层的叶子节点在右边连续，我们称为完全二叉树

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523499.png)

### 遍历

树的前序,中序,后序遍历,主要看父节点的输出位置

* 前序遍历: 先输出父节点，再遍历左子树和右子树
* 中序遍历: 先遍历左子树，再输出父节点，再遍历右子树
* 后序遍历: 先遍历左子树，再遍历右子树，最后输出父节点

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523500.png)

```java
public class Test_ {
    public static void main(String[] args) {
        BinaryTree binaryTree = new BinaryTree();
        Node root = new Node(1, "sun");
        Node node2 = new Node(2, "xue");
        Node node3 = new Node(3, "cheng");
        Node node4 = new Node(4, "jack");

        // 这里先使用手动创建二叉树,后面会使用递归创建二叉树的
        root.setLeft(node2);
        root.setRight(node3);
        node3.setLeft(node4); // 注意这里是要把node3,挂载node2的后头,而不是挂载root的后面
        binaryTree.setRoot(root);

        System.out.println("前序遍历");
        binaryTree.postOrder();
        // Node{no=1, name='sun'}
        // Node{no=2, name='xue'}
        // Node{no=3, name='cheng'}
        // Node{no=4, name='jack'}
    }
}

class BinaryTree {
    private Node root;

    public void setRoot(Node root) {
        this.root = root;
    }

    public void preOrder() {
        if (this.root != null) {
            this.root.preOrder();
        } else {
            System.out.println("该二叉树为空,无法遍历");
        }
    }
    public void infixOrder() {
        if (this.root != null) {
            this.root.infixOrder();
        } else {
            System.out.println("该二叉树为空,无法遍历");
        }
    }
    public void postOrder() {
        if (this.root != null) {
            this.root.postOrder();
        } else {
            System.out.println("该二叉树为空,无法遍历");
        }
    }
}

class Node {
    private int no;
    private String name;
    private Node left;
    private Node right;

    // 此处省略了 getter, setter, toString() ...

    public Node(int no, String name) {
        this.no = no;
        this.name = name;
    }

    public void preOrder() {
        System.out.println(this);
        if (this.left != null) {
            this.left.preOrder();
        }
        if (this.right != null) {
            this.right.preOrder();
        }
    }

    public void infixOrder() {
        if (this.left != null) {
            this.left.infixOrder();
        }
        System.out.println(this);
        if (this.right != null) {
            this.right.infixOrder();
        }
    }

    public void postOrder() {
        if (this.left != null) {
            this.left.postOrder();
        }
        if (this.right != null) {
            this.right.postOrder();
        }
        System.out.println(this);
    }
}
```

### 查询

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523501.png)


```java
class BinaryTree{
    public Node preOrderSearch(int no) {
        if (this.root != null) {
            return this.root.preOrderSearch(no);
        } else {
            return null;
        }
    }
    public Node infixOrderSearch(int no) {
        if (this.root != null) {
            return this.root.infixOrderSearch(no);
        } else {
            return null;
        }
    }
    public Node postOrderSearch(int no) {
        if (this.root != null) {
            return this.root.postOrderSearch(no);
        } else {
            return null;
        }
    }
}
class Node {
    public Node preOrderSearch(int no) {
        // 比较当前结点是不是
        if (this.no == no) {
            return this;
        }
        // 判断当前结点的左节点是否为空,如果不为空,则递归前序查找,如果左递归前序查找,找到了结点,则返回
        Node resNode = null;
        if (this.left != null) {
            resNode = this.left.preOrderSearch(no);
        }
        if (resNode != null) { // 当resNode不为空,说明在左结点上,通过前序查找找到了
            return resNode;
        }

        // 如果在左节点上查找不到,就去右结点上通过前序遍历查找,找到了则返回
        if (this.right != null) {
            resNode = this.right.preOrderSearch(no);
        }
        // 这里没有必要在判断resNode是否为空了,可以直接返回,因为当对左节点和右节点前序遍历,都没有找到时,说明在这条父节点下面都找不到了,直接返回null即可
        return resNode;
    }

    public Node infixOrderSearch(int no) {
        Node resNode = null;
        if (this.left != null) {
            resNode = this.left.infixOrderSearch(no);
        }
        if (resNode != null) {
            return resNode;
        }

        if (this.no == no) {
            return this;
        }

        if (this.right != null) {
            resNode = this.right.infixOrderSearch(no);
        }
        return resNode;
    }

    public Node postOrderSearch(int no) {
        Node resNode = null;
        if (this.left != null) {
            resNode = this.left.postOrderSearch(no);
        }
        if (resNode != null) {
            return resNode;
        }
        if (this.right != null) {
            resNode = this.right.postOrderSearch(no);
        }
        if (resNode != null) {
            return resNode;
        }
        if (this.no == no) {
            return this;
        }
        return null;
    }
}
```

### 删除

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523502.png)

```java
class BinaryTree{
    public void delNode(int no) {
        if (this.root != null) {
            if (this.root.getNo() == no) { // 单独判断root是不是要删除的结点
                this.root = null;
            } else {
                this.root.delNode(no);
            }
        } else {
            System.out.println("该树为空");
        }
    }
}
class Node {
    // 如果删除的结点是叶子结点,则删除该结点,如果删除的结点是非叶子节点,则删除该子树
    public void delNode(int no) {
        // 如果当前的结点的左子节点不为空,并且该子节点就是要删除的,即直接让this.left = null既可以删除成功
        if (this.left != null && this.left.no == no) {
            this.left = null;
            return;
        }
        // ...
        if (this.right != null && this.right.no == no) {
            this.right = null;
            return;
        }

        // 如果左子节点存在,就接着向左递归删除
        if (this.left != null) {
            this.left.delNode(no);
        }
        // ...
        if (this.right != null) {
            this.right.delNode(no);
        }
    }
}
```

### 顺序存储二叉树

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523503.png)

从数据存储来看，数组存储方式和树的存储方式可以相互转换，即数组可以转换成树，树也可以转换成数组, 要求:

* 将上图的二叉树的结点,以数组的方式存储起来, arr = [1, 2, 3, 4, 5, 6, 7]
* 在遍历数组arr时，仍然可以通过 前序遍历,中序遍历,后序遍历 的方式完成结点的遍历

顺序存储二叉树的特点

* 顺序二叉树通常只考虑完全二叉树
* 第 n 个元素的左子节点为 2 * n + 1
* 第 n 个元素的右子节点为 2 * n + 2
* 第 n 个元素的父节点为 (n-1) / 2
* n : 表示二叉树中的第几个元素(按0 开始编号如图所示)

```java
public class ArrayBinaryTreeDemo {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        ArrayBinaryTree arrayBinaryTree = new ArrayBinaryTree(arr);
        arrayBinaryTree.preOrder(); // 1 2 4 5 3 6 7
    }
}

class ArrayBinaryTree {
    private int[] arr;
    
    public ArrayBinaryTree(int[] arr) {
        this.arr = arr;
    }
	// 这里可以通过重载preOrder()的方法,然后在里面调用preOrder(0),这样就方便用户使用了,不用每次调用都调用preOrder(0),而是直接调用preOrder(),由preOrder()来调用preOrder(0)
    public void preOrder() { 
        if (arr == null || arr.length == 0) {
            System.out.println("error,数组为空");
        }
        this.preOrder(0);
    }

    public void preOrder(int index) {
        // 按照前序遍历的规则来编写,先输出arr[index],然后在向左递归遍历,再向右递归遍历
        System.out.print(arr[index] + " ");
        // 向左递归
        if ((index * 2 + 1) < arr.length) {
            preOrder(index * 2 + 1);
        }
        // 向右递归
        if ((index * 2 + 2) < arr.length) {
            preOrder(index * 2 + 2);
        }
    }

    public void infixOrder(int index) {
        if (arr == null || arr.length == 0) {
            System.out.println("error, 数组为空");
        }
        if ((index * 2 + 1) < arr.length) {
            infixOrder(index * 2 + 1);
        }
        System.out.println(arr[index]);
        if ((index * 2 + 2) < arr.length) {
            infixOrder(index * 2 + 2);
        }
    }

    public void postOrder(int index) {
        if (arr == null || arr.length == 0) {
            System.out.println("error, 数组为空");
        }
        if ((index * 2 + 1) < arr.length) {
            postOrder(index * 2 + 1);
        }
        if ((index * 2 + 2) < arr.length) {
            postOrder(index * 2 + 2);
        }
    }
}
```

### 线索化二叉树

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523504.png)
![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523505.png)

* n 个结点的二叉链表中含有n+1个空指针域(公式: 2n-(n-1)=n+1)。利用二叉链表中的空指针域，存放指向该结点在某种遍历次序下的前驱和后继结点的指针（这种附加的指针称为"线索"）
* 这种加上了线索的二叉链表称为线索链表，相应的二叉树称为线索二叉树(Threaded BinaryTree)。根据线索性质的不同，线索二叉树可分为: 前序线索二叉树, 中序线索二叉树, 后序线索二叉树
* 一个结点的 前一个结点，称为前驱结点, 后一个结点，称为后继结点
* 说明: 当线索化二叉树后，Node 节点的属性left 和right ，有如下情况:
  * left 指向的是左子树，也可能是指向的前驱节点. 比如① 节点left 指向的左子树, 而⑩ 节点的left 指向的就是前驱节点.
  * right 指向的是右子树，也可能是指向后继节点，比如① 节点right 指向的是右子树，而⑩ 节点的right 指向的就是后继节点.

```java
public class Test_ {
    public static void main(String[] args) {
        BinaryTree binaryTree = new BinaryTree();
        Node root = new Node(1, "sun");
        Node node2 = new Node(3, "xue");
        Node node3 = new Node(6, "cheng");
        Node node4 = new Node(8, "jack");
        Node node5 = new Node(10, "jerry");
        Node node6 = new Node(14, "tom");

        root.setLeft(node2);
        root.setRight(node3);
        node2.setLeft(node4);
        node2.setRight(node5);
        node3.setLeft(node6);

        binaryTree.threadedNodes(root);
        Node leftNode = node5.getRight();
        System.out.println(leftNode);
    }
}

class BinaryTree{
    // 为了实现线索化,需要创建一个指针,指向当前结点的上一个结点
    private Node pre = null;

    // 对二叉树进行中序线索化
    public void threadedNodes(Node node) {
        // 如果node为null,就不能进行线索化,直接返回即可
        if (node == null) {
            return;
        }

        // 线索化左子树
        threadedNodes(nodegetLeft());

        // 线索化当前结点
        // * 处理前驱结点
        if (nodegetLeft() == null) {
            node.setLeft(pre); // 让当前结点的左指针,指向前驱结点
            node.setLeftType(1); // 表示当前结点的左指针指向的是前驱结点
        }
        // * 处理后继结点, 这里处理处理后驱结点的方式不太一样, 是让node返回到后
        if (pre != null && pregetRight() == null) {
            pre.setRight(node);
            pre.setRightType(1);
        }
        // * 让pre指向当前结点, 即当node指向下一个结点时,这里的pre为该结点的前驱结点
        pre = node;

        // 线索化右子树
        threadedNodes(nodegetRight());
    }

	// 中序遍历线索化二叉树: 因为每个结点的前驱结点和后继结点都已经有了指向,所以原先的遍历方式已经行不通了, 这个时候可以通过线性方式遍历,无须使用递归的方式,这也提高了遍历的效率
	public void threadList() {
		Node node = root;
		while (node != null) {
			// 循环找到leftType为1的结点,后面会随着遍历而变化,因为leftType为1时,就说明该结点是按照线索化处理后的有效结点
			while (nodegetLeftType() == 0) {
				node = nodegetLeft();
			}
			// 输出当前结点
			System.out.println(node);
			// 如果当前结点的右指针指向的是后继节点,就一直输出
			while (nodegetRightType() == 1) {
				node = nodegetRight();
				System.out.println(node);
			}
			// 替换这个遍历的结点
			node = nodegetRight();
		}
	}	
}

class Node {
    // 定义leftType和rightType是为了后续完成遍历的操作
    // * leftType的值, 0 表示指向的是左子树, 1 表示指向的是前驱结点
    // * rightType的值, 0 表示指向的是右子树, 1 表示指向的是后继结点
    private int leftType;
    private int rightType;

    public int getLeftType() {
        return leftType;
    }

    public void setLeftType(int leftType) {
        this.leftType = leftType;
    }

    public int getRightType() {
        return rightType;
    }

    public void setRightType(int rightType) {
        this.rightType = rightType;
    }
}
```

## 树结构的实际应用

### 赫夫曼树

#### Info

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523506.png)

* 如果一颗树的带权路径(wpl)最小,就是 最优二叉树,也称赫夫曼树(Huffman Tree)
  * 路径: 在一棵树中,从一个结点往下可以达到的孩子或孙子结点之间的通路,称为路径
  * 路径长度: 规定根节点在第1层,如果该结点在L层,那么该结点的路径长度就是 L - 1
  * 结点的权: 该结点的 值
  * 带权路径长度: 路径长度 * 权, 记为WPL(weighted path length),权值越大的结点离根结点越近的二叉树才是最优二叉树

#### 构建一个赫夫曼树

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523507.png)

* 从小到大进行排序,将每一个数据,每个数据都是一个节点,每个节点可以看成是一颗最简单的二叉树
* 取出根节点权值最小的两颗二叉树,组成一颗新的二叉树,该新的二叉树的根节点的权值是前面两颗二叉树根节点权值的和
* 再将这颗新的二叉树,以根节点的权值大小再次排序
* 不断重复这两个步骤,直到数列中所有的数据都被处理完,就得到一颗赫夫曼树

```java
public class HuffmanTree {
    public static void main(String[] args) {
        int[] arr = {13, 7, 8, 3, 29, 6, 1};
        Node root = createHuffmanTree(arr);
        preOrder(root);
    }

    public static Node createHuffmanTree(int[] arr) {
        // 将arr的每一个元素都构建成一个结点,然后放入到nodes集合中
        ArrayList<Node> nodes = new ArrayList<Node>();
        for (int value : arr) {
            nodes.add(new Node(value));
        }

        while (nodes.size() > 1) {
            // 对整个集合进行排序 升序
            Collections.sort(nodes);
            // 取出前两个权最小的结点,因为升序排列的,所以就是前两个
            Node leftNode = nodes.get(0);
            Node rightNode = nodes.get(1);
            // 构建一个新的结点,该结点的权是刚才取出的两个最小的权的和,将两个最小的权的结点,添加到新的结点的左边和右边
            Node parentNode = new Node(leftNode.value + rightNode.value);
            parentNode.left = leftNode;
            parentNode.right = rightNode;
            // 将刚才取出两个最小的权的结点,从集合中删除,再将新构建的结点,加入到集合中,再进行下一轮的 排序+构建
            nodes.remove(leftNode);
            nodes.remove(rightNode);
            nodes.add(parentNode);
        }
        // while结束后,整个nodes集合就只有一个结点了,就已经构建完了赫夫曼树,这个结点就是一个根节点,此时返回这个根节点即可
        return nodes.get(0);
    }

    public static void preOrder(Node root) {
        if (root != null) {
            root.preOrder();
        } else {
            System.out.println("树为空");
        }
    }
}

class Node implements Comparable<Node>{
    int value; // 结点权值
    Node left; // 指向左子节点
    Node right; // 指向右子节点

    // 编写一个前序遍历
    public void preOrder() {
        System.out.println(this);
        if (this.left != null) {
            this.left.preOrder();
        }
        if (this.right != null) {
            this.right.preOrder();
        }
    }

    public Node(int value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "Node{" +
                "value=" + value +
                '}';
    }

    @Override
    public int compareTo(Node o) { // 通过继承Comparable,然后实现compareTo()来增加一个比较权值大小的功能
        return this.value - o.value;
    }
}
```

### 赫夫曼编码

#### Info

> Basic

通信领域中信息的处理方式有: 定长编码, 变长编码, 赫夫曼编码

赫夫曼编码:

* 赫夫曼编码(Huffman Coding),是一种编码方式,属于一种程序算法
* 赫夫曼编码是赫哈夫曼树在电讯通信中的经典的应用之一. 赫夫曼编码广泛地用于数据文件压缩。其压缩率通常在20%～90%之间
* 赫夫曼码是可变字长编码(VLC)的一种。Huffman 于1952 年提出一种编码方法，称之为最佳编码

> 定长编码

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523508.png)

> 变长编码

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523509.png)

> 赫夫曼编码

输入传入的字符串: i like like like java do you like a java

统计各个字符个数: d:1 y:1 u:1 j:2 v:2 o:2 l:4 k:4 e:4 i:5 a:5 :9

按照上面字符出现的次数构建一颗赫夫曼树,次数作为权值

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523510.png)

根据赫夫曼树,每个结点的路径的不同,给各个字符,规定编码(前缀编码): 向左的路径为0 向右的路径为1

o: 1000 u: 10010 d: 100110 y: 100111 i: 101 a : 110 k: 1110 e: 1111 j: 0000 v: 0001 l: 001 : 01

按照上面的赫夫曼编码，我们的"i like like like java do you like a java" 字符串对应的编码为(注意这里我们使用的无损压缩)

1010100110111101111010011011110111101001101111011110100001100001110011001111000011001111000100100100110111101111011100100001100001110 

通过赫夫曼编码处理长度为133,原来长度是359 , 压缩了(359-133) / 359 = 62.9%

此编码满足前缀编码, 即字符的编码都不能是其他字符编码的前缀。不会造成匹配的多义性

赫夫曼编码是无损处理方案

#### 生成赫夫曼编码

```java
public class HuffmanCode {
    public static void main(String[] args) {
        String content = "i like like like java do you like a java";
        // 将字符串中的每个字符转成Byte类型的数组
        byte[] contentBytes = content.getBytes();
        // 获取nodes集合, 该集合存放了Node对象,
        List<Node> nodes = getNodes(contentBytes);
        // 构建赫夫曼树,返回根节点
        Node root = createHuffmanTree(nodes);

        System.out.println("content中每个字符对应的huffman编码:");
        
        Map<Byte, String> codes = getCodes(root);
        System.out.println(codes);
        // Set<Map.Entry<Byte, String>> entrySet = codes.entrySet();
        // for (Map.Entry<Byte, String> entry : entrySet) {
        //     System.out.print(entry.getValue() + " ");
        // }
        // System.out.println();
        System.out.println("\ncontent转成赫夫曼编码的字符串:");
        StringBuilder stringBuilder = new StringBuilder();
        for (byte b : contentBytes) {
            stringBuilder.append(codes.get(b));
        }
        System.out.println(stringBuilder);
    }

    // 生成赫夫曼树对应的赫夫曼编码,这里定义一个huffmanCodes和stringBuilder就是为了重载的时候方便一些
    // * 将赫夫曼编码存放在Map<Byte,String>中, 比如: "i"字符对应的ascii的十进制值是105,此时将"i"存储到数组bytes中,存储的就是105,再根据赫夫曼拜编码,将105转换成赫夫曼编码得到的是101,我们再将105作为key,101作为value存放到huffmanCodes中,方便后续对照进行操作
    static Map<Byte, String> huffmanCodes = new HashMap<>();
    // * 在生成赫夫曼编码表示,需要去拼接路径,定义一个StringBuilder存储某个叶子节点的路径
    static StringBuilder stringBuilder = new StringBuilder();

    // 为了方便调用,我们重载一下getCodes()
    public static Map<Byte, String> getCodes(Node root) {
        if (root == null) {
            return null;
        }
        // 这里的huffmanCodes和stringBuilder都是在上面定义的
        getCodes(root.left, "0", stringBuilder); // 处理root的左子树
        getCodes(root.right, "1", stringBuilder); // 处理root的右子树
        return huffmanCodes;
    }
    /**
     * 将传入的node结点的所有叶子结点的赫夫曼树得到,并放入到huffmanCodes中
     * @param node 传入的结点
     * @param code 路径: 左子节点 0, 右子节点 1
     * @param stringBuilder 用于拼接路径
     */
    private static void getCodes(Node node, String code, StringBuilder stringBuilder) {
        StringBuilder stringBuilder1 = new StringBuilder(stringBuilder);
        stringBuilder1.append(code); // 将code拼接到stringBuilder中,即拼接字符到字符串中
        if (node != null) { // 如果node == null不处理
            if (node.data == null) { // 如果是非叶子节点
                getCodes(node.left, "0", stringBuilder1); // 向左递归
                getCodes(node.right, "1", stringBuilder1); // 向右递归
            } else { // 如果是叶子结点
                huffmanCodes.put(node.data, stringBuilder1.toString()); //
            }
        }
    }

    // 将传入的bytes数组中的每个元素都封装成一个Node对象(该对象里存着 这个字符对应的十进制数 和 出现的次数),将这些Node对象都存放到一个ArrayList集合中,方便后面调用createHuffmanTree(List<Node> nodes)使用
    public static List<Node> getNodes(byte[] bytes) {
        ArrayList<Node> nodes = new ArrayList<>();
        // 定义一个count集合用来存放某个字符的出现次数,比如存在'a'这个字符出现了3次,counts.put('a', 3)
        HashMap<Byte, Integer> counts = new HashMap<>();
        for (byte b : bytes) {
            Integer count = counts.get(b);
            if (count == null) { // 当如果b这个字符是第一次出现在counts集合中,
                counts.put(b, 1);
            } else {
                counts.put(b, count + 1);
            }
        }
        // 把counts集合中的每一对k-v转换成Node对象存放到ArrayList集合中, 比如: nodes.add(new Node('a', 3))
        // 这里是通过获取entrySet集合来遍历整个map集合
        Set<Map.Entry<Byte, Integer>> entrySet = counts.entrySet();
        for (Map.Entry<Byte, Integer> entry : entrySet) {
            nodes.add(new Node(entry.getKey(), entry.getValue())); // 创建Node对象
        }
        return nodes;
    }

    // 通过List 创建对应的赫夫曼树
    public static Node createHuffmanTree(List<Node> nodes) {
        while (nodes.size() > 1) {
            Collections.sort(nodes);
            Node leftNode = nodes.get(0);
            Node rightNode = nodes.get(1);
            Node parentNode = new Node(null, leftNode.weight + rightNode.weight);
            parentNode.left = leftNode;
            parentNode.right = rightNode;
            nodes.remove(leftNode);
            nodes.remove(rightNode);
            nodes.add(parentNode);
        }
        return nodes.get(0);
    }
    // 封装一个前序遍历,方便遍历树
    public static void preOrder(Node root) {
        if (root != null) {
            root.preOrder();
        } else {
            System.out.println("该树为空");
        }
    }
}

class Node implements Comparable<Node> {
    Byte data; // 数据域,某个字符
    int weight; // 权重,某个字符出现的次数
    Node left;
    Node right;

    public void preOrder() {
        System.out.println(this);
        if (this.left != null) {
            this.left.preOrder();
        }
        if (this.right != null) {
            this.right.preOrder();
        }
    }

    public Node(Byte data, int weight) {
        this.data = data;
        this.weight = weight;
    }

    @Override
    public String toString() {
        return "Node{" +
            "data=" + data +
            ", weight=" + weight +
            '}';
    }

    @Override
    public int compareTo(Node o) {
        return this.weight - o.weight;
    }
}
```

#### 数据压缩

如果文件本身就是经过压缩处理的，那么使用赫夫曼编码再压缩效率不会有明显变化, 比如 视频, ppt...

赫夫曼编码是按字节来处理的，因此可以处理所有的文件(二进制文件、文本文件)

如果一个文件中的内容，重复的数据不多，压缩效果也不会很明显.

```java
public static void main(String[] args) {
    String content = "i like like like java do you like a java";
    Byte[] bytes = huffmanZip(content);
    System.out.println(Arrays.toString(bytes));
}

// 使用一个方法,将前面的方法封装起来,便于我们的调用
public static Byte[] huffmanZip(String content) {
    // 将String转化成byte[], bytes的每个元素是 content的每个字符在ascii上对应的十进制数
    byte[] bytes = content.getBytes(); 
    // 将bytes中每个的元素都封装成一个Node对象,然后存放到ArrayList集合中的,这里的是获取到这个集合
    List<Node> nodes = getNodes(bytes); 
    // 根据nodes创建的赫夫曼树,并返回根节点
    Node root = createHuffmanTree(nodes); 
    // 根据传入的root结点,获取到每个结点对应的赫夫曼编码,存放到Map集合中,key存放的是bytes中的每个元素,value存放的就是每个元素对应的huffmanCodes
    Map<Byte, String> huffmanCodes = getCodes(root); 
    // 调用zip(),正式进行压缩
    return zip(bytes, huffmanCodes); 
}
/*
	编写一个方法,将字符串对应的byte[]数组,转换成赫夫曼编码压缩后的byte[],并返回
    	* 将 String content = "i like lik..." 转化成 byte[] contentBytes = content.getBytes();
    	* 将 contentBytes转化成赫夫曼编码对应的字符串"1010100011011110111101001..."
    	* 再将这个字符串每8为对应一个byte,按照补码的形式存放到huffmanBytes中
    		比如10101000(原码) -> 10100111(反码) -> 11011000(补码 转换成十进制就是-88)
*/
private static byte[] zip(byte[] bytes, Map<Byte, String> huffmanCodes) {
    // 利用赫夫曼编码表,将bytes转成赫夫曼编码对应的字符串
    StringBuilder stringBuilder = new StringBuilder();
    // 遍历bytes数组,通过huffmanCodes可以根据b(key)来获取对应的赫夫曼编码(value),然后将字符串赫夫曼编码都追加到stringBuilder中
    // 比如: 'i'对应的ascii值是105,将105存放到bytes中,我们可以通过huffmanCodes.get(105),来获取到"i"这个字符对应的赫夫曼编码"101",我们此时是将"101"追加到stringBuilder中
    for (byte b : bytes) {
        stringBuilder.append(huffmanCodes.get(b));
    }
    // 我们这里要将stringBuilder中的字符串转化成一个byte[],要定义byte[],得确定需要开多大的空间,这里就是来计算大小的
    // 比如: 将"1010100011"转成 byte[],得到"1010100011"的长度为10,因为10 % 8 != 0,所以 len = 10 / 8 + 1 = 2的大小,即byte[0]=10101000, byte[1]=11
    int len;
    if (stringBuilder.length() % 8 == 0) {
        len = stringBuilder.length() / 8;
    } else {
        len = stringBuilder.length() / 8 + 1;
    }
    // 该数组存放压缩后的数据(转成赫夫曼编码的字符串), 比如: huffmanCodeBytes[0] =  168, huffmanCodeBytes[1] = -88
    // 注意存的不是二进制数,是将二进制数转成十进制后的数存入到数组中
    byte[] huffmanCodeBytes = new byte[len];
    int index = 0; // 记录压缩后的数组中第几个元素
    for(int i = 0; i < stringBuilder.length(); i += 8) {
        String strByte;
        if (i + 8 <= stringBuilder.length()) { // 如果够8位,就截取8位
            strByte = stringBuilder.substring(i, i + 8); // subString(i, i + 8)是截取[i, i + 8)的字符串
        } else { // 如果stringBuilder从i开始向后不足8位的字符了,就直接截取到最后即可
            strByte = stringBuilder.substring(i);
        }
        // 将字符串strByte转成一个十进制的byte,存放到数组huffmanCodeBytes中
        // 比如: 将字符串"10101000"转成十进制数168,将168这个数据存放到数组huffmanCodeBytes中
        huffmanCodeBytes[index++] = (byte)Integer.parseInt(strByte, 2);
    }
    return huffmanCodeBytes;
}
```

#### 数据解压

```java
public static void main(String[] args) {
    System.out.println("\nhuffmanCodeBytes解压后的原字符串");
    byte[] bytes = decode(codes, huffmanCodeBytes);
    System.out.println(new String(bytes)); // 通过new String(bytes)可以将byte[] bytes中的元素根据ascii转换成对应的字符,拼接后的字符串
}

/*
	数据的解压
		* 将huffmanCodeBytes [-88, -65, -56, -65...] 从byte转成二进制, 即重新转成赫夫曼编码对应的二进制字符串10101000101...
		* 再将该二进制字符串,对照赫夫曼编码 转成 "i like like like java do you like a java"
*/

// 将huffmanCodeBytes里存储的[-88, -65, -56...] 从byte转成赫夫曼编码对应的二进制字符串1010100010..., 再根据huffmanCodes,将赫夫曼编码105转成字符的ascii值101,存放在byte[]数组中
public static byte[] decode(Map<Byte, String> huffmanCodes, byte[] huffmanCodeBytes) {
    // 先得到huffmanBytes对应的二进制的字符串 101010001...
    StringBuilder stringBuilder = new StringBuilder();
    // 将huffmanCodeBytes [-88, -65, -56, -65...] 根据ascii值 转成 二进制的字符串10101000101...(就是赫夫曼编码字符串)
    for(int i = 0; i < huffmanCodeBytes.length; i++) {
        byte b = huffmanCodeBytes[i];
        boolean flag = (i == huffmanCodeBytes.length - 1);
        stringBuilder.append(byteToBitString(!flag, b));
    }

    // 把字符串按照赫夫曼编码的对照二进制字符串进行解码操作,转成 "i like like like java do you like a java" 的形式
    // 将huffmanCodes集合中的key和value反过来添加进一个新的集合中,然后调用该集合进行对照解码
    // 比如: 根据 字符"i"的ascii值105,"i"的赫夫曼编码是101,原先的huffmanCodes里key是105,value是101,这里需要反过来,key是101,value是105,根据101找到105,再根据ascii表转成字符"i"
    Map<String, Byte> map = new HashMap<>();
    Set<Map.Entry<Byte, String>> entrySet = huffmanCodeBytes.entrySet();
    for (Map.Entry<Byte, String> entry : entrySet) {
        map.put(entry.getValue(), entry.getKey());
    }

    // 创建一个集合,存放 由 赫夫曼编码105 转成的 ascii值101
    ArrayList<Byte> list = new ArrayList<>();
    
    // 将赫夫曼编码字符串1010100010..,根据huffmanCodes抽取里面的字符 转成 ascii, 存放到list中
    // 比如 101 抽取出来 根据map(由huffmanCodes的key-value反转过来的 赫夫曼编码) 转成 105 存放到list集合中
    for(int i = 0; i < stringBuilder.length();) { // 注意这里的变量i结尾不要++操作,由后面的i+=count来操作
        int count = 1;
        boolean flag = true;
        Byte b = null;
        while (flag) {
            String key = stringBuilder.substring(i, i + count); // i不动,让count来动,直到匹配到一个存在的key再退出,接着找
            // 因为赫夫曼编码是前缀编码,所以不用单行匹配到别的字符
            b = map.get(key);
            if (b == null) {
                count++;
            } else {
                flag = false;
            }
        }
        list.add(b);
        i += count; // 因为substring(start, end)截取 是截取的[start, end),所以是让i += count而不是 i = i + count + 1
    }
    // 当for循环结束时,list中就存放了,"i like like like java do you like a java"中每个字符对应的二进制数,将其存放到byte[]中,并返回
    byte[] bytes = new byte[list.size()];
    for(int i = 0; i < bytes.length; i++) {
        bytes[i] = list.get(i);
    }
    return bytes;
}

/**
* 该方法将一个byte转成一个二进制的字符串
* @param b
* @param flag 标志是否需要补高位,true 需要补高位, false 不需要补高位,如果是最后一个字节,就不需要补高位了
    * 比如 00000001 101, 需要对第一个字节里的1,进行补高位: 1 -> 00000001 补齐8位,后面截取都是截取8
    * 最后一个字节里的101,就不需要进行补高位,直接截取到最后即可,不需要再截取8位了
* @return b对应的二进制字符串(注意是按补码返回)
*/
public static String byteToBitString(boolean flag, byte b) {
    // 这一步就将byte转成了int, 因为byte只能存放一个字节,比如 0000 0001这里需要计算得到 1 0000 0001 的数,所以需要转成int类型
    int temp = b; 
    // 因为前几位都是8位取一个数,所以都没有问题,但是最后一个数是有可能取不到8位的,所以对于最后一个数就不需要进行处理,他有几位,就把这几位追加到最后即可
    // 如果是正数,我就需要补高位, 通过 按位或256,然后再截取后8位,这样可以做到补高位的效果
    // 比如正数1,输出不是输出的0000 0001,而是输出的1,所以我们需要通过按位或上256这个算法,来得到0000 0001
    if (flag) { 
        // 按位或256
        // 比如: 1 如果直接Integer.toBinaryString(1)返回的就是1,不是0000 0001,所以我们这里需要一个算法: 将1按位或上256, 0000 0001 | 1 0000 0000 = 1 0000 0001, 再截取后8位,得到的就是0000  0001
        temp |= 256;
    }
    
    // 将temp这个十进制数 转化成 对应的二进制字符串,然后截取该字符串的8位返回
    // 比如 temp = 1; flag = true; temp |= 256 = 257; 通过Integer.toBinaryString转成二进制补码得到 1 0000 0001,再截取8位返回 0000 0001
    String str = Integer.toBinaryString(temp); //  Integer.toBinaryString()是返回temp对应的二进制补码
    if (flag) {
        return str.substring(str.length() - 8);
    } else {
        return str;
    }
}
```

#### 文件压缩

```java
public static void main(String[] args) {
    String srcFile = "e:\\test\\sun.png";
    String destFile = "e:\\test\\sunZip.zip";
    zipFile(srcFile, destFile);
    System.out.println("压缩成功");
}

/**
* 完成对文件的压缩
* @param srcFile 源文件
* @param destFile 目标文件
*/
public static void zipFile(String srcFile, String destFile) {
    FileOutputStream os = null;
    FileInputStream is = null;
    ObjectOutputStream oos = null;
    try {
        // 创建文件的输入流
        is = new FileInputStream(srcFile);
        // 创建一个和源文件一样大小的byte[]
        byte[] bytes = new byte[is.available()];
        // 读取文件
        is.read(bytes);
        // 直接对源文件压缩
        byte[] huffmanZipBytes = huffmanZip(bytes);
        // 创建文件的输出流
        os = new FileOutputStream(destFile);
        // 创建一个对象输出流, 因为ObjectOutputStream是一个处理流,所以需要放入一个节点流才可以
        oos = new ObjectOutputStream(os);
        // 这里我们以对象的形式输出huffmanZipBytes,方便以后恢复源文件时使用
        oos.writeObject(huffmanZipBytes);
        // 注意这里一定要把赫夫曼编码也写进去
        oos.writeObject(huffmanCodes);
    } catch (Exception e) {
        System.out.println(egetMessage());
    } finally {
        try {
            if (is != null) {
                is.close();
            }
            if (os != null) {
                os.close();
            }
            if (oos != null) {
                oos.close();
            }
        } catch (IOException e) {
            System.out.println(egetMessage());
        }
    }
}
```


#### 文件解压

```java
// 完成对文件的解压
public static void unZipFile(String zipFile, String destFile) {
    InputStream is = null;
    OutputStream os = null;
    ObjectInputStream ois = null;
    try {
        is = new FileInputStream(zipFile);
        ois = new ObjectInputStream(is);
        // 读取byte数组
        byte[] huffmanBytes = (byte[])ois.readObject();
        // 读取赫夫曼编码表
        Map<Byte, String> huffmanCodes = (Map<Byte, String>) ois.readObject();
        // 解码
        byte[] bytes = decode(huffmanCodes, huffmanBytes);
        // 将bytes数组写入到目标文件
        os = new FileOutputStream(destFile);
        // 写入到destFile中
        os.write(bytes);
    } catch (Exception e) {
        System.out.println(egetMessage());
    } finally {
        try {
            if (is != null) {
                is.close();
            }
            if (os != null) {
                os.close();
            }
            if (ois != null) {
                ois.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 二叉排序树

#### Info

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523511.png)

二叉排序树：BST: (Binary Sort(Search) Tree), 对于二叉排序树的任何一个非叶子节点，要求左子节点的值比当前节点的值小，右子节点的值比当前节点的值大。(特别说明：如果有相同的值，可以将该节点放在左子节点或右子节点)

* 使用数组
  * 数组未排序， 优点：直接在数组尾添加，速度快。缺点：查找速度慢.
  * 数组排序，优点：可以使用二分查找，查找速度快，缺点：为了保证数组有序，在添加新数据时，找到插入位置后，后面的数据需整体移动，速度慢。
* 使用链式存储-链表
  * 不管链表是否有序，查找速度都慢，添加数据速度比数组快，不需要数据整体移动
* 使用二叉排序树
  * 查找速度快,修改速度也快

#### 创建,添加,遍历

```java
public class BinarySortTreeDemo {
    public static void main(String[] args) {
        int[] arr = {7, 3, 10, 12, 5, 1, 9};
        BinarySortTree binarySortTree = new BinarySortTree();
        for(int i = 0; i < arr.length; i++) {
            binarySortTree.add(new Node(arr[i]));
        }
        binarySortTree.infixNode();
    }
}

class BinarySortTree {
    private Node root;

    public void add(Node node) {
        if (root == null) {
            root = node;
            return;
        }
        root.add(node);
    }

    public void infixNode() {
        if (root == null) {
            System.out.println("该树为空");
            return;
        }
        root.infixOrder();
    }
}

class Node {
    int value;
    Node left;
    Node right;

    public Node(int value) {
        this.value = value;
    }

    // 添加结点, 如果node.value比this小,就放在this的左边,反之,则放在右边,后面的每个结点都是这样放置依次向下放置
    public void add(Node node) {
        if (node == null) {
            return;
        }
        if (node.value < this.value) {
            if (this.left == null) {
                this.left = node;
            } else {
                this.left.add(node);
            }
        } else {
            if (this.right == null) {
                this.right = node;
            } else {
                this.right.add(node);
            }
        }
    }

    public void infixOrder() {
        if (this.left != null) {
            this.left.infixOrder();
        }
        System.out.println(this);
        if (this.right != null) {
            this.right.infixOrder();
        }
    }

    @Override
    public String toString() {
        return "Node{" +
                "value=" + value +
                '}';
    }
}
```

#### 删除

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523512.png)

二叉排序树的删除情况比较复杂，有下面三种情况需要考虑

* 删除叶子节点(比如: 2, 5, 9, 12)
* 删除只有一颗子树的节点(比如：1)
* 删除有两颗子树的节点. (比如：7, 3，10 )

第一种情况: 删除叶子节点(比如：2, 5, 9, 12)

* 找到 要删除的结点targetNode 以及 targetNode的父结点parent
* 确定targetNode是parent 的左子结点还是右子结点
* 根据前面的情况来对应删除
  * 左子结点parent.left = null
  * 右子结点parent.right = null;

第二种情况: 删除只有一颗子树的节点(比如: 1)

* 找到 要删除的结点targetNode 以及 targetNode的父结点parent
* 确定targetNode的 子结点 是左子结点还是右子结点
* 确定targetNode 是 parent的 左子结点还是右子结点
* 如果 targetNode 有 左子结点
  * 如果targetNode是parent的左子结点,则 parent.left = targetNode.left;
  * 如果targetNode是parent的右子结点,则 parent.right = targetNode.left;
* 如果 targetNode 有 右子结点
  * 如果targetNode是parent的左子结点,则 parent.left = targetNode.right;
  * 如果targetNode是parent的右子结点,则 parent.right = targetNode.right

第三种情况: 删除有两颗子树的节点. (比如：7, 3，10 )

* 找到 要删除的结点targetNode 以及 targetNode的父结点parent
* 从targetNode的右子树找到最小的结点,用一个临时变量,将最小结点的值保存 (比如: temp = 11)
* 删除该最小结点,然后targetNode.value = temp

```java
class BinarySortTree {
     public void del(int value) {
        // 判断数为空
        if (root == null) {
            System.out.println("树为空");
            return;
        }
        // 判断只有一个根节点,而且是要删除该根节点
        if (root.left == null && root.right == null && root.value == value) {
            root = null;
            return;
        }

        // 查找该结点
        Node targetNode = searchTargetNode(value);
        if (targetNode == null) {
            System.out.println("没有该结点");
            return;
        }
        // 查找该结点的父节点
        Node parentNode = searchParent(value);

        // 正式开始删除结点,针对三种不同的情况采取不同的删除方式
        if (targetNode.left == null && targetNode.right == null) { // 判断目标结点是叶子结点(情况1)
            // 判断targetNode是parentNode的左节点还是右子节点
            if (parentNode.left != null && parentNode.left.value == value) {
                parentNode.left = null; // 删除targetNode结点,即不指向他即可
            } else if (parentNode.right != null && parentNode.right.value == value) {
                parentNode.right = null;
            }
        } else if (targetNode.left != null && targetNode.right != null) { // 判断目标结点是有两个子树的结点(情况3)
            // 找到targetNode的右子树里的最小的结点,删除他 并且 将该结点作为targetNode
            targetNode.value = delRightTreeMin(targetNode.right); // 调用下面的方法来针对解决
        } else { // 排除 情况1,情况3后,直接在else里处理情况2
            if (parentNode == null) { // 要删除根节点,我们调用不了parentNode.left,需要特殊处理
                // 找到该结点的子节点,直接让子节点作为根节点
                if (targetNode.left != null) {
                    root = targetNode.left;
                } else {
                    root = targetNode.right;
                }
            } else { // 父节点不为null,即要删除的结点不是根节点,正常处理
                // 找到targetNode是parentNode的左子节点还是右子节点
                if (parentNode.left != null && parentNode.left.value == value) { // 判断targetNode为左子节点
                    // 找到targetNode的子节点是左子节点还是右子节点,直接让parentNode指向该子节点即可完成删除targetNode
                    if (targetNode.left != null) { // 判断targetNode的子节点在左边
                        parentNode.left = targetNode.left;
                    } else { // 判断targetNode的子节点在右子节点
                        parentNode.right = targetNode.right;
                    }
                } else if (parentNode.right != null && parentNode.right.value == value) { // 判断targetNode为右子节点
                    // 和上面一样,找到targetNode的子节点是在左边还是右边...
                    if (targetNode.left != null) {
                        parentNode.right = targetNode.left;
                    } else {
                        parentNode.right = targetNode.right;
                    }
                }
            }
        }
    }

    // 删除以node为根节点的二叉树中最小的结点,并返回该结点的值
    public int delRightTreeMin(Node node) {
        Node target = node;
        // 找到以node为根节点的最小的结点
        while (target.left != null) {
            target = target.left;
        }
        del(target.value);
        return target.value;
    }

    public Node searchTargetNode(int value) {
        if (root == null) {
            return null;
        }
        return root.searchTargetNode(value);
    }

    public Node searchParent(int value) {
        if (root == null) {
            return null;
        }
        return root.searchParent(value);
    }
}

class Node {
    // 找到targetNode结点
    public Node searchTargetNode(int value) {
        if (this.value == value) { // 说明找到了
            return this;
        } else if (this.value > value) { // 说明要找的结点在this的左边
            if (this.left == null) { // 说明已经找不到了
                return null;
            }
            return this.left.searchTargetNode(value);
        } else { // 说明要找的在this的右边
            if (this.right == null) {
                return null;
            }
            return this.right.searchTargetNode(value);
        }
    }

    // 找到targetNode结点的父节点parent
    public Node searchParent(int value) {
        if ((this.left != null && this.left.value == value) || (this.right != null && this.right.value == value)) {
            return this;
        }
        if (this.value > value && this.left != null) {
            return this.left.searchParent(value);
        } else if (this.value < value && this.right != null) {
            return this.right.searchParent(value);
        }
        // 如果走到这还没有找到,就说明已经找不到了
        return null;
    }
}
```

### 平衡二叉树

#### Info

<img src="https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523514.png" style="zoom:80%;" />
<img src="https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523515.png" style="zoom:80%;" />

#### 左旋转,右旋转

<img src="https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523516.png" style="zoom:80%;" />
<img src="https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523517.png" style="zoom:80%;" />

```java
// 这段代码,重点在Node里的add(), leftRotate(), rightRotate(), height(), leftHeight(), rightheight()
public class AVLTree {
    public static void main(String[] args) {
        int[] arr = {10, 11, 7, 6, 8, 9};
        BinarySortTree binarySortTree = new BinarySortTree();
        for(int i = 0; i < arr.length; i++) {
            binarySortTree.add(new Node(arr[i]));
        }
        System.out.println(binarySortTreegetRoot().leftHeight());
        System.out.println(binarySortTreegetRoot().rightHeight());
        System.out.println(binarySortTreegetRoot().height());
        System.out.println(binarySortTreegetRoot());
        binarySortTree.infixNode();
    }
}

class BinarySortTree {
    private Node root;
    public Node getRoot() {
        return root;
    }
    public void add(Node node) {
        if (root == null) {
            root = node;
            return;
        }
        root.add(node);
    }

    public void infixNode() {
        if (root == null) {
            System.out.println("该树为空");
            return;
        }
        root.infixOrder();
    }
}


@SuppressWarnings({"all"})
class Node {
    int value;
    Node left;
    Node right;

    public Node(int value) {
        this.value = value;
    }

    // 左旋转
    private void leftRotate() {
        // 创建一个新的节点,让该结点的值等于当前根节点的值
        Node newNode = new Node(this.value);
        // 把 新节点的左子节点 设置为 当前根节点的左子节点
        newNode.left = this.left;
        // 把 新节点的右子节点 设置为 当前根节点的右子节点的左子节点
        newNode.right = this.right.left;
        // 把 新节点的值 设置为 当前根节点的右子节点的值
        this.value = this.right.value;
        // 把 当前跟节点的右子节点 设置为 当前根节点的右子节点的右子节点
        this.right = this.right.right;
        // 把 根节点的左子节点 设置为 新节点
        this.left = newNode;
    }

    // 右旋转
    public void rightRotate() {
        Node newNode = new Node(this.value);
        newNode.right = this.right;
        newNode.left = this.left.right;
        this.value = this.left.value;
        this.left = this.left.left;
        this.right = newNode;
    }

    public int leftHeight() {
        if (left == null) {
            return 0;
        }
        return left.height();
    }

    public int rightHeight() {
        if (right == null) {
            return 0;
        }
        return right.height();
    }

    // 返回以该结点为根节点的树的高度
    public int height() {
        return Math.max(left == null ? 0 : left.height(), right == null ? 0 : right.height()) + 1;
    }

    // 添加结点, 如果node.value比this小,就放在this的左边,反之,则放在右边,后面的每个结点都是这样放置依次向下放置
    public void add(Node node) {
        if (node == null) {
            return;
        }
        if (node.value < this.value) {
            if (this.left == null) {
                this.left = node;
            } else {
                this.left.add(node);
            }
        } else {
            if (this.right == null) {
                this.right = node;
            } else {
                this.right.add(node);
            }
        }

        // 当添加完一个节点的时候,如果 (根节点右子树的高度 - 根节点左子树的高度) > 1 就进行左旋转操作
        if (this.rightHeight() - this.leftHeight() > 1) {
            // 注意这里的操作,需要根据图文来看,如果单单就是对以root为根节点的树进行左旋转和右旋转的操作是不行的

            // 如果 root的右子树的左子树的高度 > root的右子树的右子树的高度, 就对以root的右子节点为根节点的树,进行右旋转操作
            if (this.right != null && this.right.leftHeight() > this.right.rightHeight()) {
                this.right.rightRotate();
            }
            this.leftRotate(); // 对以root为根节点的树,进行左旋转操作
        } else if (this.leftHeight() - this.rightHeight() > 1) {
            // 如果 root的左子树的左子树的高度 > root的左子树的右子树的高度, 就对以root的左子节点为根节点的树,进行左旋转操作
            if (this.left != null && this.left.rightHeight() > this.left.leftHeight()) {
                this.left.leftRotate();
            }
            this.rightRotate(); // 对以root为根节点的树,进行右旋转操作
        }
    }

    public void infixOrder() {
        if (this.left != null) {
            this.left.infixOrder();
        }
        System.out.println(this);
        if (this.right != null) {
            this.right.infixOrder();
        }
    }

    @Override
    public String toString() {
        return "Node{" +
                "value=" + value +
                '}';
    }
}
```

## 多路查找树

### Info

二叉树需要加载到内存的，如果二叉树的节点少，没有什么问题，但是如果二叉树的节点很多(比如1 亿)， 就存在如下问题:

* 问题1：在构建二叉树时，需要多次进行i/o 操作(海量数据存在数据库或文件中)，节点海量，构建二叉树时，速度有影响
* 问题2：节点海量，也会造成二叉树的高度很大，会降低操作速度

> 多叉树

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523518.png)

在二叉树中，每个节点有数据项，最多有两个子节点。如果允许每个节点可以有更多的数据项和更多的子节点，就是多叉树（multiway tree）

后面我们讲解的 2-3树，2-3-4树 就是多叉树，多叉树通过重新组织节点，减少树的高度，能对二叉树进行优化。

> B树

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523519.png)

B树 就是每个结点里可以存放多个数据项,并且每个结点可以有多个子节点,这样就降低树的高度，并且减少i/o 读写次数来提升效率,如图 B树通过重新组织节点,降低了树的高度.

文件系统及数据库系统的设计者利用了磁盘预读原理，将一个节点的大小设为等于一个页(页得大小通常为4k)，这样每个节点只需要一次I/O 就可以完全载入

将树的度M设置为1024，在600亿个元素中最多只需要4次I/O操作就可以读取到想要的元素,B树(B+)广泛应用于文件存储系统以及数据库系统中

结点的度 是该结点的子节点的个数,比如二叉树的结点的度就是2,而树的度是其所有结点中最高度的结点的度

### 2-3树

> Info

2-3树 是最简单的B 树结构, 具有如下特点:

2-3 树是由二节点和三节点构成的树,要求所有叶子节点都在同一层.(只要是B树都满足这个条件)

* 有两个子节点的节点叫二节点，二节点要么没有子节点,要么有两个子节点,即不能出现只有一个结点的情况
* 有三个子节点的节点叫三节点，三节点要么没有子节点,要么有三个子节点,即不能出现只有一个结点或者两个结点的情况

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523520.png)

> Employ

将数列{16, 24, 12, 32, 14, 26, 34, 10, 8, 28, 38, 20} 构建成2-3 树，并保证数据插入的大小顺序。(演示一下构建2-3
树的过程.)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523521.png)

插入规则:

* 2-3 树的所有叶子节点都在同一层.(只要是B 树都满足这个条件)
  * 有两个子节点的节点叫二节点，二节点要么没有子节点,要么有两个子节点,即不能出现只有一个结点的情况
  * 有三个子节点的节点叫三节点，三节点要么没有子节点,要么有三个子节点,即不能出现只有一个结点或者两个结点的情况
* 当按照规则插入一个数到某个节点时，不能满足上面三个要求，就需要拆，先向上拆，如果上层满，则拆本层，拆后仍然需要满足上面3 个条件。
* 对于三节点的子树的值大小仍然遵守(BST 二叉排序树)的规则

### 2-3-4树

除了2-3树，还有2-3-4树等，概念和2-3树类似，也是一种B树。如图:

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523522.png)

### B树,B+树,B*树

> B树

B-tree树即B树，B即Balanced，平衡的意思。有人把B-tree 翻译成B-树，容易让人产生误解。会以为B-树是一种树，而B树又是另一种树

前面已经介绍了2-3树和2-3-4树，他们就是B树(英语：B-tree 也写成B-树)，Mysql 某些类型的索引是基于B树或者B+树的

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523523.png)

* B树的阶：节点的最多子节点个数。比如: 2-3树的阶是3，2-3-4树的阶是4
* B-树的搜索，从根结点开始，对结点内的关键字（有序）序列进行二分查找，如果命中则结束，否则进入查询关键字所属范围的儿子结点；重复，直到所对应的儿子指针为空，或已经是叶子结点
* 关键字集合分布在整颗树中, 即叶子节点和非叶子节点都存放数据.
* 搜索有可能在非叶子结点结束
* 其搜索性能等价于在关键字全集内做一次二分查找

> B+树

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523524.png)

* B+树的搜索与B树也基本相同，区别是B+树只有达到叶子结点才命中（B树可以在非叶子结点命中），其性能也等价于在关键字全集做一次二分查找
* 所有关键字都出现在叶子结点的链表中（即数据只能在叶子节点【也叫稠密索引】），且链表中的关键字(数据)恰好是有序的。
* 不可能在非叶子结点命中
* 非叶子结点相当于是叶子结点的索引（稀疏索引），叶子结点相当于是存储（关键字）数据的数据层
* B+树更适合文件索引系统, B树和B+树各有自己的应用场景，不能说B+树完全比B树好，反之亦然.

> B\*树

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523525.png)

* B\*树定义了非叶子结点关键字个数至少为(2/3)\*M，即块的最低使用率为2/3，而B+树的块的最低使用率为的1/2。
* 从第1个特点我们可以看出，B\*树分配新结点的概率比B+树要低，空间使用率更高

# 图

## Info

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523526.png)

线性表局限于一个直接前驱和一个直接后继的关系, 树也只能有一个直接前驱也就是父节点

当我们需要表示多对多的关系时，这里我们就用到了图。

> 无向图,有向图,带权图

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523527.png)![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523528.png)![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523529.png)

## 图的表示

图的表示方式有两种：二维数组表示（邻接矩阵）；链表表示（邻接表）

> 邻接矩阵

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523530.png)

邻接矩阵是表示图形中顶点之间相邻关系的矩阵，对于n个顶点的图而言，矩阵是由row和col表示的是1....n个点。

比如: arr\[0]\[1] = 1 表示0和1相连, arr\[0]\[2] = 1 表示0和2相连, arr\[0]\[3] = 0 表示0和3没有相连


> 邻接表

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523531.png)

邻接矩阵需要为每个顶点都分配n个边的空间，其实有很多边都是不存在,会造成空间的一定损失.

邻接表的实现只关心存在的边，不关心不存在的边。因此没有空间浪费，邻接表由数组+链表组成

## 创建,添加

```java
public class Graph {
    private ArrayList<String> vertexList; // 存储顶点集合, vertex表示顶点的意思
    private int[][] edges; // 存储图对应的邻接矩阵
    private int numOfEdges; // 表示边的数目

    public static void main(String[] args) {
        int size = 5; // 表示有5个顶点
        Graph graph = new Graph(size);
        String[] vertexes = {"A", "B", "C", "D", "E"};
        // 添加顶点, 0:A, 1:B, 2:C, 3:D, 4:E
        for (String vertex : vertexes) {
            graph.insertVertex(vertex);
        }
        // 添加边 A-B, A-C, B-C, B-D, B-E
        graph.insertEdge(0, 1, 1);
        graph.insertEdge(0, 2, 1);
        graph.insertEdge(1, 2, 1);
        graph.insertEdge(1, 3, 1);
        graph.insertEdge(1, 4, 1);
        // 显示邻接矩阵
        graph.showGraph();
    }

    public Graph(int n) {
        edges = new int[n][n]; // 定义邻接矩阵的容量为 n * n
        vertexList = new ArrayList<String>(n); // 定义集合的初始容量为n
        numOfEdges = 0;
    }

    // 插入顶点
    public void insertVertex(String vertex) {
        vertexList.add(vertex);
    }

    /**
     * 插入边 edges[v1][v2]的值 代表 下标为v1的顶点 和 下标为v2的顶点的关系
     * @param v1 表示下标为v1的顶点
     * @param v2 表示下标为v2的顶点
     * @param weight 表示v1对v2的关系,比如用1表示有连接关系,用0表示没有连接关系
     */
    public void insertEdge(int v1, int v2, int weight) {
        // 让下标为v1的顶点和下标为v2的顶点建立连接的关系为weight(1表示建立了连接,0表示没有建立连接)
        edges[v1][v2] = weight;
        edges[v2][v1] = weight;
        // 记录边的数量+1
        numOfEdges++;
    }

    // 返回结点个数
    public int getNumOfVertex() {
        return vertexList.size();
    }

    // 返回边的个数
    public int getNumOfEdges() {
        return numOfEdges;
    }

    // 返回对应结点的值,这里vertexList里存储的是顶点A,B,C...所以根据index, 通过get()来获取
    public String getValueByIndex(int index) {
        return vertexList.get(index);
    }

    // 展示列表
    public void showGraph() {
        for (int[] link : edges) {
            System.out.println(Arrays.toString(link));
        }
    }
}
```

## 遍历

### Info

所谓图的遍历，即是对结点的访问。一个图有那么多个结点，如何遍历这些结点，需要特定策略

一般有两种访问策略:, 深度优先遍历(dfs), 广度优先遍历(bfs)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523532.png)

### 深度优先遍历(dfs)

> Info

深度优先遍历，从初始访问结点出发，初始访问结点可能有多个邻接结点，深度优先遍历的策略就是首先访问第一个邻接结点，然后再以这个被访问的邻接结点作为初始结点，访问它的第一个邻接结点， 可以这样理解：每次都在访问完当前结点后首先访问当前结点的第一个邻接结点。

我们可以看到，这样的访问策略是优先往纵向挖掘深入，而不是对一个结点的所有邻接结点进行横向访问。

显然，深度优先搜索是一个递归的过程

> Employ

1. 访问 初始结点v，并标记 结点v 为已访问。
2. 查找 结点v 的第一个 邻接结点w。
3. 若 邻接结点w 存在，则继续执行步骤4, 如果w不存在，则回到第1步，将从 结点v的下一个结点继续。
4. 如果 邻接结点w 未被访问，对w进行深度优先遍历递归(即把w当做另一个v，然后进行步骤123)
5. 如果 邻接节点w 被访问了, 就访问 结点v 的 邻接结点w 的下一个 邻接结点(即 邻接结点w+1)，转到步骤3
6. 如果 结点v 的 所有的邻接结点都被访问过了, 就返回上一个结点v, 访问该结点的 邻接结点w 的下一个 邻接结点
7. 因为 所有的结点不一定都相连(即有的结点没有和其他结点产生连接), 所有我们要遍历vertexList中的所有的结点,对每个结点都要进行一次dfs遍历,就能考虑到所有结点的遍历了

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311523533.png)

```java
private boolean isVisited[]; // 表示每个顶点是否被访问了,可以在构造器中,对isVisited进行初始化

// 深度优先遍历算法
public void dfs(boolean[] isVisited, int i) {
    // 首先我们访问该结点,输出
    System.out.print(getValueByIndex(i) + "->");
    // 将结点设置为已访问
    isVisited[i] = true;
    // 查找结点i的第一个邻接节点
    int w = getFirstNeighbor(i);

    while (w != -1) { // 说明找到了
        // 对还没有访问的结点进行dfs遍历
        if (!isVisited[w]) {
            dfs(isVisited, w);
        }
        // 说明w结点已经访问过了,访问vertexList中排在w后面的结点
        w = getNextNeighbor(i, w);
    }
}

// 对dfs进行一个重载,遍历我们所有的结点,并进行dfs
// * 如果所有的结点都是相连的,就只需要对其中一个结点进行dfs遍历,就能完成所有结点的遍历
// * 如果有些结点是没有和其它结点连接的,就无法通过一个dfs完成,需要遍历整个vertexList中的结点,对每个结点进行一次dfs遍历
public void dfs() {
    isVisited = new boolean[vertexList.size()];
    for (int i = 0; i < getNumOfVertex(); i++) {
        if (!isVisited[i]) {
            dfs(isVisited, i);
        }
    }
}

// 返回当前顶点的邻接结点
// * 如果有就返回其下标(这里返回的是第一个有连接关系的邻接节点,后面可能还有,但是没访问到,就先把最先访问到的给提交了)
// * 如果没有就返回-1
public int getFirstNeighbor(int index) {
    for (int j = 0; j < vertexList.size(); j++) {
        if (edges[index][j] > 0) {
            return j;
        }
    }
    return -1;
}

// 返回 v1结点 从v2结点向后的 邻接结点(不包括v2结点), 即访问v2+1结点(edges[v1][v2 + 1])
public int getNextNeighbor(int v1, int v2) {
    for (int j = v2 + 1; j < vertexList.size(); j++) {
        if (edges[v1][j] > 0) {
            return j;
        }
    }
    return -1;
}

public Graph(int n) {
    edges = new int[n][n]; // 定义邻接矩阵的容量为 n * n
    vertexList = new ArrayList<String>(n); // 定义集合的初始容量为n
    numOfEdges = 0;
    isVisited = new boolean[n]; // 初始化isVisited
}
```

### 广度优先遍历(bfs)

> Info

图的广度优先搜索(Broad First Search),类似于一个分层搜索的过程，广度优先遍历需要使用一个队列以保持访问过的结点的顺序，以便按这个顺序来访问这些结点的邻接结点

广度优先遍历算法步骤

* 访问 初始结点, 入队列 并标记 为已访问
* 判断当队列 是否为空
  * 如果 为空,算法结束
  * 如果 不为空,继续执行
* 头结点 出队列, 该结点(标记为u) 查找 结点u 的第一个邻接结点(标记为w)
  * 如果 不存在, 则转到步骤2
  * 如果 存在
    * 判断 结点w 是否被访问过
      * 如果 未访问 则访问 结点w 并标记为已访问, 结点w 入队列,
      * 如果 访问过 则接着执行下面的程序
    * 查找 结点u 的 继 w邻接结点 后的下一个 邻接结点w，转到步骤3.1

```java
// 对一个结点进行广度优先遍历
private void bfs(boolean[] isVisited, int i) {
    int u; // 表示队列的头结点
    int w; // 邻接结点w
    LinkedList queue = new LinkedList(); // 队里,记录结点访问的顺序
    System.out.print(getValueByIndex(i) + " -> "); // 访问结点,输出结点信息
    isVisited[i] = true;
    queue.addLast(i); // 将结点加入到队列中
    while (!queue.isEmpty()) {
        u = (Integer)queue.removeFirst(); // 取得队列的头结点
        w = getFirstNeighbor(u); // 取得第一个邻接结点的下标w
        while (w != -1) {
            if (!isVisited[w]) { // 判断没有访问过
                System.out.print(getValueByIndex(w) + " -> "); // 输出信息
                isVisited[w] = true; // 标记已经访问过
                queue.addLast(i); // 将结点加入到队列中
            }
            w = getNextNeighbor(u, w); // 以u为前驱结点,找w后面的下一个邻接节点
        }
    }
}

public void bfs() {
    isVisited = new boolean[vertexList.size()];
    for (int i = 0; i < getNumOfVertex(); i++) {
        if (!isVisited[i]) {
            bfs(isVisited, i);
        }
    }
}
```