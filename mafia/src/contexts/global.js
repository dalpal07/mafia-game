import React, { useState, useRef, createContext } from "react";
import { getRandomTriviaQuestion } from "../trivia";

export const GlobalContext = createContext();

/*
* PlayerInfo: {
*  gamername: string,
*  realname: string,
*  role: string, // Resets every game
* }
*/

/*
* PlayerState: {
*  gamername: string,
*  realname: string,
*  page: number, // Resets every game
*  isHost: boolean,
*  role: string, // Resets every game
*  isAlive: boolean, // Resets every game
*  detective: {
*   player: PlayerInfo, // Resets every game
*   discoveredPlayers PlayerInfo[], // Resets every game
*   currentSuspect: PlayerInfo | null, // Resets every night
*  },
*  angel: {
*   player: PlayerInfo, // Resets every game
*   currentProtected: PlayerInfo | null, // Resets every night
*  },
*  mafia: {
*   currentSelections: PlayerInfo[], // Resets every night
*   currentVotes: PlayerInfo[], // Resets every night
*   players: PlayerInfo[], // Resets every game
*  },
*  trivia: {
*   currentQuestion: string, // Resets every night
*   currentQuestionsAnswered: number, // Resets every night
*   currentQuestionsCorrect: number, // Resets every night
*  },
*  day: {
*   currentAccusations: PlayerInfo[], // Resets every start of accusation phase
*   currentAccused: PlayerInfo | null, // Resets every start of accusation phase
*   currentVotes: PlayerInfo[], // Resets every start of voting phase
*  },
*  heaven: {
*   watchingRole: string | null, // Resets every night
*  }
*  isProtected: boolean, // Resets every night
*  isInvestigated: boolean, // Resets every night
*  isTargeted: boolean, // Resets every night
*  isBeingAccused: boolean, // Resets every start of accusation phase
*  isAccused: boolean, // Resets every start of accusation phase
*  totalPlayers: number,
*  allReady: boolean,
* }
*/

const MIN_PLAYERS = 5;

const MOBILE_ENTER_NAME = 0;
const MOBILE_WAITING_PLAYERS = 1;
const MOBILE_PREPARATION = 2;
const MOBILE_IDENTITY_REVEAL = 3;
const MOBILE_INSTRUCTIONS = 4;
const MOBILE_NIGHT = 5;
const MOBILE_NIGHT_FINISHED = 6;
const MOBILE_DAY = 7;
const MOBILE_VOTING = 8;
const MOBILE_WIN = 9;
const MOBILE_HEAVEN_WELCOME = 10;
const MOBILE_HEAVEN_DAY = 11;
const MOBILE_HEAVEN_NIGHT = 12;

const DESKTOP_WAITING_PLAYERS = 0;
const DESKTOP_WELCOME = 1;
const DESKTOP_YOU_READY = 2;
const DESKTOP_REVEAL_IDENTITY = 3;
const DESKTOP_INSTRUCTIONS = 4;
const DESKTOP_NIGHTTIME = 5;
const DESKTOP_NIGHTTIME_TIMER = 6;
const DESKTOP_NIGHT_OVER = 7;
const DESKTOP_STORY = 8;
const DESKTOP_POST_STORY_2 = 10;
const DESKTOP_ACCUSATIONS = 11;
const DESKTOP_ACCUSED = 12;
const DESKTOP_VOTING = 13;
const DESKTOP_VOTING_TIMER = 14;
const DESKTOP_VOTING_RESULTS = 15;
const DESKTOP_GAME_OVER = 16;

const initialPlayerState = {
    gamername: "",
    realname: "",
    page: MOBILE_ENTER_NAME,
    isHost: false,
    role: "",
    isAlive: true,
    detective: {
        player: {
            gamername: "",
            realname: "",
            role: "",
        },
        discoveredPlayers: [],
        currentSuspect: null,
    },
    angel: {
        player: {
            gamername: "",
            realname: "",
            role: "",
        },
        currentProtected: null,
    },
    mafia: {
        currentSelections: [],
        currentVotes: [],
        players: [],
    },
    trivia: {
        currentQuestion: "",
        currentQuestionsAnswered: 0,
        currentQuestionsCorrect: 0,
    },
    day: {
        currentAccusations: [],
        currentAccused: {
            gamername: "",
            realname: "",
            role: "",
        },
        currentVotes: [],
    },
    heaven: {
        watchingRole: null,
    },
    isProtected: false,
    isInvestigated: false,
    isTargeted: false,
    isBeingAccused: false,
    isAccused: false,
    totalPlayers: 0,
    allReady: false,
};

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

