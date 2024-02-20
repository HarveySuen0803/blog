# Build

```shell
npm install @vue/cli -g
```

```shell
npm i webpack webpack-cli -g
```

```shell
# create project
vue create app
```

```shell
# start service
npm run serve

# build project 这里的内容是这样的, 非常的有意思
npm run build
```

# Components

```html 
<!-- src/components/Footer/index.vue 普通组件一般放在 src/components 下 -->

<template>
    <div class="footer"></div>
</template>
```

```html 
<!-- src/components/Header/index.vue -->

<template>
    <div class="header"></div>
</template>
```

```html
<!-- src/App.vue -->

<template>
    <div id="app">
        <!-- 使用组件 -->
        <Header></Header>
        <Footer></Footer>
    </div>
</template>

<script>
// 引入组件
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
    name: 'App',
    // 配置组件
    components: {
        Header,
        Footer
    },
}
</script>
```

# Global Components

配置全局组件

```html
<!-- src/components/TypeNav/index.vue 全局组件一般都放在 src/components 下 -->

<template>
    <div class="type-nav">TypeNav index</div>
</template>
```

```js
// src/components/index.js

import Vue from "vue";
import TypeNav from "@/components/Home/TypeNav";

// 组件名, 组件
Vue.component(TypeNav.name, TypeNav);
```

全局组件不需要导入, 直接使用 `hello world`

```html
<!-- src/Home/index.vue -->

<template>
    <TypeNav></TypeNav>
</template>
```

# Traverse Components

```html
<!-- src/pages/Home/index.vue -->

<template>
    <div class="home">
        <!-- 遍历 floorList 组件, 同时传递参数给子组件 -->
        <Floor v-for="(floorItem, index) in floorList" :key="floorItem.id" :floorItem="floorItem"></Floor>
    </div>
</template>

<script>
import Floor from "@/pages/Home/Floor";
import {mapActions, mapState} from "vuex";

export default {
    name: "Home",
    components: {
        Floor,
    },
    computed: {
        ...mapState("Home", ["floorList"]),
    },
    methods: {
        ...mapActions("Home", ["getFloorList"])
    },
    mounted() {
        this.getFloorList();
    }
}
</script>
```

```html
<!-- src/pages/Home/Floor/index.vue -->

<template>
    <div class="floor">{{floorItem}}</div>
</template>

<script>
export default {
    name: "Floor",
    // 获取父组件的数据
    props: ["floorItem"],
}
</script>
```

# Declarative Navigation

```html
<!-- src/components/Header/index.vue -->

<template>
    <!-- 导航到 search 路由 -->
    <router-link to="/search">搜索</router-link>

    <!-- 导航到 search 路由, 传递 query 参数 -->
    <router-link v-bind:to="{name: 'search', query: {keyword: keyword}}">搜索</router-link>

    <!-- 导航到 search 路由, 传递 params 参数 -->
    <router-link v-bind:to="{name: 'search', params: {keyword: keyword}}">搜索</router-link>
</template>
```

```html
<!-- src/pages/Search/index.vue -->

<template>
    <div class="search">
        query 参数： {{$route.query.keyword}}
        params 参数: {{$route.params.keyword}}
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route.query.keyword);
        console.log(this.$route.params.keyword);
    }
}
</script>
```

# Programmactic Navigation

传递 query 参数

```js
// src/router/index.js

export default new VueRouter({
    routes: [
        {
            path: "/search",
            component: Search,
            // 指定 name 属性
            name: "search"
        },
    ]
})
```

```html
<!-- src/components/Header/index.vue -->

<template>
    <form action="###" class="searchForm">
        <!-- 绑定 keyword 数据-->
        <input type="text" v-model:value="keyword"/>
        <!-- 绑定 clikc 事件 -->
        <button @click="toSearch">搜索</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            keyword: ""
        }
    },
    methods: {
        toSearch() {
            // 导航到 search 路由, 传递 query 参数 (方法 1) 
            this.$router.push("/search" + "?keyword" + this.keyword);

            // 导航到 search 路由, 传递 query 参数 (方法 2, 推荐)
            this.$router.push({name: "search", query: {keyword: this.keyword}});
            
            // 可以通过 path 形式传递 query 参数
            this.$router.push({path: "/search", query: {keyword: this.keyword}});

            // 防止传递的字符串为空
            this.$router.push({path: "/search", query: {keyword: "" || undefined}});
        }
    }
}
</script>
```

```html
<!-- src/pages/Search/index.vue -->

<template>
    <div class="search">
        query 参数： {{$route.query.keyword}}
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route.query.keyword);
    }
}
</script>
```

传递参数

```js
// src/router/index.js

export default new VueRouter({
    routes: [
        {
            // 传递 params 参数需要指定占位符
            path: "/search/:keyword",
            component: Search,
            // 指定 name 属性
            name: "search"
        },
    ]
})
```

```html
<!-- src/components/Header/index.vue -->

<template>
    <form action="###" class="searchForm">
        <!-- 绑定 keyword 数据-->
        <input type="text" v-model:value="keyword"/>
        <!-- 绑定 clikc 事件 -->
        <button @click="toSearch">搜索</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            keyword: ""
        }
    },
    methods: {
        toSearch() {
            // 导航到 search 路由, 传递 params 参数 (方法 1)
            this.$router.push("/search" + "/" + this.keyword);

            // 导航到 search 路由, 传递 params 参数 (方法 2, 推荐)
            this.$router.push({name: "search", params: {keyword: this.keyword}});
            
            // 不可以通过 path 形式传递 params 参数 
            // this.$router.push({path: "/search", params: {keyword: this.keyword}})
            
            // 给 path: "/search/:keyword" 添加一个 "?", 变成 path: "/search/:keyword?" 后, params 参数就可传可不传了
            this.$router.push({path: "/search"})

            // 防止传递的字符串为空
            this.$router.push({path: "/search", params: {keyword: "" || undefined}});
        }
    }
}
</script>
```

```html
<!-- src/pages/Search/index.vue -->

<template>
    <div class="search">
        params 参数: {{$route.params.keyword}}
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route.params.keyword);
    }
}
</script>
```

# Hide Router

> Method 1

```html
<!-- 根据路由路径判断是否显示 -->
<Footer v-show="$route.path === '/home' || $route.path === '/search'"></Footer>
```

> Method 2 (Recommand)

```html
<!-- 根据该路由的 meta.isShow 参数判断是否显示 -->
<Footer v-show="$route.meta.isShow"></Footer>
```

```js
// src/router/index.js

export default new VueRouter({
    routes: [
        {
            path: "/home",
            component: Home,
            // 设置 meta 参数
            meta: {
                // 如果要显示, 就是设置 isShow 属性
                isShow: true
            }
        },
        {
            path: "/register",
            component: Register,
            meta: {}
        },
        {
            path: "/search",
            component: Search,
            meta: {
                isShow: true
            }
        },
    ]
})
```

# Dynamic Add Style

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235703.png)

鼠标移动到侧边栏的选项卡上, 该选项卡就显示一个背景色的效果

```html
<template>
    <div class="type-nav">
        <!-- 动态添加 class 样式, 如果 mouseHoverIndex === div 就添加 class="active" 样式 -->
        <div v-for="(categoryItem1, index) in categoryList" :key="categoryItem1.categoryId" :class="{active: mouseHoverIndex === index}">
            <!-- 绑定鼠标进入事件, 鼠标离开事件 -->
            <div @mouseenter="enterMouseHoverIndex(index)" @mouseleave="leaveMouseHoverIndex()"></div>

            <!-- 动态添加 style 样式, 如果 mouseHover === index 就添加 style="display: 'block'" 样式, 否则就添加 style="display: 'none'" 样式 -->
            <div :style="{display: mouseHoverIndex === index ? 'block' : 'none'}"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 鼠标当前悬停标签的索引
            mouseHoverIndex: -1
        }
    },
    methods: {
        // 修改 mouseHoverIndex 为当前标签的 index
        enterMouseHoverIndex(index) {
            this.mouseHoverIndex = index;
        },
        // 修改 mouseHoverIndex 为 -1, 不指向任何的标签
        leaveMouseHoverIndex(index) {
            this.mouseHoverIndex = -1;
        }
    }
}
</script>

<style scoped lang="less">
.active {
    background-color: skyblue;
}
</style>
```

# Dynamic Change Style

```html
<template>
    <ul>
        <li 
            v-for="(valueItem, index) in valueList" :key="index" 
            :class="{active: valueItem.isChecked == 1}"
            @click="changeActive(valueItem, valueList)"
        >
            {{valueItem.value}}
        </li>
    </ul>
</template>

<script>
export default {
    methods: {
        changeActive(valueItem, valuecList) {
            // 设置其他所有的 item 的 isChecked 为 0
            valueList.forEach((item) => {
                item.isChecked = 0;
            })
            // 设置目标 item 的 isChecked 为 1
            valueItem.isChecked = 1;
        }
    }
}
</script>
```

# Dynamic Display

- home 路由: 直接展示内容
    ![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235705.png)
- search 路由: 鼠标移上去时, 才展示内容
    ![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235706.png)
    ![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235707.png)

```html
<template>
    <div class="type-nav">
        <!-- 绑定 @mouseenter, @mouseleave 事件, 控制展示和隐藏 -->
        <div @mouseenter="showCategoryList" @mouseleave="hideCategoryList">
            <!-- 通过 v-show 动态展示组件内容 -->
            <div v-show="isShowCategoryList">
                ...
            </div>
        </div>
    </div>
</template>

<script>
import {throttle} from "lodash";

export default {
    data() {
        return {
            // 默认不展示内容
            isShowCategoryList: false
        }
    },
    methods: {
        // 展示内容
        showCategoryList: throttle(function() {
            if (this.$route.path === "/home") {
                return;
            }
            this.isShowCategoryList = true;
        }),
        // 隐藏内容
        hideCategoryList: throttle(function() {
            if (this.$route.path === "/home") {
                return;
            }
            this.isShowCategoryList = false;
        }),
        // 展示内容 + 隐藏内容
        toggleCategoryList: throttle(function () {
            if (this.$route.path === "/home") {
                return;
            }
            this.isShowCategoryList = !this.isShowCategoryList;
        }, 50),
    },
    mounted() {
        // 如果为 home 路由, 就展示内容
        if (this.$route.path === "/home") {
            this.isShowCategoryList = true;
        }
    },
}
</script>
```

# Animation

```html
<template>
    <button @click="isShowCategoryList = !isShowCategoryList">动画展示</button>
    <transition name="categoryList">
        <div v-show="isShowCategoryList">
            ...
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            isShowCategoryList: false
        }
    },
}
</script>

<style scoped lang="less">
/* 进入的起点 */
.categoryList-enter {
    height: 0px;
}
/* 进入的终点 */
.categoryList-enter-to {
    height: 461px;
}
/* 进入的过程 */
.categoryList-enter-active {
    transition: all .1s linear;
}
/* 离开的起点 */
.categoryList-leave {
    height: 461px;
}
/* 离开的终点 */
.categoryList-leave-to {
    height: 0px;
}
/* 离开的过程 */
.categoryList-leave-active {
    transition: all .1s linear;
}
</style>
```

# VueRouter

```shell
# vue2 安装 vue-router@3
npm i vue-router@3 -D

# vue3 安装 vue-router@4
npm i vue-router@4 -D
```

```html
<!-- src/pages/Home/index.vue 路由组件一般放在 src/pages 下 -->

<template>
    <div class="home">
    </div>
</template>

<script>
export default {
    name: "Home"
}
</script>
```

