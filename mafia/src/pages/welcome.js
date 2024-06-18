import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { Text } from "../components/text";
import lottieJson from "../assets/welcome-mafia.json";
import Lottie from "react-lottie-player";
import { ActionContext } from "../contexts/actions";

export default function Welcome({ youReady }) {
  const {
    handleProgressToAreYouReadyPage,
    handleProgressToLookAtYourPhonePage,
  } = useContext(ActionContext);

  const welcomeAudio = new Audio("./assets/welcome.mp3");
  const readyAudio = new Audio("./assets/ready.mp3");

  useEffect(() => {
    setTimeout(() => {
      welcomeAudio.play();
    }, 3000);

    welcomeAudio.onended = () => {
      setTimeout(() => {
        handleProgressToAreYouReadyPage();
      }, 6500);
    };

    return () => welcomeAudio.pause();
  }, []);

  useEffect(() => {
    if (youReady) {
      setTimeout(() => readyAudio.play(), 2000);
    }

    readyAudio.onended = () => {
      setTimeout(() => {
        handleProgressToLookAtYourPhonePage();
      }, 7000);
    };

    return () => readyAudio.pause();
  }, [youReady]);

  return (
    <>
      <Lottie loop animationData={lottieJson} play />
      <Box style={{ height: 12 }} />
      <Text size={56} opacity={0.75}>
        {youReady ? "are you ready?" : "welcome"}
      </Text>
    </>
  );
}
