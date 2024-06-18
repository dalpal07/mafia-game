import React, { useEffect, useContext } from "react";
import { Text } from "../components/text";
import Timer from "../components/timer";

export default function Accusations() {
  const makeAccusationAudio = new Audio("./assets/make-accusation.mp3");

  useEffect(() => {
    makeAccusationAudio.play();

    return () => makeAccusationAudio.pause();
  }, []);

  return (
    <>
      <Text size={36} opacity={0.5}>
        you have 5 minutes to make an accusation
      </Text>
      <Timer />
    </>
  );
}
