# Graph

```java
public class Vertex {
    String name;
    List<Edge> edges;
    
    boolean isVisited = false; // A flag to check if the vertex has been visited
    int inDegree; // The in-degree of the vertex (number of edges directed to the vertex)
    int status; // The status of the vertex (0: unvisited; 1: visiting; 2: visited)
    
    int dist = INF; // The shortest distance from the source vertex to this vertex
    static final Integer INF = Integer.MAX_VALUE; // A constant representing infinity
    Vertex prev; // The previous vertex in the shortest path from the source to this vertex

    public Vertex(String name) {
        this.name = name;
    }
    
    // Used for FloydWarshall    
    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        
        if (obj == null || obj.getClass() != this.getClass()) {
            return false;
        }
        
        return Objects.equals(((Vertex) obj).name, this.name);
    }
    
    // Used for FloydWarshall    
    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }
}
```

```java
public class Edge {
    Vertex linked;
    int weight;
    
    public Edge(Vertex linked) {
        this(linked, 1);
    }
    
    public Edge(Vertex linked, int weight) {
        this.linked = linked;
        this.weight = weight;
    }
}
```

```java
public static void main(String[] args) {
    Vertex v1 = new Vertex("1");
    Vertex v2 = new Vertex("2");
    Vertex v3 = new Vertex("3");
    Vertex v4 = new Vertex("4");
    Vertex v5 = new Vertex("5");
    Vertex v6 = new Vertex("6");
    
    v1.edges = List.of(new Edge(v2, 7), new Edge(v3, 9), new Edge(v6, 14));
    v2.edges = List.of(new Edge(v4, 15));
    v3.edges = List.of(new Edge(v4, 11), new Edge(v6, 2));
    v4.edges = List.of(new Edge(v5, 6));
    v5.edges = List.of();
    v6.edges = List.of(new Edge(v5, 9));
    
    List<Vertex> graph = new ArrayList<>(List.of(v1, v2, v3, v4, v5, v6));

    // Compute in-degree (number of incoming edges) for each of the vertex present in the DAG
    for (Vertex v : graph) {
        for (Edge edge : v.edges) {
            edge.linked.inDegree++;
        }
    }
}
```

# DFS (Recursive)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=76)

```java
private static void dfs(Vertex v) {
    if (v.isVisited) {
        return;
    }
    
    v.isVisited = true;
    System.out.println(v.name);
    
    for (Edge e : v.edges) {
        dfs(e.linked);
    }
}
```

# DFS (Stack)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=76)

```java
private static void dfs(Vertex v) {
    LinkedList<Vertex> stack = new LinkedList<>();
    stack.push(v);
    
    while (!stack.isEmpty()) {
        Vertex cur = stack.pop();
        if (cur.isVisited) {
            continue;
        }
        
        cur.isVisited = true;
        System.out.println(cur.name);
        
        for (Edge e : cur.edges) {
            cur = e.linked;
            if (!cur.isVisited) {
                stack.push(cur);
            }
        }
    }
}
```

# BFS (Queue)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=77)

```java
private static void bfs(Vertex v) {
    LinkedList<Vertex> queue = new LinkedList<>();
    queue.offer(v);
    
    while (!queue.isEmpty()) {
        Vertex cur = queue.pop();
        if (cur.isVisited) {
            continue;
        }
        
        cur.isVisited = true;
        System.out.println(cur.name);
        
        for (Edge e : cur.edges) {
            queue.offer(e.linked);
        }
    }
}
```

# Topological Sort

