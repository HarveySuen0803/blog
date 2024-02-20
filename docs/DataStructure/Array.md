# Dynamic Array

Dynamic Array 就是可以动态添加元素, 删除元素的数组. ArrayList 就是一个 Dynamic Array

```java
public class DynamicArray implements Iterable<Integer> {
    private int size;
    private int cap;
    private int[] arr;
    
    public DynamicArray(int cap) {
        this.cap = cap;
        this.size = 0;
        this.arr = new int[cap];
    }
    
    public void add(int val) {
        add(size, val);
    }
    
    public void add(int idx, int val) {
        if (idx < 0 || idx >= cap) {
            throw new IllegalArgumentException("Illegal argument");
        }
        
        if (isFull()) {
            expandCap();
        }
        
        System.arraycopy(arr, idx, arr, idx + 1, size - idx); // {0, 1, 3, 0} -> {0, 1, 1, 3}
        arr[idx] = val; // {0, 1, 1, 3} -> {0, 1, 2, 3}
        size++;
    }
    
    public int remove(int idx) {
        if (idx < 0 || idx >= size) {
            throw new IllegalArgumentException("Illegal argument");
        }
        
        if (isEmpty()) {
            throw new IllegalArgumentException("Illegal argument");
        }
        
        int removed = arr[idx];
        System.arraycopy(arr, idx + 1, arr, idx, size - idx); // {0, 1, 2, 3} -> {0, 2, 3, 3}
        size--;
        return removed;
    }
    
    public void expandCap() {
        int[] newArr = new int[cap += cap >> 1];
        System.arraycopy(arr, 0, newArr, 0, size);
        arr = newArr;
    }
    
    public boolean isFull() {
        return size == cap;
    }
    
    public boolean isEmpty() {
        return size == 0;
    }
    
    // Traverse array with Consumer
    public void print(Consumer<Integer> consumer) {
        for (int i = 0; i < size; i++) {
            consumer.accept(arr[i]);
        }
    }
    
    // Traverse array with Iterator
    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<Integer>() {
            int idx = 0;
            
            @Override
            public boolean hasNext() {
                return idx < size;
            }
            
            @Override
            public Integer next() {
                return arr[idx++];
            }
        };
    }
    
    // Traverse array with Stream
    public IntStream stream() {
        return IntStream.of(Arrays.copyOfRange(arr, 0, size));
    }
}
```

# 2D Array

CPU 读取数据时, 会先将 Memory 存放到 Cache 中, 再从 Cache 中读取数据, 一次 Memory 到 Cache 的 IO 会连续读取 64 B, 即一个 Cache Line.

按照 `arr[0][0] -> arr[1][0] -> arr[2][0]` 读取到连续数据后, 会立马用到

按照 `arr[0][0] -> arr[0][1] -> arr[0][2]` 读取到连续数据后, 不会立马用到, 有可能塞满了 Cache 都不会用着, 这就会导致后续的数据覆盖前面的数据, 重复加载数据, 非常低效.

```java
int[][] arr = new int[10][10];

/*
    High performance
        arr[0][0] -> arr[0][1] -> arr[0][2]
        arr[1][0] -> arr[1][1] -> arr[1][2]
        arr[2][0] -> arr[2][1] -> arr[3][2]
 */
for (int i = 0; i < 10; i++) {
    for (int j = 0; j < 10; j++) {
        System.out.println(arr[i][j]);
    }
}

/*
    Low performance
        arr[0][0] -> arr[1][0] -> arr[2][0]
        arr[0][1] -> arr[1][1] -> arr[2][1] 
        arr[0][2] -> arr[1][1] -> arr[2][2]
 */
for (int j = 0; j < 10; j++) {
    for (int i = 0; i < 10; i++) {
        System.out.println(arr[i][j]);
    }
}
```

# Merge Sorted Array

```java
/*
    i           j
    1, 5, 6     2, 4, 10, 11
    
       i        j               k
    1, 5, 6     2, 4, 10, 11    1
    
       i           j               k
    1, 5, 6     2, 4, 10, 11    1, 2
    
       i              j               k
    1, 5, 6     2, 4, 10, 11    1, 2, 10
    
          i        j                  k
    1, 5, 6     2, 4, 10, 11    1, 2, 5
    
             i     j                     k
    1, 5, 6     2, 4, 10, 11    1, 2, 5, 6
    
             i                j                 k
    1, 5, 6     2, 4, 10, 11    1, 2, 5, 6, 10, 11
 */
public void merge(int[] a1, int i, int iEnd, int j, int jEnd, int[] a2) {
    int k = 0;
    while (i <= iEnd && j <= jEnd) {
        if (a1[i] <= a1[j]) {
            a2[k++] = a1[i++];
        } else {
            a2[k++] = a1[j++];
        }
    }
    
    if (i > iEnd) {
        System.arraycopy(a1, j, a2, k, jEnd - j + 1);
    } else {
        System.arraycopy(a1, i, a2, k, iEnd - i + 1);
    }
}
```

# Merge Sorted Array

```java
/*
    (a1 = [1, 6 | 2, 4, 10, 11], a2 = []) {
        (a1 = [6 | 2, 4, 10, 11], a2 = [1]) {
            (a1 = [6 | 4, 10, 11], a2 = [1, 2]) {
                (a1 = [6 | 10, 11], a2 = [1, 2, 4]) {
                    (a1 = [10, 11], a2 = [1, 2, 4, 6]) {
                        (a1 = [], a2 = [1, 2, 4, 6, 10, 11]) {
                        }
                    }
                }
            }
        }
    }
 */
public void merge(int[] a1, int i, int iEnd, int j, int jEnd, int[] a2, int k) {
    if (i > iEnd) {
        System.arraycopy(a1, j, a2, k, jEnd - j + 1);
        return;
    }
    
    if (j > jEnd) {
        System.arraycopy(a1, i, a2, k, iEnd - i + 1);
        return;
    }
    
    if (a1[i] < a1[j]) {
        a2[k++] = a1[i++];
        merge(a1, i, iEnd, j, jEnd, a2, k);
    } else {
        a2[k++] = a1[j++];
        merge(a1, i, iEnd, j, jEnd, a2, k);
    }
}
```
