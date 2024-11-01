import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    IconButton,
    List,
    ListItem
} from '@mui/material';
import {
    VolumeUp,
    CheckCircle,
    Cancel
} from '@mui/icons-material';

const ListeningCard = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const audioExample = {
        transcript: 'すみません、駅はどこですか？',
        translation: 'Excuse me, where is the station?',
        options: ['Where is the hospital?', 'Where is the station?', 'Where is the store?', 'Where is the school?'],
        correct: 1
    };

    return (
        <Card>
            <CardContent>
                <Box textAlign="center" mb={3}>
                    <IconButton
                        onClick={() => setIsPlaying(!isPlaying)}
                        size="large"
                        color="primary"
                    >
                        <VolumeUp />
                    </IconButton>

                    <Box mb={3}>
                        <Typography variant="h6" gutterBottom>
                            Choose the correct translation:
                        </Typography>
                        <List>
                            {audioExample.options.map((option, idx) => (
                                <ListItem key={idx}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        onClick={() => setShowAnswer(true)}
                                        startIcon={showAnswer && (
                                            idx === audioExample.correct ?
                                                <CheckCircle color="success" /> :
                                                <Cancel color="error" />
                                        )}
                                        sx={{
                                            bgcolor: showAnswer ?
                                                (idx === audioExample.correct ? 'success.light' : 'error.light')
                                                : 'inherit'
                                        }}
                                    >
                                        {option}
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {showAnswer && (
                        <Box textAlign="left">
                            <Typography variant="body1" gutterBottom>
                                <strong>Transcript:</strong> {audioExample.transcript}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Translation:</strong> {audioExample.translation}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ListeningCard;