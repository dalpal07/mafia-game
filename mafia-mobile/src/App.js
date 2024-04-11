import React, {useEffect, useRef, useState} from 'react';
import {Box} from "@mui/material";
import WaitingPlayers from "./pages/waiting-players";
import Preparation from "./pages/preparation";
import IdentityReveal from "./pages/identity-reveal";
import Instructions from "./pages/instructions";
import NightAngel from "./pages/night/angel";
import NightDetective from "./pages/night/detective";
import NightCivilian from "./pages/night/civilian";
import NightMafia from "./pages/night/mafia";
import NightFinished from "./pages/night/finished";
import Day from "./pages/day";
import Voting from "./pages/voting";
import Win from "./pages/win";
import HeavenWelcome from "./pages/heaven/welcome";
import HeavenNight from "./pages/heaven/night";
import HeavenDay from "./pages/heaven/day";
import Header from "./components/header";
import {StandardPageBox} from "./components/boxes";
import EnterName from "./pages/enter-name";

const MIN_PLAYERS = 5;

const ENTER_NAME = 0;
const WAITING_PLAYERS = 1;
const PREPARATION = 2;
const IDENTITY_REVEAL = 3;
const INSTRUCTIONS = 4;
const NIGHT = 5;
const NIGHT_FINISHED = 6;
const DAY = 7;
const VOTING = 8;
const WIN = 9;
const HEAVEN_WELCOME = 10;
const HEAVEN_DAY = 11;
const HEAVEN_NIGHT = 12;

const TRANSITION_TO_DAY_STALL = 1225;
const TRANSITION_TO_NIGHT_STALL = 1450;

