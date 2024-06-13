import {ConstrainedBox, InnerPageBox, SpaceBetweenRowBox} from "../components/boxes";
import {Box} from "@mui/material";
import {Text} from "../components/text";
import React, {useEffect} from "react";

export default function Instructions({setStartNighttime}) {
    const instructions1Audio = new Audio('./assets/instructions1.mp3');
    const instructions2Audio = new Audio('./assets/instructions2.mp3');

    useEffect(() => {
        const timeout = setTimeout(() => instructions1Audio.play(), 1000);

        instructions1Audio.onended = () => {
            setTimeout(() => instructions2Audio.play(), 1000);
        }

        instructions2Audio.onended = () => {
            setTimeout(() => setStartNighttime(true), 1000);
        }

        return () => {
            clearTimeout(timeout);
            instructions1Audio.pause();
            instructions2Audio.pause();
        }
    }, []);

    return (
        <>
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