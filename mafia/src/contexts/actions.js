import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { VariableContext } from "./variables";
import {
  ACCUSATIONS,
  ACCUSED,
  GAME_OVER,
  INSTRUCTIONS,
  NIGHTTIME,
  NIGHTTIME_TIMER,
  NIGHT_OVER,
  POST_STORY_2,
  REVEAL_IDENTITY,
  STORY,
  VOTING,
  VOTING_RESULTS,
  VOTING_TIMER,
  WELCOME,
  YOU_READY,
} from "../pages";

export const ActionContext = createContext({
  handlePlayerJoin: () => {},
  handlePlayerLeave: () => {},
  handlePlayerSubmitRealname: () => {},
  handleHostStartGame: () => {},
  handleHostSkipInstructions: () => {},
  handleMafiaSelection: () => {},
  handleMafiaVote: () => {},
  handleDetectiveIdentification: () => {},
  handleAngelProtection: () => {},
  handleCivilianTriviaFinish: () => {},
  handleAccusation: () => {},
  handleLifeDeathSelection: () => {},
  handleLifeDeathVote: () => {},
  handleProgressToWelcomePage: () => {},
  handleProgressToAreYouReadyPage: () => {},
  handleProgressToLookAtYourPhonePage: () => {},
  handleProgressToInstructionsPage: () => {},
  handleProgressToNighttimePage: () => {},
  handleProgressToNighttimeTimerPage: () => {},
  handleProgressToNightOverPage: () => {},
  handleProgressToStoryPage: () => {},
  handleProgressToPostStoryPage: () => {},
  handleProgressToAccusationTimerPage: () => {},
  handleProgressToAccusedPage: () => {},
  handleProgressToVotingPage: () => {},
  handleProgressToVotingTimerPage: () => {},
  handleProgressToVotingResultsPage: () => {},
  handleProgressToGameOverPage: () => {},
  isGameOver: () => {},
});

