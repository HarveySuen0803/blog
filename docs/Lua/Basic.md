# Basic

```lua
-- local variable
local str = 'hello world'
print(str) -- hello world
print(type(str)) -- string
print(nil) -- nil
print(type(a) == 'nil') -- true
print(not(str)) -- true

-- global variable
arr = {'a', 'b', 'c'}
obj = {
    name = 'harvey',
    age = 18
}

for idx, val in ipairs(arr) do
    print(idx, val)
end

for key, val in pairs(obj) do
    print(key, val)
end

local function add(num1, num2)
    return num1 + num2;
end

local res = add(10, 20)

if not(nil) then
    return 0
end

if num1 == 10 and num2 == 20 then
    print("...")
elseif num1 == 10 or num2 == 20 then
    print("...")
else
    print("...")
end
```

