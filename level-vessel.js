// Vessel of First Light - Level 2
// Based on "1914: One or Several Wolves?" from A Thousand Plateaus

class VesselOfFirstLight {
    constructor(game) {
        this.game = game;
        this.name = "Vessel of First Light";
        this.seed = "pack-echo-n2";
        
        // Pack mechanics
        this.packs = [];
        this.playerPack = [];
        this.packMemory = [];
        this.collectiveHarmonics = 0.0;
        
        // Wolf entities
        this.wolves = this.initializeWolves();
        this.packFormations = [];
        
        // Environment state
        this.environment = {
            plains: "Vast",
            wind: "Whispering",
            light: "Dawn",
            packDensity: 0.0
        };
        
        // New glyphs for this level
        this.newGlyphs = new Set(["α", "β", "γ", "δ"]);
        this.activeGlyphs = new Set(["ȹu", "ʘa", "kə", "mni", "α", "β", "γ", "δ"]);
        
        // Level-specific mechanics
        this.packSize = 3;
        this.maxPacks = 5;
        this.packCohesion = 0.0;
        
        this.initLevel();
    }

    initializeWolves() {
        return [
            {
                name: "Alpha Wolf",
                triggerGlyph: "α",
                response: "lead-pack",
                affinity: ["leadership", "strength"],
                echoResponse: "form pack 'βγ'",
                description: "The leader who responds to strong, repeated patterns",
                position: { x: 0.3, y: 0.4 },
                pack: null,
                strength: 1.0,
                influence: 0.8
            },
            {
                name: "Beta Pack",
                triggerGlyph: "β",
                response: "follow-alpha",
                affinity: ["loyalty", "amplification"],
                echoResponse: "amplify 'α'",
                description: "Follows the alpha's lead and amplifies group actions",
                position: { x: 0.6, y: 0.5 },
                pack: null,
                strength: 0.7,
                influence: 0.6
            },
            {
                name: "Lone Wolf",
                triggerGlyph: "γ",
                response: "independent-hunt",
                affinity: ["solitude", "precision"],
                echoResponse: "isolate 'δ'",
                description: "Solitary but powerful when isolated",
                position: { x: 0.8, y: 0.3 },
                pack: null,
                strength: 0.9,
                influence: 0.4
            },
            {
                name: "Shadow Pack",
                triggerGlyph: "δ",
                response: "mirror-actions",
                affinity: ["reflection", "echo"],
                echoResponse: "mirror last action",
                description: "Mirrors player actions and creates echo effects",
                position: { x: 0.2, y: 0.6 },
                pack: null,
                strength: 0.6,
                influence: 0.5
            }
        ];
    }

    initLevel() {
        console.log('Initializing Vessel of First Light...');
        
        // Update game state for this level
        this.game.level = {
            name: this.name,
            seed: this.seed,
            activeGlyphs: this.activeGlyphs,
            environment: this.environment,
            echoMemory: [],
            harmonics: 0.0,
            mood: "Awakening"
        };
        
        // Update player vocabulary
        this.game.playerVocabulary = new Set(this.activeGlyphs);
        
        // Initialize visual environment
        this.game.visualEffects.generatePlainsEnvironment();
        
        // Start with some basic packs
        this.createInitialPacks();
        
        // Display level introduction
        this.displayLevelIntro();
    }

    createInitialPacks() {
        // Create some initial wolf packs in the environment
        const initialPacks = [
            { members: ["α", "β"], cohesion: 0.6, position: { x: 0.3, y: 0.4 } },
            { members: ["γ"], cohesion: 1.0, position: { x: 0.8, y: 0.3 } },
            { members: ["δ"], cohesion: 0.8, position: { x: 0.2, y: 0.6 } }
        ];
        
        this.packs = initialPacks;
        this.updatePackFormations();
    }

