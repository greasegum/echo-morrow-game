// Audio Integration System for Whispergrove
class AudioIntegration {
    constructor(game) {
        this.game = game;
        this.audioContext = null;
        this.masterGain = null;
        this.reverbGain = null;
        this.delayGain = null;
        this.ambientGain = null;
        
        // Audio state
        this.isAudioEnabled = false;
        this.baseFrequency = 220;
        this.harmonicSeries = [1, 2, 3, 5, 8, 13, 21];
        
        this.initAudio();
    }

    async initAudio() {
        try {
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create master gain
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            this.masterGain.connect(this.audioContext.destination);
            
            // Create reverb
            this.reverbGain = this.audioContext.createGain();
            this.reverbGain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            this.reverbGain.connect(this.masterGain);
            
            // Create delay
            this.delayGain = this.audioContext.createGain();
            this.delayGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            this.delayGain.connect(this.masterGain);
            
            // Create ambient gain
            this.ambientGain = this.audioContext.createGain();
            this.ambientGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            this.ambientGain.connect(this.masterGain);
            
            this.isAudioEnabled = true;
            console.log('Audio system initialized successfully');
            
            // Start ambient sounds
            this.startAmbientSounds();
            
        } catch (error) {
            console.error('Audio initialization failed:', error);
            this.isAudioEnabled = false;
        }
    }

    startAmbientSounds() {
        if (!this.isAudioEnabled) return;
        
        // Forest ambience
        this.createAmbientLayer('forest', 0.05, 0.1, 0.5);
        
        // Wind through leaves
        this.createAmbientLayer('wind', 0.03, 0.05, 0.3);
        
        // Distant echoes
        this.createAmbientLayer('echoes', 0.02, 0.08, 0.2);
    }

