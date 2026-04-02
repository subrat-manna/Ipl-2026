// ─── NAVIGATION ──────────────────────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll(".page").forEach(function(p){ p.classList.remove("active"); });
  var el = document.getElementById("page-"+id);
  if(el) el.classList.add("active");
  window.scrollTo(0,0);
}
function goAdmin() { showPage("admin-login"); document.getElementById("admin-pass-input").value=""; }
function checkAdmin() {
  if(document.getElementById("admin-pass-input").value === ADMIN_PASS){ loadAdminFields(); showPage("admin"); }
  else showToast("Incorrect password","#e63946");
}
function showResults() {
  confettiFired = false;
  renderResults(); renderHistory();
  showPage("results"); switchTab("today");
  var c = slotData(activeSlot);
  if(c && c.winner) setTimeout(function(){ playSound("winning"); }, 350);
  else playSound("nav");
}
function switchTab(tab) {
  document.getElementById("results-today").style.display    = tab==="today"   ? "block":"none";
  document.getElementById("results-history").style.display  = tab==="history" ? "block":"none";
  document.getElementById("tab-today").classList.toggle("active",   tab==="today");
  document.getElementById("tab-history").classList.toggle("active", tab==="history");
}
function switchSlot(slot) {
  activeSlot = slot;
  document.querySelectorAll(".slot-tab-btn").forEach(function(b){ b.classList.remove("active"); });
  var el = document.getElementById("slot-tab-"+slot);
  if(el) el.classList.add("active");
  renderAll();
}
function toggleFunny() {
  document.getElementById("funny-toggle").classList.toggle("open");
  document.getElementById("funny-fields").classList.toggle("open");
}
function hideLoader() {
  document.getElementById("app-loader").style.display = "none";
  document.getElementById("page-home").classList.add("active");
  setTimeout(setupButtons, 100);
}

// ─── MATCH TABS ───────────────────────────────────────────────────────────────
function renderMatchTabs() {
  var s1 = slotData("match1"), s2 = slotData("match2");
  var showTabs = s1.active && s2.active;
  ["home-slot-tabs","results-slot-tabs"].forEach(function(id){
    var el = document.getElementById(id);
    if(!el) return;
    if(!showTabs){ el.style.display="none"; return; }
    el.style.display = "flex";
    el.innerHTML =
      '<button class="slot-tab-btn '+(activeSlot==="match1"?"active":"")+'" id="slot-tab-match1" onclick="switchSlot(\'match1\')">'+
        'Match #'+(s1.matchNumber||"?")+" · "+esc(s1.team1||"?")+" vs "+esc(s1.team2||"?")+
        ((!s1.registrationOpen||s1.winner)?'<span class="slot-tag closed">🔒 Closed</span>':'<span class="slot-tag open">🟢 Open</span>')+
      '</button>'+
      '<button class="slot-tab-btn '+(activeSlot==="match2"?"active":"")+'" id="slot-tab-match2" onclick="switchSlot(\'match2\')">'+
        'Match #'+(s2.matchNumber||"?")+" · "+esc(s2.team1||"?")+" vs "+esc(s2.team2||"?")+
        ((!s2.registrationOpen||s2.winner)?'<span class="slot-tag closed">🔒 Closed</span>':'<span class="slot-tag open">🟢 Open</span>')+
      '</button>';
  });
  // Only auto-switch if current activeSlot became inactive
  var curData = slotData(activeSlot);
  if(!curData.active){
    if(s1.active) activeSlot="match1";
    else if(s2.active) activeSlot="match2";
  }
}

