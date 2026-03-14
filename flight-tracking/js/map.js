// Map Utilities for Flight Tracking - Adventure Aviator

// Update traffic analysis
function updateTrafficAnalysis(flights) {
    if (!flights.length) {
        document.getElementById('busiest-route').textContent = '--';
        document.getElementById('peak-hour').textContent = '--';
        return;
    }
    
    // Calculate busiest route (simplified)
    const routeCounts = {};
    flights.forEach(flight => {
        const route = `${flight.origin}-${flight.destination}`;
        routeCounts[route] = (routeCounts[route] || 0) + 1;
    });
    
    let busiestRoute = '--';
    let maxCount = 0;
    for (const [route, count] of Object.entries(routeCounts)) {
        if (count > maxCount) {
            maxCount = count;
            busiestRoute = route;
        }
    }
    
    // Simulate peak hour based on current time
    const now = new Date();
    const hour = now.getHours();
    const peakHour = `${hour}:00 - ${(hour + 1) % 24}:00`;
    
    // Update display
    document.getElementById('busiest-route').textContent = busiestRoute;
    document.getElementById('peak-hour').textContent = peakHour;
    
    // Update chart with simulated data
    updateTrafficChart(flights.length);
}

// Update traffic chart
function updateTrafficChart(flightCount) {
    if (!trafficChart) return;
    
    // Generate realistic traffic pattern
    const baseHour = new Date().getHours();
    const labels = [];
    const data = [];
    
    for (let i = 0; i < 6; i++) {
        const hour = (baseHour - 5 + i + 24) % 24;
        labels.push(`${hour.toString().padStart(2, '0')}:00`);
        
        // Simulate traffic pattern (peak during daytime)
        let traffic;
        if (hour >= 6 && hour <= 20) {
            traffic = flightCount * (0.8 + Math.random() * 0.4);
        } else {
            traffic = flightCount * (0.3 + Math.random() * 0.3);
        }
        data.push(Math.round(traffic));
    }
    
    trafficChart.data.labels = labels;
    trafficChart.data.datasets[0].data = data;
    trafficChart.update();
}

// Setup event listeners
function setupEventListeners() {
    // Refresh button
    document.getElementById('refresh-btn').addEventListener('click', () => {
        loadFlightData();
        animateRefreshButton();
    });
    
    // Filter controls
    document.getElementById('altitude-range').addEventListener('input', (e) => {
        document.getElementById('altitude-value').textContent = 
            parseInt(e.target.value).toLocaleString() + ' ft';
    });
    
    document.getElementById('altitude-range').addEventListener('change', loadFlightData);
    document.getElementById('flight-type').addEventListener('change', loadFlightData);
    document.getElementById('region-select').addEventListener('change', loadFlightData);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' || e.key === 'R') {
            loadFlightData();
            animateRefreshButton();
        }
        if (e.key === 'Escape') {
            selectedFlight = null;
            updateFlightList(sampleFlights);
            document.getElementById('flight-details').innerHTML = `
                <div class="no-selection">
                    <i class="fas fa-mouse-pointer"></i>
                    <p>Select a flight from the list or map for detailed information</p>
                </div>
            `;
        }
    });
}

// Animate refresh button
function animateRefreshButton() {
    const btn = document.getElementById('refresh-btn');
    const icon = btn.querySelector('i');
    
    btn.disabled = true;
    icon.classList.add('fa-spin');
    
    setTimeout(() => {
        btn.disabled = false;
        icon.classList.remove('fa-spin');
    }, 1000);
}

// Start auto-refresh
function startAutoRefresh() {
    setInterval(() => {
        // Simulate flight movement
        sampleFlights.forEach(flight => {
            // Small random position changes
            flight.latitude += (Math.random() - 0.5) * 0.1;
            flight.longitude += (Math.random() - 0.5) * 0.1;
            
            // Keep within reasonable bounds
            flight.latitude = Math.max(24, Math.min(50, flight.latitude));
            flight.longitude = Math.max(-125, Math.min(-66, flight.longitude));
            
            // Update altitude and speed slightly
            flight.altitude += (Math.random() - 0.5) * 100;
            flight.altitude = Math.max(5000, Math.min(45000, flight.altitude));
            
            flight.velocity += (Math.random() - 0.5) * 10;
            flight.velocity = Math.max(100, Math.min(500, flight.velocity));
            
            // Update heading
            flight.heading = (flight.heading + (Math.random() - 0.5) * 5) % 360;
        });
        
        // Reload data if not manually refreshing
        if (!document.getElementById('refresh-btn').disabled) {
            loadFlightData();
        }
    }, 5000); // Update every 5 seconds
}

