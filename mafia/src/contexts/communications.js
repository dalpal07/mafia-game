import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { VariableContext } from "./variables";
import { ActionContext } from "./actions";

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
    playersRef,
    pageRef,
    mafiaRef,
    detectiveRef,
    angelRef,
    civiliansRef,
    currentMafiaSelectionsRef,
    currentMafiaVotesRef,
    currentKillRef,
    detectiveIdentificationsRef,
    currentDetectiveIdentificationRef,
    currentAngelProtectionRef,
    currentCivilianTriviaFinishesRef,
    currentAccusationsRef,
    recentlyAccusedRef,
    currentLifeDeathSelectionsRef,
    currentLifeDeathVotesRef,    
  } = useContext(VariableContext);
  const {
    handlePlayerJoin,
    handlePlayerSubmitRealname,
    handleHostStartGame,
    handleHostSkipInstructions,
    handleMafiaSelection,
    handleMafiaVote,
  } = useContext(ActionContext);
  const gamernamesNeedingConfirmationRef = useRef([]);
  
  const sendMessageToParent = (message) => {
    parent.postMessage(message, "*");
  };

  const continueToNudgePlayer = (gamername) => {
    setTimeout(() => {
      if (!gamernamesNeedingConfirmationRef.current.includes(gamername)) {
        return;
      }
      sendMessageToParent(
        JSON.stringify({
          to: "one",
          player: gamername,
          name: "state update",
          state: {
            players: playersRef.current,
            page: pageRef.current,
            mafia: mafiaRef.current,
            detective: detectiveRef.current,
            angel: angelRef.current,
            civilians: civiliansRef.current,
            currentMafiaSelections: currentMafiaSelectionsRef.current,
            currentMafiaVotes: currentMafiaVotesRef.current,
            currentKill: currentKillRef.current,
            detectiveIdentifications: detectiveIdentificationsRef.current,
            currentDetectiveIdentification: currentDetectiveIdentificationRef.current,
            currentAngelProtection: currentAngelProtectionRef.current,
            currentCivilianTriviaFinishes: currentCivilianTriviaFinishesRef.current,
            currentAccusations: currentAccusationsRef.current,
            recentlyAccused: recentlyAccusedRef.current,
            currentLifeDeathSelections: currentLifeDeathSelectionsRef.current,
            currentLifeDeathVotes: currentLifeDeathVotesRef.current,
          },
        }),
      );
      continueToNudgePlayer(gamername);
    }, 250);
  };

  const sendStateUpdateToPlayer = (gamername) => {
    sendMessageToParent(
      JSON.stringify({
        to: "one",
        player: gamername,
        name: "state update",
        state: {
          players: playersRef.current,
          page: pageRef.current,
          mafia: mafiaRef.current,
          detective: detectiveRef.current,
          angel: angelRef.current,
          civilians: civiliansRef.current,
          currentMafiaSelections: currentMafiaSelectionsRef.current,
          currentMafiaVotes: currentMafiaVotesRef.current,
          currentKill: currentKillRef.current,
          detectiveIdentifications: detectiveIdentificationsRef.current,
          currentDetectiveIdentification: currentDetectiveIdentificationRef.current,
          currentAngelProtection: currentAngelProtectionRef.current,
          currentCivilianTriviaFinishes: currentCivilianTriviaFinishesRef.current,
          currentAccusations: currentAccusationsRef.current,
          recentlyAccused: recentlyAccusedRef.current,
          currentLifeDeathSelections: currentLifeDeathSelectionsRef.current,
          currentLifeDeathVotes: currentLifeDeathVotesRef.current,
        },
      }),
    );
    if (!gamernamesNeedingConfirmationRef.current.includes(gamername)) {
      gamernamesNeedingConfirmationRef.current.push(gamername);
      continueToNudgePlayer(gamername);
    }
  };

  const updateAllPlayers = () => {
    for (const player of players) {
      sendStateUpdateToPlayer(player.gamername);
    }
  };

  function handleMessageFromParent(event) {
    if (!event || !event.data) {
      return;
    }
    const msg = event.data;
    if (msg.name === "confirm state") {
      const playerState = {
        players: playersRef.current,
        page: pageRef.current,
        mafia: mafiaRef.current,
        detective: detectiveRef.current,
        angel: angelRef.current,
        civilians: civiliansRef.current,
        currentMafiaSelections: currentMafiaSelectionsRef.current,
        currentMafiaVotes: currentMafiaVotesRef.current,
        currentKill: currentKillRef.current,
        detectiveIdentifications: detectiveIdentificationsRef.current,
        currentDetectiveIdentification: currentDetectiveIdentificationRef.current,
        currentAngelProtection: currentAngelProtectionRef.current,
        currentCivilianTriviaFinishes: currentCivilianTriviaFinishesRef.current,
        currentAccusations: currentAccusationsRef.current,
        recentlyAccused: recentlyAccusedRef.current,
        currentLifeDeathSelections: currentLifeDeathSelectionsRef.current,
        currentLifeDeathVotes: currentLifeDeathVotesRef.current,
      };
      if (JSON.stringify(msg.state) !== JSON.stringify(playerState)) {
        sendStateUpdateToPlayer(msg.player);
      } else {
        gamernamesNeedingConfirmationRef.current =
          gamernamesNeedingConfirmationRef.current.filter(
            (player) => player !== msg.player,
          );
      }
    }
    else if (msg.name === "RegisterMadderController") {
      handlePlayerJoin(msg.player);
    }
    else if (msg.name === "SetRealname") {
      handlePlayerSubmitRealname(msg.player, msg.realname);
    }
    else if (msg.name === "HostStart") {
      handleHostStartGame();
    }
    else if (msg.name === "HostSkip") {
      handleHostSkipInstructions();
    }
    else if (msg.name === "MafiaSelection") {
      handleMafiaSelection(msg.player, msg.selection);
    }
    else if (msg.name === "MafiaVote") {
      handleMafiaVote(msg.player, msg.vote);
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
    window.addEventListener("message", handleMessageFromParent);

    sendMessageToParent(JSON.stringify({ name: "showCode" }));

    return () => {
      window.removeEventListener("message", handleMessageFromParent);
    };
  }, []);

  const communications = useMemo(() => ({}), []);

  return (
    <CommunicationContext.Provider value={communications}>
      {children}
    </CommunicationContext.Provider>
  );
};
