# Find the Index of the First Occurrence in a String

[Problem Description](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=183&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * The algorithm uses a simple sliding window approach to check for the first occurrence of the needle in the haystack.
 * It iterates through the haystack, comparing each substring of the same length as the needle with the needle itself.
 * If a match is found, the algorithm returns the index of the first occurrence. Otherwise, it continues the search.
 * 
 * @param haystack The input string in which to search for the needle.
 * @param needle The target string to find in the haystack.
 * @return The index of the first occurrence of the needle in the haystack, or -1 if not found.
 */
public int strStr(String haystack, String needle) {
    // Convert strings to character arrays for efficient indexing
    char[] orig = haystack.toCharArray();
    char[] pat = needle.toCharArray();
    int i = 0;

    // Iterate through the haystack until the remaining length is less than the needle's length
    while (i <= orig.length - pat.length) {
        // Initialize the iterator variable j for the needle
        int j = 0;

        // Compare characters of the needle and the current substring in the haystack
        while (j < pat.length) {
            // If a mismatch is found, break out of the loop
            if (pat[j] != orig[i + j]) {
                break;
            }
            
            // Continue checking the next characters
            j++;
        }
        
        // If the inner loop completes (j equals the needle's length), a match is found
        if (j == pat.length) {
            return i;
        }

        // If no match is found in the inner loop, increment i and continue the outer loop
        i++;
    }

    // If the outer loop completes without finding a match, return -1
    return -1;
}
```

# Longest Common Prefix

[Problem Description](https://leetcode.cn/problems/longest-common-prefix/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=186&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * The algorithm finds the longest common prefix among an array of strings.
 * It iterates through the characters of the first string and compares them with the corresponding characters
 * in the rest of the strings. The process stops when a mismatch is found, and the common prefix is returned.
 * 
 * Algorithm Steps:
 * 1. Convert the first string to a character array for efficient indexing.
 * 2. Iterate through the characters of the first string.
 * 3. For each character, compare it with the corresponding character in the rest of the strings.
 * 4. If a mismatch is found or the length of the current string is reached, return the common prefix found so far.
 * 5. If the loop completes, return the entire first string as the common prefix.
 * 
 * @param strs An array of strings to find the longest common prefix.
 * @return The longest common prefix among the input strings.
 */
public static String longestCommonPrefix(String[] strs) {
    // Convert the first string to a character array for efficient indexing
    char[] s1 = strs[0].toCharArray();

    // Iterate through the characters of the first string
    for (int i = 0; i < s1.length; i++) {
        // Get the current character from the first string
        char c1 = s1[i];

        // Iterate through the rest of the strings
        for (int j = 1; j < strs.length; j++) {
            // Get the current string
            String s2 = strs[j];

            // Check if the current string is shorter than i or if there is a character mismatch
            if (s2.length() == i || s2.charAt(i) != c1) {
                // If true, return the common prefix found so far
                return new String(s1, 0, i);
            }
        }
    }

    // If the loop completes, return the entire first string as the common prefix
    return strs[0];
}
```

# Longest Palindromic Substring

[Problem Description](https://leetcode.cn/problems/longest-palindromic-substring/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=187&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * The algorithm employs the idea of expanding around the center to find the longest palindromic substring.
 * It iterates through each character in the string and considers both odd-length and even-length palindromes
 * with the current character(s) as the center. The `extend` method is used to check and extend palindromes.
 * 
 * Algorithm Steps:
 * 1. Initialize variables `left` and `right` to store the indices of the longest palindromic substring.
 * 2. Convert the input string to a character array for efficient indexing.
 * 3. Iterate through each character in the string using a for loop.
 * 4. For each character, call the `extend` method twice, considering both odd-length and even-length palindromes.
 * 5. The `extend` method checks and extends palindromes by comparing characters while moving outward from the center.
 * 6. After the loop, return the longest palindromic substring using the indices `left` and `right`.
 * 
 * @param s The input string in which to find the longest palindromic substring.
 * @return The longest palindromic substring found in the input string.
 */
public static String longestPalindrome(String s) {
    // Initialize variables to store the indices of the longest palindromic substring
    left = 0;
    right = 0;

    // Convert the input string to a character array for efficient indexing
    char[] chs = s.toCharArray();

    // Iterate through each character in the string
    for (int i = 0; i < chs.length - 1; i++) {
        // Consider both odd-length and even-length palindromes with the current character(s) as the center
        extend(chs, i, i);
        extend(chs, i, i + 1);
    }

    // Return the longest palindromic substring using the indices left and right
    return new String(chs, left, right - left + 1);
}

/**
 * Checks and extends palindromes by comparing characters while moving outward from the center.
 * Updates the indices `left` and `right` if a longer palindrome is found.
 * 
 * @param chs The character array representing the input string.
 * @param i The left index of the potential palindrome.
 * @param j The right index of the potential palindrome.
 */
public static void extend(char[] chs, int i, int j) {
    // Move outward from the center while characters match
    while (i >= 0 && j <= chs.length - 1 && chs[i] == chs[j]) {
        i--;
        j++;
    }

    // Adjust indices to represent the valid palindrome
    i++;
    j--;

    // Update indices if a longer palindrome is found
    if (j - i > right - left) {
        left = i;
        right = j;
    }
}
```

# Minimum Window Substring

[Problem Description](https://leetcode.cn/problems/minimum-window-substring/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=188&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * The algorithm utilizes the sliding window technique to find the minimum window substring that contains all characters
 * of the target string (tar) in any order. It uses two pointers, 'l' and 'r', to maintain a window and adjusts the window
 * size based on the frequency of characters in the target string.
 * 
 * @param src The source string in which to find the minimum window substring.
 * @param tar The target string that defines the characters to be covered in the minimum window substring.
 * @return The minimum window substring that contains all characters of the target string in any order.
 */
public static String minWindow(String src, String tar) {
    char[] tarChs = tar.toCharArray();
    int[] tarCount = new int[128];
    int passTotal = 0;
    
    // Count the frequency of each character in the target string (tar)
    for (char ch : tarChs) {
        tarCount[ch]++;
        passTotal++;
    }
    
    char[] srcChs = src.toCharArray();
    int[] srcCount = new int[128];
    int l = 0;
    int r = 0;
    int passed = 0;
    Result res = null;
    
    // Sliding window approach to find the minimum window substring
    while (r < srcChs.length) {
        char rCh = srcChs[r];
        srcCount[rCh]++;
        
        // Update 'passed' when a character from 'tar' is covered in the window
        if (srcCount[rCh] <= tarCount[rCh]) {
            passed++;
        }
        
        // Contract the left boundary while maintaining coverage of all characters from 'tar'
        while (passed == passTotal && l <= r) {
            // Update the minimum window 'res' whenever a smaller valid window is found
            if (res == null || (r - l) < (res.r - res.l)) {
                res = new Result(l, r);
            }
            
            char lCh = srcChs[l];
            srcCount[lCh]--;
            
            // Update 'passed' when a character from 'tar' is no longer covered
            if (srcCount[lCh] < tarCount[lCh]) {
                passed--;
            }
            
            // Move the left boundary to the next position
            l++;
        }
        
        // Expand the right boundary to cover all characters from 'tar'
        r++;
    }
    
    // Return the minimum window substring found in 'src'
    return res == null ? "" : src.substring(res.l, res.r + 1);
}

/**
 * Result Class
 * 
 * Helper class to store the indices of the minimum window substring.
 */
public static class Result {
    int l;
    int r;
    
    public Result(int l, int r) {
        this.l = l;
        this.r = r;
    }
}

public static void print(int[] count) {
    System.out.println(IntStream.range(0, count.length)
                                .filter(i -> count[i] != 0)
                                .boxed()
                                .collect(toMap(i -> (char) i.intValue(), i -> count[i])));
}

public static void main(String[] args) {
    System.out.println(minWindow("ADOBECODEBANC", "ABC")); // BANC
}
```

# Stock I

[Problem Description](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=195&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int maxProfit(int[] prices) {
    int i1 = 0;
    int i2 = 1;
    int maxProfit = 0;
    while (i2 < prices.length) {
        int profit = prices[i2] - prices[i1];
        if (profit > 0) {
            maxProfit = Math.max(maxProfit, profit);
        } else {
            i1 = i2;
        }
        i2++;
    }
    return maxProfit;
}
```

# Stock II

[Problem Description](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=196&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int maxProfit(int[] prices) {
    int i1 = 0;
    int i2 = 1;
    int sumProfit = 0;
    while (i2 < prices.length) {
        int profit = prices[i2] - prices[i1];
        if (profit > 0) {
            sumProfit += profit;
        }
        i1++;
        i2++;
    }
    return sumProfit;
}
```

# Stock III

[Problem Description](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=199&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int maxProfit(int[] prices) {
    int hold1 = Integer.MIN_VALUE;
    int sell1 = 0;
    int hold2 = Integer.MIN_VALUE;
    int sell2 = 0;
    for (int price : prices) {
        hold1 = Math.max(hold1, -price);
        sell1 = Math.max(sell1, hold1 + price);
        
        hold2 = Math.max(hold2, sell1 - price);
        sell2 = Math.max(sell2, hold2 + price);
    }
    return sell2;
}

public static void main(String[] args) {
    System.out.println(maxProfit(new int[]{3, 3, 5, 0, 0, 3, 1, 4})); // 6
}
```

# Stock IV

[Problem Description](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=200&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int maxProfit(int k, int[] prices) {
    if (k > prices.length / 2) {
        return maxProfit(prices);
    }
    
    int[] hold = new int[k];
    int[] sell = new int[k];
    Arrays.fill(hold, Integer.MIN_VALUE);
    for (int price : prices) {
        hold[0] = Math.max(hold[0], -price);
        sell[0] = Math.max(sell[0], hold[0] + price);
        
        for (int i = 1; i < k; i++) {
            hold[i] = Math.max(hold[i], sell[i - 1] - price);
            sell[i] = Math.max(sell[i], hold[i] + price);
        }
    }
    return sell[k - 1];
}

public static int maxProfit(int[] prices) {
    int i1 = 0;
    int i2 = 1;
    int sumProfit = 0;
    while (i2 < prices.length) {
        int profit = prices[i2] - prices[i1];
        if (profit > 0) {
            sumProfit += profit;
        }
        i1++;
        i2++;
    }
    return sumProfit;
}

public static void main(String[] args) {
    System.out.println(maxProfit(2, new int[]{3, 3, 5, 0, 0, 3, 1, 4})); // 6
    System.out.println(maxProfit(4, new int[]{3, 3, 5, 0, 0, 3, 1, 4})); // 8
    System.out.println(maxProfit(8, new int[]{3, 3, 5, 0, 0, 3, 1, 4})); // 8
    System.out.println(maxProfit(4, new int[]{1, 2, 0, 1, 0, 3, 1, 4, 5})); // 9
}
```

# Stock with Fee (Two 1D Array)

[Problem Description](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=197&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int maxProfit(int[] prices, int fee) {
    int[] hold = new int[prices.length];
    int[] sell = new int[prices.length];
    hold[0] = -prices[0];
    sell[0] = 0;
    for (int i = 1; i < prices.length; i++) {
        hold[i] = Math.max(hold[i - 1], sell[i - 1] - prices[i]);
        sell[i] = Math.max(sell[i - 1], hold[i - 1] + prices[i] - fee);
    }
    return sell[prices.length - 1];
}
```

# Stock with Fee (Two Variable)

```java
public static int maxProfit(int[] prices, int fee) {
    int _hold = -prices[0];
    int _sell = 0;
    for (int i = 1; i < prices.length; i++) {
        int hold = Math.max(_hold, _sell - prices[i]);
        int sell = Math.max(_sell, _hold + prices[i] - fee);
        _hold = hold;
        _sell = sell;
    }
    return _sell;
}
```

# Stock with Fee (Two Variable)

```java
public static int maxProfit(int[] prices, int fee) {
    int hold = Integer.MIN_VALUE;
    int sell = 0;
    for (int price : prices) {
        hold = Math.max(hold, sell - price);
        sell = Math.max(sell, hold + price - fee);
    }
    return sell;
}
```

# Stock with Cooldown

```java
public static int maxProfit(int[] prices) {
    if (prices.length == 1) {
        return 0;
    }
    int[] hold = new int[prices.length];
    int[] sell = new int[prices.length];
    hold[0] = -prices[0];
    hold[1] = Math.max(hold[0], -prices[1]);
    sell[0] = 0;
    sell[1] = Math.max(sell[0], hold[0] + prices[1]);
    for (int i = 2; i < prices.length; i++) {
        hold[i] = Math.max(hold[i - 1], sell[i - 2] - prices[i]);
        sell[i] = Math.max(sell[i - 1], hold[i - 1] + prices[i]);
    }
    return sell[prices.length - 1];
}
```

