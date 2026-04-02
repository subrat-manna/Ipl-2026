<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>IPL Daily Contest</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&family=Teko:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<canvas id="confetti-canvas"></canvas>
<div class="particle" style="left:5%;animation-delay:0s;animation-duration:14s">🏏</div>
<div class="particle" style="left:20%;animation-delay:3s;animation-duration:11s">🏆</div>
<div class="particle" style="left:40%;animation-delay:6s;animation-duration:16s">⭐</div>
<div class="particle" style="left:60%;animation-delay:1.5s;animation-duration:13s">🎯</div>
<div class="particle" style="left:75%;animation-delay:8s;animation-duration:12s">🏏</div>
<div class="particle" style="left:88%;animation-delay:4s;animation-duration:15s">💥</div>
<div id="app-loader">
  <div class="loader-cricket">🏏</div>
  <div class="loader-bar"></div>
  <div class="loader-text">Loading IPL Contest</div>
</div>
<nav class="nav">
  <div class="nav-logo">IPL <span>CONTEST</span></div>
  <div style="display:flex;align-items:center;gap:8px;">
    <button class="music-btn" id="music-btn" onclick="window.toggleMusic()" title="Toggle Music">🔇</button>
    <button class="admin-btn" onclick="window.goAdmin()">⚙ Admin</button>
  </div>
</nav>
<div id="toast" class="toast"></div>

<div id="setup-banner">
  <h3>🔧 Firebase Setup Required</h3>
  <p>Replace the Firebase config values at the top of the script with your project's config from Firebase Console → Project Settings.</p>
  <p id="setup-error"></p>
</div>

<!-- HOME -->
<div id="page-home" class="page">
  <div class="hero">
    <div class="match-badge">Today's Match</div>
    <div id="home-slot-tabs" class="slot-tabs" style="display:none;"></div>
    <div class="match-number-tag" id="home-match-no">Match #—</div>
    <div class="match-title-wrap" style="position:relative;display:inline-block;margin-bottom:0;">
      <div class="match-title" id="home-teams">— <span class="match-vs">vs</span> —</div>
    </div>
    <div class="match-info" id="home-time"></div>
    <div class="entry-fee-tag">Entry Fee: ₹<span id="home-fee">50</span></div>
    <div class="slots-bar">
      <div class="slots-label"><span>Spots Filled</span><span id="slots-text">0/15</span></div>
      <div class="slots-track"><div class="slots-fill" id="slots-fill" style="width:0%"></div></div>
      <div class="slots-count" id="slots-count">15 spots remaining</div>
    </div>
    <button class="cta-btn" id="join-btn" onclick="window.goRegister()">🏏 JOIN NOW</button>
    <button class="cta-btn secondary" onclick="window.showResults()">📊 View Results</button>
  </div>
  <div class="card">
    <div class="card-title">How It Works</div>
    <div style="display:flex;flex-direction:column;gap:12px;font-size:14px;color:#bcc4d6;">
      <div>① <strong style="color:var(--text)">Fill Details</strong> — Enter your name + optional fun facts</div>
      <div>② <strong style="color:var(--text)">Pay Entry Fee</strong> — Scan QR or tap UPI link</div>
      <div>③ <strong style="color:var(--text)">Join Contest</strong> — Redirected to contest app automatically</div>
      <div>④ <strong style="color:var(--text)">Win Prizes</strong> — Check the live dashboard after the match</div>
    </div>
  </div>
  <div class="card">
    <div class="card-title">Players Joined (<span id="players-count">0</span>)</div>
    <div id="player-list-home"></div>
    <div id="no-players" style="color:var(--muted);font-size:13px;text-align:center;padding:10px 0;">No players yet. Be the first!</div>
  </div>
</div>

