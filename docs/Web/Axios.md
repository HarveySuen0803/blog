# Axios

Install Axios

```shell
npm install -S axios
```

Import Axios

```ts
import axios from 'axios'
```

Use Axios to make HTTP request

```ts
let clickHandle = async () => {
  try {
    let res = await axios.post('/api/login', {
      username: username.value
      password: password.value
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    
    console.log(res.data)
  } catch (err) {
    console.log(err)
  }
}
```

# Interceptor

```java
import axios from 'axios'
import {StorageConstant} from '@/common/constant.ts'

api.defaults.withCredentials = true;

const api = axios.create({
  baseURL: '/api',
  timeout: 5000
})

api.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem("token") || undefined
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    if (response.data.code === 401) {
      router.replace({path: '/login'})
      return Promise.reject(response)
    }
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default api
```

# CORS

In your vite.config.js file, you can define a proxy to handle requests to your API (file: vite.config.js)

```ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    cors: false,
  },
})
```

In your Axios configuration, you should set the baseURL to /api

```ts
import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
  withCredentials: true
})

export default instance
```
