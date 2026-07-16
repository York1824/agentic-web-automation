# Architektur & Konzept

## System-Übersicht

```
┌──────────────────────────────────────┐
│   GitHub Actions / Scheduler          │
│   (Startet Agent täglich oder manuell)│
└──────────────────┬───────────────────┘
                   │
         ┌─────────▼──────────┐
         │   Agent Core       │
         │   (Haupt-Loop)     │
         └────────┬───────────┘
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
    ┌────────┐ ┌──────────┐ ┌──────────┐
    │ Vision │ │ Strategy │ │ Executor │
    │ Module │ │ Module   │ │ Module   │
    └────────┘ └──────────┘ └──────────┘
        │          │            │
        └──────────┼────────────┘
                   │
            ┌──────▼──────┐
            │ Playwright  │
            │ (Browser)   │
            └──────┬──────┘
                   │
        ┌──────────▼─────────┐
        │ op-maps.com Game   │
        └────────────────────┘
```

## Die 4 Hauptkomponenten

### 1. Vision Module 📸
**Was:** Sieht und versteht den Spielzustand
- Screenshots der Spielkarte
- Erkennt: Meine Truppen, Gegner, Ressourcen, Health
- Analysiert verfügbare Aktionen

**Dateien:**
- `modules/vision/screen-analyzer.js` - Screenshot & Analyse
- `modules/vision/ui-recognizer.js` - UI-Element Erkennung (optional)

**Output:** `gameState` = aktueller Spielzustand

---

### 2. Strategy Module 🧠
**Was:** Trifft intelligente Entscheidungen
- Nutzt LLM (OpenAI GPT) um beste Aktion zu wählen
- Basiert auf: Spielzustand + bisherige Erfolge/Fehler
- Berücksichtigt Risiken & Chancen

**Datei:** `modules/strategy/tactics.js`

**Entscheidungen:**
```
Gegner nah (< 5 Felder)? → DEFEND/RETREAT
Genug Ressourcen? → COLLECT/BUILD
Starker Gegner? → MOVE/WAIT
Schwacher Gegner? → ATTACK
```

**Output:** `{ action: "attack", reasoning: "..." }`

---

### 3. Executor Module ⚡
**Was:** Führt Entscheidungen aus (wie ein Mensch!)
- Klickt auf Buttons/Units
- Bewegt Truppen (Drag & Drop)
- Menschliches Timing & Pausen

**Dateien:**
- `modules/executor/action-handler.js` - Aktion ausführen
- `modules/executor/click-simulator.js` - Menschliche Klicks
- `modules/executor/timing.js` - Realistische Verzögerungen

**Menschliche Verhaltensweisen:**
- Nicht instant-Klicks (200-500ms Verzögerung)
- Sanfte Maus-Bewegung (nicht pixelgenau)
- Random-Offsets (nicht roboter-mäßig)
- Natürliche Pausen zwischen Aktionen

**Output:** `{ status: "success", ... }`

---

### 4. Memory & Learning Module 🧠💾
**Was:** Agent lernt aus Erfolgen & Fehlern
- Speichert alle Beobachtungen
- Merkt sich erfolgreiche Strategien
- Liest Feedback von GitHub Issues

**Dateien:**
- `agent/memory.js` - Speichert Erfahrungen
- `learning/feedback-processor.js` - Verarbeitet GitHub Issues

**Wie Lernen funktioniert:**
1. Agent macht Aktion
2. Du erstellst Issue: `[AGENT-FEEDBACK] Aktion war falsch`
3. Agent liest Issue, passt Strategie an
4. Nächstes Mal bessere Entscheidung

---

## Die Hauptschleife (Main Loop)

```
WHILE Agent läuft:
  1. VISION: Screenshot machen → Spielzustand analysieren
  2. MEMORY: Beobachtung speichern
  3. STRATEGY: KI trifft Entscheidung
  4. EXECUTOR: Aktion ausführen (wie ein Mensch)
  5. MEMORY: Aktion & Ergebnis speichern
  6. PAUSE: 5 Sekunden warten (realistisches Tempo)
```

**Fehlerbehandlung:**
- Bei Fehler: Längere Pause (recovery)
- Bei kritischem Fehler: Agent stoppt

---

## Datenfluss

```
Screenshot
    ↓
Vision Module
    ↓ (gameState)
Strategy Module
    ↓ (decision)
Executor Module
    ↓ (action)
Screenshot
    ↓ (Validierung)
Memory Module
    ↓ (learned_strategies)
Nächste Runde...
```

---

## Konfiguration & Modi

### Agent Modes
```bash
AGENT_MODE=AUTONOMOUS  # Startet automatisch, keine Interaktion
AGENT_MODE=LEARNING    # Wartet auf Feedback nach jeder Aktion
AGENT_MODE=DEBUG       # Zeigt Browser, verbose Logging
```

### Strategie Parameter
```env
STRATEGY_MODE=balanced      # aggressive, defensive, balanced
THREAT_THRESHOLD=5          # Gegner näher als X = Bedrohung
MIN_TROOPS_ATTACK=15        # Minimum Truppen zum Angreifen
DECISION_TIMEOUT=30000      # Max 30 Sekunden pro Entscheidung
SCREENSHOT_INTERVAL=5000    # Screenshot alle 5 Sekunden
```

---

## Testing & Debugging

### Logs
```bash
tail -f logs/agent-YYYY-MM-DD.log
```

### Screenshots
```bash
ls -ltr logs/screenshots/ | tail -n 20
```

### Memory/Gelernte Strategien
```bash
cat data/memory.json
```

### Feedback-Daten
```bash
ls data/feedback/
```

---

## Erweiterungsmöglichkeiten

- **Vision API Integration:** Claude Vision für bessere Spielfeld-Analyse
- **Multi-Agent:** Mehrere Agenten koordinieren
- **Gegner-Profiling:** Lerne gegnerische Strategien
- **Performance-Analytics:** Win-Rate, Spielzeitanalyse
- **Web UI:** Dashboard zur Steuerung & Monitoring

---

**Weitere Details siehe:** [README.md](../README.md)
