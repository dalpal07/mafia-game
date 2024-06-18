import React, { useContext } from "react";
import { InnerPageBox, StandardPageBox } from "./components/boxes";
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
import { VariableContext } from "./contexts/variables";

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

function App() {
  const { page } = useContext(VariableContext);

  function getPage(page) {
    switch (page) {
      case WELCOME:
      case YOU_READY:
        return <Welcome youReady={page === YOU_READY} />;
      case REVEAL_IDENTITY:
        return <RevealIdentity />;
      case INSTRUCTIONS:
        return <Instructions />;
      case NIGHTTIME:
        return <Nighttime />;
      case NIGHTTIME_TIMER:
        return <NighttimeTimer />;
      case NIGHT_OVER:
        return <NightOver />;
      case STORY:
        return <Story />;
      case POST_STORY_2:
        return <PostStory2 />;
      case ACCUSATIONS:
        return <Accusations />;
      case ACCUSED:
        return <Accused />;
      case VOTING:
        return <Voting />;
      case VOTING_TIMER:
        return <VotingTimer />;
      case VOTING_RESULTS:
        return <VotingResults />;
      case GAME_OVER:
        return <GameOver />;
      default:
        return null;
    }
  }

  if (page === WAITING_PLAYERS) {
    return (
      <StandardPageBox>
        <WaitingPlayers />
      </StandardPageBox>
    );
  }

  return (
    <StandardPageBox>
      <InnerPageBox>{getPage(page)}</InnerPageBox>
    </StandardPageBox>
  );
}

export default App;
