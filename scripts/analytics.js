// Adventure Aviator: Analytics System
// Performance tracking and intelligence dashboard

class AnalyticsSystem {
    constructor() {
        this.performanceData = this.loadPerformanceData();
        this.weakAreas = [];
        this.recommendations = [];
        this.initializeAnalytics();
    }
    
    // Initialize analytics system
    initializeAnalytics() {
        this.loadPerformanceData();
        this.analyzePerformance();
        this.updateDashboard();
        this.setupLiveUpdates();
    }
    
    // Load performance data
    loadPerformanceData() {
        const savedData = localStorage.getItem('aa_analytics_data');
        if (savedData) {
            return JSON.parse(savedData);
        }
        
        // Initialize with default structure
        return {
            dailyPerformance: {},
            modulePerformance: {},
            categoryPerformance: {},
            streak: {
                current: 0,
                longest: 0,
                lastActivity: null
            },
            trends: {
                accuracy: [],
                speed: [],
                consistency: []
            },
            lastUpdated: null
        };
    }
    
    // Save performance data
    savePerformanceData() {
        this.performanceData.lastUpdated = new Date().toISOString();
        localStorage.setItem('aa_analytics_data', JSON.stringify(this.performanceData));
    }
    
    // Analyze performance
    analyzePerformance() {
        this.analyzeDailyPerformance();
        this.analyzeModulePerformance();
        this.analyzeCategoryPerformance();
        this.identifyWeakAreas();
        this.generateRecommendations();
        this.calculateTrends();
    }
    
    // Analyze daily performance
    analyzeDailyPerformance() {
        const trainingProgress = JSON.parse(localStorage.getItem('aa_training_progress') || '{}');
        const today = new Date().toDateString();
        
        if (trainingProgress.lastTraining) {
            const trainingDate = new Date(trainingProgress.lastTraining).toDateString();
            if (trainingDate === today && trainingProgress.todaysQuestions) {
                const totalQuestions = trainingProgress.todaysQuestions.length;
                const correctAnswers = trainingProgress.todaysQuestions.filter(q => q.correct).length;
                const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
                
                this.performanceData.dailyPerformance[today] = {
                    accuracy,
                    totalQuestions,
                    correctAnswers,
                    timeSpent: trainingProgress.todaysQuestions.reduce((sum, q) => sum + (q.timeSpent || 0), 0)
                };
            }
        }
    }
    
    // Analyze module performance
    analyzeModulePerformance() {
        const moduleProgress = JSON.parse(localStorage.getItem('aa_module_progress') || '{}');
        
        Object.keys(MISSION_CONFIG.modules).forEach(moduleId => {
            const progress = moduleProgress[moduleId];
            if (progress) {
                const accuracy = progress.questionsAttempted > 0 ? 
                    Math.round((progress.questionsCorrect / progress.questionsAttempted) * 100) : 0;
                
                this.performanceData.modulePerformance[moduleId] = {
                    accuracy,
                    completed: progress.completed || false,
                    questionsAttempted: progress.questionsAttempted || 0,
                    questionsCorrect: progress.questionsCorrect || 0,
                    timeSpent: progress.timeSpent || 0,
                    lastAccessed: progress.lastAccessed
                };
            }
        });
    }
    
    // Analyze category performance
    analyzeCategoryPerformance() {
        const trainingProgress = JSON.parse(localStorage.getItem('aa_training_progress') || '{}');
        const userAnswers = trainingProgress.userAnswers || [];
        
        const categories = {};
        
        userAnswers.forEach(answer => {
            const question = QUESTION_BANK.find(q => q.id === answer.questionId);
            if (question) {
                if (!categories[question.category]) {
                    categories[question.category] = {
                        correct: 0,
                        total: 0,
                        totalTime: 0
                    };
                }
                categories[question.category].total++;
                categories[question.category].totalTime += answer.timeSpent || 0;
                if (answer.correct) {
                    categories[question.category].correct++;
                }
            }
        });
        
        Object.keys(categories).forEach(category => {
            const data = categories[category];
            const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            const avgTime = data.total > 0 ? Math.round(data.totalTime / data.total) : 0;
            
            this.performanceData.categoryPerformance[category] = {
                accuracy,
                avgTime,
                totalQuestions: data.total,
                correctAnswers: data.correct
            };
        });
    }
    
