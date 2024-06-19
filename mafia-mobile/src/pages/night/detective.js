import React from "react";
import { ScrollableFlexColumnBox } from "../../components/boxes";
import { Text } from "../../components/text";
import { NameButton, TheButton } from "../../components/button";
import { useState } from "react";
import { Box } from "@mui/material";
import NightTrivia from "./trivia";

export default function NightDetective({
  name = "detective",
  players = [],
  knownRoles = [],
  setKnownRoles = () => {},
  sendMessageToParent = () => {},
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const [answeringTrivia, setAnsweringTrivia] = useState(false);

  const playersToList = players.filter((player) => !player.inHeaven);

  const handleConfirmation = () => {
    setConfirmed(true);
    setKnownRoles((prev) => [...prev, selectedPlayer.name]);
    sendMessageToParent({ name: "identified", target: selectedPlayer.name });
    setTimeout(() => {
      sendMessageToParent({ name: "finishedNight", player: name });
    }, 1500);
  };

  if (answeringTrivia) {
    return <NightTrivia />;
  }

  if (confirmed) {
    return (
      <>
        <Text>{selectedPlayer.realName}</Text>
        <Text size={18} opacity={0.75}>
          is a{selectedPlayer.role === "angel" ? "n" : null}
        </Text>
        <Text size={42} weight={700}>
          {
            playersToList.find((player) => player.name === selectedPlayer.name)
              .role
          }
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
      <Text>who will you identify?</Text>
      <ScrollableFlexColumnBox>
        {playersToList.map((player, index) => {
          return (
            <NameButton
              key={index}
              selected={player === selectedPlayer}
              selectedColor={"var(--Main-Blue)"}
              onClick={() => setSelectedPlayer(player)}
              disabled={
                knownRoles.includes(player.name) || player.name === name
              }
            >
              <Text size={18}>
                {player.realName}
                {knownRoles.includes(player.name) ? ` (${player.role})` : ""}
              </Text>
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
          identify
        </Text>
      </TheButton>
    </>
  );
}
