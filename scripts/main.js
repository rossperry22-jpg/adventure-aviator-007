// Adventure Aviator: Main Application
// Mission Control and System Integration

class AdventureAviatorApp {
    constructor() {
        this.initialized = false;
        this.currentView = 'briefing';
        this.initializeApp();
    }
    
    // Initialize the application
    initializeApp() {
        if (this.initialized) return;
        
        console.log('Adventure Aviator: Initializing Mission Control...');
        
        // Initialize subsystems
        this.initializeSubsystems();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadInitialData();
        
        // Start background services
        this.startBackgroundServices();
        
        this.initialized = true;
        console.log('Adventure Aviator: Mission Control Online');
    }
    
    // Initialize subsystems
    initializeSubsystems() {
        // Mission configuration is loaded via config.js
        console.log('✓ Mission Configuration Loaded');
        
        // Initialize module manager
        if (typeof ModuleManager !== 'undefined') {
            window.moduleManager = new ModuleManager();
            console.log('✓ Module Manager Initialized');
        }
        
        // Initialize training system
        if (typeof TrainingSystem !== 'undefined') {
            window.trainingSystem = new TrainingSystem();
            console.log('✓ Training System Initialized');
        }
        
        // Initialize analytics system
        if (typeof AnalyticsSystem !== 'undefined') {
            window.analyticsSystem = new AnalyticsSystem();
            console.log('✓ Analytics System Initialized');
        }
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Training buttons
        this.setupTrainingButtons();
        
        // Module interactions
        this.setupModuleInteractions();
        
        // Responsive design
        this.setupResponsiveDesign();
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }
    
