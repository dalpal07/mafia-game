import React from "react";
import {
  ConstrainedBox,
  ScrollableFlexColumnBox,
} from "../../components/boxes";
import { Box } from "@mui/material";
import { Text } from "../../components/text";
import { NameButton } from "../../components/button";
import { Finger } from "../../components/icons";

export default function HeavenDay({ players, nightRecap, accusing }) {
  const playersToList = players.filter((player) => !player.inHeaven);

  if (nightRecap) {
    return (
      <>
        <ConstrainedBox width={289}>
          <Text color={"var(--Main-Black)"} size={18} opacity={0.75}>
            see screen to learn what happened during the night
          </Text>
        </ConstrainedBox>
      </>
    );
  } else if (accusing) {
    return (
      <>
        <Text color={"var(--Main-Black)"}>current accusations</Text>
        <ScrollableFlexColumnBox>
          {playersToList.map((player, index) => {
            const accusation = player.accusations.length > 0;
            return (
              <NameButton key={index} borderColor={"var(--Main-Black)"}>
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
                  {accusation ? (
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
                        opacity: 0.5,
                      }}
                    >
                      <Finger color={"var(--Main-Black)"} />
                    </Box>
                  ) : null}
                </Box>
                <Text size={18} color={"var(--Main-Black)"}>
                  {player.realName}
                </Text>
              </NameButton>
            );
          })}
        </ScrollableFlexColumnBox>
      </>
    );
  }
  return (
    <Text color={"var(--Main-Black)"} size={18} opacity={0.75}>
      see screen
    </Text>
  );
}
