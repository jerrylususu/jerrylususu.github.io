---
title: 在 devtool 控制台里爬网站
date: 2023-08-20T19:18:26+08:00
tags:
    - 前端
---

最近需要从某个不提供 API 接口的网站爬数据。F12 切换到网络标签页，然后重载页面，可以轻松的观察到其实其实后台是有提供给前端的 API 的。（形如 `POST /api/entity/:id`）。用 Edge 浏览器自带的 “编辑并重新发送” 功能测试，手动也可以调通。（这是 Edge 浏览器一个超棒的功能，对于偶尔的小调试可以替代 Postman）。理论上到了这一步就可以写点 Python 把数据遍历 ID 把数据爬下来了，不过可能还要处理一些 cookie 之类的麻烦事。与其再写个外部脚本，为什么不在浏览器的控制台里直接写脚本爬呢？

大概框架如下：
```js
const idList = [1,2,3]; 
const results = [];
for (const id of idList) {
    const resp = await fetch(/* */); // F12 网络标签页，右键请求，复制 - 复制为 fetch
    const json = await resp.json()
    results.push({id, json});
    await sleep(1000); // 限制频率
}
console.save(results)
```

还需要一些辅助函数：
```js
// 可以 await 的 sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


// 以 JSON 保存 console 中的变量
// src: http://bgrins.github.io/devtools-snippets/#console-save
// via: https://stackoverflow.com/questions/11849562/how-to-save-the-output-of-a-console-logobject-to-a-file
(function(console){

console.save = function(data, filename){

    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
 }
})(console)
```

以上，祝使用愉快！