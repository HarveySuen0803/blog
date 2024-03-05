# Permutation

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=165)

```java
/**
 * Generates all permutations of the given array of integers.
 *
 * @param nums the array of integers to generate permutations for
 * @return a list of all permutations
 */
public static List<List<Integer>> permute(int[] nums) {
    // Result list to store all permutations
    List<List<Integer>> res = new ArrayList<>();
    
    // Call the recursive function 'dfs' with initial parameters
    dfs(nums, new boolean[nums.length], new LinkedList<>(), res);
    
    // Return the result
    return res;
}

/**
 * Recursive function to generate permutations.
 *
 * @param nums the original array of integers
 * @param visited an array to keep track of which elements have been added to the current permutation
 * @param stk a stk to hold the current permutation
 * @param res the result list to add the permutations to
 */
public static void dfs(int[] nums, boolean[] visited, LinkedList<Integer> stk, List<List<Integer>> res) {
    // Base case: if the size of the stk equals the length of nums, we have a complete permutation
    if (stk.size() == nums.length) {
        res.add(new ArrayList<>(stk));
        return;
    }

    // Iterate over all elements in nums
    for (int i = 0; i < nums.length; i++) {
        // If the current element has not been visited
        if (!visited[i]) {
            // Add the element to the current permutation
            stk.push(nums[i]);
            
            // Mark the element as visited
            visited[i] = true;
            
            // Recursively call 'dfs' to continue building the current permutation
            dfs(nums, visited, stk, res);
            
            // After returning from the recursive call, unmark the element and remove it from the current permutation
            visited[i] = false;
            stk.poll();
        }
    }
}

public static void main(String[] args) {
    System.out.println(permute(new int[]{1, 2, 3}));
}
```

# Permutation (Duplicate Value)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=166&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static List<List<Integer>> permute(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    dfs(nums, new boolean[nums.length], new LinkedList<>(), res);
    System.out.println(res);
    return res;
}
  
public static void dfs(int[] nums, boolean[] visited, LinkedList<Integer> stk, List<List<Integer>> res) {
    if (stk.size() == nums.length) {
        res.add(new ArrayList<>(stk));
        return;
    }
    
    for (int i = 0; i < nums.length; i++) {
        // Skip the current element if it is the same as the previous one and the previous one has not been visited
        if (i > 0 && nums[i] == nums[i - 1] && !visited[i - 1]) {
            continue;
        }
        
        if (!visited[i]) {
            stk.push(nums[i]);
            visited[i] = true;
            dfs(nums, visited, stk, res);
            visited[i] = false;
            stk.poll();
        }
    }
}

public static void main(String[] args) {
    System.out.println(permute(new int[]{1, 2, 3}));
}
```

# Combinations

[Problem Description](https://leetcode.cn/problems/combinations/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=168&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static List<List<Integer>> combine(int n, int len) {
    List<List<Integer>> res = new ArrayList<>();
    dfs(n, len, 0, new LinkedList<>(), new ArrayList<>());
    return res;
}

public static void dfs(int n, int len, int sta, LinkedList<Integer> stk, List<List<Integer>> res) {
    // If the current combination is of size len, add it to the result list
    if (stk.size() == len) {
        res.add(new ArrayList<>(stk));
        return;
    }
    
    for (int i = sta; i < n; i++) {
        // If the remaining numbers are not enough to complete a combination, skip the search
        if (len - stk.size() > n - i + 1) {
            continue;
        }
        
        // Add the current number to the current combination
        stk.push(i);
        
        // Continue the depth-first search with the next number
        dfs(n, len, i + 1, stk, res);
        
        // Remove the current number from the current combination
        stk.pop();
    }
}

public static void main(String[] args) {
    combine(4, 2);
}
```

# Combination Sum

