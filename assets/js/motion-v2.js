
/* V2 motion engine — scroll depth, layered parallax and section choreography */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;
  const sections = [...document.querySelectorAll('main > section')];
  const projectCards = [...document.querySelectorAll('.project-card')];
  let ticking = false;
  const clamp = (v,min,max) => Math.max(min,Math.min(max,v));
  function paintScroll(){
    ticking = false;
    const vh = innerHeight || 1;
    sections.forEach((section,i) => {
      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height/2;
      const distance = (center-vh/2)/(vh*.9);
      const proximity = 1-clamp(Math.abs(distance),0,1);
      section.style.setProperty('--section-depth', (proximity*34).toFixed(2)+'px');
      section.style.setProperty('--section-parallax', (clamp(distance,-1,1)*-13).toFixed(2)+'px');
      section.style.setProperty('--section-index', i);
    });
    projectCards.forEach(card=>{
      const r=card.getBoundingClientRect();
      const d=(r.top+r.height/2-vh/2)/(vh*.9);
      card.style.setProperty('--scroll-lift',(clamp(1-Math.abs(d),0,1)*-9).toFixed(2)+'px');
      card.style.setProperty('--scroll-tilt',(clamp(d,-1,1)*1.8).toFixed(2)+'deg');
    });
  }
  if(!reduce){
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(paintScroll)}},{passive:true});
    addEventListener('resize',paintScroll,{passive:true});
    paintScroll();
  }
  if(fine&&!reduce){
    document.querySelectorAll('.hero-visual,.project-art,.cap-card,.principle').forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        el.style.setProperty('--mx',(x*100).toFixed(1)+'%');
        el.style.setProperty('--my',(y*100).toFixed(1)+'%');
        if(el.classList.contains('hero-visual'))el.style.transform='perspective(1200px) rotateY('+(-5+x*9)+'deg) rotateX('+(-y*7)+'deg) translateZ(15px)';
      },{passive:true});
      el.addEventListener('pointerleave',()=>{if(el.classList.contains('hero-visual'))el.style.transform='';},{passive:true});
    });
  }
  const navLinks=[...document.querySelectorAll('.nav a[href^="#"]')];
  if('IntersectionObserver'in window){
    const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting)navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
    }),{rootMargin:'-35% 0px -55% 0px'});
    sections.forEach(s=>{if(s.id)navObserver.observe(s)});
  }
  // Stagger each card into the viewport for a deliberate, dimensional reveal.
  document.querySelectorAll('.capability-grid,.principles,.tool-groups,.journey-line').forEach(group=>{
    [...group.children].forEach((child,i)=>child.style.transitionDelay=(Math.min(i,5)*85)+'ms');
  });
})();
