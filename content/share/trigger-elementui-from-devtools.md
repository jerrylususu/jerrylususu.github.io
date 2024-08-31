---
title: 在 Devtools 里触发前端组件的内部状态更新
date: 2024-08-31T22:54:10+08:00
tags:
    - 前端
---

> 这个标题大概不太好理解；以下是对我遇到的问题，及我的解决方案的描述，在获得了相关上下文后，这个标题可能会稍微好理解一些。

背景：在我的工作中，时常需要使用一个内部的日志查询平台。在使用时，需要先指定日志的开始和结束时间，默认情况下开始时间会被设置为今日的0点，结束时间则被设置为今日的23:59:59。虽然大部分情况下默认值都足够了，但是有时我需要调整时间范围，例如，选择为昨天，或是选择为某个 unix timestamp / yyyy-MM-dd hh-mm-ss 的前后一分钟。但无论是从界面上选择日期，还是手动输入时间都有些麻烦。我想半自动化这一过程，例如写一些 userscript 来改善时间范围的选择体验。

问题：我需要在无法接触/修改前端源代码的情况下，用 js 修改这个日期选择器的值。

从类名中不难发现，这个日期时间选择器底层实际上就是 [Element UI 的 DateTimePicker](https://element.eleme.io/#/zh-CN/component/datetime-picker)。然而如果直接修改对应的 input 的 value，并不能满足要求，因为这只修改了表现层的输出，Vue 组件中的内部状态实际上没有更新（也可以从点击查询按钮后发出的网络请求中验证）。正确的做法是用 js 在对应的元素上触发合适的事件，让组件像处理用户输入那样处理我们的请求。那应该触发怎样的事件呢？

有几个思路可以找到对应的事件：
1. 使用 Chrome Devtools 自带的 [monitorEvents](https://developer.chrome.com/blog/quickly-monitor-events-from-the-console-panel-2?hl=zh-cn) ：首先用右键-审查元素在 DOM 树中定位到 input，然后右键"存储为全局变量"，会保存到 `temp1`，再在控制台输入 `monitorEvents(temp1)` 就可以观察到该元素上的所有事件了。然后像正常使用一样操作下选择器，可以看到触发的事件和参数。（mouse 相关事件会有很多坐标更新，杂音比较大）
2. 打开 Github 找到这个组件对应的[源码](https://github.com/ElemeFE/element/blob/dev/packages/date-picker/src/picker.vue#L2)，相关的 `@input` / `@change`  等方法也能说明该组件会处理的事件类型

但作为现代开发者，首先当然还是先问问 GPT 了；GPT 给了一个看起来很靠谱的 script，节选如下。其中基本把组件可能处理的事件都触发了一次。
```js
inputElement.click();
inputElement.value = '2024-08-31 12:34:56';
var inputEvent = new Event('input', { bubbles: true });
inputElement.dispatchEvent(inputEvent);
var changeEvent = new Event('change', { bubbles: true });
inputElement.dispatchEvent(changeEvent);
inputElement.blur();
```

这个 script 在官网的 demo 上的确可以用，但是很不幸在我的内部工具页面上并不行，会出现一个奇怪的 `Uncaught TypeError: Cannot read properties of undefined` 错误，点击调用栈的话只有 minified 的代码，完全看不出来是什么问题。到这里似乎陷入了僵局。然而进一步的实验发现，似乎这个问题只会在页面首次使用的时候出现；如果我手动先选择过一次日期时间，再用这个脚本就可以设置了。看了下组件源码，注意到组件在更新内部状态时，还会同步去更新 picker（弹出的日期弹框）里的值，是否可能是这个问题？有了这个模糊的思路之后，我再次开着 devtools 开始验证我的猜想。页面首次加载之后，DOM 树中并没有 picker 对应的节点，此时用脚本设置会失败；然而手动操作时，picker 节点会被创建，设置完成后被隐藏（但依然在 DOM 树中）；再次运行脚本，设置日期时间值成功了。看来的确是 picker 在脚本运行时没有正确被初始化导致的。

下一步就清晰一些了，只需要想办法在脚本操作之前，保证 picker 已经被初始化就好了；继续尝试了源码里的各种事件，最终发现可以用 `focus` 事件触发 picker 创建，用 `Esc` 可以让 picker 消失。（这一步其实试了很久，而且中间有几次把 `bubbles` 写成了 `bubble` 导致一直触发不成功）

最后得到的可以正常工作的脚本如下。虽然很丑陋，但是至少能用了...
```js
inputElement.dispatchEvent(new Event("focus", {bubbles: true}));
inputElement.click();
inputElement.value = '2024-08-31 12:34:56';
inputElement.dispatchEvent(new Event('input', { bubbles: true }));
inputElement.dispatchEvent(new Event('change', { bubbles: true }));
inputElement.blur();
inputElement.dispatchEvent(new KeyboardEvent("keydown", {key: 'Esc', keyCode: 27, bubbles: true}));
```