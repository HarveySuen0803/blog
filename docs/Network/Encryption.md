# Symmetric Key Cryptography

Client 通过 Secret Key 对 Plaintext 进行 Encode 得到 Ciphertext, 发送给 Server

Server 通过 Secret Key 对 Ciphertext 进行 Decode 得到 Plaintext

Algo 必须内置在 Client 和 Server 中, 而 Nginx 又是 Open Source, 所以 Algo 也是公开的, 无法保障安全, Secret Key 需要通过 Network 传输, 也不安全

# Asymmetric Key Cryptography

Client 访问 Server, Server 生成 Public Key 返回给 Client

Client 通过 Publich Key 进行 Encode, 发送给 Server, Server 通过 Private Key 进行 Decode 得到 Plaintext

Server 通过 Private Key 进行 Encode, 发送给 Client, Client 通过 Private Key 进行 Decode 得到 Plaintext

Public Key 通过 Network 传输, Private Key 保存在 Server 不丢失

Hacker 无法伪造 Client 通过 Publich Key 进行 Decode

Hacker 伪造 Server, 发送 Fake Public Key 给 Client, 让 Client 和 Hacker 交互, Hacker 再去跟 Server 交互, 所以只靠 Asymmetric Key Cryptography 无法保障安全

# Certification

Server 提交 Public Key 给 Ca 认证, Ca 通过 Publich Key 进行 Encode得到 Certification 返回给 Server, Server 返回 Certification 给 Client

Client 通过 Ca 的 Public Key 对 Certification 进行 Decode 得到 Server 的 Public Key, 再通过 Asymmetric Encryption 和 Server 进行交互

Hacker 拦截到 Server 返回的 Certification 后, 可以通过 Public Key 进行 Decode, 但是没有 Private Key 就无法进行 Encode, 再次发送给 Client 后, Client 无法 Decode, 就会校验失败, 解决了 Hacker 伪造 Server 的问题