```js 
// src/router/index.js

// 引入 Vue
import Vue from "vue";
// 引入 vue-router
import VueRouter from "vue-router";
// 使用 VueRouter
Vue.use(VueRouter)

// 引入页面
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Search from "@/pages/Search";

// 导出路由
export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: "/home",
            component: Home
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/register",
            component: Register
        },
        {
            path: "/search",
            component: Search
        },
        // 重定向路由
        {
            path: "*",
            redirect: "home"
        }
    ]
})
```

```js
// src/main.js

import Vue from 'vue'
import App from './App.vue'
// 引入 router
import router from "@/router";

new Vue({
    render: h => h(App),
    // 注册 router
    router,
}).$mount('#app')
```

```html
<!-- src/components/Header/index.vue -->

<template>
    <div class="header">
        <!-- 声明路由的导航链接 -->
        <router-link to="/login">登陆</router-link>
        <router-link to="/register" class="register">注册</router-link>
    </div>
</template>
```

```html
<!-- src/App.vue -->

<template>
    <div class="app">
        <Header></Header>

        <!-- 展示路由组件 -->
        <router-view></router-view>
        
        <Footer></Footer>
    </div>
</template>
```

# Router Guards

```js
// src/router/routes.js

export default [
    {
        path: "/cart",
        component: Cart,
        meta: {isShow: true}
    },
    {
        path: "/trade",
        component: Trade,
        meta: {isShow: true},
        // Router Guards
        beforeEnter: (to, from, next) => {
            if (from.path != "/cart") {
                // 从 /home 来的, 就返回到 /home, 从 /center 来的, 就返回到 /center
                return next(false);
            }

            return next();
        }
    },
    {
        path: "/pay",
        component: Pay,
        meta: {isShow: true},
        beforeEnter: (to, from, next) => {
            if (from.path != "/trade") {
                return next(false);
            }

            return next();
        }
    },
]
```

# Global Router Guards

```js
const router = new VueRouter({
    routes,
});

// Global Router Guards
router.beforeEach(async (to, form, next) => {
    let loginToken = store.state.User.loginToken;
    let userName = store.state.User.userInfo.name;

    if (!loginToken) {
        if (
            to.path == "/cart" ||
            to.path == "/trade" ||
            to.path == "/pay" ||
            to.path == "/center/myOrder" ||
            to.path == "/center/groupOrder"
        ) {
            return next("/login?redirect=" + to.path);
        }

        return next();
    }

    if (to.path == "/login" || to.path == "/register") {
        return next("/home");
    }

    if (!userName) {
        try {
            await store.dispatch("User/getUserInfo");
        } catch (error) {
            await store.dispatch("User/userLogout");
        }
    }

    return next();
});

export default router;
```

# Component Router Guards

```html
<template></template>

<script>
export default {
    // 进入路由前调用, 不可以访问 this
    beforeRouteEnter(to, from, next) {},

    // 离开路由前调用, 可以访问 this
    beforeRouteLeave(to, from ,next) {},

    // 更改路由前调用 (比如: 从 /home 更改为 /home/:id) 
    beforeRouteUpdate(to, from ,next) {}
}
</script>
```

# ScrollBehavior

```js
// src/router/index.js

import routes from "@/router/routes.js"

export default new VueRouter({
    routes,
    // 路由导航时, 滚动条行为
    scrollBehavior(to, from, savePosition) {
        // 滚动到 {y: 0} 处
        return {y: 0};
    }
})
```

# Router LazyLoad

组件很多时, 打包构建项目后, JavaScript 的包会很大, 会影响页面的加载速度

将不同的路由对应的组件分成不同的代码块, 访问相应路由时, 加载相应的组件, 提高加载速度

```js
// src/router/routes.js

export default [
    {path: "*", redirect: "home"},

    {
        path: "/home",
        // 访问 /home 时, 导入 Home 组件 (推荐)
        component: () => import("@/pages/Home"),
        meta: {isShow: true}
    },
    {
        path: "/login",
        component: import("@/pages/Login"),
        meta: {}, name: "login"
    },
    {
        path: "/register",
        component: () => import("@/pages/Register"),
        meta: {isShow: true}
    },
    {
        path: "/search/:keyword?",
        component: import("@/pages/Search"),
        meta: {isShow: true},
        name: "search"
    },
    {
        path: "/detail/:skuId",
        component: () => import("@/pages/Detail"),
        meta: {isShow: true},
    },
    {
        path: "/addCart",
        component: () => import("@/pages/AddCart"),
        meta: {isShow: true},
        name: "addCart"
    },
    {
        path: "/cart",
        component: () => import("@/pages/Cart"),
        meta: {isShow: true}
    },
    {
        path: "/trade",
        component: () => import("@/pages/Trade"),
        meta: {isShow: true},
        beforeEnter: (to, from, next) => {
            if (from.path != "/cart") {
                return next(false);
            }

            return next();
        }
    },
    {
        path: "/pay",
        component: () => import("@/pages/Pay"),
        meta: {isShow: true},
        beforeEnter: (to, from, next) => {
            if (from.path != "/trade") {
                return next(false);
            }

            return next();
        }
    },
    {
        path: "/paySuccess",
        component: () => import("@/pages/PaySuccess"),
        meta: {isShow: true},
        beforeEnter: (to, from, next) => {
            if (from.path != "/pay") {
                return next(false);
            }

            return next();
        }
    },
    {
        path: "/center",
        component: import("@/pages/Center"),
        meta: {isShow: true},
        children: [
            {
                path: "myOrder",
                component: () => import("@/pages/Center/MyOrder")
            },
            {
                path: "groupOrder",
                component: () => import("@/pages/Center/GroupOrder")
            }
        ],
        redirect: "/center/myOrder"
    }
]
```

# Merge Parameters

```js
toSearchRouter() {
    // 配置路由导航对象
    let locations = {name: "search"};
    // 如果路由中有 query 参数, 就合并到 locations 中
    if (this.$route.query) {
        // 添加 query 参数
        locations.query = this.$route.query;
    }
    // 添加 params 参数
    locations.params = {keyword: this.keyword};
    // 路由导航
    this.$router.push(locations);
    
    // 简化书写
    // this.$router.push(name: "search", query: {this.$route.query}, params: {keyword: this.keyword});
}
```

# Vuex

```shell
# vue2 安装 vuex@3
npm i vuex@3 -D

# vue3 安装 vuex@4
npm i vuex@4 -D
```

```js
import myAxios from "@/api/myAxios";

// 导出请求数据的接口函数
export const reqCategoryList = () => {
    return myAxios({
        url: "/product/getBaseCategoryList",
        method: "get"
    })
}

// 发送 get 请求
export const reqCategoryList = () => myAxios.get("/product/getBaseCategoryList");
// 发送 post 请求, 携带 data 参数
export const reqSearchList = (searchParams) => myAxios.post("/list", {data: searchParams});
```

```js
// src/store/Home/index.js

// 导入请求数据的接口函数
import {reqCategoryList} from "@/api";

const state = {
    categoryList: []
};

const getters = {};

const actions = {
    async getCategoryList(context, data) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            context.commit("GETCATEGORYLIST", result.data);
        }
    }
};

const mutations = {
    GETCATEGORYLIST(state, value) {
        state.categoryList = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
```

```js
// src/store/Search/index.js

// 导入请求数据的接口函数
import {reqSearchList} from "@/api";

const state = {
    searchList: {}
};
const getters = {
    // 简化 searchList 数据
    goodsList(state) {
        // 如果 searchList.goodsList 为空, 就返回 [], 防止页面遍历的时候出错
        return state.searchList.goodsList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
};
const actions = {
    async getSearchList(context, searchParams) {
        // 解构 value
        searchParams = {...searchParams};
        let result = await reqSearchList(searchParams);
        if (result.code === 200) {
            context.commit("GETSEARCHLIST", result.data);
        }
    }
};
const mutations = {
    GETSEARCHLIST(state, value) {
        state.searchList = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions, 
    mutations
}
```

```js
// src/store/index.js

// 引入 Home 组件的 vuex 模块
import Home from "@/store/Home";
// 引入 Search 组件的 vuex 模块
import Search from "@/store/Search";

export default new Vuex.Store({
    // 配置 vuex 模块
    modules: {
        Home,
        Search
    }
})
```

```js
// src/main.j s

import store from "@/store";

new Vue({
    store
}).$mount('#app')
```

```html
<!-- src/Home/TypeNav/index.vue --> 

<template>
    <div class="type-nav">
        <!-- 一级数据遍历 -->
        <div v-for="(categoryItem1, index) in categoryList" :key="categoryItem1.categoryId">
            <div>{{categoryItem1.categoryName}}</div>

            <!-- 二级数据遍历 -->
            <div v-for="(categoryItem2, index) in categoryItem1.categoryChild" :key="categoryItem2.categoryId">
                <div>{{categoryItem2.categoryName}}</div>

                <!-- 三级数据遍历 -->
                <div v-for="(categoryItem3, index) in categoryItem2.categoryChild" :key="categoryItem3.categoryId">
                    <div>{{categoryItem3.categoryName}}</div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";

export default {
    computed: {
        // 获取 state 数据
        ...mapState("Home", ["categoryList"]),
        // 获取 getters 数据
        ...mapGetters("Search", ["goodsList", "attrsList", "trademarkList"])

        ...mapState({
            totalElement: (state) => state.Search.searchList.total,
        }),
        ...mapGetters({
            goodsList: "Search/goodsList"
        }),

    },
    methods: {
        // 获取 actions 方法
        ...mapActions("Home", ["getCategoryList"])
        ...mapActions("Search", ["getSearchList"])
    },
    // 页面挂载时, 发送请求, 获取数据
    mounted() {
        this.getCategoryList();
        this.getSearchList();
    },
}
</script>
```

# Image Lazyload

```shell
npm i vue-lazyload -S
```

```js
// main.js

import VueLazyload from 'vue-lazyload';

const lazyloadImage = require("@/assets/lazyloadImage.png");

Vue.use(VueLazyload, {
    // 加载时到默认显示图片
    loading: lazyloadImage
})
```

```html
<li v-for="img in list">
    <img v-lazy="img.src" >
</li>
```

# CustomPlugin

Method 1

```js
// src/plugins/myPlugins.js

import Vue from "vue";

export const myPlugins = function (Vue, options) {
    console.log(Vue, options);
}
```

```js
// main.js

import {myPlugins} from "@/plugins/myPlugins";

Vue.use(myPlugins, {
    name: "sun",
    age: 18
})
```

Method 2

```js
// src/plugins/myPlugins.js

import Vue from "vue";

const myPlugins = function (Vue, options) {
    console.log(Vue, options);
}

Vue.use(myPlugins, {
    name: "sun",
    age: 18
})
```

```js
// main.js

import "@/plugins/myPlugins";
```

# Page

## Button Title

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235708.png)

```html
<a title="hello world">
    <button>Button</button>
</a>
```

# Extend

## AJAX

发送 AJAX 请求

```html
<button id="btn">发送 AJAX 请求</button>
<div id="result"></div>
```

```js
let btn = document.querySelector('#btn');
btn.addEventListener('click', function () {
    let xhr = new XMLHttpRequest()
    // 发送 post 请求到 http://127.0.0.1:9999/server 
    xhr.open('POST', 'http://127.0.0.1:9999/server')
    // post 请求到参数一般放在请求体中 (当然也可以通过 url 传递), 编写请求体的内容, 就能做到给服务端传参的效果
    xhr.send('username=sun&age=18')
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.response)
        }
    }
});
```

