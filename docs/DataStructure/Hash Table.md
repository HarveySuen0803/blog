# Hash Table

```java
public class HashTable {
    public static class Entry {
        int hash;
        Object key;
        Object val;
        Entry next;
        
        public Entry(int hash, Object key, Object val) {
            this.hash = hash;
            this.key = key;
            this.val = val;
        }
    }
    
    Entry[] tbl = new Entry[16];
    
    int size = 0;
    
    /**
     * The load factor of the HashTable. When the size exceeds this value times the array length, the HashTable will be resized.
     */
    float lf = 0.75f;
    
    /**
     * The threshold of the HashTable size for resizing. It's calculated as the product of load factor and array length.
     */
    int th = (int) (lf * tbl.length);
    
    /**
     * Computes the hash value for a given key. This method uses the murmur3_32 hash function for strings and the default hashCode method for other objects.
     *
     * @param key The key to compute the hash for.
     * @return The computed hash value.
     */
    private static int getHash(Object key) {
        if (key instanceof String k) {
            return Hashing.murmur3_32().hashString(k, StandardCharsets.UTF_8).asInt();
        }
        int hash = key.hashCode();
        // Use the higher bits to scramble the lower ones, which can help for poor hash functions
        return hash ^ (hash >>> 16);
    }
}
```
1
# Get Node

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=24)

```java
/**
 * Retrieves the value associated with the provided key in the hash table.
 */
public Object get(Object key) {
    return doGet(getHash(key), key);
}

/**
 * Helper method for the get operation. It uses the hash of the key to find the correct bucket and then iterates over the entries in that bucket to find the correct one.
 */
private Object doGet(int hash, Object key) {
    // Calculate the index in the array for this hash
    int idx = hash & tbl.length - 1;
    
    // If there's no entry at the calculated index, return null
    Entry cur = tbl[idx];
    if (cur == null) {
        return null;
    }
    
    // Iterate over the entries in the bucket
    while (cur != null) {
        // If the keys match, return the value
        if (key.equals(cur.key)) {
            return cur.val;
        }
        // Move to the next entry in the bucket
        cur = cur.next;
    }
    
    // If no matching key was found in the bucket, return null
    return null;
}
```

# Put Node

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=24)

```java
/**
 * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
 */
public void put(Object key, Object val) {
    doPut(getHash(key), key, val);
}

/**
 * Helper method for the put operation. It uses the hash of the key to find the correct bucket and then either updates the existing entry or adds a new one.
 */
private void doPut(int hash, Object key, Object val) {
    int idx = hash & tbl.length - 1;
    
    // If the bucket is empty, create a new entry and put it in the bucket
    if (tbl[idx] == null) {
        tbl[idx] = new Entry(hash, key, val);
        return;
    }
    
    // If the bucket is not empty, traverse the linked list in the bucket
    Entry cur = tbl[idx];
    while (cur.next != null) {
        // If the key is found in the linked list, update the value of the entry
        if (cur.key.equals(key)) {
            cur.val = val;
            return;
        }
        cur = cur.next;
    }
    
    // If the key is not found in the linked list, append a new entry to the end of the linked list
    cur.next = new Entry(hash, key, val);
    
    // Increase the size of the HashTable, and resize if necessary
    if (++size > th) {
        resize();
    }
}
```

# Resize

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=26)

```java
/**
 * Resizes the map when the number of key-value mappings in this map exceeds its threshold.
 * This method creates a new array with double the length of the old one and rehashes all the entries in the old array.
 * The entries are split into two groups based on whether their hash values would change if the array length were doubled.
 * Each group is then placed into the new array at the corresponding index.
 */
private void resize() {
    // Double the size of the array
    Entry[] newTbl = new Entry[tbl.length << 1];
    
    // Traverse the old array
    for (Entry cur : tbl) {
        // Traverse the linked list in the bucket
        while (cur != null) {
            // Rehash the key
            int idx = cur.hash & newTbl.length - 1;
            // Append the entry to the end of the linked list in the new bucket
            if (newTbl[idx] == null) {
                newTbl[idx] = new Entry(cur.hash, cur.key, cur.val);
            } else {
                Entry newCur = newTbl[idx];
                while (newCur.next != null) {
                    newCur = newCur.next;
                }
                newCur.next = new Entry(cur.hash, cur.key, cur.val);
            }
            // Go to the next entry in the old array
            cur = cur.next;
        }
    }
    
    // Replace the old array with the new array
    tbl = newTbl;
    
    // Update the threshold
    th = (int) (lf * tbl.length);
}
```

