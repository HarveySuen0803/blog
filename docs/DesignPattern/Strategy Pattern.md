# Strategy Pattern

```java
public class Main {
    public static void main(String[] args) {
        NumberSorter sorter = new NumberSorter(new BubbleSortStrategy());
        
        sorter.sort(new int[]{5, 1, 3, 2, 4});
        
        sorter.setStrategy(new QuickSortStrategy());
        sorter.sort(new int[]{5, 1, 3, 2, 4});
        
        sorter.setStrategy(new BubbleSortStrategy());
        sorter.sort(new int[]{5, 1, 3, 2, 4});
    }
}

interface SortingStrategy {
    int[] sort(int[] numbers);
}

class QuickSortStrategy implements SortingStrategy {
    public int[] sort(int[] numbers) {
        return numbers;
    }
}

class BubbleSortStrategy implements SortingStrategy {
    public int[] sort(int[] numbers) {
        return numbers;
    }
}

class NumberSorter {
    private SortingStrategy strategy;
    
    public NumberSorter(SortingStrategy strategy) {
        this.strategy = strategy;
    }
    
    public int[] sort(int[] numbers) {
        return strategy.sort(numbers);
    }
}
```

