# Fibonacci (1D Array)

```java
public static int fib(int n) {
    if (n == 0) {
        return 0;
    }
    
    if (n == 1) {
        return 1;
    }

    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i < n + 1; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}
```

# Fibonacci (Variable)

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

# BellmanFord

[Explain p118, p119, p120](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=118)

```java
/**
 * The Bellman Ford algorithm. It finds the shortest path from the source to all other vertices.
 *
 * @param edges the list of edges in the graph
 * @param size the number of vertices in the graph
 */
public static void bellmanFord(List<Edge> edges, int size) {
    // Initialize the dp array
    int[] dp = new int[size + 1];
    dp[1] = 0; // The distance from the source to itself is 0
    // Initialize the rest of the array to infinity
    for (int i = 2; i < dp.length; i++) {
        dp[i] = Integer.MAX_VALUE;
    }

    // Relax the edges size - 1 times
    for (int i = 0; i < size - 1; i++) {
        // For each edge
        for (Edge e : edges) {
            // If the starting vertex of the edge has not been visited, skip it
            if (dp[e.from] == Integer.MAX_VALUE) {
                continue;
            }
            // Relax the edge
            dp[e.to] = Math.min(dp[e.from] + e.wt, dp[e.to]);
        }
    }

    // Print the shortest path array
    print(dp);
}

public static class Edge {
    int from;
    int to;
    int wt;

    /**
     * Constructs an Edge with the given parameters.
     *
     * @param from the starting vertex of the edge
     * @param to the ending vertex of the edge
     * @param wt the weight of the edge
     */
    public Edge(int from, int to, int wt) {
        this.from = from;
        this.to = to;
        this.wt = wt;
    }
}

public static void print(int[] dp) {
    System.out.println(Arrays.stream(dp)
                             .mapToObj(i -> i == Integer.MAX_VALUE ? "∞" : String.valueOf(i))
                             .collect(Collectors.joining(",", "[", "]")));
}

public static void main(String[] args) {
    List<Edge> edges = List.of(
        new Edge(6, 5, 9),
        new Edge(4, 5, 6),
        new Edge(1, 6, 14),
        new Edge(3, 6, 2),
        new Edge(3, 4, 11),
        new Edge(2, 4, 15),
        new Edge(1, 3, 9),
        new Edge(1, 2, 7)
    );

    bellmanFord(edges, 6);
}
```

# Unique Paths (2D Array)