# Remove Node

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=25)

```java
/**
 * Removes the mapping for a key from this map if it is present.
 */
public Object del(Object key) {
    return doDel(getHash(key), key);
}

/**
 * Helper method for the delete operation. It uses the hash of the key to find the correct bucket and then deletes the entry from that bucket.
 */
private Object doDel(int hash, Object key) {
    int idx = hash & tbl.length - 1;
    Entry cur = tbl[idx];
    if (cur == null) {
        return null;
    }
    
    // If the entry to be deleted is the first entry in the bucket
    if (cur.key.equals(key)) {
        // If the bucket only has one entry, set the bucket to null
        if (cur.next == null) {
            tbl[idx] = null;
        }
        // If the bucket has more than one entry, set the bucket to the next entry
        else {
            tbl[idx] = cur.next;
        }
        size--;
        return cur.val;
    }
    
    // If the entry to be deleted is not the first entry in the bucket, traverse the linked list in the bucket
    while (cur.next != null) {
        // If the entry to be deleted is found in the linked list, remove the entry from the linked list
        if (cur.next.key.equals(key)) {
            Entry del = cur.next;
            cur.next = cur.next.next;
            size--;
            return del.val;
        }
        cur = cur.next;
    }
    
    return null;
}
```

# DJB2 Hash Code

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=33&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public int getHash(String s) {
    int hash = 5381;

    // Iterate over each character in the string
    for (int i = 0; i < s.length(); i++) {
        // Get the character at the current index
        char c = s.charAt(i);

        // Update the hash value
        // Shift the current hash value 5 bits to the left, subtract the original hash value, and add the ASCII value of the current character
        hash = (hash << 5) - hash + c; // hash * 32 - hash + c
    }

    return hash;
}
```

# Murmur32 Hash Code

```java
private static int getHash(Object key) {
    // Use the murmur3_32 hash function for strings
    if (key instanceof String k) {
        return Hashing.murmur3_32().hashString(k, StandardCharsets.UTF_8).asInt();
    }
    int hash = key.hashCode();
    // Use the higher bits to scramble the lower ones, which can help for poor hash functions
    return hash ^ (hash >>> 16);
}
```

# Two Num

[Problem Description](https://leetcode.cn/problems/two-sum/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=37&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This method solves the Two Sum problem from LeetCode.
 * The problem is to find two numbers in the array that add up to a specific target.
 * The solution uses a HashMap to store the numbers and their indices as we iterate through the array.
 * If the complement of the current number (i.e., target - current number) is found in the map,
 * it means we have found the two numbers that add up to the target.
 */
public static int[] twoSum(int[] nums, int sum) {
    HashMap<Integer, Integer> map = new HashMap<>();
    
    // Iterate through the array and store the numbers and their indices in the map.
    for (int i = 0; i < nums.length; i++) {
        // If the complement of the current number is found in the map, return the indices.
        if (map.containsKey(sum - nums[i])) {
            return new int[]{sum - nums[i], i};
        }
        // Otherwise, store the current number and its index in the map.
        else {
            map.put(nums[i], i);
        }
    }
    
    return null;
}
```

# Longest Substring Without Repeating Characters

