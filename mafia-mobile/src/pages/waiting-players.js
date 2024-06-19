import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import { Text } from "../components/text";
import { TheButton } from "../components/button";
import Lottie from "react-lottie-player";
import lottieJson from "../assets/welcome-banner.json";
import { VariableContext } from "../contexts/variables";
import { ActionContext } from "../contexts/actions";

export default function WaitingPlayers({ screenHeight, minPlayers }) {
  const { players, self } = useContext(VariableContext);
  const { handleHostStart } = useContext(ActionContext);
  const ready = players.every(
    (player) => player.realname && player.realname.length > 0,
  );

  const [bannerShown, setBannerShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setBannerShown(true);
    }, 1250);
  }, []);

  if (!self.isHost) {
    return (
      <>
        <Lottie
          loop={false}
          animationData={lottieJson}
          play
          style={{
            height: screenHeight - 221,
          }}
        />
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            maxWidth: 400,
            gap: 18,
            opacity: bannerShown ? 1 : 0,
            transition: "opacity ease-in 0.25s",
          }}
        >
          <Box style={{ height: 26 }} />
          <Text size={42}>welcome</Text>
          <Text size={18} opacity={0.5}>
            waiting for other players to join
          </Text>
          <Box style={{ height: 21 }} />
          <Box style={{ height: 18 }} />
        </Box>
      </>
    );
  }
  return (
    <>
      <Lottie
        loop={false}
        animationData={lottieJson}
        play
        style={{
          height: screenHeight - 221,
        }}
      />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          maxWidth: 400,
          gap: 18,
          opacity: bannerShown ? 1 : 0,
          transition: "opacity ease-in 0.25s",
        }}
      >
        <Box style={{ height: 1 }} />
        <Text size={42}>welcome</Text>
        <Text size={18} opacity={0.5}>
          {players.length >= minPlayers
            ? "press start once all players are in "
            : `requires ${minPlayers} players to start`}
        </Text>
        <TheButton
          disabled={players.length < minPlayers || !ready}
          onClick={handleHostStart}
        >
          <Text size={18} weight={700}>
            Start
          </Text>
        </TheButton>
        <Box style={{ height: 18 }} />
      </Box>
    </>
  );
}
