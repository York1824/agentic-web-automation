/**
 * Memory-Modul
 * Speichert Beobachtungen und Aktionen um zu lernen
 */

const fs = require('fs');
const path = require('path');

const MEMORY_FILE = path.join(__dirname, '../data/memory.json');
const DATA_DIR = path.join(__dirname, '../data');

// Erstelle data Verzeichnis falls nicht vorhanden
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class Memory {
  constructor() {
    this.observations = [];
    this.actions = [];
    this.maxMemory = 1000;
    this.loadMemory();
  }

  /**
   * Speichere eine Beobachtung (Spielzustand)
   */
  recordObservation(gameState) {
    this.observations.push({
      timestamp: new Date(),
      state: gameState
    });

    // Beschränke Speicher
    if (this.observations.length > this.maxMemory) {
      this.observations = this.observations.slice(-this.maxMemory);
    }

    this.saveMemory();
  }

  /**
   * Speichere eine ausgeführte Aktion
   */
  recordAction(actionRecord) {
    this.actions.push({
      timestamp: new Date(),
      ...actionRecord
    });

    // Beschränke Speicher
    if (this.actions.length > this.maxMemory) {
      this.actions = this.actions.slice(-this.maxMemory);
    }

    this.saveMemory();
  }

  /**
   * Hole die letzten N Aktionen
   */
  getRecentActions(n = 10) {
    return this.actions.slice(-n);
  }

  /**
   * Hole die letzten Beobachtungen
   */
  getRecentObservations(n = 10) {
    return this.observations.slice(-n);
  }

  /**
   * Analysiere Muster: Was funktioniert gut?
   */
  getSuccessfulActions() {
    return this.actions.filter(action => 
      action.result && action.result.status === 'success'
    );
  }

  /**
   * Analysiere Fehler: Was funktioniert nicht?
   */
  getFailedActions() {
    return this.actions.filter(action => 
      action.result && action.result.status !== 'success'
    );
  }

  /**
   * Speichere Memory in Datei
   */
  saveMemory() {
    try {
      const data = {
        observations: this.observations,
        actions: this.actions,
        savedAt: new Date()
      };

      fs.writeFileSync(MEMORY_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Fehler beim Speichern der Memory:', error);
    }
  }

  /**
   * Lade Memory aus Datei
   */
  loadMemory() {
    try {
      if (fs.existsSync(MEMORY_FILE)) {
        const data = JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf-8'));
        this.observations = data.observations || [];
        this.actions = data.actions || [];
      }
    } catch (error) {
      console.error('Fehler beim Laden der Memory:', error);
    }
  }

  /**
   * Speichere Strategie-Muster basierend auf Erfolgen
   */
  getLearnedStrategies() {
    const strategies = {};

    this.getSuccessfulActions().forEach(action => {
      const key = `${action.gameState.threat_level}_${action.action}`;
      if (!strategies[key]) {
        strategies[key] = 0;
      }
      strategies[key]++;
    });

    // Sortiere nach Häufigkeit
    return Object.entries(strategies)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }

  /**
   * Lösche alte Memory
   */
  clearOldMemory(daysOld = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    this.observations = this.observations.filter(obs => 
      new Date(obs.timestamp) > cutoffDate
    );

    this.actions = this.actions.filter(action => 
      new Date(action.timestamp) > cutoffDate
    );

    this.saveMemory();
  }
}

module.exports = new Memory();
