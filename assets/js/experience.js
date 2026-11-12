const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const preloader = document.querySelector('.preloader');
window.addEventListener('load', () => setTimeout(() => preloader?.classList.add('done'), 450), { once: true });
setTimeout(() => preloader?.classList.add('done'), 2200);

const topbar = document.querySelector('.topbar');
const progress = document.querySelector('.scroll-progress');
const glow = document.querySelector('.cursor-glow');
const syncScroll = () => {
  topbar?.classList.toggle('scrolled', window.scrollY > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
};
window.addEventListener('scroll', syncScroll, { passive: true });
syncScroll();
if (glow && matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  reveals.forEach(el => revealObserver.observe(el));
} else reveals.forEach(el => el.classList.add('visible'));

if (matchMedia('(pointer:fine)').matches && !reduceMotion) {
  document.querySelectorAll('.cap-card,.project-card,.principle').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = 'perspective(1100px) rotateY(' + (x * 3.5) + 'deg) rotateX(' + (-y * 3) + 'deg) translateY(-3px)';
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = 'translate(' + ((e.clientX-r.left-r.width/2)*.08) + 'px,' + ((e.clientY-r.top-r.height/2)*.08) + 'px)';
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();

async function buildGlobe() {
  const canvas = document.querySelector('#security-globe');
  const stage = document.querySelector('#globe-stage');
  if (!canvas || !stage || reduceMotion) return;
  try {
    const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.7));
    renderer.setSize(stage.clientWidth, stage.clientHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, stage.clientWidth/stage.clientHeight, .1, 100);
    camera.position.set(0, 0, 7.4);
    const group = new THREE.Group();
    scene.add(group);
    const globe = new THREE.Mesh(new THREE.SphereGeometry(1.55, 64, 48), new THREE.MeshBasicMaterial({ color:0x12639b, wireframe:true, transparent:true, opacity:.32 }));
    group.add(globe);
    const inner = new THREE.Mesh(new THREE.SphereGeometry(1.5, 48, 36), new THREE.MeshBasicMaterial({ color:0x06172b, transparent:true, opacity:.68 }));
    group.add(inner);
    const positions = [];
    const total = 220;
    for(let i=0;i<total;i++){
      const y=1-(i/(total-1))*2;
      const radius=Math.sqrt(1-y*y);
      const theta=Math.PI*(3-Math.sqrt(5))*i;
      positions.push(Math.cos(theta)*radius*1.57,y*1.57,Math.sin(theta)*radius*1.57);
    }
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    group.add(new THREE.Points(nodeGeometry,new THREE.PointsMaterial({color:0x8ceeff,size:.035,transparent:true,opacity:.95})));
    const vectors = [];
    for(let i=0;i<total;i+=2){
      for(let j=i+1;j<total;j+=1){
        const a=new THREE.Vector3(positions[i*3],positions[i*3+1],positions[i*3+2]);
        const b=new THREE.Vector3(positions[j*3],positions[j*3+1],positions[j*3+2]);
        if(a.distanceTo(b)<.42 && (i+j)%4===0) vectors.push(a,b);
      }
    }
    const linkGeometry=new THREE.BufferGeometry().setFromPoints(vectors);
    group.add(new THREE.LineSegments(linkGeometry,new THREE.LineBasicMaterial({color:0x398de5,transparent:true,opacity:.23})));
    const orbit1=new THREE.Mesh(new THREE.TorusGeometry(2.05,.008,6,180),new THREE.MeshBasicMaterial({color:0x5de5ff,transparent:true,opacity:.45}));
    orbit1.rotation.set(1.15,.2,-.3);group.add(orbit1);
    const orbit2=new THREE.Mesh(new THREE.TorusGeometry(1.92,.006,6,180),new THREE.MeshBasicMaterial({color:0x9b82ff,transparent:true,opacity:.34}));
    orbit2.rotation.set(.3,1.15,.7);group.add(orbit2);
    const starPos=[];
    for(let i=0;i<260;i++) starPos.push((Math.random()-.5)*8,(Math.random()-.5)*6,(Math.random()-.5)*4-1);
    const starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.Float32BufferAttribute(starPos,3));
    scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:0x8ebdff,size:.012,transparent:true,opacity:.65})));
    let px=0,py=0,tx=0,ty=0;
    const onPointer=e=>{const r=stage.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*.38;ty=((e.clientY-r.top)/r.height-.5)*.28;};
    stage.addEventListener('pointermove',onPointer,{passive:true});
    const resize=()=>{const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};
    const observer=new ResizeObserver(resize);observer.observe(stage);
    let frame=0,active=true;
    const animate=()=>{
      if(!active)return;
      frame=requestAnimationFrame(animate);
      px+=(tx-px)*.035;py+=(ty-py)*.035;
      group.rotation.y+=.0018;group.rotation.x=py;group.rotation.z=px*.3;
      orbit1.rotation.z+=.0014;orbit2.rotation.y-=.001;
      renderer.render(scene,camera);
    };
    animate();
    document.addEventListener('visibilitychange',()=>{if(document.hidden){active=false;cancelAnimationFrame(frame);}else if(!active){active=true;animate();}});
    window.addEventListener('pagehide',()=>{active=false;cancelAnimationFrame(frame);observer.disconnect();stage.removeEventListener('pointermove',onPointer);renderer.dispose();},{once:true});
  } catch (error) {
    console.warn('3D visualization unavailable; using the static fallback.', error);
    canvas.style.display='none';
  }
}
buildGlobe();
