// Web Audio API procedural sound generator for realistic haptic & audio feedback

class SoundEffectsManager {
  constructor() {
    this.ctx = null;
    this.scratchNoiseNode = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Wheel tick sound (crisp ratchet click)
  playWheelTick() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    } catch (e) {
      // Ignore audio failure
    }
  }

  // Realistic metallic scratch friction noise
  playScratchSound() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.05; // 50ms burst
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter to simulate metallic grit scraping
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800 + Math.random() * 800;
      filter.Q.value = 3.5;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {
      // Ignore audio failure
    }
  }

  // Celebratory luxury victory chime
  playWinChime() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.08);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + index * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.08 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + index * 0.08);
        osc.stop(this.ctx.currentTime + index * 0.08 + 0.85);
      });
    } catch (e) {
      // Ignore audio failure
    }
  }

  // Crisp subtle button click
  playClickSound() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {
      // Ignore audio failure
    }
  }
}

export const soundEffects = new SoundEffectsManager();
