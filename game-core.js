// Whispergrove Core Game Engine
class WhispergroveCore {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.glyphInput = document.getElementById('glyphInput');
        this.glyphButtons = document.getElementById('glyphButtons');
        this.status = document.getElementById('status');
        this.echoMemory = document.getElementById('echoMemory');
        this.harmonicsFill = document.getElementById('harmonicsFill');
        this.harmonicsText = document.getElementById('harmonicsText');
        this.loreFragment = document.getElementById('loreFragment');

        // Set canvas to fill viewport
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Test canvas
        if (this.canvas && this.ctx) {
            console.log('Canvas initialized successfully');
            // Draw a test rectangle
            this.ctx.fillStyle = 'rgba(122, 155, 168, 0.3)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            console.error('Canvas initialization failed');
        }

        // Game state
        this.level = {
            name: "Whispergrove",
            seed: "∆-echo-n1",
            activeGlyphs: new Set(["ȹu", "ʘa", "kə", "mni"]),
            environment: {
                rootNet: "Dormant",
                canopy: "Aetheric"
            },
            loreFragments: [
                "The roots speak in pairs.",
                "Mni knows the thirst.",
                "When ʘa is called, silence follows."
            ],
            initialPlayerVocabulary: ["mni", "ȹu"],
            echoMemory: [],
            harmonics: 0.0,
            mood: "Disoriented"
        };

        // Player vocabulary
        this.playerVocabulary = new Set(this.level.initialPlayerVocabulary);
        
        // Animation
        this.time = 0;
        this.lastTime = 0;
        
        // Game state
        this.isGameWon = false;
        
        // Module references
        this.visualEffects = null;
        this.audioIntegration = null;
        this.uiManager = null;
        this.levelSystem = null;
        this.entitySystem = null;
        this.aphorismsSystem = null;
        
        this.init();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Notify visual effects system of resize
        if (this.visualEffects) {
            this.visualEffects.onCanvasResize();
        }
    }

    init() {
        console.log('Initializing Whispergrove game...');
        
        try {
            // Initialize modules
            this.visualEffects = new VisualEffectsSystem(this);
            this.audioIntegration = new AudioIntegration(this);
            this.uiManager = new UIManager(this);
            this.levelSystem = new LevelSystem(this);
            this.entitySystem = new EntitySystem(this);
            this.aphorismsSystem = new AphorismsSystem();
            
            console.log('All modules initialized');
            
            this.setupEventListeners();
            this.gameLoop();
            
            // Display initial aphorism
            this.displayContextualAphorism();
        } catch (error) {
            console.error('Game initialization failed:', error);
        }
    }

    setupEventListeners() {
        this.glyphInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processGlyphInput();
            }
        });

        this.glyphInput.addEventListener('input', (e) => {
            // Auto-submit when 3 characters are entered
            if (e.target.value.length === 3) {
                setTimeout(() => this.processGlyphInput(), 100);
            }
        });
    }

    processGlyphInput() {
        const input = this.glyphInput.value.trim();
        if (!input) return;

        this.glyphInput.value = '';
        
        // Check if current level has its own active glyphs
        const activeGlyphs = this.currentLevel ? this.currentLevel.activeGlyphs : this.level.activeGlyphs;
        
        if (activeGlyphs.has(input)) {
            this.choraleEngine(input);
        } else {
            this.uiManager.displayFeedback("Unintelligible echo");
            if (this.levelSystem) {
                this.levelSystem.harmHarmonics();
            }
        }
    }

    choraleEngine(playerInput) {
        // Check if we have a current level that handles its own logic
        if (this.currentLevel && typeof this.currentLevel.processGlyphInput === 'function') {
            // Use the current level's processing logic
            this.currentLevel.processGlyphInput(playerInput);
        } else {
            // Default first level logic
            // Add to echo memory
            this.level.echoMemory.push(playerInput);
            
            // Create glyph node in the web
            this.visualEffects.createGlyphNode(playerInput);
            
            // Play glyph echo sound
            this.audioIntegration.playGlyphEcho(playerInput);
            
            // Update harmonics
            this.levelSystem.updateHarmonics(playerInput);
            
            // Find and trigger entity
            let entityFound = false;
            for (let entity of this.entitySystem.entities) {
                if (entity.triggerGlyph === playerInput) {
                    entityFound = true;
                    this.entitySystem.triggerEntity(entity);
                    break;
                }
            }
            
            if (!entityFound) {
                this.uiManager.displayFeedback("Echo fades into silence");
            }
            
            // Create connections between recent glyphs
            this.visualEffects.createConnections();
            
            this.levelSystem.updateEnvironment();
            this.uiManager.updateUI();
            this.visualEffects.createEchoRing(playerInput);
            
            // Check for win condition
            this.levelSystem.checkWinCondition();
            
            // Display contextual aphorism occasionally
            if (Math.random() < 0.3) {
                this.displayContextualAphorism();
            }
        }
    }

    displayContextualAphorism() {
        try {
            const aphorism = this.aphorismsSystem.getContextualAphorism(this.level);
            this.uiManager.displayAphorism(aphorism.text);
        } catch (error) {
            console.error('Error displaying aphorism:', error);
        }
    }

    displayEntityAphorism(entityName, response) {
        try {
            const aphorism = this.aphorismsSystem.getEntityAphorism(entityName, response);
            this.uiManager.displayAphorism(aphorism);
        } catch (error) {
            console.error('Error displaying entity aphorism:', error);
        }
    }

    gameLoop(currentTime = 0) {
        try {
            const deltaTime = currentTime - this.lastTime;
            this.lastTime = currentTime;
            this.time += deltaTime;

            // Only update if game hasn't been won
            if (!this.isGameWon) {
                this.visualEffects.updateParticles();
                this.visualEffects.render();
                this.entitySystem.updateEntities();
            }

            requestAnimationFrame((time) => this.gameLoop(time));
        } catch (error) {
            console.error('Game loop error:', error);
        }
    }
} 