// UI Manager for Whispergrove
class UIManager {
    constructor(game) {
        this.game = game;
        this.status = game.status;
        this.echoMemory = game.echoMemory;
        this.harmonicsFill = game.harmonicsFill;
        this.harmonicsText = game.harmonicsText;
        this.loreFragment = game.loreFragment;
        this.glyphButtons = game.glyphButtons;
        this.aphorismDisplay = document.getElementById('aphorismDisplay');
        
        this.setupGlyphButtons();
        this.setupDebugButtons();
    }

    setupGlyphButtons() {
        // Clear existing buttons
        this.glyphButtons.innerHTML = '';
        
        // Get active glyphs from current level or default level
        const activeGlyphs = this.game.currentLevel ? this.game.currentLevel.activeGlyphs : this.game.level.activeGlyphs;
        
        // Create glyph buttons
        activeGlyphs.forEach(glyph => {
            const button = document.createElement('button');
            button.textContent = glyph;
            button.className = 'glyph-button';
            button.addEventListener('click', () => {
                this.game.glyphInput.value = glyph;
                this.game.processGlyphInput();
            });
            this.glyphButtons.appendChild(button);
        });
    }

    setupDebugButtons() {
        // Create debug panel
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debugPanel';
        debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            padding: 10px;
            border-radius: 5px;
            color: white;
            font-size: 12px;
            z-index: 1000;
        `;

        // Max harmonics button
        const maxHarmonicsBtn = document.createElement('button');
        maxHarmonicsBtn.textContent = 'Max Harmonics';
        maxHarmonicsBtn.style.cssText = `
            background: #7a9ba8;
            color: white;
            border: none;
            padding: 5px 10px;
            margin: 2px;
            border-radius: 3px;
            cursor: pointer;
        `;
        maxHarmonicsBtn.addEventListener('click', () => {
            this.game.level.harmonics = 1.0;
            this.updateUI();
        });

        // Win condition button
        const winBtn = document.createElement('button');
        winBtn.textContent = 'Trigger Win';
        winBtn.style.cssText = maxHarmonicsBtn.style.cssText;
        winBtn.addEventListener('click', () => {
            this.game.level.echoMemory = Array(25).fill('ȹu');
            this.game.level.harmonics = 0.95;
            this.game.levelSystem.checkWinCondition();
        });

        // Test Vessel of First Light button
        const vesselBtn = document.createElement('button');
        vesselBtn.textContent = 'Test Vessel Level';
        vesselBtn.style.cssText = maxHarmonicsBtn.style.cssText;
        vesselBtn.addEventListener('click', () => {
            if (window.VesselOfFirstLight) {
                this.game.currentLevel = new VesselOfFirstLight(this.game);
                this.game.uiManager.displayFeedback("Switched to Vessel of First Light level");
            } else {
                this.game.uiManager.displayFeedback("Vessel level not available");
            }
        });

        // Add buttons to debug panel
        debugPanel.appendChild(maxHarmonicsBtn);
        debugPanel.appendChild(winBtn);
        debugPanel.appendChild(vesselBtn);
        document.body.appendChild(debugPanel);
    }

    displayFeedback(message) {
        this.status.textContent = message;
        this.status.style.color = '#7a9ba8';
        
        // Fade out after 3 seconds
        setTimeout(() => {
            this.status.textContent = '';
        }, 3000);
    }

    displayAphorism(aphorism) {
        if (!this.aphorismDisplay) return;
        
        this.aphorismDisplay.textContent = aphorism;
        this.aphorismDisplay.classList.add('show');
        
        // Hide after 4 seconds
        setTimeout(() => {
            this.aphorismDisplay.classList.remove('show');
        }, 4000);
    }

    updateUI() {
        try {
            // Get current level data
            const currentLevel = this.game.currentLevel || this.game.level;
            const echoMemory = currentLevel.echoMemory || [];
            const harmonics = currentLevel.harmonics || 0;
            
            // Update echo memory display
            this.echoMemory.textContent = echoMemory.join(' ');
            
            // Update harmonics bar
            const harmonicsPercent = Math.round(harmonics * 100);
            this.harmonicsFill.style.width = `${harmonicsPercent}%`;
            this.harmonicsText.textContent = `${harmonicsPercent}%`;
            
            // Update harmonics color based on level
            if (harmonics > 0.8) {
                this.harmonicsFill.style.backgroundColor = '#4CAF50';
            } else if (harmonics > 0.5) {
                this.harmonicsFill.style.backgroundColor = '#FF9800';
            } else {
                this.harmonicsFill.style.backgroundColor = '#7a9ba8';
            }
            
            // Update audio based on harmonics
            if (this.game.audioIntegration) {
                this.game.audioIntegration.updateAudioForHarmonics();
            }
            
            // Show lore fragments based on progress
            this.updateLoreFragment();
            
            // Update glyph buttons for current level
            this.setupGlyphButtons();
            
        } catch (error) {
            console.error('UI update error:', error);
        }
    }

    updateLoreFragment() {
        const currentLevel = this.game.currentLevel || this.game.level;
        const echoCount = currentLevel.echoMemory ? currentLevel.echoMemory.length : 0;
        const harmonics = currentLevel.harmonics || 0;
        
        let fragment = '';
        
        // Check if we're in Vessel of First Light level
        if (this.game.currentLevel && this.game.currentLevel.name === "Vessel of First Light") {
            // Plains-specific lore fragments
            if (echoCount >= 30 && harmonics > 0.8) {
                fragment = "The pack's collective consciousness resonates with your own.";
            } else if (echoCount >= 20 && harmonics > 0.6) {
                fragment = "Wolf tracks lead to ancient patterns in the grass.";
            } else if (echoCount >= 10 && harmonics > 0.4) {
                fragment = "The dawn light reveals the wisdom of the pack.";
            } else if (echoCount >= 5) {
                fragment = "In the vast plains, the wolves teach us unity.";
            } else {
                fragment = "The wind carries echoes of the pack's ancient song.";
            }
        } else {
            // Original forest lore fragments
            if (echoCount >= 20 && harmonics > 0.9) {
                fragment = "You are no longer listening. You are remembering.";
            } else if (echoCount >= 15 && harmonics > 0.7) {
                fragment = "The forest speaks in patterns you begin to recognize.";
            } else if (echoCount >= 10 && harmonics > 0.5) {
                fragment = "Echoes form connections, meanings emerge.";
            } else if (echoCount >= 5 && harmonics > 0.3) {
                fragment = "The roots speak in pairs.";
            } else if (echoCount >= 2) {
                fragment = "Mni knows the thirst.";
            } else {
                fragment = "When ʘa is called, silence follows.";
            }
        }
        
        this.loreFragment.textContent = fragment;
    }

    showWinSequence() {
        // Create overlay for win sequence
        const overlay = document.createElement('div');
        overlay.id = 'winOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(122, 155, 168, 0.3) 0%, rgba(15, 25, 35, 0.9) 70%);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            font-family: 'Courier New', monospace;
            opacity: 0;
            transition: opacity 2s ease-in-out;
        `;

        // Create expanding rings
        for (let i = 0; i < 5; i++) {
            const ring = document.createElement('div');
            ring.style.cssText = `
                position: absolute;
                border: 2px solid rgba(122, 155, 168, 0.8);
                border-radius: 50%;
                width: 0;
                height: 0;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: expandRing 3s ease-out ${i * 0.2}s forwards;
            `;
            overlay.appendChild(ring);
        }

        // Create completion message
        const message = document.createElement('div');
        message.style.cssText = `
            font-size: 24px;
            text-align: center;
            margin-top: 50px;
            opacity: 0;
            animation: fadeIn 2s ease-in-out 1s forwards;
        `;
        message.innerHTML = `
            <div style="margin-bottom: 20px;">Whispergrove Complete</div>
            <div style="font-size: 16px; margin-bottom: 30px;">Harmonics: ${Math.round(this.game.level.harmonics * 100)}%</div>
            <div style="font-size: 14px; margin-bottom: 40px;">Echoes: ${this.game.level.echoMemory.length}</div>
            <button id="nextLevelBtn" style="
                background: #7a9ba8;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            ">Continue to Vessel of First Light</button>
        `;
        overlay.appendChild(message);

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes expandRing {
                to {
                    width: 600px;
                    height: 600px;
                    opacity: 0;
                }
            }
            @keyframes fadeIn {
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(overlay);

        // Fade in overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);

        // Play win audio
        this.game.audioIntegration.playWinSequence();

        // Handle next level button
        setTimeout(() => {
            const nextLevelBtn = document.getElementById('nextLevelBtn');
            if (nextLevelBtn) {
                nextLevelBtn.addEventListener('click', () => {
                    this.transitionToNextLevel("Vessel of First Light");
                });
            }
        }, 2000);
    }

    showLevelCompletion(levelName, stats) {
        // Create completion overlay
        const overlay = document.createElement('div');
        overlay.id = 'levelCompletionOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(15, 25, 35, 0.9) 70%);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            font-family: 'Courier New', monospace;
            opacity: 0;
            transition: opacity 2s ease-in-out;
        `;

        // Create completion message
        const message = document.createElement('div');
        message.style.cssText = `
            font-size: 24px;
            text-align: center;
            margin-bottom: 30px;
            opacity: 0;
            animation: fadeIn 2s ease-in-out 1s forwards;
        `;
        message.innerHTML = `
            <div style="margin-bottom: 20px;">${levelName} Complete</div>
            <div style="font-size: 16px; margin-bottom: 15px;">Echoes: ${stats.echoes}</div>
            <div style="font-size: 16px; margin-bottom: 15px;">Harmonics: ${stats.harmonics}%</div>
            ${stats.packs ? `<div style="font-size: 16px; margin-bottom: 30px;">Packs Formed: ${stats.packs}</div>` : ''}
            <div style="font-size: 14px; margin-bottom: 40px; color: #FFD700;">Next: ${stats.nextLevel}</div>
            <button id="nextLevelBtn" style="
                background: #7a9ba8;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            ">Continue Journey</button>
        `;
        overlay.appendChild(message);

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(overlay);

        // Fade in overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);

        // Handle next level button
        setTimeout(() => {
            const nextLevelBtn = document.getElementById('nextLevelBtn');
            if (nextLevelBtn) {
                nextLevelBtn.addEventListener('click', () => {
                    this.transitionToNextLevel(stats.nextLevel);
                });
            }
        }, 2000);
    }

    transitionToNextLevel(nextLevelName) {
        // Create transition effect
        const transition = document.createElement('div');
        transition.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(255, 215, 0, 1) 0%, rgba(15, 25, 35, 1) 100%);
            border-radius: 50%;
            z-index: 3000;
            animation: levelTransition 2s ease-in-out forwards;
        `;

        const transitionStyle = document.createElement('style');
        transitionStyle.textContent = `
            @keyframes levelTransition {
                to {
                    width: 200vw;
                    height: 200vh;
                }
            }
        `;
        document.head.appendChild(transitionStyle);

        document.body.appendChild(transition);

        // Initialize the new level after transition
        setTimeout(() => {
            // Remove transition overlay
            if (transition.parentNode) {
                transition.parentNode.removeChild(transition);
            }
            
            // Remove any existing completion overlays
            const existingOverlay = document.getElementById('winOverlay');
            if (existingOverlay) {
                existingOverlay.parentNode.removeChild(existingOverlay);
            }
            
            const levelOverlay = document.getElementById('levelCompletionOverlay');
            if (levelOverlay) {
                levelOverlay.parentNode.removeChild(levelOverlay);
            }
            
            // Initialize the new level
            if (nextLevelName === "Vessel of First Light" && window.VesselOfFirstLight) {
                console.log('Initializing Vessel of First Light...');
                
                // Reset game state but don't reset the level system
                this.game.isGameWon = false;
                
                // Clear visual effects for fresh start
                this.game.visualEffects.glyphNodes = [];
                this.game.visualEffects.connections = [];
                this.game.visualEffects.particles = [];
                this.game.visualEffects.echoRings = [];
                
                // Initialize the new level
                this.game.currentLevel = new VesselOfFirstLight(this.game);
                
                // Update color scheme for plains environment
                this.updateColorSchemeForPlains();
                
                // Update UI
                this.updateUI();
                
                console.log('Vessel of First Light initialized successfully');
            } else {
                console.error('Level not found or not implemented:', nextLevelName);
                // Fallback to restart
                location.reload();
            }
        }, 2000);
    }

    highlightGlyphs(glyphs) {
        // Highlight suggested glyphs in the UI
        const buttons = document.querySelectorAll('.glyph-button');
        buttons.forEach(button => {
            if (glyphs.includes(button.textContent)) {
                button.style.background = 'rgba(255, 215, 0, 0.3)';
                button.style.borderColor = '#FFD700';
                button.style.color = '#FFD700';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    button.style.background = 'rgba(122, 155, 168, 0.2)';
                    button.style.borderColor = 'rgba(122, 155, 168, 0.4)';
                    button.style.color = '#7a9ba8';
                }, 3000);
            }
        });
    }

    updateColorSchemeForPlains() {
        // Update color scheme to reflect plains environment
        const plainsColors = {
            primary: '#D4AF37',      // Golden
            secondary: '#8B4513',    // Saddle brown
            accent: '#FFD700',       // Gold
            background: '#F5DEB3',   // Wheat
            text: '#654321'          // Dark brown
        };
        
        // Update status bar
        const statusBar = document.getElementById('statusBar');
        if (statusBar) {
            statusBar.style.background = 'rgba(139, 69, 19, 0.8)';
            statusBar.style.borderColor = 'rgba(212, 175, 55, 0.6)';
        }
        
        // Update harmonics bar
        const harmonicsBar = document.getElementById('harmonicsBar');
        if (harmonicsBar) {
            harmonicsBar.style.background = 'rgba(139, 69, 19, 0.6)';
            harmonicsBar.style.borderColor = 'rgba(212, 175, 55, 0.8)';
        }
        
        // Update harmonics fill
        const harmonicsFill = document.getElementById('harmonicsFill');
        if (harmonicsFill) {
            harmonicsFill.style.background = 'linear-gradient(90deg, #D4AF37, #FFD700)';
        }
        
        // Update harmonics text
        const harmonicsText = document.getElementById('harmonicsText');
        if (harmonicsText) {
            harmonicsText.style.color = '#654321';
        }
        
        // Update status text
        const status = document.getElementById('status');
        if (status) {
            status.style.color = '#D4AF37';
        }
        
        // Update info panel
        const infoPanel = document.getElementById('infoPanel');
        if (infoPanel) {
            infoPanel.style.background = 'rgba(139, 69, 19, 0.8)';
            infoPanel.style.borderColor = 'rgba(212, 175, 55, 0.6)';
        }
        
        // Update input area
        const inputArea = document.getElementById('inputArea');
        if (inputArea) {
            inputArea.style.background = 'rgba(139, 69, 19, 0.8)';
            inputArea.style.borderColor = 'rgba(212, 175, 55, 0.6)';
        }
        
        // Update glyph input
        const glyphInput = document.getElementById('glyphInput');
        if (glyphInput) {
            glyphInput.style.background = 'rgba(139, 69, 19, 0.6)';
            glyphInput.style.borderColor = 'rgba(212, 175, 55, 0.8)';
            glyphInput.style.color = '#D4AF37';
        }
        
        // Update glyph buttons
        const glyphButtons = document.querySelectorAll('.glyph-button');
        glyphButtons.forEach(button => {
            button.style.background = 'rgba(212, 175, 55, 0.2)';
            button.style.borderColor = 'rgba(212, 175, 55, 0.6)';
            button.style.color = '#D4AF37';
        });
        
        // Update info titles
        const infoTitles = document.querySelectorAll('.info-title');
        infoTitles.forEach(title => {
            title.style.color = '#D4AF37';
            title.style.borderBottomColor = 'rgba(212, 175, 55, 0.6)';
        });
        
        // Update echo memory
        const echoMemory = document.getElementById('echoMemory');
        if (echoMemory) {
            echoMemory.style.color = '#8B4513';
        }
        
        // Update lore fragment
        const loreFragment = document.getElementById('loreFragment');
        if (loreFragment) {
            loreFragment.style.color = '#D4AF37';
            loreFragment.style.background = 'rgba(212, 175, 55, 0.1)';
            loreFragment.style.borderLeftColor = '#D4AF37';
        }
        
        // Update aphorism display
        const aphorismDisplay = document.getElementById('aphorismDisplay');
        if (aphorismDisplay) {
            aphorismDisplay.style.background = 'rgba(139, 69, 19, 0.9)';
            aphorismDisplay.style.borderColor = 'rgba(212, 175, 55, 0.8)';
            aphorismDisplay.style.color = '#D4AF37';
        }
    }
} 