function App() {
    const [page, setPage] = useState(ENTER_NAME);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    const [everyoneReady, setEveryoneReady] = useState(false);
    const [realName, setRealName] = useState(null);
    const realNameRef = useRef(realName);
    const [name, setName] = useState(null);
    const nameRef = useRef(name);
    const [isHost, setIsHost] = useState(false);
    const [enoughPlayers, setEnoughPlayers] = useState(false);
    const [role, setRole] = useState(null); // mafia, detective, angel, civilian
    const roleRef = useRef(role);
    const [players, setPlayers] = useState([]);
    const [knownRoles, setKnownRoles] = useState([]);
    const [beingAccused, setBeingAccused] = useState(false);
    const [playerBeingVotedOn, setPlayerBeingVotedOn] = useState(null);
    const [winner, setWinner] = useState(false);
    const [actionsFollowing, setActionsFollowing] = useState(null); // mafia, detective, angel
    const [mafiaDoneVoting, setMafiaDoneVoting] = useState(true);
    const [nightRecap, setNightRecap] = useState(false);
    const [accusing, setAccusing] = useState(true);
    const [inHeaven, setInHeaven] = useState(false);
    const inHeavenRef = useRef(inHeaven);
    const [votingActive, setVotingActive] = useState(false);
    const [headerPage, setHeaderPage] = useState(null);

    const femaleScreamAudio = new Audio('./assets/female-scream.wav');
    const maleScreamAudio = new Audio('./assets/male-scream.wav');

    function sendMessageToParent(message) {
        if(window.ReactNativeWebView){
            window.ReactNativeWebView.postMessage(message);
        }

        if(window.parent){
            window.parent.postMessage(message, "*");
        }
    }

    function handleMessageFromParent(event) {
        const msg = event.data;
        if (msg.name === 'name') {
            setName(msg.player);
            nameRef.current = msg.player;
        }
        else if (msg.name === 'host') {
            setIsHost(true);
        }
        else if (msg.name === 'enoughPlayers') {
            setEnoughPlayers(true);
        }
        else if (msg.name === 'realName') {
            realNameRef.current = msg.realName;
            setRealName(msg.realName);
        }
        else if (msg.name === 'notEveryoneReady') {
            setEveryoneReady(false);
        }
        else if (msg.name === 'everyoneReady') {
            setEveryoneReady(true);
        }
        else if (msg.name === 'female-scream') {
            femaleScreamAudio.play();
        }
        else if (msg.name === 'male-scream') {
            maleScreamAudio.play();
        }
        else if (msg.name === 'stateUpdate') {
            if (msg.players) {
                setPlayers(msg.players);
                msg.players.forEach(player => {
                    if (player.accused) {
                        setPlayerBeingVotedOn(player);
                    }
                    if (player.name === nameRef.current) {
                        if (!roleRef.current || msg.page === 'restart') {
                            setRole(player.role);
                            roleRef.current = player.role;
                        }
                        if (!realNameRef.current && player.realName) {
                            setRealName(player.realName);
                            realNameRef.current = player.realName;
                            if (!msg.page) {
                                setPage(WAITING_PLAYERS);
                            }
                        }
                        if (player.inHeaven && !inHeavenRef.current) {
                            setInHeaven(player.inHeaven);
                            inHeavenRef.current = true;
                            setPage(HEAVEN_WELCOME);
                            setHeaderPage(HEAVEN_WELCOME);
                        }
                        else if (!player.inHeaven && inHeavenRef.current) {
                            setInHeaven(player.inHeaven);
                            inHeavenRef.current = false;
                        }
                        if (player.accusations?.length > 0) {
                            setBeingAccused(true);
                            sendMessageToParent({name: 'vibration'});
                        }
                        else {
                            setBeingAccused(false);
                        }
                        setWinner(player.winner);
                    }
                });
            }
            if (msg.page) {
                switch (msg.page) {
                    case 'preparation':
                        setPage(PREPARATION);
                        setHeaderPage(PREPARATION);
                        break;
                    case 'identityReveal':
                        setPage(IDENTITY_REVEAL);
                        setHeaderPage(IDENTITY_REVEAL);
                        break;
                    case 'instructions':
                        setPage(INSTRUCTIONS);
                        setHeaderPage(INSTRUCTIONS);
                        break;
                    case 'night':
                        if (inHeavenRef.current) {
                            setActionsFollowing(null);
                            setHeaderPage(HEAVEN_NIGHT);
                            setTimeout(() => {
                                setPage(HEAVEN_NIGHT);
                            }, TRANSITION_TO_NIGHT_STALL);
                        }
                        else {
                            setHeaderPage(NIGHT);
                            setTimeout(() => {
                                setPage(NIGHT);
                            }, TRANSITION_TO_NIGHT_STALL);
                        }
                        break;
                    case 'nightFinished':
                        if (inHeavenRef.current) {
                            setActionsFollowing(null);
                            setHeaderPage(HEAVEN_DAY);
                            setNightRecap(true);
                            setTimeout(() => {
                                setPage(HEAVEN_DAY);
                            }, TRANSITION_TO_DAY_STALL);
                        }
                        else {
                            setHeaderPage(NIGHT_FINISHED);
                            setTimeout(() => {
                                setPage(NIGHT_FINISHED);
                            }, TRANSITION_TO_DAY_STALL);
                        }
                        break;
                    case 'day':
                        if (inHeavenRef.current) {
                            setHeaderPage(HEAVEN_DAY);
                            setPage(HEAVEN_DAY);
                            setAccusing(true);
                            setNightRecap(false);
                        }
                        else {
                            setHeaderPage(DAY);
                            setPage(DAY);
                        }
                        break;
                    case 'voting':
                        setVotingActive(false);
                        if (inHeavenRef.current) {
                            setHeaderPage(HEAVEN_DAY);
                            setPage(HEAVEN_DAY);
                            setAccusing(false);
                            setNightRecap(false);
                        }
                        else {
                            setHeaderPage(VOTING);
                            setPage(VOTING);
                        }
                        break;
                    case 'votingActive':
                        setVotingActive(true);
                        if (inHeavenRef.current) {
                            setHeaderPage(HEAVEN_DAY);
                            setPage(HEAVEN_DAY);
                            setAccusing(false);
                            setNightRecap(false);
                        }
                        else {
                            setHeaderPage(VOTING);
                            setPage(VOTING);
                        }
                        break;
                    case 'win':
                        setHeaderPage(WIN);
                        setPage(WIN);
                        break;
                    case 'restart':
                        setHeaderPage(PREPARATION);
                        setPage(PREPARATION);
                        setKnownRoles([]);
                        setBeingAccused(false);
                        setPlayerBeingVotedOn(null);
                        setWinner(false);
                        setActionsFollowing(null);
                        setMafiaDoneVoting(true);
                        setNightRecap(false);
                        setAccusing(true);
                        setInHeaven(false);
                        inHeavenRef.current = false;
                        break;
                }
            }
        }
    }

    useEffect(() => {
        const updateHeight = () => {
            setScreenHeight(window.innerHeight);
        }
        window.addEventListener('resize', updateHeight);
        window.addEventListener('message', handleMessageFromParent);

        sendMessageToParent({name: 'ready'});

        return () => {
            window.removeEventListener('resize', updateHeight);
            window.removeEventListener('message', handleMessageFromParent);
        }
    }, []);

    function getPage(page) {
        switch (page) {
            case ENTER_NAME:
                return <EnterName setPage={setPage} name={name}
                                  sendMessageToParent={sendMessageToParent}/>
            case WAITING_PLAYERS:
                return <WaitingPlayers isHost={isHost} enoughPlayers={enoughPlayers} screenHeight={screenHeight}
                                       minPlayers={MIN_PLAYERS} everyoneReady={everyoneReady}
                                       sendMessageToParent={sendMessageToParent}/>;
            case PREPARATION:
                return <Preparation/>;
            case IDENTITY_REVEAL:
                return <IdentityReveal screenHeight={screenHeight} role={role}/>;
            case INSTRUCTIONS:
                return <Instructions name={name} role={role} isHost={isHost}
                                     sendMessageToParent={sendMessageToParent}/>;
            case NIGHT:
                switch (role) {
                    case 'mafia':
                        return (
                            <NightMafia name={name} players={players}
                                        sendMessageToParent={sendMessageToParent}/>
                        )
                    case 'detective':
                        return (
                            <NightDetective name={name} players={players} knownRoles={knownRoles} setKnownRoles={setKnownRoles}
                                            sendMessageToParent={sendMessageToParent}/>
                        )
                    case 'angel':
                        return (
                            <NightAngel name={name} players={players}
                                        sendMessageToParent={sendMessageToParent}/>
                        )
                    case 'civilian':
                        return (
                            <NightCivilian name={name}
                                           sendMessageToParent={sendMessageToParent}/>
                        )
                    default:
                        return null;
                }
            case NIGHT_FINISHED:
                return <NightFinished name={name} role={role}/>;
            case DAY:
                return <Day name={name} role={role} beingAccused={beingAccused} players={players} knownRoles={knownRoles}
                            sendMessageToParent={sendMessageToParent}/>;
            case VOTING:
                return <Voting name={name} role={role} playerBeingVotedOn={playerBeingVotedOn} votingActive={votingActive}
                               sendMessageToParent={sendMessageToParent}/>;
            case WIN:
                return <Win name={name} role={role} winner={winner} isHost={isHost}
                            sendMessageToParent={sendMessageToParent}/>;
            case HEAVEN_WELCOME:
                return <HeavenWelcome name={name} role={role}
                                      sendMessageToParent={sendMessageToParent}/>;
            case HEAVEN_DAY:
                return <HeavenDay name={name} role={role} players={players} nightRecap={nightRecap} accusing={accusing}
                                  sendMessageToParent={sendMessageToParent}/>;
            case HEAVEN_NIGHT:
                return <HeavenNight name={name} role={role} actionsFollowing={actionsFollowing} setActionsFollowing={setActionsFollowing}
                                    players={players} mafiaDoneVoting={mafiaDoneVoting}
                                    sendMessageToParent={sendMessageToParent}/>;
            default:
                return null;
        }
    }

    if (page <= IDENTITY_REVEAL) {
        return (
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100vh',
                width: '100vw',
            }}>
                <StandardPageBox>
                    {getPage(page)}
                </StandardPageBox>
            </Box>
        )
    }
    else if (page === INSTRUCTIONS || page === WIN) {
        return (
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
            }}>
                <StandardPageBox>
                    <Header name={realName} role={role}/>
                    {getPage(page)}
                </StandardPageBox>
            </Box>
        )
    }
    else {
        const time =
            headerPage === NIGHT || headerPage === HEAVEN_NIGHT ?
                'night'
                :
                'day';
        const headerColor =
            headerPage >= HEAVEN_WELCOME ?
                'var(--Main-Black)' :
                'var(--Main-White)';
        const bgColor =
            page === NIGHT ?
                'var(--Main-Black)' :
                page <= VOTING ?
                    'var(--Main-Gray)' :
                    '#E0E0E0';
        const image =
            page === NIGHT ?
                'url(./assets/night-stars.png)' :
                page <= VOTING ?
                    'url(./assets/day-clouds.png)' :
                    page <= HEAVEN_DAY ?
                        'url(./assets/heaven-clouds.png)' :
                        'url(./assets/heaven-stars.png)';

        return (
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
            }}>
                <Box
                    style={{
                        width: '100vw',
                        height: '100vh',
                        backgroundRepeat: 'repeat',
                        backgroundImage: image,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: bgColor,
                    }}
                >
                    <StandardPageBox>
                        <Header name={realName} role={role} time={time} color={headerColor}/>
                        {getPage(page)}
                        <Box style={{height: 18}}/>
                    </StandardPageBox>
                </Box>
            </Box>
        )
    }
}

export default App;