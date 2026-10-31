/* ==========================================================================
 * ORGANIC.LAB — інтерактивні віджети теоретичного розділу (#theory-section)
 * Самодостатній модуль: не залежить від app.js
 * ========================================================================== */
(function () {
  'use strict';

  const $ = (root, sel) => root.querySelector(sel);
  const $$ = (root, sel) => Array.from(root.querySelectorAll(sel));
  const shuffle = (arr) => arr.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);

  /* ---------------- Прогрес вивчення ---------------- */
  const Progress = {
    done: new Set(),
    total: 0,
    init() {
      this.total = document.querySelectorAll('#theory-section [data-progress]').length;
      this.render();
    },
    mark(key) {
      if (!key || this.done.has(key)) return;
      this.done.add(key);
      this.render();
    },
    render() {
      const fill = document.getElementById('th-progress-fill');
      const text = document.getElementById('th-progress-text');
      if (fill) fill.style.width = (this.total ? (this.done.size / this.total) * 100 : 0) + '%';
      if (text) text.textContent = this.done.size + ' / ' + this.total;
    },
  };
  const markOf = (el) => Progress.mark(el && el.dataset.progress);

  /* Активна кнопка у групі */
  function setActive(buttons, active) {
    buttons.forEach((b) => b.classList.toggle('active', b === active));
  }

  /* Універсальна вікторина з варіантами-кнопками [data-answer] */
  function quizWidget(root, items, render) {
    if (!root) return;
    let idx = 0, score = 0, locked = false;
    const opts = $$(root, '.th-opt');
    const fb = $(root, '[data-role="feedback"]');
    const defaultFb = fb.textContent;

    function show() {
      locked = false;
      opts.forEach((o) => o.classList.remove('correct', 'wrong'));
      fb.textContent = defaultFb;
      fb.className = 'th-feedback';
      render(items[idx], idx, score);
    }
    opts.forEach((o) => o.addEventListener('click', () => {
      if (locked) return;
      locked = true;
      const item = items[idx];
      const ok = o.dataset.answer === item.answer;
      if (ok) score++;
      o.classList.add(ok ? 'correct' : 'wrong');
      if (!ok) opts.find((x) => x.dataset.answer === item.answer).classList.add('correct');
      fb.textContent = (ok ? '✓ Правильно! ' : '✗ Ні. ') + item.why;
      fb.className = 'th-feedback ' + (ok ? 'ok' : 'bad');
      markOf(root);
      setTimeout(() => { idx = (idx + 1) % items.length; if (idx === 0) score = 0; show(); }, 1900);
    }));
    show();
    return { getScore: () => score };
  }

  /* ---------------- 0. Сортувальник речовин ---------------- */
  function initSorter() {
    const root = document.getElementById('w-sorter');
    const items = shuffle([
      { f: 'CH₄', n: 'метан', answer: 'h', why: 'Лише C і H — найпростіший алкан.' },
      { f: 'C₂H₆', n: 'етан', answer: 'h', why: 'Алкан CₙH₂ₙ₊₂, характерні реакції заміщення.' },
      { f: 'C₂H₄', n: 'етен', answer: 'h', why: 'Ненасичений вуглеводень (C=C), прискорює достигання фруктів.' },
      { f: 'C₂H₂', n: 'етин', answer: 'h', why: 'Ненасичений (C≡C), використовують для зварювання металів.' },
      { f: 'C₂H₅OH', n: 'етанол', answer: 'o', why: 'Спирт: містить групу —OH.' },
      { f: 'CH₃COOH', n: 'оцтова кислота', answer: 'o', why: 'Карбонова кислота з групою —COOH.' },
      { f: 'C₃H₈O₃', n: 'гліцерол', answer: 'o', why: 'Триатомний спирт.' },
      { f: 'H₂N–CH₂–COOH', n: 'гліцин', answer: 'n', why: 'Амінокислота: —NH₂ + —COOH, амфотерна.' },
    ]);
    quizWidget(root, items, (it, i, s) => {
      $(root, '[data-role="formula"]').textContent = it.f;
      $(root, '[data-role="name"]').textContent = it.n;
      $(root, '[data-role="counter"]').textContent = (i + 1) + ' / ' + items.length;
      $(root, '[data-role="score"]').textContent = 'Рахунок: ' + s;
    });
  }

  /* ---------------- 1. Гібридизація ---------------- */
  function initHybrid() {
    const root = document.getElementById('w-hybrid');
    if (!root) return;
    const data = {
      sp3: { cls: 'СПИРТ', color: 'emerald', stab: 'Стабільний ✓', text: 'Прості σ-зв\'язки, міцний зв\'язок C–O.', ex: 'C₂H₅–OH' },
      arom: { cls: 'ФЕНОЛ', color: 'amber', stab: 'Окремий клас', text: '—OH напряму біля бензенового кільця.', ex: 'C₆H₅–OH' },
      enol: { cls: 'ЕНОЛ', color: 'rose', stab: 'Нестійкий ✗', text: 'Миттєво ізомеризується в альдегід або кетон.', ex: 'CH₂=CH–OH' },
      sp: { cls: 'НЕ ІСНУЄ', color: 'slate', stab: 'Нестійкі ✗', text: 'Надмірне напруження біля потрійного зв\'язку.', ex: 'HC≡C–OH' },
    };
    const btns = $$(root, '.th-btn');
    btns.forEach((b) => b.addEventListener('click', () => {
      setActive(btns, b);
      const d = data[b.dataset.key];
      $(root, '[data-role="out"]').innerHTML =
        `<div class="flex items-center justify-between gap-3 th-pop"><div><div class="text-${d.color}-300 font-extrabold text-lg">${d.cls}</div><div class="text-xs text-slate-300 mt-1">${d.text}</div></div>` +
        `<div class="text-right flex-shrink-0"><div class="font-mono text-white">${d.ex}</div><div class="text-[11px] text-${d.color}-300 mt-1">${d.stab}</div></div></div>`;
      markOf(root);
    }));
  }

  /* ---------------- 1. Первинний / вторинний / третинний ---------------- */
  function initClassify() {
    const root = document.getElementById('w-classify');
    const items = shuffle([
      { f: 'CH₃–CH₂–OH', answer: '1', why: '1 сусід-Карбон (етанол).' },
      { f: 'CH₃–CH(OH)–CH₃', answer: '2', why: '2 сусіди-Карбони (пропан-2-ол).' },
      { f: '(CH₃)₃C–OH', answer: '3', why: '3 сусіди-Карбони (трет-бутанол).' },
      { f: 'CH₃–CH₂–CH₂–CH₂–OH', answer: '1', why: '—OH на краю ланцюга (бутан-1-ол).' },
      { f: 'CH₃–CH(OH)–CH₂–CH₃', answer: '2', why: '2 сусіди-Карбони (бутан-2-ол).' },
      { f: '(CH₃)₂C(OH)–CH₂–CH₃', answer: '3', why: '3 сусіди-Карбони.' },
    ]);
    quizWidget(root, items, (it) => { $(root, '[data-role="formula"]').textContent = it.f; });
  }

  /* ---------------- 2. Конструктор назв (LEGO) ---------------- */
  function initNames() {
    const root = document.getElementById('w-names');
    if (!root) return;

    let cCount = 2;
    let pos = 1;

    const cBtns = $$(root, '[data-c]');
    const posBtns = $$(root, '[data-pos]');
    const outBox = $(root, '[data-role="out"]');

    const combinations = {
      '1-1': {
        f: 'CH₃—OH',
        iupac: 'метанол',
        rad: 'метиловий спирт',
        triv: 'деревний спирт',
        rule: 'метан + суфікс -ол (лише 1 атом C).'
      },
      '1-2': {
        f: 'CH₃—OH',
        iupac: 'метанол',
        rad: 'метиловий спирт',
        triv: 'деревний спирт',
        rule: 'У метані лише 1 атом C → метанол.'
      },
      '2-1': {
        f: 'CH₃—CH₂—OH',
        iupac: 'етанол',
        rad: 'етиловий спирт',
        triv: 'винний спирт',
        rule: 'етан + суфікс -ол (C з —OH завжди №1).'
      },
      '2-2': {
        f: 'CH₃—CH₂—OH',
        iupac: 'етанол',
        rad: 'етиловий спирт',
        triv: 'винний спирт',
        rule: 'Нумеруємо з краю, де ближче —OH → все одно етанол.'
      },
      '3-1': {
        f: 'CH₃—CH₂—CH₂—OH',
        iupac: 'пропан-1-ол',
        rad: 'пропіловий спирт',
        triv: '—',
        rule: 'пропан + —OH біля 1-го C → пропан-1-ол.'
      },
      '3-2': {
        f: 'CH₃—CH(OH)—CH₃',
        iupac: 'пропан-2-ол',
        rad: 'ізопропіловий спирт',
        triv: '—',
        rule: 'пропан + —OH біля 2-го C → пропан-2-ол.'
      },
      '4-1': {
        f: 'CH₃—CH₂—CH₂—CH₂—OH',
        iupac: 'бутан-1-ол',
        rad: 'бутиловий спирт',
        triv: '—',
        rule: 'бутан + —OH біля 1-го C → бутан-1-ол.'
      },
      '4-2': {
        f: 'CH₃—CH(OH)—CH₂—CH₃',
        iupac: 'бутан-2-ол',
        rad: 'втор-бутиловий спирт',
        triv: '—',
        rule: 'бутан + —OH біля 2-го C → бутан-2-ол.'
      }
    };

    function render() {
      const key = cCount + '-' + pos;
      const data = combinations[key] || combinations['2-1'];

      cBtns.forEach(b => b.classList.toggle('active', +b.dataset.c === cCount));
      posBtns.forEach(b => b.classList.toggle('active', +b.dataset.pos === pos));

      outBox.innerHTML = `
        <div class="th-pop space-y-2.5">
          <div class="th-big-formula text-white font-mono py-1">${data.f}</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div class="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40">
              <span class="text-cyan-400 font-mono uppercase block text-[11px] font-bold">За ІЮПАК</span>
              <div class="text-white text-base font-bold mt-0.5">${data.iupac}</div>
            </div>
            <div class="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40">
              <span class="text-emerald-400 font-mono uppercase block text-[11px] font-bold">Традиційна</span>
              <div class="text-white text-base font-bold mt-0.5">${data.rad}</div>
            </div>
          </div>
          <div class="text-xs text-slate-300 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
            💡 <strong class="text-amber-300">Правило:</strong> ${data.rule}
          </div>
        </div>
      `;
    }

    cBtns.forEach(b => b.addEventListener('click', () => {
      cCount = +b.dataset.c;
      render();
      markOf(root);
    }));

    posBtns.forEach(b => b.addEventListener('click', () => {
      pos = +b.dataset.pos;
      render();
      markOf(root);
    }));

    render();
  }

  /* ---------------- 2. Конструктор ізомерії C3H8O ---------------- */
  function initIsomers() {
    const root = document.getElementById('w-isomers');
    if (!root) return;

    const iso = [
      {
        btn: '1. Пропан-1-ол',
        n: 'Пропан-1-ол (первинний спирт)',
        f: 'CH₃—CH₂—CH₂—OH',
        t: 97.2,
        pct: 90,
        type: 'Ізомерія положення —OH',
        color: 'cyan',
        gradient: 'from-cyan-500 to-blue-500',
        desc: 'Група —OH на краю ланцюга. Міцні водневі зв’язки → висока t° кипіння (+97.2 °C).'
      },
      {
        btn: '2. Пропан-2-ол',
        n: 'Пропан-2-ол (вторинний спирт)',
        f: 'CH₃—CH(OH)—CH₃',
        t: 82.6,
        pct: 78,
        type: 'Ізомерія положення —OH',
        color: 'emerald',
        gradient: 'from-emerald-500 to-teal-500',
        desc: 'Група —OH у центрі ланцюга. Молекула компактніша → t° кипіння нижча (+82.6 °C).'
      },
      {
        btn: '3. Етер (не спирт)',
        n: 'Метоксиетан (простий етер)',
        f: 'CH₃—O—CH₂—CH₃',
        t: 7.4,
        pct: 12,
        type: 'Міжкласова ізомерія',
        color: 'purple',
        gradient: 'from-purple-500 to-pink-500',
        desc: 'Зв’язок C—O—C без групи —OH. Водневих зв’язків немає → газ вже при +7.4 °C.'
      }
    ];

    const box = $(root, '[data-role="buttons"]');
    const out = $(root, '[data-role="out"]');
    box.innerHTML = '';

    iso.forEach((item, idx) => {
      const b = document.createElement('button');
      b.className = 'th-btn !text-xs font-semibold py-2';
      b.textContent = item.btn;
      b.addEventListener('click', () => {
        select(idx);
        markOf(root);
      });
      box.appendChild(b);
    });

    function select(idx) {
      const item = iso[idx];
      setActive($$(box, 'button'), box.children[idx]);

      out.innerHTML = `
        <div class="th-pop space-y-2.5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="th-tag bg-${item.color}-500/20 text-${item.color}-300 font-bold">${item.type}</span>
            <span class="text-xs font-mono text-slate-400">Формула: <b class="text-white font-mono">C₃H₈O</b></span>
          </div>

          <div class="th-big-formula text-center text-white font-mono py-1">${item.f}</div>
          <div class="text-center font-bold text-base sm:text-lg text-${item.color}-300">${item.n}</div>

          <div class="space-y-1 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <div class="flex justify-between text-xs font-mono">
              <span class="text-slate-400">Температура кипіння:</span>
              <span class="text-white font-bold">${item.t} °C</span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div class="h-full bg-gradient-to-r ${item.gradient} transition-all duration-500" style="width: ${item.pct}%"></div>
            </div>
          </div>

          <p class="text-xs text-slate-300 leading-relaxed">
            ${item.desc}
          </p>
        </div>
      `;
    }

    select(0);
  }

    /* ---------------- 3D Модель (керування) ---------------- */
  function init3DControls() {
    const rotLeftBtn = document.getElementById('rotate-left-btn');
    const rotRightBtn = document.getElementById('rotate-right-btn');
    const autoRotBtn = document.getElementById('auto-rotate-btn');
    const toggleLabelsBtn = document.getElementById('toggle-labels-btn');
    const resetViewBtn = document.getElementById('reset-view-btn');

    const getViewer = () => window.moleculeViewerInstance;

    if (rotLeftBtn) {
      rotLeftBtn.addEventListener('click', () => {
        const v = getViewer();
        if (v) v.rotY -= 0.35;
      });
    }
    if (rotRightBtn) {
      rotRightBtn.addEventListener('click', () => {
        const v = getViewer();
        if (v) v.rotY += 0.35;
      });
    }
    if (autoRotBtn) {
      autoRotBtn.addEventListener('click', () => {
        const v = getViewer();
        if (v) {
          v.isAutoRotating = !v.isAutoRotating;
          autoRotBtn.classList.toggle('bg-cyan-600', v.isAutoRotating);
          autoRotBtn.classList.toggle('text-white', v.isAutoRotating);
        }
      });
    }
    if (toggleLabelsBtn) {
      toggleLabelsBtn.addEventListener('click', () => {
        const v = getViewer();
        if (v) {
          v.toggleLabels();
          toggleLabelsBtn.classList.toggle('bg-slate-700', !v.showLabels);
        }
      });
    }
    if (resetViewBtn) {
      resetViewBtn.addEventListener('click', () => {
        const v = getViewer();
        if (v) {
          v.rotX = 0.25;
          v.rotY = 0.45;
          v.scale = 68;
          v.isAutoRotating = true;
          if (autoRotBtn) autoRotBtn.classList.remove('bg-cyan-600', 'text-white');
        }
      });
    }
  }

  /* ---------------- 3. Термометр та вплив водневих зв'язків ---------------- */
  function initThermometer() {
    const slider = document.getElementById('temp-slider');
    const fill = document.getElementById('thermometer-fill');
    const state = document.getElementById('temp-state');
    const valText = document.getElementById('temp-current-val');
    const note = document.getElementById('temp-comparison-note');

    if (!slider || !fill || !state) return;

    function update() {
      const t = +slider.value;
      if (valText) {
        valText.textContent = 'Поточна: ' + (t > 0 ? '+' + t : t) + ' °C';
      }

      // Range: -50 to 110 (delta 160)
      const pct = Math.max(6, Math.min(100, ((t - (-50)) / 160) * 100));
      fill.style.height = pct + '%';

      if (t < -114) {
        state.innerHTML = '🧊 Твердий стан (кристалізація)';
        state.className = 'text-blue-400 font-bold text-sm';
        fill.style.background = 'linear-gradient(to top, #3b82f6, #60a5fa)';
        if (note) {
          note.innerHTML = '❄️ <b>Замерзання (-114.1 °C):</b> завдяки низькій t° замерзання етанол використовують у спиртових термометрах для сильних морозів.';
        }
      } else if (t < 78.4) {
        state.innerHTML = '💧 Рідина (водневі зв’язки)';
        state.className = 'text-emerald-400 font-bold text-sm';
        fill.style.background = 'linear-gradient(to top, #3b82f6, #10b981, #06b6d4)';
        if (note) {
          note.innerHTML = '💧 <b>Чому рідина?</b> Етан (C₂H₆) кипить при <b>-88.6 °C</b> (газ), а етанол є рідиною до <b>+78.4 °C</b> завдяки міцним водневим зв’язкам між групами —OH.';
        }
      } else {
        state.innerHTML = '💨 Газ / пара (кипіння)';
        state.className = 'text-rose-400 font-bold text-sm';
        fill.style.background = 'linear-gradient(to top, #f59e0b, #ef4444, #dc2626)';
        if (note) {
          note.innerHTML = '🔥 <b>Кипіння (+78.4 °C):</b> теплова енергія розриває водневі зв’язки (…O—H⋯O—H…), і молекули переходять у пару.';
        }
      }
    }

    slider.addEventListener('input', update);
    update();
  }

  /* ---------------- 3. Палітра ароматів (12 зразків з 3D переворотом) ---------------- */
  function initSmells() {
    const root = document.getElementById('w-smells');
    if (!root) return;

    const list = [
      { n: 'Етанол', s: '«Спиртовий», пекучий', e: '🍶', g: 'нижчі спирти', f: 'C₂H₅OH', fact: 'Класичний медичний аромат, основа настоянок та антисептиків' },
      { n: 'Пропанол-2', s: 'М’який спиртовий', e: '🧴', g: 'ізопропіловий', f: 'C₃H₇OH', fact: 'Добре знайомий запах сучасних санітайзерів' },
      { n: 'Бутанол-1', s: 'Важкий «сивушний»', e: '🤢', g: 'середні спирти', f: 'C₄H₉OH', fact: 'Різкий неприємний запах сивушних масел бродіння' },
      { n: 'Ізоаміловий', s: 'Стиглий банан', e: '🍌', g: 'амілові спирти', f: 'C₅H₁₁OH', fact: 'Його естер ізоамілацетат створює аромат бананових цукерок' },
      { n: 'Ментол', s: 'Крижана м’ята і холод', e: '🍃', g: 'терпеновий спирт', f: 'C₁₀H₂₀O', fact: 'Збуджує терморецептори холоду в роті та на шкірі' },
      { n: 'Циклогексанол', s: 'Аромат камфори', e: '🌿', g: 'циклоалканол', f: 'C₆H₁₁OH', fact: 'Характерний свіжий камфорний і хвойний відтінок' },
      { n: 'Борнеол', s: 'Сосновий ліс і хвоя', e: '🌲', g: 'терпеновий спирт', f: 'C₁₀H₁₈O', fact: 'Аромат хвої, розмарину та лісових бальзамів' },
      { n: 'Гераніол', s: 'Свіжа троянда й герань', e: '💐', g: 'терпеновий спирт', f: 'C₁₀H₁₈O', fact: 'Ключовий компонент натуральної трояндової олії' },
      { n: 'Ліналоол', s: 'Лаванда і бергамот', e: '🪻', g: 'терпеновий спирт', f: 'C₁₀H₁₈O', fact: 'Ніжний заспокійливий аромат у косметиці та парфумах' },
      { n: '2-Фенілетанол', s: 'Пелюстки троянди', e: '🌹', g: 'ароматичний спирт', f: 'C₈H₁₀O', fact: 'Спирт з бензеновим кільцем — природний запах трояндових пелюсток' },
      { n: 'Пропаргіловий', s: 'Трав’яниста герань', e: '🌺', g: 'ненасичений спирт', f: 'C₃H₄O', fact: 'Ненасичений спирт із потрійним зв’язком C≡C' },
      { n: 'Етантіол', s: 'Різкий запах газу!', e: '🦨', g: 'тіол (двійник спирту)', f: 'C₂H₅SH', fact: 'Одорант: додається у мікродозах для миттєвого виявлення витоку газу' }
    ];

    const grid = $(root, '[data-role="grid"]');
    if (!grid) return;
    grid.innerHTML = '';

    list.forEach((it) => {
      const card = document.createElement('div');
      card.className = 'th-smell-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.innerHTML = `
        <span class="th-smell-inner">
          <!-- FRONT: Лише Назва, Формула та група (БЕЗ емодзі і БЕЗ спойлера аромату!) -->
          <span class="th-smell-front">
            <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">${it.g}</span>
            <b class="text-xs sm:text-sm font-bold text-white tracking-wide mt-0.5">${it.n}</b>
            <span class="font-mono text-xs sm:text-sm font-extrabold text-cyan-300 my-0.5">${it.f}</span>
            <span class="text-[10px] text-amber-300 font-semibold mt-1">↻ Дізнатися аромат</span>
          </span>

          <!-- BACK: З'являється після перевороту — Емодзі, аромат та пояснення -->
          <span class="th-smell-back">
            <span class="text-xl sm:text-2xl leading-none mb-1 select-none">${it.e}</span>
            <b class="text-[11px] sm:text-xs text-pink-300 font-extrabold leading-tight mb-1">${it.s}</b>
            <span class="text-[9px] sm:text-[10px] text-slate-200 leading-snug font-normal px-0.5">${it.fact}</span>
          </span>
        </span>
      `;

      const toggleFlip = () => {
        card.classList.toggle('flipped');
        markOf(root);
      };

      card.addEventListener('click', toggleFlip);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFlip();
        }
      });

      grid.appendChild(card);
    });
  }

  /* ---------------- 4. Реакційна лабораторія ---------------- */
    /* ---------------- 4. Реакційна лабораторія з наочними анімаціями ---------------- */
  function initReactions() {
    const root = document.getElementById('w-reactions');
    if (!root) return;

    const R = [
      {
        id: 'na',
        label: '+ Na (Натрій)',
        eq: '2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑',
        type: 'Розрив зв’язку O—H',
        typeColor: 'cyan',
        stageHtml: `
          <div class="th-stage-scene">
            <div class="th-vessel">
              <div class="th-liquid">
                <span class="th-bubble" style="left:20%; width:6px; height:6px; animation-delay:0s"></span>
                <span class="th-bubble" style="left:45%; width:8px; height:8px; animation-delay:0.3s"></span>
                <span class="th-bubble" style="left:70%; width:5px; height:5px; animation-delay:0.6s"></span>
                <span class="th-bubble" style="left:35%; width:7px; height:7px; animation-delay:0.8s"></span>
              </div>
              <div class="th-sodium-chunk"></div>
            </div>
          </div>
          <div class="th-obs-badge mt-2">
            <span>⚡ Метал Na шипить і розчиняється, виділяючи водень H₂↑</span>
          </div>
        `,
        products: [
          {
            name: 'Натрій етанолят (C₂H₅ONa)',
            badge: 'Алкоголят',
            color: 'cyan',
            desc: 'Сіль спирту: утворюється при заміщенні атома H у групі —OH на Na.'
          },
          {
            name: 'Водень (H₂↑)',
            badge: 'Газ',
            color: 'emerald',
            desc: 'Безбарвний горючий газ, виділяється бульбашками.'
          }
        ],
        mechanism: 'Рухливий атом H у групі —OH заміщується на активний метал (Na, K).'
      },
      {
        id: 'hcl',
        label: '+ HCl (Хлоридна к-та)',
        eq: 'C₂H₅OH + HCl →(H₂SO₄) C₂H₅Cl + H₂O',
        type: 'Розрив зв’язку C—O',
        typeColor: 'amber',
        stageHtml: `
          <div class="th-stage-scene">
            <div class="th-vessel">
              <div class="th-liquid" style="background: linear-gradient(180deg, rgba(251,191,36,0.3), rgba(217,119,6,0.6));">
                <div style="position:absolute; bottom:8px; left:25px; width:34px; height:18px; border-radius:50%; background:rgba(254,240,138,0.7); box-shadow:0 0 10px rgba(234,179,8,0.8);"></div>
              </div>
            </div>
          </div>
          <div class="th-obs-badge mt-2">
            <span>🧪 Розчин каламутніє: утворюється важка крапля C₂H₅Cl</span>
          </div>
        `,
        products: [
          {
            name: 'Хлороетан (C₂H₅Cl)',
            badge: 'Галогенопохідне',
            color: 'amber',
            desc: 'Летка рідина (t кип. +12.3 °C), нерозчинна у воді.'
          },
          {
            name: 'Вода (H₂O)',
            badge: 'Побічний продукт',
            color: 'blue',
            desc: 'Утворюється з групи —OH спирту та H⁺ кислоти.'
          }
        ],
        mechanism: 'Нуклеофільне заміщення: група —OH заміщується на атом Хлору.'
      },
      {
        id: 'ch3cooh',
        label: '+ CH₃COOH (Оцтова к-та)',
        eq: 'C₂H₅OH + CH₃COOH ⇄(H₂SO₄, t) CH₃COOC₂H₅ + H₂O',
        type: 'Реакція естерифікації',
        typeColor: 'pink',
        stageHtml: `
          <div class="th-stage-scene">
            <div class="th-vessel">
              <div class="th-liquid">
                <div class="th-liquid-top" style="height:35%;"></div>
              </div>
            </div>
            <div class="th-burner"></div>
            <div class="th-burner-flame"></div>
          </div>
          <div class="th-obs-badge mt-2">
            <span>🍏 Утворення верхнього шару з приємним фруктовим ароматом</span>
          </div>
        `,
        products: [
          {
            name: 'Етилацетат (CH₃COOC₂H₅)',
            badge: 'Складний естер',
            color: 'pink',
            desc: 'Рідина з фруктовим ароматом, легша за воду (розчинник, ароматизатор).'
          },
          {
            name: 'Вода (H₂O)',
            badge: 'Побічний продукт',
            color: 'blue',
            desc: 'Відщеплюється від кислоти (—OH) та спирту (—H).'
          }
        ],
        mechanism: 'Оборотна реакція спирту з карбоновою кислотою за присутності конц. H₂SO₄.'
      },
      {
        id: 'hno3',
        label: '+ HNO₃ (Нітратна к-та)',
        eq: 'C₂H₅OH + HO—NO₂ ⇄ C₂H₅—ONO₂ + H₂O',
        type: 'Естерифікація мінеральною кислотою',
        typeColor: 'purple',
        stageHtml: `
          <div class="th-stage-scene">
            <div class="th-vessel">
              <div class="th-liquid" style="background: linear-gradient(180deg, rgba(236,72,153,0.25), rgba(168,85,247,0.5));">
                <div style="position:absolute; bottom:6px; left:20px; width:44px; height:20px; border-radius:50%; background:rgba(244,114,182,0.8); box-shadow:0 0 12px rgba(236,72,153,0.7);"></div>
              </div>
            </div>
          </div>
          <div class="th-obs-badge mt-2">
            <span>💧 Утворення важкого маслянистого етилнітрату</span>
          </div>
        `,
        products: [
          {
            name: 'Етилнітрат (C₂H₅ONO₂)',
            badge: 'Естер',
            color: 'purple',
            desc: 'Масляниста вибухонебезпечна рідина, не змішується з водою.'
          },
          {
            name: 'Вода (H₂O)',
            badge: 'Побічний продукт',
            color: 'blue',
            desc: 'Утворюється при естерифікації нітратною кислотою.'
          }
        ],
        mechanism: 'Спирти утворюють естери не лише з органічними, а й з мінеральними кислотами.'
      },
      {
        id: 'h2so4_140',
        label: '+ H₂SO₄, 140 °C (Етер)',
        eq: '2C₂H₅OH →(H₂SO₄, 140 °C) C₂H₅—O—C₂H₅ + H₂O',
        type: 'Міжмолекулярна дегідратація',
        typeColor: 'indigo',
        stageHtml: `
          <div class="th-stage-scene">
            <div class="th-vessel">
              <div class="th-liquid" style="background: linear-gradient(180deg, rgba(99,102,241,0.3), rgba(67,56,202,0.6));">
                <div class="th-liquid-top" style="height:40%; background: linear-gradient(180deg, rgba(165,180,252,0.8), rgba(99,102,241,0.6));"></div>
              </div>
            </div>
            <div class="th-burner"></div>
            <div class="th-burner-flame" style="height:22px;"></div>
          </div>
          <div class="th-obs-badge mt-2">
            <span>⚗️ Помірний нагрів (140°C): леткий медичний етер</span>
          </div>
        `,
        products: [
          {
            name: 'Діетиловий етер (C₂H₅—O—C₂H₅)',
            badge: 'Простий етер',
            color: 'indigo',
            desc: 'Дуже летка рідина (t кип. +34.5 °C), розчинник та засіб для наркозу.'
          },
          {
            name: 'Вода (H₂O)',
            badge: 'Побічний продукт',
            color: 'blue',
            desc: 'Поглинається концентрованою H₂SO₄.'
          }
        ],
        mechanism: 'При 140 °C дві молекули спирту втрачають одну молекулу H₂O, утворюючи простий етер.'
      },
      {
        id: 'h2so4_160',
        label: '+ H₂SO₄, 160 °C (Етен)',
        eq: 'C₂H₅OH →(H₂SO₄, 160 °C) CH₂=CH₂↑ + H₂O',
        type: 'Внутрішньомолекулярна дегідратація',
        typeColor: 'violet',
        stageHtml: `
          <div class="th-stage-scene">
            <div class="th-vessel">
              <div class="th-liquid" style="background: linear-gradient(180deg, rgba(139,92,246,0.4), rgba(109,40,217,0.7));">
                <span class="th-bubble" style="left:20%; width:9px; height:9px; animation-delay:0s"></span>
                <span class="th-bubble" style="left:50%; width:11px; height:11px; animation-delay:0.2s"></span>
                <span class="th-bubble" style="left:75%; width:8px; height:8px; animation-delay:0.5s"></span>
              </div>
            </div>
            <div class="th-burner"></div>
            <div class="th-burner-flame" style="height:35px; background:radial-gradient(ellipse at bottom, #fde047 0%, #dc2626 70%, transparent 100%);"></div>
          </div>
          <div class="th-obs-badge mt-2">
            <span>🔥 Сильний нагрів (160°C): бурхливо виділяється газ етен</span>
          </div>
        `,
        products: [
          {
            name: 'Етен / етилен (CH₂=CH₂↑)',
            badge: 'Алкен',
            color: 'violet',
            desc: 'Горючий газ із подвійним зв’язком C=C; знебарвлює бромну воду.'
          },
          {
            name: 'Вода (H₂O)',
            badge: 'Відщеплена молекула',
            color: 'blue',
            desc: 'Відщеплюється від сусідніх атомів C однієї молекули (правило Зайцева).'
          }
        ],
        mechanism: 'При >160 °C молекула спирту втрачає H₂O і утворює подвійний зв’язок C=C.'
      },
      {
        id: 'o2',
        label: '+ O₂ (Горіння)',
        eq: 'C₂H₅OH + 3O₂ → 2CO₂↑ + 3H₂O + Q',
        type: 'Повне окиснення (горіння)',
        typeColor: 'rose',
        stageHtml: `
          <div class="th-stage-scene">
            <div class="th-flame-container">
              <div class="th-blue-flame"></div>
            </div>
          </div>
          <div class="th-obs-badge mt-2">
            <span>🔥 Етанол горить чистим блакитним полум’ям без кіптяви</span>
          </div>
        `,
        products: [
          {
            name: 'Вуглекислий газ (CO₂↑)',
            badge: 'Оксид',
            color: 'rose',
            desc: 'Безбарвний газ, спричиняє помутніння вапняної води.'
          },
          {
            name: 'Вода (H₂O)',
            badge: 'Водяна пара',
            color: 'blue',
            desc: 'Конденсується краплями на холодних стінках.'
          }
        ],
        mechanism: 'Повне окиснення до CO₂ і H₂O з виділенням тепла (екзотермічна реакція).'
      },
      {
        id: 'cuo',
        label: '+ CuO, t (Окиснення CuO)',
        eq: 'C₂H₅OH + CuO →(t) CH₃CHO + Cu + H₂O',
        type: 'Якісна реакція на спирти',
        typeColor: 'orange',
        stageHtml: `
          <div class="th-stage-scene">
            <div class="th-vessel">
              <div class="th-liquid"></div>
              <div class="th-wire-spiral reduced"></div>
            </div>
          </div>
          <div class="th-obs-badge mt-2">
            <span>✨ Чорний CuO відновлюється до сяючої червоної міді Cu!</span>
          </div>
        `,
        products: [
          {
            name: 'Етаналь / ацетальдегід (CH₃CHO)',
            badge: 'Альдегід',
            color: 'orange',
            desc: 'Летка речовина із запахом свіжих яблук.'
          },
          {
            name: 'Мідь (Cu)',
            badge: 'Метал',
            color: 'amber',
            desc: 'Чорний наліт CuO перетворюється на блискучу рожево-червону мідь.'
          },
          {
            name: 'Вода (H₂O)',
            badge: 'Побічний продукт',
            color: 'blue',
            desc: 'Утворюється з атомів H спирту та O оксиду міді.'
          }
        ],
        mechanism: 'Якісна реакція: первинний спирт окиснюється розжареним CuO до альдегіду.'
      }
    ];

    const box = $(root, '[data-role="buttons"]');
    const visualStage = $(root, '[data-role="visual-stage"]');
    const out = $(root, '[data-role="out"]');
    box.innerHTML = '';

    R.forEach((r, idx) => {
      const b = document.createElement('button');
      b.className = 'th-btn font-mono !text-xs py-2';
      b.textContent = r.label;
      b.addEventListener('click', () => {
        select(idx);
        markOf(root);
      });
      box.appendChild(b);
    });

    function select(idx) {
      const r = R[idx];
      setActive($$(box, 'button'), box.children[idx]);

      visualStage.innerHTML = r.stageHtml;

      out.innerHTML = `
        <div class="th-pop space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <span class="th-tag bg-${r.typeColor}-500/20 text-${r.typeColor}-300 font-bold">${r.type}</span>
            <span class="text-xs font-mono text-slate-400">Реагент: <b class="text-white font-mono">${r.label}</b></span>
          </div>

          <div class="th-eq !text-sm sm:!text-base text-white font-mono bg-slate-950/90 p-3 rounded-xl border border-slate-800 shadow-inner text-center">
            ${r.eq}
          </div>

          <div>
            <div class="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold mb-2">
              Що відбувається з усіма продуктами:
            </div>
            <div class="th-product-grid">
              ${r.products.map(p => `
                <div class="th-product-card border-${p.color}-500/40">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-[10px] font-mono uppercase font-bold text-${p.color}-400">${p.badge}</span>
                  </div>
                  <b class="text-white text-xs sm:text-sm block mb-1 font-mono">${p.name}</b>
                  <p class="text-[11px] sm:text-xs text-slate-300 leading-relaxed">${p.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="text-xs text-slate-300 leading-relaxed bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
            💡 <strong class="text-amber-300">Суть реакції:</strong> ${r.mechanism}
          </div>
        </div>
      `;

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }

    select(0);
  }

  /* ---------------- 4. Окиснення ---------------- */function initOxidation() {
    const root = document.getElementById('w-oxidation');
    if (!root) return;
    const data = {
      1: { chain: ['R–CH₂–OH', 'R–CHO', 'R–COOH'], names: ['спирт', 'альдегід', 'кислота'], c: 'blue' },
      2: { chain: ['R–CH(OH)–R', 'R–CO–R'], names: ['спирт', 'кетон'], c: 'indigo' },
      3: { chain: ['R₃C–OH', '✗'], names: ['спирт', 'стійкий; лише жорсткі умови з розривом ланцюга'], c: 'violet' },
    };
    const btns = $$(root, '.th-btn');
    btns.forEach((b) => b.addEventListener('click', () => {
      setActive(btns, b);
      const d = data[b.dataset.key];
      $(root, '[data-role="out"]').innerHTML = '<div class="flex flex-wrap items-center justify-center gap-2 th-pop">' +
        d.chain.map((s, i) => `<div class="text-center"><div class="px-3 py-2 rounded-lg bg-${d.c}-500/15 border border-${d.c}-500/40 font-mono text-white text-sm">${s}</div><div class="text-[10px] text-slate-400 mt-1 max-w-[140px]">${d.names[i]}</div></div>` +
          (i < d.chain.length - 1 ? '<div class="text-slate-500 pb-4">→ [O] →</div>' : '')).join('') + '</div>';
      markOf(root);
    }));
  }

  /* ---------------- 4. Проба Лукаса ---------------- */
  function initMethods() {
    const root = document.getElementById('w-methods');
    if (!root) return;
    const M = [
      { b: '💧 Гідроліз галогенопохідних', eq: 'R–Cl + NaOH (водн.) → R–OH + NaCl', t: 'Галоген заміщується на —OH дією водного розчину лугу.' },
      { b: '🏭 Гідратація алкенів', eq: 'CH₂=CH₂ + H₂O →(H₃PO₄, 280–300 °C) C₂H₅OH', t: 'Промисловий спосіб. Правило Марковникова: з первинних спиртів так добувають лише етанол.' },
      { b: '⚗️ Відновлення C=O', eq: 'альдегід → первинний · кетон → вторинний', t: 'Відновлюють альдегіди, кислоти, естери та кетони.' },
      { b: '🧩 Реактиви Гріньяра', eq: 'RMgX + C=O → алкоголят →(H₂O) спирт', t: 'Дві стадії. Спробуй конструктор праворуч →' },
      { b: '🍇 Спиртове бродіння', eq: 'C₆H₁₂O₆ →(ферменти) 2C₂H₅OH + 2CO₂↑', t: 'Так утворюється спирт у вині, пиві, квасі. Також з крохмалю й целюлози через гідроліз до глюкози.' },
    ];
    const box = $(root, '[data-role="buttons"]');
    M.forEach((m, i) => {
      const b = document.createElement('button');
      b.className = 'th-btn !text-xs text-left';
      b.textContent = m.b;
      b.addEventListener('click', () => { select(i); markOf(root); });
      box.appendChild(b);
    });
    function select(i) {
      setActive($$(box, 'button'), box.children[i]);
      $(root, '[data-role="out"]').innerHTML = `<div class="th-pop space-y-2"><div class="th-eq !text-sm">${M[i].eq}</div><div class="text-xs text-slate-400">${M[i].t}</div></div>`;
    }
    select(1);
  }

  /* ---------------- 5. Гріньяр ---------------- */
  function initGrignard() {
    const root = document.getElementById('w-grignard');
    if (!root) return;
    const data = {
      f: { r: 'ПЕРВИННИЙ спирт', ex: 'H–CHO + RMgX → R–CH₂–OH', c: 'blue' },
      a: { r: 'ВТОРИННИЙ спирт', ex: 'R\'–CHO + RMgX → R\'–CH(OH)–R', c: 'indigo' },
      k: { r: 'ТРЕТИННИЙ спирт', ex: 'R\'–CO–R\' + RMgX → R\'₂C(OH)–R', c: 'violet' },
    };
    const btns = $$(root, '.th-btn');
    btns.forEach((b) => b.addEventListener('click', () => {
      setActive(btns, b);
      const d = data[b.dataset.key];
      $(root, '[data-role="out"]').innerHTML = `<div class="th-pop text-center"><div class="text-${d.c}-300 font-extrabold text-lg">${d.r}</div><div class="font-mono text-sm text-white mt-1">${d.ex}</div></div>`;
      markOf(root);
    }));
  }

  /* ---------------- 6. Картки-перевертні ---------------- */
  function initCards() {
    const root = document.getElementById('w-cards');
    if (!root) return;
    const C = [
      { n: 'Метанол', f: 'CH₃OH', e: '☠️', c: 'rose', facts: ['t кип. 64 °C', 'Смертельна отрута!', '5–10 мл — сліпота, ~30 мл — смерть'] },
      { n: 'Етанол', f: 'C₂H₅OH', e: '🧪', c: 'emerald', facts: ['t кип. 78 °C', 'Змішується з водою будь-як', 'Антисептик, розчинник, настоянки'] },
      { n: 'Етиленгліколь', f: 'HO–CH₂–CH₂–OH', e: '❄️', c: 'teal', facts: ['Двоатомний спирт (α-діол)', 'Суфікс -діол / -гліколь'] },
      { n: 'Гліцерол', f: 'C₃H₈O₃', e: '🍯', c: 'amber', facts: ['Солодкий, в\'язкий, гігроскопічний', 'Входить до складу жирів', 'Тринітрогліцерин — ліки і вибухівка'] },
      { n: 'Тіоли', f: 'R–SH', e: '🦨', c: 'yellow', facts: ['Огидний запах — одорант газу', 'Кислотніші за спирти', 'Антидоти при отруєнні Hg, Pb'] },
    ];
    C.forEach((it) => {
      const card = document.createElement('button');
      card.className = 'th-flip';
      card.innerHTML = `<span class="th-flip-inner"><span class="th-flip-front border-${it.c}-500/40"><span class="text-3xl">${it.e}</span><b class="text-${it.c}-300">${it.n}</b><span class="font-mono text-xs text-slate-300">${it.f}</span><small>натисни ↻</small></span>` +
        `<span class="th-flip-back border-${it.c}-500/60"><b class="text-${it.c}-300 mb-1">${it.n}</b>${it.facts.map((x) => `<span>• ${x}</span>`).join('')}</span></span>`;
      card.addEventListener('click', () => { card.classList.toggle('flipped'); markOf(root); });
      root.appendChild(card);
    });
  }

  /* ---------------- Підсумковий тест ---------------- */
  function initQuiz() {
    const root = document.getElementById('w-quiz');
    if (!root) return;
    const Q = [
      { q: 'Яка функціональна група є в усіх спиртах?', o: ['—OH', '—COOH', '—NH₂', '—CHO'], a: 0 },
      { q: 'Пропанол-2 — це спирт…', o: ['первинний', 'вторинний', 'третинний', 'триатомний'], a: 1 },
      { q: 'Чому етанол кипить при 78 °C, а етан — газ?', o: ['Водневі зв\'язки між молекулами', 'Більша маса Карбону', 'Іонні зв\'язки', 'Наявність C=C'], a: 0 },
      { q: 'Який спирт має освіжаючий аромат крижаної м’яти?', o: ['Ментол', 'Бутанол-1', 'Етанол', 'Гліцерол'], a: 0 },
      { q: 'Що утворюється при нагріванні етанолу з H₂SO₄ при 160 °C?', o: ['Діетиловий етер', 'Етен', 'Етилацетат', 'Етаналь'], a: 1 },
      { q: 'При окисненні вторинного спирту утворюється…', o: ['альдегід', 'кислота', 'кетон', 'нічого'], a: 2 },
      { q: 'Який газ виділяється при взаємодії етанолу з металічним натрієм?', o: ['Кисень O₂', 'Вуглекислий газ CO₂', 'Водень H₂', 'Хлор Cl₂'], a: 2 },
      { q: 'Який спирт викликає сліпоту навіть у малих дозах?', o: ['Етанол', 'Гліцерол', 'Метанол', 'Етиленгліколь'], a: 2 },
    ];
    let i = 0, score = 0;
    const qEl = $(root, '[data-role="question"]'), oEl = $(root, '[data-role="options"]');
    const fb = $(root, '[data-role="feedback"]'), next = $(root, '[data-role="next"]');
    function show() {
      fb.textContent = ''; fb.className = 'th-feedback';
      next.classList.add('hidden');
      $(root, '[data-role="counter"]').textContent = 'Запитання ' + (i + 1) + ' / ' + Q.length;
      $(root, '[data-role="score"]').textContent = 'Бали: ' + score;
      qEl.textContent = Q[i].q;
      oEl.innerHTML = '';
      Q[i].o.forEach((txt, k) => {
        const b = document.createElement('button');
        b.className = 'th-opt text-left';
        b.textContent = txt;
        b.addEventListener('click', () => {
          if (oEl.dataset.locked) return;
          oEl.dataset.locked = '1';
          const ok = k === Q[i].a;
          if (ok) score++;
          b.classList.add(ok ? 'correct' : 'wrong');
          oEl.children[Q[i].a].classList.add('correct');
          fb.textContent = ok ? '✓ Правильно!' : '✗ Правильна відповідь підсвічена.';
          fb.className = 'th-feedback ' + (ok ? 'ok' : 'bad');
          next.classList.remove('hidden');
        });
        oEl.appendChild(b);
      });
      delete oEl.dataset.locked;
    }
    function finish() {
      const pass = score >= 6;
      qEl.textContent = (pass ? '🎉 ' : '📚 ') + 'Результат: ' + score + ' / ' + Q.length;
      oEl.innerHTML = `<div class="sm:col-span-2 text-sm text-slate-300">${pass ? 'Чудово! Ти готовий до розслідування.' : 'Повтори кроки, де помилився, і спробуй ще.'}</div>` +
        `<a href="#detective-game-section" class="th-btn th-btn-primary text-center">До гри «Хімічний детектив» →</a>` +
        `<button class="th-btn" data-role="restart">Пройти ще раз</button>`;
      $(oEl, '[data-role="restart"]').addEventListener('click', () => { i = 0; score = 0; show(); });
      fb.textContent = ''; next.classList.add('hidden');
      $(root, '[data-role="score"]').textContent = 'Бали: ' + score;
    }
    next.addEventListener('click', () => { i++; i < Q.length ? show() : finish(); });
    show();
  }

  function init() {
    if (!document.getElementById('theory-section')) return;
    Progress.init();
    initSorter(); initHybrid(); initClassify(); initNames(); initIsomers();
    init3DControls(); initThermometer(); initSmells(); initReactions(); initOxidation();
    initMethods(); initGrignard(); initCards(); initQuiz();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