[Problem Description](https://leetcode.cn/problems/unique-paths/description/)

[Explain p121, p122](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=121)

```java
/**
 * This method calculates the number of unique paths from the top-left corner to the bottom-right corner of a m x n grid.
 * The robot can only move either down or right at any point in time.
 *
 * @param m The number of rows in the grid.
 * @param n The number of columns in the grid.
 * @return The total number of unique paths.
 *
 * The core idea of this algorithm is dynamic programming. We initialize a 2D array dp where dp[i][j] represents the number of unique paths to reach cell (i, j).
 * The robot starts at cell (0, 0) and can either move right or down. Therefore, for the first row (i=0) and the first column (j=0), there is only one unique path to reach each cell.
 * For the rest of the grid, the number of ways to reach cell (i, j) is the sum of ways to reach cell (i-1, j) and cell (i, j-1).
 */
public int uniquePaths(int m, int n) {
    // Initialize the 2D dp array
    int[][] dp = new int[m][n];

    // There is only one way to reach each cell in the first column, by moving down
    for (int i = 0; i < m; i++) {
        dp[i][0] = 1;
    }

    // There is only one way to reach each cell in the first row, by moving right
    for (int j = 0; j < n; j++) {
        dp[0][j] = 1;
    }

    // For each cell (i, j), calculate the number of unique paths to reach it
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            // The number of unique paths to reach cell (i, j) is the sum of paths to reach cell (i-1, j) and cell (i, j-1)
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    // Return the number of unique paths to reach the bottom-right corner of the grid
    return dp[m - 1][n - 1];
}
```

# Unique Paths (1D Array)

[Problem Description](https://leetcode.cn/problems/unique-paths/description/)

[Explain p122 (04:40)](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=121)

```java
public int uniquePaths(int m, int n) {
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[j] = dp[j - 1] + dp[j];
        }
    }
    
    return dp[n - 1];
}
```

# Knapsack 0-1 (2D Array)

[Explain p123, p124, p125](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=123&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This method implements the 0-1 Knapsack problem using Dynamic Programming (DP).
 * The 0-1 Knapsack problem is a classic optimization problem where we aim to maximize the total value
 * of items picked without exceeding the capacity of the knapsack.
 *
 * @param items An array of Item objects where each item has a weight and a value.
 * @param cap The total capacity of the knapsack.
 * @return The maximum value that can be achieved with the given items and capacity.
 */
public static int select(Item[] items, int cap) {
    // Initialize the DP table. The row represents the items, and the column represents the capacity.
    int[][] dp = new int[items.length][cap + 1];
    
    // Populate the first row of the DP table considering only the first item.
    for (int j = 0; j < cap + 1; j++) {
        if (j >= items[0].wt) {
            // If the item's weight is less than or equal to the current capacity, we can pick this item.
            dp[0][j] = items[0].val;
        } else {
            // If the item's weight is more than the current capacity, we can't pick this item.
            dp[0][j] = 0;
        }
    }
    
    // Iterate over the rest of the items.
    for (int i = 1; i < items.length; i++) {
        Item item = items[i];
        // For each item, iterate over all possible capacities.
        for (int j = 0; j < cap + 1; j++) {
            if (j >= item.wt) {
                // If the item's weight is less than or equal to the current capacity, we have two options:
                // 1. Don't pick this item: In this case, the maximum value is the same as the maximum value achieved from the previous item at this capacity.
                // 2. Pick this item: In this case, the maximum value is the value of this item plus the maximum value achieved from the previous item at the remaining capacity.
                // We take the maximum of these two options.
                dp[i][j] = Math.max(dp[i - 1][j], item.val + dp[i - 1][j - item.wt]);
            } else {
                // If the item's weight is more than the current capacity, we can't pick this item.
                // So, we carry forward the maximum value achieved from the previous item at this capacity.
                dp[i][j] = dp[i - 1][j];
            }
        }
        // Print the DP table after considering each item.
        print(dp);
    }
    
    // The maximum value that can be achieved with the given items and capacity is the last cell in the DP table.
    return dp[items.length - 1][cap];
}

public static class Item {
    int idx;  // Index of the item
    int val;  // Value of the item
    int wt;   // Weight of the item
    
    public Item(int idx, int wt, int val) {
        this.idx = idx;
        this.wt = wt;
        this.val = val;
    }
    
    @Override
    public String toString() {
        return "Item(" + idx + ")";
    }
}

public static void print(int[][] dp) {
    System.out.println("   " + "-".repeat(63));
    Object[] array = IntStream.range(0, dp[0].length + 1).boxed().toArray();
    System.out.printf(("%5d ".repeat(dp[0].length)) + "%n", array);
    for (int[] d : dp) {
        array = Arrays.stream(d).boxed().toArray();
        System.out.printf(("%5d ".repeat(d.length)) + "%n", array);
    }
}

public static void main(String[] args) {
    Item[] items = new Item[]{
        new Item(1, 4, 1600),
        new Item(2, 8, 2400),
        new Item(3, 5, 30),
        new Item(4, 1, 10_000),
    };
    
    select(items, 10);
}
```

# Knapsack 0-1 (1D Array)

[Explain p126](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=126)

```java
public static int select(Item[] items, int cap) {
    // Initialize the dynamic programming table with size cap + 1.
    int[] dp = new int[cap + 1];
    
    // Initialize the first item's value in the DP table.
    Item item = items[0];
    for (int j = 1; j < cap + 1; j++) {
        if (j >= item.wt) {
            dp[j] = item.val;
        } else {
            dp[j] = 0;
        }
    }
    
    // Iterate over the remaining items.
    for (int i = 1; i < items.length; i++) {
        item = items[i];
        // For each item, iterate over all capacities from cap to 0.
        for (int j = cap; j >= 0; j--) {
            // If the item's weight is less than or equal to the current capacity,
            // update the DP table by comparing the current value and the value obtained by including this item.
            if (j >= item.wt) {
                dp[j] = Math.max(dp[j], item.val + dp[j - item.wt]);
            }
        }
    }
    
    // Return the maximum value that can be obtained with the given knapsack capacity.
    return dp[cap];
}
```

# Knapsack Complete (2D Array)

[Explain p127, p128](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=127&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int select(Item[] items, int cap) {
    // Initialize the DP table. The row represents the items, and the column represents the capacity.
    int[][] dp = new int[items.length][cap + 1];

    // Process the first item separately as a base case.
    Item item = items[0];
    for (int j = 1; j < cap + 1; j++) {
        // If the current capacity is greater than or equal to the weight of the item,
        // update the DP table by adding the value of the item.
        if (j >= item.wt) {
            dp[0][j] = item.val + dp[0][j - item.wt];
        }
    }

    // Iterate over the remaining items.
    for (int i = 1; i < items.length; i++) {
        item = items[i];
        for (int j = 0; j < cap + 1; j++) {
            // If the current capacity is greater than or equal to the weight of the item,
            // choose the maximum value between the current item plus the maximum value of the remaining capacity,
            // and the maximum value without including the current item.
            if (j >= item.wt) {
                dp[i][j] = Math.max(dp[i - 1][j], item.val + dp[i][j - item.wt]);
            }
            // If the current capacity is less than the weight of the item,
            // the item cannot be included, so we take the maximum value without including the item.
            else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[items.length - 1][cap];
}
```

# Knapsack Complete (1D Array)

[Explain p128 (12:35)](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=128&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int select(Item[] items, int cap) {
    int[] dp = new int[cap + 1];
    
    Item item = items[0];
    for (int j = 1; j < cap + 1; j++) {
        if (j >= item.wt) {
            dp[j] = item.val + dp[j - item.wt];
        }
    }
    
    for (int i = 1; i < items.length; i++) {
        item = items[i];
        for (int j = 1; j < cap + 1; j++) {
            if (j >= item.wt) {
                dp[j] = Math.max(dp[j], item.val + dp[j - item.wt]);
            }
        }
    }
    
    return dp[cap];
}
```

# Coin Change

[Problem Description](https://leetcode.cn/problems/coin-change/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=129&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int coinChange(int[] coins, int amount) {
    int[][] dp = new int[coins.length][amount + 1];
    
    for (int j = 1; j < amount + 1; j++) {
        if (j % coins[0] == 0) {
            dp[0][j] = j / coins[0];
        } else {
            dp[0][j] = -1;
        }
    }
    
    for (int i = 1; i < coins.length; i++) {
        for (int j = 1; j < amount + 1; j++) {
            if (j >= coins[i]) {
                int min = Integer.MAX_VALUE;
                for (int k = 0; k <= j / coins[i]; k++) {
                    int t = dp[i - 1][j - k * coins[i]];
                    if (t != -1) {
                        min = Math.min(min, t + k);
                    }
                }
                dp[i][j] = min == Integer.MAX_VALUE ? -1 : min;
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    
    return dp[coins.length - 1][amount];
}
```

# Coin Change

[Problem Description](https://leetcode.cn/problems/coin-change/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=131&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int coinChange2(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    
    for (int j = 1; j < amount + 1; j++) {
        if (j % coins[0] == 0) {
            dp[j] = j / coins[0];
        } else {
            dp[j] = -1;
        }
    }
    
    for (int i = 1; i < coins.length; i++) {
        for (int j = 1; j < amount + 1; j++) {
            if (j >= coins[i]) {
                int min = Integer.MAX_VALUE;
                for (int k = 0; k <= j / coins[i]; k++) {
                    int t = dp[j - k * coins[i]];
                    if (t != -1) {
                        min = Math.min(min, t + k);
                    }
                }
                dp[j] = min == Integer.MAX_VALUE ? -1 : min;
            }
        }
    }
    
    return dp[amount];
}
```

# Coin Change II

[Problem Description](https://leetcode.cn/problems/coin-change-ii/description/)

```java
public int change(int amount, int[] coins) {
    // Initialize a 2D array to store the number of combinations for each amount
    int[][] dp = new int[coins.length][amount + 1];

    // For each coin, there is one way to make up an amount of 0 (by not using any coins)
    for (int i = 0; i < coins.length; i++) {
        dp[i][0] = 1;
    }

    // For the first type of coin, calculate the number of combinations for each amount
    for (int j = 1; j < amount + 1; j++) {
        // If the current amount is greater than or equal to the coin value
        if (j >= coins[0]) {
            // The number of combinations is the number of combinations without the coin
            // plus the number of combinations with the coin
            dp[0][j] = dp[0][j - coins[0]];
        }
    }

    // For the remaining types of coins
    for (int i = 1; i < coins.length; i++) {
        // Calculate the number of combinations for each amount
        for (int j = 1; j < amount + 1; j++) {
            // If the current amount is greater than or equal to the coin value
            if (j >= coins[i]) {
                // The number of combinations is the number of combinations without the coin
                // plus the number of combinations with the coin
                dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i]];
            } else {
                // If the current amount is less than the coin value
                // The number of combinations is the number of combinations without the coin
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    // Return the total number of combinations for the amount using all types of coins
    return dp[coins.length - 1][amount];
}
```

# Cut Rod

[Explain p134, p135](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=134)

```java
public static int cut(int[] vals, int len) {
    int[][] dp = new int[vals.length][len + 1];
    
    for (int i = 1; i < vals.length; i++) {
        for (int j = 1; j < len + 1; j++) {
            if (j >= i) {
                dp[i][j] = Math.max(dp[i - 1][j], vals[i] + dp[i][j - 1]);
            } else {
                dp[i][j] = dp[i - 1][j];
            } 
        }
    }
    
    return dp[vals.length - 1][len];
}
```

# Longest Common Substring

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=136&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int lcs(String a, String b) {
    int[][] dp = new int[a.length()][b.length()];
    int maxLen = 0;

    for (int i = 0; i < a.length(); i++) {
        dp[i][0] = 1;
    }

    for (int j = 0; j < b.length(); j++) {
        dp[0][j] = 1;
    }

    for (int i = 1; i < a.length(); i++) {
        for (int j = 1; j < b.length(); j++) {
            if (a.charAt(i) == b.charAt(j)) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = 0;
            }
            maxLen = Math.max(maxLen, dp[i][j]);
        }
    }

    return maxLen;
}

public static void main(String[] args) {
    System.out.println(lcs("harvey", "eyharv"));
}
```

# Longest Common Subsequence

[Problem Description](https://leetcode.cn/problems/longest-common-subsequence/description/)

[Explain p137, p138](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=137&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public int longestCommonSubsequence(String text1, String text2) {
    // Get the length of the two strings
    int m = text1.length();
    int n = text2.length();

    // Initialize a 2D array to store the length of LCS for each pair of prefixes of text1 and text2
    int[][] dp = new int[m + 1][n + 1];

    // Iterate over the strings in reverse so that we are always comparing one character with all characters with greater index
    for (int i = 1; i < m + 1; i++) {
        for (int j = 1; j < n + 1; j++) {
            // If the current characters of both strings are equal
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                // The length of LCS would be one plus the length of LCS till the previous index
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // If not equal, the length of LCS would be the maximum length of two possibilities:
                // 1. Removing the current character of text1
                // 2. Removing the current character of text2
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Print the dp array
    print(dp, text2, text1);

    // The bottom-right cell of dp array contains the length of LCS of both strings
    return dp[m][n];
}
```

# Delete Operation for Two Strings

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=139)

```java
public int minDistance(String word1, String word2) {
    char[] chs1 = word1.toCharArray();
    int l1 = chs1.length;
    char[] chs2 = word2.toCharArray();
    int l2 = chs2.length;
    int[][] dp = new int[l1 + 1][l2 + 1];
    
    for (int i = 1; i < l1 + 1; i++) {
        char c1 = chs1[i - 1];
        for (int j = 1; j < l2 + 1; j++) {
            char c2 = chs2[j - 1];
            if (c1 == c2) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return l1 + l2 - dp[l1][l2] * 2;
}
```

# Longest Increasing Subsequence

[Problem Description](https://leetcode.cn/problems/longest-increasing-subsequence/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=140&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public int lengthOfLIS(int[] nums) {
    int[] dp = new int[nums.length];
    Arrays.fill(dp, 1);
    for (int i = 1; i < nums.length; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    return Arrays.stream(dp).max().getAsInt();
}
```

# Catalan

[Explain p142, p143](https://www.bilibili.com/video/BV1rv4y1H7o6?p=142)

```java
public int catalan(int n) {
    int[] dp = new int[n + 1];
    dp[0] = 1;
    dp[1] = 1;
    for (int j = 2; j < n + 1; j++) {
        for (int i = 0; i < j; i++) {
            dp[j] += dp[i] * dp[j - i - 1];
        }
    }
    return dp[n];
}
```

# Generate Parentheses

[Problem Description](https://leetcode.cn/problems/generate-parentheses/description/)

[Explain p145, p146](https://www.bilibili.com/video/BV1rv4y1H7o6?p=145&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * Generates all combinations of well-formed parentheses for a given number.
 *
 * This method uses dynamic programming to build up a solution. The core idea is that a set of parentheses is a combination of smaller sets.
 * We start with the base cases: an empty set and a set with one pair of parentheses. Then, for larger sets, we iterate over smaller sets,
 * combining them in different ways to form larger sets.
 *
 * @param n the number of pairs of parentheses
 * @return a list of strings, where each string represents a valid combination of parentheses
 */
public List<String> generateParenthesis(int n) {
    // dp[i] will hold a list of all combinations of i pairs of parentheses
    ArrayList<String>[] dp = new ArrayList[n + 1];

    // Base cases
    dp[0] = new ArrayList(List.of("")); // An empty set
    dp[1] = new ArrayList(List.of("()")); // A set with one pair of parentheses

    // Build up the solution for larger sets
    for (int j = 2; j < n + 1; j++) {
        dp[j] = new ArrayList();
        for (int i = 0; i < j; i++) {
            // Iterate over smaller sets and combine them in different ways
            for (String k1 : dp[i]) {
                for (String k2 : dp[j - i - 1]) {
                    // Add a new combination to the list for the current set
                    dp[j].add("(" + k1 + ")" + k2);
                }
            }
        }
    }

    // Return all combinations for the given number of pairs of parentheses
    return dp[n];
}
```

# House Robber

[Problem Description](https://leetcode.cn/problems/house-robber/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=147&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * The algorithm uses a dynamic programming (DP) approach where dp[i] represents 
 * the maximum amount that can be robbed up to house i. The transition function is 
 * dp[i] = max(dp[i - 2] + nums[i], dp[i - 1]), which means for each house, the robber 
 * can choose either to rob it (adding its value to the total of dp[i - 2]) or not rob it 
 * (inheriting the total from dp[i - 1]).
 *
 * @param nums an array of integers where each integer represents the amount of money 
 *             available in each house.
 * @return the maximum amount of money the robber can rob.
 */
public int rob(int[] nums) {
    // Initialize the DP array
    int[] dp = new int[nums.length];

    // If there's only one house, return its value
    if (nums.length == 1) {
        return nums[0];
    }

    // Initialize the first two values in the DP array
    dp[0] = nums[0]; // The robber robs the first house
    dp[1] = Math.max(nums[0], nums[1]); // The robber chooses the house with more money between the first two

    // Iterate over the rest of the houses
    for (int i = 2; i < nums.length; i++) {
        // For each house, calculate the maximum amount that can be robbed
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }

    // Return the maximum amount that can be robbed from all houses
    return dp[nums.length - 1];
}
```

# Travelling Salesman

[Explain p148, p149, 150, p151, p152](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=148&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This method solves the TSP using DP.
 * 
 * @param g The adjacency matrix representation of the graph.
 * @return The minimum cost to visit all cities and return to the origin.
 */
public int tsp(int[][] g) {
    // Number of cities
    int m = g.length;
    // Total number of states in DP
    int n = 1 << (g.length - 1);
    // DP array
    int[][] dp = new int[m][n];

    // Initialize the DP array
    for (int i = 0; i < m; i++) {
        dp[i][0] = g[i][0];
    }

    // Iterate over all states
    for (int j = 1; j < n; j++) {
        // For each city
        for (int i = 0; i < m; i++) {
            dp[i][j] = Integer.MAX_VALUE >>> 1;
            // If the city is in the current state, skip
            if (contains(j, i)) continue;
            // For each city in the current state
            for (int k = 0; k < m; k++) {
                if (!contains(j, k)) continue;
                // Update the DP value
                dp[i][j] = Math.min(dp[i][j], g[i][k] + dp[k][exclude(j, k)]);
            }
        }
    }

    // Return the minimum cost to visit all cities and return to the origin
    return dp[0][n - 1];
}

/**
 * This method checks if a city is in the current set of cities.
 * 
 * @param set The set of cities.
 * @param city The city to check.
 * @return True if the city is in the set, false otherwise.
 */
public boolean contains(int set, int city) {
    return (set >> (city - 1) & 1) == 1;
}

/**
 * This method removes a city from the current set of cities.
 * 
 * @param set The set of cities.
 * @param city The city to remove.
 * @return The new set of cities after removal.
 */
public int exclude(int set, int city) {
    return set ^ (1 << (city - 1));
}

public static void main(String[] args) {
    int[][] graph = {
        {0, 1, 2, 3},
        {1, 0, 6, 4},
        {2, 6, 0, 5},
        {3, 4, 5, 0}
    };
    System.out.println(new Main().tsp(graph));
}
```