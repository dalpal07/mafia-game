import React from "react";
import { ScrollableFlexColumnBox } from "../../components/boxes";
import { Text } from "../../components/text";
import { NameButton, TheButton } from "../../components/button";
import { useState, useContext } from "react";
import { Box } from "@mui/material";
import { VariableContext } from "../../contexts/variables";
import { ActionContext } from "../../contexts/actions";

export default function NightAngel() {
  const { players } = useContext(VariableContext);
  const { handleAngelProtection } = useContext(ActionContext);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const playersToList = players.filter((player) => player.isAlive);

  const handleConfirmation = () => {
    setConfirmed(true);
    handleAngelProtection(selectedPlayer.gamername);
  };

  return (
    <>
      <Text>who will you protect?</Text>
      <ScrollableFlexColumnBox>
        {playersToList.map((player, index) => {
          return (
            <NameButton
              key={index}
              selected={player.gamername === selectedPlayer?.gamername}
              selectedcolor={"var(--Main-Yellow)"}
              onClick={() => {
                if (selectedPlayer?.gamername === player.gamername) {
                  setSelectedPlayer(null);
                  return;
                }
                setSelectedPlayer(player);
              }}
              disabled={player.role === "angel" || confirmed}
            >
              <Text size={18}>{player.realname}</Text>
            </NameButton>
          );
        })}
      </ScrollableFlexColumnBox>
      <Box style={{ flex: 1 }} />
      <TheButton
        disabled={selectedPlayer === null || confirmed}
        onClick={handleConfirmation}
      >
        <Text size={18} weight={700}>
          {confirmed ? "protected" : "protect"}
        </Text>
      </TheButton>
    </>
  );
}