xhr.send() 编写请求体的格式非常灵活

```js
xhr.send('hello server')
xhr.send('username:sun&age:18')
xhr.send('username=sun&age=18')
```

## Mock

Mock: 我们自己准备数据, 再发送请求给本地的 Mock 服务器, Mock 服务器返回本地的数据给我们, 请求模拟服务器的效果

```shell
npm i mockjs -D
```
section

```json
// src/mock/banner.json

// 准备数据
[
    {
        "id": "1",
        // 将需要模拟的图片放在 public/images 目录下
        "imgUrl": "/images/banner1.jpg"
    },
    {
        "id": "2",
        "imgUrl": "/images/banner2.jpg"
    },
    {
        "id": "3",
        "imgUrl": "/images/banner3.jpg"
    },
    {
        "id": "4",
        "imgUrl": "/images/banner4.jpg"
    }
]
```

```js
// src/mock/mockServer.js

// 导入 mockjs
import Mock from "mockjs";

// 导入 banner 数据
import banner from "./banner.json";
// 导入 floor 数据
import floor from "./floor.json"

// 请求 /mock/banner 就能获取到 banner 数据
Mock.mock("/mock/banner", {code: 200, data: banner});
// 请求 /mock/floor 就能获取到 floor 数据
Mock.mock("/mock/floor", {code: 200, data: floor});
```

```js
// src/main.js

// 导入 mockServer.js, 相当于调用 Mock.mock()
import "@/mock/mockServer"
```

```js
// src/api/mockAxios.js 封装 mock 的 axios, 类似于 @/api/myAxios.js

import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css"

const myAxios = axios.create({
    // 请求 mock 的服务器, 都是以 /mock 开头的, 将 /mock 作为 baseURL
    baseURL: "/mock",
    timeout: 5000
})

myAxios.interceptors.request.use((config) => {
    nprogress.start();
    return config;
})

myAxios.interceptors.response.use((res) => {
    nprogress.done();
    return res.data;
}, (error) => {
    return Promise.reject(new Error("error"));
})

export default myAxios;
```

```js
// src/api/index.js

// 导入 mockAxios
import mockAxios from "@/api/mockAxios";

// 向 mock 发送请求, 请求 banner 数据
export const reqBannerList = () => mockAxios.get("/banner");
```

```js
// src/store/Home/index.js 配置 vuex 数据

// 导入 reqBannerList()
import {reqBannerList} from "@/api";

const state = {
    bannerList: []
};

const actions = {
    async getBannerList(context) {
        // 调用 reqBannerList() 请求数据
        let result = await reqBannerList();
        if (result.code === 200) {
            context.commit("GETBANNERLIST", result.data);
        }
    }
};

const mutations = {
    GETBANNERLIST(state, value) {
        state.bannerList = value;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
```

```html
<!-- src/App.vue -->

<template>
    <div class="app"></div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: 'App',
    methods: {
        ...mapActions("Home", ["getCategoryList"]),
        ...mapActions("Home", ["getBannerList"]),
    },
    mounted() {
        // App.vue 只挂载一次, 在 App.vue 挂载时请求数据, 避免重复请求数据, 性能好
        this.getBannerList();
    }
}
</script>
```

```html
<!-- src/pages/ListContainer/index.vue -->

<template>
    <div>{{bannerList}}</div>
</template>

<script>
import {mapState} from "vuex";

export default {
    computed: {
        // 导入 bannerList 数据
        ...mapState("Home", ["bannerList"])
    }
}
</script>
```

## Swiper

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235709.png)

```shell
npm i swiper -D
```

```html
<!-- src/components/Carousel/index.vue -->

<template>
    <div class="swiper" ref="carousel">
        <!-- 轮播图 -->
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carouselItem, index) in carouselList" :key="carouselItem.id">
                <img :src="carouselItem.imgUrl">
            </div>
        </div>

        <!-- 页面导航标点 -->
        <div class="swiper-pagination"></div>

        <!-- 左右导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper, {Navigation, Pagination} from "swiper";
import 'swiper/css/bundle'

export default {
    name: "Carousel",
    // 获取父组件的数据
    props: ["carouselList"],
    watch: {
        // 页面中的 Swiper 对象需要展示 carouselList 数据, 所以需要等数据获取完毕, 数据展示完毕之后初始化数据, 不然无法完成初始化操作
        carouselList: {
            // 页面挂载时, 立即执行一次 handler()
            immediate: true,
            // carouselList 数据发生改变时, 立刻执行 handler()
            handler() {
                // 下一次模版解析挂载之后, 就会调用 nextTick() 的回调函数, 在回调函数中初始化 Swiper 对象, 就可以保证页面中的 bannerList 数据展示完毕了
                this.$nextTick(() => {
                    // 通过 ref 获取指定节点, 初始化 Swiper 对象
                    const swiper = new Swiper(this.$refs.carousel, {
                        // 配置循环轮播图
                        loop: true,
                        // 配置 modules
                        modules: [Navigation, Pagination],
                        speed: 500,
                        // 配置左右导航按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        // 配置页码导航标点
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'bullets',
                            clickable: true
                        },
                    });

                    // 获取指定节点, 初始化 swiper 对象 (方法 1, 推荐)
                    const swiper = new Swiper(this.$refs.carousel, {};
                    // 获取指定节点, 初始化 swiper 对象 (方法 2)
                    const swiper = new Swiper(".swiper", {};
                    // 获取指定节点, 初始化 swiper 对象 (方法 3)
                    const swiper = new Swiper(documents.querySelecto(".swiper"), {};
                });
            }
        }
    },
    mounted() {
        this.getBannerList();

        // 不可以在 mounted() 中初始化 Swiper 对象
        // const swiper = new Swiper(this.$refs.carousel, {};
    }
}
</script>
```

```js
import Carousel from "@/components/Carousel";
// 配置全局组件
Vue.component(Carousel.name, Carousel);
```

```html
<template>
    <!-- 调用组件, 传递轮播图需要的数据 [{id: ..., imgUrl: ...}, {id: ..., imgUrl: ...} ...] -->
    <Carousel :carouselList="bannerList"></Carousel>
</template>
```

## IconFont

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235710.png)

```html
<!-- public/index.html -->

<!DOCTYPE html>
<html lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <link rel="stylesheet" href="./reset.css">
    <!-- 引入 CSS 样式 -->
    <link rel="stylesheet" href="https://at.alicdn.com/t/c/font_3725490_ahf33dicuuj.css">
</head>
<body>
<div id="app"></div>
</body>
</html>
```

```html
<template>
    <!-- 添加 Class 样式 -->
    <div>Arrow Up<span class="iconfont icon-cc-arrow-up'"></div>
    <div>Arrow Down<span class="iconfont icon-cc-arrow-down'"></div>
</template>
```

## UUID

```js
// src/utils/token.js

import { v4 as uuidv4 } from 'uuid';

export const getToken = () => {
    let token = localStorage.getItem("token");
    if (!token) {
        token = uuidv4();
        localStorage.setItem("token", token);
    }
    return token;
}
```

```js
import {getToken} from "@/utils/token";
let token = getToken();
```

## NProgress

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235711.png)

```shell
npm i nprogress -D
```

```js
// src/api/myAxios.js

// 引入 nprogress
import nprogress from "nprogress";
// 引入 nprogress 样式
import "nprogress/nprogress.css"

// 拦截请求
eyAxios.interceptors.request.use((config) => {
    // 启动 nprogress 进度条
    nprogress.start();
    return config;
})

// 拦截响应
myAxios.interceptors.response.use((res) => {
    // 关闭 nprogress 进度条
    nprogress.done();
    return res.data;
}, (error) => {
    return Promise.reject(new Error("error"));
})

export default myAxios;
```

## Throttle

节流, 速连续触发事件时, 只在规定时间间隔后触发一次事件, 避免了重复触发

```js
import {throttle, debounce} from "lodash";

export default {
    methods: {
        enterMouseHoverIndex: throttle(function (index) {
            this.mouseHoverIndex = index;
        }, 50),
        leaveMouseHoverIndex: throttle(function () {
            this.mouseHoverIndex = -1;
        }, 50),
    }
}
```

## Debounce

防抖, 快速连续触发事件时, 只触发最后一次事件, 避免了重复触发

```js
import {debounce} from "lodash";

export default {
    methods: {
        enterMouseHoverIndex: debounce(function (index) {
            this.mouseHoverIndex = index;
        }, 50),
        leaveMouseHoverIndex: debounce(function () {
            this.mouseHoverIndex = -1;
        }, 50)
    }
}
```

## cloneDeep

```js
import {cloneDeep} from "lodash"

let data1 = {
    name: "sun",
    job: {
        type: "java",
        sal: 30000
    }
}

let data2 = cloneDeep(data1);
```

## ElementUI

```shell
npm i element-ui -S
```

完全导入 ElementUI

```js
// src/main.js

import ElementUI from 'element-ui';
Vue.use(ElementUI);
```

按需导入 ElementUI

```shell
npm i babel-plugin-component -D
```

```js
// babel.config.js

module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
```

```js
// src/router/index.js

// 导入 ElementUI 的 Button Components
import {Button, Row, Message, MessageBox} from "element-ui";

// 配置 Button, Row 为 Global Components
Vue.component(Button.name, Button);
Vue.component(Row.name, Row);

// 挂载 MessageBox 到 Vue 上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
```

使用 ElementUI

```html
<template>
    <div>
        <el-row>
            <!-- 调用 ElementUI Components -->
            <el-button>default<el-button>
            <el-button type="primary">primary<el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
        </el-row> 
        
        <el-row>
            <el-button type="text" @click="showMessage">click</el-button>
        </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        showMessage() {
            // 调用 ElementUI Components
            this.$alert('This is a message', 'Title', {
                confirmButtonText: 'OK',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                    });
                }
            }
        }
    }
} 
</script>
```

## QRCode

```shell
npm i qrcode -S
```

```js
async pay() {
    let QRCodeURL = await QRCode.toDataURL(this.payInfo.codeUrl);
    
    console.log(QRCodeURL); // data:image/png;base64,iVBORw0KGgoAAAANSU ...
}
```

# Optimize

## Axios

```shell
npm i axios -D
```

```js
// src/api/request.js 将 Axios 封装一层, 便于我们更好的操作

import axios from "axios";

// 创建一个 axios 对象
const myAxios = axios.create({
    // 请求路径的前缀
    baseURL: "api",
    // 请求超时的时间
    timeout: 5000
})

// 拦截请求, 发送请求前做些什么
myAxios.interceptors.request.use((config) => {
    return config;
})

// 拦截响应, 响应请求前做些什么
myAxios.interceptors.response.use((res) => {
    // 响应失败, 服务器返回的 res.code 可能为 200, 也有可能为 20000
    if (res.code != 200 && res.code != 20000) {
        console.log("response error");
    }
    return res.data;
}, (error) => {
    return Promise.reject(new Error("error"));
})

export default myAxios;
```

## API

在 @/api/index.js 中, 统一管理请求接口, 避免组件中的请求过多太混乱

