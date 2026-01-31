# 🐛 Troubleshooting Guide

## Problem Diagnosis Flowchart

```
Start
  ↓
Does app load?
  ├─ NO  → Check console (F12)
  │        → See Error 1-5
  │
  └─ YES ↓
    Can you see camera?
      ├─ NO  → See Error 6-10
      │
      └─ YES ↓
        Is model loading?
          ├─ NO  → See Error 11-15
          │
          └─ YES ↓
            Do gestures work?
              ├─ NO  → See Error 16-20
              │
              └─ YES ↓
                Does password work?
                  ├─ NO  → See Error 21-25
                  │
                  └─ YES ✓ All Good!
```

---

## 🔴 Critical Errors (Don't Start)

### Error 1: Blank Page / White Screen
```
❌ Symptom:
   - Page is completely blank
   - No content visible
   - Browser might be loading forever

🔍 Diagnosis:
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for red errors

✅ Solutions:

   1. Check HTML file:
      - Is index.html in correct location?
      - File path correct?
      - File not corrupted?

   2. Clear browser cache:
      - Ctrl+Shift+Delete (Windows/Linux)
      - Cmd+Shift+Delete (Mac)
      - Select "All time"
      - Click "Clear data"

   3. Try different browser:
      - Chrome/Chromium
      - Firefox
      - Safari
      - Edge

   4. Check internet:
      - CDN resources loading?
      - Check Network tab (F12)
      - Look for failed resources (404, 500)

   5. Check file encoding:
      - Save as UTF-8
      - Remove BOM (Byte Order Mark)
```

---

### Error 2: "Uncaught SyntaxError: Unexpected token"
```
❌ Symptom:
   - Error in console
   - App doesn't start

🔍 Diagnosis:
   - Line number shown in error
   - Usually in JavaScript

✅ Solutions:

   1. Check syntax:
      - Look at error line number
      - Check for missing commas
      - Check for missing quotes
      - Check for missing parentheses

   2. Validate JSON:
      - Firebase config has all commas?
      - No trailing commas in objects?

   3. Copy file again:
      - App.js might be corrupted
      - Redownload from source

   4. Use syntax checker:
      - https://jshint.com/
      - Paste code to check
```

---

### Error 3: Vue.js Not Loaded
```
❌ Symptom:
   - {{ currentGesture }} showing in raw text
   - Vue directives not working

🔍 Diagnosis:
   - Vue script not loading
   - Check Network tab (F12)

✅ Solutions:

   1. Check CDN URL:
      <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
      Should load from unpkg.com

   2. Check internet speed:
      - Try mobile hotspot
      - Try different WiFi
      - Try wired connection

   3. Use backup CDN:
      - jsDelivr: https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js
      - Replace unpkg.com with jsdelivr

   4. Use local copy:
      - Download Vue.js file
      - Save in same folder
      - Reference local file
```

---

### Error 4: TensorFlow.js Not Loaded
```
❌ Symptom:
   - Model loading stuck forever
   - Console: "Cannot find poseDetection"
   - Model shows: "กำลังโหลด..."

🔍 Diagnosis:
   - TensorFlow scripts not loading
   - CDN issue

✅ Solutions:

   1. Check scripts in HTML:
      - @tensorflow/tfjs
      - @tensorflow-models/pose-detection
      - @mediapipe/pose

   2. Check CDN URLs:
      https://cdn.jsdelivr.net/npm/@tensorflow/tfjs
      https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection
      https://cdn.jsdelivr.net/npm/@mediapipe/pose

   3. Wait longer:
      - First load can take 2-3 minutes
      - Don't refresh while loading
      - Check download in Network tab

   4. Check browser console:
      console.log(tf, poseDetection, mediapipe)
      Should not be "undefined"

   5. Try offline mode later:
      - Models cache after first load
      - Subsequent opens faster
```

---