// ─── REGISTER FLOW ───────────────────────────────────────────────────────────
function goRegister() {
  var c=cfg(), p=pts();
  if(!c.active)           { showToast("Contest is currently closed.","#e63946"); return; }
  if(!c.registrationOpen) { showToast("Registration is closed for this match.","#e63946"); return; }
  if(c.winner)            { showToast("Result already published.","#e63946"); return; }
  if(p.length>=(c.maxSpots||15)){ showToast("All spots filled!","#e63946"); return; }
  playSound("nav");
  document.querySelector("#page-register .page-sub").textContent =
    "Match #"+c.matchNumber+" · "+c.team1+" vs "+c.team2+" · "+c.time;
  ["reg-name","reg-phone","reg-superstition","reg-snack","reg-spend","reg-prediction"]
    .forEach(function(id){ var el=document.getElementById(id); if(el) el.value=""; });
  showPage("register");
}

function goPayment() {
  var c = slotData(activeSlot);
  var name  = document.getElementById("reg-name").value.trim();
  var phone = document.getElementById("reg-phone").value.trim();
  if(!name){ showToast("Please enter your name","#e63946"); return; }
  if(phone && !/^\d{10}$/.test(phone)){ showToast("Enter valid 10-digit phone or leave blank","#e63946"); return; }
  currentUser = {
    name:name, phone:phone||"—",
    superstition: document.getElementById("reg-superstition").value.trim(),
    snack:        document.getElementById("reg-snack").value.trim(),
    spend:        document.getElementById("reg-spend").value.trim(),
    prediction:   document.getElementById("reg-prediction").value.trim(),
    joinedAt: Date.now(),
    joined: new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),
    match: c.team1+" vs "+c.team2,
    matchNumber: c.matchNumber,
    contestRank: null, prizeMoney: null
  };
  $set("pay-name-show",name); $set("pay-phone-show",phone||"—");
  $set("pay-amount",c.fee); $set("pay-amt-show",c.fee);
  $set("pay-name-note","Pay ₹"+c.fee+" to enter");
  var rawUpi=(c.upi||"").trim(), upiId=rawUpi;
  if(rawUpi.startsWith("upi://")){ var m=rawUpi.match(/pa=([^&]+)/); if(m) upiId=decodeURIComponent(m[1]); }
  var upiLink = upiId
    ? "upi://pay?pa="+encodeURIComponent(upiId)+"&pn=IPL+Contest&am="+c.fee+"&tn=IPL+Contest+Entry&cu=INR"
    : "#";
  document.getElementById("upi-link-anchor").href = upiLink;
  var qr = document.getElementById("qr-img");
  qr.src = c.qr || "https://api.qrserver.com/v1/create-qr-code/?data="+encodeURIComponent(upiLink)+"&size=200x200&margin=10";
  showPage("payment");
}

function confirmPayment() {
  var c=cfg();
  var btn=document.getElementById("pay-confirm-btn");
  btn.disabled=true; btn.textContent="Saving…";
  var safeId = currentUser.name.toLowerCase().replace(/\s+/g,"_")+"_"+Date.now();
  db.collection("currentMatch").doc(activeSlot).collection("players").doc(safeId).set(currentUser)
  .then(function(){
    playSound("success");
    $set("suc-name",currentUser.name);
    $set("suc-phone",currentUser.phone);
    $set("suc-match",currentUser.match);
    $set("suc-matchno","Match #"+c.matchNumber);
    document.getElementById("contest-link-anchor").href = c.contest||"#";
    showPage("success");
    var delay=parseInt(c.redirectDelay)||3;
    if(c.contest && c.contest!=="#") setTimeout(function(){ window.open(c.contest,"_blank"); }, delay*1000);
  }).catch(function(e){
    console.error("confirmPayment",e);
    showToast("Error: "+e.message,"#e63946");
  }).finally(function(){
    btn.disabled=false; btn.textContent="✅ I've Paid — Go to Contest →";
  });
}

