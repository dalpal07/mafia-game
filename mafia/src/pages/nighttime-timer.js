import React, {useContext, useEffect} from "react";
import {Text} from "../components/text";
import Timer from "../components/timer";
import { VariableContext } from "../contexts/variables";

export default function NighttimeTimer() {
    const { nighttimeTimer, setNighttimeTimer } = useContext(VariableContext); 

    return (
        <>
            <Text size={36} opacity={0.5}>
                night will end in:
            </Text>
            <Timer timer={nighttimeTimer} setTimer={setNighttimeTimer} />
        </>
    )
}