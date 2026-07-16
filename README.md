# 🤖 Agentic Web Automation System - OP-Maps Agent

Ein autonomer KI-Agent, der wie ein menschlicher Spieler **op-maps.com** spielt. Der Agent trifft eigenständige Entscheidungen, führt Aktionen aus, lernt durch Feedback und wird über GitHub orchestriert.

## Features

- ✅ **Autonome Spieler-Aktionen** (Truppenverschiebung, Angriffe, Verteidigung)
- ✅ **Vision-basierte UI-Erkennung** (sieht die Spielkarte wie ein Mensch)
- ✅ **Strategisches Denken** (LLM-basierte Entscheidungen)
- ✅ **Lernfähig** (Feedback durch GitHub Issues)
- ✅ **Monitored & Automatisiert** (GitHub Actions Scheduler)
- ✅ **Replay & Debugging** (Video-Aufzeichnung aller Aktionen)

## Architektur

```
┌─────────────────────────────────────┐
│    GitHub Actions (Scheduler)       │
│    Läuft alle 30 Min / täglich       │
└──────────────────┬──────────────────┘
                   │
         ┌─────────▼─────────┐
         │   Agent Core      │
         │   (Decision AI)   │
         └────────┬──────────┘
                  │
    ┌─────────────┼─────────────┐
    ▼             ▼             ▼
┌────────┐  ┌──────────┐  ┌──────────┐
│ Vision │  │ Strategy │  │ Executor │
│ Module │  │ Module   │  │ (Play)   │
└────────┘  └──────────┘  └──────────┘
    │             │             │
    └─────────────┼─────────────┘
                  │
         ┌────────▼────────┐
         │  Playwright     │
         │  (Browser)      │
         └─────────────────┘
                  │
         ┌────────▼────────────┐
         │ op-maps.com Game   │
         └────────────────────┘
```

## Installation

```bash
# 1. Repository klonen
git clone https://github.com/York1824/agentic-web-automation.git
cd agentic-web-automation

# 2. Dependencies installieren
npm install

# 3. Environment-Variablen setzen
cp .env.example .env
# Bearbeite .env mit deinen Credentials
```

## Quick Start

```bash
npm run start:debug
```

## Feedback geben (Trainieren)

GitHub Issue erstellen mit Tag `[AGENT-FEEDBACK]` um den Agent zu trainieren!

---

**Made with ❤️ by York1824**
