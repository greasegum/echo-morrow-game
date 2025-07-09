// Aphorisms System for Echo Morrow
// Loosely inspired by Finnegans Wake's dense, multilingual wordplay

class AphorismsSystem {
    constructor() {
        this.aphorisms = this.initializeAphorisms();
        this.currentAphorism = null;
        this.aphorismHistory = [];
    }

    initializeAphorisms() {
        return {
            // Forest and Nature Aphorisms
            forest: [
                "The roots speak in pairs, the leaves in tongues unknown.",
                "Mni knows the thirst, ȹu knows the hunger, together they know the way.",
                "When ʘa is called, silence follows like a shadow.",
                "The mycelium remembers what the tree forgets.",
                "In the grove of whispers, every echo is a memory.",
                "The forest dreams in glyphs, wakes in echoes.",
                "Beneath the bark, the heartwood hums with ancient songs.",
                "Where roots entwine, wisdom flows like water.",
                "The canopy catches light, the roots catch truth.",
                "In the space between breaths, the forest speaks."
            ],

            // Communication and Language
            language: [
                "Words are glyphs, glyphs are echoes, echoes are truth.",
                "The tongue that speaks in glyphs speaks to the soul.",
                "Silence is the space between meanings.",
                "Every utterance is a ripple in the pool of understanding.",
                "The mouth shapes sound, the mind shapes meaning.",
                "In the beginning was the glyph, and the glyph was with the forest.",
                "Language is the river, glyphs are the stones that shape its flow.",
                "To speak in glyphs is to speak the language of becoming.",
                "The echo carries the voice, the voice carries the truth.",
                "Words without glyphs are shadows without substance."
            ],

            // Consciousness and Being
            consciousness: [
                "You are no longer listening. You are remembering.",
                "The self is a river, always flowing, never the same.",
                "In the mirror of consciousness, all faces are one face.",
                "To become is to cease being what you were.",
                "The mind is a forest, thoughts are its creatures.",
                "Consciousness is the space between waking and dreaming.",
                "I am the echo, you are the voice, we are the song.",
                "The eye that sees itself sees nothing and everything.",
                "In the depths of awareness, all boundaries dissolve.",
                "To know is to become what you know."
            ],

            // Time and Memory
            time: [
                "Time flows like water, memory flows like light.",
                "The past is a river, the future is a sea, the present is the shore.",
                "Every moment contains all moments, every echo all echoes.",
                "Memory is the root, time is the branch, now is the fruit.",
                "The clock ticks in circles, the heart beats in spirals.",
                "Yesterday's echo becomes tomorrow's voice.",
                "In the garden of time, all flowers bloom at once.",
                "The moment you remember is the moment you become.",
                "Time is the space between breaths, memory is the breath itself.",
                "The future is written in the past, the past in the future."
            ],

            // Transformation and Becoming
            transformation: [
                "To change is to become what you always were.",
                "The caterpillar dreams of flight, the butterfly remembers crawling.",
                "In the space between forms, pure potential exists.",
                "Every transformation is a return to the beginning.",
                "The mask reveals more than it conceals.",
                "To become other is to become more yourself.",
                "The shape that changes is the shape that endures.",
                "In metamorphosis, the old form becomes the new form's memory.",
                "The self that transforms is the self that remains.",
                "Becoming is the art of unlearning what you never learned."
            ],

            // Connection and Unity
            connection: [
                "All things are connected, all connections are one.",
                "The web of existence has no center, no edge, only connection.",
                "To touch one part is to touch the whole.",
                "The individual is the collective, the collective is the individual.",
                "In the network of being, every node is a mirror.",
                "The thread that connects all things is invisible but unbreakable.",
                "To understand one is to understand all.",
                "The voice that speaks alone speaks for everyone.",
                "In the chorus of existence, every voice is essential.",
                "The pattern that connects is the pattern that creates."
            ],

            // Mystery and the Unknown
            mystery: [
                "The known is a door, the unknown is the key.",
                "In the depths of mystery, all questions become one question.",
                "The answer lies in the space between questions.",
                "To seek is to find what you never lost.",
                "The mystery that cannot be solved must be lived.",
                "In the heart of the unknown, all possibilities exist.",
                "The question that has no answer is the answer itself.",
                "To embrace mystery is to embrace infinity.",
                "The unknown is the birthplace of all knowing.",
                "In the realm of mystery, every step is a revelation."
            ],

            // Harmony and Resonance
            harmony: [
                "When harmonics align, the universe sings.",
                "The resonance that connects is the resonance that creates.",
                "In perfect harmony, all voices become one voice.",
                "The frequency that heals is the frequency that reveals.",
                "When echoes meet, new worlds are born.",
                "The vibration that unites is the vibration that transforms.",
                "In the space of resonance, all boundaries dissolve.",
                "The harmony that flows is the harmony that knows.",
                "When frequencies align, truth becomes visible.",
                "The resonance of being is the music of becoming."
            ]
        };
    }

