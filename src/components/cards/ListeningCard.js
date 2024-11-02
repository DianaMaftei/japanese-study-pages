import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography
} from '@mui/material';

const ListeningCard = ({ song }) => {
    const [showTranslation, setShowTranslation] = useState(false);

    const renderLyrics = (lyrics) => {
        return lyrics.split('\n').map((line, index) => (
            <Typography key={index} variant="body1" gutterBottom>
                {line}
            </Typography>
        ));
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {song.song_lyrics.song_title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {song.style}
                </Typography>
                {song.id.map((songId, index) => {
                    const audioUrl = `https://cdn1.suno.ai/${songId}.mp3`;
                    const thumbnailUrl = `https://cdn2.suno.ai/image_${songId}.jpeg`;

                    return (
                        <Box key={index} display="flex" alignItems="center" mb={3}>
                            <img src={thumbnailUrl} alt="Song Thumbnail" style={{ width: '100px', height: '100px', marginRight: '10px', objectFit: 'cover' }} />
                            <audio src={audioUrl} controls style={{ flex: 1, height: '50px' }} />
                        </Box>
                    );
                })}
                <Box mb={3}>
                    <Box mb={2} onClick={() => setShowTranslation(!showTranslation)} sx={{ cursor: 'pointer' }}>
                        {renderLyrics(song.song_lyrics.lyrics_japanese)}
                    </Box>
                    {showTranslation && (
                        <Box mb={2}>
                            {renderLyrics(song.song_lyrics.lyrics_english_translation)}
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ListeningCard;