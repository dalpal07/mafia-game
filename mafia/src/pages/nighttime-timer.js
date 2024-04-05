import React, {useEffect, useState} from "react";
import {InnerPageBox, SpaceBetweenRowBox} from "../components/boxes";
import {Box} from "@mui/material";
import {Text} from "../components/text";
import Timer from "../components/timer";

export default function NighttimeTimer({nighttimeOver, setNighttimeOver}) {
    const [timer, setTimer] = useState(120);

    useEffect(() => {
        if (nighttimeOver) {
            setTimer(120);
            return;
        }
        if (timer > 0) {
            const timeout = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearTimeout(timeout);
        }
        else {
            setNighttimeOver(true);
        }
    }, [timer, nighttimeOver]);

    return (
        <>
            <Text size={36} opacity={0.5}>
                night will end in:
            </Text>
            <Timer time={timer}/>
        </>
    )
}