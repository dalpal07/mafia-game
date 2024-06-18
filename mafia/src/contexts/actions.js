import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useRef,
} from "react";
import { VariableContext } from "./variables";
import {
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
  handleTransitionFromVotingResultsPage: () => {},
  handleProgressToGameOverPage: () => {},
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
    currentMafiaSelections,
    setCurrentMafiaSelections,
    currentMafiaVotes,
    setCurrentMafiaVotes,
    detectiveIdentifications,
    setDetectiveIdentifications,
    setCurrentDetectiveIdentification,
    currentAngelProtection,
    setCurrentAngelProtection,
    currentCivilianTriviaFinishes,
    setCurrentCivilianTriviaFinishes,
    currentAccusations,
    setCurrentAccusations,
    currentLifeDeathSelections,
    setCurrentLifeDeathSelections,
    currentLifeDeathVotes,
    setCurrentLifeDeathVotes,
    setNighttimeTimer,
    setCurrentKill,
    setAccusationTimer,
    recentlyAccused,
    setRecentlyAccused,
    setVotingTimer,
  } = useContext(VariableContext);
  const introAudioRef = useRef(new Audio("./assets/Introloop.wav"));

  const handlePlayerJoin = (gamername) => {
    // create a new player info object, with the gamername
    const newPlayer = {
      gamername,
      realname: "",
      role: "civilian",
      isAlive: true,
      isHost: players.length === 0,
    };
    // add the new player to the players array
    setPlayers([...players, newPlayer]);
  };
  const handlePlayerLeave = () => {
    // remove the player from the players array
    // TODO
    // evaluate if the game is over
    // TODO
  };
  const handlePlayerSubmitRealname = (gamername, realname) => {
    const bellAudio = new Audio("./assets/death-bell.wav");
    bellAudio.volume = 0.25;
    bellAudio.play();
    // if realname is already taken, add a number to the end of the realname
    const realnames = players.map((player) => player.realname);
    if (realnames.includes(realname)) {
      let i = 1;
      while (realnames.includes(realname + i)) {
        i++;
      }
      realname += i;
    }
    // update the player's realname
    const newPlayers = players.map((player) => {
      if (player.gamername === gamername) {
        player.realname = realname;
      }
      return player;
    });
    setPlayers(newPlayers);
  };

  const handleHostStartGame = () => {
    // assign roles
    const roles = getRoles(players.length);
    // keep track of the roles
    const mafia = [];
    let detective = null;
    let angel = null;
    const civilians = [];
    // assign the roles to the players
    const newPlayers = players.map((player, index) => {
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
    setPlayers(newPlayers);
    setMafia(mafia);
    setDetective(detective);
    setAngel(angel);
    setCivilians(civilians);
    // advance to welcome page
    handleProgressToWelcomePage();
  };
  const handleHostSkipInstructions = () => {
    // advance to nighttime page
    handleProgressToNighttimePage();
  };

  const handleMafiaSelection = (mafiaGamername, targetGamername) => {
    const mafiaPlayer = players.find(
      (player) => player.gamername === mafiaGamername,
    );
    const targetPlayer = players.find(
      (player) => player.gamername === targetGamername,
    );
    if (!mafiaPlayer || !targetPlayer) {
      return;
    }
    const currentMafiaSelection = currentMafiaSelections.find(
      (selection) => selection.player === mafiaPlayer,
    );
    // if mafia member has not selected a target, add the target to the currentMafiaSelections array
    if (!currentMafiaSelection) {
      setCurrentMafiaSelections([
        ...currentMafiaSelections,
        { player: mafiaPlayer, target: targetPlayer },
      ]);
    }
    // if mafia member has selected a target and this target is different from the previous target, update the target in the currentMafiaSelections array
    else if (currentMafiaSelection.target !== targetPlayer) {
      setCurrentMafiaSelections(
        currentMafiaSelections.map((selection) => {
          if (selection.player === mafiaPlayer) {
            selection.target = targetPlayer;
          }
          return selection;
        }),
      );
    }
    // if mafia member has selected a target and this target is the same as the previous target, remove the target from the currentMafiaSelections array
    else {
      setCurrentMafiaSelections(
        currentMafiaSelections.filter(
          (selection) => selection.player !== mafiaPlayer,
        ),
      );
    }
  };
  const handleMafiaVote = (mafiaGamername, targetGamername) => {
    const mafiaPlayer = players.find(
      (player) => player.gamername === mafiaGamername,
    );
    const targetPlayer = players.find(
      (player) => player.gamername === targetGamername,
    );
    if (!mafiaPlayer || !targetPlayer) {
      return;
    }
    const currentMafiaVote = currentMafiaVotes.find(
      (selection) => selection.player === mafiaPlayer,
    );
    // if mafia member has not voted, add the vote to the currentMafiaVotes array
    if (!currentMafiaVote) {
      setCurrentMafiaVotes([
        ...currentMafiaVotes,
        { player: mafiaPlayer, target: targetPlayer },
      ]);
    }
    // remove the vote from the currentMafiaSelections array
    setCurrentMafiaSelections(
      currentMafiaSelections.filter(
        (selection) => selection.player !== mafiaPlayer,
      ),
    );
    // TODO: check if night is over
  };
  const handleDetectiveIdentification = (targetGamername) => {
    // find the detective
    const detective = players.find((player) => player.role === "detective");
    // find the target
    const target = players.find(
      (player) => player.gamername === targetGamername,
    );
    // if the detective and target are found, add the identification to the detectiveIdentifications array
    if (!detective || !target) {
      return;
    }
    setDetectiveIdentifications([
      ...detectiveIdentifications,
      { player: detective, target },
    ]);
    setCurrentDetectiveIdentification({ player: detective, target });
    // TODO: check if night is over
  };
  const handleAngelProtection = (targetGamername) => {
    // find the angel
    const angel = players.find((player) => player.role === "angel");
    // find the target
    const target = players.find(
      (player) => player.gamername === targetGamername,
    );
    // if the angel and target are found, update the currentAngelProtection
    if (!angel || !target) {
      return;
    }
    setCurrentAngelProtection({ player: angel, target });
    // TODO: check if night is over
  };
  const handleCivilianTriviaFinish = (gamername) => {
    // find the player
    const player = players.find((player) => player.gamername === gamername);
    // if the player is found, add the player to the currentCivilianTriviaFinishes array
    if (!player) {
      return;
    }
    setCurrentCivilianTriviaFinishes([
      ...currentCivilianTriviaFinishes,
      player,
    ]);
    // TODO: check if night is over
  };

  const handleAccusation = (accuserGamername, targetGamername) => {
    // find the accuser
    const accuser = players.find(
      (player) => player.gamername === accuserGamername,
    );
    // find the target
    const target = players.find(
      (player) => player.gamername === targetGamername,
    );
    // if the accuser and target are found, add the accusation to the currentAccusations array
    if (!accuser || !target) {
      return;
    }
    setCurrentAccusations([...currentAccusations, { player: accuser, target }]);
    // TODO: check if accusations are over
  };
  const handleLifeDeathSelection = (voterGamername, vote) => {
    // find the voter
    const voter = players.find((player) => player.gamername === voterGamername);
    // if the voter is found, add the vote to the currentLifeDeathSelections array
    if (!voter) {
      return;
    }
    // get the current vote
    const currentVote = currentLifeDeathSelections.find(
      (vote) => vote.player === voter,
    );
    // if the voter has not voted, add the vote to the currentLifeDeathSelections array
    if (!currentVote) {
      setCurrentLifeDeathSelections([
        ...currentLifeDeathSelections,
        { player: voter, vote },
      ]);
    }
    // if the voter has voted and this vote is different from the previous vote, update the vote in the currentLifeDeathSelections array
    else if (currentVote.vote !== vote) {
      setCurrentLifeDeathSelections(
        currentLifeDeathSelections.map((playerVote) => {
          if (playerVote.player === voter) {
            playerVote.vote = vote;
          }
          return playerVote;
        }),
      );
    }
    // if the voter has voted and this vote is the same as the previous vote, remove the vote from the currentLifeDeathSelections array
    else {
      setCurrentLifeDeathSelections(
        currentLifeDeathSelections.filter(
          (playerVote) => playerVote.player !== voter,
        ),
      );
    }
  };
  const handleLifeDeathVote = (voterGamername, vote) => {
    // find the voter
    const voter = players.find((player) => player.gamername === voterGamername);
    // if the voter is found, add the vote to the currentLifeDeathVotes array
    if (!voter) {
      return;
    }
    // get the current vote
    const currentVote = currentLifeDeathVotes.find(
      (vote) => vote.player === voter,
    );
    // if the voter has not voted, add the vote to the currentLifeDeathVotes array
    if (!currentVote) {
      setCurrentLifeDeathVotes([
        ...currentLifeDeathVotes,
        { player: voter, vote },
      ]);
    }
    // remove the vote from the currentLifeDeathSelections array
    setCurrentLifeDeathSelections(
      currentLifeDeathSelections.filter(
        (playerVote) => playerVote.player !== voter,
      ),
    );
  };

  const handleProgressToWelcomePage = () => {
    // play the intro audio
    introAudioRef.current.play();
    // set the page to WELCOME
    setPage(WELCOME);
  };
  const handleProgressToAreYouReadyPage = () => {
    // set the page to YOU_READY
    setPage(YOU_READY);
  };
  const handleProgressToLookAtYourPhonePage = () => {
    // set the page to REVEAL_IDENTITY
    setPage(REVEAL_IDENTITY);
  };
  const handleProgressToInstructionsPage = () => {
    // stop the intro audio
    introAudioRef.current.pause();
    // reset the intro audio
    introAudioRef.current.currentTime = 0;
    // play the intro audio again
    introAudioRef.current.play();
    // set the page to INSTRUCTIONS
    setPage(INSTRUCTIONS);
  };
  const handleProgressToNighttimePage = () => {
    // pause the intro audio
    introAudioRef.current.pause();
    // reset the currentMafiaSelections array
    setCurrentMafiaSelections([]);
    // reset the currentMafiaVotes array
    setCurrentMafiaVotes([]);
    // reset the currentKill
    setCurrentKill(null);
    // reset the currentDetectiveIdentification
    setCurrentDetectiveIdentification(null);
    // reset the currentAngelProtection
    setCurrentAngelProtection(null);
    // reset the currentCivilianTriviaFinishes array
    setCurrentCivilianTriviaFinishes([]);
    // set the page to NIGHTTIME
    setPage(NIGHTTIME);
  };
  const handleProgressToNighttimeTimerPage = () => {
    // reset the nighttimeTimer
    setNighttimeTimer(120);
    // set the page to NIGHTTIME_TIMER
    setPage(NIGHTTIME_TIMER);
  };
  const handleProgressToNightOverPage = () => {
    // set the page to NIGHT_OVER
    setPage(NIGHT_OVER);
  };
  const handleProgressToStoryPage = () => {
    // decide on the player to die
    // this is determined by the mafia votes
    // whoever has the most votes dies
    // if there is a tie, select randomly from the tied players
    const voteCounts = {};
    currentMafiaVotes.forEach((vote) => {
      voteCounts[vote.target.gamername] =
        (voteCounts[vote.target.gamername] || 0) + 1;
    });
    const maxVotes = Math.max(...Object.values(voteCounts));
    const playersWithMaxVotes = Object.keys(voteCounts).filter(
      (gamername) => voteCounts[gamername] === maxVotes,
    );
    const randomIndex = Math.floor(Math.random() * playersWithMaxVotes.length);
    const playerToDie = players.find(
      (player) => player.gamername === playersWithMaxVotes[randomIndex],
    );
    if (!playerToDie) {
      return;
    }
    // update the player's isAlive status
    if (playerToDie) {
      playerToDie.isAlive = false;
    }
    // set the currentKill
    setCurrentKill(playerToDie);
    // set the page to STORY
    setPage(STORY);
  };
  const handleProgressToPostStoryPage = () => {
    // reset the accusationTimer
    setAccusationTimer(300);
    // reset the recentlyAccused
    setRecentlyAccused(null);
    // set the page to POST_STORY_2
    setPage(POST_STORY_2);
  };
  const handleProgressToAccusationTimerPage = () => {
    // reset currentAccusations
    setCurrentAccusations([]);
    // reset currentLifeDeathSelections
    setCurrentLifeDeathSelections([]);
    // reset currentLifeDeathVotes
    setCurrentLifeDeathVotes([]);
  };
  const handleProgressToAccusedPage = () => {
    // set the page to ACCUSED
    setPage(ACCUSED);
  };
  const handleProgressToVotingPage = () => {
    // set the page to VOTING
    setPage(VOTING);
  };
  const handleProgressToVotingTimerPage = () => {
    // reset the votingTimer
    setVotingTimer(300);
    // set the page to VOTING_TIMER
    setPage(VOTING_TIMER);
  };
  const handleProgressToVotingResultsPage = () => {
    // set the page to VOTING_RESULTS
    setPage(VOTING_RESULTS);
  };
  const handleTransitionFromVotingResultsPage = () => {
    // check if player lives or dies
    const votesToLive = currentLifeDeathVotes.filter(
      (vote) => vote.vote === "live",
    ).length;
    const votesToDie = currentLifeDeathVotes.filter(
      (vote) => vote.vote === "die",
    ).length;
    if (votesToDie > votesToLive) {
      // the player dies
      const newPlayers = players.map((player) => {
        if (player.gamername === recentlyAccused?.gamername) {
          player.isAlive = false;
        }
        return player;
      });
      setPlayers(newPlayers);
      // TODO: check if game is over
    } else {
      handleProgressToAccusationTimerPage();
    }
  };
  const handleProgressToGameOverPage = () => {
    // set the page to GAME_OVER
    setPage(GAME_OVER);
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
      handleTransitionFromVotingResultsPage,
      handleProgressToGameOverPage,
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
      handleTransitionFromVotingResultsPage,
      handleProgressToGameOverPage,
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
