# Permutation

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=165)

```java
/**
 * Generates all permutations of the given array of integers.
 *
 * @param nums the array of integers to generate permutations for
 * @return a list of all permutations
 */
public static List<List<Integer>> permutation(int[] nums) {
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
 * @param stack a stack to hold the current permutation
 * @param res the result list to add the permutations to
 */
public static void dfs(int[] nums, boolean[] visited, LinkedList<Integer> stack, List<List<Integer>> res) {
    // Base case: if the size of the stack equals the length of nums, we have a complete permutation
    if (stack.size() == nums.length) {
        res.add(new ArrayList<>(stack));
        return;
    }

    // Iterate over all elements in nums
    for (int i = 0; i < nums.length; i++) {
        // If the current element has not been visited
        if (!visited[i]) {
            // Add the element to the current permutation
            stack.push(nums[i]);
            
            // Mark the element as visited
            visited[i] = true;
            
            // Recursively call 'dfs' to continue building the current permutation
            dfs(nums, visited, stack, res);
            
            // After returning from the recursive call, unmark the element and remove it from the current permutation
            visited[i] = false;
            stack.poll();
        }
    }
}

public static void main(String[] args) {
    List<List<Integer>> permutation = permutation(new int[]{1, 2, 3});
}
```

# Permutation (Duplicate Value)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=166&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static List<List<Integer>> permutation(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    dfs(nums, new boolean[nums.length], new LinkedList<>(), res);
    System.out.println(res);
    return res;
}

public static void dfs(int[] nums, boolean[] visited, LinkedList<Integer> stack, List<List<Integer>> res) {
    if (stack.size() == nums.length) {
        res.add(new ArrayList<>(stack));
        return;
    }
    
    for (int i = 0; i < nums.length; i++) {
        // Skip the current element if it is the same as the previous one and the previous one has not been visited
        if (i > 0 && nums[i] == nums[i - 1] && !visited[i - 1]) {
            continue;
        }
        
        if (!visited[i]) {
            stack.push(nums[i]);
            visited[i] = true;
            dfs(nums, visited, stack, res);
            visited[i] = false;
            stack.poll();
        }
    }
}