// ─── RENDER ───────────────────────────────────────────────────────────────────
function renderAll() {
  if(!slots.match1.data && !slots.match2.data) return;
  // Make sure activeSlot has active data
  if(!slotData(activeSlot).active){
    if(slotData("match1").active) activeSlot="match1";
    else if(slotData("match2").active) activeSlot="match2";
  }
  var c=cfg(), p=pts();
  var maxS=c.maxSpots||15, count=p.length;
  $set("home-match-no", c.active ? "Match #"+(c.matchNumber||"—") : "No Active Match");
  $set("home-teams", c.active
    ? (esc(c.team1||"—")+'<span class="match-vs"> vs </span>'+esc(c.team2||"—"))
    : '— <span class="match-vs">vs</span> —', true);
  $set("home-time", c.active&&c.time ? "🕖 "+c.time : "");
  $set("home-fee", c.fee||50);
  $set("slots-text", count+"/"+maxS);
  $set("slots-count", (maxS-count)+" spot"+(maxS-count!==1?"s":"")+" remaining");
  $set("players-count", count);
  var fill=document.getElementById("slots-fill");
  if(fill) fill.style.width = Math.min(count/maxS*100,100).toFixed(0)+"%";
  var joinBtn=document.getElementById("join-btn");
  var locked = !c.active||!c.registrationOpen||!!c.winner||count>=maxS;
  if(joinBtn){
    joinBtn.disabled=locked;
    joinBtn.textContent = !c.active?"🔒 No Active Match"
      : !c.registrationOpen?"🔒 Registration Closed"
      : c.winner?"🔒 Result Published"
      : count>=maxS?"🔒 Contest Full"
      : "🏏 JOIN NOW";
  }
  var listEl=document.getElementById("player-list-home"), noEl=document.getElementById("no-players");
  if(listEl&&noEl){
    if(count===0){ listEl.innerHTML=""; noEl.style.display="block"; }
    else{
      noEl.style.display="none";
      listEl.innerHTML=[].slice.call(p).sort(function(a,b){ return a.joinedAt-b.joinedAt; }).map(function(pl,i){
        return '<div class="player-list-item"><div><div class="player-name">'+esc(pl.name)+'</div><div class="player-meta">'+esc(pl.joined)+'</div></div><div style="font-size:12px;color:var(--muted);">#'+(i+1)+'</div></div>';
      }).join("");
    }
  }
  renderMatchTabs();
}

