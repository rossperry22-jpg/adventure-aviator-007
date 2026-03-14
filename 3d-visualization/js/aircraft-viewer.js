// 3D Flight Visualization - Adventure Aviator
// Main aircraft viewer with multiple camera views

let scene, camera, renderer;
let aircraft, controls;
let currentView = 'cockpit';
let isAnimating = true;

// Initialize the 3D scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a192f);
    scene.fog = new THREE.Fog(0x0a192f, 10, 1000);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('container').appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Add hemisphere light for sky/ground effect
    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x006400, 0.3);
    scene.add(hemisphereLight);
    
    // Create simple aircraft model
    createAircraft();
    
    // Add ground plane
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x2d5016,
        side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(100, 20, 0x0077b6, 0x003366);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);
    
    // Add skybox/dome
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({
        color: 0x87ceeb,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.8
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);
    
    // Add some clouds
    for (let i = 0; i < 10; i++) {
        addCloud(
            Math.random() * 200 - 100,
            Math.random() * 50 + 50,
            Math.random() * 200 - 100
        );
    }
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation
    animate();
    
    // Set initial view
    switchView('cockpit');
}

// Create a simple aircraft model
function createAircraft() {
    const aircraftGroup = new THREE.Group();
    
    // Fuselage (main body)
    const fuselageGeometry = new THREE.CylinderGeometry(0.3, 0.5, 8, 16);
    const fuselageMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        shininess: 30
    });
    const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);
    fuselage.rotation.z = Math.PI / 2;
    fuselage.castShadow = true;
    aircraftGroup.add(fuselage);
    
    // Wings
    const wingGeometry = new THREE.BoxGeometry(12, 0.1, 2);
    const wingMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        shininess: 30
    });
    const wings = new THREE.Mesh(wingGeometry, wingMaterial);
    wings.position.y = 0.1;
    wings.castShadow = true;
    aircraftGroup.add(wings);
    
    // Tail
    const tailGeometry = new THREE.BoxGeometry(2, 0.1, 1.5);
    const tail = new THREE.Mesh(tailGeometry, wingMaterial);
    tail.position.set(-3.5, 0.5, 0);
    tail.castShadow = true;
    aircraftGroup.add(tail);
    
    // Vertical stabilizer
    const vertStabGeometry = new THREE.BoxGeometry(0.1, 1.5, 1);
    const vertStab = new THREE.Mesh(vertStabGeometry, wingMaterial);
    vertStab.position.set(-3.5, 1, 0);
    vertStab.castShadow = true;
    aircraftGroup.add(vertStab);
    
    // Engine/propeller
    const engineGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1, 8);
    const engineMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        shininess: 50
    });
    const engine = new THREE.Mesh(engineGeometry, engineMaterial);
    engine.position.set(4, 0.3, 0);
    engine.rotation.z = Math.PI / 2;
    engine.castShadow = true;
    aircraftGroup.add(engine);
    
    // Propeller
    const propGeometry = new THREE.BoxGeometry(0.1, 4, 0.3);
    const propMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x666666,
        shininess: 50
    });
    const propeller = new THREE.Mesh(propGeometry, propMaterial);
    propeller.position.set(4.6, 0.3, 0);
    propeller.castShadow = true;
    aircraftGroup.add(propeller);
    
    // Landing gear
    const gearGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
    const gearMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    
    for (let i = 0; i < 3; i++) {
        const gear = new THREE.Mesh(gearGeometry, gearMaterial);
        const positions = [
            [1.5, -0.4, 1],   // Right main
            [1.5, -0.4, -1],  // Left main
            [-3, -0.4, 0]     // Nose gear
        ];
        gear.position.set(...positions[i]);
        gear.castShadow = true;
        aircraftGroup.add(gear);
    }
    
    // Add Adventure Aviator logo
    const logoGeometry = new THREE.PlaneGeometry(1, 0.3);
    const logoTexture = new THREE.CanvasTexture(createLogoCanvas());
    const logoMaterial = new THREE.MeshBasicMaterial({ 
        map: logoTexture,
        transparent: true
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.6, 0.3);
    logo.rotation.y = Math.PI;
    aircraftGroup.add(logo);
    
    aircraft = aircraftGroup;
    scene.add(aircraft);
    
    // Add wireframe for educational purposes
    const wireframe = new THREE.WireframeGeometry(fuselageGeometry);
    const line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;
    line.position.copy(fuselage.position);
    line.rotation.copy(fuselage.rotation);
    aircraftGroup.add(line);
}

// Create logo canvas for texture
function createLogoCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 256, 64);
    gradient.addColorStop(0, '#0077b6');
    gradient.addColorStop(1, '#00b4d8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 64);
    
    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Orbitron';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ADVENTURE AVIATOR', 128, 32);
    
    return canvas;
}

