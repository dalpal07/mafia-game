import React, { createContext, useMemo, useState } from "react";
import { WAITING_PLAYERS } from "../pages";

export const VariableContext = createContext({
  players: [],
  setPlayers: () => {},
  page: 0,
  setPage: () => {},
  nighttimeTimer: 0,
  setNighttimeTimer: () => {},
  accusationTimer: 0,
  setAccusationTimer: () => {},
  votingTimer: 0,
  setVotingTimer: () => {},
  mafia: [],
  setMafia: () => {},
  detective: null,
  setDetective: () => {},
  angel: null,
  setAngel: () => {},
  civilians: [],
  setCivilians: () => {},
  currentMafiaSelections: [],
  setCurrentMafiaSelections: () => {},
  currentMafiaVotes: [],
  setCurrentMafiaVotes: () => {},
  currentKill: null,
  setCurrentKill: () => {},
  detectiveIdentifications: [],
  setDetectiveIdentifications: () => {},
  currentDetectiveIdentification: null,
  setCurrentDetectiveIdentification: () => {},
  currentAngelProtection: null,
  setCurrentAngelProtection: () => {},
  currentCivilianTriviaFinishes: [],
  setCurrentCivilianTriviaFinishes: () => {},
  currentAccusations: [],
  setCurrentAccusations: () => {},
  recentlyAccused: null,
  setRecentlyAccused: () => {},
  currentLifeDeathSelections: [],
  setCurrentLifeDeathSelections: () => {},
  currentLifeDeathVotes: [],
  setCurrentLifeDeathVotes: () => {},
});

export const VariableProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(WAITING_PLAYERS);

  const [nighttimeTimer, setNighttimeTimer] = useState(120);
  const [accusationTimer, setAccusationTimer] = useState(300);
  const [votingTimer, setVotingTimer] = useState(300);

  const [mafia, setMafia] = useState([]);
  const [detective, setDetective] = useState(null);
  const [angel, setAngel] = useState(null);
  const [civilians, setCivilians] = useState([]);

  const [currentMafiaSelections, setCurrentMafiaSelections] = useState([]);
  const [currentMafiaVotes, setCurrentMafiaVotes] = useState([]);
  const [currentKill, setCurrentKill] = useState(null);
  const [detectiveIdentifications, setDetectiveIdentifications] = useState([]);
  const [currentDetectiveIdentification, setCurrentDetectiveIdentification] =
    useState(null);
  const [currentAngelProtection, setCurrentAngelProtection] = useState(null);
  const [currentCivilianTriviaFinishes, setCurrentCivilianTriviaFinishes] =
    useState([]);

  const [currentAccusations, setCurrentAccusations] = useState([]);
  const [recentlyAccused, setRecentlyAccused] = useState(null);
  const [currentLifeDeathSelections, setCurrentLifeDeathSelections] = useState(
    [],
  );
  const [currentLifeDeathVotes, setCurrentLifeDeathVotes] = useState([]);

  const variables = useMemo(() => {
    return {
      players,
      setPlayers,
      page,
      setPage,
      nighttimeTimer,
      setNighttimeTimer,
      accusationTimer,
      setAccusationTimer,
      votingTimer,
      setVotingTimer,
      mafia,
      setMafia,
      detective,
      setDetective,
      angel,
      setAngel,
      civilians,
      setCivilians,
      currentMafiaSelections,
      setCurrentMafiaSelections,
      currentMafiaVotes,
      setCurrentMafiaVotes,
      currentKill,
      setCurrentKill,
      detectiveIdentifications,
      setDetectiveIdentifications,
      currentDetectiveIdentification,
      setCurrentDetectiveIdentification,
      currentAngelProtection,
      setCurrentAngelProtection,
      currentCivilianTriviaFinishes,
      setCurrentCivilianTriviaFinishes,
      currentAccusations,
      setCurrentAccusations,
      recentlyAccused,
      setRecentlyAccused,
      currentLifeDeathSelections,
      setCurrentLifeDeathSelections,
      currentLifeDeathVotes,
      setCurrentLifeDeathVotes,
    };
  }, [
    players,
    setPlayers,
    page,
    setPage,
    nighttimeTimer,
    setNighttimeTimer,
    accusationTimer,
    setAccusationTimer,
    votingTimer,
    setVotingTimer,
    mafia,
    setMafia,
    detective,
    setDetective,
    angel,
    setAngel,
    civilians,
    setCivilians,
    currentMafiaSelections,
    setCurrentMafiaSelections,
    currentMafiaVotes,
    setCurrentMafiaVotes,
    currentKill,
    setCurrentKill,
    detectiveIdentifications,
    setDetectiveIdentifications,
    currentDetectiveIdentification,
    setCurrentDetectiveIdentification,
    currentAngelProtection,
    setCurrentAngelProtection,
    currentCivilianTriviaFinishes,
    setCurrentCivilianTriviaFinishes,
    currentAccusations,
    setCurrentAccusations,
    recentlyAccused,
    setRecentlyAccused,
    currentLifeDeathSelections,
    setCurrentLifeDeathSelections,
    currentLifeDeathVotes,
    setCurrentLifeDeathVotes,
  ]);

  return (
    <VariableContext.Provider value={variables}>
      {children}
    </VariableContext.Provider>
  );
};
