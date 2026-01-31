# 📚 API Reference - AI Gesture Password

## Vue.js Data Properties & Methods

### 📊 Data Properties

#### Video & Camera
```javascript
{
  videoElement: HTMLVideoElement,      // Video stream element
  canvasElement: HTMLCanvasElement,    // Drawing canvas
  modelLoaded: Boolean,                // Model loading status
}
```

#### Gesture Detection
```javascript
{
  currentGesture: String,              // Current detected gesture
  currentConfidence: Number,           // Confidence 0-1
  lastDetectedGesture: String,         // Previous gesture
  debounceTime: Number,                // Milliseconds (500)
  lastDetectionTime: Number,           // Unix timestamp
}
```

#### Sequence & Password
```javascript
{
  detectedSequence: Array,             // [gesture1, gesture2, ...]
  passwordSequence: Array,             // Set password
  requiredLength: Number,              // Password length (3)
}
```

#### Status
```javascript
{
  isUnlocked: Boolean,                 // Current lock status
  debugMode: Boolean,                  // Debug view active
  accessHistory: Array,                // Login history
}
```

---

## 🎮 Methods

### Initialization Methods

#### `initializeApp()`
```javascript
// Initialize entire system
await initializeApp();

// Returns: Promise<void>
// Side effects:
//   - Initializes Firebase
//   - Gets camera access
//   - Loads TensorFlow model
//   - Starts detection loop
//   - Updates UI
```

#### `initializeFirebase()`
```javascript
// Setup Firebase connection
initializeFirebase();

// Returns: void
// Sets: db (Firebase reference)
// Logs: Connection status
```

#### `getCamera()`
```javascript
// Request webcam access
await getCamera();

// Returns: Promise<void>
// Side effects:
//   - Sets videoElement.srcObject
//   - Plays video stream
// Throws: Error if permission denied
```

#### `loadPoseModel()`
```javascript
// Load TensorFlow.js model
await loadPoseModel();

// Returns: Promise<void>
// Sets: modelLoaded = true
// Initializes: Gesture recognition
```

---

### Detection Methods

#### `startDetectionLoop()`
```javascript
// Start continuous pose detection
startDetectionLoop();

// Returns: void
// Runs: requestAnimationFrame loop
// Calls: detectFrame() continuously
// Updates: currentGesture, currentConfidence
```

#### `recognizeGesture(pose)`
```javascript
// Analyze pose and return gesture
const gesture = recognizeGesture(pose);

// Parameter:
//   pose: {
//     keypoints: [{name, x, y, score}, ...],
//     score: Number
//   }

// Returns: String
//   Values: 'paper', 'scissors', 'hammer', 'none'
// Side effects:
//   - Updates currentConfidence
```

#### `drawPose(poses)`
```javascript
// Visualize pose on canvas
drawPose(poses);

// Parameter:
//   poses: Array of pose objects

// Returns: void
// Side effects:
//   - Draws keypoints (circles)
//   - Draws skeleton (lines)
//   - Updates canvas display
```

---

### Sequence Methods

#### `recordGesture(gesture)`
```javascript
// Add gesture to sequence
recordGesture('paper');

// Parameter:
//   gesture: String ('paper'|'scissors'|'hammer')

// Returns: void
// Side effects:
//   - Adds to detectedSequence
//   - Calls verifyPassword() if full
//   - Logs to console
```

#### `verifyPassword()`
```javascript
// Check if sequence matches password
verifyPassword();

// Returns: void
// Side effects:
//   - Calls handleUnlock(true/false)
//   - Resets sequence
//   - Plays sound
```

#### `resetSequence()`
```javascript
// Clear detected gesture sequence
resetSequence();

// Returns: void
// Side effects:
//   - Clears detectedSequence
//   - Clears lastDetectedGesture
```

---

### Password Methods

#### `setNewPassword()`
```javascript
// Store current sequence as password
setNewPassword();

// Returns: void
// Requirements:
//   - detectedSequence.length >= requiredLength
// Side effects:
//   - Sets passwordSequence
//   - Plays sound
//   - Shows alert
//   - Resets sequence
```

#### `resetPassword()`
```javascript
// Clear password
resetPassword();

// Returns: void
// Side effects:
//   - Clears passwordSequence
//   - Plays error sound
//   - Shows alert
```

---

### Status Methods

