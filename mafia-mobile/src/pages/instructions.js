import React, {useState} from "react";
import {Text} from "../components/text";
import {TheButton} from "../components/button";

export default function Instructions({isHost, sendMessageToParent}) {
    const [skipPressed, setSkipPressed] = useState(false);
    const handleSkip = () => {
        sendMessageToParent({name: 'skip'});
        setSkipPressed(true);
    }

    return (
        <>
            <Text size={18} opacity={0.5}>
                see screen for instructions
            </Text>
            {
                isHost ?
                    <TheButton onClick={handleSkip} disabled={skipPressed}>
                        <Text size={18} weight={700}>
                            skip
                        </Text>
                    </TheButton>
                    :
                    null
            }
        </>
    )
}