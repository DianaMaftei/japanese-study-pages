import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid
} from '@mui/material';

const ReadingCard = ({ passage }) => {
    const [showTranslation, setShowTranslation] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleOptionClick = (questionIndex, optionIndex, isCorrect) => {
        setSelectedOptions({
            ...selectedOptions,
            [questionIndex]: { optionIndex, isCorrect }
        });
    };

    const renderTextWithLineBreaks = (text) => {
        return text.split('\n\n').map((segment, index) => (
            <Typography key={index} variant="body1" color="text.secondary" paragraph sx={{ mb: 2 }}>
                {segment}
            </Typography>
        ));
    };

    return (
        <Card sx={{ mb: 4, p: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                    {renderTextWithLineBreaks(passage.text_japanese)}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowTranslation(!showTranslation)}
                    sx={{ mb: 2 }}
                >
                    {showTranslation ? 'Hide' : 'Show'} Translation
                </Button>
                {showTranslation && renderTextWithLineBreaks(passage.text_english)}
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Comprehension Questions:
                </Typography>
                {passage.reading_comprehension_quiz_in_japanese.map((quiz, questionIndex) => (
                    <Box mb={3} key={questionIndex} sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
                        <Typography variant="body1" gutterBottom sx={{ mb: 5 }}>
                            {quiz.question}
                        </Typography>
                        <Grid container spacing={2}>
                            {quiz.options.map((option, optionIndex) => {
                                const isSelected = selectedOptions[questionIndex]?.optionIndex === optionIndex;
                                const isCorrect = selectedOptions[questionIndex]?.isCorrect;
                                return (
                                    <Grid item xs={12} sm={6} key={optionIndex}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            sx={{
                                                textTransform: 'none',
                                                backgroundColor: isSelected ? (isCorrect ? 'green' : 'red') : 'inherit',
                                                color: isSelected ? 'white' : 'inherit'
                                            }}
                                            onClick={() => handleOptionClick(questionIndex, optionIndex, option.isCorrect)}
                                        >
                                            {option.text}
                                        </Button>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};

export default ReadingCard;