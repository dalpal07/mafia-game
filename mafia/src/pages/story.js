import React, {useEffect, useState} from "react";
import {InnerPageBox, SpaceBetweenRowBox} from "../components/boxes";
import {Box} from "@mui/material";
import {Text} from "../components/text";
import {getStory} from "../stories";

export default function Story({targetedName, died, setPlayers, setStoryOver, sendMessageToParent, checkEndOfGame, playersRef, playDeathAudio, endDeathAudio}) {
    const [reveal, setReveal] = useState(false);
    const [story, setStory] = useState(null);
    const playerMurderedAudio = new Audio('./assets/player-murdered.mp3');
    const playerAlmostMurderedAudio = new Audio('./assets/player-almost-murdered.mp3');

    useEffect(() => {
        setStory(getStory());
        if (died) {
            const deadPlayer = playersRef.current.find(player => player.realName === targetedName);
            sendMessageToParent({to: 'one', name: 'female-scream', player: deadPlayer.name});
        }
        setTimeout(() => {
            setReveal(true)
            playDeathAudio();
            setTimeout(() => {
                if (died) {
                    const newPlayers = playersRef.current.map(player => {
                        if (player.realName === targetedName) {
                            return {
                                ...player,
                                inHeaven: true,
                            }
                        }
                        return player;
                    });
                    if (checkEndOfGame(newPlayers)) {
                        endDeathAudio();
                        return;
                    }
                    setPlayers(newPlayers);
                    playersRef.current = newPlayers;
                    sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers});
                    playerMurderedAudio.play();
                    playerMurderedAudio.onended = () => {
                        setStoryOver(true);
                    }
                }
                else {
                    playerAlmostMurderedAudio.play();
                    playerAlmostMurderedAudio.onended = () => {
                        setStoryOver(true);
                    }
                }
            }, 10000);
        }, 1000);

        return () => {
            playerMurderedAudio.pause();
            playerAlmostMurderedAudio.pause();
        }
    }, []);

    if (!reveal) {
        return null;
    }
    if (died) {
        return (
            <>
                <Text size={56} color={'var(--Main-Red)'} weight={700}>
                    {targetedName}
                </Text>
                <Text size={36} opacity={0.5}>
                    was killed by the mafia
                </Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="56" viewBox="0 0 38 56" fill="none">
                    <path
                        d="M37.9985 18.9774C37.9985 18.9774 38.0614 6.35849 27.9731 1.81514C17.8849 -2.72822 -2.22286 0.296243 0.200939 22.0063C0.250613 22.4519 0.763425 25.2529 1.05709 26.8413C1.18712 27.549 1.06147 28.2803 0.69914 28.9006C0.138115 29.8643 4.12373 35.6986 4.59856 37.4647C4.74758 38.0199 4.95358 38.3574 5.16543 38.5587C5.76298 39.1272 6.13991 39.8941 6.15891 40.726L6.28894 46.7039C6.29916 47.1539 6.40582 47.5981 6.61182 47.9978C9.80119 54.2066 14.621 55.6011 16.4882 55.912C16.909 55.9831 17.3385 55.9461 17.752 55.835C19.3971 55.3968 21.498 55.8883 21.498 55.8883C26.2258 56.9646 30.2289 49.9593 31.3028 47.8779C31.4883 47.5181 31.5993 47.1229 31.6286 46.7187L32.0756 40.5499C32.1238 39.8896 32.3737 39.253 32.8193 38.7689C33.915 37.5802 35.8888 31.9102 36.6924 30.3336C37.0956 29.5416 37.1424 29.0605 37.0533 28.7673C36.9013 28.261 36.9262 27.7148 37.0723 27.207C37.7925 24.6933 38 18.9774 38 18.9774H37.9985ZM9.85378 28.8606C6.40874 30.0435 5.35243 26.2699 5.35243 26.2699C5.35243 26.2699 3.9075 22.2713 5.01932 20.2447C6.13115 18.218 10.0203 16.9789 13.1893 17.993C16.3567 19.0071 15.8015 24.1307 15.8015 24.1307C16.0791 25.1448 13.3003 27.6778 9.85524 28.8606H9.85378ZM21.0801 34.9155C21.0801 34.9155 19.2787 35.4158 18.8287 32.6504C18.8842 33.7548 18.6812 35.592 16.5233 34.6593C13.5224 33.364 18.0792 25.2558 18.0792 25.2558C18.0792 25.2558 18.0938 24.3543 18.8375 24.5245C19.5811 24.6948 19.6367 24.6933 19.8587 25.4261C20.0808 26.1589 24.138 32.5246 21.0816 34.9169L21.0801 34.9155ZM32.473 27.1715C32.473 27.1715 30.4729 30.72 25.8605 27.6511C25.8605 27.6511 22.1934 25.8584 22.0254 23.3609C21.8588 20.865 23.6369 17.6643 25.637 17.6318C27.6371 17.5992 31.1946 18.3305 32.473 19.7384C33.7514 21.1462 32.473 27.1715 32.473 27.1715Z"
                        fill="#BB3737"/>
                </svg>
            </>
        )
    }
    return (
        <>
            <Text size={56} weight={700}>
                {targetedName}
            </Text>
            <Text size={36} opacity={0.5}>
                survived
            </Text>
        </>
    )
}