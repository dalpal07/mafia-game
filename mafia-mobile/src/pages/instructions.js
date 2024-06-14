import React, {useState, useContext} from "react";
import {Text} from "../components/text";
import { TheButton } from "../components/button";
import { GlobalContext } from "../contexts/global";

export default function Instructions({ isHost, sendMessageToParent }) {
    const { state } = useContext(GlobalContext);

    const [skipPressed, setSkipPressed] = useState(false);
    const handleSkip = () => {
        sendMessageToParent({name: 'skip', player: state.gamername});
        setSkipPressed(true);
    }

    return (
        <>
            <Text size={18} opacity={0.5}>
                see screen for instructions
            </Text>
            {
                state.isHost ?
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