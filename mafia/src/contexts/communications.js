import React, { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { VariableContext } from "./variables";

export const CommunicationContext = createContext({});

export const CommunicationProvider = ({ children }) => {
    const {
        players,
        page,
        mafia,
        detective,
        angel,
        civilians,
        currentMafiaSelections,
        currentMafiaVotes,
        currentKill,
        detectiveIdentifications,
        currentDetectiveIdentification,
        currentAngelProtection,
        currentCivilianTriviaFinishes,
        currentAccusations,
        recentlyAccused,
        currentLifeDeathSelections,
        currentLifeDeathVotes,
    } = useContext(VariableContext);

    const gamernamesNeedingConfirmationRef = useRef([]);

    const sendMessageToParent = (message) => {
        if (typeof message !== 'string') {
            parent.postMessage(JSON.stringify(message), '*');
            return;
        }
        parent.postMessage(message, '*');
    }

    const continueToNudgePlayer = (gamername) => {
        setTimeout(() => {
            if (!gamernamesNeedingConfirmationRef.current.includes(gamername)) {
                return;
            }
            sendMessageToParent(JSON.stringify({
                to: 'one',
                player: gamername,
                name: "state update",
                state: {
                    players,
                    page,
                    mafia,
                    detective,
                    angel,
                    civilians,
                    currentMafiaSelections,
                    currentMafiaVotes,
                    currentKill,
                    detectiveIdentifications,
                    currentDetectiveIdentification,
                    currentAngelProtection,
                    currentCivilianTriviaFinishes,
                    currentAccusations,
                    recentlyAccused,
                    currentLifeDeathSelections,
                    currentLifeDeathVotes,
                }
            }));
            continueToNudgePlayer(gamername);
        }, 100);
    }

    const sendStateUpdateToPlayer = (gamername) => {
        sendMessageToParent(JSON.stringify({
            to: 'one',
            player: gamername,
            name: "state update",
            state: {
                players,
                page,
                mafia,
                detective,
                angel,
                civilians,
                currentMafiaSelections,
                currentMafiaVotes,
                currentKill,
                detectiveIdentifications,
                currentDetectiveIdentification,
                currentAngelProtection,
                currentCivilianTriviaFinishes,
                currentAccusations,
                recentlyAccused,
                currentLifeDeathSelections,
                currentLifeDeathVotes,
            }
        }));
        if (!gamernamesNeedingConfirmationRef.current.includes(gamername)) {
            gamernamesNeedingConfirmationRef.current.push(gamername);
            continueToNudgePlayer(gamername);
        }
    }

    const updateAllPlayers = () => {
        for (const player of players) {
            sendStateUpdateToPlayer(player.gamername);
        }
    }

    function handleMessageFromParent(event) {
        if (!event || !event.data) {
            return;
        }
        const msg = event.data;
        if (msg.name === 'confirm state') {
            const playerState = {
                players,
                page,
                mafia,
                detective,
                angel,
                civilians,
                currentMafiaSelections,
                currentMafiaVotes,
                currentKill,
                detectiveIdentifications,
                currentDetectiveIdentification,
                currentAngelProtection,
                currentCivilianTriviaFinishes,
                currentAccusations,
                recentlyAccused,
                currentLifeDeathSelections,
                currentLifeDeathVotes,
            }
            if (JSON.stringify(msg.state) !== JSON.stringify(playerState)) {
                sendStateUpdateToPlayer(msg.player);
            }
            else {
                gamernamesNeedingConfirmationRef.current = gamernamesNeedingConfirmationRef.current.filter(player => player !== msg.player);
            }
        }
    }

    useEffect(() => {
        updateAllPlayers();
    }, [
        players,
        page,
        mafia,
        detective,
        angel,
        civilians,
        currentMafiaSelections,
        currentMafiaVotes,
        currentKill,
        detectiveIdentifications,
        currentDetectiveIdentification,
        currentAngelProtection,
        currentCivilianTriviaFinishes,
        currentAccusations,
        recentlyAccused,
        currentLifeDeathSelections,
        currentLifeDeathVotes,
    ]);

    useEffect(() => {
        window.addEventListener('message', handleMessageFromParent);

        sendMessageToParent(JSON.stringify({name: 'showCode'}));

        return () => {
            window.removeEventListener('message', handleMessageFromParent);
        }
    }, []);

    const communications = useMemo(() => ({}), []);

    return (
        <CommunicationContext.Provider value={communications}>
            {children}
        </CommunicationContext.Provider>
    );
};
