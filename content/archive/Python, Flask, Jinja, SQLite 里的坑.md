---
title: Python, Flask, Jinja, SQLite 里的坑
tags:
  - 坑
  - 分享
date: 2017-08-14
---
上完 CS50，决定按照课程进度完成最后的 Final Project。于是开发了 Project SFLS ♫，途中遇到了许多坑，记载如下。
<!-- more -->

## 400 Bad Request
问题：表单与后台程序不匹配（后台调用了表单里没有的项）
坑：手动用不可见文本框传递id，但是误将`readOnly`设置成了`disabled`，id读取不能，于是报错。重新改回来即可解决，亦可使用`session`中转。

## Bootstrap 框架不对劲
问题：本来是10-2的排布，但是却变成上面2 下面10
坑：最后发现上面的`<table>`没有写`</table>`，造成10继续向下继承。手动修正即可。

## SQLite 新建字段出错
问题：建立表后再追加字段，选择`NOT NULL`属性报错
坑：SQLite就是这样设定的。

## SQLite 多层 SQL 嵌套
问题：部分请求中一个 SQL 套一个 SQL，难以判断。
解决：SQLite 支持视图属性，可用其作为临时表。

## SQLite `count(*)` 不能在 Python 中调用
问题：在 Python 中引用 db.execute 出来的 `count(*)`，总是提示失败
坑：似乎`*`是 Python 中的特殊字符，不能乱用
解决：用 as 将`count(*)`改写为 `c` 即可。

## SQLAlchemy 获取出来的是 Proxy 对象，不能判断存在
解决：用自带的 `.scalar()` 方法，在不存在时能返回`None`。

## SQLAlchemy 获取出的 Proxy 对象，其中的值难以操作
坑：试图对`lang`进行转换，但是提示 `Proxy`对象不可用。
解决：用 `CS50` 函数库中中的 `SQL`解决，本质上就是对 SQLAlchemy 的二次封装，获取出来的直接就是`dict`格式，更好用了。

## SQL 返回单条结果，读取信息报错
坑：虽然返回的是单条结果，但是还是要用`for elem in dict`处理得到真正的单条数据。

## Validator.js 字段匹配总是出错
坑：#指定的是id而不是name，要再设定一次id

## Python 3 编码报错
坑：代码中有中文，提示`not an ASCII character`
解决：文件头加上`#coding UTF-8`

## Excel 导出的 CSV 无法在 SQLite 上导入
坑：Excel 导出 CSV 的默认文件编码是 ASCI
解决：用记事本打开，另存为 UTF-8

## Flask 的消息闪现不显示
解决：检查 layout.html 中页面逻辑，先用`with`获取，再用`for`得到具体的闪现消息。

## 页面多次重载结果不同
解决：清空 gunicorn 缓存，重启服务器。

## Jinja 2 渲染出的文本框露出下一参数
解决：看看引号是否完全加上了

## Python 提示变量定义前使用
解决：global
