import React from "react";
import {Text} from "../components/text";
import {Box} from "@mui/material";
import {NameButton, TheButton} from "../components/button";

export default function Win({winner, isHost, sendMessageToParent}) {
    const handlePlayAgain = () => {
        sendMessageToParent({name: 'playAgain'});
    }

    const handleExit = () => {
        sendMessageToParent({name: 'exit-press'});
    }

    return (
        <>
            <Text size={18} opacity={0.5}>
                game over
            </Text>
            <Text opacity={0.75}>
                {winner ? 'your team wins!' : 'you failed'}
            </Text>
            {
                isHost ?
                    <>
                        <Box style={{height: 1}}/>
                        <TheButton onClick={handlePlayAgain}>
                            <Text size={18} weight={700}>
                                play again
                            </Text>
                        </TheButton>
                        <NameButton onClick={handleExit}>
                            <Text size={18} weight={700}>
                                exit
                            </Text>
                        </NameButton>
                    </>
                    :
                    null
            }
        </>
    )
}