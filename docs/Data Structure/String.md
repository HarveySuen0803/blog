# Brute Force

```java
public static int search(String txt, String pat) {
    int i = 0;
    while (i < txt.length()) {
        while (txt.charAt(i) != pat.charAt(0)) {
            i++;
        }

        int j = 0;
        while (j < pat.length()) {
            if (txt.charAt(i + j) != pat.charAt(j++)) {
                break;
            }
        }

        if (j == pat.length()) {
            return i;
        }
    }

    return -1;
}
```

# Boyer Moore

[Explain](https://www.bilibili.com/video/BV1eg411w7gn/?p=55&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
```

# Knuth Morris Pratt

```java
public static int search(char[] txt, char[] pat) {
    int[] lps = lps(pat);
    
    int i = 0;
    int j = 0;
    while (pat.length - j <= txt.length - i) {
        if (pat[j] == txt[i]) {
            i++;
            j++;
            if (j == pat.length) {
                return i - j;
            }
        } else if (j == 0) {
            i++;
        } else {
            j = lps[j - 1];
        }
    }
    
    return -1;
}

public static int[] lps(char[] pat) {
    int[] lps = new int[pat.length];
    int i = 1;
    int j = 0;

    while (i < pat.length) {
        if (pat[i] == pat[j]) {
            lps[i] = j + 1;
            i++;
            j++;
        } else if (j == 0) {
            i++;
        } else {
            j = lps[j - 1];
        }
    }

    return lps;
}

public static void main(String[] args) {
    System.out.println(Arrays.toString(lps("ababaca".toCharArray())));
}
```

# Add Strings

[Problem Description](https://leetcode.cn/problems/add-strings/description/)

[Explain](https://www.bilibili.com/video/BV1eg411w7gn?p=53&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public String addStrings(String num1, String num2) {
    StringBuilder sb = new StringBuilder();
    int carry = 0;
    int i1 = num1.length() - 1;
    int i2 = num2.length() - 1;
    while (i1 >= 0 || i2 >= 0 || carry == 1) {
        int n1 = i1 >= 0 ? num1.charAt(i1) - '0' : 0;
        int n2 = i2 >= 0 ? num2.charAt(i2) - '0' : 0;
        sb.append((n1 + n2 + carry) % 10);
        carry = (n1 + n2 + carry) / 10;
        i1--;
        i2--;
    }
    return sb.reverse().toString();
}
```