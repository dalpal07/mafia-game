import React, { createContext, useMemo, useContext } from 'react';
import { CommunicationContext } from './communications';

export const ActionContext = createContext({
    handleSetRealname: () => { },
    handleHostStart: () => { },
    handleHostSkip: () => { },
    handleMafiaSelection: () => { },
    handleMafiaVote: () => { },
});

export const ActionProvider = ({ children }) => {
    const { sendMessageToParent } = useContext(CommunicationContext);

    const handleSetRealname = (realname) => {
        sendMessageToParent(JSON.stringify({
            name: "SetRealname",
            realname,
        }));
    }

    const handleHostStart = () => {
        sendMessageToParent(JSON.stringify({
            name: "HostStart",
        }));
    }

    const handleHostSkip = () => {
        sendMessageToParent(JSON.stringify({
            name: "HostSkip",
        }));
    }

    const handleMafiaSelection = (gamername) => {
        sendMessageToParent(JSON.stringify({
            name: "MafiaSelection",
            selection: gamername,
        }));
    }

    const handleMafiaVote = (gamername) => {
        sendMessageToParent(JSON.stringify({
            name: "MafiaVote",
            vote: gamername,
        }));
    }

    const actions = useMemo(() => {
        return {
            handleSetRealname,
            handleHostStart,
            handleHostSkip,
            handleMafiaSelection,
            handleMafiaVote,
        }
    }, [
        handleSetRealname,
        handleHostStart,
        handleHostSkip,
        handleMafiaSelection,
        handleMafiaVote,
    ]);

    return (
        <ActionContext.Provider value={actions}>
            {children}
        </ActionContext.Provider>
    )
}