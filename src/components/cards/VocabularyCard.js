import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Paper,
    Snackbar,
    Alert
} from '@mui/material';
import {
    NavigateBefore,
    NavigateNext,
    VolumeUp
} from '@mui/icons-material';

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

const VocabularyCard = ({ vocabularyInfo }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [speaker, setSpeaker] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const currentVocabularyInfo = vocabularyInfo[currentIndex];
    const currentVocabulary = currentVocabularyInfo.vocabulary;
    const currentSentences = currentVocabularyInfo.sentences;

    // Initialize speech synthesizer
    useEffect(() => {
        const newSpeaker = new JapaneseSpeechSynthesizer();
        setSpeaker(newSpeaker);

        // Cleanup function
        return () => {
            newSpeaker.stop();
        };
    }, []); // Empty dependency array since we only want to initialize once

    const handleTextToSpeech = (text) => {
        if (speaker) {
            speaker.speak(text, (error) => {
                setErrorMessage('Speech synthesis error occurred');
                console.error('Speech error:', error);
            });
        }
    };

    const handleNavigate = (direction) => {
        if (speaker) {
            speaker.stop();
        }

        if (direction === 'next') {
            setCurrentIndex(i => (i < vocabularyInfo.length - 1 ? i + 1 : 0));
        } else {
            setCurrentIndex(i => (i > 0 ? i - 1 : vocabularyInfo.length - 1));
        }
    };

    return (
        <Card>
            <CardContent>
                <Box textAlign="center">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <IconButton onClick={() => handleTextToSpeech(currentVocabulary.kanji)}>
                            <VolumeUp />
                        </IconButton>
                        <Typography variant="h4" gutterBottom>
                            {currentVocabulary.kanji}
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography variant="h5" gutterBottom>
                            [{currentVocabulary.reading}]
                        </Typography>
                    </Box>

                    <Typography variant="h6" gutterBottom>
                        {currentVocabulary.meaning}
                    </Typography>
                    {currentSentences.map((sentence, index) => (
                        <Paper key={index} elevation={2} sx={{ p: 2, my: 2, bgcolor: 'grey.100' }}>
                            <Box display="flex" alignItems="center">
                                <IconButton onClick={() => handleTextToSpeech(sentence.sentence_japanese)}>
                                    <VolumeUp />
                                </IconButton>
                                <Typography variant="body1" gutterBottom>
                                    {sentence.sentence_japanese}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {sentence.sentence_english_translation}
                            </Typography>
                        </Paper>
                    ))}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <IconButton onClick={() => handleNavigate('prev')}>
                            <NavigateBefore />
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                            {currentIndex + 1} / {vocabularyInfo.length}
                        </Typography>
                        <IconButton onClick={() => handleNavigate('next')}>
                            <NavigateNext />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>

            <Snackbar
                open={!!errorMessage}
                autoHideDuration={6000}
                onClose={() => setErrorMessage('')}
            >
                <Alert severity="error" onClose={() => setErrorMessage('')}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default VocabularyCard;