```js
// src/api/index.js

// 导入 myAxios
import myAxios from "@/api/myAxios";

// 导出请求函数
export const reqCategoryList = () => {
    // 发送请求
    myAxios({
        url: "/product/getBaseCategoryList",
        method: "get"
    })
}

export const reqBannerList = () => myAxios.get("/banner");

export const reqSearchList = (searchParams) => myAxios.post("/list", searchParams);

export const reqGoodsList = (skuId) => myAxios.get(`/item/${skuId}`);
```

```js
// 导入请求函数
import {reqCategoryList} from "@/api";

// 调用请求函数, 发送请求, 获取数据
let categoryList = reqCategoryList();
```

相关的接口可以封装到同一个 js 文件中

```js
// src/api/user.js

export const reqUserRegister = (data) => myAxios.post("/user/passport/register", data);

export const reqUserLogin = (data) => myAxios.post("/user/passport/login", data);

export const reqUserLogout = () => myAxios.get("/user/passport/logout");
```

```js
// src/api/order.js

export const reqGetOrderInfo = () => myAxios.get("/order/auth/trade")

export const reqSubmitOrder = (tradeNo, data) => myAxios.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data);
```

```js
// src/api/index.js

import * as user from "./user.js";
import * as order from "./order.js";

export default {
    user,
    order
}
```

## Import

通过 import 引入多个方法时, 很麻烦

```js
import {reqCategoryList, reqBannerList, reqSearchList, reqGoodsList} from "@/api";
```

可以将所有的 api 挂载到 Vue 上

```js
// src/main.js

import * as api from "@/api";

new Vue({
    beforeCreate() {
        Vue.prototype.$api = api;
    }
}).$mount('#app')
```

在组件中, 通过 Vue.$api 调用 api

```js
this.$api.reqCategoryList();
this.$api.reqBannerList();
```

## Data Request

重复挂载 TypeNav 组件时, 就会重复调用 this.getCategoryList(), 请求数据, 性能差

```html
<!-- src/components/TypeNav -->

<template>
    <div class="type-nav">{{categoryList}}</div>
</template>

<script>
export default {
    name: 'TypeNav',
    mounted() {
        this.getcategorylist();
    }
}
</script>
```

App.vue 只挂载一次, 在 App.vue 挂载时请求数据, 避免重复请求数据, 性能好

```html
<!-- src/App.vue -->

<template>
    <div class="app"></div>
</template>

<script>
export default {
    name: 'App',
    mounted() {
        this.getCategoryList();
    }
}
</script>
```

## Token

封装 token 操作

```js
// src/utils/token.js

export const setToken = (token) => {
    return localStorage.setItem("token", token);
}

export const getToken = () => {
    return localStorage.getItem("token");
}

export const removeToken = () => {
    return localStorage.removeItem("token");
}
```

## RouterLink

采用编程式导航的原因: 声明式导航中 router-link 是一个组件, 每次加载页面都需要 Vue 去创建组件, 当有很多个 router-link 时, 性能差

```html
<!-- 通过事件委派, 给父标签添加点击事件, 避免重复给标签绑定事件 -->
<div @click="toSearch">
    <div v-for="(categoryItem1, index) in categoryList" :key="categoryItem1.categoryId">
        <!-- 给标签添加 data-categoryName, data-categoryId 自定义属性 -->
        <a :data-categoryName="categoryItem1.categoryName" :data-categoryId="categoryItem1.categoryId">路由导航</a>

        <div class="fore" v-for="(categoryItem2, index) in categoryItem1.categoryChild" :key="categoryItem2.categoryId">
            <!-- 给标签添加 data-categoryName, data-categoryId 自定义属性 -->
            <a :data-categoryName="categoryItem2.categoryName" :data-categoryId="categoryItem2.categoryId">路由导航</a>

            <div v-for="(categoryItem3, index) in categoryItem2.categoryChild" :key="categoryItem3.categoryId">
                <!-- 给标签添加 data-categoryName, data-categoryId 自定义属性 -->
                <a :data-categoryName="categoryItem3.categoryName" :data-categoryId="categoryItem3.categoryId">路由导航</a>
            </div>
        </div>
    </div>
</div>
```

```js
toSearch(event) {
    // 获取触发事件的元素的自定义属性
    let {categoryname, categoryid} = event.target.dataset;
    // 如果没有 cateogryName 自定属性, 就表示点击的其他标签, 并不是 a 标签, 直接退出程序
    if (!categoryname) {
        return;
    }
    // 编程式导航, 导航到 search 路由, 传递 categoryName, categoryId 参数 
    this.$router.push({name: 'search', query: {categoryName: categoryname, categoryId: categoryid}})
}
```

# Function

## Search

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235712.png)

```html
<!-- src/pages/Search/index.vue -->

<template>
    <div class="Search">{{goodsList}}</div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
    name: 'Search',
    data() {
        return {
            searchParams: {
                category1Id: "",
                category2Id: "",
                category3Id: "",
                categoryName: "",
                keyword: "",
                order: "",
                pageNo: 1,
                pageSize: 3,
                props: [],
                trademark: ""
            }
        }
    },
    computed: {
        ...mapGetters("Search", ["goodsList"])
    },
    methods: {
        ...mapActions("Search", ["getSearchList"])
    },
    watch: {
        $route(newValue, oldValue) {
            // 清空 category1Id, category2Id, category3Id, 防止后续重复请求时, 还保留着上一次的 categoryId 参数  categoryId
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;

            // 设置 undefined 或 "" 都可以, 但是 undefined 的数据, 作为参数传输时, 会被忽略, 性能好
            // this.searchParams.category1Id = "";

            // 合并路由中的 query, params 到 searchParams
            Object.assign(this.searchParams, this.$route.query, this.$route.params);
            // 发送请求, 请求数据, 传递 searchParams 参数
            this.getSearchList(this.searchParams);
        }
    },
    beforeMount() {
        // 页面挂载前, 合并路由中的 query, params 到 searchParams, 用于 getSearchList() 请求数据
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
    },
    mounted() {
        // 页面挂载后, 发送请求, 请求数据, 传递 searchParams 参数
        this.getSearchList(this.searchParams);
    },
}
</script>
```

```html
<template>
    <div @click="toSearch">
        <div v-for="(categoryItem1, index) in categoryList" :key="categoryItem1.categoryId">
            <a :data-categoryName="categoryItem1.categoryName" :data-categoryId="categoryItem1.categoryId">路由导航</a>
            <div class="fore" v-for="(categoryItem2, index) in categoryItem1.categoryChild" :key="categoryItem2.categoryId">
                <a :data-categoryName="categoryItem2.categoryName" :data-categoryId="categoryItem2.categoryId">路由导航</a>
                <div v-for="(categoryItem3, index) in categoryItem2.categoryChild" :key="categoryItem3.categoryId">
                    <a :data-categoryName="categoryItem3.categoryName" :data-categoryId="categoryItem3.categoryId">路由导航</a>
                </div>
            </div>
        </div>

        <div class="searchArea">
            <form>
                <input v-model:value="keyword"/>
                <button type="button" @click="toSearch">搜索</button>
            </form>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "TypeNav",
    data() {
        return {
            keyword: ""
        }
    },
    computed: {
        ...mapState("Home", ["categoryList"])
    },
    methods: {
        toSearchRouter(event) {
            let {categoryname, category1id, category2id, category3id} = event.target.dataset;
            if (!categoryname) {
                return;
            }
            // 导航到 Search 路由, 传递 query 参数
            if (category1id) {
                return this.$router.push({name: "search", query: {categoryName: categoryname, category1Id: category1id}});
            } else if (category2id) {
                return this.$router.push({name: "search", query: {categoryName: categoryname, category2Id: category2id}});
            } else if (category3id) {
                return this.$router.push({name: "search", query: {categoryName: categoryname, category3Id: category3id}});
            }
        }
        toSearch() {
            if (this.$route.query) {
                // 导航到 Search 路由, 传递 query, params 参数
                return this.$router.push({name: "search", query: this.$route.query, params: {keyword: this.keyword}});
            }
            // 导航到 Search 路由, 传递 params 参数
            return this.$router.push({name: "search", params: {keyword: this.keyword}});
        }
    }
}
</script>
```

## Breadcrumb 

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235713.png)

```html
<!-- src/pages/Search/index.vue -->

<template>
    <div class="Search">
        <!-- 如果 searchParams 中有 categoryName, 就展示 categoryName 的 BreadCurmb -->
        <li v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">x</i></li>
        <!-- 如果 searchParams 中有 keyword, 就展示 keyword 的 BreadCurmb -->
        <li v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">x</i></li>
    </div>
</template>

<script>
export default {
    methods: {
        // 移除 categoryName 的 breadCrumb
        removeCategoryName() {
            // 设置 searchParams 中的 categoryName, category1Id, category2Id, category3Id 为空
            this.searchParams.categoryName = undefined;
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;

            // 重新请求数据
            this.getSearchList(this.searchParams);

            if (this.searchParams.keyword) {
                // 如果 searchPrams 中有 keyword 就携带 keyword 参数, 重新导航到该路由
                return this.$router.push({name: "search", params: this.$route.params});
            } else {
                // 如果 searchPrams 中没有 keyword 参数, 直接重新导航到该路由
                return this.$router.push({name: "search"});
            }
        },
        
        // 移除 keyword 的 breadCrumb
        removeKeyword() {
            // 触发 $bus 中的 clearKeyword(), 清空父组件中 input 框的内容
            this.$bus.$emit("clearKeyword");

            // 设置 searchParams 中的 keywrod 为空
            this.searchParams.keyword = undefined;

            // 重新请求数据
            this.getSearchList(this.searchParams);

            if (this.searchParams.category1Id || this.searchParams.category2Id || this.searchParams.category3Id || this.searchParams.categoryName) {
                // 如果 searchPrams 中有 categoryId, categoryName 就携带 categoryId, categoryName 参数, 重新导航到该路由
                this.$router.push({name: "search", query: this.$route.query});
            } else {
                // 如果 searchPrams 中没有 categoryId, categoryName 参数, 直接重新导航到该路由
                this.$router.push({name: "search"});
            }
        }
    },
}
</script>
```

```html
<template>
    <div class="header">
        <input type="text" v-model:value="keyword"/>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            keyword: ""
        }
    },
    mounted() {
        // 声明 $bus 中的 clearKeyword(), 设置 keyword 为空
        this.$bus.$on("clearKeyword", () => {
            this.keyword = "";
        })
    }
}
</script>
```

## Trademark

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235714.png)

```html
<!-- src/pages/Search/SearchSelector/index.vue-->

<template>
    <div class="SearchSelector">
        <!-- 展示 trademark 数据, 绑定 click event -->
        <div v-for="(trademarkItem, index) in trademarkList" @click="trademarkHandler(trademarkItem)">{{trademarkItem.tmName}}</div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'SearchSelector',

    methods: {
        // 触发父组件的 custom event, 传递 trademarkItem 参数
        trademarkHandler(trademarkItem) {
            this.$emit("trademarkInfo", trademarkItem);
        }
    }
}
</script>
```

```html
<!-- src/pages/Search/index.vue -->

<template>
    <div class="Search">
        <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">x</i></li>
        <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">x</i></li>

        <!-- 如果 searchParams 有 trademark, 就展示 trademark's breadcrumb -->
        <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTrademark">x</i></li>
        
        <!-- 绑定 custom event -->
        <SearchSelector @trademarkInfo="trademarkInfo"/>
    </div>
</template>

<script>
export default {
    name: 'Search',
    methods: {
        // 移除 trademark's breadcrumb
        removeTrademark() {
            this.searchParams.trademark = undefined;
            this.getSearchList(this.searchParams);
        },
        // 获取触发 click event 的 trademark 的相关数据, 设置请求参数, 重新请求数据
        trademarkInfo(trademarkItem) {
            this.searchParams.trademark = `${trademarkItem.tmId}: ${trademarkItem.tmName}`;
            this.getSearchList(this.searchParams);
        }
    },
}
</script>
```

