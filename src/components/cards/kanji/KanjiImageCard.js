import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import './KanjiCard.css';

const KanjiImageCard = ({ kanjiInfo }) => {
    const [flipped, setFlipped] = useState(false);

    const handleImageClick = () => {
        setFlipped(!flipped);
    };

    return (
        <Box mt={2} className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={handleImageClick}>
            <Box className="flip-card-inner">
                <Box className="flip-card-front">
                    <img
                        src={`data:image/png;base64,${kanjiInfo.encoded_image}`}
                        alt={kanjiInfo.image_description}
                        style={{ maxWidth: '100%' }}
                    />
                </Box>
                <Box className="flip-card-back">
                    <Typography variant="body1" gutterBottom>
                        <strong>Image Description:</strong> {kanjiInfo.image_description}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default KanjiImageCard;