# Midean

```java
int l = 10;
int r = 15;
int m = (l + r) >>> 1;
```

# Judging Even

```java
int x = 10;
int res = x & 1 = 0

int x = 11
int res = x & 1 = 1
```

# Swap two value

```java
a ^= b;
b ^= a;
a ^= b;
```

# Absolute Value

```java
int x = 10;
int res = x >> 31; // 0

int x = -10;
int res = x >> 31; // -1

int x = 10;
System.out.println(x & (x >> 31)); // 0

int x = -10;
System.out.println(x & (x >> 31)); // -10

int x = 10;
System.out.println(x ^ (x >> 31)); // 10

int x = -10;
System.out.println(x ^ (x >> 31)); // -9

int x = -10;
int res = (x ^ (x >> 31)) - (x >> 31)); // 10
```

# Take the Nth Power of 2 Upwards

```java
// 3 -> 4, 8 -> 8, 14 -> 16, 29 -> 32
int x = 29;
x -= 1;
x |= x >> 1;
x |= x >> 2;
x |= x >> 4;
x |= x >> 8;
x |= x >> 16;
x += 1; // 32
```

# Take the Nth Power of 2 Upwards

```java
int x = 29;
x = 1 << (int) (Math.log10(x - 1) / Math.log10(2)) + 1; // 32
```

# Modular Index

```java
int res = hash[idx & hash.length - 1];
```

# Single Number

[Problem Description](https://leetcode.cn/problems/single-number/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=43&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public int singleNumber(int[] nums) {
    int res = 0;
      
    // XOR all the numbers in the array.
    // This will effectively cancel out the numbers that appear twice
    for (int num : nums) {
        res ^= num;
    }
    
    return res;
}
```

# Counting Bits

[Problem Description](https://leetcode.cn/problems/counting-bits/description/)

[Explain](https://www.bilibili.com/video/BV1eg411w7gn?p=50&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int[] countBits(int n) {
    int[] result = new int[n + 1];
    for (int i = 0; i <= n; i++) {
        result[i] = countOnes(i);
    }
    return result;
}

public static int countOnes(int num) {
    int count = 0;
    while (num != 0) {
        num = num & (num - 1);
        count++;
    }
    return count;
}
```

# Counting Bits

[Explain p338 (06:37)](https://www.bilibili.com/video/BV1eg411w7gn?p=50&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int[] countBits(int n) {
    int[] result = new int[n + 1];
    result[0] = 0;
    for (int i = 1; i <= n; i++) {
        result[i] = (i & 1) == 0 ? result[i >> 1] : result[i - 1] + 1;
    }
    return result;
}
```

# Hamming Distance

[Problem Description](https://leetcode.cn/problems/hamming-distance/description/)

[Explain](https://www.bilibili.com/video/BV1eg411w7gn?p=51&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public int hammingDistance(int x, int y) {
    return countOnes(x ^ y);
}

public static int countOnes(int num) {
    int count = 0;
    while (num != 0) {
        num = num & (num - 1);
        count++;
    }
    return count;
}
```

