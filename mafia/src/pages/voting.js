import React, {useEffect, useContext} from "react";
import { Text } from "../components/text";

export default function Voting() {
    const liveOrDieAudio = new Audio('./assets/live-or-die.mp3');

    useEffect(() => {
        liveOrDieAudio.play();

        liveOrDieAudio.onended = () => () => { };

        return () => liveOrDieAudio.pause();
    }, []);

    return (
        <>
            <Text size={56} opacity={0.75}>
                will {"accused person"} live or die?
            </Text>
        </>
    )
}