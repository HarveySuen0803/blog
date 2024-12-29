# DOM

## selector

```js
let box = document.getElementsByTagName("div");

let box = document.getElementById("box");

let box = document.getElementsByClassName("box");

let box = document.querySelect(".box");

let boxList = document.querySelectorAll(".box");

let body = document.body;
        
let head = document.head;

let node = div.parentNode;

let nodeList = ul.children;

// get first child node
let node = ul.firstChild;

// get first element child node
let node ul.firstElementChild;

// get next node
let node = div.nextSibling;

// get next element node
let node = div.nextElementSibling;
```

## DOM operatiom

```js
div.style.color = "pink";

div.className = "current";

div.id = "test";

let color = div.getAttribute("color");

div.setAttribute("index", "2");

div.removeAttribute("index");

div.setAttribute("data-index", "1")

let dataset = div.dataset;

div.innerHTML = "hello world";

// create node
let li = document.createElement("li");

// append node
ul.appendChild(li)

// insert node
ul.insertBefore(li, ul.children[0]);

// clone node
//   true  depth clone, clone both tag and content
//   false   shallow clone, only clone tag
let li = ul.children[0].cloneNode(true);
```

# BOM

## timeout

```js
let time = setTimeout(() => {
    console.log("hello world");
}, 1000)

btn.addEventListener("click", function() {
    clearTimeout(time);
})
```

## interval

```js
let time = setInterval(() => {
    console.log("hello world")
}, 1000)

btn.addEventListener("click", function() {
    clearInterval(time);
})
```

## location

```js
console.log(location.protocol);
console.log(location.host);
console.log(location.port);
console.log(location.pathname);
console.log(location.search);
console.log(location.hash);

// redirect url
location.assign("www.baidu.com");

// replace url
location.replace("www.baidu.com");

// reload page
location.reload();
```

## navigator

```js
console.log(navigator); // Navigator {vendorSub: '', productSub: '20030107', vendor: 'Google Inc.', maxTouchPoints: 0, scheduling: Scheduling, …}

if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    console.log("phone");
} else {
    console.log("computer");
}
```

## history

```js
history.back();
history.forward();
history.go(2); // forward 2 history page
```

# event

## bind event

```js
btn.onclick = function () {
    console.log("hello world");
};
```

```js
btn.addEventListener("click", function() {
    console.log("hello world");
})
```

## invoke event

```js
btn.click();
```

## event object

```js
btn.addEventListener("click", function(e) {
    console.log(e); // PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
    console.log(e.target); // <button class="btn">hello</button>
    console.log(e.type); // click
    e.stopPropagation;
})
```

## mouse event

```js
// disable the default action of the right-click pop-up menu
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

// disable the default action of selected content
document.addEventListener("selectstart", function(e) {
    e.preventDefault();
});
```

## keyboard event

```js
div.addEventListener("keydown", function(e) {
    conosole.log(e.keyCode);
});

div.addEventListener("keyup", function(e) {
    conosole.log(e.keyCode);
});
```

## window event

```js
// invoke after window loaded
window.addEventListener("load", function() {});

// invoke after DOM loaded
window.addEventListener("DOMContentLoaded", function() {});

// invoke after window resize
window.addEventListener("resize", function() {});

// invoke after window loaded (used for firefox)
window.addEventListener("pageshow", function() {});
```

## drag event

```html
<!-- drop box1 to box2 -->
<div class="box1" draggable="true"></div>
<div class="box2"></div>
```

