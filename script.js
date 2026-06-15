const cfg = window.CARD_CONFIG || {};
const $ = (s)=>document.querySelector(s);
const $$ = (s)=>document.querySelectorAll(s);
const wishes = cfg.wishes || ['你永远值得被认真偏爱','愿你眼里有光，心里有梦','愿每一个明天都比今天更甜','今天的星星和烟花都为你而来'];
const moodText = {
  romantic:'今晚的月光、烟花和心跳，都只为你浪漫。',
  sweet:'愿你每天都被糖分、好运和偏爱包围。',
  future:'未来还有很多很多年，我都想把祝福送给你。',
  surprise:'叮咚！今日隐藏惊喜：你会一直被爱。'
};
let current = 0, wishIndex = 0, unlocked = false;
function initConfig(){
  $('#receiverName').textContent = cfg.receiverName || '亲爱的你';
  $('#receiverNameMini').textContent = cfg.receiverName || '你';
  $('#letterName').textContent = cfg.receiverName || '你';
  $('#senderName').textContent = cfg.senderName || '最爱你的人';
  $('#letterText').textContent = cfg.letter || $('#letterText').textContent;
  if(cfg.subtitle) $('.subtitle').textContent = cfg.subtitle;
  if(Array.isArray(cfg.photos)) $$('.slide').forEach((el,i)=>{ if(cfg.photos[i]) el.style.backgroundImage=`url('${cfg.photos[i]}')`; });
  if(cfg.voiceTitle) $('#voiceTitle').textContent = cfg.voiceTitle;
  if(cfg.voiceHint) $('#voiceHint').textContent = cfg.voiceHint;
  if(cfg.giftText) $('#giftSurpriseText').textContent = cfg.giftText;
  $('#dailyWish').textContent = wishes[0];
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
function playVoice(){const audio=$('#voiceAudio');const bg=$('#bgMusic');if(!audio)return Promise.resolve();if(!bg.paused) bg.volume=.25;return audio.play().then(()=>{toast('正在播放真人录音');$('#playVoiceBtn').textContent='暂停录音';audio.onended=()=>{if(bg)bg.volume=1;$('#playVoiceBtn').textContent='播放真人录音'};}).catch(()=>{toast('请将 voice.mp3 放入 assets 文件夹，或先本地上传试听');});}
function openGift(){
  const box=$('#giftBox');
  if(box.dataset.opened==='true') return;
  box.dataset.opened='true';
  box.classList.add('opened');
  document.body.classList.add('gift-transitioning');
  launchFireworks();
  heartRain(32);
  setTimeout(()=>playVoice(),350);
  toast('礼物盒已打开，正在进入惊喜页面');
  const url = cfg.giftRedirectUrl || './surprise.html';
  const delay = Number(cfg.giftRedirectDelay || 2300);
  setTimeout(()=>{ window.location.href = url; }, delay);
}
function interactions(){
  $('#unlockBtn').onclick=()=>{unlocked=true;$('#unlockScreen').classList.add('hide');playMusic();launchFireworks();heartRain(22);setTimeout(()=>$('#unlockScreen').remove(),800)};
  $('#openLetterBtn').onclick=()=>{$('#letterModal').classList.add('show');heartRain(10)};
  $('#closeLetterBtn').onclick=()=>$('#letterModal').classList.remove('show');
  $('#fireworkBtn').onclick=()=>{launchFireworks();toast('烟花已点亮')};
  $('#shareBtn').onclick=async()=>{const text=`送给${cfg.receiverName || '你'}的专属生日网页：愿今天所有浪漫都奔向你。`;try{await navigator.clipboard.writeText(text);toast('已复制分享文案')}catch(e){toast(text)}};
  $('#scrollGiftBtn').onclick=()=>$('#giftSection').scrollIntoView({behavior:'smooth',block:'center'});
  $('#openGiftBtn').onclick=openGift;
  $('#giftBox').onclick=openGift;
  $('#playVoiceBtn').onclick=()=>{const audio=$('#voiceAudio');if(audio.paused){playVoice()}else{audio.pause();$('#playVoiceBtn').textContent='播放真人录音';const bg=$('#bgMusic');if(bg)bg.volume=1;}};
  $('#voiceUpload').onchange=(e)=>{const file=e.target.files&&e.target.files[0];if(!file)return;const url=URL.createObjectURL(file);const audio=$('#voiceAudio');audio.src=url;$('#voiceTitle').textContent='已载入本地真人录音';$('#voiceHint').textContent=file.name+' · 仅用于本地预览，上线请放入 assets/voice.mp3';toast('录音已载入，可点击播放');};
  $('#audioBtn').onclick=async()=>{const audio=$('#bgMusic');try{if(audio.paused){await audio.play();$('#audioBtn').classList.add('playing')}else{audio.pause();$('#audioBtn').classList.remove('playing')}}catch(e){alert('请把 music.mp3 放入 assets 文件夹，或先点击页面后再播放。')}};
  $('#changeWishBtn').onclick=()=>{wishIndex=(wishIndex+1)%wishes.length;$('#dailyWish').textContent=wishes[wishIndex];addBarrage(wishes[wishIndex])};
  $$('.mood').forEach(btn=>btn.onclick=()=>{$$('.mood').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const msg=moodText[btn.dataset.mood];$('#dailyWish').textContent=msg;addBarrage(msg);launchFireworks()});
  $('#sendWishBtn').onclick=()=>{const val=$('#wishInput').value.trim()||'生日快乐，永远开心！';addBarrage(val);const item=document.createElement('span');item.className='bottle-item';item.textContent='💌 '+val;$('#bottleList').prepend(item);$('#wishInput').value='';heartRain(8)};
  $('#heartRainBtn').onclick=()=>heartRain(28);
  $('#photoSlider').onclick=()=>{const active=$('.slide.active');const bg=active.style.backgroundImage.replace(/^url\(["']?/,'').replace(/["']?\)$/,'');$('#photoPreview').src=bg;$('#photoModal').classList.add('show')};
  $('#closePhotoBtn').onclick=()=>$('#photoModal').classList.remove('show');
  document.addEventListener('click',(e)=>{if(unlocked) sparkleAt(e.clientX,e.clientY)});
  $('#orderForm').onsubmit=(e)=>{e.preventDefault();const name=$('#nameInput').value||'TA';const from=$('#fromInput').value||'神秘的人';const msg=$('#messageInput').value||'愿你生日快乐，永远被爱包围。';$('#resultBox').innerHTML=`客户预览：<strong>${name}</strong>，${msg}<br>署名：${from}<br>建议售价：99元商业版 / 199元高级定制版<br>交互卖点：开场解锁 + 弹幕祝福 + 心愿瓶 + 照片大图 + 音乐烟花`;};
}
initConfig();slider();countdown();stars();fireworksLoop();interactions();setInterval(()=>addBarrage(wishes[Math.floor(Math.random()*wishes.length)]),7000);
