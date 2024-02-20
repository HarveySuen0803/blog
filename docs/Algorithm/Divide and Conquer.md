# Quick Pow

[Explain p157, p158](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=157)

```java
/**
 * This method implements the Quick Pow (Exponentiation by Squaring) algorithm.
 * The Quick Pow algorithm is an efficient way to compute the power of a number.
 * It reduces the time complexity from O(n) to O(log n) by leveraging the property that x^n = (x^(n/2))^2 for even n.
 *
 * @param x The base number.
 * @param n The exponent. It should be a non-negative integer.
 * @return The result of x raised to the power of n.
 */
public static double quickPow(double x, int n) {
    // If n is 0, return 1 because any number raised to the power of 0 is 1.
    if (n == 0) {
        return 1.0;
    }
    
    // If n is 1, return x because any number raised to the power of 1 is the number itself.
    if (n == 1) {
        return x;
    }
    
    // Compute the power of x with half of n.
    // This is the core idea of the Quick Pow algorithm, which reduces the problem size by half in each recursive call.
    double y = quickPow(x, n / 2);
    
    if ((n & 1) == 0) {
        return y * y;
    } else {
        return x * y * y;
    }
}

public static double myPow(double x, int n) {
    if (n < 0) {
        return 1 / quickPowPositive(x, -n);
    }
    return quickPowPositive(x, n);
}
```

# Longest Substring with At Least K Repeating Characters

[Problem](https://leetcode.cn/problems/longest-substring-with-at-least-k-repeating-characters/description/)

[Explain p161, p162](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=161)

```java
/**
 * This method finds the length of the longest substring of a given string 's' where every character appears at least 'k' times.
 * The core idea of this algorithm is to use a divide and conquer approach to solve this problem.
 * 
 * @param s The input string.
 * @param k The minimum number of times each character should appear in the substring.
 * @return The length of the longest substring where every character appears at least 'k' times.
 */
public int longestSubstring(String s, int k) {
    // If the length of the string is less than 'k', return 0 as no such substring can exist.
    if (s.length() < k) {
        return 0;
    }

    // Initialize an array to keep track of the count of each character in the string.
    int[] counts = new int[26];
    char[] chs = s.toCharArray();
    // Count the occurrence of each character in the string.
    for (char ch : chs) {
        counts[ch - 'a']++;
    }

    // Iterate over the characters in the string.
    for (int i = 0; i < chs.length; i++) {
        int count = counts[chs[i] - 'a'];
        // If a character appears less than 'k' times, divide the string into two substrings.
        if (count > 0 && count < k) {
            int j = i + 1;
            // Find the next character that appears less than 'k' times.
            while (j < s.length() && counts[chs[j] - 'a'] < k) {
                j++;
            }

            // Recursively find the longest substring in the two divided substrings.
            return Math.max(
                longestSubstring(s.substring(0, i), k),
                longestSubstring(s.substring(j), k)
            );
        }
    }

    // If every character in the string appears at least 'k' times, return the length of the string.
    return s.length();
}
```