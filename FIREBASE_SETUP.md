# 🔥 Firebase Setup Guide

## ขั้นตอนการตั้งค่า Firebase สำหรับ AI Gesture Password

### 1️⃣ สร้าง Firebase Project

#### Step 1: เข้าไปที่ Firebase Console
```
URL: https://console.firebase.google.com/
```

#### Step 2: สร้าง Project ใหม่
1. คลิก **"Create a new project"**
2. ตั้งชื่อ project: `gesture-password`
3. Accept terms & conditions
4. คลิก **"Create project"**

#### Step 3: เพิ่ม Web App
1. ไปที่ Project Dashboard
2. คลิกไอคอน `</>` เพื่อเพิ่ม Web app
3. ตั้งชื่อ app: `gesture-password-web`
4. คลิก **"Register app"**

#### Step 4: Copy Firebase Config
หลังจากลงทะเบียน คุณจะเห็น Firebase Config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDCq4xW_YOUR_API_KEY_HERE",
  authDomain: "gesture-password-xxxx.firebaseapp.com",
  databaseURL: "https://gesture-password-xxxx.firebaseio.com",
  projectId: "gesture-password-xxxx",
  storageBucket: "gesture-password-xxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**⚠️ เก็บ Config นี้ให้เป็นความลับ (ไม่ควร commit ไปยัง Git)**

---

### 2️⃣ Enable Realtime Database

#### Step 1: ไปที่ Realtime Database
1. ในด้านซ้าย menu คลิก **"Realtime Database"**
2. คลิก **"Create Database"**

#### Step 2: ตั้งค่า Database
- **Database Location**: Southeast Asia (Singapore)
- **Security Rules**: เลือก "Start in test mode"
- คลิก **"Create"**

#### Step 3: ตั้งค่า Security Rules
เปลี่ยน Rules เป็น:

```json
{
  "rules": {
    "logs": {
      ".write": true,
      ".read": true
    },
    "users": {
      ".write": "auth != null",
      ".read": "auth != null"
    }
  }
}
```

**📝 หมายเหตุ:**
- `"logs"`: อนุญาตให้ใครก็ได้เขียนและอ่าน (สำหรับ Demo)
- `"users"`: ต้องมี Authentication (สำหรับ Production)

---

### 3️⃣ Copy Config ไปไฟล์

#### ไฟล์: `app.js` (บรรทัดที่ 1-12)

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_FROM_FIREBASE",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

**ตัวอย่างเต็ม:**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDCq4xW_example_key_replace_this",
    authDomain: "gesture-password.firebaseapp.com",
    databaseURL: "https://gesture-password.firebaseio.com",
    projectId: "gesture-password",
    storageBucket: "gesture-password.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};
```

---

### 4️⃣ ตรวจสอบการเชื่อมต่อ

#### ใน Console
1. เปิด Browser Developer Tools (`F12`)
2. ไปที่ Tab **"Console"**
3. ดูข้อความ: `✅ Firebase initialized`
4. หากเห็น ✅ = เชื่อมต่อสำเร็จ

#### ทดสอบ Logging
1. ตั้งรหัสผ่าน
2. ไปที่ Firebase Console
3. ดู Realtime Database
4. ตรวจสอบ `logs` node
5. ควรมี object ใหม่: `{"timestamp": "...", "status": "..."}`

---

### 5️⃣ โครงสร้าง Database

#### Tree Structure
```
gesture-password/
├── logs/
│   ├── -NjK8X9L0K9_01/
│   │   ├── timestamp: "2026-01-31T10:30:00Z"
│   │   ├── status: "success"
│   │   ├── sequence: ["paper", "scissors", "hammer"]
│   │   └── userAgent: "Mozilla/5.0..."
│   │
│   └── -NjK8X9L0K9_02/
│       ├── timestamp: "2026-01-31T10:35:00Z"
│       ├── status: "failed"
│       ├── sequence: ["scissors", "paper", "hammer"]
│       └── userAgent: "Mozilla/5.0..."
│
└── users/ (optional)
    ├── user1/
    │   ├── password: ["paper", "scissors", "hammer"]
    │   ├── createdAt: "2026-01-31T10:00:00Z"
    │   └── lastLogin: "2026-01-31T10:30:00Z"
    │
    └── user2/
        ├── password: ["hammer", "scissors", "paper"]
        ├── createdAt: "2026-01-31T10:05:00Z"
        └── lastLogin: "2026-01-31T10:25:00Z"