<!-- REGISTER -->
<div id="page-register" class="page">
  <div class="steps"><div class="step active"></div><div class="step"></div><div class="step"></div></div>
  <div class="page-title">Your Details</div>
  <div class="page-sub">Just your name to enter. Everything else is for fun 😄</div>
  <div class="card">
    <div class="form-group">
      <label class="form-label">Select Your Name <span style="color:var(--red)">*</span></label>
      <!-- Hidden input that holds the selected name — rest of app reads this -->
      <input type="hidden" id="reg-name">
      <!-- Search box -->
      <input class="form-input" id="name-search" type="text" placeholder="🔍 Search name..." autocomplete="off"
        oninput="filterNames(this.value)" style="margin-bottom:12px;">
      <!-- Selected name display -->
      <div id="selected-name-display" style="display:none;background:rgba(255,215,0,.1);border:1.5px solid var(--gold);border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:15px;font-weight:700;color:var(--gold);text-align:center;">
        ✅ Selected: <span id="selected-name-text"></span>
        <span onclick="clearNameSelection()" style="float:right;cursor:pointer;color:var(--muted);font-size:12px;">✕ Change</span>
      </div>
      <!-- Name chips grid -->
      <div id="name-chips-grid" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
      <div id="no-name-found" style="display:none;color:var(--muted);font-size:13px;text-align:center;padding:10px;">No name found</div>
    </div>
    <div class="form-group"><label class="form-label">Phone Number <span class="optional-tag">(optional)</span></label><input class="form-input" id="reg-phone" type="tel" placeholder="10-digit mobile number" maxlength="10"></div>
  </div>
  <div class="card" style="padding:16px;">
    <div class="funny-section-header" id="funny-toggle" onclick="window.toggleFunny()">
      <span style="font-size:20px;">🎭</span><div class="funny-title">Fun Questions (Optional)</div>
      <div style="font-size:11px;color:var(--muted);margin-right:8px;">Don't be boring</div><div class="funny-chevron">▼</div>
    </div>
    <div class="funny-fields" id="funny-fields">
      <div class="funny-note">Your answers may appear on the results board 😏</div>
      <div class="form-group"><label class="form-label">🧿 Pre-Match Superstition <span class="optional-tag">(optional)</span></label><input class="form-input" id="reg-superstition" type="text" placeholder="e.g. I wear the same underwear since 2019"></div>
      <div class="form-group"><label class="form-label">🍟 Lucky Snack <span class="optional-tag">(optional)</span></label><input class="form-input" id="reg-snack" type="text" placeholder="e.g. Maggi or nothing (I'm broke)"></div>
      <div class="form-group"><label class="form-label">💸 How You'll Spend the Prize <span class="optional-tag">(optional)</span></label><input class="form-input" id="reg-spend" type="text" placeholder="e.g. Buy tickets to next match"></div>
      <div class="form-group"><label class="form-label">🔮 Bold Match Prediction <span class="optional-tag">(optional)</span></label><input class="form-input" id="reg-prediction" type="text" placeholder="e.g. Virat scores 0 and still wins PoM"></div>
    </div>
  </div>
  <button class="cta-btn" onclick="window.goPayment()">Continue to Payment →</button>
  <button class="cta-btn secondary" onclick="window.showPage('home')" style="margin-top:8px;">← Back</button>
</div>

