import React, {useEffect, useState} from 'react';
import {Text} from "../../components/text";
import NightTrivia from "./trivia";

export default function NightCivilian({name, sendMessageToParent}) {
    const [answeringTrivia, setAnsweringTrivia] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnsweringTrivia(true);
        }, 4000);
    }, []);

    if (answeringTrivia) {
        return (
            <NightTrivia sendMessageToParent={sendMessageToParent} name={name}/>
        )
    }

    return (
        <>
            <Text>
                trivia
            </Text>
            <Text size={18} opacity={0.5}>
                if you don’t complete at least one round
            </Text>
            <Text weight={700} color={'var(--Main-Red)'}>
                you could risk death
            </Text>
        </>
    )
}