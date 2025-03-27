---
title: 让 LLM 从文件生成美观的网页的 prompt
date: 2025-03-27T14:16:48.630Z
---

之前看到过这种低饱和度的美观网页，不过从这个 prompt 才知道原来可以这个组件库叫做 [Preline UI](https://preline.co/)。仅仅是声明特定组件库，就可以对输出效果有巨大影响。Deepseek V3 最近的更新应该也起到了很大作用。

用手头的不同模型试了下，Claude 3.7 / Deepseek V3 / Genimi 2.5 Pro 基本都在一个水平线上。用 Cursor/Windsurf 的话需要注意单次连续输出可能超出长度限制；网页对话的话可能会因为每次输出都会重跑语法高亮导致页面卡死，建议生成过程中切换到其他标签页。

虽然效果很好，但是目前用 Tailwind 会导致模型消耗大量 token 在各种类名上。可能如果有更语义化的框架会更有效率一些？

具体 prompt 如下，来源附后：
```
我会给你一个文件，分析内容，并将其转化为美观漂亮的中文可视化网页：
## 内容要求
- 所有页面内容必须为简体中文
- 保持原文件的核心信息，但以更易读、可视化的方式呈现
- 在页面底部添加作者信息区域，包含：    
  - 作者姓名: []    
  - 社交媒体链接: 至少包含Twitter/X
  - 版权信息和年份

## 设计风格
- 整体风格参考Linear App的简约现代设计
- 使用清晰的视觉层次结构，突出重要内容
- 配色方案应专业、和谐，适合长时间阅读

## 技术规范
- 使用HTML5、TailwindCSS 3.0+（通过CDN引入）和必要的JavaScript
- **使用CDN引入Preline UI组件库，按需使用其组件增强界面效果**
- **根据提供的JSON文件内容（颜色、字体等）配置TailwindCSS的样式Token，确保设计一致性**
- 实现完整的深色/浅色模式切换功能，默认跟随系统设置
- 代码结构清晰，包含适当注释，便于理解和维护

## 响应式设计
- 页面必须在所有设备上（手机、平板、桌面）完美展示
- 针对不同屏幕尺寸优化布局和字体大小
- 确保移动端有良好的触控体验

## 媒体资源
- 使用文档中的Markdown图片链接（如果有的话）
- 使用文档中的视频嵌入代码（如果有的话）

## 图标与视觉元素
- 使用专业图标库如Font Awesome或Material Icons（通过CDN引入）
- 根据内容主题选择合适的插图或图表展示数据
- 避免使用emoji作为主要图标

## 交互体验
- 添加适当的微交互效果提升用户体验：    
  - 按钮悬停时有轻微放大和颜色变化    
  - 卡片元素悬停时有精致的阴影和边框效果    
  - 页面滚动时有平滑过渡效果    
  - 内容区块加载时有优雅的淡入动画

## 性能优化
- 确保页面加载速度快，避免不必要的大型资源
- 图片使用现代格式(WebP)并进行适当压缩
- 实现懒加载技术用于长页面内容

## 输出要求
- 提供完整可运行的单一HTML文件，包含所有必要的CSS和JavaScript
- 确保代码符合W3C标准，无错误警告
- 页面在不同浏览器中保持一致的外观和功能
请根据上传文件的内容类型（文档、数据、图片等），创建最适合展示该内容的可视化网页。


参考导入
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/preline@1.8.0/dist/preline.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/preline@1.8.0/dist/preline.min.js"></script>
```


src: https://mp.weixin.qq.com/s/fxzb8m-THjyzdOlXPuCFnQ