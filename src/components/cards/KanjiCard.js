import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

const KanjiCard = () => {
    const [showMeaning, setShowMeaning] = useState(false);

    const kanjiExample = {
        character: '水',
        meaning: 'water',
        onYomi: 'スイ',
        kunYomi: 'みず',
        strokeCount: 4,
        examples: [
            { word: '水曜日', reading: 'すいようび', meaning: 'Wednesday' },
            { word: '水泳', reading: 'すいえい', meaning: 'swimming' }
        ]
    };

    return (
        <Card>
            <CardContent>
                <Box textAlign="center" mb={3}>
                    <Typography variant="h1" component="div" gutterBottom>
                        {kanjiExample.character}
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => setShowMeaning(!showMeaning)}
                        sx={{ mb: 2 }}
                    >
                        {showMeaning ? 'Hide' : 'Show'} Details
                    </Button>

                    {showMeaning && (
                        <Box textAlign="left">
                            <Typography variant="body1" gutterBottom>
                                <strong>Meaning:</strong> {kanjiExample.meaning}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>On-yomi:</strong> {kanjiExample.onYomi}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Kun-yomi:</strong> {kanjiExample.kunYomi}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Stroke count:</strong> {kanjiExample.strokeCount}
                            </Typography>
                            <Typography variant="h6" gutterBottom>Example words:</Typography>
                            <List>
                                {kanjiExample.examples.map((ex, idx) => (
                                    <ListItem key={idx}>
                                        <ListItemText
                                            primary={`${ex.word} (${ex.reading})`}
                                            secondary={ex.meaning}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default KanjiCard;