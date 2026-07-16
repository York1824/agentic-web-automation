/**
 * Timing Module
 * Natürliche Verzögerungen zwischen Aktionen (wie ein Mensch)
 */

class Timing {
  constructor() {
    this.reactionTimes = {
      instant: { min: 50, max: 150 },
      quick: { min: 150, max: 300 },
      normal: { min: 300, max: 700 },
      slow: { min: 700, max: 1500 },
      thinking: { min: 1000, max: 3000 }
    };
  }

  /**
   * Natürliche Verzögerung basierend auf Reaktionstyp
   */
  async delay(type = 'normal') {
    const times = this.reactionTimes[type] || this.reactionTimes.normal;
    const delay = times.min + Math.random() * (times.max - times.min);
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Verzögerung mit Bereich
   */
  async naturalDelay(min, max) {
    const delay = min + Math.random() * (max - min);
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Menschlich realistische Verzögerung zwischen Aktionen
   */
  async betweenActions() {
    // Menschen machen etwa 200-500ms Pause zwischen Aktionen
    return this.naturalDelay(200, 500);
  }

  /**
   * Verzögerung für Entscheidungsfindung
   */
  async thinkingTime() {
    // Nachdenken dauert länger (1-3 Sekunden)
    return this.naturalDelay(1000, 3000);
  }

  /**
   * Verzögerung wenn ein Fehler passiert (Menschen werden vorsichtig)
   */
  async errorRecovery() {
    // Mehr Zeit nach Fehler
    return this.naturalDelay(2000, 5000);
  }

  /**
   * Variation in Timing (nicht konstant)
   */
  addVariation(baseTime, variationPercent = 20) {
    const variation = baseTime * (variationPercent / 100);
    return baseTime - variation / 2 + Math.random() * variation;
  }

  /**
   * Überprüfe ob sollte pausieren (Menschen machen Pausen)
   */
  shouldTakePause(actionCount = 0) {
    // Nach etwa 10 Aktionen machen Menschen eine Pause
    if (actionCount > 0 && actionCount % 10 === 0) {
      return true;
    }
    
    // Oder zufällige Pause (5% Chance)
    return Math.random() < 0.05;
  }

  /**
   * Längere Pause (Menschen ruhen sich aus)
   */
  async longPause() {
    return this.naturalDelay(5000, 15000);
  }

  /**
   * Kurze Pause
   */
  async shortPause() {
    return this.naturalDelay(500, 1500);
  }

  /**
   * Berechne realistische Gameplay-Dauer
   * (Agent sollte nicht zu schnell spielen)
   */
  getRealisticGameDuration(minSeconds = 60, maxSeconds = 300) {
    // Ein normales Spiel dauert 1-5 Minuten
    return minSeconds + Math.random() * (maxSeconds - minSeconds);
  }
}

module.exports = Timing;
