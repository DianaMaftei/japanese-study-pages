import React, { useState, useEffect } from 'react';
import './QuizCard.css';

const KanjiToMeaningQuiz = ({ kanjiInfo }) => {
    const [incorrectAttempt, setIncorrectAttempt] = useState(null);
    const [selectedKanji, setSelectedKanji] = useState(null);
    const [matches, setMatches] = useState({});
    const [shuffledKanji, setShuffledKanji] = useState([]);
    const [shuffledMeanings, setShuffledMeanings] = useState([]);

    useEffect(() => {
        // Shuffle both kanji and meanings independently
        const shuffledK = [...kanjiInfo].sort(() => Math.random() - 0.5);
        const shuffledM = [...kanjiInfo].sort(() => Math.random() - 0.5);
        setShuffledKanji(shuffledK);
        setShuffledMeanings(shuffledM);
    }, [kanjiInfo]);

    const handleKanjiClick = (kanji) => {
        // If this kanji is already matched, do nothing
        if (matches[kanji.kanji.kanji]) return;
        setSelectedKanji(kanji);
    };

    const handleMeaningClick = (meaning) => {
        // If this meaning is already matched, do nothing
        if (Object.values(matches).includes(meaning.kanji.meaning)) return;

        if (selectedKanji) {
            const isCorrect = selectedKanji.kanji.meaning === meaning.kanji.meaning;
            if (isCorrect) {
                setMatches(prev => ({
                    ...prev,
                    [selectedKanji.kanji.kanji]: meaning.kanji.meaning
                }));
                setIncorrectAttempt(null);
            } else {
                // Set incorrect attempt to show red feedback
                setIncorrectAttempt({
                    kanji: selectedKanji.kanji.kanji,
                    meaning: meaning.kanji.meaning
                });
                // Clear the incorrect feedback after a short delay
                setTimeout(() => {
                    setIncorrectAttempt(null);
                }, 1000);
            }
            setSelectedKanji(null);
        }
    };

    const getKanjiStyle = (kanji) => {
        const baseStyle = {
            fontSize: '2em',
            padding: '10px',
            margin: '5px',
            cursor: 'pointer',
            border: '2px solid #ddd',
            borderRadius: '5px',
            width: '100px',
            textAlign: 'center'
        };

        if (matches[kanji.kanji.kanji]) {
            return { ...baseStyle, backgroundColor: '#90EE90', cursor: 'default' };
        }
        if (incorrectAttempt?.kanji === kanji.kanji.kanji) {
            return { ...baseStyle, backgroundColor: '#FFB6B6' };
        }
        if (selectedKanji?.kanji.kanji === kanji.kanji.kanji) {
            return { ...baseStyle, backgroundColor: '#ADD8E6' };
        }
        return baseStyle;
    };

    const getMeaningStyle = (meaning) => {
        const baseStyle = {
            padding: '10px',
            margin: '5px',
            cursor: 'pointer',
            border: '2px solid #ddd',
            borderRadius: '5px',
            width: '150px',
            textAlign: 'center'
        };

        if (Object.values(matches).includes(meaning.kanji.meaning)) {
            return { ...baseStyle, backgroundColor: '#90EE90', cursor: 'default' };
        }
        if (incorrectAttempt?.meaning === meaning.kanji.meaning) {
            return { ...baseStyle, backgroundColor: '#FFB6B6' };
        }
        return baseStyle;
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
            <div className="kanji-column">
                {shuffledKanji.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleKanjiClick(item)}
                        style={getKanjiStyle(item)}
                    >
                        {item.kanji.kanji}
                    </div>
                ))}
            </div>
            <div className="meaning-column">
                {shuffledMeanings.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleMeaningClick(item)}
                        style={getMeaningStyle(item)}
                    >
                        {item.kanji.meaning}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanjiToMeaningQuiz;