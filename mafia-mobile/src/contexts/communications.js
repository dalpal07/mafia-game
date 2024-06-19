import React, { createContext, useMemo, useContext, useEffect } from "react";
import { VariableContext } from "./variables";

export const CommunicationContext = createContext({
  sendMessageToParent: () => {},
});

export const CommunicationProvider = ({ children }) => {
  const {
    self,
    setSelf,
    setPlayers,
    setPage,
    setMafia,
    setDetective,
    setAngel,
    setCivilians,
    setCurrentMafiaSelections,
    setCurrentMafiaVotes,
    setCurrentKill,
    setDetectiveIdentifications,
    setCurrentDetectiveIdentification,
    setCurrentAngelProtection,
    setCurrentCivilianTriviaFinishes,
    setCurrentAccusations,
    setRecentlyAccused,
    setCurrentLifeDeathSelections,
    setCurrentLifeDeathVotes,
  } = useContext(VariableContext);
    
    const sendMessageToParent = (message) => {
      parent.postMessage(message, "*");
    };
    
    const handleMessageFromParent = (event) => {
        if (!event || !event.data) return;
      const msg = event.data;
        if (msg.name === "name") {
          const newSelf = self;
          newSelf.gamername = msg.player;
          setSelf(newSelf);
        }
        else if (msg.name === "state update") {
            const { state } = msg;
          if (!state) return;
          if (state.players) {
            const newSelf = state.players.find((player) => player.gamername === self.gamername);
            if (newSelf) setSelf(newSelf);
          }

            setPage(state.page);
            setPlayers(state.players);
            setMafia(state.mafia);
            setDetective(state.detective);
            setAngel(state.angel);
            setCivilians(state.civilians);
            setCurrentMafiaSelections(state.currentMafiaSelections);
            setCurrentMafiaVotes(state.currentMafiaVotes);
            setCurrentKill(state.currentKill);
            setDetectiveIdentifications(state.detectiveIdentifications);
            setCurrentDetectiveIdentification(state.currentDetectiveIdentification);
            setCurrentAngelProtection(state.currentAngelProtection);
            setCurrentCivilianTriviaFinishes(state.currentCivilianTriviaFinishes);
            setCurrentAccusations(state.currentAccusations);
            setRecentlyAccused(state.recentlyAccused);
            setCurrentLifeDeathSelections(state.currentLifeDeathSelections);
            setCurrentLifeDeathVotes(state.currentLifeDeathVotes);

            sendMessageToParent(JSON.stringify({ name: "confirm state", state }));
        }
    }
  
  useEffect(() => {
    window.addEventListener("message", handleMessageFromParent);

    sendMessageToParent(JSON.stringify({ name: "ready" }));

    return () => {
      window.removeEventListener("message", handleMessageFromParent);
    };
  }, []);

  const communications = useMemo(() => { 
    return {
      sendMessageToParent,
    };
  }, [
    sendMessageToParent,
  ]);

  return (
    <CommunicationContext.Provider
      value={communications}
    >
      {children}
    </CommunicationContext.Provider>
  );
};