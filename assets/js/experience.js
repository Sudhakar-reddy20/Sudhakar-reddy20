import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canvas = document.querySelector("#security-scene");
const fallback = document.querySelector(".scene-fallback");

async function buildScene() {
  if (!canvas || !window.WebGLRenderingContext) return;
  const host = canvas.parentElement;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 8.8);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  } catch {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  scene.add(new THREE.AmbientLight(0xb8c6ff, 1.7));
  const key = new THREE.PointLight(0xd6ff54, 85, 20);
  key.position.set(3, 3, 4);
  scene.add(key);
  const rim = new THREE.PointLight(0xff755e, 95, 18);
  rim.position.set(-3, -2, -1);
  scene.add(rim);
  const blue = new THREE.PointLight(0x7184ff, 70, 16);
  blue.position.set(0, 3, -4);
  scene.add(blue);

  const group = new THREE.Group();
  scene.add(group);
  const shieldShape = new THREE.Shape();
  shieldShape.moveTo(0, 2.05);
  shieldShape.bezierCurveTo(.55, 1.78, 1.12, 1.55, 1.55, 1.45);
  shieldShape.lineTo(1.43, .15);
  shieldShape.bezierCurveTo(1.34, -.85, .55, -1.65, 0, -2.05);
  shieldShape.bezierCurveTo(-.55, -1.65, -1.34, -.85, -1.43, .15);
  shieldShape.lineTo(-1.55, 1.45);
  shieldShape.bezierCurveTo(-1.12, 1.55, -.55, 1.78, 0, 2.05);
  const geometry = new THREE.ExtrudeGeometry(shieldShape, { depth: .34, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: .12, bevelThickness: .12, curveSegments: 18 });
  geometry.center();
  const material = new THREE.MeshPhysicalMaterial({ color: 0x8274a8, metalness: .72, roughness: .22, clearcoat: 1, clearcoatRoughness: .12, transmission: .08, thickness: .6 });
  const shield = new THREE.Mesh(geometry, material);
  group.add(shield);

  const outline = new THREE.EdgesGeometry(geometry, 24);
  const wire = new THREE.LineSegments(outline, new THREE.LineBasicMaterial({ color: 0xd6ff54, transparent: true, opacity: .72 }));
  wire.scale.setScalar(1.012);
  group.add(wire);

  const emblemShape = new THREE.Shape();
  emblemShape.moveTo(0, .8);
  emblemShape.lineTo(.58, .5);
  emblemShape.lineTo(.5, -.08);
  emblemShape.quadraticCurveTo(.38, -.52, 0, -.76);
  emblemShape.quadraticCurveTo(-.38, -.52, -.5, -.08);
  emblemShape.lineTo(-.58, .5);
  emblemShape.closePath();
  const emblemGeo = new THREE.ShapeGeometry(emblemShape);
  const emblem = new THREE.Mesh(emblemGeo, new THREE.MeshBasicMaterial({ color: 0xd6ff54, transparent: true, opacity: .92, side: THREE.DoubleSide }));
  emblem.position.z = .34;
  group.add(emblem);
  const check = new THREE.Group();
  const checkMat = new THREE.MeshBasicMaterial({ color: 0x18151d });
  const a = new THREE.Mesh(new THREE.BoxGeometry(.12, .48, .04), checkMat);
  a.position.set(-.12, -.02, .38); a.rotation.z = -.72;
  const b = new THREE.Mesh(new THREE.BoxGeometry(.12, .78, .04), checkMat);
  b.position.set(.18, .12, .38); b.rotation.z = .72;
  check.add(a, b); group.add(check);

  const rings = [];
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.12 + i * .22, .008, 8, 160),
      new THREE.MeshBasicMaterial({ color: i === 1 ? 0xff755e : 0xd6ff54, transparent: true, opacity: .55 - i * .1 })
    );
    ring.rotation.x = Math.PI * (.34 + i * .12);
    ring.rotation.y = i * .7;
    ring.rotation.z = i * .45;
    scene.add(ring); rings.push(ring);
  }

  const count = window.innerWidth < 700 ? 380 : 720;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 2.8 + Math.random() * 3.4;
    const angle = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - .5) * 6;
    positions[i * 3 + 2] = (Math.random() - .5) * 4 - 1;
    const c = new THREE.Color(i % 5 === 0 ? 0xff755e : (i % 3 === 0 ? 0xd6ff54 : 0x9a8bc7));
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ size: .025, vertexColors: true, transparent: true, opacity: .8, sizeAttenuation: true }));
  scene.add(particles);

  let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
  host.addEventListener("pointermove", (event) => {
    const rect = host.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - .5) * 1.1;
    targetY = ((event.clientY - rect.top) / rect.height - .5) * .8;
  }, { passive: true });
  host.addEventListener("pointerleave", () => { targetX = 0; targetY = 0; }, { passive: true });

  function resize() {
    const w = Math.max(1, host.clientWidth), h = Math.max(1, host.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w < 500 ? 10.1 : 8.8;
    camera.updateProjectionMatrix();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host); resize();
  fallback?.classList.add("is-hidden");

  let frame = 0;
  function render() {
    if (document.hidden) { requestAnimationFrame(render); return; }
    frame += 1;
    pointerX += (targetX - pointerX) * .035;
    pointerY += (targetY - pointerY) * .035;
    if (!reduceMotion) {
      group.rotation.y = Math.sin(frame * .003) * .16 + pointerX * .3;
      group.rotation.x = Math.cos(frame * .002) * .08 + pointerY * .25;
      group.rotation.z = Math.sin(frame * .0015) * .035;
      group.position.y = Math.sin(frame * .012) * .08;
      rings.forEach((ring, i) => { ring.rotation.z += (i % 2 ? -1 : 1) * .0008; });
      particles.rotation.y += .00022;
      particles.rotation.x = pointerY * .035;
    } else {
      group.rotation.y = pointerX * .12;
      group.rotation.x = pointerY * .1;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
}
buildScene().catch(() => {});

const meter = document.querySelector(".scroll-meter");
const updateMeter = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (meter) meter.style.width = (max > 0 ? scrollY / max * 100 : 0) + "%";
};
addEventListener("scroll", updateMeter, { passive: true });
updateMeter();

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
}));

if ("IntersectionObserver" in window && !reduceMotion) {
  const targets = document.querySelectorAll(".section-index,.approach-heading,.approach-body,.work-card,.toolkit-grid,.timeline article,.contact-inner");
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  targets.forEach(el => { el.classList.add("reveal"); observer.observe(el); });
}