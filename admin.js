// ─── ADMIN SLOT SWITCHER ─────────────────────────────────────────────────────
function switchAdminSlot(slot) {
  adminSlot = slot;
  document.querySelectorAll(".admin-slot-btn").forEach(function(b){ b.classList.remove("active"); });
  var el=document.getElementById("admin-slot-btn-"+slot);
  if(el) el.classList.add("active");
  loadAdminFields();
}

// ─── LOAD ADMIN FIELDS ───────────────────────────────────────────────────────
function loadAdminFields() {
  var c=aCfg(), p=aPts();
  var sl=document.getElementById("admin-match-status");

  // Determine correct status
  var statusText, statusColor;
  if(!c.active){
    statusText="🔴 INACTIVE"; statusColor="var(--red)";
  } else if(c.winner){
    statusText="🏆 RESULT PUBLISHED"; statusColor="var(--gold)";
  } else if(c.registrationOpen){
    statusText="🟢 REGISTRATION OPEN"; statusColor="var(--green)";
  } else {
    statusText="🟡 REG. CLOSED"; statusColor="var(--gold)";
  }
  if(sl){ sl.textContent=statusText; sl.style.color=statusColor; }
  $set("admin-match-no-display", c.active?"Match #"+(c.matchNumber||"—"):"Inactive");

  // Slot badges
  ["match1","match2"].forEach(function(s){
    var d=slotData(s);
    var badgeId = s==="match1"?"admin-slot1-badge":"admin-slot2-badge";
    var el=document.getElementById(badgeId);
    if(!el) return;
    if(!d.active){       el.textContent="Inactive";    el.className="slot-tag closed"; }
    else if(d.winner){   el.textContent="Result Done"; el.className="slot-tag closed"; }
    else if(d.registrationOpen){ el.textContent="Open"; el.className="slot-tag open"; }
    else{                el.textContent="Reg.Closed";  el.className="slot-tag closed"; }
  });

  $val("a-match-number",c.matchNumber||"");
  $val("a-team1",c.team1||""); $val("a-team2",c.team2||"");
  $val("a-time",c.time||"");
  $val("a-fee",c.fee||50); $val("a-maxspots",c.maxSpots||15);
  $val("a-qr",c.qr||""); $val("a-upi",c.upi||"");
  $val("a-contest",c.contest||""); $val("a-redirect-delay",c.redirectDelay!=null?c.redirectDelay:3);

  var w1=document.getElementById("w-opt1"),w2=document.getElementById("w-opt2");
  if(w1){ w1.value=c.team1||""; w1.textContent=c.team1||"Team 1"; }
  if(w2){ w2.value=c.team2||""; w2.textContent=c.team2||"Team 2"; }
  $val("a-winner",c.winner||"");
  $set("admin-player-count",p.length);

  var rfa=document.getElementById("result-feed-area");
  if(rfa){
    if(p.length===0){
      rfa.innerHTML='<div style="color:var(--muted);font-size:13px;text-align:center;padding:12px;">No players registered yet.</div>';
    } else {
      rfa.innerHTML=[].slice.call(p).sort(function(a,b){return(a.joinedAt||0)-(b.joinedAt||0);}).map(function(pl,i){
        return '<div class="result-input-row">'+
          '<div class="result-rank-badge rank-badge-1">'+(i+1)+'</div>'+
          '<div style="flex:1;"><div style="font-size:14px;font-weight:700;">'+esc(pl.name)+'</div>'+
          '<div style="font-size:11px;color:var(--muted);">'+esc(pl.phone)+'</div></div>'+
          '<input class="form-input" data-pid="'+pl.id+'" data-field="rank" type="number" min="1" placeholder="Rank" value="'+(pl.contestRank||"")+'" style="width:75px;padding:8px 10px;font-size:14px;">'+
          '<input class="form-input" data-pid="'+pl.id+'" data-field="prize" type="number" min="0" placeholder="₹ Prize" value="'+(pl.prizeMoney||"")+'" style="width:85px;padding:8px 10px;font-size:14px;">'+
        '</div>';
      }).join("");
    }
  }

  var apl=document.getElementById("admin-player-list");
  if(apl){
    apl.innerHTML = p.length===0
      ? '<div style="color:var(--muted);font-size:13px;text-align:center;padding:12px 0;">No players yet</div>'
      : [].slice.call(p).sort(function(a,b){return(a.joinedAt||0)-(b.joinedAt||0);}).map(function(pl,i){
          return '<div class="player-list-item">'+
            '<div><div class="player-name">'+esc(pl.name)+' — '+esc(pl.phone)+'</div>'+
            '<div class="player-meta">Joined: '+esc(pl.joined)+'</div>'+
            (pl.prediction?'<div class="player-meta">🔮 '+esc(pl.prediction)+'</div>':'')+
            '</div><div style="font-size:12px;color:var(--muted);">#'+(i+1)+'</div></div>';
        }).join("");
  }
  renderAdminHistory();
}

