import React, { useContext } from "react";
import { ScrollableFlexColumnBox } from "../../components/boxes";
import { Text } from "../../components/text";
import { NameButton, TheButton } from "../../components/button";
import { useState } from "react";
import { Box } from "@mui/material";
import { VariableContext } from "../../contexts/variables";
import { ActionContext } from "../../contexts/actions";

export default function NightDetective() {
  const { players, detectiveIdentifications } = useContext(VariableContext);
  const { handleDetectiveIdentification } = useContext(ActionContext);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const playersToList = players.filter((player) => player.isAlive);

  const handleConfirmation = () => {
    setConfirmed(true);
    handleDetectiveIdentification(selectedPlayer.gamername);
  };

  if (confirmed) {
    return (
      <>
        <Text>{selectedPlayer.realname}</Text>
        <Text size={18} opacity={0.75}>
          is a{selectedPlayer.role === "angel" ? "n" : null}
        </Text>
        <Text size={42} weight={700}>
          {selectedPlayer.role}
        </Text>
      </>
    );
  }

  return (
    <>
      <Text>who will you identify?</Text>
      <ScrollableFlexColumnBox>
        {playersToList.map((player, index) => {
          const knownRole = detectiveIdentifications.find(
            (identification) =>
              identification.target.gamername === player.gamername,
          )?.role;
          return (
            <NameButton
              key={index}
              selected={player.gamername === selectedPlayer?.gamername}
              selectedcolor={"var(--Main-Blue)"}
              onClick={() => {
                if (selectedPlayer?.gamername === player.gamername) {
                  setSelectedPlayer(null);
                  return;
                }
                setSelectedPlayer(player);
              }}
              disabled={knownRole || player.role === "detective"}
            >
              <Text size={18}>
                {player.realname}
                {knownRole || player.role === "detective"
                  ? ` (${player.role})`
                  : ""}
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