<!-- PAYMENT -->
<div id="page-payment" class="page">
  <div class="steps"><div class="step done"></div><div class="step active"></div><div class="step"></div></div>
  <div class="page-title">Pay Entry Fee</div>

  <!-- Player + Amount info -->
  <div class="card">
    <div class="info-row"><span class="info-key">Name</span><span class="info-val" id="pay-name-show">—</span></div>
    <div class="info-row"><span class="info-key">Phone</span><span class="info-val" id="pay-phone-show">—</span></div>
    <div class="info-row"><span class="info-key">Amount</span><span class="info-val">₹<span id="pay-amt-show">50</span></span></div>
  </div>

  <!-- UPI ID + Amount display -->
  <div class="card" style="text-align:center;">
    <div style="font-size:11px;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">Pay to UPI ID</div>
    <div style="font-size:20px;font-weight:700;color:var(--gold);margin-bottom:4px;" id="pay-upi-display">—</div>
    <div style="font-size:13px;color:var(--muted);margin-bottom:16px;">SUBRAT MANNA</div>
    <div style="font-size:40px;font-weight:900;color:white;margin-bottom:4px;">₹<span id="pay-amount">50</span></div>
    <div style="font-size:12px;color:var(--muted);margin-bottom:16px;" id="pay-name-note">Entry Fee</div>

    <!-- QR Code -->
    <div class="qr-frame" style="margin:0 auto 16px;">
      <img id="qr-img" src="https://raw.githubusercontent.com/subrat-manna/Ipl-2026/main/qr.png" alt="UPI QR Code"
        onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><rect width=%22200%22 height=%22200%22 fill=%22%23f5f5f5%22/><text x=%22100%22 y=%22105%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2212%22 fill=%22%23888%22>QR Not Found</text></svg>'">
    </div>
    <div style="font-size:11px;color:var(--muted);margin-bottom:8px;">Scan with any UPI app</div>
  </div>

  <!-- ANDROID: UPI deep link -->
  <a class="cta-btn green-btn" id="upi-link-anchor" href="#" target="_blank" style="text-decoration:none;display:block;">
    📱 Pay via UPI App (Android)
  </a>

  <!-- iOS: Steps + Copy + PhonePe -->
  <div class="card" style="text-align:left;">
    <div style="font-size:13px;font-weight:700;color:var(--gold);margin-bottom:12px;text-align:center;">🍎 iPhone Users</div>
    <div style="font-size:13px;color:var(--muted);line-height:2.2;">
      <span style="color:var(--gold);font-weight:700;">Step 1</span> — Tap "Copy UPI ID" below<br>
      <span style="color:var(--gold);font-weight:700;">Step 2</span> — Tap "Open PhonePe" button<br>
      <span style="color:var(--gold);font-weight:700;">Step 3</span> — Go to Send Money → UPI ID<br>
      <span style="color:var(--gold);font-weight:700;">Step 4</span> — Paste UPI ID and pay ₹<span id="pay-ios-amount">50</span>
    </div>
    <div style="display:flex;gap:10px;margin-top:14px;">
      <button onclick="copyUpiId()" style="flex:1;padding:12px;border-radius:10px;font-family:Rajdhani;font-size:14px;font-weight:700;background:var(--gold);color:#000;border:none;cursor:pointer;">
        📋 Copy UPI ID
      </button>
      <a id="phonepe-link" href="#" style="flex:1;padding:12px;border-radius:10px;font-family:Rajdhani;font-size:14px;font-weight:700;background:#5f259f;color:white;border:none;cursor:pointer;text-decoration:none;text-align:center;display:flex;align-items:center;justify-content:center;">
        💜 Open PhonePe
      </a>
    </div>
    <div id="upi-copied" style="display:none;color:var(--green);font-size:13px;text-align:center;margin-top:8px;">
      ✅ Copied! Now tap Open PhonePe
    </div>
  </div>

  <div style="font-size:12px;color:var(--muted);text-align:center;margin-bottom:16px;">
    After paying, tap below to confirm your entry.
  </div>
  <button class="cta-btn green-btn" id="pay-confirm-btn" onclick="window.confirmPayment()">✅ I've Paid — Go to Contest →</button>
  <button class="cta-btn secondary" onclick="window.showPage('register')" style="margin-top:8px;">← Back</button>
</div>

<!-- SUCCESS -->
<div id="page-success" class="page">
  <div class="steps"><div class="step done"></div><div class="step done"></div><div class="step active"></div></div>
  <div class="success-icon">🏆</div>
  <div class="success-title">You're In!</div>
  <div class="success-sub">Registration complete. Redirecting to contest app…</div>
  <div class="contest-link-box">
    <div class="contest-link-label">🎯 Open Contest App</div>
    <a class="contest-link-btn" id="contest-link-anchor" href="#" target="_blank">JOIN CONTEST →</a>
    <div style="font-size:11px;color:rgba(46,204,113,.6);margin-top:8px;">Tap above if not redirected automatically</div>
  </div>
  <div class="card">
    <div class="card-title">Your Entry</div>
    <div class="info-row"><span class="info-key">Match</span><span class="info-val" id="suc-matchno">—</span></div>
    <div class="info-row"><span class="info-key">Teams</span><span class="info-val" id="suc-match">—</span></div>
    <div class="info-row"><span class="info-key">Name</span><span class="info-val" id="suc-name">—</span></div>
    <div class="info-row"><span class="info-key">Phone</span><span class="info-val" id="suc-phone">—</span></div>
  </div>
  <button class="cta-btn secondary" onclick="window.showPage('home')" style="margin-top:8px;">← Back to Home</button>
</div>