[Explain p78, p79, p80](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=78&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

  ```java
/**
 * This method implements the Topological Sort algorithm on a directed graph.
 * Topological Sort for a graph is not possible if the graph is not a Directed Acyclic Graph (DAG).
 * 
 * @param graph The directed graph input as a list of vertices. Each vertex contains a list of edges.
 */
private static void topologicalSort(List<Vertex> graph) {
    // Create a queue and enqueue all vertices with in-degree 0
    LinkedList<Vertex> queue = new LinkedList<>();
    for (Vertex vertex : graph) {
        if (vertex.inDegree == 0) {
            queue.offer(vertex);
        }
    }
    
    // Loop until queue is empty
    while (!queue.isEmpty()) {
        // Pop front node from queue and print it
        Vertex cur = queue.poll();
        System.out.println(cur.name);
        
        // Iterate through all its neighbouring nodes of dequeued node u and decrease their in-degree by 1
        for (Edge edge : cur.edges) {
            edge.linked.inDegree--;
            // If in-degree of a node becomes 0, add it to the queue
            if (edge.linked.inDegree == 0) {
                queue.offer(edge.linked);
            }
        }
    }
    
    // Check if there was a cycle
    for (Vertex vertex : graph) {
        if (vertex.inDegree != 0) {
            System.out.println("There exists a cycle in the graph");
            return;
        }
    }
}
```

# Topological Sort (DFS)

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=80&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This method performs a topological sort on a directed acyclic graph (DAG).
 * The core idea of the algorithm is to perform a depth-first search (DFS) on the graph,
 * pushing vertices onto a stack in the post-order, which results in a topological order.
 *
 * @param graph The input graph represented as a list of vertices.
   */
private static void topologicalSort(List<Vertex> graph) {
    // Use a stack to store the vertices in topological order
    LinkedList<Vertex> stack = new LinkedList<>();
    
    // Visit all the vertices
    for (Vertex vtx : graph) {
        dfs(vtx, stack);
    }
    
    // Print the vertices in topological order
    for (Vertex vtx : stack) {
        System.out.println(vtx);
    }
}

/**
 * This method performs a depth-first search (DFS) on a vertex and its adjacent vertices.
 * It also checks for cycles in the graph. If a cycle is detected, it throws a RuntimeException.
 *
 * @param vtx   The vertex to perform the DFS on.
 * @param stack The stack to push the vertex onto after all its adjacent vertices have been visited.
 */
private static void dfs(Vertex vtx, LinkedList<Vertex> stack) {
    // If the vertex is already visited, then return
    if (vtx.status == 2) {
        return;
    }
    
    // If the vertex is being visited, then there is a cycle, it means we've come back to it before finishing its adjacent vertices
    if (vtx.status == 1) {
        throw new RuntimeException("Cycle detected!");
    }
    
    // Mark the vertex as being visited
    vtx.status = 1;
    
    // Visit all the adjacent vertices
    for (Edge edge : vtx.edges) {
        dfs(edge.linked, stack);
    }
    
    // Mark the vertex as visited
    vtx.status = 2;
    
    // Push the vertex onto the stack after all its adjacent vertices have been visited
    stack.push(vtx);
}
```

# Dijkstra

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=84&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This method implements Dijkstra's algorithm which is a shortest path algorithm for a graph with non-negative edge path costs.
 * The algorithm works by maintaining a priority queue of vertices, ordered by their distance from the source vertex.
 * It repeatedly selects the vertex with the smallest distance and relaxes all of its outgoing edges.
 *
 * @param src  The source vertex from where we start the algorithm.
 * @param graph The graph represented as a list of vertices.
 */
private static void dijkstra(Vertex src, List<Vertex> graph) {
    // Initialize a priority queue to hold the vertices, which are prioritized by their distance values.
    PriorityQueue<Vertex> heap = new PriorityQueue<>(Comparator.comparingInt(v -> v.dist));
    
    // Set the distance of the source vertex to 0.
    src.dist = 0;
    heap.offer(src);

    // Process the vertices in the queue until it's empty.
    while (!heap.isEmpty()) {
        // Get the vertex with the smallest distance
        Vertex cur = heap.poll();
        // Mark the current vertex as visited
        cur.isVisited = true;
        // Iterate over each edge of the current vertex.
        for (Edge edge : cur.edges) {
            // Get the neighbor vertex at the other end of the edge.
            Vertex nbr = edge.linked;
            // If the new calculated distance is less than the neighbor's current distance, update it
            if (!nbr.isVisited && nbr.dist > cur.dist + edge.wt) {
                nbr.dist = cur.dist + edge.wt;
                // Set the current vertex as the predecessor of the neighbor vertex
                nbr.prev = cur;
                // Add the neighbor vertex back to the queue to adjust its position according to the new distance
                heap.add(nbr);
            }
        }
    }

    // Print the shortest path from the source to each vertex
    for (Vertex v : graph) {
        System.out.println((v.prev != null ? v.prev.name : "null") + " -> " + v.name + ": " + v.dist);
    }
}
```

# BellmanFord

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=85&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * The Bellman-Ford algorithm is used to find the shortest path from a source vertex to all other vertices in a weighted graph.
 * It can handle negative weight edges and can detect negative weight cycles.
 * 
 * @param src The source vertex from which the shortest path to all other vertices is calculated.
 * @param graph The graph represented as a list of vertices.
 * @throws RuntimeException if there is a negative weight cycle in the graph.
 */
private static void bellmanFord(Vertex src, List<Vertex> graph) {
    // Initialize the distance from the source vertex to itself as 0
    src.dist = 0;
    
    // Relax all edges |V| - 1 times where |V| is the number of vertices in the graph
    for (int i = 0; i < graph.size() - 1; i++) {
        // For each vertex in the graph
        for (Vertex cur : graph) {
            // For each edge of the current vertex
            for (Edge edge : cur.edges) {
                Vertex nbr = edge.linked;
                if (cur.dist + edge.weight < nbr.dist) {
                    nbr.dist = cur.dist + edge.weight;
                    nbr.prev = cur;
                }
            }
        }
    }
    
    // Check for negative weight cycles
    for (Vertex cur : graph) {
        for (Edge edge : cur.edges) {
            Vertex nbr = edge.linked;
            // If we can still relax the edges, then we have a negative weight cycle
            if (cur.dist + edge.weight < nbr.dist) {
                throw new RuntimeException("Negative weight cycle detected");
            }
        }
    }
    
    // Print all vertices and their shortest path from the source vertex
    for (Vertex v : graph) {
        System.out.println(v);
    }
}
```

# Floyd Warshall

[Explain 87, 88, 89, 90, 91](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=87&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * The Floyd-Warshall algorithm is used to find the shortest paths between all pairs of vertices in a graph.
 * It works with both positive and negative edge weights, as well as directed and undirected graphs.
 * However, it does not work with graphs that contain negative cycles.
 *
 * The algorithm works by iteratively improving an estimate on the shortest path between two vertices,
 * until the estimate is optimal.
 *
 * @param graph The graph represented as a list of vertices.
 */
private static void floydWarshall(List<Vertex> graph) {
    int size = graph.size();
    // dist[i][j] will hold the shortest distance from vertex i to vertex j
    int[][] dist = new int[size][size];
    // prev[i][j] will hold the vertex visited before reaching vertex j when starting at vertex i
    Vertex[][] prev = new Vertex[size][size];

    // Initialize dist and prev arrays
    for (int i = 0; i < size; i++) {
        Vertex v = graph.get(i);
        Map<Vertex, Integer> map = v.edges.stream().collect(Collectors.toMap(e -> e.linked, e -> e.weight));
        for (int j = 0; j < size; j++) {
            Vertex u = graph.get(j);
            if (v == u) {
                // The distance from any vertex to itself is 0
                dist[i][j] = 0;
            } else {
                // If vertex u is reachable from v, we use the weight of the edge, otherwise we use infinity
                dist[i][j] = map.getOrDefault(u, Integer.MAX_VALUE);
                // If vertex u is reachable from v, we set prev[i][j] to v, otherwise we set it to null
                prev[i][j] = map.get(u) != null ? v : null;
            }
        }
    }

    // Main loop of the algorithm
    for (int k = 0; k < size; k++) {
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                // If there is no path from i to k or from k to j, we skip this iteration
                if (dist[i][k] == Integer.MAX_VALUE || dist[k][j] == Integer.MAX_VALUE) {
                    continue;
                }
                // If the path from i to j through k is shorter than the current shortest path from i to j,
                // we update the shortest path and set prev[i][j] to prev[k][j]
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    prev[i][j] = prev[i][k];
                }
            }
        }
    }
    
    // Negative cycle detection
    // If the shortest path from a vertex to itself is negative, then there exists a negative cycle
    // This is because the shortest path from a vertex to itself should always be 0 in a graph without negative cycles
    // A negative value indicates that we can keep traversing the cycle to decrease the total cost, which is the characteristic of a negative cycle
    for (int i = 0; i < size; i++) {
        if (dist[i][i] < 0) {
            throw new IllegalArgumentException("The graph contains a negative cycle");
        }
    }

    // Print the shortest distances, the previous vertices and the shortest paths
    printDist(dist);
    printPrev(prev);
    printPath(prev, graph);
}

/**
 * Prints the shortest distances between all pairs of vertices.
 *
 * @param dist The matrix of shortest distances.
 */
private static void printDist(int[][] dist) {
    for (int[] row : dist) {
        for (int col : row) {
            System.out.print(col + " ");
        }
        System.out.println();
    }
}

/**
 * Prints the vertex visited before reaching each vertex.
 *
 * @param prev The matrix of previous vertices.
 */
private static void printPrev(Vertex[][] prev) {
    for (Vertex[] row : prev) {
        System.out.println(Arrays.stream(row).map(v -> v == null ? "null" : v.name).map(s -> String.format("%5s", s)).collect(Collectors.joining(",", "[", "]")));
    }
}

/**
 * Prints the shortest paths between all pairs of vertices.
 *
 * @param prev The matrix of previous vertices.
 * @param graph The graph represented as a list of vertices.
 */
private static void printPath(Vertex[][] prev, List<Vertex> graph) {
    for (int i = 0; i < graph.size(); i++) {
        for (int j = 0; j < graph.size(); j++) {
            LinkedList<String> stack = new LinkedList<>();
            System.out.print("[" + graph.get(i).name + ", " + graph.get(j).name + "] ");
            stack.push(graph.get(j).name);
            while (i != j) {
                Vertex p = prev[i][j];
                stack.push(p.name);
                j = graph.indexOf(p);
            }
            System.out.println(stack);
        }
    }
}
```

# Prim

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=92)