// Add a cloud to the scene
function addCloud(x, y, z) {
    const cloudGroup = new THREE.Group();
    
    for (let i = 0; i < 5; i++) {
        const size = Math.random() * 3 + 2;
        const cloudGeometry = new THREE.SphereGeometry(size, 8, 8);
        const cloudMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.7
        });
        const cloudPart = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloudPart.position.set(
            Math.random() * 6 - 3,
            Math.random() * 2 - 1,
            Math.random() * 6 - 3
        );
        cloudGroup.add(cloudPart);
    }
    
    cloudGroup.position.set(x, y, z);
    scene.add(cloudGroup);
}

// Switch between different camera views
function switchView(view) {
    currentView = view;
    
    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update status display
    document.querySelector('#status div:nth-child(2)').innerHTML = `<strong>View:</strong> ${view.charAt(0).toUpperCase() + view.slice(1)}`;
    
    // Set camera position based on view
    switch(view) {
        case 'cockpit':
            camera.position.set(0, 1.5, 1);
            camera.lookAt(0, 1.5, 10);
            break;
        case 'external':
            camera.position.set(10, 5, 10);
            camera.lookAt(0, 2, 0);
            break;
        case 'chase':
            camera.position.set(0, 3, -15);
            camera.lookAt(0, 2, 0);
            break;
        case 'top':
            camera.position.set(0, 50, 0);
            camera.lookAt(0, 0, 0);
            camera.up.set(0, 0, -1);
            break;
    }
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (isAnimating && aircraft) {
        // Gentle rocking motion for realism
        aircraft.rotation.z = Math.sin(Date.now() * 0.001) * 0.02;
        aircraft.rotation.x = Math.sin(Date.now() * 0.0007) * 0.01;
        
        // Rotate propeller
        const propeller = aircraft.children.find(child => 
            child.geometry && child.geometry.type === 'BoxGeometry' && 
            child.position.x > 4
        );
        if (propeller) {
            propeller.rotation.x += 0.3;
        }
        
        // Update instrument values with simulated data
        updateInstruments();
    }
    
    renderer.render(scene, camera);
}

// Update instrument panel with simulated data
function updateInstruments() {
    const time = Date.now() * 0.001;
    
    // Simulate realistic instrument values
    const airspeed = 85 + Math.sin(time) * 5;
    const altitude = 3500 + Math.cos(time * 0.5) * 100;
    const heading = (270 + time * 2) % 360;
    const vertSpeed = 200 + Math.sin(time * 2) * 100;
    
    // Update display
    document.querySelector('.instrument:nth-child(1) .instrument-value').textContent = 
        Math.round(airspeed);
    document.querySelector('.instrument:nth-child(2) .instrument-value').textContent = 
        Math.round(altitude);
    document.querySelector('.instrument:nth-child(3) .instrument-value').textContent = 
        Math.round(heading);
    document.querySelector('.instrument:nth-child(4) .instrument-value').textContent = 
        Math.round(vertSpeed);
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', init);

// Add keyboard controls
window.addEventListener('keydown', (event) => {
    if (!aircraft) return;
    
    const moveSpeed = 0.5;
    const rotateSpeed = 0.05;
    
    switch(event.key) {
        case 'ArrowUp':
            aircraft.position.z -= moveSpeed;
            break;
        case 'ArrowDown':
            aircraft.position.z += moveSpeed;
            break;
        case 'ArrowLeft':
            aircraft.position.x -= moveSpeed;
            aircraft.rotation.y += rotateSpeed;
            break;
        case 'ArrowRight':
            aircraft.position.x += moveSpeed;
            aircraft.rotation.y -= rotateSpeed;
            break;
        case ' ':
            isAnimating = !isAnimating;
            break;
        case 'r':
        case 'R':
            aircraft.position.set(0, 0, 0);
            aircraft.rotation.set(0, 0, 0);
            break;
    }
});

// Add mouse controls for rotation
let isMouseDown = false;
let previousMousePosition = { x: 0, y: 0 };

window.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

window.addEventListener('mouseup', () => {
    isMouseDown = false;
});

window.addEventListener('mousemove', (event) => {
    if (!isMouseDown || !aircraft || currentView !== 'external') return;
    
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;
    
    aircraft.rotation.y += deltaX * 0.01;
    aircraft.rotation.x += deltaY * 0.01;
    
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

// Add zoom with mouse wheel
window.addEventListener('wheel', (event) => {
    if (currentView === 'external' || currentView === 'chase') {
        camera.position.z += event.deltaY * 0.01;
    }
});