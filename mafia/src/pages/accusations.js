import React, {useEffect} from "react";
import {InnerPageBox, SpaceBetweenRowBox} from "../components/boxes";
import {Box} from "@mui/material";
import {Text} from "../components/text";
import Timer from "../components/timer";

export default function Accusations({dayOver, setDayOver, dayTimer, setDayTimer, dayPaused}) {
    const makeAccusationAudio = new Audio('./assets/make-accusation.mp3');

    useEffect(() => {
        if (dayTimer !== 300) return;
        makeAccusationAudio.play();

        return () => makeAccusationAudio.pause();
    }, []);

    useEffect(() => {
        if (dayOver) {
            setDayTimer(300);
            return;
        }
        if (dayPaused) {
            return;
        }
        if (dayTimer > 0) {
            const timeout = setTimeout(() => {
                setDayTimer(dayTimer - 1);
            }, 1000);
            return () => clearTimeout(timeout);
        }
        else {
            setDayOver(true);
        }
    }, [dayTimer, dayOver, dayPaused]);

    return (
        <>
            <Text size={36} opacity={0.5}>
                you have 5 minutes to make an accusation
            </Text>
            <Timer time={dayTimer}/>
        </>
    )
}