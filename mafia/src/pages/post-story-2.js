import React, {useEffect} from "react";
import {InnerPageBox, SpaceBetweenRowBox} from "../components/boxes";
import {Box} from "@mui/material";
import {Text} from "../components/text";

export default function PostStory2({moveToAccusations}) {
    const invitationToLieAudio = new Audio('./assets/invitation-to-lie.mp3');

    useEffect(() => {
        setTimeout(() => invitationToLieAudio.play(), 1000);

        invitationToLieAudio.onended = () => {
            setTimeout(() => moveToAccusations(), 1000);
        }

        return () => invitationToLieAudio.pause();
    }, []);

    return (
        <>
            <Text size={56} opacity={0.75}>
                you can lie as much as you’d like
            </Text>
        </>
    )
}