public static void main(String[] args) {
    List<List<Integer>> permutation = permutation(new int[]{1, 1, 3});
}
```

# Combinations

[Problem Description](https://leetcode.cn/problems/combinations/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=168&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This method generates all possible combinations of k numbers out of 1...n.
 *
 * @param n The upper limit of the range of numbers.
 * @param k The number of elements in each combination.
 * @return A list of all possible combinations.
 */
public static List<List<Integer>> combine(int n, int k) {
    // Initialize the result list
    List<List<Integer>> res = new ArrayList<>();
    
    // Start the depth-first search from number 1
    dfs(n, k, 1, new LinkedList<>(), res);
    
    // Return the result list
    return res;
}

/**
 * This method performs a depth-first search to find all combinations.
 *
 * @param n     The upper limit of the range of numbers.
 * @param k     The number of elements in each combination.
 * @param start The number to start the search from.
 * @param stack A stack to hold the current combination.
 * @param res   A list to hold all combinations.
 */
public static void dfs(int n, int k, int start, LinkedList<Integer> stack, List<List<Integer>> res) {
    // If the current combination is of size k, add it to the result list
    if (stack.size() == k) {
        res.add(new ArrayList<>(stack));
        return;
    }
    
    // Iterate over the range of numbers
    for (int i = start; i <= n; i++) {
        // If the remaining numbers are not enough to complete a combination, skip the search
        if (k - stack.size() > n - i + 1) {
            continue;
        }
        
        // Add the current number to the current combination
        stack.push(i);
        
        // Continue the depth-first search with the next number
        dfs(n, k, i + 1, stack, res);
        
        // Remove the current number from the current combination
        stack.pop();
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
 * This method is the entry point of the algorithm. It initializes the result list and the stack,
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
 * @param stack The stack that holds the current combination.
 * @param res The result list.
 */
public static void dfs(int srt, int tar, int[] cands, LinkedList<Integer> stack, List<List<Integer>> res) {
    // If the remaining target sum is zero, add the current combination to the result list.
    if (tar == 0) {
        res.add(new ArrayList<>(stack));
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
        stack.push(cand);
        // Continue the depth-first search with the updated remaining target sum.
        dfs(i, tar - cand, cands, stack, res);
        // Backtrack by removing the current cand number from the current combination.
        stack.pop();
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

public static void dfs(int srt, int tar, int[] cands, boolean[] visited, LinkedList<Integer> stack, List<List<Integer>> res) {
    if (tar == 0) {
        res.add(new ArrayList<>(stack));
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
        stack.push(cand);
        dfs(i + 1, tar - cand, cands, visited, stack, res);
        visited[i] = false;
        stack.pop();
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
/**
 * This method is the entry point to find all combinations.
 *
 * @param len The number of elements in each combination.
 * @param tar The target sum of each combination.
 * @return A list of all combinations.
 */
public static List<List<Integer>> combinationSum3(int len, int tar) {
    List<List<Integer>> res = new ArrayList<>();
    
    // Start the depth-first search from 1
    dfs(1, tar, len, new LinkedList<>(), res);
    
    return res;
}

/**
 * This method performs a depth-first search to find all combinations.
 *
 * @param srt The starting number for the search.
 * @param tar The target sum of each combination.
 * @param len The number of elements in each combination.
 * @param stack The current combination.
 * @param res The result list.
 */
public static void dfs(int srt, int tar, int len, LinkedList<Integer> stack, List<List<Integer>> res) {
    // If the target sum is reached and the combination has the required length
    if (tar == 0 && stack.size() == len) {
        // Add the combination to the result list
        res.add(new ArrayList<>(stack));
        return;
    }

    // Iterate through the numbers from the starting number to 9
    for (int i = srt; i <= 9; i++) {
        // If the target sum is less than the current number, skip the rest of the loop
        if (tar < i) {
            continue;
        }
        // If the combination already has the required length, skip the rest of the loop
        if (stack.size() == len) {
            continue;
        }

        stack.push(i);
        
        // Continue the depth-first search with the next number and the reduced target sum
        dfs(i + 1, tar - i, len, stack, res);
        
        stack.pop();
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
        tbl[i][j] = '.';
        
        // Unmark the column, right slash, left slash.
        ca[j] = cb[i + j] = cc[n - 1 - (i - j)] = false;
    }
}

public static void main(String[] args) {
    int n = 4;
    
    // Mark the column, right slash, left slash.
    boolean[] ca = new boolean[n];
    boolean[] cb = new boolean[2 * n - 1];
    boolean[] cc = new boolean[2 * n - 1];
    
    char[][] tbl = new char[n][n];
    for (char[] t : tbl) {
        Arrays.fill(t, '.');
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
 * @param board The Sudoku board to be solved.
 */
public static void solveSudoku(char[][] board) {
    // Initialize the boolean arrays to keep track of the numbers used in each row, column and box
    boolean[][] ca = new boolean[9][9];
    boolean[][] cb = new boolean[9][9];
    boolean[][] cc = new boolean[9][9];

    // Iterate through the board and update the boolean arrays for the numbers already placed on the board
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            char ch = board[i][j];
            if (ch == '.') {
                continue;
            }
            ca[i][ch - '1'] = true;
            cb[j][ch - '1'] = true;
            cc[i / 3 * 3 + j / 3][ch - '1'] = true;
        }
    }

    // Start the depth-first search to solve the Sudoku puzzle
    dfs(0, 0, board, ca, cb, cc);

    // Print the solved Sudoku board
    print(board);
}

/**
 * This method performs a depth-first search to solve the Sudoku puzzle.
 *
 * @param i The row index.
 * @param j The column index.
 * @param board The Sudoku board to be solved.
 * @param ca The boolean array for the numbers used in each row.
 * @param cb The boolean array for the numbers used in each column.
 * @param cc The boolean array for the numbers used in each box.
 * @return A boolean indicating whether the Sudoku puzzle has been solved.
 */
private static boolean dfs(int i, int j, char[][] board, boolean[][] ca, boolean[][] cb, boolean[][] cc) {
    // Find the next empty cell
    while (board[i][j] != '.') {
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

        // Place the number on the board and update the boolean arrays
        board[i][j] = (char) (x + '0');
        ca[i][x - 1] = cb[j][x - 1] = cc[i / 3 * 3 + j / 3][x - 1] = true;

        // Continue the depth-first search with the next cell
        if (dfs(i, j, board, ca, cb, cc))
            return true;

        // If the depth-first search did not lead to a solution, remove the number from the board and backtrack
        board[i][j] = '.';
        ca[i][x - 1] = cb[j][x - 1] = cc[i / 3 * 3 + j / 3][x - 1] = false;
    }

    // If no number can be placed in the current cell, return false
    return false;
}
```

