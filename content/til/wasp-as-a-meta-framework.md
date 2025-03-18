---
title: Wasp - 用于构建全栈网站的元框架
date: 2025-03-18T15:54:33.214Z
---

一个看起来比较有趣的项目。构建网站的时候通常有很多重复工作（登录/鉴权/邮件...）。为了减少重复，作者提出了一种元框架，在现有的前后端框架之上再叠加一层，写一些 DSL 来定义一个“网站”，然后再通过一个自定义的“编译器”生成底层的框架结构。

虽然感觉能解决一些常见问题，但是如果不能满足需求的话，自定义起来可能会是灾难。

DSL 示例如下：

```
app todoApp {
  title: "ToDo App",  // visible in the browser tab
  auth: { // full-stack auth out-of-the-box
    userEntity: User, 
    methods: { google: {}, gitHub: {}, email: {...} }
  }
}

route RootRoute { path: "/", to: MainPage }
page MainPage {
  authRequired: true, // Limit access to logged in users.
  component: import Main from "@client/Main.tsx" // Your React code.
}

query getTasks {
  fn: import { getTasks } from "@server/tasks.js", // Your Node.js code.
  entities: [Task] // Automatic cache invalidation.
}
```


src: https://wasp.sh/