<!-- RESULTS -->
<div id="page-results" class="page">
  <div class="page-title">📊 Match Results</div>
  <div id="results-slot-tabs" class="slot-tabs" style="display:none;margin-bottom:12px;"></div>
  <div class="page-sub" id="result-match-label">—</div>
  <div class="tab-row">
    <div class="tab-btn active" id="tab-today" onclick="window.switchTab('today')">Today</div>
    <div class="tab-btn" id="tab-history" onclick="window.switchTab('history')">History</div>
  </div>
  <div id="results-today">
    <div id="result-announced-box" style="display:none;" class="card">
      <div style="text-align:center;padding:12px 0;">
        <div style="font-size:10px;font-weight:700;letter-spacing:3px;color:var(--muted);margin-bottom:10px;text-transform:uppercase;">🏆 Official Match Result</div>
        <div style="font-family:'Bebas Neue';font-size:42px;letter-spacing:3px;background:linear-gradient(135deg,var(--gold),#fff,var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-shadow:none;" id="result-winner-text">—</div>
        <div style="display:flex;justify-content:center;gap:6px;margin-top:10px;">
          <span style="font-size:20px;">🥇</span>
          <span style="font-size:20px;">🏏</span>
          <span style="font-size:20px;">🎊</span>
        </div>
      </div>
    </div>
    <div id="podium-section" style="display:none;margin-bottom:16px;">
      <div style="font-family:'Bebas Neue';font-size:22px;color:var(--gold);letter-spacing:2px;margin-bottom:14px;text-align:center;text-shadow:0 0 20px rgba(255,215,0,.4);">🏅 TODAY'S LEADERBOARD</div>
      <div class="podium-row">
        <div class="podium-card gold"><div class="podium-emoji">🥇</div><div class="podium-label">1st Place</div><div class="podium-name" id="pod-first-name">—</div><div class="podium-detail" id="pod-first-detail"></div></div>
        <div class="podium-card last-place"><div class="podium-emoji">🪣</div><div class="podium-label">Last Place</div><div class="podium-name" id="pod-last-name">—</div><div class="podium-detail" id="pod-last-detail"></div></div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Participants</div>
      <table class="results-table">
        <thead><tr><th>#</th><th>Name</th><th>Rank</th><th>Prize</th><th>Status</th></tr></thead>
        <tbody id="results-tbody"><tr><td colspan="5" style="text-align:center;color:var(--muted);padding:20px;">No participants yet</td></tr></tbody>
      </table>
    </div>
  </div>
  <div id="results-history" style="display:none;"><div id="history-list"><div style="color:var(--muted);font-size:13px;text-align:center;padding:20px;">No past matches recorded yet.</div></div></div>
  <button class="cta-btn secondary" onclick="window.showPage('home')" style="margin-top:8px;">← Back</button>
</div>

<!-- NEW MATCH FORM PAGE -->
<div id="page-new-match" class="page">
  <div class="admin-panel">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
      <div class="page-title">🏏 New Match</div>
      <button class="admin-btn" onclick="window.showPage('admin')">← Back</button>
    </div>
    <div style="font-size:13px;color:var(--muted);margin-bottom:20px;background:rgba(255,215,0,.05);border:1px dashed rgba(255,215,0,.2);border-radius:8px;padding:12px;">
      Opening in: <strong style="color:var(--gold)" id="nm-slot-label">Slot 1</strong> · All current players in this slot will be cleared when you confirm.
    </div>
    <div class="card">
      <div class="form-group"><label class="form-label">Match Number <span style="color:var(--red)">*</span></label><input class="form-input" id="nm-match-number" type="number" placeholder="e.g. 12" min="1"></div>
      <div class="form-group"><label class="form-label">Team 1 <span style="color:var(--red)">*</span></label><input class="form-input" id="nm-team1" type="text" placeholder="e.g. MI"></div>
      <div class="form-group"><label class="form-label">Team 2 <span style="color:var(--red)">*</span></label><input class="form-input" id="nm-team2" type="text" placeholder="e.g. CSK"></div>
      <div class="form-group"><label class="form-label">Match Time</label><input class="form-input" id="nm-time" type="text" placeholder="e.g. 7:30 PM IST"></div>
      <div class="form-group"><label class="form-label">Entry Fee (₹)</label><input class="form-input" id="nm-fee" type="number" placeholder="50" min="0"></div>
      <div class="form-group"><label class="form-label">Max Spots</label><input class="form-input" id="nm-maxspots" type="number" placeholder="15" min="1"></div>
    </div>
    <button class="cta-btn green-btn" id="nm-confirm-btn" onclick="window.confirmNewMatch()" style="margin-top:8px;">🏏 Open This Match →</button>
    <button class="cta-btn secondary" onclick="window.showPage('admin')" style="margin-top:8px;">Cancel</button>
  </div>
</div>

