# Router

Install Vue Router

```shell
npm install -S vue-router@4
```

Create the router instance and set up routes (file: router/index.ts)

```ts
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import User from '@/pages/User.vue'
import Detail from '@/pages/Detail.vue'

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			name: 'home',
			path: '/home',
			component: Home
		},
		{
			name: 'user',
			path: '/user',
			children: [
				{
					name: 'detail',
					path: 'detail',
					component: Detail
				}
			]
		}
	]
})
```

Create pages (file: pages/Home.vue)

```vue
<template>
  <h1>Home Component</h1>
</template>
```

Inject the router, create and mount the root instance. Make sure to inject the router with the router option to make the whole app router-aware.

```ts
import router from '@/router/index'

const app = createApp(App)

app.use(router)

app.mount('#app')
```

RouterView component is used to render the component that corresponds to the current URL. You can place it anywhere in your layout to adapt it to your needs.

RouterLink component is used to create navigational links in your application. Instead of using regular link tags. This allows Vue Router to change the URL without reloading the page.

```vue
<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
<RouterLink to="/home" active-class="active">home</RouterLink>
<RouterLink to="/user/detail" active-class="active">detail</RouterLink>
<RouterLink :to="{name: 'home'}">home</RouterLink>
<RouterLink :to="{path: '/home'}">home</RouterLink>
<RouterView></RouterView>
</template>

<style lang="scss" scoped></style>
```

# Router Mode

Hash Mode: localhost:8080/#/home/message/detail

This is the default mode for Vue Router. It uses a URL hash to simulate a full URL, ensuring that the page won’t be reloaded when the URL changes. This mode uses a hash character (#) before the actual URL that is internally passed. Because this section of the URL is never sent to the server, it doesn’t require any special treatment on the server level. However, it can negatively impact SEO.

```ts
export default createRouter({
  history: createWebHashHistory()
})
```

History Mode: localhost:8080/home/message/detail

To get rid of the hash, we can use the router’s history mode, which leverages the history.pushState API to achieve URL navigation without a page reload. When using createWebHistory(), the URL will look normal, e.g. https://example.com/user/id. However, since our app is a single-page client-side app, without a proper server configuration, the users will get a 404 error if they access https://example.com/user/id directly in their browser. To fix this issue, you need to add a simple catch-all fallback route to your server.

```ts
export default createRouter({
  history: createWebHistory(),
})
```

# Query Parameter

Pass parameter (file: App.vue)

```vue
<RouterLink :to="`/user/detail?id=${user.id}&name=${user.name}`">detail</RouterLink>

<RouterLink :to="{
  path: '/user/detail',
  query: {
    id: user.id,
    name: user.name,
  },
}">detail</RouterLink>
```

Receive parameter (file: Detail.vu)

```ts
import { toRefs } from 'vue'
import { useRoute } from 'vue-router'

let route = useRoute();
let { query } = toRefs(route)
console.log(query);
console.log(query.value.id);
console.log(query.value.name);
```

# Path Parameter

Pass Path Parameter (file: App.vue)

```vue
<RouterLink :to="`/user/detail/${user.id}/${user.name}`">detail</RouterLink>

<RouterLink :to="{
  name: 'detail',
  params: {
    id: user.id,
    name: user.name
  }
}">detail</RouterLink>
```

Receive parameter (file: Detail.vue)

```ts
import { toRefs } from 'vue'
import { useRoute } from 'vue-router'

let route = useRoute();
let { params } = toRefs(route)
console.log(params)
console.log(params.value.id);
console.log(params.value.name);
```

# Router Props

Pass params pamameter (file: router/index.ts)

```ts
{
  name: 'detail',
  path: 'detail',
  component: Detail,
  props: true
}
```

Pass query parameter (file: router/index.ts)

```ts
{
  name: 'detail',
  path: 'detail',
  component: Detail,
  props(route) {
    return route.query
  }
}
```

Receive parameter

```ts
defineProps(['id', 'name'])
```

# History

Push mode pushes a new entry into the history stack, so when the user clicks the browser back button they will be taken to the previous URL.

```vue
<RouterLink to="/home">home</RouterLink>
```

Replace mode navigates without pushing a new history entry, as its name suggests, it replaces the current entry. This is useful when you want to replace the current location instead of adding a new record to the history stack.

```vue
<RouterLink replace to="/home">home</RouterLink>
```

# Programmatic Navigation

```ts
import { useRouter } from 'vue-router'

const router = useRouter()

// literal string path
router.push('/users/eduardo')
router.replace('/users/eduardo')

// object with path
router.push({ path: '/users/eduardo' })

// named route with params to let the router build the url
router.push({ name: 'user', params: { username: 'eduardo' } })

// with query, resulting in /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// with hash, resulting in /about#team
router.push({ path: '/about', hash: '#team' })
```

