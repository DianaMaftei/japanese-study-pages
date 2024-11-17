import React, {useEffect, useState} from 'react';

const splitIntoKana = (text) => {
    return Array.from(text).map(char => char);
};

const flattenPitchData = (pitchData) => {
    if (!pitchData) {
        return [];
    }
    return pitchData.flatMap(mora => {
        const kanaArray = splitIntoKana(mora.part);
        return kanaArray.map(kana => ({
            part: kana,
            high: mora.high
        }));
    });
};

const PitchAccentGraph = ({vocabularyWord}) => {
    const [pitchData, setPitchData] = useState([]);

    useEffect(() => {
        const fetchPitchData = async () => {
            try {
                const response = await fetch('https://jotoba.de/api/search/words', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({query: vocabularyWord})
                });
                const data = await response.json();

                const word = data.words.find(word =>
                    word.reading.kanji === vocabularyWord || word.reading.kana === vocabularyWord
                );

                if (word) {
                    setPitchData(flattenPitchData(word.pitch));
                } else {
                    console.error('No matching word found');
                }
            } catch (error) {
                console.error('Error fetching pitch data:', error);
            }
        };

        fetchPitchData();
    }, [vocabularyWord]);

    if (!pitchData || pitchData.length === 0) {
        return null;
    }

    // Constants for SVG dimensions and positioning
    const moraWidth = 25;
    const width = moraWidth * pitchData.length;
    const height = 60;
    const textY = 30;
    const lineOffsetY = 15;
    const strokeWidth = 2;

    // Generate the path for the pitch accent line
    const generatePath = () => {
        let path = '';

        pitchData.forEach((mora, index) => {
            const x = index * moraWidth;
            const nextX = (index + 1) * moraWidth + 5;
            const y = mora.high ? textY - lineOffsetY : textY + lineOffsetY;
            const nextMora = pitchData[index + 1];
            const nextY = nextMora ? (nextMora.high ? textY - lineOffsetY : textY + lineOffsetY) : null;

            if (index === 0) {
                // Start path
                path += `M ${x} ${y}`;
            }

            if (nextMora) {
                if (mora.high !== nextMora.high) {
                    // If pitch changes, draw horizontal then vertical
                    path += ` L ${nextX} ${y} L ${nextX} ${nextY}`;
                } else {
                    // Continue horizontal line
                    path += ` L ${nextX} ${y}`;
                }
            } else {
                // Extend the final horizontal line to end of last mora
                path += ` L ${nextX} ${y}`;
            }
        });

        return path;
    };

    return (
        <div className="inline-block">
            <svg
                viewBox={`-5 0 ${width + 10} ${height}`}
                width={width + 10}
                height={height}
                className="inline-block"
            >
                {/* Text for each mora */}
                {pitchData.map((mora, index) => (
                    <text
                        key={`text-${index}`}
                        x={index * moraWidth + (moraWidth / 2) + 5}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-lg"
                        fill="currentColor"
                        fontWeight="bold"
                    >
                        {mora.part}
                    </text>
                ))}

                {/* Pitch accent line */}
                <path
                    d={generatePath()}
                    stroke="green"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
            </svg>
        </div>
    );
};

export default PitchAccentGraph;