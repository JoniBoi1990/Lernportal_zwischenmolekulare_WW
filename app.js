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
        question: "1. Welche beiden Bedingungen sind für die Ausbildung einer Wasserstoffbrücke zwischen zwei Molekülen nötig?",
        options: [
          "Ein H-Atom (δ⁺) an F, O oder N UND ein freies Elektronenpaar an F, O oder N des Nachbarmoleküls",
          "Zwei unpolare C–H-Bindungen und hohe Temperatur",
          "Mindestens zwei Na⁺-Ionen im Ionengitter"
        ],
        correct: 0,
        explanation: "Nur an die stark elektronegativen Atome F, O oder N gebundene H-Atome sind stark genug positiv teilgeladen (δ⁺), um mit einem freien Elektronenpaar (δ⁻) eine Wasserstoffbrücke zu bilden."
      },
      {
        id: "s3q2",
        question: "2. Wie unterscheiden sich Dipol-Dipol-WW (z. B. bei SO₂) von Wasserstoffbrücken (z. B. bei H₂O)?",
        options: [
          "H-Brücken sind eine besonders starke Sonderform zwischenmolekularer WW; reine Dipol-Dipol-WW sind mittelstark",
          "Bei Dipol-Dipol-WW ziehen sich nur gleichnamige Teilladungen (δ⁺ und δ⁺) an",
          "Dipol-Dipol-WW wirken nur zwischen unpolaren Alkan-Molekülen"
        ],
        correct: 0,
        explanation: "Beide Kräfte entstehen zwischen entgegengesetzten Teilpolen (δ⁺ ··· δ⁻) permanenter Dipole, aber H-Brücken sind deutlich stärker."
      }
    ],
    step4: [
      {
        id: "s4q1",
        question: "1. Wie entsteht zwischen zwei unpolaren Teilchen (z. B. Pentan-Molekülen) eine London-Wechselwirkung?",
        options: [
          "Durch spontane Elektronenverschiebung bildet sich ein temporärer Dipol, der im Nachbarteilchen einen weiteren temporären Dipol induziert",
          "Durch den Austausch von Protonen aus dem Atomkern",
          "Unpolare Moleküle besitzen dauerhafte H-Brücken"
        ],
        correct: 0,
        explanation: "Elektronen bewegen sich ständig. Bei einer spontanen Verschiebung entsteht ein temporärer Dipol (δ⁺/δ⁻). Sein δ⁻-Pol schiebt Elektronen im Nachbarn weg (Induktion) → kurzzeitige Anziehung (London-WW)."
      },
      {
        id: "s4q2",
        question: "2. Wovon hängt die Stärke der London-Wechselwirkungen bei linearen Kohlenwasserstoffen vor allem ab?",
        options: [
          "Von der Kettenlänge bzw. der Größe der Moleküloberfläche (Kontaktfläche)",
          "Ausschließlich vom Bindungswinkel im H₂O-Molekül",
          "London-WW sind bei allen Molekülen unabhängig von der Größe exakt gleich stark"
        ],
        correct: 0,
        explanation: "Je länger die Kohlenstoffkette, desto größer ist die Moleküloberfläche (Kontaktfläche) zwischen den Molekülen → desto stärker werden die London-WW."
      }
    ],
    step5: [
      {
        id: "s5q1",
        question: "1. Vergleiche Methan (CH₄, −162 °C), Schwefeldioxid (SO₂, −10 °C) und Wasser (H₂O, +100 °C). Warum siedet H₂O am höchsten?",
        options: [
          "Zwischen H₂O-Molekülen wirken sehr starke Wasserstoffbrücken, bei SO₂ mittelstarke Dipol-Dipol-WW und bei kleinem CH₄ nur schwache London-WW",
          "Weil beim Sieden von Wasser zuerst alle O–H-Atombindungen zerbrechen",
          "Weil CH₄ stärkere H-Brücken als Wasser besitzt"
        ],
        correct: 0,
        explanation: "Höhere WW erfordern mehr Wärmeenergie zum Trennen der Moleküle. Zudem brechen beim Sieden keine Atombindungen im Molekül!"
      },
      {
        id: "s5q2",
        question: "2. Warum ist Pentan (C₅H₁₂, Sdp. +36 °C) bei 25 °C flüssig, während Methan (CH₄, −162 °C) gasförmig ist?",
        options: [
          "Pentan besitzt eine deutlich längere C-Kette und größere Moleküloberfläche → die London-WW sind viel stärker als bei Methan",
          "Pentan ist ein permanenter Dipol mit fünf O–H-Gruppen",
          "Methan ist ein Ionengitter mit extrem hohen Schmelzpunkten"
        ],
        correct: 0,
        explanation: "Beide Alkane sind unpolar (nur London-WW). Wegen der größeren Kettenlänge bzw. Kontaktfläche von Pentan sind die London-WW deutlich stärker → der Siedepunkt steigt über 25 °C."
      }
    ],
    step6: [
      {
        id: "s6q1",
        question: "1. Wie richten sich H₂O-Moleküle in der Hydrat-Hülle um ein positives Na⁺-Ion aus?",
        options: [
          "Mit den positiven H-Polen (δ⁺) nach innen zum Na⁺-Ion",
          "Mit dem negativen O-Pol (δ⁻) nach innen zum Na⁺-Ion",
          "Völlig zufällig ohne feste Orientierung"
        ],
        correct: 1,
        explanation: "Gegensätzliche Ladungen ziehen sich an: Der negative O-Pol (δ⁻) von Wasser zeigt zum positiven Na⁺-Ion, während H-Pole (δ⁺) zu Cl⁻ zeigen."
      },
      {
        id: "s6q2",
        question: "2. Warum mischt sich Pentan (C₅H₁₂) mit Heptan (C₇H₁₆), bildet aber mit Wasser (H₂O) zwei getrennte Phasen?",
        options: [
          "Zwischen unpolaren Alkanen wirken ähnliche London-WW (mischbar); H₂O-Dipole halten über starke H-Brücken zusammen und drängen Pentan ab",
          "Pentan reagiert sofort zu Kochsalz und Gas",
          "Heptan bildet Wasserstoffbrücken mit den C-Atomen von Pentan"
        ],
        correct: 0,
        explanation: "„Ähnliches löst sich in Ähnlichem“: Unpolare Stoffe lösen sich über London-WW ineinander, trennen sich aber vom stark polaren H-Brücken-Netzwerk des Wassers."
      }
    ],
    step7: [
      {
        id: "s7q1",
        question: "Check 1 (EN-Trend Kl. 9): Welches Element hat die höchste Elektronegativität im PSE?",
        options: ["Francium (Fr)", "Kohlenstoff (C)", "Fluor (F)"],
        correct: 2,
        explanation: "Im PSE steigt die EN nach rechts oben: Fluor (EN = 4,0) besitzt die höchste, Francium (EN = 0,7) die niedrigste EN."
      },
      {
        id: "s7q2",
        question: "Check 2 (Symmetrie Kl. 9): Welches Molekül ist trotz polarer Bindungen KEIN permanenter Dipol?",
        options: ["H₂O (gewinkelt, 104,5°)", "CO₂ (linear, 180°)", "HCl (zweiatomig, ΔEN = 0,9)"],
        correct: 1,
        explanation: "Bei linearem CO₂ fallen positiver (δ⁺) und negativer (δ⁻) Ladungsschwerpunkt auf dem C-Atom zusammen."
      },
      {
        id: "s7q3",
        question: "Check 3 (London-WW Kl. 10): Was bedeutet der Begriff „induzierter Dipol“?",
        options: [
          "Ein benachbarter temporärer Dipol verschiebt durch elektrostatische Abstoßung die Elektronen eines unpolaren Teilchens und erzeugt darin selbst einen Dipol",
          "Ein festes Ionengitter gibt dauerhaft Elektronen ab",
          "Ein Wasserstoffatom spaltet seine Elektronenpaarbindung"
        ],
        correct: 0,
        explanation: "Der δ⁻-Bereich des ersten temporären Dipols schiebt Elektronen im Nachbarteilchen zur abgewandten Seite → es entsteht ein induzierter temporärer Dipol."
      },
      {
        id: "s7q4",
        question: "Check 4 (Oberfläche Kl. 10): Ordne die Alkane nach zunehmender Stärke ihrer London-WW!",
        options: [
          "Methan (CH₄) < Pentan (C₅H₁₂) < Octan (C₈H₁₈)",
          "Octan (C₈H₁₈) < Pentan (C₅H₁₂) < Methan (CH₄)",
          "Pentan (C₅H₁₂) < Methan (CH₄) < Octan (C₈H₁₈)"
        ],
        correct: 0,
        explanation: "Mit steigender C-Kettenlänge vergrößert sich die Moleküloberfläche (Kontaktfläche) → die London-WW nehmen kontinuierlich zu und die Siedetemperatur steigt."
      },
      {
        id: "s7q5",
        question: "Check 5 (Siedepunkt-Vergleich): Was wird beim Sieden einer Molekülsubstanz (z. B. Wasser oder Pentan) überwunden?",
        options: [
          "Die Elektronenpaarbindungen innerhalb der einzelnen Moleküle",
          "Ausschließlich die zwischenmolekularen Wechselwirkungen zwischen den Molekülen",
          "Die Protonen im Atomkern werden getrennt"
        ],
        correct: 1,
        explanation: "Beim Verdampfen/Sieden bleiben alle Moleküle intakt – es müssen nur die zwischenmolekularen Kräfte überwunden werden."
      },
      {
        id: "s7q6",
        question: "Check 6 (Löslichkeit): Warum sinkt die Wasserlöslichkeit von Alkoholen (z. B. Methanol vs. Octanol) bei sehr langer Kohlenstoffkette?",
        options: [
          "Der lange unpolare Alkylrest (hydrophob, London-WW) überwiegt irgendwann gegenüber der polaren O–H-Gruppe",
          "Octanol verliert seine Elektronen bei Raumtemperatur",
          "Methanol hat keine O–H-Gruppe"
        ],
        correct: 0,
        explanation: "Kurze Alkohole sind durch H-Brücken an der O–H-Gruppe hydrophil. Bei langen Ketten dominiert der unpolare Teil (wie bei einem Alkan) → schlecht wasserlöslich!"
      }
    ]
  };

  /* ------------------------------------------------------------------------
     2. ZUSTAND & PERSISTENZ
     ------------------------------------------------------------------------ */
  const PATH_STEPS = {
    all: ["step1", "step2", "step3", "step4", "step5", "step6", "step7"],
    review9: ["step1", "step2", "step3"],
    london10: ["step4"],
    effects: ["step5", "step6"]
  };

  const PATH_DEFAULT_STEP = {
    all: "step1",
    review9: "step1",
    london10: "step4",
    effects: "step5"
  };

  const state = {
    learningPath: "all",
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
      dragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0
    },
    m4: {
      phase: 0,
      shiftPct: 0,
      fluctuateOn: false,
      fluctuatePhase: 0,
      alkane: "c5",
      transferText: ""
    },
    m5: {
      tempC: 20,
      selectedAlkane: "c5",
      particles: []
    },
    m6: {
      mode: "builder",
      phase: 0,
      mix: "nacl",
      // 8 H2O dipoles: 0..3 around Na+ (ideal angle points O inward), 4..7 around Cl- (ideal angle points H inward)
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
        if (parsed && typeof parsed.learningPath === "string" && Object.hasOwn(PATH_STEPS, parsed.learningPath)) {
          state.learningPath = parsed.learningPath;
        }
        if (parsed && typeof parsed.activeStep === "string" && document.getElementById(`panel-${parsed.activeStep}`)) {
          state.activeStep = parsed.activeStep;
        }
        if (parsed && typeof parsed.m4TransferText === "string") {
          state.m4.transferText = parsed.m4TransferText;
        }
      }
    } catch (e) {}
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        learningPath: state.learningPath,
        activeStep: state.activeStep,
        answers: state.answers,
        m4TransferText: state.m4.transferText
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
    canvasModel4London: { w: 660, h: 270 },
    canvasModel4Alkane: { w: 660, h: 270 },
    canvasModel5Boil: { w: 660, h: 210 },
    canvasModel5AlkaneChart: { w: 660, h: 220 },
    canvasModel6: { w: 660, h: 310 }
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
    const pathButtons = Array.from(document.querySelectorAll("[data-path-select]"));

    function applyLearningPathUI(pathId) {
      state.learningPath = Object.hasOwn(PATH_STEPS, pathId) ? pathId : "all";
      const allowed = PATH_STEPS[state.learningPath];

      pathButtons.forEach((btn) => {
        const isCurrent = btn.dataset.pathSelect === state.learningPath;
        btn.classList.toggle("active", isCurrent);
        btn.setAttribute("aria-pressed", String(isCurrent));
      });

      tabs.forEach((tab) => {
        const inPath = state.learningPath === "all" || allowed.includes(tab.dataset.step);
        tab.classList.toggle("in-active-path", state.learningPath !== "all" && inPath);
        tab.classList.toggle("out-of-path", state.learningPath !== "all" && !inPath);
      });
    }

    function selectStep(stepId, moveFocus = false) {
      if (!document.getElementById(`panel-${stepId}`)) stepId = "step1";
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
      try {
        if (window.location.hash !== `#${stepId}`) {
          history.replaceState(null, "", `#${stepId}`);
        }
      } catch (_) {}
    }

    function selectLearningPath(pathId, jumpToDefault = true) {
      applyLearningPathUI(pathId);
      if (jumpToDefault) {
        const targetStep = PATH_DEFAULT_STEP[state.learningPath] || "step1";
        selectStep(targetStep, false);
      } else {
        saveProgress();
      }
    }

    pathButtons.forEach((btn) => {
      btn.addEventListener("click", () => selectLearningPath(btn.dataset.pathSelect, true));
    });

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

    // Apply URL query ?path=... and hash #step... if provided
    let urlPath = null;
    try {
      const sp = new URLSearchParams(window.location.search);
      const qPath = sp.get("path");
      if (qPath && Object.hasOwn(PATH_STEPS, qPath)) {
        urlPath = qPath;
      }
    } catch (_) {}

    const initialHash = window.location.hash ? window.location.hash.replace("#", "") : "";
    const matchedTab = tabs.find((t) => t.dataset.step === initialHash);

    if (urlPath) {
      applyLearningPathUI(urlPath);
      selectStep(matchedTab ? matchedTab.dataset.step : PATH_DEFAULT_STEP[urlPath], false);
    } else {
      applyLearningPathUI(state.learningPath);
      selectStep(matchedTab ? matchedTab.dataset.step : state.activeStep, false);
    }
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
     7. MODELL 3: TEILCHEN-LUPE (PERMANENTE DIPOLE: H-BRÜCKEN & DIPOL-DIPOL-WW)
     ------------------------------------------------------------------------ */
  function initModel3() {
    const subBtns = document.querySelectorAll("[data-m3-substance]");
    const rotSlider = document.getElementById("m3RotSlider");
    const snapBtn = document.getElementById("m3SnapBtn");
    const formalBtn = document.getElementById("m3FormalToggle");
    const lupeCanvas = document.getElementById("canvasModel3Lupe");

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

    syncSliderVisual(rotSlider);
    setSubstance("h2o");
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

  /* ------------------------------------------------------------------------
     8. MODELL 4: TEMPORÄRE DIPOLE, INDUKTION & LONDON-WW (KLASSE 10)
     ------------------------------------------------------------------------ */
  const ALKANES_DATA = [
    { key: "c1", carbons: 1, name: "Methan", formula: "CH₄", mp: -182, bp: -162, pct: 10 },
    { key: "c2", carbons: 2, name: "Ethan", formula: "C₂H₆", mp: -183, bp: -89, pct: 18 },
    { key: "c3", carbons: 3, name: "Propan", formula: "C₃H₈", mp: -188, bp: -42, pct: 26 },
    { key: "c4", carbons: 4, name: "Butan", formula: "C₄H₁₀", mp: -138, bp: -0.5, pct: 34 },
    { key: "c5", carbons: 5, name: "Pentan", formula: "C₅H₁₂", mp: -130, bp: 36, pct: 42 },
    { key: "c6", carbons: 6, name: "Hexan", formula: "C₆H₁₄", mp: -95, bp: 69, pct: 49 },
    { key: "c7", carbons: 7, name: "Heptan", formula: "C₇H₁₆", mp: -91, bp: 98, pct: 56 },
    { key: "c8", carbons: 8, name: "Octan", formula: "C₈H₁₈", mp: -57, bp: 126, pct: 63 },
    { key: "c9", carbons: 9, name: "Nonan", formula: "C₉H₂₀", mp: -54, bp: 151, pct: 70 },
    { key: "c10", carbons: 10, name: "Decan", formula: "C₁₀H₂₂", mp: -30, bp: 174, pct: 76 },
    { key: "c11", carbons: 11, name: "Undecan", formula: "C₁₁H₂₄", mp: -26, bp: 196, pct: 82 },
    { key: "c12", carbons: 12, name: "Dodecan", formula: "C₁₂H₂₆", mp: -10, bp: 216, pct: 88 },
    { key: "c13", carbons: 13, name: "Tridecan", formula: "C₁₃H₂₈", mp: -5, bp: 235, pct: 94 },
    { key: "c14", carbons: 14, name: "Tetradecan", formula: "C₁₄H₃₀", mp: 6, bp: 254, pct: 100 }
  ];

  function fmtTempC(val) {
    if (val === -0.5) return "−0,5 °C";
    return val > 0 ? `+${val} °C` : `${String(val).replace("-", "−")} °C`;
  }

  let m4FluctuateRafId = null;
  let m4ChartHitboxes = [];

  function initModel4() {
    const phaseBtns = document.querySelectorAll("[data-m4-phase]");
    const nextPhaseBtn = document.getElementById("m4NextPhaseBtn");
    const fluctuateBtn = document.getElementById("m4FluctuateBtn");
    const alkaneBtns = document.querySelectorAll("[data-m4-alkane]");
    const alkaneCanvas = document.getElementById("canvasModel4Alkane");
    const transferInput = document.getElementById("m4TransferInput");

    function setPhase(p) {
      state.m4.phase = p;
      phaseBtns.forEach((b) => b.classList.toggle("active", parseInt(b.dataset.m4Phase, 10) === p));
      state.m4.shiftPct = p === 0 ? 0 : 82;
      drawModel4London();
    }

    function setSelectedAlkane(key) {
      state.m4.alkane = key;
      alkaneBtns.forEach((b) => b.classList.toggle("active", b.dataset.m4Alkane === key));
      drawModel4Alkane();
    }

    phaseBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.m4.fluctuateOn) toggleFluctuation(false);
        setPhase(parseInt(btn.dataset.m4Phase, 10));
      });
    });

    if (nextPhaseBtn) {
      nextPhaseBtn.addEventListener("click", () => {
        if (state.m4.fluctuateOn) toggleFluctuation(false);
        setPhase((state.m4.phase + 1) % 4);
      });
    }

    function toggleFluctuation(forceState) {
      state.m4.fluctuateOn = typeof forceState === "boolean" ? forceState : !state.m4.fluctuateOn;
      if (fluctuateBtn) {
        fluctuateBtn.setAttribute("aria-pressed", String(state.m4.fluctuateOn));
        fluctuateBtn.textContent = state.m4.fluctuateOn ? "⚡ Fluktuation: An" : "⚡ Fluktuation animieren";
      }
      if (m4FluctuateRafId) {
        cancelAnimationFrame(m4FluctuateRafId);
        m4FluctuateRafId = null;
      }
      if (state.m4.fluctuateOn) {
        if (state.m4.phase === 0) {
          state.m4.phase = 1;
          phaseBtns.forEach((b) => b.classList.toggle("active", parseInt(b.dataset.m4Phase, 10) === 1));
        }
        const tick = () => {
          if (!state.m4.fluctuateOn) return;
          if (state.activeStep === "step4") {
            state.m4.fluctuatePhase += 0.045;
            state.m4.shiftPct = Math.round(50 + 45 * Math.sin(state.m4.fluctuatePhase));
            drawModel4London();
          }
          m4FluctuateRafId = requestAnimationFrame(tick);
        };
        m4FluctuateRafId = requestAnimationFrame(tick);
      } else {
        drawModel4London();
      }
    }

    if (fluctuateBtn) {
      fluctuateBtn.addEventListener("click", () => toggleFluctuation());
    }

    alkaneBtns.forEach((btn) => {
      btn.addEventListener("click", () => setSelectedAlkane(btn.dataset.m4Alkane));
    });

    if (alkaneCanvas) {
      alkaneCanvas.addEventListener("click", (e) => {
        const rect = alkaneCanvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 660;
        const hit = m4ChartHitboxes.find((box) => x >= box.x - 3 && x <= box.x + box.w + 3);
        if (hit) setSelectedAlkane(hit.key);
      });
    }

    // Worksheet transfer free-text evaluation (4 core concepts)
    function evaluateTransferText(text) {
      const chips = document.querySelectorAll("#m4KeywordChips .keyword-chip");
      const scoreEl = document.getElementById("m4TransferScore");
      const rules = {
        chain: /(kette|läng|c-atom|anzahl|kohlenstoff|ch4|pentan|octan|decan|tetradecan|molekülgröße|alkan|kw)/i,
        surface: /(oberfläche|kontakt|berühr|fläch)/i,
        london: /(london|temporär|induziert|wechselwirkung|anziehung|ww)/i,
        energy: /(siede|schmelz|temperatur|energie|wärme|überwind|trennen|steig|höher)/i
      };
      let matched = 0;
      chips.forEach((chip) => {
        const kw = chip.dataset.kw;
        const ok = Boolean(rules[kw] && rules[kw].test(text));
        chip.classList.toggle("matched", ok);
        if (ok) matched++;
      });
      if (scoreEl) {
        scoreEl.textContent = `${matched} / 4 Fachbegriffe erkannt`;
        scoreEl.classList.toggle("done", matched >= 3);
      }
    }

    if (transferInput) {
      transferInput.value = state.m4.transferText || "";
      evaluateTransferText(transferInput.value);
      transferInput.addEventListener("input", () => {
        state.m4.transferText = transferInput.value;
        saveProgress();
        evaluateTransferText(transferInput.value);
      });
    }

    setPhase(0);
    setSelectedAlkane(state.m4.alkane || "c5");
  }

  function drawPolarizableSphere(ctx, cx, cy, r, shiftRatio, pal, isDarkCloud = true) {
    // shiftRatio: 0 = symmetric; +1 = electrons shifted right (δ⁺ left, δ⁻ right)
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    if (Math.abs(shiftRatio) < 0.08) {
      const grad = ctx.createRadialGradient(cx, cy, r * 0.12, cx, cy, r);
      grad.addColorStop(0, pal.dark ? "rgba(56, 189, 248, 0.55)" : "rgba(15, 23, 42, 0.35)");
      grad.addColorStop(1, pal.dark ? "rgba(148, 163, 184, 0.18)" : "rgba(100, 116, 139, 0.14)");
      ctx.fillStyle = grad;
    } else {
      const dir = shiftRatio >= 0 ? 1 : -1;
      const strength = Math.min(1, Math.abs(shiftRatio));
      const xStart = cx - dir * r;
      const xEnd = cx + dir * r;
      const grad = ctx.createLinearGradient(xStart, cy, xEnd, cy);
      grad.addColorStop(0, pal.dark ? `rgba(248, 113, 113, ${0.18 + 0.25 * strength})` : `rgba(220, 38, 38, ${0.10 + 0.18 * strength})`);
      grad.addColorStop(0.45, pal.dark ? "rgba(148, 163, 184, 0.22)" : "rgba(226, 232, 240, 0.55)");
      grad.addColorStop(1, pal.dark ? `rgba(56, 189, 248, ${0.38 + 0.42 * strength})` : `rgba(2, 132, 199, ${0.34 + 0.46 * strength})`);
      ctx.fillStyle = grad;
    }
    ctx.fill();
    ctx.strokeStyle = isDarkCloud ? pal.primary : pal.border;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Nucleus (+)
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fillStyle = pal.surface;
    ctx.fill();
    ctx.strokeStyle = pal.ink;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.fillStyle = pal.ink;
    ctx.font = `800 12px ${CANVAS_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("+", cx, cy + 0.5);

    // Electron dots (6 dots) shifting cleanly according to shiftRatio
    const baseOffsets = [
      { x: -24, y: -16 },
      { x: -28, y: 12 },
      { x: -10, y: 26 },
      { x: 10, y: -26 },
      { x: 24, y: -12 },
      { x: 22, y: 18 }
    ];
    baseOffsets.forEach((off, idx) => {
      const shiftX = shiftRatio * (r * 0.44);
      let px = cx + off.x + shiftX;
      let py = cy + off.y * (1 - Math.abs(shiftRatio) * 0.15);
      // Keep inside circle radius - 7
      const dist = Math.hypot(px - cx, py - cy);
      if (dist > r - 8) {
        const sc = (r - 8) / dist;
        px = cx + (px - cx) * sc;
        py = cy + (py - cy) * sc;
      }
      ctx.beginPath();
      ctx.arc(px, py, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = idx < 3 && Math.abs(shiftRatio) < 0.08 ? pal.ink : pal.primary;
      ctx.fill();
    });

    // Delta labels if polarized
    if (Math.abs(shiftRatio) >= 0.2) {
      const plusX = cx - Math.sign(shiftRatio) * (r * 0.54);
      const minusX = cx + Math.sign(shiftRatio) * (r * 0.54);
      ctx.font = `800 16px ${CANVAS_FONT}`;
      ctx.fillStyle = pal.deltaPlus;
      ctx.fillText("δ⁺", plusX, cy - r * 0.36);
      ctx.fillStyle = pal.deltaMinus;
      ctx.fillText("δ⁻", minusX, cy - r * 0.36);
    }

    ctx.restore();
  }

  function drawModel4London() {
    const canvas = document.getElementById("canvasModel4London");
    if (!canvas) return;
    const { ctx, w, h } = setupHiDPICanvas(canvas);
    const pal = getPalette();

    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, w, h);

    const p = state.m4.phase;
    const shift = state.m4.fluctuateOn
      ? Math.sin(state.m4.fluctuatePhase) * 0.95
      : state.m4.shiftPct / 100;

    const badge = document.getElementById("m4LondonBadge");
    const caption = document.getElementById("m4LondonCaption");
    badge.classList.remove("ok", "warn");

    if (p === 0) {
      // Phase 1: Symmetrische Ladungsdichte
      drawPolarizableSphere(ctx, w / 2, 130, 58, 0, pal);

      ctx.fillStyle = pal.muted;
      ctx.font = `600 11.5px ${CANVAS_FONT}`;
      ctx.textAlign = "right";
      ctx.fillText("Atomkern (+)", w / 2 - 74, 108);
      ctx.beginPath();
      ctx.moveTo(w / 2 - 68, 108);
      ctx.lineTo(w / 2 - 12, 128);
      ctx.strokeStyle = pal.muted;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      ctx.textAlign = "left";
      ctx.fillText("Elektronenhülle", w / 2 + 74, 104);
      ctx.fillText("(symmetrische Ladungsdichte)", w / 2 + 74, 120);
      ctx.beginPath();
      ctx.moveTo(w / 2 + 68, 108);
      ctx.lineTo(w / 2 + 44, 122);
      ctx.stroke();

      // Bottom summary box
      ctx.fillStyle = pal.surface;
      drawRoundedRect(ctx, 130, h - 48, w - 260, 32, 8);
      ctx.fill();
      ctx.strokeStyle = pal.border;
      ctx.stroke();
      ctx.fillStyle = pal.ink;
      ctx.font = `700 12px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.fillText("Symmetrische Elektronenverteilung → nach außen unpolar", w / 2, h - 28);

      badge.textContent = "Phase 1 · symmetrisch";
      caption.textContent = "Im zeitlichen Mittel sind die Elektronen symmetrisch um den Atomkern verteilt → keine Teilladungen.";
    } else if (p === 1) {
      // Phase 2: Spontaner temporärer Dipol
      drawPolarizableSphere(ctx, w / 2, 126, 60, shift, pal);

      // Left & right callout boxes matching worksheet
      const leftMinus = shift < 0;
      const boxL = { x: 26, y: 78, w: 205, h: 74 };
      const boxR = { x: w - 231, y: 78, w: 205, h: 74 };

      [
        { b: boxL, isMinus: leftMinus },
        { b: boxR, isMinus: !leftMinus }
      ].forEach(({ b, isMinus }) => {
        ctx.fillStyle = pal.surface;
        drawRoundedRect(ctx, b.x, b.y, b.w, b.h, 8);
        ctx.fill();
        ctx.strokeStyle = isMinus ? pal.deltaMinus : pal.deltaPlus;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.textAlign = "center";
        ctx.font = `700 11.5px ${CANVAS_FONT}`;
        ctx.fillStyle = isMinus ? pal.deltaMinus : pal.deltaPlus;
        ctx.fillText(isMinus ? "Mehr Elektronen (δ⁻)" : "Weniger Elektronen (δ⁺)", b.x + b.w / 2, b.y + 24);
        ctx.fillStyle = pal.muted;
        ctx.font = `500 11px ${CANVAS_FONT}`;
        ctx.fillText(isMinus ? "daher partiell negativ geladen" : "daher partiell positiv geladen", b.x + b.w / 2, b.y + 44);
        ctx.fillText("vorübergehend (temporär)", b.x + b.w / 2, b.y + 60);
      });

      ctx.fillStyle = pal.primary;
      ctx.font = `700 12.5px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.fillText("Temporärer Dipol (entsteht spontan durch Elektronenbewegung)", w / 2, h - 22);

      badge.textContent = "Phase 2 · Temporärer Dipol";
      badge.classList.add("warn");
      caption.textContent = "Durch spontane Bewegung verteilen sich die Elektronen kurzzeitig ungleich → ein temporärer Dipol entsteht.";
    } else if (p === 2) {
      // Phase 3: Annäherung & Induktion
      const effShift = Math.max(0.45, Math.abs(shift)) * (shift < 0 ? -1 : 1);
      const x1 = 215;
      const x2 = 445;
      const cy = 140;

      drawPolarizableSphere(ctx, x1, cy, 52, effShift, pal);
      drawPolarizableSphere(ctx, x2, cy, 52, effShift * 0.92, pal);

      // Labels under spheres
      ctx.font = `700 11.5px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.fillStyle = pal.ink;
      ctx.fillText("1. Temporärer Dipol", x1, cy + 72);
      ctx.fillStyle = pal.teal;
      ctx.fillText("2. Induzierter temporärer Dipol", x2, cy + 72);

      // Repulsion push arrow
      ctx.strokeStyle = pal.deltaMinus;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(x1 + 42, 62);
      ctx.quadraticCurveTo(w / 2, 42, x2 + 34, 62);
      ctx.stroke();
      // Arrowhead right
      ctx.beginPath();
      ctx.moveTo(x2 + 34, 62);
      ctx.lineTo(x2 + 23, 55);
      ctx.lineTo(x2 + 25, 68);
      ctx.closePath();
      ctx.fillStyle = pal.deltaMinus;
      ctx.fill();

      ctx.fillStyle = pal.ink;
      ctx.font = `700 11.5px ${CANVAS_FONT}`;
      ctx.fillText(
        effShift >= 0
          ? "δ⁻ schiebt Elektronen im Nachbarn nach rechts (Abstoßung gleicher Ladung)"
          : "δ⁺ zieht Elektronen im Nachbarn nach links",
        w / 2,
        28
      );

      badge.textContent = "Phase 3 · Induktion";
      badge.classList.add("warn");
      caption.textContent = "Der negativ geladene Pol (δ⁻) des ersten Dipols stößt die Elektronen des Nachbarteilchens ab und induziert dort einen zweiten temporären Dipol.";
    } else {
      // Phase 4: Elektrostatische Anziehung = London-WW
      const effShift = Math.max(0.55, Math.abs(shift)) * (shift < 0 ? -1 : 1);
      const x1 = 248;
      const x2 = 412;
      const cy = 142;

      drawPolarizableSphere(ctx, x1, cy, 52, effShift, pal);
      drawPolarizableSphere(ctx, x2, cy, 52, effShift, pal);

      // Dotted electrostatic attraction lines between x1+52 and x2-52
      ctx.save();
      ctx.strokeStyle = pal.warn;
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      [-18, 0, 18].forEach((dy) => {
        ctx.beginPath();
        ctx.moveTo(x1 + 54, cy + dy);
        ctx.lineTo(x2 - 54, cy + dy);
        ctx.stroke();
      });
      ctx.restore();

      // Attraction badge above
      drawRoundedRect(ctx, w / 2 - 140, 22, 280, 32, 999);
      ctx.fillStyle = pal.surface;
      ctx.fill();
      ctx.strokeStyle = pal.warn;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = pal.warn;
      ctx.font = `800 12.5px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.fillText("⚡ London-WW: δ⁻ ··· δ⁺ Anziehung!", w / 2, 42);

      // Bottom explanation
      ctx.fillStyle = pal.ink;
      ctx.font = `700 11.5px ${CANVAS_FONT}`;
      ctx.fillText("Kurzfristige elektrostatische Anziehung zwischen temporären Dipolen", w / 2, h - 22);

      badge.textContent = "Phase 4 · London-WW aktiv";
      badge.classList.add("ok");
      caption.textContent = "Zwischen dem δ⁻-Bereich links und dem induzierten δ⁺-Bereich rechts entsteht kurzzeitig eine elektrostatische Anziehung: eine London-Wechselwirkung!";
    }
  }

  // Shared C1-C14 Melting & Boiling Point Bar Chart Renderer
  function drawAlkaneChartCore(ctx, rect, opts, pal) {
    const { x, y, w, h } = rect;
    const padL = opts.padL || 42;
    const padR = opts.padR || 10;
    const padT = opts.padT || 16;
    const padB = opts.padB || 34;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const plotX = x + padL;
    const plotY = y + padT;
    const minT = -250;
    const maxT = 300;
    const yForTemp = (t) => plotY + plotH * (1 - (t - minT) / (maxT - minT));
    const mpColor = pal.dark ? "#3b82f6" : "#1d4ed8";
    const bpColor = pal.dark ? "#fb7185" : "#e11d48";
    const ref25Color = pal.dark ? "#93c5fd" : "#3b82f6";

    // Plot background & frame
    ctx.fillStyle = pal.surface;
    drawRoundedRect(ctx, plotX, plotY, plotW, plotH, 4);
    ctx.fill();
    ctx.strokeStyle = pal.border;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Horizontal gridlines (-200, -100, 0, 100, 200, 300)
    [-200, -100, 0, 100, 200, 300].forEach((gridT) => {
      const gy = yForTemp(gridT);
      ctx.strokeStyle = gridT === 0
        ? pal.border
        : (pal.dark ? "rgba(148, 163, 184, 0.16)" : "rgba(100, 116, 139, 0.16)");
      ctx.lineWidth = gridT === 0 ? 1.2 : 0.8;
      ctx.beginPath();
      ctx.moveTo(plotX, gy);
      ctx.lineTo(plotX + plotW, gy);
      ctx.stroke();

      ctx.fillStyle = pal.muted;
      ctx.font = `600 9.5px ${CANVAS_MONO}`;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(String(gridT).replace("-", "−"), plotX - 5, gy);
    });

    // Y-axis title
    ctx.save();
    ctx.translate(x + 11, plotY + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = pal.muted;
    ctx.font = `700 9.5px ${CANVAS_FONT}`;
    ctx.textAlign = "center";
    ctx.fillText("Temperatur (°C)", 0, 0);
    ctx.restore();

    // Bars (C1..C14)
    const slotW = plotW / ALKANES_DATA.length;
    const barGap = Math.max(1, slotW * 0.05);
    const barW = Math.max(4, Math.min(16, (slotW - barGap * 3) / 2.25));
    const hitboxes = [];
    const byBot = plotY + plotH;

    ALKANES_DATA.forEach((alk, idx) => {
      const gx = plotX + idx * slotW;
      const isSelected = alk.key === opts.selectedKey;
      hitboxes.push({ key: alk.key, x: gx, w: slotW });

      if (isSelected) {
        ctx.fillStyle = pal.dark ? "rgba(56, 189, 248, 0.14)" : "rgba(2, 132, 199, 0.10)";
        ctx.fillRect(gx + 1, plotY + 1, slotW - 2, plotH - 2);
      }

      const centerGroupX = gx + slotW / 2;
      const mpX = centerGroupX - barW - barGap * 0.5;
      const bpX = centerGroupX + barGap * 0.5;
      const mpTop = Math.min(byBot - 3, yForTemp(alk.mp));
      const bpTop = Math.min(byBot - 3, yForTemp(alk.bp));

      // Melting point bar (blue)
      ctx.fillStyle = mpColor;
      ctx.fillRect(mpX, mpTop, barW, byBot - mpTop);

      // Boiling point bar (red/coral)
      ctx.fillStyle = bpColor;
      ctx.fillRect(bpX, bpTop, barW, byBot - bpTop);

      if (isSelected) {
        ctx.strokeStyle = pal.ink;
        ctx.lineWidth = 1.4;
        ctx.strokeRect(mpX - 1.5, Math.min(mpTop, bpTop) - 1.5, barW * 2 + barGap + 3, byBot - Math.min(mpTop, bpTop) + 1.5);
      }

      // X-axis label (1..14)
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = isSelected ? pal.primary : pal.ink;
      ctx.font = `${isSelected ? "800" : "600"} 9.5px ${CANVAS_FONT}`;
      ctx.fillText(String(alk.carbons), centerGroupX, byBot + 5);
    });

    // X-axis caption
    ctx.fillStyle = pal.ink;
    ctx.font = `700 10px ${CANVAS_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText("Anzahl C-Atome (lineare Kohlenwasserstoffe)", plotX + plotW / 2, y + h - 2);

    // 25 °C reference line
    const y25 = yForTemp(25);
    ctx.save();
    ctx.strokeStyle = ref25Color;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(plotX, y25);
    ctx.lineTo(plotX + plotW, y25);
    ctx.stroke();

    const show25Text = typeof opts.heaterTemp !== "number" || Math.abs(opts.heaterTemp - 25) >= 22;
    if (show25Text) {
      ctx.fillStyle = ref25Color;
      ctx.font = `800 10px ${CANVAS_FONT}`;
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillText("25 °C", plotX + 8, y25 - 3);
    }
    ctx.restore();

    // Optional heater temperature overlay line (Step 5)
    if (typeof opts.heaterTemp === "number") {
      const clampedT = Math.max(minT, Math.min(maxT, opts.heaterTemp));
      const yHeat = yForTemp(clampedT);
      const labelTxt = `Heizplatte T = ${opts.heaterTemp} °C`;
      ctx.save();
      ctx.strokeStyle = pal.warn;
      ctx.lineWidth = 1.8;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(plotX, yHeat);
      ctx.lineTo(plotX + plotW, yHeat);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = `800 10px ${CANVAS_FONT}`;
      const pillW = ctx.measureText(labelTxt).width + 14;
      const pillH = 17;
      // Place badge in open left area when above C1-C3 boiling points, else right, always with opaque pill backdrop
      const placeLeft = opts.heaterTemp > -85 && opts.heaterTemp < 65;
      const pillX = placeLeft ? plotX + 8 : plotX + plotW - pillW - 8;
      const pillY = yHeat - pillH - 3 >= plotY + 2 ? yHeat - pillH - 3 : yHeat + 4;

      ctx.fillStyle = pal.surface;
      drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 999);
      ctx.fill();
      ctx.strokeStyle = pal.warn;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = pal.warn;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(labelTxt, pillX + pillW / 2, pillY + pillH / 2 + 0.5);
      ctx.restore();
    }

    // Legend inside open upper-left plot area (above C1-C6 bars)
    const legX = plotX + 14;
    const legY = plotY + 12;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = `700 10.5px ${CANVAS_FONT}`;

    ctx.fillStyle = mpColor;
    ctx.fillRect(legX, legY, 9, 9);
    ctx.fillText("Schmelzpunkt", legX + 13, legY + 5);

    ctx.fillStyle = bpColor;
    ctx.fillRect(legX, legY + 16, 9, 9);
    ctx.fillText("Siedepunkt", legX + 13, legY + 21);

    return hitboxes;
  }

  function drawModel4Alkane() {
    const canvas = document.getElementById("canvasModel4Alkane");
    if (!canvas) return;
    const { ctx, w, h } = setupHiDPICanvas(canvas);
    const pal = getPalette();

    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, w, h);

    const data = ALKANES_DATA.find((a) => a.key === state.m4.alkane) || ALKANES_DATA[4];
    const badge = document.getElementById("m4AlkaneBadge");
    const caption = document.getElementById("m4AlkaneCaption");
    if (badge) badge.textContent = `${data.formula} (${data.name}) · Sdp. ${fmtTempC(data.bp)}`;

    // Left panel: C1-C14 Melting & Boiling Point Chart
    m4ChartHitboxes = drawAlkaneChartCore(
      ctx,
      { x: 6, y: 10, w: 382, h: h - 18 },
      { selectedKey: data.key, padL: 42, padR: 8, padT: 12, padB: 32 },
      pal
    );

    // Right info card: Selected Alkane Contact Surface & Physical Data
    const cardX = 398, cardY = 12, cardW = w - 410, cardH = h - 24;
    ctx.fillStyle = pal.surface;
    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 10);
    ctx.fill();
    ctx.strokeStyle = pal.border;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = pal.ink;
    ctx.font = `800 13.5px ${CANVAS_FONT}`;
    ctx.fillText(`${data.name} (${data.formula})`, cardX + 14, cardY + 24);

    // Clear subtitle with C count, MP / BP & State at 25 °C
    ctx.font = `600 11px ${CANVAS_FONT}`;
    ctx.fillStyle = pal.muted;
    ctx.fillText(`${data.carbons} C-Atom${data.carbons === 1 ? "" : "e"} · Smp. ${fmtTempC(data.mp)} · Sdp. ${fmtTempC(data.bp)}`, cardX + 14, cardY + 43);

    const aggState = data.bp < 25 ? "Gasförmig" : data.mp >= 25 ? "Fest" : "Flüssig";
    ctx.fillStyle = data.bp < 25 ? pal.warn : pal.primary;
    ctx.font = `700 11.5px ${CANVAS_FONT}`;
    ctx.fillText(`Bei 25 °C: ${aggState}`, cardX + 14, cardY + 62);

    // Two parallel alkane chains showing contact surface & London-WW
    const nC = data.carbons;
    const molCenterX = cardX + cardW / 2;
    const topY = cardY + 104;
    const botY = cardY + 158;
    const maxSpan = cardW - 60;
    const stepX = nC === 1 ? 0 : Math.min(24, maxSpan / (nC - 1));
    const totalW = Math.max(52, (nC - 1) * stepX + 36);
    const startC = molCenterX - ((nC - 1) * stepX) / 2;
    const atomR = nC >= 11 ? 5.2 : nC >= 7 ? 6.2 : 7.5;
    const zigAmp = nC >= 10 ? 3.5 : 4.5;

    [topY, botY].forEach((cy, mIdx) => {
      ctx.save();
      drawRoundedRect(ctx, molCenterX - totalW / 2, cy - 16, totalW, 32, 16);
      const grad = ctx.createLinearGradient(molCenterX - totalW / 2, cy, molCenterX + totalW / 2, cy);
      if (mIdx === 0) {
        grad.addColorStop(0, pal.dark ? "rgba(56, 189, 248, 0.24)" : "rgba(2, 132, 199, 0.15)");
        grad.addColorStop(0.5, pal.dark ? "rgba(251, 191, 36, 0.26)" : "rgba(245, 158, 11, 0.20)");
        grad.addColorStop(1, pal.dark ? "rgba(56, 189, 248, 0.24)" : "rgba(2, 132, 199, 0.15)");
      } else {
        grad.addColorStop(0, pal.dark ? "rgba(248, 113, 113, 0.22)" : "rgba(220, 38, 38, 0.13)");
        grad.addColorStop(0.5, pal.dark ? "rgba(56, 189, 248, 0.24)" : "rgba(2, 132, 199, 0.15)");
        grad.addColorStop(1, pal.dark ? "rgba(248, 113, 113, 0.22)" : "rgba(220, 38, 38, 0.13)");
      }
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = pal.border;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      const pts = Array.from({ length: nC }, (_, i) => ({
        x: startC + i * stepX,
        y: cy + (nC === 1 ? 0 : i % 2 === 0 ? zigAmp : -zigAmp)
      }));
      if (nC > 1) {
        ctx.strokeStyle = pal.ink;
        ctx.lineWidth = nC >= 10 ? 2 : 2.4;
        ctx.beginPath();
        pts.forEach((pt, i) => (i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
        ctx.stroke();
      }
      pts.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, atomR, 0, Math.PI * 2);
        ctx.fillStyle = pal.dark ? "#d97706" : "#f59e0b";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.1;
        ctx.stroke();
      });
      ctx.restore();
    });

    // London-WW contact lines
    const linkCount = Math.max(2, Math.min(12, nC));
    const linkStart = molCenterX - totalW * 0.38;
    const linkSpan = totalW * 0.76;
    ctx.save();
    ctx.strokeStyle = pal.warn;
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    for (let i = 0; i < linkCount; i++) {
      const lx = linkStart + (linkCount === 1 ? 0 : (i / (linkCount - 1)) * linkSpan);
      ctx.beginPath();
      ctx.moveTo(lx, topY + 18);
      ctx.lineTo(lx, botY - 18);
      ctx.stroke();
    }
    ctx.restore();

    // Surface / London-WW meter
    ctx.fillStyle = pal.ink;
    ctx.font = `700 11px ${CANVAS_FONT}`;
    ctx.textAlign = "left";
    ctx.fillText("Kontaktfläche & London-WW:", cardX + 14, cardY + 200);

    const barX = cardX + 14, barY = cardY + 210, barW = cardW - 28, barH = 14;
    drawRoundedRect(ctx, barX, barY, barW, barH, 7);
    ctx.fillStyle = pal.surfaceAlt;
    ctx.fill();

    drawRoundedRect(ctx, barX, barY, Math.max(14, (barW * data.pct) / 100), barH, 7);
    ctx.fillStyle = data.pct > 55 ? pal.warn : pal.primary;
    ctx.fill();

    if (caption) {
      caption.textContent = `${data.name} (${data.formula}): Smp. ${fmtTempC(data.mp)} · Sdp. ${fmtTempC(data.bp)} (bei 25 °C ${aggState.toLowerCase()}). Klicke im Diagramm links auf 1–14 C-Atome!`;
    }
  }

  /* ------------------------------------------------------------------------
     9. MODELL 5: AUSWIRKUNG SIEDETEMPERATUREN (3 WW & LINEARE KW C1–C14)
     ------------------------------------------------------------------------ */
  const BOILING_SUBSTANCES = [
    { id: "ch4", name: "Methan (CH₄)", bp: -162, ww: "London-WW", colorKey: "warn" },
    { id: "so2", name: "SO₂", bp: -10, ww: "Dipol-Dipol", colorKey: "primary" },
    { id: "h2o", name: "Wasser (H₂O)", bp: 100, ww: "H-Brücken", colorKey: "deltaMinus" }
  ];

  let m5RafId = null;
  let m5ChartHitboxes = [];

  function initModel5() {
    const tempSlider = document.getElementById("m5TempSlider");
    const tempPresets = document.querySelectorAll("[data-m5-temp]");
    const chartCanvas = document.getElementById("canvasModel5AlkaneChart");

    state.m5.particles = BOILING_SUBSTANCES.map(() =>
      Array.from({ length: 8 }, (_, i) => ({
        x: 0.18 + (i % 4) * 0.21,
        y: 0.62 + Math.floor(i / 4) * 0.17,
        vx: (Math.random() - 0.5) * 0.015,
        vy: (Math.random() - 0.5) * 0.015
      }))
    );

    function setTemp(t) {
      state.m5.tempC = t;
      if (tempSlider) {
        tempSlider.value = String(t);
        syncSliderVisual(tempSlider);
        tempSlider.setAttribute("aria-valuetext", `${t} Grad Celsius`);
      }
      const valEl = document.getElementById("m5TempVal");
      const badgeEl = document.getElementById("m5TempBadge");
      if (valEl) valEl.textContent = `${t} °C`;
      if (badgeEl) badgeEl.textContent = t === 20 ? "T = 20 °C (Raumtemp.)" : `T = ${t} °C`;

      tempPresets.forEach((b) => {
        b.classList.toggle("active", parseInt(b.dataset.m5Temp, 10) === t);
      });
      drawModel5Boil();
      drawModel5AlkaneChart();
    }

    if (tempSlider) {
      tempSlider.addEventListener("input", () => setTemp(parseInt(tempSlider.value, 10)));
      syncSliderVisual(tempSlider);
    }

    tempPresets.forEach((btn) => {
      btn.addEventListener("click", () => setTemp(parseInt(btn.dataset.m5Temp, 10)));
    });

    if (chartCanvas) {
      chartCanvas.addEventListener("click", (e) => {
        const rect = chartCanvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 660;
        const hit = m5ChartHitboxes.find((box) => x >= box.x - 3 && x <= box.x + box.w + 3);
        if (hit) {
          state.m5.selectedAlkane = hit.key;
          drawModel5AlkaneChart();
        }
      });
    }

    startBoilingAnimation();
    setTemp(20);
  }

  function startBoilingAnimation() {
    if (m5RafId) cancelAnimationFrame(m5RafId);
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function tick() {
      if (state.activeStep === "step5" && !reduced) {
        const T = state.m5.tempC;
        BOILING_SUBSTANCES.forEach((sub, idx) => {
          const boiling = T >= sub.bp;
          const speedScale = boiling ? 1.85 : 0.45;
          (state.m5.particles[idx] || []).forEach((p) => {
            p.x += p.vx * speedScale;
            p.y += p.vy * speedScale;
            if (p.x < 0.16 || p.x > 0.84) p.vx *= -1;
            if (boiling) {
              if (p.y < 0.14 || p.y > 0.88) p.vy *= -1;
            } else {
              if (p.y < 0.54 || p.y > 0.88) p.vy *= -1;
            }
          });
        });
        drawModel5Boil();
      }
      if (!reduced) {
        m5RafId = requestAnimationFrame(tick);
      }
    }

    drawModel5Boil();
    if (!reduced) {
      m5RafId = requestAnimationFrame(tick);
    }
  }

  function drawModel5Boil() {
    const canvas = document.getElementById("canvasModel5Boil");
    if (!canvas) return;
    const { ctx, w, h } = setupHiDPICanvas(canvas);
    const pal = getPalette();

    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, w, h);

    const T = state.m5.tempC;
    const boxW = 188;
    const gap = 22;
    const startX = (w - (boxW * BOILING_SUBSTANCES.length + gap * (BOILING_SUBSTANCES.length - 1))) / 2;

    BOILING_SUBSTANCES.forEach((sub, idx) => {
      const bx = startX + idx * (boxW + gap);
      const by = 28;
      const bh = 148;
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
        ctx.fillRect(bx + 2, by + bh * 0.46, boxW - 4, bh * 0.52);
      }

      // WW lines between close liquid particles
      const pts = (state.m5.particles[idx] || []).map((p) => ({
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
            if (Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y) < 48) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      }

      // Particles
      pts.forEach((pt) => {
        ctx.fillStyle = pal[sub.colorKey];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = pal.surface;
        ctx.lineWidth = 1.3;
        ctx.stroke();
      });

      // Top & Bottom Labels
      ctx.fillStyle = pal.ink;
      ctx.font = `700 11.5px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.fillText(`${sub.name} · Sdp. ${sub.bp > 0 ? "+" : ""}${sub.bp} °C`, bx + boxW / 2, 18);

      ctx.font = `700 11px ${CANVAS_FONT}`;
      ctx.fillStyle = boiling ? pal.bad : pal.ok;
      ctx.fillText(
        boiling ? `Gasförmig (${sub.ww} überw.)` : `Flüssig (${sub.ww})`,
        bx + boxW / 2,
        by + bh + 18
      );
    });
  }

  function drawModel5AlkaneChart() {
    const canvas = document.getElementById("canvasModel5AlkaneChart");
    if (!canvas) return;
    const { ctx, w, h } = setupHiDPICanvas(canvas);
    const pal = getPalette();

    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, w, h);

    const curT = state.m5.tempC;
    m5ChartHitboxes = drawAlkaneChartCore(
      ctx,
      { x: 10, y: 8, w: w - 20, h: h - 14 },
      { selectedKey: state.m5.selectedAlkane, heaterTemp: curT, padL: 48, padR: 16, padT: 12, padB: 32 },
      pal
    );

    const sel = ALKANES_DATA.find((a) => a.key === state.m5.selectedAlkane) || ALKANES_DATA[4];
    const badgeEl = document.getElementById("m5AlkanInfoBadge");
    const capEl = document.getElementById("m5AlkaneCaption");
    const stateText = curT >= sel.bp ? "gasförmig" : curT < sel.mp ? "fest" : "flüssig";
    if (badgeEl) badgeEl.textContent = `${sel.formula} (${sel.name}): ${fmtTempC(sel.bp)}`;
    if (capEl) {
      capEl.textContent = `${sel.name} (${sel.formula}, Smp. ${fmtTempC(sel.mp)}, Sdp. ${fmtTempC(sel.bp)}): Bei T = ${curT} °C ist es ${stateText}. Längere Ketten vergrößern die Kontaktfläche → stärkere London-WW!`;
    }
  }

  /* ------------------------------------------------------------------------
     10. MODELL 6: HYDRAT-HÜLLEN-BAUKASTEN & LÖSUNGSVERHALTEN
     ------------------------------------------------------------------------ */
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

  function initModel6() {
    const modeBtns = document.querySelectorAll("[data-m6-mode]");
    const phaseBtns = document.querySelectorAll("[data-m6-phase]");
    const mixBtns = document.querySelectorAll("[data-m6-mix]");
    const autoBtn = document.getElementById("m6AutoSolveBtn");
    const scrambleBtn = document.getElementById("m6ScrambleBtn");
    const canvas = document.getElementById("canvasModel6");

    function setMode(mode) {
      state.m6.mode = mode;
      modeBtns.forEach((b) => b.classList.toggle("active", b.dataset.m6Mode === mode));
      document.getElementById("m6ControlsBuilder").hidden = mode !== "builder";
      document.getElementById("m6ControlsPhases").hidden = mode !== "phases";
      document.getElementById("m6ControlsMix").hidden = mode !== "mix";
      drawModel6();
    }

    modeBtns.forEach((b) => b.addEventListener("click", () => setMode(b.dataset.m6Mode)));

    phaseBtns.forEach((b) => {
      b.addEventListener("click", () => {
        state.m6.phase = parseInt(b.dataset.m6Phase, 10);
        phaseBtns.forEach((x) => x.classList.toggle("active", x === b));
        drawModel6();
      });
    });

    mixBtns.forEach((b) => {
      b.addEventListener("click", () => {
        state.m6.mix = b.dataset.m6Mix;
        mixBtns.forEach((x) => x.classList.toggle("active", x === b));
        drawModel6();
      });
    });

    autoBtn.addEventListener("click", () => {
      state.m6.builderAngles = HYDRAT_SLOTS.map((s) => s.idealOutward);
      drawModel6();
    });

    scrambleBtn.addEventListener("click", () => {
      state.m6.builderAngles = HYDRAT_SLOTS.map((s) => (s.idealOutward + 90 * (1 + Math.floor(Math.random() * 3))) % 360);
      drawModel6();
    });

    canvas.addEventListener("click", (e) => {
      if (state.m6.mode !== "builder") return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 660;
      const y = ((e.clientY - rect.top) / rect.height) * 310;

      HYDRAT_SLOTS.forEach((slot, idx) => {
        const wx = slot.ix + slot.dx;
        const wy = slot.iy + slot.dy;
        if (Math.hypot(x - wx, y - wy) <= 38) {
          state.m6.builderAngles[idx] = (state.m6.builderAngles[idx] + 90) % 360;
          drawModel6();
        }
      });
    });

    // Support deep-linking via query parameters (e.g. ?m6mode=mix&m6mix=alkanes#step6)
    try {
      const sp = new URLSearchParams(window.location.search);
      const qMode = sp.get("m6mode");
      const qMix = sp.get("m6mix");
      if (qMode && ["builder", "phases", "mix"].includes(qMode)) {
        setMode(qMode);
      }
      if (qMix && ["nacl", "hcl", "pentan", "alkanes"].includes(qMix)) {
        state.m6.mix = qMix;
        mixBtns.forEach((x) => x.classList.toggle("active", x.dataset.m6Mix === qMix));
        drawModel6();
      }
    } catch (_) {}
  }

  function drawDipoleWater(ctx, cx, cy, angleDeg, pal, scale = 1) {
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

  function drawAlkaneChainMini(ctx, cx, cy, nCarbons, pal, fillColor) {
    const stepX = 21;
    const totalW = (nCarbons - 1) * stepX + 34;
    const startX = cx - ((nCarbons - 1) * stepX) / 2;

    ctx.fillStyle = pal.dark ? "rgba(251, 191, 36, 0.20)" : "rgba(245, 158, 11, 0.20)";
    ctx.strokeStyle = pal.dark ? "rgba(251, 191, 36, 0.55)" : "rgba(217, 119, 6, 0.45)";
    ctx.lineWidth = 1.4;
    drawRoundedRect(ctx, cx - totalW / 2, cy - 19, totalW, 38, 14);
    ctx.fill();
    ctx.stroke();

    const coords = Array.from({ length: nCarbons }, (_, i) => ({
      x: startX + i * stepX,
      y: cy + (i % 2 === 0 ? 5 : -5)
    }));

    ctx.strokeStyle = pal.ink;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    coords.forEach((pt, i) => (i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
    ctx.stroke();

    coords.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 7.5, 0, Math.PI * 2);
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.font = `800 8.5px ${CANVAS_FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("C", pt.x, pt.y + 0.5);
    });
  }

  function drawModel6() {
    const canvas = document.getElementById("canvasModel6");
    if (!canvas) return;
    const { ctx, w, h } = setupHiDPICanvas(canvas);
    const pal = getPalette();

    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, w, h);

    const badge = document.getElementById("m6StatusBadge");
    const caption = document.getElementById("m6Caption");
    badge.classList.remove("ok", "warn");

    if (state.m6.mode === "builder") {
      let correctCount = 0;
      drawIon(ctx, 185, 155, "Na⁺", true, pal);
      drawIon(ctx, 475, 155, "Cl⁻", false, pal);

      HYDRAT_SLOTS.forEach((slot, idx) => {
        const wx = slot.ix + slot.dx;
        const wy = slot.iy + slot.dy;
        const ang = state.m6.builderAngles[idx];
        const isCorrect = ang === slot.idealOutward;
        if (isCorrect) correctCount++;

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

        ctx.font = `800 13px ${CANVAS_FONT}`;
        ctx.fillStyle = isCorrect ? pal.ok : pal.bad;
        ctx.textAlign = "center";
        ctx.fillText(isCorrect ? "✓" : "↻", wx + 28, wy - 18);
      });

      drawIon(ctx, 185, 155, "Na⁺", true, pal);
      drawIon(ctx, 475, 155, "Cl⁻", false, pal);

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
    } else if (state.m6.mode === "phases") {
      const p = state.m6.phase;
      badge.textContent = `Phase ${p + 1} von 3`;

      if (p === 0) {
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const isNa = (r + c) % 2 === 0;
            drawIon(ctx, 255 + c * 75, 85 + r * 70, isNa ? "Na⁺" : "Cl⁻", isNa, pal, 28);
          }
        }
        caption.textContent = "Phase 1 (Lupe): Festes Natriumchlorid-Ionengitter. Na⁺- und Cl⁻-Ionen halten durch starke Ionenbindungen zusammen.";
      } else if (p === 1) {
        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 2; c++) {
            const isNa = (r + c) % 2 === 0;
            drawIon(ctx, 285 + c * 75, 120 + r * 70, isNa ? "Na⁺" : "Cl⁻", isNa, pal, 26);
          }
        }
        drawDipoleWater(ctx, 185, 120, 180, pal, 1);
        drawDipoleWater(ctx, 185, 190, 0, pal, 1);
        drawDipoleWater(ctx, 465, 120, 180, pal, 1);
        drawDipoleWater(ctx, 465, 190, 0, pal, 1);
        caption.textContent = "Phase 2: Polare Wassermoleküle (H₂O-Dipole) lagern sich mit dem entgegengesetzten Teilpol an die Rand-Ionen des Gitters an.";
      } else {
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
      // Mode 3: Hydrophil vs Hydrophob / Unpolar + Unpolar
      const mix = state.m6.mix;
      const isSoluble = mix !== "pentan";
      if (mix === "alkanes") {
        badge.textContent = "Mischbar (unpolar + unpolar)";
      } else {
        badge.textContent = isSoluble ? "Löst sich (hydrophil)" : "Nicht mischbar (hydrophob)";
      }
      badge.classList.add(isSoluble ? "ok" : "warn");

      // Left: Macroscopic Beaker
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

      if (mix === "alkanes") {
        ctx.fillStyle = pal.dark ? "rgba(251, 191, 36, 0.25)" : "rgba(245, 158, 11, 0.24)";
        ctx.fillRect(78, 88, 164, 172);
        ctx.fillStyle = pal.ink;
        ctx.font = `700 11.5px ${CANVAS_FONT}`;
        ctx.fillText("Klare, homogene Mischung", 160, 166);
        ctx.font = `500 10.5px ${CANVAS_FONT}`;
        ctx.fillText("(unpolar in unpolar)", 160, 184);
      } else {
        ctx.fillStyle = pal.dark ? "rgba(56, 189, 248, 0.24)" : "rgba(56, 189, 248, 0.28)";
        ctx.fillRect(78, 95, 164, 165);

        if (mix === "pentan") {
          ctx.fillStyle = pal.dark ? "rgba(251, 191, 36, 0.45)" : "rgba(245, 158, 11, 0.45)";
          ctx.fillRect(78, 66, 164, 42);
          ctx.strokeStyle = pal.dark ? "rgba(251, 191, 36, 0.85)" : "rgba(217, 119, 6, 0.85)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(78, 108);
          ctx.lineTo(242, 108);
          ctx.stroke();

          ctx.fillStyle = pal.ink;
          ctx.font = `700 11px ${CANVAS_FONT}`;
          ctx.fillText("Pentan-Phase (oben, unpolar)", 160, 83);
          ctx.font = `500 10px ${CANVAS_FONT}`;
          ctx.fillText("ρ ≈ 0,63 g/cm³", 160, 98);

          ctx.font = `700 11px ${CANVAS_FONT}`;
          ctx.fillText("Wasser-Phase (unten, polar)", 160, 180);
          ctx.font = `500 10px ${CANVAS_FONT}`;
          ctx.fillText("ρ = 1,00 g/cm³", 160, 195);
        } else {
          ctx.fillStyle = pal.ink;
          ctx.font = `700 12px ${CANVAS_FONT}`;
          ctx.fillText("Klare, homogene Lösung", 160, 178);
        }
      }

      // Right: Magnifying glass
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
      } else if (mix === "alkanes") {
        ctx.fillStyle = pal.ink;
        ctx.font = `700 10.5px ${CANVAS_FONT}`;
        ctx.textAlign = "center";
        ctx.fillText("Pentan (C₅H₁₂)", 465, 86);
        drawAlkaneChainMini(ctx, 465, 114, 5, pal, pal.dark ? "#d97706" : "#f59e0b");

        ctx.save();
        ctx.strokeStyle = pal.warn;
        ctx.lineWidth = 2.2;
        ctx.setLineDash([4, 3]);
        [-36, -12, 12, 36].forEach((dx) => {
          ctx.beginPath();
          ctx.moveTo(465 + dx, 134);
          ctx.lineTo(465 + dx, 178);
          ctx.stroke();
        });
        ctx.restore();

        ctx.fillStyle = pal.warn;
        ctx.font = `800 10.5px ${CANVAS_FONT}`;
        ctx.fillText("London-WW (ähnlich stark)", 465, 160);

        drawAlkaneChainMini(ctx, 465, 198, 7, pal, pal.dark ? "#b45309" : "#d97706");
        ctx.fillStyle = pal.ink;
        ctx.font = `700 10.5px ${CANVAS_FONT}`;
        ctx.fillText("Heptan (C₇H₁₆)", 465, 232);

        caption.textContent = "Pentan + Heptan (beide unpolar): Ähnliches löst sich in Ähnlichem — beide Moleküle ziehen sich über London-WW an und mischen sich homogen!";
      } else {
        drawDipoleWater(ctx, 415, 202, 30, pal, 0.8);
        drawDipoleWater(ctx, 465, 218, 270, pal, 0.8);
        drawDipoleWater(ctx, 515, 202, 150, pal, 0.8);
        drawDipoleWater(ctx, 440, 168, 0, pal, 0.8);
        drawDipoleWater(ctx, 490, 168, 180, pal, 0.8);

        ctx.strokeStyle = pal.deltaMinus;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(415, 202); ctx.lineTo(440, 168); ctx.lineTo(490, 168); ctx.lineTo(515, 202);
        ctx.moveTo(440, 168); ctx.lineTo(465, 218); ctx.moveTo(490, 168); ctx.lineTo(465, 218);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = pal.primary;
        ctx.font = `600 10px ${CANVAS_FONT}`;
        ctx.textAlign = "center";
        ctx.fillText("H₂O-Netzwerk (H-Brücken)", 465, 248);

        ctx.fillStyle = pal.ink;
        ctx.font = `700 10.5px ${CANVAS_FONT}`;
        ctx.fillText("Pentan (C₅H₁₂, unpolar)", 465, 65);

        drawAlkaneChainMini(ctx, 465, 94, 5, pal, pal.dark ? "#d97706" : "#f59e0b");

        caption.textContent = "Pentan (C₅H₁₂, unpolar): Die H₂O-Dipole ziehen sich über starke H-Brücken zusammen und drängen unpolare Pentan-Moleküle heraus → flüssiges Pentan schwimmt als obere Phase auf Wasser (Phasentrennung).";
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
        if (state.m4) state.m4.transferText = "";
        const transferInput = document.getElementById("m4TransferInput");
        if (transferInput) {
          transferInput.value = "";
          transferInput.dispatchEvent(new Event("input"));
        }
        saveProgress();
        renderAllQuizzes();
      });
    }
  }

  function redrawAllCanvases() {
    drawModel1();
    drawModel2();
    drawModel3Lupe();
    drawModel4London();
    drawModel4Alkane();
    drawModel5Boil();
    drawModel5AlkaneChart();
    drawModel6();
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
    initModel1();
    initModel2();
    initModel3();
    initModel4();
    initModel5();
    initModel6();
    initThemeToggle();
    initTabs();
    renderAllQuizzes();
    initGlobalActions();
    redrawAllCanvases();
  });
})();
