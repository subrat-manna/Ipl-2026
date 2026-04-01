// ─── FIREBASE CONFIG ─────────────────────────────────────────────────────────
var firebaseConfig = {
  apiKey: "AIzaSyDxn6NJHiC-KET_k-Dy5inlLKzDldNCuEs",
  authDomain: "ipl-contest-d496b.firebaseapp.com",
  projectId: "ipl-contest-d496b",
  storageBucket: "ipl-contest-d496b.firebasestorage.app",
  messagingSenderId: "116370990418",
  appId: "1:116370990418:web:d87223719d2db5d4fe868b"
};
var ADMIN_PASS = "ipl2024";

// ─── INIT ─────────────────────────────────────────────────────────────────────
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// ─── REFS ─────────────────────────────────────────────────────────────────────
function slotRef(slot)       { return db.collection("currentMatch").doc(slot); }
function slotPlayers(slot)   { return db.collection("currentMatch").doc(slot).collection("players"); }
function historyDocRef(no)   { return db.collection("history").doc(String(no)); }
var historyQuery = db.collection("history").orderBy("matchNumber","desc");

// ─── STATE ────────────────────────────────────────────────────────────────────
var slots       = { match1:{data:null,players:[]}, match2:{data:null,players:[]} };
var activeSlot  = "match1";
var adminSlot   = "match1";
var historyList = [];
var currentUser = {};

function slotData(s) { return (slots[s]&&slots[s].data) ? slots[s].data : {}; }
function slotPts(s)  { return (slots[s]&&slots[s].players) ? slots[s].players : []; }
function cfg()  { return slotData(activeSlot); }
function pts()  { return slotPts(activeSlot); }
function aCfg() { return slotData(adminSlot); }
function aPts() { return slotPts(adminSlot); }
function defaultSlot() {
  return { matchNumber:0, team1:"", team2:"", time:"", fee:50, maxSpots:15,
           qr:"", upi:"", contest:"", redirectDelay:3,
           active:false, registrationOpen:false, winner:"" };
}

// ─── BOOT ─────────────────────────────────────────────────────────────────────
function boot() {
  var inits = ["match1","match2"].map(function(slot){
    return slotRef(slot).get().then(function(snap){
      if(!snap.exists) return slotRef(slot).set(defaultSlot());
    });
  });

  Promise.all(inits).then(function(){
    ["match1","match2"].forEach(function(slot){
      slotRef(slot).onSnapshot(function(s){
        slots[slot].data = s.data() || defaultSlot();
        renderAll(); renderMatchTabs();
        if(document.getElementById("page-admin").classList.contains("active")) loadAdminFields();
      }, function(e){ console.error(slot,e); });

      slotPlayers(slot).onSnapshot(function(s){
        slots[slot].players = s.docs.map(function(d){ return Object.assign({id:d.id},d.data()); });
        renderAll(); renderMatchTabs();
        if(document.getElementById("page-admin").classList.contains("active")) loadAdminFields();
      }, function(e){ console.error(slot+"players",e); });
    });

    historyQuery.onSnapshot(function(s){
      historyList = s.docs.map(function(d){ return Object.assign({id:d.id},d.data()); });
      renderHistory(); renderAdminHistory();
    }, function(e){ console.error("history",e); });

    hideLoader();
  }).catch(function(e){
    hideLoader();
    document.getElementById("setup-banner").style.display = "block";
    document.getElementById("setup-error").textContent = "Error: "+e.message;
  });
}
