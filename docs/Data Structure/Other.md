# LRU Cache

[Problem Description](https://leetcode.cn/problems/lru-cache/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=189&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public class LRUCache {
    private HashMap<Integer, Node> map;
    private LinkedList<Node> list;
    private int cap;
    
    public LRUCache(int cap) {
        this.map = new LinkedHashMap<>(cap);
        this.list = new LinkedList<>();
        this.cap = cap;
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) {
            return -1;
        }
        Node node = map.get(key);
        list.remove(node);
        list.addFirst(node);
        return node.val;
    }
    
    public void put(int key, int val) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.val = val;
            map.put(key, node);
            list.remove(node);
            list.addFirst(node);
        } else {
            if (map.size() == cap) {
                Node last = list.removeLast();
                map.remove(last.key);
            }
            Node node = new Node(key, val);
            map.put(key, node);
            list.addFirst(node);
        }
    }
    
    public static class Node {
        int key;
        int val;
        
        public Node() {
        }
        
        public Node(int key, int val) {
            this.key = key;
            this.val = val;
        }
    }
}
```

# LFU Cache

[Problem Description](https://leetcode.cn/problems/lfu-cache/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=190&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public class LFUCache {
    private HashMap<Integer, Node> kvMap;
    private HashMap<Integer, DoubleLinkedList> freqMap;
    private int cap;
    private int minFreq = 1;
    
    public LFUCache(int cap) {
        this.cap = cap;
        this.kvMap = new HashMap<>();
        this.freqMap = new HashMap<>();
    }
    
    public int get(int key) {
        if (!kvMap.containsKey(key)) {
            return -1;
        }
        Node node = kvMap.get(key);
        freqMap.get(node.freq).remove(node);
        if (freqMap.get(node.freq).isEmpty() && node.freq == minFreq) {
            minFreq++;
        }
        node.freq++;
        
        freqMap.computeIfAbsent(node.freq, k -> new DoubleLinkedList())
               .addFirst(node);
        
        return node.val;
    }
    
    public void put(int key, int val) {
        if (kvMap.containsKey(key)) {
            Node node = kvMap.get(key);
            freqMap.get(node.freq).remove(node);
            if (freqMap.get(node.freq).isEmpty() && node.freq == minFreq) {
                minFreq++;
            }
            node.freq++;
            
            freqMap.computeIfAbsent(node.freq, k -> new DoubleLinkedList())
                   .addFirst(node);
            node.val = val;
        } else {
            if (kvMap.size() == cap) {
                Node removed = freqMap.get(minFreq).removeLast();
                kvMap.remove(removed.key);
            }
            Node node = new Node(key, val);
            kvMap.put(key, node);
            freqMap.computeIfAbsent(1, k -> new DoubleLinkedList())
                   .addFirst(node);
            minFreq = 1;
        }
    }
    
    public static class Node {
        Node prev;
        Node next;
        int key;
        int val;
        int freq = 1;
        
        public Node() {
        }
        
        public Node(int key, int val) {
            this.key = key;
            this.val = val;
        }
    }
    
    public static class DoubleLinkedList {
        Node head;
        Node tail;
        int size;
        
        public DoubleLinkedList() {
            head = tail = new Node();
            head.next = tail;
            tail.next = head;
        }
        
        public void addFirst(Node newFirst) {
            Node oldFirst = head.next;
            newFirst.prev = head;
            newFirst.next = oldFirst;
            head.next = newFirst;
            oldFirst.prev = newFirst;
            size++;
        }
        
        public void remove(Node removed) {
            Node prev = removed.prev;
            Node next = removed.next;
            prev.next = next;
            next.prev = prev;
            size--;
        }
        
        public Node removeLast() {
            Node removed = tail.prev;
            remove(removed);
            return removed;
        }
        
        public boolean isEmpty() {
            return size == 0;
        }
    }
}
```

# TinyURL (Random Number)