export const ActionProvider = ({ children }) => {
  const {
    setPage,
    players,
    setPlayers,
    setMafia,
    setDetective,
    setAngel,
    setCivilians,
    setCurrentMafiaSelections,
    setCurrentMafiaVotes,
    setDetectiveIdentifications,
    setCurrentDetectiveIdentification,
    setCurrentAngelProtection,
    setCurrentCivilianTriviaFinishes,
    setCurrentAccusations,
    setCurrentLifeDeathSelections,
    setCurrentLifeDeathVotes,
    nighttimeTimer,
    setNighttimeTimer,
    setCurrentKill,
    setAccusationTimer,
    setRecentlyAccused,
    setVotingTimer,
    votingTimer,
    playersRef,
    pageRef,
    currentMafiaSelectionsRef,
    currentMafiaVotesRef,
    detectiveIdentificationsRef,
    currentDetectiveIdentificationRef,
    currentAngelProtectionRef,
    currentCivilianTriviaFinishesRef,
    currentAccusationsRef,
    recentlyAccusedRef,
    currentLifeDeathSelectionsRef,
    currentLifeDeathVotesRef,
    mafiaRef,
    detectiveRef,
    angelRef,
    civiliansRef,
    currentKillRef,
    accusationTimer,
  } = useContext(VariableContext);

  const introAudioRef = useRef(new Audio("./assets/Introloop.wav"));
  const narrationAudioRef = useRef(new Audio("./assets/narration.mp3"));
  const nighttimeOverTimeoutRef = useRef(null);

  useEffect(() => {
    if (nighttimeTimer === 0 && pageRef.current === NIGHTTIME_TIMER) {
      handleProgressToNightOverPage();
    }
  }, [nighttimeTimer]);

  useEffect(() => {
    if (accusationTimer === 0 && pageRef.current === ACCUSATIONS) {
      handleProgressToNighttimePage();
    }
  }, [accusationTimer]);

  useEffect(() => {
    if (votingTimer === 0 && pageRef.current === VOTING_TIMER) {
      handleProgressToVotingResultsPage();
    }
  }, [votingTimer]);

  const handlePlayerJoin = (gamername) => {
    // create a new player info object, with the gamername
    const newPlayer = {
      gamername,
      realname: "",
      role: "civilian",
      isAlive: true,
      isHost: playersRef.current.length === 0,
    };
    // add the new player to the players array
    playersRef.current = [...playersRef.current, newPlayer];
    setPlayers(playersRef.current);
  };
  const handlePlayerLeave = () => {
    // remove the player from the players array
    // TODO
    // evaluate if the game is over
    // TODO
  };
  const handlePlayerSubmitRealname = (gamername, realname) => {
    // if realname is already taken, add a number to the end of the realname
    const realnames = playersRef.current.map((player) => player.realname);
    if (realnames.includes(realname)) {
      let i = 2;
      while (realnames.includes(realname + i)) {
        i++;
      }
      realname += i;
    }
    // update the player's realname
    const newPlayers = playersRef.current.map((player) => {
      if (player.gamername === gamername) {
        player.realname = realname;
      }
      return player;
    });
    const bellAudio = new Audio("./assets/death-bell.wav");
    bellAudio.volume = 0.25;
    bellAudio.play();
    playersRef.current = newPlayers;
    setPlayers(playersRef.current);
  };

  const handleHostStartGame = () => {
    // assign roles
    const roles = getRoles(playersRef.current.length);
    // keep track of the roles
    const mafia = [];
    let detective = null;
    let angel = null;
    const civilians = [];
    // assign the roles to the players
    const newPlayers = playersRef.current.map((player, index) => {
      player.role = roles[index];
      if (player.role === "mafia") {
        mafia.push(player);
      } else if (player.role === "detective") {
        detective = player;
      } else if (player.role === "angel") {
        angel = player;
      } else {
        civilians.push(player);
      }
      return player;
    });
    playersRef.current = newPlayers;
    setPlayers(playersRef.current);
    mafiaRef.current = mafia;
    setMafia(mafiaRef.current);
    detectiveRef.current = detective;
    setDetective(detectiveRef.current);
    angelRef.current = angel;
    setAngel(angelRef.current);
    civiliansRef.current = civilians;
    setCivilians(civiliansRef.current);
    // advance to welcome page
    handleProgressToWelcomePage();
  };
  const handleHostSkipInstructions = () => {
    // advance to nighttime page
    handleProgressToNighttimePage();
  };

  const setNighttimeOverTimeout = () => {
    clearTimeout(nighttimeOverTimeoutRef.current);
    nighttimeOverTimeoutRef.current = setTimeout(() => {
      if (pageRef.current === NIGHTTIME_TIMER) {
        const alivePlayersLength = playersRef.current.filter(
          (player) => player.isAlive,
        ).length;
        if (
          isNightOver(
            currentMafiaVotesRef.current,
            currentDetectiveIdentificationRef.current,
            currentAngelProtectionRef.current,
            currentCivilianTriviaFinishesRef.current,
            alivePlayersLength,
          )
        ) {
          handleProgressToStoryPage();
        }
      }
    }, 2000);
  };

  const isGameOver = () => {
    const alivePlayers = playersRef.current.filter((player) => player.isAlive);
    const mafiaAlivePlayers = alivePlayers.filter(
      (player) => player.role === "mafia",
    );
    if (
      mafiaAlivePlayers.length >= alivePlayers.length / 2 ||
      mafiaAlivePlayers.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleMafiaSelection = (mafiaGamername, targetGamername) => {
    if (pageRef.current !== NIGHTTIME_TIMER) return;
    const mafiaPlayer = playersRef.current.find(
      (player) => player.gamername === mafiaGamername,
    );
    const targetPlayer = playersRef.current.find(
      (player) => player.gamername === targetGamername,
    );
    if (!mafiaPlayer || !targetPlayer) {
      return;
    }
    const currentMafiaSelection = currentMafiaSelectionsRef.current.find(
      (selection) => selection.player.gamername === mafiaPlayer.gamername,
    );
    // if mafia member has not selected a target, add the target to the currentMafiaSelections array
    if (!currentMafiaSelection) {
      currentMafiaSelectionsRef.current = [
        ...currentMafiaSelectionsRef.current,
        { player: mafiaPlayer, target: targetPlayer },
      ];
      setCurrentMafiaSelections(currentMafiaSelectionsRef.current);
    }
    // if mafia member has selected a target and this target is different from the previous target, update the target in the currentMafiaSelections array
    else if (currentMafiaSelection.target !== targetPlayer) {
      currentMafiaSelectionsRef.current = currentMafiaSelectionsRef.current.map(
        (selection) => {
          if (selection.player.gamername === mafiaPlayer.gamername) {
            selection.target = targetPlayer;
          }
          return selection;
        },
      );
      setCurrentMafiaSelections(currentMafiaSelectionsRef.current);
    }
    // if mafia member has selected a target and this target is the same as the previous target, remove the target from the currentMafiaSelections array
    else {
      currentMafiaSelectionsRef.current =
        currentMafiaSelectionsRef.current.filter(
          (selection) => selection.player.gamername !== mafiaPlayer.gamername,
        );
      setCurrentMafiaSelections(currentMafiaSelectionsRef.current);
    }
  };
  const handleMafiaVote = (mafiaGamername, targetGamername) => {
    if (pageRef.current !== NIGHTTIME_TIMER) return;
    const mafiaPlayer = playersRef.current.find(
      (player) => player.gamername === mafiaGamername,
    );
    const targetPlayer = playersRef.current.find(
      (player) => player.gamername === targetGamername,
    );
    if (!mafiaPlayer || !targetPlayer) {
      return;
    }
    const currentMafiaVote = currentMafiaVotesRef.current.find(
      (selection) => selection.player.gamername === mafiaPlayer.gamername,
    );
    // if mafia member has not voted, add the vote to the currentMafiaVotes array
    if (!currentMafiaVote) {
      currentMafiaVotesRef.current = [
        ...currentMafiaVotesRef.current,
        { player: mafiaPlayer, target: targetPlayer },
      ];
      setCurrentMafiaVotes(currentMafiaVotesRef.current);
    }
    // remove the vote from the currentMafiaSelections array
    currentMafiaSelectionsRef.current =
      currentMafiaSelectionsRef.current.filter(
        (selection) => selection.player.gamername !== mafiaPlayer.gamername,
      );
    setCurrentMafiaSelections(currentMafiaSelectionsRef.current);
    // check if night is over
    setNighttimeOverTimeout();
  };
  const handleDetectiveIdentification = (targetGamername) => {
    if (pageRef.current !== NIGHTTIME_TIMER) return;
    // find the detective
    const detective = playersRef.current.find(
      (player) => player.role === "detective",
    );
    // find the target
    const target = playersRef.current.find(
      (player) => player.gamername === targetGamername,
    );
    // if the detective and target are found, add the identification to the detectiveIdentifications array
    if (!detective || !target) {
      return;
    }
    detectiveIdentificationsRef.current = [
      ...detectiveIdentificationsRef.current,
      { player: detective, target },
    ];
    setDetectiveIdentifications(detectiveIdentificationsRef.current);
    currentDetectiveIdentificationRef.current = { player: detective, target };
    setCurrentDetectiveIdentification(
      currentDetectiveIdentificationRef.current,
    );
    // check if night is over
    setNighttimeOverTimeout();
  };
  const handleAngelProtection = (targetGamername) => {
    if (pageRef.current !== NIGHTTIME_TIMER) return;
    // find the angel
    const angel = playersRef.current.find((player) => player.role === "angel");
    // find the target
    const target = playersRef.current.find(
      (player) => player.gamername === targetGamername,
    );
    // if the angel and target are found, update the currentAngelProtection
    if (!angel || !target) {
      return;
    }
    currentAngelProtectionRef.current = { player: angel, target };
    setCurrentAngelProtection(currentAngelProtectionRef.current);
    // check if night is over
    setNighttimeOverTimeout();
  };
  const handleCivilianTriviaFinish = (gamername) => {
    if (pageRef.current !== NIGHTTIME_TIMER) return;
    // find the player
    const player = playersRef.current.find(
      (player) => player.gamername === gamername,
    );
    // if the player is found, add the player to the currentCivilianTriviaFinishes array
    if (!player) {
      return;
    }
    currentCivilianTriviaFinishesRef.current = [
      ...currentCivilianTriviaFinishesRef.current,
      player,
    ];
    setCurrentCivilianTriviaFinishes(currentCivilianTriviaFinishesRef.current);
    // check if night is over
    setNighttimeOverTimeout();
  };

  const handleAccusation = (accuserGamername, targetGamername) => {
    if (pageRef.current !== ACCUSATIONS) return;
    // find the accuser
    const accuser = playersRef.current.find(
      (player) => player.gamername === accuserGamername,
    );
    // find the target
    const target = playersRef.current.find(
      (player) => player.gamername === targetGamername,
    );
    // if the accuser and target are found, add the accusation to the currentAccusations array
    if (!accuser || !target) {
      return;
    }
    // if the player has already accused someone, remove the previous accusation
    currentAccusationsRef.current = currentAccusationsRef.current.filter(
      (accusation) => accusation.player.gamername !== accuserGamername,
    );
    // add the new accusation
    currentAccusationsRef.current = [
      ...currentAccusationsRef.current,
      { player: accuser, target },
    ];
    setCurrentAccusations(currentAccusationsRef.current);
    // check if accusations are over
    // find the max number of accusations for a single player
    const accusationCounts = {};
    currentAccusationsRef.current.forEach((accusation) => {
      accusationCounts[accusation.target.gamername] =
        (accusationCounts[accusation.target.gamername] || 0) + 1;
    });
    const maxAccusations = Math.max(...Object.values(accusationCounts));
    // if any player has been accused 2 times, set this player as the recentlyAccused and progress to ACCUSED page
    if (maxAccusations >= 2) {
      const accusedPlayers = Object.keys(accusationCounts).filter(
        (gamername) => accusationCounts[gamername] === maxAccusations,
      );
      const randomIndex = Math.floor(Math.random() * accusedPlayers.length);
      const recentlyAccused = playersRef.current.find(
        (player) => player.gamername === accusedPlayers[randomIndex],
      );
      recentlyAccusedRef.current = recentlyAccused;
      setRecentlyAccused(recentlyAccusedRef.current);
      handleProgressToAccusedPage();
    }
  };
  const handleLifeDeathSelection = (voterGamername, vote) => {
    if (pageRef.current !== VOTING_TIMER) return;
    // find the voter
    const voter = playersRef.current.find(
      (player) => player.gamername === voterGamername,
    );
    // if the voter is found, add the vote to the currentLifeDeathSelections array
    if (!voter) {
      return;
    }
    // get the current vote
    const currentVote = currentLifeDeathSelectionsRef.current.find(
      (vote) => vote.player === voter,
    );
    // if the voter has not voted, add the vote to the currentLifeDeathSelections array
    if (!currentVote) {
      currentLifeDeathSelectionsRef.current = [
        ...currentLifeDeathSelectionsRef.current,
        { player: voter, vote },
      ];
      setCurrentLifeDeathSelections(currentLifeDeathSelectionsRef.current);
    }
    // if the voter has voted and this vote is different from the previous vote, update the vote in the currentLifeDeathSelections array
    else if (currentVote.vote !== vote) {
      currentLifeDeathSelectionsRef.current =
        currentLifeDeathSelectionsRef.current.map((playerVote) => {
          if (playerVote.player === voter) {
            playerVote.vote = vote;
          }
          return playerVote;
        });
      setCurrentLifeDeathSelections(currentLifeDeathSelectionsRef.current);
    }
    // if the voter has voted and this vote is the same as the previous vote, remove the vote from the currentLifeDeathSelections array
    else {
      currentLifeDeathSelectionsRef.current =
        currentLifeDeathSelectionsRef.current.filter(
          (playerVote) => playerVote.player !== voter,
        );
      setCurrentLifeDeathSelections(currentLifeDeathSelectionsRef.current);
    }
  };
  const handleLifeDeathVote = (voterGamername, vote) => {
    if (pageRef.current !== VOTING_TIMER) return;
    // find the voter
    const voter = playersRef.current.find(
      (player) => player.gamername === voterGamername,
    );
    // if the voter is found, add the vote to the currentLifeDeathVotes array
    if (!voter) {
      return;
    }
    // get the current vote
    const currentVote = currentLifeDeathVotesRef.current.find(
      (vote) => vote.player === voter,
    );
    // if the voter has not voted, add the vote to the currentLifeDeathVotes array
    if (!currentVote) {
      currentLifeDeathVotesRef.current = [
        ...currentLifeDeathVotesRef.current,
        { player: voter, vote },
      ];
      setCurrentLifeDeathVotes(currentLifeDeathVotesRef.current);
    }
    // remove the vote from the currentLifeDeathSelections array
    currentLifeDeathSelectionsRef.current =
      currentLifeDeathSelectionsRef.current.filter(
        (playerVote) => playerVote.player !== voter,
      );
    setCurrentLifeDeathSelections(currentLifeDeathSelectionsRef.current);
    // check if voting is over
    if (
      // everyone who is alive has voted, except for the accused player
      currentLifeDeathVotesRef.current.length ===
      playersRef.current.filter((player) => player.isAlive).length - 1
    ) {
      handleProgressToVotingResultsPage();
    }
  };

  const handleProgressToWelcomePage = () => {
    // play the intro audio
    introAudioRef.current.play();
    // set the page to WELCOME
    pageRef.current = WELCOME;
    setPage(pageRef.current);
  };
  const handleProgressToAreYouReadyPage = () => {
    // set the page to YOU_READY
    pageRef.current = YOU_READY;
    setPage(pageRef.current);
  };
  const handleProgressToLookAtYourPhonePage = () => {
    // set the page to REVEAL_IDENTITY
    pageRef.current = REVEAL_IDENTITY;
    setPage(pageRef.current);
  };
  const handleProgressToInstructionsPage = () => {
    // stop the intro audio
    introAudioRef.current.pause();
    // reset the intro audio
    introAudioRef.current.currentTime = 0;
    // play the intro audio again
    introAudioRef.current.play();
    // set the page to INSTRUCTIONS
    pageRef.current = INSTRUCTIONS;
    setPage(pageRef.current);
  };
  const handleProgressToNighttimePage = (onGameOver = () => {}) => {
    if (isGameOver()) {
      onGameOver();
      handleProgressToGameOverPage();
      return;
    }
    // pause the intro audio
    introAudioRef.current.pause();
    // reset the currentMafiaSelections array
    currentMafiaSelectionsRef.current = [];
    setCurrentMafiaSelections([]);
    // reset the currentMafiaVotes array
    currentMafiaVotesRef.current = [];
    setCurrentMafiaVotes([]);
    // reset the currentKill
    currentKillRef.current = null;
    setCurrentKill(null);
    // reset the currentDetectiveIdentification
    currentDetectiveIdentificationRef.current = null;
    setCurrentDetectiveIdentification(null);
    // reset the currentAngelProtection
    currentAngelProtectionRef.current = null;
    setCurrentAngelProtection(null);
    // reset the currentCivilianTriviaFinishes array
    currentCivilianTriviaFinishesRef.current = [];
    setCurrentCivilianTriviaFinishes([]);
    // set the page to NIGHTTIME
    pageRef.current = NIGHTTIME;
    setPage(pageRef.current);
  };
  const handleProgressToNighttimeTimerPage = () => {
    // reset the nighttimeTimer
    setNighttimeTimer(120);
    // set the page to NIGHTTIME_TIMER
    pageRef.current = NIGHTTIME_TIMER;
    setPage(pageRef.current);
  };
  const handleProgressToNightOverPage = () => {
    // set the page to NIGHT_OVER
    pageRef.current = NIGHT_OVER;
    setPage(pageRef.current);
  };
  const handleProgressToStoryPage = () => {
    // decide on the player to die
    // this is determined by the mafia votes
    // whoever has the most votes dies
    // if there is a tie, select randomly from the tied players
    const voteCounts = {};
    currentMafiaVotesRef.current.forEach((vote) => {
      voteCounts[vote.target.gamername] =
        (voteCounts[vote.target.gamername] || 0) + 1;
    });
    const maxVotes = Math.max(...Object.values(voteCounts));
    const playersWithMaxVotes = Object.keys(voteCounts).filter(
      (gamername) => voteCounts[gamername] === maxVotes,
    );
    const randomIndex = Math.floor(Math.random() * playersWithMaxVotes.length);
    const playerToDie = playersRef.current.find(
      (player) => player.gamername === playersWithMaxVotes[randomIndex],
    );
    if (!playerToDie) {
      return;
    }
    // update the player's isAlive status
    if (
      playerToDie &&
      playerToDie.gamername !==
        currentAngelProtectionRef.current?.target.gamername
    ) {
      playerToDie.isAlive = false;
    }
    // set the currentKill
    currentKillRef.current = playerToDie;
    setCurrentKill(currentKillRef.current);
    // set the page to STORY
    pageRef.current = STORY;
    setPage(pageRef.current);
  };
  const handleProgressToPostStoryPage = () => {
    // reset the accusationTimer
    setAccusationTimer(300);
    // reset the recentlyAccused
    recentlyAccusedRef.current = null;
    setRecentlyAccused(recentlyAccusedRef.current);
    // set the page to POST_STORY_2
    pageRef.current = POST_STORY_2;
    setPage(pageRef.current);
  };
  const handleProgressToAccusationTimerPage = () => {
    // reset currentAccusations
    currentAccusationsRef.current = [];
    setCurrentAccusations([]);
    // reset currentLifeDeathSelections
    currentLifeDeathSelectionsRef.current = [];
    setCurrentLifeDeathSelections([]);
    // reset currentLifeDeathVotes
    currentLifeDeathVotesRef.current = [];
    setCurrentLifeDeathVotes([]);
    // set the page to ACCUSATIONS
    pageRef.current = ACCUSATIONS;
    setPage(pageRef.current);
  };
  const handleProgressToAccusedPage = () => {
    // play narration audio
    narrationAudioRef.current.currentTime = 0;
    narrationAudioRef.current.volume = 0.5;
    narrationAudioRef.current.play();
    // set the page to ACCUSED
    pageRef.current = ACCUSED;
    setPage(pageRef.current);
  };
  const handleProgressToVotingPage = () => {
    // set the page to VOTING
    pageRef.current = VOTING;
    setPage(pageRef.current);
  };
  const handleProgressToVotingTimerPage = () => {
    // stop the narration audio
    narrationAudioRef.current.pause();
    // start the intro audio on loop
    introAudioRef.current.currentTime = 0;
    introAudioRef.current.loop = true;
    introAudioRef.current.play();
    // reset the votingTimer
    setVotingTimer(300);
    // set the page to VOTING_TIMER
    pageRef.current = VOTING_TIMER;
    setPage(pageRef.current);
  };
  const handleProgressToVotingResultsPage = () => {
    // stop the intro audio
    introAudioRef.current.pause();
    // check if player lives or dies
    const votesToLive = currentLifeDeathVotesRef.current.filter(
      (vote) => vote.vote === "live",
    ).length;
    const votesToDie = currentLifeDeathVotesRef.current.filter(
      (vote) => vote.vote === "die",
    ).length;
    if (votesToDie > votesToLive) {
      // the player dies
      const newPlayers = playersRef.current.map((player) => {
        if (player.gamername === recentlyAccusedRef.current?.gamername) {
          player.isAlive = false;
          recentlyAccusedRef.current = player;
          setRecentlyAccused(recentlyAccusedRef.current);
        }
        return player;
      });
      playersRef.current = newPlayers;
      setPlayers(playersRef.current);
    }
    // set the page to VOTING_RESULTS
    pageRef.current = VOTING_RESULTS;
    setPage(pageRef.current);
  };
  const handleProgressToGameOverPage = () => {
    // set the page to GAME_OVER
    pageRef.current = GAME_OVER;
    setPage(pageRef.current);
  };

  const actions = useMemo(
    () => ({
      handlePlayerJoin,
      handlePlayerLeave,
      handlePlayerSubmitRealname,
      handleHostStartGame,
      handleHostSkipInstructions,
      handleMafiaSelection,
      handleMafiaVote,
      handleDetectiveIdentification,
      handleAngelProtection,
      handleCivilianTriviaFinish,
      handleAccusation,
      handleLifeDeathSelection,
      handleLifeDeathVote,
      handleProgressToWelcomePage,
      handleProgressToAreYouReadyPage,
      handleProgressToLookAtYourPhonePage,
      handleProgressToInstructionsPage,
      handleProgressToNighttimePage,
      handleProgressToNighttimeTimerPage,
      handleProgressToNightOverPage,
      handleProgressToStoryPage,
      handleProgressToPostStoryPage,
      handleProgressToAccusationTimerPage,
      handleProgressToAccusedPage,
      handleProgressToVotingPage,
      handleProgressToVotingTimerPage,
      handleProgressToVotingResultsPage,
      handleProgressToGameOverPage,
      isGameOver,
    }),
    [
      handlePlayerJoin,
      handlePlayerLeave,
      handlePlayerSubmitRealname,
      handleHostStartGame,
      handleHostSkipInstructions,
      handleMafiaSelection,
      handleMafiaVote,
      handleDetectiveIdentification,
      handleAngelProtection,
      handleCivilianTriviaFinish,
      handleAccusation,
      handleLifeDeathSelection,
      handleLifeDeathVote,
      handleProgressToWelcomePage,
      handleProgressToAreYouReadyPage,
      handleProgressToLookAtYourPhonePage,
      handleProgressToInstructionsPage,
      handleProgressToNighttimePage,
      handleProgressToNighttimeTimerPage,
      handleProgressToNightOverPage,
      handleProgressToStoryPage,
      handleProgressToPostStoryPage,
      handleProgressToAccusationTimerPage,
      handleProgressToAccusedPage,
      handleProgressToVotingPage,
      handleProgressToVotingTimerPage,
      handleProgressToVotingResultsPage,
      handleProgressToGameOverPage,
      isGameOver,
    ],
  );

  return (
    <ActionContext.Provider value={actions}>{children}</ActionContext.Provider>
  );
};

const getRoles = (numPlayers) => {
  const roles = [];
  for (let i = 0; i < numPlayers; i++) {
    if (i === 0) {
      roles.push("detective");
    } else if (i === 1) {
      roles.push("angel");
    } else if (i % 4 === 2) {
      roles.push("mafia");
    } else {
      roles.push("civilian");
    }
  }
  return shuffle(roles);
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const isNightOver = (
  mafiaVotes,
  currentDetectiveIdentification,
  currentAngelProtection,
  currentCivilianTriviaFinishes,
  alivePlayersLength,
) => {
  let totalNightCompletions = 0;
  totalNightCompletions += mafiaVotes.length;
  if (currentDetectiveIdentification) {
    totalNightCompletions++;
  }
  if (currentAngelProtection) {
    totalNightCompletions++;
  }
  totalNightCompletions += currentCivilianTriviaFinishes.length;
  return totalNightCompletions === alivePlayersLength;
};
