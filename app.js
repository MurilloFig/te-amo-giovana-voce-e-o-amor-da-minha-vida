
const slides = [
  { title:"Nossa Retrospectiva 💚", desc:"Oiii amor, aqui é a nossa retrospectiva personalizada, feita com muito carinho pra relembrar os momentos que mais marcaram a gente. Espero que você goste tanto quanto eu gostei de criar isso pra nós! 😊", photo:"assets/04.jpg", chips:["Momentos","100% a nossa vibe","feito com carinho"] },
  { title:"O dia que eu pensei: é ela.", desc:"A cada momento que lhe via, meu coração parava por um segundo, e eu pensava: \"É ela\". E eu acho que nunca estive tão certo na minha vida kkkkk. Das brincadeiras mais bobas às conversas mais profundas, tudo ficou mais divertido. Meu mundo virou outro com você — eu esqueci o significado de tristeza e aprendi o que significa o amor.", photo:"assets/02.jpg", chips:["Amor","coração quentinho","memória favorita"] },
  { title:"Quando nos unimos muito mais do que só pra experimentar um lugar novo", desc:"Esse dia tão especial eu realmente não consigo descrever em palavras o quanto foi incrível. A gente se divertiu tanto, riu tanto… e o melhor de tudo é que a gente tava junto, descobrindo coisas novas e criando memórias pra sempre. Foi tão perfeito que eu queria viver de novo só pra sentir aquela felicidade outra vez.", photo:"assets/03.jpg", chips:["abraço","presença","paz"] },
  { title:"De aventuras no mundo real até as mais épicas no Minecraft kkkkkk", desc:"Cada momento com você é uma aventura — explorando lugares novos ou construindo mundos no Minecraft. Eu amo como a gente transforma qualquer situação em algo especial só por estar junto. Você é minha parceira perfeita, e eu mal posso esperar pelas próximas jornadas.", photo:"assets/01.jpg", chips:["risadas","olhar cúmplice","sem esforço"] },
  { title:"Da mesma seleção de fotos do dia perfeito", desc:"Se existisse um botão de “repetir esse instante”, eu apertaria sem pensar. Reviveria esse dia todos os dias, em cada hora, cada minuto e cada segundo.", photo:"assets/05.jpg", chips:["a gente","cuidado","sintonia"] },
  { title:"As risadas mais gostosas da minha vida", desc:"Quando eu achava que não dava pra sentir mais amor, você me surpreendia com uma risada tão gostosa que eu me apaixonava de novo. Eu amo como a gente se diverte e como cada momento com você é cheio de alegria. Você é a razão do meu sorriso.", photo:"assets/06.jpg", chips:["∞ saudade","risada alta","beijo bônus"] },
  { title:"Os maiores farmadores de aura do mundo", desc:"A gente combina tanto que até farmando aura e mogando os betinhas a gente vira lenda kkkkk — mas o melhor é fazer tudo isso com você do lado.", photo:"assets/07.jpeg", chips:["aura","parceria","mogador nível 1000"] },
  { title:"Um amor que crescia cada vez mais", desc:"Daqui em diante parecia que, a cada encontro, o amor só crescia. Cada momento virava uma nova chance de me apaixonar de novo. E é isso que torna a gente tão especial: sempre descobrindo mais, e ficando mais forte com o tempo.", video:"assets/video8.mp4", chips:["simples","verdadeiro","bonito"] },
  { title:"Primeiro BOSS", desc:"Foi engraçado te ver interagindo com minha mãe (ou tentando kkk) e principalmente seu nervosismo com meu primo perturbando. Mas foi lindo ver o quanto você se importa e se esforça pra agradar quem é importante pra mim. Isso só me fez te amar ainda mais.", photo:"assets/09.jpeg", chips:["fofura","coragem","família"] },
  { title:"Obrigada por ser você ✨", desc:"Só posso agradecer por cada momento, cada risada, cada abraço, cada conversa… e por você ser essa pessoa incrível. Eu me sinto muito sortudo. E eu mal posso esperar por tudo que ainda vamos viver. Te amo muito, meu amor. ❤️", photo:"assets/10.jpg", chips:["fim (por enquanto)","te adoro","nós"], isFinal:true }
];

