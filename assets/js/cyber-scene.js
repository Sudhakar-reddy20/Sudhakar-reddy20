import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const host = document.querySelector('.hero-stage');
if (host && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  try {
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.domElement.className = 'cyber-webgl';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    const globe = new THREE.Group();
    scene.add(globe);

    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(1.72, 48, 36),
      new THREE.MeshBasicMaterial({ color: 0x1b83bd, wireframe: true, transparent: true, opacity: 0.23 })
    );
    globe.add(shell);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1.68, 36, 28),
      new THREE.MeshBasicMaterial({ color: 0x061b35, transparent: true, opacity: 0.22 })
    );
    globe.add(core);

    const nodePositions = [];
    const nodeGeometry = new THREE.BufferGeometry();
    const count = 100;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      nodePositions.push(Math.cos(theta) * radius * 1.74, y * 1.74, Math.sin(theta) * radius * 1.74);
    }
    nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
    const nodes = new THREE.Points(nodeGeometry, new THREE.PointsMaterial({ color: 0x72eaff, size: 0.045, transparent: true, opacity: 0.9 }));
    globe.add(nodes);

    const linkPoints = [];
    for (let i = 0; i < count; i += 1) {
      for (let j = i + 1; j < count; j += 1) {
        const a = new THREE.Vector3(nodePositions[i * 3], nodePositions[i * 3 + 1], nodePositions[i * 3 + 2]);
        const b = new THREE.Vector3(nodePositions[j * 3], nodePositions[j * 3 + 1], nodePositions[j * 3 + 2]);
        if (a.distanceTo(b) < 0.52 && (i + j) % 3 === 0) linkPoints.push(a, b);
      }
    }
    const linkGeometry = new THREE.BufferGeometry().setFromPoints(linkPoints);
    globe.add(new THREE.LineSegments(linkGeometry, new THREE.LineBasicMaterial({ color: 0x2b9edb, transparent: true, opacity: 0.22 })));

    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x58e6ff, wireframe: true, transparent: true, opacity: 0.24 });
    const orbitA = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.008, 6, 180), orbitMaterial);
    orbitA.rotation.set(1.02, 0.32, -0.28);
    globe.add(orbitA);
    const orbitB = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.006, 6, 180), new THREE.MeshBasicMaterial({ color: 0x9d8cff, wireframe: true, transparent: true, opacity: 0.2 }));
    orbitB.rotation.set(0.25, 1.1, 0.7);
    globe.add(orbitB);

    const starPositions = [];
    for (let i = 0; i < 240; i++) {
      starPositions.push((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 5 - 1);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    scene.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0x6ccfff, size: 0.012, transparent: true, opacity: 0.5 })));

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    const onPointer = (event) => {
      const rect = host.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.34;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.22;
    };
    host.addEventListener('pointermove', onPointer, { passive: true });

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const clock = new THREE.Clock();
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;
      globe.rotation.y = t * 0.105 + pointerX;
      globe.rotation.x = Math.sin(t * 0.22) * 0.08 + pointerY;
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('pagehide', () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener('pointermove', onPointer);
      renderer.dispose();
    }, { once: true });
  } catch (error) {
    console.warn('3D scene could not initialize; the static SOC interface remains available.', error);
  }
}
