// src/components/cards/quiz/QuizCard.js
import React, { useState } from 'react';
import './QuizCard.css'; // Import the CSS file
import KanjiToMeaningQuiz from './KanjiToMeaningQuiz';
import KanjiToExampleQuiz from './KanjiToExampleQuiz';
import VocabToMeaningQuiz from './VocabToMeaningQuiz';

const QuizCard = ({ vocabularyInfo, kanjiInfo }) => {
    const [selectedQuiz, setSelectedQuiz] = useState('kanjiToMeaning');

    const getButtonStyle = (quizType) => ({
        backgroundColor: selectedQuiz === quizType ? '#4B6587' : '#f1f1f1',
        color: selectedQuiz === quizType ? 'white' : 'black',
        border: 'none',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '4px'
    });

    const renderQuiz = () => {
        switch (selectedQuiz) {
            case 'kanjiToMeaning':
                return <KanjiToMeaningQuiz kanjiInfo={kanjiInfo} />;
            case 'kanjiToExample':
                return <KanjiToExampleQuiz kanjiInfo={kanjiInfo} />;
            case 'vocabToMeaning':
                return <VocabToMeaningQuiz vocabularyInfo={vocabularyInfo} />;
            default:
                return null;
        }
    };

    return (
        <div className="quiz-card">
            <h3>Quiz Card</h3>
            <div>
                <button style={getButtonStyle('kanjiToMeaning')} onClick={() => setSelectedQuiz('kanjiToMeaning')}>Kanji to Meaning</button>
                <button style={getButtonStyle('kanjiToExample')} onClick={() => setSelectedQuiz('kanjiToExample')}>Kanji to Example</button>
                <button style={getButtonStyle('vocabToMeaning')} onClick={() => setSelectedQuiz('vocabToMeaning')}>Vocabulary to Meaning</button>
            </div>
            {renderQuiz()}
        </div>
    );
};

export default QuizCard;