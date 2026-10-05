// Web Audio API Sound Synthesizer for Whiteboard (Marker, Chalk, Clicks, Chimes, Eraser)
class SoundManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.volume = 0.3;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);
            gain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.04);
        } catch (e) {}
    }

    playDrawStroke() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            // Soft scratch/marker sound with pre-cached noise buffer
            if (!this._markerNoiseBuffer) {
                const bufferSize = Math.floor(this.ctx.sampleRate * 0.03);
                this._markerNoiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                const data = this._markerNoiseBuffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
                }
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = this._markerNoiseBuffer;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 1400;
            filter.Q.value = 3.0;

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(this.volume * 0.15, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            noise.start();
        } catch (e) {}
    }

    playPop() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(this.volume * 0.5, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch (e) {}
    }

    playChime() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
                gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.06);
                gain.gain.linearRampToValueAtTime(this.volume * 0.4, this.ctx.currentTime + idx * 0.06 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.06 + 0.4);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + idx * 0.06);
                osc.stop(this.ctx.currentTime + idx * 0.06 + 0.45);
            });
        } catch (e) {}
    }

    playErase() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const bufferSize = this.ctx.sampleRate * 0.08;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * (i / bufferSize));
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800;
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(this.volume * 0.25, this.ctx.currentTime);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            noise.start();
        } catch (e) {}
    }

    playSnap() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch (e) {}
    }
}

window.soundManager = new SoundManager();