    updatePackFormations() {
        this.packFormations = [];
        
        this.packs.forEach(pack => {
            const formation = {
                center: pack.position,
                members: pack.members,
                cohesion: pack.cohesion,
                radius: 50 + pack.cohesion * 30,
                pulse: 0
            };
            this.packFormations.push(formation);
        });
    }

    processGlyphInput(glyph) {
        // Add to echo memory
        this.game.level.echoMemory.push(glyph);
        
        // Check for pack formation
        this.checkPackFormation(glyph);
        
        // Trigger wolf responses
        this.triggerWolfResponse(glyph);
        
        // Update collective harmonics
        this.updateCollectiveHarmonics(glyph);
        
        // Check for level completion
        this.checkLevelCompletion();
    }

    checkPackFormation(glyph) {
        // Add to player pack
        this.playerPack.push(glyph);
        
        // Keep pack size manageable
        if (this.playerPack.length > this.packSize) {
            this.playerPack.shift();
        }
        
        // Check for valid pack formations
        const packPatterns = this.getPackPatterns();
        let packFormed = false;
        
        packPatterns.forEach(pattern => {
            if (this.matchesPackPattern(this.playerPack, pattern)) {
                this.formPack(pattern);
                packFormed = true;
            }
        });
        
        if (packFormed) {
            this.game.uiManager.displayFeedback("Pack formed! Collective consciousness grows.");
        }
    }

    getPackPatterns() {
        return [
            ["α", "β", "γ"], // Alpha leads, Beta follows, Lone wolf joins
            ["α", "β"],      // Alpha-Beta pair
            ["γ", "δ"],      // Lone wolf with shadow
            ["α", "γ"],      // Alpha with lone wolf
            ["β", "δ"]       // Beta with shadow
        ];
    }

    matchesPackPattern(playerPack, pattern) {
        if (playerPack.length < pattern.length) return false;
        
        const recentPack = playerPack.slice(-pattern.length);
        return JSON.stringify(recentPack) === JSON.stringify(pattern);
    }

    formPack(pattern) {
        const newPack = {
            members: [...pattern],
            cohesion: 0.6, // Reduced from 0.8
            position: {
                x: 0.5 + (Math.random() - 0.5) * 0.4,
                y: 0.5 + (Math.random() - 0.5) * 0.4
            },
            strength: pattern.length * 0.3
        };
        
        this.packs.push(newPack);
        this.packCohesion += 0.05; // Reduced from 0.1
        
        // Create visual effect for pack formation
        this.game.visualEffects.createPackFormationEffect(newPack);
    }

    triggerWolfResponse(glyph) {
        const wolf = this.wolves.find(w => w.triggerGlyph === glyph);
        if (wolf) {
            this.displayWolfResponse(wolf);
            this.processWolfEchoResponse(wolf);
            this.game.audioIntegration.playWolfSound(wolf.name);
        }
    }

    displayWolfResponse(wolf) {
        const responses = {
            'Alpha Wolf': "The Alpha Wolf raises its head, eyes glowing with ancient wisdom.",
            'Beta Pack': "The Beta Pack moves in perfect synchronization with your rhythm.",
            'Lone Wolf': "The Lone Wolf watches from the shadows, calculating your intent.",
            'Shadow Pack': "The Shadow Pack mirrors your movement, creating echoes in the air."
        };
        
        this.game.uiManager.displayFeedback(responses[wolf.name] || `${wolf.name} responds to your call.`);
    }

