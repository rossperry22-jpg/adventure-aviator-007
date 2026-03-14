// Flight Tracker - Adventure Aviator
// Live flight tracking with OpenSky Network integration

let map;
let flightMarkers = [];
let selectedFlight = null;
let trafficChart = null;
let lastUpdateTime = null;

// Sample flight data for demonstration
const sampleFlights = [
    {
        callsign: "UAL123",
        latitude: 40.7128,
        longitude: -74.0060,
        altitude: 35000,
        velocity: 450,
        heading: 270,
        verticalRate: 0,
        origin: "KJFK",
        destination: "KSFO",
        aircraftType: "B737",
        flightType: "commercial"
    },
    {
        callsign: "AAL456",
        latitude: 34.0522,
        longitude: -118.2437,
        altitude: 33000,
        velocity: 420,
        heading: 90,
        verticalRate: 200,
        origin: "KLAX",
        destination: "KORD",
        aircraftType: "A321",
        flightType: "commercial"
    },
    {
        callsign: "DAL789",
        latitude: 41.8781,
        longitude: -87.6298,
        altitude: 31000,
        velocity: 380,
        heading: 180,
        verticalRate: -300,
        origin: "KORD",
        destination: "KATL",
        aircraftType: "B757",
        flightType: "commercial"
    },
    {
        callsign: "N123AB",
        latitude: 39.7392,
        longitude: -104.9903,
        altitude: 12000,
        velocity: 180,
        heading: 45,
        verticalRate: 0,
        origin: "KDEN",
        destination: "KASE",
        aircraftType: "C172",
        flightType: "general"
    },
    {
        callsign: "N456CD",
        latitude: 32.7767,
        longitude: -96.7970,
        altitude: 8000,
        velocity: 220,
        heading: 320,
        verticalRate: 500,
        origin: "KDAL",
        destination: "KAUS",
        aircraftType: "PA28",
        flightType: "general"
    },
    {
        callsign: "AF1",
        latitude: 38.9072,
        longitude: -77.0369,
        altitude: 28000,
        velocity: 400,
        heading: 270,
        verticalRate: 0,
        origin: "KADW",
        destination: "KADW",
        aircraftType: "VC25",
        flightType: "military"
    },
    {
        callsign: "SWA234",
        latitude: 33.4484,
        longitude: -112.0740,
        altitude: 36000,
        velocity: 430,
        heading: 135,
        verticalRate: -150,
        origin: "KPHX",
        destination: "KDAL",
        aircraftType: "B737",
        flightType: "commercial"
    },
    {
        callsign: "N789EF",
        latitude: 47.6062,
        longitude: -122.3321,
        altitude: 6500,
        velocity: 160,
        heading: 90,
        verticalRate: 0,
        origin: "KBFI",
        destination: "KPDX",
        aircraftType: "SR22",
        flightType: "general"
    }
];

// Initialize the application
function init() {
    initializeMap();
    initializeChart();
    loadFlightData();
    setupEventListeners();
    startAutoRefresh();
    updateTimeDisplay();
}

// Initialize Leaflet map
function initializeMap() {
    // Create map centered on United States
    map = L.map('map').setView([39.8283, -98.5795], 4);
    
    // Add dark theme tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        maxZoom: 18,
        subdomains: 'abcd'
    }).addTo(map);
    
    // Add custom attribution
    L.control.attribution({
        position: 'bottomright',
        prefix: 'Adventure Aviator Flight Tracking'
    }).addTo(map);
}

