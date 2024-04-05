import React from "react";
import {ConstrainedBox, ScrollableFlexColumnBox} from "../../components/boxes";
import {Text} from "../../components/text";
import {NameButton, TheButton} from "../../components/button";
import {useState} from "react";
import {Box} from "@mui/material";
import NightTrivia from "./trivia";
import {Skull} from "../../components/icons";

export default function NightMafia({name, players, sendMessageToParent}) {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [confirmed, setConfirmed] = useState(false);

    const [answeringTrivia, setAnsweringTrivia] = useState(false);

    const playersToList = players.filter(player => !player.inHeaven);

    const handleConfirmation = () => {
        setConfirmed(true);
        sendMessageToParent({name: 'finishedNight', player: name});
    }

    if (answeringTrivia) {
        return (
            <NightTrivia/>
        )
    }

    if (confirmed) {
        return (
            <>
                <ConstrainedBox width={342}>
                    <Text size={18} opacity={0.75}>
                        your vote will be taken into consideration
                    </Text>
                </ConstrainedBox>
                <Text size={18} weight={600} color={'var(--Main-Red)'}>
                    soon, someone will die
                </Text>
                <Box style={{flex: 1}}/>
                <Text size={18} opacity={0.75}>
                    the night isn't over  yet
                </Text>
                <Box style={{height: 1}}/>
                <TheButton onClick={() => setAnsweringTrivia(true)}>
                    <Text size={18} weight={700}>
                        play trivia
                    </Text>
                </TheButton>
            </>
        )
    }

    return (
        <>
            <Text>
                who will die tonight?
            </Text>
            <Text size={18} opacity={0.5}>
                each mafia has 1 vote
            </Text>
            <ScrollableFlexColumnBox>
                {
                    playersToList.map((player, index) => {
                        const iVoted = player.killVotes.includes(name);
                        const otherKillVotes = player.killVotes.filter(voter => voter !== name).length;
                        return (
                            <NameButton
                                key={index}
                                disabled={player.role === 'mafia'}
                                onClick={() => {
                                    if (selectedPlayer === player.name) {
                                        setSelectedPlayer(null);
                                        sendMessageToParent({name: 'changeKillVote', oldTarget: player.name, target: null, player: name});
                                        return;
                                    }
                                    if (selectedPlayer) {
                                        sendMessageToParent({name: 'changeKillVote', oldTarget: selectedPlayer, target: player.name, player: name});
                                    }
                                    else {
                                        sendMessageToParent({name: 'killVote', target: player.name, player: name});
                                    }
                                    setSelectedPlayer(player.name);
                                }}
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
                                        otherKillVotes > 0 ?
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
                                                    opacity: 0.5,
                                                }}
                                            >
                                                <Skull/>
                                                {
                                                    otherKillVotes > 1 ?
                                                        <Text size={18} style={{position: 'absolute', right: -17, bottom: -2}}>
                                                            x{otherKillVotes}
                                                        </Text>
                                                        :
                                                        null
                                                }
                                            </Box>
                                            :
                                            null
                                    }
                                    {
                                        otherKillVotes > 1 ?
                                            <Box style={{width: 17}}/>
                                            :
                                            null
                                    }
                                    {
                                        iVoted ?
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
                                                <Skull/>
                                            </Box>
                                            :
                                            null
                                    }
                                </Box>
                                <Text size={18}>
                                    {player.realName}{player.role === 'mafia' ? ' (mafia)' : null}
                                </Text>
                            </NameButton>
                        )
                    })
                }
            </ScrollableFlexColumnBox>
            <Box style={{flex: 1}}/>
            <TheButton disabled={!selectedPlayer} onClick={handleConfirmation} style={{position: 'relative'}}>
                <Text size={18} weight={700}>
                    confirm votes
                </Text>
            </TheButton>
        </>
    )
}