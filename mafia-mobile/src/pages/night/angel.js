import React from "react";
import { ScrollableFlexColumnBox } from "../../components/boxes";
import { Text } from "../../components/text";
import { NameButton, TheButton } from "../../components/button";
import { useState } from "react";
import { Box } from "@mui/material";
import NightTrivia from "./trivia";

export default function NightAngel({ name = "angel", players = [], sendMessageToParent = () => { } }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const [answeringTrivia, setAnsweringTrivia] = useState(false);

  const playersToList = players.filter((player) => !player.inHeaven);

  const handleConfirmation = () => {
    setConfirmed(true);
    sendMessageToParent({ name: "protect", target: selectedPlayer });
    sendMessageToParent({ name: "finishedNight", player: name });
  };

  if (answeringTrivia) {
    return <NightTrivia />;
  }

  if (confirmed) {
    return (
      <>
        <Text>{selectedPlayer}</Text>
        <Text size={18} opacity={0.75}>
          will be protected
        </Text>
        <Box style={{ flex: 1 }} />
        <Text size={18} opacity={0.75}>
          the night isn't over yet
        </Text>
        <Box style={{ height: 1 }} />
        <TheButton onClick={() => setAnsweringTrivia(true)}>
          <Text size={18} weight={700}>
            play trivia
          </Text>
        </TheButton>
      </>
    );
  }

  return (
    <>
      <Text>who will you protect?</Text>
      <ScrollableFlexColumnBox>
        {playersToList.map((player, index) => {
          return (
            <NameButton
              key={index}
              selected={player.realName === selectedPlayer}
              selectedColor={"var(--Main-Yellow)"}
              onClick={() => setSelectedPlayer(player.realName)}
              disabled={player.name === name}
            >
              <Text size={18}>{player.realName}</Text>
            </NameButton>
          );
        })}
      </ScrollableFlexColumnBox>
      <Box style={{ flex: 1 }} />
      <TheButton
        disabled={selectedPlayer === null}
        onClick={handleConfirmation}
      >
        <Text size={18} weight={700}>
          protect
        </Text>
      </TheButton>
    </>
  );
}