### Error 5: Firebase Connection Error
```
❌ Symptom:
   - Console: "Cannot read property 'database' of undefined"
   - History not loading
   - Logs not saving

🔍 Diagnosis:
   - Firebase config missing
   - Firebase not initialized

✅ Solutions:

   1. Check Firebase config:
      - apiKey present?
      - projectId correct?
      - All fields filled?

   2. Copy config correctly:
      - No extra quotes
      - Exact values from Firebase
      - No spaces in URLs

   3. Check Firebase status:
      - Is project active?
      - Go to Firebase Console
      - Check project exists

   4. System will work without Firebase:
      - App uses mock data if Firebase fails
      - Not critical for basic functionality

   5. Debug Firebase:
      console.log(firebase.database());
      Should show database reference
```

---

## 🟡 Camera Issues

### Error 6: Camera Permission Denied
```
❌ Symptom:
   - Browser asks for camera permission
   - You click "Deny"
   - Black screen in camera area
   - Console: "NotAllowedError"

✅ Solutions:

   1. Grant permission:
      - Refresh page
      - Click "Allow" when prompted
      - Check browser settings

   2. Reset permissions:
      - Windows: Settings → Privacy → Camera
      - Mac: System Preferences → Security & Privacy → Camera
      - Linux: Check permissions

   3. Browser-specific:
      - Chrome: Settings → Privacy → Camera
      - Firefox: Preferences → Privacy → Permissions
      - Safari: Preferences → Websites → Camera

   4. Check camera hardware:
      - Is webcam properly connected?
      - Not being used by another app?
      - Try: https://webcamtester.com/

   5. Use HTTPS:
      - Some browsers require HTTPS
      - Use: https://localhost:8000
      - Or deploy to HTTPS site
```

---

### Error 7: "Cannot Access Camera"
```
❌ Symptom:
   - Console error: "NotFoundError"
   - No camera device detected
   - Black video element

✅ Solutions:

   1. Check camera hardware:
      - Laptop: Built-in webcam working?
      - External: Properly connected?
      - Another app using camera?

   2. Check device:
      - Run: https://webcamtester.com/
      - If not working there, hardware issue

   3. Check browser:
      - Try different browser
      - Update browser to latest
      - Disable browser extensions

   4. Run test:
      ```javascript
      navigator.mediaDevices.enumerateDevices()
        .then(devices => console.log(devices))
        .catch(err => console.error(err));
      ```
      Check if camera listed

   5. Try Linux fix:
      ```bash
      sudo apt-get install cheese
      # Opens camera app
      # If works, browser issue
      ```
```

---

### Error 8: Camera Loading Forever
```
❌ Symptom:
   - Camera shows black screen
   - Loading indicator spinning
   - Never shows video

✅ Solutions:

   1. Wait more:
      - Some cameras slow to initialize
      - Wait 10 seconds

   2. Refresh page:
      - F5 or Ctrl+R
      - Try again

   3. Close other apps:
      - Close Zoom, Teams, Discord
      - Close camera apps
      - Free up resources

   4. Restart browser:
      - Close all windows
      - Close completely
      - Reopen

   5. Restart computer:
      - Might need hardware reset
      - Try again after restart
```

---

### Error 9: Video Upside Down or Rotated
```
❌ Symptom:
   - Video is rotated 90° or 180°
   - Inverted
   - Mirror image

✅ Solutions:

   1. Check browser:
      - Different browser might fix
      - Browser bug

   2. CSS rotation:
      ```css
      video {
        transform: rotate(180deg);
      }
      ```

   3. Canvas approach:
      - Draw to canvas with rotation
      - More reliable

   4. Hardware setting:
      - Webcam driver settings
      - Physical camera orientation
```

---