    createAmbientLayer(type, baseGain, variation, frequency) {
        if (!this.isAudioEnabled) return;
        
        const gainNode = this.audioContext.createGain();
        gainNode.gain.setValueAtTime(baseGain, this.audioContext.currentTime);
        gainNode.connect(this.ambientGain);
        
        const oscillator = this.audioContext.createOscillator();
        
        switch (type) {
            case 'forest':
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime);
                break;
            case 'wind':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(120, this.audioContext.currentTime);
                break;
            case 'echoes':
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);
                break;
        }
        
        // Add subtle modulation
        const lfo = this.audioContext.createOscillator();
        lfo.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        lfo.connect(gainNode.gain);
        lfo.start();
        
        oscillator.connect(gainNode);
        oscillator.start();
        
        // Stop after a while and restart
        setTimeout(() => {
            oscillator.stop();
            lfo.stop();
            this.createAmbientLayer(type, baseGain, variation, frequency);
        }, 10000 + Math.random() * 5000);
    }

    playGlyphEcho(glyph) {
        if (!this.isAudioEnabled) return;
        
        try {
            // Create main tone
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            // Set frequency based on glyph
            const baseFreq = this.getGlyphFrequency(glyph);
            oscillator.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);
            oscillator.type = 'sine';
            
            // Create envelope
            const now = this.audioContext.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
            
            // Add harmonics based on game state
            const harmonicGain = this.audioContext.createGain();
            harmonicGain.gain.setValueAtTime(this.game.level.harmonics * 0.5, now);
            
            // Create harmonic series
            this.harmonicSeries.forEach((harmonic, index) => {
                const harmonicOsc = this.audioContext.createOscillator();
                const harmonicGainNode = this.audioContext.createGain();
                
                harmonicOsc.frequency.setValueAtTime(baseFreq * harmonic, now);
                harmonicOsc.type = 'sine';
                
                harmonicGainNode.gain.setValueAtTime(0.1 / (index + 1), now);
                harmonicGainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
                
                harmonicOsc.connect(harmonicGainNode);
                harmonicGainNode.connect(harmonicGain);
                harmonicOsc.start(now);
                harmonicOsc.stop(now + 1.0);
            });
            
            // Connect to master
            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);
            harmonicGain.connect(this.masterGain);
            
            // Add reverb
            this.addReverb(gainNode, 0.3);
            
            // Add delay
            this.addDelay(gainNode, 0.2);
            
            oscillator.start(now);
            oscillator.stop(now + 1.0);
            
        } catch (error) {
            console.error('Error playing glyph echo:', error);
        }
    }

    getGlyphFrequency(glyph) {
        // Map glyphs to frequencies
        const glyphFreqs = {
            'ȹu': 220,  // A3
            'ʘa': 277,  // C#4
            'kə': 330,  // E4
            'mni': 440  // A4
        };
        
        return glyphFreqs[glyph] || 220;
    }

    addReverb(source, amount) {
        if (!this.isAudioEnabled) return;
        
        const reverbGain = this.audioContext.createGain();
        reverbGain.gain.setValueAtTime(amount, this.audioContext.currentTime);
        
        // Simple reverb using multiple delays
        for (let i = 0; i < 3; i++) {
            const delay = this.audioContext.createDelay();
            const delayGain = this.audioContext.createGain();
            
            delay.delayTime.setValueAtTime(0.1 + i * 0.05, this.audioContext.currentTime);
            delayGain.gain.setValueAtTime(0.3 / (i + 1), this.audioContext.currentTime);
            
            source.connect(delay);
            delay.connect(delayGain);
            delayGain.connect(reverbGain);
        }
        
        reverbGain.connect(this.reverbGain);
    }

    addDelay(source, amount) {
        if (!this.isAudioEnabled) return;
        
        const delay = this.audioContext.createDelay();
        const delayGain = this.audioContext.createGain();
        
        delay.delayTime.setValueAtTime(0.3, this.audioContext.currentTime);
        delayGain.gain.setValueAtTime(amount, this.audioContext.currentTime);
        
        source.connect(delay);
        delay.connect(delayGain);
        delayGain.connect(this.delayGain);
    }

    playEntityResponse(entity, response) {
        if (!this.isAudioEnabled) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            // Different sounds for different responses
            let frequency, type, duration;
            
            switch (response) {
                case 'spore-pulse':
                    frequency = 150;
                    type = 'sawtooth';
                    duration = 0.8;
                    break;
                case 'pulse-rhythm':
                    frequency = 200;
                    type = 'square';
                    duration = 1.2;
                    break;
                case 'vanish':
                    frequency = 300;
                    type = 'triangle';
                    duration = 0.5;
                    break;
                default:
                    frequency = 220;
                    type = 'sine';
                    duration = 1.0;
            }
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = type;
            
            const now = this.audioContext.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.4, now + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            this.addReverb(gainNode, 0.4);
            
            oscillator.start(now);
            oscillator.stop(now + duration);
            
        } catch (error) {
            console.error('Error playing entity response:', error);
        }
    }

    playHarmonicProgression() {
        if (!this.isAudioEnabled) return;
        
        try {
            const harmonics = this.game.level.harmonics;
            
            // Play a chord based on harmonics
            const chordFrequencies = [
                220 * (1 + harmonics * 0.5),  // Root
                277 * (1 + harmonics * 0.3),  // Third
                330 * (1 + harmonics * 0.4)   // Fifth
            ];
            
            chordFrequencies.forEach((freq, index) => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                oscillator.type = 'sine';
                
                const now = this.audioContext.currentTime;
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.1, now + 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
                
                oscillator.connect(gainNode);
                gainNode.connect(this.masterGain);
                
                oscillator.start(now);
                oscillator.stop(now + 2.0);
            });
            
        } catch (error) {
            console.error('Error playing harmonic progression:', error);
        }
    }

    playWinSequence() {
        if (!this.isAudioEnabled) return;
        
        try {
            // Play ascending arpeggio
            const frequencies = [220, 277, 330, 440, 554, 659, 880];
            const now = this.audioContext.currentTime;
            
            frequencies.forEach((freq, index) => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.frequency.setValueAtTime(freq, now);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, now + index * 0.1);
                gainNode.gain.linearRampToValueAtTime(0.3, now + index * 0.1 + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + index * 0.1 + 1.0);
                
                oscillator.connect(gainNode);
                gainNode.connect(this.masterGain);
                
                oscillator.start(now + index * 0.1);
                oscillator.stop(now + index * 0.1 + 1.0);
            });
            
        } catch (error) {
            console.error('Error playing win sequence:', error);
        }
    }

    playWolfSound(wolfName) {
        if (!this.isAudioEnabled) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            // Different sounds for different wolves
            let frequency, type, duration, modulation;
            
            switch (wolfName) {
                case 'Alpha Wolf':
                    frequency = 120;
                    type = 'sawtooth';
                    duration = 1.5;
                    modulation = 0.1;
                    break;
                case 'Beta Pack':
                    frequency = 180;
                    type = 'square';
                    duration = 1.0;
                    modulation = 0.05;
                    break;
                case 'Lone Wolf':
                    frequency = 140;
                    type = 'triangle';
                    duration = 2.0;
                    modulation = 0.15;
                    break;
                case 'Shadow Pack':
                    frequency = 100;
                    type = 'sine';
                    duration = 0.8;
                    modulation = 0.2;
                    break;
                default:
                    frequency = 150;
                    type = 'sawtooth';
                    duration = 1.0;
                    modulation = 0.1;
            }
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = type;
            
            // Add modulation for wolf-like sound
            const lfo = this.audioContext.createOscillator();
            lfo.frequency.setValueAtTime(5, this.audioContext.currentTime);
            lfo.connect(oscillator.frequency);
            lfo.start();
            lfo.stop(this.audioContext.currentTime + duration);
            
            const now = this.audioContext.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            this.addReverb(gainNode, 0.5);
            
            oscillator.start(now);
            oscillator.stop(now + duration);
            
        } catch (error) {
            console.error('Error playing wolf sound:', error);
        }
    }

    updateAudioForHarmonics() {
        if (!this.isAudioEnabled) return;
        
        const harmonics = this.game.level.harmonics;
        
        // Adjust master gain based on harmonics
        this.masterGain.gain.setValueAtTime(0.2 + harmonics * 0.3, this.audioContext.currentTime);
        
        // Adjust reverb based on harmonics
        this.reverbGain.gain.setValueAtTime(0.1 + harmonics * 0.3, this.audioContext.currentTime);
        
        // Adjust ambient sounds
        this.ambientGain.gain.setValueAtTime(0.05 + harmonics * 0.15, this.audioContext.currentTime);
    }
} 