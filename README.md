# 🏏 IPL Daily Contest

A real-time IPL fantasy cricket contest app with dual match slots, live leaderboard, prize tracking, and background music.

## Files

```
ipl-contest/
├── index.html    ← Main app (all pages)
├── firebase.js   ← Firebase config, Firestore refs, state, boot
├── app.js        ← Render, navigation, register flow, sound, music, confetti
├── admin.js      ← All admin actions (open match, results, reset slot)
├── style.css     ← All styles and animations
└── README.md     ← This file
```

---

## Setup

### 1. Firebase Config
Open `firebase.js` and replace the config values with your own:
```js
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  ...
};
```
Get these from: **Firebase Console → Project Settings → Your Apps → Web**

### 2. Admin Password
In `firebase.js`, change:
```js
var ADMIN_PASS = "ipl2024";
```

### 3. Firestore Rules
In Firebase Console → Firestore → Rules, paste:
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /currentMatch/{slotId} {
      allow read, write: if true;
      match /players/{playerId} {
        allow read, write: if true;
      }
    }
    match /history/{docId} {
      allow read, write: if true;
    }
  }
}
```

---

## Deploy to GitHub Pages

### First time setup:
1. Go to [github.com](https://github.com) → **New repository**
2. Name it `ipl-contest` → Create repository
3. Upload all 5 files (`index.html`, `firebase.js`, `app.js`, `admin.js`, `style.css`)
4. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
5. Click **Save** — your app will be live at `https://YOUR_USERNAME.github.io/ipl-contest`

### Updating files later:
1. Open the file on GitHub
2. Click the ✏️ pencil icon to edit
3. Make changes → **Commit changes**
4. GitHub Pages auto-deploys in ~30 seconds

---

## Admin Flow

### Single Match Day:
1. Admin → **Slot 1** → **Open New Match** → fill details → Open
2. Players register
3. Before match starts → **Close Registration**
4. Match ends → **Save Result** (enter ranks + prizes + winner)
5. **Reset Slot** when done

### Double Header Day (Match 10 + 11):
1. Admin → **Slot 1** → Open Match 10
2. Players register for Match 10
3. Before Match 10 starts → **Close Registration** on Slot 1
4. Admin → **Slot 2** → Open Match 11
5. Home screen shows both tabs — Match 10 (🔒 Closed) and Match 11 (🟢 Open)
6. Match 10 ends → Slot 1 → Save Result → Reset Slot
7. Match 11 ends → Slot 2 → Save Result → Reset Slot

---

## Firestore Structure

```
currentMatch/
  match1/              ← Slot 1 match doc
    players/           ← Players subcollection
      {playerId}
  match2/              ← Slot 2 match doc
    players/
      {playerId}

history/
  {matchNumber}        ← One doc per match, overwritten when result saved
```
