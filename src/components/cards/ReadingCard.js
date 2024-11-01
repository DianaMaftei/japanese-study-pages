import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid
} from '@mui/material';

const ReadingCard = () => {
    const [showTranslation, setShowTranslation] = useState(false);

    const passage = {
        title: '私の家族',
        text: '私の家族は4人です。父と母と妹と私です。父は会社員で、母は教師です。妹は高校生です。',
        translation: 'My family has 4 people. There\'s my father, mother, younger sister, and me. My father is a company employee, and my mother is a teacher. My younger sister is a high school student.',
        questions: [
            {
                question: '家族は何人ですか？',
                options: ['3人', '4人', '5人', '6人'],
                correct: 1
            }
        ]
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {passage.title}
                </Typography>
                <Typography variant="body1" paragraph>
                    {passage.text}
                </Typography>
                <Button
                    variant="outlined"
                    onClick={() => setShowTranslation(!showTranslation)}
                    sx={{ mb: 2 }}
                >
                    {showTranslation ? 'Hide' : 'Show'} Translation
                </Button>
                {showTranslation && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {passage.translation}
                    </Typography>
                )}
                <Typography variant="h6" gutterBottom>
                    Comprehension Questions:
                </Typography>
                {passage.questions.map((q, idx) => (
                    <Box key={idx} mb={2}>
                        <Typography variant="body1" gutterBottom>
                            {q.question}
                        </Typography>
                        <Grid container spacing={1}>
                            {q.options.map((option, i) => (
                                <Grid item xs={6} key={i}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            '&:hover': {
                                                bgcolor: i === q.correct ? 'success.light' : 'error.light'
                                            }
                                        }}
                                    >
                                        {option}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};

export default ReadingCard;