import React, {useEffect, useRef, useState} from 'react';
import {InnerPageBox, SpaceBetweenRowBox, StandardPageBox} from "./components/boxes";
import WaitingPlayers from "./pages/waiting-players";
import Welcome from "./pages/welcome";
import RevealIdentity from "./pages/reveal-identity";
import Instructions from "./pages/instructions";
import Nighttime from "./pages/nighttime";
import NighttimeTimer from "./pages/nighttime-timer";
import NightOver from "./pages/night-over";
import Story from "./pages/story";
import PostStory2 from "./pages/post-story-2";
import Accusations from "./pages/accusations";
import Accused from "./pages/accused";
import Voting from "./pages/voting";
import VotingTimer from "./pages/voting-timer";
import VotingResults from "./pages/voting-results";
import GameOver from "./pages/game-over";

const MIN_PLAYERS = 5;
const MAX_PLAYERS = 18;

const WAITING_PLAYERS = 0;
const WELCOME = 1;
const YOU_READY = 2;
const REVEAL_IDENTITY = 3;
const INSTRUCTIONS = 4;
const NIGHTTIME = 5;
const NIGHTTIME_TIMER = 6;
const NIGHT_OVER = 7;
const STORY = 8;
const POST_STORY_2 = 10;
const ACCUSATIONS = 11;
const ACCUSED = 12;
const VOTING = 13;
const VOTING_TIMER = 14;
const VOTING_RESULTS = 15;
const GAME_OVER = 16;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

let timeout;

