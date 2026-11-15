/* ==========================================================================
   ZWISCHENMOLEKULARE WECHSELWIRKUNGEN (VORWISSEN KLASSE 9 -> 10)
   Interaktive Modelle, Simulationen & Checks (Schule Birklehof)
   ========================================================================== */

(function () {
  "use strict";

  const STORAGE_KEY = "birklehof_zw_ww_v1";
  const SCHEME_KEY = "zw_ww_color_scheme";
  const CANVAS_FONT = '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const CANVAS_MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

  /* ------------------------------------------------------------------------
     1. DATEN: PSE-ELEMENTE, BINDUNGS-PRESETS & QUIZ-FRAGEN
     ------------------------------------------------------------------------ */
  const MINI_PSE = [
    // Reihe 1 (Periode 1)
    { sym: "H", name: "Wasserstoff", en: 2.1, lp: 0, col: 1, row: 1 },
    // Reihe 2 (Periode 2)
    { sym: "Li", name: "Lithium", en: 1.0, lp: 0, col: 1, row: 2 },
    { sym: "Be", name: "Beryllium", en: 1.5, lp: 0, col: 2, row: 2 },
    { sym: "B", name: "Bor", en: 2.0, lp: 0, col: 3, row: 2 },
    { sym: "C", name: "Kohlenstoff", en: 2.5, lp: 0, col: 4, row: 2 },
    { sym: "N", name: "Stickstoff", en: 3.0, lp: 1, col: 5, row: 2 },
    { sym: "O", name: "Sauerstoff", en: 3.5, lp: 2, col: 6, row: 2 },
    { sym: "F", name: "Fluor", en: 4.0, lp: 3, col: 7, row: 2, tag: "max" },
    // Reihe 3 (Periode 3)
    { sym: "Na", name: "Natrium", en: 0.9, lp: 0, col: 1, row: 3 },
    { sym: "Mg", name: "Magnesium", en: 1.2, lp: 0, col: 2, row: 3 },
    { sym: "Al", name: "Aluminium", en: 1.5, lp: 0, col: 3, row: 3 },
    { sym: "Si", name: "Silicium", en: 1.8, lp: 0, col: 4, row: 3 },
    { sym: "P", name: "Phosphor", en: 2.1, lp: 1, col: 5, row: 3 },
    { sym: "S", name: "Schwefel", en: 2.5, lp: 2, col: 6, row: 3 },
    { sym: "Cl", name: "Chlor", en: 3.0, lp: 3, col: 7, row: 3 },
    // Reihe 4 (Periode 4/5/7 Auswahl)
    { sym: "K", name: "Kalium", en: 0.8, lp: 0, col: 1, row: 4 },
    { sym: "Br", name: "Brom", en: 2.8, lp: 3, col: 7, row: 4 },
    { sym: "Fr", name: "Francium", en: 0.7, lp: 0, col: 1, row: 5, tag: "min" },
    { sym: "I", name: "Iod", en: 2.5, lp: 3, col: 7, row: 5 }
  ];

  const M1_PRESETS = {
    hcl: { sym1: "H", en1: 2.1, lp1: 0, sym2: "Cl", en2: 3.0, lp2: 3, note: "Cl (EN = 3,0) zieht das bindende Elektronenpaar stärker an als H (EN = 2,1) → ΔEN = 0,9 (polar)." },
    hh: { sym1: "H", en1: 2.1, lp1: 0, sym2: "H", en2: 2.1, lp2: 0, note: "Beide H-Atome ziehen gleich stark (ΔEN = 0) → unpolare Elektronenpaarbindung." },
    ch: { sym1: "C", en1: 2.5, lp1: 0, sym2: "H", en2: 2.1, lp2: 0, note: "In Methan (CH₄) bzw. Ethan (C₂H₆) ist ΔEN(C–H) = 0,4 ≤ 0,5 → unpolar." },
    cc: { sym1: "C", en1: 2.5, lp1: 0, sym2: "C", en2: 2.5, lp2: 0, note: "Gleiche C-Atome in C₂H₆: ΔEN(C–C) = 0 → rein unpolare Bindung." },
    oh: { sym1: "O", en1: 3.5, lp1: 2, sym2: "H", en2: 2.1, lp2: 0, note: "In Wasser (H₂O) zieht O viel stärker als H (ΔEN = 1,4) → stark polare Bindung." },
    hf: { sym1: "H", en1: 2.1, lp1: 0, sym2: "F", en2: 4.0, lp2: 3, note: "Fluor hat die höchste EN (4,0): ΔEN = 1,9 → sehr stark polare Elektronenpaarbindung." }
  };

  const QUIZZES = {
    step1: [
      {
        id: "s1q1",
        question: "1. Welche Partialladungen entstehen im Chlorwasserstoff-Molekül (H–Cl)?",
        options: [
          "δ⁻ am H-Atom und δ⁺ am Cl-Atom",
          "δ⁺ am H-Atom und δ⁻ am Cl-Atom",
          "Keine, weil H und Cl Nichtmetalle sind"
        ],
        correct: 1,
        explanation: "Chlor (EN = 3,0) ist elektronegativer als Wasserstoff (EN = 2,1; ΔEN = 0,9 > 0,5). Es zieht die bindenden Elektronen zu sich → Cl erhält δ⁻, H erhält δ⁺."
      },
      {
        id: "s1q2",
        question: "2. Warum zählt eine C–H-Bindung (ΔEN = 0,4) in Methan (CH₄) als unpolar?",
        options: [
          "Weil die Elektronegativitätsdifferenz ΔEN ≤ 0,4 zu klein für einen deutlichen Dipol-Charakter ist",
          "Weil Kohlenstoff immer eine höhere EN als Fluor besitzt",
          "Weil Wasserstoff keine Elektronen hat"
        ],
        correct: 0,
        explanation: "Erst ab ΔEN > 0,5 spricht man im Schulmodell von einer polaren Elektronenpaarbindung. Bei H₂ (0) und C–H (0,4) bleiben die Bindungen unpolar."
      }
    ],
    step2: [
      {
        id: "s2q1",
        question: "1. Warum ist CO₂ trotz zweier polarer C=O-Bindungen (ΔEN = 1,0) insgesamt kein Dipol?",
        options: [
          "Weil Sauerstoff weniger elektronegativ als Kohlenstoff ist",
          "Weil es linear (180°) gebaut ist und die Schwerpunkte von δ⁺ und δ⁻ auf dem C-Atom zusammenfallen",
          "Weil CO₂ ein Ionengitter bildet"
        ],
        correct: 1,
        explanation: "Beide O-Atome ziehen genau gleich stark in entgegengesetzte Richtungen. Der negative und positive Schwerpunkt liegen gemeinsam auf dem C-Atom."
      },
      {
        id: "s2q2",
        question: "2. Welche Eigenschaften passen zum symmetrischen Methan-Molekül (CH₄)?",
        options: [
          "Hydrophil und sehr hohe Siedetemperatur",
          "Permanenter Dipol mit getrennten Schwerpunkten",
          "Kein Dipol, unpolarer Stoff (hydrophob, niedrige Siedetemperatur)"
        ],
        correct: 2,
        explanation: "CH₄ ist punktsymmetrisch im C-Atom (und ΔEN = 0,4 gering) → kein Dipol → unpolar, hydrophob und siedet sehr niedrig (−162 °C)."
      }
    ],
    step3: [
      {
        id: "s3q1",
        question: "1. Vergleiche Wasser (Sdp. 100 °C) und Schwefeldioxid (Sdp. −10 °C): Welche WW wirken jeweils zwischen den Molekülen?",
        options: [
          "H₂O bildet starke Wasserstoffbrücken · SO₂ bildet Dipol-Dipol-Wechselwirkungen",
          "H₂O bildet nur schwache Dipol-Dipol-WW · SO₂ bildet Wasserstoffbrücken",
          "Zwischen beiden Stoffen wirken überhaupt keine zwischenmolekularen Kräfte"
        ],
        correct: 0,
        explanation: "H₂O besitzt stark polarisierte O–H-Bindungen und bildet starke Wasserstoffbrücken aus (Sdp. 100 °C). Gewinkeltes SO₂ ist ein permanenter Dipol und bildet Dipol-Dipol-Wechselwirkungen aus (Sdp. −10 °C)."
      },
      {
        id: "s3q2",
        question: "2. Was wird beim Sieden von Wasser (100 °C) auf Teilchenebene überwunden?",
        options: [
          "Die Elektronenpaarbindungen zwischen O und H im Molekül",
          "Die zwischenmolekularen Wasserstoffbrücken zwischen den H₂O-Molekülen",
          "Die Atombindungen werden zu Ionen gespalten"
        ],
        correct: 1,
        explanation: "Beim Sieden bleiben die Moleküle selbst völlig intakt! Es werden nur die Anziehungskräfte zwischen den Molekülen überwunden."
      }
    ],
    step4: [
      {
        id: "s4q1",
        question: "1. Wie ordnen sich Wassermoleküle in der Hydrat-Hülle um ein positives Na⁺-Ion an?",
        options: [
          "Mit den positiven H-Polen (δ⁺) nach innen zum Na⁺-Ion",
          "Mit dem negativen O-Pol (δ⁻) nach innen zum Na⁺-Ion",
          "Völlig zufällig ohne feste Ausrichtung"
        ],
        correct: 1,
        explanation: "Ungleiche Ladungen ziehen sich an: Der negativ teilgeladene O-Pol (δ⁻) richtet sich zum positiven Na⁺-Ion; um Cl⁻ zeigen die δ⁺-H-Pole nach innen."
      },
      {
        id: "s4q2",
        question: "2. Woran erkennst du einen hydrophilen Stoff auf Teilchenebene?",
        options: [
          "Er besteht aus Teilchen mit polaren Bindungen („Dipol-Charakter“) oder Ionen",
          "Er hat ausschließlich unpolare C–C- und C–H-Bindungen",
          "Er besitzt überhaupt keine Elektronen"
        ],
        correct: 0,
        explanation: "„Ähnliches löst sich in Ähnlichem“: Polare Moleküle bzw. Ionen wechselwirken stark mit den polaren H₂O-Dipolen und sind daher hydrophil."
      }
    ],
    step5: [
      {
        id: "s5q1",
        question: "Check 1 (EN-Trend): Welches Element hat die höchste Elektronegativität im PSE?",
        options: ["Francium (Fr)", "Kohlenstoff (C)", "Fluor (F)"],
        correct: 2,
        explanation: "Im PSE steigt die EN nach rechts oben: Fluor (EN = 4,0) besitzt die höchste, Francium (EN = 0,7) die niedrigste EN."
      },
      {
        id: "s5q2",
        question: "Check 2 (Symmetrie): Welches Molekül ist trotz polarer Bindungen KEIN permanenter Dipol?",
        options: ["H₂O (gewinkelt, 104,5°)", "CO₂ (linear, 180°)", "HCl (zweiatomig, ΔEN = 0,9)"],
        correct: 1,
        explanation: "Bei linearem CO₂ heben sich beide entgegengesetzten Bindungspolaritäten auf: δ⁺- und δ⁻-Schwerpunkt fallen auf dem C-Atom zusammen."
      },
      {
        id: "s5q3",
        question: "Check 3 (H-Brücken): Welche beiden Bedingungen braucht eine echte Wasserstoffbrücke?",
        options: [
          "Ein H-Atom an F, O oder N (δ⁺) UND ein freies Elektronenpaar am Nachbarmolekül (δ⁻)",
          "Zwei unpolare Chlor-Moleküle und eine Temperatur unter −40 °C",
          "Ein Metall-Ion und ein Alkan-Molekül"
        ],
        correct: 0,
        explanation: "H-Brücken entstehen gerichtet zwischen einem stark positiv teilgeladenen H-Atom (an F, O oder N) und einem freien Elektronenpaar."
      },
      {
        id: "s5q4",
        question: "Check 4 (WW & Siedetemperatur): Warum besitzt Wasser (H₂O) eine deutlich höhere Siedetemperatur (100 °C) als Schwefeldioxid (SO₂, −10 °C)?",
        options: [
          "Wasserstoffbrücken zwischen H₂O-Molekülen sind deutlich stärker als reine Dipol-Dipol-Kräfte zwischen SO₂-Molekülen",
          "SO₂ ist ein unpolares Molekül ohne Dipolmoment",
          "In flüssigem Wasser spalten sich beim Sieden die Atombindungen"
        ],
        correct: 0,
        explanation: "Wasserstoffbrücken gehören zu den stärksten zwischenmolekularen Wechselwirkungen und erfordern viel mehr Wärmeenergie zum Überwinden als reine Dipol-Dipol-Kräfte."
      },
      {
        id: "s5q5",
        question: "Check 5 (Hydratation): Was hält Ionen in wässriger Kochsalzlösung voneinander getrennt?",
        options: [
          "Eine gerichtete Hydrat-Hülle aus H₂O-Dipolen um jedes Na⁺- und Cl⁻-Ion",
          "Repulsive Abstoßungskräfte der Wassermoleküle",
          "Eine kovalente Bindung zwischen Na⁺ und Cl⁻"
        ],
        correct: 0,
        explanation: "Die Wasser-Dipole bilden eine energetisch günstige Hydrat-Hülle (Oδ⁻ zu Na⁺; Hδ⁺ zu Cl⁻) und halten die Ionen in Lösung."
      },
      {
        id: "s5q6",
        question: "Check 6 (Ausblick Klasse 10): Warum siedet Ethanol (CH₃–CH₂–OH, +78 °C) viel höher als Ethan (C₂H₆, −89 °C)?",
        options: [
          "Ethan ist ein Ionengitter",
          "Ethanol besitzt eine polare O–H-Gruppe und bildet starke H-Brücken, während unpolares Ethan keine H-Brücken bilden kann",
          "Ethanol hat überhaupt keine zwischenmolekularen Kräfte"
        ],
        correct: 1,
        explanation: "Genau das brauchst du in Klasse 10: Die polare O–H-Gruppe ermöglicht H-Brücken (hoher Sdp., hydrophil), während Ethan unpolar bleibt!"
      }
    ]
  };

  /* ------------------------------------------------------------------------
     2. ZUSTAND & PERSISTENZ
     ------------------------------------------------------------------------ */
  const state = {
    activeStep: "step1",
    answers: {}, // { questionId: selectedIndex }
    m1: {
      sym1: "H",
      en1: 2.1,
      lp1: 0,
      sym2: "Cl",
      en2: 3.0,
      lp2: 3,
      target: "right",
      preset: "hcl"
    },
    m2: {
      mol: "co2",
      angle: 180,
      fieldOn: false,
      fieldRotation: 0
    },
    m3: {
      substance: "h2o",
      mol2x: 410,
      mol2y: 125,
      mol2Rot: 0,
      showFormal: true,
      tempC: 20,
      dragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
      particles: []
    },
    m4: {
      mode: "builder",
      phase: 0,
      mix: "nacl",
      // 8 H2O dipoles: 0..3 around Na+ (ideal angle points O inward), 4..7 around Cl- (ideal angle points H inward)
      // Angles in degrees: 0 = pointing right, 90 = down, 180 = left, 270 = up (orientation of O -> H-midpoint vector)
      builderAngles: [0, 90, 90, 180, 180, 270, 0, 90]
    }
  };

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.answers === "object") {
          state.answers = parsed.answers;
        }
        if (parsed && typeof parsed.activeStep === "string" && document.getElementById(`panel-${parsed.activeStep}`)) {
          state.activeStep = parsed.activeStep;
        }
      }
    } catch (e) {}
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activeStep: state.activeStep,
        answers: state.answers
      }));
    } catch (e) {}
  }

  /* ------------------------------------------------------------------------
     3. HILFSFUNKTIONEN (THEME, SLIDER, HIDPI CANVAS)
     ------------------------------------------------------------------------ */
  function isDarkMode() {
    const attr = document.documentElement.dataset.theme;
    if (attr === "dark") return true;
    if (attr === "light") return false;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function getPalette() {
    const dark = isDarkMode();
    return {
      dark,
      bg: dark ? "#0f172a" : "#f8fafc",
      surface: dark ? "#1e293b" : "#ffffff",
      surfaceAlt: dark ? "#334155" : "#e2e8f0",
      ink: dark ? "#f8fafc" : "#0f172a",
      muted: dark ? "#cbd5e1" : "#475569",
      border: dark ? "#475569" : "#cbd5e1",
      primary: dark ? "#38bdf8" : "#006699",
      teal: dark ? "#2dd4bf" : "#0f766e",
      deltaPlus: dark ? "#f87171" : "#dc2626",
      deltaMinus: dark ? "#38bdf8" : "#0284c7",
      ok: dark ? "#4ade80" : "#15803d",
      warn: dark ? "#fbbf24" : "#b45309",
      bad: dark ? "#f87171" : "#b91c1c"
    };
  }

  function formatDe(num, digits = 1) {
    return num.toFixed(digits).replace(".", ",");
  }

  function syncSliderVisual(slider) {
    if (!slider) return;
    slider.style.setProperty("--attr-min", slider.min || 0);
    slider.style.setProperty("--attr-max", slider.max || 100);
    slider.style.setProperty("--control-value", slider.value);
  }

  const CANVAS_DIMS = {
    canvasModel1: { w: 660, h: 270 },
    canvasModel2: { w: 660, h: 310 },
    canvasModel3Lupe: { w: 660, h: 250 },
    canvasModel3Boil: { w: 660, h: 190 },
    canvasModel4: { w: 660, h: 310 }
  };

  function setupHiDPICanvas(canvas) {
    if (!canvas) return { ctx: null, w: 660, h: 270 };
    const dims = CANVAS_DIMS[canvas.id] || { w: 660, h: 270 };
    const logicalW = dims.w;
    const logicalH = dims.h;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(logicalW * dpr);
    const targetH = Math.round(logicalH * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: logicalW, h: logicalH };
  }

  function drawRoundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.rect(x, y, w, h);
    }
  }

  /* ------------------------------------------------------------------------
     4. THEME SWITCH & TAB NAVIGATION (WITH ACCESSIBILITY + FALLBACKS)
     ------------------------------------------------------------------------ */
  function initThemeToggle() {
    const btn = document.getElementById("themeToggleBtn");
    const icon = document.getElementById("themeToggleIcon");
    const label = document.getElementById("themeToggleLabel");
    const meta = document.querySelector('meta[name="color-scheme"]');

    function refreshThemeUI() {
      const current = document.documentElement.dataset.theme || "system";
      if (current === "dark") {
        icon.textContent = "🌙";
        label.textContent = "Dunkel";
      } else if (current === "light") {
        icon.textContent = "☀️";
        label.textContent = "Hell";
      } else {
        icon.textContent = "🌓";
        label.textContent = "System";
      }
      redrawAllCanvases();
    }

    btn.addEventListener("click", () => {
      const current = document.documentElement.dataset.theme || "system";
      const next = current === "system" ? "dark" : current === "dark" ? "light" : "system";
      if (next === "system") {
        delete document.documentElement.dataset.theme;
        meta.content = "light dark";
        try { localStorage.removeItem(SCHEME_KEY); } catch (e) {}
      } else {
        document.documentElement.dataset.theme = next;
        meta.content = next;
        try { localStorage.setItem(SCHEME_KEY, next); } catch (e) {}
      }
      refreshThemeUI();
    });

    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        redrawAllCanvases();
      });
    }
    refreshThemeUI();
  }

  function initTabs() {
    const tablist = document.getElementById("stepsTablist");
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

    function selectStep(stepId, moveFocus = false) {
      state.activeStep = stepId;
      saveProgress();

      for (const tab of tabs) {
        const isSelected = tab.dataset.step === stepId;
        tab.setAttribute("aria-selected", String(isSelected));
        tab.toggleAttribute("focusgroupstart", isSelected);
        if (!Object.hasOwn(HTMLElement.prototype, "focusGroup")) {
          tab.tabIndex = isSelected ? 0 : -1;
        }
        if (isSelected) {
          tab.scrollIntoView({ block: "nearest", inline: "nearest", container: "nearest" });
          if (moveFocus) tab.focus();
        }
      }

      for (const panel of panels) {
        const isCurrent = panel.dataset.step === stepId;
        if (isCurrent) {
          panel.removeAttribute("hidden");
        } else {
          panel.setAttribute("hidden", "until-found");
        }
      }

      redrawAllCanvases();
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => selectStep(tab.dataset.step, false));
    });

    // Fallback roving keyboard navigation when native focusgroup is unavailable
    if (!Object.hasOwn(HTMLElement.prototype, "focusGroup")) {
      tablist.addEventListener("keydown", (e) => {
        const idx = tabs.indexOf(document.activeElement);
        if (idx === -1) return;
        let nextIdx = idx;
        if (e.key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
        else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") nextIdx = 0;
        else if (e.key === "End") nextIdx = tabs.length - 1;
        else return;

        e.preventDefault();
        selectStep(tabs[nextIdx].dataset.step, true);
      });
    }

    // Support browser find-in-page revealing hidden=until-found panels
    panels.forEach((panel) => {
      panel.addEventListener("beforematch", () => {
        selectStep(panel.dataset.step, false);
      });
    });

    // Next step buttons at bottom of each module
    document.querySelectorAll(".next-step-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectStep(btn.dataset.next, false);
        const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById("main-heading").scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start"
        });
      });
    });

    // Scroll-fade fallback when CSS animation-timeline: scroll() is unsupported
    if (typeof CSS !== "undefined" && !CSS.supports("animation-timeline", "scroll()") && typeof IntersectionObserver !== "undefined" && tabs.length >= 2) {
      const firstTab = tabs[0];
      const lastTab = tabs[tabs.length - 1];
      const scrollObs = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          tablist.classList.toggle(entry.target === firstTab ? "more-start" : "more-end", entry.intersectionRatio < 1);
        }
      }, { root: tablist, threshold: 1, rootMargin: "1px" });
      scrollObs.observe(firstTab);
      scrollObs.observe(lastTab);
    }

    selectStep(state.activeStep, false);
  }

  /* ------------------------------------------------------------------------
     5. MODELL 1: ELEKTRONEGATIVITÄT, TAUZIEHEN & MINI-PSE
     ------------------------------------------------------------------------ */
  function initModel1() {
    const pseGrid = document.getElementById("m1PseGrid");
    const targetLBtn = document.getElementById("m1TargetLeft");
    const targetRBtn = document.getElementById("m1TargetRight");
    const presetBtns = document.querySelectorAll("[data-m1-preset]");
    const canvas1 = document.getElementById("canvasModel1");

    function setTarget(side) {
      state.m1.target = side;
      const isLeft = side === "left";
      targetLBtn.classList.toggle("active", isLeft);
      targetLBtn.setAttribute("aria-pressed", String(isLeft));
      targetRBtn.classList.toggle("active", !isLeft);
      targetRBtn.setAttribute("aria-pressed", String(!isLeft));
      drawModel1();
    }

    // Build Mini-PSE grid (5 rows x 7 cols)
    for (let r = 1; r <= 5; r++) {
      for (let c = 1; c <= 7; c++) {
        const el = MINI_PSE.find((item) => item.row === r && item.col === c);
        if (!el) {
          const spacer = document.createElement("div");
          spacer.className = "pse-spacer";
          spacer.setAttribute("aria-hidden", "true");
          pseGrid.appendChild(spacer);
          continue;
        }
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pse-cell";
        btn.dataset.sym = el.sym;
        if (el.tag === "max") btn.classList.add("pse-max");
        if (el.tag === "min") btn.classList.add("pse-min");
        btn.innerHTML = `<strong>${el.sym}</strong><span>${formatDe(el.en)}</span>`;
        btn.setAttribute("aria-label", `${el.name}, Elektronegativität ${formatDe(el.en)}`);
        btn.addEventListener("click", () => {
          if (state.m1.target === "left") {
            state.m1.sym1 = el.sym;
            state.m1.en1 = el.en;
            state.m1.lp1 = el.lp;
          } else {
            state.m1.sym2 = el.sym;
            state.m1.en2 = el.en;
            state.m1.lp2 = el.lp;
          }
          state.m1.preset = null;
          presetBtns.forEach((b) => b.classList.remove("active"));
          syncModel1UI();
          drawModel1();
        });
        pseGrid.appendChild(btn);
      }
    }

    targetLBtn.addEventListener("click", () => setTarget("left"));
    targetRBtn.addEventListener("click", () => setTarget("right"));

    if (canvas1) {
      canvas1.addEventListener("click", (e) => {
        const rect = canvas1.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 660;
        const y = ((e.clientY - rect.top) / rect.height) * 270;
        if (y < 185) {
          setTarget(x < 330 ? "left" : "right");
        }
      });
    }

    presetBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.m1Preset;
        const p = M1_PRESETS[key];
        if (!p) return;
        state.m1.sym1 = p.sym1;
        state.m1.en1 = p.en1;
        state.m1.lp1 = p.lp1;
        state.m1.sym2 = p.sym2;
        state.m1.en2 = p.en2;
        state.m1.lp2 = p.lp2;
        state.m1.preset = key;
        presetBtns.forEach((b) => b.classList.toggle("active", b === btn));
        syncModel1UI();
        drawModel1();
      });
    });

    syncModel1UI();
  }

  function syncModel1UI() {
    const targetLeftSym = document.getElementById("m1TargetLeftSym");
    const targetRightSym = document.getElementById("m1TargetRightSym");
    const targetLeftEn = document.getElementById("m1TargetLeftEn");
    const targetRightEn = document.getElementById("m1TargetRightEn");

    if (targetLeftSym) targetLeftSym.textContent = state.m1.sym1;
    if (targetRightSym) targetRightSym.textContent = state.m1.sym2;
    if (targetLeftEn) targetLeftEn.textContent = formatDe(state.m1.en1);
    if (targetRightEn) targetRightEn.textContent = formatDe(state.m1.en2);

    document.querySelectorAll("#m1PseGrid .pse-cell").forEach((cell) => {
      cell.classList.toggle("is-selected-left", cell.dataset.sym === state.m1.sym1);
      cell.classList.toggle("is-selected-right", cell.dataset.sym === state.m1.sym2);
    });

    const delta = Math.abs(state.m1.en2 - state.m1.en1);
    const badge = document.getElementById("m1StatusBadge");
    const caption = document.getElementById("m1Caption");

    badge.classList.remove("ok", "warn");
    if (delta <= 0.45) {
      badge.textContent = `ΔEN = ${formatDe(delta)} · Unpolar (kein Dipol)`;
      badge.classList.add("ok");
    } else if (delta >= 1.7 && state.m1.sym1 !== "H" && state.m1.sym2 !== "H") {
      badge.textContent = `ΔEN = ${formatDe(delta)} · Übergang zur Ionenbindung`;
      badge.classList.add("warn");
    } else {
      badge.textContent = `ΔEN = ${formatDe(delta)} · Polare Bindung (Dipol)`;
    }

    if (state.m1.preset && M1_PRESETS[state.m1.preset]) {
      caption.textContent = M1_PRESETS[state.m1.preset].note;
    } else if (delta <= 0.45) {
      caption.textContent = `${state.m1.sym1} (EN = ${formatDe(state.m1.en1)}) und ${state.m1.sym2} (EN = ${formatDe(state.m1.en2)}): ΔEN = ${formatDe(delta)} ≤ 0,5 → gemeinsame Bindungselektronen sind nahezu symmetrisch verteilt.`;
    } else {
      const stronger = state.m1.en2 > state.m1.en1 ? state.m1.sym2 : state.m1.sym1;
      const weaker = state.m1.en2 > state.m1.en1 ? state.m1.sym1 : state.m1.sym2;
      caption.textContent = `${stronger} zieht die bindenden Elektronen stärker an als ${weaker} (ΔEN = ${formatDe(delta)} > 0,5) → δ⁺ bei ${weaker}, δ⁻ bei ${stronger}.`;
    }
  }

  function drawLonePairs(ctx, cx, cy, r, count, excludeAngles, color) {
    // Draw Lewis non-bonding electron pair lines around an atom avoiding bond directions
    const excluded = Array.isArray(excludeAngles) ? excludeAngles : [excludeAngles];
    const candidateAngles = [0, -Math.PI / 2, Math.PI, Math.PI / 2];
    const filtered = candidateAngles.filter((ang) =>
      excluded.every((ex) => {
        const diff = Math.abs(Math.atan2(Math.sin(ang - ex), Math.cos(ang - ex)));
        return diff > 0.65;
      })
    );
    const chosen = filtered.slice(0, count);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3.2;
    ctx.lineCap = "round";
    for (const ang of chosen) {
      const dist = r + 10;
      const mx = cx + Math.cos(ang) * dist;
      const my = cy + Math.sin(ang) * dist;
      const px = -Math.sin(ang) * 11;
      const py = Math.cos(ang) * 11;
      ctx.beginPath();
      ctx.moveTo(mx - px, my - py);
      ctx.lineTo(mx + px, my + py);
      ctx.stroke();
    }
  }

  function drawModel1() {
    const canvas = document.getElementById("canvasModel1");
    if (!canvas) return;
    const { ctx, w, h } = setupHiDPICanvas(canvas);
    const pal = getPalette();

    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, w, h);

    const x1 = 195;
    const x2 = 465;
    const cy = 104;
    const diff = state.m1.en2 - state.m1.en1; // >0 pulls right, <0 pulls left
    const absDiff = Math.abs(diff);
    const isPolar = absDiff > 0.45;
    const norm = Math.min(absDiff / 2.2, 1);

    // 1. Electron density cloud (organic teardrop shifted to stronger EN)
    const rLeft = 46 - diff * 7.5;
    const rRight = 46 + diff * 7.5;
    const cLeft = Math.max(24, Math.min(74, rLeft));
    const cRight = Math.max(24, Math.min(74, rRight));

    const grad = ctx.createLinearGradient(x1 - 70, cy, x2 + 70, cy);
    if (!isPolar) {
      grad.addColorStop(0, pal.dark ? "rgba(56, 189, 248, 0.22)" : "rgba(0, 102, 153, 0.14)");
      grad.addColorStop(1, pal.dark ? "rgba(56, 189, 248, 0.22)" : "rgba(0, 102, 153, 0.14)");
    } else if (diff > 0) {
      grad.addColorStop(0, pal.dark ? "rgba(248, 113, 113, 0.24)" : "rgba(220, 38, 38, 0.16)");
      grad.addColorStop(0.5, pal.dark ? "rgba(56, 189, 248, 0.25)" : "rgba(2, 132, 199, 0.16)");
      grad.addColorStop(1, pal.dark ? "rgba(56, 189, 248, 0.48)" : "rgba(2, 132, 199, 0.36)");
    } else {
      grad.addColorStop(0, pal.dark ? "rgba(56, 189, 248, 0.48)" : "rgba(2, 132, 199, 0.36)");
      grad.addColorStop(0.5, pal.dark ? "rgba(56, 189, 248, 0.25)" : "rgba(2, 132, 199, 0.16)");
      grad.addColorStop(1, pal.dark ? "rgba(248, 113, 113, 0.24)" : "rgba(220, 38, 38, 0.16)");
    }

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, cy - cLeft);
    ctx.bezierCurveTo(x1 + 85, cy - cLeft * 0.82, x2 - 85, cy - cRight * 0.82, x2, cy - cRight);
    ctx.arc(x2, cy, cRight, -Math.PI / 2, Math.PI / 2);
    ctx.bezierCurveTo(x2 - 85, cy + cRight * 0.82, x1 + 85, cy + cLeft * 0.82, x1, cy + cLeft);
    ctx.arc(x1, cy, cLeft, Math.PI / 2, -Math.PI / 2);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = isPolar ? pal.deltaMinus : pal.border;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // 2. Lewis Bond line (or wedge hint)
    ctx.strokeStyle = pal.ink;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x1 + 30, cy);
    ctx.lineTo(x2 - 30, cy);
    ctx.stroke();

    // Bonding electron pair dots shifted toward higher EN
    const shiftX = (x1 + x2) / 2 + Math.max(-72, Math.min(72, diff * 46));
    ctx.fillStyle = pal.primary;
    for (const dy of [-7, 7]) {
      ctx.beginPath();
      ctx.arc(shiftX, cy + dy, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = pal.surface;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.font = `700 12px ${CANVAS_FONT}`;
    ctx.fillStyle = pal.muted;
    ctx.textAlign = "center";
    ctx.fillText("bindendes e⁻-Paar", shiftX, cy + 28);

    // 3. Pull arrow above bond when ΔEN > 0.05
    if (absDiff > 0.05) {
      const dir = diff > 0 ? 1 : -1;
      const ax1 = (x1 + x2) / 2 - dir * 55;
      const ax2 = (x1 + x2) / 2 + dir * 55;
      ctx.strokeStyle = isPolar ? pal.deltaMinus : pal.muted;
      ctx.fillStyle = isPolar ? pal.deltaMinus : pal.muted;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(ax1, cy - 42);
      ctx.lineTo(ax2, cy - 42);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ax2, cy - 42);
      ctx.lineTo(ax2 - dir * 10, cy - 49);
      ctx.lineTo(ax2 - dir * 10, cy - 35);
      ctx.closePath();
      ctx.fill();
      ctx.font = `600 12px ${CANVAS_FONT}`;
      ctx.fillText("e⁻-Zug", (ax1 + ax2) / 2, cy - 52);
    }

    // 4. Atom Circles & Lewis Lone Pairs
    const atoms = [
      { x: x1, sym: state.m1.sym1, en: state.m1.en1, lp: state.m1.lp1, bondAng: 0, sign: diff > 0 ? "+" : "-" },
      { x: x2, sym: state.m1.sym2, en: state.m1.en2, lp: state.m1.lp2, bondAng: Math.PI, sign: diff > 0 ? "-" : "+" }
    ];

    atoms.forEach((a, idx) => {
      const isSelectedTarget =
        (idx === 0 && state.m1.target === "left") ||
        (idx === 1 && state.m1.target === "right");

      if (isSelectedTarget) {
        ctx.save();
        ctx.strokeStyle = pal.primary;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.arc(a.x, cy, 34, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      ctx.fillStyle = pal.surface;
      ctx.beginPath();
      ctx.arc(a.x, cy, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isPolar ? (a.sign === "+" ? pal.deltaPlus : pal.deltaMinus) : pal.ink;
      ctx.lineWidth = 2.6;
      ctx.stroke();

      ctx.fillStyle = pal.ink;
      ctx.font = `800 22px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(a.sym, a.x, cy + 1);

      if (a.lp > 0) {
        drawLonePairs(ctx, a.x, cy, 26, a.lp, a.bondAng, pal.ink);
      }

      // Partial charge badges
      ctx.textBaseline = "alphabetic";
      if (isPolar) {
        const badgeX = idx === 0 ? a.x - 55 : a.x + 55;
        ctx.fillStyle = a.sign === "+" ? pal.deltaPlus : pal.deltaMinus;
        ctx.font = `800 22px ${CANVAS_FONT}`;
        ctx.fillText(a.sign === "+" ? "δ⁺" : "δ⁻", badgeX, cy + 6);
        ctx.font = `600 11px ${CANVAS_FONT}`;
        ctx.fillText(a.sign === "+" ? "Teilladung +" : "Teilladung −", badgeX, cy + 25);
      }
      ctx.fillStyle = pal.muted;
      ctx.font = `600 12px ${CANVAS_MONO}`;
      ctx.fillText(`EN = ${formatDe(a.en)}`, a.x, cy + 54);
      if (isSelectedTarget) {
        ctx.fillStyle = pal.primary;
        ctx.font = `700 11px ${CANVAS_FONT}`;
        ctx.fillText("✓ PSE-Ziel (klickbar)", a.x, cy + 72);
      }
    });

    // 5. Bottom ΔEN Scale Bar (0 .. 3.3, threshold at 0.5)
    const barX = 48;
    const barW = w - 96;
    const barY = 216;
    const barH = 14;
    const threshX = barX + (0.5 / 3.3) * barW;
    const ionicX = barX + (1.7 / 3.3) * barW;

    drawRoundedRect(ctx, barX, barY, threshX - barX, barH, [7, 0, 0, 7]);
    ctx.fillStyle = pal.dark ? "rgba(74, 222, 128, 0.35)" : "#bbf7d0";
    ctx.fill();

    ctx.fillStyle = pal.dark ? "rgba(56, 189, 248, 0.35)" : "#bae6fd";
    ctx.fillRect(threshX, barY, ionicX - threshX, barH);

    drawRoundedRect(ctx, ionicX, barY, barX + barW - ionicX, barH, [0, 7, 7, 0]);
    ctx.fillStyle = pal.dark ? "rgba(251, 191, 36, 0.35)" : "#fde68a";
    ctx.fill();

    ctx.strokeStyle = pal.border;
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, barX, barY, barW, barH, 7);
    ctx.stroke();

    // Threshold tick at 0.5
    ctx.strokeStyle = pal.ink;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(threshX, barY - 6);
    ctx.lineTo(threshX, barY + barH + 6);
    ctx.stroke();

    // Labels on scale
    ctx.font = `600 11px ${CANVAS_FONT}`;
    ctx.fillStyle = pal.ink;
    ctx.textAlign = "left";
    ctx.fillText("0 (unpolar)", barX, barY + 32);
    ctx.textAlign = "center";
    ctx.fillText("Schwelle ΔEN = 0,5", threshX + 18, barY - 10);
    ctx.fillText("polar (> 0,5)", (threshX + ionicX) / 2, barY + 32);
    ctx.textAlign = "right";
    ctx.fillText("ab ~1,7: stark polar / ionisch", barX + barW, barY + 32);

    // Current ΔEN marker
    const curX = barX + (Math.min(absDiff, 3.3) / 3.3) * barW;
    ctx.fillStyle = isPolar ? pal.deltaMinus : pal.ok;
    ctx.beginPath();
    ctx.moveTo(curX, barY - 2);
    ctx.lineTo(curX - 7, barY - 13);
    ctx.lineTo(curX + 7, barY - 13);
    ctx.closePath();
    ctx.fill();
  }

  /* ------------------------------------------------------------------------
     6. MODELL 2: SYMMETRIE & LADUNGSSCHWERPUNKTE (CO2 / H2O / CH4 / HCl)
     ------------------------------------------------------------------------ */
  let m2RafId = null;

  function initModel2() {
    const molBtns = document.querySelectorAll("[data-m2-mol]");
    const angleSlider = document.getElementById("m2AngleSlider");
    const fieldBtn = document.getElementById("m2FieldToggle");
    const resetAngleBtn = document.getElementById("m2ResetAngleBtn");

    function selectMol(mol) {
      state.m2.mol = mol;
      state.m2.fieldRotation = 0;
      if (mol === "co2") state.m2.angle = 180;
      else if (mol === "h2o") state.m2.angle = 105;
      else if (mol === "ch4") state.m2.angle = 109;
      else if (mol === "hcl") state.m2.angle = 180;
      molBtns.forEach((b) => b.classList.toggle("active", b.dataset.m2Mol === mol));
      syncModel2UI();
      drawModel2();
    }

    molBtns.forEach((btn) => {
      btn.addEventListener("click", () => selectMol(btn.dataset.m2Mol));
    });

    angleSlider.addEventListener("input", () => {
      state.m2.angle = parseInt(angleSlider.value, 10);
      syncModel2UI();
      drawModel2();
    });

    resetAngleBtn.addEventListener("click", () => {
      selectMol(state.m2.mol);
    });

    fieldBtn.addEventListener("click", () => {
      state.m2.fieldOn = !state.m2.fieldOn;
      fieldBtn.setAttribute("aria-pressed", String(state.m2.fieldOn));
      fieldBtn.innerHTML = `<span aria-hidden="true">⚡</span> Elektrisches Feld: ${state.m2.fieldOn ? "An" : "Aus"}`;
      if (state.m2.fieldOn) {
        startModel2Anim();
      } else {
        state.m2.fieldRotation = 0;
        drawModel2();
      }
    });

    syncModel2UI();
  }

  function getModel2DipoleInfo() {
    const mol = state.m2.mol;
    const deg = state.m2.angle;
    const halfRad = ((deg / 2) * Math.PI) / 180;

    if (mol === "ch4") {
      return { isDipole: false, strength: 0, label: "Kein Dipol (unpolar, hydrophob)", angleLabel: "109,5° (Tetraeder)" };
    }
    if (mol === "hcl") {
      return { isDipole: true, strength: 1.0, label: "Permanenter Dipol (asymmetrisch)", angleLabel: "180° (zweiatomig)" };
    }
    // For bent AB2 (CO2 or H2O), net dipole magnitude ~ cos(angle/2)
    const cosHalf = Math.abs(Math.cos(halfRad));
    const isDipole = cosHalf > 0.06;
    const angleLabel = mol === "h2o" && deg === 105 ? "104,5° (Original)" : `${deg}°`;
    return {
      isDipole,
      strength: cosHalf,
      label: isDipole ? "Permanenter Dipol (Schwerpunkte getrennt)" : "Kein Dipol (Schwerpunkte fallen zusammen)",
      angleLabel
    };
  }

  function syncModel2UI() {
    const slider = document.getElementById("m2AngleSlider");
    const resetBtn = document.getElementById("m2ResetAngleBtn");
    const badge = document.getElementById("m2StatusBadge");
    const caption = document.getElementById("m2Caption");
    const valOut = document.getElementById("m2AngleVal");

    const editable = state.m2.mol === "co2" || state.m2.mol === "h2o";
    slider.disabled = !editable;
    resetBtn.disabled = !editable;
    slider.value = String(state.m2.angle);
    syncSliderVisual(slider);

    const info = getModel2DipoleInfo();
    valOut.textContent = info.angleLabel;
    slider.setAttribute("aria-valuetext", info.angleLabel);

    badge.classList.remove("ok", "warn");
    if (info.isDipole) {
      badge.textContent = info.label;
    } else {
      badge.textContent = info.label;
      badge.classList.add("ok");
    }

    if (state.m2.mol === "co2") {
      if (!info.isDipole) {
        caption.textContent = "CO₂ (180°): Beide O-Atome (δ⁻) ziehen gleich stark in entgegengesetzte Richtungen → Schwerpunkte von δ⁺ und δ⁻ liegen gemeinsam auf dem C-Atom!";
      } else {
        caption.textContent = `Experiment (${state.m2.angle}°): Knickt man CO₂ gedanklich, trennen sich roter (δ⁺) und blauer (δ⁻) Schwerpunkt — dann wäre es ein Dipol!`;
      }
    } else if (state.m2.mol === "h2o") {
      if (info.isDipole) {
        caption.textContent = `H₂O (${info.angleLabel}): Gewinkelter Bau → Schwerpunkt von δ⁺ (zwischen den H-Atomen) und δ⁻ (am O-Atom) sind getrennt → permanenter Dipol.`;
      } else {
        caption.textContent = "Experiment (180°): Wäre Wasser linear wie CO₂, würden δ⁺ und δ⁻ zusammenfallen und Wasser wäre kein Dipol!";
      }
    } else if (state.m2.mol === "ch4") {
      caption.textContent = "CH₄ (Tetraeder): Punktsymmetrisch im C-Atom (und ΔEN(C–H) = 0,4 gering) → kein Dipol → unpolarer Stoff (hydrophob, niedrige Siedetemperatur).";
    } else {
      caption.textContent = "H–Cl (zweiatomig): Zwei unterschiedliche Pole (δ⁺ am H, δ⁻ am Cl) können sich räumlich nie aufheben → permanenter Dipol.";
    }
  }

  function startModel2Anim() {
    if (m2RafId) cancelAnimationFrame(m2RafId);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function tick() {
      if (!state.m2.fieldOn) return;
      const info = getModel2DipoleInfo();
      let targetRot = 0;
      if (info.isDipole) {
        // Target angle aligns dipole moment horizontally (+ plate on left attracts δ⁻, - plate on right attracts δ⁺)
        if (state.m2.mol === "co2") targetRot = -Math.PI / 2; // O (δ⁻) points left to + plate
        else if (state.m2.mol === "h2o") targetRot = Math.PI / 2; // O (δ⁻) on left, H (δ⁺) on right
        else if (state.m2.mol === "hcl") targetRot = Math.PI; // Cl (δ⁻) on left, H (δ⁺) on right
      }

      if (reduced) {
        state.m2.fieldRotation = targetRot;
        drawModel2();
        return;
      }

      const diff = targetRot - state.m2.fieldRotation;
      state.m2.fieldRotation += diff * 0.1;
      drawModel2();
      if (Math.abs(diff) > 0.005) {
        m2RafId = requestAnimationFrame(tick);
      } else {
        state.m2.fieldRotation = targetRot;
        drawModel2();
      }
    }
    m2RafId = requestAnimationFrame(tick);
  }

  function drawModel2() {
    const canvas = document.getElementById("canvasModel2");
    if (!canvas) return;
    const { ctx, w, h } = setupHiDPICanvas(canvas);
    const pal = getPalette();

    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2 + 6;
    const info = getModel2DipoleInfo();

    // Draw Electric Field Plates if active
    if (state.m2.fieldOn) {
      // Left positive plate
      ctx.fillStyle = pal.deltaPlus;
      drawRoundedRect(ctx, 22, 26, 20, h - 52, 6);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = `800 16px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.fillText("+", 32, 52);
      ctx.fillText("+", 32, h / 2 + 6);
      ctx.fillText("+", 32, h - 42);

      // Right negative plate
      ctx.fillStyle = pal.deltaMinus;
      drawRoundedRect(ctx, w - 42, 26, 20, h - 52, 6);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillText("−", w - 32, 52);
      ctx.fillText("−", w - 32, h / 2 + 6);
      ctx.fillText("−", w - 32, h - 42);

      // Subtle field lines
      ctx.save();
      ctx.strokeStyle = pal.border;
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 1.2;
      for (const fy of [62, h / 2 + 6, h - 50]) {
        ctx.beginPath();
        ctx.moveTo(52, fy);
        ctx.lineTo(w - 52, fy);
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(state.m2.fieldOn ? state.m2.fieldRotation : 0);

    // Draw symmetry dashed axis (vertical when unrotated)
    if (state.m2.mol === "co2" || state.m2.mol === "h2o") {
      ctx.save();
      ctx.strokeStyle = pal.teal;
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(0, -118);
      ctx.lineTo(0, 118);
      ctx.stroke();
      ctx.fillStyle = pal.teal;
      ctx.font = `600 11px ${CANVAS_FONT}`;
      ctx.textAlign = "left";
      ctx.fillText("Spiegelachse", 7, -104);
      ctx.restore();
    }

    let posCenter = { x: 0, y: 0 };
    let negCenter = { x: 0, y: 0 };

    if (state.m2.mol === "co2" || state.m2.mol === "h2o") {
      const isCO2 = state.m2.mol === "co2";
      const bondLen = 104;
      const halfRad = ((state.m2.angle / 2) * Math.PI) / 180;
      const sx = Math.sin(halfRad) * bondLen;
      const sy = Math.cos(halfRad) * bondLen;

      // In CO2: O atoms sit below/sides (at 180°, horizontal; as bent, O goes up: -sy)
      // In H2O: O at center (0, -25), H atoms go down-left and down-right (+sy)
      const centerAtom = isCO2 ? { x: 0, y: sy * 0.45, sym: "C", r: 24 } : { x: 0, y: -sy * 0.45, sym: "O", r: 24 };
      const sideAtoms = isCO2
        ? [
            { x: -sx, y: centerAtom.y - sy, sym: "O", r: 22 },
            { x: sx, y: centerAtom.y - sy, sym: "O", r: 22 }
          ]
        : [
            { x: -sx, y: centerAtom.y + sy, sym: "H", r: 19 },
            { x: sx, y: centerAtom.y + sy, sym: "H", r: 19 }
          ];

      // Draw bonds
      sideAtoms.forEach((sa) => {
        const dx = sa.x - centerAtom.x;
        const dy = sa.y - centerAtom.y;
        const len = Math.hypot(dx, dy);
        const nx = -dy / len;
        const ny = dx / len;
        ctx.strokeStyle = pal.ink;
        ctx.lineWidth = 3.2;
        if (isCO2) {
          // Double bond
          for (const off of [-4.5, 4.5]) {
            ctx.beginPath();
            ctx.moveTo(centerAtom.x + nx * off, centerAtom.y + ny * off);
            ctx.lineTo(sa.x + nx * off, sa.y + ny * off);
            ctx.stroke();
          }
        } else {
          ctx.beginPath();
          ctx.moveTo(centerAtom.x, centerAtom.y);
          ctx.lineTo(sa.x, sa.y);
          ctx.stroke();
        }
      });

      // Lone pairs on O
      if (isCO2) {
        sideAtoms.forEach((sa) => {
          const angToC = Math.atan2(centerAtom.y - sa.y, centerAtom.x - sa.x);
          drawLonePairs(ctx, sa.x, sa.y, sa.r, 2, angToC, pal.ink);
        });
      } else {
        const bondAngs = sideAtoms.map((sa) => Math.atan2(sa.y - centerAtom.y, sa.x - centerAtom.x));
        drawLonePairs(ctx, centerAtom.x, centerAtom.y, centerAtom.r, 2, bondAngs, pal.ink);
      }

      // Draw atoms
      const drawAtom = (a, chargeStr, chargeColor) => {
        ctx.fillStyle = pal.surface;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = chargeColor;
        ctx.lineWidth = 2.6;
        ctx.stroke();

        ctx.fillStyle = pal.ink;
        ctx.font = `800 20px ${CANVAS_FONT}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(a.sym, a.x, a.y + 1);

        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = chargeColor;
        ctx.font = `800 16px ${CANVAS_FONT}`;
        ctx.fillText(chargeStr, a.x, a.y - a.r - 12);
      };

      drawAtom(centerAtom, isCO2 ? "δ⁺" : "δ⁻", isCO2 ? pal.deltaPlus : pal.deltaMinus);
      sideAtoms.forEach((sa) => drawAtom(sa, isCO2 ? "δ⁻" : "δ⁺", isCO2 ? pal.deltaMinus : pal.deltaPlus));

      if (isCO2) {
        posCenter = { x: centerAtom.x, y: centerAtom.y };
        negCenter = { x: (sideAtoms[0].x + sideAtoms[1].x) / 2, y: (sideAtoms[0].y + sideAtoms[1].y) / 2 };
      } else {
        negCenter = { x: centerAtom.x, y: centerAtom.y };
        posCenter = { x: (sideAtoms[0].x + sideAtoms[1].x) / 2, y: (sideAtoms[0].y + sideAtoms[1].y) / 2 };
      }
    } else if (state.m2.mol === "ch4") {
      // CH4 wedge/dash layout matching page 2 of 10B_Chemie.pdf
      const cPos = { x: 0, y: 0 };
      const hs = [
        { x: 0, y: -88, type: "line", label: "" },
        { x: 88, y: 0, type: "line", label: "" },
        { x: -78, y: -12, type: "dash", label: "„hinten“" },
        { x: -46, y: 74, type: "wedge", label: "„vorne“" }
      ];

      hs.forEach((hp) => {
        if (hp.type === "line") {
          ctx.strokeStyle = pal.ink;
          ctx.lineWidth = 3.2;
          ctx.beginPath();
          ctx.moveTo(cPos.x, cPos.y);
          ctx.lineTo(hp.x, hp.y);
          ctx.stroke();
        } else if (hp.type === "wedge") {
          const ang = Math.atan2(hp.y - cPos.y, hp.x - cPos.x);
          const perpX = -Math.sin(ang);
          const perpY = Math.cos(ang);
          ctx.fillStyle = pal.ink;
          ctx.beginPath();
          ctx.moveTo(cPos.x, cPos.y);
          ctx.lineTo(hp.x + perpX * 8, hp.y + perpY * 8);
          ctx.lineTo(hp.x - perpX * 8, hp.y - perpY * 8);
          ctx.closePath();
          ctx.fill();
        } else {
          // Dashed wedge
          const steps = 6;
          ctx.strokeStyle = pal.ink;
          ctx.lineWidth = 2.2;
          for (let i = 1; i <= steps; i++) {
            const t = i / (steps + 1);
            const mx = cPos.x + hp.x * t;
            const my = cPos.y + hp.y * t;
            const ang = Math.atan2(hp.y, hp.x);
            const perpX = -Math.sin(ang) * (2 + t * 6);
            const perpY = Math.cos(ang) * (2 + t * 6);
            ctx.beginPath();
            ctx.moveTo(mx - perpX, my - perpY);
            ctx.lineTo(mx + perpX, my + perpY);
            ctx.stroke();
          }
        }
        if (hp.label) {
          ctx.fillStyle = pal.muted;
          ctx.font = `600 12px ${CANVAS_FONT}`;
          ctx.textAlign = "center";
          ctx.fillText(hp.label, hp.x - 16, hp.y + (hp.type === "wedge" ? 30 : -26));
        }
      });

      // Draw C and H atoms
      ctx.fillStyle = pal.surface;
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = pal.ink;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.fillStyle = pal.ink;
      ctx.font = `800 20px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("C", 0, 1);

      hs.forEach((hp) => {
        ctx.fillStyle = pal.surface;
        ctx.beginPath();
        ctx.arc(hp.x, hp.y, 17, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = pal.ink;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = pal.ink;
        ctx.font = `700 17px ${CANVAS_FONT}`;
        ctx.fillText("H", hp.x, hp.y + 1);
      });

      posCenter = { x: 0, y: 0 };
      negCenter = { x: 0, y: 0 };
    } else if (state.m2.mol === "hcl") {
      const hPos = { x: -72, y: 0 };
      const clPos = { x: 72, y: 0 };
      ctx.strokeStyle = pal.ink;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(hPos.x, hPos.y);
      ctx.lineTo(clPos.x, clPos.y);
      ctx.stroke();
      drawLonePairs(ctx, clPos.x, clPos.y, 24, 3, Math.PI, pal.ink);

      [
        { p: hPos, sym: "H", r: 19, c: pal.deltaPlus, d: "δ⁺" },
        { p: clPos, sym: "Cl", r: 24, c: pal.deltaMinus, d: "δ⁻" }
      ].forEach((a) => {
        ctx.fillStyle = pal.surface;
        ctx.beginPath();
        ctx.arc(a.p.x, a.p.y, a.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = a.c;
        ctx.lineWidth = 2.6;
        ctx.stroke();
        ctx.fillStyle = pal.ink;
        ctx.font = `800 20px ${CANVAS_FONT}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(a.sym, a.p.x, a.p.y + 1);
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = a.c;
        ctx.font = `800 16px ${CANVAS_FONT}`;
        ctx.fillText(a.d, a.p.x, a.p.y - a.r - 12);
      });

      posCenter = hPos;
      negCenter = clPos;
    }

    // Draw Charge Centers (Schwerpunkte δ⁺ and δ⁻)
    const dist = Math.hypot(posCenter.x - negCenter.x, posCenter.y - negCenter.y);
    if (dist < 6) {
      // Overlapping centers! Draw split red/blue target marker
      ctx.beginPath();
      ctx.arc(posCenter.x, posCenter.y + 34, 9, -Math.PI / 2, Math.PI / 2);
      ctx.fillStyle = pal.deltaMinus;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(posCenter.x, posCenter.y + 34, 9, Math.PI / 2, (3 * Math.PI) / 2);
      ctx.fillStyle = pal.deltaPlus;
      ctx.fill();
      ctx.strokeStyle = pal.ink;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(posCenter.x, posCenter.y + 34, 9, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      // Separated centers + Dipole vector
      ctx.strokeStyle = pal.primary;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(posCenter.x, posCenter.y);
      ctx.lineTo(negCenter.x, negCenter.y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = pal.deltaPlus;
      ctx.beginPath();
      ctx.arc(posCenter.x, posCenter.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = pal.deltaMinus;
      ctx.beginPath();
      ctx.arc(negCenter.x, negCenter.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.restore();

    // Legend & Result Banner at bottom of canvas
    ctx.fillStyle = pal.surface;
    drawRoundedRect(ctx, 14, h - 42, w - 28, 30, 8);
    ctx.fill();
    ctx.strokeStyle = info.isDipole ? pal.primary : pal.ok;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = `700 12.5px ${CANVAS_FONT}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = pal.deltaPlus;
    ctx.fillText("● Schwerpunkt δ⁺", 26, h - 27);
    ctx.fillStyle = pal.deltaMinus;
    ctx.fillText("● Schwerpunkt δ⁻", 150, h - 27);

    ctx.textAlign = "right";
    ctx.fillStyle = info.isDipole ? pal.primary : pal.ok;
    ctx.fillText(
      info.isDipole
        ? "Schwerpunkte getrennt → Dipol-Molekül!"
        : "Schwerpunkte fallen zusammen → kein Dipol!",
      w - 26,
      h - 27
    );
  }

  /* ------------------------------------------------------------------------
     7. MODELL 3: TEILCHEN-LUPE & SIEDE-SIMULATOR
     ------------------------------------------------------------------------ */
  const BOILING_SUBSTANCES = [
    { id: "so2", name: "Schwefeldioxid (SO₂)", bp: -10, ww: "Dipol-Dipol", colorKey: "primary" },
    { id: "h2o", name: "Wasser (H₂O)", bp: 100, ww: "H-Brücken", colorKey: "deltaMinus" }
  ];

  let m3RafId = null;

  function initModel3() {
    const subBtns = document.querySelectorAll("[data-m3-substance]");
    const rotSlider = document.getElementById("m3RotSlider");
    const snapBtn = document.getElementById("m3SnapBtn");
    const formalBtn = document.getElementById("m3FormalToggle");
    const tempSlider = document.getElementById("m3TempSlider");
    const lupeCanvas = document.getElementById("canvasModel3Lupe");

    // Seed boiling particles (8 particles per beaker)
    state.m3.particles = BOILING_SUBSTANCES.map(() =>
      Array.from({ length: 8 }, (_, i) => ({
        x: 0.16 + (i % 4) * 0.22,
        y: 0.63 + Math.floor(i / 4) * 0.16,
        vx: (Math.random() - 0.5) * 0.014,
        vy: (Math.random() - 0.5) * 0.014,
        phase: Math.random() * Math.PI * 2
      }))
    );

    function setSubstance(sub) {
      state.m3.substance = sub;
      subBtns.forEach((b) => b.classList.toggle("active", b.dataset.m3Substance === sub));
      formalBtn.hidden = sub !== "so2";
      snapOptimal();
    }

    function snapOptimal() {
      state.m3.mol2x = 368;
      state.m3.mol2y = 125;
      state.m3.mol2Rot = 0;
      rotSlider.value = "0";
      syncSliderVisual(rotSlider);
      document.getElementById("m3RotVal").textContent = "0°";
      drawModel3Lupe();
    }

    subBtns.forEach((btn) => {
      btn.addEventListener("click", () => setSubstance(btn.dataset.m3Substance));
    });

    rotSlider.addEventListener("input", () => {
      state.m3.mol2Rot = parseInt(rotSlider.value, 10);
      document.getElementById("m3RotVal").textContent = `${state.m3.mol2Rot}°`;
      rotSlider.setAttribute("aria-valuetext", `${state.m3.mol2Rot} Grad`);
      syncSliderVisual(rotSlider);
      drawModel3Lupe();
    });

    snapBtn.addEventListener("click", snapOptimal);

    formalBtn.addEventListener("click", () => {
      state.m3.showFormal = !state.m3.showFormal;
      formalBtn.setAttribute("aria-pressed", String(state.m3.showFormal));
      formalBtn.textContent = `Formalladungen (⊕/⊖): ${state.m3.showFormal ? "An" : "Aus"}`;
      drawModel3Lupe();
    });

    // Drag & Drop on Lupe Canvas (Pointer Events for mouse + iPad touch)
    function toLogicalCoords(evt) {
      const rect = lupeCanvas.getBoundingClientRect();
      return {
        x: ((evt.clientX - rect.left) / rect.width) * 660,
        y: ((evt.clientY - rect.top) / rect.height) * 250
      };
    }

    lupeCanvas.addEventListener("pointerdown", (e) => {
      const pt = toLogicalCoords(e);
      if (Math.hypot(pt.x - state.m3.mol2x, pt.y - state.m3.mol2y) <= 78) {
        state.m3.dragging = true;
        state.m3.dragOffsetX = state.m3.mol2x - pt.x;
        state.m3.dragOffsetY = state.m3.mol2y - pt.y;
        lupeCanvas.setPointerCapture(e.pointerId);
      }
    });

    lupeCanvas.addEventListener("pointermove", (e) => {
      if (!state.m3.dragging) return;
      const pt = toLogicalCoords(e);
      state.m3.mol2x = Math.max(265, Math.min(585, pt.x + state.m3.dragOffsetX));
      state.m3.mol2y = Math.max(58, Math.min(192, pt.y + state.m3.dragOffsetY));
      drawModel3Lupe();
    });

    lupeCanvas.addEventListener("pointerup", (e) => {
      state.m3.dragging = false;
      try { lupeCanvas.releasePointerCapture(e.pointerId); } catch (err) {}
    });

    tempSlider.addEventListener("input", () => {
      state.m3.tempC = parseInt(tempSlider.value, 10);
      syncSliderVisual(tempSlider);
      document.getElementById("m3TempVal").textContent = `${state.m3.tempC} °C`;
      document.getElementById("m3TempBadge").textContent = `T = ${state.m3.tempC} °C`;
      tempSlider.setAttribute("aria-valuetext", `${state.m3.tempC} Grad Celsius`);
      drawModel3Boil();
    });

    syncSliderVisual(rotSlider);
    syncSliderVisual(tempSlider);
    setSubstance("h2o");
    startBoilingAnimation();
  }

  function drawH2OMolecule(ctx, cx, cy, rotDeg, pal, labelSide = true) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((rotDeg * Math.PI) / 180);

    // Coordinates relative to O at (-18, 0): H1 at (26, -24), H2 at (26, 24)
    // Wait: let's orient H2O so H1 points right (+x) at rot=0 to make H-bond alignment natural!
    // Left H2O has O at (+16, 0) and H's to the left? Let's keep both identical orientation and place H1 pointing left for right molecule:
    // Actually: let's define O at (0, 0), H1 at (-44, 0), H2 at (18, 40) (approx 105°!)
    const o = { x: 0, y: 0 };
    const h1 = { x: -46, y: 0 };
    const h2 = { x: 13, y: 44 };

    // Bonds
    ctx.strokeStyle = pal.ink;
    ctx.lineWidth = 3;
    [h1, h2].forEach((h) => {
      ctx.beginPath();
      ctx.moveTo(o.x, o.y);
      ctx.lineTo(h.x, h.y);
      ctx.stroke();
    });

    // Two lone pairs on O (avoiding both O-H bond angles: π and ~1.28 rad)
    drawLonePairs(ctx, o.x, o.y, 19, 2, [Math.PI, Math.atan2(h2.y - o.y, h2.x - o.x)], pal.ink);

    // O atom
    ctx.fillStyle = pal.surface;
    ctx.beginPath();
    ctx.arc(o.x, o.y, 19, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = pal.deltaMinus;
    ctx.lineWidth = 2.4;
    ctx.stroke();
    ctx.fillStyle = pal.ink;
    ctx.font = `800 17px ${CANVAS_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("O", o.x, o.y + 1);

    // H atoms
    [h1, h2].forEach((h) => {
      ctx.fillStyle = pal.surface;
      ctx.beginPath();
      ctx.arc(h.x, h.y, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = pal.deltaPlus;
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.fillStyle = pal.ink;
      ctx.font = `700 14px ${CANVAS_FONT}`;
      ctx.fillText("H", h.x, h.y + 1);
    });

    if (labelSide) {
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = pal.deltaMinus;
      ctx.font = `800 14px ${CANVAS_FONT}`;
      ctx.fillText("δ⁻", o.x + 12, o.y - 25);
      ctx.fillStyle = pal.deltaPlus;
      ctx.fillText("δ⁺", h1.x, h1.y - 19);
      ctx.fillText("δ⁺", h2.x + 22, h2.y + 6);
    }

    ctx.restore();

    // Return world positions of key interaction sites (O lone pair side and H1)
    const rad = (rotDeg * Math.PI) / 180;
    const rotPt = (p) => ({
      x: cx + p.x * Math.cos(rad) - p.y * Math.sin(rad),
      y: cy + p.x * Math.sin(rad) + p.y * Math.cos(rad)
    });
    return {
      o: rotPt(o),
      lpRight: rotPt({ x: 26, y: 0 }),
      h1: rotPt(h1),
      h2: rotPt(h2)
    };
  }

  function drawSO2Molecule(ctx, cx, cy, rotDeg, pal, showFormal) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((rotDeg * Math.PI) / 180);

    // S at (0, -8), O1 (=O) at (-42, 24), O2 (-O) at (42, 24) -> bent ~119°
    const s = { x: 0, y: -12 };
    const o1 = { x: -42, y: 24 };
    const o2 = { x: 42, y: 24 };

    // Double bond S=O1
    const dx1 = o1.x - s.x, dy1 = o1.y - s.y;
    const len1 = Math.hypot(dx1, dy1);
    const nx1 = -dy1 / len1, ny1 = dx1 / len1;
    ctx.strokeStyle = pal.ink;
    ctx.lineWidth = 2.8;
    for (const off of [-3.5, 3.5]) {
      ctx.beginPath();
      ctx.moveTo(s.x + nx1 * off, s.y + ny1 * off);
      ctx.lineTo(o1.x + nx1 * off, o1.y + ny1 * off);
      ctx.stroke();
    }

    // Single bond S-O2
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(o2.x, o2.y);
    ctx.stroke();

    // Lone pairs matching 10B_Chemie.pdf: 1 on S (top), 2 on O1, 3 on O2
    drawLonePairs(ctx, s.x, s.y, 18, 1, [Math.atan2(o1.y - s.y, o1.x - s.x), Math.atan2(o2.y - s.y, o2.x - s.x), 0, Math.PI], pal.ink);
    drawLonePairs(ctx, o1.x, o1.y, 17, 2, [Math.atan2(s.y - o1.y, s.x - o1.x), 0], pal.ink);
    drawLonePairs(ctx, o2.x, o2.y, 17, 3, [Math.atan2(s.y - o2.y, s.x - o2.x)], pal.ink);

    // Draw atoms
    [
      { p: s, sym: "S", r: 18, c: pal.deltaPlus },
      { p: o1, sym: "O", r: 17, c: pal.deltaMinus },
      { p: o2, sym: "O", r: 17, c: pal.deltaMinus }
    ].forEach((a) => {
      ctx.fillStyle = pal.surface;
      ctx.beginPath();
      ctx.arc(a.p.x, a.p.y, a.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = a.c;
      ctx.lineWidth = 2.4;
      ctx.stroke();
      ctx.fillStyle = pal.ink;
      ctx.font = `800 17px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(a.sym, a.p.x, a.p.y + 1);
    });

    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = pal.deltaPlus;
    ctx.font = `800 14px ${CANVAS_FONT}`;
    ctx.fillText("δ⁺", s.x + 26, s.y - 12);
    ctx.fillStyle = pal.deltaMinus;
    ctx.fillText("δ⁻", o1.x - 24, o1.y + 28);
    ctx.fillText("δ⁻", o2.x + 24, o2.y + 28);

    if (showFormal) {
      ctx.font = `700 15px ${CANVAS_FONT}`;
      ctx.fillStyle = pal.muted;
      ctx.fillText("⊕", s.x - 25, s.y - 14);
      ctx.fillText("⊖", o2.x + 26, o2.y - 14);
    }

    ctx.restore();

    const rad = (rotDeg * Math.PI) / 180;
    const rotPt = (p) => ({
      x: cx + p.x * Math.cos(rad) - p.y * Math.sin(rad),
      y: cy + p.x * Math.sin(rad) + p.y * Math.cos(rad)
    });
    return { s: rotPt(s), oMid: rotPt({ x: 0, y: 28 }) };
  }

  function drawModel3Lupe() {
    const canvas = document.getElementById("canvasModel3Lupe");
    if (!canvas) return;
    const { ctx, w, h } = setupHiDPICanvas(canvas);
    const pal = getPalette();

    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, w, h);

    const sub = state.m3.substance === "so2" ? "so2" : "h2o";
    const leftX = 205;
    const leftY = 125;
    const rightX = state.m3.mol2x;
    const rightY = state.m3.mol2y;

    let interactionKind = "none";
    let strengthPct = 0;

    if (sub === "h2o") {
      const p1 = drawH2OMolecule(ctx, leftX, leftY, 0, pal, true);
      const p2 = drawH2OMolecule(ctx, rightX, rightY, state.m3.mol2Rot, pal, true);

      const dHO = Math.hypot(p2.h1.x - p1.lpRight.x, p2.h1.y - p1.lpRight.y);
      const dH2O = Math.hypot(p2.h2.x - p1.lpRight.x, p2.h2.y - p1.lpRight.y);
      const bestH = dHO <= dH2O ? p2.h1 : p2.h2;
      const minD = Math.min(dHO, dH2O);
      const dOO = Math.hypot(p2.o.x - p1.o.x, p2.o.y - p1.o.y);

      if (dOO < 185 && dOO < minD + 22) {
        interactionKind = "repel";
        strengthPct = 0;
        drawRepulsion(ctx, p1.o, p2.o, pal);
      } else if (minD < 165) {
        interactionKind = "hbond";
        strengthPct = Math.max(25, Math.min(100, Math.round(100 - (minD - 50) * 0.65)));
        drawInteractionLine(ctx, p1.lpRight, bestH, pal.deltaMinus, "H-Brücke (stark)", 4);
      }
    } else {
      // SO2
      const p1 = drawSO2Molecule(ctx, leftX, leftY, -90, pal, state.m3.showFormal);
      const p2 = drawSO2Molecule(ctx, rightX, rightY, -90 + state.m3.mol2Rot, pal, state.m3.showFormal);

      const dOpS = Math.hypot(p1.oMid.x - p2.s.x, p1.oMid.y - p2.s.y);
      const dSpO = Math.hypot(p1.s.x - p2.oMid.x, p1.s.y - p2.oMid.y);
      const bestDist = Math.min(dOpS, dSpO);
      const ptA = dOpS <= dSpO ? p1.oMid : p1.s;
      const ptB = dOpS <= dSpO ? p2.s : p2.oMid;

      const dOO = Math.hypot(p1.oMid.x - p2.oMid.x, p1.oMid.y - p2.oMid.y);
      if (dOO < 115 && dOO < bestDist) {
        interactionKind = "repel";
        drawRepulsion(ctx, p1.oMid, p2.oMid, pal);
      } else if (bestDist < 180) {
        interactionKind = "dipole";
        strengthPct = Math.max(20, Math.min(62, Math.round(65 - (bestDist - 90) * 0.4)));
        drawInteractionLine(ctx, ptA, ptB, pal.warn, "Dipol-Dipol-WW (mittel)", 3);
      }
    }

    // Drag hint on right molecule
    ctx.fillStyle = pal.muted;
    ctx.font = `600 11px ${CANVAS_FONT}`;
    ctx.textAlign = "center";
    ctx.fillText("⇄ zieh- & drehbar", rightX, rightY + 68);

    // Left Strength Meter
    const meterX = 20, meterY = 26, meterW = 24, meterH = h - 52;
    drawRoundedRect(ctx, meterX, meterY, meterW, meterH, 8);
    ctx.fillStyle = pal.surface;
    ctx.fill();
    ctx.strokeStyle = pal.border;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (strengthPct > 0) {
      const fillH = ((meterH - 6) * strengthPct) / 100;
      drawRoundedRect(ctx, meterX + 3, meterY + meterH - 3 - fillH, meterW - 6, fillH, 5);
      ctx.fillStyle = sub === "h2o" ? pal.deltaMinus : pal.warn;
      ctx.fill();
    }

    ctx.save();
    ctx.translate(meterX + 36, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = pal.ink;
    ctx.font = `700 11.5px ${CANVAS_FONT}`;
    ctx.textAlign = "center";
    ctx.fillText("Anziehungskraft", 0, 0);
    ctx.restore();

    // Update badge & caption
    const badge = document.getElementById("m3StrengthBadge");
    const caption = document.getElementById("m3LupeCaption");
    badge.classList.remove("ok", "warn");
    if (interactionKind === "repel") {
      badge.textContent = "Abstoßung (gleiche Teilladung)!";
      badge.classList.add("warn");
      caption.textContent = "Gleichnamige Pole (δ⁻ an δ⁻ oder δ⁺ an δ⁺) stoßen sich ab — drehe das rechte Molekül!";
    } else if (interactionKind === "hbond") {
      badge.textContent = "H-Brücke aktiv · sehr stark";
      caption.textContent = "Wasser (100 °C): δ⁺-H-Atom richtet sich direkt auf das freie Elektronenpaar am O (δ⁻) → starke H-Brücke!";
    } else if (interactionKind === "dipole") {
      badge.textContent = "Dipol-Dipol-WW aktiv · mittelstark";
      caption.textContent = "Schwefeldioxid (−10 °C): Permanente Dipole ziehen sich über δ⁺ und δ⁻ an (Tafelbild zeigt auch Formalladungen ⊕/⊖).";
    } else {
      badge.textContent = "Abstand zu groß";
      caption.textContent = "Ziehe das rechte Molekül näher an das linke heran, um die zwischenmolekulare Wechselwirkung zu beobachten.";
    }
  }

  function drawInteractionLine(ctx, p1, p2, color, label, width) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.setLineDash([]);

    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2 - 14;
    ctx.fillStyle = color;
    ctx.font = `800 12px ${CANVAS_FONT}`;
    ctx.textAlign = "center";
    ctx.fillText(label, mx, my);
    ctx.restore();
  }

  function drawRepulsion(ctx, p1, p2, pal) {
    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2;
    ctx.save();
    ctx.fillStyle = pal.bad;
    ctx.font = `800 13px ${CANVAS_FONT}`;
    ctx.textAlign = "center";
    ctx.fillText("⚡ Abstoßung!", mx, my - 28);
    ctx.restore();
  }

  function startBoilingAnimation() {
    if (m3RafId) cancelAnimationFrame(m3RafId);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function tick() {
      if (state.activeStep === "step3" && !reduced) {
        const T = state.m3.tempC;
        BOILING_SUBSTANCES.forEach((sub, idx) => {
          const boiling = T >= sub.bp;
          const speedScale = boiling ? 1.8 : 0.45;
          state.m3.particles[idx].forEach((p) => {
            p.x += p.vx * speedScale;
            p.y += p.vy * speedScale;
            if (p.x < 0.16 || p.x > 0.84) p.vx *= -1;
            if (boiling) {
              if (p.y < 0.14 || p.y > 0.88) p.vy *= -1;
            } else {
              if (p.y < 0.56 || p.y > 0.88) p.vy *= -1;
            }
          });
        });
        drawModel3Boil();
      }
      if (!reduced) {
        m3RafId = requestAnimationFrame(tick);
      }
    }

    drawModel3Boil();
    if (!reduced) {
      m3RafId = requestAnimationFrame(tick);
    }
  }

  function drawModel3Boil() {
    const canvas = document.getElementById("canvasModel3Boil");
    if (!canvas) return;
    const { ctx, w, h } = setupHiDPICanvas(canvas);
    const pal = getPalette();

    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, w, h);

    const T = state.m3.tempC;
    const boxW = 264;
    const gap = 36;
    const startX = (w - (boxW * BOILING_SUBSTANCES.length + gap * (BOILING_SUBSTANCES.length - 1))) / 2;

    BOILING_SUBSTANCES.forEach((sub, idx) => {
      const bx = startX + idx * (boxW + gap);
      const by = 26;
      const bh = 136;
      const boiling = T >= sub.bp;

      // Beaker outline
      ctx.fillStyle = pal.surface;
      drawRoundedRect(ctx, bx, by, boxW, bh, 8);
      ctx.fill();
      ctx.strokeStyle = boiling ? pal.bad : pal.border;
      ctx.lineWidth = boiling ? 2.2 : 1.5;
      ctx.stroke();

      // Liquid body if not boiling
      if (!boiling) {
        ctx.fillStyle = pal.dark ? "rgba(56, 189, 248, 0.14)" : "rgba(2, 132, 199, 0.10)";
        ctx.fillRect(bx + 2, by + bh * 0.48, boxW - 4, bh * 0.50);
      }

      // WW lines between close liquid particles
      const pts = (state.m3.particles[idx] || []).map((p) => ({
        x: bx + p.x * boxW,
        y: by + p.y * bh
      }));

      if (!boiling) {
        ctx.save();
        ctx.strokeStyle = pal[sub.colorKey];
        ctx.setLineDash([2, 3]);
        ctx.lineWidth = 1.6;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            if (Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y) < 58) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      }

      // Draw particles
      pts.forEach((pt) => {
        ctx.fillStyle = pal[sub.colorKey];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = pal.surface;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });

      // Labels
      ctx.fillStyle = pal.ink;
      ctx.font = `700 12.5px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.fillText(`${sub.name} · Sdp. ${sub.bp} °C`, bx + boxW / 2, 17);

      ctx.font = `700 11.5px ${CANVAS_FONT}`;
      ctx.fillStyle = boiling ? pal.bad : pal.ok;
      ctx.fillText(
        boiling ? `Gasförmig (${sub.ww} überwunden)` : `Flüssig (${sub.ww} halten)`,
        bx + boxW / 2,
        by + bh + 18
      );
    });
  }

  /* ------------------------------------------------------------------------
     8. MODELL 4: HYDRAT-HÜLLEN-BAUKASTEN & LÖSUNGSVERHALTEN
     ------------------------------------------------------------------------ */
  // Ideal angle of H-dipole vector (pointing from O toward H-pair midpoint)
  // For Na+ (ion at left, cx=185, cy=155), O (δ⁻) must point INWARD, so H-midpoint points OUTWARD (same angle as from ion to water!)
  // For Cl- (ion at right, cx=475, cy=155), H (δ⁺) must point INWARD, so H-midpoint points INWARD (opposite angle from ion to water!)
  const HYDRAT_SLOTS = [
    // Around Na+ (indices 0..3)
    { ion: "Na+", ix: 185, iy: 155, dx: 0, dy: -84, idealOutward: 270 },
    { ion: "Na+", ix: 185, iy: 155, dx: 84, dy: 0, idealOutward: 0 },
    { ion: "Na+", ix: 185, iy: 155, dx: 0, dy: 84, idealOutward: 90 },
    { ion: "Na+", ix: 185, iy: 155, dx: -84, dy: 0, idealOutward: 180 },
    // Around Cl- (indices 4..7)
    { ion: "Cl-", ix: 475, iy: 155, dx: 0, dy: -84, idealOutward: 90 },
    { ion: "Cl-", ix: 475, iy: 155, dx: 84, dy: 0, idealOutward: 180 },
    { ion: "Cl-", ix: 475, iy: 155, dx: 0, dy: 84, idealOutward: 270 },
    { ion: "Cl-", ix: 475, iy: 155, dx: -84, dy: 0, idealOutward: 0 }
  ];

  function initModel4() {
    const modeBtns = document.querySelectorAll("[data-m4-mode]");
    const phaseBtns = document.querySelectorAll("[data-m4-phase]");
    const mixBtns = document.querySelectorAll("[data-m4-mix]");
    const autoBtn = document.getElementById("m4AutoSolveBtn");
    const scrambleBtn = document.getElementById("m4ScrambleBtn");
    const canvas = document.getElementById("canvasModel4");

    function setMode(mode) {
      state.m4.mode = mode;
      modeBtns.forEach((b) => b.classList.toggle("active", b.dataset.m4Mode === mode));
      document.getElementById("m4ControlsBuilder").hidden = mode !== "builder";
      document.getElementById("m4ControlsPhases").hidden = mode !== "phases";
      document.getElementById("m4ControlsMix").hidden = mode !== "mix";
      drawModel4();
    }

    modeBtns.forEach((b) => b.addEventListener("click", () => setMode(b.dataset.m4Mode)));

    phaseBtns.forEach((b) => {
      b.addEventListener("click", () => {
        state.m4.phase = parseInt(b.dataset.m4Phase, 10);
        phaseBtns.forEach((x) => x.classList.toggle("active", x === b));
        drawModel4();
      });
    });

    mixBtns.forEach((b) => {
      b.addEventListener("click", () => {
        state.m4.mix = b.dataset.m4Mix;
        mixBtns.forEach((x) => x.classList.toggle("active", x === b));
        drawModel4();
      });
    });

    autoBtn.addEventListener("click", () => {
      state.m4.builderAngles = HYDRAT_SLOTS.map((s) => s.idealOutward);
      drawModel4();
    });

    scrambleBtn.addEventListener("click", () => {
      state.m4.builderAngles = HYDRAT_SLOTS.map((s) => (s.idealOutward + 90 * (1 + Math.floor(Math.random() * 3))) % 360);
      drawModel4();
    });

    canvas.addEventListener("click", (e) => {
      if (state.m4.mode !== "builder") return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 660;
      const y = ((e.clientY - rect.top) / rect.height) * 310;

      HYDRAT_SLOTS.forEach((slot, idx) => {
        const wx = slot.ix + slot.dx;
        const wy = slot.iy + slot.dy;
        if (Math.hypot(x - wx, y - wy) <= 38) {
          state.m4.builderAngles[idx] = (state.m4.builderAngles[idx] + 90) % 360;
          drawModel4();
        }
      });
    });
  }

  function drawDipoleWater(ctx, cx, cy, angleDeg, pal, scale = 1) {
    // At angleDeg = 0: O is at (-6*scale, 0), two H's point toward +x (at +14, ±13)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((angleDeg * Math.PI) / 180);
    ctx.scale(scale, scale);

    ctx.strokeStyle = pal.ink;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(14, -12);
    ctx.moveTo(-6, 0);
    ctx.lineTo(14, 12);
    ctx.stroke();

    // O atom (δ⁻)
    ctx.fillStyle = pal.deltaMinus;
    ctx.beginPath();
    ctx.arc(-6, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = pal.surface;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = `800 11px ${CANVAS_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("O", -6, 0.5);

    // H atoms (δ⁺)
    [
      { x: 14, y: -12 },
      { x: 14, y: 12 }
    ].forEach((h) => {
      ctx.fillStyle = pal.deltaPlus;
      ctx.beginPath();
      ctx.arc(h.x, h.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = pal.surface;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.font = `700 9px ${CANVAS_FONT}`;
      ctx.fillText("H", h.x, h.y + 0.5);
    });

    ctx.restore();
  }

  function drawIon(ctx, x, y, label, isPositive, pal, r = 27) {
    ctx.fillStyle = isPositive ? pal.deltaPlus : pal.deltaMinus;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = pal.surface;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = `800 17px ${CANVAS_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x, y + 1);
  }

  function drawModel4() {
    const canvas = document.getElementById("canvasModel4");
    if (!canvas) return;
    const { ctx, w, h } = setupHiDPICanvas(canvas);
    const pal = getPalette();

    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, w, h);

    const badge = document.getElementById("m4StatusBadge");
    const caption = document.getElementById("m4Caption");
    badge.classList.remove("ok", "warn");

    if (state.m4.mode === "builder") {
      // Draw Na+ and Cl- with 4 H2O slots each
      let correctCount = 0;
      drawIon(ctx, 185, 155, "Na⁺", true, pal);
      drawIon(ctx, 475, 155, "Cl⁻", false, pal);

      HYDRAT_SLOTS.forEach((slot, idx) => {
        const wx = slot.ix + slot.dx;
        const wy = slot.iy + slot.dy;
        const ang = state.m4.builderAngles[idx];
        const isCorrect = ang === slot.idealOutward;
        if (isCorrect) correctCount++;

        // Dotted attraction if correct, red warning ring if wrong
        ctx.save();
        if (isCorrect) {
          ctx.strokeStyle = pal.ok;
          ctx.lineWidth = 2.4;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(slot.ix, slot.iy);
          ctx.lineTo(wx, wy);
          ctx.stroke();
        } else {
          ctx.strokeStyle = pal.bad;
          ctx.lineWidth = 1.6;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.arc(wx, wy, 28, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        drawDipoleWater(ctx, wx, wy, ang, pal, 0.95);

        // Status glyph next to slot
        ctx.font = `800 13px ${CANVAS_FONT}`;
        ctx.fillStyle = isCorrect ? pal.ok : pal.bad;
        ctx.textAlign = "center";
        ctx.fillText(isCorrect ? "✓" : "↻", wx + 28, wy - 18);
      });

      // Redraw ions on top of dotted lines
      drawIon(ctx, 185, 155, "Na⁺", true, pal);
      drawIon(ctx, 475, 155, "Cl⁻", false, pal);

      // Legend
      ctx.font = `700 12px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.fillStyle = pal.deltaMinus;
      ctx.fillText("Roter Kreis = δ⁺ (H) · Blauer Kreis = δ⁻ (O)", w / 2, 22);

      badge.textContent = `${correctCount} / 8 H₂O-Dipole ausgerichtet`;
      if (correctCount === 8) {
        badge.classList.add("ok");
        caption.textContent = "Perfekt! Um Na⁺ zeigen alle O-Pole (δ⁻) nach innen, um Cl⁻ alle H-Pole (δ⁺) → vollständige Hydrat-Hülle!";
      } else {
        caption.textContent = "Klicke auf die mit ↻ markierten H₂O-Moleküle, bis der passende Teilpol nach innen zum Ion zeigt.";
      }
    } else if (state.m4.mode === "phases") {
      const p = state.m4.phase;
      badge.textContent = `Phase ${p + 1} von 3`;

      if (p === 0) {
        // Phase 1: Compact NaCl lattice (3x3)
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const isNa = (r + c) % 2 === 0;
            drawIon(ctx, 255 + c * 75, 85 + r * 70, isNa ? "Na⁺" : "Cl⁻", isNa, pal, 28);
          }
        }
        caption.textContent = "Phase 1 (Lupe): Festes Natriumchlorid-Ionengitter. Na⁺- und Cl⁻-Ionen halten durch starke Ionenbindungen zusammen.";
      } else if (p === 1) {
        // Phase 2: Lattice + H2O attacking edges
        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 2; c++) {
            const isNa = (r + c) % 2 === 0;
            drawIon(ctx, 285 + c * 75, 120 + r * 70, isNa ? "Na⁺" : "Cl⁻", isNa, pal, 26);
          }
        }
        drawDipoleWater(ctx, 185, 120, 180, pal, 1); // O inward to Na+
        drawDipoleWater(ctx, 185, 190, 0, pal, 1);   // H inward to Cl-
        drawDipoleWater(ctx, 465, 120, 180, pal, 1); // H inward to Cl-
        drawDipoleWater(ctx, 465, 190, 0, pal, 1);   // O inward to Na+
        caption.textContent = "Phase 2: Polare Wassermoleküle (H₂O-Dipole) lagern sich mit dem entgegengesetzten Teilpol an die Rand-Ionen des Gitters an.";
      } else {
        // Phase 3: Dissolved hydrated ions
        drawIon(ctx, 190, 155, "Na⁺", true, pal);
        drawIon(ctx, 470, 155, "Cl⁻", false, pal);
        HYDRAT_SLOTS.forEach((slot) => {
          const wx = slot.ix + slot.dx;
          const wy = slot.iy + slot.dy;
          ctx.save();
          ctx.strokeStyle = pal.ok;
          ctx.setLineDash([4, 4]);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(slot.ix, slot.iy);
          ctx.lineTo(wx, wy);
          ctx.stroke();
          ctx.restore();
          drawDipoleWater(ctx, wx, wy, slot.idealOutward, pal, 0.95);
        });
        drawIon(ctx, 190, 155, "Na⁺", true, pal);
        drawIon(ctx, 470, 155, "Cl⁻", false, pal);
        badge.classList.add("ok");
        caption.textContent = "Phase 3 (Lupe): Jedes Ion ist von einer stabilen Hydrat-Hülle umgeben → Das Salz löst sich auf (Stoffebene)!";
      }
    } else {
      // Mode 3: Hydrophil vs Hydrophob Beaker + Lupe
      const mix = state.m4.mix;
      const isSoluble = mix !== "ch4";
      badge.textContent = isSoluble ? "Löst sich (hydrophil)" : "Nicht mischbar (hydrophob)";
      badge.classList.add(isSoluble ? "ok" : "warn");

      // Left: Macroscopic Beaker (👁️ Stoffebene)
      ctx.fillStyle = pal.ink;
      ctx.font = `700 13px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.fillText("👁️ Stoffebene (Becherglas)", 160, 28);

      ctx.fillStyle = pal.surface;
      drawRoundedRect(ctx, 75, 48, 170, 215, 10);
      ctx.fill();
      ctx.strokeStyle = pal.border;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Water fill
      ctx.fillStyle = pal.dark ? "rgba(56, 189, 248, 0.24)" : "rgba(56, 189, 248, 0.28)";
      ctx.fillRect(78, 95, 164, 165);

      if (mix === "ch4") {
        // Phase separation layer on top!
        ctx.fillStyle = pal.dark ? "rgba(251, 191, 36, 0.40)" : "rgba(245, 158, 11, 0.45)";
        ctx.fillRect(78, 66, 164, 29);
        ctx.fillStyle = pal.ink;
        ctx.font = `700 11px ${CANVAS_FONT}`;
        ctx.fillText("Unpolare Phase / Gas", 160, 84);
        ctx.fillText("Wasser (unten)", 160, 185);
      } else {
        ctx.fillStyle = pal.ink;
        ctx.font = `700 12px ${CANVAS_FONT}`;
        ctx.fillText("Klare, homogene Lösung", 160, 178);
      }

      // Right: Magnifying glass (🔍 Teilchenebene)
      ctx.fillStyle = pal.ink;
      ctx.font = `700 13px ${CANVAS_FONT}`;
      ctx.fillText("🔍 Teilchenebene (Lupe)", 465, 28);

      ctx.beginPath();
      ctx.arc(465, 162, 112, 0, Math.PI * 2);
      ctx.fillStyle = pal.surface;
      ctx.fill();
      ctx.strokeStyle = pal.primary;
      ctx.lineWidth = 3;
      ctx.stroke();

      if (mix === "nacl") {
        drawIon(ctx, 465, 162, "Na⁺", true, pal, 24);
        drawDipoleWater(ctx, 465, 92, 270, pal, 0.85);
        drawDipoleWater(ctx, 535, 162, 0, pal, 0.85);
        drawDipoleWater(ctx, 465, 232, 90, pal, 0.85);
        drawDipoleWater(ctx, 395, 162, 180, pal, 0.85);
        caption.textContent = "Salz (NaCl) + Wasser: Polare H₂O-Dipole bilden Hydrat-Hüllen um Na⁺ und Cl⁻ → Salz löst sich vollständig.";
      } else if (mix === "hcl") {
        // Polar HCl molecule interacting with H2O dipoles
        ctx.fillStyle = pal.deltaPlus;
        ctx.beginPath(); ctx.arc(445, 162, 14, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = pal.deltaMinus;
        ctx.beginPath(); ctx.arc(485, 162, 19, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = `800 13px ${CANVAS_FONT}`;
        ctx.fillText("H", 445, 166);
        ctx.fillText("Cl", 485, 166);
        drawDipoleWater(ctx, 390, 162, 180, pal, 0.85);
        drawDipoleWater(ctx, 540, 162, 180, pal, 0.85);
        caption.textContent = "HCl (polar, hydrophil) + Wasser: Ähnliches löst sich in Ähnlichem — polare Moleküle ziehen H₂O-Dipole an.";
      } else {
        // Unpolar CH4 pushed out from H2O network
        drawDipoleWater(ctx, 425, 195, 30, pal, 0.8);
        drawDipoleWater(ctx, 495, 200, 150, pal, 0.8);
        drawDipoleWater(ctx, 460, 160, 270, pal, 0.8);
        ctx.strokeStyle = pal.deltaMinus;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(425, 195); ctx.lineTo(460, 160); ctx.lineTo(495, 200);
        ctx.stroke();
        ctx.setLineDash([]);

        // Unpolar CH4 sphere
        ctx.fillStyle = pal.warn;
        ctx.beginPath(); ctx.arc(465, 92, 20, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = `800 12px ${CANVAS_FONT}`;
        ctx.fillText("CH₄", 465, 96);
        caption.textContent = "Methan / Öl (unpolar, hydrophob): Die H₂O-Dipole ziehen sich über H-Brücken gegenseitig an und drängen unpolare Teilchen heraus.";
      }
    }
  }

  /* ------------------------------------------------------------------------
     9. MINI-CHECKS & GESAMT-CHECK (QUIZ ENGINE)
     ------------------------------------------------------------------------ */
  function renderAllQuizzes() {
    Object.keys(QUIZZES).forEach((stepKey) => {
      const container = document.getElementById(`quiz-${stepKey}`);
      if (!container) return;
      container.innerHTML = "";

      QUIZZES[stepKey].forEach((item) => {
        const card = document.createElement("div");
        card.className = "quiz-card";

        const qEl = document.createElement("p");
        qEl.className = "quiz-q";
        qEl.textContent = item.question;
        card.appendChild(qEl);

        const optsDiv = document.createElement("div");
        optsDiv.className = "quiz-options";

        const fbDiv = document.createElement("div");
        fbDiv.className = "quiz-feedback";
        fbDiv.hidden = true;

        function applyAnswerState(chosenIdx) {
          const buttons = optsDiv.querySelectorAll("button");
          buttons.forEach((b, idx) => {
            b.classList.remove("is-correct", "is-wrong");
            if (idx === chosenIdx) {
              b.classList.add(idx === item.correct ? "is-correct" : "is-wrong");
            }
          });
          const isOk = chosenIdx === item.correct;
          fbDiv.hidden = false;
          fbDiv.className = `quiz-feedback ${isOk ? "ok" : "bad"}`;
          fbDiv.textContent = `${isOk ? "✓ Richtig! " : "✗ Noch nicht ganz: "}${item.explanation}`;
        }

        item.options.forEach((optText, idx) => {
          const optBtn = document.createElement("button");
          optBtn.type = "button";
          optBtn.className = "quiz-opt-btn";
          optBtn.textContent = `${String.fromCharCode(65 + idx)}) ${optText}`;
          optBtn.addEventListener("click", () => {
            state.answers[item.id] = idx;
            saveProgress();
            applyAnswerState(idx);
            updateProgressUI();
          });
          optsDiv.appendChild(optBtn);
        });

        card.appendChild(optsDiv);
        card.appendChild(fbDiv);

        if (Object.hasOwn(state.answers, item.id)) {
          applyAnswerState(state.answers[item.id]);
        }

        container.appendChild(card);
      });
    });

    updateProgressUI();
  }

  function updateProgressUI() {
    let totalCorrect = 0;
    let totalQuestions = 0;

    Object.entries(QUIZZES).forEach(([stepKey, items]) => {
      let stepCorrect = 0;
      items.forEach((item) => {
        totalQuestions++;
        if (state.answers[item.id] === item.correct) {
          stepCorrect++;
          totalCorrect++;
        }
      });
      const badge = document.getElementById(`badge-${stepKey}`);
      if (badge) {
        badge.textContent = `${stepCorrect}/${items.length}`;
        badge.classList.toggle("done", stepCorrect === items.length);
      }
    });

    const textEl = document.getElementById("globalProgressText");
    const barEl = document.getElementById("globalProgressBar");
    const printScoreEl = document.getElementById("printScore");

    if (textEl) textEl.textContent = `${totalCorrect} / ${totalQuestions} Checks`;
    if (barEl) {
      barEl.max = totalQuestions;
      barEl.value = totalCorrect;
    }
    if (printScoreEl) printScoreEl.textContent = `${totalCorrect} / ${totalQuestions}`;
  }

  /* ------------------------------------------------------------------------
     10. DRUCK, RESET & INITIALISIERUNG
     ------------------------------------------------------------------------ */
  function initGlobalActions() {
    const printBtn = document.getElementById("printSummaryBtn");
    const printBtnInner = document.getElementById("printSummaryBtnInner");
    const resetBtn = document.getElementById("resetProgressBtn");
    const printDateEl = document.getElementById("printDate");

    function updatePrintDate() {
      const now = new Date();
      if (printDateEl) {
        printDateEl.textContent = now.toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
      }
    }

    function triggerPrint() {
      updatePrintDate();
      window.print();
    }

    window.addEventListener("beforeprint", updatePrintDate);
    if (printBtn) printBtn.addEventListener("click", triggerPrint);
    if (printBtnInner) printBtnInner.addEventListener("click", triggerPrint);

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.answers = {};
        saveProgress();
        renderAllQuizzes();
      });
    }
  }

  function redrawAllCanvases() {
    drawModel1();
    drawModel2();
    drawModel3Lupe();
    drawModel3Boil();
    drawModel4();
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
    initModel1();
    initModel2();
    initModel3();
    initModel4();
    initThemeToggle();
    initTabs();
    renderAllQuizzes();
    initGlobalActions();
    redrawAllCanvases();
  });
})();