### Error 10: Low Webcam Quality
```
❌ Symptom:
   - Video is blurry
   - Pixelated
   - Poor frame rate

✅ Solutions:

   1. Clean camera:
      - Lens dirty?
      - Use microfiber cloth

   2. Improve lighting:
      - Poor lighting = worse quality
      - Bright LED light helps

   3. Better webcam:
      - Built-in laptop camera often low quality
      - Buy USB webcam (1080p)

   4. Adjust constraints:
      - Change resolution in code
      - Reduce to 320x240 if struggling

   5. Check browser hardware acceleration:
      - Chrome: Settings → System
      - Enable "Use hardware acceleration"
```

---

## 🟡 Model Loading Issues

### Error 11: Model Loading Stuck
```
❌ Symptom:
   - "กำลังโหลด..." forever
   - Downloaded several hundred MB
   - CPU usage high

✅ Solutions:

   1. Check Network:
      - Open DevTools Network tab
      - Should see large .js files loading
      - If stalled, internet issue

   2. Wait patience:
      - MoveNet model is ~7-10 MB
      - First download takes 2-3 minutes
      - Subsequent loads cached (fast)

   3. Clear cache:
      - Ctrl+Shift+Delete
      - Clear all cached data
      - Force fresh download

   4. Check browser:
      - Use Chrome if Firefox slow
      - Firefox sometimes slower

   5. Upgrade internet:
      - Slow internet slows download
      - Try mobile hotspot
      - Try different network

   6. Use lite model:
      ```javascript
      modelType: 'lite'  // instead of 'full'
      ```

   7. Reduce resolution:
      ```javascript
      width: 320,
      height: 240
      ```
```

---

### Error 12: "Cannot find module @tensorflow"
```
❌ Symptom:
   - Console: "@tensorflow not defined"
   - Model fails to load

✅ Solutions:

   1. Check CDN links:
      - All TensorFlow CDN scripts present?
      - Correct order?

   2. Script order matters:
      Order should be:
      1. tensorflow/tfjs
      2. tensorflow-models/pose-detection
      3. @mediapipe/pose

   3. Check if loaded:
      ```javascript
      console.log(tf, poseDetection, mediapipe);
      ```
      None should be undefined

   4. Network tab check:
      - All scripts showing?
      - Status 200 or 304?
      - Not 404?
```

---

### Error 13: "MoveNet model not available"
```
❌ Symptom:
   - Error during model creation
   - Console: "MoveNet not found"

✅ Solutions:

   1. Check MediaPipe script:
      ```html
      <script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose"></script>
      ```

   2. MoveNet requires:
      - @tensorflow/tfjs
      - @tensorflow-models/pose-detection
      - @mediapipe/pose

   3. Check detection config:
      ```javascript
      const detectorConfig = {
        runtime: 'tfjs',
        enableSmoothing: true
      };
      ```

   4. Use fallback:
      - App should use simpler detection
      - Won't have full accuracy
```

---

### Error 14: Model Inference Slow
```
❌ Symptom:
   - Takes >1000ms per frame
   - Video laggy
   - Not real-time

✅ Solutions:

   1. Use lite model:
      ```javascript
      modelType: 'lite'  // Faster, less accurate
      ```

   2. Reduce resolution:
      ```javascript
      width: 320,
      height: 240
      ```

   3. Skip frames:
      ```javascript
      if (frameCount++ % 2 === 0) {  // Process every 2nd frame
        // detect
      }
      ```

   4. Close other apps:
      - Chrome very resource-intensive
      - Close browsers/tabs
      - Close heavy apps

   5. Enable GPU:
      - Some systems support WebGL
      - TensorFlow uses automatically if available

   6. Upgrade hardware:
      - CPU-bound on older machines
      - Need modern processor
```

---

