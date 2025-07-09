// Level System for Whispergrove
class LevelSystem {
    constructor(game) {
        this.game = game;
        this.level = game.level;
        this.patternBonus = 0;
        this.sequenceBonus = 0;
        this.lastGlyphs = [];
    }

    updateHarmonics(glyph) {
        try {
            let baseIncrease = 0.02;
            
            // Add to recent glyphs for pattern detection
            this.lastGlyphs.push(glyph);
            if (this.lastGlyphs.length > 5) {
                this.lastGlyphs.shift();
            }
            
            // Pattern recognition bonus
            this.patternBonus = this.detectPatterns();
            baseIncrease += this.patternBonus * 0.01;
            
            // Sequence bonus
            this.sequenceBonus = this.detectSequences();
            baseIncrease += this.sequenceBonus * 0.005;
            
            // Entity interaction bonus
            const entityBonus = this.getEntityBonus(glyph);
            baseIncrease += entityBonus;
            
            // Update harmonics
            this.level.harmonics = Math.min(1.0, this.level.harmonics + baseIncrease);
            
            // Play harmonic progression if significant increase
            if (baseIncrease > 0.03) {
                this.game.audioIntegration.playHarmonicProgression();
            }
            
            console.log(`Harmonics updated: +${baseIncrease.toFixed(3)} (total: ${this.level.harmonics.toFixed(3)})`);
            
        } catch (error) {
            console.error('Error updating harmonics:', error);
        }
    }

    detectPatterns() {
        if (this.lastGlyphs.length < 3) return 0;
        
        let patternScore = 0;
        
        // Check for repeated patterns
        for (let i = 0; i < this.lastGlyphs.length - 2; i++) {
            for (let j = i + 1; j < this.lastGlyphs.length - 1; j++) {
                if (this.lastGlyphs[i] === this.lastGlyphs[j] && 
                    this.lastGlyphs[i + 1] === this.lastGlyphs[j + 1]) {
                    patternScore += 2;
                }
            }
        }
        
        // Check for alternating patterns
        for (let i = 0; i < this.lastGlyphs.length - 2; i++) {
            if (this.lastGlyphs[i] === this.lastGlyphs[i + 2] && 
                this.lastGlyphs[i] !== this.lastGlyphs[i + 1]) {
                patternScore += 1;
            }
        }
        
        return Math.min(patternScore, 5);
    }

    detectSequences() {
        if (this.lastGlyphs.length < 3) return 0;
        
        let sequenceScore = 0;
        
        // Check for consecutive entity triggers
        const entityGlyphs = ['mni', 'ȹu', 'ʘa', 'kə'];
        let consecutiveCount = 0;
        
        for (let i = 0; i < this.lastGlyphs.length; i++) {
            if (entityGlyphs.includes(this.lastGlyphs[i])) {
                consecutiveCount++;
            } else {
                if (consecutiveCount >= 3) {
                    sequenceScore += consecutiveCount;
                }
                consecutiveCount = 0;
            }
        }
        
        if (consecutiveCount >= 3) {
            sequenceScore += consecutiveCount;
        }
        
        return Math.min(sequenceScore, 3);
    }

    getEntityBonus(glyph) {
        // Different glyphs provide different bonuses
        const glyphBonuses = {
            'ȹu': 0.015,  // Paired glyphs
            'ʘa': 0.020,  // Solitary but powerful
            'kə': 0.025,  // Connection glyph
            'mni': 0.018   // Water/memory glyph
        };
        
        return glyphBonuses[glyph] || 0.01;
    }

    harmHarmonics() {
        // Reduce harmonics for incorrect input
        this.level.harmonics = Math.max(0, this.level.harmonics - 0.05);
        console.log(`Harmonics harmed: -0.05 (total: ${this.level.harmonics.toFixed(3)})`);
    }

    updateEnvironment() {
        try {
            const harmonics = this.level.harmonics;
            
            // Update root network state
            if (harmonics > 0.8) {
                this.level.environment.rootNet = "Awake";
                this.game.visualEffects.updateRootNetworkIntensity(1.0);
            } else if (harmonics > 0.5) {
                this.level.environment.rootNet = "Stirring";
                this.game.visualEffects.updateRootNetworkIntensity(0.6);
            } else {
                this.level.environment.rootNet = "Dormant";
                this.game.visualEffects.updateRootNetworkIntensity(0.2);
            }
            
            // Update canopy state
            if (harmonics > 0.7) {
                this.level.environment.canopy = "Luminous";
                this.game.visualEffects.updateCanopyIntensity(1.0);
            } else if (harmonics > 0.3) {
                this.level.environment.canopy = "Aetheric";
                this.game.visualEffects.updateCanopyIntensity(0.5);
            } else {
                this.level.environment.canopy = "Withered";
                this.game.visualEffects.updateCanopyIntensity(0.1);
            }
            
            // Update player mood
            if (harmonics > 0.9) {
                this.level.mood = "Transcendent";
            } else if (harmonics > 0.7) {
                this.level.mood = "Attuned";
            } else if (harmonics > 0.5) {
                this.level.mood = "Learning";
            } else if (harmonics > 0.3) {
                this.level.mood = "Curious";
            } else {
                this.level.mood = "Disoriented";
            }
            
        } catch (error) {
            console.error('Error updating environment:', error);
        }
    }

    checkWinCondition() {
        try {
            const echoCount = this.level.echoMemory.length;
            const harmonics = this.level.harmonics;
            
            console.log(`Checking win condition: ${echoCount} echoes, ${harmonics.toFixed(3)} harmonics`);
            
            if (echoCount >= 20 && harmonics > 0.9) {
                console.log('Win condition met!');
                this.triggerWinSequence();
                return true;
            }
            
            return false;
            
        } catch (error) {
            console.error('Error checking win condition:', error);
            return false;
        }
    }

    triggerWinSequence() {
        try {
            console.log('Triggering win sequence...');
            
            // Stop the game loop
            this.game.isGameWon = true;
            
            // Show win sequence
            this.game.uiManager.showWinSequence();
            
            // Create additional visual effects
            this.createWinEffects();
            
        } catch (error) {
            console.error('Error triggering win sequence:', error);
        }
    }

    createWinEffects() {
        // Create particle explosion
        for (let i = 0; i < 50; i++) {
            this.game.visualEffects.particles.push({
                x: this.game.canvas.width / 2,
                y: this.game.canvas.height / 2,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0,
                decay: 0.01,
                color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`,
                size: 3 + Math.random() * 6
            });
        }
        
        // Create expanding rings
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.game.visualEffects.createEchoRing('win');
            }, i * 200);
        }
    }

    getProgressStats() {
        return {
            echoes: this.level.echoMemory.length,
            harmonics: this.level.harmonics,
            mood: this.level.mood,
            environment: this.level.environment,
            patternBonus: this.patternBonus,
            sequenceBonus: this.sequenceBonus
        };
    }

    resetLevel() {
        this.level.echoMemory = [];
        this.level.harmonics = 0.0;
        this.level.mood = "Disoriented";
        this.level.environment.rootNet = "Dormant";
        this.level.environment.canopy = "Aetheric";
        this.lastGlyphs = [];
        this.patternBonus = 0;
        this.sequenceBonus = 0;
        
        // Clear visual effects
        this.game.visualEffects.glyphNodes = [];
        this.game.visualEffects.connections = [];
        this.game.visualEffects.particles = [];
        this.game.visualEffects.echoRings = [];
    }
} 