function renderResults() {
  var c=slotData(activeSlot), p=slotPts(activeSlot);
  $set("result-match-label","Match #"+c.matchNumber+" · "+c.team1+" vs "+c.team2+" · "+c.time);
  var box=document.getElementById("result-announced-box");
  if(box) box.style.display=c.winner?"block":"none";
  if(c.winner) $set("result-winner-text","🏆 "+c.winner+" Won");
  var ranked=[].slice.call(p).filter(function(pl){ return pl.contestRank!=null&&pl.contestRank!==""; })
    .sort(function(a,b){ return parseInt(a.contestRank)-parseInt(b.contestRank); });
  var unranked=[].slice.call(p).filter(function(pl){ return pl.contestRank==null||pl.contestRank===""; })
    .sort(function(a,b){ return (a.joinedAt||0)-(b.joinedAt||0); });
  var sorted=ranked.concat(unranked);
  var hasResults=ranked.length>0;
  var podium=document.getElementById("podium-section");
  if(podium){
    podium.style.display=hasResults?"block":"none";
    if(hasResults){
      $set("pod-first-name",ranked[0].name);
      $set("pod-first-detail","Rank #"+ranked[0].contestRank+(ranked[0].prizeMoney?" · ₹"+ranked[0].prizeMoney:""));
      var last=ranked[ranked.length-1];
      $set("pod-last-name",last.name);
      $set("pod-last-detail","Rank #"+last.contestRank);
    }
  }
  if(hasResults&&c.winner) fireConfetti();
  var tbody=document.getElementById("results-tbody");
  if(!tbody) return;
  if(p.length===0){ tbody.innerHTML='<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:20px;">No participants yet</td></tr>'; return; }
  tbody.innerHTML=sorted.map(function(pl,i){
    var isFirst=hasResults&&pl.contestRank==ranked[0].contestRank;
    var isLast=hasResults&&ranked.length>1&&pl.contestRank==ranked[ranked.length-1].contestRank;
    var hasPrize=pl.prizeMoney;
    var rd=pl.contestRank?"#"+pl.contestRank:"—";
    var prize=pl.prizeMoney?"₹"+pl.prizeMoney:"—";
    var badge='<span class="badge badge-pending">Pending</span>';
    if(hasResults){
      if(isFirst)       badge='<span class="badge badge-win">🥇 #1</span>';
      else if(isLast)   badge='<span class="badge badge-loss">🪣 Last</span>';
      else if(hasPrize) badge='<span class="badge badge-prize">🏆 Prize</span>';
      else if(pl.contestRank) badge='<span class="badge badge-ranked">Ranked</span>';
    }
    var rowClass=isFirst?"row-first":isLast?"row-last":hasPrize?"row-prize":"";
    var prizeTag=hasPrize?'<span class="prize-winner-tag">💰 ₹'+pl.prizeMoney+'</span>':"";
    return '<tr class="result-row '+rowClass+'" style="animation-delay:'+(i*0.07)+'s">'+
      '<td class="rank-cell">'+(i<3&&pl.contestRank?["🥇","🥈","🥉"][i]:i+1)+'</td>'+
      '<td><strong>'+esc(pl.name)+'</strong>'+prizeTag+'</td>'+
      '<td style="font-weight:700;color:'+(pl.contestRank?"var(--gold)":"var(--muted)")+';">'+rd+'</td>'+
      '<td style="font-weight:700;color:'+(pl.prizeMoney?"var(--green)":"var(--muted)")+';">'+prize+'</td>'+
      '<td>'+badge+'</td></tr>';
  }).join("");
  document.querySelectorAll(".result-row").forEach(function(row,i){
    row.style.opacity="0"; row.style.transform="translateY(12px)";
    setTimeout(function(){ row.style.transition="opacity 0.35s ease,transform 0.35s ease"; row.style.opacity="1"; row.style.transform="translateY(0)"; }, i*70);
  });
}

function renderHistory() {
  var el=document.getElementById("history-list"); if(!el) return;
  if(historyList.length===0){ el.innerHTML='<div style="color:var(--muted);font-size:13px;text-align:center;padding:20px;">No past matches recorded yet.</div>'; return; }
  el.innerHTML=historyList.map(function(m){
    return '<div class="history-item">'+
      '<div class="history-match">Match #'+m.matchNumber+' · '+esc(m.match)+'</div>'+
      '<div class="history-meta">'+esc(m.date)+' · '+m.playerCount+' players'+(m.winner?' · 🏏 '+esc(m.winner)+' Won':'')+'</div>'+
      '<div class="history-results">'+
        (m.first?'<span class="history-winner">🥇 '+esc(m.first)+(m.firstPrize?' · ₹'+m.firstPrize:'')+'</span>':"") +
        (m.last&&m.last!==m.first?'<span class="history-loser">🪣 '+esc(m.last)+'</span>':"") +
      '</div>'+
      '<details style="margin-top:8px;font-size:12px;color:var(--muted);">'+
        '<summary style="cursor:pointer;color:var(--gold);font-weight:700;">View all rankings</summary>'+
        '<div style="margin-top:8px;">'+(m.players||[]).slice().sort(function(a,b){ return parseInt(a.contestRank||999)-parseInt(b.contestRank||999); }).map(function(pl){
          return '<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04);">'+
            '<span>'+esc(pl.name)+'</span><span>Rank #'+(pl.contestRank||"—")+(pl.prizeMoney?' · ₹'+pl.prizeMoney:'')+'</span></div>';
        }).join("")+'</div>'+
      '</details>'+
    '</div>';
  }).join("");
}

