---
title: Markdown 表格内的代码块
date: 2021-04-09T17:10:00+03:00 
tags:
  - 坑
  - Python
---

Markdown 自带表格支持，不过表格内只支持基本的文本格式（加粗、斜体、inline code 等），而不支持更复杂的文本格式（如代码块、水平线）。如果需要在表格中加上复杂格式支持，如果使用的是 Github Flavored Markdown，一种做法是用 HTML 定义表格框架，再在内部 inline Markdown 文本，示例如下。

需要注意之处：
- 对应的 table cell 的 `<td>`, `</td>` 标签需要在新行的行首（前面不能有缩进）
- table cell 内的 Markdown 文本上下和 `<td>`, `</td>` 标签之间需要间隔一个空行


效果：

<table>
<tr>
<td> Column 1 </td> <td> Column 2 </td>
</tr>
<tr>
<td> Code Block </td>
<td>

```python
print("hello world")
```

</td>
</tr>
<tr>
<td> Horizontal Line </td>
<td>

**Markdown** 

---

Some Text

</td>
</tr>
</table>

代码：**注意代码块结束应该是 3 个 tilt**（这里写两个是因为三个会导致渲染出错，提早结束代码块）

```html
<table>
<tr>
<td> Column 1 </td> <td> Column 2 </td>
</tr>
<tr>
<td> Code Block </td>
<td>                           <!--line start-->
                               <!--empty line-->
```python
print("hello world")
``                             <!--Should be 3 tilt here!-->
                               <!--empty line-->
</td>                          <!--line start-->
</tr>
<tr>
<td> Horizontal Line </td>
<td>

**Markdown** 

---

Some Text

</td>
</tr>
</table>
```

参考链接：
- https://stackoverflow.com/a/60502719