    getAphorism(category = null, context = null) {
        let availableCategories = Object.keys(this.aphorisms);
        
        if (category && this.aphorisms[category]) {
            availableCategories = [category];
        }
        
        const selectedCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        const categoryAphorisms = this.aphorisms[selectedCategory];
        const aphorism = categoryAphorisms[Math.floor(Math.random() * categoryAphorisms.length)];
        
        this.currentAphorism = {
            text: aphorism,
            category: selectedCategory,
            context: context,
            timestamp: Date.now()
        };
        
        this.aphorismHistory.push(this.currentAphorism);
        
        // Keep only last 20 aphorisms
        if (this.aphorismHistory.length > 20) {
            this.aphorismHistory.shift();
        }
        
        return this.currentAphorism;
    }

    getContextualAphorism(gameState) {
        // Choose aphorism based on current game state
        const harmonics = gameState.harmonics || 0;
        const echoCount = gameState.echoMemory?.length || 0;
        const mood = gameState.mood || "Disoriented";
        
        if (harmonics > 0.9) {
            return this.getAphorism('harmony');
        } else if (harmonics > 0.7) {
            return this.getAphorism('consciousness');
        } else if (harmonics > 0.5) {
            return this.getAphorism('connection');
        } else if (echoCount > 15) {
            return this.getAphorism('transformation');
        } else if (echoCount > 10) {
            return this.getAphorism('language');
        } else if (echoCount > 5) {
            return this.getAphorism('forest');
        } else {
            return this.getAphorism('mystery');
        }
    }

    getEntityAphorism(entityName, response) {
        // Get aphorisms specific to entity interactions
        const entityAphorisms = {
            'Mycolith': [
                "The fungal mind remembers what the tree forgets.",
                "In the network of spores, every connection is a memory.",
                "The mycelium speaks in whispers that echo through the soil."
            ],
            'Sibroot': [
                "The root that connects is the root that remembers.",
                "In the underground network, all voices become one voice.",
                "The sibroot knows the language of the deep earth."
            ],
            'Winnower': [
                "In silence, all meanings become possible.",
                "The winnower separates truth from illusion.",
                "Where the winnower walks, clarity follows."
            ],
            'Cryptoglyph': [
                "The hidden glyph reveals what the visible conceals.",
                "In the space between symbols, truth emerges.",
                "The cryptoglyph speaks the language of pure meaning."
            ]
        };
        
        if (entityAphorisms[entityName]) {
            const aphorisms = entityAphorisms[entityName];
            return aphorisms[Math.floor(Math.random() * aphorisms.length)];
        }
        
        return this.getAphorism('mystery').text;
    }

    getWinAphorism() {
        const winAphorisms = [
            "You are no longer listening. You are remembering.",
            "The forest has taught you its language, and you have taught it yours.",
            "In the space between understanding and being, you have found your voice.",
            "The echoes have become your voice, your voice has become the forest.",
            "You have learned to speak with the roots, and the roots have learned to speak with you.",
            "The harmonics that flow through you now flow through all things.",
            "You are the echo and the voice, the listener and the speaker.",
            "The patterns you have learned are the patterns that create.",
            "In the grove of whispers, you have found your true voice.",
            "The forest remembers your name, and you remember the forest's song."
        ];
        
        return winAphorisms[Math.floor(Math.random() * winAphorisms.length)];
    }

    getTransitionAphorism(fromLevel, toLevel) {
        const transitionAphorisms = [
            "The path between worlds is paved with echoes.",
            "Every ending is a beginning, every beginning an ending.",
            "The threshold between realms is the space of becoming.",
            "In the space between levels, all possibilities exist.",
            "The journey continues, the song evolves, the story unfolds.",
            "From forest to plain, from plain to void, from void to infinity.",
            "The echo that carries you forward is the echo that brought you here.",
            "In the space of transition, you are both here and there.",
            "The path that leads away is the path that leads home.",
            "Every step forward is a step deeper into understanding."
        ];
        
        return transitionAphorisms[Math.floor(Math.random() * transitionAphorisms.length)];
    }

    getAphorismHistory() {
        return this.aphorismHistory;
    }

    getCurrentAphorism() {
        return this.currentAphorism;
    }
} 