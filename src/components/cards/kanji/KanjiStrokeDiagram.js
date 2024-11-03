import React, { useEffect, useRef } from 'react';
import 'dmak';
import Raphael from 'raphael';
import { SkipPrevious, Pause, PlayArrow, Replay, SkipNext } from '@mui/icons-material';

window.Raphael = Raphael;

const KanjiStrokeDiagram = ({ character, id }) => {
    const kanjiDrawRef = useRef(null);
    const dmakRef = useRef(null);

    useEffect(() => {
        if (kanjiDrawRef.current) {
            // Check if the Dmak instance already exists
            if (!dmakRef.current) {
                // Initialize new Dmak instance with unique ID
                dmakRef.current = new window.Dmak(character, {
                    'element': id,
                    'height': 250,
                    'width': 250,
                    "stroke": {attr: {active: "#943a51"}},
                    step: 0.01,
                    "uri": 'https://raw.githubusercontent.com/KanjiVG/kanjivg/refs/heads/master/kanji/'
                });
            }
        }

        // Cleanup function to handle component unmounting
        return () => {
            if (dmakRef.current) {
                dmakRef.current.erase();
            }
        };
    }, [character, id]);

    const handlePrevious = () => dmakRef.current?.eraseLastStrokes(1);
    const handlePause = () => dmakRef.current?.pause();
    const handlePlay = () => dmakRef.current?.render();
    const handleReplay = () => dmakRef.current?.erase();
    const handleNext = () => dmakRef.current?.renderNextStrokes(1);

    return (
        <div className="k-kanji">
            <div id={id} ref={kanjiDrawRef} />
            <div className="sample-btn">
                <button onClick={handlePrevious}>
                    <SkipPrevious fontSize="small" />
                </button>
                <button onClick={handlePause}>
                    <Pause fontSize="small" />
                </button>
                <button onClick={handlePlay}>
                    <PlayArrow fontSize="small" />
                </button>
                <button onClick={handleReplay}>
                    <Replay fontSize="small" />
                </button>
                <button onClick={handleNext}>
                    <SkipNext fontSize="small" />
                </button>
            </div>
        </div>
    );
};

export default KanjiStrokeDiagram;