## Attr

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235715.png)

```html
<!-- src/pages/Search/SearchSelector/index.vue -->

<template>
    <div class="SearchSelector">
        <div v-for="(attrItem, index) in attrList" :key="attrItem.attrId">
            <div v-for="(attrValueItem, index) in attrItem.attrValueList" :key="index" @click="attrValueHandler(attrItem, attrValueItem)">{{attrValueItem}}</div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'SearchSelector',
    computed: {
        ...mapGetters("Search", ["attrsList", "trademarkList"])
    },
    methods: {
        // 触发父组件的 custom event, 传递 attrItem, attrValueItem 参数
        attrValueHandler(attrItem, attrValueItem) {
            this.$emit("getAttrInfo", attrItem, attrValueItem);
        }
    }
}
</script>
```

```html
<!-- src/pages/Search/index.vue -->

<template>
    <div class="Search">
        <!-- 遍历 searchParams 的 props, 展示 prop, 绑定 click event -->
        <div class="with-x" v-for="(prop, index) in searchParams.props" :key="index">{{ prop.split(":")[1] }}<i @click="removeProp(index)">x</i></div>
                
        <!-- 绑定 custom event -->
        <SearchSelector @getAttrInfo="getAttrInfo"/>
    </div>
</template>

<script>
import SearchSelector from './SearchSelector'

export default {
    name: 'Search',
    methods: {
        // 移除 searchParams.props's breadcrumbs
        removeProp(index) {
            this.searchParams.props.splice(index, 1);
            this.getSearchList(this.searchParams);
        },
        // 获取触发 click event 的 attrItem 的相关数据, 设置请求参数, 重新请求数据
        getAttrInfo(attrItem, attrValueItem) {
            // searchParams.props 以数组的形式存储 attrItem
            let prop = `${attrItem.attrId}:${attrValueItem}:${attrItem.attrName}`
            // searchParams.props 不添加相同的 prop
            if (this.searchParams.props.indexOf(prop) === -1) {
                this.searchParams.props.push(prop);
            }
            this.getSearchList(this.searchParams);
        }
    }
}
</script>
```

## Order

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235716.png)

```html
<!-- src/pages/Search/index.vue -->

<template>
    <!-- 动态绑定样式 -->
    <li :class="{active: isActiveFirstOrder}" @click="changeOrder(1)">
        <a>综合<span class="iconfont" :class="{'icon-cc-arrow-down': isDescOrder, 'icon-cc-arrow-up': isAscOrder}" v-show="isActiveFirstOrder"></span></a>
    </li>
    <li :class="{active: isActiveSecondOrder}" @click="changeOrder(2)">
        <a>价格<span class="iconfont" :class="{'icon-cc-arrow-down': isDescOrder, 'icon-cc-arrow-up': isAscOrder}" v-show="isActiveSecondOrder" ></span></a>
    </li>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            searchParams: {
                order: "1:asc",
            }
        }
    },
    computed: {
        // 如果 searchParams 为 "1:..." 就返回 true
        isActiveFirstOrder() {
            return this.searchParams.order.split(":")[0] === "1";
        },
        // 如果 searchParams 为 "2:..." 就返回 true
        isActiveSecondOrder() {
            return this.searchParams.order.split(":")[0] === "2";
        },
        // 如果 searchParams 为 "...:desc" 就返回 true
        isDescOrder() {
            return this.searchParams.order.split(":")[1] === "desc";
        },
        // 如果 searchParams 为 "...:asc" 就返回 true
        isAscOrder() {
            return this.searchParams.order.split(":")[1] === "asc";
        },
    },
    methods: {
        // 修改样式
        changeOrder(newIndex) {
            let newOrder = this.searchParams.order.split(":")[1] === "desc" ? "asc" : "desc"
            this.searchParams.order = `${newIndex}:${newOrder}`;
        }
    }
}
</script>
```

## Pagination

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235717.png)
![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235718.png)

```html
<!-- src/components/Pagination/index.vue -->

<template>
    <div class="pagination">
        <!-- 如果为第一页就禁用 button, 绑定 click event 触发父组件的 changeCurrentPageNo() 切换页码为上一页 -->
        <button :disabled="currentPageNo === 1" @click="$emit('changeCurrentPageNo', currentPageNo - 1)">上一页</button>
        <!-- 动态显示 button, 动态添加 .active 样式, 绑定 click event 触发父组件的 changeCurrentPageNo() 切换页码为点击的页码 -->
        <button v-if="continuePageNoList[0] > 1" @click="$emit('changeCurrentPageNo', 1)" :class="{active: currentPageNo === 1}">1</button>

        <button v-if="continuePageNoList[0] > 2">···</button>

        <!-- 连续的页码, 绑定 click event 触发父组件的 changePageNo() 切换页码为点击的页码  -->
        <button v-for="(pageNo, index) in continuePageNoList" :key="index" @click="$emit('changeCurrentPageNo', pageNo)" :class="{active: currentPageNo == pageNo}">{{pageNo}}</button>

        <button v-if="continuePageNoList[continuePageNoList.length - 1] < totalPageCount - 1">···</button>

        <button v-if="continuePageNoList[continuePageNoList.length - 1] < totalPageCount" @click="$emit('changeCurrentPageNo', totalPageCount)" :class="{active: currentPageNo === totalPageCount}">{{totalPageCount}}</button>

        <button :disabled="currentPageNo === totalPageCount" @click="$emit('changeCurrentPageNo', currentPageNo + 1)">下一页</button>

        <button>共 {{totalPageCount}} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ["currentPageNo", "pageElementCount", "totalElementCount", "continuePageNoCount"],
    computed: {
        // 总页码数量 = 总元素个数 / 每页元素个数 向上取整
        totalPageCount() {
            return Math.ceil(this.totalElementCount / this.pageElementCount);
        },
        // 连续页码 (1 ... 3 4 5 6 7 ... 9 中的 3 4 5 6 7 就是连续页码)
        continuePageNo() {
            // 连续页码的第一个页码
            let firstPageNo = this.currentPageNo - parseInt(this.continuePageNoCount / 2);
            // 连续页码的最后一个页码
            let lastPageNo = this.currentPageNo + parseInt(this.continuePageNoCount / 2);
            // 连续页码
            let continuePageNoList = [];

            // 1 2 3 4 5 ... 9 或 1 2 3 4 5 6 ... 9 的效果
            if (firstPageNo < 2) {
                firstPageNo = 1;
                lastPageNo = this.continuePageNoCount;
            }
            
            // 1 ... 5 6 7 8 9 或 1 ... 4 5 6 7 8 9 的效果
            if (lastPageNo > this.totalPageCount - 1) {
                firstPageNo = this.totalPageCount - this.continuePageNoCount + 1;
                lastPageNo = this.totalPageCount;
            }

            // 如果连续页码数量 > 总页面数量, 就显示总页码
            if (this.continuePageNoCount > this.totalPageCount) {
                firstPageNo = 1;
                lastPageNo = this.totalPageCount;
            }

            for (let i = firstPageNo; i <= lastPageNo; i++) {
                continuePageNoList.push(i);
            }

            return continuePageNoList;
        }
    }
}
</script>

<style lang="less" scoped>
.active {
    background-color: skyblue;
}
</style>
```

```html
<!-- src/pages/Search/index.vue -->

<template>
    <!-- 
        - currentPageNo 当前页码
        - pageElementCount 每页元素个数
        - totalElementCount 总元素个数
        - continuePageNoCount 连续页码的数量 (1 ... 3 4 5 6 7 ... 9 中的 3 4 5 6 7 总共 5 个, 连续页码数量就是 5)
        - @changeCurrentPageNo() 切换页码
     -->
    <Pagination
            :currentPageNo="searchParams.pageNo"
            :pageElementCount="searchParams.pageSize"
            :totalElementCount="totalElement"
            :continuePageNoNoCount="5"
            @changeCurrentPageNo="changeCurrentPageNo"
    ></Pagination>
</template>

<script>
export default {
    name: 'Search',
    methods: {
        // 切换当前页码
        changeCurrentPageNo(pageNo) {
            this.searchParams.pageNo = pageNo;
            this.getSearchList(this.searchParams);
        }
    },
}
</script>
```

## Zoom

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235719.png)

```html
<!-- src/pages/Detail/index.vue -->

<template>
    <div class="zoom">
        <img :src="img.imgUrl"/>
        <div class="preview" @mousemove="previewHandler"></div>
        <!-- big 里的 img 比 preview 大两倍 -->
        <div class="big">
            <img :src="img.imgUrl" ref="big"/>
        </div>
        <!-- mask 比 preview 小两倍 -->
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
export default {
    name: "Zoom",
    methods: {
        previewHandler(event) {
            let mask = this.$refs.mask;
            let big = this.$refs.big;
            let preview = event.target;

            // 鼠标一直保持在遮罩层的中间
            let left = event.offsetX - mask.offsetWidth / 2;
            let top = event.offsetY - mask.offsetHeight / 2;

            // 遮罩曾只能在方框里移动, 贴边的时候就不能再往外移了
            if (left < 0) {
                left = 0;
            }
            if (top < 0) {
                top = 0;
            }
            if (left > preview.offsetWidth / 2) {
                left = preview.offsetWidth / 2;
            }
            if (top > preview.offsetHeight / 2) {
                top = preview.offsetHeight / 2;
            }

            // 遮罩层的位置
            mask.style.left = left + "px";
            mask.style.top = top + "px";

            // 放大图片的位置
            big.style.left = - left * 2 + "px";
            big.style.top = - top * 2 + "px";
        }
    }
}
</script>

<style lang="less">

.zoom {
    position: relative;
    width: 400px;
    height: 400px;

    img {
        width: 100%;
        height: 100%;
    }

    .preview {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .big {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -1px;
        left: 100%;
        overflow: hidden;
        display: none;
        background: white;

        img {
            width: 200%;
            max-width: 200%;
            height: 200%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    .mask {
        width: 50%;
        height: 50%;
        background-color: rgba(0, 255, 0, 0.3);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }

    .preview:hover ~ .mask,
    .preview:hover ~ .big {
        display: block;
    }
} 
</style>
```

## Change Number

> Normal Page

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235720.png)

```html
<!-- src/pages/Cart/index.vue -->

<template>
    <div class="controls">
        <input autocomplete="off" v-model="skuNum" @change="changeSkuNum">
        <a href="javascript:" @click="skuNum++">+</a>
        <a href="javascript:" @click="skuNum > 1 ? skuNum-- : skuNum">-</a>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    data() {
        return {
            skuNum: 1
        }
    },
    methods: {
        changeSkuNum(event) {
            // 字符串 * 1 = NaN
            let value = event.target.value * 1;

            // 防止输入不合规的数据
            if (!value || value < 1) {
                this.skuNum = 1;
                return;
            }

            this.skuNum = parseInt(this.skuNum);
        }
    },
}
</script>
```

> Cart Page

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235721.png)

购物车页面, 数量控制, 需要向服务器发送请求

