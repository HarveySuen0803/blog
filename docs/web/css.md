# CSS

```html
<body>
    <div class="nav">hello world</div>
</body>
<style>
    .nav {
        color: red;
    }
</style>
```

# import CSS file

```html
<link rel="stylesheet"  href="style.css">
```

# selector

```css
* {}

/* element selector */
div {}

/* name selector */
#nav {}

/* class selector */
.nav {}

/* select progeny */
ol li {}

/* select both `<div>` and `<p>` */
div, p {}

/* select direct progeny */
div > a {}

/* pseudo selector */
a:hover {}
a:active {}
a:link {}
a:visited {}
input:focus {}

/* select `<input>` with `type="text"`*/
input[type="text"] {}

/* select `<div>` with `icon` at the beginning of the class */
div[class^="icon"] {}

/* select `<section>` with `data` at the end of the class */
section[class$="data"] {}

ul li:first-child {}

ul li:last-child {}

/* select the third child element */
ul li:nth-child(3) {}

ul li:nth-child(odd) {}

ul li:nth-child(even) {}

/* select all*/
ul li:nth-child(n) {}

/* select 3 6 9 */
ul li:nth-child(3n) {}

/* select 3 4 5 ... */
ul li:nth-child(n + 3) {}

/* select 1 2 3 */
ul li:nth-child(-n + 3) {}

/* select by order and require the same type */
ul li:first-of-type {}

ul li:last-of-type {}

ul li:nth-of-type(2) {}

/* create a inline element before */
div::before {
    /* required content property */
    content: 'hello world';
}

div::after {
    content: 'hello world';
}
```

# font style

```css
div {
    font-size: 16px;
    font-family: 'FiraCode NF';
    font-weight: 700;
    font-style: normal;
    
    font: italic blod 30px/150px 新宋体;
}
```

# text style

```css
div { 
    color: red;
    text-align: center;
    text-decoration：underline；
    text-indent：2em
    line-height: 100px;
}
```

# tag style

```css
input {
    outline: none; 
}

/* prohibit modification of window size */
textarea{ 
    resize: none;
}
```

# display

block element `<h1> <h2> <h3> <h4> <h5> <h6> <p> <div> <ul> <ol> <li>`

inline element `<a> <strong> <b> <em> <i> <del> <s> <ins> <u> <span>`

inline-block element `<img/> <input/> <td>`

```css
div {
    display: inline-block
}
```

# background

```css
div {
    width: 300px;
    height: 300px;
    background-color: pink;
    background-image: url(../../img/a.png);
    background-repeat: no-repeat;
    background-position: top center;
    background-attachment: fixed;
    background: rgba(0, 0, 0, 0.3);

    background: teal url(../../img/a.png) no-repeat fixed top center;
}
```

# property inheritance