const scroller = document.getElementById("scroller");
const progress = document.getElementById("progress");
const count = document.getElementById("count");

const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const muteBtn = document.getElementById("muteBtn");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");

let musicEnabled = false;

function buildSlides(){
  scroller.innerHTML = "";
  slides.forEach((s, i) => {
    const section = document.createElement("section");
    section.className = "section" + (s.isFinal ? " final" : "");
    section.dataset.index = String(i);

    const card = document.createElement("div");
    card.className = "card" + (i % 2 === 1 ? " reverse" : "");

    const media = document.createElement("div");
    media.className = "media media-reveal";

    const isVideo = (s.video || s.photo || "").toLowerCase().endsWith(".mp4");
    if (isVideo) {
      const video = document.createElement("video");
      video.src = s.video || s.photo;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata";
      media.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = s.photo;
      img.alt = "Mídia do slide " + (i+1);
      media.appendChild(img);
    }

    const content = document.createElement("div");
    content.className = "content";

    const title = document.createElement("h1");
    title.className = "reveal";
    title.textContent = s.title ?? "";

    const desc = document.createElement("p");
    desc.className = "desc reveal";

    if (s.isFinal){
      const chunks = (s.desc ?? "").split(/(?<=\.)\s+/).filter(Boolean);
      const lines = chunks.length ? chunks : [s.desc ?? ""];
      lines.forEach((txt) => {
        const span = document.createElement("span");
        span.className = "cinema-line";
        span.textContent = txt + " ";
        desc.appendChild(span);
      });
    } else {
      desc.textContent = s.desc ?? "";
    }

    const chips = document.createElement("div");
    chips.className = "chips";
    (s.chips ?? []).forEach(t => {
      const chip = document.createElement("span");
      chip.className = "chip reveal";
      chip.textContent = t;
      chips.appendChild(chip);
    });

    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(chips);

    card.appendChild(media);
    card.appendChild(content);
    section.appendChild(card);
    scroller.appendChild(section);
  });
}

function buildProgress(){
  progress.innerHTML = "";
  for(let i=0;i<slides.length;i++){
    const bar = document.createElement("div");
    bar.className = "bar";
    const fill = document.createElement("i");
    fill.style.width = "0%";
    bar.appendChild(fill);
    progress.appendChild(bar);
  }
}

function setProgress(activeIndex){
  const bars = progress.querySelectorAll(".bar > i");
  bars.forEach((fill, i) => {
    fill.style.width = i <= activeIndex ? "100%" : "0%";
  });
  if (count) count.textContent = `${activeIndex+1}/${slides.length}`;
}

function scrollToIndex(i){
  const sections = scroller.querySelectorAll(".section");
  const target = sections[i];
  if (!target) return;
  target.scrollIntoView({behavior: "smooth", block: "start"});
}

function getActiveIndex(){
  const sections = Array.from(scroller.querySelectorAll(".section"));
  const mid = scroller.scrollTop + scroller.clientHeight/2;
  let best = 0;
  let bestDist = Infinity;
  sections.forEach((sec, i) => {
    const center = sec.offsetTop + sec.offsetHeight/2;
    const d = Math.abs(center - mid);
    if (d < bestDist){ bestDist = d; best = i; }
  });
  return best;
}

function setupObserver(){
  const sections = scroller.querySelectorAll(".section");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const sec = entry.target;
      if (entry.isIntersecting) sec.classList.add("active");
      else sec.classList.remove("active");
    });
  }, { root: scroller, threshold: 0.35 });
  sections.forEach(sec => obs.observe(sec));
}