#### `handleUnlock(success, sequence)`
```javascript
// Handle lock/unlock result
handleUnlock(true, ['paper', 'scissors', 'hammer']);

// Parameters:
//   success: Boolean
//   sequence: Array<String>

// Returns: void
// Side effects:
//   - Sets isUnlocked
//   - Plays sound
//   - Logs to Firebase
//   - Adds to history
//   - Resets after 3s
```

#### `logToFirebase(status, sequence)`
```javascript
// Send access log to Firebase
await logToFirebase('success', sequence);

// Parameters:
//   status: String ('success'|'failed')
//   sequence: Array<String>

// Returns: Promise<void>
// Data saved:
//   {
//     timestamp: ISO string,
//     status: string,
//     sequence: array,
//     userAgent: string
//   }
```

---

### Audio Methods

#### `playSound(type)`
```javascript
// Play audio feedback
playSound('success');

// Parameters:
//   type: String ('success'|'error')

// Returns: void
// Side effects:
//   - Creates Web Audio context
//   - Plays beep tone
//   - Frequency:
//     - 'success': 800Hz
//     - 'error': 300Hz
```

---

### Utility Methods

#### `updateTime()`
```javascript
// Update current time display
updateTime();

// Returns: void
// Updates: currentTime (formatted string)
// Called: Every 1000ms
```

#### `formatTime(timestamp)`
```javascript
// Convert timestamp to time string
const time = formatTime(new Date().toISOString());

// Parameter:
//   timestamp: String (ISO format)

// Returns: String (HH:MM:SS format)
// Locale: Thai (th-TH)
```

#### `getGestureEmoji(gesture)`
```javascript
// Get emoji for gesture
const emoji = getGestureEmoji('paper');

// Parameter:
//   gesture: String

// Returns: String (emoji)
// Examples:
//   'paper' → '✋'
//   'scissors' → '✌️'
//   'hammer' → '✊'
//   'none' → '🚫'
```

#### `getCurrentGestureEmoji()`
```javascript
// Get emoji of current gesture
const emoji = getCurrentGestureEmoji();

// Returns: String (emoji)
// Equivalent: getGestureEmoji(currentGesture)
```

---

### Debug Methods

#### `toggleDebugMode()`
```javascript
// Toggle debug information display
toggleDebugMode();

// Returns: void
// Side effects:
//   - Toggles debugMode boolean
//   - Shows/hides debug panel
```

#### `clearHistory()`
```javascript
// Clear access history
clearHistory();

// Returns: void
// Side effects:
//   - Clears accessHistory array
//   - Plays success sound
//   - Shows confirmation
```

#### `loadHistory()`
```javascript
// Load history from Firebase
await loadHistory();

// Returns: Promise<void>
// Fetches: Last 20 logs from Firebase
// Updates: accessHistory array
```

---

## 🔥 Firebase API

### Database References

#### Logs Collection
```javascript
db.ref('logs')  // Main logs reference
db.ref('logs').push(data)  // Add new log
db.ref('logs').limitToLast(20)  // Get 20 recent
db.ref('logs').orderByChild('timestamp')
```

#### Data Structure
```javascript
{
  timestamp: "2026-01-31T10:30:00.000Z",
  status: "success",
  sequence: ["paper", "scissors", "hammer"],
  userAgent: "Mozilla/5.0..."
}
```

---

## 🤖 TensorFlow.js API

### Pose Detection

#### Detector Creation
```javascript
const detector = await poseDetection.createDetector(
  poseDetection.SupportedModels.MoveNet,
  {
    runtime: 'tfjs',
    enableSmoothing: true
  }
);
```

#### Pose Estimation
```javascript
const poses = await detector.estimatePoses(videoElement);

// Returns: Array<{
//   keypoints: Array<{
//     name: String,
//     x: Number,
//     y: Number,
//     score: Number
//   }>,
//   score: Number
// }>
```

### Keypoint Names (17 points)
```
0: nose
1: left_eye
2: right_eye
3: left_ear
4: right_ear
5: left_shoulder
6: right_shoulder
7: left_elbow
8: right_elbow
9: left_wrist
10: right_wrist
11: left_hip
12: right_hip
13: left_knee
14: right_knee
15: left_ankle
16: right_ankle
```

---

## 📡 WebRTC / MediaDevices API