const getNewRoles = (players) => {
    const roles = [];
    for (let i = 0; i < players.length; i++) {
        if (i === 0) {
            roles.push('detective');
        }
        else if (i === 1) {
            roles.push('angel');
        }
        else if (i % 4 === 2) {
            roles.push('mafia');
        }
        else {
            roles.push('civilian');
        }
    }
    return shuffle(roles);
}

const getNewPlayersForStartGame = (players) => {
    const roles = getNewRoles(players);
    const detectiveIndex = roles.indexOf('detective');
    const angelIndex = roles.indexOf('angel');
    const mafiaIndexes = [];
    roles.forEach((role, i) => {
        if (role === 'mafia') {
            mafiaIndexes.push(i);
        }
    });
    return players.map((player, i) => {
        return {
            ...player,
            role: roles[i],
            detective: {
                ...player.detective,
                player: {
                    gamername: players[detectiveIndex].gamername,
                    realname: players[detectiveIndex].realname,
                    role: 'detective',
                }
            },
            angel: {
                ...player.angel,
                player: {
                    gamername: players[angelIndex].gamername,
                    realname: players[angelIndex].realname,
                    role: 'angel',
                }
            },
            mafia: {
                ...player.mafia,
                players: mafiaIndexes.map(index => {
                    return {
                        gamername: players[index].gamername,
                        realname: players[index].realname,
                        role: 'mafia',
                    };
                }),
            },
            page: MOBILE_PREPARATION,
        }
    });
}

const getNewPlayersForNighttime = (players) => {
    return players.map(player => {
        return {
            ...player,
            isProtected: false,
            isInvestigated: false,
            isTargeted: false,
            isBeingAccused: false,
            isAccused: false,
            detective: {
                ...player.detective,
                currentSuspect: null,
            },
            angel: {
                ...player.angel,
                currentProtected: null,
            },
            mafia: {
                ...player.mafia,
                currentSelections: [],
                currentVotes: [],
            },
            trivia: {
                ...player.trivia,
                currentQuestion: getRandomTriviaQuestion(),
                currentQuestionsAnswered: 0,
                currentQuestionsCorrect: 0,
            },
            day: {
                ...player.day,
                currentAccusations: [],
                currentAccused: null,
                currentVotes: [],
            },
            heaven: {
                ...player.heaven,
                watchingRole: null,
            },
            page: MOBILE_NIGHT,
        };
    });
}

