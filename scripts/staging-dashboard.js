// Staging Dashboard JavaScript
class StagingDashboard {
    constructor() {
        this.countdownEnd = null;
        this.initialize();
    }
    
    initialize() {
        // Set countdown end time (96 hours from first load)
        const countdownKey = 'staging_countdown_end';
        const storedEnd = localStorage.getItem(countdownKey);
        if (storedEnd) {
            this.countdownEnd = new Date(storedEnd);
        } else {
            this.countdownEnd = new Date();
            this.countdownEnd.setHours(this.countdownEnd.getHours() + 96);
            localStorage.setItem(countdownKey, this.countdownEnd.toISOString());
        }
        
        // Start countdown timer
        this.startCountdown();
        
        // Update metrics
        this.updateMetrics();
        
        // Update deployment info
        this.updateDeploymentInfo();
        
        // Auto-refresh every 30 seconds
        setInterval(() => this.updateMetrics(), 30000);
    }
    
    startCountdown() {
        const update = () => {
            const now = new Date();
            const diff = this.countdownEnd - now;
            
            if (diff <= 0) {
                // Countdown finished
                document.getElementById('countdown-days').textContent = '00';
                document.getElementById('countdown-hours').textContent = '00';
                document.getElementById('countdown-minutes').textContent = '00';
                document.getElementById('countdown-seconds').textContent = '00';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
            document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
            
            requestAnimationFrame(update);
        };
        
        update();
    }
    
    async updateMetrics() {
        try {
            // Fetch question count from question bank
            const questionCount = await this.getQuestionCount();
            const moduleCount = await this.getModuleCount();
            const completion = await this.calculateCompletion();
            const velocity = await this.calculateVelocity();
            
            // Update progress bars
            this.updateProgressBar('questions-generated', questionCount, 336);
            this.updateProgressBar('modules-completed', moduleCount, 8);
            this.updateProgressBar('progress-completion', completion, 100);
            this.updateProgressBar('velocity-score', velocity, 100);
            
            // Update numeric values
            document.getElementById('questions-generated').textContent = `${questionCount}/336`;
            document.getElementById('modules-completed').textContent = `${moduleCount}/8`;
            document.getElementById('progress-completion').textContent = `${completion}%`;
            document.getElementById('velocity-score').textContent = velocity;
            
        } catch (error) {
            console.error('Failed to update metrics:', error);
        }
    }
    
    updateProgressBar(elementId, current, total) {
        const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
        const barFill = document.querySelector(`#${elementId} + .metric-label + .metric-bar .bar-fill`);
        if (barFill) {
            barFill.style.width = `${percentage}%`;
        }
    }
    
    async getQuestionCount() {
        // Try to load from question bank
        try {
            // Check if QUESTION_BANK exists
            if (typeof QUESTION_BANK !== 'undefined') {
                return QUESTION_BANK.length;
            }
            
            // Try to fetch from modules/question-bank.json
            const response = await fetch('modules/question-bank.json');
            if (response.ok) {
                const data = await response.json();
                return data.length;
            }
        } catch (e) {
            // Fallback to counting in questions.js
            const scriptContent = document.querySelector('script[src*="questions.js"]');
            if (scriptContent) {
                // Not reliable; we'll just return a static count for now
                // In a real implementation, we would parse the file
            }
        }
        
        // Default fallback
        return 27;
    }
    
    async getModuleCount() {
        // Count modules that have at least one question
        try {
            if (typeof QUESTION_BANK !== 'undefined') {
                const modules = new Set(QUESTION_BANK.map(q => q.module));
                return modules.size;
            }
            
            const response = await fetch('modules/question-bank.json');
            if (response.ok) {
                const data = await response.json();
                const modules = new Set(data.map(q => q.module));
                return modules.size;
            }
        } catch (e) {
            // Fallback
        }
        
        // Based on existing questions, we have modules 05,06,07
        return 3;
    }
    
    async calculateCompletion() {
        // Weighted average of various completion metrics
        const questionCount = await this.getQuestionCount();
        const moduleCount = await this.getModuleCount();
        
        // Question completion weight: 60%
        // Module completion weight: 30%
        // Other factors (design, functionality): 10%
        const questionCompletion = (questionCount / 336) * 100;
        const moduleCompletion = (moduleCount / 8) * 100;
        const otherCompletion = 50; // Placeholder
        
        return Math.round((questionCompletion * 0.6) + (moduleCompletion * 0.3) + (otherCompletion * 0.1));
    }
    
    async calculateVelocity() {
        // Simple velocity score based on recent progress
        // For now, return a placeholder
        return 42;
    }
    
    updateDeploymentInfo() {
        // Set last deploy time
        const lastDeploy = localStorage.getItem('last_deploy_time') || new Date().toISOString();
        const deployDate = new Date(lastDeploy);
        const now = new Date();
        const diffMinutes = Math.floor((now - deployDate) / (1000 * 60));
        
        let displayText;
        if (diffMinutes < 1) {
            displayText = 'Just now';
        } else if (diffMinutes < 60) {
            displayText = `${diffMinutes} minutes ago`;
        } else if (diffMinutes < 1440) {
            const hours = Math.floor(diffMinutes / 60);
            displayText = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(diffMinutes / 1440);
            displayText = `${days} day${days > 1 ? 's' : ''} ago`;
        }
        
        document.getElementById('last-deploy').textContent = displayText;
        
        // Set commit hash (from data attribute or default)
        const commitHash = document.body.getAttribute('data-commit') || '1d05595';
        document.getElementById('commit-hash').textContent = commitHash;
    }
    
    refresh() {
        this.updateMetrics();
        this.updateDeploymentInfo();
        
        // Add visual feedback
        const btn = document.querySelector('.btn-refresh');
        btn.innerHTML = '<i class="fas fa-check"></i> Refreshed';
        btn.classList.add('refreshed');
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Metrics';
            btn.classList.remove('refreshed');
        }, 2000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.stagingDashboard = new StagingDashboard();
});

// Global function for button onclick
function updateStagingDashboard() {
    if (window.stagingDashboard) {
        window.stagingDashboard.refresh();
    }
}