import React, {useContext, useEffect} from "react";
import {Box} from "@mui/material";
import {Text} from "../components/text";
import {CoinColumnBox, CoinRowBox} from "../components/boxes";
import Coin from "../components/coin";
import { BannerIcon } from "../components/mafia-icon";
import {GlobalContext} from "../contexts/global";

export default function WaitingPlayers({ players }) {
    const { playerStates } = useContext(GlobalContext);
    const waitingRoomAudio = new Audio('./assets/waiting-room.mp3');
    waitingRoomAudio.volume = 0.75;

    useEffect(() => {
        waitingRoomAudio.loop = true;
        waitingRoomAudio.play();
        return () => waitingRoomAudio.pause();
    }, []);

    return (
        <>
            <Box style={{
                position: 'absolute',
                top: 0,
                left: 95.26,
            }}>
                <BannerIcon/>
            </Box>
            <Box style={{height: 25}}/>
            <Box style={{height: 25}}/>
            <Box style={{height: 25}}/>
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}>
                <Text size={36} opacity={0.5}>
                    waiting for players to join
                </Text>
            </Box>
            <CoinColumnBox>
                <CoinRowBox>
                    <Coin name={playerStates.length > 0 ? playerStates[0].realname : undefined} isHost={true}/>
                    <Coin name={playerStates.length > 1 ? playerStates[1].realname : undefined}/>
                    <Coin name={playerStates.length > 2 ? playerStates[2].realname : undefined}/>
                    <Coin name={playerStates.length > 3 ? playerStates[3].realname : undefined}/>
                    <Coin name={playerStates.length > 4 ? playerStates[4].realname : undefined}/>
                    <Coin name={playerStates.length > 5 ? playerStates[5].realname : undefined}/>
                </CoinRowBox>
                <CoinRowBox>
                    <Coin name={playerStates.length > 6 ? playerStates[6].realname : undefined}/>
                    <Coin name={playerStates.length > 7 ? playerStates[7].realname : undefined}/>
                    <Coin name={playerStates.length > 8 ? playerStates[8].realname : undefined}/>
                    <Coin name={playerStates.length > 9 ? playerStates[9].realname : undefined}/>
                    <Coin name={playerStates.length > 10 ? playerStates[10].realname : undefined}/>
                    <Coin name={playerStates.length > 11 ? playerStates[11].realname : undefined}/>
                </CoinRowBox>
                <CoinRowBox>
                    <Coin name={playerStates.length > 12 ? playerStates[12].realname : undefined}/>
                    <Coin name={playerStates.length > 13 ? playerStates[13].realname : undefined}/>
                    <Coin name={playerStates.length > 14 ? playerStates[14].realname : undefined}/>
                    <Coin name={playerStates.length > 15 ? playerStates[15].realname : undefined}/>
                    <Coin name={playerStates.length > 16 ? playerStates[16].realname : undefined}/>
                    <Coin name={playerStates.length > 17 ? playerStates[17].realname : undefined}/>
                </CoinRowBox>
            </CoinColumnBox>
        </>
    )
}