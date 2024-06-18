import React, {useContext, useEffect} from "react";
import {Box, Button} from "@mui/material";
import {Text} from "../components/text";
import {CoinColumnBox, CoinRowBox} from "../components/boxes";
import Coin from "../components/coin";
import { BannerIcon } from "../components/mafia-icon";
import { VariableContext } from "../contexts/variables";
import { ActionContext } from "../contexts/actions";

export default function WaitingPlayers() {
    const { handlePlayerJoin, handlePlayerSubmitRealname, handleHostStartGame } = useContext(ActionContext); // TODO: remove this line

    const { players } = useContext(VariableContext);

    const waitingRoomAudio = new Audio('./assets/waiting-room.mp3');
    waitingRoomAudio.volume = 0.75;

    useEffect(() => {
        waitingRoomAudio.loop = true;
        waitingRoomAudio.play();
        return () => waitingRoomAudio.pause();
    }, []);

    return (
        <>
            <Button
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 100,
                }}
                onClick={() => {
                    handlePlayerJoin("player" + players.length);
                }}
            >
                <Text size={24} color={'#fff'}>
                    Add Player (TODO: remove this button)
                </Text>
            </Button>
            <Button
                style={{
                    position: 'absolute',
                    top: 50,
                    right: 20,
                    zIndex: 100,
                }}
                onClick={() => {
                    handlePlayerSubmitRealname("player" + (players.length - 1), "Real Name");
                }}
            >
                <Text size={24} color={'#fff'}>
                    Submit real name (TODO: remove this button)
                </Text>
            </Button>
            <Button
                style={{
                    position: 'absolute',
                    top: 80,
                    right: 20,
                    zIndex: 100,
                }}
                onClick={() => {
                    handleHostStartGame();
                }}
            >
                <Text size={24} color={'#fff'}>
                    Host start game (TODO: remove this button)
                </Text>
            </Button>
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
                    <Coin name={players.length > 0 ? players[0].realname : undefined} isHost={true}/>
                    <Coin name={players.length > 1 ? players[1].realname : undefined}/>
                    <Coin name={players.length > 2 ? players[2].realname : undefined}/>
                    <Coin name={players.length > 3 ? players[3].realname : undefined}/>
                    <Coin name={players.length > 4 ? players[4].realname : undefined}/>
                    <Coin name={players.length > 5 ? players[5].realname : undefined}/>
                </CoinRowBox>
                <CoinRowBox>
                    <Coin name={players.length > 6 ? players[6].realname : undefined}/>
                    <Coin name={players.length > 7 ? players[7].realname : undefined}/>
                    <Coin name={players.length > 8 ? players[8].realname : undefined}/>
                    <Coin name={players.length > 9 ? players[9].realname : undefined}/>
                    <Coin name={players.length > 10 ? players[10].realname : undefined}/>
                    <Coin name={players.length > 11 ? players[11].realname : undefined}/>
                </CoinRowBox>
                <CoinRowBox>
                    <Coin name={players.length > 12 ? players[12].realname : undefined}/>
                    <Coin name={players.length > 13 ? players[13].realname : undefined}/>
                    <Coin name={players.length > 14 ? players[14].realname : undefined}/>
                    <Coin name={players.length > 15 ? players[15].realname : undefined}/>
                    <Coin name={players.length > 16 ? players[16].realname : undefined}/>
                    <Coin name={players.length > 17 ? players[17].realname : undefined}/>
                </CoinRowBox>
            </CoinColumnBox>
        </>
    )
}