### Get User Media
```javascript
navigator.mediaDevices.getUserMedia({
  video: {
    width: { ideal: 640 },
    height: { ideal: 480 },
    facingMode: 'user'
  },
  audio: false
})

// Returns: Promise<MediaStream>
```

### Constraints
```javascript
{
  video: {
    width: { ideal: 640 },
    height: { ideal: 480 },
    facingMode: 'user',  // 'user' or 'environment'
    frameRate: { ideal: 30 }
  },
  audio: false
}
```

---

## 🎨 Vue.js Computed Properties

### gestureEmojis
```javascript
computed: {
  gestureEmojis() {
    return {
      'paper': '✋',
      'scissors': '✌️',
      'hammer': '✊',
      'rock': '✊',
      'noaction': '🚫',
      'none': '🚫'
    }
  }
}
```

---

## 📊 Data Flow

### Gesture Detection Flow
```
1. videoElement input
   ↓
2. detector.estimatePoses()
   ↓
3. poses[0].keypoints
   ↓
4. recognizeGesture()
   ↓
5. currentGesture = gesture
6. currentConfidence = score
   ↓
7. lastDetectionTime check (debounce)
   ↓
8. recordGesture()
   ↓
9. detectedSequence.push()
   ↓
10. verifyPassword() [if full]
```

### Password Verification Flow
```
1. detectedSequence (3 gestures) collected
   ↓
2. verifyPassword() called
   ↓
3. Compare with passwordSequence
   ↓
4. handleUnlock(success, sequence)
   ↓
5a. If success:
    - Set isUnlocked = true
    - Play success sound
    - Log to Firebase
    - Add to history
    - Reset after 3s
   ↓
5b. If failed:
    - Play error sound
    - Log to Firebase
    - Add to history
    - Reset sequence
```

---

## ⚙️ Configuration Constants

### Default Values
```javascript
requiredLength: 3,          // Gestures needed
debounceTime: 500,          // ms
VIDEO_WIDTH: 640,           // pixels
VIDEO_HEIGHT: 480,          // pixels
UNLOCK_DURATION: 3000,      // ms
CONFIDENCE_THRESHOLD: 0.85  // percentage
```

### Gesture Labels
```javascript
{
  'paper': '✋',
  'scissors': '✌️',
  'hammer': '✊',
  'rock': '✊',
  'noaction': '🚫',
  'none': '🚫'
}
```

---

## 🔐 Security Functions

### Debouncing
```javascript
if (now - lastDetectionTime > debounceTime) {
  if (gesture !== 'none' && gesture !== lastDetectedGesture) {
    recordGesture(gesture);
    lastDetectionTime = now;
  }
}
```

### Confidence Validation
```javascript
if (confidence > CONFIDENCE_THRESHOLD) {
  // Accept gesture
} else {
  // Reject (low confidence)
}
```

---

## 📱 Vue.js Lifecycle

### Mounted Hook
```javascript
mounted() {
  this.videoElement = this.$refs.videoElement;
  this.canvasElement = this.$refs.canvasElement;
  this.initializeApp();
}
```

---

## 🚨 Error Handling

### Camera Access Error
```javascript
navigator.mediaDevices.getUserMedia(...)
  .catch(error => {
    console.error('❌ Camera access denied:', error);
    throw error;
  });
```

### Firebase Error
```javascript
db.ref('logs').push(data)
  .catch(error => {
    console.error('❌ Firebase logging error:', error);
  });
```

### Model Loading Error
```javascript
try {
  detector = await poseDetection.createDetector(...);
  this.modelLoaded = true;
} catch (error) {
  console.warn('⚠️ Using simplified gesture detection:', error);
  this.modelLoaded = true;  // fallback
}
```

---

## 🎯 Event Emitters (Future)

### Currently Planning:
```javascript
// Potential custom events:
this.$emit('gesture-detected', gesture);
this.$emit('password-set', passwordSequence);
this.$emit('unlock-success');
this.$emit('unlock-failed');
this.$emit('debounce-triggered');
this.$emit('confidence-low');
```

---

## 📚 Additional Resources

- [Vue.js 3 API Reference](https://vuejs.org/api/)
- [TensorFlow.js API](https://js.tensorflow.org/api/latest/)
- [Firebase Realtime Database API](https://firebase.google.com/docs/reference/js/database)
- [MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

**That's the API! Happy Coding! 🚀**
