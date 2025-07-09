# Echo Morrow

A browser-based philosophical game exploring linguistic consciousness and collective intelligence through interactive glyph communication.

## Overview

Echo Morrow is an experimental game that combines color and sound with linguistic mechanics. Players communicate with entities in a variety of environments using glyphs, experiencing dynamic visual and audio synthesis.

## Game Mechanics

### Core Concept
- **Glyph Communication**: Players input three-character glyphs to communicate with entities
- **Echo Memory**: Each interaction builds a memory of echoes that influences the environment
- **Harmonic Resonance**: Successful communication increases harmonics, unlocking new possibilities
- **Collective Intelligence**: Later levels explore pack dynamics and collective consciousness

### Current Levels

#### Level 1: Whispergrove
- **Environment**: Mystical forest with root networks and canopy layers
- **Glyphs**: `ȹu`, `ʘa`, `kə`, `mni`
- **Entities**: Mycolith, Sibroot, Winnower
- **Goal**: Achieve 20+ echoes and 90%+ harmonics to transcend

#### Level 2: Vessel of First Light
- **Environment**: Vast plains with grass, wind, and dawn light
- **Glyphs**: `α`, `β`, `γ`, `δ` (wolf pack glyphs)
- **Mechanics**: Pack formation, collective harmonics, wolf entities
- **Goal**: Form 6+ packs and achieve 85%+ harmonics

## Technical Architecture

### Modular Design
The game is built with a modular architecture for maintainability and extensibility:

- **`game-core.js`**: Main game engine and loop
- **`visual-effects.js`**: Dynamic visual rendering system
- **`audio-integration.js`**: Web Audio API integration
- **`ui-manager.js`**: User interface management
- **`level-system.js`**: Level progression and win conditions
- **`entity-system.js`**: Entity behavior and interactions
- **`aphorisms.js`**: Philosophical aphorism system
- **`level-vessel.js`**: Second level implementation

### Key Features
- **Responsive Canvas**: Full viewport rendering with dynamic resizing
- **Particle Systems**: Dynamic visual effects for glyphs and interactions
- **Audio Synthesis**: Procedural audio generation for immersive experience
- **Color Schemes**: Environment-specific UI theming
- **Level Transitions**: Seamless progression between game states

## Installation & Running

### Prerequisites
- Modern web browser with Web Audio API support
- Local web server (for audio functionality)

### Quick Start
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd echo-morrow
   ```

2. Start a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have http-server installed)
   npx http-server
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## How to Play

### Basic Controls
- **Glyph Input**: Type three-character glyphs in the input field
- **Auto-submit**: Glyphs are automatically submitted when 3 characters are entered
- **Glyph Buttons**: Click the glyph buttons for quick input

### Gameplay Tips
1. **Experiment**: Try different glyph combinations to discover entity responses
2. **Pattern Recognition**: Notice how repeated patterns affect harmonics
3. **Environmental Awareness**: Watch how the forest/plains respond to your echoes
4. **Pack Formation**: In Level 2, learn to form packs with wolf glyphs

### Debug Features
- **Max Harmonics**: Instantly set harmonics to 100%
- **Trigger Win**: Skip to win condition for testing
- **Test Vessel Level**: Direct access to second level

## Philosophical Foundation

### Influences
- **Deleuze & Guattari**: *A Thousand Plateaus* concepts
- **Finnegans Wake**: Linguistic experimentation and aphorisms
- **Collective Intelligence**: Pack dynamics and group consciousness

### Themes Explored
- **Linguistic Consciousness**: How language shapes perception
- **Collective Intelligence**: The wisdom of groups vs. individuals
- **Environmental Interaction**: Human-nature communication
- **Memory and Echo**: How past interactions influence present experience

## Development

### Project Structure
```
echo-morrow/
├── index.html          # Main HTML file
├── game-core.js        # Core game engine
├── visual-effects.js   # Visual rendering system
├── audio-integration.js # Audio system
├── ui-manager.js       # UI management
├── level-system.js     # Level progression
├── entity-system.js    # Entity behaviors
├── aphorisms.js        # Aphorism system
├── level-vessel.js     # Second level
├── level-progression.md # Level design document
├── testlevel.txt       # Level specification
└── README.md          # This file
```

### Adding New Levels
1. Create a new level class following the pattern in `level-vessel.js`
2. Add level-specific visual effects in `visual-effects.js`
3. Update the transition logic in `ui-manager.js`
4. Add level-specific aphorisms in `aphorisms.js`

### Contributing
This is an experimental art project exploring the intersection of philosophy, linguistics, and interactive media. Contributions that expand the philosophical depth or technical sophistication are welcome.

## License

This project is released as an experimental art piece. Feel free to explore, modify, and build upon these concepts.

## Acknowledgments

- Inspired by the linguistic experiments of James Joyce
- Philosophical framework from Gilles Deleuze and Félix Guattari
- Technical inspiration from early interactive fiction and experimental games
- Web Audio API community for audio synthesis techniques

---

*"In the vast plains of consciousness, the pack teaches us that we are both one and many."* 
