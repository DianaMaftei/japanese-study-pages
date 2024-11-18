import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid
} from '@mui/material';

const ListeningCard = ({song}) => {
    const renderLyrics = (lyrics, isTranslation = false) => {
        return lyrics.split(/(?<=。)|(?<=\.)|\n/).map((line, index) => (
            <Typography key={index} variant={isTranslation ? "body2" : "body1"} gutterBottom align="left">
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
                            <img src={thumbnailUrl} alt="Song Thumbnail"
                                 style={{width: '100px', height: '100px', marginRight: '10px', objectFit: 'cover'}}/>
                            <audio src={audioUrl} controls style={{flex: 1, height: '50px'}}/>
                        </Box>
                    );
                })}
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <Box mb={3} border={1} borderColor="grey.400" p={2}>
                            {renderLyrics(song.song_lyrics.lyrics_japanese)}
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box mb={3} border={1} borderColor="grey.400" p={2}>
                            {renderLyrics(song.song_lyrics.lyrics_english_translation, true)}
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ListeningCard;