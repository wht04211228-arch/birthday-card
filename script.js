const cfg = window.CARD_CONFIG || {};
const $ = (s)=>document.querySelector(s);
const $$ = (s)=>document.querySelectorAll(s);
const wishes = cfg.wishes || ['你永远值得被认真偏爱','愿你眼里有光，心里有梦','愿每一个明天都比今天更甜','今天的星星和烟花都为你而来'];
const moodText = {romantic:'今晚的月光、烟花和心跳，都只为你浪漫。',sweet:'愿你每天都被糖分、好运和偏爱包围。',future:'未来还有很多很多年，我都想把祝福送给你。',surprise:'叮咚！今日隐藏惊喜：你会一直被爱。'};
let current = 0, wishIndex = 0, unlocked = false;
function initConfig(){
  $('#receiverName').textContent = cfg.receiverName || '亲爱的你';
  $('#receiverNameMini').textContent = cfg.receiverName || '你';
  $('#letterName').textContent = cfg.receiverName || '你';
  $('#senderName').textContent = cfg.senderName || '最爱你的人';
  $('#letterText').textContent = cfg.letter || $('#letterText').textContent;
  if(cfg.subtitle) $('.subtitle').textContent = cfg.subtitle;
  if(Array.isArray(cfg.photos)) $$('.slide').forEach((el,i)=>{ if(cfg.photos[i]) el.style.backgroundImage=`url('${cfg.photos[i]}')`; });
  $('#dailyWish').textContent = wishes[0];
  $('#aiName').value = cfg.receiverName || '';
  $('#aiRelation').value = cfg.relation || '最重要的人';
}
function slider(){const slides=$$('.slide');setInterval(()=>{slides[current].classList.remove('active');current=(current+1)%slides.length;slides[current].classList.add('active');},3200)}
function countdown(){const target=new Date(cfg.birthday || new Date(Date.now()+86400000));setInterval(()=>{const diff=Math.max(0,target-new Date());const d=Math.floor(diff/86400000),h=Math.floor(diff/3600000)%24,m=Math.floor(diff/60000)%60,s=Math.floor(diff/1000)%60;$('#countdownText').textContent=`${d}天 ${h}时 ${m}分 ${s}秒`;},1000)}
function stars(){const c=$('#starsCanvas'),ctx=c.getContext('2d');let w,h,stars=[];function resize(){w=c.width=innerWidth;h=c.height=innerHeight;stars=Array.from({length:140},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.8,v:.25+Math.random()*.65}))}resize();addEventListener('resize',resize);function draw(){ctx.clearRect(0,0,w,h);ctx.fillStyle='rgba(255,255,255,.8)';stars.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.y+=p.v;if(p.y>h)p.y=0});requestAnimationFrame(draw)}draw()}
const fw={particles:[]};
function launchFireworks(){const colors=['#ff6fae','#ffd166','#8ec5ff','#ffffff','#ff9d6c'];for(let j=0;j<5;j++){const x=Math.random()*innerWidth,y=Math.random()*innerHeight*.48+80;for(let i=0;i<58;i++)fw.particles.push({x,y,vx:Math.cos(i/58*Math.PI*2)*(2+Math.random()*5),vy:Math.sin(i/58*Math.PI*2)*(2+Math.random()*5),life:70,color:colors[Math.floor(Math.random()*colors.length)]})}}
function fireworksLoop(){const c=$('#fireworksCanvas'),ctx=c.getContext('2d');function resize(){c.width=innerWidth;c.height=innerHeight}resize();addEventListener('resize',resize);function draw(){ctx.clearRect(0,0,c.width,c.height);fw.particles=fw.particles.filter(p=>p.life>0);fw.particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.life--;ctx.globalAlpha=p.life/70;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,2.2,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1});requestAnimationFrame(draw)}draw()}
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),1800)}
function playMusic(){const audio=$('#bgMusic');return audio.play().then(()=>$('#audioBtn').classList.add('playing')).catch(()=>{})}
function addBarrage(text){const el=document.createElement('div');el.className='barrage';el.textContent=text;el.style.top=(70+Math.random()*280)+'px';$('#barrageLayer').appendChild(el);setTimeout(()=>el.remove(),8500)}
function heartRain(count=18){for(let i=0;i<count;i++){const h=document.createElement('div');h.className='heart-pop';h.textContent=['❤','💗','💖','✨'][Math.floor(Math.random()*4)];h.style.left=(Math.random()*innerWidth)+'px';h.style.top=(innerHeight-40-Math.random()*160)+'px';h.style.fontSize=(22+Math.random()*26)+'px';document.body.appendChild(h);setTimeout(()=>h.remove(),1500)}}
function sparkleAt(x,y){for(let i=0;i<18;i++){const s=document.createElement('i');s.className='sparkle';s.style.left=x+'px';s.style.top=y+'px';s.style.setProperty('--x',(Math.cos(i)*80*Math.random())+'px');s.style.setProperty('--y',(Math.sin(i)*80*Math.random())+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),900)}}
function openGift(){const box=$('#giftBox');box.classList.add('open');launchFireworks();heartRain(30);addBarrage('礼物已打开：生日快乐，愿你永远闪闪发光！');toast('3D礼物盒已打开');setTimeout(()=>speakText('生日快乐，愿你永远被爱和好运包围。'),400)}
function resetGift(){const box=$('#giftBox');box.classList.remove('open');toast('礼物盒已重新包装')}
function generateLocalAI(type){
  const name=$('#aiName').value.trim() || cfg.receiverName || '亲爱的你';
  const relation=$('#aiRelation').value.trim() || '最重要的人';
  const memory=$('#aiMemory').value.trim() || '那些一起笑过、期待过的瞬间';
  const tone=$('#aiTone').value;
  const toneMap={romantic:'浪漫而温柔',sweet:'甜蜜又可爱',touching:'真诚且走心',luxury:'高级、有仪式感'};
  if(type==='wish') return `${name}，生日快乐。愿今天的花、风、星光和烟火，都带着${toneMap[tone]}的祝福奔向你。谢谢你作为${relation}出现在我的世界里，也谢谢我们拥有${memory}。愿你新的一岁，被偏爱、被坚定选择，也永远自由发光。`;
  if(type==='letter') return `${name}：\n\n今天想把这份电子贺卡送给你，不只是为了说一句生日快乐，更想认真告诉你：你一直都很珍贵。作为我的${relation}，你给我的感觉从来不是普通的陪伴，而是想到${memory}时，心里会变得很柔软。\n\n愿你新的一岁，眼里有光，心里有梦，身边有爱。愿所有迟来的好运都在今天排队出现，愿你做喜欢的事，见想见的人，成为越来越闪亮的自己。\n\n生日快乐，愿你永远被世界温柔以待。`;
  return `把普通祝福升级成高级文案：${name}，生日快乐。愿你新的一岁，不止拥有热烈的鲜花和浪漫的烟火，更拥有稳定的幸福、笃定的偏爱和一路向前的底气。那些关于${memory}的瞬间，会被我认真收藏，也会在未来继续发光。`;
}
function speakText(text){
  if(!('speechSynthesis' in window)){toast('当前浏览器不支持语音朗读');return}
  speechSynthesis.cancel();
  const utter=new SpeechSynthesisUtterance(text.replace(/\n/g,' '));
  utter.lang='zh-CN'; utter.rate=.92; utter.pitch=1.05;
  speechSynthesis.speak(utter);
}
function interactions(){
  $('#unlockBtn').onclick=()=>{unlocked=true;$('#unlockScreen').classList.add('hide');playMusic();openGift();setTimeout(()=>$('#unlockScreen').remove(),800)};
  $('#openGiftBtn').onclick=()=>document.getElementById('giftPanel').scrollIntoView({behavior:'smooth',block:'center'});
  $('#giftOpenBtn').onclick=openGift; $('#giftBox').onclick=openGift; $('#giftResetBtn').onclick=resetGift;
  $('#openLetterBtn').onclick=()=>{$('#letterModal').classList.add('show');heartRain(10)};
  $('#closeLetterBtn').onclick=()=>$('#letterModal').classList.remove('show');
  $('#fireworkBtn').onclick=()=>{launchFireworks();toast('烟花已点亮')};
  $('#shareBtn').onclick=async()=>{const text=`送给${cfg.receiverName || '你'}的专属生日网页：愿今天所有浪漫都奔向你。`;try{await navigator.clipboard.writeText(text);toast('已复制分享文案')}catch(e){toast(text)}};
  $('#audioBtn').onclick=async()=>{const audio=$('#bgMusic');try{if(audio.paused){await audio.play();$('#audioBtn').classList.add('playing')}else{audio.pause();$('#audioBtn').classList.remove('playing')}}catch(e){alert('请把 music.mp3 放入 assets 文件夹，或先点击页面后再播放。')}};
  $('#changeWishBtn').onclick=()=>{wishIndex=(wishIndex+1)%wishes.length;$('#dailyWish').textContent=wishes[wishIndex];addBarrage(wishes[wishIndex])};
  $$('.mood').forEach(btn=>btn.onclick=()=>{$$('.mood').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const msg=moodText[btn.dataset.mood];$('#dailyWish').textContent=msg;addBarrage(msg);launchFireworks()});
  $('#sendWishBtn').onclick=()=>{const val=$('#wishInput').value.trim()||'生日快乐，永远开心！';addBarrage(val);const item=document.createElement('span');item.className='bottle-item';item.textContent='💌 '+val;$('#bottleList').prepend(item);$('#wishInput').value='';heartRain(8)};
  $('#heartRainBtn').onclick=()=>heartRain(28);
  $('#photoSlider').onclick=()=>{const active=$('.slide.active');const bg=active.style.backgroundImage.replace(/^url\(["']?/,'').replace(/["']?\)$/,'');$('#photoPreview').src=bg;$('#photoModal').classList.add('show')};
  $('#closePhotoBtn').onclick=()=>$('#photoModal').classList.remove('show');
  document.addEventListener('click',(e)=>{if(unlocked) sparkleAt(e.clientX,e.clientY)});
  $('#aiWishBtn').onclick=()=>{$('#aiOutput').value=generateLocalAI('wish');addBarrage('AI祝福已生成')};
  $('#aiLetterBtn').onclick=()=>{$('#aiOutput').value=generateLocalAI('letter');$('#letterText').textContent=$('#aiOutput').value;toast('AI情书已同步到弹窗')};
  $('#aiRewriteBtn').onclick=()=>{$('#aiOutput').value=generateLocalAI('rewrite')};
  $('#aiSpeakBtn').onclick=()=>speakText($('#aiOutput').value || generateLocalAI('wish'));
  $('#orderForm').onsubmit=(e)=>{e.preventDefault();const name=$('#nameInput').value||'TA';const from=$('#fromInput').value||'神秘的人';const msg=$('#messageInput').value||'愿你生日快乐，永远被爱包围。';$('#resultBox').innerHTML=`客户预览：<strong>${name}</strong>，${msg}<br>署名：${from}<br>建议售价：199元AI互动版 / 299元3D礼物盒高级定制版<br>新增卖点：AI情书 + AI语音祝福 + 3D礼物盒开箱 + 弹幕祝福 + 心愿瓶 + 音乐烟花`;};
}
initConfig();slider();countdown();stars();fireworksLoop();interactions();setInterval(()=>addBarrage(wishes[Math.floor(Math.random()*wishes.length)]),7000);
