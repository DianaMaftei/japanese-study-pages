import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Paper
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const GrammarCard = ({ grammarInfo }) => {
    const [visibleTranslationIndex, setVisibleTranslationIndex] = useState(null);
    const [images, setImages] = useState({});

    const handleSentenceClick = (index) => {
        setVisibleTranslationIndex(index === visibleTranslationIndex ? null : index);
    };

    useEffect(() => {
        const fetchImages = async () => {
            const imagesObj = {};
            for (const item of grammarInfo) {
                const { grammar } = item;
                const folderName = grammar.grammar.replace(/ /g, '_'); // Replace spaces with underscores
                const imagesInFolder = getImagesFromFolder(folderName);
                imagesObj[folderName] = imagesInFolder;
            }
            setImages(imagesObj);
        };

        fetchImages();
    }, [grammarInfo]);

    const getImagesFromFolder = (folderName) => {
        const imagesContext = require.context('../../../public/images/grammar', true, /\.(png|jpe?g)$/);
        const folderImages = imagesContext.keys()
            .filter(key => key.includes(folderName))
            .map(key => imagesContext(key));
        return folderImages;
    };

    const handleImageClick = (imageName) => {
        const timestampMatch = imageName.match(/_(\d+)-(\d+)-(\d+)_/);
        if (timestampMatch) {
            const [, hours, minutes, seconds] = timestampMatch;
            const timestamp = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
            const youtubeUrl = `https://www.youtube.com/watch?v=VrscRD5y2gk&t=${timestamp}s`;
            window.open(youtubeUrl, '_blank');
        }
    };

    return (
        <Card>
            <CardContent>
                {grammarInfo.map((item, idx) => {
                    const { grammar, grammar_sentences } = item;
                    const folderName = grammar.grammar.replace(/ /g, '_'); // Replace spaces with underscores
                    const imagesForGrammar = images[folderName] || [];

                    return (
                        <Box key={idx} mb={3}>
                            <Typography variant="h5" gutterBottom>
                                {grammar.grammar}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {grammar.meaning}
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
                            {imagesForGrammar.length > 0 && (
                                <Carousel showThumbs={false} showStatus={false} infiniteLoop>
                                    {imagesForGrammar.map((image, index) => (
                                        <div key={index} onClick={() => handleImageClick(image)}>
                                            <img src={image} alt={folderName} style={{ width: '100%', cursor: 'pointer' }} />
                                        </div>
                                    ))}
                                </Carousel>
                            )}
                        </Box>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default GrammarCard;