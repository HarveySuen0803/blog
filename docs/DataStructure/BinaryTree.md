# Binary Tree

```java
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    
    public TreeNode(int val) {
        this.val = val;
    }
    
    public TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
    
    @Override
    public String toString() {
        return String.valueOf(this.val);
    }
}
```

```java
public class Main {
    public static void main(String[] args) throws FileNotFoundException, InterruptedException {
        TreeNode root = new TreeNode(
            1,
            new TreeNode(
                2,
                new TreeNode(4),
                null
            ),
            new TreeNode(
                3,
                new TreeNode(5),
                new TreeNode(6)
            )
        );
    }
}
```

# Binary Tree Traversal (Recursive)

```java
public static void preOrder(TreeNode node) {
    if (node == null) {
        return;
    }
    System.out.println(node);
    preOrder(node.left);
    preOrder(node.right);
}

public static void inOrder(TreeNode node) {
    if (node == null) {
        return;
    }
    inOrder(node.left);
    System.out.println(node);
    inOrder(node.right);
}

public static void postOrder(TreeNode node) {
    if (node == null) {
        return;
    }
    postOrder(node.left);
    postOrder(node.right);
    System.out.println(node);
}

public static void main(String[] args) {
    /*
             1
           /   \
          2     3
         / \   / \
        4  5  6   7
     */
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    preOrder(root);
}
```

# Binary Tree Traversal (Iteration)

[Explain p149, p150](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=149)

```java
public static void preOrder(TreeNode node) {
    TreeNode cur = node;
    LinkedList<TreeNode> stack = new LinkedList<>();
    while (cur != null || !stack.isEmpty()) {
        if (cur != null) {
            System.out.println("pre order: " + cur);
            stack.push(cur);
            cur = cur.left;
        } else {
            TreeNode par = stack.pop();
            cur = par.right;
        }
    }
}

public static void inOrder(TreeNode node) {
    TreeNode cur = node;
    LinkedList<TreeNode> stack = new LinkedList<>();
    while (cur != null || !stack.isEmpty()) {
        if (cur != null) {
            stack.push(cur);
            cur = cur.left;
        } else {
            TreeNode par = stack.pop();
            System.out.println("in order: " + par);
            cur = par.right;
        }
    }
}

public static void postOrder(TreeNode node) {
    TreeNode cur = node;
    TreeNode pop = null;
    LinkedList<TreeNode> stack = new LinkedList<>();
    while (cur != null || !stack.isEmpty()) {
        if (cur != null) {
            stack.push(cur);
            cur = cur.left;
        } else {
            TreeNode par = stack.peek();
            if (par.right == null || par.right == pop) {
                pop = stack.pop();
                System.out.println("post order: " + pop);
            } else {
                cur = par.right;
            }
        }
    }
}
```

# Binary Tree Traversal (Three in One)

[Explain](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=152&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static void traversal(TreeNode node) {
    TreeNode cur = node;
    TreeNode pop = null;
    LinkedList<TreeNode> stack = new LinkedList<>();
    while (cur != null || !stack.isEmpty()) {
        if (cur != null) {
            System.out.println("pre order: " + cur);
            stack.push(cur);
            cur = cur.left;
        } else {
            TreeNode par = stack.peek();
            if (par.right == null) {
                System.out.println("in order: " + par);
                pop = stack.pop();
                System.out.println("post order: " + pop);
            }
            else if (par.right == pop) {
                pop = stack.pop();
                System.out.println("post order: " + pop);
            }
            else {
                System.out.println("in order: " + par);
                cur = par.right;
            }
        }
    }
}
```

# Binary Tree Traversal (Reverse)

```java
public static void traversal(TreeNode node) {
    TreeNode cur = node;
    TreeNode pop = null;
    LinkedList<TreeNode> stack = new LinkedList<>();
    while (cur != null || !stack.isEmpty()) {
        if (cur != null) {
            System.out.println("reverse pre order: " + cur);
            stack.push(cur);
            cur = cur.right;
        } else {
            TreeNode par = stack.peek();
            if (par.left == null) {
                System.out.println("reverse in order: " + par);
                pop = stack.pop();
                System.out.println("reverse post order: " + pop);
            }
            else if (par.left == pop) {
                pop = stack.pop();
                System.out.println("reverse post order: " + pop);
            }
            else {
                System.out.println("reverse in order: " + par);
                cur = par.left;
            }
        }
    }
}
```

# Binary Tree Level Order Traversal

[Problem Description](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

```java
/*
         1
        / \
       2   3
      /\  / \
     4  5 6  7
     
     h t
     1 0 0 0 0 0 0 0
        poll root node (1), offer left node (2) and right node (3)
     
       h   t
     1 2 3 0 0 0 0 0
        poll root node (2), offer left node (4) and right node (5)
     
         h     t
     1 2 3 4 5 0 0 0
        poll root node (3), offer left node (6) and right node (7)
     
           h       t
     1 2 3 4 5 6 7 0
        pool root node (4), there are no child nodes to offer
 */
public static void levelOrder(TreeNode root) {
    LinkedList<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        TreeNode polled = queue.poll();
        System.out.print(polled + " ");

        if (polled.left != null) {
            queue.offer(polled.left);
        }
        if (polled.right != null) {
            queue.offer(polled.right);
        }
    }
}