// ─── MODAL / CONFIRM ─────────────────────────────────────────────────────────
var _cb = null;
function openModal(title, desc, label, cb) {
  $set("modal-title",title); $set("modal-desc",desc); $set("modal-confirm-btn",label);
  $val("modal-pass-input",""); _cb=cb;
  document.getElementById("confirm-modal").classList.add("open");
  setTimeout(function(){ document.getElementById("modal-pass-input").focus(); },100);
}
function closeModal() { document.getElementById("confirm-modal").classList.remove("open"); _cb=null; }
function modalConfirm() {
  if(document.getElementById("modal-pass-input").value!==ADMIN_PASS){ showToast("Wrong password","#e63946"); return; }
  closeModal(); if(_cb) _cb();
}

var _confirmCb = null;
function openConfirm(title, desc, label, cb) {
  $set("confirm-title",title); $set("confirm-desc",desc); $set("confirm-ok-btn",label);
  _confirmCb=cb;
  document.getElementById("confirm-dialog").classList.add("open");
}
function closeConfirm() { document.getElementById("confirm-dialog").classList.remove("open"); _confirmCb=null; }
window.closeConfirm = closeConfirm;
function confirmOk() {
  var fn = _confirmCb;  // save BEFORE closeConfirm nulls it
  closeConfirm();
  if(fn) fn();
}
window.confirmOk = confirmOk;

// ─── UTILS ────────────────────────────────────────────────────────────────────
function $set(id,val,html) { var el=document.getElementById(id); if(!el)return; html?el.innerHTML=val:el.textContent=val; }
function $val(id,val)      { var el=document.getElementById(id); if(el) el.value=val; }
function esc(s)            { return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function showToast(msg,color) {
  color=color||"#1a9e50";
  var t=document.getElementById("toast"); t.textContent=msg; t.style.background=color;
  t.classList.add("show"); setTimeout(function(){ t.classList.remove("show"); },2800);
  if(color==="#e63946") playSound("error");
}

// ─── CONFETTI ─────────────────────────────────────────────────────────────────
var confettiFired=false;
function fireConfetti(){
  if(confettiFired) return; confettiFired=true;
  var canvas=document.getElementById("confetti-canvas"); if(!canvas) return;
  canvas.style.display="block";
  var ctx=canvas.getContext("2d");
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  var COLORS=["#FFD700","#FFA500","#FF8C00","#2ecc71","#1abc9c","#e63946","#00d4ff","#fff","#ff6b6b","#ffd93d"];
  var SHAPES=["rect","circle","star"];
  var EMOJIS=["🏆","🥇","🏏","⭐","💰","🎊"];
  var pieces=Array.from({length:180},function(){return{x:Math.random()*canvas.width,y:-20-Math.random()*canvas.height*.5,w:Math.random()*12+4,h:Math.random()*7+3,color:COLORS[Math.floor(Math.random()*COLORS.length)],shape:SHAPES[Math.floor(Math.random()*SHAPES.length)],rot:Math.random()*360,vx:(Math.random()-.5)*4,vy:Math.random()*5+2,vr:(Math.random()-.5)*8,wobble:Math.random()*Math.PI*2,wobbleSpeed:.05+Math.random()*.05,opacity:.9+Math.random()*.1};});
  var bursts=Array.from({length:12},function(){return{x:canvas.width/2+(Math.random()-.5)*100,y:canvas.height/2+(Math.random()-.5)*60,emoji:EMOJIS[Math.floor(Math.random()*EMOJIS.length)],vx:(Math.random()-.5)*10,vy:-Math.random()*15-5,vg:.4,opacity:1,size:24+Math.random()*20,life:0};});
  var frame=0,total=260;
  function drawStar(c,cx,cy,r){c.beginPath();for(var i=0;i<5;i++){var a=(i*4*Math.PI/5)-Math.PI/2,b=a+Math.PI/5;i===0?c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a)):c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));c.lineTo(cx+(r*.4)*Math.cos(b),cy+(r*.4)*Math.sin(b));}c.closePath();c.fill();}
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var prog=frame/total;
    pieces.forEach(function(p){p.wobble+=p.wobbleSpeed;p.x+=p.vx+Math.sin(p.wobble)*.5;p.y+=p.vy;p.vy+=.06;p.rot+=p.vr;var alpha=p.opacity*Math.max(0,1-Math.max(0,prog-.6)/.4);ctx.save();ctx.globalAlpha=alpha;ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.fillStyle=p.color;if(p.shape==="rect") ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);else if(p.shape==="circle"){ctx.beginPath();ctx.arc(0,0,p.w/2,0,Math.PI*2);ctx.fill();}else drawStar(ctx,0,0,p.w/2);ctx.restore();});
    bursts.forEach(function(e){if(e.life<80){e.x+=e.vx;e.y+=e.vy;e.vy+=e.vg;e.opacity=Math.max(0,1-e.life/60);ctx.globalAlpha=e.opacity;ctx.font=e.size+"px serif";ctx.textAlign="center";ctx.fillText(e.emoji,e.x,e.y);e.life++;}});
    ctx.globalAlpha=1; frame++;
    if(frame<total) requestAnimationFrame(draw);
    else{ canvas.style.display="none"; confettiFired=false; }
  }
  draw();
}