### Error 15: Low Confidence Score
```
❌ Symptom:
   - Confidence < 85%
   - "NFR1 Accuracy" not met
   - Recognition unreliable

✅ Solutions:

   1. Better lighting:
      - Pose detection needs good lighting
      - Use bright LED light
      - Avoid backlight

   2. Full body visible:
      - Need head and hands in frame
      - Move closer to camera
      - Full upper body preferred

   3. Clear gestures:
      - Make distinct hand positions
      - Paper: open palm
      - Scissors: two fingers
      - Hammer: closed fist
      - Slower movements help

   4. Multiple attempts:
      - System averages multiple frames
      - Do gesture for 1-2 seconds
      - Not too fast

   5. Custom training:
      - Use Google Teachable Machine
      - Train with YOUR gestures
      - More accurate for you

   6. Check distance:
      - Too far: low confidence
      - Too close: can't see full pose
      - ~1-2 meters ideal
```

---

## 🟡 Gesture Detection Issues

### Error 16: No Gestures Detected
```
❌ Symptom:
   - "ยังไม่ตรวจจับ"
   - Sequence not filling
   - Confidence always 0

✅ Solutions:

   1. Check keypoints visible:
      - Model must see pose keypoints
      - Debug mode on
      - Check confidence > 0

   2. Move in front of camera:
      - Full body in frame
      - Face towards camera
      - Hands visible

   3. Good lighting:
      - Dark room = no detection
      - Turn on bright lights
      - Natural light helps

   4. Wait for detection:
      - Might take 5-10 seconds
      - System continuously detecting
      - Make gestures repeatedly

   5. Check console errors:
      - F12 → Console
      - Any red errors?
      - Check for exceptions

   6. Test detection loop:
      ```javascript
      console.log(currentGesture, currentConfidence);
      // Should update every 100ms
      ```
```

---

### Error 17: Gestures Detected Too Easily
```
❌ Symptom:
   - Any movement registers
   - Accidental gestures
   - Too sensitive

✅ Solutions:

   1. Increase confidence threshold:
      ```javascript
      if (confidence > 0.90) {  // was 0.85
        recordGesture(gesture);
      }
      ```

   2. Increase debounce time:
      ```javascript
      debounceTime: 1000  // was 500
      ```

   3. Require multiple frames:
      ```javascript
      if (gesturesInRow >= 3) {
        recordGesture(gesture);
      }
      ```

   4. Make clearer gestures:
      - More exaggerated positions
      - Slower movements
      - Distinct differences between gestures
```

---

### Error 18: Same Gesture Detected Multiple Times
```
❌ Symptom:
   - Sequence: [paper, paper, paper]
   - Not registering different gestures

✅ Solutions:

   1. Check debounce:
      - Should prevent this
      - Debounce time 500ms
      - Wait between gestures

   2. Make distinct gestures:
      - Clear movement between each
      - At least 1 second apart
      - Very different positions

   3. Increase debounce:
      ```javascript
      debounceTime: 1000  // 1 second
      ```

   4. Reset between gestures:
      - Move hand away from body
      - Return to neutral position
      - Then make next gesture
```

---

### Error 19: Wrong Gestures Detected
```
❌ Symptom:
   - I do ✋ but system says ✊
   - Detection confused

✅ Solutions:

   1. Make gestures clearer:
      - Paper: fully open palm, fingers straight
      - Scissors: two fingers extended, spread
      - Hammer: closed fist
      - Very distinct positions

   2. Better lighting:
      - Poor lighting causes confusion
      - Add bright light source

   3. Custom training:
      - Google Teachable Machine
      - Train with YOUR hand
      - Your gestures specifically

   4. Check recognition algorithm:
      - Current system rule-based
      - May not be 100% accurate
      - Use custom model for better accuracy
```

---

### Error 20: Gesture Takes Too Long to Detect
```
❌ Symptom:
   - Long delay before recognition
   - Lag between gesture and feedback
   - > 500ms delay

✅ Solutions:

   1. Close other apps:
      - Free up CPU
      - Stop background processes
      - End unnecessary programs

   2. Reduce resolution:
      ```javascript
      width: 320,
      height: 240
      ```

   3. Use lite model:
      ```javascript
      modelType: 'lite'
      ```

   4. Disable debug mode:
      - Takes CPU to render debug info
      - Turn off debug display

   5. Skip frames:
      ```javascript
      if (frameCount++ % 2 === 0) {
        // Only process every 2nd frame
      }
      ```

   6. Upgrade hardware:
      - Need modern CPU
      - Old computers naturally slow
```

