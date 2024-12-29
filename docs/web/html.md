# img

```html
<img decoding="async" src="smiley-2.gif" alt="Smiley face" width="42" height="42">
```

# a

```html
<a href="www.baidu.com" target="_blank">baidu</a>
```

# anchor link

```html
<a name="top">top</a>
...
<a href="#top">return to top</a>
```

# table

```html
<table>
    <thead>
        <tr>
            <th>head 1</th>
            <th>head 2</th>
            <th>head 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>(1, 1</td>
            <td>(1, 2)<td>
            <td>(1, 3)</td>
        </tr>
        <tr>
            <td>(2, 1)</td>
            <td>(2, 2)</td>
            <td>(2, 3)</td>
        </tr>
    </tbody>
</table>
```

# list

```html
<ul> 
  <li>hello</li>
  <li>hello</li>
  <li>hello</li>
</ul>

<ol>
  <li>hello</li>
  <li>hello</li>
  <li>hello</li>
</ol>
```

# form

```html
<form action = "/add" method = "post" enctype="multipart/form-data">
    username: <input type="text" autocomplete="on" placeholder="input username" required autofocus>
    password: <input type="password">
    email: <input type="email">
    url: <input type="url"/>
    date: <input type="date"/>
    time: <input type="time"/>
    number: <input type="number"/>
    telephone: <input type="tel"/>
    search: <input type="search"/>
    color: <input type="color"/>
    file: <input type="file" multiple>
    <input type="submit" value="submit">
</form>
```

# label

```html
<label for="input-name">username: </label> <input type="text" id="input-name">
```

# select

```html
<select>
   <option>option 1</option>
   <option>option 2</option>
   <option>option 3</option>
</select>
```

# textarea

```html
<textarea>hello world !!!</textarea>
```

# video

```html
<video src="media/movie.mp4" autoplay muted controls loop poster="media/mi9.jpg"></video>
```

```html
<!-- 从上往下执行, 先看 browser 只不支持 ogg, 再看支不支持 mp4, 如果都不支持, 就输出 error-->
<video controls="controls" width="300">
    <source src="movie.ogg" type="video/ogg" />
    <source src="movie.mp4" type="video/mp4" />
    <video>error</video>
</video>
```

# audio

```html
<audio src="media/music.mp3" autoplay controls loop></audio>
```

# progress

```html
<progress min="0" max="100" value="80" title="80"></progress>
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241812591.png)

# meter

```html
<meter min="0" max="100" value="50" title="50"></meter>
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241812592.png)

# ruby

```html
<ruby>绳<rt>sheng</rt>锯木断</ruby>
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241812593.png)

# mark

```html
aaaaaa<mark>aaa</mark>aaaa
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241812594.png)