[Problem Description](https://leetcode.cn/problems/encode-and-decode-tinyurl/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=193&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static class Codec {
    private Map<String, String> longToShort;
    private Map<String, String> shortToLong;
    private static final String SHORT_PREFIX = "http://tinyurl.com/";
    
    public Codec() {
        this.longToShort = new HashMap<>();
        this.shortToLong = new HashMap<>();
    }
    
    // Encodes a URL to a shortened URL.
    public String encode(String longUrl) {
        String shortUrl = longToShort.get(longUrl);
        if (shortUrl != null) {
            return shortUrl;
        }
      
        do {
            shortUrl = SHORT_PREFIX + ThreadLocalRandom.current().nextInt();
        } while (shortToLong.containsKey(shortUrl));

        longToShort.put(longUrl, shortUrl);
        shortToLong.put(shortUrl, longUrl);
        return shortUrl;
    }
    
    // Decodes a shortened URL to its original URL.
    public String decode(String shortUrl) {
        return shortToLong.get(shortUrl);
    }
}
```

# TinyURL (Random Number)

```java
int id = longUrl.hashCode();
do {
    shortUrl = SHORT_PREFIX + id++;
} while (shortToLong.containsKey(shortUrl));
```

# TinyURL (Auto Increment ID)

```java
private static int id = 1;

public String encode(String longUrl) {
    shortUrl = SHORT_PREFIX + id++;
}
```

# TinyURL (Base 62)

```java
private static final char[] toBase62 = {
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
};

public static String intToString(int num) {
    if (num == 0) {
        return "A";
    }
    StringBuilder sb = new StringBuilder();
    while (num > 0) {
        sb.append(toBase62[num % 62]);
        num /= 62;
    }
    return sb.toString();
}

public String encode(String longUrl) {
    shortUrl = SHORT_PREFIX + intToString(id);
}
```

# Design Twitter

[Problem Description](https://leetcode.cn/problems/design-twitter/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=194&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public class Twitter {
    private final Map<Integer, User> userMap;
    private static int time;
    
    public Twitter() {
        this.userMap = new HashMap<>();
    }
    
    public void postTweet(int userId, int tweetId) {
        User user = userMap.computeIfAbsent(userId, User::new);
        user.headTweet.next = new Tweet(tweetId, time++, user.headTweet.next);
    }
    
    public List<Integer> getNewsFeed(int userId) {
        User user = userMap.get(userId);
        if (user == null) {
            return List.of();
        }
        
        PriorityQueue<Tweet> queue = new PriorityQueue<>(Comparator.comparingInt(Tweet::getTime).reversed());
        if (user.headTweet.next != null) {
            queue.offer(user.headTweet.next);
        }
        
        for (Integer followeeId : user.followeeIds) {
            User followee = userMap.get(followeeId);
            if (followee.headTweet.next != null) {
                queue.offer(followee.headTweet.next);
            }
        }
        
        List<Integer> res = new ArrayList<>();
        int count = 0;
        while (!queue.isEmpty() && count < 10) {
            Tweet max = queue.poll();
            res.add(max.id);
            if (max.next != null) {
                queue.offer(max.next);
            }
            count++;
        }
        
        return res;
    }
    
    public void follow(int followerId, int followeeId) {
        User follower = userMap.computeIfAbsent(followerId, User::new);
        User followee = userMap.computeIfAbsent(followeeId, User::new);
        follower.followeeIds.add(followee.id);
    }
    
    public void unfollow(int followerId, int followeeId) {
        User follower = userMap.get(followerId);
        if (follower == null) {
            return;
        }
        follower.followeeIds.remove(followeeId);
    }
    
    static class Tweet {
        int id;
        int time;
        Tweet next;
        
        public Tweet(int id, int time) {
            this.id = id;
            this.time = time;
        }
        
        public Tweet(int id, int time, Tweet next) {
            this.id = id;
            this.time = time;
            this.next = next;
        }
        
        public int getId() {
            return id;
        }
        
        public int getTime() {
            return time;
        }
    }
    
    static class User {
        int id;
        Set<Integer> followeeIds;
        Tweet headTweet;
        
        public User(int id) {
            this.id = id;
            this.followeeIds = new HashSet<>();
            this.headTweet = new Tweet(-1, -1, null);
        }
    }
}
```

