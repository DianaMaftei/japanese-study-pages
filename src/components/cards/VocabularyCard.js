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
    NavigateNext
} from '@mui/icons-material';

const VocabularyCard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const vocabulary = [
        {
            word: '食べる',
            reading: 'たべる',
            meaning: 'to eat',
            example: '私は寿司を食べます。',
            exampleTranslation: 'I eat sushi.'
        },
        {
            word: '飲む',
            reading: 'のむ',
            meaning: 'to drink',
            example: '水を飲みます。',
            exampleTranslation: 'I drink water.'
        }
    ];

    return (
        <Card>
            <CardContent>
                <Box textAlign="center">
                    <Typography variant="h4" gutterBottom>
                        {vocabulary[currentIndex].word}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {vocabulary[currentIndex].reading}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {vocabulary[currentIndex].meaning}
                    </Typography>
                    <Paper elevation={2} sx={{ p: 2, my: 2, bgcolor: 'grey.100' }}>
                        <Typography variant="body1" gutterBottom>
                            {vocabulary[currentIndex].example}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {vocabulary[currentIndex].exampleTranslation}
                        </Typography>
                    </Paper>
                    <Box display="flex" justifyContent="space-between">
                        <IconButton
                            onClick={() => setCurrentIndex(i => (i > 0 ? i - 1 : vocabulary.length - 1))}
                        >
                            <NavigateBefore />
                        </IconButton>
                        <IconButton
                            onClick={() => setCurrentIndex(i => (i < vocabulary.length - 1 ? i + 1 : 0))}
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