// ─── SOUND ENGINE ────────────────────────────────────────────────────────────
var AudioCtx=window.AudioContext||window.webkitAudioContext;
var audioCtx=null;
function getAudioCtx(){ if(!audioCtx) audioCtx=new AudioCtx(); return audioCtx; }
function smoothNote(ctx,dest,freq,t,dur,vol,type){
  vol=vol||0.12; type=type||"sine";
  var o=ctx.createOscillator(),g=ctx.createGain();
  o.type=type; o.frequency.value=freq;
  g.gain.setValueAtTime(0,t);
  g.gain.linearRampToValueAtTime(vol,t+Math.min(0.06,dur*.2));
  g.gain.linearRampToValueAtTime(vol*.7,t+dur*.6);
  g.gain.linearRampToValueAtTime(0,t+dur);
  o.connect(g); g.connect(dest); o.start(t); o.stop(t+dur+.05);
}
function playSound(type){
  try{
    var ctx=getAudioCtx(); if(ctx.state==="suspended"){ctx.resume();return;}
    var m=ctx.createGain(); m.gain.value=1; m.connect(ctx.destination);
    var now=ctx.currentTime;
    if(type==="click"){
      var o=ctx.createOscillator(),g=ctx.createGain();
      o.type="sine"; o.frequency.setValueAtTime(600,now); o.frequency.linearRampToValueAtTime(380,now+.09);
      g.gain.setValueAtTime(0,now); g.gain.linearRampToValueAtTime(.13,now+.012); g.gain.linearRampToValueAtTime(0,now+.13);
      o.connect(g); g.connect(m); o.start(now); o.stop(now+.15);
      var o2=ctx.createOscillator(),g2=ctx.createGain();
      o2.type="sine"; o2.frequency.value=320;
      g2.gain.setValueAtTime(0,now+.01); g2.gain.linearRampToValueAtTime(.05,now+.03); g2.gain.linearRampToValueAtTime(0,now+.18);
      o2.connect(g2); g2.connect(m); o2.start(now+.01); o2.stop(now+.2);
    } else if(type==="join"){
      [329,415,523,659,784].forEach(function(f,i){ smoothNote(ctx,m,f,now+i*.1,.4,.1,"sine"); smoothNote(ctx,m,f*2,now+i*.1,.3,.03,"triangle"); });
    } else if(type==="success"){
      [392,523,659,784].forEach(function(f,i){ smoothNote(ctx,m,f,now+i*.13,.5,.12,"sine"); });
    } else if(type==="winning"){
      [[392,494,587],[523,659,784],[587,740,880],[784,988,1175]].forEach(function(chord,ci){ chord.forEach(function(f){ smoothNote(ctx,m,f,now+ci*.2,.65,.09,"sine"); smoothNote(ctx,m,f,now+ci*.2,.55,.03,"triangle"); smoothNote(ctx,m,f*2,now+ci*.2,.3,.02,"sine"); }); });
      [784,880,988,1047,1175,1319].forEach(function(f,i){ smoothNote(ctx,m,f,now+.8+i*.1,.35,.1,"sine"); });
      smoothNote(ctx,m,1319,now+1.45,1.3,.13,"sine"); smoothNote(ctx,m,1047,now+1.5,1.1,.06,"sine");
      smoothNote(ctx,m,196,now,1.5,.1,"sine"); smoothNote(ctx,m,392,now+.8,1.2,.06,"sine");
    } else if(type==="error"){
      var oe=ctx.createOscillator(),ge=ctx.createGain();
      oe.type="sine"; oe.frequency.setValueAtTime(200,now); oe.frequency.linearRampToValueAtTime(120,now+.25);
      ge.gain.setValueAtTime(0,now); ge.gain.linearRampToValueAtTime(.08,now+.04); ge.gain.linearRampToValueAtTime(0,now+.3);
      oe.connect(ge); ge.connect(m); oe.start(now); oe.stop(now+.35);
    } else if(type==="nav"){
      var on=ctx.createOscillator(),gn=ctx.createGain();
      on.type="sine"; on.frequency.setValueAtTime(220,now); on.frequency.linearRampToValueAtTime(440,now+.25);
      gn.gain.setValueAtTime(0,now); gn.gain.linearRampToValueAtTime(.07,now+.06); gn.gain.linearRampToValueAtTime(0,now+.3);
      on.connect(gn); gn.connect(m); on.start(now); on.stop(now+.35);
    }
  }catch(e){}
}

