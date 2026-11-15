# Interaktives Lernportal: Zwischenmolekulare Wechselwirkungen (Klasse 9 → 10)

> **Selbstlernmodul für den Chemieunterricht in Klasse 10 (Gymnasium Baden-Württemberg, Schule Birklehof)**  
> Verknüpft das Vorwissen aus Klasse 9 (*Polarität, Partialladungen, Dipole, symmetrische Moleküle, Dipol-Dipol-WW, H-Brücken*) mit dem neuen Thema **Temporäre Dipole & London-Wechselwirkungen** und deren **Auswirkungen** auf Siedetemperaturen und Löslichkeitsverhalten.

---

## Lernpfad-Auswahl zu Beginn

Lernende wählen direkt am Seitenanfang ihr aktuelles Ziel (oder bleiben in der Gesamtansicht aller 7 Schritte):

1. **Grundlagen & WW aus Klasse 9 wiederholen** → *Schritte 1 – 3*
2. **Temporäre Dipole & London-WW neu erarbeiten** → *Schritt 4*
3. **Auswirkungen der WW erarbeiten (Siedetemperaturen & Löslichkeit)** → *Schritte 5 – 6*
4. **Alle 7 Schritte & Gesamt-Check** → *Schritte 1 – 7*

---

## Didaktischer Aufbau (7 Teilschritte, 18 Checks)

Jeder Teilschritt kombiniert auf einer Ansicht:
- **Links:** Prägnanter Informationstext (Kernpunkte, Merksatz/Tabelle, Stoff- vs. Teilchenebene).
- **Rechts:** Interaktive Canvas-Modelle zum direkten Ausprobieren.
- **Unten:** Kurze Mini-Checks mit direkter Rückmeldung.

### Die 7 Teilschritte im Überblick
1. **Polare Bindung & Elektronegativität (`EN`):**  
   *Modell 1 („Elektronen-Tauziehen & PSE-Kompass“):* Interaktives Mini-PSE (`F = 4,0` bis `Fr = 0,7`) zur Auswahl realer Elemente für beide Atome, Elektronenwolke, Keil/Zug-Vektor und `ΔEN`-Skala (`ΔEN ≤ 0,4` unpolar vs. `ΔEN > 0,5` polar).
2. **Spezialfall Symmetrische Moleküle (`CO₂`, `CH₄` vs. `H₂O`):**  
   *Modell 2 („Symmetrie- & Ladungsschwerpunkt-Labor“):* Bindungswinkel-Slider (`90°–180°`), Echtzeit-Berechnung der Schwerpunkte von `δ⁺` und `δ⁻`, Spiegelachse/Punktsymmetrie und zuschaltbares elektrisches Feld.
3. **Dipol-Dipol-WW & Wasserstoffbrücken (`H₂O`, `SO₂`):**  
   *Modell 3 („Teilchen-Lupe Permanente Dipole“):* Zieh- und drehbares Nachbarmolekül mit Live-Anziehungskraft-Anzeige (`H-Brücken` bei `H₂O`, `Dipol-Dipol-WW` bei `SO₂` inkl. optionaler Formalladungen `⊕/⊖`).
4. **Prinzip: Temporäre Dipole & London-Wechselwirkungen (`Kl. 10`):**  
   *Modell 4a („Prinzip – Temporäre Dipole & Induktion“):* 4-Phasen-Modell (zeitliches Mittel → spontaner temporärer Dipol → Induktion im Nachbarteilchen → kurzzeitige London-WW) inkl. pausierbarer Fluktuations-Animation.  
   *Modell 4b („Siedetemperaturen linearer Kohlenwasserstoffe C₁–C₁₄“):* Interaktives Schmelz- und Siedepunktdiagramm (`C₁` bis `C₁₄`, `25 °C`-Linie) verknüpft mit zwei benachbarten Kohlenwasserstoff-Ketten zum Vergleich der Moleküloberfläche (Kontaktfläche) + Transfer-Freitextaufgabe.
5. **Auswirkung 1: Siedetemperaturen & Alkan-Reihe:**  
   *Modell 5a („3-WW-Siedesimulator“):* Heizplatten-Slider (`-180 °C` bis `+120 °C`) im direkten Teilchenvergleich `CH₄` (London-WW) vs. `SO₂` (Dipol-Dipol-WW) vs. `H₂O` (Wasserstoffbrücken).  
   *Modell 5b („Schmelz- & Siedepunkte C₁–C₁₄“):* Klickbares Diagramm mit Überlagerung der aktuellen Heiztemperatur.
6. **Auswirkung 2: Lösungsverhalten & Hydrat-Hülle (`NaCl`, `HCl`, `Pentan`, `Heptan`):**  
   *Modell 6:* Interaktiver Hydrat-Hüllen-Baukasten (8 drehbare `H₂O`-Dipole um `Na⁺` und `Cl⁻`), 3-Phasen-Auflösung des Ionengitters und 4 Mischungs-Beispiele (`NaCl + H₂O`, `HCl + H₂O`, `Pentan + H₂O` als Zweiphasensystem sowie `Pentan + Heptan` als homogene Mischung über London-WW).
7. **Gesamt-Check & Spickzettel:**  
   6 Diagnose-Aufgaben quer durch alle Konzepte und druckbarer A4-Kompakt-Spickzettel.

---

## Dateistruktur

```text
10_Klasse/Lernportal_Zwischenmolekulare_WW/
├── index.html   # Semantische Struktur, Lernpfad-Auswahl, 7-Tab-Interface, Print-Spickzettel
├── style.css    # Responsive Split-Screen, Light/Dark Mode, Barrierefreiheit
├── app.js       # HiDPI-Canvas-Modelle, Pointer-Drag, Transfer-Check, Quiz-Engine, LocalStorage
├── README.md    # Dokumentation
└── assets/      # Schullogos (birklehof_logo.png, mint_logo.png)
```
