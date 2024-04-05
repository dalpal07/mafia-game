import React from "react";
import {ConstrainedBox} from "../components/boxes";
import {Text} from "../components/text";
import {Box} from "@mui/material";

export default function Preparation() {
    return (
        <>
            <Box style={{height: 50}}/>
            <Text>
                are you ready?
            </Text>
            <ConstrainedBox width={248}>
                <Text size={18} opacity={0.5}>
                    make sure other players can’t see your screen
                </Text>
            </ConstrainedBox>
        </>
    )
}