import React, {useEffect, useState} from "react";
import {InnerPageBox, SpaceBetweenRowBox} from "../components/boxes";
import {Box} from "@mui/material";
import {Text} from "../components/text";

export default function VotingResults({accused, fate, accusedRole, playDeath2Audio, evaluateVotingResults, sendMessageToParent, playersRef}) {
    const [showRole, setShowRole] = useState(false);
    const notExecutedAudio = new Audio('./assets/not-executed.mp3');
    const executedAudio = new Audio('./assets/executed.mp3');
    const narrationAudio = new Audio('./assets/narration.mp3');
    narrationAudio.volume = 0.5;

    useEffect(() => {
        narrationAudio.play();
        if (!fate) return;
        if (fate === 'live') {
            setTimeout(() => notExecutedAudio.play(), 1000);
            notExecutedAudio.onended = () => {
                narrationAudio.pause();
                setTimeout(() => evaluateVotingResults(fate), 1000);
            }
        }
        else {
            const accusedPlayer = playersRef.current.find(player => player.realName === accused);
            sendMessageToParent({to: 'one', name: 'male-scream', player: accusedPlayer.name});
            setTimeout(() => {
                executedAudio.play()
            }, 1000);
            executedAudio.onended = () => {
                narrationAudio.pause();
                playDeath2Audio();
                setShowRole(true);
                setTimeout(() => evaluateVotingResults(fate), 6000);
            }
        }

        return () => {
            notExecutedAudio.pause();
            executedAudio.pause();
            narrationAudio.pause();
        }
    }, [fate]);

    return (
        <>
            {
                showRole && fate === 'die' ?
                    <Box style={{height: 36}}/>
                    :
                    null
            }
            <Text size={56}>
                {accused}
            </Text>
            <Text size={56} color={fate === 'live' ? 'var(--Main-White)' : 'var(--Main-Red)'} weight={700}>
                {fate === 'live' ? 'has survived' : 'has been executed'}
            </Text>
            {
                showRole && fate === 'die' ?
                    <Text size={36} opacity={accusedRole === 'mafia' ? 1 : 0.75} color={accusedRole === 'mafia' ? 'var(--Main-Red)' : 'var(--Main-White)'}>
                        {accused} was{accusedRole === 'mafia' ? ' ' : ' not '}mafia
                    </Text>
                    :
                    null
            }
        </>
    )
}