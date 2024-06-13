import React from "react";
import {ConstrainedBox} from "../../components/boxes";
import {Text} from "../../components/text";

export default function NightFinished() {
    return (
        <>
            <ConstrainedBox width={289}>
                <Text size={18} opacity={0.75}>
                    see screen to learn what happened during the night
                </Text>
            </ConstrainedBox>
        </>
    )
}