[Problem Description](https://leetcode.cn/problems/combination-sum/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=170)

```java
/**
 * This method is the entry point of the algorithm. It initializes the result list and the stk,
 * and starts the depth-first search.
 *
 * @param cands The array of cand numbers.
 * @param tar The target sum.
 * @return A list of all combinations that sum up to the target.
 */
public List<List<Integer>> combinationSum(int[] cands, int tar) {
    List<List<Integer>> res = new ArrayList<>();
    dfs(0, tar, cands, new LinkedList<>(), res);
    return res;
}

/**
 * This method implements the depth-first search. It tries to extend the current combination
 * by adding a cand number. If the current sum becomes equal to the target, it adds the current combination
 * to the result list. If the current sum exceeds the target, it stops further search.
 *
 * @param srt The start index in the cand array.
 * @param tar The remaining target sum.
 * @param cands The array of cand numbers.
 * @param stk The stk that holds the current combination.
 * @param res The result list.
 */
public static void dfs(int srt, int tar, int[] cands, LinkedList<Integer> stk, List<List<Integer>> res) {
    // If the remaining target sum is zero, add the current combination to the result list.
    if (tar == 0) {
        res.add(new ArrayList<>(stk));
        return;
    }
    // Try to extend the current combination by adding a cand number.
    for (int i = srt; i < cands.length; i++) {
        int cand = cands[i];
        // If the current cand number exceeds the remaining target sum, skip it.
        if (cand > tar) {
            continue;
        }
        // Add the current cand number to the current combination.
        stk.push(cand);
        // Continue the depth-first search with the updated remaining target sum.
        dfs(i, tar - cand, cands, stk, res);
        // Backtrack by removing the current cand number from the current combination.
        stk.pop();
    }
}
```

# Combination Sum II

[Problem Description](https://leetcode.cn/problems/combination-sum-ii/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=171&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static List<List<Integer>> combinationSum2(int[] cands, int tar) {
    List<List<Integer>> res = new ArrayList<>();
    // Sort first, just to put the same elements together.
    Arrays.sort(cands);
    dfs(0, tar, cands, new boolean[cands.length], new LinkedList<>(),res);
    return res;
}

public static void dfs(int srt, int tar, int[] cands, boolean[] visited, LinkedList<Integer> stk, List<List<Integer>> res) {
    if (tar == 0) {
        res.add(new ArrayList<>(stk));
        return;
    }
    
    for (int i = srt; i < cands.length; i++) {
        int cand = cands[i];
        if (cand > tar) {
            continue;
        }

        // Determine whether the previous same element has been accessed. If it has been accessed, it can then run down
        if (i > 0 && cand == cands[i - 1] && !visited[i - 1]) {
            continue;
        }
        
        visited[i] = true;
        stk.push(cand);
        dfs(i + 1, tar - cand, cands, visited, stk, res);
        visited[i] = false;
        stk.pop();
    }
}

public static void main(String[] args) {
    int[] candidates = {10, 1, 2, 7, 6, 1, 5};
    List<List<Integer>> lists = combinationSum2(candidates, 8);
    for (List<Integer> list : lists) {
        System.out.println(list);
    }
}
```

# Combination Sum III

[Problem Description](https://leetcode.cn/problems/combination-sum-iii/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=172&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public List<List<Integer>> combinationSum3(int len, int tar) {
    List<List<Integer>> res = new ArrayList<>();
    dfs(len, tar, 1, new LinkedList<>(), res);
    return res;
}

public static void dfs(int len, int tar, int srt, LinkedList<Integer> stk, List<List<Integer>> res) {
    if (stk.size() == len && tar == 0) {
        res.add(new ArrayList<>(stk));
        return;
    }
    
    
    for (int i = srt; i <= 9; i++) {
        if (i > tar) {
            return;
        }
        if (stk.size() == len) {
            return;
        }
        stk.push(i);
        dfs(len, tar - i, i + 1, stk, res);
        stk.pop();
    }
}

public static void main(String[] args) {
    List<List<Integer>> lists = combinationSum3(3, 7);
    for (List<Integer> list : lists) {
        System.out.println(list);
    }
}
```

# NQueue

[Explain p173, p174](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=173)

```java
public static void dfs(int i, int n, char[][] tbl, boolean[] ca, boolean[] cb, boolean[] cc) {
    if (i == n) {
        for (char[] t : tbl) {
            System.out.println(new String(t));
        }
        return;
    }
    
    // Try to put a queen at (i, j) where j is 0, 1, 2, ..., n - 1.
    for (int j = 0; j < n; j++) {
        // If there is a queen at (i, j), or (i + j) or (n - 1 - (i - j))
        // then continue.
        if (ca[j] || cb[i + j] || cc[n - 1 - (i - j)])
            continue;
        
        // Put a queen at (i, j)
        tbl[i][j] = 'Q';
        
        // Mark the column, right slash, left slash.
        ca[j] = cb[i + j] = cc[n - 1 - (i - j)] = true;
        
        // Continue to put a queen at (i + 1, j) where j is 0, 1, 2, ..., n - 1.
        dfs(i + 1, n, tbl, ca, cb, cc);
        
        // Backtrack, remove the queen at (i, j).
        tbl[i][j] = ' ';
        
        // Unmark the column, right slash, left slash.
        ca[j] = cb[i + j] = cc[n - 1 - (i - j)] = false;
    }
}

public static void main(String[] args) {
    int n = 4;
    
    // Mark the column, right slash, left slash.
    boolean[] ca = new boolean[n]; // column conflict
    boolean[] cb = new boolean[2 * n - 1]; // left slash conflict
    boolean[] cc = new boolean[2 * n - 1]; // right slash conflict
    
    char[][] tbl = new char[n][n];
    for (char[] t : tbl) {
        Arrays.fill(t, ' ');
    }
    
    dfs(0, n, tbl, ca, cb, cc);
}
```

# Sudoku Solver

[Explain p175, p176](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=175&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This method is the entry point to solve the Sudoku puzzle.
 *
 * @param tbl The Sudoku tbl to be solved.
 */
public static void solveSudoku(char[][] tbl) {
    // Initialize the boolean arrays to keep track of the numbers used in each row, column and box
    boolean[][] ca = new boolean[9][9]; // row conflict
    boolean[][] cb = new boolean[9][9]; // column conflict
    boolean[][] cc = new boolean[9][9]; // box conflict

    // Iterate through the tbl and update the boolean arrays for the numbers already placed on the tbl
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            char ch = tbl[i][j];
            if (ch == '.') {
                continue;
            }
            ca[i][ch - '1'] = true;
            cb[j][ch - '1'] = true;
            cc[i / 3 * 3 + j / 3][ch - '1'] = true;
        }
    }

    // Start the depth-first search to solve the Sudoku puzzle
    dfs(0, 0, tbl, ca, cb, cc);

    // Print the solved Sudoku tbl
    print(tbl);
}

