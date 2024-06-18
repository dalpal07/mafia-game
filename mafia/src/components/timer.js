import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Text } from "./text";
import Lottie from "react-lottie-player";
import lottieJson from "../assets/timer.json";

function getStringifiedTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export default function Timer({ timer, setTimer }) {
  const timerAudio = new Audio("./assets/timer.mp3");
  timerAudio.volume = 0.5;

  useEffect(() => {
    timerAudio.loop = true;
    timerAudio.play();

    return () => timerAudio.pause();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      timerAudio.pause();
      return;
    } else {
      setTimeout(() => setTimer(timer - 1), 1000);
    }
  }, [timer]);

  return (
    <Box
      style={{
        width: 250,
        height: 252,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        size={72}
        color={"var(--Main-Red)"}
        weight={600}
        style={{ position: "absolute" }}
      >
        {getStringifiedTime(timer)}
      </Text>
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{
          width: 250,
          height: 250,
        }}
      />
    </Box>
  );
}