    // Setup navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.navigateTo(targetId);
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href').substring(1);
                if (targetId && document.getElementById(targetId)) {
                    e.preventDefault();
                    this.navigateTo(targetId);
                }
            });
        });
    }
    
    // Navigate to section
    navigateTo(sectionId) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        // Scroll to section
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update current view
            this.currentView = sectionId;
            
            // Add visual feedback
            targetElement.classList.add('highlight');
            setTimeout(() => {
                targetElement.classList.remove('highlight');
            }, 1000);
        }
    }
    
    // Setup training buttons
    setupTrainingButtons() {
        const startTrainingBtn = document.getElementById('start-training-btn');
        if (startTrainingBtn) {
            startTrainingBtn.addEventListener('click', () => {
                if (window.trainingSystem) {
                    window.trainingSystem.startDailyTraining();
                }
            });
        }
    }
    
    // Setup module interactions
    setupModuleInteractions() {
        // Module buttons are handled by ModuleManager
        // Additional interactions can be added here
    }
    
    // Setup responsive design
    setupResponsiveDesign() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Initial responsive setup
        this.handleResize();
    }
    
    // Handle window resize
    handleResize() {
        const width = window.innerWidth;
        
        // Update UI based on screen size
        if (width < 768) {
            this.enableMobileMode();
        } else {
            this.disableMobileMode();
        }
        
        // Update any charts or visualizations
        this.updateVisualizations();
    }
    
    // Enable mobile mode
    enableMobileMode() {
        document.body.classList.add('mobile-mode');
        
        // Collapse navigation if needed
        const nav = document.querySelector('.main-nav ul');
        if (nav && !nav.classList.contains('mobile-collapsed')) {
            nav.classList.add('mobile-collapsed');
        }
    }
    
    // Disable mobile mode
    disableMobileMode() {
        document.body.classList.remove('mobile-mode');
        
        // Expand navigation
        const nav = document.querySelector('.main-nav ul');
        if (nav) {
            nav.classList.remove('mobile-collapsed');
        }
    }
    
    // Update visualizations
    updateVisualizations() {
        // Update charts if they exist
        if (window.progressChart instanceof Chart) {
            window.progressChart.resize();
        }
        
        // Update any other visual elements
        this.updateModuleCards();
    }
    
    // Update module cards layout
    updateModuleCards() {
        const modulesGrid = document.getElementById('modules-container');
        if (modulesGrid) {
            const width = window.innerWidth;
            let columns = 4;
            
            if (width < 1200) columns = 3;
            if (width < 900) columns = 2;
            if (width < 600) columns = 1;
            
            modulesGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        }
    }
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only trigger if not in input field
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            // Training shortcuts (when in training interface)
            if (document.getElementById('training-interface')) {
                this.handleTrainingShortcuts(e);
                return;
            }
            
            // Global shortcuts
            switch(e.key) {
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                    // Navigate to sections 1-5
                    const sections = ['briefing', 'modules', 'training', 'intel', 'debrief'];
                    const index = parseInt(e.key) - 1;
                    if (sections[index]) {
                        this.navigateTo(sections[index]);
                    }
                    break;
                    
                case 't':
                case 'T':
                    // Start training
                    if (window.trainingSystem) {
                        window.trainingSystem.startDailyTraining();
                    }
                    break;
                    
                case 'm':
                case 'M':
                    // Toggle mobile navigation
                    this.toggleMobileNav();
                    break;
                    
                case 'Escape':
                    // Close any open modals
                    this.closeModals();
                    break;
            }
        });
    }
    
    // Handle training shortcuts
    handleTrainingShortcuts(e) {
        if (!window.trainingSystem) return;
        
        switch(e.key) {
            case '1':
            case '2':
            case '3':
            case '4':
                // Select answer 1-4
                const optionIndex = parseInt(e.key) - 1;
                const question = window.trainingSystem.todaysQuestions[window.trainingSystem.currentQuestion];
                if (question && !question.answered && optionIndex < question.options.length) {
                    window.trainingSystem.selectOption(optionIndex);
                }
                break;
                
            case 'ArrowLeft':
                // Previous question
                e.preventDefault();
                if (window.trainingSystem.currentQuestion > 0) {
                    window.trainingSystem.currentQuestion--;
                    window.trainingSystem.updateQuestionDisplay();
                }
                break;
                
            case 'ArrowRight':
            case ' ':
                // Next question or select if not answered
                e.preventDefault();
                const currentQuestion = window.trainingSystem.todaysQuestions[window.trainingSystem.currentQuestion];
                if (currentQuestion && !currentQuestion.answered) {
                    // Auto-select first option if not answered
                    window.trainingSystem.selectOption(0);
                } else if (window.trainingSystem.currentQuestion < window.trainingSystem.todaysQuestions.length - 1) {
                    window.trainingSystem.currentQuestion++;
                    window.trainingSystem.updateQuestionDisplay();
                } else {
                    window.trainingSystem.finishTraining();
                }
                break;
                
            case 'h':
            case 'H':
                // Show hint
                e.preventDefault();
                window.trainingSystem.showHint();
                break;
                
            case 'Escape':
                // Close training
                e.preventDefault();
                const trainingInterface = document.getElementById('training-interface');
                if (trainingInterface) {
                    trainingInterface.remove();
                }
                break;
        }
    }
    
    // Toggle mobile navigation
    toggleMobileNav() {
        const nav = document.querySelector('.main-nav ul');
        if (nav) {
            nav.classList.toggle('mobile-collapsed');
        }
    }
    
    // Close all modals
    closeModals() {
        const modals = document.querySelectorAll('.training-modal, .training-interface');
        modals.forEach(modal => modal.remove());
    }
    
    // Load initial data
    loadInitialData() {
        // Load mission data
        this.loadMissionData();
        
        // Update dashboard
        this.updateDashboard();
        
        // Check for updates
        this.checkForUpdates();
    }
    
    // Load mission data
    loadMissionData() {
        // Mission configuration is already loaded
        // Additional data loading can be added here
        
        console.log('✓ Mission Data Loaded');
    }
    
    // Update dashboard
    updateDashboard() {
        // Update mission time
        this.updateMissionTime();
        
        // Update rotation day
        this.updateRotationDay();
        
        // Update progress
        this.updateProgressDisplay();
        
        // Update analytics
        if (window.analyticsSystem) {
            window.analyticsSystem.updateDashboard();
        }
    }
    
    // Update mission time
    updateMissionTime() {
        const updateTime = () => {
            const now = new Date();
            const utcTime = now.toUTCString().split(' ')[4];
            const missionTimeElement = document.getElementById('mission-time');
            
            if (missionTimeElement) {
                missionTimeElement.textContent = `${utcTime} UTC`;
            }
        };
        
        // Update immediately
        updateTime();
        
        // Update every second
        setInterval(updateTime, 1000);
    }
    
    // Update rotation day
    updateRotationDay() {
        const rotationDay = getCurrentRotationDay();
        const rotationDayElement = document.getElementById('rotation-day');
        
        if (rotationDayElement) {
            rotationDayElement.textContent = `Day ${rotationDay}`;
        }
        
        // Update daily count
        const dailyCountElement = document.getElementById('daily-count');
        if (dailyCountElement) {
            dailyCountElement.textContent = MISSION_CONFIG.questionBank.dailyRotation;
        }
    }
    
    // Update progress display
    updateProgressDisplay() {
        // This will be populated by ModuleManager and AnalyticsSystem
        // Placeholder for now
    }
    
    // Start background services
    startBackgroundServices() {
        // Live data updates
        this.startLiveDataUpdates();
        
        // Performance monitoring
        this.startPerformanceMonitoring();
        
        // Auto-save
        this.startAutoSave();
        
        // Notification checks
        this.startNotificationChecks();
    }
    
    // Start live data updates
    startLiveDataUpdates() {
        if (MISSION_CONFIG.liveData.enabled) {
            console.log('✓ Live Data Updates Enabled');
            
            // Update every 5 minutes
            setInterval(() => {
                this.updateLiveData();
            }, MISSION_CONFIG.liveData.updateInterval);
            
            // Initial update
            this.updateLiveData();
        }
    }
    
    // Update live data
    updateLiveData() {
        // This would fetch live aviation data
        // For now, simulate with mock data
        this.simulateLiveData();
    }
    
    // Simulate live data
    simulateLiveData() {
        // Simulate NOTAM updates
        const notams = [
            'RWY 09/27 CLSD for maintenance until 2359Z',
            'TWY B between RWY 09 and APN CLSD',
            'ATC frequency change: GND now 121.9'
        ];
        
        // Simulate weather updates
        const weather = {
            metar: 'KXYZ 271452Z 35010KT 10SM FEW050 12/M02 A2992',
            taf: 'KXYZ 271400Z 2715/2812 34012G20KT P6SM FEW050 FM271800 36015G25KT P6SM SCT050',
            alerts: 'AIRMET TANGO for moderate turbulence below FL180'
        };
        
        // Update UI if needed
        this.updateLiveDataDisplay(notams, weather);
    }
    
    // Update live data display
    updateLiveDataDisplay(notams, weather) {
        // This would update live data widgets
        // For now, just log
        console.log('Live Data Updated:', { notams, weather });
    }
    
    // Start performance monitoring
    startPerformanceMonitoring() {
        // Monitor system performance
        setInterval(() => {
            this.monitorPerformance();
        }, 60000); // Every minute
    }
    
    // Monitor performance
    monitorPerformance() {
        // Check storage usage
        this.checkStorageUsage();
        
        // Check network connectivity
        this.checkConnectivity();
        
        // Check system resources
        this.checkSystemResources();
    }
    
    // Check storage usage
    checkStorageUsage() {
        try {
            const total = JSON.stringify(localStorage).length;
            const limit = 5 * 1024 * 1024; // 5MB typical limit
            const usagePercent = (total / limit) * 100;
            
            if (usagePercent > 80) {
                console.warn('Storage usage high:', usagePercent.toFixed(1) + '%');
                this.cleanupOldData();
            }
        } catch (e) {
            console.error('Storage check failed:', e);
        }
    }
    
    // Cleanup old data
    cleanupOldData() {
        // Implement data cleanup logic
        console.log('Performing data cleanup...');
    }
    
    // Check connectivity
    checkConnectivity() {
        // Simple connectivity check
        const online = navigator.onLine;
        if (!online) {
            console.warn('Network connectivity lost');
            this.showOfflineWarning();
        }
    }
    
    // Show offline warning
    showOfflineWarning() {
        // Show notification
        if (window.moduleManager) {
            window.moduleManager.showNotification(
                'Network connectivity lost. Some features may be limited.',
                'warning'
            );
        }
    }
    
    // Check system resources
    checkSystemResources() {
        // Monitor memory usage
        if (performance.memory) {
            const used = performance.memory.usedJSHeapSize;
            const total = performance.memory.totalJSHeapSize;
            const usagePercent = (used / total) * 100;
            
            if (usagePercent > 80) {
                console.warn('Memory usage high:', usagePercent.toFixed(1) + '%');
            }
        }
    }
    
    // Start auto-save
    startAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            this.autoSave();
        }, 30000);
    }
    
    // Auto-save
    autoSave() {
        // Save module progress
        if (window.moduleManager) {
            window.moduleManager.saveProgress(window.moduleManager.moduleProgress);
        }
        
        // Save training progress
        if (window.trainingSystem) {
            window.trainingSystem.saveProgress();
        }
        
        // Save analytics
        if (window.analyticsSystem) {
            window.analyticsSystem.savePerformanceData();
        }
        
        console.log('Auto-save completed');
    }
    
    // Start notification checks
    startNotificationChecks() {
        // Check for notifications every 5 minutes
        setInterval(() => {
            this.checkNotifications();
        }, 300000);
    }
    
    // Check notifications
    checkNotifications() {
        // Check for new content updates
        this.checkContentUpdates();
        
        // Check for streak reminders
        this.checkStreakReminders();
        
        // Check for performance alerts
        this.checkPerformanceAlerts();
    }
    
    // Check content updates
    checkContentUpdates() {
        // This would check for curriculum updates
        // For now, simulate
        const hasUpdates = Math.random() > 0.8;
        if (hasUpdates && window.moduleManager) {
            window.moduleManager.showNotification(
                'New training content available! Check the updates section.',
                'info'
            );
        }
    }
    
    // Check streak reminders
    checkStreakReminders() {
        const streakData = JSON.parse(localStorage.getItem('aa_streak') || '{"current": 0, "lastActivity": null}');
        const today = new Date().toDateString();
        
        if (streakData.lastActivity !== today && streakData.current > 0) {
            // Haven't trained today but have a streak
            if (window.moduleManager) {
                window.moduleManager.showNotification(
                    `Don't break your ${streakData.current}-day streak! Complete today's training.`,
                    'warning'
                );
            }
        }
    }
    
    // Check performance alerts
    checkPerformanceAlerts() {
        // Check for declining performance
        if (window.analyticsSystem) {
            const trend = window.analyticsSystem.performanceData.trends.consistency;
            if (trend === 'declining') {
                window.moduleManager?.showNotification(
                    'Performance trend declining. Consider reviewing weak areas.',
                    'warning'
                );
            }
        }
    }
    
    // Check for updates
    checkForUpdates() {
        // Check for application updates
        // For now, just log
        console.log('Checking for updates