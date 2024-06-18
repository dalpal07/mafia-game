import React, {useEffect} from "react";
import {Text} from "../components/text";

export default function GameOver() {
    const mafiaWinAudio = new Audio('./assets/mafia-win.mp3');
    const civiliansWinAudio = new Audio('./assets/civilians-win.mp3');
    const winner = 'mafia';

    useEffect(() => {
        if (!winner) return;
        if (winner === 'mafia') {
            const timeout = setTimeout(() => mafiaWinAudio.play(), 1000);

            return () => {
                clearTimeout(timeout);
                mafiaWinAudio.pause();
            }
        }
        else {
            const timeout = setTimeout(() => civiliansWinAudio.play(), 1000);

            return () => {
                clearTimeout(timeout);
                civiliansWinAudio.pause();
            }
        }
    }, [winner]);

    return (
        <>
            <Text size={36} opacity={0.5}>
                the game has ended
            </Text>
            <Text size={56} weight={700} color={winner === 'mafia' ? 'var(--Main-Red)' : 'var(--Main-White)'}>
                {winner === 'mafia' ? 'mafia' : 'civilians'} win
            </Text>
        </>
    )
}