# 商业级互动电子贺卡｜真人录音 + 3D礼物盒版

## 新增功能

1. 3D礼物盒开箱动画  
点击首页「打开礼物盒」或礼物盒本体，会触发开箱、烟花、爱心和惊喜文字。

2. 真人录音祝福  
将客户录音文件命名为：

```text
voice.mp3
```

放入：

```text
assets/voice.mp3
```

上线后点击礼物盒会自动播放真人录音。

3. 本地试听上传  
网页里有「本地试听上传」按钮，不需要改代码即可临时选择手机/电脑里的录音试听。注意：这个只用于预览；正式上线仍建议放入 `assets/voice.mp3`。

## 常用修改

主要改 `config.js`：

- `receiverName`：收件人姓名
- `senderName`：发件人姓名
- `birthday`：生日倒计时日期
- `letter`：专属情书
- `photos`：照片路径
- `voiceTitle`：真人录音标题
- `voiceHint`：真人录音提示语
- `giftText`：礼物盒打开后的惊喜文字

## 部署

上传整个文件夹到 GitHub Pages / Vercel 即可。

确保目录结构类似：

```text
card_frontend/
  index.html
  style.css
  script.js
  config.js
  assets/
    photo1.jpg
    photo2.jpg
    photo3.jpg
    music.mp3
    voice.mp3
```

`music.mp3` 和 `voice.mp3` 可以没有，但没有对应文件时播放按钮不会有声音。


## 3D礼物盒跳转版

本版本已将礼物盒改为“开箱动画 → 自动跳转到另一个网页”的效果。

- 首页：`index.html`
- 礼物盒打开后的惊喜页：`surprise.html`
- 修改跳转地址：打开 `config.js`，修改 `giftRedirectUrl`
- 修改跳转等待时间：打开 `config.js`，修改 `giftRedirectDelay`，单位为毫秒
- 真人录音：把录音命名为 `voice.mp3`，放入 `assets` 文件夹

上线到 Vercel / GitHub Pages 时，保持 `index.html`、`surprise.html`、`config.js`、`style.css`、`script.js` 和 `assets` 在同一项目目录即可。
