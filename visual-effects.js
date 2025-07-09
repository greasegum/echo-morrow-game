// Visual Effects System for Whispergrove
class VisualEffectsSystem {
    constructor(game) {
        this.game = game;
        this.ctx = game.ctx;
        this.canvas = game.canvas;
        
        // Visual state
        this.particles = [];
        this.glyphNodes = [];
        this.connections = [];
        this.echoRings = [];
        this.lightRays = [];
        this.energyOrbs = [];
        this.rootNetwork = [];
        this.canopyLayers = [];
        
        // Animation properties
        this.time = 0;
        this.pulsePhase = 0;
        this.ripplePhase = 0;
        
        // Additional atmospheric effects
        this.fogLayers = [];
        this.groundTexture = [];
        this.floatingParticles = [];
        
        this.initVisuals();
    }

    initVisuals() {
        // Initialize root network
        this.generateRootNetwork();
        
        // Initialize canopy layers
        this.generateCanopyLayers();
        
        // Initialize energy orbs
        this.generateEnergyOrbs();
        
        // Initialize light rays
        this.generateLightRays();
        
        // Initialize atmospheric effects
        this.generateFogLayers();
        this.generateGroundTexture();
        this.generateFloatingParticles();
    }

    generateRootNetwork() {
        this.rootNetwork = [];
        // Create more complex root system
        for (let i = 0; i < 25; i++) {
            this.rootNetwork.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height - Math.random() * 300,
                length: 60 + Math.random() * 150,
                angle: Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 2,
                thickness: 1 + Math.random() * 4,
                pulse: Math.random() * Math.PI * 2,
                branches: Math.floor(Math.random() * 3),
                intensity: 0.3
            });
        }
        
        // Add some horizontal roots
        for (let i = 0; i < 8; i++) {
            this.rootNetwork.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height - 50 - Math.random() * 100,
                length: 80 + Math.random() * 120,
                angle: (Math.random() - 0.5) * Math.PI / 3,
                thickness: 2 + Math.random() * 3,
                pulse: Math.random() * Math.PI * 2,
                branches: 0,
                intensity: 0.3,
                isHorizontal: true
            });
        }
    }

    generateCanopyLayers() {
        this.canopyLayers = [];
        // Create multiple detailed canopy layers
        for (let layer = 0; layer < 5; layer++) {
            const layerData = [];
            const layerCount = 15 + layer * 5; // More leaves in higher layers
            
            for (let i = 0; i < layerCount; i++) {
                layerData.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * 80 + layer * 40,
                    size: 15 + Math.random() * 35 + layer * 5,
                    opacity: 0.08 + Math.random() * 0.15 + layer * 0.02,
                    sway: Math.random() * Math.PI * 2,
                    intensity: 0.5,
                    type: Math.random() > 0.7 ? 'needle' : 'leaf'
                });
            }
            this.canopyLayers.push(layerData);
        }
    }

    generateEnergyOrbs() {
        this.energyOrbs = [];
        // Create more varied energy orbs
        for (let i = 0; i < 12; i++) {
            this.energyOrbs.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: 2 + Math.random() * 10,
                speed: 0.3 + Math.random() * 2.0,
                angle: Math.random() * Math.PI * 2,
                pulse: Math.random() * Math.PI * 2,
                color: `hsl(${180 + Math.random() * 80}, 70%, ${50 + Math.random() * 30}%)`,
                trail: [],
                maxTrailLength: 5 + Math.floor(Math.random() * 8)
            });
        }
    }

    generateLightRays() {
        this.lightRays = [];
        // Create more atmospheric light rays
        for (let i = 0; i < 8; i++) {
            this.lightRays.push({
                x: Math.random() * this.canvas.width,
                y: 0,
                length: 150 + Math.random() * 250,
                angle: Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 8,
                opacity: 0.05 + Math.random() * 0.15,
                sway: Math.random() * Math.PI * 2,
                width: 1 + Math.random() * 3,
                intensity: 0.5
            });
        }
    }

    generateFogLayers() {
        this.fogLayers = [];
        // Create multiple fog layers for depth
        for (let layer = 0; layer < 3; layer++) {
            const fogLayer = [];
            for (let i = 0; i < 20; i++) {
                fogLayer.push({
                    x: Math.random() * this.canvas.width,
                    y: this.canvas.height - 100 - layer * 50 + Math.random() * 100,
                    size: 50 + Math.random() * 100,
                    opacity: 0.02 + Math.random() * 0.03,
                    drift: Math.random() * 0.5,
                    pulse: Math.random() * Math.PI * 2
                });
            }
            this.fogLayers.push(fogLayer);
        }
    }

    generateGroundTexture() {
        this.groundTexture = [];
        // Create ground texture elements
        for (let i = 0; i < 40; i++) {
            this.groundTexture.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height - 20 + Math.random() * 40,
                size: 2 + Math.random() * 6,
                opacity: 0.1 + Math.random() * 0.2,
                type: Math.random() > 0.7 ? 'moss' : 'stone',
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    generateFloatingParticles() {
        this.floatingParticles = [];
        // Create floating atmospheric particles
        for (let i = 0; i < 30; i++) {
            this.floatingParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: 1 + Math.random() * 3,
                opacity: 0.1 + Math.random() * 0.2,
                life: 1.0,
                decay: 0.001,
                color: `hsl(${180 + Math.random() * 40}, 30%, 70%)`
            });
        }
    }

    generatePlainsEnvironment() {
        // Clear existing environment
        this.rootNetwork = [];
        this.canopyLayers = [];
        this.fogLayers = [];
        this.groundTexture = [];
        
        // Generate plains-specific elements
        this.generateGrassPlains();
        this.generateWindEffects();
        this.generateDawnLight();
        this.generateWolfTracks();
    }

    generateGrassPlains() {
        this.groundTexture = [];
        // Create grass tufts across the plains
        for (let i = 0; i < 60; i++) {
            this.groundTexture.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height - 50 + Math.random() * 100,
                size: 3 + Math.random() * 8,
                opacity: 0.2 + Math.random() * 0.3,
                type: 'grass',
                sway: Math.random() * Math.PI * 2,
                height: 10 + Math.random() * 30
            });
        }
    }

    generateWindEffects() {
        this.windParticles = [];
        // Create wind particles that move across the plains
        for (let i = 0; i < 40; i++) {
            this.windParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: 1 + Math.random() * 2,
                vy: (Math.random() - 0.5) * 0.5,
                size: 1 + Math.random() * 3,
                opacity: 0.1 + Math.random() * 0.2,
                life: 1.0,
                decay: 0.005
            });
        }
    }

    generateDawnLight() {
        this.dawnRays = [];
        // Create dawn light rays
        for (let i = 0; i < 6; i++) {
            this.dawnRays.push({
                x: Math.random() * this.canvas.width,
                y: 0,
                length: 200 + Math.random() * 300,
                angle: Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 4,
                opacity: 0.1 + Math.random() * 0.2,
                color: `hsl(${30 + Math.random() * 20}, 70%, 60%)`,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    generateWolfTracks() {
        this.wolfTracks = [];
        // Create wolf tracks across the plains
        for (let i = 0; i < 8; i++) {
            const track = {
                x: Math.random() * this.canvas.width,
                y: this.canvas.height - 20 + Math.random() * 60,
                length: 50 + Math.random() * 100,
                angle: (Math.random() - 0.5) * Math.PI / 2,
                opacity: 0.3 + Math.random() * 0.3,
                age: Math.random()
            };
            this.wolfTracks.push(track);
        }
    }

    createGlyphNode(glyph) {
        const node = {
            x: 100 + Math.random() * (this.canvas.width - 200),
            y: 100 + Math.random() * (this.canvas.height - 200),
            glyph: glyph,
            size: 30,
            pulse: 0,
            connections: [],
            age: 0
        };
        
        this.glyphNodes.push(node);
        
        // Create particles around the node
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: node.x,
                y: node.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1.0,
                decay: 0.02,
                color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`,
                size: 2 + Math.random() * 4
            });
        }
    }

    createConnections() {
        if (this.glyphNodes.length < 2) return;
        
        // Connect recent nodes
        const recentNodes = this.glyphNodes.slice(-3);
        for (let i = 0; i < recentNodes.length - 1; i++) {
            const connection = {
                from: recentNodes[i],
                to: recentNodes[i + 1],
                strength: 1.0,
                pulse: 0
            };
            this.connections.push(connection);
        }
    }

    createEchoRing(glyph) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        this.echoRings.push({
            x: centerX,
            y: centerY,
            radius: 0,
            maxRadius: 200,
            speed: 3,
            opacity: 0.8,
            color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`
        });
    }

    createPackFormationEffect(pack) {
        // Create visual effect for pack formation
        const centerX = pack.position.x * this.canvas.width;
        const centerY = pack.position.y * this.canvas.height;
        
        // Create expanding ring
        this.echoRings.push({
            x: centerX,
            y: centerY,
            radius: 0,
            maxRadius: 150,
            speed: 4,
            opacity: 0.9,
            color: `hsl(${45 + Math.random() * 30}, 80%, 60%)`
        });
        
        // Create pack particles
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 1.0,
                decay: 0.015,
                color: `hsl(${45 + Math.random() * 30}, 70%, 60%)`,
                size: 3 + Math.random() * 5
            });
        }
        
        // Create pack glyph nodes
        pack.members.forEach((member, index) => {
            const angle = (index / pack.members.length) * Math.PI * 2;
            const radius = 60;
            const node = {
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius,
                glyph: member,
                size: 25,
                pulse: 0,
                connections: [],
                age: 0
            };
            this.glyphNodes.push(node);
        });
    }

    createEchoMirrorEffect(glyph) {
        // Create mirror effect for shadow pack
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Create mirror particles
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1.0,
                decay: 0.02,
                color: `hsl(${200 + Math.random() * 40}, 60%, 50%)`,
                size: 2 + Math.random() * 4
            });
        }
        
        // Create mirror glyph node
        const node = {
            x: centerX + (Math.random() - 0.5) * 100,
            y: centerY + (Math.random() - 0.5) * 100,
            glyph: glyph,
            size: 28,
            pulse: 0,
            connections: [],
            age: 0
        };
        this.glyphNodes.push(node);
    }

    updateParticles() {
        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.size *= 0.99;
            return particle.life > 0;
        });

        // Update glyph nodes
        this.glyphNodes.forEach(node => {
            node.pulse += 0.1;
            node.age += 0.01;
        });

        // Update connections
        this.connections.forEach(conn => {
            conn.pulse += 0.05;
        });

        // Update echo rings
        this.echoRings = this.echoRings.filter(ring => {
            ring.radius += ring.speed;
            ring.opacity *= 0.98;
            return ring.radius < ring.maxRadius;
        });

        // Update energy orbs
        this.energyOrbs.forEach(orb => {
            orb.x += Math.cos(orb.angle) * orb.speed;
            orb.y += Math.sin(orb.angle) * orb.speed;
            orb.pulse += 0.05;
            
            // Bounce off edges
            if (orb.x < 0 || orb.x > this.canvas.width) orb.angle = Math.PI - orb.angle;
            if (orb.y < 0 || orb.y > this.canvas.height) orb.angle = -orb.angle;
        });

        // Update light rays
        this.lightRays.forEach(ray => {
            ray.sway += 0.01;
        });

        // Update root network
        this.rootNetwork.forEach(root => {
            root.pulse += 0.02;
        });

        // Update canopy layers
        this.canopyLayers.forEach(layer => {
            layer.forEach(leaf => {
                leaf.sway += 0.01;
            });
        });
        
        // Update fog layers
        this.fogLayers.forEach(layer => {
            layer.forEach(fog => {
                fog.x += fog.drift;
                fog.pulse += 0.005;
                if (fog.x > this.canvas.width + fog.size) {
                    fog.x = -fog.size;
                }
            });
        });
        
        // Update ground texture
        this.groundTexture.forEach(texture => {
            texture.pulse += 0.02;
        });
        
        // Update floating particles
        this.floatingParticles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
        
        // Update wind particles
        if (this.windParticles) {
            this.windParticles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life -= particle.decay;
                
                // Reset particles that go off screen
                if (particle.x > this.canvas.width) {
                    particle.x = -10;
                    particle.y = Math.random() * this.canvas.height;
                    particle.life = 1.0;
                }
            });
        }
        
        // Update dawn rays
        if (this.dawnRays) {
            this.dawnRays.forEach(ray => {
                ray.pulse += 0.01;
            });
        }
        
        // Update grass sway
        this.groundTexture.forEach(grass => {
            if (grass.type === 'grass') {
                grass.sway += 0.02;
            }
        });
    }

    render() {
        try {
            // Check if we're in plains environment
            const isPlainsEnvironment = this.game.currentLevel && this.game.currentLevel.name === "Vessel of First Light";
            
            if (isPlainsEnvironment) {
                // Plains environment rendering
                this.ctx.fillStyle = 'rgba(245, 222, 179, 0.1)'; // Wheat background
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                
                // Render plains-specific elements first
                this.renderGrassPlains();
                this.renderWindEffects();
                this.renderDawnLight();
                this.renderWolfTracks();
                
                // Render some forest elements with reduced opacity
                this.ctx.globalAlpha = 0.3;
                this.renderGroundTexture();
                this.renderFogLayers();
                this.ctx.globalAlpha = 1.0;
                
                // Don't render forest-specific elements
            } else {
                // Forest environment rendering
                this.ctx.fillStyle = 'rgba(15, 25, 35, 0.1)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                // Render ground texture first (background)
                this.renderGroundTexture();
                
                // Render root network
                this.renderRootNetwork();
                
                // Render fog layers (middle ground)
                this.renderFogLayers();
                
                // Render canopy layers
                this.renderCanopyLayers();
                
                // Render light rays
                this.renderLightRays();
                
                // Render floating particles
                this.renderFloatingParticles();
            }
            
            // Render common elements
            this.renderEnergyOrbs();
            this.renderConnections();
            this.renderGlyphNodes();
            this.renderParticles();
            this.renderEchoRings();
            
        } catch (error) {
            console.error('Rendering error:', error);
        }
    }

    renderRootNetwork() {
        this.ctx.strokeStyle = `rgba(122, 155, 168, ${0.3 + 0.2 * Math.sin(this.game.level.harmonics * Math.PI)})`;
        this.ctx.lineWidth = 2;
        
        this.rootNetwork.forEach(root => {
            this.ctx.save();
            this.ctx.translate(root.x, root.y);
            this.ctx.rotate(root.angle);
            
            const pulse = Math.sin(root.pulse + this.game.time * 0.001);
            const intensity = root.intensity || 0.3;
            this.ctx.strokeStyle = `rgba(122, 155, 168, ${(0.2 + 0.1 * pulse) * intensity})`;
            this.ctx.lineWidth = root.thickness;
            
            // Draw main root
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(0, -root.length);
            this.ctx.stroke();
            
            // Draw branches if any
            if (root.branches > 0) {
                for (let i = 0; i < root.branches; i++) {
                    const branchY = -(root.length * (0.3 + i * 0.2));
                    const branchLength = root.length * 0.4;
                    const branchAngle = (Math.random() - 0.5) * Math.PI / 3;
                    
                    this.ctx.save();
                    this.ctx.translate(0, branchY);
                    this.ctx.rotate(branchAngle);
                    this.ctx.lineWidth = root.thickness * 0.6;
                    this.ctx.strokeStyle = `rgba(122, 155, 168, ${(0.15 + 0.05 * pulse) * intensity})`;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, 0);
                    this.ctx.lineTo(0, -branchLength);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
            
            this.ctx.restore();
        });
    }

    renderCanopyLayers() {
        this.canopyLayers.forEach((layer, layerIndex) => {
            layer.forEach(leaf => {
                const sway = Math.sin(leaf.sway) * 3;
                const pulse = Math.sin(this.game.time * 0.001 + leaf.sway) * 0.1;
                const intensity = leaf.intensity || 0.5;
                
                this.ctx.save();
                this.ctx.translate(leaf.x + sway, leaf.y);
                this.ctx.globalAlpha = (leaf.opacity + pulse) * intensity;
                
                // Different leaf types
                if (leaf.type === 'needle') {
                    this.ctx.fillStyle = `hsl(${100 + layerIndex * 15}, 50%, 25%)`;
                    this.ctx.strokeStyle = `hsl(${100 + layerIndex * 15}, 50%, 35%)`;
                    this.ctx.lineWidth = 1;
                    
                    // Draw needle shape
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, -leaf.size);
                    this.ctx.lineTo(leaf.size * 0.3, 0);
                    this.ctx.lineTo(0, leaf.size);
                    this.ctx.lineTo(-leaf.size * 0.3, 0);
                    this.ctx.closePath();
                    this.ctx.fill();
                    this.ctx.stroke();
                } else {
                    this.ctx.fillStyle = `hsl(${120 + layerIndex * 20}, 40%, 30%)`;
                    
                    // Draw leaf shape
                    this.ctx.beginPath();
                    this.ctx.ellipse(0, 0, leaf.size, leaf.size * 0.6, 0, 0, Math.PI * 2);
                    this.ctx.fill();
                    
                    // Add leaf vein
                    this.ctx.strokeStyle = `hsl(${120 + layerIndex * 20}, 40%, 20%)`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, -leaf.size * 0.5);
                    this.ctx.lineTo(0, leaf.size * 0.5);
                    this.ctx.stroke();
                }
                
                this.ctx.restore();
            });
        });
    }

    renderLightRays() {
        this.lightRays.forEach(ray => {
            const sway = Math.sin(ray.sway) * 8;
            const intensity = ray.intensity || 0.5;
            
            this.ctx.save();
            this.ctx.translate(ray.x + sway, ray.y);
            this.ctx.rotate(ray.angle);
            this.ctx.globalAlpha = ray.opacity * intensity;
            
            // Create more realistic light ray with gradient
            const gradient = this.ctx.createLinearGradient(0, 0, 0, -ray.length);
            gradient.addColorStop(0, 'rgba(255, 255, 200, 0.4)');
            gradient.addColorStop(0.3, 'rgba(255, 255, 200, 0.2)');
            gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(-ray.width, -ray.length, ray.width * 2, ray.length);
            
            this.ctx.restore();
        });
    }

    renderEnergyOrbs() {
        this.energyOrbs.forEach(orb => {
            const pulse = Math.sin(orb.pulse) * 0.3;
            
            // Update trail
            orb.trail.push({ x: orb.x, y: orb.y });
            if (orb.trail.length > orb.maxTrailLength) {
                orb.trail.shift();
            }
            
            this.ctx.save();
            
            // Draw trail
            if (orb.trail.length > 1) {
                this.ctx.strokeStyle = orb.color;
                this.ctx.lineWidth = 2;
                this.ctx.globalAlpha = 0.3;
                this.ctx.beginPath();
                this.ctx.moveTo(orb.trail[0].x, orb.trail[0].y);
                for (let i = 1; i < orb.trail.length; i++) {
                    this.ctx.lineTo(orb.trail[i].x, orb.trail[i].y);
                }
                this.ctx.stroke();
            }
            
            // Draw orb glow
            this.ctx.globalAlpha = 0.4 + pulse;
            const gradient = this.ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * 3);
            gradient.addColorStop(0, orb.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(orb.x, orb.y, orb.radius * 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw orb core
            this.ctx.fillStyle = orb.color;
            this.ctx.globalAlpha = 0.8 + pulse;
            this.ctx.beginPath();
            this.ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw inner glow
            this.ctx.globalAlpha = 0.6;
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(orb.x - orb.radius * 0.3, orb.y - orb.radius * 0.3, orb.radius * 0.4, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    renderConnections() {
        this.connections.forEach(conn => {
            const pulse = Math.sin(conn.pulse) * 0.3;
            const strength = conn.strength + pulse;
            
            this.ctx.strokeStyle = `rgba(122, 155, 168, ${0.4 * strength})`;
            this.ctx.lineWidth = 2 * strength;
            
            this.ctx.beginPath();
            this.ctx.moveTo(conn.from.x, conn.from.y);
            this.ctx.lineTo(conn.to.x, conn.to.y);
            this.ctx.stroke();
        });
    }

    renderGlyphNodes() {
        this.glyphNodes.forEach(node => {
            const pulse = Math.sin(node.pulse) * 0.2;
            const size = node.size * (1 + pulse);
            
            // Aura
            this.ctx.save();
            this.ctx.globalAlpha = 0.3;
            const gradient = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 2);
            gradient.addColorStop(0, 'rgba(122, 155, 168, 0.5)');
            gradient.addColorStop(1, 'rgba(122, 155, 168, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, size * 2, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            // Node background
            this.ctx.fillStyle = 'rgba(15, 25, 35, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Glyph text
            this.ctx.fillStyle = `hsl(${180 + node.age * 50}, 70%, 60%)`;
            this.ctx.font = `${size * 0.8}px 'Courier New', monospace`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(node.glyph, node.x, node.y);
        });
    }

    renderParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    renderEchoRings() {
        this.echoRings.forEach(ring => {
            this.ctx.save();
            this.ctx.globalAlpha = ring.opacity;
            this.ctx.strokeStyle = ring.color;
            this.ctx.lineWidth = 3;
            
            this.ctx.beginPath();
            this.ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.restore();
        });
    }

    renderGroundTexture() {
        this.groundTexture.forEach(texture => {
            const pulse = Math.sin(texture.pulse) * 0.1;
            
            this.ctx.save();
            this.ctx.globalAlpha = texture.opacity + pulse;
            
            if (texture.type === 'moss') {
                this.ctx.fillStyle = 'rgba(34, 139, 34, 0.6)';
                this.ctx.beginPath();
                this.ctx.arc(texture.x, texture.y, texture.size, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.fillStyle = 'rgba(105, 105, 105, 0.4)';
                this.ctx.beginPath();
                this.ctx.arc(texture.x, texture.y, texture.size * 0.7, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            this.ctx.restore();
        });
    }

    renderFogLayers() {
        this.fogLayers.forEach((layer, layerIndex) => {
            layer.forEach(fog => {
                const pulse = Math.sin(fog.pulse) * 0.1;
                
                this.ctx.save();
                this.ctx.globalAlpha = (fog.opacity + pulse) * (1 - layerIndex * 0.2);
                
                const gradient = this.ctx.createRadialGradient(fog.x, fog.y, 0, fog.x, fog.y, fog.size);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(fog.x, fog.y, fog.size, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.restore();
            });
        });
    }

    renderFloatingParticles() {
        this.floatingParticles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity * particle.life;
            this.ctx.fillStyle = particle.color;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    renderGrassPlains() {
        this.groundTexture.forEach(grass => {
            if (grass.type === 'grass') {
                const sway = Math.sin(grass.sway) * 2;
                const pulse = Math.sin(this.game.time * 0.001 + grass.sway) * 0.1;
                
                this.ctx.save();
                this.ctx.translate(grass.x + sway, grass.y);
                this.ctx.globalAlpha = (grass.opacity + pulse) * 0.8;
                
                // Draw grass tuft
                this.ctx.strokeStyle = `hsl(${80 + Math.random() * 20}, 60%, 40%)`;
                this.ctx.lineWidth = 1;
                
                for (let i = 0; i < 3; i++) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, 0);
                    this.ctx.lineTo((i - 1) * 2, -grass.height);
                    this.ctx.stroke();
                }
                
                this.ctx.restore();
            }
        });
    }

    renderWindEffects() {
        if (!this.windParticles) return;
        
        this.windParticles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity * particle.life;
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    renderDawnLight() {
        if (!this.dawnRays) return;
        
        this.dawnRays.forEach(ray => {
            const pulse = Math.sin(ray.pulse) * 0.1;
            
            this.ctx.save();
            this.ctx.translate(ray.x, ray.y);
            this.ctx.rotate(ray.angle);
            this.ctx.globalAlpha = (ray.opacity + pulse) * 0.6;
            
            const gradient = this.ctx.createLinearGradient(0, 0, 0, -ray.length);
            gradient.addColorStop(0, ray.color);
            gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(-3, -ray.length, 6, ray.length);
            
            this.ctx.restore();
        });
    }

    renderWolfTracks() {
        if (!this.wolfTracks) return;
        
        this.wolfTracks.forEach(track => {
            this.ctx.save();
            this.ctx.translate(track.x, track.y);
            this.ctx.rotate(track.angle);
            this.ctx.globalAlpha = track.opacity * (1 - track.age * 0.5);
            
            this.ctx.strokeStyle = 'rgba(100, 100, 100, 0.4)';
            this.ctx.lineWidth = 2;
            
            // Draw wolf track pattern
            for (let i = 0; i < 4; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(i * 8, 0);
                this.ctx.lineTo(i * 8 + 4, -track.length);
                this.ctx.stroke();
            }
            
            this.ctx.restore();
        });
    }

    updateRootNetworkIntensity(intensity) {
        // Update root network visual intensity based on harmonics
        this.rootNetwork.forEach(root => {
            root.intensity = intensity;
        });
    }

    updateCanopyIntensity(intensity) {
        // Update canopy visual intensity based on harmonics
        this.canopyLayers.forEach(layer => {
            layer.forEach(leaf => {
                leaf.intensity = intensity;
            });
        });
    }

    onCanvasResize() {
        // Regenerate visual elements for new canvas size
        this.generateRootNetwork();
        this.generateCanopyLayers();
        this.generateEnergyOrbs();
        this.generateLightRays();
        this.generateFogLayers();
        this.generateGroundTexture();
        this.generateFloatingParticles();
    }
} 