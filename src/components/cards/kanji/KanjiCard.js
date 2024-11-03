import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import KanjiStrokeDiagram from './KanjiStrokeDiagram';
import './KanjiCard.css';

const KanjiCard = ({ kanjiInfo }) => {
    const [flipped, setFlipped] = useState({});
    const [renderedKanji, setRenderedKanji] = useState({});

    const handleImageClick = (index) => {
        setFlipped((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    useEffect(() => {
        const initialRenderedKanji = {};
        kanjiInfo.forEach((item) => {
            initialRenderedKanji[item.kanji.kanji] = false;
        });
        setRenderedKanji(initialRenderedKanji);
    }, [kanjiInfo]);

    return (
        <Box>
            {kanjiInfo.map((item, index) => {
                const { kanji, on_reading, kun_reading, meaning, examples, components, koohii1, koohii2 } = item.kanji;
                const kanjiImage = item;
                const isRendered = renderedKanji[kanji];

                return (
                    <Card key={index} sx={{ mb: 3, border: '1px solid #ccc', padding: 2, backgroundColor: '#f9f9f9' }}>
                        <CardContent>
                            <Box display="flex">
                                <Box flex="1" textAlign="center">
                                    {!isRendered && (
                                        <KanjiStrokeDiagram character={kanji} id={"kanji-draw-" + kanji} />
                                    )}
                                    {kanjiImage && (
                                        <Box mt={2} className={`flip-card ${flipped[index] ? 'flipped' : ''}`} onClick={() => handleImageClick(index)}>
                                            <Box className="flip-card-inner">
                                                <Box className="flip-card-front">
                                                    <img
                                                        src={`data:image/png;base64,${kanjiImage.encoded_image}`}
                                                        alt={kanjiImage.image_description}
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                </Box>
                                                <Box className="flip-card-back">
                                                    <Typography variant="body1" gutterBottom>
                                                        <strong>Image Description:</strong> {kanjiImage.image_description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                                <Box flex="2" textAlign="left" ml={3}>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Meaning:</strong> {meaning}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>On-yomi:</strong> {on_reading}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Kun-yomi:</strong> {kun_reading || 'N/A'}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Components:</strong> {components}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Koohii 1:</strong> {koohii1}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Koohii 2:</strong> {koohii2}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>Example words:</Typography>
                                    <List>
                                        {examples.split('<br>').map((example, idx) => (
                                            <ListItem key={idx}>
                                                <ListItemText primary={example} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                );
            })}
        </Box>
    );
};

export default KanjiCard;
