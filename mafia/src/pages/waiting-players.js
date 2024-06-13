import React, {useEffect} from "react";
import {Box} from "@mui/material";
import {Text} from "../components/text";
import {CoinColumnBox, CoinRowBox} from "../components/boxes";
import Coin from "../components/coin";
import {BannerIcon} from "../components/mafia-icon";

export default function WaitingPlayers({players}) {
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
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
            }}>
                <Text size={36} opacity={0.5}>
                    waiting for players to join
                </Text>
            </Box>
            <CoinColumnBox>
                <CoinRowBox>
                    <Coin name={players.length > 0 ? players[0].realName : undefined} isHost={true}/>
                    <Coin name={players.length > 1 ? players[1].realName : undefined}/>
                    <Coin name={players.length > 2 ? players[2].realName : undefined}/>
                    <Coin name={players.length > 3 ? players[3].realName : undefined}/>
                    <Coin name={players.length > 4 ? players[4].realName : undefined}/>
                    <Coin name={players.length > 5 ? players[5].realName : undefined}/>
                </CoinRowBox>
                <CoinRowBox>
                    <Coin name={players.length > 6 ? players[6].realName : undefined}/>
                    <Coin name={players.length > 7 ? players[7].realName : undefined}/>
                    <Coin name={players.length > 8 ? players[8].realName : undefined}/>
                    <Coin name={players.length > 9 ? players[9].realName : undefined}/>
                    <Coin name={players.length > 10 ? players[10].realName : undefined}/>
                    <Coin name={players.length > 11 ? players[11].realName : undefined}/>
                </CoinRowBox>
                <CoinRowBox>
                    <Coin name={players.length > 12 ? players[12].realName : undefined}/>
                    <Coin name={players.length > 13 ? players[13].realName : undefined}/>
                    <Coin name={players.length > 14 ? players[14].realName : undefined}/>
                    <Coin name={players.length > 15 ? players[15].realName : undefined}/>
                    <Coin name={players.length > 16 ? players[16].realName : undefined}/>
                    <Coin name={players.length > 17 ? players[17].realName : undefined}/>
                </CoinRowBox>
            </CoinColumnBox>
        </>
    )
}