import React, {useEffect, useState} from 'react';
import {Alert, Box, Card, CardContent, IconButton, Paper, Snackbar, Typography} from '@mui/material';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {VolumeUp} from '@mui/icons-material';
import JapaneseSpeechSynthesizer from '../../utils/JapaneseSpeechSynthesizer';

const GrammarCard = ({ grammarInfo }) => {
    const [images, setImages] = useState({});
    const [speaker, setSpeaker] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const newSpeaker = new JapaneseSpeechSynthesizer();
        setSpeaker(newSpeaker);

        return () => {
            newSpeaker.stop();
        };
    }, []);

    const handleTextToSpeech = (text) => {
        if (speaker) {
            speaker.stop(); // Stop any ongoing speech synthesis
            speaker.speak(text, (error) => {
                if (error.error !== 'interrupted') {
                    setErrorMessage('Speech synthesis error occurred');
                    console.error('Speech error:', error);
                }
            });
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            const imagesObj = {};
            for (const item of grammarInfo) {
                const { grammar } = item;
                const folderName = grammar.grammar.replace(/ /g, '_');
                imagesObj[folderName] = getImagesFromFolder(folderName);
            }
            setImages(imagesObj);
        };

        fetchImages();
    }, [grammarInfo]);

    const getImagesFromFolder = (folderName) => {
        const imagesContext = require.context('../../../public/images/grammar', true, /\.(png|jpe?g)$/);
        return imagesContext.keys()
            .filter(key => {
                const folderPath = key.split('/').slice(1, -1).join('/');
                return folderPath === folderName;
            })
            .map(key => imagesContext(key));
    };

    const handleImageClick = (imageName) => {
        const timestampMatch = imageName.match(/_(?:(\d+)-)?(\d+)-(\d+)_/);

        if (timestampMatch) {
            const hours = timestampMatch[1] ? parseInt(timestampMatch[1]) : 0;
            const minutes = parseInt(timestampMatch[2]);
            const seconds = parseInt(timestampMatch[3]);
            const timestamp = hours * 3600 + minutes * 60 + seconds;
            const youtubeUrl = `https://www.youtube.com/watch?v=VrscRD5y2gk&t=${timestamp}s`;
            window.open(youtubeUrl, '_blank');
        }
    };

    return (
        <Card>
            <CardContent>
                {grammarInfo.map((item, idx) => {
                    const { grammar, grammar_sentences } = item;
                    const folderName = grammar.grammar.replace(/ /g, '_');
                    const imagesForGrammar = images[folderName] || [];

                    return (
                        <Box key={idx} mb={3}>
                            <Typography variant="h5" gutterBottom>
                                {grammar.grammar}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {grammar.meaning}
                            </Typography>
                            {imagesForGrammar.length > 0 && (
                                <Carousel showThumbs={false} showStatus={false} infiniteLoop>
                                    {imagesForGrammar.map((image, index) => (
                                        <div key={index} onClick={() => handleImageClick(image)}>
                                            <img src={image} alt={folderName} style={{ width: '100%', cursor: 'pointer' }} />
                                        </div>
                                    ))}
                                </Carousel>
                            )}
                            {grammar_sentences && (
                                <Paper elevation={2} sx={{ p: 2, bgcolor: 'grey.100' }}>
                                    <Typography variant="h6" gutterBottom>Examples:</Typography>
                                    {grammar_sentences.sentences.map((ex, i) => (
                                        <Box key={i} mb={2}>
                                            <Box display="flex" alignItems="center">
                                                <IconButton onClick={() => handleTextToSpeech(ex.sentence_japanese)}>
                                                    <VolumeUp />
                                                </IconButton>
                                                <Typography variant="body1">
                                                    {ex.sentence_japanese}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
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

            <Snackbar
                open={!!errorMessage}
                autoHideDuration={6000}
                onClose={() => setErrorMessage('')}
            >
                <Alert severity="error" onClose={() => setErrorMessage('')}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default GrammarCard;