```html
<template>
    <div class="control">
        <a @click="changeSkuNum('mins', cartInfoItem.skuId, cartInfoItem.skuNum)">-</a>
        <input autocomplete="off" :value="cartInfoItem.skuNum" @change="changeSkuNum('change', cartInfoItem.skuId, cartInfoItem.skuNum, $event)">
        <a @click="changeSkuNum('plus', cartInfoItem.skuId)">+</a>
    </div>
</template>

<script>
export default {
    methods: {
        changeSkuNum: throttle(async function(type, skuId, skuNum, event) {
            let disNum = 0;

            if (type == "mins") {
                disNum = skuNum > 1 ? -1 : 0;
            } else if (type == "plus") {
                disNum = 1;
            } else if (type == "change") {
                if (!event.target.value * 1 || event.target.value < 1) {
                    disNum = 1;
                } else {
                    disNum = parseInt(event.target.value) - skuNum;
                }
            }

            try {
                await this.$store.dispatch("Detail/addCart", {skuId: skuId, skuNum: disNum});
                await this.$store.dispatch("Cart/getCartList");
            } catch (error) {
                console.log(error);
            }
        }, 500),
    }
}
</script>
```

## Cart

购物车页面, 显示数据, 需要向服务器确认身份, 只有登陆之后的账户, 才可以访问

```js
// src/utils/token.js

import { v4 as uuidv4 } from 'uuid';

export const getUserToken = () => {
    let userToken = localStorage.getItem("userToken");

    if (!userToken) {
        userToken = uuidv4();
        localStorage.setItem("userToken", userToken);
    }
    return userToken;
}
```

```js
// src/store/Detail/index.js

import {getUserToken} from "@/utils/token";

const state = {
    // 通过 userToken 验证身份
    token: getUserToken()
}
```

```js
// src/api/myAxios.js

import store from "@/store";
myAxios.interceptors.request.use((config) => {
    // 将 userToken 添加到请求头, 服务器会根据 userToken 进行身份验证
    if (store.state.Detail.userToken) {
        config.headers.userTempId = store.state.Detail.userToken;
    }
    return config;
})

export default myAxios;
```

```js
// src/store/Cart/index.js

import {reqCartList} from "@/api";

const actions = {
    async getCartList(context) {
        let result = await reqCartList();
    }
}
```

```html
<!-- src/pages/Cart/index.vue -->

<template>
    <div class="cart">
    </div>
</template>

<script>
export default {
    name: 'Cart',
    mounted() {
        this.$store.dispatch("Cart/getCartList");
    }
}
</script>
```

## Add Cart 

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235722.png)

购物车页面, 添加数据, 需要向服务器发送请求

```html
<!-- src/pages/Detail/index.vue -->

<template>
    <div class="Detail">
        <a @click="addCart">加入购物车</a>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    methods: {
        async addCart() {
            try {
                await this.$store.dispatch("Detail/addCart", {skuId: this.$route.params.skuId, skuNum: this.skuNum});
                // skuNum 通过 query 传递
                await this.$router.push({name: "addCart", query: {skuNum: this.skuNum}});
                // skuInfo 通过 session 传递 (session 只能存字符串, 不能存对象, 需要将对象转成字符串)
                sessionStorage.setItem("skuInfo", JSON.stringify(this.skuInfo));
            } catch (error) {
                console.log(error.message);
            }
        }
    }
}
</script>
```

```html
<!-- src/pages/Cart/index.vue -->

<template>
    <div class="addCart">{{skuInfo}}</div>
</template>

<script>
export default {
    name: 'addCart',
    computed: {
        skuInfo() {
            // 获取 session 中的 skuInfo
            return JSON.parse(sessionStorage.getItem("skuInfo"));
        },
    },
}
</script>
```

```js
const actions = {
    async addCart(context, data) {
        let result = await reqAddCart(data.skuId, data.skuNum);
        if (result.code === 200) {
            return "success";
        } else {
            return Promise.reject(new Error("faile"));
        }
    }
}
```

```js
export const reqAddCart = (skuId, skuNum) => myAxios.post(`/cart/addToCart/${skuId}/${skuNum}`);
```

## Delete Cart 

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235723.png)

购物车页面, 删除数据, 需要向服务器发送请求

```js
// src/api/index.js
export const reqDeleteCart = (skuId) => myAxios.delete(`/cart/deleteCart/${skuId}`);
```

```js
// src/store/Cart/index.js

const actions = {
    async deleteCart(context, value) {
        let result = await reqDeleteCart(value.skuId);
        if (result.code == 200) {
            return "success";
        } else {
            return Promise.reject(new Error("faile"));
        }
    }
}
```

```html
<!-- src/pages/Cart/index.vue -->

<template>
    <a @click="deleteCart(cartInfoItem.skuId)">删除</a>
</template>

<script>
export default {
    methods: {
        async deleteCart(skuId) {
            try {
                await this.$store.dispatch("Cart/deleteCart", {skuId});
                await this.$store.dispatch("Cart/getCartList");
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
```

## Delete All Checked Cart

```js
// src/store/Cart/index.js

const actions = {
    async deleteAllCheckedCart(context) {
        let promiseList = [];
        
        // 遍历 CartInfoList 删除所有已选中的商品
        context.getters.cartInfoList.forEach((item) => {
            if (item.isChecked != 1) {
                return;
            }

            // 调用 deleteCart() 根据 skuId 删除商品, 返回的是一个 Promise, 将所有的 Promise 都 push 进 promiseList 中
            promiseList.push(context.dispatch("deleteCart", {skuId: item.skuId}));
        })

        // 如果所有的 Promise 都 success, 才返回 success
        return await Promise.all(promiseList);
    }
}
```

```html
<!-- src/pages/Cart/index.vue -->

<template>
    <a @click="deleteAllCheckedCart">删除选中的商品</a>
</template>

<script>
export default {
    methods: {
        async deleteAllCheckedCart() {
            try {
                await this.$store.dispatch("Cart/deleteAllCheckedCart");
                await this.$store.dispatch("Cart/getCartList");
            } catch (error) {
                console.log(error.message);
            }
        }
    }
}
</script>
```

## Cart CheckBox

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235724.png)

服务器页面, 切换选中状态, 需要向服务器发送请求

```js
// src/api/index.js

export const reqUpdateCartChecked = (skuId, isChecked) => myAxios.get(`/cart/checkCart/${skuId}/${isChecked}`);
```

```js
// src/store/Cart/index.js

const actions = {
    async updateCartChecked(context, value) {
        let result = await reqUpdateCartChecked(value.skuId, value.isChecked);

        if (result.code == 200) {
            return "success";
        } else {
            return Promise.reject(new Error("faile"));
        }
    }
}
```

```html
<!-- src/pages/Cart/index.vue -->

<template>
    <input type="checkbox" :checked="cartInfoItem.isChecked === 1" @click="updateCartChecked(cartInfoItem.skuId, $event)">
</template>

<script>
export default {
    methods: {
        async updateCartChecked(skuId, event) {
            try {
                await this.$store.dispatch("Cart/updateCartChecked", {skuId, isChecked: event.target.checked ? 1 : 0});
                await this.$store.dispatch("Cart/getCartList");
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
```

## All Cart CheckBox

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235725.png)

```js
// src/store/Cart/index.js

const actions = {
    async updateAllCartChecked(context, value) {
        let promiseList = [];

        context.getters.cartInfoList.forEach((item) => {
            if (item.isChecked == value.isChecked) {
                return;
            }

            promiseList.push(context.dispatch("updateCartChecked", {skuId: item.skuId, isChecked: value.isChecked}));
        });

        return Promise.all(promiseList);
    }
}
```

```html
<!-- src/pages/Cart/index.vue -->

<template>
    <input type="checkbox" :checked="isAllChecked && cartInfoList.length > 0" @click="updateAllCartChecked($event)">
</template>

<script>
export default {
    computed: {
        isAllChecked() {
            if (!this.cartInfoList.length) {
                return false;
            }

            return this.cartInfoList.every((item) => item.isChecked === 1);
        },
    },
    methods: {
        async updateAllCartChecked(event) {
            try {
                await this.$store.dispatch("Cart/updateAllCartChecked", {isChecked: event.target.checked ? 1 : 0});
                await this.$store.dispatch("Cart/getCartList");
            } catch (error) {
                console.log(error.message);
            }
        }
    }
}
</script>
```

## Verification Code

```js
// src/api/index.js

export const reqGetVerificationCode = (phoneNumber) => myAxios.get(`/user/passport/sendCode/${phoneNumber}`);
```

```js
// src/store/User/index.js

import {reqGetVerificationCode} from "@/api";

const state = {
    verificationCode: ""
};

const actions = {
    async getVerificationCode(context, {phoneNumber}) {
        let result = await reqGetVerificationCode(phoneNumber);

        if (result.code == 200) {
            context.commit("GETVERIFICATIONCODE", result.data);
            return "success";
        } else {
            return Promise.reject(new Error("faile"));
        }
    }
};

const mutations = {
    GETVERIFICATIONCODE(state, value) {
        state.verificationCode = value
    }
};
```

```html
<!-- src/pages/Register/index/vue -->

<template>
    <div class="register">
        Phone: <input type="text" v-model="phoneNumber">
        SMS Code: <input type="text" v-model="verificationCode">
        <button>Send</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            phoneNumber: "",
            verificationCode: ""
        }
    },
    methods: {
        async getVerificationCode() {
            if (!this.phoneNumber) {
                return;
            }

            try {
                await this.$store.dispatch("User/getVerificationCode", {phoneNumber: this.phoneNumber});
            } catch (error) {
                console.log(error.message);
            }
        
            this.verificationCode = this.$store.state.User.verificationCode;
        }
    }
}
</script>
```

## Register

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235726.png)

```js
// src/api/index.js

export const reqUserRegister = (data) => myAxios.post("/user/passport/register", data);
```

```js
// src/store/User/index.js

const actions = {
    async userRegister(context, data) {
        let result = await reqUserRegister(data);

        if (result.code == 200) {
            return "success";
        } else {
            return Promise.reject(new Error("faile"));
        }
    }
};
```

```html
<!-- src/pages/Register/index/vue -->

<template>
    <div class="register">
        Phone: <input type="text" v-model="phoneNumber">
        SMS Code: <input type="text" v-model="verificationCode">
        Password: <input type="password" v-model="password">
        Confirm Password: <input type="password" v-model="confirmPassword">
        Check: <input name="m1" type="checkbox" :checked="isChecked">
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            phoneNumber: "",
            verificationCode: "",
            password: "",
            confirmPassword: "",
            isChecked: true,
        }
    },
    methods: {
        async userRegister() {
            if (!this.phoneNumber || !this.verificationCode || !this.password || !this.confirmPassword) {
                alert("complete the form");
                return;
            }
            if (this.password != this.confirmPassword) {
                alert("password do not match");
                return;
            }

            try {
                await this.$store.dispatch("User/userRegister", {phone: this.phoneNumber, code: this.verificationCode, password: this.password});
                await this.$router.push("/login");
            } catch (error) {
                console.log(error.message);
            }
        }
    }
}
</script>
```

## Login

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235727.png)

```js
// src/api/index.js

export const reqUserLogin = (data) => myAxios.post("/user/passport/login", data);

export const reqGetUserInfo = () => myAxios.get("/user/passport/auth/getUserInfo");
```