// Initialize traffic chart
function initializeChart() {
    const ctx = document.getElementById('traffic-chart').getContext('2d');
    
    trafficChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Flight Traffic',
                data: [120, 180, 240, 300, 280, 200],
                borderColor: '#00b4d8',
                backgroundColor: 'rgba(0, 180, 216, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#90e0ef'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#90e0ef'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Load flight data (simulated for now)
function loadFlightData() {
    // Clear existing markers
    flightMarkers.forEach(marker => map.removeLayer(marker));
    flightMarkers = [];
    
    // Get filter values
    const maxAltitude = parseInt(document.getElementById('altitude-range').value);
    const flightType = document.getElementById('flight-type').value;
    const region = document.getElementById('region-select').value;
    
    // Filter flights based on criteria
    const filteredFlights = sampleFlights.filter(flight => {
        if (flight.altitude > maxAltitude) return false;
        if (flightType !== 'all' && flight.flightType !== flightType) return false;
        
        // Region filtering (simplified)
        if (region === 'us' && (flight.longitude < -130 || flight.longitude > -65)) return false;
        if (region === 'europe' && (flight.longitude < -10 || flight.longitude > 40)) return false;
        if (region === 'asia' && (flight.longitude < 70 || flight.longitude > 150)) return false;
        
        return true;
    });
    
    // Update flight count
    document.getElementById('flight-count').textContent = filteredFlights.length;
    
    // Calculate average altitude and speed
    const avgAltitude = filteredFlights.reduce((sum, flight) => sum + flight.altitude, 0) / filteredFlights.length || 0;
    const avgSpeed = filteredFlights.reduce((sum, flight) => sum + flight.velocity, 0) / filteredFlights.length || 0;
    
    document.getElementById('avg-altitude').textContent = Math.round(avgAltitude).toLocaleString() + ' ft';
    document.getElementById('avg-speed').textContent = Math.round(avgSpeed) + ' kts';
    
    // Add markers for each flight
    filteredFlights.forEach(flight => {
        const marker = createFlightMarker(flight);
        flightMarkers.push(marker);
        marker.addTo(map);
    });
    
    // Update flight list
    updateFlightList(filteredFlights);
    
    // Update traffic analysis
    updateTrafficAnalysis(filteredFlights);
    
    // Update last update time
    lastUpdateTime = new Date();
    updateLastUpdateTime();
}

// Create a flight marker with custom icon
function createFlightMarker(flight) {
    // Determine icon color based on flight type
    let iconColor;
    switch(flight.flightType) {
        case 'commercial': iconColor = '#00b4d8'; break;
        case 'general': iconColor = '#00ff88'; break;
        case 'military': iconColor = '#ff416c'; break;
        default: iconColor = '#ffffff';
    }
    
    // Create custom icon
    const icon = L.divIcon({
        className: 'flight-marker',
        html: `
            <div style="
                width: 24px;
                height: 24px;
                background: ${iconColor};
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 0 10px ${iconColor};
                display: flex;
                align-items: center;
                justify-content: center;
                transform: rotate(${flight.heading}deg);
            ">
                <div style="
                    width: 0;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-bottom: 10px solid white;
                    margin-top: -8px;
                "></div>
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
    
    // Create marker
    const marker = L.marker([flight.latitude, flight.longitude], { icon });
    
    // Add popup with flight info
    const popupContent = `
        <div style="font-family: 'Roboto', sans-serif; color: #333; min-width: 200px;">
            <h3 style="margin: 0 0 10px 0; color: #0077b6; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                ${flight.callsign}
            </h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
                <div><strong>Type:</strong> ${flight.aircraftType}</div>
                <div><strong>Altitude:</strong> ${flight.altitude.toLocaleString()} ft</div>
                <div><strong>Speed:</strong> ${flight.velocity} kts</div>
                <div><strong>Heading:</strong> ${flight.heading}°</div>
                <div><strong>From:</strong> ${flight.origin}</div>
                <div><strong>To:</strong> ${flight.destination}</div>
            </div>
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #eee; text-align: center;">
                <button onclick="selectFlight('${flight.callsign}')" style="
                    background: #0077b6;
                    color: white;
                    border: none;
                    padding: 5px 15px;
                    border-radius: 3px;
                    cursor: pointer;
                    font-size: 12px;
                ">
                    View Details
                </button>
            </div>
        </div>
    `;
    
    marker.bindPopup(popupContent);
    
    // Add click handler
    marker.on('click', () => {
        selectFlight(flight.callsign);
    });
    
    return marker;
}

// Update flight list in sidebar
function updateFlightList(flights) {
    const flightList = document.getElementById('flight-list');
    
    if (flights.length === 0) {
        flightList.innerHTML = `
            <div class="no-flights">
                <i class="fas fa-plane-slash"></i>
                <p>No flights match the current filters</p>
            </div>
        `;
        return;
    }
    
    flightList.innerHTML = flights.map(flight => `
        <div class="flight-item ${selectedFlight === flight.callsign ? 'active' : ''}" 
             onclick="selectFlight('${flight.callsign}')">
            <div class="flight-header">
                <span class="flight-callsign">${flight.callsign}</span>
                <span class="flight-type ${flight.flightType}">${flight.flightType}</span>
            </div>
            <div class="flight-info">
                <div class="flight-route">
                    <span>${flight.origin}</span>
                    <i class="fas fa-arrow-right"></i>
                    <span>${flight.destination}</span>
                </div>
                <div class="flight-stats">
                    ${flight.altitude.toLocaleString()} ft • ${flight.velocity} kts
                </div>
            </div>
        </div>
    `).join('');
}

// Select a flight and show details
function selectFlight(callsign) {
    selectedFlight = callsign;
    const flight = sampleFlights.find(f => f.callsign === callsign);
    
    if (!flight) return;
    
    // Update flight list selection
    document.querySelectorAll('.flight-item').forEach(item => {
        item.classList.remove('active');
        if (item.querySelector('.flight-callsign').textContent === callsign) {
            item.classList.add('active');
        }
    });
    
    // Update flight details
    const flightDetails = document.getElementById('flight-details');
    flightDetails.innerHTML = `
        <div class="detail-item">
            <div class="detail-label">Flight Identification</div>
            <div class="detail-value">${flight.callsign}</div>
        </div>
        
        <div class="detail-item">
            <div class="detail-label">Aircraft Type</div>
            <div class="detail-value">${flight.aircraftType}</div>
        </div>
        
        <div class="detail-item">
            <div class="detail-label">Route</div>
            <div class="detail-value">${flight.origin} → ${flight.destination}</div>
        </div>
        
        <div class="detail-grid">
            <div class="detail-item">
                <div class="detail-label">Altitude</div>
                <div class="detail-value">${flight.altitude.toLocaleString()} ft</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Ground Speed</div>
                <div class="detail-value">${flight.velocity} kts</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Heading</div>
                <div class="detail-value">${flight.heading}°</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Vertical Speed</div>
                <div class="detail-value">${flight.verticalRate} fpm</div>
            </div>
        </div>
        
        <div class="detail-item">
            <div class="detail-label">Position</div>
            <div class="detail-value">${flight.latitude.toFixed(4)}°, ${flight.longitude.toFixed(4)}°</div>
        </div>
        
        <div class="detail-actions">
            <button class="action-btn" onclick="centerOnFlight('${flight.callsign}')">
                <i class="fas fa-crosshairs"></i> Center Map
            </button>
            <button class="action-btn" onclick="simulateFlightPath('${flight.callsign}')">
                <i class="fas fa-route"></i> Show Path
            </button>
        </div>
    `;
    
    // Add CSS for new elements
    const style = document.createElement('style');
    style.textContent = `
        .detail-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 15px 0;
        }
        
        .detail-actions {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        
        .action-btn {
            flex: 1;
            padding: 8px 15px;
            background: rgba(0, 119, 182, 0.3);
            border: 1px solid rgba(0, 180, 216, 0.5);
            color: white;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Roboto', sans-serif;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s ease;
        }
        
        .action-btn:hover {
            background: rgba(0, 180, 216, 0.5);
            transform: translateY(-2px);
        }
    `;
    flightDetails.appendChild(style);
    
    // Center map on selected flight
    centerOnFlight(callsign);
}

// Center map on selected flight
function centerOnFlight(callsign) {
    const flight = sampleFlights.find(f => f.callsign === callsign);
    if (flight) {
        map.setView([flight.latitude, flight.longitude], 8);
    }
}

// Simulate flight path (demo function)
function simulateFlightPath(callsign) {
    const flight = sampleFlights.find(f => f.callsign === callsign);
    if (!flight) return;
    
    // Create a simple flight path
    const path = [
        [flight.latitude - 2, flight.longitude - 2],
        [flight.latitude - 1, flight.longitude - 1],
        [flight.latitude, flight.longitude],
        [flight.latitude + 1, flight.longitude + 1],
        [flight.latitude + 2, flight.longitude + 2]
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
        dashArray: '10,