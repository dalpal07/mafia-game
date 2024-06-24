import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import { Text } from "../components/text";
import { VariableContext } from "../contexts/variables";
import { ActionContext } from "../contexts/actions";

export default function VotingResults() {
  const { recentlyAccused } = useContext(VariableContext);
  const { handleProgressToAccusationTimerPage, handleProgressToNighttimePage } =
    useContext(ActionContext);

  const [showRole, setShowRole] = useState(false);
  const notExecutedAudio = new Audio("./assets/not-executed.mp3");
  const executedAudio = new Audio("./assets/executed.mp3");
  const narrationAudio = new Audio("./assets/narration.mp3");
  narrationAudio.volume = 0.5;
  const fate = recentlyAccused?.isAlive ? "live" : "die";
  const death2Audio = new Audio("./assets/Deathloop2.wav");

  useEffect(() => {
    narrationAudio.play();
    if (!fate) return;
    if (fate === "live") {
      setTimeout(() => notExecutedAudio.play(), 1000);
      notExecutedAudio.onended = () => {
        narrationAudio.pause();
        setTimeout(() => handleProgressToAccusationTimerPage(), 1000);
      };
    } else {
      setTimeout(() => {
        executedAudio.play();
      }, 1000);
      executedAudio.onended = () => {
        narrationAudio.pause();
        death2Audio.play();
        setShowRole(true);
        setTimeout(() => {
          handleProgressToNighttimePage(() => death2Audio.pause());
        }, 6000);
      };
    }

    return () => {
      notExecutedAudio.pause();
      executedAudio.pause();
      narrationAudio.pause();
    };
  }, [fate]);

  return (
    <>
      {showRole && fate === "die" ? <Box style={{ height: 36 }} /> : null}
      <Text size={56}>{recentlyAccused?.realname}</Text>
      <Text
        size={56}
        color={fate === "live" ? "var(--Main-White)" : "var(--Main-Red)"}
        weight={700}
      >
        {fate === "live" ? "has survived" : "has been executed"}
      </Text>
      {showRole && fate === "die" ? (
        <Text
          size={36}
          opacity={recentlyAccused?.role === "mafia" ? 1 : 0.75}
          color={
            recentlyAccused?.role === "mafia"
              ? "var(--Main-Red)"
              : "var(--Main-White)"
          }
        >
          {recentlyAccused?.realname} was
          {recentlyAccused?.role === "mafia" ? " " : " not "}mafia
        </Text>
      ) : null}
    </>
  );
}
