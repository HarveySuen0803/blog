# Adapter Pattern

通过 Adapter 转换一个 class 的 interface 为另一个 class 所希望的 interface, 使两个 class 兼容

Card 和 SDCard 没有关系, Computer 只能识别 Card, 无法识别 SDCard, 而 SDCard 可以实现 Card 的 read() 功能, 可以由 Adapter 作中间件, 让 Adapter 实现 Card, 内部维护一个 SDCard, 调用 SDCard 的 read()

```java
public class Main {
    public static void main(String[] args) throws IOException {
        new Computer().read(new Adapter(new SDCard()));
    }
}

interface Card {
    void read();
}

class SDCard {
    public void read() {
        System.out.println("read SD card");
    }
}

class Adapter implements Card {
    private SDCard sdCard;
    
    public Adapter(SDCard sdCard) {
        this.sdCard = sdCard;
    }
    
    @Override
    public void read() {
        sdCard.read();
    }
}

class Computer {
    public void read(Card card) {
        card.read();
    }
}
```

# Adapter Pattern Case

JDK 的 StreamEncode 都采用了 Adapter Pattern

OutputStreamWriter 维护了一个 StreamEncoder, 调用 StreamEncoder 的 write() 实现了 Writer 的功能

StreamEncoder 维护了一个 OutputStream, 调用 OutputStream 的 write() 实现了 Writer 的功能

FileOutputStream 和 Writer 没有关系, 而 FileOutputStream 可以实现 Writer 的 write(), 由 StreamEncoder 作中间件, 直接调用 FileOutputStream object 的 write() 实现了 Writer 的功能

```java
OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("/Users/HarveySuen/Downloads/test.txt"));
osw.write("hello world");
```

```java
public class OutputStreamWriter extends Writer {
    private final StreamEncoder se;
    
    public void write(String str) {
        se.write(String str);
    }
}
```

```java
public class StreamEncoder extends Writer {
    private final OutputStream out;
    
    public void write(String str) {
        out.write(str);
    }
}
```