function renderAdminHistory() {
  var el=document.getElementById("admin-history-list"); if(!el) return;
  if(historyList.length===0){ el.innerHTML="No archived matches yet."; return; }
  el.innerHTML=historyList.map(function(m){
    return '<div class="history-item">'+
      '<div class="history-match">Match #'+m.matchNumber+' · '+esc(m.match)+'</div>'+
      '<div class="history-meta">'+esc(m.date)+' · '+m.playerCount+' players'+(m.winner?' · 🏏 '+esc(m.winner)+' Won':'')+'</div>'+
      '<div class="history-results">'+
        (m.first?'<span class="history-winner">🥇 '+esc(m.first)+(m.firstPrize?' · ₹'+m.firstPrize:'')+'</span>':'')+
        (m.last&&m.last!==m.first?'<span class="history-loser">🪣 '+esc(m.last)+'</span>':'')+
      '</div></div>';
  }).join("");
}

// ─── SAVE MATCH INFO ─────────────────────────────────────────────────────────
function saveMatch() {
  var c=aCfg();
  var matchNo=parseInt(document.getElementById("a-match-number").value)||c.matchNumber||1;
  var t1=document.getElementById("a-team1").value.trim();
  var t2=document.getElementById("a-team2").value.trim();
  if(!t1||!t2){ showToast("Enter both team names","#e63946"); return; }
  var data={matchNumber:matchNo,team1:t1,team2:t2,
    time:document.getElementById("a-time").value.trim(),
    fee:parseInt(document.getElementById("a-fee").value)||50,
    maxSpots:parseInt(document.getElementById("a-maxspots").value)||15};
  withLock(adminSlot, function(){
    slots[adminSlot].data = Object.assign({},slots[adminSlot].data,data);
    renderAll(); loadAdminFields();
    return slotRef(adminSlot).set(data,{merge:true});
  }).then(function(){ showToast("Match info saved!"); })
  .catch(function(e){ showToast("Error: "+e.message,"#e63946"); });
}

function savePayment() {
  var data={qr:document.getElementById("a-qr").value.trim(),upi:document.getElementById("a-upi").value.trim()};
  withLock(adminSlot, function(){
    slots[adminSlot].data = Object.assign({},slots[adminSlot].data,data);
    return slotRef(adminSlot).set(data,{merge:true});
  }).then(function(){ showToast("Payment info saved!"); })
  .catch(function(e){ showToast("Error: "+e.message,"#e63946"); });
}

function saveContest() {
  var data={contest:document.getElementById("a-contest").value.trim(),
    redirectDelay:parseInt(document.getElementById("a-redirect-delay").value)||3};
  withLock(adminSlot, function(){
    slots[adminSlot].data = Object.assign({},slots[adminSlot].data,data);
    return slotRef(adminSlot).set(data,{merge:true});
  }).then(function(){ showToast("Contest link saved!"); })
  .catch(function(e){ showToast("Error: "+e.message,"#e63946"); });
}

