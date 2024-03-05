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
public static String minWindow(String str, String ptn) {
    int[] strCount = new int[128];
    int[] ptnCount = new int[128];
    for (char ch : ptn.toCharArray()) {
        ptnCount[ch]++;
    }
    
    int l = 0;
    int r = 0;
    int len = 0;
    int lRes = -1;
    int rRes = -1;
    while (r < str.length()) {
        char rCh = str.charAt(r);
        strCount[rCh]++;
        if (ptnCount[rCh] != 0 && strCount[rCh] <= ptnCount[rCh]) {
            len++;
        }
        while (len == ptn.length() && l <= r) {
            if (rRes == -1 || (r - l) < (rRes - lRes)) {
                lRes = l;
                rRes = r;
            }
            char lCh = str.charAt(l);
            strCount[lCh]--;
            if (strCount[lCh] < ptnCount[lCh]) {
                len--;
            }
            l++;
        }
        r++;
    }
    
    return rRes != -1 ? str.substring(lRes, rRes + 1) : "";
}

public static void main(String[] args) {
    System.out.println(minWindow("ADOBECODEBANC", "ABC")); // BANC
}
```

# Subarray Sum Equals K

[Problem Description](https://leetcode.cn/problems/subarray-sum-equals-k/description/?envType=study-plan-v2&envId=top-100-liked)

```java
public static int subarraySum(int[] nums, int tarSum) {
    int count = 0;
    for (int i = 0; i < nums.length; i++) {
        int curSum = 0;
        for (int j = i; j < nums.length; j++) {
            curSum += nums[j];
            if (curSum == tarSum) {
                count++;
            }
        }
    }
    return count;
}
```

# Subarray Sum Equals K

```java
/**
 * This function uses the prefix sum method. It iterates the given array, storing the sum from start to the
 * current number in the HashMap. If the current sum minus tarSum has appeared in HashMap before
 * it means that we have found a subarray that adds up to tarSum.
 *
 * Example:
 * nums = [3, 4, 7, 2, -3, 1, 4, 2], tarSum = 7
 * Prefix sums array: [3, 7, 14, 16, 13, 14, 18, 20]
 * 7 appears once before 14, so we have two subarrays ([3, 4], [7]) that add up to 7.
 *
 * Extended Example:
 * Assume nums = [3, 4, 7, 2, -3, 1, 4, 2], tarSum = 7.
 *
 * 1. Initialization: count = 0, curSum = 0, map = [(0,1)]
 *
 * 2. For number 3:
 *     curSum = 3
 *     No record of (3-7) in map.
 *     map becomes [(0,1), (3,1)]
 *
 * 3. For number 4:
 *     curSum = 7
 *     There is record of (7-7) in map, so count += 1.
 *     map becomes [(0,1), (3,1), (7,1)]
 *
 * 4. For number 7:
 *     curSum = 14
 *     There is record of (14-7) in map, so count += 1.
 *     map becomes [(0,1), (3,1), (7,1), (14,1)]
 *
 * 5. For number 2:
 *     curSum = 16
 *     No record of (16-7) in map.
 *     map becomes [(0,1), (3,1), (7,1), (14,1), (16,1)]
 *
 * 6. For number -3:
 *     curSum = 13
 *     No record of (13-7) in map.
 *     map becomes [(0,1), (3,1), (7,1), (14,1), (16, ```java
 *     1), (13,1)]
 *
 * 7. For number 1:
 *     curSum = 14
 *     There is a record of (14-7) in map, so count += 1.
 *     map becomes [(0,1), (3,1), (7,1), (14,2), (16,1), (13,1)]
 *
 * 8. For number 4:
 *     curSum = 18
 *     No record of (18-7) in map.
 *     map becomes [(0,1), (3,1), (7,1), (14,2), (16,1), (13,1), (18,1)]
 *
 * 9. For number 2:
 *     curSum = 20
 *     No record of (20-7) in map.
 *     map becomes [(0,1), (3,1), (7,1), (14,2), (16,1), (13,1), (18,1), (20,1)]
 *
 * So, the final result is count = 2, which represents there are 2 subarrays ([3, 4] and [7]) with sum equal to tarSum.
 * 
 * Special Cases Consideration:
 * There may be negative numbers in the input array, so we can't just consider that the sum should be increasing.
 * If tarSum is 0, the output should not always be 0. For example, in the array [0, 0], there are 3 subarrays that sum to 0.
 * Therefore, we initialize the HashMap with (0, 1) to correctly handle the situation where the subarray starts from the beginning of the array.
 */
