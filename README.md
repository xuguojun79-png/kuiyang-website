# 口腔溃疡21天陪伴式康复系统

一套可双击打开的静态网站，用 21 天计划、症状自查、护理日记和饮食百科，帮助建立更稳妥的居家护理节奏。

## 如何打开

直接双击根目录的 `index.html`，用浏览器打开即可。无需安装 Node.js、无需打包。

计划打卡、日记和社区帖子保存在当前浏览器的本地存储（localStorage）中。清除浏览器站点数据后，这些记录会消失。

## 目录

```
kuiyang-website/
├── index.html
├── plan.html
├── self-check.html
├── tracker.html
├── report.html
├── wiki.html
├── diet.html
├── community.html
├── about.html
├── articles/
│   ├── article-1.html
│   ├── article-2.html
│   └── article-3.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── plan.js
│   ├── self-check.js
│   ├── tracker.js
│   ├── report.js
│   └── community.js
└── README.md
```

## 页面说明

| 页面 | 作用 |
| --- | --- |
| 首页 | 横幅、功能入口、三篇科普文章 |
| 21天计划 | 三个 7 天阶段，本地保存进度和每日任务 |
| 自查 | 引导 → 6 道选择题 → 结果提醒 |
| 日记 | 记录疼痛、睡眠、压力，可删除 |
| 周报 | 读取日记，计算均分和趋势 |
| 百科 | 分类筛选，链接到文章 |
| 饮食 | 搜索 + 推荐 / 慎吃 / 忌口 |
| 社区 | 发帖、点赞，数据仅本机保存 |
| 关于 | 使用方式与免责说明 |

## 路径说明

根目录页面引用 `css/style.css` 和 `js/*.js`。  
`articles/` 中的文章页使用 `../css/style.css` 与 `../js/main.js`，避免样式丢失。

## 免责声明

本站内容仅供健康科普参考，不能替代专业医疗诊断。如有严重症状或持续不愈，请及时就医。
