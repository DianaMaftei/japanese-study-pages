import React, {useEffect, useState} from 'react';
import KanjiStrokeDiagram from './KanjiStrokeDiagram';
import './KanjiCard.css';
import SimilarKanji from './SimilarKanji';
import {Box, Card, CardContent, Grid, List, Typography} from '@mui/material';

const KanjiCard = ({kanjiInfo}) => {
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
                const {kanji, on_reading, kun_reading, meaning, examples, components, koohii1, koohii2} = item.kanji;
                const kanjiImage = item;
                const isRendered = renderedKanji[kanji];

                return (
                    <Card key={index} sx={{mb: 3, border: '1px solid #ccc', padding: 2, backgroundColor: '#f9f9f9'}}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4} textAlign="center">
                                    {!isRendered && (
                                        <KanjiStrokeDiagram character={kanji} id={"kanji-draw-" + kanji}/>
                                    )}
                                    {kanjiImage && (
                                        <Box mt={2} className={`flip-card ${flipped[index] ? 'flipped' : ''}`}
                                             onClick={() => handleImageClick(index)}>
                                            <Box className="flip-card-inner">
                                                <Box className="flip-card-front">
                                                    <img
                                                        src={`data:image/png;base64,${kanjiImage.encoded_image}`}
                                                        alt={kanjiImage.image_description}
                                                        style={{maxWidth: '100%'}}
                                                    />
                                                </Box>
                                                <Box className="flip-card-back">
                                                    <Typography variant="body1" gutterBottom>
                                                        <strong>Image
                                                            Description:</strong> {kanjiImage.image_description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Box ml={3} textAlign="left">
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
                                            <strong>Components:</strong>
                                        </Typography>
                                        {
                                            components.split(/ (?=\S+:)/).map((component, index) => (
                                                <Typography ml={5} key={index} variant="body1" gutterBottom>
                                                    <strong>{component.split(':')[0]}</strong>: {component.split(':')[1]}
                                                </Typography>
                                            ))
                                        }
                                    </Box>
                                    <Box mt={3} ml={3} textAlign="left">
                                        <Typography variant="h6" textAlign="left">Example words:</Typography>
                                        <List>
                                            {examples.split('<br>').map((example, idx) => (
                                                <Typography ml={3} variant="h6" textAlign="left">
                                                    {example}
                                                </Typography>
                                            ))}
                                        </List>
                                    </Box>
                                    <Box mt={3} ml={3} textAlign="left">
                                        <SimilarKanji kanjiCharacter={kanji}/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                );
            })}
        </Box>
    );
};

export default KanjiCard;