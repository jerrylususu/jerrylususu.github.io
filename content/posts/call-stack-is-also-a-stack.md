---
title: 调用栈也是栈
date: 2021-08-22T22:02:00+03:00
description: 直接上 eval 就好了
tags:
  - 题
  - hack
---

又到了秋招的季节，刷题的时候遇到了一道有趣的题，简化如下：

* 定义一类字符串为 NB 串，每个 NB 串有一个对应的 NB 值
* 空串是一个 NB 串，且其 NB 值为 1
* 对一个 NB 串，在其两侧加上括号后依然是一个合法的 NB 串，且其 NB 值为原串 NB 值加 1
* 对两个 NB 串，将其拼接后依然是一个合法的 NB 串，且其 NB 值为两个原串 NB 值的乘积

* 问：给定一个已知合法的 NB 串，求其 NB 值

* 样例

  ```
  (())() -> 3*2 = 6
  (()())() -> 5*2 = 10
  ()()()(()) -> 2*2*2*3 = 24
  ```



看到括号，第一反应当然是用栈。先想了一会有没有只扫描一遍字符串的做法，但是很可惜没想出来。最后想了一个先构造树，再在树上遍历的做法，解答如下。

```java
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;

public class NBString {
    public static void main(String[] args) {
        String s = "(()())()";
        NBNode root = buildTree(s);
        System.out.println(getNode(root) - 1);
    }

    public static NBNode buildTree(String s){
        NBNode root = new NBNode(null);
        char[] chars = s.toCharArray();
        Stack<NBNode> stack = new Stack<>();

        for (int i = 0; i < chars.length; i++) {
            char c = chars[i];

            if(c=='('){
                NBNode father;
                if(stack.isEmpty()){
                    father = root;
                } else {
                    father = stack.peek();
                }

                NBNode newNode = new NBNode(father);
                father.child.add(newNode);
                stack.push(newNode);

            } else if (c==')'){
                stack.pop();
            }
        }

        return root;

    }

    public static int getNode(NBNode node){
        if(node==null) return 1;
        int layerProd = 1;
        for (NBNode NBNode : node.child) {
            layerProd *= getNode(NBNode);
        }
        return layerProd + 1;
    }

}

class NBNode {
    NBNode head;
    List<NBNode> child;

    public NBNode(NBNode _head){
        head = _head;
        child = new LinkedList<>();
    }
    
}
```

但是如果换个角度来看，其实题目描述的 NB 串，可以被视为是一个简单的类型定义，语法大致如下。然后要做的，就是把输入数据视作代码，构造抽象语法树，然后在语法树上操作得到结果了。

```
NBString = "" | "(" NBString ")" | NBString NBString
```

如果 OJ 提供了类似于 Haskell 之类内置支持模式匹配的语言，那么就很简单了：把输入 tokenize，写一个 `calc` 函数，然后直接按照题目要求写匹配规则和返回值就好了。伪代码如下。

```
calc :: NBString -> Int
calc = match str
	case "": return 1
	case "(" sub ")": return 1 + calc sub
	case sub1 sub2: return calc sub1 * calc sub 2
```

然而现实并没有这么美好。但是难道就应该就此放弃吗？未必。实际上编程语言内的调用栈，也是一个栈，或者说语言本身就提供了我们所期望的解析语法树的功能。高人指点之下，可以用以下的 hack 来实现：

```python
def f(x=1):
    return x+1

s = "(()())()"
s = s.replace("(","f(").replace(")f(",")*f(")
print(eval(s))
```

上文代码所做的，实际上就是把输入串，替换成了一系列函数调用，并添加了符合题目要求的函数体。最后只需要直接调用 Python 内置的 `eval`，就可以得到正确的答案了。
