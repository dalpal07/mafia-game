import {Text} from "../components/text";
import React, { useEffect, useContext } from "react";
import { ActionContext } from "../contexts/actions";
import { Button } from "@mui/material";

export default function Instructions() {
    const { handleProgressToNighttimePage, handleHostSkipInstructions } = useContext(ActionContext); // TODO: remove handleHostSkipInstructions

    const instructions1Audio = new Audio('./assets/instructions1.mp3');
    const instructions2Audio = new Audio('./assets/instructions2.mp3');

    useEffect(() => {
        const timeout = setTimeout(() => instructions1Audio.play(), 1000);

        instructions1Audio.onended = () => {
            setTimeout(() => instructions2Audio.play(), 1000);
        }

        instructions2Audio.onended = () => {
            setTimeout(() => handleProgressToNighttimePage(), 1000);
        }

        return () => {
            clearTimeout(timeout);
            instructions1Audio.pause();
            instructions2Audio.pause();
        }
    }, []);

    return (
        <>
            <Button
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 100,
                }}
                onClick={() => {
                    handleHostSkipInstructions();
                }}
            >
                <Text size={24} color={'#fff'}>
                    Skip instructions (TODO: remove this button)
                </Text>
            </Button>
            <Text size={56} opacity={0.75}>
                nighttime roles
            </Text>
            <Text size={56} color={'var(--Main-Red)'} weight={700}>
                mafia:
            </Text>
            <Text size={42} opacity={0.75} style={{marginTop: -18}}>
                kill someone
            </Text>
            <Text size={56} color={'var(--Main-Yellow)'} weight={700}>
                angel:
            </Text>
            <Text size={42} opacity={0.75} style={{marginTop: -18}}>
                save this person
            </Text>
            <Text size={56} color={'var(--Main-Blue)'} weight={700}>
                detective:
            </Text>
            <Text size={42} opacity={0.75} style={{marginTop: -18}}>
                discover an identity
            </Text>
            <Text size={56} weight={700}>
                civilians:
            </Text>
            <Text size={42} opacity={0.75} style={{marginTop: -18}}>
                must play trivia
            </Text>
        </>
    )
}