import React, {useEffect} from "react";
import {InnerPageBox, SpaceBetweenRowBox} from "../components/boxes";
import {Box} from "@mui/material";
import {Text} from "../components/text";

export default function Accused({accused, accuser1, accuser2, goToVoting}) {
    const haveAccusationAudio = new Audio('./assets/have-accusation.mp3');

    useEffect(() => {
        setTimeout(() => haveAccusationAudio.play(), 1000);

        haveAccusationAudio.onended = () => {
            setTimeout(() => goToVoting(), 1000);
        }

        return () => haveAccusationAudio.pause();
    }, []);

    return (
        <>
            <Text size={56}>
                {accused}
            </Text>
            <Text size={36} opacity={0.5}>
                has been accused by
            </Text>
            <Text size={56} opacity={0.75}>
                {accuser1} and {accuser2}
            </Text>
        </>
    )
}