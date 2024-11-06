import React, { useState, useEffect, useRef } from 'react';
import './QuizCard.css';

const VocabToMeaningQuiz = ({ vocabularyInfo }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [answerCorrectness, setAnswerCorrectness] = useState({});
    const [shuffledVocabularyInfo, setShuffledVocabularyInfo] = useState([]);
    const [shuffledOptions, setShuffledOptions] = useState({});
    const vocabRefs = useRef([]);

    useEffect(() => {
        // Shuffle the vocabularyInfo array
        const shuffledVocab = [...vocabularyInfo].sort(() => Math.random() - 0.5);
        setShuffledVocabularyInfo(shuffledVocab);

        // Generate unique options for each quiz item
        const options = {};
        shuffledVocab.forEach((item, index) => {
            const vocabOptions = [...shuffledVocab]
                .filter((option) => option.vocabulary.meaning !== item.vocabulary.meaning)
                .sort(() => Math.random() - 0.5)
                .slice(0, 4);
            vocabOptions.push(item);
            options[`vocabToMeaning-${index}`] = vocabOptions.sort(() => Math.random() - 0.5);
        });
        setShuffledOptions(options);
    }, [vocabularyInfo]);

    useEffect(() => {
        // Adjust font size to fit the width
        vocabRefs.current.forEach(ref => {
            if (ref) {
                let fontSize = 4; // Start with 4em
                ref.style.fontSize = `${fontSize}em`;
                while (ref.scrollWidth > ref.clientWidth && fontSize > 0.5) {
                    fontSize -= 0.1;
                    ref.style.fontSize = `${fontSize}em`;
                }
            }
        });
    }, [shuffledVocabularyInfo]);

    const handleRadioChange = (questionIndex, value, isCorrect) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: value,
        });
        setAnswerCorrectness({
            ...answerCorrectness,
            [questionIndex]: isCorrect,
        });
    };

    return (
        <div>
            <h3>Match the Vocabulary Word to its Meaning</h3>
            {shuffledVocabularyInfo.map((item, index) => {
                const options = shuffledOptions[`vocabToMeaning-${index}`];
                return (
                    <div key={index} className="quiz-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                        <div
                            className="vocabulary"
                            ref={el => vocabRefs.current[index] = el}
                            style={{ marginRight: '0.5rem', width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textAlign: 'center' }}
                        >
                            {item.vocabulary.reading}
                        </div>
                        <div className="options" style={{ width: '200px' }}>
                            {options.map((option, idx) => {
                                const isCorrect = answerCorrectness[`vocabToMeaning-${index}`];
                                const isSelectedAnswer = selectedAnswers[`vocabToMeaning-${index}`] === option.vocabulary.meaning;
                                const textColor =
                                    isCorrect === true && isSelectedAnswer
                                        ? 'green'
                                        : isCorrect === false && isSelectedAnswer
                                            ? 'red'
                                            : 'black';

                                return (
                                    <label key={idx} style={{ color: textColor, marginRight: '0.25rem' }}>
                                        <input
                                            type="radio"
                                            name={`vocabToMeaning-${index}`}
                                            value={option.vocabulary.meaning}
                                            checked={isSelectedAnswer}
                                            onChange={() => handleRadioChange(`vocabToMeaning-${index}`, option.vocabulary.meaning, option.vocabulary.meaning === item.vocabulary.meaning)}
                                        />
                                        {option.vocabulary.meaning}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default VocabToMeaningQuiz;