import React, {useEffect} from "react";
import {Text} from "../components/text";

export default function Voting({accused, goToVotingTimer}) {
    const liveOrDieAudio = new Audio('./assets/live-or-die.mp3');

    useEffect(() => {
        liveOrDieAudio.play();

        liveOrDieAudio.onended = () => goToVotingTimer();

        return () => liveOrDieAudio.pause();
    }, []);

    return (
        <>
            <Text size={56} opacity={0.75}>
                will {accused} live or die?
            </Text>
        </>
    )
}