```java
/**
 * Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a connected weighted undirected graph.
 * It finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized.
 * This function implements Prim's algorithm.
 *
 * @param src The source vertex from where the algorithm starts.
 * @param graph The graph represented as a list of vertices.
 */
private static void prim(Vertex src, List<Vertex> graph) {
    src.dist = 0;
    PriorityQueue<Vertex> heap = new PriorityQueue<>(Comparator.comparingInt((v) -> v.dist));
    for (Vertex vtx : graph) {
        heap.offer(vtx);
    }
    
    while (!heap.isEmpty()) {
        Vertex cur = heap.poll();
        for (Edge edge : cur.edges) {
            Vertex nbr = edge.linked;
            // If nbr is still in heap and the edge weight is smaller than nbr.dist
            if (heap.contains(nbr) && edge.wt < nbr.dist) {
                heap.remove(nbr);
                nbr.dist = edge.wt;
                nbr.prev = cur;
                heap.offer(nbr);
            }
        }
    }
}
```

# Kruskal

[Explain](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=93&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

```java
/**
 * This method implements Kruskal's algorithm. Kruskal's algorithm is a minimum-spanning-tree algorithm which finds an edge of the least possible weight that connects any two trees in the forest.
 * It is a greedy algorithm in graph theory as it finds a minimum spanning tree for a connected weighted graph adding increasing cost arcs at each step.
 * This means it finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized.
 * If the graph is not connected, then it finds a minimum spanning forest (a minimum spanning tree for each connected component).
 *
 * @param queue PriorityQueue of edges sorted by weight
 * @param size  Number of vertices in the graph
 */
public static void kruskal(PriorityQueue<Edge> heap, int size) {
    // List to store the resultant MST
    List<Edge> edges = new ArrayList<>();
    // Create disjoint sets
    DisjointSet set = new DisjointSet(size);
    
    while (!heap.isEmpty()) {
        Edge edge = heap.poll();
        // Check if the vertices of the edge are in the same set
        if (set.findRoot(edge.srt) != set.findRoot(edge.end)) {
            // Add the edge to the MST
            edges.add(edge);
            // Merge the sets
            set.union(edge.srt, edge.end);
        }
    }
    
    // Print the edges of the MST
    for (Edge edge : edges) {
        System.out.println(edge);
    }
}

public static class Edge implements Comparable<Edge> {
    // Weight of the edge
    public int wt;
    // List of vertices
    public List<Vertex> vlist;
    // Starting vertex of the edge
    public int srt;
    // Ending vertex of the edge
    public int end;
    
    public Edge(List<Vertex> vlist, int srt, int end, int wt) {
        this.vlist = vlist;
        this.srt = srt;
        this.end = end;
        this.wt = wt;
    }
    
    @Override
    public int compareTo(Edge e) {
        return Integer.compare(this.wt, e.wt);
    }
    
     @Override
    public String toString() {
        return vlist.get(srt).name + " <-> " + vlist.get(end).name + " (" + wt + ")";
    }
}

public static void main(String[] args) {
    Vertex v1 = new Vertex("v1");
    Vertex v2 = new Vertex("v2");
    Vertex v3 = new Vertex("v3");
    Vertex v4 = new Vertex("v4");
    Vertex v5 = new Vertex("v5");
    Vertex v6 = new Vertex("v6");
    Vertex v7 = new Vertex("v7");
    List<Vertex> vlist = List.of(v1, v2, v3, v4, v5, v6, v7);
    
    PriorityQueue<Edge> queue = new PriorityQueue<>(List.of(
        new Edge(vlist, 0, 1, 2),
        new Edge(vlist, 0, 2, 4),
        new Edge(vlist, 0, 3, 1),
        new Edge(vlist, 1, 3, 3),
        new Edge(vlist, 1, 4, 10),
        new Edge(vlist, 2, 3, 2),
        new Edge(vlist, 2, 5, 5),
        new Edge(vlist, 3, 4, 7),
        new Edge(vlist, 3, 5, 8),
        new Edge(vlist, 3, 6, 4),
        new Edge(vlist, 4, 6, 6),
        new Edge(vlist, 5, 6, 1)
    ));
    
    kruskal(queue, vlist.size());
}
```

# DisjointSet (Union by Size)

[Explain p94, p95, p96, p97](https://www.bilibili.com/video/BV1rv4y1H7o6/?p=94)

```java
/**
 * This class represents a disjoint-set data structure, also known as a union-find data structure.
 * It provides operations for union and find, and is used to determine and manipulate 
 * the connected components of a graph.
 */
public class DisjointSet {
    // The parent array represents the parent node of each element in the set
    int[] pars;
    // The size array keeps track of the size of each set
    int[] size;
    
    public DisjointSet(int cap) {
        this.pars = new int[cap];
        this.size = new int[cap];
        for (int i = 0; i < cap; i++) {
            // Each element is initially in its own set
            pars[i] = i;
            // The size of each set is initially 0
            size[i] = 0;
        }
    }
    
    /**
     * Find the root of the set that i belongs to
     */
    public int findRoot(int i) {
        // If the parent of i is not i, then i is not the root of its set
        if (pars[i] != i) {
            // Find the root of the set that i belongs to
            pars[i] = findRoot(pars[i]);
        }
        return pars[i];
    }
    
    /**
     * Merge the sets that i and j belong to
     */
    public void union(int i, int j) {
        // Find the root of the set that i belongs to
        int iRoot = findRoot(i);
        int jRoot = findRoot(j);
        
        // If i and j are already in the same set, then do nothing
        if (iRoot == jRoot) {
            return;
        }
        
        // If i and j are not in the same set, then merge the two sets
        if (size[iRoot] < size[jRoot]) {
            // Make the smaller set's representative point to the larger set's
            pars[iRoot] = jRoot;
            // Update the size of the new set
            size[jRoot] += size[iRoot];
        } else {
            pars[jRoot] = iRoot;
            size[iRoot] += size[jRoot];
        }
    }

    @Override
    public String toString() {
        return Arrays.toString(parent);
    }

    public static void main(String[] args) {
        DisjointSet set = new DisjointSet(5);
        set.union(1, 2);
        set.union(3, 4);
        set.union(1, 3);
        System.out.println(set);
        
        set.union(1, 0);
        System.out.println(set);
    }
}
```
