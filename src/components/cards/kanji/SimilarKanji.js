import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SimilarKanji.css';

const SimilarKanji = ({ kanjiCharacter }) => {
  const [similarKanji, setSimilarKanji] = useState([]);
  const [selectedMeaning, setSelectedMeaning] = useState('');

  useEffect(() => {
    const fetchSimilarKanji = async () => {
      try {
        const response = await fetch(`https://niai-api.mrahhal.net/api/search?q=${kanjiCharacter}`);
        const data = await response.json();
        setSimilarKanji(data.kanjis[0].similar);
      } catch (error) {
        console.error('Error fetching similar kanji:', error);
      }
    };

    fetchSimilarKanji();
  }, [kanjiCharacter]);

  const handleKanjiClick = (meanings) => {
    setSelectedMeaning(meanings.join(', '));
  };

  return (
    <div>
      <h3>Similar Kanji</h3>
      <p className="kanji-meaning">
        {selectedMeaning || 'Click on a kanji to see its meaning'}
      </p>
      <div className="kanji-grid">
        {similarKanji.map((kanji) => (
          <div
            key={kanji.character}
            className="kanji-item"
            onClick={() => handleKanjiClick(kanji.meanings)}
          >
            <strong>{kanji.character}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

SimilarKanji.propTypes = {
  kanjiCharacter: PropTypes.string.isRequired,
};

export default SimilarKanji;