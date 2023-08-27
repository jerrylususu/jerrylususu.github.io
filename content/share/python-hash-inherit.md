---
title: Python __hash__ 继承
date: 2021-04-09T17:06:00+03:00 
tags:
  - 坑
  - Python
---

最近写作业的时候踩上了一个 Python 的坑：

如果父类实现了 `__hash__` 方法，而子类重写了 `__eq__` 方法，为了保证 hash 和 eq 的语义一致，子类不会隐式继承父类的 `__hash__` 方法。如果需要子类的 `__hash__` 方法调用父类的实现，则需要手动声明。

这个之所以是一个坑，因为在代码中的行为看起来很正常：
- Pycharm 的方法跳转可以定位到父类 `__hash__` 方法
- inspect.getmro 的父类列表正常
- dir(object) 得到的方法列表中的确含有 `__hash__`

[文档](https://docs.python.org/3/reference/datamodel.html#object.__hash__)原文：
> A class that overrides `__eq__()` and does not define `__hash__()` will have its `__hash__()` implicitly set to None.

> If a class that overrides `__eq__()` needs to retain the implementation of `__hash__()` from a parent class, the interpreter must be told this explicitly by setting `__hash__ = <ParentClass>.__hash__`.

具体的[实现](https://github.com/python/cpython/blob/master/Objects/typeobject.c#L5432)（基于 CPython）

1. `inherit_slots` 函数负责继承 slots [Line 5432](https://github.com/python/cpython/blob/master/Objects/typeobject.c#L5432) 
2. `inherit_slots` 在处理比较相关的函数（comparison-related）的时候（[Line 5432](https://github.com/python/cpython/blob/master/Objects/typeobject.c#L5432)），会使用 `overrides_hash` 方法检查子类是否有重写 `__eq__`, `__hash__` ([Line 5274](https://github.com/python/cpython/blob/master/Objects/typeobject.c#L5274))
3. `overrides_hash` 中使用 `_PyDict_ContainsId` 方法先检查 `__eq__`，再检查 `__hash__`，如果任一存在则返回 1，否则返回 0
4. 如果 `overrides_hash` 返回 1，则认为不能继承父类的 `__hash__` 方法，`type->tp_hash` 不会被设定 


以下为一个示例：


<table>
<thead>
  <tr>
    <th>Original</th>
    <th>Modified </th>
  </tr>
</thead>
<tbody>
  <tr>
<td width="50%">

```python
class Parent:
    def __hash__(self):
        return 1

class Child(Parent):
    def __eq__(self, other):
        return True

    # No __hash__ defined



if __name__ == '__main__':
    child = Child()

    # gives error
    print(child.__hash__())
```    
    
</td>

<td>

```python
class Parent:
    def __hash__(self):
        return 1

class Child(Parent):
    def __eq__(self, other):
        return True
    
    # NOTE: Added hash
    __hash__ = Parent.__hash__


if __name__ == '__main__':
    child = Child()

    # now it works
    print(child.__hash__())
```




</td>
</tr>
  <tr>
<td>

```
Traceback (most recent call last):
  File "scratch.py", line 17, in <module>
    print(child.__hash__())
TypeError: 'NoneType' object is not callable
```

</td>
<td>

```
1
```

</td>
  </tr>
</tbody>
</table>


相关链接：
- [`Stack Overflow - Python - Using the default __hash__ method in __hash__ method definition`](https://stackoverflow.com/questions/11716258/python-using-the-default-hash-method-in-hash-method-definition)
- [`Stack Overflow - Inheritance - __hash__ sets to None in a subclass`](https://stackoverflow.com/questions/53518981/inheritance-hash-sets-to-none-in-a-subclass)
- [`Python Doc - object.__hash__`](https://docs.python.org/3/reference/datamodel.html#object.__hash__)