```js
// src/store/User/index.js

const state = {
    loginToken: localStorage.getItem("loginToken"),
    userInfo: {}
};

const actions = {
    // 登陆账号, 获取 userToken, 本地存储 userToken
    async userLogin(context, data) {
        let result = await reqUserLogin(data);

        if (result.code == 200) {
            context.commit("GETTOKEN", result.data.token);
            localStorage.setItem("loginToken", result.data.token);
            return "success";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    // 根据 loginToken 获取 userInfo
    async getUserInfo(context) {
        let result = await reqGetUserInfo();

        if (result.code == 200) {
            context.commit("GETUSERINFO", result.data);
            return "success";
        }
    }
};

const mutations = {
    GETLOGINTOKEN(state, value) {
        state.loginToken = value;
    },
    GETUSERINFO(state, value) {
        state.userInfo = value;
    }
};
```

```js
// src/api/myAxios.js

myAxios.interceptors.request.use((config) => {
    // 将 loginToken 添加到请求头, 服务器会根据 loginToken 返回对应的 userInfo
    if (store.state.User.loginToken) {
        config.headers.token = store.state.User.loginToken;
    }
    nprogress.start();
    return config;
})
```

```html
<!-- src/pages/Login/index/vue -->

<template>
    <form>
        Phone: <input type="text" v-model="phoneNumber">
        Password: <input type="password" v-model="password">
        Check: <input type="checkbox" :checked="isChecked">
        <!-- 阻止 button 的默认行为 (阻止表单的自动跳转) -->
        <button @click.prevent="userLogin">Login</button>
    </form>
</template>

<script>
export default {
    name: 'Login',
    data() {LOGIN
        return {
            phoneNumber: "",
            password: ""
        }
    },
    methods: {
        async userLogin() {
            if (!this.phoneNumber || !this.password) {
                return;
            }

            try {
                await this.$store.dispatch("User/userLogin", {phone: this.phoneNumber, password: this.password});
                // 配合 Auth, 如果 query 中有 redirect, 就导航到 redirect, 如果没有, 就导航到 /home
                await this.$router.push(this.$route.query.redirect || "/home");
            } catch (error) {
                console.log(error.message);
            }
        }
    }
}
</script>
```

```html
<!-- src/components/Header/index.vue -->

<template>
    <div class="header">
        <!-- 登陆后显示 userInfo, 登陆前显示 Login, Register -->
        <p v-if="!userName">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </p>

        <p v-else>
            <a href="#">{{userName}}</a>
            <a href="#">Logout</a>
        </p>
    </div>
</template>

<script>
export default {
    name: "Header",
    computed: {
        userName() {
            return this.$store.state.User.userInfo.name;
        }
    }
}
</script>
```

```html
<!-- src/pages/Home/index.vue -->

<script>
export default {
    mounted() {
        // 先暂时放在这里, 后续配置 Auth 时, 可以在 Navigation Guards 中调用 getUserInfo()
        this.$store.dispatch("User/getUserInfo");
    }
}
</script>
```

## Logout

```js
// src/api/index.js

export const reqUserLogout = () => myAxios.get("/user/passport/logout");
```

```js
// src/store/User/index.js

const state = {
    loginToken: localStorage.getItem("loginToken"),
    userInfo: {}
};

const actions = {
    async userLogout(context) {
        let result = await reqUserLogout();

        if (result.code == 200) {
            context.commit("CLEAR");
            return "success";
        } else {
            return Promise.reject(new Error("faile"))
        }
    }
};

const mutations = {
    CLEAR(state) {
        state.loginToken = "";
        state.userInfo = {};
        localStorage.removeItem("loginToken");
    }
};
```

```html
<!-- src/componets/Header/index.vue -->

<template>
    <a href="#" @click="userLogout">Logout</a>
</template>

<script>
export default {
    methods: {
        async userLogout() {
            try {
                await this.$store.dispatch("User/userLogout");
                await this.$router.push("/home");
            } catch (error) {
                console.log(error.message);
            }
        }
    }
}
</script>
```

## Auth

```js
// src/router/index.js

const router = new VueRouter({
    routes,
});

// Navigation Guards
router.beforeEach(async (to, form, next) => {
    let loginToken = store.state.User.loginToken;
    let userName = store.state.User.userInfo.name;

    // 登录前, 不可以访问 /cart, /trade
    if (!loginToken) {
        if (
            to.path == "/cart" ||
            to.path == "/trade" ||
            to.path == "/pay" ||
            to.path == "/center/myOrder" ||
            to.path == "/center/groupOrder"
        ) {
            // 配合 Login Router, 导航到 /login, 添加 redirect 参数, 登陆成功后, 就导航到 redirect
            return next("/login?redirect=" + to.path);
        }

        return next();
    }

    // 登陆后, 获取 userInfo
    if (!userName) {
        try {
            await store.dispatch("User/getUserInfo");
        } catch (error) {
            await store.dispatch("User/userLogout");
        }
    }

    // 登陆后, 不可以访问 /login, /register
    if (to.path == "/login" || to.path == "/register") {
        return next("/home");
    }

    return next();
});

export default router;
```

## Pay

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235728.png)

```js
// src/api/index.js

export const reqGetPayStatus = (orderId) => myAxios.get(`/payment/weixin/queryPayStatus/${orderId}`);
```

```html
<!-- src/pages/Pay/index.js -->

<template>
    <a @click="pay">Pay</a>
</template>

<script>
import QRCode from "qrcode";
import {reqGetPayStatus} from "@/api";

export default {
    name: 'Pay',
    data() {
        return {
            payTimer: null,
            payStatusCode: "",
        }
    },
    computed: {
        orderId() {
            return this.$route.query.orderId;
        }
    },
    methods: {
        async pay() {
            // 生成二维码
            let QRCodeURL = await QRCode.toDataURL(this.payInfo.codeUrl);

            // 弹出 MessageBox, message 为 <img>, title 为 "Payment"
            this.$alert(`<img src="${QRCodeURL}">`, "Payment", {
                dangerouslyUseHTMLString: true,
                center: true,
                showClose: false,
                showCancelButton: true,
                confirmButtonText: "Confirm",
                cancelButtonText: "Cancel",
                // 关闭 MessageBox 前调用, 关闭 Timer, 关闭 MessageBox
                beforeClose: (action, instance, done) => {
                    clearInterval(this.payTimer);
                    this.payTimer = null;
                    // 关闭 MessageBox
                    done();

                    if (action == "confirm") {
                        if (this.payStatusCode == 200) {
                            return this.$router.push("/paySuccess");
                        }
                        return this.$message("The payment was not completed");
                    } else if (action == "cancel") {
                        return this.$message("The payment has been closed");
                    }

                }
            });

            if (this.payTimer) {
                return;
            }

            // 开启 Timer, 每个 500 ms 发送一次请求, 确认 PayStatus
            this.payTimer = setInterval(async () => {
                let result = await reqGetPayStatus(this.orderId);

                // 支付成功后, 关闭 Timer, 关闭 MessageBox, 存储 PayStatusCode, 导航到 /paySuccess
                if (result.code == 200) {
                    clearInterval(this.timer);
                    this.payTimer = null;
                    this.payStatusCode = 200;
                    this.$msgbox.close();
                    this.$router.push("/paySuccess");
                }
            }, 500);
        }
    }
}
</script>
```

## Center

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235729.png)

```js
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";

export default [
    {
        path: "/center",
        component: Center,
        meta: {isShow: true},
        // 子路由组件
        children: [
            {
                path: "myOrder",
                component: MyOrder,
            },
            {
                path: "groupOrder",
                component: GroupOrder
            }
        ],
        // 访问 /center, 就重定向到 /center/myOrder, 默认展示 /center/myOrder
        redirect: "/center/myOrder"
    }
]
```

```html
<!-- src/pages/Center/index.vue -->

<template>
    <div class="center">
        <router-link to="/center/myOrder">myOrder</router-link>
        <router-link to="/center/groupOrder">groupOrder</router-link>
        <router-view></router-view>
    </div>
</template>
```

```html
<!-- src/pages/Center/MyOrder/index.vue -->

<template>
    <div class="myOrder">MyOrder Components</div>
</template>
```

```html
<!-- src/pages/Center/GroupOrder/index.vue -->

<template>
    <div class="groupOrder">GroupOrder Components</div>
</template>
```

## Upload Image

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235730.png)
![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235731.png)
![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235732.png)

```html
<!-- 
    action: 上传图片, 请求的服务器 (注意: 不同于 js 文件, 这里的 url 需要手动添加跨域字段 "/dev-api", .env 中配置的 baseUrl 无效)
-->
<el-upload
    class="avatar-uploader"
    action="/dev-api/admin/product/fileUpload"
    :show-file-list="true"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
>
    <img v-if="newTrademark.logoUrl" :src="newTrademark.logoUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
```

```js
handleAvatarSuccess(res, file) {
    this.newTrademark.logoUrl = URL.createObjectURL(file.raw);
},
beforeAvatarUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
}
```

```css
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
```

## Validation

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235733.png)

```html
<el-form :model="newTrademark" :rules="rules" ref="trademarkForm">
    <el-form-item label="Brand Name" prop="tmName">
        ...
    </el-form-item>
    <el-form-item label="Brand Logo" prop="logoUrl">
        ...
    </el-form-item>
</el-form>
```

表单的验证规则

```js
data() {
    return {
        rules: {
            tmName: [
                {required: true, message: 'Please input Brand Name', trigger: 'blur'},
                {min: 2, max: 50, message: 'Length should be 2 to 50', trigger: 'blur'}
            ],
            logoUrl: [
                {required: true, message: 'Please upload Brand Logo', trigger: 'change'}
            ],
        }
    }
}
        rules: {
            tmName: [
                {required: true, message: 'Please input Brand Name', trigger: 'blur'},
                {min: 2, max: 50, message: 'Length should be 2 to 50', trigger: 'blur'}
            ],
            logoUrl: [
                {required: true, message: 'Please upload Brand Logo', trigger: 'change'}
            ],
        }
```

验证表单

```js
confirmForm() {
    this.$refs["trademarkForm"].validate((valid) => {
        if (valid) {
            this.dialogFormVisible = false;

            if (this.newTrademark.id) {
                this.updateTrademark();
            } else {
                this.addTrademark();
            }
        } else {
            this.$message.error("Please complete the form");
        }
    });
}
```

清除表单的验证提示

```js
closeForm() {
    this.$refs["trademarkForm"].clearValidate();
},
```

## CategorySelect

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235734.png)
![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235735.png)

先选择 Category 1, 发送请求, 获取到 Category 2 的数据, 再选择 Category 2, 发送请求, 获取 Category 3 的数据, 最后选择 Category 3, 发送请求, 获取到 AttrList

