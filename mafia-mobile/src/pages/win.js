import React, {useContext} from "react";
import { Text } from "../components/text";
import { Box } from "@mui/material";
import { NameButton, TheButton } from "../components/button";
import { VariableContext } from "../contexts/variables";

export default function Win() {
  const { self, players } = useContext(VariableContext);

  const getWinner = () => {
    const alivePlayers = players.filter((player) => player.isAlive);
    const mafia = alivePlayers.filter((player) => player.role === "mafia");
    if (mafia.length === 0) {
      if (self.role === "mafia") {
        return false;
      }
      return true;
    }
    else {
      if (self.role === "mafia") {
        return true;
      }
      return false;
    }
  };

  const handlePlayAgain = () => {
    sendMessageToParent({ name: "playAgain" });
  };

  const handleExit = () => {
    sendMessageToParent({ name: "exit-press" });
  };

  const winner = getWinner();

  return (
    <>
      <Text size={18} opacity={0.5}>
        game over
      </Text>
      <Text opacity={0.75}>{winner ? "your team wins!" : "you failed"}</Text>
      {self.isHost ? (
        <>
          <Box style={{ height: 1 }} />
          <TheButton>
            <Text size={18} weight={700}>
              same players
            </Text>
          </TheButton>
          <NameButton>
            <Text size={18} weight={700}>
              new players
            </Text>
          </NameButton>
        </>
      ) : null}
    </>
  );
}
