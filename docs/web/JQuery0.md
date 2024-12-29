# install JQuery

install JQuery

```js
curl -LJO https://code.jquery.com/jquery-3.7.1.min.js
```

import JQuery

```html
<script src="jquery-3.7.1.min.js"></script>
```

use JQuery

```js
$(function() {
    $('.oDiv').hide(); 
})
```

# JQuery object

```js
console.log(window.jQuery == $); // true
console.log(window.$ == jQuery); // true
console.log(window.jQuery == window.$); // true
console.log(Object.prototype.toString.call($));//'[object Function]'

// JQuery rename
let sun = $.noConflict(); // ƒ (e,t){return new ce.fn.init(e,t)}

let btn = document.querySelector(".btn"); // button.btn
let btn = $(".btn"); // ce.fn.init [button.btn, prevObject: ce.fn.init(1)]

// DOM to JQuery object
let btn = $(document.querySelector(".btn"));

// JQuery object to DOM
let btn = $(".btn")[0];
```

# entry function

```js
// similar to `window.onload = () => {...}`
$(function() {});
```

# selector

```js
// get the `<div>` with `.box` class
let $divList = $("div.box");

// get .box1 or #box2 or div
let $divList = $(".box1, #box2, div");

// get direct child element
let $liList = $("ul > li");

// get all child element
let $liList = $("ul li");

// get the third element
let $li = $("li:eq(2)");

let $liList = $("li:odd")

let $liList = $("li:even")

let $li = $("li").parent();

// get all parent node
let $nodeList = $("li").parents();

// similar to `$("ul > li")`
let $liList = $("ul").children("li");

// similar to `$("ul li")`
let $liList = $("ul").find("li");

// get the next element
let $li = $(".box").siblings("li");

// get all next element
let $liList = $(".box").nextAll("li")

// get all prev element
let $liList = $(".box").prevAll("li")

// similar to `$("div.box")`
let $liList = $("div").hasClass(".box")

// similar to `$(li:eq(2))`
let $li = $("li").eq(2);
```

# style operation

```js
console.log($div.width());

$div.width(200);

// get width + padding
console.log($div.innerWidth());

// get width + padding + border
console.log($div.outerWidth());

// get width + padding + border + margin
console.log($div.outerWidth(true));

// offset
console.log($son.offset()); // {top: 110, left: 110}
console.log($son.offset().top);
$son.offset({
    left: 300,
    top: 300
})

// position from the parent box
console.log($son.position()); // {top: 200, left: 200}
console.log($son.position().left);

// scrollTop
$(window).scroll(function () {
    console.log($(document).scrollTop());
});
$(document).scrollTop(100);

$div.css('color', 'pink');

$div.css({
    width: 200,
    height: 200,
    backgroundColor: 'skyblue'
})
```

# class operation

```js
$div.addClass("current");
$div.removeClass("current");
$div.toggleClass("current");
```

# DOM operation

```js
// get html
console.log($div1.html());

// set html
$div1.html('<span>hello</span>'); 

// get text
console.log($div2.text());

// set text
$div2.text('<span>hello</span>');

// get input value
console.log($input.val());

// set input value
$input.val(123);

// traverse DOM
$div.each(function (index, domElement) {
    // DOM to JQuery object
    $(domEle).css('backgroundColor', colors[i]);
});

// traverse object
let obj = {
    uname: 'sun',
    age: 18,
    sex: '男'
}
$.each(obj, function (key, value) {
    console.log(key, value);
});

// create element
let li1 = $('<li></li>');
let li2 = $('<li></li>');
let div1 = $('<div></div>');
let div2 = $('<div></div>');

// insert element
$('ul').append(li1);
$('ul').prepend(li2);
$('ul').after(div1);
$('ul').before(div2);

// remov element
$('div').remove();
$('ul').empty();
```

# exclusive operation

```js
$btn.click(function () {
    $(this).css('background', 'pink');
    $(this).siblings('button').css('background', '');
});
```

# chain programming

```js
$btn.click(function () {
    $("this").css('color', 'white').siblings(this).css('color', 'black');
}
```

# bind event

```js
$div.click(function () {
    console.log('hello world');
});

$div.on("click", function() {
    console.log("hello");
})

$div.on({
    click: function () {
        console.log("hello");
    },
    mouseenter: function () {
        console.log("hello");
    },
    mouseleave: function () {
        console.log("hello");
    }
})

$div.on('mouseenter mouseleave', function () {
    $div2.toggleClass('current');
});

// event delegate, clicking `ul` will not trigger the event, only clicking `li` will trigger an event
$ul.on('click', 'li', function () {
    console.log("hello world");
});

// clicking `ul` will trigger the event
$ul.on('click', function () {
    console.log("hello world");
});

// only trigger once
$div.one('click', function () {
    console.log('hello world');
});
```

