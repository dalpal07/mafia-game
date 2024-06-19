import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ScrollableFlexColumnBox } from "../components/boxes";
import { Text } from "../components/text";
import { NameButton, TheButton } from "../components/button";
import { Finger, Lock } from "../components/icons";
import Lottie from "react-lottie-player";
import lottieJson from "../assets/accusation-warning.json";
import { VariableContext } from "../contexts/variables";
import { ActionContext } from "../contexts/actions";

export default function Day() {
  const {
    self,
    players,
    currentAccusations,
    recentlyAccused,
    detectiveIdentifications,
  } = useContext(VariableContext);
  const { handleAccuse } = useContext(ActionContext);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const playersToList = players.filter((player) => player.isAlive);
  const beingAccused = currentAccusations.find(
    (accusation) => accusation.target.gamername === self.gamername,
  )
    ? true
    : false;
  const myAccusation = currentAccusations.find(
    (accusation) => accusation.player.gamername === self.gamername,
  );
  const knownPlayerRoles =
    self.role === "detective"
      ? detectiveIdentifications.map(
          (identification) => identification.target.gamername,
        )
      : [];

  const handleSubmitAccuse = () => {
    handleAccuse(selectedPlayer.gamername);
    setSelectedPlayer(null);
  };

  return (
    <>
      {beingAccused ? (
        <>
          <Text weight={700} color={"var(--Main-Red)"} size={24}>
            you are being accused
          </Text>
          <Text size={18} opacity={0.75}>
            defend yourself
          </Text>
        </>
      ) : (
        <>
          <Text>who will you accuse?</Text>
          <Text size={18} opacity={0.75}>
            2+ accusations are required
          </Text>
        </>
      )}
      <ScrollableFlexColumnBox>
        {playersToList.map((player, index) => {
          const iAccused = myAccusation?.target.gamername === player.gamername;
          const otherAccusation = currentAccusations.find(
            (accusation) =>
              accusation.target.gamername === player.gamername &&
              accusation.player.gamername !== self.gamername,
          );
          return (
            <NameButton
              key={index}
              selected={selectedPlayer?.gamername === player.gamername}
              onClick={() => {
                if (iAccused) return;
                if (selectedPlayer?.gamername === player.gamername) {
                  setSelectedPlayer(null);
                  return;
                }
                setSelectedPlayer(player);
              }}
              disabled={
                player.gamername === self.gamername ||
                player.gamername === recentlyAccused?.gamername
              }
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                  position: "absolute",
                  right: 15,
                }}
              >
                {otherAccusation ? (
                  <Box
                    style={{
                      width: 30.158,
                      height: 30.158,
                      borderRadius: "50%",
                      backgroundColor: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      opacity: player.gamername === self.gamername ? 1 : 0.5,
                    }}
                  >
                    {player.gamername === self.gamername ? (
                      <Lottie
                        loop
                        animationData={lottieJson}
                        play
                        style={{ maxHeight: 35 }}
                      />
                    ) : selectedPlayer?.gamername === player.gamername ? (
                      <Finger color={"var(--Main-Black)"} />
                    ) : (
                      <Finger color={"var(--Main-White)"} />
                    )}
                  </Box>
                ) : null}
                {iAccused ? (
                  <Box
                    style={{
                      width: 30.158,
                      height: 30.158,
                      borderRadius: "50%",
                      backgroundColor: "var(--Main-Red)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Finger />
                  </Box>
                ) : null}
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: 15,
                }}
              >
                {player.gamername === recentlyAccused?.gamername ? (
                  <Lock />
                ) : null}
              </Box>
              <Text
                size={18}
                color={
                  selectedPlayer?.gamername === player.gamername
                    ? "var(--Main-Black)"
                    : "var(--Main-White)"
                }
              >
                {player.realname}
                {(self.role === "mafia" && player.role === "mafia") ||
                knownPlayerRoles.includes(player.gamername)
                  ? ` (${player.role})`
                  : null}
              </Text>
            </NameButton>
          );
        })}
      </ScrollableFlexColumnBox>
      <TheButton onClick={handleSubmitAccuse} disabled={!selectedPlayer}>
        <Text size={18} weight={700}>
          accuse
        </Text>
      </TheButton>
    </>
  );
}