# Two Sum II - Input Array Is Sorted

[Problem Description](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=177)

```java
/**
 * This solution uses a two-pointer approach to find the pair of numbers.
 * The pointers start from both ends of the array and move towards each other.
 * If the sum of the current pair is less than the target, the left pointer is
 * moved to the right. If the sum is greater than the target, the right pointer
 * is moved to the left. If the sum equals the target, the solution is found.
 * 
 * @param nums An array of integers sorted in ascending order.
 * @param target The target sum that the pair of numbers should add up to.
 * @return An array containing the indices (1-based) of the two numbers that
 * add up to the target. It is guaranteed that there is exactly one solution.
 */
public int[] twoSum(int[] nums, int target) {
    // Initialize two pointers, one at the beginning and one at the end.
    int i = 0;
    int j = nums.length - 1;
    
    // Iterate until the two pointers meet.
    while (i < j) {
        // Calculate the sum of the current pair.
        int sum = nums[i] + nums[j];
        
        // Compare the sum with the target.
        if (sum < target) {
            // If the sum is less than the target, move the left pointer to the right.
            i++;
        } else if (sum > target) {
            // If the sum is greater than the target, move the right pointer to the left.
            j--;
        } else {
            // If the sum equals the target, the solution is found. Break out of the loop.
            break;
        }
    }
    
    // Return the indices (1-based) of the two numbers that add up to the target.
    return new int[]{i + 1, j + 1};
}
```

# N Sum

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=178&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This method finds all unique quadruplets in the array which gives the sum of target.
 *
 * @param tar  The target sum.
 * @param n    The number of elements to consider for the sum.
 * @param nums The input array of integers.
 * @return A list of lists of integers where each list represents a unique quadruplet.
 */
public static List<List<Integer>> nSum(int tar, int n, int[] nums) {
    // Sort the array
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    // Start the depth-first search
    dfs(tar, n, nums, 0, nums.length - 1, new LinkedList<>(), res);
    return res;
}

/**
 * This method performs a depth-first search to find all unique quadruplets.
 *
 * @param tar   The target sum.
 * @param n     The number of elements to consider for the sum.
 * @param nums  The input array of integers.
 * @param i     The start index for the search.
 * @param j     The end index for the search.
 * @param stack A stack to keep track of the current combination of integers.
 * @param res   The result list of lists of integers.
 */
public static void dfs(int tar, int n, int[] nums, int i, int j, LinkedList<Integer> stack, List<List<Integer>> res) {
    // If there are only two numbers left to find
    if (n == 2) {
        // Perform a two-sum search
        twoSum(tar, nums, i, j, stack, res);
        return;
    }

    // For each number in the array
    for (int k = i; k < j - (n - 2); k++) {
        // Skip duplicates
        if (k > i && nums[k] == nums[k - 1]) {
            continue;
        }
        // Add the current number to the stack
        stack.push(nums[k]);
        // Recursively search for the remaining numbers
        dfs(tar - nums[k], n - 1, nums, k + 1, j, stack, res);
        // Remove the current number from the stack
        stack.pop();
    }
}

/**
 * This method performs a two-sum search.
 *
 * @param tar   The target sum.
 * @param nums  The input array of integers.
 * @param i     The start index for the search.
 * @param j     The end index for the search.
 * @param stack A stack to keep track of the current combination of integers.
 * @param res   The result list of lists of integers.
 */
public static void twoSum(int tar, int[] nums, int i, int j, LinkedList<Integer> stack, List<List<Integer>> res) {
    // While the start index is less than the end index
    while (i < j) {
        // Calculate the sum of the two numbers
        int sum = nums[i] + nums[j];

        // If the sum is less than the target, increment the start index
        if (sum < tar) {
            i++;
        } else if (sum > tar) { // If the sum is greater than the target, decrement the end index
            j--;
        } else { // If the sum is equal to the target
            // Add the two numbers to the stack
            stack.add(nums[i]);
            stack.add(nums[j]);
            // Add the current combination to the result
            res.add(new ArrayList<>(stack));

            // Skip duplicates
            do {
                i++;
            } while (i < j && nums[i] == nums[i - 1]);

            do {
                j--;
            } while (i < j && nums[j] == nums[j + 1]);
        }
    }
}

public static void main(String[] args) {
    System.out.println(nSum(0, 4, new int[]{-2, 0, 1, 1, 2}));
}
```