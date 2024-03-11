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

# Remove Duplicates from Sorted Array

```java
public static int[] removeDuplicates(int[] nums) {
    int i1 = 0;
    int i2 = 1;
    while (i2 < nums.length) {
        if (nums[i1] != nums[i2]) {
            i1++;
            nums[i1] = nums[i2];
        }
        i2++;
    }
    return Arrays.copyOfRange(nums, 0, i1 + 1);
}
```

# Find Pivot Index

[Problem Description](https://leetcode.cn/problems/find-pivot-index/description/)

```java
public static int pivotIndex(int[] nums) {
    int sum = Arrays.stream(nums).sum();
    int sumLeft = 0;
    for (int i = 0; i < nums.length; i++) {
        if (sumLeft * 2 + nums[i] == sum) {
            return i;
        }
        sumLeft += nums[i];
    }
    return -1;
}
```

# Find Pivot Index

[Explain](https://www.bilibili.com/video/BV1eg411w7gn?p=73&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int pivotIndex(int[] nums) {
    int sumR = Arrays.stream(nums).sum();
    int sumL = 0;
    for (int i = 0; i < nums.length; i++) {
        sumR -= nums[i];
        if (sumL == sumR) {
            return i;
        }
        sumL += nums[i];
    }
    return -1;
}
```

# Maximum Subarray

[Problem Description](https://leetcode.cn/problems/maximum-subarray/description/?envType=study-plan-v2&envId=top-100-liked)

```java
public static int maxSubArray(int[] nums) {
    int maxSum = Integer.MIN_VALUE;
    for (int i = 0; i < nums.length; i++) {
        int curSum = 0;
        for (int j = i; j < nums.length; j++) {
            curSum += nums[j];
            maxSum = Math.max(maxSum, curSum);
        }
    }
    return maxSum;
}
```

# Merge Intervals

[Problem Description](https://leetcode.cn/problems/merge-intervals/description/?envType=study-plan-v2&envId=top-100-liked)

```java
public int[][] merge(int[][] intervals) {
    if (intervals.length == 0) {
        return new int[0][2];
    }
    Arrays.sort(intervals, Comparator.comparingInt((int[] i) -> i[0]));
    List<int[]> res = new ArrayList<>();
    res.add(new int[]{intervals[0][0], intervals[0][1]});
    for (int i = 1; i < intervals.length; i++) {
        int lVal = intervals[i][0];
        int rVal = intervals[i][1];
        if (lVal > res.get(res.size() - 1)[1]) {
            res.add(new int[]{lVal, rVal});
        } else {
            res.get(res.size() - 1)[1] = Math.max(res.get(res.size() - 1)[1], rVal);
        }
    }
    return res.toArray(new int[res.size()][]);
}
```

# Merge Intervals

```java
public int[][] merge(int[][] intervals) {
    if (intervals.length == 0) {
        return new int[0][2];
    }
    Arrays.sort(intervals, Comparator.comparingInt(v -> v[0]));
    int[][] res = new int[intervals.length][2];
    res[0] = new int[]{intervals[0][0], intervals[0][1]};
    int idx = 0;
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] > res[idx][1]) {
            res[++idx] = intervals[i];
        } else {
            res[idx][1] = Math.max(res[idx][1], intervals[i][1]);
        }
    }
    return Arrays.copyOf(res, idx + 1);
}
```

# Rotate Array

[Problem Description](https://leetcode.cn/problems/rotate-array/?envType=study-plan-v2&envId=top-100-liked)

```java
public static void rotate(int[] nums, int k) {
    LinkedList<Integer> que = new LinkedList<>();
    for (int num : nums) {
        que.offerLast(num);
    }
    for (int i = 0; i < k; i++) {
        que.offerFirst(que.pollLast());
    }
    for (int i = 0; i < nums.length; i++) {
        nums[i] = que.pollFirst();
    }
}
```

# Rotate Array

```java
public static void rotate(int[] nums1, int k) {
    int[] nums2 = new int[nums1.length];
    for (int i = 0; i < nums1.length; i++) {
        nums2[(i + k) % nums2.length] = nums1[i];
    }
    System.arraycopy(nums2, 0, nums1, 0, nums2.length);
}
```

# Product of Array Except Self

[Problem Description](https://leetcode.cn/problems/product-of-array-except-self/?envType=study-plan-v2&envId=top-100-liked)

```java
public static int[] productExceptSelf(int[] nums) {
    int[] lCount = new int[nums.length];
    int[] rCount = new int[nums.length];
    lCount[0] = 1;
    for (int i = 1; i < nums.length; i++) {
        lCount[i] = lCount[i - 1] * nums[i - 1];
    }
    rCount[nums.length - 1] = 1;
    for (int i = nums.length - 2; i >= 0; i--) {
        rCount[i] = rCount[i + 1] * nums[i + 1];
    }
    for (int i = 0; i < nums.length; i++) {
        nums[i] = lCount[i] * rCount[i];
    }
    return nums;
}
```

# Product of Array Except Self

[Explain](https://leetcode.cn/problems/product-of-array-except-self/submissions/509942756/?envType=study-plan-v2&envId=top-100-liked)

```java
public static int[] productExceptSelf(int[] nums) {
    if (nums.length == 0) {
        return new int[0];
    }
    int[] ans = new int[nums.length];
    ans[0] = 1;
    for (int i = 1; i < nums.length; i++) {
        ans[i] = ans[i - 1] * nums[i - 1];
    }
    int tmp = 1;
    for (int i = nums.length - 2; i >= 0; i--) {
        tmp *= nums[i + 1];
        ans[i] *= tmp;
    }
    return ans;
}
```

# Set Matrix Zeroes

[Problem Description](https://leetcode.cn/problems/set-matrix-zeroes/description/?envType=study-plan-v2&envId=top-100-liked)

```java
public void setZeroes(int[][] matrix) {
    boolean[] ca = new boolean[matrix.length];
    boolean[] cb = new boolean[matrix[0].length];
    for (int i = 0; i < matrix.length; i++) {
        for (int j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 0) {
                ca[i] = true;
                cb[j] = true;
            }
        }
    }
    for (int i = 0; i < ca.length; i++) {
        if (ca[i]) {
            for (int k = 0; k < matrix[0].length; k++) {
                matrix[i][k] = 0;
            }
        }
    }
    for (int j = 0; j < cb.length; j++) {
        if (cb[j]) {
            for (int k = 0; k < matrix.length; k++) {
                matrix[k][j] = 0;
            }
        }
    }
}
```