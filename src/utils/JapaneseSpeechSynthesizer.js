class JapaneseSpeechSynthesizer {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];

        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => {
                this.voices = this.getJapaneseVoices();
            };
        }

        this.voices = this.getJapaneseVoices();
    }

    getJapaneseVoices() {
        return window.speechSynthesis.getVoices().filter(voice =>
            voice.lang.startsWith('ja') || voice.lang.startsWith('jp')
        );
    }

    speak(text, onError) {
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 1.0;

        if (this.voices.length > 0) {
            const preferredVoice = this.voices.find(voice =>
                voice.name.includes('Microsoft') || voice.name.includes('Google')
            ) || this.voices[0];

            utterance.voice = preferredVoice;
        }

        utterance.lang = 'ja-JP';
        utterance.onerror = (event) => onError?.(event);

        this.synth.speak(utterance);
    }

    stop() {
        this.synth.cancel();
    }
}

export default JapaneseSpeechSynthesizer;