[Problem Description](https://leetcode.cn/problems/longest-substring-without-repeating-characters/solutions/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=38&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This function calculates the length of the longest substring without repeating characters.
 * The function uses a sliding window approach to solve this problem.
 * 
 * @param s The input string.
 * @return The length of the longest substring without repeating characters.
 */
public static int lengthOfLongestSubstring(String str) {
    char[] chs = str.toCharArray();
    HashMap<Character, Integer> map = new HashMap<>();
    
    int srt = 0;
    int end = 0;
    int maxLen = 0;
    
    // Iterate through the string and store the characters and their indices in the map.
    for (char ch : chs) {
        // If the current character is found in the map, update the start index to the index of the character + 1.
        if (map.containsKey(ch)) {
            srt = Math.max(srt, map.get(ch) + 1);
        }
        map.put(ch, end);
        end++;
        // Update the max length if the current length is greater than the max length.
        maxLen = Math.max(maxLen, end - srt);
    }
    
    return maxLen;
}
```

# Group Anagrams

[Problem Description](https://leetcode.cn/problems/group-anagrams/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=40&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This function groups anagrams together.
 * Anagrams are words that have the same characters but in different orders.
 * The idea is to use a HashMap to map each sorted string to its anagrams.
 * 
 * @param strs An array of strings
 * @return A list of grouped anagrams
 */
public List<List<String>> groupAnagrams(String[] strs) {
    // Create a HashMap to store the groups of anagrams.
    // The key is the sorted string, and the value is the list of strings that are anagrams of the key.
    HashMap<String, List<String>> map = new HashMap<>();

    // Iterate over each string in the input array
    for (String str : strs) {
        // Convert the string to a character array
        char[] chars = str.toCharArray();
        // Sort the character array
        Arrays.sort(chars);
        // Convert the sorted character array back to a string.
        // This sorted string will be used as the key in the HashMap.
        String key = new String(chars);
        // Use the computeIfAbsent method to get the value for the key if it exists,
        // or create a new ArrayList and put it into the map if the key does not exist.
        List<String> list = map.computeIfAbsent(key, (k, v) -> new ArrayList<>());
        // Add the original string (not the sorted one) to the list of its anagrams
        list.add(str);
    }

    // Convert the values of the HashMap (which are lists of anagrams) into a list of lists and return it.
    return new ArrayList<>(map.values());
}
```

# Group Anagrams

[Problem Description](https://leetcode.cn/problems/group-anagrams/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=41)

```java
/**
 * This method groups anagrams together from a list of strings.
 * Anagrams are words that have the same characters but in different orders.
 * @param strs An array of strings
 * @return A list of grouped anagrams
 */
public List<List<String>> groupAnagrams(String[] strs) {
    // Create a HashMap to store the groups of anagrams. The key is a custom Key object that represents the character counts of a string.
    HashMap<Key, List<String>> map = new HashMap<>();
    
    // Iterate over each string in the input array
    for (String str : strs) {
        // Create a new Key object for the current string
        Key key = new Key(str);
        // If the key doesn't exist in the map, add it with an empty list as its value. Then, get the list associated with the key.
        List<String> list = map.computeIfAbsent(key, (k) -> new ArrayList<>());
        // Add the current string to the list of its corresponding key
        list.add(str);
    }
    
    // Convert the values of the map (which are lists of anagrams) into a list and return it
    return new ArrayList<>(map.values());
}

/**
 * This class represents a key for the HashMap used in the groupAnagrams method.
 * The key is an array of integers representing the counts of each character in a string.
 */
public static class Key {
    int[] key;
    
    /**
     * Checks if this Key object is equal to another object.
     * Two Key objects are equal if their key arrays are equal.
     * @param obj The object to compare with
     * @return true if the objects are equal, false otherwise
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        
        if (obj == null || obj.getClass() != this.getClass()) {
            return false;
        }
        
        // Check if the key arrays are equal
        return Arrays.equals(this.key, ((Key) obj).key);
    }
    
    /**
     * Returns the hash code of this Key object.
     * The hash code is computed by calling Arrays.hashCode on the key array.
     * @return The hash code of this Key object
     */
    @Override
    public int hashCode() {
        return Arrays.hashCode(key);
    }
    
    /**
     * Constructs a new Key object from a string.
     * The key array is populated with the counts of each character in the string.
     * @param str The string to create a Key from
     */
    public Key(String str) {
        key = new int[26];
        // Populate the key array with the counts of each character in the string
        for (char ch : str.toCharArray()) {
            key[ch - 'a']++;
        }
    }
}
```

# Contains Duplicate

[Problem Description](https://leetcode.cn/problems/contains-duplicate/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=42&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public boolean containsDuplicate(int[] nums) {
    HashMap<Integer, Integer> map = new HashMap<>(nums.length * 2);
    
    for (int num : nums) {
        if (map.put(num, 0) != null) {
            return true;
        }
    }
    
    return false;
}
```

# Single Number

[Problem Description](https://leetcode.cn/problems/single-number/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=43&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public int singleNumber(int[] nums) {
    HashSet<Integer> set = new HashSet<>();
    
    for (int num : nums) {
        if (!set.add(num)) {
            set.remove(num);
        }
    }
    
    return set.toArray(new Integer[0])[0];
}
```

# Single Number

[Problem Description](https://leetcode.cn/problems/single-number/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=43&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public int singleNumber(int[] nums) {
    int res = 0;
      
    // XOR all the numbers in the array.
    // This will effectively cancel out the numbers that appear twice
    for (int num : nums) {
        res ^= num;
    }
    
    return res;
}
```

# Valid Anagram

[Problem Description](https://leetcode.cn/problems/valid-anagram/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=44&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This method checks if two strings are anagrams.
 * It does this by comparing the frequency of each character in both strings.
 *
 * @param s The first string.
 * @param t The second string.
 * @return true if the two strings are anagrams, false otherwise.
 */
public boolean isAnagram(String s, String t) {
    // It compares the frequency arrays of both strings.
    // If they are equal, then the strings are anagrams.
    return Arrays.equals(getKey(s), getKey(t));
}

/**
 * This method generates a frequency array for a string.
 * Each index in the array represents a character (from 'a' to 'z'),
 * and the value at that index represents the frequency of that character in the string.
 *
 * @param s The input string.
 * @return The frequency array of the string.
 */
private int[] getKey(String s) {
    // Initialize an array of size 26 to represent each letter of the alphabet.
    int[] arr = new int[26];

    // Convert the string to a char array for easy traversal.
    char[] chars = s.toCharArray();

    // Traverse the char array.
    for (char c : chars) {
        // Increment the count of the character in the array.
        // 'c - 97' gives the index in the array for the character,
        // as 'a' is 97 in ASCII and we want 'a' to correspond to the 0th index.
        arr[c - 97]++;
    }

    // Return the frequency array.
    return arr;
}
```

# First Unique Character in a String

[Problem Description](https://leetcode.cn/problems/first-unique-character-in-a-string/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=45&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public int firstUniqChar(String s) {
    int[] arr = new int[26];
    char[] chars = s.toCharArray();
    
    for (char c : chars) {
        arr[c - 97]++;
    }
    
    for (int i = 0; i < chars.length; i++) {
        if (arr[chars[i] - 97] == 1) {
            return i;
        }
    }
    
    return -1;
}
```

# Most Common Word

[Problem Description](https://leetcode.cn/problems/most-common-word/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=46&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This function finds the most common word in a paragraph that is not in the list of banned words.
 *
 * @param paragraph The paragraph of words.
 * @param banned The array of banned words.
 * @return The most common word that is not in the list of banned words.
 */
public String mostCommonWord(String paragraph, String[] banned) {
    // Convert the paragraph to lower case and then to a character array.
    char[] chars = paragraph.toLowerCase().toCharArray();
    // Convert the banned words array to a Set for faster lookup.
    Set<String> set = Set.of(banned);
    // Create a HashMap to store the frequency of each word.
    HashMap<String, Integer> map = new HashMap<>();
    // Use a StringBuilder to build each word.
    StringBuilder sb = new StringBuilder();
    
    // Iterate over each character in the paragraph.
    for (char ch : chars) {
        // If the character is a letter, append it to the current word.
        if (ch >= 'a' && ch <= 'z') {
            sb.append(ch);
        } 
        // If the character is a space or a punctuation, it means the end of a word.
        else {
            // If the word is not empty and not banned, increase its frequency in the map.
            if (!sb.isEmpty() && !set.contains(sb.toString())) {
                map.compute(sb.toString(), (k, v) -> v == null ? 1 : v + 1);
            }
            // Clear the StringBuilder for the next word.
            sb.setLength(0);
        }
    }
    
    // After the loop, there might be a word left in the StringBuilder. Check it as well.
    if (!sb.isEmpty() && !set.contains(sb.toString())) {
        map.compute(sb.toString(), (k, v) -> v == null ? 1 : v + 1);
    }
    
    // Find the word with the maximum frequency.
    String maxKey = null;
    int maxVal = 0;
    for (Map.Entry<String, Integer> e : map.entrySet()) {
        if (e.getValue() > maxVal) {
            maxKey = e.getKey();
            maxVal = e.getValue();
        }
    }
    
    // Return the word with the maximum frequency.
    return maxKey;
}
```

# Find All Numbers Disappeared in an Array

[Problem Description](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/description/)

```java
public static List<Integer> findDisappearedNumbers(int[] nums) {
    HashMap<Integer, Integer> hashMap = new HashMap<>();
    int min = nums[0];
    int max = nums[0];
    for (int num : nums) {
        min = Math.min(min, num);
        max = Math.max(max, num);
        hashMap.put(num, num);
    }
    
    List<Integer> result = new ArrayList<>();
    for (int num = min; num <= max; num++) {
        if (!hashMap.containsKey(num)) {
            result.add(num);
        }
    }
    
    return result;
}
```