// ─── SAVE RESULT ─────────────────────────────────────────────────────────────
function saveResult() {
  var c=aCfg(), p=aPts();
  var winner=document.getElementById("a-winner").value;
  var updates={};
  document.querySelectorAll("#result-feed-area input[data-pid]").forEach(function(inp){
    var pid=inp.getAttribute("data-pid"),field=inp.getAttribute("data-field"),val=inp.value.trim();
    if(!updates[pid]) updates[pid]={};
    if(field==="rank")  updates[pid].contestRank = val!==""?parseInt(val):null;
    if(field==="prize") updates[pid].prizeMoney  = val!==""?parseInt(val):null;
  });

  withLock(adminSlot, function(){
    // Update local player data immediately
    p.forEach(function(pl){
      if(updates[pl.id]){
        pl.contestRank = updates[pl.id].contestRank !== undefined ? updates[pl.id].contestRank : pl.contestRank;
        pl.prizeMoney  = updates[pl.id].prizeMoney  !== undefined ? updates[pl.id].prizeMoney  : pl.prizeMoney;
      }
    });
    // Update local slot data — always close registration when saving result
    slots[adminSlot].data = Object.assign({},slots[adminSlot].data,{
      winner: winner,
      registrationOpen: false
    });
    renderAll(); loadAdminFields();

    // Write to Firestore
    var batch=db.batch();
    Object.keys(updates).forEach(function(pid){
      var ref=db.collection("currentMatch").doc(adminSlot).collection("players").doc(pid);
      batch.update(ref,updates[pid]);
    });
    // Always write winner + close registration together
    batch.set(slotRef(adminSlot),{winner:winner, registrationOpen:false},{merge:true});

    return batch.commit().then(function(){
      // Save to history
      var updated=p.map(function(pl){
        return {name:pl.name,phone:pl.phone,contestRank:pl.contestRank,prizeMoney:pl.prizeMoney};
      });
      var ranked=updated.filter(function(pl){return pl.contestRank!=null;})
        .sort(function(a,b){return parseInt(a.contestRank)-parseInt(b.contestRank);});
      return historyDocRef(c.matchNumber).set({
        matchNumber:c.matchNumber, match:c.team1+" vs "+c.team2,
        date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}),
        time:c.time, winner:winner, playerCount:p.length,
        first:ranked[0]?ranked[0].name:"",
        firstPrize:ranked[0]?ranked[0].prizeMoney:null,
        last:ranked[ranked.length-1]?ranked[ranked.length-1].name:"",
        players:updated, updatedAt:Date.now()
      });
    });
  }).then(function(){ showToast("Results saved & history updated! 🏆"); })
  .catch(function(e){ showToast("Error: "+e.message,"#e63946"); });
}

// ─── OPEN NEW MATCH ──────────────────────────────────────────────────────────
function newMatch() {
  var c=aCfg();
  $set("nm-slot-label", adminSlot==="match1"?"Slot 1":"Slot 2");
  document.getElementById("nm-match-number").value=(c.matchNumber||0)+1;
  document.getElementById("nm-team1").value="";
  document.getElementById("nm-team2").value="";
  document.getElementById("nm-time").value="";
  document.getElementById("nm-fee").value=c.fee||50;
  document.getElementById("nm-maxspots").value=c.maxSpots||15;
  showPage("new-match");
}

function confirmNewMatch() {
  var matchNo=parseInt(document.getElementById("nm-match-number").value);
  var t1=document.getElementById("nm-team1").value.trim();
  var t2=document.getElementById("nm-team2").value.trim();
  var time=document.getElementById("nm-time").value.trim();
  var fee=parseInt(document.getElementById("nm-fee").value)||50;
  var maxSpots=parseInt(document.getElementById("nm-maxspots").value)||15;
  if(!matchNo){ showToast("Enter a match number","#e63946"); return; }
  if(!t1||!t2){ showToast("Enter both team names","#e63946"); return; }
  var btn=document.getElementById("nm-confirm-btn");
  btn.disabled=true; btn.textContent="Opening…";
  var c=aCfg();
  var newData={matchNumber:matchNo,team1:t1,team2:t2,time:time,fee:fee,maxSpots:maxSpots,
    active:true,registrationOpen:true,winner:"",
    qr:c.qr||"",upi:c.upi||"",contest:c.contest||"",redirectDelay:c.redirectDelay||3};

  withLock(adminSlot, function(){
    // Update local state first
    slots[adminSlot].data = newData;
    slots[adminSlot].players = [];
    activeSlot = adminSlot;
    renderAll(); loadAdminFields();
    showPage("admin");
    showToast("Match #"+matchNo+": "+t1+" vs "+t2+" OPEN in "+(adminSlot==="match1"?"Slot 1":"Slot 2")+"! ✅");
    // Delete old players + write new match doc
    return slotPlayers(adminSlot).get().then(function(snap){
      var batch=db.batch();
      snap.docs.forEach(function(d){ batch.delete(d.ref); });
      batch.set(slotRef(adminSlot),newData);
      return batch.commit();
    });
  }).catch(function(e){
    showToast("Error: "+e.message,"#e63946");
    btn.disabled=false; btn.textContent="🏏 Open This Match →";
  });
}

