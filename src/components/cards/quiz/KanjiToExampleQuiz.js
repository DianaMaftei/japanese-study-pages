import React, { useState, useEffect } from 'react';
import './QuizCard.css';

const KanjiToExampleQuiz = ({ kanjiInfo }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [answerCorrectness, setAnswerCorrectness] = useState({});
    const [shuffledKanjiInfo, setShuffledKanjiInfo] = useState([]);
    const [shuffledOptions, setShuffledOptions] = useState({});

    useEffect(() => {
        // Shuffle the kanjiInfo array
        const shuffledKanji = [...kanjiInfo].sort(() => Math.random() - 0.5);
        setShuffledKanjiInfo(shuffledKanji);

        // Shuffle options for each quiz type
        const options = {};
        shuffledKanji.forEach((item, index) => {
            // Get all examples except the current item's examples
            const otherExamples = shuffledKanji
                .filter((otherItem) => otherItem.kanji.kanji !== item.kanji.kanji)
                .flatMap((otherItem) => otherItem.kanji.examples.split('<br>'));

            // Shuffle and select 4 incorrect examples
            const shuffledOtherExamples = otherExamples.sort(() => Math.random() - 0.5).slice(0, 4);

            // Add the correct example
            const correctExample = item.kanji.examples.split('<br>')[0];
            shuffledOtherExamples.push(correctExample);

            // Shuffle the final options
            options[`kanjiToExample-${index}`] = shuffledOtherExamples.sort(() => Math.random() - 0.5);
        });
        setShuffledOptions(options);
    }, [kanjiInfo]);

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
            <h3>Match the Kanji to an Example Word</h3>
            {shuffledKanjiInfo.map((item, index) => {
                const options = shuffledOptions[`kanjiToExample-${index}`];
                return (
                    <div key={index} className="quiz-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                        <div className="kanji" style={{ fontSize: '7em', marginRight: '0.5rem' }}>
                            {item.kanji.kanji}
                        </div>
                        <div className="options">
                            {options.map((option, idx) => {
                                const [kanji, reading, ...meaningParts] = option.split(' ');
                                const readingText = reading.replace('(', '').replace(')', '');
                                const meaning = meaningParts.join(' ');
                                const isCorrect = answerCorrectness[`kanjiToExample-${index}`];
                                const isSelectedAnswer = selectedAnswers[`kanjiToExample-${index}`] === option;
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
                                            name={`kanjiToExample-${index}`}
                                            value={option}
                                            checked={isSelectedAnswer}
                                            onChange={() => handleRadioChange(`kanjiToExample-${index}`, option, item.kanji.examples.includes(option))}
                                        />
                                        {`${readingText.trim()} - ${meaning.trim()}`}
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

export default KanjiToExampleQuiz;