[property inheritance](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#%E7%90%86%E8%A7%A3%E7%BB%A7%E6%89%BF)

[which attributes have inherited properties](https://www.cnblogs.com/wuqilang/p/16104338.html)

# border

```css
div {
    border: 1px solid red; 
}
```

Specifying `boder` will additionally increase the actual size of the box.

We can take `width` and `height` minus the `border` to keep the original size of the box

# padding

```css
div {
    padding-left: 20px;
}
```

If the box already has `width` or `hight`, specifying `padding` will increase the width of the box.

If the box does not specify `width` or `hight`, and then specify `padding`, the box will not be large.

We can take `width` and `height` minus the `padding` to keep the original size of the box

# margin

```css
div {
    margin: auto;
    /* margin: [up-down] [left-right] */
    margin: 100px auto;
    /* margin: [up] [right] [down] [left] */
    margin: 0 0 0 0;
}
```

center the box horizontally

```css
.header {
    /* must specify height and width */
    height: 200px;
    width: 200px;
    
    margin: 0 auto;
}
```

remove all `padding` and `margin`

```css
* {
    padding: 0;
    margin: 0;
}
```

# margin collapse

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241812049.png)
When `margin` is both set for adjacent block elements, it will cause margin collapse.

set `margin` to one block element to solve the problem

set a transparent `border` to parent node to solve the problem

```css
div {
    border: 1px solid transparent;
}
```

set a `padding` to parent node to solve the problem

```css
div {
    padding: 1px;
}
```

set `overflow` to parent node to solve the problem

```css
div {
    overflow: hidden;
}
```

# border-radius

```css
div {
    border-radius: 10px;
}

/* circle */
div {
    width: 200px;
    height: 200px;
    background-color: pink;
    border-radius: 50%;
}
```

# box-shadow

```css
div {
    /* box-shadow: h-shadow v-shadow blur spread color inset; */
    box-shadow: 10px 10px 10px 10px black;
}
```

# text-shadow

```css
/* text-shadow: h-shadow v-shadow blur color; */
text-shadow: 5px 5px 6px rgba(0, 0, 0.3, 80%);
```

# float

```css
div {
    float: right;
}
```

加入浮动后, 盒子会脱离标准流, 浮动的元素具有行内块元素的特性, 会在一行内显示, 并且元素顶部对齐, 不会有缝隙的贴靠在一块, 如果父级宽度装不下这些浮动的盒子, 多出来的盒子会另起一行浮动

一般先用标准流的父元素排列上下位置, 之后内部子元素采取浮动排列左右位置, 一个元素浮动了, 会影响后面的标准流, 不会影响前面的元素, 所以后面的元素也要浮动

父级块元素包含着子级元素, 如果子级元素的高度大于父级元素的高度, 当不浮动的时候,子级元素会撑大父级元素, 当浮动的时候,子级元素不会撑大父级元素, 会造成高度塌陷

# clear float

add `overflow: hidden` to clear float

```html
<div class="div1"></div>
<div class="box">
    <div class="div2"></div>
</div>
<div class="div3"></div>

<style>
    .div1 {
        background-color: pink;
        width: 100px;
        height: 100px;
    }
    
    .div2 {
        background-color: blue;
        width: 100px;
        height: 100px;
        float: right
    }

    .div3 {
        background-color: green;
        width: 100px;
        height: 100px;
    }
    
    .box {
        overflow: hidden
    }
</style>
```

add a blank tag `<div style="clear: both"></div>` to clear float

```html
<div class="div1"></div>
<div class="box clearfix">
    <div class="div2"></div>
</div>
<div class="div3"></div>

<style>
    .div1 {
        background-color: pink;
        width: 100px;
        height: 100px;
    }
    
    .div2 {
        background-color: blue;
        width: 100px;
        height: 100px;
        float: right
    }

    .div3 {
        background-color: green;
        width: 100px;
        height: 100px;
    }
    
    .clearfix::after {  
        content: ""; 
        display: block; 
        height: 0; 
        clear: both; 
        visibility: hidden;  
    }
</style>
```

# position

```css
div { 
    /* default position */
    position: static; 
}

div {
    /* move relative to the original position */
    position: relative;
}

div {
    /* move relative to the original position, detach from the standard flow */
    position: absolute;
}

div {
    /* fixed relative to the window, detach from the standard flow */
    position: fixed; 
}

div {
    /* it is fixed when it is 100px from the top of the page */
    position: sticky; 
    top: 100px;
}
```

元素添加绝对定位和固定定位后, 会脱标, 变成行内块元素, 不会触发外边距塌陷, 一般父级相对定位, 做布局, 子级绝对定位, 做内容

# z-inex

```css
div {
    /* set the display level after the element out of the standard flow */
	z-index: 1; 
}
```


# visibility

```css
div {
    /* hide the content, occupy the position */
    visibility：hidden;
}
```

# overflow

```css
div {
    /* overflow: [hidden | visible | scroll | auto] */
    overflow: hidden
}
```

# vertical-align

```css
/* center the image and text */
img {
    /* vertical-align: [baseline | top | middle | bottom]  */
    vertical-align: middle;
}
```

# text-overflow

single line

```css
div {
    width: 100px;
    height: 200px;
    white-space: nowrap;
    overflow: hidden;
    /* text-overflow: [clip | ellipsis | ellips-word] */
    text-overflow: ellipsis;
}
```

multi line

```css
div {
    width: 100px;
    height: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```

# warp

```css
div {
    /* white-space: [normal | pre | nowarp | pre-line]*/
    white-space: nowrap;    

    /* word-wrap: [normal | break-down] */
    word-wrap: break-word;

    /* word-break: [normal | keep-all | break-strick | break-all] */
    word-break: breal-all;
}
```

# box-sizing

```css
div {
    width: 200px;
    height: 200px;
    margin: 100px auto;
    background-color: pink;
    border: 100px solid tomato;
    padding: 20px 0;
    /* set box size to actual width, ignore the border and padding */
    box-sizing: border-box;
}
```

init style

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

# filter

```css
img {
    filter: blur(5px);
}
```

# transition

```css
div {
    width: 100px;
    /* transition: [property name] [duration] [easing function] [delay] */
    transition: width 2s ease-in-out 0.5s;
}

div:hover {
    width: 200px;
}
```

# transform

```css
transform: translate(100px, 200px);

transform: translate(50%, 30%);

transform: translateX(50px);

transform: translateY(-100px);

transform: rotate(180deg);

/* width magnify 0.5 times, height magnify 2 times */
transform: scale(0.5, 2);

/* magnify 3 times */
transform: scale(3);

/* the central point of an element */
transform-origin: left bottom;

transform: translate(100px, 100px) rotate(180deg) scale(1.5);

transform: translateX(100px) translateY(100px) translateZ(100px);

transform: translate3d(0, 100px, 100px);

transform: translate3d(1, 1, 0, 45deg);
```

# animation

```css
@keyframes move {
    0% {
        transform: translateX(0px);
    }
    100% {
        transform: translate(300px);
    }
}

div {
    margin: 100px 0;
    width: 100px;
    height: 100px;
    background-color: pink;
    animation-name: move;
    animation-duration: 2s;
}
```

```css
@keyframes move {
    from {
        transform: translateX(0px);
    }
    to {
        transform: translate(300px);
    }
}
```

```css
div {
    /* animation: [animation name] [duration] [easing function] [delay] [iteration count] [direction] [fill mode] */
    animation: move 2s linear 0s infinite alternate backwards;
}
```

# private prefix

```css
div {
    /* `-moz-` used for firefox */
    -moz-border-radius: 10px;
    /* `-ms-` used for ie */
    -ms-border-radius: 10px;
    /* `-0-` used for opera*/
    -o-border-radius: 10px;
    /* `-webkit-` used for chrome */ 
    -webkit-border-radius: 10px;
}
```

# exercise

## drop-down box

![image-20210803165331086](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202206170907169.png)

```css
@font-face {
    font-family: "icomoon";
    src: url("fonts/icomoon.eot?1lv3na");
    src: url("fonts/icomoon.eot?1lv3na#iefix") format("embedded-opentype"), url("fonts/icomoon.ttf?1lv3na")
      format("truetype"), url("fonts/icomoon.woff?1lv3na") format("woff"), url("fonts/icomoon.svg?1lv3na#icomoon")
      format("svg");
    font-weight: normal;
    font-style: normal;
    font-display: block;
}

div {
    position: relative;
    width: 200px;
    height: 35px;
    border: 1px solid black;
}

div::after {
    position: absolute;
    top: 10px;
    right: 10px;
    font-family: "icomoon";
    content: "";
}
```

## progress bar

![image-20210803183505546](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202206170907174.png)


```html
<body>
    <div class="bar">
        <div class="bar_in"></div>
    </div>
</body>
```

```css
.bar {
    width: 200px;
    height: 10px;
    border: 1px solid tomato;
    border-radius: 15px;
    padding: 1px;
    box-sizing: border-box;
}

.bar_in {
    width: calc(100% - 100px);
    height: 100%;
    border-radius: 15px;
    background-color: tomato;
    transition: width 2s ease-in-out 0.5s;
}

.bar_in:hover {
    width: 100%;
}
```
