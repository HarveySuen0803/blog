成功状态码:

- 200 OK: 请求成功，并返回所请求的数据。
- 201 Created: 请求成功，并在服务器上创建了新的资源。
- 202 Accepted: 请求已接受，但尚未处理。
- 204 No Content: 请求成功，但没有返回任何内容。

客户端错误状态码:

- 400 Bad Request: 请求无效，服务器无法理解请求。
- 401 Unauthorized: 需要身份验证。用户未进行身份验证或身份验证失败。
- 403 Forbidden: 服务器理解请求，但拒绝执行。
- 404 Not Found: 请求的资源不存在。
- 405 Method Not Allowed: 请求方法不被允许。
- 406 Not Acceptable: 请求的资源的内容特性无法满足请求头中的条件。
- 409 Conflict: 请求与服务器的当前状态冲突。
- 410 Gone: 请求的资源已永久删除。
- 422 Unprocessable Entity: 请求格式正确，但由于语义错误导致无法处理。
- 429 Too Many Requests: 用户在给定的时间内发送了太多的请求。

服务器错误状态码:

- 500 Internal Server Error: 服务器遇到未预料的情况，无法完成请求。
- 501 Not Implemented: 服务器不支持实现请求所需的功能。
- 502 Bad Gateway: 作为网关或代理工作的服务器收到无效响应。
- 503 Service Unavailable: 服务器暂时无法处理请求，通常是由于过载或维护。
- 504 Gateway Timeout: 作为网关或代理工作的服务器未及时从上游服务器收到请求。