function applyParallax(){
  const sections = Array.from(scroller.querySelectorAll(".section"));
  const viewMid = scroller.scrollTop + scroller.clientHeight/2;
  sections.forEach(sec => {
    const rectMid = sec.offsetTop + sec.offsetHeight/2;
    const delta = (rectMid - viewMid) / sec.offsetHeight;
    const mediaEl = sec.querySelector(".media img, .media video");
    if (!mediaEl) return;
    const translate = Math.max(-14, Math.min(14, delta * 28));
    mediaEl.style.transform = `scale(1.06) translateY(${translate}px)`;
  });
}

function setupControls(){
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const toTop = document.getElementById("toTop");
  const toEnd = document.getElementById("toEnd");

  prevBtn?.addEventListener("click", () => {
    const i = getActiveIndex();
    scrollToIndex(Math.max(0, i-1));
  });

  nextBtn?.addEventListener("click", () => {
    const i = getActiveIndex();
    scrollToIndex(Math.min(slides.length-1, i+1));
  });

  toTop?.addEventListener("click", () => scrollToIndex(0));
  toEnd?.addEventListener("click", () => scrollToIndex(slides.length-1));

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " "){
      e.preventDefault();
      scrollToIndex(Math.min(slides.length-1, getActiveIndex()+1));
    }
    if (e.key === "ArrowLeft"){
      e.preventDefault();
      scrollToIndex(Math.max(0, getActiveIndex()-1));
    }
  });

  let ticking = false;
  scroller.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setProgress(getActiveIndex());
      applyParallax();
      ticking = false;
    });
  }, {passive:true});
}

/* Music */
function safePlay(){
  if (!bgMusic) return;
  bgMusic.volume = 0.28;
  const p = bgMusic.play();
  if (p && p.catch) p.catch(() => {});
}

function updateMusicUI(){
  if (!musicLabel) return;
  musicLabel.textContent = (!musicEnabled || bgMusic?.paused) ? "Play" : "Pause";
}

function hideIntro(){
  intro?.classList.add("hidden");
  setTimeout(() => intro?.remove(), 700);
  scroller.style.pointerEvents = "auto";
  applyParallax();
}

startBtn?.addEventListener("click", () => {
  if (musicEnabled) safePlay();
  hideIntro();
});

muteBtn?.addEventListener("click", () => {
  musicEnabled = !musicEnabled;
  muteBtn.textContent = musicEnabled ? "Som: On" : "Som: Off";
  if (musicEnabled) safePlay();
  else bgMusic?.pause();
  updateMusicUI();
});

musicBtn?.addEventListener("click", () => {
  musicEnabled = true;
  if (!bgMusic) return;
  if (bgMusic.paused) safePlay();
  else bgMusic.pause();
  updateMusicUI();
});

window.addEventListener("pointerdown", () => {
  if (musicEnabled) safePlay();
  updateMusicUI();
}, { once:true });

