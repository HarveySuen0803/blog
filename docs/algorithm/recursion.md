# HanoiTower

```java
public static LinkedList<Integer> a = new LinkedList<>();
public static LinkedList<Integer> b = new LinkedList<>();
public static LinkedList<Integer> c = new LinkedList<>();

public static void init(int n) {
    for (int i = 0; i < n; i++) {
        a.addFirst(i + 1);
    }
}

public static void move(int n, LinkedList<Integer> a, LinkedList<Integer> b, LinkedList<Integer> c) {
    if (n == 0) {
        return;
    }
    // a -> b
    move(n - 1, a, c, b);
    // a -> c
    c.addLast(a.removeLast());
    // b -> c
    move(n - 1, b, a, c);
}

public static void hanoiTower(int n) {
    init(n);
    move(n, a, b, c);
}
```

# Pascal Triangle (2D Array)

```java
public static int pascalTriangle(int i, int j) {
    if (j == 0 || i == j) {
        return 1;
    }
    return pascalTriangle(i - 1, j - 1) + pascalTriangle(i - 1, j);
}

public static void print(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            System.out.print(pascalTriangle(i, j) + "\t");
        }
        System.out.println();
    }
}
```

```console
1	
1	1	
1	2	1	
1	3	3	1	
1	4	6	4	1	
```

# Pascal Triangle (2D Array, Memorization)

```java
public static int pascalTriangle(int[][] triangle, int i, int j) {
    if (triangle[i][j] != 0) {
        return triangle[i][j];
    }
    if (j == 0 || i == j) {
        return 1;
    }
    triangle[i][j] = pascalTriangle(triangle, i - 1, j - 1) + pascalTriangle(triangle, i - 1, j);
    return triangle[i][j];
}

public static void print(int n) {
    int[][] triangle = new int[n][];
    
    for (int i = 0; i < n; i++) {
        triangle[i] = new int[i + 1];
        
        for (int j = 0; j <= i; j++) {
            System.out.print(pascalTriangle(triangle, i, j) + "\t");
        }
        System.out.println();
    }
}
```

# Pascal Triangle (1D Array)

```java
public static void pascalTriangle(int[] triangle, int i) {
    if (i == 0) {
        triangle[0] = 1;
        return;
    }
    
    for (int j = i; j > 0; j--) {
        triangle[j] = triangle[j] + triangle[j - 1];
    }
}

public static void print(int n) {
    int[] triangle = new int[n];
    
    for (int i = 0; i < n; i++) {
        pascalTriangle(triangle, i);
        
        for (int j = 0; j <= i; j++) {
            System.out.print(triangle[j] + "\t");
        }
        System.out.println();
    }
}
```