<!-- ADMIN LOGIN -->
<div id="page-admin-login" class="page">
  <div class="admin-login-box">
    <div class="page-title" style="text-align:center;">Admin Panel</div>
    <div class="page-sub" style="text-align:center;">Enter password to continue</div>
    <div class="card">
      <div class="form-group"><label class="form-label">Password</label><input class="form-input" id="admin-pass-input" type="password" placeholder="Admin password" onkeydown="if(event.key==='Enter')window.checkAdmin()"></div>
      <button class="save-btn" style="width:100%;padding:12px;" onclick="window.checkAdmin()">Login →</button>
    </div>
    <button class="cta-btn secondary" onclick="window.showPage('home')" style="margin-top:8px;font-size:14px;padding:10px;">← Back to Home</button>
  </div>
</div>

<!-- ADMIN -->
<div id="page-admin" class="page">
  <div class="admin-panel">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <div class="page-title">Admin Panel</div>
      <button class="admin-btn" onclick="window.showPage('home')">Exit</button>
    </div>

    <!-- Slot switcher -->
    <div class="admin-slot-switcher">
      <button class="admin-slot-btn active" id="admin-slot-btn-match1" onclick="window.switchAdminSlot('match1')">
        <span>Slot 1</span><span id="admin-slot1-badge" class="slot-tag closed">—</span>
      </button>
      <button class="admin-slot-btn" id="admin-slot-btn-match2" onclick="window.switchAdminSlot('match2')">
        <span>Slot 2</span><span id="admin-slot2-badge" class="slot-tag closed">—</span>
      </button>
    </div>

    <div style="background:rgba(255,215,0,.05);border:1px dashed rgba(255,215,0,.2);border-radius:8px;padding:10px 14px;margin-bottom:20px;font-size:12px;color:var(--muted);">
      Editing: <strong style="color:var(--gold)" id="admin-match-no-display">Match #—</strong> &nbsp;·&nbsp; Status: <strong id="admin-match-status">🔴 INACTIVE</strong>
    </div>

    <!-- LIFECYCLE -->
    <div class="admin-section">
      <div class="admin-section-title">🔄 Match Lifecycle</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
        <button class="cta-btn green-btn" onclick="window.newMatch()" style="font-size:14px;padding:12px;max-width:none;margin:0;">🏏 Open New Match</button>
        <button class="cta-btn" onclick="window.closeRegistration()" style="font-size:14px;padding:12px;max-width:none;margin:0;background:linear-gradient(135deg,#7c3a00,#FFA500);color:#000;">🔒 Close Registration</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <button class="save-btn" onclick="window.saveResult()" style="padding:12px;font-size:13px;">💾 Save Result</button>
        <button class="cta-btn red-btn" onclick="window.resetSlot()" style="font-size:13px;padding:12px;max-width:none;margin:0;">🗑 Reset Slot</button>
      </div>
      <div style="font-size:11px;color:var(--muted);margin-top:10px;line-height:1.9;background:rgba(255,255,255,.02);padding:10px;border-radius:8px;">
        <strong style="color:var(--gold);">Open New Match</strong> → clears slot, opens registration.<br>
        <strong style="color:var(--gold);">Close Registration</strong> → stops new joins, match still visible, results pending.<br>
        <strong style="color:var(--gold);">Save Result</strong> → saves ranks &amp; prizes to history.<br>
        <strong style="color:var(--red);">Reset Slot</strong> → clears all players, hides from users. Do after saving results.
      </div>
    </div>

    <div class="divider"></div>

    <div class="admin-section">
      <div class="admin-section-title">📅 Match Info</div>
      <div class="form-group"><label class="form-label">Match Number</label><input class="form-input" id="a-match-number" type="number" placeholder="e.g. 12" min="1"></div>
      <div class="form-group"><label class="form-label">Team 1</label><input class="form-input" id="a-team1" placeholder="e.g. MI"></div>
      <div class="form-group"><label class="form-label">Team 2</label><input class="form-input" id="a-team2" placeholder="e.g. CSK"></div>
      <div class="form-group"><label class="form-label">Match Time</label><input class="form-input" id="a-time" placeholder="e.g. 7:30 PM IST"></div>
      <div class="form-group"><label class="form-label">Entry Fee (₹)</label><input class="form-input" id="a-fee" type="number" placeholder="50"></div>
      <div class="form-group"><label class="form-label">Max Spots</label><input class="form-input" id="a-maxspots" type="number" placeholder="15"></div>
      <button class="save-btn" onclick="window.saveMatch()">Save Match Info</button>
    </div>

    <div class="divider"></div>

    <div class="admin-section">
      <div class="admin-section-title">💳 Payment Settings</div>
      <div class="form-group"><label class="form-label">QR Code Image URL</label><input class="form-input" id="a-qr" placeholder="https://... (your QR image link)"></div>
      <div class="form-group"><label class="form-label">UPI Payment Link</label><input class="form-input" id="a-upi" placeholder="upi://pay?pa=yourname@bank&pn=Name&am=50"></div>
      <button class="save-btn" onclick="window.savePayment()">Save Payment Info</button>
    </div>

    <div class="divider"></div>

    <div class="admin-section">
      <div class="admin-section-title">📱 Contest App Link</div>
      <div class="form-group"><label class="form-label">Contest App Deep Link / URL</label><input class="form-input" id="a-contest" placeholder="e.g. dream11://... or https://..."></div>
      <div class="form-group"><label class="form-label">Redirect Delay (seconds)</label><input class="form-input" id="a-redirect-delay" type="number" placeholder="3" min="0" max="10"></div>
      <button class="save-btn" onclick="window.saveContest()">Save Contest Link</button>
    </div>

    <div class="divider"></div>

    <div class="admin-section">
      <div class="admin-section-title">🏆 Feed Match Result</div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:16px;">Enter each player's Dream11 rank and prize money. Saving updates history automatically.</div>
      <div id="result-feed-area"></div>
      <div style="margin-top:16px;">
        <div class="form-group">
          <label class="form-label">Which team won the IPL match?</label>
          <select class="form-input" id="a-winner">
            <option value="">-- Pending / Not Announced --</option>
            <option id="w-opt1" value="">Team 1</option>
            <option id="w-opt2" value="">Team 2</option>
          </select>
        </div>
      </div>
      <!-- Result saved via lifecycle section above -->
    </div>

    <div class="divider"></div>

    <div class="admin-section">
      <div class="admin-section-title">👥 Registered Players (<span id="admin-player-count">0</span>)</div>
      <div id="admin-player-list"></div>
      <div class="divider"></div>
      <button class="save-btn" onclick="window.clearPlayersOnly()" style="border-color:var(--red);color:var(--red);">🗑 Clear Players Only</button>
    </div>

    <div class="divider"></div>

    <div class="admin-section">
      <div class="admin-section-title">📜 Match History</div>
      <div id="admin-history-list" style="font-size:13px;color:var(--muted);">Loading…</div>
      <div class="divider"></div>
      <button class="save-btn" onclick="window.clearHistory()" style="border-color:var(--muted);color:var(--muted);font-size:12px;padding:8px 16px;">🗑 Delete All History</button>
    </div>
  </div>