function App() {
    const playingAgain = useRef(false);
    const [page, setPage] = useState(WAITING_PLAYERS);
    const pageRef = useRef(page);
    const messagePageRef = useRef(null);
    const [players, setPlayers] = useState([]);
    const playersRef = useRef(players);
    const [died, setDied] = useState(false);
    const [accused, setAccused] = useState(null);
    const [accusedRole, setAccusedRole] = useState(null);
    const [accuser1, setAccuser1] = useState(null);
    const [accuser2, setAccuser2] = useState(null);
    const [fate, setFate] = useState(null);
    const [winner, setWinner] = useState(null);
    const winnerRef = useRef(winner);

    const [startNighttime, setStartNighttime] = useState(false);
    const [nighttimeOver, setNighttimeOver] = useState(false);
    const [storyOver, setStoryOver] = useState(false);
    const [votingOver, setVotingOver] = useState(false);
    const [dayTimer, setDayTimer] = useState(300);
    const [dayOver, setDayOver] = useState(false);
    const [dayPaused, setDayPaused] = useState(false);
    const [firstNight, setFirstNight] = useState(true);

    const [playersDidntFinishNight, setPlayersDidntFinishNight] = useState([]);
    const [savedPlayer, setSavedPlayer] = useState(null);
    const [killedPLayer, setKilledPlayer] = useState(null);

    const introAudio = useRef(new Audio('./assets/Introloop.wav'));
    introAudio.current.volume = 0.75;
    const nightAudio = useRef(new Audio('./assets/Nightloop.wav'));
    nightAudio.current.volume = 0.75;
    const deathAudio = useRef(new Audio('./assets/Deathloop.wav'));
    deathAudio.current.volume = 0.5;
    const dayAudio = useRef(new Audio('./assets/Dayloop.wav'));
    dayAudio.current.volume = 0.75;
    const death2Audio = useRef(new Audio('./assets/Deathloop2.wav'));
    death2Audio.current.volume = 0.5;
    const narrationAudio = useRef(new Audio('./assets/narration.mp3'));
    narrationAudio.current.volume = 0.5;

    const playDeathAudio = () => {
        deathAudio.current.currentTime = 0;
        deathAudio.current.play();
    }

    const endDeathAudio = () => {
        deathAudio.current.pause();
    }

    const playDeath2Audio = () => {
        death2Audio.current.currentTime = 0;
        death2Audio.current.play();
    }

    const endDeath2Audio = () => {
        death2Audio.current.pause();
    }

    const playNarrationAudio = () => {
        narrationAudio.current.currentTime = 0;
        narrationAudio.current.play();
    }

    const endNarrationAudio = () => {
        narrationAudio.current.pause();
    }

    function sendMessageToParent(message) {
        if (typeof message !== 'string') {
            parent.postMessage(JSON.stringify(message), '*');
            return;
        }
        parent.postMessage(message, '*');
    }

    async function assignRoles(players) {
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
        const shuffledRoles = shuffle(roles);
        return players.map((player, i) => {
            return {
                ...player,
                role: shuffledRoles[i],
            }
        });
    }

    function handleMessageFromParent(event) {
        const msg = event.data;
        if (msg.name === 'addPlayer') {
            sendMessageToParent({to: 'all', name: 'notEveryoneReady'});
            if (pageRef.current !== WAITING_PLAYERS) return;
            setPlayers(prevState => [
                ...prevState,
                {
                    realName: '',
                    name: msg.player,
                    role: null,
                    finishedNight: false,
                    killVotes: [],
                    accusations: [],
                    inHeaven: false,
                    saved: false,
                    identified: false,
                    vote: null,
                    voteSubmitted: false,
                    accused: false,
                    locked: false,
                    winner: false,
                }
            ]);
            playersRef.current = [
                ...playersRef.current,
                {
                    realName: '',
                    name: msg.player,
                    role: null,
                    finishedNight: false,
                    killVotes: [],
                    accusations: [],
                    inHeaven: false,
                    saved: false,
                    identified: false,
                    vote: null,
                    voteSubmitted: false,
                    accused: false,
                    locked: false,
                    winner: false,
                }
            ];
        }
        else if (msg.name === 'setRealName') {
            const playerJoinAudio = new Audio('./assets/death-bell.wav');
            playerJoinAudio.volume = 0.5;
            playerJoinAudio.play();
            let realName = msg.realName;
            const allNames = playersRef.current.map(player => player.realName);
            if (allNames.includes(realName)) {
                for (let i = 2; i <= MAX_PLAYERS; i++) {
                    if (!allNames.includes(`${realName}${i}`)) {
                        realName = `${realName}${i}`;
                        break;
                    }
                }
            }
            sendMessageToParent({to: 'one', name: 'realName', realName: realName, player: msg.player});
            const newPlayers = playersRef.current.map(player => {
                if (player.name === msg.player) {
                    return {
                        ...player,
                        realName: realName,
                    }
                }
                return player;
            });
            setPlayers(newPlayers);
            playersRef.current = newPlayers;
            if (!newPlayers.find(player => player.realName === '')) {
                sendMessageToParent({to: 'all', name: 'everyoneReady'});
            }
        }
        else if (msg.name === 'start') {
            assignRoles(playersRef.current).then((newPlayers) => {
                playersRef.current = newPlayers;
                setPlayers(newPlayers);
                messagePageRef.current = 'preparation';
                sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers, page: 'preparation'});
                onStartGame();
            });
        }
        else if (msg.name === 'skip') {
            setStartNighttime(true);
        }
        else if (msg.name === 'protect') {
            setSavedPlayer(msg.target);
            const newPlayers = playersRef.current.map(player => {
                if (player.realName === msg.target) {
                    return {
                        ...player,
                        saved: true,
                    }
                }
                return player;
            });
            setPlayers(newPlayers);
            playersRef.current = newPlayers;
            messagePageRef.current = null;
            sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers});
        }
        else if (msg.name === 'identified') {
            const newPlayers = playersRef.current.map(player => {
                if (player.name === msg.target) {
                    return {
                        ...player,
                        identified: true,
                    }
                }
                return player;
            });
            messagePageRef.current = null;
            sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers});
        }
        else if (msg.name === 'killVote') {
            const newPlayers = playersRef.current.map(player => {
                if (player.name === msg.target) {
                    return {
                        ...player,
                        killVotes: [...player.killVotes, msg.player],
                    }
                }
                return player;
            });
            setPlayers(newPlayers);
            playersRef.current = newPlayers;
            messagePageRef.current = null;
            sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers});
        }
        else if (msg.name === 'changeKillVote') {
            const newPlayers = playersRef.current.map(player => {
                if (player.name === msg.oldTarget) {
                    return {
                        ...player,
                        killVotes: player.killVotes.filter(voter => voter !== msg.player),
                    }
                }
                else if (player.name === msg.target) {
                    return {
                        ...player,
                        killVotes: [...player.killVotes, msg.player],
                    }
                }
                return player;
            });
            setPlayers(newPlayers);
            playersRef.current = newPlayers;
            messagePageRef.current = null;
            sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers});
        }
        else if (msg.name === 'finishedNight') {
            const newPlayers = playersRef.current.map(player => {
                if (player.name === msg.player) {
                    return {
                        ...player,
                        finishedNight: true,
                    }
                }
                return player;
            });
            setPlayers(newPlayers);
            playersRef.current = newPlayers;
        }
        else if (msg.name === 'accuse') {
            const newPlayers = playersRef.current.map(player => {
                if (player.name === msg.target) {
                    return {
                        ...player,
                        accusations: [...player.accusations, msg.player],
                    }
                }
                else if (player.accusations.includes(msg.player)) {
                    return {
                        ...player,
                        accusations: player.accusations.filter(accusation => accusation !== msg.player),
                    }
                }
                return player;
            });
            setPlayers(newPlayers);
            playersRef.current = newPlayers;
            if (playersRef.current.find(player => player.accusations.length >= 2)) {
                const accusedPlayer = playersRef.current.find(player => player.accusations.length >= 2);
                setAccused(accusedPlayer.realName);
                setAccusedRole(accusedPlayer.role);
                const accuser1 = playersRef.current.find(player => player.name === accusedPlayer.accusations[0]);
                setAccuser1(accuser1.realName);
                const accuser2 = playersRef.current.find(player => player.name === accusedPlayer.accusations[1]);
                setAccuser2(accuser2.realName);
                dayAudio.current.pause();
                playNarrationAudio();
                setPage(ACCUSED);
                pageRef.current = ACCUSED;
                setDayPaused(true);
                resetPlayersForVoting(accusedPlayer.name).then((newPlayers) => {
                    messagePageRef.current = 'voting';
                    sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers, page: 'voting'});
                });
            }
            else {
                messagePageRef.current = null;
                sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers});
            }
        }
        else if (msg.name === 'vote') {
            const newPlayers = playersRef.current.map(player => {
                if (player.name === msg.player) {
                    return {
                        ...player,
                        vote: msg.vote,
                    }
                }
                return player;
            });
            setPlayers(newPlayers);
            playersRef.current = newPlayers;
        }
        else if (msg.name === 'voteSubmitted') {
            const newPlayers = playersRef.current.map(player => {
                if (player.name === msg.player) {
                    return {
                        ...player,
                        voteSubmitted: true,
                    }
                }
                return player;
            });
            setPlayers(newPlayers);
            playersRef.current = newPlayers;
        }
        else if (msg.name === 'playAgain') {
            playingAgain.current = true;
            const newPlayers = playersRef.current.map(player => {
                return {
                    ...player,
                    role: null,
                    finishedNight: false,
                    killVotes: [],
                    accusations: [],
                    inHeaven: false,
                    saved: false,
                    identified: false,
                    vote: null,
                    voteSubmitted: false,
                    accused: false,
                    locked: false,
                    winner: false,
                }
            });
            assignRoles(newPlayers).then((newPlayers) => {
                playersRef.current = newPlayers;
                setPlayers(newPlayers);
                messagePageRef.current = 'restart';
                sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers, page: 'restart'});
                onStartGame();
            });
            setFirstNight(true);
            setDied(false);
            setAccused(null);
            setAccusedRole(null);
            setAccuser1(null);
            setAccuser2(null);
            setFate(null);
            setWinner(null);
            winnerRef.current = null;
            setStartNighttime(false);
            setNighttimeOver(false);
            setVotingOver(false);
            setDayTimer(300);
            setDayOver(false);
            setDayPaused(false);
            setPlayersDidntFinishNight([]);
            setSavedPlayer(null);
            setKilledPlayer(null);
        }
        else if (msg.name === 'exit-press') {
            introAudio.current.loop = false;
            introAudio.current.pause();
            sendMessageToParent({to: 'all', name: 'exit'});
            // reset all props
            setPlayers([]);
            playersRef.current = [];
            setPage(WAITING_PLAYERS);
            pageRef.current = WAITING_PLAYERS;
            setDied(false);
            setAccused(null);
            setAccusedRole(null);
            setAccuser1(null);
            setAccuser2(null);
            setFate(null);
            setWinner(null);
            winnerRef.current = null;
            setStartNighttime(false);
            setNighttimeOver(false);
            setVotingOver(false);
            setDayTimer(300);
            setDayOver(false);
            setDayPaused(false);
            setPlayersDidntFinishNight([]);
            setSavedPlayer(null);
            setKilledPlayer(null);
        }
        else if (msg.name === 'needsCurrentState' || msg.name === 'playerNeedsCurrentState') {
            if (pageRef.current === WAITING_PLAYERS) {
                if (playersRef.current.length >= MIN_PLAYERS) {
                    sendMessageToParent({to: 'one', name: 'enoughPlayers', player: msg.player});
                }
            }
            sendMessageToParent({to: 'one', name: 'stateUpdate', page: messagePageRef.current, players: playersRef.current, player: msg.player});
        }
    }

    const onStartGame = () => {
        introAudio.current.loop = false;
        introAudio.current.currentTime = 1;
        introAudio.current.play();
        setPage(WELCOME);
        pageRef.current = WELCOME;
        setTimeout(() => {
            setPage(YOU_READY);
            pageRef.current = YOU_READY;
            setTimeout(() => {
                setPage(REVEAL_IDENTITY);
                pageRef.current = REVEAL_IDENTITY;
                messagePageRef.current = 'identityReveal';
                sendMessageToParent({to: 'all', name: 'stateUpdate', page: 'identityReveal'});
                setTimeout(() => {
                    introAudio.current.loop = false;
                    introAudio.current.currentTime = 1;
                    introAudio.current.play();
                    if (playingAgain.current) {
                        setStartNighttime(true);
                    }
                    else {
                        setPage(INSTRUCTIONS);
                        pageRef.current = INSTRUCTIONS;
                        messagePageRef.current = 'instructions';
                        sendMessageToParent({to: 'all', name: 'stateUpdate', page: 'instructions'});
                    }
                }, 19000);
            }, 10000);
        }, 10000);
    }

    const goToVoting = () => {
        setPage(VOTING);
        pageRef.current = VOTING;
        setVotingOver(false);
    }

    const goToVotingTimer = () => {
        endNarrationAudio();
        messagePageRef.current = 'votingActive';
        sendMessageToParent({to: 'all', name: 'stateUpdate', page: 'votingActive'});
        introAudio.current.loop = true;
        introAudio.current.currentTime = 0;
        introAudio.current.play();
        setPage(VOTING_TIMER);
        pageRef.current = VOTING_TIMER;
    }

    async function resetPlayersForNight() {
        setSavedPlayer(null);
        const newPlayers = playersRef.current.map(player => {
            return {
                ...player,
                finishedNight: false,
                killVotes: [],
                identified: false,
                saved: false,
            }
        });
        setPlayers(newPlayers);
        playersRef.current = newPlayers;
        return newPlayers;
    }

    async function resetPlayersForDay(accused) {
        const newPlayers = playersRef.current.map(player => {
            return {
                ...player,
                locked: accused === player.realName,
                accusations: [],
            }
        });
        setPlayers(newPlayers);
        playersRef.current = newPlayers;
        return newPlayers;
    }

    async function resetPlayersForVoting(accused) {
        const newPlayers = playersRef.current.map(player => {
            return {
                ...player,
                vote: null,
                voteSubmitted: false,
                accused: accused === player.name,
            }
        });
        setPlayers(newPlayers);
        playersRef.current = newPlayers;
        return newPlayers;
    }

    function getKilledPlayer(players) {
        const maxVotes = Math.max(...players.map(player => player.killVotes.length));
        const playersWithMaxVotes = players.filter(player => player.killVotes.length === maxVotes);
        const randomIndex = Math.floor(Math.random() * playersWithMaxVotes.length);
        return playersWithMaxVotes[randomIndex].realName;
    }

    function checkEndOfGame(players) {
        const mafiaLeft = players.filter(player => player.role === 'mafia' && !player.inHeaven).length;
        const livingPlayers = players.filter(player => !player.inHeaven);
        if (mafiaLeft === 0) {
            setWinner('civilian');
            winnerRef.current = 'civilian';
            const winningRoles = ['civilian', 'angel', 'detective'];
            const newPlayers = playersRef.current.map(player => {
                if (winningRoles.includes(player.role)) {
                    return {
                        ...player,
                        winner: true,
                    }
                }
                return {
                    ...player,
                    winner: false,
                }
            });
            introAudio.current.loop = true;
            introAudio.current.currentTime = 0;
            introAudio.current.play();
            messagePageRef.current = 'win';
            sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers, page: 'win'});
            setPage(GAME_OVER);
            pageRef.current = GAME_OVER;
            return true;
        }
        else if (mafiaLeft === livingPlayers.length || livingPlayers.length === 2) {
            setWinner('mafia');
            winnerRef.current = 'mafia';
            const newPlayers = playersRef.current.map(player => {
                if (player.role === 'mafia') {
                    return {
                        ...player,
                        winner: true,
                    }
                }
                return {
                    ...player,
                    winner: false,
                }
            });
            introAudio.current.loop = true;
            introAudio.current.currentTime = 0;
            introAudio.current.play();
            messagePageRef.current = 'win';
            sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers, page: 'win'});
            setPage(GAME_OVER);
            pageRef.current = GAME_OVER;
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (startNighttime) {
            setStartNighttime(false);
            setPage(NIGHTTIME);
            pageRef.current = NIGHTTIME;
        }
    }, [startNighttime]);

    useEffect(() => {
        if (nighttimeOver) {
            setNighttimeOver(false);
            nightAudio.current.pause();

            // const playersDidntFinishNight = playersRef.current.filter(player => !player.finishedNight);
            // setPlayersDidntFinishNight(playersDidntFinishNight);

            const killedPlayer = getKilledPlayer(playersRef.current);
            setKilledPlayer(killedPlayer);
            const died = killedPlayer !== savedPlayer;
            setDied(died);

            setPage(NIGHT_OVER);
            pageRef.current = NIGHT_OVER;
            messagePageRef.current = 'nightFinished';
            sendMessageToParent({to: 'all', name: 'stateUpdate', page: 'nightFinished', players: playersRef.current});
        }
    }, [nighttimeOver]);

    const moveToStory = () => {
        setPage(STORY);
        pageRef.current = STORY;
    }

    useEffect(() => {
        if (storyOver) {
            setStoryOver(false);
            setPage(POST_STORY_2);
            pageRef.current = POST_STORY_2;
        }
    }, [storyOver]);

    const moveToAccusations = () => {
        setDayPaused(false);
        setDayOver(false);
        resetPlayersForDay().then((newPlayers) => {
            messagePageRef.current = 'day';
            sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers, page: 'day'});
        });
        dayAudio.current.loop = true;
        dayAudio.current.currentTime = 0;
        dayAudio.current.play();
        setPage(ACCUSATIONS);
        pageRef.current = ACCUSATIONS;
    }

    useEffect(() => {
        if (votingOver) {
            let decision = null;
            const voteLive = players.filter(player => player.vote === 'live').length;
            const voteDie = players.filter(player => player.vote === 'die').length;
            if (voteDie > voteLive) {
                decision = 'die';
            } else {
                decision = 'live';
            }
            setFate(decision);
            setTimeout(() => {
                introAudio.current.pause();
                introAudio.current.loop = false;
                setPage(VOTING_RESULTS);
                pageRef.current = VOTING_RESULTS;
            }, 500);
        }
    }, [votingOver]);

    const evaluateVotingResults = (decision) => {
        if (decision === 'die') {
            const newPlayers = playersRef.current.map(player => {
                if (player.realName === accused) {
                    return {
                        ...player,
                        inHeaven: true,
                    }
                }
                return player;
            });
            setPlayers(newPlayers);
            playersRef.current = newPlayers;

            if (checkEndOfGame(newPlayers)) {
                endDeath2Audio();
                return;
            }

            messagePageRef.current = null;
            sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers});
            setDayOver(true);
        } else {
            setDayPaused(false);
            dayAudio.current.loop = true;
            dayAudio.current.currentTime = 0;
            dayAudio.current.play();
            setPage(ACCUSATIONS);
            pageRef.current = ACCUSATIONS;
            resetPlayersForDay(accused).then((newPlayers) => {
                messagePageRef.current = 'day';
                sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers, page: 'day'});
            });
        }
    }

    useEffect(() => {
        if (dayOver) {
            setDayOver(false);
            setDayTimer(300);
            setPage(NIGHTTIME);
            pageRef.current = NIGHTTIME;
        }
    }, [dayOver]);

    const moveToNighttimeTimer = () => {
        setFirstNight(false);
        introAudio.current.pause();
        nightAudio.current.loop = true;
        nightAudio.current.currentTime = 0;
        nightAudio.current.play();
        setPage(NIGHTTIME_TIMER);
        pageRef.current = NIGHTTIME_TIMER;
        resetPlayersForNight().then((newPlayers) => {
            messagePageRef.current = 'night';
            sendMessageToParent({to: 'all', name: 'stateUpdate', players: newPlayers, page: 'night'});
        });
    }

    useEffect(() => {
        if (page === NIGHTTIME_TIMER) {
            const playersDidntFinishNight = playersRef.current.filter(player => !player.finishedNight && !player.inHeaven);
            if (playersDidntFinishNight.length === 0) {
                setNighttimeOver(true);
            }
        }
        if (page === VOTING_TIMER) {
            const playersDidntVote = playersRef.current.filter(player => !player.voteSubmitted && !player.inHeaven && player.realName !== accused);
            if (playersDidntVote.length === 0) {
                setVotingOver(true);
            }
        }
    }, [players]);

    useEffect(() => {
        window.addEventListener('message', handleMessageFromParent);

        sendMessageToParent({name: 'showCode'});

        return () => {
            window.removeEventListener('message', handleMessageFromParent);
        }
    }, []);

    function getPage(page) {
        switch (page) {
            case WELCOME:
            case YOU_READY:
                return <Welcome youReady={page === YOU_READY}/>;
            case REVEAL_IDENTITY:
                return <RevealIdentity/>;
            case INSTRUCTIONS:
                return <Instructions setStartNighttime={setStartNighttime}/>;
            case NIGHTTIME:
                return <Nighttime moveToNighttimeTimer={moveToNighttimeTimer} firstNight={firstNight}/>;
            case NIGHTTIME_TIMER:
                return <NighttimeTimer nighttimeOver={nighttimeOver} setNighttimeOver={setNighttimeOver}/>;
            case NIGHT_OVER:
                return <NightOver moveToStory={moveToStory}/>;
            case STORY:
                return <Story died={died} targetedName={killedPLayer} setStoryOver={setStoryOver} checkEndOfGame={checkEndOfGame}
                              playersRef={playersRef} setPlayers={setPlayers} playDeathAudio={playDeathAudio} endDeathAudio={endDeathAudio}
                              sendMessageToParent={sendMessageToParent}/>;
            case POST_STORY_2:
                return <PostStory2 moveToAccusations={moveToAccusations}/>;
            case ACCUSATIONS:
                return <Accusations dayTimer={dayTimer} setDayTimer={setDayTimer} dayOver={dayOver} setDayOver={setDayOver} dayPaused={dayPaused}/>;
            case ACCUSED:
                return <Accused accused={accused} accuser1={accuser1} accuser2={accuser2} goToVoting={goToVoting}/>;
            case VOTING:
                return <Voting accused={accused} goToVotingTimer={goToVotingTimer}/>;
            case VOTING_TIMER:
                return <VotingTimer accused={accused} players={players} votingOver={votingOver} setVotingOver={setVotingOver}/>;
            case VOTING_RESULTS:
                return <VotingResults accused={accused} fate={fate} accusedRole={accusedRole} playDeath2Audio={playDeath2Audio}
                                      evaluateVotingResults={evaluateVotingResults} playersRef={playersRef}
                                      sendMessageToParent={sendMessageToParent}/>;
            case GAME_OVER:
                return <GameOver winner={winner}/>;
            default:
                return null;
        }
    }

    if (page === WAITING_PLAYERS) {
        return (
            <StandardPageBox>
                <WaitingPlayers players={players}/>
            </StandardPageBox>
        )
    }

    return (
        <StandardPageBox>
            <InnerPageBox>
                {getPage(page)}
            </InnerPageBox>
        </StandardPageBox>
    )
}

export default App;