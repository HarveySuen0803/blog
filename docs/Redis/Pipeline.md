# pipeline

pipeline

- 类似于 batch operation (eg. mset, mget), 可以一次发送 multi commands 给 server, server 依次执行完 command, 返回一个 response, 减少 communication time, 降低 communication postpone, 通过 queue, 保证 command 的 execution order
- 如果 execution process 发生 exception, 会继续执行 command, 不保证 atomic
- client 发送过多 command, 会导致 server block, server 需要回复一个 queue message, 占用太多, 建议控制在 10k 以内的 command

pipeline VS batch operation VS transaction

- pipeline 是 non-atomic, batch operation 是 atomic
- pipeline 可以执行 multi-type command, batch operation 只能执行 single-type command

pipeline VS transaction

- pipeline 是 non-atomic, transaction 是 atomic
- pipeline 是 multi-command execution, transaction 是 single-commmand execution
- pipeline 不会堵塞 other command, transaction 会堵塞 other command

set command file (file. cmd.txt)

```shell
set k1 100
set k2 200
set k3 300
```

execute command file by pipeline

```shell
cat ./redis-test | redis-cli -h 192.168.10.11 -p 6379 -a 111 --pipe
```

