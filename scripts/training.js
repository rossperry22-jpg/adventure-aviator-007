                questionCounter.innerHTML = `<i class="fas fa-question-circle"></i> Question ${this.currentQuestion + 1} of ${this.todaysQuestions.length}`;
            }
            
            // Update score
            const scoreCounter = document.querySelector('.training-stats .stat:nth-child(2)');
            if (scoreCounter) {
                scoreCounter.innerHTML = `<i class="fas fa-trophy"></i> Score: ${this.score}`;
            }
            
            // Update reference and difficulty tags
            const question = this.todaysQuestions[this.currentQuestion];
            const referenceTag = document.querySelector('.reference-tag');
            const difficultyTag = document.querySelector('.difficulty-tag');
            
            if (referenceTag) {
                referenceTag.innerHTML = `<i class="fas fa-book"></i> ${question.faaReference || 'FAA Reference'}`;
            }
            
            if (difficultyTag) {
                difficultyTag.className = `difficulty-tag difficulty-${question.difficulty?.toLowerCase() || 'medium'}`;
                difficultyTag.textContent = question.difficulty || 'Medium';
            }
            
            // Reset hint
            const hintContent = document.getElementById('hint-content');
            if (hintContent) {
                hintContent.style.display = 'none';
                hintContent.innerHTML = '';
            }
        }
    }
    
    // Show hint
    showHint() {
        const question = this.todaysQuestions[this.currentQuestion];
        const hintContent = document.getElementById('hint-content');
        
        if (hintContent) {
            hintContent.style.display = 'block';
            hintContent.innerHTML = `
                <div class="hint-header">
                    <i class="fas fa-lightbulb"></i> Thinking Point
                </div>
                <div class="hint-body">
                    <p>Consider: ${this.generateHint(question)}</p>
                    <div class="hint-tags">
                        <span class="hint-tag">Category: ${question.category}</span>
                        <span class="hint-tag">Module: ${question.module}</span>
                    </div>
                </div>
            `;
        }
    }
    
    // Generate hint based on question
    generateHint(question) {
        const hints = {
            'Aircraft Documentation': 'Check the authoritative source for this information.',
            'Certification': 'What are the regulatory requirements?',
            'Human Factors': 'Consider pilot limitations and physiological effects.',
            'Risk Management': 'Think about systematic approaches to safety.',
            'Flight Controls': 'Which control surface affects which axis?',
            'Aerodynamics': 'Remember the fundamental principles of lift and drag.',
            'Stalls': 'What causes stalls and how do we recover?',
            'Performance': 'Consider aircraft limitations and capabilities.',
            'Emergency Procedures': 'What is the priority order of actions?',
            'Weather': 'How does this affect flight safety and decision making?',
            'Navigation': 'What tools and techniques apply here?',
            'Regulations': 'Check the specific FAR reference.',
            'Decision Making': 'Apply ADM principles to this situation.'
        };
        
        return hints[question.category] || 'Consider the fundamental principles involved in this topic.';
    }
    
    // Start timer
    startTimer() {
        this.timerInterval = setInterval(() => {
            const timeSpent = Math.floor((new Date() - this.startTime) / 1000);
            const minutes = Math.floor(timeSpent / 60);
            const seconds = timeSpent % 60;
            
            const timerElement = document.getElementById('training-timer');
            if (timerElement) {
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }
    
    // Finish training
    finishTraining() {
        clearInterval(this.timerInterval);
        this.showResults();
    }
    
    // Show results
    showResults() {
        const questionContainer = document.getElementById('question-container');
        if (questionContainer) {
            questionContainer.innerHTML = this.renderResults();
            this.setupResultsEventListeners();
            this.renderPerformanceChart();
            
            // Update streak
            this.updateStreak();
            
            // Save final progress
            this.saveProgress();
        }
    }
    
    // Setup results event listeners
    setupResultsEventListeners() {
        // Review questions
        document.getElementById('review-questions')?.addEventListener('click', () => {
            this.currentQuestion = 0;
            this.updateQuestionDisplay();
        });
        
        // Continue training
        document.getElementById('continue-training')?.addEventListener('click', () => {
            // Start new session
            this.startDailyTraining();
        });
        
        // Close results
        document.getElementById('close-results')?.addEventListener('click', () => {
            document.getElementById('training-interface').remove();
        });
    }
    
    // Render performance chart
    renderPerformanceChart() {
        const ctx = document.getElementById('performanceChart')?.getContext('2d');
        if (!ctx) return;
        
        // Calculate category performance
        const categories = {};
        this.userAnswers.forEach(answer => {
            const question = QUESTION_BANK.find(q => q.id === answer.questionId);
            if (question) {
                if (!categories[question.category]) {
                    categories[question.category] = { correct: 0, total: 0 };
                }
                categories[question.category].total++;
                if (answer.correct) {
                    categories[question.category].correct++;
                }
            }
        });
        
        const categoryNames = Object.keys(categories);
        const accuracyData = categoryNames.map(cat => {
            return Math.round((categories[cat].correct / categories[cat].total) * 100);
        });
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categoryNames,
                datasets: [{
                    label: 'Accuracy %',
                    data: accuracyData,
                    backgroundColor: categoryNames.map((_, i) => {
                        const hue = (i * 50) % 360;
                        return `hsla(${hue}, 70%, 60%, 0.7)`;
                    }),
                    borderColor: categoryNames.map((_, i) => {
                        const hue = (i * 50) % 360;
                        return `hsla(${hue}, 70%, 50%, 1)`;
                    }),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Accuracy %'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Category'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Calculate weak areas
    calculateWeakAreas() {
        const categories = {};
        
        this.userAnswers.forEach(answer => {
            const question = QUESTION_BANK.find(q => q.id === answer.questionId);
            if (question) {
                if (!categories[question.category]) {
                    categories[question.category] = { correct: 0, total: 0, module: question.module };
                }
                categories[question.category].total++;
                if (answer.correct) {
                    categories[question.category].correct++;
                }
            }
        });
        
        return Object.entries(categories)
            .filter(([_, data]) => data.total >= 3) // Only categories with enough questions
            .map(([category, data]) => ({
                category,
                accuracy: Math.round((data.correct / data.total) * 100),
                module: data.module,
                description: this.getCategoryDescription(category)
            }))
            .filter(area => area.accuracy < MISSION_CONFIG.performance.weakThreshold)
            .sort((a, b) => a.accuracy - b.accuracy);
    }
    
    // Get category description
    getCategoryDescription(category) {
        const descriptions = {
            'Aircraft Documentation': 'Understanding POH, manuals, and aircraft documentation',
            'Certification': 'Pilot certification requirements and standards',
            'Human Factors': 'Physiological and psychological factors affecting performance',
            'Risk Management': 'Identifying and mitigating risks in flight operations',
            'Flight Controls': 'Aircraft control surfaces and their functions',
            'Aerodynamics': 'Principles of lift, drag, and aircraft performance',
            'Stalls': 'Stall recognition, prevention, and recovery',
            'Performance': 'Aircraft performance calculations and limitations',
            'Emergency Procedures': 'Procedures for abnormal and emergency situations',
            'Weather': 'Meteorology and weather decision making',
            'Navigation': 'Flight planning and navigation techniques',
            'Regulations': 'FAA regulations and operating rules',
            'Decision Making': 'Aeronautical Decision Making (ADM) processes'
        };
        
        return descriptions[category] || 'General aviation knowledge area';
    }
    
    // Generate recommendations
    generateRecommendations(accuracy) {
        const recommendations = [];
        
        if (accuracy < 70) {
            recommendations.push({
                icon: 'book',
                text: 'Review fundamental concepts in weak areas before next session'
            });
        }
        
        if (accuracy >= 70 && accuracy < 85) {
            recommendations.push({
                icon: 'graduation-cap',
                text: 'Focus on applying knowledge to practical scenarios'
            });
        }
        
        if (accuracy >= 85) {
            recommendations.push({
                icon: 'trophy',
                text: 'Excellent performance! Consider more challenging scenarios'
            });
        }
        
        recommendations.push({
            icon: 'calendar-check',
            text: 'Practice daily to maintain and improve your skills'
        });
        
        recommendations.push({
            icon: 'chart-line',
            text: 'Track your progress over time to identify trends'
        });
        
        return recommendations;
    }
    
    // Update streak
    updateStreak() {
        const streakData = JSON.parse(localStorage.getItem('aa_streak') || '{"current": 0, "longest": 0, "lastActivity": null}');
        const today = new Date().toDateString();
        
        if (streakData.lastActivity !== today) {
            const lastActivity = streakData.lastActivity ? new Date(streakData.lastActivity) : null;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (!lastActivity || lastActivity.toDateString() === yesterday.toDateString()) {
                streakData.current++;
            } else if (lastActivity.toDateString() !== today) {
                streakData.current = 1;
            }
            
            if (streakData.current > streakData.longest) {
                streakData.longest = streakData.current;
            }
            
            streakData.lastActivity = today;
            localStorage.setItem('aa_streak', JSON.stringify(streakData));
        }
    }
    
    // Add training styles
    addTrainingStyles() {
        const styleId = 'training-styles';
        if (document.getElementById(styleId)) return;
        
        const styles = `
            .training-interface {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: ${MISSION_CONFIG.colors.white};
                z-index: 2000;
                display: flex;
                flex-direction: column;
                font-family: ${MISSION_CONFIG.fonts?.body || 'Roboto'};
            }
            
            .training-header {
                background: linear-gradient(135deg, ${MISSION_CONFIG.colors.primary} 0%, ${MISSION_CONFIG.colors.secondary} 100%);
                color: white;
                padding: 20px 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            
            .training-info h2 {
                margin: 0 0 10px;
                font-family: ${MISSION_CONFIG.fonts?.heading || 'Orbitron'};
                font-size: 1.5rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .training-stats {
                display: flex;
                gap: 20px;
            }
            
            .training-stats .stat {
                background: rgba(255, 255, 255, 0.2);
                padding: 5px 15px;
                border-radius: 15px;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .training-close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                transition: all 0.2s;
            }
            
            .training-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }
            
            .training-content {
                flex: 1;
                padding: 30px;
                overflow-y: auto;
                background: ${MISSION_CONFIG.colors.offWhite};
            }
            
            .question-container {
                max-width: 800px;
                margin: 0 auto;
            }
            
            .question-card {
                background: white;
                border-radius: 15px;
                padding: 30px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                border: 2px solid ${MISSION_CONFIG.colors.accent};
                margin-bottom: 30px;
            }
            
            .question-card.answered {
                border-color: ${MISSION_CONFIG.colors.success};
            }
            
            .question-header {
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 2px solid ${MISSION_CONFIG.colors.offWhite};
            }
            
            .question-text {
                font-size: 1.3rem;
                color: ${MISSION_CONFIG.colors.dark};
                margin: 0 0 15px;
                line-height: 1.5;
            }
            
            .question-meta {
                display: flex;
                gap: 15px;
            }
            
            .module-tag, .category-tag {
                font-size: 0.9rem;
                padding: 5px 12px;
                border-radius: 15px;
                font-weight: 500;
            }
            
            .module-tag {
                background: ${MISSION_CONFIG.colors.primary}15;
                color: ${MISSION_CONFIG.colors.primary};
                border: 1px solid ${MISSION_CONFIG.colors.primary}30;
            }
            
            .category-tag {
                background: ${MISSION_CONFIG.colors.secondary}15;
                color: ${MISSION_CONFIG.colors.secondary};
                border: 1px solid ${MISSION_CONFIG.colors.secondary}30;
            }
            
            .options-container {
                display: flex;
                flex-direction: column;
                gap: 12px;
                margin-bottom: 25px;
            }
            
            .option {
                padding: 18px 20px;
                border: 2px solid ${MISSION_CONFIG.colors.accent};
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .option:not(.correct):not(.incorrect):hover {
                border-color: ${MISSION_CONFIG.colors.primary};
                background: ${MISSION_CONFIG.colors.primary}05;
                transform: translateX(5px);
            }
            
            .option.correct {
                border-color: ${MISSION_CONFIG.colors.success};
                background: ${MISSION_CONFIG.colors.success}15;
            }
            
            .option.incorrect {
                border-color: ${MISSION_CONFIG.colors.danger};
                background: ${MISSION_CONFIG.colors.danger}15;
            }
            
            .option-selector {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .option-letter {
                width: 36px;
                height: 36px;
                background: ${MISSION_CONFIG.colors.offWhite};
                border: 2px solid ${MISSION_CONFIG.colors.accent};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                color: ${MISSION_CONFIG.colors.dark};
                flex-shrink: 0;
            }
            
            .option.correct .option-letter {
                background: ${MISSION_CONFIG.colors.success};
                color: white;
                border-color: ${MISSION_CONFIG.colors.success};
            }
            
            .option.incorrect .option-letter {
                background: ${MISSION_CONFIG.colors.danger};
                color: white;
                border-color: ${MISSION_CONFIG.colors.danger};
            }
            
            .option-text {
                flex: 1;
                font-size: 1.1rem;
                line-height: 1.5;
            }
            
            .option-status {
                font-size: 1.3rem;
                flex-shrink: 0;
            }
            
            .option-status.correct {
                color: ${MISSION_CONFIG.colors.success};
            }
            
            .option-status.incorrect {
                color: ${MISSION_CONFIG.colors.danger};
            }
            
            .explanation-section {
                margin-top: 25px;
                padding-top: 20px;
                border-top: 2px solid ${MISSION_CONFIG.colors.offWhite};
            }
            
            .explanation-section h4 {
                margin: 0 0 15px;
                color: ${MISSION_CONFIG.colors.dark};
                display: flex;
                align-items: center;
                gap: 10px;
                font-family: ${MISSION_CONFIG.fonts?.heading || 'Orbitron'};
            }
            
            .explanation-section p {
                margin: 0 0 15px;
                line-height: 1.6;
                color: ${MISSION_CONFIG.colors.dark};
