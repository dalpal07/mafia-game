import React, { useEffect, useContext } from "react";
import { Text } from "../components/text";
import { VariableContext } from "../contexts/variables";

export default function GameOver() {
  const { players } = useContext(VariableContext);

  const introAudio = new Audio("./assets/Introloop.wav");

  const getWinner = () => {
    const alivePlayers = players.filter((player) => player.isAlive);
    const aliveMafia = alivePlayers.filter((player) => player.role === "mafia");
    if (aliveMafia.length === 0) return "civilians";
    return "mafia";
  };

  const mafiaWinAudio = new Audio("./assets/mafia-win.mp3");
  const civiliansWinAudio = new Audio("./assets/civilians-win.mp3");
  const winner = getWinner();

  useEffect(() => {
    if (winner === "mafia") {
      const timeout = setTimeout(() => mafiaWinAudio.play(), 1000);

      return () => {
        clearTimeout(timeout);
        mafiaWinAudio.pause();
      };
    } else {
      const timeout = setTimeout(() => civiliansWinAudio.play(), 1000);

      return () => {
        clearTimeout(timeout);
        civiliansWinAudio.pause();
      };
    }
  }, [winner]);

  useEffect(() => {
    introAudio.loop = true;
    introAudio.play();

    return () => {
      introAudio.pause();
    };
  }, []);

  return (
    <>
      <Text size={36} opacity={0.5}>
        the game has ended
      </Text>
      <Text
        size={56}
        weight={700}
        color={winner === "mafia" ? "var(--Main-Red)" : "var(--Main-White)"}
      >
        {winner === "mafia" ? "mafia" : "civilians"} win
      </Text>
    </>
  );
}
