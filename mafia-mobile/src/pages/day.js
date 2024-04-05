import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {ScrollableFlexColumnBox} from "../components/boxes";
import {Text} from "../components/text";
import {NameButton, TheButton} from "../components/button";
import {Finger, Lock} from "../components/icons";
import Lottie from "react-lottie-player";
import lottieJson from '../assets/accusation-warning.json';

export default function Day({name, role, beingAccused, players, knownRoles, sendMessageToParent}) {
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const playersToList = players.filter(player => !player.inHeaven);

    const handleAccuse = () => {
        sendMessageToParent({name: 'accuse', target: selectedPlayer.name, player: name});
        setSelectedPlayer(null);
    }

    return (
        <>
            {
                beingAccused ?
                    <>
                        <Text weight={700} color={'var(--Main-Red)'} size={24}>
                            you are being accused
                        </Text>
                        <Text size={18} opacity={0.75}>
                            defend yourself
                        </Text>
                    </>
                    :
                    <>
                        <Text>
                            who will you accuse?
                        </Text>
                        <Text size={18} opacity={0.75}>
                            2+ accusations are required
                        </Text>
                    </>
            }
            <ScrollableFlexColumnBox>
                {
                    playersToList.map((player, index) => {
                        const myAccusation = player.accusations.find(accusation => accusation === name);
                        const otherAccusation = player.accusations.find(accusation => accusation !== name);
                        return (
                            <NameButton
                                key={index}
                                selected={selectedPlayer?.realName === player.realName}
                                onClick={() => {
                                    if (myAccusation) return;
                                    setSelectedPlayer(player)
                                }}
                                disabled={player.name === name || player.locked}
                            >
                                <Box
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 3,
                                        position: 'absolute',
                                        right: 15,
                                    }}
                                >
                                    {
                                        otherAccusation ?
                                            <Box
                                                style={{
                                                    width: 30.158,
                                                    height: 30.158,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'transparent',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    position: 'relative',
                                                    opacity: player.name === name ? 1 : 0.5,
                                                }}
                                            >
                                                {
                                                    player.name === name ?
                                                        <Lottie
                                                            loop
                                                            animationData={lottieJson}
                                                            play
                                                            style={{maxHeight: 35}}
                                                        />
                                                        :
                                                        selectedPlayer?.realName === player.realName ?
                                                            <Finger color={'var(--Main-Black)'}/>
                                                            :
                                                            <Finger color={'var(--Main-White)'}/>
                                                }
                                            </Box>
                                            :
                                            null
                                    }
                                    {
                                        myAccusation ?
                                            <Box
                                                style={{
                                                    width: 30.158,
                                                    height: 30.158,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--Main-Red)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    position: 'relative',
                                                }}
                                            >
                                                <Finger/>
                                            </Box>
                                            :
                                            null
                                    }
                                </Box>
                                <Box
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        left: 15,
                                    }}
                                >
                                    {
                                        player.locked ?
                                            <Lock/>
                                            :
                                            null
                                    }
                                </Box>
                                <Text size={18} color={selectedPlayer?.realName === player.realName ? 'var(--Main-Black)' : 'var(--Main-White)'}>
                                    {player.realName}{
                                        (role === 'mafia' && player.role === 'mafia') ||
                                        (role === 'detective' && knownRoles.includes(player.name)) ?
                                            ` (${player.role})`
                                            :
                                            null
                                    }
                                </Text>
                            </NameButton>
                        )
                    })
                }
            </ScrollableFlexColumnBox>
            <TheButton
                onClick={handleAccuse}
                disabled={!selectedPlayer}
            >
                <Text size={18} weight={700}>
                    accuse
                </Text>
            </TheButton>
        </>
    )
}