---

## 🟡 Password & Unlock Issues

### Error 21: Cannot Set Password
```
❌ Symptom:
   - "Sequence not complete"
   - Set button disabled
   - Progress stuck at 2/3

✅ Solutions:

   1. Complete sequence:
      - Do 3 distinct gestures
      - Wait for each to register
      - Check progress indicator

   2. Check gesture detection:
      - Are gestures being detected?
      - Check current gesture display
      - Try with larger/clearer gestures

   3. Check debounce:
      - Wait 500ms between gestures
      - Move hand between each
      - Make clear distinctions

   4. Reset and try again:
      - Click "🔄 รีเซ็ตลำดับ"
      - Start fresh
      - Do 3 clear gestures

   5. Debug mode:
      - Turn on "🔍 Debug Mode"
      - Watch sequence progress
      - See exact values
```

---

### Error 22: Password Set But Can't Unlock
```
❌ Symptom:
   - Password shows in UI
   - Tries to unlock
   - Always says "Failed"
   - 🔒 LOCKED even with correct sequence

✅ Solutions:

   1. Exact same gestures:
      - Must be identical sequence
      - Same order
      - Same confidence levels
      - Try a few times

   2. Check password:
      - See in green box?
      - Yes = set correctly

   3. Try clearer gestures:
      - Exact positions matter
      - Slightly different position = fail
      - Practice same position each time

   4. Reset password:
      - Click "🗑️ ล้างรหัส"
      - Set new one
      - Try again

   5. Use simpler password:
      - 3 very different gestures
      - Make easier to repeat
      - Not subtle differences

   6. Debug the comparison:
      - Check console for exact sequence
      - Verify match logic
```

---

### Error 23: Unlock Works But Doesn't Stay Unlocked
```
❌ Symptom:
   - 🔓 UNLOCKED appears
   - But quickly goes back to 🔒 LOCKED
   - Timer too short?

✅ Solutions:

   1. This is expected:
      - Unlock only 3 seconds
      - By design
      - Then re-locks

   2. Change duration:
      ```javascript
      setTimeout(() => {
        this.isUnlocked = false;
        this.resetSequence();
      }, 5000);  // was 3000
      ```

   3. Use as trigger:
      - Unlock event could trigger action
      - Open door, send signal
      - Not meant to stay unlocked
```

---

### Error 24: Unlock Success Sound Not Playing
```
❌ Symptom:
   - Screen shows unlocked
   - But no beep sound
   - Silent

✅ Solutions:

   1. Check browser volume:
      - Volume up?
      - Not muted?
      - Check sound settings

   2. Allow audio autoplay:
      - Some browsers block autoplay
      - Chrome: Settings → Privacy → Sound
      - Firefox: about:config → autoplay

   3. Check speaker:
      - Volume on device?
      - Headphones plugged in?
      - Speaker not broken?

   4. Check console errors:
      - Audio context error?
      - Permission denied?
      - Check for errors

   5. Browser security:
      - HTTPS required for audio
      - Not HTTP

   6. Test audio manually:
      ```javascript
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      osc.connect(ctx.destination);
      osc.start();
      setTimeout(() => osc.stop(), 100);
      ```
```

---