```

---

### 6️⃣ Enhanced Security Rules (Production)

#### สำหรับ Production Environment

```json
{
  "rules": {
    "logs": {
      ".validate": "newData.hasChildren(['timestamp', 'status', 'sequence'])",
      "$logId": {
        ".write": true,
        ".read": true,
        "timestamp": {
          ".validate": "newData.isString() && newData.val().matches(/^\\d{4}-\\d{2}-\\d{2}T/)"
        },
        "status": {
          ".validate": "newData.val() === 'success' || newData.val() === 'failed'"
        },
        "sequence": {
          ".validate": "newData.isArray()"
        }
      }
    },
    "users": {
      ".read": "auth != null",
      ".write": "auth.uid === $userId",
      "$userId": {
        ".validate": "newData.hasChildren(['password', 'createdAt'])",
        "password": {
          ".validate": "newData.isArray()"
        },
        "createdAt": {
          ".validate": "newData.isString()"
        },
        "lastLogin": {
          ".write": true,
          ".validate": "newData.isString()"
        }
      }
    }
  }
}
```

---

### 7️⃣ Environment Variables (Optional)

#### สร้างไฟล์ `.env.local`
```bash
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

#### ใช้ใน `app.js`
```javascript
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

---

### 8️⃣ Backup & Monitoring

#### ตั้งค่า Backups
1. ไปที่ **Backups**
2. คลิก **"Enable automatic backups"**
3. เลือก retention period (7 days recommended)

#### Monitoring
1. ไปที่ **Usage**
2. ดู Read/Write operations
3. ตรวจสอบ Bandwidth usage

---

### 9️⃣ Troubleshooting

#### ❌ "Firebase config is invalid"
```
✅ Solution:
1. Copy config อีกครั้ง
2. ตรวจสอบ commas และ syntax
3. Clear browser cache
4. Reload page
```

#### ❌ "Permission denied at /logs"
```
✅ Solution:
1. ไปที่ Realtime Database > Rules
2. เปลี่ยน .write: true
3. Publish rules
```

#### ❌ "Cannot read property 'database' of undefined"
```
✅ Solution:
1. ตรวจสอบ CDN script load
2. ใช้ setTimeout delay
3. Check browser console errors
```

---

### 🔟 Testing Firebase Connection

#### Copy & Paste Console Test
```javascript
// ในเบราว์เซอร์ Console
firebase.database().ref('logs').push({
  timestamp: new Date().toISOString(),
  status: 'test',
  sequence: ['paper', 'scissors', 'hammer']
}).then(() => {
  console.log('✅ Firebase write successful');
}).catch((err) => {
  console.error('❌ Firebase write failed:', err);
});
```

---

## 📊 Firebase Pricing

### Free Tier (Spark Plan)
```
✓ Reads: 100/day
✓ Writes: 50/day
✓ Deletes: 50/day
✓ GB Storage: 1 GB
✓ Perfect for: Development & Testing
```

### Paid Tier (Blaze Plan)
```
✓ Pay as you go
✓ $1 per GB read
✓ $5 per GB write
✓ Best for: Production apps
```

**💡 Tip:** Start with free tier, upgrade to Blaze when needed

---

## 🔐 Security Best Practices

### ✅ Do's
- ✓ Keep API keys in environment variables
- ✓ Use security rules for production
- ✓ Enable backups
- ✓ Monitor usage regularly
- ✓ Use HTTPS only

### ❌ Don'ts
- ✗ Commit API keys to Git
- ✗ Use `"read": true, "write": true` in production
- ✗ Store sensitive passwords in Firebase
- ✗ Ignore security warnings
- ✗ Use HTTP in production

---

## 📚 Additional Resources

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Realtime Database Docs](https://firebase.google.com/docs/database)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase Pricing](https://firebase.google.com/pricing)

---

**Ready? Let's go! 🚀**

*สำเร็จแล้ว! ตอนนี้ app ของคุณเชื่อมต่อกับ Firebase แล้ว*
