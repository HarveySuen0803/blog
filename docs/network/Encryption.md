### Encryption

在网络传输中，加密算法主要用于保护数据的机密性、完整性和真实性。常见的加密算法分为对称加密和非对称加密。

### Symmetric Key Cryptography

对称加密的关键动作：

- 密钥生成：加密和解密使用相同的密钥。发送方和接收方需要事先共享这个密钥。
- 加密：发送方使用密钥和加密算法（如AES、DES）对明文数据进行加密，生成密文。
- 传输：发送方将密文通过网络传输给接收方。
- 解密：接收方收到密文后，使用相同的密钥和解密算法将密文还原为明文。

对称加密的优点：

- 速度快：对称加密算法通常计算量较小，处理速度较快，适合大数据量的加密。
- 实现简单：算法简单，易于实现和部署。

对称加密的缺点：

- 密钥管理困难：需要在通信双方之间安全地共享和管理密钥，尤其在大规模网络中，密钥管理变得复杂。
- 密钥泄露风险高：如果密钥被第三方获取，所有使用该密钥加密的数据都可能被破解。

对称加密的算法都要内置在客户端和服务端，而常见的服务端程序都是开源的，比如 Nignx 就是开源的，所以算法也是公开的，无法保障安全，秘钥需要通过网络传输，非常的不安全。

### Asymmetric Key Cryptography

非对称加密的关键动作：

- 密钥对生成：每个用户生成一对密钥，公钥和私钥。公钥公开，私钥保密。
- 公钥加密：发送方使用接收方的公钥对明文数据进行加密，生成密文。
- 私钥加密：用于数字签名，发送方使用自己的私钥对明文进行加密，生成签名。
- 传输：发送方将密文（和签名）通过网络传输给接收方。
- 私钥解密：接收方使用自己的私钥对密文进行解密，还原明文。
- 公钥解密：接收方使用发送方的公钥验证签名，确保数据的完整性和发送方的身份。
- 生成签名：发送方使用自己的私钥对明文的哈希值进行加密。
- 验证签名：接收方使用发送方的公钥对数字签名进行解密，得到发送方生成的哈希值。接收方将自己生成的哈希值与解密得到的哈希值进行比较。如果两者一致，则验证通过，数据未被篡改且确实来自发送方。

非对称加密的流程：

- A 和 B 互为发送方和接收方，A 和 B 都需要生成一对公钥和私钥，分别是 PubA, PrvA, PubB, PrvB。
- A 准备一条消息 M（例如 "Hello, B!"）。
- A 对 M 进行哈希计算，得到一个固定长度的哈希值 H(M) = 0x1234abcd...
- A 使用自己的私钥 PrvA 对 H(M) 进行加密，生成数字签名 SigA = Encrypt(PrivA, H(M)) = 0x5678efgh...。
- A 将明文消息 M 和数字签名 SigA 打包成一个消息包 {M, SigA}
- A 使用 PubB 对消息包加密，生成密文 Encrypted_Message = Encrypt(PubB, {"Hello, B!", 0x5678efgh...})，并发送给 B。
- B 使用 PrvB 对秘文解密，得到消息包 {M, SigA} = Decrypt(PrvB, Encrypted_Message)
- B 使用 PubA 对 SigA 进行解密，得到 H(M) = Decrypt(PubA, SigA) = 0x1234abcd...
- B 对 M 进行哈希计算，得到 H'(M)，再对比 H'(M) 和 H(M)，验证是否发生篡改。

非对称加密的优点：

- 密钥管理方便：无需共享私钥，公钥可以公开，私钥保密，解决了对称加密的密钥分发问题。
- 安全性高：即使公钥被泄露，私钥仍然是安全的，通信的机密性和完整性能够得到保障。

非对称加密的缺点：

- 速度慢：非对称加密算法计算复杂，处理速度较慢，不适合大数据量的加密。
- 实现复杂：算法复杂，实现和部署难度较大。

非对称加密的问题：

- 攻击端依旧可以伪造服务方，发送假公钥给客户端，让客户端和服务端进行交互，攻击端再去跟服务端进行交互，所以只靠非对称加密无法保证安全，还是需要借助 TLS 来保障安全。

### TLS

HTTPS（HyperText Transfer Protocol Secure）使用 TLS（Transport Layer Security）或其前身 SSL（Secure Sockets Layer）协议来加密HTTP通信。HTTPS的凭证主要是数字证书，通常由受信任的证书颁发机构（CA）签发。

数字证书在 HTTPS 中起到以下几个重要作用：

- 验证服务器身份：确保客户端（浏览器）连接的是合法的服务器，而不是冒充的服务器。
- 加密通信：提供服务器的公钥，用于在 TLS 握手过程中加密会话密钥，从而确保通信的机密性。

数字证书通常包含以下信息：

- 证书持有者信息：包括域名、组织名称等。
- 公钥：用于加密通信的公钥。
- 证书颁发机构信息：签发该证书的CA的信息。
- 有效期：证书的有效期起始和结束日期。
- 数字签名：CA对证书内容的数字签名，确保证书的完整性和真实性。

TLS 通信的流程：

- 服务器生成一对公钥和私钥。公钥用于加密数据，私钥用于解密数据。
- 服务器将公钥和其他信息（如域名、组织信息）包含在证书签名请求（CSR）中，提交给证书颁发机构（CA）。
- CA 使用自己的私钥对服务器的公钥和其他信息进行签名，生成数字证书（Certification）。
- CA 将签名后的数字证书返回给服务器。这个证书包含服务器的公钥、服务器信息和CA的签名。
- 服务器在 TLS 握手过程中将数字证书发送给客户端。
- 客户端使用 CA 的公钥对数字证书进行解码（验证CA的签名），以确保证书的真实性和完整性。如果验证通过，客户端从证书中提取服务器的公钥。
- 客户端使用服务器的公钥加密会话密钥，并发送给服务器。服务器使用自己的私钥解密会话密钥。之后，客户端和服务器使用对称加密（会话密钥）进行安全通信。

TLS 是如何方法攻击端冒充服务器的：

- 假设黑客拦截了服务器发送给客户端的数字证书。黑客可以使用 CA 的公钥解码证书，但无法伪造证书，因为没有 CA 的私钥。黑客也没有服务器的私钥，无法解密客户端加密的会话密钥。
- 如果黑客试图伪造证书并发送给客户端，客户端会使用 CA 的公钥进行验证。由于伪造的证书没有 CA 的签名，验证会失败，客户端拒绝通信。