// ─── MUSIC ────────────────────────────────────────────────────────────────────
var musicPlaying=false, musicGain=null;
function startMusic(){
  try{
    var ctx=getAudioCtx();
    musicGain=ctx.createGain(); musicGain.gain.setValueAtTime(0,ctx.currentTime); musicGain.connect(ctx.destination);
    musicGain.gain.linearRampToValueAtTime(.07,ctx.currentTime+1.8);
    var conv=ctx.createConvolver(),revG=ctx.createGain(); revG.gain.value=.3;
    var buf=ctx.createBuffer(2,ctx.sampleRate*2,ctx.sampleRate);
    for(var c=0;c<2;c++){var d=buf.getChannelData(c);for(var i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2);}
    conv.buffer=buf; conv.connect(revG); revG.connect(musicGain);
    var BPM=96,beat=60/BPM,bar=beat*4;
    function st(b,s){return b*Math.pow(2,s/12);}
    var chords=[[293,370,440],[392,494,587],[440,554,659],[392,494,587]];
    var bassRoots=[147,196,220,196];
    var arpPats=[[0,4,7,12,16,12,7,4],[0,4,7,11,14,11,7,4],[0,4,8,12,16,12,8,4],[0,4,7,11,14,11,7,4]];
    var arpRoots=[293,392,440,392];
    function playChord(ci,t){if(!musicPlaying)return;chords[ci%chords.length].forEach(function(f){[1,2].forEach(function(m,mi){var o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=f*m;var vol=mi===0?.1:.03;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+beat*.8);g.gain.linearRampToValueAtTime(vol,t+bar-beat*.5);g.gain.linearRampToValueAtTime(0,t+bar+beat*.5);o.connect(g);g.connect(musicGain);o.connect(conv);o.start(t);o.stop(t+bar+beat+.1);});});}
    function playArp(ci,t){if(!musicPlaying)return;arpPats[ci%arpPats.length].forEach(function(s,i){var f=st(arpRoots[ci%arpRoots.length],s),ti=t+i*beat*.5,o=ctx.createOscillator(),g=ctx.createGain();o.type="triangle";o.frequency.value=f;g.gain.setValueAtTime(0,ti);g.gain.linearRampToValueAtTime(.07,ti+.04);g.gain.linearRampToValueAtTime(0,ti+beat*.42);o.connect(g);g.connect(musicGain);o.connect(conv);o.start(ti);o.stop(ti+beat*.5+.05);});}
    function playBass(ci,t){if(!musicPlaying)return;var root=bassRoots[ci%bassRoots.length],fifth=st(root,7);[{f:root,o:0,d:beat*.9},{f:fifth,o:beat,d:beat*.5},{f:root,o:beat*2,d:beat*.9},{f:fifth,o:beat*3,d:beat*.5}].forEach(function(n){var o=ctx.createOscillator(),g=ctx.createGain(),ti=t+n.o;o.type="sine";o.frequency.value=n.f;g.gain.setValueAtTime(0,ti);g.gain.linearRampToValueAtTime(.13,ti+.06);g.gain.linearRampToValueAtTime(.07,ti+n.d*.6);g.gain.linearRampToValueAtTime(0,ti+n.d);o.connect(g);g.connect(musicGain);o.start(ti);o.stop(ti+n.d+.05);});}
    var ci=0;
    function scheduleBar(t){if(!musicPlaying)return;playChord(ci,t);playArp(ci,t);playBass(ci,t);ci++;var next=t+bar,ms=(next-ctx.currentTime)*1000-150;setTimeout(function(){scheduleBar(next);},Math.max(0,ms));}
    scheduleBar(ctx.currentTime+.1);
  }catch(e){console.log("music",e);}
}
function stopMusic(){
  musicPlaying=false;
  if(musicGain){try{musicGain.gain.exponentialRampToValueAtTime(.001,getAudioCtx().currentTime+.5);}catch(e){}}
}
function toggleMusic(){
  var btn=document.getElementById("music-btn");
  musicPlaying=!musicPlaying;
  if(musicPlaying){getAudioCtx().resume().then(function(){startMusic();if(btn){btn.textContent="🔊";btn.classList.add("music-on");}});}
  else{stopMusic();if(btn){btn.textContent="🔇";btn.classList.remove("music-on");}}
}