```html
<!-- src/components/CategorySelect/index.vue -->

<template>
    <div>
        <el-form :inline="true" :model="categorySelect" class="demo-form-inline">
            <el-form-item label="Category 1">
                <el-select v-model="categorySelect.category1Id" placeholder="Please select" @change="category1Selected">
                    <el-option
                        v-for="category in category1List"
                        :key="category.id"
                        :label="category.name"
                        :value="category.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Category 2">
                <el-select v-model="categorySelect.category2Id" placeholder="Please select" @change="category2Selected">
                    <el-option
                        v-for="category in category2List"
                        :key="category.id"
                        :label="category.name"
                        :value="category.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Category 3">
                <el-select v-model="categorySelect.category3Id" placeholder="Please select" @change="category3Selected">
                    <el-option
                        v-for="category in category3List"
                        :key="category.id"
                        :label="category.name"
                        :value="category.id"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "CategorySelect",
    data() {
        return {
            categorySelect: {
                category1Id: "",
                category2Id: "",
                category3Id: "",
            }
        }
    },
    computed: {
        ...mapState("attr", ["category1List", "category2List", "category3List"])
    },
    methods: {
        // 获取 Category 1 的数据
        async getCategory1List() {
            try {
                await this.$store.dispatch("attr/getCategory1List");
            } catch (error) {
                console.log(error.message);
            }
        },
        // 获取 Category 2 的数据
        async getCategory2List(category1Id) {
            try {
                await this.$store.dispatch("attr/getCategory2List", category1Id);
            } catch (error) {
                console.log(error.message);
            }
        },
        // 获取 Category 3 的数据
        async getCategory3List(category2Id) {
            try {
                await this.$store.dispatch("attr/getCategory3List", category2Id);
            } catch (error) {
                console.log(error.message);
            }
        },
        category1Selected() {
            // 用户选择完三个 Category 后, 再去修改 Category 1, 此时就不能有 Category 2, Category 3 的 id, 不能有 Category 3 的数据
            this.categorySelect.category2Id = "";
            this.categorySelect.category3Id = "";
            this.$store.state.attr.category3List = [];
            // 调用父组件的 getCategoryId
            this.$emit("getCategoryId", {type: "category1", id: this.categorySelect.category1Id});
            this.getCategory2List(this.categorySelect.category1Id);
        },
        category2Selected() {
            // 用户选择完三个 Category 后, 再去修改 Category 2, 此时就不能有 Category 3 的 id
            this.categorySelect.category3Id = "";
            this.$emit("getCategoryId", {type: "category2", id: this.categorySelect.category2Id});
            this.getCategory3List(this.categorySelect.category2Id);
        },
        category3Selected() {
            this.$emit("getCategoryId", {type: "category3", id: this.categorySelect.category3Id});
        }
    },
    mounted() {
        this.getCategory1List()
    }
}
</script>
```

```html
<!-- src/views/Product/Attrs/index.vue -->

<template>
    <div class="attrs">
        <el-card class="card">
            <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Attrs",
    data() {
        return {
            category1Id: "",
            category2Id: "",
            category3Id: "",
            attrList: [],
        }
    },
    methods: {
        getCategoryId({type, id}) {
            if (type == "category1") {
                // 用户选择完三个 Category 后, 再去修改 Category 1, 此时就不能有 Category 2, Category 3 的 id
                this.category2Id = "";
                this.category3Id = "";
                this.category1Id = id;
            } else if (type == "category2") {
                // 用户选择完三个 Category 后, 再去修改 Category 2, 此时就不能有 Category 3 的 id
                this.category3Id = "";
                this.category2Id = id;
            } else if (type == "category3") {
                this.category3Id = id;
                // 收集完三个 Category 的 id 后, 发送请求, 获取 AttrList
                this.getAttrList();
            }
        },
        async getAttrList() {
            let result = await this.$api.attr.reqGetAttrList(this.category1Id, this.category2Id, this.category3Id);

            if (result.code == 200) {
                this.attrList = result.data;
            }
        },
    }
}
</script>
```

## Input Display

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235736.png)

```html
<template slot-scope="{row}">
    <el-input v-if="row.isShowInput" @blur="switchMode(row)" ref="Input"></el-input>
    <span v-else @click="switchMode(row)">{{row.valueName}}</span>
</template>
```

```js
switchMode(row) {
    // 每个 item 上添加一个 isShowInput 来判断显示哪个
    if (row.isShowInput) {
        row.isShowInput = false;
        row.valueName = row.valueName ? row.valueName : "Null";
    } else {
        row.isShowInput = true;
        // 此时页面中没有 input, 下次模版解析的时候, 聚焦 input
        this.$nextTick(() => {
            this.$refs.Input.focus();
        });
    }
}
```

## Init Spu

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235737.png)

点击 Update 按钮, 进入到 SpuForm 组件, 初始化 Spu

```html
<template>
    <el-table class="table" :data="spuList" style="width: 100%" fit>
        <el-table-column label="prop">
            <template slot-scope="{row}">
                <!-- 调用 updateSpu(), 传递 行对象 Spu -->
                <el-button @click="updateSpu(row)">Update</el-button>
            </template>
        </el-table-column>
    </el-table>

    <SpuForm v-show="scene == 1" ref="spu"></SpuForm>
</template>

<script>
import SpuForm from "@/views/Product/Spu/SpuForm/index.vue";

export default {
    name: "Spu",
    components: {SpuForm},
    comments: {
        SpuForm
    },
    data() {
        return {
            // 0, spuList / 1, spuForm / 2, skuForm
            scene: 0
        }
    },
    methods: {
        updateSpu(spu) {
            this.scene = 1;
            // 调用 Spu 组件的 initSpu(), 传递 spu 对象
            this.$refs.spu.initSpu(spu);
        }
    }
}
</script>
```

```js
// src/views/Product/Spu/SpuForm/index.vue

export default {
    name: "SpuForm",
    data() {
        return {
            spu: {},
            trademarkList: [],
            spuImageList: [],
            saleAttrList: []
        }
    },
    methods: {
        // 初始化 Spu
        async initSpu(spu) {
            let spuResult = await this.$api.spu.reqGetSpu(spu.id);
            if (spuResult.code == 200) {
                this.spu = spuResult.data;
            }

            let trademarkListResult = await this.$api.spu.reqGetTrademarkList();
            if (trademarkListResult.code == 200) {
                this.trademarkList = trademarkListResult.data;
            }

            let spuImageListResult = await this.$api.spu.reqGetSpuImageList(spu.id);
            if (spuImageListResult.code == 200) {
                this.spuImageList = spuImageListResult.data;
            }

            let saleAttrListResult = await this.$api.spu.reqGetSaleAttrList();
            if (saleAttrListResult.code == 200) {
                this.saleAttrList = saleAttrListResult.data;
            }
        }
    }
}
```

```js
// src/api/spu.js

export const reqGetSpu = (spuId) => request({
    url: `admin/product/getSpuById/${spuId}`,
    method: "get"
});

export const reqGetTrademarkList = () => request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: "get"
});

export const reqGetSpuImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get"
});

export const reqGetSaleAttrList = () => request({
    url: `/admin/product/baseSaleAttrList`,
    method: "get"
});
```

# Config

## Scripts

```json
// package.json

{
    "scripts": {
        // 启动 service 后, 就自动打开 browser
        "serve": "vue-cli-service serve --open",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
    }
}
```

## Directory Alias

```json
// js.config.json

{
    "compilerOptions": {
        "target": "es5",
        "module": "esnext",
        "baseUrl": "./",
        "moduleResolution": "node",
        "paths": {
            // 设置 @ 为 src 目录的 Alias
            "@/*": [
                "src/*"
            ]
        },
        "lib": [
            "esnext",
            "dom",
            "dom.iterable",
            "scripthost"
        ]
    },
    // 排除 node_modules, dist 目录
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```

```js
// JS 中使用 Dirtory Alias

import myAxios from "@/api/myAxios";
```

```css
/* CSS 中使用 Dirtory Alias */

body {
    background-image: url(~@/assets/images/icons.png);
}
```

## Eslint

```js
// vue.config.js

const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 关闭 Eslint 检查
    lintOnSave: false
})
```

## Less

```shell
npm i less -D

# webpack 4 安装 less-loader@7
npm i less-loader@7 -D
```

```html
<style scoped lang="less"></style>
```

## Proxy

```js
// vue.config.js
    
module.exports = defineConfig({
    devServer: {
        proxy: {
            // 请求 http://localhost:8080/api 时, 就会转发请求到 http://gmall-h5-api.atguigu.cn/api
            "/api": {
                // 请求
                target: "http://gmall-h5-api.atguigu.cn",
                // 请求 /api/getUserInfo 时, 就会转发请求到 /getUserInfo
                pathRewrite: {"^/api", ""},
            }
        },
    }
})
```

## Mode

Development Mode

```shell
# .env.development

# mode
ENV = 'development'

# reqeust base url
VUE_APP_BASE_API = 'dev-api'
```

Production Mode

```shell
# .env.production

ENV = 'production'
VUE_APP_BASE_API = '/prod-api'
```

Proxy Request

```js
// vue.config.js
    
module.exports = defineConfig({
    devServer: {
        proxy: {
            '/dev-api': {
                target: 'http://39.98.123.211:8170/',
                pathRewrite: { '^/dev-api': '' }
            },
            '/prod-api': {
                target: 'http://39.98.123.211:8510/',
                pathRewrite: { '^/prod-api': '' }
            }
        },
    }
})
```

## Map

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235738.png)

执行 `npm run build` 构建项目后, 会在 /dist/js 下生成 Map 文件, 空间占用较大

代码经过压缩加密后, 如果运行时报错, 无法准确得知是哪里的代码出错了, 通过 Map 文件, 就可以像未压缩加密的代码一样, 准确得知哪里的代码出错

```js
// vue.config.js

module.exports = defineConfig({
    // 禁止打包后生成 Map 文件
    productionSourceMap: false,
})
```

# Error

## NavigationDuplicated: Avoided redundant navigation

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235739.png)

如果已经在 /search 路由了, 还通过编程式导航重复导航至 /search 路由, 会报错 NavigationDuplicated 的错误

声明式导航没有这个问题

```js
this.$router.push({name: "search"});
this.$router.replace({name: "search"});
```

push(), replace() 底层是通过 promise 实现的, 我们重复导航至同一个路由, 但没有处理 resolve(), reject(), 可以传入 resolve(), reject() 解决报错

```js
this.$router.push({name: "search"}, (value) => {
    console.log(value);
}, (reason) => {
    console.log(reason);
});
this.$router.replace({name: "search"}, (value) => {
    console.log(value);
}, (reason) => {
    console.log(reason);
});
```

为了简化书写, 可以传入 () => {} 解决报错

```js
this.$router.push({name: "search"}, () => {}, () => {});
this.$router.replace({name: "search"}, () => {}, () => {});
```

可以重写 VueRouter.prototype 的 push(), replace() 解决报错

```js
// src/router/index.js

// 复制 push(), replace()
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写 push(), replace()
VueRouter.prototype.push = function (location, resolve, reject) {
    console.log(this); // VueRouter

    // 如果 resolve() 和 reject() 存在, 就将 resolve() 和 reject() 传入了到 push() 中; 如果不存在, 就将 () => {} 传入到 push() 中
    if (resolve && reject) {
        // 通过 call() 调用 originPush(), 同时指定 this 为 VueRouter
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
}
```

## missing param for named router "search", Exprectd "keyword" to be defined

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235740.png)

配置了 params 参数后, 请求 search 路由时, 没有传递 params 参数, 就会爆出警告

```js
// src/router/index.js

export default new VueRouter({
    routes: [
        {
            // 配置了 params 参数
            path: "/search/:keyword",
            // 加上 "?" 后, params 就参数可传可不传了, 解决该警告
            path: "/search/:keyword?",
            component: Search,
            meta: {
                isShow: true
            },
            name: "search"
        }
    ]
})
```

## TypeError: Cannot read properties of undefined (reading 'category1Name')

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202305062235741.png)

categoryView 可能为 undefined, 访问 undefined 就会报错

```js
// src/store/Detail/index.js

const getters = {
    categoryView(state) {
        // 如果为 undefined 就传 {}, 避免访问 undefined
        return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
        // 如果为 undefined 就传 {}, 避免访问 undefined
        return state.goodsInfo.skuInfo || {};
    }
}
```
