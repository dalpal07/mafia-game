import React from "react";
import {ConstrainedBox} from "../../components/boxes";
import {Text} from "../../components/text";

export default function HeavenWelcome() {
    return (
        <>
            <Text color={'var(--Main-Black)'}>
                welcome to heaven
            </Text>
            <ConstrainedBox width={289}>
                <Text color={'var(--Main-Black)'} size={18} opacity={0.75}>
                    you will be able to select to see the actions of other players
                </Text>
            </ConstrainedBox>
            <Text color={'var(--Main-Red)'} weight={700}>
                don't say a word
            </Text>
        </>
    )
}