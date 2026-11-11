# smart-campus-campus-fix-it

# 🛠️ Campus Fix-It - ระบบแจ้งปัญหาและติดตามการซ่อมภายในมหาวิทยาลัย
**วิชา:** SC17332 - Mini Project (ธีม Smart Campus)  
**กลุ่มที่:** 6  

---

## 👥 รายชื่อสมาชิกในกลุ่ม

| ลำดับ | ชื่อ - นามสกุล | รหัสนักศึกษา | GitHub Username |
| :---: | :--- | :---: | :--- |
| 1 | นาย ปณิธาน สิริวีระกุล | 6721207025 | @TARAX-cyber |
| 2 | นาย นนทพัตร ไววิธี   | 6721207031 | @Luxly73 |
| 3 | นางสาว กมลชนก พงสุระ | 6721207032 | @kamonlchanok1122|
| 4 | นางสาว นภัส แก้วเกษ  | 6721207038 | @napat127 |
| 5 | นางสาว ปาริฉัตร เทียนสอาด | 6721207024 | @parichat1707 |
| 6 | นาย อภิวิชญ์ รักธรรม | 6721207041 | @aaomaom0502-dev!|

---

## 🌐 ลิงก์เว็บไซต์ (GitHub Pages)
👉 [เข้าชมเว็บไซต์ Campus Fix-It ได้ที่นี่((https://tarax-cyber.github.io/smart-campus-campus-fix-it/issues.html))

---

## 📌 ฟีเจอร์ของระบบ (Features)
- [x] **F1:** ดึงข้อมูลปัญหาตัวอย่างจาก `data/issues.json` และดึงข้อมูลใหม่จาก `localStorage`
- [x] **F2:** ฟอร์มแจ้งปัญหาพร้อม Validation และสร้างรหัสแจ้งซ่อมอัตโนมัติ (เช่น `FIX-2026-0016`)
- [x] **F3:** รายการปัญหาพร้อมระบบตัวกรอง (หมวด/สถานะ/อาคาร) และการเรียงลำดับ
- [x] **F4:** โหมดเจ้าหน้าที่ (Toggle Switch) ปรับเปลี่ยนสถานะได้ 3 ขั้น
- [x] **F5:** ปุ่ม "ฉันก็เจอปัญหานี้ (+1)" กดได้ 1 ครั้ง/เครื่อง และระบบติดตามสถานะด้วยเลขที่แจ้ง
- [x] **F6:** Dashboard สรุปสถิติด้วย CSS Bar Chart (ไม่ใช้ Library)
- [x] **ฟีเจอร์เสริม:** (ใส่ฟีเจอร์เสริมที่กลุ่มทำ เช่น ไฮไลต์ปัญหาค้างเกิน 7 วัน / แนบรูปภาพปัญหา)

---

## 📍 แหล่งที่มาของข้อมูลจริงและรูปภาพ
- **ข้อมูลอาคารและสถานที่:** รวบรวมจากพื้นที่จริงภายในมหาวิทยาลัย (อาคารวิทยาศาสตร์ 1, หอสมุด, อาคารเรียนรวม ฯลฯ)
- **รูปภาพประกอบ:** ถ่ายเองจากสถานที่จริง / (หากนำมาจากเว็บอื่น ให้แปะลิงก์อ้างอิงตรงนี้)

---

## 📊 ผลการทดสอบ Lighthouse (Accessibility)
*(แนบภาพถ่ายหน้าจอผลคะแนน Lighthouse Accessibility ที่ได้ ≥ 90 คะแนนตรงนี้)*  
<img width="695" height="708" alt="image" src="https://github.com/user-attachments/assets/b760e867-b7e5-45de-8b45-87225ec6d513" />
<img width="692" height="685" alt="image" src="https://github.com/user-attachments/assets/4f9b819e-f710-4fe3-9f83-70fb011b472a" />
<img width="690" height="683" alt="image" src="https://github.com/user-attachments/assets/7c554805-170a-4076-baf8-c5adffd7d03b" />
<img width="692" height="712" alt="image" src="https://github.com/user-attachments/assets/44459525-c504-4bcc-a083-e331acb662c0" />
<img width="688" height="707" alt="image" src="https://github.com/user-attachments/assets/17c13864-6f04-4915-ad53-5d7c3e22a79d" />



<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>northwest-corner</title>
<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#f4f6f8;--surface:#fff;--ink:#16233a;--muted:#5b6778;--line:#d5dbe3;--accent:#0b6e6e;--accent-soft:#d7efee;--warn:#9a5b00;--warn-soft:#fff1d6;--err:#b3261e;
box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0f1722;--surface:#17212f;--ink:#e6ecf4;--muted:#9aa7b8;--line:#2c3a4d;--accent:#4fd1c5;--accent-soft:#12383a;--warn:#f0b44c;--warn-soft:#3a2d12;--err:#ff8a80}}
:root[data-theme="dark"]{--bg:#0f1722;--surface:#17212f;--ink:#e6ecf4;--muted:#9aa7b8;--line:#2c3a4d;--accent:#4fd1c5;--accent-soft:#12383a;--warn:#f0b44c;--warn-soft:#3a2d12;--err:#ff8a80}
html{scroll-padding-top:env(safe-area-inset-top,0px)}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 "Sarabun",system-ui,sans-serif}
main{max-width:980px;margin:0 auto;padding:24px 16px 56px}
h1{font-size:1.7rem;margin:0 0 4px;line-height:1.3}
h2{font-size:1.15rem;margin:0 0 12px}
p.lead{margin:0 0 20px;color:var(--muted);max-width:68ch}
section{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:18px;margin-bottom:16px}
.bar{display:flex;flex-wrap:wrap;gap:12px;align-items:end;margin-bottom:14px}
label.f{display:flex;flex-direction:column;font-size:.9rem;color:var(--muted);gap:2px}
input{font:inherit;color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:6px 8px;min-width:0}
input[type=number]{width:84px;text-align:right}
input.name{width:100%;min-width:84px;font-weight:600}
input:focus-visible,button:focus-visible{outline:3px solid var(--accent);outline-offset:1px}
button{position:relative;overflow:hidden;font:inherit;font-weight:600;border-radius:8px;border:1px solid var(--accent);padding:8px 18px;cursor:pointer;background:linear-gradient(135deg,var(--accent),#14b8a6);color:#fff;box-shadow:0 2px 0 rgba(0,0,0,.18);transition:transform .15s,box-shadow .25s,background-color .2s}
button::after{content:"";position:absolute;top:0;left:-80%;width:50%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-20deg);transition:left .6s;pointer-events:none}
button:hover::after{left:130%}
button:hover{transform:translateY(-2px);box-shadow:0 8px 18px -6px var(--accent)}
button:active{transform:translateY(1px) scale(.96);box-shadow:none}
@media (prefers-reduced-motion:reduce){button,button::after{transition:none}button:hover{transform:none}}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) button.primary{color:#06201e}}
button.ghost{background:transparent;color:var(--accent);box-shadow:none}
button.ghost::after{background:linear-gradient(100deg,transparent,var(--accent-soft),transparent)}
button.ghost:hover{background:var(--accent-soft)}
.scroll{overflow-x:auto}
table{border-collapse:collapse;width:100%}
th,td{border:1px solid var(--line);padding:8px;text-align:center;vertical-align:middle;position:relative}
th{background:var(--bg);font-weight:600}
td.cell-cost{position:relative;min-width:90px;height:65px}
.cost-box{position:absolute;top:2px;right:2px;border:1px solid var(--line);background:var(--bg);font-size:0.75rem;padding:1px 5px;border-radius:3px;color:var(--muted);font-weight:600}
td.alloc{background:var(--accent-soft)}
td.alloc b{display:block;font-size:1.25rem;color:var(--accent);margin-top:10px}
td.empty b{display:block;font-size:1.1rem;color:transparent}
td.zero b{color:var(--warn)}
.dummy{background:var(--warn-soft)}
.total{font-size:1.4rem;font-weight:700;color:var(--accent);margin:12px 0 0}
.msg{padding:10px 12px;border-radius:6px;background:var(--warn-soft);color:var(--warn);margin-bottom:12px}
.err{color:var(--err);font-weight:600;margin:8px 0 0}
ol.steps{margin:0;padding-left:1.4rem}
ol.steps li{margin-bottom:6px}
.eq{color:var(--muted)}
.history-item{padding:10px 12px;border:1px solid var(--line);border-radius:8px;margin-bottom:8px;cursor:pointer;background:var(--bg);display:flex;justify-content:space-between;align-items:center;transition:background .2s}
.history-item:hover{background:var(--accent-soft);border-color:var(--accent)}
</style>
</head>
<body>
<main>
<header>
<h1>วางแผนการขนส่งด้วยวิธีมุมซ้ายบน (Northwest Corner)</h1>
</header>
<p class="lead">กรอกว่าแต่ละต้นทางมีของกี่หน่วย แต่ละปลายทางต้องการกี่หน่วย และค่าส่งต่อหน่วย โปรแกรมจะคำนวณการจัดสรรพร้อมบันทึกประวัติย้อนหลัง</p>

<section aria-labelledby="h-in">
<h2 id="h-in">1. กรอกข้อมูล</h2>
<div class="bar">
  <label class="f">จำนวนต้นทาง (แถว)<input id="m" type="number" min="1" max="10" value="3"></label>
  <label class="f">จำนวนปลายทาง (คอลัมน์)<input id="n" type="number" min="1" max="10" value="4"></label>
  <button class="ghost" id="resize" type="button">ปรับขนาดตาราง</button>
  <button class="ghost" id="example" type="button">โหลดตัวอย่าง</button>
  <button class="ghost" id="clear" type="button">ล้างข้อมูล</button>
</div>
<div class="scroll"><div id="grid"></div></div>
<p class="err" id="err" role="alert"></p>
<div class="bar" style="margin:14px 0 0"><button class="primary" id="solve" type="button">คำนวณแผนการขนส่ง</button></div>
</section>

<section id="out" aria-live="polite" hidden>
<h2>2. ผลลัพธ์</h2>
<div id="note"></div>
<div class="scroll" id="res"></div>
<p class="total" id="total"></p>
<h2 style="margin-top:20px">คิดทีละขั้น</h2>
<ol class="steps" id="steps"></ol>
</section>

<section aria-labelledby="h-history">
<h2 id="h-history">3. ประวัติการคำนวณย้อนหลัง (สูงสุด 5 รายการล่าสุด)</h2>
<div id="history-list" style="color:var(--muted)">ยังไม่มีประวัติการคำนวณ</div>
</section>
</main>
<audio id="bgm" loop preload="auto" hidden src="music/rock.mp3"></audio>

<script>
(function(){
"use strict";
var st={m:3,n:4,names:{r:[],c:[]},cost:[],sup:[],dem:[]};
var historyData=[];
var $=function(id){return document.getElementById(id)};
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}

function init(m,n,keep){
  var o=keep?st:{names:{r:[],c:[]},cost:[],sup:[],dem:[]};
  var r=[],c=[],cost=[],sup=[],dem=[];
  for(var i=0;i<m;i++){r[i]=(o.names&&o.names.r&&o.names.r[i]!=null)?o.names.r[i]:"S"+(i+1);sup[i]=o.sup[i]!=null?o.sup[i]:"";cost[i]=[];
    for(var j=0;j<n;j++)cost[i][j]=(o.cost[i]&&o.cost[i][j]!=null)?o.cost[i][j]:""}
  for(var j2=0;j2<n;j2++){c[j2]=(o.names&&o.names.c&&o.names.c[j2]!=null)?o.names.c[j2]:"D"+(j2+1);dem[j2]=o.dem[j2]!=null?o.dem[j2]:""}
  st={m:m,n:n,names:{r:r,c:c},cost:cost,sup:sup,dem:dem};
  render();
}

function formatSub(name, prefix, defaultIdx) {
  if (name.startsWith(prefix) && !isNaN(name.substring(prefix.length))) {
    return prefix + '<sub>' + name.substring(prefix.length) + '</sub>';
  }
  return esc(name);
}

function render(){
  var h='<table><thead><tr><th>ต้นทาง / ปลายทาง</th>';
  for(var j=0;j<st.n;j++)h+='<th><input class="name" aria-label="ชื่อปลายทาง '+(j+1)+'" data-k="cn" data-j="'+j+'" value="'+esc(st.names.c[j])+'"></th>';
  h+='<th>Supply</th></tr></thead><tbody>';
  for(var i=0;i<st.m;i++){
    h+='<tr><th><input class="name" aria-label="ชื่อต้นทาง '+(i+1)+'" data-k="rn" data-i="'+i+'" value="'+esc(st.names.r[i])+'"></th>';
    for(var j2=0;j2<st.n;j2++)h+='<td><input type="number" step="any" min="0" aria-label="ค่าส่ง แถว '+(i+1)+' คอลัมน์ '+(j2+1)+'" data-k="c" data-i="'+i+'" data-j="'+j2+'" value="'+esc(st.cost[i][j2])+'"></td>';
    h+='<td><input type="number" step="any" min="0" aria-label="Supply แถว '+(i+1)+'" data-k="s" data-i="'+i+'" value="'+esc(st.sup[i])+'"></td></tr>';
  }
  h+='<tr><th>Demand</th>';
  for(var j3=0;j3<st.n;j3++)h+='<td><input type="number" step="any" min="0" aria-label="Demand คอลัมน์ '+(j3+1)+'" data-k="d" data-j="'+j3+'" value="'+esc(st.dem[j3])+'"></td>';
  h+='<td></td></tr></tbody></table>';
  $("grid").innerHTML=h;
}

$("grid").addEventListener("input",function(e){
  var t=e.target,k=t.dataset.k,i=+t.dataset.i,j=+t.dataset.j;
  if(k==="cn")st.names.c[j]=t.value;else if(k==="rn")st.names.r[i]=t.value;
  else if(k==="c")st.cost[i][j]=t.value;else if(k==="s")st.sup[i]=t.value;else if(k==="d")st.dem[j]=t.value;
});

function clampDim(v){v=parseInt(v,10);return isNaN(v)?1:Math.max(1,Math.min(10,v))}
$("resize").onclick=function(){init(clampDim($("m").value),clampDim($("n").value),true);$("m").value=st.m;$("n").value=st.n};
$("clear").onclick=function(){init(clampDim($("m").value),clampDim($("n").value),false);$("out").hidden=true;$("err").textContent=""};
$("example").onclick=function(){
  st={m:3,n:4,names:{r:["S1","S2","S3"],c:["D1","D2","D3","D4"]},
   cost:[[12,322,231,134],[1212,21,213,336],[12215,3132,326,315]],sup:[100,1000,10000],dem:[100,1000,10000,10]};
  $("m").value=3;$("n").value=4;render();$("err").textContent="";
};

function northwest(cost,sup,dem){
  var m=sup.length,n=dem.length,s=sup.slice(),d=dem.slice(),steps=[];
  var x=[];for(var a=0;a<m;a++){x[a]=[];for(var b=0;b<n;b++)x[a][b]=null}
  var i=0,j=0;
  while(i<m&&j<n){
    var q=Math.min(s[i],d[j]);
    x[i][j]=q;
    steps.push({i:i,j:j,q:q,sBefore:s[i],dBefore:d[j]});
    s[i]-=q;d[j]-=q;
    if(s[i]===0&&d[j]===0){ if(i===m-1&&j===n-1)break; if(i<m-1){i++;steps[steps.length-1].degenerate=true}else j++; }
    else if(s[i]===0)i++;else j++;
  }
  var total=0;
  for(var p=0;p<m;p++)for(var r=0;r<n;r++)if(x[p][r]!=null)total+=x[p][r]*cost[p][r];
  return{x:x,steps:steps,total:total};
}

function displayResult(resObj){
  $("note").innerHTML=resObj.noteHtml;
  $("res").innerHTML=resObj.resHtml;
  $("total").innerHTML=resObj.totalHtml;
  $("steps").innerHTML=resObj.stepsHtml;
  $("out").hidden=false;
  $("out").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
}

$("solve").onclick=function(){
  var err=$("err");err.textContent="";
  var C=[],S=[],D=[],i,j;
  function num(v){if(v===""||v==null)return NaN;return Number(v)}
  for(i=0;i<st.m;i++){S[i]=num(st.sup[i]);C[i]=[];for(j=0;j<st.n;j++)C[i][j]=num(st.cost[i][j])}
  for(j=0;j<st.n;j++)D[j]=num(st.dem[j]);
  var all=S.concat(D);C.forEach(function(r){all=all.concat(r)});
  if(all.some(function(v){return !isFinite(v)})){err.textContent="กรอกตัวเลขให้ครบทุกช่องก่อน";$("out").hidden=true;return}
  if(all.some(function(v){return v<0})){err.textContent="ใส่ได้เฉพาะเลข 0 ขึ้นไป";$("out").hidden=true;return}
  
  var rn=st.names.r.slice(),cn=st.names.c.slice(),note="";
  var ts=S.reduce(function(a,b){return a+b},0),td=D.reduce(function(a,b){return a+b},0);
  
  if(ts>td){
    D.push(ts-td);
    cn.push("Dummy");
    C.forEach(function(r){r.push(0)});
    note="Supply รวม "+ts+" หน่วย มากกว่า Demand รวม "+td+" หน่วย จึงเพิ่ม Dummy Destination (ค่าส่ง 0) เพื่อรับส่วนที่เหลือ "+(ts-td)+" หน่วย";
  }else if(td>ts){
    S.push(td-ts);
    rn.push("Dummy");
    C.push(D.map(function(){return 0}));
    note="Demand รวม "+td+" หน่วย มากกว่า Supply รวม "+ts+" หน่วย จึงเพิ่ม Dummy Source (ค่าส่ง 0) แทนส่วนที่ขาด "+(td-ts)+" หน่วย";
  }
  
  var R=northwest(C,S,D),m=S.length,n=D.length;
  var h='<table><thead><tr><th></th>';
  for(j=0;j<n;j++)h+='<th'+(j>=st.n?' class="dummy"':'')+'>'+formatSub(cn[j],"D")+'<br><small class="eq">Demand: '+D[j]+'</small></th>';
  h+='<th>Supply</th></tr></thead><tbody>';
  for(i=0;i<m;i++){
    h+='<tr><th'+(i>=st.m?' class="dummy"':'')+'>'+formatSub(rn[i],"S")+'<br><small class="eq">Supply: '+S[i]+'</small></th>';
    for(j=0;j<n;j++){var v=R.x[i][j];
      if(v==null)h+='<td class="cell-cost empty"><span class="cost-box">'+C[i][j]+'</span><b>-</b></td>';
      else h+='<td class="cell-cost alloc'+(v===0?' zero':'')+'"><span class="cost-box">'+C[i][j]+'</span><b>'+v+'</b></td>';}
    h+='<td><b>'+S[i]+'</b></td></tr>';
  }
  h+='<tr><th>Demand</th>';
  for(j=0;j<n;j++)h+='<td><b>'+D[j]+'</b></td>';
  h+='<td class="dummy"><b>'+Math.max(ts,td)+'</b></td></tr>';
  h+='</tbody></table>';
  
  var terms=[];
  for(i=0;i<m;i++)for(j=0;j<n;j++)if(R.x[i][j]!=null&&R.x[i][j]>0)terms.push(R.x[i][j]+"×"+C[i][j]);
  var totalHtml='ค่าขนส่งรวม = '+R.total.toLocaleString("th-TH")+'<br><small class="eq" style="font-weight:400;font-size:.9rem">'+(terms.length?terms.join(" + ")+" = "+R.total:"ไม่มีการขนส่ง")+'</small>';
  
  var sh="";
  R.steps.forEach(function(p){
    sh+='<li>ส่งจาก <b>'+formatSub(rn[p.i],"S")+'</b> ไป <b>'+formatSub(cn[p.j],"D")+'</b> จำนวน <b>'+p.q+'</b> หน่วย (Supply มี '+p.sBefore+' Demand ต้องการ '+p.dBefore+')';
    var sLeft=p.sBefore-p.q,dLeft=p.dBefore-p.q;
    if(sLeft===0&&dLeft===0)sh+=p.degenerate?'. ของหมดและต้องการครบพอดีพร้อมกัน ขยับลงแถวถัดไป (มีช่องที่ส่ง 0 เพิ่มหนึ่งช่อง)':'. เสร็จสิ้น';
    else if(sLeft===0)sh+='. Supply ช่องนี้หมดแล้ว ขยับลงไปแถวถัดไป';
    else sh+='. Demand ช่องนี้ครบแล้ว ขยับไปคอลัมน์ถัดไป';
    sh+='</li>';
  });
  
  var degen=R.steps.some(function(p){return p.degenerate});
  var noteHtml=(note?'<div class="msg">'+esc(note)+'</div>':'')+(degen?'<div class="msg">มีช่องที่ส่ง 0 หน่วย (สีส้ม) เนื่องจาก Supply หมดพร้อม Demand ครบพอดี</div>':'');

  var resultObj={
    noteHtml:noteHtml,
    resHtml:h,
    totalHtml:totalHtml,
    stepsHtml:sh,
    timestamp:new Date().toLocaleTimeString("th-TH")
  };

  displayResult(resultObj);

  historyData.unshift(resultObj);
  if(historyData.length>5) historyData.pop();
  renderHistory();
};

function renderHistory(){
  var container=$("history-list");
  if(historyData.length===0){
    container.innerHTML="ยังไม่มีประวัติการคำนวณ";
    return;
  }
  var html="";
  historyData.forEach(function(item, idx){
    html+='<div class="history-item" data-index="'+idx+'"><span><b>รายการที่ '+(idx+1)+'</b> (คำนวณเมื่อเวลา '+item.timestamp+')</span><span style="color:var(--accent);font-weight:600">คลิกเพื่อดูตาราง</span></div>';
  });
  container.innerHTML=html;

  var items=container.getElementsByClassName("history-item");
  for(var k=0;k<items.length;k++){
    items[k].onclick=function(){
      var idx=+this.dataset.index;
      displayResult(historyData[idx]);
    };
  }
}

var au=$("bgm"),EV=["pointerdown","keydown","touchstart"];
au.loop=true;au.volume=0.7;au.currentTime=0;
function armFallback(){EV.forEach(function(t){document.addEventListener(t,onFirstGesture,true)})}
function disarm(){EV.forEach(function(t){document.removeEventListener(t,onFirstGesture,true)})}
function onFirstGesture(){
  var p=au.play();
  if(p&&p.then)p.then(disarm,function(){});else disarm();
}
var first=au.play();
if(first&&first.then)first.then(function(){},armFallback);else armFallback();
init(3,4,false);
})();
</script>
</body>
</html>
