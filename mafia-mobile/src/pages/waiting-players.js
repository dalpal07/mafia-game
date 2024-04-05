import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {Text} from "../components/text";
import {TheButton} from "../components/button";
import Lottie from 'react-lottie-player'
import lottieJson from '../assets/welcome-banner.json';

export default function WaitingPlayers({isHost, enoughPlayers, screenHeight, minPlayers, everyoneReady, sendMessageToParent}) {
    const [bannerShown, setBannerShown] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setBannerShown(true);
        }, 1250);
    }, []);

    const handleStart = () => {
        sendMessageToParent({name: 'start'});
    }

    if (!isHost) {
        return (
            <>
                <Lottie
                    loop={false}
                    animationData={lottieJson}
                    play
                    style={{
                        height: screenHeight - 221,
                    }}
                />
                <Box style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    maxWidth: 400,
                    gap: 18,
                    opacity: bannerShown ? 1 : 0,
                    transition: 'opacity ease-in 0.25s',
                }}>
                    <Box style={{height: 26}}/>
                    <Text size={42}>
                        welcome
                    </Text>
                    <Text size={18} opacity={0.5}>
                        waiting for other players to join
                    </Text>
                    <Box style={{height: 21}}/>
                    <Box style={{height: 18}}/>
                </Box>
            </>
        )
    }
    return (
        <>
            <Lottie
                loop={false}
                animationData={lottieJson}
                play
                style={{
                    height: screenHeight - 221,
                }}
            />
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                maxWidth: 400,
                gap: 18,
                opacity: bannerShown ? 1 : 0,
                transition: 'opacity ease-in 0.25s',
            }}>
                <Box style={{height: 1}}/>
                <Text size={42}>
                    welcome
                </Text>
                <Text size={18} opacity={0.5}>
                    {enoughPlayers ? 'press start once all players are in ' : `requires ${minPlayers} players to start`}
                </Text>
                <TheButton disabled={!enoughPlayers || !everyoneReady} onClick={handleStart}>
                    <Text size={18} weight={700}>
                        Start
                    </Text>
                </TheButton>
                <Box style={{height: 18}}/>
            </Box>
        </>
    )
}