    processWolfEchoResponse(wolf) {
        if (wolf.echoResponse.includes("form pack")) {
            const packMatch = wolf.echoResponse.match(/form pack '([^']+)'/);
            if (packMatch) {
                const packGlyphs = packMatch[1].split('');
                this.suggestPackFormation(packGlyphs);
            }
        } else if (wolf.echoResponse.includes("amplify")) {
            this.amplifyCollectiveHarmonics();
        } else if (wolf.echoResponse.includes("isolate")) {
            this.isolateLoneWolf();
        } else if (wolf.echoResponse.includes("mirror")) {
            this.mirrorLastAction();
        }
    }

    suggestPackFormation(glyphs) {
        this.game.uiManager.displayFeedback(`Pack suggestion: ${glyphs.join(' ')}`);
        // Highlight suggested glyphs
        this.game.uiManager.highlightGlyphs(glyphs);
    }

    amplifyCollectiveHarmonics() {
        this.collectiveHarmonics += 0.08; // Reduced from 0.15
        this.game.uiManager.displayFeedback("Collective harmonics amplified by the Beta Pack!");
    }

    isolateLoneWolf() {
        this.game.uiManager.displayFeedback("The Lone Wolf isolates itself, gaining strength in solitude.");
        // Increase lone wolf effectiveness
        const loneWolf = this.wolves.find(w => w.name === "Lone Wolf");
        if (loneWolf) {
            loneWolf.strength += 0.1;
        }
    }

    mirrorLastAction() {
        const lastGlyph = this.game.level.echoMemory[this.game.level.echoMemory.length - 2];
        if (lastGlyph) {
            this.game.uiManager.displayFeedback(`Shadow Pack mirrors: ${lastGlyph}`);
            // Create echo effect
            this.game.visualEffects.createEchoMirrorEffect(lastGlyph);
        }
    }

    updateCollectiveHarmonics(glyph) {
        let baseIncrease = 0.01; // Reduced from 0.02
        
        // Pack bonus
        if (this.playerPack.length >= 2) {
            baseIncrease += 0.005 * this.playerPack.length; // Reduced from 0.01
        }
        
        // Wolf interaction bonus
        const wolf = this.wolves.find(w => w.triggerGlyph === glyph);
        if (wolf) {
            baseIncrease += wolf.influence * 0.025; // Reduced from 0.05
        }
        
        // Pack cohesion bonus
        baseIncrease += this.packCohesion * 0.01; // Reduced from 0.02
        
        this.collectiveHarmonics = Math.min(1.0, this.collectiveHarmonics + baseIncrease);
        this.game.level.harmonics = this.collectiveHarmonics;
        
        console.log(`Collective harmonics: +${baseIncrease.toFixed(3)} (total: ${this.collectiveHarmonics.toFixed(3)})`);
    }

    checkLevelCompletion() {
        const echoCount = this.game.level.echoMemory.length;
        const harmonics = this.collectiveHarmonics;
        const packCount = this.packs.length;
        
        // More challenging completion conditions
        if (echoCount >= 40 && harmonics > 0.85 && packCount >= 6) {
            this.completeLevel();
        }
    }

    completeLevel() {
        console.log('Vessel of First Light completed!');
        
        const completionAphorism = this.game.aphorismsSystem.getTransitionAphorism(
            "Whispergrove", "The Smooth and the Striated"
        );
        
        this.game.uiManager.displayAphorism(completionAphorism);
        
        // Show completion sequence
        setTimeout(() => {
            this.game.uiManager.showLevelCompletion("Vessel of First Light", {
                echoes: this.game.level.echoMemory.length,
                harmonics: Math.round(this.collectiveHarmonics * 100),
                packs: this.packs.length,
                nextLevel: "The Smooth and the Striated"
            });
        }, 2000);
    }

    displayLevelIntro() {
        const introAphorism = "In the vast plains of consciousness, the pack teaches us that we are both one and many.";
        this.game.uiManager.displayAphorism(introAphorism);
        
        setTimeout(() => {
            this.game.uiManager.displayFeedback("Welcome to the Vessel of First Light. Learn to form packs and understand collective consciousness.");
        }, 1000);
    }

    getLevelStats() {
        return {
            name: this.name,
            echoes: this.game.level.echoMemory.length,
            harmonics: this.collectiveHarmonics,
            packs: this.packs.length,
            packCohesion: this.packCohesion,
            wolves: this.wolves.length,
            environment: this.environment
        };
    }
}

// Export for global access
window.VesselOfFirstLight = VesselOfFirstLight; 