import React, { createContext, useMemo, useContext } from "react";
import { CommunicationContext } from "./communications";

export const ActionContext = createContext({
  handleSetRealname: () => {},
  handleHostStart: () => {},
  handleHostSkip: () => {},
  handleMafiaSelection: () => {},
  handleMafiaVote: () => {},
  handleDetectiveIdentification: () => {},
  handleAngelProtection: () => {},
  handleCivilianFinishTrivia: () => {},
  handleAccuse: () => {},
  handleLifeDeathSelection: () => {},
  handleLifeDeathVote: () => {},
});

export const ActionProvider = ({ children }) => {
  const { sendMessageToParent } = useContext(CommunicationContext);

  const handleSetRealname = (realname) => {
    sendMessageToParent(
      JSON.stringify({
        name: "SetRealname",
        realname,
      }),
    );
  };

  const handleHostStart = () => {
    sendMessageToParent(
      JSON.stringify({
        name: "HostStart",
      }),
    );
  };

  const handleHostSkip = () => {
    sendMessageToParent(
      JSON.stringify({
        name: "HostSkip",
      }),
    );
  };

  const handleMafiaSelection = (gamername) => {
    sendMessageToParent(
      JSON.stringify({
        name: "MafiaSelection",
        selection: gamername,
      }),
    );
  };

  const handleMafiaVote = (gamername) => {
    sendMessageToParent(
      JSON.stringify({
        name: "MafiaVote",
        vote: gamername,
      }),
    );
  };

  const handleDetectiveIdentification = (gamername) => {
    sendMessageToParent(
      JSON.stringify({
        name: "DetectiveIdentification",
        identification: gamername,
      }),
    );
  };

  const handleAngelProtection = (gamername) => {
    sendMessageToParent(
      JSON.stringify({
        name: "AngelProtection",
        protection: gamername,
      }),
    );
  };

  const handleCivilianFinishTrivia = () => {
    sendMessageToParent(
      JSON.stringify({
        name: "CivilianFinishTrivia",
      }),
    );
  };

  const handleAccuse = (gamername) => {
    sendMessageToParent(
      JSON.stringify({
        name: "Accuse",
        accusation: gamername,
      }),
    );
  };

  const handleLifeDeathSelection = (vote) => {
    sendMessageToParent(
      JSON.stringify({
        name: "LifeDeathSelection",
        vote,
      }),
    );
  };

  const handleLifeDeathVote = (vote) => {
    sendMessageToParent(
      JSON.stringify({
        name: "LifeDeathVote",
        vote,
      }),
    );
  };

  const actions = useMemo(() => {
    return {
      handleSetRealname,
      handleHostStart,
      handleHostSkip,
      handleMafiaSelection,
      handleMafiaVote,
      handleDetectiveIdentification,
      handleAngelProtection,
      handleCivilianFinishTrivia,
      handleAccuse,
      handleLifeDeathSelection,
      handleLifeDeathVote,
    };
  }, [
    handleSetRealname,
    handleHostStart,
    handleHostSkip,
    handleMafiaSelection,
    handleMafiaVote,
    handleDetectiveIdentification,
    handleAngelProtection,
    handleCivilianFinishTrivia,
    handleAccuse,
    handleLifeDeathSelection,
    handleLifeDeathVote,
  ]);

  return (
    <ActionContext.Provider value={actions}>{children}</ActionContext.Provider>
  );
};
