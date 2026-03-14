            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: ${MISSION_CONFIG.colors.white};
                border-radius: 20px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                border: 3px solid ${MISSION_CONFIG.colors.primary};
            }
            
            .modal-header {
                padding: 25px;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 17px 17px 0 0;
            }
            
            .modal-header h2 {
                margin: 0;
                font-family: ${MISSION_CONFIG.fonts?.heading || 'Orbitron'};
                font-size: 1.5rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .modal-close {
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
            
            .modal-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }
            
            .modal-body {
                padding: 30px;
            }
            
            .training-options {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .training-option {
                padding: 20px;
                background: ${MISSION_CONFIG.colors.offWhite};
                border: 2px solid ${MISSION_CONFIG.colors.accent};
                border-radius: 15px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .training-option:hover {
                transform: translateY(-5px);
                border-color: ${MISSION_CONFIG.colors.primary};
                box-shadow: 0 10px 30px rgba(0, 119, 182, 0.15);
            }
            
            .training-option.selected {
                border-color: ${MISSION_CONFIG.colors.primary};
                background: linear-gradient(135deg, ${MISSION_CONFIG.colors.primary}15 0%, ${MISSION_CONFIG.colors.secondary}15 100%);
                box-shadow: 0 10px 30px rgba(0, 119, 182, 0.2);
            }
            
            .option-icon {
                width: 60px;
                height: 60px;
                margin: 0 auto 15px;
                background: linear-gradient(135deg, ${MISSION_CONFIG.colors.primary} 0%, ${MISSION_CONFIG.colors.secondary} 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: white;
            }
            
            .training-option h3 {
                margin: 0 0 10px;
                color: ${MISSION_CONFIG.colors.dark};
                font-family: ${MISSION_CONFIG.fonts?.heading || 'Orbitron'};
                font-size: 1.1rem;
            }
            
            .training-option p {
                margin: 0 0 10px;
                color: ${MISSION_CONFIG.colors.gray};
                font-size: 0.9rem;
            }
            
            .option-duration {
                font-family: ${MISSION_CONFIG.fonts?.heading || 'Orbitron'};
                font-size: 0.9rem;
                color: ${MISSION_CONFIG.colors.primary};
                font-weight: 700;
                padding: 5px 10px;
                background: ${MISSION_CONFIG.colors.white};
                border-radius: 15px;
                border: 1px solid ${MISSION_CONFIG.colors.accent};
                display: inline-block;
            }
            
            .module-info {
                background: ${MISSION_CONFIG.colors.offWhite};
                padding: 25px;
                border-radius: 15px;
                border: 1px solid ${MISSION_CONFIG.colors.accent};
            }
            
            .module-info h3 {
                margin: 0 0 20px;
                color: ${MISSION_CONFIG.colors.dark};
                font-family: ${MISSION_CONFIG.fonts?.heading || 'Orbitron'};
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .module-info p {
                margin: 0 0 15px;
                line-height: 1.6;
            }
            
            .objectives-list, .faa-references {
                margin-top: 20px;
            }
            
            .objectives-list h4, .faa-references h4 {
                margin: 0 0 10px;
                color: ${MISSION_CONFIG.colors.dark};
                font-family: ${MISSION_CONFIG.fonts?.heading || 'Orbitron'};
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 1rem;
            }
            
            .objectives-list ul {
                margin: 0;
                padding-left: 20px;
            }
            
            .objectives-list li {
                margin-bottom: 8px;
                line-height: 1.5;
            }
            
            .modal-footer {
                padding: 25px;
                display: flex;
                justify-content: flex-end;
                gap: 15px;
                border-top: 1px solid ${MISSION_CONFIG.colors.accent};
            }
            
            .btn-primary, .btn-secondary {
                padding: 12px 30px;
                border-radius: 10px;
                font-family: ${MISSION_CONFIG.fonts?.heading || 'Orbitron'};
                font-weight: 700;
                letter-spacing: 1px;
                cursor: pointer;
                transition: all 0.3s;
                border: 2px solid transparent;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, ${MISSION_CONFIG.colors.primary} 0%, ${MISSION_CONFIG.colors.secondary} 100%);
                color: white;
            }
            
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(0, 119, 182, 0.3);
            }
            
            .btn-secondary {
                background: ${MISSION_CONFIG.colors.offWhite};
                color: ${MISSION_CONFIG.colors.dark};
                border-color: ${MISSION_CONFIG.colors.accent};
            }
            
            .btn-secondary:hover {
                background: ${MISSION_CONFIG.colors.white};
                border-color: ${MISSION_CONFIG.colors.primary};
            }
            
            /* Notification styles */
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 10px;
                padding: 15px 20px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                border-left: 4px solid ${MISSION_CONFIG.colors.primary};
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                z-index: 3000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            
            .notification-success {
                border-left-color: ${MISSION_CONFIG.colors.success};
            }
            
            .notification-warning {
                border-left-color: ${MISSION_CONFIG.colors.warning};
            }
            
            .notification-info {
                border-left-color: ${MISSION_CONFIG.colors.primary};
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-content i {
                font-size: 1.2rem;
            }
            
            .notification-success .notification-content i {
                color: ${MISSION_CONFIG.colors.success};
            }
            
            .notification-warning .notification-content i {
                color: ${MISSION_CONFIG.colors.warning};
            }
            
            .notification-info .notification-content i {
                color: ${MISSION_CONFIG.colors.primary};
            }
            
            .notification-close {
                background: none;
                border: none;
                color: ${MISSION_CONFIG.colors.gray};
                cursor: pointer;
                font-size: 1rem;
                padding: 5px;
                border-radius: 5px;
                transition: all 0.2s;
            }
            
            .notification-close:hover {
                color: ${MISSION_CONFIG.colors.dark};
                background: ${MISSION_CONFIG.colors.offWhite};
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
    
    // Utility functions for color manipulation
    darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
    
    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R > 255 ? 255 : R) * 0x10000 +
            (G > 255 ? 255 : G) * 0x100 +
            (B > 255 ? 255 : B)).toString(16).slice(1);
    }
}

// Initialize module manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.moduleManager = new ModuleManager();
    moduleManager.renderModules();
    moduleManager.updateDashboard();
    
    // Add event listener for start training button
    const startTrainingBtn = document.getElementById('start-training-btn');
    if (startTrainingBtn) {
        startTrainingBtn.addEventListener('click', function() {
            const rotationDay = getCurrentRotationDay();
            moduleManager.showNotification(`Starting today's training (Day ${rotationDay}, 48 questions)`, 'info');
            // This would launch the daily training interface
        });
    }
    
    // Update rotation day display
    const rotationDay = getCurrentRotationDay();
    const rotationDayElement = document.getElementById('rotation-day');
    if (rotationDayElement) {
        rotationDayElement.textContent = `Day ${rotationDay}`;
    }
    
    console.log('Module Manager: Initialized');
});