/**
 * Preview 3D v2: Enterprise Cloud & Data Pipeline Engine
 * Built with Three.js (Procedural geometries, textures, and CatmullRomCurve3 spline flight)
 * Author: Tersiqo Alfarezel Portfolio Showcase
 */

(function () {
  'use strict';

  // --- 1. SETUP CANVAS & THREE.JS CORE ---
  const canvasContainer = document.getElementById('three-fly-canvas');
  if (!canvasContainer) return;

  let width = window.innerWidth;
  let height = window.innerHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050811);
  scene.fog = new THREE.FogExp2(0x050811, 0.022);

  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  canvasContainer.appendChild(renderer.domElement);

  // --- 2. 3D FLIGHT PATH (CatmullRomCurve3 Spline) ---
  // A dynamic S-curve that navigates through all 5 sectors
  const flightSpline = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 3.2, 18),     // Zone 1: Entry Gate Start
    new THREE.Vector3(0, 2.8, 8),      // Zone 1 -> Zone 2 Approach
    new THREE.Vector3(-4.5, 2.5, -6),  // Zone 2: Entering Server Rack Corridor (Bank Left)
    new THREE.Vector3(-3.0, 2.8, -22), // Zone 2: Mid-corridor
    new THREE.Vector3(4.0, 3.5, -38),  // Zone 3: S-Curve Right into Data Warehouse Chamber
    new THREE.Vector3(2.5, 4.0, -52),  // Zone 3: Orbiting Data Core
    new THREE.Vector3(-1.0, 4.8, -68), // Zone 4: Entering Production Cloud Deck (Near Billboards)
    new THREE.Vector3(0.5, 5.5, -84),  // Zone 4: Passing Flagship Ships
    new THREE.Vector3(0, 8.5, -100),   // Zone 5: Ascent to Command Terminal Apex
    new THREE.Vector3(0, 11.0, -112)   // Final Overview Apex
  ]);

  // Target look-ahead spline for smooth tracking
  const lookSpline = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 3.0, 10),
    new THREE.Vector3(-2, 2.6, 0),
    new THREE.Vector3(-4.5, 2.5, -14),
    new THREE.Vector3(0, 3.0, -30),
    new THREE.Vector3(4.0, 3.5, -46),
    new THREE.Vector3(0, 4.2, -60),
    new THREE.Vector3(-1.0, 4.8, -76),
    new THREE.Vector3(0, 6.0, -92),
    new THREE.Vector3(0, 7.0, -108),
    new THREE.Vector3(0, 8.0, -120)
  ]);

  // --- 3. PROCEDURAL TEXTURES (Zero external heavy assets!) ---

  // Helper: Create procedural server rack face texture with glowing LEDs & ventilation
  function createServerRackTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Dark chassis background
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, 256, 512);

    // Metal rack outer borders
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, 250, 506);

    // 8 Blade server slots
    for (let slot = 0; slot < 8; slot++) {
      const y = 20 + slot * 60;

      // Slot tray
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(14, y, 228, 50);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(14, y, 228, 50);

      // Ventilation grille slats
      ctx.fillStyle = '#020617';
      for (let s = 0; s < 12; s++) {
        ctx.fillRect(30 + s * 10, y + 16, 5, 20);
      }

      // Status indicator LEDs (Green, Blue, occasional Amber)
      const ledColors = ['#10b981', '#38bdf8', '#2563eb', '#10b981'];
      for (let l = 0; l < 4; l++) {
        ctx.fillStyle = ledColors[l % ledColors.length];
        ctx.beginPath();
        ctx.arc(170 + l * 14, y + 25, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  // --- 4. LIGHTING & ENVIRONMENT ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  // Moving flight searchlight (attached to camera position in animate loop)
  const flightSpot = new THREE.PointLight(0x38bdf8, 3.5, 35);
  scene.add(flightSpot);

  const fillLight = new THREE.DirectionalLight(0x2563eb, 1.2);
  fillLight.position.set(20, 40, 20);
  scene.add(fillLight);

  // --- 5. BUILD 3D ZONES ALONG THE PIPELINE ---

  // [GLOBAL]: Infinite Architectural Cyberspace Floor Grid
  const floorGridGeo = new THREE.PlaneGeometry(80, 240, 40, 120);
  const floorGridMat = new THREE.MeshBasicMaterial({
    color: 0x1e3a8a,
    wireframe: true,
    transparent: true,
    opacity: 0.18
  });
  const floorGrid = new THREE.Mesh(floorGridGeo, floorGridMat);
  floorGrid.rotation.x = -Math.PI / 2;
  floorGrid.position.set(0, -0.5, -45);
  scene.add(floorGrid);

  // [ZONA 1]: SYSTEM ENTRY CORE & GATE (Z: 18 -> 4)
  const zone1Group = new THREE.Group();
  scene.add(zone1Group);

  // Dual Icosahedron Core
  const coreInnerGeo = new THREE.IcosahedronGeometry(1.6, 1);
  const coreInnerMat = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    emissive: 0x1e40af,
    emissiveIntensity: 0.6,
    metalness: 0.8,
    roughness: 0.2
  });
  const coreInner = new THREE.Mesh(coreInnerGeo, coreInnerMat);
  coreInner.position.set(4.2, 3.2, 12);
  zone1Group.add(coreInner);

  const coreOuterGeo = new THREE.IcosahedronGeometry(2.4, 2);
  const coreOuterMat = new THREE.MeshBasicMaterial({
    color: 0x60a5fa,
    wireframe: true,
    transparent: true,
    opacity: 0.5
  });
  const coreOuter = new THREE.Mesh(coreOuterGeo, coreOuterMat);
  coreOuter.position.copy(coreInner.position);
  zone1Group.add(coreOuter);

  // Entry Gateway Portal Arch
  const portalArchGeo = new THREE.TorusGeometry(6, 0.1, 16, 60, Math.PI);
  const portalArchMat = new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.7 });
  const portalArch = new THREE.Mesh(portalArchGeo, portalArchMat);
  portalArch.position.set(0, -0.5, 4);
  zone1Group.add(portalArch);

  // [ZONA 2]: INFRASTRUCTURE SERVER RACK CORRIDOR (Z: 0 -> -28)
  const zone2Group = new THREE.Group();
  scene.add(zone2Group);

  const rackTexture = createServerRackTexture();
  const rackGeo = new THREE.BoxGeometry(1.4, 5.5, 2.2);
  const rackFaceMat = new THREE.MeshStandardMaterial({
    map: rackTexture,
    roughness: 0.4,
    metalness: 0.6
  });
  const rackChassisMat = new THREE.MeshStandardMaterial({
    color: 0x090d16,
    roughness: 0.8,
    metalness: 0.3
  });

  const rackMaterials = [
    rackChassisMat, rackChassisMat, // Right, Left
    rackChassisMat, rackChassisMat, // Top, Bottom
    rackFaceMat, rackFaceMat        // Front, Back
  ];

  // Spawn server monoliths along the S-curve corridor
  const rackPositions = [
    // Left Corridor Wall
    { x: -8.0, z: -2, rotY: 0.2 },
    { x: -7.5, z: -8, rotY: 0.1 },
    { x: -6.8, z: -14, rotY: -0.1 },
    { x: -6.0, z: -20, rotY: -0.2 },
    { x: -5.5, z: -26, rotY: -0.3 },
    // Right Corridor Wall
    { x: -1.0, z: -2, rotY: -0.2 },
    { x: -0.5, z: -8, rotY: -0.1 },
    { x: 0.2, z: -14, rotY: 0.1 },
    { x: 1.0, z: -20, rotY: 0.2 },
    { x: 1.8, z: -26, rotY: 0.3 }
  ];

  rackPositions.forEach((pos) => {
    const rack = new THREE.Mesh(rackGeo, rackMaterials);
    rack.position.set(pos.x, 2.2, pos.z);
    rack.rotation.y = pos.rotY;
    zone2Group.add(rack);
  });

  // Fiber Optic Overhead Beams
  const fiberCurve1 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-7.5, 4.8, 2),
    new THREE.Vector3(-6.5, 5.2, -12),
    new THREE.Vector3(-4.5, 5.0, -26)
  ]);
  const fiberGeo = new THREE.TubeGeometry(fiberCurve1, 40, 0.05, 8, false);
  const fiberMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8 });
  const fiberMesh = new THREE.Mesh(fiberGeo, fiberMat);
  zone2Group.add(fiberMesh);

  // [ZONA 3]: DATA ARCHITECTURE CHAMBER & SATELLITES (Z: -30 -> -56)
  const zone3Group = new THREE.Group();
  scene.add(zone3Group);

  // Central Database Cylinder Prism
  const dbCylinderGeo = new THREE.CylinderGeometry(2.4, 2.4, 4.2, 32, 4);
  const dbCylinderMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    emissive: 0x0369a1,
    emissiveIntensity: 0.5,
    wireframe: true,
    transparent: true,
    opacity: 0.6
  });
  const dbCylinder = new THREE.Mesh(dbCylinderGeo, dbCylinderMat);
  dbCylinder.position.set(4.5, 3.8, -45);
  zone3Group.add(dbCylinder);

  // Inner Solid Data Column
  const dbSolidGeo = new THREE.CylinderGeometry(1.6, 1.6, 3.8, 16);
  const dbSolidMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.2,
    metalness: 0.9
  });
  const dbSolid = new THREE.Mesh(dbSolidGeo, dbSolidMat);
  dbSolid.position.copy(dbCylinder.position);
  zone3Group.add(dbSolid);

  // 6 Satellite Tech Nodes Orbiting Central DB
  const techNodes = [];
  const nodeNames = ['Laravel 11', 'PostgreSQL', 'Docker', 'Livewire', 'Flutter', 'Pentaho ETL'];
  const nodeCount = 6;
  const orbitRadius = 4.8;

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const satGeo = new THREE.OctahedronGeometry(0.45);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.3
    });
    const sat = new THREE.Mesh(satGeo, satMat);
    sat.userData = { angle: angle, radius: orbitRadius, baseSpeed: 0.008 + i * 0.002, name: nodeNames[i] };
    zone3Group.add(sat);
    techNodes.push(sat);
  }

  // [ZONA 4]: SHIPPED PRODUCTION CLOUD DECK (Z: -60 -> -90)
  const zone4Group = new THREE.Group();
  scene.add(zone4Group);

  // Texture Loader for real project screenshots
  const textureLoader = new THREE.TextureLoader();

  function createProjectBillboard(imagePath, posX, posY, posZ, rotY, titleText) {
    const group = new THREE.Group();
    group.position.set(posX, posY, posZ);
    group.rotation.y = rotY;

    // Metal Bezel Frame
    const bezelGeo = new THREE.BoxGeometry(5.4, 3.4, 0.12);
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    group.add(bezel);

    // Screenshot Screen Mesh
    const screenGeo = new THREE.PlaneGeometry(5.1, 3.1);
    textureLoader.load(
      imagePath,
      (tex) => {
        const screenMat = new THREE.MeshBasicMaterial({ map: tex });
        const screenMesh = new THREE.Mesh(screenGeo, screenMat);
        screenMesh.position.z = 0.07;
        group.add(screenMesh);
      },
      undefined,
      () => {
        // Fallback procedural blueprint if texture loading fails
        const fallbackMat = new THREE.MeshBasicMaterial({ color: 0x1e3a8a, wireframe: true });
        const fallbackMesh = new THREE.Mesh(screenGeo, fallbackMat);
        fallbackMesh.position.z = 0.07;
        group.add(fallbackMesh);
      }
    );

    // Neon Accent Border
    const borderGeo = new THREE.EdgesGeometry(bezelGeo);
    const borderMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const borderLines = new THREE.LineSegments(borderGeo, borderMat);
    group.add(borderLines);

    return group;
  }

  // Billboard 1: RentalBase SaaS (Left side)
  const bb1 = createProjectBillboard('./assets/images/rentalbase_mockup.png', -6.0, 5.0, -68, 0.25, 'RentalBase');
  zone4Group.add(bb1);

  // Billboard 2: BooyahHub Platform (Right side)
  const bb2 = createProjectBillboard('./assets/images/banteng_squad_mockup.png', 5.5, 5.4, -78, -0.3, 'BooyahHub');
  zone4Group.add(bb2);

  // Billboard 3: Lab SE Polinema (Left side)
  const bb3 = createProjectBillboard('./assets/images/lab_se_mockup.png', -5.5, 6.0, -88, 0.2, 'Lab SE CMS');
  zone4Group.add(bb3);

  // [ZONA 5]: COMMAND TERMINAL APEX (Z: -95 -> -120)
  // Overhead panoramic array of high-altitude starfield particles
  const starfieldGeo = new THREE.BufferGeometry();
  const starCount = 1200;
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 80;
    starPositions[i + 1] = Math.random() * 40 - 5;
    starPositions[i + 2] = (Math.random() - 0.5) * 160 - 40;
  }

  starfieldGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starfieldMat = new THREE.PointsMaterial({
    color: 0x93c5fd,
    size: 0.06,
    transparent: true,
    opacity: 0.75
  });
  const starfield = new THREE.Points(starfieldGeo, starfieldMat);
  scene.add(starfield);

  // --- 6. SCROLL & FLIGHT DYNAMICS (Lerp & Waypoint Sync) ---
  let scrollProgress = 0;
  let targetProgress = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let boostMultiplier = 1;

  // Listen to window scroll
  function updateScrollTarget() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      targetProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    }
  }

  window.addEventListener('scroll', updateScrollTarget, { passive: true });

  // Mouse Parallax listener
  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Keyboard Speed Boost (Hold Spacebar to accelerate)
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.repeat && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      boostMultiplier = 2.5;
      const boostBadge = document.getElementById('hud-boost-badge');
      if (boostBadge) boostBadge.classList.remove('hidden');
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
      boostMultiplier = 1;
      const boostBadge = document.getElementById('hud-boost-badge');
      if (boostBadge) boostBadge.classList.add('hidden');
    }
  });

  // Waypoint Rail Auto-Scroll buttons
  const waypoints = [
    { id: 'sec-entry', progress: 0.0 },
    { id: 'sec-journey', progress: 0.25 },
    { id: 'sec-stack', progress: 0.5 },
    { id: 'sec-works', progress: 0.75 },
    { id: 'sec-contact', progress: 1.0 }
  ];

  window.navigateToZone = function (index) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = waypoints[index].progress * maxScroll;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  // --- 7. HUD TELEMETRY UPDATE ---
  const telemetryZone = document.getElementById('hud-zone-name');
  const telemetryCoords = document.getElementById('hud-coords');
  const telemetryProgress = document.getElementById('hud-progress');
  const fpsDisplay = document.getElementById('hud-fps');
  const waypointIndicators = document.querySelectorAll('.waypoint-dot');

  let lastTime = performance.now();
  let frameCount = 0;
  let currentFps = 60;

  function updateHUD(camPos, progress) {
    if (telemetryCoords) {
      telemetryCoords.textContent = `X:${camPos.x.toFixed(1)} Y:${camPos.y.toFixed(1)} Z:${camPos.z.toFixed(1)}`;
    }
    if (telemetryProgress) {
      telemetryProgress.textContent = `${Math.round(progress * 100)}%`;
    }

    // Determine current active zone name
    let zoneTitle = 'ZONE 01 // SYSTEM ENTRY';
    let activeIdx = 0;

    if (progress >= 0.85) {
      zoneTitle = 'ZONE 05 // COMMAND TERMINAL';
      activeIdx = 4;
    } else if (progress >= 0.6) {
      zoneTitle = 'ZONE 04 // PRODUCTION CLOUD DECK';
      activeIdx = 3;
    } else if (progress >= 0.35) {
      zoneTitle = 'ZONE 03 // DATA ARCHITECTURE';
      activeIdx = 2;
    } else if (progress >= 0.12) {
      zoneTitle = 'ZONE 02 // SERVER INFRASTRUCTURE';
      activeIdx = 1;
    }

    if (telemetryZone) {
      telemetryZone.textContent = zoneTitle;
    }

    // Update Waypoint dot active state
    waypointIndicators.forEach((dot, idx) => {
      if (idx === activeIdx) {
        dot.classList.add('bg-blue-500', 'scale-125', 'ring-2', 'ring-blue-400/50');
        dot.classList.remove('bg-slate-700');
      } else {
        dot.classList.remove('bg-blue-500', 'scale-125', 'ring-2', 'ring-blue-400/50');
        dot.classList.add('bg-slate-700');
      }
    });
  }

  // --- 8. RESIZE HANDLER ---
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  // --- 9. MAIN ANIMATION LOOP (60 FPS) ---
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // FPS calculation
    frameCount++;
    const now = performance.now();
    if (now - lastTime >= 500) {
      currentFps = Math.round((frameCount * 1000) / (now - lastTime));
      if (fpsDisplay) fpsDisplay.textContent = `${currentFps} FPS`;
      frameCount = 0;
      lastTime = now;
    }

    // Smooth inertia lerp for flight path
    scrollProgress += (targetProgress - scrollProgress) * (0.065 * boostMultiplier);
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Sample camera position from spline
    const t = Math.max(0, Math.min(0.999, scrollProgress));
    const pointOnPath = flightSpline.getPointAt(t);

    // Apply subtle mouse parallax offset to camera
    camera.position.x = pointOnPath.x + mouseX * 0.6;
    camera.position.y = pointOnPath.y + mouseY * 0.4;
    camera.position.z = pointOnPath.z;

    // Look-ahead target on the second spline for natural cinematic curves
    const lookTarget = lookSpline.getPointAt(Math.min(0.999, t + 0.04));
    lookTarget.x += mouseX * 0.3;
    lookTarget.y += mouseY * 0.2;
    camera.lookAt(lookTarget);

    // Subtle banking/roll based on lateral curve velocity
    const tangent = flightSpline.getTangentAt(t);
    camera.rotation.z = -tangent.x * 0.15;

    // Attach flight light to camera
    flightSpot.position.copy(camera.position);

    // Idle Animations: Zone 1 Core
    coreInner.rotation.y += 0.008;
    coreInner.rotation.x += 0.005;
    coreOuter.rotation.y -= 0.005;

    // Idle Animations: Zone 3 Database Satellites Orbit
    techNodes.forEach((node) => {
      node.userData.angle += node.userData.baseSpeed;
      const nx = dbCylinder.position.x + Math.cos(node.userData.angle) * node.userData.radius;
      const nz = dbCylinder.position.z + Math.sin(node.userData.angle) * node.userData.radius;
      node.position.set(nx, dbCylinder.position.y + Math.sin(node.userData.angle * 2) * 0.6, nz);
      node.rotation.x += 0.02;
      node.rotation.y += 0.03;
    });

    // Idle Animations: Billboards floating bobbing effect
    bb1.position.y = 5.0 + Math.sin(elapsedTime * 1.5) * 0.12;
    bb2.position.y = 5.4 + Math.cos(elapsedTime * 1.3) * 0.14;
    bb3.position.y = 6.0 + Math.sin(elapsedTime * 1.7) * 0.15;

    // Starfield gentle drift
    starfield.rotation.y = elapsedTime * 0.008;

    // Update Telemetry HUD
    updateHUD(camera.position, scrollProgress);

    renderer.render(scene, camera);
  }

  // Dismiss loader screen if present
  window.addEventListener('DOMContentLoaded', () => {
    updateScrollTarget();
    const loader = document.getElementById('init-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => loader.remove(), 600);
      }, 500);
    }
  });

  animate();
})();
