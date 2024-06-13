import React, {useEffect} from "react";
import {InnerPageBox, SpaceBetweenRowBox} from "../components/boxes";
import {Box} from "@mui/material";
import {Text} from "../components/text";

export default function RevealIdentity() {
    const identityAudio = new Audio('./assets/identity.mp3');

    useEffect(() => {
        setTimeout(() => identityAudio.play(), 1000);
        return () => identityAudio.pause();
    }, []);

    return (
        <>
            <Text size={56} opacity={0.75}>
                look at your phone
            </Text>
            <Text size={42} color={'var(--Main-Red)'} weight={700}>
                don’t tell anyone
            </Text>
        </>
    )
}