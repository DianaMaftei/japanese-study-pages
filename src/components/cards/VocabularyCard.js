import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Paper
} from '@mui/material';
import {
    NavigateBefore,
    NavigateNext,
    VolumeUp
} from '@mui/icons-material';

const VocabularyCard = ({ vocabularyInfo }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentVocabularyInfo = vocabularyInfo[currentIndex];
    const currentVocabulary = currentVocabularyInfo.vocabulary;
    const currentSentences = currentVocabularyInfo.sentences;

    const handleTextToSpeech = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        window.speechSynthesis.speak(utterance);
    };

    return (
        <Card>
            <CardContent>
                <Box textAlign="center">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <IconButton onClick={() => handleTextToSpeech(currentVocabulary.Kanji)}>
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
                            <Typography variant="body1" gutterBottom>
                                {sentence.sentence_japanese}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {sentence.sentence_english_translation}
                            </Typography>
                        </Paper>
                    ))}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <IconButton
                            onClick={() => setCurrentIndex(i => (i > 0 ? i - 1 : vocabularyInfo.length - 1))}
                        >
                            <NavigateBefore />
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                            {currentIndex + 1} / {vocabularyInfo.length}
                        </Typography>
                        <IconButton
                            onClick={() => setCurrentIndex(i => (i < vocabularyInfo.length - 1 ? i + 1 : 0))}
                        >
                            <NavigateNext />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default VocabularyCard;