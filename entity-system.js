// Entity System for Whispergrove
class EntitySystem {
    constructor(game) {
        this.game = game;
        this.entities = this.initializeEntities();
        this.entityStates = new Map();
        this.interactionHistory = [];
    }

    initializeEntities() {
        return [
            {
                name: "Mycolith",
                triggerGlyph: "mni",
                response: "spore-pulse",
                affinity: ["wet", "memory"],
                echoResponse: "release 'ʘa'",
                description: "A fungal entity that responds to water glyphs",
                position: { x: 0.2, y: 0.7 },
                pulse: 0
            },
            {
                name: "Sibroot",
                triggerGlyph: "ȹu",
                response: "pulse-rhythm",
                affinity: ["paired-glyphs", "connection"],
                echoResponse: "teach 'kə'",
                description: "A root entity that thrives on paired communication",
                position: { x: 0.8, y: 0.6 },
                pulse: 0
            },
            {
                name: "Winnower",
                triggerGlyph: "ʘa",
                response: "vanish",
                affinity: ["solitary", "silence"],
                echoResponse: "decay 'mni' usage",
                description: "A mysterious entity that brings silence",
                position: { x: 0.5, y: 0.3 },
                pulse: 0
            },
            {
                name: "Cryptoglyph",
                triggerGlyph: "kə",
                response: "resonate",
                affinity: ["patterns", "harmonics"],
                echoResponse: "amplify harmonics",
                description: "A hidden entity that responds to connection patterns",
                position: { x: 0.3, y: 0.4 },
                pulse: 0,
                isHidden: true
            }
        ];
    }

    triggerEntity(entity) {
        try {
            console.log(`Triggering entity: ${entity.name} with response: ${entity.response}`);
            
            // Update entity state
            this.entityStates.set(entity.name, {
                lastTriggered: Date.now(),
                triggerCount: (this.entityStates.get(entity.name)?.triggerCount || 0) + 1,
                isActive: true
            });
            
            // Play entity response sound
            this.game.audioIntegration.playEntityResponse(entity, entity.response);
            
            // Display entity response
            this.displayEntityResponse(entity);
            
            // Process echo response
            this.processEchoResponse(entity);
            
            // Add to interaction history
            this.interactionHistory.push({
                entity: entity.name,
                glyph: entity.triggerGlyph,
                response: entity.response,
                timestamp: Date.now()
            });
            
            // Update entity pulse
            entity.pulse = 1.0;
            
            // Create visual effect for entity
            this.createEntityEffect(entity);
            
        } catch (error) {
            console.error('Error triggering entity:', error);
        }
    }

    displayEntityResponse(entity) {
        const responses = {
            'spore-pulse': "The Mycolith releases a cloud of luminescent spores that drift upward.",
            'pulse-rhythm': "The Sibroot pulses with a rhythmic pattern, creating connections in the root network.",
            'vanish': "The Winnower dissolves into the air, leaving behind a moment of profound silence.",
            'resonate': "The Cryptoglyph resonates with your harmonics, amplifying the forest's response."
        };
        
        const response = responses[entity.response] || `${entity.name} responds with ${entity.response}`;
        this.game.uiManager.displayFeedback(response);
    }

