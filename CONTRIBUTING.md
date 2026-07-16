# Contribution Guidelines

Freut mich, dass du zum Projekt beitragen möchtest! 🎉

## Wie du helfen kannst

### 1. Bug Reports
Wenn du einen Bug findest:
- Erstelle eine GitHub Issue
- Beschreibe: Was ist passiert? Was sollte passieren?
- Füge Logs & Screenshots an (aus `logs/` Verzeichnis)

### 2. Feedback zum Agent
Der Agent lernt von deinem Feedback!
- Erstelle Issue mit Label `[AGENT-FEEDBACK]`
- Siehe [FEEDBACK_GUIDE.md](FEEDBACK_GUIDE.md)

### 3. Code Improvements
Wenn du Code verbessern möchtest:
1. Fork das Repo
2. Erstelle ein Feature-Branch: `git checkout -b feature/meine-idee`
3. Committen & Push
4. Erstelle einen Pull Request

### 4. Dokumentation
Hilf der Dokumentation zu verbessern:
- `README.md` - Übersicht
- `docs/QUICKSTART.md` - Schnellstart
- `docs/ARCHITECTURE.md` - Technische Details
- `docs/FEEDBACK_GUIDE.md` - Training des Agenten

## Entwicklung

### Setup für Entwicklung
```bash
git clone https://github.com/York1824/agentic-web-automation.git
cd agentic-web-automation
npm install
npm run start:debug
```

### Code-Style
- Nutze ESLint: `npm run lint`
- Formatiere mit Prettier
- Kommentiere komplexen Code
- Nutze aussagekräftige Variablennamen

### Tests schreiben
```bash
npm test
npm run test:watch
```

## Pull Request Process

1. Update die Dokumentation
2. Füge Tests hinzu (wenn relevant)
3. Stelle sicher dass alle Tests passen
4. Schreibe eine aussagekräftige PR-Beschreibung
5. Warte auf Review

## Code of Conduct

Sei respektvoll und konstruktiv. Wir sind eine Community! 🤝

---

**Danke für deine Unterstützung!** ❤️