export const GlobalProvider = ({ children }) => {
    const introAudio = useRef(new Audio('./assets/Introloop.wav'));
    // const nightAudio = useRef(new Audio('./assets/Nightloop.wav'));

    const [page, setPage] = useState(DESKTOP_WAITING_PLAYERS);
    const pageRef = useRef(page);
    const [playerStates, setPlayerStates] = useState([]);
    const playerStatesRef = useRef(playerStates);

    const handlePlayerJoin = (gamername) => {
        if (pageRef.current !== DESKTOP_WAITING_PLAYERS || !gamername) {
            return;
        }
        const totalPlayers = playerStatesRef.current.length + 1;
        const newPlayerState = {...initialPlayerState};
        newPlayerState.gamername = gamername;
        newPlayerState.totalPlayers = totalPlayers;
        newPlayerState.isHost = totalPlayers === 1;
        const newPlayerStates = playerStatesRef.current.map(playerState => {
            return { ...playerState, totalPlayers, allReady: false };
        });
        setPlayerStates([...newPlayerStates, newPlayerState]);
        playerStatesRef.current = [...newPlayerStates, newPlayerState];
    }

    const handleAddPlayerRealname = (gamername, realname) => {
        if (pageRef.current !== DESKTOP_WAITING_PLAYERS || !gamername || !realname) {
            return;
        }
        let allReady = true;
        for (let i = 0; i < playerStatesRef.current.length; i++) {
            if (playerStatesRef.current[i].gamername === gamername) {
                continue;
            }
            if (!playerStatesRef.current[i].realname) {
                allReady = false;
            }
        }
        const newPlayerStates = playerStatesRef.current.map(playerState => {
            if (playerState.gamername === gamername) {
                return { ...playerState, realname, page: MOBILE_WAITING_PLAYERS, allReady };
            }
            return {
                ...playerState,
                allReady,
            };
        });
        setPlayerStates(newPlayerStates);
        playerStatesRef.current = newPlayerStates;
    }

    const handleStartGame = (gamername) => {
        const playerIsHost = playerStatesRef.current.find(playerState => playerState.gamername === gamername)?.isHost;
        if (playerStatesRef.current.length < MIN_PLAYERS || pageRef.current !== DESKTOP_WAITING_PLAYERS || !playerIsHost) {
            return;
        }
        const newPlayerStates = getNewPlayersForStartGame(playerStatesRef.current);
        setPlayerStates(newPlayerStates);
        playerStatesRef.current = newPlayerStates;
        introAudio.current.play();
        setPage(DESKTOP_WELCOME);
        pageRef.current = DESKTOP_WELCOME;
    }

    const handleAdvanceToYouReady = () => {
        if (pageRef.current !== DESKTOP_WELCOME) {
            return;
        }
        setPage(DESKTOP_YOU_READY);
        pageRef.current = DESKTOP_YOU_READY;
    }

    const handleAdvanceToRevealIdentity = () => {
        if (pageRef.current !== DESKTOP_YOU_READY) {
            return;
        }
        const newPlayerStates = playerStatesRef.current.map(playerState => {
            return { ...playerState, page: MOBILE_IDENTITY_REVEAL };
        });
        setPlayerStates(newPlayerStates);
        playerStatesRef.current = newPlayerStates;
        setPage(DESKTOP_REVEAL_IDENTITY);
        pageRef.current = DESKTOP_REVEAL_IDENTITY;
    }

    const handleAdvanceToInstructions = () => {
        if (pageRef.current !== DESKTOP_REVEAL_IDENTITY) {
            return;
        }
        const newPlayerStates = playerStatesRef.current.map(playerState => {
            return { ...playerState, page: MOBILE_INSTRUCTIONS };
        });
        introAudio.current.pause();
        introAudio.current.currentTime = 0;
        introAudio.current.play();
        setPlayerStates(newPlayerStates);
        playerStatesRef.current = newPlayerStates;
        setPage(DESKTOP_INSTRUCTIONS);
        pageRef.current = DESKTOP_INSTRUCTIONS;
    }

    const handleSkipInstructions = (gamername) => {
        const isHost = playerStatesRef.current.find(playerState => playerState.gamername === gamername)?.isHost;
        if (!isHost) {
            return;
        }
        handleAdvanceToNighttime();
    }

    const handleAdvanceToNighttime = () => {
        if (pageRef.current !== DESKTOP_INSTRUCTIONS) {
            return;
        }
        introAudio.current.pause();
        introAudio.current.currentTime = 0;
        // nightAudio.current.play();
        const newPlayerStates = getNewPlayersForNighttime(playerStatesRef.current);
        setPlayerStates(newPlayerStates);
        playerStatesRef.current = newPlayerStates;
        setPage(DESKTOP_NIGHTTIME);
        pageRef.current = DESKTOP_NIGHTTIME;
    }

    const handleAdvanceToNighttimeTimer = () => {
        if (pageRef.current !== DESKTOP_NIGHTTIME) {
            return;
        }
        setPage(DESKTOP_NIGHTTIME_TIMER);
        pageRef.current = DESKTOP_NIGHTTIME_TIMER;
    }

    const handleMafiaSelectPlayer = (gamername, selectedGamername) => {
        const mafiaIndex = playerStatesRef.current.findIndex(playerState => playerState.gamername === gamername);
        const victimIndex = playerStatesRef.current.findIndex(playerState => playerState.gamername === selectedGamername);
        if (mafiaIndex === -1 || victimIndex === -1) {
            return;
        }
        const isMafia = playerStatesRef.current[mafiaIndex].role === 'mafia';
        const isAlive = playerStatesRef.current[mafiaIndex].isAlive;
        const isVictimMafia = playerStatesRef.current[victimIndex].role === 'mafia';
        const isVictimAlive = playerStatesRef.current[victimIndex].isAlive;
        if (pageRef.current !== DESKTOP_NIGHTTIME && pageRef.current !== DESKTOP_NIGHTTIME_TIMER || !isMafia || !isAlive || isVictimMafia || !isVictimAlive) {
            return;
        }
        let mafiaAlreadySelected = false;
        let mafiaAlreadySelectedThisVictim = false;
        playerStatesRef.current[mafiaIndex].mafia.currentSelections.forEach(element => {
            if (gamername === element.selectorGamername) {
                mafiaAlreadySelected = true;
                if (selectedGamername === element.gamername) {
                    mafiaAlreadySelectedThisVictim = true;
                }
            }
        });
        let newCurrentSelections = playerStatesRef.current[mafiaIndex].mafia.currentSelections;
        const victimPlayerInfo = {
            gamername: playerStatesRef.current[victimIndex].gamername,
            realname: playerStatesRef.current[victimIndex].realname,
            role: playerStatesRef.current[victimIndex].role,
            selectorGamername: playerStatesRef.current[mafiaIndex].gamername,
        };
        if (mafiaAlreadySelected && !mafiaAlreadySelectedThisVictim) {
            newCurrentSelections = newCurrentSelections.map(element => {
                if (gamername === element.selectorGamername) {
                    return victimPlayerInfo;
                }
                return element;
            });
        }
        else if (mafiaAlreadySelected && mafiaAlreadySelectedThisVictim) {
            newCurrentSelections = newCurrentSelections.filter(element => {
                return gamername !== element.selectorGamername;
            });
        }
        else {
            newCurrentSelections = [...newCurrentSelections, victimPlayerInfo];
        }
        const newPlayerStates = playerStatesRef.current.map((playerState, i) => ({
            ...playerState,
            mafia: {
                ...playerState.mafia,
                currentSelections: newCurrentSelections,
            },
        }));
        setPlayerStates(newPlayerStates);
        playerStatesRef.current = newPlayerStates;
    }

    const handleMafiaConfirmSelection = (gamername) => {
        const mafiaIndex = playerStatesRef.current.findIndex(playerState => playerState.gamername === gamername);
        if (mafiaIndex === -1) {
            return;
        }
        const isMafia = playerStatesRef.current[mafiaIndex].role === 'mafia';
        const isAlive = playerStatesRef.current[mafiaIndex].isAlive;
        if (pageRef.current !== DESKTOP_NIGHTTIME && pageRef.current !== DESKTOP_NIGHTTIME_TIMER || !isMafia || !isAlive) {
            return;
        }
        let selections = playerStatesRef.current[mafiaIndex].mafia.currentSelections;
        let mafiaAlreadySelected = false;
        let newVotes = playerStatesRef.current[mafiaIndex].mafia.currentVotes;
        selections.forEach(element => {
            if (gamername === element.selectorGamername) {
                mafiaAlreadySelected = true;
                newVotes = [...newVotes, element];
            }
        });
        if (!mafiaAlreadySelected) {
            return;
        }
        let newSelections = playerStatesRef.current[mafiaIndex].mafia.currentSelections.filter(element => {
            return gamername !== element.selectorGamername;
        });
        const newPlayerStates = playerStatesRef.current.map((playerState, i) => ({
            ...playerState,
            mafia: {
                ...playerState.mafia,
                currentSelections: newSelections,
                currentVotes: newVotes,
            },
        }));
        setPlayerStates(newPlayerStates);
        playerStatesRef.current = newPlayerStates;
    }

    const handleDetectiveIdentifyPlayer = (gamername, selectedGamername) => {
        const detectiveIndex = playerStatesRef.current.findIndex(playerState => playerState.gamername === gamername);
        const suspectIndex = playerStatesRef.current.findIndex(playerState => playerState.gamername === selectedGamername);
        if (detectiveIndex === -1 || suspectIndex === -1 || detectiveIndex === suspectIndex) {
            return;
        }
        const isDetective = playerStatesRef.current[detectiveIndex].role === 'detective';
        const isAlive = playerStatesRef.current[detectiveIndex].isAlive;
        const isSuspectAlive = playerStatesRef.current[suspectIndex].isAlive;
        if (pageRef.current !== DESKTOP_NIGHTTIME && pageRef.current !== DESKTOP_NIGHTTIME_TIMER || !isDetective || !isAlive || !isSuspectAlive) {
            return;
        }
        const suspectPlayerInfo = {
            gamername: playerStatesRef.current[suspectIndex].gamername,
            realname: playerStatesRef.current[suspectIndex].realname,
            role: playerStatesRef.current[suspectIndex].role,
        };
        const newDiscoveredPlayers = [...playerStatesRef.current[detectiveIndex].detective.discoveredPlayers, suspectPlayerInfo];
        const newPlayerStates = playerStatesRef.current.map((playerState, i) => ({
            ...playerState,
            detective: {
                ...playerState.detective,
                discoveredPlayers: newDiscoveredPlayers,
                currentSuspect: suspectPlayerInfo,
            }
        }));
        setPlayerStates(newPlayerStates);
        playerStatesRef.current = newPlayerStates;
    }

    const handleAngelProtectPlayer = (gamername, selectedGamername) => {
        const angelIndex = playerStatesRef.current.findIndex(playerState => playerState.gamername === gamername);
        const protectedIndex = playerStatesRef.current.findIndex(playerState => playerState.gamername === selectedGamername);
        if (angelIndex === -1 || protectedIndex === -1 || angelIndex === protectedIndex) {
            return;
        }
        const isAngel = playerStatesRef.current[angelIndex].role === 'angel';
        const isAlive = playerStatesRef.current[angelIndex].isAlive;
        const isProtectedAlive = playerStatesRef.current[protectedIndex].isAlive;
        if (pageRef.current !== DESKTOP_NIGHTTIME && pageRef.current !== DESKTOP_NIGHTTIME_TIMER || !isAngel || !isAlive || !isProtectedAlive) {
            return;
        }
        const protectedPlayerInfo = {
            gamername: playerStatesRef.current[protectedIndex].gamername,
            realname: playerStatesRef.current[protectedIndex].realname,
            role: playerStatesRef.current[protectedIndex].role,
        };
        const newPlayerStates = playerStatesRef.current.map((playerState, i) => ({
            ...playerState,
            angel: {
                ...playerState.angel,
                currentProtected: protectedPlayerInfo,
            }
        }));
        setPlayerStates(newPlayerStates);
        playerStatesRef.current = newPlayerStates;
    }

    const handleAnswerTriviaQuestion = (gamername, answer) => {
        const playerIndex = playerStatesRef.current.findIndex(playerState => playerState.gamername === gamername);
        if (playerIndex === -1) {
            return;
        }
        const isAlive = playerStatesRef.current[playerIndex].isAlive;
        if (pageRef.current !== MOBILE_NIGHT || !isAlive) {
            return;
        }
        const currentQuestion = playerStatesRef.current[playerIndex].trivia.currentQuestion;
        const currentQuestionsAnswered = playerStatesRef.current[playerIndex].trivia.currentQuestionsAnswered + 1;
        const currentQuestionsCorrect = playerStatesRef.current[playerIndex].trivia.currentQuestionsCorrect + (answer === currentQuestion.answer ? 1 : 0);
        const newQuestion = getRandomTriviaQuestion();
        const newPlayerStates = playerStatesRef.current.map((playerState, i) => {
            if (i === playerIndex) {
                return {
                    ...playerState,
                    trivia: {
                        ...playerState.trivia,
                        currentQuestion: newQuestion,
                        currentQuestionsAnswered,
                        currentQuestionsCorrect,
                    }
                };
            }
            return playerState;
        });
        setPlayerStates(newPlayerStates);
        playerStatesRef.current = newPlayerStates;
    }

    const handleAdvanceToNighttimeOver = () => {
        if (pageRef.current !== DESKTOP_NIGHTTIME_TIMER) {
            return;
        }
        const newPlayerStates = playerStatesRef.current.map(playerState => {
            return { ...playerState, page: MOBILE_NIGHT_FINISHED };
        });
        setPlayerStates(newPlayerStates);
        playerStatesRef.current = newPlayerStates;
        setPage(DESKTOP_NIGHT_OVER);
        pageRef.current = DESKTOP_NIGHT_OVER;
    }
    
    return (
        <GlobalContext.Provider value={{
            page,
            playerStates,
            handlePlayerJoin,
            handleAddPlayerRealname,
            handleStartGame,
            handleAdvanceToYouReady,
            handleAdvanceToRevealIdentity,
            handleAdvanceToInstructions,
            handleSkipInstructions,
            handleAdvanceToNighttime,
            handleAdvanceToNighttimeTimer,
            handleMafiaSelectPlayer,
            handleMafiaConfirmSelection,
            handleDetectiveIdentifyPlayer,
            handleAngelProtectPlayer,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};