// ─── CLOSE REGISTRATION ──────────────────────────────────────────────────────
function closeRegistration() {
  var c=aCfg();
  if(!c.active){ showToast("This slot has no active match.","#e63946"); return; }
  if(!c.registrationOpen){ showToast("Registration is already closed.","#e63946"); return; }
  openConfirm(
    "Close Registration",
    "Stop new registrations for Match #"+c.matchNumber+" ("+c.team1+" vs "+c.team2+"). Players already joined will stay.",
    "🔒 Close Registration",
    function(){
      withLock(adminSlot, function(){
        // Update local state immediately
        slots[adminSlot].data = Object.assign({},slots[adminSlot].data,{registrationOpen:false});
        renderAll(); loadAdminFields();
        showToast("Registration closed for Match #"+c.matchNumber+".");
        return slotRef(adminSlot).update({registrationOpen:false});
      }).catch(function(e){
        // Rollback on error
        slots[adminSlot].data = Object.assign({},slots[adminSlot].data,{registrationOpen:true});
        renderAll(); loadAdminFields();
        showToast("Error: "+e.message,"#e63946");
      });
    }
  );
}

// ─── RESET SLOT ──────────────────────────────────────────────────────────────
function resetSlot() {
  var slotLabel=adminSlot==="match1"?"Slot 1":"Slot 2";
  openConfirm(
    "Reset "+slotLabel,
    "Clear all players and hide "+slotLabel+" from users. Save results to history first.",
    "🗑 Reset "+slotLabel,
    function(){
      var blank=defaultSlot();
      withLock(adminSlot, function(){
        // Update local state immediately
        slots[adminSlot].data = blank;
        slots[adminSlot].players = [];
        // If user was viewing this slot, switch to the other if active
        if(activeSlot===adminSlot){
          var other=adminSlot==="match1"?"match2":"match1";
          if(slots[other].data && slots[other].data.active) activeSlot=other;
        }
        renderAll(); loadAdminFields();
        showToast(slotLabel+" has been reset and hidden from users.");
        // Delete all players + reset slot doc
        return slotPlayers(adminSlot).get().then(function(snap){
          var batch=db.batch();
          snap.docs.forEach(function(d){ batch.delete(d.ref); });
          batch.set(slotRef(adminSlot),blank);
          return batch.commit();
        });
      }).catch(function(e){ showToast("Error: "+e.message,"#e63946"); });
    }
  );
}

// ─── CLEAR PLAYERS ───────────────────────────────────────────────────────────
function clearPlayersOnly() {
  openConfirm("Clear Players","Delete all current players for this slot without affecting history.","🗑 Clear",function(){
    withLock(adminSlot, function(){
      slots[adminSlot].players=[];
      renderAll(); loadAdminFields();
      return slotPlayers(adminSlot).get().then(function(snap){
        var batch=db.batch();
        snap.docs.forEach(function(d){ batch.delete(d.ref); });
        return batch.commit();
      });
    }).then(function(){ showToast("Players cleared!"); })
    .catch(function(e){ showToast("Error: "+e.message,"#e63946"); });
  });
}

// ─── CLEAR HISTORY ───────────────────────────────────────────────────────────
function clearHistory() {
  openModal(
    "Delete ALL History",
    "Permanently delete all "+historyList.length+" archived matches. Cannot be undone.",
    "🗑 Delete Forever",
    function(){
      var batch=db.batch();
      historyList.forEach(function(m){
        batch.delete(db.collection("history").doc(String(m.matchNumber)));
      });
      batch.commit().then(function(){
        historyList=[]; renderHistory(); renderAdminHistory();
        showToast("History deleted");
      }).catch(function(e){ showToast("Error: "+e.message,"#e63946"); });
    }
  );
}
