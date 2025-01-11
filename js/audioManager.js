export default class AudioManager {
    static instance = null;

    constructor(scene) {
        if (AudioManager.instance) {
            return AudioManager.instance;
        }
        this.scene = scene;
        this.sounds = {};
        AudioManager.instance = this;
    }

    addSound(key, config = {}) {
        if (!this.sounds[key]) {
            this.sounds[key] = this.scene.sound.add(key, config);
        }
    }

    playSound(key) {
        if (this.sounds[key]) {
            this.sounds[key].play();
        }
    }

    stopSound(key) {
        if (this.sounds[key]) {
            this.sounds[key].stop();
        }
    }

    setVolume(key, volume) {
        if (this.sounds[key]) {
            this.sounds[key].setVolume(volume);
        }
    }

    stopAll() {
        this.scene.sound.stopAll();
    }

    updateScene(scene) {
        this.scene = scene;
    }
}