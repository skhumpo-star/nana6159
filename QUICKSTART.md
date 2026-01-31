# ⚡ Quick Start Guide

## 🚀 5-Minute Setup

### ⏱️ Step 1: Download Files (1 min)
```
✓ index.html      → Main HTML file
✓ app.js          → Vue.js + TensorFlow logic
✓ README.md       → Full documentation
✓ package.json    → Dependencies
```

### ⏱️ Step 2: Start Local Server (2 min)

#### Option A: Using Python (Recommended)
```bash
cd /path/to/ai-gesture-password
python3 -m http.server 8000
# Open: http://localhost:8000
```

#### Option B: Using Node.js
```bash
npx http-server -p 8000
# Open: http://localhost:8000
```

#### Option C: Using Vite (Development)
```bash
npm install
npm run dev
# Open: http://localhost:5173
```

### ⏱️ Step 3: Allow Camera Access (1 min)
1. Browser จะขอ permission
2. คลิก **"Allow"** ✅
3. รอโมเดล AI โหลด (~2 นาที)

### ⏱️ Step 4: Set Your Password (1 min)
```
1. ทำท่าทาง 3 ท่า (เช่น ✋ ✌️ ✊)
2. คลิก "📝 ตั้งรหัสจากลำดับปัจจุบัน"
3. ตอนนี้รหัสเก็บไว้แล้ว!
```

---

## 📱 How to Use

### 🔒 Locking/Unlocking
```
1️⃣ ทำท่าทาง ท่าแรก  → ระบบบันทึก
2️⃣ ทำท่าทาง ท่าที่สอง → ระบบบันทึก
3️⃣ ทำท่าทาง ท่าที่สาม → ระบบตรวจสอบ
   ✅ ถูกต้อง → 🔓 UNLOCKED (3 วินาที)
   ❌ ผิด → 🔒 LOCKED (ลองใหม่)
```

### 📊 Monitor Status
- **🟢 UNLOCKED**: รหัสถูกต้อง
- **🔴 LOCKED**: รหัสผิด
- **⭕ Progress**: ความก้าวหน้า (⬤ ⬤ ◌)
- **📊 Confidence**: ค่าความแน่นอน (%)

---

## 🔥 Firebase Setup (Optional)

### 5-Step Integration
```
1. ไปที่ https://console.firebase.google.com/
2. สร้าง Project ใหม่
3. Enable "Realtime Database"
4. Copy Config
5. Paste ใน app.js
```