// Update time displays
function updateTimeDisplay() {
    const now = new Date();
    
    // Update mission time
    const missionTime = now.toUTCString().split(' ')[4];
    document.getElementById('update-time').textContent = missionTime + ' UTC';
    
    // Update every second
    setTimeout(updateTimeDisplay, 1000);
}

// Update last update time
function updateLastUpdateTime() {
    if (!lastUpdateTime) return;
    
    const now = new Date();
    const diffMs = now - lastUpdateTime;
    const diffSec = Math.floor(diffMs / 1000);
    
    let displayTime;
    if (diffSec < 60) {
        displayTime = `${diffSec} seconds ago`;
    } else if (diffSec < 3600) {
        const minutes = Math.floor(diffSec / 60);
        displayTime = `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else {
        const hours = Math.floor(diffSec / 3600);
        displayTime = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    document.getElementById('last-update-time').textContent = displayTime;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);

// Export functions for use in popups
window.selectFlight = selectFlight;
window.centerOnFlight = centerOnFlight;
window.simulateFlightPath = simulateFlightPath;

// Simulate flight path function (called from popup)
window.simulateFlightPath = function(callsign) {
    const flight = sampleFlights.find(f => f.callsign === callsign);
    if (!flight) return;
    
    // Create a simple flight path
    const startLat = flight.latitude - 2;
    const startLon = flight.longitude - 2;
    const endLat = flight.latitude + 2;
    const endLon = flight.longitude + 2;
    
    const path = [
        [startLat, startLon],
        [flight.latitude - 1, flight.longitude - 1],
        [flight.latitude, flight.longitude],
        [flight.latitude + 1, flight.longitude + 1],
        [endLat, endLon]
    ];
    
    // Remove existing path if any
    if (window.flightPath) {
        map.removeLayer(window.flightPath);
    }
    
    // Create new path
    window.flightPath = L.polyline(path, {
        color: '#00ff88',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(map);
    
    // Add direction arrows
    for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        
        const arrow = L.polyline([start, end], {
            color: '#00ff88',
            weight: 2,
            opacity: 0.5
        }).addTo(map);
        
        // Add arrowhead
        const arrowHead = L.polylineDecorator(arrow, {
            patterns: [{
                offset: '100%',
                repeat: 0,
                symbol: L.Symbol.arrowHead({
                    pixelSize: 15,
                    polygon: false,
                    pathOptions: {
                        stroke: true,
                        color: '#00ff88',
                        weight: 2
                    }
                })
            }]
        }).addTo(map);
    }
    
    // Fit map to show entire path
    const bounds = L.latLngBounds(path);
    map.fitBounds(bounds, { padding: [50, 50] });
    
    // Auto-remove after 30 seconds
    setTimeout(() => {
        if (window.flightPath) {
            map.removeLayer(window.flightPath);
            window.flightPath = null;
        }
    }, 30000);
};

// Add utility functions for map controls
function zoomToRegion(region) {
    switch(region) {
        case 'us':
            map.setView([39.8283, -98.5795], 4);
            break;
        case 'europe':
            map.setView([50.8503, 4.3517], 4);
            break;
        case 'asia':
            map.setView([35.6762, 139.6503], 4);
            break;
        default:
            map.setView([20, 0], 2);
    }
}

// Add custom map controls
function addMapControls() {
    // Add custom zoom control
    const zoomControl = L.control.zoom({
        position: 'topright',
        zoomInText: '+',
        zoomOutText: '-'
    });
    zoomControl.addTo(map);
    
    // Add custom scale control
    L.control.scale({
        imperial: true,
        metric: false,
        position: 'bottomleft'
    }).addTo(map);
}

// Initialize map controls
setTimeout(addMapControls, 100);