// ─── RIPPLE + BUTTONS ────────────────────────────────────────────────────────
function addRipple(e){
  var btn=e.currentTarget;
  var ex=btn.querySelector(".ripple"); if(ex) ex.remove();
  var rect=btn.getBoundingClientRect();
  var x=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;
  var y=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;
  var size=Math.max(rect.width,rect.height)*2;
  var r=document.createElement("span"); r.className="ripple";
  r.style.cssText="width:"+size+"px;height:"+size+"px;left:"+(x-size/2)+"px;top:"+(y-size/2)+"px;";
  btn.appendChild(r); setTimeout(function(){r.remove();},700);
  playSound("click");
}
function setupButtons(){
  document.querySelectorAll(".cta-btn,.save-btn,.admin-btn,.tab-btn").forEach(function(btn){
    btn.addEventListener("click",addRipple);
    btn.addEventListener("touchstart",addRipple,{passive:true});
  });
  var joinBtn=document.getElementById("join-btn");
  if(joinBtn) joinBtn.addEventListener("click",function(){ if(!joinBtn.disabled) playSound("join"); });
  // Auto-start music on first interaction
  var musicStarted=false;
  function unlockAndPlay(){
    if(musicStarted) return;
    var mb=document.getElementById("music-btn");
    if(mb&&(mb===document.activeElement||mb.contains(document.activeElement))) return;
    musicStarted=true; musicPlaying=true;
    getAudioCtx().resume().then(function(){
      startMusic();
      var btn=document.getElementById("music-btn");
      if(btn){btn.textContent="🔊";btn.classList.add("music-on");}
    });
    document.removeEventListener("touchstart",unlockAndPlay);
    document.removeEventListener("click",unlockAndPlay);
  }
  document.addEventListener("touchstart",unlockAndPlay,{passive:true});
  document.addEventListener("click",unlockAndPlay);
}
