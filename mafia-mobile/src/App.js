import React, { useEffect, useRef, useState, useContext } from "react";
import { Box } from "@mui/material";
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
import { StandardPageBox } from "./components/boxes";
import EnterName from "./pages/enter-name";
import { VariableContext } from "./contexts/variables";
import {
  WAITING_PLAYERS,
  WELCOME,
  YOU_READY,
  REVEAL_IDENTITY,
  GAME_OVER,
  INSTRUCTIONS,
  NIGHTTIME,
  VOTING,
  ACCUSATIONS,
  NIGHTTIME_TIMER,
  NIGHT_OVER,
  STORY,
  POST_STORY_2,
  ACCUSED,
  VOTING_TIMER,
} from "./pages";
import Night from "./pages/night";

const MIN_PLAYERS = 5;

function App() {
  const { page, self } = useContext(VariableContext);
  const [screenHeight, setScreenHeight] = useState(0);
  const [headerTime, setHeaderTime] = useState("night");
  const [headerColor, setHeaderColor] = useState("var(--Main-White)");
  const [bgColor, setBgColor] = useState("var(--Main-Black)");
  const [image, setImage] = useState("url(./assets/night-stars.png)");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenHeight(window.innerHeight);
    }
  }, []);

  useEffect(() => {
    if (!self.isAlive) return;
    if (page === NIGHT_OVER) {
      setHeaderTime("day");
      setTimeout(() => {
        setBgColor("var(--Main-Gray)");
        setImage("url(./assets/day-clouds.png)");
      }, 1250);
    }
  }, [page]);

  useEffect(() => {
    if (self.isAlive) return;
    setBgColor("var(--Heaven-White)");
    setImage("url(./assets/heaven-clouds.png)");
    setHeaderColor("var(--Main-Black)");
  }, [self.isAlive]);

  function getPage(page) {
    if (!self.isAlive) {
      return null;
    }
    switch (page) {
      case WAITING_PLAYERS:
        if (!self.realname || self.realname.length === 0) {
          return <EnterName />;
        } else {
          return (
            <WaitingPlayers
              screenHeight={screenHeight}
              minPlayers={MIN_PLAYERS}
            />
          );
        }
      case WELCOME:
      case YOU_READY:
        return <Preparation />;
      case REVEAL_IDENTITY:
        return <IdentityReveal screenHeight={screenHeight} />;
      case INSTRUCTIONS:
        return <Instructions />;
      case NIGHTTIME:
        return <Night />;
      case NIGHTTIME_TIMER:
        return <Night timerStarted={true} />;
      case NIGHT_OVER:
      case STORY:
      case POST_STORY_2:
        return <NightFinished />;
      case ACCUSATIONS:
        return <Day />;
      case ACCUSED:
      case VOTING:
        return null;
      case VOTING_TIMER:
        return <Voting />;
      // case NIGHT:
      //   switch (role) {
      //     case "mafia":
      //       return (
      //         <NightMafia/>
      //       );
      //     case "detective":
      //       return (
      //         <NightDetective/>
      //       );
      //     case "angel":
      //       return (
      //         <NightAngel/>
      //       );
      //     case "civilian":
      //       return (
      //         <NightCivilian/>
      //       );
      //     default:
      //       return null;
      //   }
      // case NIGHT_FINISHED:
      //   return <NightFinished/>;
      // case DAY:
      //   return (
      //     <Day/>
      //   );
      // case VOTING:
      //   return (
      //     <Voting/>
      //   );
      // case WIN:
      //   return (
      //     <Win/>
      //   );
      // case HEAVEN_WELCOME:
      //   return (
      //     <HeavenWelcome/>
      //   );
      // case HEAVEN_DAY:
      //   return (
      //     <HeavenDay/>
      //   );
      // case HEAVEN_NIGHT:
      //   return (
      //     <HeavenNight/>
      //   );
      default:
        return null;
    }
  }

  if (!self || !self.gamername) {
    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
          width: "100vw",
        }}
      />
    );
  } else if (page <= REVEAL_IDENTITY) {
    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
          width: "100vw",
        }}
      >
        <StandardPageBox>{getPage(page)}</StandardPageBox>
      </Box>
    );
  } else if (page === INSTRUCTIONS || page === GAME_OVER) {
    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <StandardPageBox>
          <Header />
          {getPage(page)}
        </StandardPageBox>
      </Box>
    );
  } else {
    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          style={{
            width: "100vw",
            height: "100vh",
            backgroundRepeat: "repeat",
            backgroundImage: image,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bgColor,
          }}
        >
          <StandardPageBox>
            <Header time={headerTime} color={headerColor} />
            {getPage(page)}
            <Box style={{ height: 18 }} />
          </StandardPageBox>
        </Box>
      </Box>
    );
  }
}

export default App;
