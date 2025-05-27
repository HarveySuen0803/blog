# MarkRange

MarkRange 结构：

```cpp
struct MarkRange
{
    size_t begin;
    size_t end;
}

struct MarkRanges : public std::deque<MarkRange>
{
    using std::deque<MarkRange>::deque;
}
```

数据存储结构：

```
[Part 202401]
  |
  |-- [Granule 0] (8192 rows)  -- Mark 0
  |-- [Granule 1] (8192 rows)  -- Mark 1
  |-- [Granule 2] (8192 rows)  -- Mark 2
  |-- [Granule 3] (8192 rows)  -- Mark 3
  |-- [Granule 4] (8192 rows)  -- Mark 4
```

通过 MarkRange 来表示 Mark 的范围：

```
{
    "MarkRange": {
        "begin": 1,  // 从第1个标记点开始（对应 Granule 1）
        "end": 3     // 到第3个标记点结束（不包含，对应到 Granule 2 结束）
    }
}
```

实际数据范围计算：

```
{
    "数据范围": {
        "起始行": "begin * index_granularity = 1 * 8192 = 8192",
        "结束行": "end * index_granularity = 3 * 8192 = 24576",
        "总行数": "24576 - 8192 = 16384 行"
    }
}
```

实际应用：

```cpp
// 1. 数据过滤
MarkRanges ranges = markRangesFromPKRange(
    part,
    metadata_snapshot,
    key_condition,
    part_offset_condition,
    &exact_ranges,
    settings,
    log
);

// 2. 数据读取
for (const auto & range : ranges)
{
    // 读取从 range.begin 到 range.end 之间的数据
    // 实际读取的行范围是 [range.begin * index_granularity, range.end * index_granularity)
    readRows(range.begin, range.end);
}
```

# RangesInDataPart

RangesInDataPart 结构：

```cpp
struct RangesInDataParts: public std::vector<RangesInDataPart>
{
    using std::vector<RangesInDataPart>::vector; /// NOLINT(modernize-type-traits)
};

struct RangesInDataPart
{
    DataPartPtr data_part;
    AlterConversionsPtr alter_conversions;
    size_t part_index_in_query;
    MarkRanges ranges;
    MarkRanges exact_ranges;
}
```