    // Identify weak areas
    identifyWeakAreas() {
        this.weakAreas = [];
        
        // Check category performance
        Object.entries(this.performanceData.categoryPerformance).forEach(([category, data]) => {
            if (data.totalQuestions >= 3 && data.accuracy < MISSION_CONFIG.performance.weakThreshold) {
                this.weakAreas.push({
                    type: 'category',
                    name: category,
                    score: data.accuracy,
                    severity: this.getSeverity(data.accuracy),
                    description: `Low accuracy in ${category} questions`,
                    recommendation: `Focus on ${category} fundamentals and practice more questions in this area`
                });
            }
        });
        
        // Check module performance
        Object.entries(this.performanceData.modulePerformance).forEach(([moduleId, data]) => {
            if (data.questionsAttempted >= 5 && data.accuracy < MISSION_CONFIG.performance.weakThreshold) {
                const module = MISSION_CONFIG.modules[moduleId];
                this.weakAreas.push({
                    type: 'module',
                    name: `Module ${moduleId}: ${module?.title || 'Unknown'}`,
                    score: data.accuracy,
                    severity: this.getSeverity(data.accuracy),
                    description: `Struggling with Module ${moduleId} concepts`,
                    recommendation: `Review Module ${moduleId} materials and complete focused training`
                });
            }
        });
        
        // Sort by severity (lowest score first)
        this.weakAreas.sort((a, b) => a.score - b.score);
    }
    
