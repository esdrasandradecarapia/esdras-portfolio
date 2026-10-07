/*
 * Fundo animado: rede de nós em <canvas>, inspirada em espaços de embeddings.
 * Respeita prefers-reduced-motion (desenha um quadro estático).
 */
(function(){
  const c = document.getElementById("bgfx"); if(!c) return;
  const ctx = c.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, dpr, pts = [];
  function init(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr;
    const count = Math.round(Math.min(70, (innerWidth * innerHeight) / 22000));
    pts = Array.from({length: count}, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .18 * dpr, vy: (Math.random() - .5) * .18 * dpr,
      g: Math.random() < .12
    }));
  }
  function draw(){
    ctx.clearRect(0, 0, w, h);
    const max = 150 * dpr;
    for (let i = 0; i < pts.length; i++){
      const p = pts[i];
      if (!reduce){ p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1; }
      for (let j = i + 1; j < pts.length; j++){
        const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy);
        if (d < max){
          ctx.strokeStyle = `rgba(162,107,255,${(1 - d / max) * .22})`;
          ctx.lineWidth = dpr * .7;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      ctx.fillStyle = p.g ? "rgba(61,255,143,.85)" : "rgba(162,107,255,.6)";
      ctx.beginPath(); ctx.arc(p.x, p.y, (p.g ? 1.8 : 1.3) * dpr, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduce) requestAnimationFrame(draw);
  }
  init(); draw();
  let t; addEventListener("resize", () => { clearTimeout(t); t = setTimeout(() => { init(); if (reduce) draw(); }, 150); });
})();
