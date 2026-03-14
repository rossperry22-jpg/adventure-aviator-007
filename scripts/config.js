// Adventure Aviator: Mission Configuration
// Intelligence Module 007 - The Blue Book

const MISSION_CONFIG = {
    // Mission Identity
    missionName: "Adventure Aviator: The Blue Book",
    missionCode: "AA-007",
    missionVersion: "1.0.0",
    missionStatus: "ACTIVE",
    
    // Color Scheme
    colors: {
        primary: "#0077B6",      // Mission Blue
        secondary: "#005885",    // Dark Blue
        accent: "#4DA8DA",       // Light Blue
        white: "#FFFFFF",
        offWhite: "#F8F9FA",
        dark: "#212529",
        success: "#228B22",      // Bond Green
        warning: "#D4AF37",      // Bond Gold
        danger: "#C41E3A"        // Bond Red
    },
    
    // Question Bank Configuration
    questionBank: {
        totalQuestions: 336,
        questionsPerModule: 42,      // 8 modules × 42 questions = 336
        dailyRotation: 48,           // Questions per day
        rotationDays: 7,             // Full cycle in days (336 ÷ 48 = 7)
        modules: 8                   // Modules 00-07
    },
    
    // Module Configuration
    modules: {
        "00": {
            id: "00",
            title: "THE BRIEFING ROOM",
            subtitle: "Mission Fundamentals & Aviation Intelligence",
            description: "Core aviation principles, mission protocols, and intelligence gathering techniques for pilot decision-making.",
            questions: 42,
            duration: "4 hours",
            difficulty: "Foundation",
            tags: ["Fundamentals", "Mission Protocol", "Intelligence"],
            objectives: [
                "Master aviation terminology and concepts",
                "Understand mission protocols and safety frameworks",
                "Develop intelligence gathering skills for flight planning",
                "Establish personal minimums and risk assessment"
            ],
            faaReferences: ["PHAK Ch. 1-3", "AFH Preface", "ACS Introduction"],
            color: "#0077B6"
        },
        "01": {
            id: "01",
            title: "CONTROL COMES FIRST",
            subtitle: "Aircraft Systems & Flight Controls Mastery",
            description: "Primary and secondary flight controls, aircraft systems, and the physics of flight control surfaces.",
            questions: 42,
            duration: "5 hours",
            difficulty: "Essential",
            tags: ["Flight Controls", "Aircraft Systems", "Physics"],
            objectives: [
                "Master primary and secondary flight controls",
                "Understand aircraft systems and limitations",
                "Develop coordinated flight techniques",
                "Recognize and correct control surface issues"
            ],
            faaReferences: ["PHAK Ch. 4", "AFH Ch. 1-3", "POH Systems"],
            color: "#005885"
        },
        "02": {
            id: "02",
            title: "ANGLE OF ATTACK IS EVERYTHING",
            subtitle: "Aerodynamics & Stall/Spin Recovery",
            description: "Advanced aerodynamics, stall characteristics, spin recovery, and load factor management.",
            questions: 42,
            duration: "6 hours",
            difficulty: "Advanced",
            tags: ["Aerodynamics", "Stall Recovery", "Safety"],
            objectives: [
                "Master angle of attack concepts",
                "Execute proper stall recovery procedures",
                "Understand spin dynamics and recovery",
                "Manage load factors in maneuvers"
            ],
            faaReferences: ["PHAK Ch. 5", "AFH Ch. 4", "AC 61-67C"],
            color: "#4DA8DA"
        },
        "03": {
            id: "03",
            title: "ENERGY MANAGEMENT",
            subtitle: "Performance, Planning & Emergency Procedures",
            description: "Aircraft performance calculations, energy management, and emergency procedure execution.",
            questions: 42,
            duration: "5 hours",
            difficulty: "Critical",
            tags: ["Performance", "Emergency", "Planning"],
            objectives: [
                "Calculate aircraft performance parameters",
                "Execute energy management techniques",
                "Implement emergency procedures",
                "Develop go/no-go decision making"
            ],
            faaReferences: ["PHAK Ch. 11", "AFH Ch. 7", "POH Performance"],
            color: "#003F5C"
        },
        "04": {
            id: "04",
            title: "THE AIR YOU'RE FLYING THROUGH",
            subtitle: "Meteorology & Weather Decision Making",
            description: "Advanced meteorology, weather interpretation, and decision making for flight safety.",
            questions: 42,
            duration: "6 hours",
            difficulty: "Complex",
            tags: ["Meteorology", "Weather", "Decision Making"],
            objectives: [
                "Interpret weather reports and forecasts",
                "Recognize hazardous weather conditions",
                "Make weather-related go/no-go decisions",
                "Implement weather avoidance strategies"
            ],
            faaReferences: ["PHAK Ch. 12", "AC 00-6B", "AC 00-45"],
            color: "#2A9D8F"
        },
        "05": {
            id: "05",
            title: "NAVIGATION IS PLANNING, NOT MATH",
            subtitle: "Advanced Navigation & Airspace Management",
            description: "Navigation techniques, airspace classification, and flight planning for complex environments.",
            questions: 42,
            duration: "5 hours",
            difficulty: "Strategic",
            tags: ["Navigation", "Airspace", "Planning"],
            objectives: [
                "Master VFR and IFR navigation techniques",
                "Navigate complex airspace structures",
                "Develop comprehensive flight plans",
                "Implement lost procedure protocols"
            ],
            faaReferences: ["PHAK Ch. 16", "AIM Ch. 3-5", "AC 90-48"],
            color: "#E9C46A"
        },
        "06": {
            id: "06",
            title: "THE LEGAL & HUMAN SIDE OF FLYING",
            subtitle: "Regulations, Human Factors & PIC Responsibility",
            description: "FAA regulations, human factors, and Pilot in Command responsibilities and decision making.",
            questions: 42,
            duration: "4 hours",
            difficulty: "Regulatory",
            tags: ["Regulations", "Human Factors", "PIC"],
            objectives: [
                "Master FAA regulations (Part 61, 91)",
                "Understand human factors and limitations",
                "Implement ADM and risk management",
                "Exercise PIC authority and responsibility"
            ],
            faaReferences: ["FAR Parts 61/91", "PHAK Ch. 17", "AC 60-22"],
            color: "#F4A261"
        },
        "07": {
            id: "07",
            title: "THINKING LIKE A PILOT",
            subtitle: "Checkride Preparation & Scenario-Based Training",
            description: "Checkride preparation, scenario-based training, and final mission readiness assessment.",
            questions: 42,
            duration: "6 hours",
            difficulty: "Mastery",
            tags: ["Checkride", "Scenarios", "Assessment"],
            objectives: [
                "Prepare for oral and practical exams",
                "Execute complex flight scenarios",
                "Demonstrate PIC decision making",
                "Achieve checkride readiness"
            ],
            faaReferences: ["ACS Standards", "PTS", "Checkride Guides"],
            color: "#E76F51"
        }
    },
    
    // Daily Rotation Schedule
    rotationSchedule: {
        day1: [0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105, 112, 119, 126, 133, 140, 147, 154, 161, 168, 175, 182, 189, 196, 203, 210, 217, 224, 231, 238, 245, 252, 259, 266, 273, 280, 287, 294, 301, 308, 315, 322, 329],
        day2: [1, 8, 15, 22, 29, 36, 43, 50, 57, 64, 71, 78, 85, 92, 99, 106, 113, 120, 127, 134, 141, 148, 155, 162, 169, 176, 183, 190, 197, 204, 211, 218, 225, 232, 239, 246, 253, 260, 267, 274, 281, 288, 295, 302, 309, 316, 323, 330],
        day3: [2, 9, 16, 23, 30, 37, 44, 51, 58, 65, 72, 79, 86, 93, 100, 107, 114, 121, 128, 135, 142, 149, 156, 163, 170, 177, 184, 191, 198, 205, 212, 219, 226, 233, 240, 247, 254, 261, 268, 275, 282, 289, 296, 303, 310, 317, 324, 331],
        day4: [3, 10, 17, 24, 31, 38, 45, 52, 59, 66, 73, 80, 87, 94, 101, 108, 115, 122, 129, 136, 143, 150, 157, 164, 171, 178, 185, 192, 199, 206, 213, 220, 227, 234, 241, 248, 255, 262, 269, 276, 283, 290, 297, 304, 311, 318, 325, 332],
        day5: [4, 11, 18, 25, 32, 39, 46, 53, 60, 67, 74, 81, 88, 95, 102, 109, 116, 123, 130, 137, 144, 151, 158, 165, 172, 179, 186, 193, 200, 207, 214, 221, 228, 235, 242, 249, 256, 263, 270, 277, 284, 291, 298, 305, 312, 319, 326, 333],
        day6: [5, 12, 19, 26, 33, 40, 47, 54, 61, 68, 75, 82, 89, 96, 103, 110, 117, 124, 131, 138, 145, 152, 159, 166, 173, 180, 187, 194, 201, 208, 215, 222, 229, 236, 243, 250, 257, 264, 271, 278, 285, 292, 299, 306, 313, 320, 327, 334],
        day7: [6, 13, 20, 27, 34, 41, 48, 55, 62, 69, 76, 83, 90, 97, 104, 111, 118, 125, 132, 139, 146, 153, 160, 167, 174, 181, 188, 195, 202, 209, 216, 223, 230, 237, 244, 251, 258, 265, 272, 279, 286, 293, 300, 307, 314, 321, 328, 335]
    },
    
    // Performance Metrics
    performance: {
        masteryThreshold: 90,    // Percentage for question mastery
        weakThreshold: 70,       // Percentage below which area is weak
        strongThreshold: 85,     // Percentage for strong performance
        reviewInterval: 7,       // Days between reviewing weak areas
        streakGoal: 30           // Days for maximum streak bonus
    },
    
    // Live Data Integration
    liveData: {
        updateInterval: 300000,  // 5 minutes in milliseconds
        sources: {
            notam: "https://api.aviationapi.com/notam",
            metar: "https://api.avwx.rest/metar/",
            taf: "https://api.avwx.rest/taf/",
            faaAlerts: "https://api.faa.gov/alerts",
            weather: "https://api.weather.gov"
        },
        enabled: true
    },
    
    // Storage Configuration
    storage: {
        prefix: "aa_mission_007_",
        encryption: true,
        backupInterval: 86400000, // 24 hours in milliseconds
        maxStorageDays: 365
    },
    
    // Animation Settings
    animations: {
        enabled: true,
        duration: 500,
        easing: "ease-out",
        flightSimSpeed: 1.5
    },
    
    // Security Settings
    security: {
        encryptionKey: "mission_007_aviation_intel",
        sessionTimeout: 1800000, // 30 minutes in milliseconds
        maxAttempts: 5,
        lockoutDuration: 900000   // 15 minutes in milliseconds
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MISSION_CONFIG;
}

// Initialize mission storage
function initializeMissionStorage() {
    if (!localStorage.getItem('aa_mission_initialized')) {
        const initialData = {
            missionStart: new Date().toISOString(),
            progress: {},
            performance: {},
            streak: {
                current: 0,
                longest: 0,
                lastActivity: null
            },
            settings: {
                theme: 'light',
                animations: true,
                sound: true,
                notifications: true
            }
        };
        
        localStorage.setItem('aa_mission_data', JSON.stringify(initialData));
        localStorage.setItem('aa_mission_initialized', 'true');
        console.log('Mission storage initialized');
    }
}

// Get current rotation day
function getCurrentRotationDay() {
    const startDate = localStorage.getItem('aa_mission_start_date');
    if (!startDate) {
        const today = new Date();
        localStorage.setItem('aa_mission_start_date', today.toISOString());
        return 1;
    }
    
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const rotationDay = ((diffDays - 1) % 7) + 1;
    
    return rotationDay;
}

// Get today's questions
function getTodaysQuestions(questionBank) {
    const rotationDay = getCurrentRotationDay();
    const rotationKey = `day${rotationDay}`;
    const questionIndices = MISSION_CONFIG.rotationSchedule[rotationKey];
    
    return questionIndices.map(index => questionBank[index]);
}

// Calculate progress percentage
function calculateProgress(completedQuestions, totalQuestions) {
    return totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;
}

// Update mission time display
function updateMissionTime() {
    const now = new Date();
    const utcTime = now.toUTCString().split(' ')[4];
    const missionTimeElement = document.getElementById('mission-time');
    
    if (missionTimeElement) {
        missionTimeElement.textContent = `${utcTime} UTC`;
    }
}

// Initialize mission on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeMissionStorage();
    updateMissionTime();
    
    // Update mission time every second
    setInterval(updateMissionTime, 1000);
    
    console.log('Adventure Aviator Mission 007: Initialized');
    console.log(`Mission Status: ${MISSION_CONFIG.missionStatus}`);
    console.log(`Total Questions: ${MISSION_CONFIG.questionBank.totalQuestions}`);
    console.log(`Daily Rotation: ${MISSION_CONFIG.questionBank.dailyRotation}`);
    console.log(`Modules: ${MISSION_CONFIG.questionBank.modules}`);
});