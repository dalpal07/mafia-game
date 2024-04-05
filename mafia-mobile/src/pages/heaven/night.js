import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {ConstrainedBox, ScrollableFlexColumnBox} from "../../components/boxes";
import {Text} from "../../components/text";
import {NameButton, TheButton} from "../../components/button";
import {Skull} from "../../components/icons";

export default function HeavenNight({players}) {
    const [selected, setSelected] = useState(null); // angel, detective, mafia
    const [actionsFollowing, setActionsFollowing] = useState(null);
    const [followingName, setFollowingName] = useState(null);
    const [followingTarget, setFollowingTarget] = useState(null);
    const [followingTargetRole, setFollowingTargetRole] = useState(null);

    const playersToList = players.filter(player => !player.inHeaven);

    useEffect(() => {
        if (actionsFollowing === 'angel') {
            const angelSaved = players.find(player => player.saved);
            if (angelSaved) {
                setFollowingTarget(angelSaved.realName);
            }
        }
        if (actionsFollowing === 'detective') {
            const detectiveFound = players.find(player => player.identified);
            if (detectiveFound) {
                setFollowingTarget(detectiveFound.realName);
                setFollowingTargetRole(detectiveFound.role);
            }
        }
    }, [players, actionsFollowing]);

    const handleFollow = () => {
        setActionsFollowing(selected);
        const followingName = players.find(player => player.role === selected)?.realName;
        setFollowingName(followingName);
    }

    if (actionsFollowing === 'angel' || actionsFollowing === 'detective') {
        return (
            <>
                {
                    followingTarget === null ?
                        <>
                            <Text color={'var(--Main-Black)'} opacity={0.75}>
                                {followingName}
                            </Text>
                            <Text color={'var(--Main-Black)'} size={18} opacity={0.5}>
                                is making a selection...
                            </Text>
                        </>
                        :
                        <>
                            <Text color={'var(--Main-Black)'} opacity={0.75}>
                                {followingTarget}{actionsFollowing === 'detective' ? ` (${followingTargetRole})` : null}
                            </Text>
                            <Text color={'var(--Main-Black)'} size={18} opacity={0.5}>
                                {actionsFollowing === 'detective' ? 'was identified by' : 'was saved by'}
                            </Text>
                            <Text color={'var(--Main-Black)'} opacity={0.75}>
                                {followingName}
                            </Text>
                        </>
                }
            </>
        )
    }
    else if (actionsFollowing === 'mafia') {
        // if (mafiaDoneVoting) {
        //     return (
        //         <Box
        //             style={{
        //                 width: '100vw',
        //                 height: '100vh',
        //                 backgroundRepeat: 'repeat',
        //                 backgroundImage: 'url(../../../assets/heaven-stars.png)',
        //                 display: 'flex',
        //                 flexDirection: 'column',
        //                 alignItems: 'center',
        //                 justifyContent: 'center',
        //                 backgroundColor: '#E0E0E0',
        //                 backgroundPosition: 'center',
        //             }}
        //         >
        //             <StandardPageBox>
        //                 <Header name={name} role={role} time={'night'} color={'var(--Main-Black)'}/>
        //                 <Text color={'var(--Main-Black)'} size={18} opacity={0.75}>
        //                     the mafia has voted
        //                 </Text>
        //                 <Text color={'var(--Main-Red)'} size={18}>
        //                     soon, someone will die
        //                 </Text>
        //             </StandardPageBox>
        //         </Box>
        //     )
        // }
        return (
            <>
                <ScrollableFlexColumnBox>
                    {
                        playersToList.map((player, index) => {
                            return (
                                <NameButton
                                    key={index}
                                    disabled={player.role === 'mafia'}
                                    borderColor={'var(--Main-Black)'}
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
                                            player.killVotes?.length > 0 ?
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
                                                    <Skull color={'var(--Main-Black)'}/>
                                                    {
                                                        player.killVotes?.length > 1 ?
                                                            <Text size={18} style={{position: 'absolute', right: -17, bottom: -2}} color={'var(--Main-Black)'}>
                                                                x{player.killVotes?.length}
                                                            </Text>
                                                            :
                                                            null
                                                    }
                                                </Box>
                                                :
                                                null
                                        }
                                        {
                                            player.killVotes?.length > 1 ?
                                                <Box style={{width: 17}}/>
                                                :
                                                null
                                        }
                                    </Box>
                                    <Text size={18} color={'var(--Main-Black)'}>
                                        {player.realName}{player.role === 'mafia' ? ' (mafia)' : null}
                                    </Text>
                                </NameButton>
                            )
                        })
                    }
                </ScrollableFlexColumnBox>
            </>
        )
    }

    return (
        <>
            <ConstrainedBox width={289}>
                <Text color={'var(--Main-Black)'} opacity={0.75}>
                    who’s actions would you like to follow tonight?
                </Text>
            </ConstrainedBox>
            <NameButton
                borderColor={'var(--Main-Black)'}
                selectedColor={'var(--Main-Yellow)'}
                selected={selected === 'angel'}
                onClick={() => setSelected('angel')}
                disabled={players.find(player => player.role === 'angel')?.inHeaven}
            >
                <Text color={'var(--Main-Black)'} size={18}>
                    the angel{players.find(player => player.role === 'angel')?.inHeaven ? ' (dead)' : null}
                </Text>
            </NameButton>
            <NameButton
                borderColor={'var(--Main-Black)'}
                selectedColor={'var(--Main-Blue)'}
                selected={selected === 'detective'}
                onClick={() => setSelected('detective')}
                disabled={players.find(player => player.role === 'detective')?.inHeaven}
            >
                <Text color={selected === 'detective' ? 'var(--Main-White)' : 'var(--Main-Black)'} size={18}>
                    the detective{players.find(player => player.role === 'detective')?.inHeaven ? ' (dead)' : null}
                </Text>
            </NameButton>
            <NameButton
                borderColor={'var(--Main-Black)'}
                selectedColor={'var(--Main-Red)'}
                selected={selected === 'mafia'}
                onClick={() => setSelected('mafia')}
            >
                <Text color={selected === 'mafia' ? 'var(--Main-White)' : 'var(--Main-Black)'} size={18}>
                    the mafia
                </Text>
            </NameButton>
            <Box style={{flex: 1}}/>
            <TheButton
                disabled={selected === null}
                onClick={handleFollow}
            >
                <Text size={18} weight={700}>
                    follow
                </Text>
            </TheButton>
        </>
    )
}