public static int subarraySum(int[] nums, int tarSum) {
    // Initialize the counter for the number of valid subarrays
    int count = 0;
    
    // This is to record the cumulative sum of the numbers from the beginning to the current position
    int curSum = 0;
    
    // Use HashMap to record the number of occurrences of each sum
    HashMap<Integer, Integer> map = new HashMap<>();
    
    // Put (0,1) into the HashMap to handle the case where the subarray starts from the beginning of the array
    map.put(0, 1);
    
    // Iterate through the input array
    for (int num : nums) {
        // For each number, add it to the cumulative sum
        curSum += num;
        // If the current sum minus tarSum has appeared before, add the corresponding count to our counter
        if (map.containsKey(curSum - tarSum)) {
            count += map.get(curSum - tarSum);
        }
        // Update the map with the current sum
        map.put(curSum, map.getOrDefault(curSum, 0) + 1);
    }
    
    // Return the total count of the subarrays where the sum equals to tarSum
    return count;
}
```

# Count Prime

```java
public static int getPrimeCount(int n) {
    int count = 0;
    for (int i = 2; i < n; i++) {
        count += isPrime(n) ? 1 : 0;
    }
    return count;
}

public static boolean isPrime(int num) {
    for (int i = 2; i * i < num; i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}
```

# Count Prime

[Explain](https://www.bilibili.com/video/BV1eg411w7gn?p=71&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int getPrimeCount(int n) {
    int count = 0;
    boolean[] isPrime = new boolean[n];
    Arrays.fill(isPrime, true);
    for (int i = 2; i < n; i++) {
        if (!isPrime[i]) {
            continue;
        }
        count++;
        for (int j = i * i; j < n; j += i) {
            isPrime[j] = false;
        }
    }
    return count;
}
```

# My Sqrt

[Problem Description](https://leetcode.cn/problems/sqrtx/description/)

[Explain](https://www.bilibili.com/video/BV1eg411w7gn?p=74&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * Example: 
 * Given x = 8, the binary search first focuses on range [1, 8].
 * 
 * 1. With l = 1, r = 8, m = (1 + 8) >>> 1 = 4. As m <= x/m, res becomes 4 and l becomes m+1 = 5.
 * 
 * 2. Now with l = 5, r = 8, m = (5 + 8) >>> 1 = 6. As m > x/m, r becomes m - 1 = 5.
 * 
 * 3. Then with l = 5, r = 5, m = (5 + 5) >>> 1 = 5. As m > x/m, r becomes m - 1 = 4. Now r is less than l, ending the loop.
 */
public static int mySqrt(int x) {
    int l = 1;
    int r = x;
    int res = 0;
    
    while (l <= r) {
        int m = (l + r) >>> 1;
        if (m <= x / m) {
            res = m;
            l = m + 1;
        } else  {
            r = m - 1;
        }
    }
    
    return res;
}
```

# My Sqrt

[Explain](https://www.bilibili.com/video/BV1eg411w7gn?p=75&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int mySqrt(int x) {
    if (x == 0) {
        return 0;
    }
    double res = x;
    while (Math.abs(res * res - x) > 0.1) {
        res = (res + x / res) / 2;
    }
    return (int) res;
}
```

# Maximum Product of Three Numbers

[Problem Description](https://leetcode.cn/problems/maximum-product-of-three-numbers/description/)

[Explain](https://www.bilibili.com/video/BV1eg411w7gn?p=76&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int maximumProduct(int[] nums) {
    Arrays.sort(nums);
    int len = nums.length;
    return Math.max(
        nums[0] * nums[1] * nums[len - 1],
        nums[len - 1] * nums[len - 2] * nums[len - 3]
    );
}
```

# Maximum Product of Three Numbers

[Explain](https://www.bilibili.com/video/BV1eg411w7gn?p=76&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int maximumProduct(int[] nums) {
    int min1 = Integer.MAX_VALUE, min2 = Integer.MAX_VALUE;
    int max1 = Integer.MIN_VALUE, max2 = Integer.MIN_VALUE, max3 = Integer.MIN_VALUE;
    
    for (int num : nums) {
        if (num < min1) {
            min2 = min1;
            min1 = num;
        } else if (num < min2) {
            min2 = num;
        }
        
        if (num > max1) {
            max3 = max2;
            max2 = max1;
            max1 = num;
        } else if (num > max2) {
            max3 = max2;
            max2 = num;
        } else if (num > max3) {
            max3 = num;
        }
    }
    
    return Math.max(min1 * min2 * max1, max1 * max2 * max3);
}
```