import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Tabs, Tab, Grid, Button } from '@mui/material';
import { theme } from '../style/theme';
import KanjiCard from './cards/kanji/KanjiCard';
import VocabularyCard from './cards/vocabulary/VocabularyCard';
import GrammarCard from './cards/GrammarCard';
import ReadingCard from './cards/ReadingCard';
import ListeningCard from './cards/ListeningCard';
import QuizCard from "./cards/quiz/QuizCard";

const Lesson = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [pageData, setPageData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    useEffect(() => {
        const loadPageData = async () => {
            try {
                const module = await import(`../../public/data/${id}.json`);
                setPageData(module.default);
            } catch (error) {
                console.error('Error loading page data:', error);
            }
        };

        loadPageData();
    }, [id]);

    if (!pageData) return <div>Loading...</div>;

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
                <Typography variant="h3" component="h1" gutterBottom textAlign="center">
                    Daily Lesson - {id}
                </Typography>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        aria-label="Japanese learning sections"
                    >
                        <Tab label="Kanji" />
                        <Tab label="Vocabulary" />
                        <Tab label="Grammar" />
                        <Tab label="Reading" />
                        <Tab label="Listening" />
                        <Tab label="Quiz" />
                    </Tabs>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box role="tabpanel" hidden={currentTab !== 0}>
                            {currentTab === 0 && <KanjiCard kanjiInfo={pageData.kanji_info} />}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box role="tabpanel" hidden={currentTab !== 1}>
                            {currentTab === 1 && <VocabularyCard vocabularyInfo={pageData.vocabulary_info} />}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box role="tabpanel" hidden={currentTab !== 2}>
                            {currentTab === 2 && <GrammarCard grammarInfo={pageData.grammar_info} />}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box role="tabpanel" hidden={currentTab !== 3}>
                            {currentTab === 3 && <ReadingCard passage={pageData.short_text_with_quiz} />}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box role="tabpanel" hidden={currentTab !== 4}>
                            {currentTab === 4 && <ListeningCard song={pageData.song} />}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box role="tabpanel" hidden={currentTab !== 5}>
                            {currentTab === 5 && <QuizCard vocabularyInfo={pageData.vocabulary_info} kanjiInfo={pageData.kanji_info} />}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default Lesson;