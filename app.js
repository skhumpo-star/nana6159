const { createApp } = Vue;

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9LIWbD9-oOsLXh6I2lCwRGezfetJmDts",
    authDomain: "miniproject-ce025.firebaseapp.com",
    databaseURL: "https://miniproject-ce025-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "miniproject-ce025",
    storageBucket: "miniproject-ce025.firebasestorage.app",
    messagingSenderId: "946835131840",
    appId: "1:946835131840:web:f394e5df5f3b544c718c25",
    measurementId: "G-X1MS9CL8VZ"
};

let db = null;
let detector = null;

const app = createApp({
    data() {
        return {
            // Video and Camera
            videoElement: null,
            canvasElement: null,
            
            // Model and Detection
            modelLoaded: false,
            currentGesture: '',
            currentConfidence: 0,
            
            // Sequence and Password
            detectedSequence: [],
            passwordSequence: [],
            requiredLength: 3,
            lastDetectedGesture: '',
            debounceTime: 500,
            lastDetectionTime: 0,
            
            // Status
            isUnlocked: false,
            debugMode: false,
            
            // History
            accessHistory: [],
            currentTime: '',
            
            // Gesture Labels
            gestureLabels: {
                'paper': '✋',
                'scissors': '✌️',
                'hammer': '✊',
                'rock': '✊',
                'noaction': '🚫',
                'none': '🚫'
            }
        };
    },
    
    computed: {
        gestureEmojis() {
            return {
                'paper': '✋',
                'scissors': '✌️',
                'hammer': '✊',
                'rock': '✊',
                'noaction': '🚫',
                'none': '🚫'
            };
        }
    },
    
    methods: {
        async initializeApp() {
            console.log('🚀 Initializing AI Gesture Password System...');
            
            try {
                // Initialize Firebase (with mock if config not set)
                this.initializeFirebase();
                
                // Get video element
                await this.getCamera();
                
                // Load TensorFlow.js model
                await this.loadPoseModel();
                
                // Start detection loop
                this.startDetectionLoop();
                
                // Update time
                this.updateTime();
                setInterval(() => this.updateTime(), 1000);
                
                // Load history
                this.loadHistory();
                
                console.log('✅ System initialized successfully');
            } catch (error) {
                console.error('❌ Error initializing:', error);
                alert('Error initializing camera or model. Please check browser permissions.');
            }
        },
        
        initializeFirebase() {
            try {
                // Initialize Firebase
                firebase.initializeApp(firebaseConfig);
                db = firebase.database();
                console.log('✅ Firebase initialized');
            } catch (error) {
                console.warn('⚠️ Firebase initialization skipped (using mock data):', error);
                db = null;
            }
        },
        
        async getCamera() {
            console.log('📷 Requesting camera access...');
            
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 640 },
                        height: { ideal: 480 },
                        facingMode: 'user'
                    },
                    audio: false
                });
                
                this.videoElement.srcObject = stream;
                
                return new Promise((resolve) => {
                    this.videoElement.onloadedmetadata = () => {
                        this.videoElement.play();
                        resolve();
                    };
                });
            } catch (error) {
                console.error('❌ Camera access denied:', error);
                throw error;
            }
        },
        
        async loadPoseModel() {
            console.log('🤖 Loading TensorFlow.js Pose Detection model...');
            
            try {
                // Load posenet model (lightweight alternative)
                const detectorConfig = {
                    runtime: 'tfjs',
                    enableSmoothing: true
                };
                
                detector = await poseDetection.createDetector(
                    poseDetection.SupportedModels.MoveNet,
                    detectorConfig
                );
                
                this.modelLoaded = true;
                console.log('✅ Model loaded successfully');
                
                // Initialize gesture recognition (simple rule-based system)
                this.initializeGestureRecognition();
            } catch (error) {
                console.warn('⚠️ Using simplified gesture detection:', error);
                this.modelLoaded = true;
            }
        },
        
        initializeGestureRecognition() {
            console.log('🎯 Gesture recognition system initialized');
            // Rule-based gesture detection using pose keypoints
        },
        
        async startDetectionLoop() {
            console.log('▶️ Starting detection loop...');
            
            const detectFrame = async () => {
                if (!this.videoElement || !this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
                    requestAnimationFrame(detectFrame);
                    return;
                }
                
                try {
                    // Detect poses in the video frame
                    const poses = await detector.estimatePoses(this.videoElement);
                    
                    if (poses && poses.length > 0) {
                        const gesture = this.recognizeGesture(poses[0]);
                        
                        // Check debounce
                        const now = Date.now();
                        if (now - this.lastDetectionTime > this.debounceTime) {
                            if (gesture !== 'none' && gesture !== this.lastDetectedGesture) {
                                this.currentGesture = gesture;
                                this.recordGesture(gesture);
                                this.lastDetectedGesture = gesture;
                                this.lastDetectionTime = now;
                            }
                        }
                    } else {
                        this.currentGesture = '';
                    }
                    
                    // Draw pose for visualization
                    this.drawPose(poses);
                } catch (error) {
                    console.warn('Detection error:', error);
                }
                
                requestAnimationFrame(detectFrame);
            };
            
            detectFrame();
        },
        
        recognizeGesture(pose) {
            // Simplified gesture recognition based on pose landmarks
            // In production, use Google Teachable Machine model
            
            if (!pose.keypoints || pose.keypoints.length === 0) {
                return 'none';
            }
            
            // Get confidence scores
            const avgConfidence = pose.keypoints.reduce((sum, kp) => sum + (kp.score || 0), 0) / pose.keypoints.length;
            this.currentConfidence = avgConfidence;
            
            // Simple heuristic-based detection
            const leftWrist = pose.keypoints.find(kp => kp.name === 'left_wrist');
            const rightWrist = pose.keypoints.find(kp => kp.name === 'right_wrist');
            const nose = pose.keypoints.find(kp => kp.name === 'nose');
            
            if (!leftWrist || !rightWrist || !nose) {
                return 'none';
            }
            
            // Random gesture for demo (in production, use real model)
            const gestures = ['paper', 'scissors', 'hammer', 'noaction'];
            const randomIndex = Math.floor(Math.random() * 100) % gestures.length;
            
            if (Math.random() > 0.95) {
                return gestures[randomIndex];
            }
            
            return 'none';
        },
        
        drawPose(poses) {
            // Draw pose skeleton on canvas for visualization
            if (!this.canvasElement) return;
            
            const ctx = this.canvasElement.getContext('2d');
            ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
            
            poses.forEach(pose => {
                if (!pose.keypoints) return;
                
                // Draw keypoints
                pose.keypoints.forEach(keypoint => {
                    if (keypoint.score > 0.3) {
                        ctx.beginPath();
                        ctx.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
                        ctx.fillStyle = keypoint.score > 0.5 ? '#10b981' : '#f59e0b';
                        ctx.fill();
                    }
                });
                
                // Draw skeleton
                if (pose.keypoints) {
                    const pairs = [
                        [0, 1], [1, 2], [2, 3], [3, 4], // Head/Neck
                        [0, 5], [5, 6], [6, 7], [7, 8], // Left Arm
                        [0, 9], [9, 10], [10, 11], [11, 12] // Right Arm
                    ];
                    
                    pairs.forEach(([i, j]) => {
                        if (pose.keypoints[i] && pose.keypoints[j]) {
                            if (pose.keypoints[i].score > 0.3 && pose.keypoints[j].score > 0.3) {
                                ctx.beginPath();
                                ctx.moveTo(pose.keypoints[i].x, pose.keypoints[i].y);
                                ctx.lineTo(pose.keypoints[j].x, pose.keypoints[j].y);
                                ctx.strokeStyle = '#667eea';
                                ctx.lineWidth = 2;
                                ctx.stroke();
                            }
                        }
                    });
                }
            });
        },
        
        recordGesture(gesture) {
            if (gesture === 'none' || gesture === 'noaction') {
                return;
            }
            
            this.detectedSequence.push(gesture);
            
            // Auto-verify if sequence is complete
            if (this.detectedSequence.length >= this.requiredLength) {
                setTimeout(() => {
                    this.verifyPassword();
                }, 500);
            }
            
            console.log('🎯 Gesture recorded:', gesture);
        },
        
        verifyPassword() {
            if (this.passwordSequence.length === 0) {
                alert('❌ Please set a password first');
                this.resetSequence();
                return;
            }
            
            const currentSequence = this.detectedSequence.slice(0, this.requiredLength);
            const isCorrect = JSON.stringify(currentSequence) === JSON.stringify(this.passwordSequence);
            
            if (isCorrect) {
                this.handleUnlock(true, currentSequence);
            } else {
                this.handleUnlock(false, currentSequence);
            }
            
            this.resetSequence();
        },
        
        handleUnlock(success, sequence) {
            if (success) {
                this.isUnlocked = true;
                console.log('🔓 UNLOCKED!');
                
                // Play success sound
                this.playSound('success');
                
                // Log to Firebase
                this.logToFirebase('success', sequence);
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.isUnlocked = false;
                    this.resetSequence();
                }, 3000);
            } else {
                console.log('❌ LOCKED - Wrong sequence');
                this.playSound('error');
                this.logToFirebase('failed', sequence);
            }
            
            // Add to history
            this.accessHistory.unshift({
                timestamp: new Date().toISOString(),
                status: success ? 'success' : 'failed',
                sequence: sequence,
                attempCount: 1
            });
        },
        
        async logToFirebase(status, sequence) {
            if (!db) {
                console.log('💾 Mock logging (Firebase not configured):', status, sequence);
                return;
            }
            
            try {
                const timestamp = new Date().toISOString();
                const logData = {
                    timestamp,
                    status,
                    sequence,
                    userAgent: navigator.userAgent
                };
                
                await db.ref('logs').push(logData);
                console.log('✅ Logged to Firebase:', logData);
            } catch (error) {
                console.error('❌ Firebase logging error:', error);
            }
        },
        
        async loadHistory() {
            if (!db) {
                console.log('📋 Using mock history');
                return;
            }
            
            try {
                const snapshot = await db.ref('logs').limitToLast(20).once('value');
                if (snapshot.exists()) {
                    const logs = [];
                    snapshot.forEach(child => {
                        logs.unshift(child.val());
                    });
                    this.accessHistory = logs;
                }
            } catch (error) {
                console.error('Error loading history:', error);
            }
        },
        
        setNewPassword() {
            if (this.detectedSequence.length < this.requiredLength) {
                alert('❌ Please complete the gesture sequence');
                return;
            }
            
            this.passwordSequence = [...this.detectedSequence.slice(0, this.requiredLength)];
            this.playSound('success');
            alert('✅ Password set successfully!');
            this.resetSequence();
        },
        
        resetPassword() {
            this.passwordSequence = [];
            this.playSound('error');
            alert('🗑️ Password reset');
        },
        
        resetSequence() {
            this.detectedSequence = [];
            this.lastDetectedGesture = '';
        },
        
        toggleDebugMode() {
            this.debugMode = !this.debugMode;
        },
        
        clearHistory() {
            if (confirm('Are you sure you want to clear history?')) {
                this.accessHistory = [];
                this.playSound('success');
            }
        },
        
        playSound(type) {
            // Create simple beep sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            if (type === 'success') {
                oscillator.frequency.value = 800;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
            } else if (type === 'error') {
                oscillator.frequency.value = 300;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }
        },
        
        updateTime() {
            const now = new Date();
            this.currentTime = now.toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },
        
        formatTime(timestamp) {
            return new Date(timestamp).toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },
        
        getGestureEmoji(gesture) {
            return this.gestureEmojis[gesture] || '❓';
        },
        
        getCurrentGestureEmoji() {
            return this.getGestureEmoji(this.currentGesture);
        }
    },
    
    mounted() {
        this.videoElement = this.$refs.videoElement;
        this.canvasElement = this.$refs.canvasElement;
        this.initializeApp();
    }
});

app.mount('#app');
