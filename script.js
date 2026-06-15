const cfg = window.CARD_CONFIG || {};
const $ = (s)=>document.querySelector(s);
const $$ = (s)=>document.querySelectorAll(s);

function initConfig(){
  $('#receiverName').textContent = cfg.receiverName || '亲爱的你';
  $('#receiverNameMini').textContent = cfg.receiverName || '你';
  $('#letterName').textContent = cfg.receiverName || '你';
  $('#senderName').textContent = cfg.senderName || '最爱你的人';
  $('#letterText').textContent = cfg.letter || $('#letterText').textContent;
  if(cfg.subtitle) $('.subtitle').textContent = cfg.subtitle;
  if(Array.isArray(cfg.photos)) $$('.slide').forEach((el,i)=>{ if(cfg.photos[i]) el.style.backgroundImage=`url('${cfg.photos[i]}')`; });
}

let current = 0;
function slider(){
  const slides = $$('.slide');
  setInterval(()=>{slides[current].classList.remove('active');current=(current+1)%slides.length;slides[current].classList.add('active');},3200);
}

function countdown(){
  const target = new Date(cfg.birthday || new Date(Date.now()+86400000));
  setInterval(()=>{
    const diff = Math.max(0,target-new Date());
    const d=Math.floor(diff/86400000), h=Math.floor(diff/3600000)%24, m=Math.floor(diff/60000)%60, s=Math.floor(diff/1000)%60;
    $('#countdownText').textContent = `${d}天 ${h}时 ${m}分 ${s}秒`;
  },1000);
}

function stars(){
  const c=$('#starsCanvas'),ctx=c.getContext('2d');let w,h,stars=[];
  function resize(){w=c.width=innerWidth;h=c.height=innerHeight;stars=Array.from({length:120},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.8,v:.25+Math.random()*.65}))}resize();addEventListener('resize',resize);
  function draw(){ctx.clearRect(0,0,w,h);ctx.fillStyle='rgba(255,255,255,.8)';stars.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.y+=p.v;if(p.y>h)p.y=0});requestAnimationFrame(draw)}draw();
}

const fw = { particles: [] };
function launchFireworks(){
  const colors=['#ff6fae','#ffd166','#8ec5ff','#ffffff','#ff9d6c'];
  for(let j=0;j<5;j++){
    const x=Math.random()*innerWidth, y=Math.random()*innerHeight*.48+80;
    for(let i=0;i<58;i++) fw.particles.push({x,y, vx:Math.cos(i/58*Math.PI*2)*(2+Math.random()*5), vy:Math.sin(i/58*Math.PI*2)*(2+Math.random()*5), life:70, color:colors[Math.floor(Math.random()*colors.length)]});
  }
}
function fireworksLoop(){
  const c=$('#fireworksCanvas'),ctx=c.getContext('2d');function resize(){c.width=innerWidth;c.height=innerHeight}resize();addEventListener('resize',resize);
  function draw(){ctx.clearRect(0,0,c.width,c.height);fw.particles=fw.particles.filter(p=>p.life>0);fw.particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.life--;ctx.globalAlpha=p.life/70;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,2.2,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1});requestAnimationFrame(draw)}draw();
}

function interactions(){
  $('#openLetterBtn').onclick=()=>$('#letterModal').classList.add('show');
  $('#closeLetterBtn').onclick=()=>$('#letterModal').classList.remove('show');
  $('#fireworkBtn').onclick=launchFireworks;
  $('#audioBtn').onclick=async()=>{const audio=$('#bgMusic');try{ if(audio.paused){await audio.play();$('#audioBtn').classList.add('playing')}else{audio.pause();$('#audioBtn').classList.remove('playing')}}catch(e){alert('请把 music.mp3 放入 assets 文件夹，或先点击页面后再播放。')}};
  $('#orderForm').onsubmit=(e)=>{e.preventDefault();const name=$('#nameInput').value||'TA';const from=$('#fromInput').value||'神秘的人';const msg=$('#messageInput').value||'愿你生日快乐，永远被爱包围。';$('#resultBox').innerHTML=`客户预览：<strong>${name}</strong>，${msg}<br>署名：${from}<br>建议售价：99元商业版 / 199元高级定制版`;};
}

initConfig();slider();countdown();stars();fireworksLoop();interactions();setTimeout(launchFireworks,900);