# unbind event

```js
$div.off('click mouseenter');

// unbind all event
$div.off();

// unbind event delegate
$ul.off('click', 'li');
```

# toggle event

```js
$div.hover(function () {
    console.log('enter')
}, function () {
    console.log('leave')
});
```

# trigger event

```js
$div1.click();

$div1.trigger('click');

// trigger event and do not trigger the element's default behavior
$div1.triggerHandler('click');
```

# this

```js
$div.on("click", function () {
    console.log(this); // <div>hello world</div>
    console.log($(this)); // ce.fn.init [div]
});

$div.on("click", () => {
    console.log(this); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}
    console.log($(this)); // ce.fn.init [Window]
});
```

# animation

## hide animation

```js
$button.on('click', function () {
    $div.show('1000', 'swing', function () {
        console.log('end of animation')
    });
});

$button.on('click', function () {
    $div.hide('fast', 'linear', function () {
        console.log('end of animation');
    });
});

$button.on('click', function () {
    $div.toggle('slow', function () {
        console.log('end of animation')
    });
});
```

## slidedown animation

```js
$button.on('click', function () {
    $div.slideDown();
});

$button.on('click', function () {
    $div.slideUp();
});

$button.on('click', function () {
    $div.slideToggle();
});
```

## fadeout animation

```js
$button.on('click', function () {
    $div.fadeIn();
});

$button.on('click', function () {
    $div.fadeOut();
});

$button.on('click', function () {
    $div.fadeToggle();
});

$button.on('click', function () {
    $div.fadeTo(1000, 0.5);
});
```

## custom animation

```js
$button.on('click', function () {
    $div.animate({
        top: 200,
        left: 300,
        opacity: .5
    }, 1000, function () {
        console.log('end of animation');
    });
});
```

## stop animation

```js
$button.hover(function () {
    // stop the previous animation and then perform the new animation
    $div.stop().slideToggle();
});
```

# property

```js
console.log($a.prop("href"));
$a.prop("href", "www.baidu.com");
```

# storage

```js
$div.data('uname', 'sun');
console.log($div.data('uname'));
```

# extend

```js
let srcObj = {
    id: 0,
    sex: 'male',
    person: {
        name: 'sun',
        age: 18
    }
}

let destObj = {
    id: 1,
    email: 'sun@qq.com'
}

// shallow clone, 拷贝了 person 的地址, 所以修改 destObj 的 person, 也会修改 srcObj 的 person
$.extend(destObj, srcObj);

// deep clone, 拷贝了 person 的内容
$.extend(true, destObj, srcObj);

console.log(destObj); // {id: 0, email: 'sun@qq.com', sex: 'male', person: { name: 'sun', age: 18}}
```

# detail

# exercise

## checkbox

```js
// check all
$('.checkall').change(function () {
    $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'));
});

$('.j-checkbox').change(function () {
    if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
        $('.checkall').prop('checked', true);
    } else {
        $('.checkall').prop('checked', false);
    }
});
```

## scroll page

```js
let $back = $('.back');
let $container = $('.container');

let conTop = $container.offset().top;

$(window).scroll(function () {
    if ($(document).scrollTop() > conTop) {
        $back.fadeIn();
    } else {
        $back.fadeOut();
    }
});

$back.click(function () {
    $('body, html').stop().animate({
        scrollTop: 0
    }, 1000, function () {
        console.log('回退成功');
    });
});
```

## publish message

```html
<div class="box" id="weibo">
    <textarea name="" class="txt" cols="30" rows="10"></textarea>
    <button class="btn">publish</button>
    <ul></ul>
</div>

<script>

    let $btn = $('.btn');
    let $txt = $('.txt');
    let $ul = $('ul');

    $btn.on('click', function () {
        if ($txt.val() == '') {
            return false;
        }
        let li = $('<li></li>');
        li.html($txt.val() + "<a href='javascript:;'>delete</a>");
        $ul.prepend(li);
        li.slideDown();
        $txt.val('');
    });

    $ul.on('click', 'a', function () {
        $(this).parent().slideUp(function () {
            $(this).remove();
        });
    });
</script>
```

## todo list

```js
let todoList = [{
    title: '学习算法',
    done: false
}, {
    title: '四级听力练习',
    done: false
}];

localStorage.setItem('todo', JSON.stringify(todoList));

let obj = JSON.parse(localStorage.getItem('todo'));

console.log(obj[0], obj[1]);
```