public static void levelOrderWithFormat(TreeNode root) {
    LinkedList<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int curSize = queue.size();
        for (int i = 0; i < curSize; i++) {
            TreeNode polled = queue.poll();
            System.out.print(polled + " ");
            
            if (polled.left != null) {
                queue.offer(polled.left);
            }
            if (polled.right != null) {
                queue.offer(polled.right);
            }
        }
        System.out.println();
    }
}
```

# Binary Tree Zigzag Level Order Traversal

[Problem Description](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/description/)

[Explain](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=117)

```java
/**
 * This method performs a zigzag level order traversal of a binary tree.
 * It uses a breadth-first search (BFS) strategy, with a queue to keep track of nodes at each level.
 * The zigzag pattern is achieved by using a flag 'isOdd' that alternates at each level.
 * If 'isOdd' is true, we add the node's value at the end of the list; if it's false, we add at the beginning.
 * This results in a left-to-right order for odd-numbered levels and right-to-left for even-numbered levels.
 *
 * @param root The root node of the binary tree.
 * @return A list of lists of Integers representing the zigzag level order traversal of the tree.
 */
public static List<List<Integer>> zigzagLevelOrder(TreeNode root) {
    // Initialize the list to hold each level's nodes
    List<List<Integer>> level1 = new ArrayList<>();
    // If the tree is empty, return the empty list
    if (root == null) {
        return level1;
    }

    // Initialize the queue and offer the root node to it
    LinkedList<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    // Initialize the flag for checking the level order (odd or even)
    boolean isOdd = true;

    // Continue until the queue is empty
    while (!queue.isEmpty()) {
        // Initialize the list to hold the current level's nodes
        LinkedList<Integer> level2 = new LinkedList<>();
        // Get the number of nodes in the current level
        int curSize = queue.size();

        // Process each node in the current level
        for (int i = 0; i < curSize; i++) {
            // Pop a node from the front of the queue
            TreeNode node = queue.pop();
            
            // Check the level order and add the node's value to the level list accordingly
            if (isOdd) {
                level2.addLast(node.val);
            } else {
                level2.addFirst(node.val);
            }

            // If the node has a left child, offer it to the queue
            if (node.left != null) {
                queue.offer(node.left);
            }
            // If the node has a right child, offer it to the queue
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
        // Add the current level's nodes to the final list
        level1.add(level2);
        // Flip the level order for the next level
        isOdd = !isOdd;
    }

    // Return the final list of levels
    return level1;
}
```

# Symmetric Tree

[Problem Description](https://leetcode.cn/problems/symmetric-tree/description/)

[Explain](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=153&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static boolean isSymmetric(TreeNode root) {
    return check(root.left, root.right);
}

public static boolean check(TreeNode l, TreeNode r) {
    if (l == null && r == null) {
        return true;
    }
    if (l == null || r == null || l.val != r.val) {
        return false;
    }
    return check(l.left, r.right) && check(l.right, r.left);
}
```

# Maximum Depth of Binary Tree

[Explain](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=154&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int maxDepth(TreeNode root) {
    if (root == null) {
        return 0;
    }
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
```

# Maximum Depth of Binary Tree

[Explain](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=155&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int maxDepth(TreeNode root) {
    TreeNode cur = root;
    TreeNode pop = null;
    LinkedList<TreeNode> stack = new LinkedList<>();
    int depth = 0;
    while (cur != null || !stack.isEmpty()) {
        if (cur != null) {
            stack.push(cur);
            maxDepth = Math.max(maxDepth, stk.size());
            cur = cur.left;
        } else {
            TreeNode par = stack.peek();
            if (par.right == null) {
                pop = stack.pop();
            }
            else if (par.right == pop) {
                pop = stack.pop();
            }
            else {
                cur = par.right;
            }
        }
    }
    return depth;
}
```

# Maximum Depth of Binary Tree

[Explain](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=156&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int maxDepth(TreeNode root) {    
    LinkedList<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    int depth = 0;
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
        depth++;
    }
    return depth;
}
```

# Minimum Depth of Binary Tree

```java
public static int minDepth(TreeNode node) {
    if (node == null) {
        return 0;
    }
    if (node.left == null) {
        return minDepth(node.right) + 1;
    }
    if (node.right == null) {
        return minDepth(node.left) + 1;
    }
    return Math.min(minDepth(node.left), minDepth(node.right)) + 1;
}
```

# Minimum Depth of Binary Tree

[Explain](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=157&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int minDepth(TreeNode node) {
    if (node == null) {
        return 0;
    }
    
    int leftCount = minDepth(node.left);
    int rightCount = minDepth(node.right);
    
    if (leftCount == 0) {
        return rightCount + 1;
    }
    if (rightCount == 0) {
        return leftCount + 1;
    }
    
    return Math.min(leftCount, rightCount) + 1;
}
```

# Minimum Depth of Binary Tree

[Explain](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=157&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static int minDepth(TreeNode root) {
    LinkedList<TreeNode> que = new LinkedList<>();
    que.offer(root);
    int minDepth = 1;
    while (!que.isEmpty()) {
        int size = que.size();
        for (int i = 0; i < size; i++) {
            TreeNode cur = que.poll();
            if (cur.left == null && cur.right == null) {
                return minDepth;
            }
            if (cur.left != null) {
                que.offer(cur.left);
            }
            if (cur.right != null) {
                que.offer(cur.right);
            }
        }
        minDepth++;
    }
    return minDepth;
}
```

# Invert Binary Tree

[Explain](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=158&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static void invertTree(TreeNode node) {
    if (node == null) {
        return;
    }
    
    TreeNode t = node.left;
    node.left = node.right;
    node.right = t;
    
    invertTree(node.left);
    invertTree(node.right);
}
```

# Suffix Expression Tree

[Explain](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=159&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/*
    Suffix Expression
        21-3*

    Suffix Expression Tree
            *
           / \
          -   3
         / \
        2   1
*/
public static TreeNode suffixExpressionTree(String[] tokens) {
    LinkedList<TreeNode> stack = new LinkedList<>();
    
    for (String token : tokens) {
        switch (token) {
            case "+", "-", "*", "/" -> {
                TreeNode<String> node = new TreeNode<>(token);
                node.right = stack.pop();
                node.left = stack.pop();
                stack.push(node);
            }
            default -> {
                stack.push(new TreeNode(token));
            }
        }
    }
    
    return stack.peek();
}

public static void main(String[] args) throws FileNotFoundException, InterruptedException {
    TreeNode root = suffixExpressionTree(new String[]{"2", "1", "-", "3", "*"});
    // Performing a post-order traversal of the suffix expression binary tree to obtain the suffix expression
    BinaryTree.postOrder(root); // 21-3*
}
```

# Construct Binary Tree from Preorder and Inorder Traversal

[Explain](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=160&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static TreeNode buildTree(int[] preOrder, int[] inOrder) { // preOrder = {1, 2, 4, 3, 6, 7}, inOrder = {4, 2, 1, 6, 3, 7}, postOrder = {4, 2, 6, 7, 3, 1}
    if (preOrder.length == 0 || inOrder.length == 0) {
        return null;
    }
    
    TreeNode root = new TreeNode(preOrder[0]); // 1
    
    for (int i = 0; i < inOrder.length; i++) {
        if (inOrder[i] == root.val) {
            int[] leftInOrder = Arrays.copyOfRange(inOrder, 0, i); // {4, 2}
            int[] rightInOrder = Arrays.copyOfRange(inOrder, i + 1, inOrder.length); // {6, 3, 7}
            
            int[] leftPreOrder = Arrays.copyOfRange(preOrder, 1, i + 1); // {2, 4}
            int[] rightPreOrder = Arrays.copyOfRange(preOrder, i + 1, preOrder.length); // {3, 6, 7}
            
            root.left = buildTree(leftPreOrder, leftInOrder);
            root.right = buildTree(rightPreOrder, rightInOrder);
            
            break;
        }
    }
    
    return root;
}
```

# Construct Binary Tree from Inorder and Postorder Traversal

[Explain](https://www.bilibili.com/video/BV1Lv4y1e7HL/?p=161&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
public static TreeNode buildTree(int[] inOrder, int[] postOrder) {
    if (inOrder.length == 0 || postOrder.length == 0) {
        return null;
    }
    
    TreeNode root = new TreeNode(postOrder[postOrder.length - 1]);
    
    for (int i = 0; i < inOrder.length; i++) { // // preOrder = {1, 2, 4, 3, 6, 7}, inOrder = {4, 2, 1, 6, 3, 7}, postOrder = {4, 2, 6, 7, 3, 1}
        if (inOrder[i] == root.val) {
            int[] leftInOrder = Arrays.copyOfRange(inOrder, 0, i); // {4, 2}
            int[] rightInOrder = Arrays.copyOfRange(inOrder, i + 1, inOrder.length); // {6, 3, 7}
            
            int[] leftPostOrder = Arrays.copyOfRange(postOrder, 0, i);
            int[] rightPostOrder = Arrays.copyOfRange(postOrder, i, postOrder.length - 1);
            
            root.left = buildTree(leftInOrder, leftPostOrder);
            root.right = buildTree(rightInOrder, rightPostOrder);
            
            break;
        }
    }
    return root;
}
```

