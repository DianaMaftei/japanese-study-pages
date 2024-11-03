// App.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import {
    Box,
    Typography,
    Tabs,
    Tab
} from '@mui/material';
import { theme } from '../style/theme';
import KanjiCard from './cards/kanji/KanjiCard';
import VocabularyCard from './cards/VocabularyCard';
import GrammarCard from './cards/GrammarCard';
import ReadingCard from './cards/ReadingCard';
import ListeningCard from './cards/ListeningCard';

const JapaneseLearningApp = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [pageData, setPageData] = useState(null);
    const { id } = useParams();

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    // Load page data based on the `id` parameter from the URL
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

    // Show loading message if data has not loaded yet
    if (!pageData) return <div>Loading...</div>;

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
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
                    </Tabs>
                </Box>

                <Box role="tabpanel" hidden={currentTab !== 0}>
                    {currentTab === 0 && <KanjiCard kanjiInfo={pageData.kanji_info}/>}
                </Box>
                <Box role="tabpanel" hidden={currentTab !== 1}>
                    {currentTab === 1 && <VocabularyCard vocabularyInfo={pageData.vocabulary_info} />}
                </Box>
                <Box role="tabpanel" hidden={currentTab !== 2}>
                    {currentTab === 2 && <GrammarCard grammarInfo={pageData.grammar_info}/>}
                </Box>
                <Box role="tabpanel" hidden={currentTab !== 3}>
                    {currentTab === 3 && <ReadingCard passage={pageData.short_text_with_quiz} />}
                </Box>
                <Box role="tabpanel" hidden={currentTab !== 4}>
                    {currentTab === 4 && <ListeningCard song={pageData.song} />}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default JapaneseLearningApp;
