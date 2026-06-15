# 商业级电子贺卡前端项目

## 文件说明
- `index.html`：网页主体
- `style.css`：视觉样式与响应式
- `script.js`：照片轮播、倒计时、烟花、表单交互
- `config.js`：客户定制配置区
- `assets/photo1.jpg` 等：替换为客户照片
- `assets/music.mp3`：自行放入音乐文件

## 快速定制
打开 `config.js` 修改：
```js
receiverName: '客户姓名',
senderName: '你的署名',
birthday: '2026-12-28T00:00:00',
letter: '专属情书内容'
```

## 上线方式
直接把整个文件夹上传到 Vercel、GitHub Pages 或 Netlify 即可。
