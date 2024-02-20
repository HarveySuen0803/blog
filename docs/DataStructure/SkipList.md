# Skiplist

[Problem Description](https://leetcode.cn/problems/design-skiplist/description/)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=191&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * Skiplist is a data structure with multiple layers, each representing a different level of granularity.
 * The layers allow for efficient search, add, and erase operations with expected time complexity O(log(n)).
 * The design involves the use of nodes with pointers to the next node in the same layer and the next node in the layer below.
 * Randomized skipping levels during insertion ensures a balanced structure.
 */
public static class Skiplist {
    public static class Node {
        int val;
        Node[] next;
        
        public Node(int val) {
            this.val = val;
            this.next = new Node[MAX_LEVEL + 1];
        }
        
        @Override
        public String toString() {
            return "Node{" +
                "val=" + val +
                '}';
        }
    }
    
    private static final int MAX_LEVEL = 9;
    private Node head = new Node(-1);
    
    /**
     * Helper method to find the path array for a given value in the Skiplist.
     * The path array contains the nodes encountered in each level while searching for the value.
     *
     * @param val The value to find in the Skiplist.
     * @return An array of nodes representing the path in each level.
     */
    public Node[] findPath(int val) {
        Node cur = head;
        Node[] path = new Node[MAX_LEVEL + 1];
        
        for (int level = MAX_LEVEL; level >= 0; level--) {
            while (cur.next[level] != null && cur.next[level].val < val) {
                cur = cur.next[level];
            }
            path[level] = cur;
        }
        
        return path;
    }
    
    public boolean isExists(int val) {
        Node[] path = findPath(val);
        Node tar = path[0].next[0];
        return tar != null && tar.val == val;
    }
    
    public void add(int val) {
        // Find the path array using the helper method find()
        Node[] path = findPath(val);
        // The next node after the path node at level 0 is the node to be added.
        Node tar = path[0].next[0];
        // If the value already exists in the Skiplist, we do not need to add it.
        if (tar != null && tar.val == val) {
            return;
        }
        
        Node added = new Node(val);
        
        // For each level in the Skiplist, insert the new node into the path.
        for (int i = 0; i <= randomLevel(); i++) {
            // The next node after the path node at level i is the new node to be added.
            added.next[i] = path[i].next[i];
            // The next node after the path node at level i is the new node to be added.
            path[i].next[i] = added;
        }
    }
    
    public void del(int val) {
        Node[] path = findPath(val);
        Node deled = path[0].next[0];
        
        // If the value does not exist in the Skiplist, we do not need to delete it.
        if (deled == null || deled.val != val) {
            return;
        }
        
        // For each level in the Skiplist, delete the node from the path.
        for (int i = 0; i <= MAX_LEVEL; i++) {
            // If the next node is not the one to be removed, stop disconnecting
            if (path[i].next[i] != deled) {
                break;
            }
            // Connect the previous node to the next node, effectively removing the current node
            path[i].next[i] = deled.next[i];
        }
    }
    
    /**
     * Helper method to generate a random level for a new node in the Skiplist.
     * The random level determines the number of layers the new node will be connected to.
     *
     * @return The randomly generated level for the new node.
     */
    private int randomLevel() {
        int level = 0;
        while (Math.random() < 0.5 && level < MAX_LEVEL) {
            level++;
        }
        return level;
    }
}

public static void main(String[] args) {
    Skiplist list = new Skiplist();
    Skiplist.Node head = list.head;
    Skiplist.Node n3 = new Skiplist.Node(3);
    Skiplist.Node n7 = new Skiplist.Node(7);
    Skiplist.Node n11 = new Skiplist.Node(11);
    Skiplist.Node n12 = new Skiplist.Node(12);
    Skiplist.Node n16 = new Skiplist.Node(16);
    Skiplist.Node n19 = new Skiplist.Node(19);
    Skiplist.Node n22 = new Skiplist.Node(22);
    Skiplist.Node n23 = new Skiplist.Node(23);
    Skiplist.Node n26 = new Skiplist.Node(26);
    Skiplist.Node n30 = new Skiplist.Node(30);
    Skiplist.Node n37 = new Skiplist.Node(37);
    head.next[0] = head.next[1] = head.next[2] = n3;
    head.next[3] = head.next[4] = head.next[5] = head.next[6] = head.next[7] = n19;
    n3.next[0] = n3.next[1] = n3.next[2] = n7;
    n7.next[0] = n11;
    n7.next[1] = n12;
    n7.next[2] = n16;
    n11.next[0] = n12;
    n12.next[0] = n12.next[1] = n16;
    n16.next[0] = n16.next[1] = n16.next[2] = n19;
    n19.next[0] = n19.next[1] = n19.next[2] = n22;
    n19.next[3] = n26;
    n22.next[0] = n23;
    n22.next[1] = n22.next[2] = n26;
    n23.next[0] = n26;
    n26.next[0] = n30;
    n26.next[1] = n37;
    n30.next[0] = n37;
    
    System.out.println(Arrays.toString(list.find(26)));
}
```