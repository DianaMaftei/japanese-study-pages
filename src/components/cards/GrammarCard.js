import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Paper
} from '@mui/material';

const GrammarCard = ({ grammarInfo }) => {
    const [visibleTranslationIndex, setVisibleTranslationIndex] = useState(null);

    const handleSentenceClick = (index) => {
        setVisibleTranslationIndex(index === visibleTranslationIndex ? null : index);
    };

    return (
        <Card>
            <CardContent>
                {grammarInfo.map((item, idx) => {
                    const { grammar, grammar_sentences } = item;

                    return (
                        <Box key={idx} mb={3}>
                            <Typography variant="h5" gutterBottom>
                                {grammar.Grammar}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {grammar.Meaning}
                            </Typography>
                            {grammar_sentences && (
                                <Paper elevation={2} sx={{ p: 2, bgcolor: 'grey.100' }}>
                                    <Typography variant="h6" gutterBottom>Examples:</Typography>
                                    {grammar_sentences.sentences.map((ex, i) => (
                                        <Box key={i} mb={2}>
                                            <Typography
                                                variant="body1"
                                                onClick={() => handleSentenceClick(i)}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                {ex.sentence_japanese}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ visibility: visibleTranslationIndex === i ? 'visible' : 'hidden' }}
                                            >
                                                {ex.sentence_english_translation}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Paper>
                            )}
                        </Box>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default GrammarCard;