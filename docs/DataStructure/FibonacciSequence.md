# Fibonacci Sequence Array

```java
public static int[] fib(int arrLength) {
    int[] f = new int[arrLength];
    f[0] = 1;
    f[1] = 1;
    for (int i = 2; i < arrLength; i++) {
        f[i] = f[i - 1] + f[i - 2];
    }
    return f;
}
```

# Fibonacci Sequence (Recursive)

```java
public static int fib(int n) {
    if (n <= 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}
```

# Fibonacci Sequence (loop)

```java
public static int fib(int n) {
    if (n <= 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        int fib1 = 0;
        int fib2 = 1;
        int fibN = 0;
        for (int i = 2; i <= n; i++) {
            fibN = fib1 + fib2;
            fib1 = fib2;
            fib2 = fibN;
        }
        return fibN;
    }
}
```

# Fibonacci Sequence (Memorization)

进行 fib(5) 需要重复计算多次 f(2), f(3), 非常低效. 可以将这些计算过的数据通过数组存储起来, 再次需要时, 直接获取值, 省去重复计算.

```java
public static int fib(int n) {
    int[] dp = new int[n + 1];
    
    if (n == 0) {
        dp[0] = 0;
        return 0;
    }
    
    if (n == 1) {
        dp[1] = 1;
        return 1;
    }
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}
```

# Fibonacci (DP)

```java
public static int fib(int n) {
    if (n == 0) {
        return 0;
    }
    
    if (n == 1) {
        return 1;
    }
    
    int n1 = 0;
    int n2 = 1;
    int n3 = n1 + n2;
    for (int i = 2; i <= n; i++) {
        n3 = n1 + n2;
        n1 = n2;
        n2 = n3;
    }
    
    return n3;
}
```

