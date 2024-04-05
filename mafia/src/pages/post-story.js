import React from "react";
import {InnerPageBox, SpaceBetweenRowBox} from "../components/boxes";
import {Box} from "@mui/material";
import {Text} from "../components/text";

export default function PostStory({targetedName, died}) {
    return (
        <>
            <Text size={42} opacity={0.75}>
                {targetedName} was{died ? ' ' : ' almost '}murdered by the Mafia last night. now you all have the opportunity to execute someone for this crime.
            </Text>
            <Text size={42} opacity={0.75}>
                feel free to talk amongst yourselves to make accusations. once 2 or more people have accused the same person, you will all vote on whether that person lives or dies.
            </Text>
        </>
    )
}