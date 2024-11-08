import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import { theme } from '../style/theme';
import QuizCard from './cards/quiz/QuizCard';

const RecapLesson = () => {
    const [pageData, setPageData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadRecapData = async () => {
            try {
                const [startDateString, endDateString] = id.split('_').slice();
                const startDate = new Date(startDateString);
                const endDate = new Date(endDateString);
                const promises = [];

                for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
                    const dateString = date.toISOString().split('T')[0];
                    promises.push(import(`../../public/data/${dateString}.json`));
                }

                const results = await Promise.all(promises);
                const combinedData = results.map(result => result.default);
                setPageData(combinedData);
            } catch (error) {
                console.error('Error loading recap data:', error);
            }
        };

        loadRecapData();
    }, [id]);

    if (pageData.length === 0) return <div>Loading...</div>;

    const combinedKanjiInfo = pageData.flatMap(data => data.kanji_info);
    const combinedVocabularyInfo = pageData.flatMap(data => data.vocabulary_info);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
                <Typography variant="h3" component="h1" gutterBottom textAlign="center">
                    <Typography variant="h3" component="h1" gutterBottom textAlign="center">
                        Recap Lesson
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom textAlign="center">
                        {id.replace('_', ' to ')}
                    </Typography>
                </Typography>
                <QuizCard vocabularyInfo={combinedVocabularyInfo} kanjiInfo={combinedKanjiInfo} />
            </Box>
        </ThemeProvider>
    );
};

export default RecapLesson;