/**
 * This method performs a depth-first search to solve the Sudoku puzzle.
 *
 * @param i The row index.
 * @param j The column index.
 * @param tbl The Sudoku tbl to be solved.
 * @param ca The boolean array for the numbers used in each row.
 * @param cb The boolean array for the numbers used in each column.
 * @param cc The boolean array for the numbers used in each box.
 * @return A boolean indicating whether the Sudoku puzzle has been solved.
 */
private static boolean dfs(int i, int j, char[][] tbl, boolean[][] ca, boolean[][] cb, boolean[][] cc) {
    // Find the next empty cell
    while (tbl[i][j] != '.') {
        if (++j >= 9) {
            j = 0;
            if (++i >= 9) {
                return true;
            }
        }
    }

    // Try out all possible numbers for the current cell
    for (int x = 1; x <= 9; x++) {
        // If the number is already used in the current row, column or box, skip it
        if (ca[i][x - 1] || cb[j][x - 1] || cc[i / 3 * 3 + j / 3][x - 1])
            continue;

        // Place the number on the tbl and update the boolean arrays
        tbl[i][j] = (char) (x + '0');
        ca[i][x - 1] = cb[j][x - 1] = cc[i / 3 * 3 + j / 3][x - 1] = true;

        // Continue the depth-first search with the next cell
        if (dfs(i, j, tbl, ca, cb, cc))
            return true;

        // If the depth-first search did not lead to a solution, remove the number from the tbl and backtrack
        tbl[i][j] = '.';
        ca[i][x - 1] = cb[j][x - 1] = cc[i / 3 * 3 + j / 3][x - 1] = false;
    }

    // If no number can be placed in the current cell, return false
    return false;
}

