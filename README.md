# Interaktive Auffrischung: Zwischenmolekulare Wechselwirkungen (Klasse 9 → 10)

> **Kompaktes Selbstlernmodul für den Chemieunterricht in Klasse 10 (Gymnasium Baden-Württemberg, Schule Birklehof)**  
> Basiert auf dem Vorwissen aus Klasse 9 (*Polarität, Partialladungen, Dipole, symmetrische Moleküle, H-Brücken, Dipol-Dipol-WW & Hydratation*).

---

## Didaktischer Aufbau (5 Teilschritte, „so wenig Text wie möglich, so viel wie nötig“)

Jeder Teilschritt kombiniert auf einer Ansicht:
- **Links:** Prägnanter Informationstext (3–4 Kernpunkte, Merksatz/Tabelle, Stoff- vs. Teilchenebene).
- **Rechts:** Ein eigenes interaktives Modell zum direkten Ausprobieren.
- **Unten:** 2 kurze Mini-Checks mit direkter Rückmeldung.

### Die 5 Teilschritte im Überblick
1. **Polare Bindung & Elektronegativität (`EN`):**  
   *Modell 1 („Elektronen-Tauziehen & PSE-Kompass“):* Interaktives Mini-PSE mit EN-Trendpfeilen (`F = 4,0` bis `Fr = 0,7`) zur Auswahl realer Elemente für beide Atome, Elektronenwolke, Keil/Zug-Vektor und `ΔEN`-Skala (`ΔEN ≤ 0,4` unpolar vs. `ΔEN > 0,5` polar).
2. **Spezialfall Symmetrische Moleküle (`CO₂`, `CH₄` vs. `H₂O`):**  
   *Modell 2 („Symmetrie- & Ladungsschwerpunkt-Labor“):* Bindungswinkel-Slider (`90°–180°`), Echtzeit-Berechnung der Schwerpunkte von `δ⁺` und `δ⁻`, Spiegelachse/Punktsymmetrie und zuschaltbares elektrisches Feld.
3. **Zwischenmolekulare Wechselwirkungen & Siedetemperaturen (`H₂O`, `SO₂`):**  
   *Modell 3a („Teilchen-Lupe“):* Zieh- und drehbares Nachbarmolekül mit Live-Anziehungskraft-Anzeige (`H-Brücken` bei `H₂O`, `Dipol-Dipol-WW` bei `SO₂` inkl. optionaler Formalladungen `⊕/⊖`).  
   *Modell 3b („Siede-Simulator“):* Temperatur-Slider (`-60 °C` bis `+120 °C`) mit zwei parallelen Teilchen-Bechergläsern im direkten Vergleich.
4. **Lösungsverhalten & Hydrat-Hülle (`NaCl` in Wasser):**  
   *Modell 4:* Interaktiver Hydrat-Hüllen-Baukasten (8 drehbare `H₂O`-Dipole um `Na⁺` und `Cl⁻`), 3-Phasen-Auflösung des Ionengitters und „Ähnliches löst sich in Ähnlichem“-Vergleich (`hydrophil` vs. `hydrophob`).
5. **Gesamt-Check & Spickzettel:**  
   6 Diagnose-Aufgaben quer durch alle Konzepte inkl. Transfer zur Organischen Chemie (Klasse 10) und druckbarem A4-Kompakt-Spickzettel.

---

## Dateistruktur

```text
10_Klasse/Lernportal_Zwischenmolekulare_WW/
├── index.html   # Semantische Struktur, 5-Tab-Interface, Print-Spickzettel
├── style.css    # Responsive Split-Screen, Light/Dark Mode, Barrierefreiheit
├── app.js       # 5 HiDPI-Canvas-Modelle, Pointer-Drag, Quiz-Engine, LocalStorage
├── README.md    # Dokumentation
└── assets/      # Schullogos (birklehof_logo.png, mint_logo.png)
```