```js
var box1 = document.querySelector(".box1"); // dragged element
var box2 = document.querySelector(".box2"); // target element

box1.addEventListener("dragstart", function () {
    box.style.background = "green";
});

box1.addEventListener("drag", function() {
    console.log(1);
})

box1.addEventListener("dragend", function() {
    box.style.background = "blue";
})

box2.addEventListener("dragenter", function () {
    box2.style.background = "blue";
});

box2.addEventListener("dragleave", function () {
    box2.style.background = "green";
});

box2.addEventListener("drop", function () {
    box2.style.background = "red";
    // by default, it is not allowed to release elements on it, so we need to block the default event
    e.preventDefault(); 
});

box2.addEventListener("dragover", function (e) {
    console.log(1);
    // by default, it is not allowed to drop element over block element, so we need to block the default event
    e.preventDefault();
});

// dataTransfer used for transfer string during the dragging process of elements
box1.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData(uname, "hello");
})
box2.addEventListener("drop", function (e) {
    alert(e.dataTransfer.getData(uname));
});
```

# storage

## localStorage

```js
localStorage.setItem('msg', 'hello word');
localStorage.setItem('person', JSON.stringify({name: 'sun', age: 18}));
```

```js
console.log(localStorage.getItem('msg'));
console.log(JSON.parse(localStorage.getItem('person')));
```

```js
localStorage.removeItem('msg');
localStorage.clear();
```

## sessionStroage

```js
sessionStorage.setItem("uname", val);
```

```js
console.log(sessionStorage.getItem("uname"));
```

```js
sessionStorage.removeItem("uname");
sessionStorage.clear()
```

# video

## play control

```js
let video = document.querySelector(".video");
let play = document.querySelector(".play"); // button

play.addEventListener("click", function () {
    if (video.paused) {
        video.play();
        play.src = "uploads/video_pause_64.png";
        play.title = "play";
    } else {
        video.pause();
        play.src = "uploads/video_play_64.png";
        play.title = "pause";
    }
});
```

## progress control

```js
let video = document.querySelector(".video"); // video
let rewink = document.querySelector(".rewink"); // button
let forward = document.querySelector(".forward"); // button
let progress = document.querySelector(".progress"); // progress bar

rewink.addEventListener("click", function () {
    video.currentTime -= 5;
});

forwards.addEventListener("click", function () {
    video.currentTime += 5;
});

progress.addEventListener("click", function(e) {
    video.currentTime = e.clientX / progress.clientWidth * video.duration; 
})
```

## volume control

```js
let video = document.querySelector(".video");
let volumeUp = document.querySelector(".volume-up"); // button
let volumeDown = document.querySelector(".volume-down"); // button
let volume = document.querySelector(".volume"); // progress bar

volumeUp.addEventListener("click", function () {
    if (video.volume >= 0.9) {
        return;
    }
    video.volume += 0.1;
    vol.value = video.volume;
});

volumeDown.addEventListener("click", function () {
    if (video.volume <= 0.1) {
        return;
    }
    video.volume -= 0.1;
    vol.value = video.volume;
});

volume.addEventListener("change", function () {
    video.volume = volume.value;
});
```

## progress bar

```html
<video id="video" src="media/a.mp4" ontimeupdate="show()" controls loop></video> 
```

```js
function show() {
    progress.value = video.currentTime / video.duration * progress.max;
}
```

# animation

## constant speed

```js
function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        if (obj.offsetLeft >= target) {
            clearInterval(obj.timer);
        }
        obj.style.left = obj.offsetLeft + 1 + "px";
    }, 30);
}
```

## variable speed

```js
function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
        }
        obj.style.left = obj.offsetLeft + step + "px";
    }, 15);
}
```

## encap animate.js

```js
function animate(obj, target, callBack) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (callBack) {
                callBack();
            }
        }
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + "px";
    }, 15);
}
```

# exercise

## remember username

```html
<input type="text" id="username"/>
<input type="checkbox" id="remember"/> remember username
<script>
    let username = document.querySelector("#username");
    let remember = document.querySelector("#remember");
    if (localStorage.getItem("username")) {
        username.value = localStorage.getItem("username");
        remember.checked = true;
    }
    remember.addEventListener("change", function () {
        if (remember.checked) {
            localStorage.setItem("username", username.value);
            return;
        }
        localStorage.removeItem("username");
    });
</script>
```



