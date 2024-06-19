import React, { createContext, useMemo, useState } from "react";
import { WAITING_PLAYERS } from "../pages";

export const VariableContext = createContext({
  self: {},
  setSelf: () => {},
  players: [],
  setPlayers: () => {},
  page: 0,
  setPage: () => {},
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
  const [self, setSelf] = useState({
    gamername: "",
    realname: "",
    role: "",
    isAlive: true,
    isHost: false,
  });

  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(WAITING_PLAYERS);

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
      self,
      setSelf,
      players,
      setPlayers,
      page,
      setPage,
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
    self,
    setSelf,
    players,
    setPlayers,
    page,
    setPage,
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
