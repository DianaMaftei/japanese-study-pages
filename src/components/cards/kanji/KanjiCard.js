import React from 'react';
import KanjiStrokeDiagram from './KanjiStrokeDiagram';
import KanjiImageCard from './KanjiImageCard';
import './KanjiCard.css';
import SimilarKanji from './SimilarKanji';
import {Box, Card, CardContent, Grid, List, Typography} from '@mui/material';

const KanjiCard = ({kanjiInfo}) => {

    return (
        <Box>
            {kanjiInfo.map((item, index) => {
                const {kanji, on_reading, kun_reading, meaning, examples, components} = item.kanji;

                return (
                    <Card key={index} sx={{mb: 3, border: '1px solid #ccc', padding: 2, backgroundColor: '#f9f9f9'}}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4} textAlign="center">
                                    <KanjiStrokeDiagram character={kanji} id={"kanji-stroke-" + kanji}/>
                                    <KanjiImageCard kanjiInfo={item}/>
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
                                                <Typography ml={3} variant="h6" textAlign="left" key={example}>
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