public static void main(String[] args) {
    char[][] tbl = {
        {'5', '3', ' ', ' ', '7', ' ', ' ', ' ', ' '},
        {'6', ' ', ' ', '1', '9', '5', ' ', ' ', ' '},
        {' ', '9', '8', ' ', ' ', ' ', ' ', '6', ' '},
        {'8', ' ', ' ', ' ', '6', ' ', ' ', ' ', '3'},
        {'4', ' ', ' ', '8', ' ', '3', ' ', ' ', '1'},
        {'7', ' ', ' ', ' ', '2', ' ', ' ', ' ', '6'},
        {' ', '6', ' ', ' ', ' ', ' ', '2', '8', ' '},
        {' ', ' ', ' ', '4', '1', '9', ' ', ' ', '5'},
        {' ', ' ', ' ', ' ', '8', ' ', ' ', '7', '9'}
    };
    solveSudoku(tbl);
}
```

# Two Sum II

[Problem Description](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=177)

```java
public int[] twoSum(int[] nums, int tar) {
    int l = 0;
    int r = nums.length - 1;
    while (l < r) {
        int sum = nums[l] + nums[r];
        if (sum < tar) {
            l++;
        } else if (sum > tar) {
            r--;
        } else {
            return new int[]{l, r};
        } 
    }
    return new int[]{-1, -1};
}
```

# Three Sum

[Problem Description](https://leetcode.cn/problems/3sum/description/?envType=study-plan-v2&envId=top-100-liked)

```java
public static List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    LinkedList<Integer> stk = new LinkedList<>();
    List<List<Integer>> res = new ArrayList<>();
    for (int i = 0; i < nums.length - 1; i++) {
        if (i > 0 && nums[i - 1] == nums[i]) {
            continue;
        }
        stk.push(nums[i]);
        twoSum(nums, -nums[i], i + 1, nums.length - 1, stk, res);
        stk.pop();
    }
    return res;
}

public static void twoSum(int[] nums, int tar, int l, int r, LinkedList<Integer> stk, List<List<Integer>> res) {
    while (l < r) {
        if (nums[l] + nums[r] < tar) {
            l++;
        } else if (nums[l] + nums[r] > tar) {
            r--;
        } else {
            stk.push(nums[l]);
            stk.push(nums[r]);
            res.add(new ArrayList<>(stk));
            stk.pop();
            stk.pop();
            while (++l < r && nums[l - 1] == nums[l]);
            while (l < --r && nums[r] == nums[r + 1]);
        }
    }
}
```

# N Sum

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=178&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static List<List<Integer>> nSum(int[] nums, int tar, int n) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    dfs(nums, tar, n, 0, nums.length - 1, new LinkedList<>(), res);
    return res;
}

public static void dfs(int[] nums, int tar, int n, int l, int r, LinkedList<Integer> stk, List<List<Integer>> res) {
    if (n == 2) {
        twoSum(nums, tar, l, r, stk, res);
        return;
    }
    
    for (int i = l; i < r - (n - 2); i++) {
        if (i > l && nums[i] == nums[i - 1]) {
            continue;
        }
        
        stk.push(nums[i]);
        dfs(nums, tar - nums[i], n - 1, i + 1, r, stk, res);
        stk.pop();
    }
}

public static void twoSum(int[] nums, int tar, int l, int r, LinkedList<Integer> stk, List<List<Integer>> res) {
    while (l < r) {
        int sum = nums[l] + nums[r];
        if (sum < tar) {
            l++;
        } else if (sum > tar) {
            r--;
        } else {
            stk.add(nums[l]);
            stk.add(nums[r]);
            res.add(new ArrayList<>(stk));
            while (++l < r && nums[l - 1] == nums[l]);
            while (l < --r && nums[r] == nums[r + 1]);
            stk.removeLast();
            stk.removeLast();
        }
    }
}

public static void main(String[] args) {
    List<List<Integer>> res = nSum(new int[]{1, 0, -1, 0, -2, 2}, 0, 4); // [[-1, -2, 1, 2], [0, -2, 0, 2], [0, -1, 0, 1]]
}
```