    processEchoResponse(entity) {
        if (!entity.echoResponse) return;
        
        const echoResponse = entity.echoResponse;
        
        if (echoResponse.includes("release")) {
            // Release a new glyph
            const glyphMatch = echoResponse.match(/'([^']+)'/);
            if (glyphMatch) {
                const newGlyph = glyphMatch[1];
                this.releaseGlyph(newGlyph);
            }
        } else if (echoResponse.includes("teach")) {
            // Teach a new glyph
            const glyphMatch = echoResponse.match(/'([^']+)'/);
            if (glyphMatch) {
                const newGlyph = glyphMatch[1];
                this.teachGlyph(newGlyph);
            }
        } else if (echoResponse.includes("decay")) {
            // Decay glyph usage
            const glyphMatch = echoResponse.match(/'([^']+)'/);
            if (glyphMatch) {
                const glyphToDecay = glyphMatch[1];
                this.decayGlyph(glyphToDecay);
            }
        } else if (echoResponse.includes("amplify")) {
            // Amplify harmonics
            this.amplifyHarmonics();
        }
    }

    releaseGlyph(glyph) {
        if (!this.game.level.activeGlyphs.has(glyph)) {
            this.game.level.activeGlyphs.add(glyph);
            this.game.uiManager.displayFeedback(`New glyph released: ${glyph}`);
            
            // Add to player vocabulary
            this.game.playerVocabulary.add(glyph);
            
            // Create visual effect for new glyph
            this.createGlyphReleaseEffect(glyph);
        }
    }

    teachGlyph(glyph) {
        if (!this.game.playerVocabulary.has(glyph)) {
            this.game.playerVocabulary.add(glyph);
            this.game.uiManager.displayFeedback(`You learn the glyph: ${glyph}`);
            
            // Create learning effect
            this.createLearningEffect(glyph);
        }
    }

    decayGlyph(glyph) {
        // Reduce the effectiveness of a glyph temporarily
        this.game.uiManager.displayFeedback(`The ${glyph} glyph's power wanes...`);
        
        // Create decay effect
        this.createDecayEffect(glyph);
    }

    amplifyHarmonics() {
        // Boost harmonics significantly
        const boost = 0.1;
        this.game.level.harmonics = Math.min(1.0, this.game.level.harmonics + boost);
        this.game.uiManager.displayFeedback("Harmonics amplified by the Cryptoglyph!");
        
        // Create amplification effect
        this.createAmplificationEffect();
    }

    createEntityEffect(entity) {
        // Create particles around entity position
        const canvasX = entity.position.x * this.game.canvas.width;
        const canvasY = entity.position.y * this.game.canvas.height;
        
        for (let i = 0; i < 15; i++) {
            this.game.visualEffects.particles.push({
                x: canvasX,
                y: canvasY,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 1.0,
                decay: 0.015,
                color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`,
                size: 2 + Math.random() * 4
            });
        }
    }

    createGlyphReleaseEffect(glyph) {
        // Create expanding ring effect
        this.game.visualEffects.echoRings.push({
            x: this.game.canvas.width / 2,
            y: this.game.canvas.height / 2,
            radius: 0,
            maxRadius: 300,
            speed: 4,
            opacity: 1.0,
            color: '#4CAF50'
        });
        
        // Display glyph in center
        setTimeout(() => {
            this.game.uiManager.displayFeedback(`Glyph ${glyph} emerges from the forest...`);
        }, 500);
    }

    createLearningEffect(glyph) {
        // Create sparkle effect
        for (let i = 0; i < 20; i++) {
            this.game.visualEffects.particles.push({
                x: this.game.canvas.width / 2,
                y: this.game.canvas.height / 2,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1.0,
                decay: 0.02,
                color: '#FFD700',
                size: 1 + Math.random() * 3
            });
        }
    }

    createDecayEffect(glyph) {
        // Create dark particles
        for (let i = 0; i < 10; i++) {
            this.game.visualEffects.particles.push({
                x: this.game.canvas.width / 2,
                y: this.game.canvas.height / 2,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1.0,
                decay: 0.01,
                color: '#666',
                size: 2 + Math.random() * 3
            });
        }
    }

    createAmplificationEffect() {
        // Create harmonic wave effect
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.game.visualEffects.echoRings.push({
                    x: this.game.canvas.width / 2,
                    y: this.game.canvas.height / 2,
                    radius: 0,
                    maxRadius: 400,
                    speed: 5,
                    opacity: 0.6,
                    color: '#FF9800'
                });
            }, i * 200);
        }
    }

    updateEntities() {
        // Update entity pulses
        this.entities.forEach(entity => {
            if (entity.pulse > 0) {
                entity.pulse *= 0.95;
            }
        });
        
        // Check for hidden entity conditions
        this.checkHiddenEntityConditions();
    }

    checkHiddenEntityConditions() {
        // Check if Cryptoglyph should be revealed
        const cryptoglyph = this.entities.find(e => e.name === "Cryptoglyph");
        if (cryptoglyph && cryptoglyph.isHidden) {
            const sibrootTriggered = this.entityStates.get("Sibroot")?.triggerCount > 0;
            const mycolithTriggered = this.entityStates.get("Mycolith")?.triggerCount > 0;
            
            if (sibrootTriggered && mycolithTriggered) {
                cryptoglyph.isHidden = false;
                this.game.uiManager.displayFeedback("A hidden entity emerges from the shadows...");
                this.releaseGlyph("kə");
            }
        }
    }

    getEntityByGlyph(glyph) {
        return this.entities.find(entity => entity.triggerGlyph === glyph);
    }

    getEntityStats() {
        const stats = {};
        this.entities.forEach(entity => {
            const state = this.entityStates.get(entity.name);
            stats[entity.name] = {
                triggerCount: state?.triggerCount || 0,
                lastTriggered: state?.lastTriggered || null,
                isActive: state?.isActive || false,
                isHidden: entity.isHidden || false
            };
        });
        return stats;
    }

    getInteractionHistory() {
        return this.interactionHistory.slice(-10); // Last 10 interactions
    }
} 