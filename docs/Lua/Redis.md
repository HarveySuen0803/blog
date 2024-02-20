# Redis

```lua
redis.call('set', 'k1', 'v1')

local k1 = redis.call('get', 'k1')

return k1
```

Redis 执行 Lua Script.

```
eval "return redis.call('set', 'k1', 'v1')" 0

eval "return redis.call('set', KEYS[1], ARGV[1])" 1 k1 v1
```