</div>

<!-- CONFIRM DIALOG (no password needed — admin already authenticated) -->
<div class="modal-overlay" id="confirm-dialog">
  <div class="modal-box">
    <div class="modal-icon">⚠️</div>
    <div class="modal-title" id="confirm-title" style="color:var(--gold);">Confirm</div>
    <div class="modal-desc" id="confirm-desc"></div>
    <div class="modal-btns">
      <button class="modal-cancel" onclick="window.closeConfirm()">Cancel</button>
      <button class="modal-confirm" id="confirm-ok-btn" onclick="window.confirmOk()" style="background:rgba(255,215,0,.15);border-color:var(--gold);color:var(--gold);">Confirm</button>
    </div>
  </div>
</div>

<!-- MODAL (password protected) -->
<div class="modal-overlay" id="confirm-modal">
  <div class="modal-box">
    <div class="modal-icon">🔐</div>
    <div class="modal-title" id="modal-title">Confirm Action</div>
    <div class="modal-desc" id="modal-desc">Enter admin password to confirm.</div>
    <input class="form-input modal-input" id="modal-pass-input" type="password" placeholder="Admin password" onkeydown="if(event.key==='Enter')modalConfirm()">
    <div class="modal-btns">
      <button class="modal-cancel" onclick="window.closeModal()">Cancel</button>
      <button class="modal-confirm" id="modal-confirm-btn" onclick="window.modalConfirm()">Confirm</button>
    </div>
  </div>
</div>

<!-- Firebase Compat SDK (no module, no import needed) -->
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>

<!-- App scripts — order matters -->
<script src="firebase.js"></script>
<script src="app.js"></script>
<script src="admin.js"></script>
<script>
  // Start the app
  boot();
</script>

</body>
</html>