👉 **Detailed Guide**: [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

---

## 🎮 Demo Scenarios

### Scenario 1: Basic Usage
```
✓ Purpose: Test basic functionality
✓ Steps:
  1. Open index.html
  2. Set 3-gesture password
  3. Try unlock
  4. Check history
✓ Expected: Password verified, history logged
```

### Scenario 2: Wrong Password
```
✓ Purpose: Test error handling
✓ Steps:
  1. Set password: ✋ ✌️ ✊
  2. Try unlock: ✊ ✊ ✊ (different)
  3. Check feedback
✓ Expected: "Failed" status, sequence reset
```

### Scenario 3: Debug Mode
```
✓ Purpose: Monitor system
✓ Steps:
  1. Click "🔍 เปิด Debug Mode"
  2. Watch metrics update
  3. See confidence scores
✓ Expected: Real-time debug info
```

---

## 🛠️ Troubleshooting Quick Fixes

### ❌ Camera Not Working?
```bash
# Check in browser console:
navigator.mediaDevices.getUserMedia({video: true})
  .then(stream => console.log('✅ Camera OK'))
  .catch(err => console.error('❌', err));
```

### ❌ Model Not Loading?
```javascript
// Check in console:
console.log('Model Loaded:', modelLoaded);
// Should be: true
```

### ❌ Firebase Not Connected?
```javascript
// Check in console:
firebase.database().ref('test').set({test: true});
// Should succeed
```

### ❌ Low Confidence Score?
```
✓ Solutions:
  1. Better lighting
  2. Clear gestures
  3. Closer to camera
  4. Slower movements
  5. Check face/body visible
```

---

## 📚 Key Concepts

### 🎯 Gesture Password
```
Password = Sequence of 3 Gestures
Password = [✋, ✌️, ✊]
  ↓
Instead of typing password
Instead of fingerprint
  ↓
Use natural hand gestures
```

### 🔐 How It Works
```
Camera Input
  ↓ [Real-time]
Pose Detection (17 keypoints)
  ↓ [TensorFlow.js]
Gesture Recognition
  ↓ [Rule-based / ML]
Debounce Check (500ms)
  ↓ [Security]
Sequence Array [✋ ✌️ ✊]
  ↓ [Store in memory]
Password Verification
  ↓ [Compare]
Lock/Unlock Decision
  ↓ [UI Update]
Firebase Logging
  ↓ [Optional]
History Display
```

---

## 🎨 Customization Tips

### Change Password Length
```javascript
// In app.js
requiredLength: 4  // was 3
```

### Change Colors
```html
<!-- In index.html <style> -->
background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
```

### Add Custom Gestures
```javascript
// Add to gestureEmojis:
'thumbsup': '👍',
'peace': '☮️',
'ok': '👌'
```

### Adjust Debounce
```javascript
// In app.js
debounceTime: 300  // milliseconds (was 500)
```

---

## 📊 Performance Tips

### Optimize for Speed
```javascript
// Reduce resolution
width: 320,  // was 640
height: 240, // was 480

// Skip some frames
if (frameCount++ % 2 === 0) { ... }

// Reduce model complexity
modelType: 'lite'  // was 'full'
```

### Optimize for Accuracy
```javascript
// Higher resolution
width: 1280,
height: 960,

// All frames
// (no skipping)

// Full model
modelType: 'full'
```

---

## 🔐 Security Notes

### ✅ What's Secure
```
✓ Password stored locally (browser only)
✓ Debounce prevents brute force
✓ Confidence threshold blocks spam
✓ Logs don't contain passwords
```

### ⚠️ What to Know
```
⚠️ Local storage (can be cleared)
⚠️ Not encrypted (use HTTPS)
⚠️ Demo purpose (not production-ready)
✓ Can be hardened with authentication
```

---

## 📱 Browser Compatibility

### ✅ Works
```
Chrome 90+      ✓
Firefox 88+     ✓
Safari 14.1+    ✓
Edge 90+        ✓
```

### ⚠️ Limitations
```
Mobile Safari   (might restrict camera)
IE 11           (not supported)
Old browsers    (no WebRTC)
```

---

## 🎓 Learning Path

### Beginner (Day 1)
- [ ] Run the app
- [ ] Set password
- [ ] Test unlock
- [ ] Read README.md

### Intermediate (Day 2-3)
- [ ] Understand code structure
- [ ] Change colors/theme
- [ ] Setup Firebase
- [ ] View history

### Advanced (Day 4+)
- [ ] Train custom model
- [ ] Add authentication
- [ ] Deploy to cloud
- [ ] Implement multi-user

---

## 🚀 Next Steps

### After Basic Setup
1. **Deploy**: Put online (Netlify, Vercel, GitHub Pages)
2. **Customize**: Adjust to your needs
3. **Extend**: Add features (2FA, email, SMS)
4. **Monitor**: Track usage via Firebase

### Resources
- [Full Documentation](README.md)
- [Firebase Setup](FIREBASE_SETUP.md)
- [API Reference](API_REFERENCE.md)
- [Troubleshooting](TROUBLESHOOTING.md)

---

## 💬 FAQ

### Q: ข้อมูลส่วนตัวอยู่ที่ไหน?
```
A: เก็บในเบราว์เซอร์เท่านั้น (Local Storage)
   ไม่ส่งไปไหนเว้นแต่เปิด Firebase
```

### Q: ใช้ได้กับมือถือไหม?
```
A: ได้บ้าง บางเบราว์เซอร์มี limitations
   Desktop แนะนำ
```

### Q: ต้องใช้ Firebase บังคับไหม?
```
A: ไม่บังคับ ใช้ได้โดยไม่ Firebase
   ประวัติจะเก็บในเบราว์เซอร์เท่านั้น
```

### Q: ดูภาพกล้องได้ไหม?
```
A: ได้ แต่ Mirrored (สะท้อน)
   เพราะทำให้เห็นท่าตรงกับการทำ
```

### Q: นานแค่ไหนต้อง Setup?
```
A: ไม่เกิน 5 นาที
   ถ้าเพิ่ม Firebase อีก 10 นาที
```

---

## 📞 Need Help?

### Checklist
- [ ] Browser console has no errors
- [ ] Camera permission granted
- [ ] Model loaded (✅ symbol)
- [ ] Gestures showing in UI
- [ ] Password can be set

### If Still Having Issues
1. Clear cache: `Ctrl+Shift+Delete`
2. Try different browser
3. Check internet connection
4. Read TROUBLESHOOTING.md
5. Check GitHub Issues

---

**Ready to Gesture? Let's Go! 🎉**

*ระบบรหัสผ่านจากท่าทาง AI ที่ทันสมัยและเรียบง่าย*
