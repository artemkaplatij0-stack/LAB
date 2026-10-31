/**
 * ============================================================================
 * ІНТЕРАКТИВНИЙ ОСВІТНІЙ КУРС: СПИРТИ ТА ЕТАНОЛ (C₂H₅OH)
 * Повна клієнтська логіка SPA (Single Page Application)
 * Вільне конструювання молекули, динамічні зв'язки та гіперзвуковий варп-стрибок
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
   * 1. WEB AUDIO SOUND ENGINE (СИНТЕЗ ЗВУКІВ)
   * ========================================================================== */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.masterGain = null;
    }

    init() {
      if (this.ctx) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      try {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.24, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch (err) {
        console.warn('AudioContext init error:', err);
      }
    }

    _ensureAudio() {
      if (!this.ctx) this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    // Звук утворення хімічного зв'язку між двома атомами
    snapSound() {
      this._ensureAudio();
      if (!this.ctx || this.isMuted) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, t);
        osc.frequency.exponentialRampToValueAtTime(920, t + 0.04);
        osc.frequency.exponentialRampToValueAtTime(320, t + 0.09);

        gain.gain.setValueAtTime(0.24, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.09);
      } catch (e) {
        console.error(e);
      }
    }

    // Звук розриву зв'язку
    breakSound() {
      this._ensureAudio();
      if (!this.ctx || this.isMuted) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(340, t);
        osc.frequency.exponentialRampToValueAtTime(160, t + 0.07);

        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.07);
      } catch (e) {
        console.error(e);
      }
    }

    // Звук успішного складання всієї молекули (магічний спалах)
    reactionSound() {
      this._ensureAudio();
      if (!this.ctx || this.isMuted) return;
      try {
        const t = this.ctx.currentTime;
        const chord = [329.63, 440.0, 554.37, 659.25, 880.0, 1108.7];
        chord.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const noteTime = t + i * 0.05;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, noteTime);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.5, noteTime + 0.4);

          gain.gain.setValueAtTime(0.001, noteTime);
          gain.gain.linearRampToValueAtTime(0.22, noteTime + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(noteTime);
          osc.stop(noteTime + 0.45);
        });
      } catch (e) {
        console.error(e);
      }
    }

    // Звук виділення газу H2
    bubbleSound() {
      this._ensureAudio();
      if (!this.ctx || this.isMuted) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const f0 = 260 + Math.random() * 140;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f0, t);
        osc.frequency.exponentialRampToValueAtTime(f0 + 400, t + 0.065);

        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.065);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.065);
      } catch (e) {
        console.error(e);
      }
    }

    // Правильна відповідь
    correctSound() {
      this._ensureAudio();
      if (!this.ctx || this.isMuted) return;
      try {
        const t = this.ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.5];
        freqs.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const start = t + i * 0.04;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, start);

          gain.gain.setValueAtTime(0.2, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(start);
          osc.stop(start + 0.3);
        });
      } catch (e) {
        console.error(e);
      }
    }

    // Неправильна відповідь
    incorrectSound() {
      this._ensureAudio();
      if (!this.ctx || this.isMuted) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(170, t);
        osc.frequency.exponentialRampToValueAtTime(105, t + 0.22);

        gain.gain.setValueAtTime(0.16, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.22);
      } catch (e) {
        console.error(e);
      }
    }

    // Гіперпросторовий варп-розгін (Warp Drive acceleration)
    warpSound() {
      this._ensureAudio();
      if (!this.ctx || this.isMuted) return;
      try {
        const t = this.ctx.currentTime;

        // Основний наростаючий тон
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(85, t);
        osc.frequency.exponentialRampToValueAtTime(1800, t + 2.2);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(240, t);
        filter.frequency.exponentialRampToValueAtTime(4500, t + 2.2);

        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.35, t + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 2.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 2.4);

        // Низькочастотний космічний гул (sub-bass rumble)
        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(55, t);
        subOsc.frequency.linearRampToValueAtTime(130, t + 2.0);

        subGain.gain.setValueAtTime(0.01, t);
        subGain.gain.linearRampToValueAtTime(0.28, t + 0.9);
        subGain.gain.exponentialRampToValueAtTime(0.001, t + 2.2);

        subOsc.connect(subGain);
        subGain.connect(this.masterGain);
        subOsc.start(t);
        subOsc.stop(t + 2.2);
      } catch (e) {
        console.error(e);
      }
    }

    // Полум'я горіння
    fireSound() {
      this._ensureAudio();
      if (!this.ctx || this.isMuted) return;
      try {
        const t = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * 0.15;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.45));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(850 + Math.random() * 350, t);
        filter.Q.setValueAtTime(3, t);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(t);
        noise.stop(t + 0.15);
      } catch (e) {
        console.error(e);
      }
    }
  }

  /* ==========================================================================
   * 2. PARTICLE SYSTEM (ФОНОВІ ЧАСТИНКИ)
   * ========================================================================== */
  class ParticleSystem {
    constructor() {
      this.canvas = document.getElementById('particle-canvas');
      this.ctx = null;
      this.particles = [];
      this.particleCount = 75;
      this.animationFrameId = null;
      this.isRunning = false;

      this.colors = [
        'rgba(6, 182, 212, ',
        'rgba(16, 185, 129, ',
        'rgba(139, 92, 246, ',
        'rgba(56, 189, 248, '
      ];

      this.resize = this.resize.bind(this);
      this.animate = this.animate.bind(this);
    }

    init() {
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;

      this.resize();
      window.addEventListener('resize', this.resize);
      this.createParticles();
      this.start();
    }

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    createParticles() {
      this.particles = [];
      const w = this.canvas.width;
      const h = this.canvas.height;

      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: 1.5 + Math.random() * 2,
          colorBase: this.colors[Math.floor(Math.random() * this.colors.length)],
          alpha: 0.2 + Math.random() * 0.4,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          pulse: Math.random() * Math.PI * 2
        });
      }
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.animate();
    }

    stop() {
      this.isRunning = false;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }

    animate() {
      if (!this.isRunning || !this.ctx) return;

      const w = this.canvas.width;
      const h = this.canvas.height;
      this.ctx.clearRect(0, 0, w, h);

      const count = this.particles.length;
      for (let i = 0; i < count; i++) {
        const p1 = this.particles[i];
        for (let j = i + 1; j < count; j++) {
          const p2 = this.particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.18;
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(148, 163, 184, ${lineAlpha})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.stroke();
          }
        }
      }

      for (let i = 0; i < count; i++) {
        const p = this.particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;

        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;

        const dynamicAlpha = p.alpha + Math.sin(p.pulse) * 0.15;
        const radius = p.radius + Math.sin(p.pulse) * 0.4;

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, Math.max(0.5, radius), 0, Math.PI * 2);
        this.ctx.fillStyle = `${p.colorBase}${Math.max(0.05, dynamicAlpha)})`;
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = `${p.colorBase}0.6)`;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      }

      this.animationFrameId = requestAnimationFrame(this.animate);
    }
  }

  /* ==========================================================================
   * 3. XP SYSTEM (СИСТЕМА ДОСВІДУ)
   * ========================================================================== */
  class XPSystem {
    constructor(maxXP = 300) {
      this.xp = 0;
      this.maxXP = maxXP;
      this.xpValueEl = document.getElementById('xp-value');
      this.xpFillEl = document.getElementById('xp-fill');
      this.currentDisplayedXP = 0;

      this.updateDisplay();
    }

    addXP(amount) {
      if (typeof amount !== 'number' || amount <= 0) return;
      const targetXP = Math.min(this.maxXP, this.xp + amount);
      const actualAdded = targetXP - this.xp;
      this.xp = targetXP;

      this.showFloatingXPBadge(actualAdded > 0 ? actualAdded : amount);
      this.animateCounter(targetXP);
    }

    animateCounter(targetXP) {
      const duration = 650;
      const startXP = this.currentDisplayedXP;
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startXP + (targetXP - startXP) * easeOut);

        this.currentDisplayedXP = current;
        if (this.xpValueEl) {
          this.xpValueEl.textContent = `${current}`;
        }
        if (this.xpFillEl) {
          const pct = Math.min(100, (current / this.maxXP) * 100);
          this.xpFillEl.style.width = `${pct}%`;
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          this.currentDisplayedXP = targetXP;
          this.updateDisplay();
        }
      };

      requestAnimationFrame(step);
    }

    updateDisplay() {
      if (this.xpValueEl) {
        this.xpValueEl.textContent = `${this.xp}`;
      }
      if (this.xpFillEl) {
        const pct = Math.min(100, (this.xp / this.maxXP) * 100);
        this.xpFillEl.style.width = `${pct}%`;
      }
    }

    showFloatingXPBadge(amount) {
      if (!this.xpValueEl) return;
      const parent = this.xpValueEl.closest('.xp-container') || this.xpValueEl.parentElement;
      if (!parent) return;

      const badge = document.createElement('div');
      badge.className = 'floating-xp-badge';
      badge.textContent = `+${amount} XP`;

      if (getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
      }

      parent.appendChild(badge);

      requestAnimationFrame(() => {
        badge.style.transition = 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s ease-out';
        badge.style.transform = 'translateY(-24px) scale(1.15)';
        badge.style.opacity = '0';
      });

      setTimeout(() => {
        if (badge.parentNode) badge.parentNode.removeChild(badge);
      }, 850);
    }

    reset() {
      this.xp = 0;
      this.currentDisplayedXP = 0;
      this.updateDisplay();
    }
  }

  /* ==========================================================================
   * 4. FREEFORM CHEMICAL ASSEMBLY (САМОСТІЙНЕ РОЗСТАВЛЯННЯ АТОМІВ ТА ЗВ'ЯЗКІВ)
   * ========================================================================== */
  class FreeformAssemblySystem {
    constructor(soundEngine, xpSystem, onComplete) {
      this.soundEngine = soundEngine;
      this.xpSystem = xpSystem;
      this.onComplete = onComplete;

      this.formulaGrid = document.getElementById('formula-grid');
      this.assemblyContainer = document.getElementById('assembly-container');
      this.bondsGroup = document.getElementById('bonds-group');
      this.overlay = document.getElementById('intro-overlay');

      this.placedAtoms = new Map(); // id -> { id, type, x, y, vx, vy, el, bonds:Set }
      this.activeDrag = null;
      this.isLocked = false;
      this.rafId = null;

      // Валентності: C = 4, H = 1, OH = 1
      this.maxValence = { 'C': 4, 'H': 1, 'OH': 1 };

      this.handlePointerDown = this.handlePointerDown.bind(this);
      this.handlePointerMove = this.handlePointerMove.bind(this);
      this.handlePointerUp = this.handlePointerUp.bind(this);
      this.tick = this.tick.bind(this);
    }

    init() {
      if (!this.formulaGrid || !this.assemblyContainer) return;
      this.spawnAtoms();

      document.addEventListener('pointerdown', this.handlePointerDown);
      window.addEventListener('pointermove', this.handlePointerMove, { passive: false });
      window.addEventListener('pointerup', this.handlePointerUp);
      window.addEventListener('pointercancel', this.handlePointerUp);

      this.rafId = requestAnimationFrame(this.tick);
    }

    // Хаотичне розкидання всіх атомів по екрану (2 C, 1 OH, 5 H)
    spawnAtoms() {
      const types = ['C', 'C', 'OH', 'H', 'H', 'H', 'H', 'H'];
      const w = this.formulaGrid.clientWidth || window.innerWidth;
      const h = this.formulaGrid.clientHeight || window.innerHeight;
      const margin = Math.min(80, Math.max(30, Math.floor(w * 0.08)));
      const minDistance = Math.min(170, Math.max(70, Math.floor(Math.min(w, h) / 5.2)));
      const placed = [];

      types.forEach((type, i) => {
        let x = 0, y = 0;
        for (let attempt = 0; attempt < 80; attempt++) {
          x = margin + Math.random() * Math.max(10, w - margin * 2);
          y = margin + 40 + Math.random() * Math.max(10, h - margin * 2 - 40);
          if (placed.every((p) => Math.hypot(p.x - x, p.y - y) > minDistance)) break;
        }
        placed.push({ x, y });

        const el = document.createElement('div');
        el.className = 'placed-atom';
        el.dataset.atomId = `atom-${i}`;
        el.dataset.elementType = type;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.animationDelay = `${i * 70}ms`;
        el.innerHTML = `<span>${type}</span>`;
        this.assemblyContainer.appendChild(el);

        const angle = Math.random() * Math.PI * 2;
        const speed = 0.25 + Math.random() * 0.35;
        this.placedAtoms.set(`atom-${i}`, {
          id: `atom-${i}`,
          type,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          el,
          bonds: new Set()
        });
      });
    }

    // Повільний дрейф вільних (нез'єднаних) атомів
    tick() {
      this.rafId = requestAnimationFrame(this.tick);
      if (this.isLocked || !this.overlay || this.overlay.style.display === 'none') return;

      const w = this.formulaGrid.clientWidth;
      const h = this.formulaGrid.clientHeight;
      const dragged = this.activeDrag ? this.activeDrag.atomData : null;

      this.placedAtoms.forEach((a) => {
        if (a === dragged || a.bonds.size > 0) return;
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 56 || a.x > w - 56) { a.vx *= -1; a.x = Math.max(56, Math.min(w - 56, a.x)); }
        if (a.y < 56 || a.y > h - 56) { a.vy *= -1; a.y = Math.max(56, Math.min(h - 56, a.y)); }
        a.el.style.left = `${a.x}px`;
        a.el.style.top = `${a.y}px`;
      });
    }

    handlePointerDown(e) {
      if (this.isLocked) return;
      const placedEl = e.target.closest ? e.target.closest('.placed-atom') : null;
      if (!placedEl) return;

      e.preventDefault();
      const atomData = this.placedAtoms.get(placedEl.dataset.atomId);
      if (!atomData) return;

      const gRect = this.formulaGrid.getBoundingClientRect();
      const px = e.clientX - gRect.left;
      const py = e.clientY - gRect.top;

      // Карбон тягне за собою приєднані «листові» атоми (H, OH)
      const followers = [];
      if (atomData.type === 'C') {
        atomData.bonds.forEach((nid) => {
          const n = this.placedAtoms.get(nid);
          if (n && n.type !== 'C' && n.bonds.size === 1) {
            followers.push({ atom: n, dx: n.x - atomData.x, dy: n.y - atomData.y });
          }
        });
      }

      atomData.el.classList.add('dragging');
      this.activeDrag = {
        atomData,
        followers,
        offX: atomData.x - px,
        offY: atomData.y - py,
        pointerId: e.pointerId
      };
    }

    handlePointerMove(e) {
      if (!this.activeDrag || e.pointerId !== this.activeDrag.pointerId) return;
      e.preventDefault();

      const gRect = this.formulaGrid.getBoundingClientRect();
      const { atomData, followers, offX, offY } = this.activeDrag;

      const clamp = (v, max) => Math.max(34, Math.min(max - 34, v));
      atomData.x = clamp(e.clientX - gRect.left + offX, gRect.width);
      atomData.y = clamp(e.clientY - gRect.top + offY, gRect.height);
      atomData.el.style.left = `${atomData.x}px`;
      atomData.el.style.top = `${atomData.y}px`;

      followers.forEach((f) => {
        f.atom.x = clamp(atomData.x + f.dx, gRect.width);
        f.atom.y = clamp(atomData.y + f.dy, gRect.height);
        f.atom.el.style.left = `${f.atom.x}px`;
        f.atom.el.style.top = `${f.atom.y}px`;
      });

      this.updateDynamicBonds();
    }

    handlePointerUp(e) {
      if (!this.activeDrag || e.pointerId !== this.activeDrag.pointerId) return;
      this.activeDrag.atomData.el.classList.remove('dragging');
      this.activeDrag = null;
      this.updateDynamicBonds();
    }

    // Утворення та розрив зв'язків залежно від відстані
    updateDynamicBonds() {
      const BOND_CONNECT_DIST = 132;
      const BOND_BREAK_DIST = 180;
      const atoms = Array.from(this.placedAtoms.values());
      let newBondFormed = false;
      let bondBroken = false;

      atoms.forEach((a) => {
        Array.from(a.bonds).forEach((nid) => {
          const b = this.placedAtoms.get(nid);
          if (!b || Math.hypot(a.x - b.x, a.y - b.y) > BOND_BREAK_DIST) {
            a.bonds.delete(nid);
            if (b) b.bonds.delete(a.id);
            bondBroken = true;
          }
        });
      });

      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const a = atoms[i];
          const b = atoms[j];
          const compatible = a.type === 'C' || b.type === 'C';
          if (!compatible || a.bonds.has(b.id)) continue;
          if (Math.hypot(a.x - b.x, a.y - b.y) > BOND_CONNECT_DIST) continue;
          if (a.bonds.size >= this.maxValence[a.type] || b.bonds.size >= this.maxValence[b.type]) continue;

          a.bonds.add(b.id);
          b.bonds.add(a.id);
          newBondFormed = true;
        }
      }

      atoms.forEach((a) => a.el.classList.toggle('bonded', a.bonds.size > 0));

      if (this.soundEngine) {
        if (newBondFormed) this.soundEngine.snapSound();
        else if (bondBroken && typeof this.soundEngine.breakSound === 'function') this.soundEngine.breakSound();
      }

      this.renderSVGBonds();
      this.checkEthanolTopology();
    }

    renderSVGBonds() {
      if (!this.bondsGroup) return;
      this.bondsGroup.innerHTML = '';
      const drawn = new Set();

      this.placedAtoms.forEach((a) => {
        a.bonds.forEach((bId) => {
          const b = this.placedAtoms.get(bId);
          if (!b) return;
          const key = [a.id, b.id].sort().join('--');
          if (drawn.has(key)) return;
          drawn.add(key);

          let cls = 'chemical-bond bond-ch';
          if (a.type === 'C' && b.type === 'C') cls = 'chemical-bond bond-cc';
          else if (a.type === 'OH' || b.type === 'OH') cls = 'chemical-bond bond-coh';

          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', a.x);
          line.setAttribute('y1', a.y);
          line.setAttribute('x2', b.x);
          line.setAttribute('y2', b.y);
          line.setAttribute('class', cls);
          this.bondsGroup.appendChild(line);
        });
      });
    }

    // Перевірка структури CH3–CH2–OH
    checkEthanolTopology() {
      const atoms = Array.from(this.placedAtoms.values());
      const carbons = atoms.filter((a) => a.type === 'C');
      const oh = atoms.find((a) => a.type === 'OH');
      const hydrogens = atoms.filter((a) => a.type === 'H');
      if (carbons.length !== 2 || !oh || hydrogens.length !== 5) return;

      const [c1, c2] = carbons;
      if (!c1.bonds.has(c2.id)) return;
      if (c1.bonds.size !== 4 || c2.bonds.size !== 4) return;
      if (oh.bonds.size !== 1) return;

      const ohPartner = Array.from(oh.bonds)[0];
      if (ohPartner !== c1.id && ohPartner !== c2.id) return;
      if (!hydrogens.every((h) => h.bonds.size === 1)) return;

      const cOH = ohPartner === c1.id ? c1 : c2;
      const cMe = cOH === c1 ? c2 : c1;
      const countH = (c) => Array.from(c.bonds).filter((id) => this.placedAtoms.get(id).type === 'H').length;
      if (countH(cOH) !== 2 || countH(cMe) !== 3) return;

      this.triggerSuccess();
    }

    triggerSuccess() {
      if (this.isLocked) return;
      this.isLocked = true;
      if (this.activeDrag) {
        this.activeDrag.atomData.el.classList.remove('dragging');
        this.activeDrag = null;
      }

      this.bondsGroup.querySelectorAll('.chemical-bond').forEach((l) => l.classList.add('bond-supercharged'));
      if (this.xpSystem) this.xpSystem.addXP(50);

      const snapshot = Array.from(this.placedAtoms.values()).map((a) => ({
        id: a.id,
        type: a.type,
        x: a.x,
        y: a.y,
        bonds: Array.from(a.bonds)
      }));

      if (typeof this.onComplete === 'function') this.onComplete(snapshot);
    }

    reset() {
      this.isLocked = false;
      this.activeDrag = null;
      this.placedAtoms.clear();
      if (this.assemblyContainer) this.assemblyContainer.innerHTML = '';
      if (this.bondsGroup) this.bondsGroup.innerHTML = '';
      if (this.formulaGrid) {
        this.formulaGrid.style.display = '';
        this.formulaGrid.style.opacity = '1';
        this.formulaGrid.style.transform = '';
      }
      this.spawnAtoms();
    }
  }

  /* ==========================================================================
   * 5. INTRO TRANSITION: СТРУКТУРНА ФОРМУЛА → КУЛЕСТРИЖНЕВА МОДЕЛЬ → ГІПЕРСТРИБОК
   * ========================================================================== */
  class IntroTransition {
    constructor(soundEngine, onFinish) {
      this.soundEngine = soundEngine;
      this.onFinish = onFinish;

      this.introOverlay = document.getElementById('intro-overlay');
      this.formulaGrid = document.getElementById('formula-grid');
      this.transitionContainer = document.getElementById('transition-container');
      this.morphCanvas = document.getElementById('morph-canvas');
      this.warpCanvas = document.getElementById('warp-canvas');
      this.morphStage = document.getElementById('morph-stage');
      this.mainContent = document.getElementById('main-content');

      this.warpStars = [];
      this.warpFrameId = null;
      this.morphFrameId = null;
      this.isRunning = false;
    }

    start(snapshot) {
      if (this.isRunning) return;
      this.isRunning = true;

      if (this.morphStage) {
        this.morphStage.style.transform = '';
        this.morphStage.style.opacity = '1';
      }
      if (this.transitionContainer) {
        this.transitionContainer.classList.remove('hidden');
        this.transitionContainer.style.opacity = '1';
        this.transitionContainer.style.visibility = 'visible';
      }
      if (this.formulaGrid) this.formulaGrid.style.display = 'none';

      this.runMorph(snapshot || []);
    }

    abort() {
      if (this.warpFrameId) cancelAnimationFrame(this.warpFrameId);
      if (this.morphFrameId) cancelAnimationFrame(this.morphFrameId);
      this.isRunning = false;
    }

    // Структурна модель → об'ємна кулестрижнева модель, що обертається
    runMorph(snapshot) {
      const canvas = this.morphCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const S = Math.min(W, H) * 0.17; // масштаб одиниці довжини

      const byId = new Map(snapshot.map((a) => [a.id, a]));
      const carbons = snapshot.filter((a) => a.type === 'C');
      const ohNode = snapshot.find((a) => a.type === 'OH');
      if (!ohNode || carbons.length !== 2) {
        this.startHypersonicWarpDrive();
        return;
      }
      const cOH = carbons.find((c) => c.bonds.includes(ohNode.id));
      const cMe = carbons.find((c) => c !== cOH);

      // Цільові 3D-координати (одиниці довжини) відносно центру молекули
      const T = {
        cMe: [-0.75, 0.25, 0],
        cOH: [0.75, 0.25, 0],
        o: [1.3, -0.7, 0],
        oh: [2.15, -0.45, 0.25]
      };
      const meH = [[-1.1, 1.2, 0], [-1.1, -0.2, 0.9], [-1.1, -0.2, -0.9]];
      const ohH = [[1.1, 0.75, 0.9], [1.1, 0.75, -0.9]];
      const centre = [0.55, 0.15, 0];

      const STYLE = {
        C: { base: '#0e7490', glow: '#22d3ee', r: 0.42, flat: '#06b6d4' },
        O: { base: '#b91c1c', glow: '#f87171', r: 0.4, flat: '#10b981' },
        H: { base: '#a78bfa', glow: '#ffffff', r: 0.26, flat: '#8b5cf6' }
      };

      const nodes = [];
      const nodeById = new Map();
      const addNode = (src, kind, target, extra = {}) => {
        const n = Object.assign({ kind, sx: src.x, sy: src.y, t: target, label: src.type }, extra);
        nodes.push(n);
        if (extra.id) nodeById.set(extra.id, n);
        return n;
      };

      addNode(cMe, 'C', T.cMe, { id: cMe.id });
      addNode(cOH, 'C', T.cOH, { id: cOH.id });
      addNode(ohNode, 'O', T.o, { id: ohNode.id, label: 'OH' });
      const extraH = addNode(ohNode, 'H', T.oh, { id: 'extra-h', label: '', grow: true });

      let mi = 0, oi = 0;
      snapshot.filter((a) => a.type === 'H').forEach((h) => {
        const parent = byId.get(h.bonds[0]);
        const target = parent === cMe ? meH[mi++] : ohH[oi++];
        addNode(h, 'H', target, { id: h.id });
      });

      // Зв'язки: усі структурні + O–H
      const bonds = [];
      const seen = new Set();
      snapshot.forEach((a) => a.bonds.forEach((bid) => {
        const key = [a.id, bid].sort().join('|');
        if (seen.has(key)) return;
        seen.add(key);
        bonds.push([nodeById.get(a.id), nodeById.get(bid), a.type === 'C' && byId.get(bid).type === 'C' ? 'cc' : 'x']);
      }));
      bonds.push([nodeById.get(ohNode.id), extraH, 'oh']);

      const flatColor = { cc: '#06b6d4', x: '#a78bfa', oh: '#10b981' };
      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const MORPH_MS = 1100;
      const WARP_AT = 1250;
      const t0 = performance.now();
      let warpStarted = false;

      const render = (now) => {
        const t = Math.max(0, performance.now() - t0);
        const e = ease(Math.min(1, t / MORPH_MS));
        const angle = 0.3 + t * 0.0016;
        const tilt = 0.35;
        const cosA = Math.cos(angle), sinA = Math.sin(angle);
        const cosT = Math.cos(tilt), sinT = Math.sin(tilt);

        ctx.clearRect(0, 0, W, H);

        // Ореол
        const halo = ctx.createRadialGradient(cx, cy, 10, cx, cy, S * 3.2);
        halo.addColorStop(0, `rgba(34, 211, 238, ${0.22 * e + 0.05})`);
        halo.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, W, H);

        // Проекція вузлів
        nodes.forEach((n) => {
          const x = n.t[0] - centre[0], y = n.t[1] - centre[1], z = n.t[2];
          const x1 = x * cosA + z * sinA;
          const z1 = -x * sinA + z * cosA;
          const y2 = y * cosT - z1 * sinT;
          const z2 = y * sinT + z1 * cosT;
          const f = 6 / (6 + z2);
          const ex = n.grow ? Math.max(0, (e - 0.35) / 0.65) : 1;
          const px = cx + x1 * S * f;
          const py = cy + y2 * S * f;
          n.x = n.sx + (px - n.sx) * (n.grow ? ex : e);
          n.y = n.sy + (py - n.sy) * (n.grow ? ex : e);
          n.z = z2;
          n.f = f;
          n.vis = n.grow ? ex : 1;
          n.R = (46 + (STYLE[n.kind].r * S * f - 46) * e) * (n.grow ? ex : 1);
        });

        // Список елементів для сортування за глибиною
        const items = [];
        bonds.forEach(([a, b, kind]) => items.push({ depth: (a.z + b.z) / 2, bond: [a, b, kind] }));
        nodes.forEach((n) => items.push({ depth: n.z, node: n }));
        items.sort((p, q) => q.depth - p.depth);

        items.forEach((it) => {
          if (it.bond) {
            const [a, b, kind] = it.bond;
            const vis = Math.min(a.vis, b.vis);
            if (vis <= 0.01) return;
            ctx.save();
            ctx.lineCap = 'round';
            ctx.globalAlpha = (1 - e) * vis;
            ctx.strokeStyle = flatColor[kind];
            ctx.lineWidth = 4.5;
            ctx.shadowBlur = 10;
            ctx.shadowColor = flatColor[kind];
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();

            ctx.globalAlpha = e * vis;
            ctx.shadowBlur = 0;
            const wStick = S * 0.1 * ((a.f + b.f) / 2);
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = wStick;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = wStick * 0.4;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            ctx.restore();
          } else {
            const n = it.node;
            if (n.R <= 0.5) return;
            const st = STYLE[n.kind];
            ctx.save();

            // Плоский вигляд структурної формули
            if (e < 1 && n.label) {
              ctx.globalAlpha = 1 - e;
              ctx.beginPath();
              ctx.arc(n.x, n.y, n.R, 0, Math.PI * 2);
              ctx.fillStyle = '#0a0f1e';
              ctx.fill();
              ctx.lineWidth = 2;
              ctx.strokeStyle = st.flat;
              ctx.shadowBlur = 16;
              ctx.shadowColor = st.flat;
              ctx.stroke();
              ctx.shadowBlur = 0;
              ctx.fillStyle = st.flat;
              ctx.font = '800 32px Inter, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(n.label, n.x, n.y);
            }

            // Об'ємна куля
            ctx.globalAlpha = Math.max(e, n.grow ? n.vis : 0);
            const g = ctx.createRadialGradient(n.x - n.R * 0.35, n.y - n.R * 0.4, n.R * 0.08, n.x, n.y, n.R);
            g.addColorStop(0, '#ffffff');
            g.addColorStop(0.3, st.glow);
            g.addColorStop(1, st.base);
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.R, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.shadowBlur = 24 * e;
            ctx.shadowColor = st.glow;
            ctx.fill();
            ctx.restore();
          }
        });

        // Хвиля реакції на початку
        if (t < 900) {
          const k = t / 900;
          ctx.save();
          ctx.globalAlpha = 1 - k;
          ctx.strokeStyle = '#7dd3fc';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cx, cy, k * Math.max(W, H) * 0.6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        if (!warpStarted && t > WARP_AT) {
          warpStarted = true;
          this.startHypersonicWarpDrive();
        }
        this.morphFrameId = requestAnimationFrame(render);
      };

      this.morphFrameId = requestAnimationFrame(render);
    }

    // Хімічний перехід: гексагональна «вуглецева ґратка» хвилею розходиться від молекули
    startHypersonicWarpDrive() {
      if (!this.warpCanvas) return;
      const canvas = this.warpCanvas;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.max(30, Math.min(W, H) / 14);
      const hexW = Math.sqrt(3) * R;
      const maxDist = Math.hypot(cx, cy) + R * 2;
      const DURATION = 1300;
      const WAVE = 0.55; // частка часу, за яку хвиля досягає країв

      const cells = [];
      for (let row = -1; row * R * 1.5 < H + R * 2; row++) {
        for (let col = -1; col * hexW < W + hexW * 2; col++) {
          const x = col * hexW + (row % 2 ? hexW / 2 : 0);
          const y = row * R * 1.5;
          cells.push({ x, y, d: Math.hypot(x - cx, y - cy) / maxDist, hue: Math.random() > 0.5 ? 185 : 155 });
        }
      }

      const hexPath = (x, y, r) => {
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = Math.PI / 3 * k + Math.PI / 6;
          const px = x + r * Math.cos(a);
          const py = y + r * Math.sin(a);
          if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
      };

      const morphStage = this.morphStage;
      const start = performance.now();

      const animate = (now) => {
        const t = Math.max(0, Math.min(1, (performance.now() - start) / DURATION));
        ctx.clearRect(0, 0, W, H);

        // Молекула розростається й розчиняється
        if (morphStage) {
          morphStage.style.transform = `scale(${1 + t * 0.9})`;
          morphStage.style.opacity = `${Math.max(0, 1 - t * 1.4)}`;
        }

        cells.forEach((c) => {
          const k = Math.max(0, Math.min(1, (t - c.d * WAVE) / 0.4));
          if (k <= 0) return;
          const front = Math.sin(Math.PI * Math.min(1, k * 1.2));
          const fillA = 0.08 + 0.7 * k * k;
          hexPath(c.x, c.y, R * (0.55 + 0.43 * k));
          ctx.fillStyle = `hsla(${c.hue}, 100%, ${25 + 35 * front}%, ${fillA})`;
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = `hsla(${c.hue}, 100%, 70%, ${0.35 + 0.65 * front})`;
          ctx.shadowBlur = 12 * front;
          ctx.shadowColor = `hsl(${c.hue}, 100%, 60%)`;
          ctx.stroke();
          ctx.shadowBlur = 0;
        });

        // Кільцева хвиля від центру
        ctx.save();
        ctx.globalAlpha = 1 - t;
        ctx.strokeStyle = '#7dd3fc';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#22d3ee';
        ctx.beginPath();
        ctx.arc(cx, cy, t * maxDist * 1.1, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (t >= 1) {
          this.finishTransition();
          return;
        }
        this.warpFrameId = requestAnimationFrame(animate);
      };

      this.warpFrameId = requestAnimationFrame(animate);
    }
    // Спалах і відкриття головної сторінки
    finishTransition() {
      if (this.warpFrameId) cancelAnimationFrame(this.warpFrameId);
      if (this.morphFrameId) cancelAnimationFrame(this.morphFrameId);
      this.isRunning = false;

      const flash = document.createElement('div');
      flash.style.cssText = `
        position: fixed;
        inset: 0;
        background: radial-gradient(circle, #ecfeff 20%, #22d3ee 60%, #059669 100%);
        z-index: 100000;
        opacity: 1;
        transition: opacity 0.85s cubic-bezier(0.2, 0.8, 0.2, 1);
      `;
      document.body.appendChild(flash);

      if (this.introOverlay) {
        this.introOverlay.classList.add('intro-hidden');
        setTimeout(() => {
          this.introOverlay.style.display = 'none';
        }, 800);
      }

      if (this.mainContent) {
        this.mainContent.classList.remove('hidden');
        this.mainContent.style.opacity = '1';
      }

      window.scrollTo({ top: 0, behavior: 'instant' });

      requestAnimationFrame(() => {
        flash.style.opacity = '0';
      });

      setTimeout(() => {
        if (flash.parentNode) flash.parentNode.removeChild(flash);
      }, 900);

      if (typeof this.onFinish === 'function') {
        this.onFinish();
      }

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }
  }

  /* ==========================================================================
   * 6. MOLECULE VIEWER (3D МОЛЕКУЛА НА ГОЛОВНІЙ СТОРІНЦІ)
   * ========================================================================== */
  class MoleculeViewer {
    constructor() {
      this.canvas = document.getElementById('molecule-canvas');
      this.ctx = null;
      this.animationFrameId = null;

      this.molecules = {
        methanol: {
          title: 'Молекулярний конструктор: Метанол (CH₃OH)',
          counts: { C: 1, H: 4, O: 1 },
          atoms: [
            { id: 'C1', element: 'C', x: 0.0, y: 0.0, z: 0.0, label: 'C₁' },
            { id: 'O', element: 'O', x: 1.42, y: 0.35, z: 0.0, label: 'O', delta: 'δ⁻' },
            { id: 'H_OH', element: 'H', x: 1.95, y: -0.45, z: 0.3, label: 'H(OH)', delta: 'δ⁺' },
            { id: 'H1', element: 'H', x: -0.52, y: 0.95, z: 0.35, label: 'H₁' },
            { id: 'H2', element: 'H', x: -0.48, y: -0.78, z: 0.65, label: 'H₂' },
            { id: 'H3', element: 'H', x: -0.45, y: -0.35, z: -0.92, label: 'H₃' }
          ],
          bonds: [[0, 1], [1, 2], [0, 3], [0, 4], [0, 5]]
        },
        ethanol: {
          title: 'Молекулярний конструктор: Етанол (C₂H₅OH)',
          counts: { C: 2, H: 6, O: 1 },
          atoms: [
            { id: 'C1', element: 'C', x: 0.0, y: 0.0, z: 0.0, label: 'C₁' },
            { id: 'C2', element: 'C', x: 1.5, y: 0.0, z: 0.0, label: 'C₂' },
            { id: 'O', element: 'O', x: 2.5, y: 1.0, z: 0.0, label: 'O', delta: 'δ⁻' },
            { id: 'H_OH', element: 'H', x: 3.3, y: 0.6, z: 0.5, label: 'H(OH)', delta: 'δ⁺' },
            { id: 'H1', element: 'H', x: -0.5, y: 1.0, z: 0.5, label: 'H₁' },
            { id: 'H2', element: 'H', x: -0.5, y: -0.7, z: -0.7, label: 'H₂' },
            { id: 'H3', element: 'H', x: -0.5, y: -0.3, z: 0.8, label: 'H₃' },
            { id: 'H4', element: 'H', x: 1.5, y: -0.8, z: 0.8, label: 'H₄' },
            { id: 'H5', element: 'H', x: 1.5, y: 0.8, z: -0.8, label: 'H₅' }
          ],
          bonds: [
            [0, 1], [1, 2], [2, 3],
            [0, 4], [0, 5], [0, 6],
            [1, 7], [1, 8]
          ]
        },
        glycol: {
          title: 'Молекулярний конструктор: Етиленгліколь C₂H₄(OH)₂',
          counts: { C: 2, H: 6, O: 2 },
          atoms: [
            { id: 'C1', element: 'C', x: -0.75, y: 0.0, z: 0.0, label: 'C₁' },
            { id: 'C2', element: 'C', x: 0.75, y: 0.0, z: 0.0, label: 'C₂' },
            { id: 'O1', element: 'O', x: -1.65, y: 1.05, z: 0.25, label: 'O₁', delta: 'δ⁻' },
            { id: 'HO1', element: 'H', x: -2.45, y: 0.75, z: 0.6, label: 'H(OH)', delta: 'δ⁺' },
            { id: 'O2', element: 'O', x: 1.65, y: -1.05, z: -0.25, label: 'O₂', delta: 'δ⁻' },
            { id: 'HO2', element: 'H', x: 2.45, y: -0.75, z: -0.6, label: 'H(OH)', delta: 'δ⁺' },
            { id: 'H1', element: 'H', x: -1.0, y: -0.85, z: 0.75, label: 'H₁' },
            { id: 'H2', element: 'H', x: -1.0, y: -0.45, z: -0.95, label: 'H₂' },
            { id: 'H3', element: 'H', x: 1.0, y: 0.85, z: -0.75, label: 'H₃' },
            { id: 'H4', element: 'H', x: 1.0, y: 0.45, z: 0.95, label: 'H₄' }
          ],
          bonds: [
            [0, 1], [0, 2], [2, 3],
            [1, 4], [4, 5],
            [0, 6], [0, 7],
            [1, 8], [1, 9]
          ]
        },
        glycerol: {
          title: 'Молекулярний конструктор: Гліцерол C₃H₅(OH)₃',
          counts: { C: 3, H: 8, O: 3 },
          atoms: [
            { id: 'C1', element: 'C', x: -1.45, y: -0.2, z: 0.0, label: 'C₁' },
            { id: 'C2', element: 'C', x: 0.0, y: 0.35, z: 0.0, label: 'C₂' },
            { id: 'C3', element: 'C', x: 1.45, y: -0.2, z: 0.0, label: 'C₃' },
            { id: 'O1', element: 'O', x: -2.35, y: 0.85, z: 0.3, label: 'O₁', delta: 'δ⁻' },
            { id: 'HO1', element: 'H', x: -3.15, y: 0.55, z: 0.6, label: 'H(OH)', delta: 'δ⁺' },
            { id: 'O2', element: 'O', x: 0.0, y: 1.65, z: -0.45, label: 'O₂', delta: 'δ⁻' },
            { id: 'HO2', element: 'H', x: 0.75, y: 2.15, z: -0.25, label: 'H(OH)', delta: 'δ⁺' },
            { id: 'O3', element: 'O', x: 2.35, y: 0.85, z: -0.3, label: 'O₃', delta: 'δ⁻' },
            { id: 'HO3', element: 'H', x: 3.15, y: 0.55, z: -0.6, label: 'H(OH)', delta: 'δ⁺' },
            { id: 'H1', element: 'H', x: -1.65, y: -1.0, z: 0.75, label: 'H₁' },
            { id: 'H2', element: 'H', x: -1.65, y: -0.65, z: -0.95, label: 'H₂' },
            { id: 'H3', element: 'H', x: 0.0, y: 0.4, z: 1.05, label: 'H₃' },
            { id: 'H4', element: 'H', x: 1.65, y: -1.0, z: -0.75, label: 'H₄' },
            { id: 'H5', element: 'H', x: 1.65, y: -0.65, z: 0.95, label: 'H₅' }
          ],
          bonds: [
            [0, 1], [1, 2],
            [0, 3], [3, 4],
            [1, 5], [5, 6],
            [2, 7], [7, 8],
            [0, 9], [0, 10],
            [1, 11],
            [2, 12], [2, 13]
          ]
        }
      };

      this.currentMolKey = 'ethanol';
      this.modelMode = 'ball'; // 'ball' | 'space'
      this.hoveredAtomIdx = -1;
      this.lastProjectedAtoms = [];

      this.rawAtoms = this.molecules.ethanol.atoms;
      this.bonds = this.molecules.ethanol.bonds;

      this.centerMolecule();

      this.rotX = 0.25;
      this.rotY = 0.45;
      this.scale = 68;
      this.autoRotateSpeed = 0.007;
      this.isAutoRotating = true;
      this.showLabels = true;
      this.showPolarity = true;

      this.isDragging = false;
      this.lastMouseX = 0;
      this.lastMouseY = 0;

      this.render = this.render.bind(this);
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
      this.handleWheel = this.handleWheel.bind(this);
    }

    centerMolecule() {
      let cx = 0, cy = 0, cz = 0;
      const count = this.rawAtoms.length;
      this.rawAtoms.forEach((a) => {
        cx += a.x;
        cy += a.y;
        cz += a.z;
      });
      cx /= count;
      cy /= count;
      cz /= count;

      this.atoms = this.rawAtoms.map((a) => ({
        ...a,
        x: a.x - cx,
        y: a.y - cy,
        z: a.z - cz
      }));
    }

    init() {
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;

      this.canvas.width = 500;
      this.canvas.height = 400;

      this.bindEvents();
      this.start();
    }

    bindEvents() {
      if (!this.canvas) return;
      this.canvas.style.cursor = 'grab';

      this.canvas.addEventListener('mousedown', this.handleMouseDown);
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
      this.canvas.addEventListener('wheel', this.handleWheel, { passive: false });

      this.canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          const t = e.touches[0];
          this.handleMouseDown({ clientX: t.clientX, clientY: t.clientY, preventDefault: () => {} });
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (this.isDragging && e.touches.length === 1) {
          const t = e.touches[0];
          this.handleMouseMove({ clientX: t.clientX, clientY: t.clientY });
        }
      }, { passive: true });

      window.addEventListener('touchend', this.handleMouseUp);

      // Molecule Viewer Interactive Controls
      window.moleculeViewerInstance = this;

      const rotLeftBtn = document.getElementById('rotate-left-btn');
      if (rotLeftBtn) {
        rotLeftBtn.addEventListener('click', () => {
          this.rotY -= 0.35;
        });
      }

      const rotRightBtn = document.getElementById('rotate-right-btn');
      if (rotRightBtn) {
        rotRightBtn.addEventListener('click', () => {
          this.rotY += 0.35;
        });
      }

      const autoRotBtn = document.getElementById('auto-rotate-btn');
      if (autoRotBtn) {
        autoRotBtn.addEventListener('click', () => {
          this.isAutoRotating = !this.isAutoRotating;
          autoRotBtn.classList.toggle('bg-cyan-600', this.isAutoRotating);
          autoRotBtn.classList.toggle('text-white', this.isAutoRotating);
        });
      }

      const toggleLabelsBtn = document.getElementById('toggle-labels-btn') || document.querySelector('[data-toggle="labels"]');
      if (toggleLabelsBtn) {
        toggleLabelsBtn.addEventListener('click', () => {
          this.toggleLabels();
          toggleLabelsBtn.classList.toggle('bg-slate-700', !this.showLabels);
        });
      }

      const togglePolarityBtn = document.getElementById('toggle-polarity-btn') || document.querySelector('[data-toggle="polarity"]');
      if (togglePolarityBtn) {
        togglePolarityBtn.addEventListener('click', () => this.togglePolarity());
      }

      const resetViewBtn = document.getElementById('reset-view-btn') || document.getElementById('reset-molecule-btn') || document.querySelector('[data-action="reset-molecule"]');
      if (resetViewBtn) {
        resetViewBtn.addEventListener('click', () => {
          this.rotX = 0.25;
          this.rotY = 0.45;
          this.scale = 68;
          this.isAutoRotating = true;
          if (autoRotBtn) {
            autoRotBtn.classList.remove('bg-cyan-600', 'text-white');
          }
        });
      }

      // Molecule selector tabs (Метанол / Етанол / Етиленгліколь / Гліцерол)
      const molSelectBtns = document.querySelectorAll('[data-mol-select]');
      molSelectBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-mol-select');
          if (!key || !this.molecules[key]) return;
          this.currentMolKey = key;
          const mol = this.molecules[key];
          this.rawAtoms = mol.atoms;
          this.bonds = mol.bonds;
          this.hoveredAtomIdx = -1;
          this.centerMolecule();

          // Update active button state
          molSelectBtns.forEach((b) => {
            const isActive = b === btn;
            b.classList.toggle('active', isActive);
            b.classList.toggle('bg-teal-500', isActive);
            b.classList.toggle('text-slate-950', isActive);
            b.classList.toggle('border-teal-400', isActive);
            b.classList.toggle('shadow-[0_0_15px_rgba(20,184,166,0.35)]', isActive);
            b.classList.toggle('bg-slate-950/70', !isActive);
            b.classList.toggle('text-slate-300', !isActive);
            b.classList.toggle('border-slate-800', !isActive);
          });

          const titleEl = document.getElementById('mol-viewer-title');
          if (titleEl) titleEl.textContent = mol.title;
          const cEl = document.getElementById('mol-count-c');
          const hEl = document.getElementById('mol-count-h');
          const oEl = document.getElementById('mol-count-o');
          if (cEl) cEl.textContent = `C: ${mol.counts.C}`;
          if (hEl) hEl.textContent = `H: ${mol.counts.H}`;
          if (oEl) oEl.textContent = `O: ${mol.counts.O}`;
        });
      });

      // Model mode toggle (Кулестержнева / Масштабна)
      const modeBtns = document.querySelectorAll('[data-mol-mode]');
      modeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const mode = btn.getAttribute('data-mol-mode');
          if (!mode) return;
          this.modelMode = mode;
          modeBtns.forEach((b) => {
            const active = b === btn;
            b.classList.toggle('active', active);
            b.classList.toggle('bg-teal-500/20', active);
            b.classList.toggle('text-teal-300', active);
            b.classList.toggle('border-teal-500/40', active);
            b.classList.toggle('text-slate-400', !active);
          });
        });
      });

      // Hover detection on canvas for atom highlighting
      this.canvas.addEventListener('mousemove', (e) => {
        if (this.isDragging) return;
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const mx = (e.clientX - rect.left) * scaleX;
        const my = (e.clientY - rect.top) * scaleY;

        let foundIdx = -1;
        // Check from front-most to back-most
        const sorted = [...this.lastProjectedAtoms].sort((a, b) => b.depth - a.depth);
        for (const p of sorted) {
          const dist = Math.hypot(mx - p.px, my - p.py);
          if (dist <= p.radius + 4) {
            foundIdx = p.idx;
            break;
          }
        }
        this.hoveredAtomIdx = foundIdx;
        const badge = document.getElementById('mol-hover-badge');
        if (badge) {
          if (foundIdx !== -1 && this.atoms[foundIdx]) {
            const a = this.atoms[foundIdx];
            const desc = a.element === 'O'
              ? `${a.label}: Кисень (O) у гідроксильній групі —OH (δ⁻)`
              : a.element === 'C'
              ? `${a.label}: Карбон (C, sp³) — вуглецевий скелет молекули`
              : `${a.label}: Водень (H) ${a.delta ? 'гідроксильної групи —OH (δ⁺)' : 'вуглеводневого радикала'}`;
            badge.textContent = desc;
          } else {
            badge.textContent = 'Наведіть на атом для підсвічування';
          }
        }
      });

      this.canvas.addEventListener('mouseleave', () => {
        this.hoveredAtomIdx = -1;
      });
    }

    handleMouseDown(e) {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      if (this.canvas) this.canvas.style.cursor = 'grabbing';
    }

    handleMouseMove(e) {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouseX;
      const dy = e.clientY - this.lastMouseY;

      this.rotY += dx * 0.01;
      this.rotX += dy * 0.01;

      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    }

    handleMouseUp() {
      this.isDragging = false;
      if (this.canvas) this.canvas.style.cursor = 'grab';
    }

    handleWheel(e) {
      if (!this.canvas) return;
      e.preventDefault();
      const delta = Math.sign(e.deltaY) * -4;
      this.scale = Math.max(35, Math.min(115, this.scale + delta));
    }

    toggleLabels() {
      this.showLabels = !this.showLabels;
    }

    togglePolarity() {
      this.showPolarity = !this.showPolarity;
    }

    start() {
      if (!this.animationFrameId) {
        this.render();
      }
    }

    stop() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }

    render() {
      if (!this.ctx || !this.canvas) return;

      const w = this.canvas.width;
      const h = this.canvas.height;
      const centerX = w / 2;
      const centerY = h / 2;

      if (this.isAutoRotating && !this.isDragging) {
        this.rotY += this.autoRotateSpeed;
      }

      this.ctx.clearRect(0, 0, w, h);

      const cosX = Math.cos(this.rotX);
      const sinX = Math.sin(this.rotX);
      const cosY = Math.cos(this.rotY);
      const sinY = Math.sin(this.rotY);

      const sizeMult = this.modelMode === 'space' ? 1.85 : 1.0;

      const projectedAtoms = this.atoms.map((a, idx) => {
        const x1 = a.x * cosY + a.z * sinY;
        const y1 = a.y;
        const z1 = -a.x * sinY + a.z * cosY;

        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        const cameraDist = 5.2;
        const perspective = cameraDist / (cameraDist + z2);
        const px = centerX + x2 * this.scale * perspective;
        const py = centerY - y2 * this.scale * perspective;

        let radius = 17;
        // High-tech lab palette: C = neutral slate-grey, O = bright coral-red, H = crisp white/ice-blue
        let colorConfig = { base: '#475569', light: '#94a3b8', dark: '#1e293b' };

        if (a.element === 'C') {
          radius = 23 * sizeMult;
          colorConfig = { base: '#475569', light: '#94a3b8', dark: '#0f172a' };
        } else if (a.element === 'O') {
          radius = 22 * sizeMult;
          colorConfig = { base: '#f43f5e', light: '#fecdd3', dark: '#881337' };
        } else if (a.element === 'H') {
          radius = 14.5 * sizeMult;
          colorConfig = { base: '#e2e8f0', light: '#ffffff', dark: '#64748b' };
        }

        return {
          idx,
          atom: a,
          px,
          py,
          depth: z2,
          radius: radius * perspective,
          colorConfig,
          isHovered: idx === this.hoveredAtomIdx
        };
      });

      this.lastProjectedAtoms = projectedAtoms;

      const projectedBonds = this.modelMode === 'space' ? [] : this.bonds.map(([i1, i2]) => {
        const a1 = projectedAtoms[i1];
        const a2 = projectedAtoms[i2];
        const avgDepth = (a1.depth + a2.depth) / 2;
        return {
          type: 'bond',
          depth: avgDepth,
          a1,
          a2,
          isOHBond: (a1.atom.element === 'O' && a2.atom.element === 'H') ||
                    (a2.atom.element === 'O' && a1.atom.element === 'H')
        };
      });

      const renderQueue = [
        ...projectedBonds.map((b) => ({ type: 'bond', data: b, depth: b.depth })),
        ...projectedAtoms.map((a) => ({ type: 'atom', data: a, depth: a.depth }))
      ];

      renderQueue.sort((a, b) => a.depth - b.depth);

      renderQueue.forEach((item) => {
        if (item.type === 'bond') {
          this.drawBond(item.data);
        } else {
          this.drawAtom(item.data);
        }
      });

      this.animationFrameId = requestAnimationFrame(this.render);
    }

    drawBond(bondData) {
      const { a1, a2, isOHBond } = bondData;
      const ctx = this.ctx;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(a1.px, a1.py);
      ctx.lineTo(a2.px, a2.py);

      const grad = ctx.createLinearGradient(a1.px, a1.py, a2.px, a2.py);
      grad.addColorStop(0, isOHBond ? '#f43f5e' : '#94a3b8');
      grad.addColorStop(1, '#475569');

      ctx.strokeStyle = grad;
      ctx.lineWidth = isOHBond ? 7.5 : 6.5;
      ctx.lineCap = 'round';
      ctx.shadowBlur = isOHBond ? 12 : 4;
      ctx.shadowColor = isOHBond ? 'rgba(244, 63, 94, 0.45)' : 'rgba(15, 23, 42, 0.4)';
      ctx.stroke();

      if (isOHBond && this.showPolarity) {
        this.drawPolarityVector(a1, a2);
      }

      ctx.restore();
    }

    drawPolarityVector(a1, a2) {
      const ctx = this.ctx;
      const oxygen = a1.atom.element === 'O' ? a1 : a2;
      const hydrogen = a1.atom.element === 'H' ? a1 : a2;

      const midX = (oxygen.px + hydrogen.px) / 2;
      const midY = (oxygen.py + hydrogen.py) / 2;

      ctx.save();
      ctx.font = '600 11px Roboto Mono, monospace';
      ctx.fillStyle = '#fb7185';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('→ δ⁻', midX, midY - 14);
      ctx.restore();
    }

    drawAtom(atomData) {
      const { px, py, radius, colorConfig, atom, isHovered } = atomData;
      const ctx = this.ctx;

      ctx.save();
      const lightOffsetX = px - radius * 0.35;
      const lightOffsetY = py - radius * 0.35;
      const grad = ctx.createRadialGradient(
        lightOffsetX, lightOffsetY, radius * 0.1,
        px, py, radius
      );
      grad.addColorStop(0, colorConfig.light);
      grad.addColorStop(0.45, colorConfig.base);
      grad.addColorStop(1, colorConfig.dark);

      ctx.beginPath();
      ctx.arc(px, py, isHovered ? radius * 1.12 : radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.shadowColor = isHovered
        ? (atom.element === 'O' ? 'rgba(244, 63, 94, 0.9)' : 'rgba(45, 212, 191, 0.9)')
        : 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = isHovered ? 22 : 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 4;
      ctx.fill();

      if (isHovered) {
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = atom.element === 'O' ? '#fda4af' : '#2dd4bf';
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(lightOffsetX, lightOffsetY, radius * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();

      if (this.showLabels) {
        ctx.shadowBlur = 0;
        ctx.font = `bold ${Math.max(10, Math.round(radius * 0.62))}px Roboto Mono, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = atom.element === 'H' ? '#0f172a' : '#ffffff';
        ctx.fillText(atom.element, px, py + 1);

        if (this.showPolarity && atom.delta) {
          ctx.font = 'bold 11px Roboto Mono, system-ui, sans-serif';
          ctx.fillStyle = atom.delta.includes('⁺') ? '#38bdf8' : '#fb7185';
          ctx.fillText(atom.delta, px + radius * 0.9, py - radius * 0.85);
        }
      }

      ctx.restore();
    }
  }

  /* ==========================================================================
   * 7. VIRTUAL LAB (ВІРТУАЛЬНА ХІМІЧНА ЛАБОРАТОРІЯ)
   * ========================================================================== */
  class VirtualLab {
    constructor(soundEngine, xpSystem) {
      this.soundEngine = soundEngine;
      this.xpSystem = xpSystem;

      this.canvas = document.getElementById('lab-canvas');
      this.ctx = null;
      this.animationFrameId = null;

      this.reagentBtns = document.querySelectorAll('.reagent-btn[data-reagent]');
      this.resetBtn = document.getElementById('lab-reset-btn');
      this.equationPanel = document.getElementById('reaction-equation');
      this.observationPanel = document.getElementById('observation-panel');
      this.tubeLabel = document.getElementById('tube-label');

      this.currentReaction = 'idle';
      this.completedReactions = new Set();

      this.bubbles = [];
      this.flameParticles = [];
      this.cuoParticles = [];
      this.sodiumChunk = null;

      this.liquidBaseLevel = 220;
      this.liquidCurrentLevel = 220;
      this.liquidColor = { r: 56, g: 189, b: 248, a: 0.42 };

      this.animate = this.animate.bind(this);
    }

    init() {
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;

      this.canvas.width = 400;
      this.canvas.height = 500;

      this.bindControls();
      this.start();
    }

    bindControls() {
      this.reagentBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const reagent = btn.dataset.reagent;
          this.triggerReaction(reagent);
        });
      });

      if (this.resetBtn) {
        this.resetBtn.addEventListener('click', () => {
          this.resetLab();
        });
      }
    }

    triggerReaction(reagent) {
      if (this.currentReaction === reagent) return;
      this.currentReaction = reagent;

      this.reagentBtns.forEach((b) => {
        if (b.dataset.reagent === reagent) b.classList.add('active');
        else b.classList.remove('active');
      });

      if (reagent === 'Na') this.startSodiumReaction();
      else if (reagent === 'O2') this.startCombustionReaction();
      else if (reagent === 'CuO') this.startCopperOxideReaction();
    }

    startSodiumReaction() {
      this.bubbles = [];
      this.sodiumChunk = { x: 200, y: 80, vy: 2.8, settled: false };

      if (this.tubeLabel) this.tubeLabel.textContent = 'Натрій етилат + H₂↑';

      if (this.equationPanel) {
        this.equationPanel.classList.remove('hidden');
        this.equationPanel.innerHTML = `
          <div class="equation-box">
            <span class="equation-text">2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑</span>
          </div>
        `;
      }

      if (this.observationPanel) {
        this.observationPanel.innerHTML = `
          <div class="observation-card">
            <strong>Спостереження:</strong> Спостерігається виділення бульбашок водню. 
            Утворюється натрій етилат. Реакція відбувається помірно, без спалаху.
          </div>
        `;
      }

      if (!this.completedReactions.has('Na')) {
        this.completedReactions.add('Na');
        if (this.xpSystem) this.xpSystem.addXP(25);
      }
    }

    startCombustionReaction() {
      this.flameParticles = [];
      if (this.soundEngine) this.soundEngine.fireSound();

      if (this.tubeLabel) this.tubeLabel.textContent = 'Горіння: CO₂ + H₂O';

      if (this.equationPanel) {
        this.equationPanel.classList.remove('hidden');
        this.equationPanel.innerHTML = `
          <div class="equation-box">
            <span class="equation-text">C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O</span>
          </div>
        `;
      }

      if (this.observationPanel) {
        this.observationPanel.innerHTML = `
          <div class="observation-card">
            <strong>Спостереження:</strong> Етанол горить блакитним полум'ям. 
            Утворюється вуглекислий газ та вода. Виділяється значна кількість тепла.
          </div>
        `;
      }

      if (!this.completedReactions.has('O2')) {
        this.completedReactions.add('O2');
        if (this.xpSystem) this.xpSystem.addXP(25);
      }
    }

    startCopperOxideReaction() {
      this.cuoParticles = [];
      for (let i = 0; i < 45; i++) {
        this.cuoParticles.push({
          x: 175 + Math.random() * 50,
          y: 70 + Math.random() * 30,
          vy: 1.6 + Math.random() * 1.8,
          radius: 2 + Math.random() * 2.5,
          isReduced: false,
          color: '#1e293b'
        });
      }

      if (this.soundEngine) this.soundEngine.reactionSound();

      if (this.tubeLabel) this.tubeLabel.textContent = 'Ацетальдегід + Cu + H₂O';

      if (this.equationPanel) {
        this.equationPanel.classList.remove('hidden');
        this.equationPanel.innerHTML = `
          <div class="equation-box">
            <span class="equation-text">C₂H₅OH + CuO → CH₃CHO + Cu + H₂O</span>
          </div>
        `;
      }

      if (this.observationPanel) {
        this.observationPanel.innerHTML = `
          <div class="observation-card">
            <strong>Спостереження:</strong> Чорний купрум(ІІ) оксид змінює колір на червоний 
            (відновлюється до міді). Відчувається характерний запах оцтового альдегіду.
          </div>
        `;
      }

      if (!this.completedReactions.has('CuO')) {
        this.completedReactions.add('CuO');
        if (this.xpSystem) this.xpSystem.addXP(25);
      }
    }

    resetLab() {
      this.currentReaction = 'idle';
      this.bubbles = [];
      this.flameParticles = [];
      this.cuoParticles = [];
      this.sodiumChunk = null;

      this.liquidCurrentLevel = this.liquidBaseLevel;
      this.liquidColor = { r: 56, g: 189, b: 248, a: 0.42 };

      this.reagentBtns.forEach((b) => b.classList.remove('active'));

      if (this.tubeLabel) this.tubeLabel.textContent = 'Етанол (C₂H₅OH)';

      if (this.equationPanel) {
        this.equationPanel.classList.add('hidden');
        this.equationPanel.innerHTML = '';
      }

      if (this.observationPanel) {
        this.observationPanel.innerHTML = `
          <div class="observation-placeholder">
            Оберіть реагент вище, щоб дослідити хімічні властивості спирту.
          </div>
        `;
      }
    }

    start() {
      if (!this.animationFrameId) this.animate();
    }

    animate() {
      if (!this.ctx || !this.canvas) return;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.drawStand();
      this.updatePhysics();
      this.drawTestTube();

      this.animationFrameId = requestAnimationFrame(this.animate);
    }

    updatePhysics() {
      if (this.currentReaction === 'Na') {
        if (this.sodiumChunk) {
          if (!this.sodiumChunk.settled) {
            this.sodiumChunk.y += this.sodiumChunk.vy;
            if (this.sodiumChunk.y >= 350) {
              this.sodiumChunk.y = 350;
              this.sodiumChunk.settled = true;
            }
          } else {
            this.sodiumChunk.x = 200 + Math.sin(Date.now() * 0.008) * 12;

            if (Math.random() < 0.4) {
              this.bubbles.push({
                x: this.sodiumChunk.x + (Math.random() - 0.5) * 8,
                y: this.sodiumChunk.y,
                radius: 2 + Math.random() * 4.5,
                vy: 1.8 + Math.random() * 2.2,
                wobble: Math.random() * Math.PI
              });
              if (Math.random() < 0.25 && this.soundEngine) {
                this.soundEngine.bubbleSound();
              }
            }
          }
        }

        this.bubbles.forEach((b) => {
          b.y -= b.vy;
          b.wobble += 0.1;
          b.x += Math.sin(b.wobble) * 0.8;
        });
        const surfaceY = 440 - this.liquidCurrentLevel;
        this.bubbles = this.bubbles.filter((b) => b.y > surfaceY);

        this.liquidColor.r = Math.min(65, this.liquidColor.r + 0.05);
        this.liquidColor.g = Math.min(225, this.liquidColor.g + 0.1);
        this.liquidColor.b = Math.min(235, this.liquidColor.b + 0.1);
      }

      if (this.currentReaction === 'O2') {
        if (this.liquidCurrentLevel > 110) {
          this.liquidCurrentLevel -= 0.12;
        }

        for (let i = 0; i < 4; i++) {
          this.flameParticles.push({
            x: 200 + (Math.random() - 0.5) * 36,
            y: 110,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -(2.8 + Math.random() * 3.5),
            radius: 8 + Math.random() * 10,
            life: 1.0,
            decay: 0.02 + Math.random() * 0.025
          });
        }

        this.flameParticles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= p.decay;
        });
        this.flameParticles = this.flameParticles.filter((p) => p.life > 0);
      }

      if (this.currentReaction === 'CuO') {
        const bottomY = 430;
        this.cuoParticles.forEach((p) => {
          if (p.y < bottomY) p.y += p.vy;
          if (p.y > 230 && !p.isReduced) {
            p.isReduced = true;
            p.color = '#ea580c';
          }
        });

        this.liquidColor.r = Math.min(245, this.liquidColor.r + 0.2);
        this.liquidColor.g = Math.min(190, this.liquidColor.g + 0.15);
        this.liquidColor.b = Math.max(80, this.liquidColor.b - 0.2);
      }
    }

    drawStand() {
      const ctx = this.ctx;
      ctx.save();
      ctx.fillStyle = '#334155';
      ctx.fillRect(80, 470, 240, 16);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(115, 60, 10, 410);
      ctx.fillStyle = '#475569';
      ctx.fillRect(125, 175, 40, 8);
      ctx.fillRect(165, 165, 8, 28);
      ctx.fillRect(227, 165, 8, 28);
      ctx.restore();
    }

    drawTestTube() {
      const ctx = this.ctx;
      const tubeX = 160;
      const tubeY = 100;
      const tubeW = 80;
      const tubeH = 340;
      const radius = tubeW / 2;

      ctx.save();
      const liquidH = Math.min(tubeH - 20, this.liquidCurrentLevel);
      const liquidTopY = tubeY + tubeH - liquidH;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tubeX, tubeY);
      ctx.lineTo(tubeX, tubeY + tubeH - radius);
      ctx.arc(tubeX + radius, tubeY + tubeH - radius, radius, Math.PI, 0, true);
      ctx.lineTo(tubeX + tubeW, tubeY);
      ctx.closePath();
      ctx.clip();

      const liquidGrad = ctx.createLinearGradient(tubeX, liquidTopY, tubeX + tubeW, liquidTopY);
      liquidGrad.addColorStop(0, `rgba(${this.liquidColor.r}, ${this.liquidColor.g}, ${this.liquidColor.b}, ${this.liquidColor.a})`);
      liquidGrad.addColorStop(0.5, `rgba(${this.liquidColor.r}, ${this.liquidColor.g}, ${this.liquidColor.b}, ${this.liquidColor.a * 1.25})`);
      liquidGrad.addColorStop(1, `rgba(${this.liquidColor.r}, ${this.liquidColor.g}, ${this.liquidColor.b}, ${this.liquidColor.a})`);

      ctx.fillStyle = liquidGrad;
      ctx.fillRect(tubeX, liquidTopY, tubeW, liquidH + 20);

      ctx.beginPath();
      ctx.ellipse(tubeX + radius, liquidTopY, radius, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.liquidColor.r}, ${this.liquidColor.g}, ${this.liquidColor.b}, 0.65)`;
      ctx.fill();

      if (this.currentReaction === 'Na') {
        if (this.sodiumChunk) {
          ctx.beginPath();
          ctx.rect(this.sodiumChunk.x - 7, this.sodiumChunk.y - 7, 14, 14);
          ctx.fillStyle = '#cbd5e1';
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();
        }

        this.bubbles.forEach((b) => {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.strokeStyle = 'rgba(186, 230, 253, 0.9)';
          ctx.lineWidth = 1;
          ctx.fill();
          ctx.stroke();
        });
      }

      if (this.currentReaction === 'CuO') {
        this.cuoParticles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
      }

      ctx.restore();

      ctx.beginPath();
      ctx.ellipse(tubeX + radius, tubeY, radius + 4, 6, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(tubeX, tubeY);
      ctx.lineTo(tubeX, tubeY + tubeH - radius);
      ctx.arc(tubeX + radius, tubeY + tubeH - radius, radius, Math.PI, 0, true);
      ctx.lineTo(tubeX + tubeW, tubeY);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(tubeX + 8, tubeY + 15);
      ctx.lineTo(tubeX + 8, tubeY + tubeH - radius);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.2;
      for (let y = tubeY + 60; y < tubeY + tubeH - 40; y += 28) {
        ctx.beginPath();
        ctx.moveTo(tubeX + 12, y);
        ctx.lineTo(tubeX + 22, y);
        ctx.stroke();
      }

      if (this.currentReaction === 'O2') {
        this.flameParticles.forEach((p) => {
          ctx.save();
          const flameGrad = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, p.radius);
          flameGrad.addColorStop(0, `rgba(255, 255, 255, ${p.life * 0.9})`);
          flameGrad.addColorStop(0.35, `rgba(56, 189, 248, ${p.life * 0.75})`);
          flameGrad.addColorStop(0.75, `rgba(37, 99, 235, ${p.life * 0.45})`);
          flameGrad.addColorStop(1, 'rgba(30, 58, 138, 0)');

          ctx.fillStyle = flameGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      ctx.restore();
    }
  }

  /* ==========================================================================
   * 8. QUIZ SYSTEM (ТЕСТОВИЙ МОДУЛЬ)
   * ========================================================================== */
  class QuizSystem {
    constructor(soundEngine, xpSystem) {
      this.soundEngine = soundEngine;
      this.xpSystem = xpSystem;

      this.quizContainer = document.getElementById('quiz-container');
      this.progressFill = document.getElementById('quiz-progress-fill');
      this.currentNumEl = document.getElementById('quiz-current');
      this.totalNumEl = document.getElementById('quiz-total');
      this.resultPanel = document.getElementById('quiz-result');

      this.currentIndex = 0;
      this.score = 0;
      this.answeredQuestions = new Array(5).fill(false);

      this.questions = [
        {
          id: 1,
          type: 'classification',
          title: 'Класифікуйте спирти: перетягніть картки у відповідні категорії',
          instruction: 'Розподіліть картки спиртів на Одноатомні та Багатоатомні:',
          items: [
            { id: 'c1', name: 'Метанол', category: 'mono' },
            { id: 'c2', name: 'Етанол', category: 'mono' },
            { id: 'c3', name: 'Гліцерол', category: 'poly' },
            { id: 'c4', name: 'Етиленгліколь', category: 'poly' },
            { id: 'c5', name: 'Пропан-1-ол', category: 'mono' }
          ]
        },
        {
          id: 2,
          type: 'balance',
          title: 'Розставте коефіцієнти у рівнянні горіння етанолу:',
          instruction: 'Підберіть цілі коефіцієнти для зрівнювання реакції горіння:',
          correct: [1, 3, 2, 3]
        },
        {
          id: 3,
          type: 'multiple_choice',
          title: 'Яка функціональна група характерна для спиртів?',
          instruction: 'Оберіть одну правильну відповідь зі списку:',
          options: [
            { id: 'opt1', text: '-COOH', correct: false },
            { id: 'opt2', text: '-OH', correct: true },
            { id: 'opt3', text: '-CHO', correct: false },
            { id: 'opt4', text: '-NH₂', correct: false }
          ],
          explanation: 'Характеристичною функціональною групою спиртів є гідроксильна група (-OH).'
        },
        {
          id: 4,
          type: 'true_false',
          title: 'Міфи та правда про етанол',
          instruction: 'Визначте правдивість наступних 3 тверджень:',
          statements: [
            {
              id: 's1',
              text: 'Етанол використовується як паливо',
              answer: true,
              comment: 'Правда: етанол широко застосовується як біопаливо та октанопідвищувальний компонент бензинів.'
            },
            {
              id: 's2',
              text: 'Етанол замерзає при 0°C',
              answer: false,
              comment: 'Міф: температура замерзання етанолу становить -114°C, саме тому спиртові термометри використовують на морозі.'
            },
            {
              id: 's3',
              text: 'Етанол є наркотичною отрутою',
              answer: true,
              comment: 'Правда: етанол є токсичною речовиною з наркотичною дією, що пригнічує центральну нервову систему.'
            }
          ]
        },
        {
          id: 5,
          type: 'multiple_choice',
          title: 'Що утворюється при окисненні етанолу купрум(ІІ) оксидом?',
          instruction: 'Оберіть продукт реакції C₂H₅OH + CuO:',
          options: [
            { id: 'opt1', text: 'Оцтова кислота', correct: false },
            { id: 'opt2', text: 'Оцтовий альдегід', correct: true },
            { id: 'opt3', text: 'Діетиловий ефір', correct: false },
            { id: 'opt4', text: 'Етилен', correct: false }
          ],
          explanation: 'При взаємодії гарячого купрум(ІІ) оксиду з етанолом утворюється оцтовий альдегід (ацетальдегід), червона мідь та вода.'
        }
      ];
    }

    init() {
      if (!this.quizContainer) return;
      if (this.totalNumEl) this.totalNumEl.textContent = `${this.questions.length}`;
      this.renderQuestion(0);
    }

    renderQuestion(index) {
      this.currentIndex = index;
      if (this.currentNumEl) this.currentNumEl.textContent = `${index + 1}`;
      if (this.progressFill) {
        const pct = (index / this.questions.length) * 100;
        this.progressFill.style.width = `${pct}%`;
      }

      const q = this.questions[index];
      let contentHTML = `
        <div class="quiz-card animate-fade-in" data-q-id="${q.id}">
          <div class="quiz-header">
            <h3 class="quiz-title">${q.title}</h3>
            <p class="quiz-instruction">${q.instruction}</p>
          </div>
          <div class="quiz-body">
      `;

      if (q.type === 'classification') {
        contentHTML += this.renderClassificationBody(q);
      } else if (q.type === 'balance') {
        contentHTML += this.renderBalanceBody(q);
      } else if (q.type === 'multiple_choice') {
        contentHTML += this.renderMultipleChoiceBody(q);
      } else if (q.type === 'true_false') {
        contentHTML += this.renderTrueFalseBody(q);
      }

      contentHTML += `
          </div>
          <div class="quiz-feedback hidden" id="quiz-feedback-box"></div>
          <div class="quiz-footer">
            <button class="btn btn-secondary" id="quiz-prev-btn" ${index === 0 ? 'disabled' : ''}>← Назад</button>
            <button class="btn btn-primary" id="quiz-action-btn">Перевірити відповідь</button>
          </div>
        </div>
      `;

      this.quizContainer.innerHTML = contentHTML;
      this.attachQuestionHandlers(q);
    }

    renderClassificationBody(q) {
      return `
        <div class="classification-board">
          <div class="classification-tray" id="classify-tray">
            <div class="classify-hint">Картки (перетягніть або натисніть):</div>
            <div class="cards-list">
              ${q.items.map((it) => `
                <div class="classify-card" draggable="true" data-item-id="${it.id}" data-category="${it.category}">
                  ${it.name}
                </div>
              `).join('')}
            </div>
          </div>
          <div class="classification-zones">
            <div class="classify-zone" data-zone="mono">
              <div class="zone-title">Одноатомні</div>
              <div class="zone-items" id="zone-mono"></div>
            </div>
            <div class="classify-zone" data-zone="poly">
              <div class="zone-title">Багатоатомні</div>
              <div class="zone-items" id="zone-poly"></div>
            </div>
          </div>
        </div>
      `;
    }

    renderBalanceBody() {
      return `
        <div class="balance-container">
          <div class="balance-equation-row">
            <div class="coef-group">
              <button class="coef-btn minus" data-input="c1">-</button>
              <input type="number" id="coef-c1" class="coef-input" value="1" min="1" max="9" />
              <button class="coef-btn plus" data-input="c1">+</button>
            </div>
            <span class="formula-term">C₂H₅OH</span>
            <span class="operator">+</span>
            <div class="coef-group">
              <button class="coef-btn minus" data-input="c2">-</button>
              <input type="number" id="coef-c2" class="coef-input" value="1" min="1" max="9" />
              <button class="coef-btn plus" data-input="c2">+</button>
            </div>
            <span class="formula-term">O₂</span>
            <span class="operator">→</span>
            <div class="coef-group">
              <button class="coef-btn minus" data-input="c3">-</button>
              <input type="number" id="coef-c3" class="coef-input" value="1" min="1" max="9" />
              <button class="coef-btn plus" data-input="c3">+</button>
            </div>
            <span class="formula-term">CO₂</span>
            <span class="operator">+</span>
            <div class="coef-group">
              <button class="coef-btn minus" data-input="c4">-</button>
              <input type="number" id="coef-c4" class="coef-input" value="1" min="1" max="9" />
              <button class="coef-btn plus" data-input="c4">+</button>
            </div>
            <span class="formula-term">H₂O</span>
          </div>
        </div>
      `;
    }

    renderMultipleChoiceBody(q) {
      return `
        <div class="mc-options-grid">
          ${q.options.map((opt) => `
            <button class="mc-option-btn" data-opt-id="${opt.id}" data-correct="${opt.correct}">
              <span class="opt-text">${opt.text}</span>
            </button>
          `).join('')}
        </div>
      `;
    }

    renderTrueFalseBody(q) {
      return `
        <div class="tf-statements-list">
          ${q.statements.map((st) => `
            <div class="tf-statement-row" data-st-id="${st.id}">
              <div class="tf-text">${st.text}</div>
              <div class="tf-buttons">
                <button class="tf-btn" data-choice="true">Правда</button>
                <button class="tf-btn" data-choice="false">Міф</button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    attachQuestionHandlers(q) {
      const actionBtn = document.getElementById('quiz-action-btn');
      const prevBtn = document.getElementById('quiz-prev-btn');

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          if (this.currentIndex > 0) {
            this.renderQuestion(this.currentIndex - 1);
          }
        });
      }

      if (q.type === 'classification') {
        const cards = document.querySelectorAll('.classify-card');
        const zoneMono = document.getElementById('zone-mono');
        const zonePoly = document.getElementById('zone-poly');
        const trayList = document.querySelector('#classify-tray .cards-list');
        const zones = document.querySelectorAll('.classify-zone');

        cards.forEach((card) => {
          card.addEventListener('click', () => {
            const parent = card.parentElement;
            if (parent === trayList) {
              zoneMono.appendChild(card);
            } else if (parent === zoneMono) {
              zonePoly.appendChild(card);
            } else {
              trayList.appendChild(card);
            }
          });

          card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', card.dataset.itemId);
          });
        });

        zones.forEach((zone) => {
          zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
          });
          zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
          });
          zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            const itemId = e.dataTransfer.getData('text/plain');
            const cardEl = document.querySelector(`.classify-card[data-item-id="${itemId}"]`);
            if (cardEl) {
              zone.querySelector('.zone-items').appendChild(cardEl);
            }
          });
        });
      }

      if (q.type === 'balance') {
        const coefBtns = document.querySelectorAll('.coef-btn');
        coefBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            const inputId = `coef-${btn.dataset.input}`;
            const input = document.getElementById(inputId);
            if (!input) return;
            let val = parseInt(input.value, 10) || 1;
            if (btn.classList.contains('plus')) {
              val = Math.min(9, val + 1);
            } else {
              val = Math.max(1, val - 1);
            }
            input.value = val;
          });
        });
      }

      if (q.type === 'multiple_choice') {
        const optBtns = document.querySelectorAll('.mc-option-btn');
        optBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            optBtns.forEach((b) => b.classList.remove('selected'));
            btn.classList.add('selected');
          });
        });
      }

      if (q.type === 'true_false') {
        const rows = document.querySelectorAll('.tf-statement-row');
        rows.forEach((row) => {
          const btns = row.querySelectorAll('.tf-btn');
          btns.forEach((btn) => {
            btn.addEventListener('click', () => {
              btns.forEach((b) => b.classList.remove('selected'));
              btn.classList.add('selected');
            });
          });
        });
      }

      if (actionBtn) {
        actionBtn.addEventListener('click', () => {
          if (actionBtn.dataset.state === 'next') {
            this.goToNextQuestion();
          } else {
            this.evaluateCurrentQuestion(q);
          }
        });
      }
    }

    evaluateCurrentQuestion(q) {
      const feedbackBox = document.getElementById('quiz-feedback-box');
      const actionBtn = document.getElementById('quiz-action-btn');
      let isCorrect = false;
      let feedbackText = '';

      if (q.type === 'classification') {
        const monoCards = Array.from(document.querySelectorAll('#zone-mono .classify-card'));
        const polyCards = Array.from(document.querySelectorAll('#zone-poly .classify-card'));

        const monoCorrect = monoCards.every((c) => c.dataset.category === 'mono') && monoCards.length === 3;
        const polyCorrect = polyCards.every((c) => c.dataset.category === 'poly') && polyCards.length === 2;

        isCorrect = monoCorrect && polyCorrect;
        feedbackText = isCorrect
          ? 'Правильно! Одноатомні: Метанол, Етанол, Пропан-1-ол. Багатоатомні: Гліцерол (3 OH-групи), Етиленгліколь (2 OH-групи).'
          : 'Помилка класифікації! Одноатомні містять 1 групу -OH, а багатоатомні — 2 і більше.';
      } else if (q.type === 'balance') {
        const c1 = parseInt(document.getElementById('coef-c1').value, 10);
        const c2 = parseInt(document.getElementById('coef-c2').value, 10);
        const c3 = parseInt(document.getElementById('coef-c3').value, 10);
        const c4 = parseInt(document.getElementById('coef-c4').value, 10);

        isCorrect = c1 === 1 && c2 === 3 && c3 === 2 && c4 === 3;
        feedbackText = isCorrect
          ? 'Чудово! Правильні коефіцієнти: 1 C₂H₅OH + 3 O₂ → 2 CO₂ + 3 H₂O.'
          : 'Неправильно. Правильні коефіцієнти: 1, 3, 2, 3.';
      } else if (q.type === 'multiple_choice') {
        const selected = document.querySelector('.mc-option-btn.selected');
        if (!selected) {
          alert('Оберіть один із варіантів!');
          return;
        }
        isCorrect = selected.dataset.correct === 'true';
        selected.classList.add(isCorrect ? 'correct' : 'wrong');
        feedbackText = isCorrect
          ? `Правильно! ${q.explanation}`
          : `Невірно. ${q.explanation}`;
      } else if (q.type === 'true_false') {
        const rows = document.querySelectorAll('.tf-statement-row');
        let allAnswered = true;
        let correctCount = 0;

        rows.forEach((row, idx) => {
          const selected = row.querySelector('.tf-btn.selected');
          if (!selected) allAnswered = false;
          else {
            const userChoice = selected.dataset.choice === 'true';
            const expected = q.statements[idx].answer;
            if (userChoice === expected) {
              correctCount++;
              selected.classList.add('correct');
            } else {
              selected.classList.add('wrong');
            }
          }
        });

        if (!allAnswered) {
          alert('Будь ласка, оберіть відповідь для кожного твердження!');
          return;
        }

        isCorrect = correctCount === q.statements.length;
        feedbackText = isCorrect
          ? 'Відмінно! Усі твердження оцінено вірно.'
          : 'Є помилки у твердженнях. Пам\'ятайте: етанол замерзає при -114°C!';
      }

      if (isCorrect) {
        if (!this.answeredQuestions[this.currentIndex]) {
          this.score++;
          if (this.xpSystem) this.xpSystem.addXP(20);
        }
        if (this.soundEngine) this.soundEngine.correctSound();
      } else {
        if (this.soundEngine) this.soundEngine.incorrectSound();
      }

      this.answeredQuestions[this.currentIndex] = true;

      if (feedbackBox) {
        feedbackBox.classList.remove('hidden', 'success', 'error');
        feedbackBox.classList.add(isCorrect ? 'success' : 'error');
        feedbackBox.innerHTML = `
          <div class="feedback-badge">${isCorrect ? '✓ Правильно' : '✗ Помилка'}</div>
          <div class="feedback-message">${feedbackText}</div>
        `;
      }

      if (actionBtn) {
        actionBtn.dataset.state = 'next';
        actionBtn.textContent = this.currentIndex === this.questions.length - 1 ? 'Завершити тест' : 'Наступне питання →';
      }
    }

    goToNextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.renderQuestion(this.currentIndex + 1);
      } else {
        this.showFinalResults();
      }
    }

    showFinalResults() {
      if (this.progressFill) this.progressFill.style.width = '100%';
      if (this.quizContainer) this.quizContainer.innerHTML = '';
      if (this.resultPanel) {
        this.resultPanel.classList.remove('hidden');

        const pct = Math.round((this.score / this.questions.length) * 100);
        let message = 'Спробуйте повторити теорію та пройти тест ще раз!';
        let badgeIcon = '🧪';

        if (this.score === 5) {
          message = 'Бездоганний результат! Ви чудово засвоїли тему спиртів!';
          badgeIcon = '🏆';
        } else if (this.score >= 3) {
          message = 'Гарна робота! Основні хімічні принципи засвоєно.';
          badgeIcon = '🌟';
        }

        this.resultPanel.innerHTML = `
          <div class="quiz-result-card animate-scale-up">
            <div class="result-icon">${badgeIcon}</div>
            <h3 class="result-title">Результати тестування</h3>
            <div class="result-score">
              <span class="score-number">${this.score}</span> / ${this.questions.length}
            </div>
            <div class="result-percentage">${pct}% правильних відповідей</div>
            <p class="result-message">${message}</p>
            <div class="result-actions">
              <button class="btn btn-primary" id="restart-quiz-btn">Пройти тест знову</button>
            </div>
          </div>
        `;

        const restartBtn = document.getElementById('restart-quiz-btn');
        if (restartBtn) {
          restartBtn.addEventListener('click', () => {
            this.resetQuiz();
          });
        }
      }
    }

    resetQuiz() {
      this.currentIndex = 0;
      this.score = 0;
      this.answeredQuestions = new Array(5).fill(false);
      if (this.resultPanel) this.resultPanel.classList.add('hidden');
      this.renderQuestion(0);
    }
  }

  /* ==========================================================================
   * 9. НАВІГАЦІЯ, ТАБИ ТА СКРОЛІНГ
   * ========================================================================== */
  class NavigationManager {
    constructor() {
      this.navLinks = document.querySelectorAll('.nav-link[data-section]');
      this.tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
      this.tabContents = document.querySelectorAll('.tab-content[data-tab-content]');
    }

    init() {
      this.bindNavLinks();
      this.bindTabs();
      this.bindScrollObserver();
    }

    bindNavLinks() {
      // 1. Logo and Home Links: Scroll smoothly to the very top
      const scrollToTop = (e) => {
        if (e) e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.navLinks.forEach((l) => l.classList.remove('active'));
        const homeLink = document.querySelector('.nav-link[data-section="hero-section"]');
        if (homeLink) homeLink.classList.add('active');
        const bottomTabs = document.querySelectorAll('.mobile-tab-item');
        bottomTabs.forEach((tab) => {
          tab.classList.toggle('active', tab.getAttribute('data-bottom-nav') === 'hero-section');
        });
      };

      const headerLogo = document.getElementById('header-logo');
      if (headerLogo) {
        headerLogo.addEventListener('click', scrollToTop);
      }

      const mobileHomeTab = document.querySelector('.mobile-tab-item[data-bottom-nav="hero-section"]');
      if (mobileHomeTab) {
        mobileHomeTab.addEventListener('click', scrollToTop);
      }

      this.navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetSectionId = link.dataset.section;
          if (targetSectionId === 'hero-section') {
            scrollToTop(e);
            return;
          }
          const sectionEl = document.getElementById(targetSectionId);

          if (sectionEl) {
            sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

            this.navLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      });
    }

    bindTabs() {
      this.tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const tabName = btn.dataset.tab;

          this.tabBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          this.tabContents.forEach((content) => {
            if (content.dataset.tabContent === tabName) {
              content.classList.remove('hidden');
              content.classList.add('active');
            } else {
              content.classList.add('hidden');
              content.classList.remove('active');
            }
          });

          if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
          }
        });
      });
    }

    bindScrollObserver() {
      const sectionIds = ['hero-section', 'th-1', 'th-3', 'th-4', 'detective-game-section', 'th-quiz'];
      const sectionEls = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const activeId = entry.target.id;
              this.navLinks.forEach((link) => {
                if (link.dataset.section === activeId) {
                  link.classList.add('active');
                } else {
                  link.classList.remove('active');
                }
              });

              // Sync mobile bottom navigation tabs as well
              const bottomTabs = document.querySelectorAll('.mobile-tab-item');
              bottomTabs.forEach((tab) => {
                const target = tab.getAttribute('data-bottom-nav') || (tab.getAttribute('href') || '').replace('#', '');
                tab.classList.toggle('active', target === activeId);
              });
            }
          });
        },
        { threshold: 0.35 }
      );

      sectionEls.forEach((sec) => observer.observe(sec));

      const header = document.querySelector('header, .app-header');
      if (header) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 40) {
            header.classList.add('header-scrolled');
          } else {
            header.classList.remove('header-scrolled');
          }
        }, { passive: true });
      }
    }
  }

  /* ==========================================================================
   * 10. ГОЛОВНИЙ ДОДАТОК (CHEMISTRY APP)
   * ========================================================================== */
  /* ==========================================================================
   * 9.5. ІГРОВИЙ МОДУЛЬ ДЛЯ 10 КЛАСУ: «ХІМІЧНИЙ ДЕТЕКТИВ: СПИРТИ» (3 РІВНІ)
   * ========================================================================== */
  class ChemicalDetectiveGame {
    constructor(soundEngine, xpSystem) {
      this.soundEngine = soundEngine;
      this.xpSystem = xpSystem;

      this.currentLevel = 1;
      this.levelCompleted = { 1: false, 2: false, 3: false };

      // Рівень 1: дані пробірок (9 спиртів + 1 зайва речовина)
      this.alcoholPool = [
        {
          formula: 'CH₃OH',
          name: 'Метанол',
          hint: 'Це насичений одноатомний спирт (метанол). Він має функціональну групу —OH біля метильного радикала CH₃—. Шукайте речовину іншого класу!'
        },
        {
          formula: 'C₂H₅OH',
          name: 'Етанол',
          hint: 'Це класичний одноатомний спирт (етанол). Має групу —OH, з’єднану з етильним радикалом C₂H₅—. Він тут на своєму місці!'
        },
        {
          formula: 'CH₃CH₂CH₂OH',
          name: 'Пропан-1-ол',
          hint: 'Це первинний пропіловий спирт. Функціональна група —OH приєднана до першого атома Карбону. Шукайте далі!'
        },
        {
          formula: 'CH₃CH(OH)CH₃',
          name: 'Пропан-2-ол',
          hint: 'Це вторинний спирт (ізопропанол). Група —OH розташована біля другого атома Карбону. Це справжній спирт!'
        },
        {
          formula: 'C₄H₉OH',
          name: 'Бутан-1-ол',
          hint: 'Це одноатомний спирт (бутанол), гомолог етанолу та метанолу, бо має групу —OH. Спробуйте іншу пробірку!'
        },
        {
          formula: 'HOCH₂—CH₂OH',
          name: 'Етан-1,2-діол',
          hint: 'Це етиленгліколь — двохатомний спирт (має дві групи —OH). Хоч груп дві, це все одно представник класу спиртів!'
        },
        {
          formula: 'C₃H₅(OH)₃',
          name: 'Гліцерол',
          hint: 'Це трьохатомний спирт (гліцерин) із трьома гідроксильними групами —OH. Належить до багатоатомних спиртів!'
        },
        {
          formula: 'C₅H₁₁OH',
          name: 'Пентан-1-ол',
          hint: 'Це аміловий спирт (пентанол). Наявність функціональної групи —OH біля алкільного радикала підтверджує, що це спирт.'
        },
        {
          formula: 'C₆H₅CH₂OH',
          name: 'Бензиловий спирт',
          hint: 'Це ароматичний спирт: група —OH приєднана до групи —CH₂—, а не напряму до бензенового кільця. Це теж спирт!'
        }
      ];

      this.impostors = [
        {
          formula: 'CH₃COOH',
          name: 'Етанова кислота',
          explanation: 'Це карбонова кислота (оцтова кислота), бо має карбоксильну функціональну групу —COOH, а не спиртову групу —OH!'
        },
        {
          formula: 'C₂H₅COOH',
          name: 'Пропанова кислота',
          explanation: 'Це карбонова кислота (пропанова), бо містить карбоксильну групу —COOH (карбонільна C=O + гідроксильна —OH разом), тому це не спирт!'
        },
        {
          formula: 'HCOOH',
          name: 'Метанова кислота',
          explanation: 'Це мурашина (метанова) кислота, бо має функціональну групу —COOH. Вона маскувалася серед спиртів!'
        }
      ];

      this.impostorIndex = 0;
      this.lightsOn = false;

      // Рівень 2: Вільний конструктор у будь-якому розташуванні + перевірка структури
      this.maxInventory = { C: 3, OH: 3, H: 5 };
      this.maxValence = { C: 4, OH: 1, H: 1 };
      this.glyAtoms = new Map(); // id -> { id, type, x, y, el, bonds: Set }
      this.glySeq = 0;
      this.glyDrag = null;

      this.onGlyPointerDown = this.onGlyPointerDown.bind(this);
      this.onGlyPointerMove = this.onGlyPointerMove.bind(this);
      this.onGlyPointerUp = this.onGlyPointerUp.bind(this);

      // Рівень 3 (Бос): вибір гравця
      this.bossVerdict = null;
      this.bossReason = null;
    }

    init() {
      this.sectionEl = document.getElementById('detective-game-section');
      if (!this.sectionEl) return;

      this.bindLevelNavigation();
      this.initLevel1();
      this.initLevel2();
      this.initLevel3();
    }

    bindLevelNavigation() {
      const toLvl2Btn = document.getElementById('to-level-2-btn');
      if (toLvl2Btn) {
        toLvl2Btn.addEventListener('click', () => {
          document.getElementById('detective-level-2')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }

      const toLvl3Btn = document.getElementById('to-level-3-btn');
      if (toLvl3Btn) {
        toLvl3Btn.addEventListener('click', () => {
          document.getElementById('detective-level-3')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }

    /* ----------------------------------------------------------------------
     * РІВЕНЬ 1: СПРАВА ПРО ПЛУТАНИНУ В ПРОБІРКАХ (ЛІХТАРИК + 10 ФОРМУЛ)
     * ---------------------------------------------------------------------- */
    initLevel1() {
      this.arena = document.getElementById('flashlight-arena');
      this.tubesGrid = document.getElementById('detective-tubes-grid');
      this.toggleLightBtn = document.getElementById('toggle-flashlight-btn');
      this.shuffleBtn = document.getElementById('shuffle-tubes-btn');

      if (this.arena) {
        const updateLightPos = (clientX, clientY) => {
          const rect = this.arena.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          this.arena.style.setProperty('--fx', `${x}px`);
          this.arena.style.setProperty('--fy', `${y}px`);
        };

        this.arena.addEventListener('pointermove', (e) => {
          updateLightPos(e.clientX, e.clientY);
        });

        this.arena.addEventListener('touchmove', (e) => {
          if (e.touches && e.touches[0]) {
            updateLightPos(e.touches[0].clientX, e.touches[0].clientY);
          }
        }, { passive: true });
      }

      if (this.toggleLightBtn) {
        this.toggleLightBtn.addEventListener('click', () => {
          this.lightsOn = !this.lightsOn;
          if (this.arena) {
            this.arena.classList.toggle('lights-on', this.lightsOn);
          }
          const txt = document.getElementById('flashlight-btn-text');
          if (txt) {
            txt.textContent = this.lightsOn ? 'Режим УФ-ліхтарика' : 'Увімкнути світло в залі';
          }
        });
      }

      if (this.shuffleBtn) {
        this.shuffleBtn.addEventListener('click', () => {
          this.impostorIndex = (this.impostorIndex + 1) % this.impostors.length;
          this.renderTubes();
          this.setLevel1Feedback(
            'neutral',
            'Штатив оновлено: нова партія з 10 пробірок',
            'Наведіть промінь ліхтарика на кожну формулу та знайдіть сполуку, яка НЕ належить до спиртів.'
          );
        });
      }

      this.renderTubes();
    }

    renderTubes() {
      if (!this.tubesGrid) return;
      const impostor = this.impostors[this.impostorIndex];

      const items = [
        ...this.alcoholPool.map((item) => ({ ...item, isImpostor: false })),
        { ...impostor, isImpostor: true }
      ];

      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }

      this.tubesGrid.innerHTML = '';

      items.forEach((tube, idx) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'detective-tube-card group';
        card.innerHTML = `
          <span class="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
            Пробірка #${String(idx + 1).padStart(2, '0')}
          </span>
          <div class="tube-vial-visual">
            <div class="tube-vial-liquid"></div>
          </div>
          <div class="font-mono font-extrabold text-sm sm:text-base text-white group-hover:text-amber-300 transition">
            ${tube.formula}
          </div>
          <div class="tube-sublabel text-[11px] text-slate-400 mt-1 font-medium opacity-80">
            Натисніть для аналізу
          </div>
        `;

        card.addEventListener('click', () => {
          this.inspectTube(card, tube);
        });

        this.tubesGrid.appendChild(card);
      });
    }

    inspectTube(cardEl, tube) {
      const sublabel = cardEl.querySelector('.tube-sublabel');
      if (tube.isImpostor) {
        cardEl.classList.add('investigated-culprit');
        if (sublabel) {
          sublabel.textContent = `Зайвий! (${tube.name})`;
          sublabel.className = 'tube-sublabel text-[11px] text-rose-300 mt-1 font-bold';
        }
        if (this.soundEngine) this.soundEngine.correctSound();

        if (!this.levelCompleted[1]) {
          this.levelCompleted[1] = true;
          if (this.xpSystem) this.xpSystem.addXP(50);
        }

        this.setLevel1Feedback(
          'success',
          `Зайву пробірку викрито! (${tube.formula} — ${tube.name})`,
          tube.explanation
        );

        const nextBtn = document.getElementById('to-level-2-btn');
        if (nextBtn) nextBtn.classList.remove('hidden');
      } else {
        cardEl.classList.add('investigated-safe');
        if (sublabel) {
          sublabel.textContent = `Спирт (${tube.name})`;
          sublabel.className = 'tube-sublabel text-[11px] text-cyan-300 mt-1 font-semibold';
        }
        if (this.soundEngine) this.soundEngine.snapSound();

        this.setLevel1Feedback(
          'hint',
          `М'яка підказка детектива: ${tube.formula} (${tube.name}) — це справжній спирт`,
          tube.hint
        );
      }
    }

    setLevel1Feedback(type, title, text) {
      const box = document.getElementById('detective-lvl1-feedback');
      const titleEl = document.getElementById('lvl1-feedback-title');
      const textEl = document.getElementById('lvl1-feedback-text');
      const iconBox = document.getElementById('lvl1-status-icon');

      if (!box || !titleEl || !textEl) return;

      if (type === 'success') {
        box.className = 'mt-5 p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all';
        titleEl.className = 'text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold mb-1';
        if (iconBox) {
          iconBox.className = 'p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 flex-shrink-0 mt-0.5';
        }
      } else if (type === 'hint') {
        box.className = 'mt-5 p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all';
        titleEl.className = 'text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold mb-1';
        if (iconBox) {
          iconBox.className = 'p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex-shrink-0 mt-0.5';
        }
      } else {
        box.className = 'mt-5 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all';
        titleEl.className = 'text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-1';
      }

      titleEl.textContent = title;
      textEl.textContent = text;
    }

    /* ----------------------------------------------------------------------
     * РІВЕНЬ 2: ВІЛЬНИЙ КОНСТРУКТОР У БУДЬ-ЯКОМУ РОЗТАШУВАННІ + ПЕРЕВІРКА
     * ---------------------------------------------------------------------- */
    initLevel2() {
      this.blueprintEl = document.getElementById('glycerol-blueprint');
      this.atomsLayer = document.getElementById('glycerol-atoms-layer');
      this.bondsGroup = document.getElementById('glycerol-bonds-group');
      this.paletteEl = document.getElementById('glycerol-palette');
      const checkBtn = document.getElementById('glycerol-check-btn');
      const checkBottomBtn = document.getElementById('glycerol-check-bottom-btn');
      const hintBtn = document.getElementById('glycerol-hint-btn');
      const resetBtn = document.getElementById('glycerol-reset-btn');

      if (this.paletteEl) {
        this.paletteEl.querySelectorAll('.glycerol-frag-btn').forEach((btn) => {
          btn.removeAttribute('draggable');
          btn.addEventListener('dragstart', (e) => e.preventDefault());
        });
      }

      document.addEventListener('pointerdown', this.onGlyPointerDown);
      window.addEventListener('pointermove', this.onGlyPointerMove, { passive: false });
      window.addEventListener('pointerup', this.onGlyPointerUp);
      window.addEventListener('pointercancel', this.onGlyPointerUp);

      if (checkBtn) {
        checkBtn.addEventListener('click', () => {
          this.verifyGlycerolAssembly();
        });
      }
      if (checkBottomBtn) {
        checkBottomBtn.addEventListener('click', () => {
          this.verifyGlycerolAssembly();
        });
      }

      if (hintBtn) {
        hintBtn.addEventListener('click', () => {
          const statusMsg = document.getElementById('glycerol-status-msg');
          if (statusMsg) {
            statusMsg.innerHTML =
              '<strong class="text-amber-300">Порада слідчого:</strong> витягніть на поле 3 атоми <span class="text-cyan-300 font-mono">C</span> і з’єднайте їх у ланцюжок <span class="font-mono text-white">C—C—C</span> (у будь-якому напрямку). До кожного Карбону приєднайте по одній групі <span class="text-emerald-300 font-mono">—OH</span>, доповніть атомами <span class="text-purple-300 font-mono">H</span> і натисніть <strong>«Перевірити»</strong>!';
          }
        });
      }

      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.resetGlycerol();
        });
      }

      this.updateGlycerolCounters();
    }

    getRemainingCount(type) {
      let used = 0;
      this.glyAtoms.forEach((a) => {
        if (a.type === type) used++;
      });
      return Math.max(0, (this.maxInventory[type] || 0) - used);
    }

    onGlyPointerDown(e) {
      // 1. Перетягування нового фрагмента з лівої панелі (#glycerol-palette)
      const paletteBtn = e.target.closest ? e.target.closest('#glycerol-palette .glycerol-frag-btn') : null;
      if (paletteBtn) {
        const type = paletteBtn.dataset.fragType;
        if (!type || this.getRemainingCount(type) <= 0) {
          if (this.soundEngine) this.soundEngine.incorrectSound();
          return;
        }

        e.preventDefault();
        const ghost = document.createElement('div');
        ghost.className = 'gly-free-atom dragging';
        ghost.dataset.type = type;
        ghost.style.position = 'fixed';
        ghost.style.left = `${e.clientX}px`;
        ghost.style.top = `${e.clientY}px`;
        ghost.style.zIndex = '99999';
        ghost.style.pointerEvents = 'none';
        ghost.innerHTML = `<span>${type === 'OH' ? '—OH' : type}</span>`;
        document.body.appendChild(ghost);

        this.glyDrag = {
          mode: 'spawn',
          type,
          ghostEl: ghost,
          pointerId: e.pointerId
        };
        return;
      }

      // 2. Вільне переміщення будь-якого вже розміщеного фрагмента на полі (#glycerol-blueprint)
      const atomEl = e.target.closest ? e.target.closest('.gly-free-atom') : null;
      if (atomEl && this.blueprintEl && this.blueprintEl.contains(atomEl)) {
        e.preventDefault();
        const atomData = this.glyAtoms.get(atomEl.dataset.atomId);
        if (!atomData) return;

        const rect = this.blueprintEl.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;

        atomEl.classList.add('dragging');
        this.glyDrag = {
          mode: 'move',
          atomData,
          offX: atomData.x - px,
          offY: atomData.y - py,
          pointerId: e.pointerId
        };
      }
    }

    onGlyPointerMove(e) {
      if (!this.glyDrag || e.pointerId !== this.glyDrag.pointerId) return;
      e.preventDefault();

      if (this.glyDrag.mode === 'spawn') {
        this.glyDrag.ghostEl.style.left = `${e.clientX}px`;
        this.glyDrag.ghostEl.style.top = `${e.clientY}px`;
        return;
      }

      if (this.glyDrag.mode === 'move' && this.blueprintEl) {
        const rect = this.blueprintEl.getBoundingClientRect();
        const { atomData, offX, offY } = this.glyDrag;
        const clamp = (v, max) => Math.max(32, Math.min(max - 32, v));

        atomData.x = clamp(e.clientX - rect.left + offX, rect.width);
        atomData.y = clamp(e.clientY - rect.top + offY, rect.height);
        atomData.el.style.left = `${atomData.x}px`;
        atomData.el.style.top = `${atomData.y}px`;

        this.updateGlycerolBonds();
      }
    }

    onGlyPointerUp(e) {
      if (!this.glyDrag || e.pointerId !== this.glyDrag.pointerId) return;

      if (this.glyDrag.mode === 'spawn') {
        const { type, ghostEl } = this.glyDrag;
        ghostEl.remove();

        if (this.blueprintEl) {
          const rect = this.blueprintEl.getBoundingClientRect();
          const inside =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

          if (inside) {
            const x = Math.max(34, Math.min(rect.width - 34, e.clientX - rect.left));
            const y = Math.max(34, Math.min(rect.height - 34, e.clientY - rect.top));
            this.spawnGlyAtom(type, x, y);
          }
        }
      } else if (this.glyDrag.mode === 'move') {
        const { atomData } = this.glyDrag;
        atomData.el.classList.remove('dragging');

        if (this.blueprintEl) {
          const rect = this.blueprintEl.getBoundingClientRect();
          const outside =
            e.clientX < rect.left - 20 ||
            e.clientX > rect.right + 20 ||
            e.clientY < rect.top - 20 ||
            e.clientY > rect.bottom + 20;

          if (outside) {
            this.removeGlyAtom(atomData.id);
          } else {
            this.updateGlycerolBonds();
          }
        }
      }

      this.glyDrag = null;
    }

    spawnGlyAtom(type, x, y) {
      if (!this.atomsLayer || this.getRemainingCount(type) <= 0) return null;

      const id = `gly-${++this.glySeq}`;
      const el = document.createElement('div');
      el.className = 'gly-free-atom';
      el.dataset.atomId = id;
      el.dataset.type = type;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.innerHTML = `<span>${type === 'OH' ? '—OH' : type}</span>`;

      el.addEventListener('dblclick', () => {
        this.removeGlyAtom(id);
      });

      this.atomsLayer.appendChild(el);

      const atomData = { id, type, x, y, el, bonds: new Set() };
      this.glyAtoms.set(id, atomData);

      if (this.soundEngine) this.soundEngine.snapSound();
      this.updateGlycerolCounters();
      this.updateGlycerolBonds();
      return atomData;
    }

    removeGlyAtom(id) {
      const atom = this.glyAtoms.get(id);
      if (!atom) return;
      atom.bonds.forEach((nid) => {
        const neighbor = this.glyAtoms.get(nid);
        if (neighbor) neighbor.bonds.delete(id);
      });
      atom.el.remove();
      this.glyAtoms.delete(id);
      this.updateGlycerolCounters();
      this.updateGlycerolBonds();
    }

    // Утворення та розрив зв'язків у будь-якому розташуванні та між будь-якими зближеними фрагментами
    updateGlycerolBonds() {
      const CONNECT_DIST = 105;
      const atoms = Array.from(this.glyAtoms.values());

      const prevEdges = new Set();
      atoms.forEach((a) => {
        a.bonds.forEach((bid) => prevEdges.add([a.id, bid].sort().join('--')));
        a.bonds.clear();
      });

      // Збираємо всі пари в радіусі з'єднання, пріоритезуючи C—C та C—(H/OH) за найменшою відстанню
      const pairs = [];
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const a = atoms[i];
          const b = atoms[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist <= CONNECT_DIST) {
            const priority = (a.type === 'C' && b.type === 'C') ? 0 : (a.type === 'C' || b.type === 'C') ? 1 : 2;
            pairs.push({ a, b, dist, priority });
          }
        }
      }
      pairs.sort((p, q) => p.priority - q.priority || p.dist - q.dist);

      let newEdgeFormed = false;
      pairs.forEach(({ a, b }) => {
        if (a.bonds.size >= this.maxValence[a.type] || b.bonds.size >= this.maxValence[b.type]) return;
        a.bonds.add(b.id);
        b.bonds.add(a.id);
        const key = [a.id, b.id].sort().join('--');
        if (!prevEdges.has(key)) newEdgeFormed = true;
      });

      if (newEdgeFormed && this.soundEngine) {
        this.soundEngine.snapSound();
      }

      this.renderGlycerolSVGBonds();
    }

    renderGlycerolSVGBonds() {
      if (!this.bondsGroup) return;
      this.bondsGroup.innerHTML = '';
      const drawn = new Set();

      this.glyAtoms.forEach((a) => {
        a.bonds.forEach((bid) => {
          const b = this.glyAtoms.get(bid);
          if (!b) return;
          const key = [a.id, b.id].sort().join('--');
          if (drawn.has(key)) return;
          drawn.add(key);

          let cls = 'chemical-bond bond-ch';
          if (a.type === 'C' && b.type === 'C') cls = 'chemical-bond bond-cc';
          else if (a.type === 'OH' || b.type === 'OH') cls = 'chemical-bond bond-coh';

          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', a.x);
          line.setAttribute('y1', a.y);
          line.setAttribute('x2', b.x);
          line.setAttribute('y2', b.y);
          line.setAttribute('class', cls);
          this.bondsGroup.appendChild(line);
        });
      });
    }

    updateGlycerolCounters() {
      const remC = this.getRemainingCount('C');
      const remOH = this.getRemainingCount('OH');
      const remH = this.getRemainingCount('H');

      const elC = document.getElementById('remain-C');
      const elOH = document.getElementById('remain-OH');
      const elH = document.getElementById('remain-H');
      const badge = document.getElementById('glycerol-progress-badge');

      if (elC) elC.textContent = `×${remC}`;
      if (elOH) elOH.textContent = `×${remOH}`;
      if (elH) elH.textContent = `×${remH}`;
      if (badge) badge.textContent = `${this.glyAtoms.size} / 11 встановлено`;
    }

    // Генерація структурної формули для будь-якої зібраної на полі конструкції
    analyzeAssembledStructure() {
      if (this.glyAtoms.size === 0) {
        return {
          formula: '— (поле порожнє)',
          componentsCount: 0,
          isGlycerol: false,
          comment: 'Витягніть фрагменти C, H та —OH на стіл і з’єднайте їх між собою.'
        };
      }

      const sub = (n) => (n <= 1 ? '' : String(n).replace(/\d/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[d]));
      const visited = new Set();
      const componentFormulas = [];

      // Обхід компонент зв'язності (BFS)
      this.glyAtoms.forEach((startAtom) => {
        if (visited.has(startAtom.id)) return;
        const comp = [];
        const queue = [startAtom];
        visited.add(startAtom.id);

        while (queue.length > 0) {
          const curr = queue.shift();
          comp.push(curr);
          curr.bonds.forEach((nid) => {
            if (!visited.has(nid)) {
              const next = this.glyAtoms.get(nid);
              if (next) {
                visited.add(nid);
                queue.push(next);
              }
            }
          });
        }

        const carbons = comp.filter((a) => a.type === 'C');
        const ohs = comp.filter((a) => a.type === 'OH');
        const hs = comp.filter((a) => a.type === 'H');

        if (carbons.length === 0) {
          // Компонента без Карбону (наприклад, H₂O, H₂, H₂O₂ або окремий атом)
          if (comp.length === 1) {
            componentFormulas.push(comp[0].type === 'OH' ? '—OH' : comp[0].type);
          } else if (ohs.length === 1 && hs.length === 1) {
            componentFormulas.push('H—OH (H₂O)');
          } else if (hs.length === 2 && ohs.length === 0) {
            componentFormulas.push('H—H (H₂)');
          } else if (ohs.length === 2 && hs.length === 0) {
            componentFormulas.push('HO—OH (H₂O₂)');
          } else {
            componentFormulas.push(
              `${hs.length ? 'H' + sub(hs.length) : ''}${ohs.length ? '(OH)' + sub(ohs.length) : ''}`
            );
          }
          return;
        }

        // Впорядковуємо атоми Карбону вздовж ланцюга (починаючи з крайнього C)
        const cSet = new Set(carbons.map((c) => c.id));
        const endpoints = carbons.filter(
          (c) => Array.from(c.bonds).filter((id) => cSet.has(id)).length <= 1
        );
        const startC = (endpoints.length > 0 ? endpoints : carbons).sort((a, b) => a.x - b.x || a.y - b.y)[0];

        const orderedC = [];
        const seenC = new Set([startC.id]);
        const cQueue = [startC];
        while (cQueue.length > 0) {
          const c = cQueue.shift();
          orderedC.push(c);
          c.bonds.forEach((nid) => {
            if (cSet.has(nid) && !seenC.has(nid)) {
              seenC.add(nid);
              cQueue.push(this.glyAtoms.get(nid));
            }
          });
        }
        // Додаємо можливі незв'язані C у цій компоненті (якщо з'єднані через —OH)
        carbons.forEach((c) => {
          if (!seenC.has(c.id)) orderedC.push(c);
        });

        const groupStrings = orderedC.map((c) => {
          let hCount = 0;
          let ohCount = 0;
          c.bonds.forEach((nid) => {
            const nb = this.glyAtoms.get(nid);
            if (!nb) return;
            if (nb.type === 'H') hCount++;
            else if (nb.type === 'OH') ohCount++;
          });
          const hPart = hCount > 0 ? `H${sub(hCount)}` : '';
          const ohPart = ohCount === 1 ? '(OH)' : ohCount > 1 ? `(OH)${sub(ohCount)}` : '';
          return `C${hPart}${ohPart}`;
        });

        componentFormulas.push(groupStrings.join('—'));
      });

      const fullFormula = componentFormulas.join(' + ');

      // Перевірка, чи це правильний Гліцерол: CH₂(OH)—CH(OH)—CH₂(OH)
      const atoms = Array.from(this.glyAtoms.values());
      const carbons = atoms.filter((a) => a.type === 'C');
      const ohs = atoms.filter((a) => a.type === 'OH');
      const hs = atoms.filter((a) => a.type === 'H');

      let isGlycerol = false;
      let comment = '';

      if (componentFormulas.length > 1) {
        comment = `На столі ${componentFormulas.length} окремі нез’єднані частинки. Підведіть їх ближче, щоб об’єднати в одну молекулу гліцеролу!`;
      } else if (carbons.length !== 3 || ohs.length !== 3 || hs.length !== 5) {
        comment = `Використано ${this.glyAtoms.size} із 11 фрагментів (потрібно: 3 C, 3 —OH та 5 H). Додайте решту фрагментів зліва.`;
      } else if (!carbons.every((c) => c.bonds.size === 4)) {
        comment = 'Не всі атоми Карбону мають 4 зв’язки (валентність Карбону = IV). Перевірте приєднання атомів H та груп —OH!';
      } else if (!ohs.every((o) => o.bonds.size === 1) || !hs.every((h) => h.bonds.size === 1)) {
        comment = 'Кожна група —OH та кожен атом H у гліцеролі мають бути приєднані одним зв’язком безпосередньо до атома Карбону.';
      } else {
        const everyCarbonHasOneOH = carbons.every(
          (c) => Array.from(c.bonds).filter((id) => this.glyAtoms.get(id)?.type === 'OH').length === 1
        );
        const ccCounts = carbons
          .map((c) => Array.from(c.bonds).filter((id) => this.glyAtoms.get(id)?.type === 'C').length)
          .sort((a, b) => a - b);

        if (!everyCarbonHasOneOH) {
          comment = 'У молекулі гліцеролу (пропан-1,2,3-тріолу) біля КОЖНОГО з трьох атомів Карбону має бути рівно по одній групі —OH!';
        } else if (ccCounts[0] !== 1 || ccCounts[1] !== 1 || ccCounts[2] !== 2) {
          comment = 'Атоми Карбону повинні утворювати послідовний ланцюжок C—C—C.';
        } else {
          isGlycerol = true;
          comment = 'Бездоганно! Це трьохатомний спирт гліцерол (пропан-1,2,3-тріол, C₃H₅(OH)₃). Рівень зараховано!';
        }
      }

      return {
        formula: fullFormula,
        componentsCount: componentFormulas.length,
        isGlycerol,
        comment
      };
    }

    // Викликається при натисканні на кнопку «Перевірити»
    verifyGlycerolAssembly() {
      const report = this.analyzeAssembledStructure();

      const formulaEl = document.getElementById('glycerol-built-formula');
      const commentEl = document.getElementById('glycerol-built-comment');
      const readoutBox = document.getElementById('glycerol-formula-readout');
      const statusMsg = document.getElementById('glycerol-status-msg');
      const overlay = document.getElementById('glycerol-success-overlay');

      if (formulaEl) {
        formulaEl.textContent = report.formula;
      }
      if (commentEl) {
        commentEl.textContent = report.comment;
      }

      if (report.isGlycerol) {
        if (readoutBox) {
          readoutBox.className =
            'mt-4 w-full p-4 rounded-xl bg-emerald-950/60 border border-emerald-400/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all';
        }
        if (formulaEl) {
          formulaEl.className = 'text-base sm:text-xl font-mono font-black text-emerald-300 mt-0.5';
        }
        if (statusMsg) {
          statusMsg.innerHTML = `<strong class="text-emerald-300">Перевірка успішна!</strong> Ви склали формулу гліцеролу: <span class="font-mono text-white">${report.formula}</span>.`;
        }
        if (overlay) overlay.classList.remove('hidden');

        if (this.bondsGroup) {
          this.bondsGroup.querySelectorAll('.chemical-bond').forEach((l) => l.classList.add('bond-supercharged'));
        }

        if (this.soundEngine) this.soundEngine.reactionSound();

        if (!this.levelCompleted[2]) {
          this.levelCompleted[2] = true;
          if (this.xpSystem) this.xpSystem.addXP(75);
        }
      } else {
        if (readoutBox) {
          readoutBox.className =
            'mt-4 w-full p-4 rounded-xl bg-amber-950/40 border border-amber-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all';
        }
        if (formulaEl) {
          formulaEl.className = 'text-base sm:text-xl font-mono font-extrabold text-amber-300 mt-0.5';
        }
        if (statusMsg) {
          statusMsg.innerHTML = `<strong class="text-amber-300">Результат перевірки:</strong> отримано структуру <span class="font-mono text-white">${report.formula}</span>. ${report.comment}`;
        }
        if (overlay) overlay.classList.add('hidden');
        if (this.soundEngine) this.soundEngine.incorrectSound();
      }
    }

    resetGlycerol() {
      this.glyAtoms.clear();
      if (this.atomsLayer) this.atomsLayer.innerHTML = '';
      if (this.bondsGroup) this.bondsGroup.innerHTML = '';
      const overlay = document.getElementById('glycerol-success-overlay');
      if (overlay) overlay.classList.add('hidden');

      const formulaEl = document.getElementById('glycerol-built-formula');
      const commentEl = document.getElementById('glycerol-built-comment');
      const readoutBox = document.getElementById('glycerol-formula-readout');
      if (formulaEl) {
        formulaEl.textContent = 'Поле порожнє — перетягніть фрагменти та натисніть «Перевірити»';
        formulaEl.className = 'text-base sm:text-lg font-mono font-extrabold text-cyan-300 mt-0.5';
      }
      if (commentEl) {
        commentEl.textContent = 'Ви можете з’єднувати атоми C, H та групи —OH у будь-якому розташуванні на полі.';
      }
      if (readoutBox) {
        readoutBox.className =
          'mt-4 w-full p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3';
      }

      this.updateGlycerolCounters();
    }

    /* ----------------------------------------------------------------------
     * РІВЕНЬ 3 (ФІНАЛ): «ПАСТКА ТОКСИКОЛОГА: ОБІЙДИ ФАЛЬСИФІКАТ»
     * ---------------------------------------------------------------------- */
    initLevel3() {
      // Toggle theory dossier
      const theoryBtn = document.getElementById('toxic-theory-toggle-btn');
      const theoryDrawer = document.getElementById('toxic-theory-drawer');
      if (theoryBtn && theoryDrawer) {
        theoryBtn.addEventListener('click', () => {
          const isHidden = theoryDrawer.classList.toggle('hidden');
          const span = theoryBtn.querySelector('span');
          if (span) span.textContent = isHidden ? 'Довідник токсиколога' : 'Сховати довідник';
        });
      }

      // Initialize or reset toxicology state
      this.initToxicSamples();

      // Reset button
      const resetBtn = document.getElementById('toxic-reset-samples-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.initToxicSamples(true);
        });
      }

      // Flame test buttons
      const btnFlameA = document.getElementById('btn-flame-A');
      const btnFlameB = document.getElementById('btn-flame-B');
      if (btnFlameA) btnFlameA.addEventListener('click', () => this.runFlameTest('A'));
      if (btnFlameB) btnFlameB.addEventListener('click', () => this.runFlameTest('B'));

      // Copper wire test buttons
      const btnWireA = document.getElementById('btn-wire-A');
      const btnWireB = document.getElementById('btn-wire-B');
      if (btnWireA) btnWireA.addEventListener('click', () => this.runWireTest('A'));
      if (btnWireB) btnWireB.addEventListener('click', () => this.runWireTest('B'));

      // Drag-and-drop Poison Sticker (Mouse + Mobile Touch via Pointer Events)
      this.bindPoisonStickerDrag();
    }

    bindPoisonStickerDrag() {
      const sticker = document.getElementById('draggable-poison-sticker');
      const cardA = document.getElementById('toxic-card-A');
      const cardB = document.getElementById('toxic-card-B');
      if (!sticker || !cardA || !cardB) return;

      let isDragging = false;
      let ghostEl = null;
      let hoveredSample = null;
      let offsetX = 0;
      let offsetY = 0;

      const getHoveredCard = (clientX, clientY) => {
        const rectA = cardA.getBoundingClientRect();
        if (clientX >= rectA.left && clientX <= rectA.right && clientY >= rectA.top && clientY <= rectA.bottom) {
          return 'A';
        }
        const rectB = cardB.getBoundingClientRect();
        if (clientX >= rectB.left && clientX <= rectB.right && clientY >= rectB.top && clientY <= rectB.bottom) {
          return 'B';
        }
        return null;
      };

      const clearCardHighlights = () => {
        cardA.classList.remove('sticker-drop-ready', 'sticker-drop-hover');
        cardB.classList.remove('sticker-drop-ready', 'sticker-drop-hover');
      };

      const onPointerDown = (e) => {
        if (this.toxicCaseSolved) return;
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        e.preventDefault();

        isDragging = true;
        hoveredSample = null;

        const rect = sticker.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        // Create floating sticker ghost that follows cursor / finger
        ghostEl = sticker.cloneNode(true);
        ghostEl.id = 'poison-sticker-floating-ghost';
        ghostEl.style.position = 'fixed';
        ghostEl.style.left = `${rect.left}px`;
        ghostEl.style.top = `${rect.top}px`;
        ghostEl.style.width = `${rect.width}px`;
        ghostEl.style.zIndex = '9999';
        ghostEl.style.pointerEvents = 'none';
        ghostEl.style.transform = 'scale(1.06) rotate(-3deg)';
        ghostEl.style.transition = 'none';
        document.body.appendChild(ghostEl);

        sticker.style.opacity = '0.35';
        cardA.classList.add('sticker-drop-ready');
        cardB.classList.add('sticker-drop-ready');

        if (sticker.setPointerCapture) {
          try { sticker.setPointerCapture(e.pointerId); } catch (_) {}
        }
      };

      const onPointerMove = (e) => {
        if (!isDragging || !ghostEl) return;
        e.preventDefault();

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        ghostEl.style.left = `${x}px`;
        ghostEl.style.top = `${y}px`;

        // Auto-scroll viewport gently if user drags near top/bottom edge on mobile
        const edgeThreshold = 65;
        if (e.clientY < edgeThreshold) {
          window.scrollBy(0, -10);
        } else if (e.clientY > window.innerHeight - edgeThreshold) {
          window.scrollBy(0, 10);
        }

        hoveredSample = getHoveredCard(e.clientX, e.clientY);
        cardA.classList.toggle('sticker-drop-hover', hoveredSample === 'A');
        cardB.classList.toggle('sticker-drop-hover', hoveredSample === 'B');
      };

      const finishDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;

        if (e && typeof e.clientX === 'number') {
          hoveredSample = getHoveredCard(e.clientX, e.clientY);
        }

        if (ghostEl && ghostEl.parentNode) {
          ghostEl.parentNode.removeChild(ghostEl);
        }
        ghostEl = null;

        sticker.style.opacity = '1';
        clearCardHighlights();

        if (hoveredSample === 'A' || hoveredSample === 'B') {
          this.selectedToxicTarget = hoveredSample;
          this.evaluateToxicVerdict();
        }
      };

      sticker.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove, { passive: false });
      window.addEventListener('pointerup', finishDrag);
      window.addEventListener('pointercancel', finishDrag);
    }

    initToxicSamples(isManualReset = false) {
      // Randomize which sample is deadly Methanol
      this.toxicSample = Math.random() < 0.5 ? 'A' : 'B';
      this.toxicTestsDone = { A: { flame: false, wire: false }, B: { flame: false, wire: false } };
      this.selectedToxicTarget = null;
      this.toxicCaseSolved = false;

      // Clear logs & statuses
      ['A', 'B'].forEach((id) => {
        const badge = document.getElementById(`badge-status-${id}`);
        const logFlame = document.getElementById(`log-flame-${id}`);
        const logOdor = document.getElementById(`log-odor-${id}`);
        const stickerSlot = document.getElementById(`sticker-slot-${id}`);
        const flameStage = document.getElementById(`flame-stage-${id}`);
        const wireStage = document.getElementById(`wire-stage-${id}`);

        if (badge) {
          badge.className = 'px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800 font-mono text-[11px]';
          badge.textContent = 'Не досліджено ⚪';
        }
        if (logFlame) {
          logFlame.className = 'text-slate-500 font-semibold';
          logFlame.textContent = 'Не перевірено';
        }
        if (logOdor) {
          logOdor.className = 'text-slate-500 font-semibold';
          logOdor.textContent = 'Не перевірено';
        }
        if (stickerSlot) stickerSlot.innerHTML = '';
        if (flameStage) flameStage.classList.add('hidden');
        if (wireStage) wireStage.classList.add('hidden');
      });

      const sticker = document.getElementById('draggable-poison-sticker');
      if (sticker) {
        sticker.classList.remove('hidden');
        sticker.style.opacity = '1';
      }

      const victoryBanner = document.getElementById('detective-victory-banner');
      if (victoryBanner) victoryBanner.classList.add('hidden');

      const msgEl = document.getElementById('toxic-feedback-msg');
      if (msgEl) {
        msgEl.className = 'text-xs sm:text-sm text-slate-300';
        msgEl.textContent = isManualReset
          ? 'Нову партію зразків доставлено! Проведіть тести та перетягніть стікер «ОБЕРЕЖНО, ОТРУТА!» на пляшку з метанолом.'
          : 'Дослідіть обидва зразки тестами, а потім перетягніть стікер «ОБЕРЕЖНО, ОТРУТА!» на пляшку з метанолом.';
      }

      if (isManualReset && this.soundEngine) {
        this.soundEngine.clickSound();
      }
    }

    runFlameTest(sampleId) {
      if (this.toxicCaseSolved) return;
      if (this.soundEngine) this.soundEngine.reactionSound();

      const isMethanol = (this.toxicSample === sampleId);
      this.toxicTestsDone[sampleId].flame = true;

      // Update badge
      const badge = document.getElementById(`badge-status-${sampleId}`);
      if (badge) {
        badge.className = 'px-2.5 py-1 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-700/60 font-mono text-[11px] font-bold';
        badge.textContent = 'Досліджено 🔬';
      }

      // Hide wire stage if active
      const wireStage = document.getElementById(`wire-stage-${sampleId}`);
      if (wireStage) wireStage.classList.add('hidden');

      // Flame stage
      const flameStage = document.getElementById(`flame-stage-${sampleId}`);
      const flameFx = document.getElementById(`flame-fx-${sampleId}`);
      const flameLabel = document.getElementById(`flame-label-${sampleId}`);
      const logFlame = document.getElementById(`log-flame-${sampleId}`);

      if (flameStage && flameFx && flameLabel) {
        flameStage.classList.remove('hidden');

        if (isMethanol) {
          flameFx.className = 'w-12 h-20 flame-fx-green';
          flameLabel.className = 'mt-1 px-3 py-0.5 rounded-full bg-slate-950/95 border border-emerald-500/80 text-emerald-300 font-mono text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.5)]';
          flameLabel.innerHTML = '🔥 Зеленкуватий відтінок полум\'я!';
          if (logFlame) {
            logFlame.className = 'text-emerald-400 font-bold';
            logFlame.textContent = 'Зеленкуватий відтінок 🔥';
          }
        } else {
          flameFx.className = 'w-12 h-20 flame-fx-blue';
          flameLabel.className = 'mt-1 px-3 py-0.5 rounded-full bg-slate-950/95 border border-cyan-500/80 text-cyan-300 font-mono text-xs font-bold shadow-[0_0_15px_rgba(56,189,248,0.5)]';
          flameLabel.innerHTML = '🔥 Світло-синє (блакитне) полум\'я!';
          if (logFlame) {
            logFlame.className = 'text-cyan-400 font-bold';
            logFlame.textContent = 'Світло-синє (блакитне) 🔥';
          }
        }

        clearTimeout(this[`flameTimer_${sampleId}`]);
        this[`flameTimer_${sampleId}`] = setTimeout(() => {
          flameStage.classList.add('hidden');
        }, 4000);
      }
    }

    runWireTest(sampleId) {
      if (this.toxicCaseSolved) return;
      if (this.soundEngine) this.soundEngine.reactionSound();

      const isMethanol = (this.toxicSample === sampleId);
      this.toxicTestsDone[sampleId].wire = true;

      // Update badge
      const badge = document.getElementById(`badge-status-${sampleId}`);
      if (badge) {
        badge.className = 'px-2.5 py-1 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-700/60 font-mono text-[11px] font-bold';
        badge.textContent = 'Досліджено 🔬';
      }

      // Hide flame stage if active
      const flameStage = document.getElementById(`flame-stage-${sampleId}`);
      if (flameStage) flameStage.classList.add('hidden');

      // Wire stage
      const wireStage = document.getElementById(`wire-stage-${sampleId}`);
      const wireOdor = document.getElementById(`wire-odor-${sampleId}`);
      const logOdor = document.getElementById(`log-odor-${sampleId}`);

      if (wireStage && wireOdor) {
        wireStage.classList.remove('hidden');

        if (isMethanol) {
          wireOdor.className = 'mt-1 px-3 py-1.5 rounded-xl bg-slate-950/95 border border-amber-500/80 text-amber-300 font-mono text-xs font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)]';
          wireOdor.textContent = 'Запах формальдегіду';
          if (logOdor) {
            logOdor.className = 'text-amber-300 font-bold';
            logOdor.textContent = 'Запах формальдегіду';
          }
        } else {
          wireOdor.className = 'mt-1 px-3 py-1.5 rounded-xl bg-slate-950/95 border border-amber-500/80 text-amber-300 font-mono text-xs font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)]';
          wireOdor.textContent = 'Запах ацетальдегіду';
          if (logOdor) {
            logOdor.className = 'text-amber-300 font-bold';
            logOdor.textContent = 'Запах ацетальдегіду';
          }
        }

        clearTimeout(this[`wireTimer_${sampleId}`]);
        this[`wireTimer_${sampleId}`] = setTimeout(() => {
          wireStage.classList.add('hidden');
        }, 5000);
      }
    }

    evaluateToxicVerdict() {
      const msgEl = document.getElementById('toxic-feedback-msg');
      const victoryBanner = document.getElementById('detective-victory-banner');

      // Validation 1: Target chosen?
      if (!this.selectedToxicTarget) {
        if (this.soundEngine) this.soundEngine.incorrectSound();
        if (msgEl) {
          msgEl.innerHTML = '<span class="text-amber-300 font-semibold">⚠️ Будь ласка, оберіть, на яку саме пляшку (Зразок А чи Зразок Б) необхідно наклеїти знак «ОБЕРЕЖНО, ОТРУТА!»!</span>';
        }
        return;
      }

      // Validation 2: Tests performed?
      const testsA = this.toxicTestsDone.A.flame || this.toxicTestsDone.A.wire;
      const testsB = this.toxicTestsDone.B.flame || this.toxicTestsDone.B.wire;
      if (!testsA || !testsB) {
        if (this.soundEngine) this.soundEngine.incorrectSound();
        if (msgEl) {
          msgEl.innerHTML = '<span class="text-amber-300 font-semibold">🔬 Рекомендуємо провести тести (полум\'я або мідний дріт) для ОБОХ зразків, щоб перевірити їх перед маркуванням!</span>';
        }
        return;
      }

      // Validation 3: Is target the correct toxic bottle?
      if (this.selectedToxicTarget !== this.toxicSample) {
        if (this.soundEngine) this.soundEngine.incorrectSound();
        const safeName = `Зразок ${this.selectedToxicTarget}`;
        const toxicName = `Зразок ${this.toxicSample}`;
        if (msgEl) {
          msgEl.innerHTML = `<span class="text-rose-400 font-semibold">⚠️ Помилка! ${safeName} горів світло-синім полум'ям і дав запах ацетальдегіду — це безпечний етанол! Смертельний метанол міститься у пляшці <strong>${toxicName}</strong> (зеленкувате полум'я, запах формальдегіду).</span>`;
        }
        return;
      }

      // SUCCESS!
      this.toxicCaseSolved = true;
      if (this.soundEngine) this.soundEngine.reactionSound();

      const traySticker = document.getElementById('draggable-poison-sticker');
      if (traySticker) traySticker.classList.add('hidden');

      // Slap poison sticker on toxic bottle
      const toxicSlot = document.getElementById(`sticker-slot-${this.toxicSample}`);
      if (toxicSlot) {
        toxicSlot.innerHTML = `
          <div class="toxic-poison-sticker px-3 py-2 rounded-xl text-center shadow-2xl border-2 border-rose-300">
            <div class="font-mono text-xs font-black text-white uppercase tracking-wider flex items-center justify-center gap-1">
              <span>☠️ ОБЕРЕЖНО, ОТРУТА!</span>
            </div>
            <div class="font-mono text-[11px] font-extrabold text-amber-200 mt-0.5">
              МЕТАНОЛ (CH₃OH)
            </div>
          </div>
        `;
      }

      // Place safe seal on the safe ethanol bottle
      const safeId = this.toxicSample === 'A' ? 'B' : 'A';
      const safeSlot = document.getElementById(`sticker-slot-${safeId}`);
      if (safeSlot) {
        safeSlot.innerHTML = `
          <div class="toxic-safe-seal px-3 py-2 rounded-xl text-center shadow-xl border-2 border-emerald-300">
            <div class="font-mono text-xs font-black text-white uppercase tracking-wider flex items-center justify-center gap-1">
              <span>✅ БЕЗПЕЧНО: ЕТАНОЛ</span>
            </div>
            <div class="font-mono text-[11px] font-extrabold text-emerald-200 mt-0.5">
              C₂H₅OH (НЕ МЕТАНОЛ)
            </div>
          </div>
        `;
      }

      if (msgEl) {
        msgEl.innerHTML = '<span class="text-emerald-300 font-bold text-sm sm:text-base">🎉 Блискуча експертиза! Смертельний фальсифікат метанолу (CH₃OH) успішно вилучено та марковано, життя врятовано!</span>';
      }

      if (victoryBanner) {
        victoryBanner.classList.remove('hidden');
        victoryBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      if (!this.levelCompleted[3]) {
        this.levelCompleted[3] = true;
        if (this.xpSystem) this.xpSystem.addXP(100);
      }
    }
  }


  class ChemistryApp {
    constructor() {
      this.soundEngine = new SoundEngine();
      this.particleSystem = new ParticleSystem();
      this.xpSystem = new XPSystem(300);
      this.moleculeViewer = new MoleculeViewer();
      this.virtualLab = new VirtualLab(this.soundEngine, this.xpSystem);
      this.quizSystem = new QuizSystem(this.soundEngine, this.xpSystem);
      this.detectiveGame = new ChemicalDetectiveGame(this.soundEngine, this.xpSystem);
      this.navManager = new NavigationManager();

      this.introTransition = new IntroTransition(this.soundEngine, () => {
        this.initMainPage();
      });

      this.assemblySystem = new FreeformAssemblySystem(
        this.soundEngine,
        this.xpSystem,
        (snapshot) => {
          this.introTransition.start(snapshot);
        }
      );

      this.isMainPageInitialized = false;
    }

    init() {
      this.particleSystem.init();
      this.assemblySystem.init();

      const skipBtn = document.getElementById('skip-intro-btn');
      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          this.skipIntro();
        });
      }

      const restartIntroBtn = document.getElementById('restart-intro-btn');
      if (restartIntroBtn) {
        restartIntroBtn.addEventListener('click', () => {
          this.restartIntro();
        });
      }

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }

    skipIntro() {
      this.introTransition.abort();
      const introOverlay = document.getElementById('intro-overlay');
      const mainContent = document.getElementById('main-content');

      if (introOverlay) {
        introOverlay.classList.add('intro-hidden');
        introOverlay.style.display = 'none';
      }

      if (mainContent) {
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '1';
      }

      this.initMainPage();
    }

    restartIntro() {
      const introOverlay = document.getElementById('intro-overlay');
      const mainContent = document.getElementById('main-content');
      const transitionContainer = document.getElementById('transition-container');
      const formulaGrid = document.getElementById('formula-grid');
      const elementsTray = document.getElementById('elements-tray');
      const morphStage = document.getElementById('morph-stage');

      if (mainContent) {
        mainContent.classList.add('hidden');
      }

      if (introOverlay) {
        introOverlay.classList.remove('intro-hidden');
        introOverlay.style.display = '';
        introOverlay.style.opacity = '1';
      }

      if (formulaGrid) {
        formulaGrid.style.opacity = '1';
        formulaGrid.style.transform = 'scale(1)';
      }

      if (elementsTray) {
        elementsTray.style.opacity = '1';
        elementsTray.style.transform = '';
      }

      if (transitionContainer) {
        transitionContainer.classList.add('hidden');
        transitionContainer.style.opacity = '0';
      }

      if (morphStage) {
        morphStage.style.transform = '';
        morphStage.style.opacity = '1';
      }

      this.assemblySystem.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    initMainPage() {
      if (this.isMainPageInitialized) return;
      this.isMainPageInitialized = true;

      this.moleculeViewer.init();
      this.virtualLab.init();
      this.quizSystem.init();
      this.detectiveGame.init();
      this.navManager.init();
      this.initLabUIEnhancements();

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }

    initLabUIEnhancements() {
      // 1. Permanent Dark Theme
      const rootHtml = document.documentElement;
      rootHtml.classList.add('dark');
      rootHtml.classList.remove('light');

      // 2. Hero 3D Ethanol Molecule Hover & Legend Atom Highlighting
      const heroAtomGroups = document.querySelectorAll('.hero-atom-group');
      const heroLegendRows = document.querySelectorAll('[data-highlight-atom]');
      const heroReadout = document.getElementById('hero-atom-readout');
      const defaultReadoutHTML = 'Наведіть курсор на атом або натисніть на групу <strong class="text-rose-400">-OH</strong> для хімічного пояснення';

      heroAtomGroups.forEach((group) => {
        group.addEventListener('mouseenter', () => {
          const info = group.getAttribute('data-atom-info');
          if (heroReadout && info) {
            heroReadout.textContent = info;
          }
        });
        group.addEventListener('mouseleave', () => {
          if (heroReadout) {
            heroReadout.innerHTML = defaultReadoutHTML;
          }
        });
      });

      heroLegendRows.forEach((row) => {
        const atomType = row.getAttribute('data-highlight-atom');
        const highlightAtoms = (active) => {
          heroAtomGroups.forEach((g) => {
            if (g.getAttribute('data-atom') === atomType) {
              g.classList.toggle('atom-highlighted', active);
            }
          });
          if (heroReadout) {
            if (active) {
              if (atomType === 'C') heroReadout.textContent = 'Вуглецевий скелет (2 атоми C, sp³-гібридизація) — основа молекули етанолу';
              if (atomType === 'O') heroReadout.textContent = 'Атом Оксигену (O, δ⁻) — центр полярності гідроксильної групи —OH';
              if (atomType === 'H') heroReadout.textContent = '6 атомів Гідрогену (H): 5 у радикалі —C₂H₅ та 1 рухливий у групі —OH (δ⁺)';
            } else {
              heroReadout.innerHTML = defaultReadoutHTML;
            }
          }
        };
        row.addEventListener('mouseenter', () => highlightAtoms(true));
        row.addEventListener('mouseleave', () => highlightAtoms(false));
        row.addEventListener('click', () => highlightAtoms(true));
      });

      // 3. Functional Group Chemical Tooltips ([data-chem-tooltip])
      const TOOLTIP_DATA = {
        oh: {
          badge: '—OH',
          title: 'Гідроксильна група (спирти)',
          body: 'Одновалентна полярна функціональна група спиртів. Кисень (O) відтягує електронну густину від Гідрогену (Oδ⁻←Hδ⁺), завдяки чому спирти утворюють водневі зв’язки та вступають у реакції з лужними металами (Na, K).',
          meta: 'Полярність: висока • Водневі зв’язки: так • Суфікс IUPAC: -ол'
        },
        roh: {
          badge: 'R—OH',
          title: 'Будова молекули спирту',
          body: 'Складається з двох частин: гідрофобного вуглеводневого радикала R— (CH₃—, C₂H₅— тощо) та гідрофільної гідроксильної групи —OH, приєднаної до sp³-гібридизованого атома Карбону.',
          meta: 'R — вуглеводневий радикал • —OH — функціональна група'
        },
        homologous: {
          badge: 'CₙH₂ₙ₊₁OH',
          title: 'Гомологічний ряд насичених одноатомних спиртів',
          body: 'Кожен наступний представник відрізняється на гомологічну різницю —CH₂—. При n=1 — метанол (CH₃OH), n=2 — етанол (C₂H₅OH), n=3 — пропанол (C₃H₇OH).',
          meta: 'Також записують як CₙH₂ₙ₊₂O (ізомерні простим етерам)'
        },
        ol: {
          badge: '-ол (-ol)',
          title: 'Номенклатурний суфікс спиртів',
          body: 'За правилами IUPAC назва спирту утворюється додаванням суфікса -ол до назви відповідного алкану із зазначенням номера атома Карбону, біля якого стоїть група —OH (наприклад, пропан-1-ол, пропан-2-ол).',
          meta: '2 групи —OH → -діол • 3 групи —OH → -тріол'
        },
        cho: {
          badge: '—CHO',
          title: 'Альдегідна (карбонільна) група',
          body: 'Утворюється при частковому окисненні первинних спиртів (наприклад, розжареним мідним дротом CuO): етанол окиснюється до етаналю (ацетальдегіду CH₃CHO) із запахом свіжих яблук.',
          meta: 'R—CH₂OH + [O] → R—CHO + H₂O'
        },
        cooh: {
          badge: '—COOH',
          title: 'Карбоксильна група (карбонові кислоти)',
          body: 'Поєднує карбонільну (>C=O) та гідроксильну (—OH) групи. Утворюється при повному окисненні первинних спиртів (наприклад, перетворення етанолу на етанову / оцтову кислоту CH₃COOH).',
          meta: 'Реагує зі спиртами з утворенням запашних естерів (R—COOR′)'
        },
        sh: {
          badge: '—SH',
          title: 'Тіольна (меркапто-) група',
          body: 'Сірчаний аналог гідроксильної групи, де атом Оксигену замінений на Сульфур. Тіоли (наприклад, етантіол C₂H₅SH) мають надзвичайно різкий запах і додаються до природного газу для виявлення витоків.',
          meta: 'Водневі зв’язки значно слабші, ніж у спиртів'
        },
        hbond: {
          badge: '⋯O—H⋯O—H⋯',
          title: 'Міжмолекулярний водневий зв’язок',
          body: 'Електростатичне притягання між частково позитивним атомом Гідрогену (Hδ⁺) однієї молекули спирту та неподіленою електронною парою атома Оксигену (Oδ⁻) сусідньої молекули спирту або води.',
          meta: 'Зумовлює високу t° кипіння етанолу (+78,4 °C проти −88,6 °C у етану)'
        }
      };

      const popover = document.getElementById('chem-tooltip-popover');
      const badgeEl = document.getElementById('chem-tooltip-badge');
      const titleEl = document.getElementById('chem-tooltip-title');
      const bodyEl = document.getElementById('chem-tooltip-body');
      const metaEl = document.getElementById('chem-tooltip-meta');
      const closeBtn = document.getElementById('chem-tooltip-close');

      const showTooltip = (key, anchorEl) => {
        const info = TOOLTIP_DATA[key];
        if (!info || !popover) return;
        if (badgeEl) badgeEl.textContent = info.badge;
        if (titleEl) titleEl.textContent = info.title;
        if (bodyEl) bodyEl.textContent = info.body;
        if (metaEl) metaEl.textContent = info.meta;

        popover.classList.remove('hidden');
        const rect = anchorEl.getBoundingClientRect();
        const popRect = popover.getBoundingClientRect();

        let top = rect.bottom + 10;
        let left = rect.left + rect.width / 2 - popRect.width / 2;

        if (top + popRect.height > window.innerHeight - 16) {
          top = Math.max(16, rect.top - popRect.height - 10);
        }
        left = Math.max(12, Math.min(window.innerWidth - popRect.width - 12, left));

        popover.style.top = `${top}px`;
        popover.style.left = `${left}px`;
      };

      document.querySelectorAll('[data-chem-tooltip]').forEach((el) => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const key = el.getAttribute('data-chem-tooltip');
          document.querySelectorAll('.chem-fg-pill').forEach((p) => {
            p.classList.toggle('active', p === el);
          });
          showTooltip(key, el);
          if (this.soundEngine) this.soundEngine.playClick();
        });
      });

      if (closeBtn && popover) {
        closeBtn.addEventListener('click', () => popover.classList.add('hidden'));
      }
      document.addEventListener('click', (e) => {
        if (popover && !popover.classList.contains('hidden') && !popover.contains(e.target)) {
          popover.classList.add('hidden');
        }
      });

      // 4. Mobile Bottom Navigation Bar Active State Sync
      const bottomTabs = document.querySelectorAll('.mobile-tab-item');
      bottomTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          bottomTabs.forEach((t) => t.classList.remove('active'));
          tab.classList.add('active');
        });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const app = new ChemistryApp();
    app.init();
    window.ChemistryAppInstance = app;
  });

})();