    // Generate recommendations
    generateRecommendations() {
        this.recommendations = [];
        
        // Overall performance recommendations
        const overallAccuracy = this.calculateOverallAccuracy();
        
        if (overallAccuracy < 70) {
            this.recommendations.push({
                priority: 'high',
                icon: 'book',
                title: 'Build Foundation',
                description: 'Focus on fundamental concepts before advancing',
                action: 'Review Modules 00-02 thoroughly'
            });
        } else if (overallAccuracy < 85) {
            this.recommendations.push({
                priority: 'medium',
                icon: 'graduation-cap',
                title: 'Apply Knowledge',
                description: 'Practice applying concepts to real scenarios',
                action: 'Try scenario-based training exercises'
            });
        } else {
            this.recommendations.push({
                priority: 'low',
                icon: 'trophy',
                title: 'Challenge Yourself',
                description: 'Excellent performance! Time for advanced challenges',
                action: 'Try complex scenario simulations'
            });
        }
        
        // Consistency recommendations
        const consistency = this.calculateConsistency();
        if (consistency < 70) {
            this.recommendations.push({
                priority: 'medium',
                icon: 'chart-line',
                title: 'Improve Consistency',
                description: 'Performance varies significantly between sessions',
                action: 'Establish regular daily training routine'
            });
        }
        
        // Time management recommendations
        const avgResponseTime = this.calculateAverageResponseTime();
        if (avgResponseTime > 30) {
            this.recommendations.push({
                priority: 'medium',
                icon: 'clock',
                title: 'Improve Speed',
                description: 'Response time is slower than optimal',
                action: 'Practice quick recall of fundamental knowledge'
            });
        }
        
        // Streak recommendations
        const streak = this.performanceData.streak?.current || 0;
        if (streak < 7) {
            this.recommendations.push({
                priority: 'low',
                icon: 'fire',
                title: 'Build Streak',
                description: `Current streak: ${streak} days`,
                action: 'Train daily to build and maintain your streak'
            });
        }
        
        // Sort by priority
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        this.recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    
    // Calculate overall accuracy
    calculateOverallAccuracy() {
        const trainingProgress = JSON.parse(localStorage.getItem('aa_training_progress') || '{}');
        const userAnswers = trainingProgress.userAnswers || [];
        
        if (userAnswers.length === 0) return 0;
        
        const correctAnswers = userAnswers.filter(a => a.correct).length;
        return Math.round((correctAnswers / userAnswers.length) * 100);
    }
    
    // Calculate consistency
    calculateConsistency() {
        const dailyValues = Object.values(this.performanceData.dailyPerformance);
        if (dailyValues.length < 2) return 100;
        
        const accuracies = dailyValues.map(d => d.accuracy);
        const avgAccuracy = accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
        
        // Calculate coefficient of variation (lower is more consistent)
        const variance = accuracies.reduce((sum, acc) => sum + Math.pow(acc - avgAccuracy, 2), 0) / accuracies.length;
        const stdDev = Math.sqrt(variance);
        const cv = (stdDev / avgAccuracy) * 100;
        
        // Convert to consistency score (100% = perfectly consistent)
        return Math.max(0, 100 - cv);
    }
    
    // Calculate average response time
    calculateAverageResponseTime() {
        const trainingProgress = JSON.parse(localStorage.getItem('aa_training_progress') || '{}');
        const userAnswers = trainingProgress.userAnswers || [];
        
        if (userAnswers.length === 0) return 0;
        
        const totalTime = userAnswers.reduce((sum, a) => sum + (a.timeSpent || 0), 0);
        return Math.round(totalTime / userAnswers.length);
    }
    
    // Calculate trends
    calculateTrends() {
        const dailyEntries = Object.entries(this.performanceData.dailyPerformance)
            .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
            .slice(-7); // Last 7 days
        
        this.performanceData.trends.accuracy = dailyEntries.map(([_, data]) => data.accuracy);
        this.performanceData.trends.speed = dailyEntries.map(([_, data]) => {
            return data.totalQuestions > 0 ? Math.round(data.timeSpent / data.totalQuestions) : 0;
        });
        
        // Calculate consistency trend
        if (dailyEntries.length >= 3) {
            const recentAccuracies = dailyEntries.slice(-3).map(([_, data]) => data.accuracy);
            const avgRecent = recentAccuracies.reduce((sum, acc) => sum + acc, 0) / recentAccuracies.length;
            const olderAccuracies = dailyEntries.slice(0, -3).map(([_, data]) => data.accuracy);
            const avgOlder = olderAccuracies.length > 0 ? 
                olderAccuracies.reduce((sum, acc) => sum + acc, 0) / olderAccuracies.length : avgRecent;
            
            this.performanceData.trends.consistency = avgRecent >= avgOlder ? 'improving' : 'declining';
        } else {
            this.performanceData.trends.consistency = 'stable';
        }
    }
    
    // Get severity level
    getSeverity(score) {
        if (score < 50) return 'high';
        if (score < 70) return 'medium';
        return 'low';
    }
    
    // Update dashboard
    updateDashboard() {
        this.updatePerformanceMetrics();
        this.updateWeakAreasDisplay();
        this.updateRecommendationsDisplay();
        this.updateProgressChart();
    }
    
    // Update performance metrics
    updatePerformanceMetrics() {
        const overallAccuracy = this.calculateOverallAccuracy();
        const avgResponseTime = this.calculateAverageResponseTime();
        const streak = this.performanceData.streak?.current || 0;
        const checkreadiness = this.calculateCheckrideReadiness();
        
        // Update metric elements
        const metrics = {
            'accuracy-rate': `${overallAccuracy}%`,
            'response-time': `${avgResponseTime}s`,
            'streak-days': streak,
            'checkride-score': `${checkreadiness}%`
        };
        
        Object.entries(metrics).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }
    
    // Update weak areas display
    updateWeakAreasDisplay() {
        const weakAreasList = document.getElementById('weak-areas-list');
        if (!weakAreasList) return;
        
        if (this.weakAreas.length === 0) {
            weakAreasList.innerHTML = `
                <div class="no-weak-areas">
                    <i class="fas fa-check-circle"></i>
                    <span>No weak areas identified. Keep up the excellent work!</span>
                </div>
            `;
            return;
        }
        
        weakAreasList.innerHTML = this.weakAreas.slice(0, 3).map(area => `
            <div class="weak-area">
                <div class="weak-area-header">
                    <div class="weak-area-title">${area.name}</div>
                    <div class="weak-area-score ${area.severity}">${area.score}%</div>
                </div>
                <div class="weak-area-desc">${area.description}</div>
            </div>
        `).join('');
    }
    
    // Update recommendations display
    updateRecommendationsDisplay() {
        const recommendationsList = document.getElementById('recommendations-list');
        if (!recommendationsList) return;
        
        if (this.recommendations.length === 0) {
            recommendationsList.innerHTML = `
                <div class="no-recommendations">
                    <i class="fas fa-info-circle"></i>
                    <span>Complete some training to get personalized recommendations</span>
                </div>
            `;
            return;
        }
        
        recommendationsList.innerHTML = this.recommendations.slice(0, 3).map(rec => `
            <div class="recommendation">
                <div class="recommendation-header">
                    <div class="recommendation-title">${rec.title}</div>
                    <div class="recommendation-priority">${rec.priority.toUpperCase()}</div>
                </div>
                <div class="recommendation-desc">${rec.description}</div>
                <div class="recommendation-action">
                    <i class="fas fa-${rec.icon}"></i>
                    <span>${rec.action}</span>
                </div>
            </div>
        `).join('');
    }
    
    // Update progress chart
    updateProgressChart() {
        const ctx = document.getElementById('progressChart')?.getContext('2d');
        if (!ctx) return;
        
        const dailyEntries = Object.entries(this.performanceData.dailyPerformance)
            .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
            .slice(-7);
        
        const dates = dailyEntries.map(([date]) => {
            const d = new Date(date);
            return `${d.getMonth() + 1}/${d.getDate()}`;
        });
        
        const accuracies = dailyEntries.map(([_, data]) => data.accuracy);
        
        // Destroy existing chart if it exists
        if (window.progressChart instanceof Chart) {
            window.progressChart.destroy();
        }
        
        window.progressChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Daily Accuracy %',
                    data: accuracies,
                    borderColor: MISSION_CONFIG.colors.primary,
                    backgroundColor: `${MISSION_CONFIG.colors.primary}20`,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: `${MISSION_CONFIG.colors.accent}20`
                        },
                        ticks: {
                            color: MISSION_CONFIG.colors.gray
                        }
                    },
                    x: {
                        grid: {
                            color: `${MISSION_CONFIG.colors.accent}20`
                        },
                        ticks: {
                            color: MISSION_CONFIG.colors.gray
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: MISSION_CONFIG.colors.dark,
                        titleColor: MISSION_CONFIG.colors.white,
                        bodyColor: MISSION_CONFIG.colors.white,
                        borderColor: MISSION_CONFIG.colors.primary,
                        borderWidth: 1
                    }
                }
            }
        });
    }
    
    // Calculate checkride readiness
    calculateCheckrideReadiness() {
        const moduleProgress = JSON.parse(localStorage.getItem('aa_module_progress') || '{}');
        const moduleIds = Object.keys(MISSION_CONFIG.modules);
        
        if (moduleIds.length === 0) return 0;
        
        let totalScore = 0;
        let completedModules = 0;
        
        moduleIds.forEach(moduleId => {
            const progress = moduleProgress[moduleId];
            if (progress) {
                const accuracy = progress.questionsAttempted > 0 ? 
                    Math.round((progress.questionsCorrect / progress.questionsAttempted) * 100) : 0;
                
                totalScore += accuracy;
                if (progress.completed) completedModules++;
            }
        });
        
        const avgAccuracy = moduleIds.length > 0 ? totalScore / moduleIds.length : 0;
        const completionRate = (completedModules / moduleIds.length) * 100;
        
        // Weighted score: 60% accuracy, 40% completion
        return Math.round((