/* Particles */
function initParticles(){
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const DPR = Math.min(2, window.devicePixelRatio || 1);
  let w = 0, h = 0;
  const dots = [];
  const DOTS = 60;

  function resize(){
    w = canvas.width = Math.floor(window.innerWidth * DPR);
    h = canvas.height = Math.floor(window.innerHeight * DPR);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }
  function rand(min, max){ return Math.random() * (max - min) + min; }

  function seed(){
    dots.length = 0;
    for(let i=0;i<DOTS;i++){
      dots.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.9*DPR, 2.2*DPR),
        vx: rand(-0.22*DPR, 0.22*DPR),
        vy: rand(-0.18*DPR, 0.18*DPR),
        a: rand(0.12, 0.32)
      });
    }
  }

  function step(){
    ctx.clearRect(0,0,w,h);

    for(let i=0;i<dots.length;i++){
      const a = dots[i];
      for(let j=i+1;j<dots.length;j++){
        const b = dots[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 150*DPR){
          const alpha = (1 - d/(150*DPR)) * 0.10;
          ctx.strokeStyle = `rgba(229,231,235,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    dots.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;

      ctx.fillStyle = `rgba(229,231,235,${p.a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    });

    requestAnimationFrame(step);
  }

  resize(); seed(); step();
  window.addEventListener("resize", () => { resize(); seed(); });
}

/* Boot */
function boot(){
  scroller.style.pointerEvents = "none";
  buildSlides();
  buildProgress();
  setupObserver();
  setupControls();
  setProgress(0);
  applyParallax();
  initParticles();
  updateMusicUI();
}
boot();


function setupLoveFinale(){
  const finalSection = document.querySelector(".section.final");
  if (!finalSection) return;

  const card = finalSection.querySelector(".card");
  if (!card) return;

  // cria overlay UMA vez, dentro do card (não no section)
  if (!card.querySelector(".love-overlay")){
    card.style.position = "relative";

    card.insertAdjacentHTML("beforeend", `
      <div class="love-overlay" aria-hidden="true">

        <!-- DESENHO DE CRIANÇA (FUNDO) -->
        <svg class="love-bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
          <!-- chão -->
          <path class="draw" d="M70 520 C 250 500, 500 540, 930 515" />

          <!-- menino -->
          <circle class="draw" cx="410" cy="355" r="28"/>
          <path class="draw" d="M410 383 L410 460" />
          <path class="draw" d="M410 410 L375 440" />
          <path class="draw" d="M410 410 L445 440" />
          <path class="draw" d="M410 460 L385 505" />
          <path class="draw" d="M410 460 L435 505" />

          <!-- menina -->
          <circle class="draw" cx="590" cy="355" r="28"/>
          <path class="draw" d="M570 340 C585 310, 615 310, 630 340" />
          <path class="draw" d="M590 383 L590 460" />
          <path class="draw" d="M590 410 L555 440" />
          <path class="draw" d="M590 410 L625 440" />
          <path class="draw" d="M590 460 L565 505" />
          <path class="draw" d="M590 460 L615 505" />

          <!-- mãos dadas -->
          <path class="draw" d="M445 440 C 485 430, 515 430, 555 440" />
        </svg>

        <!-- FITAS + CORAÇÃO -->
        <div class="love-stage">
          <svg class="love-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            <!-- fitas (entram e “viram” coração -> elas somem quando o coração começa) -->
            <path class="ribbon r1"
              d="M -40 40
                 C 120 90, 190 150, 260 210
                 C 340 280, 400 330, 455 345
                 C 480 352, 492 360, 500 370" />
            <path class="ribbon r2"
              d="M 1040 40
                 C 880 90, 810 150, 740 210
                 C 660 280, 600 330, 545 345
                 C 520 352, 508 360, 500 370" />

            <!-- coração (desenha depois das fitas) -->
            <path class="love-heart"
              d="M500 420
                 C 460 385, 420 360, 388 342
                 C 330 310, 320 235, 380 210
                 C 430 188, 470 230, 500 265
                 C 530 230, 570 188, 620 210
                 C 680 235, 670 310, 612 342
                 C 580 360, 540 385, 500 420" />
          </svg>

          <!-- papel -->
          <div class="paper" aria-hidden="true">
            <div class="paper-text">
              eu te amo meu amor <span class="red-heart">❤️</span>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  let timer = null;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target !== finalSection) return;

      if (entry.isIntersecting){
        timer = setTimeout(() => {
          finalSection.classList.add("show-love");
        }, 5000);
      } else {
        if (timer) clearTimeout(timer);
        timer = null;
        finalSection.classList.remove("show-love");
      }
    });
  }, { root: document.getElementById("scroller"), threshold: 0.55 });

  obs.observe(finalSection);
}

// chama depois do boot/buildSlides()
setupLoveFinale();