### Error 25: Firebase Not Logging Attempts
```
❌ Symptom:
   - Unlock/fail, but history empty
   - Firebase not receiving data
   - History shows 0 entries

✅ Solutions:

   1. Check Firebase config:
      - Valid API key?
      - Project ID correct?
      - Database URL correct?

   2. Enable Firebase:
      - Must be set up
      - See FIREBASE_SETUP.md
      - Project created in Firebase

   3. Check network:
      - Internet connected?
      - Network tab showing requests?
      - Requests returning 200?

   4. Check security rules:
      - Rules allow writes?
      - Rules block your access?
      - Update rules to allow

   5. Without Firebase:
      - App works locally anyway
      - Just no cloud history
      - Still logs to browser

   6. Debug logging:
      ```javascript
      await logToFirebase('test', ['paper']);
      // Check console output
      ```
```

---

## 🟢 Advanced Debugging

### Debug Mode Explained
```
Click "🔍 เปิด Debug Mode" to see:

📊 Debug Information Panel shows:
- Password Set: Yes/No
- Sequence Progress: 0/3, 1/3, 2/3
- Current Gesture: paper, scissors, hammer, None
- Confidence: 0-100%

Use to verify:
✓ System is detecting
✓ Debounce working
✓ Confidence adequate
✓ Sequence progressing
```

---

### Console Logging
```javascript
// Open DevTools (F12) → Console
// App logs detailed info:

console.log('🚀 Initializing...');
console.log('✅ Model loaded successfully');
console.log('🎯 Gesture recorded:', gesture);
console.log('✓ Logged to Firebase:', data);

// Search console for:
// ✅ = Success
// ❌ = Error
// 🔍 = Debug info
// ⚠️  = Warning
```

---

### Network Debugging
```javascript
1. Open DevTools (F12) → Network tab
2. Make unlock attempt
3. Should see:
   - pose-detection requests
   - tensorflow requests
   - firebase requests

4. Check status:
   - 200 = success
   - 404 = not found
   - 500 = server error
   - Pending = still loading

5. Check size:
   - Large files expected
   - Model ~8MB
   - First time normal
```

---

## 🆘 Emergency Fixes

### Quick Fixes (Try These First)
```
1. Refresh page:
   F5 or Ctrl+R

2. Clear cache:
   Ctrl+Shift+Delete

3. Close & reopen browser:
   Completely exit, restart

4. Try incognito mode:
   Ctrl+Shift+N

5. Try different browser:
   Chrome, Firefox, Safari, Edge

6. Restart computer:
   Full power off, restart

7. Check internet:
   Speed test: speedtest.net
```

---

### When Nothing Works
```
1. Check system requirements:
   - Windows 7+
   - Mac OS 10.12+
   - Linux Ubuntu 16.04+
   - Modern browser (2021+)

2. Verify hardware:
   - Webcam working? (webcamtester.com)
   - Internet stable? (speedtest.net)
   - CPU not maxed? (Task Manager)

3. Contact support:
   - Include console errors
   - Include browser/OS
   - Include what you tried
   - Include screenshot

4. Check updates:
   - Browser up to date?
   - OS up to date?
   - Try latest version
```

---

## 📞 Getting Help

### What to Include
```
When reporting issue, include:

1. Error message:
   - Exact text from console
   - Screenshot preferred

2. Environment:
   - Browser (Chrome 120?)
   - OS (Windows 11?)
   - How opened (local/server?)

3. Steps to reproduce:
   - Exactly what you did
   - When error occurred
   - Consistent or random?

4. What you tried:
   - Already refreshed?
   - Cleared cache?
   - Tried different browser?

5. Console output:
   - F12 → Console
   - Copy all red errors
   - Screenshot of entire console
```

---

## 📚 Resources

- [Browser DevTools Guide](https://developer.chrome.com/docs/devtools/)
- [Firebase Debugging](https://firebase.google.com/docs/rules/debug)
- [TensorFlow.js Troubleshooting](https://www.tensorflow.org/js/guide/FAQ)
- [WebRTC Debugging](https://webrtc.github.io/samples/src/content/devices/input-output/)

---

**Still stuck? Try again tomorrow - sometimes things just need time! 😊**

*Hope you found the solution! Let us know if you have other issues!*
