import React, { useEffect, useContext } from "react";
import { Text } from "../components/text";
import Timer from "../components/timer";
import { VariableContext } from "../contexts/variables";

export default function Accusations() {
  const { accusationTimer, setAccusationTimer, recentlyAccused } =
    useContext(VariableContext);
  const makeAccusationAudio = new Audio("./assets/make-accusation.mp3");
  const dayAudio = new Audio("./assets/Dayloop.wav");

  useEffect(() => {
    dayAudio.loop = true;
    dayAudio.play();
    if (!recentlyAccused) {
      makeAccusationAudio.play();
    }

    return () => {
      dayAudio.pause();
      makeAccusationAudio.pause();
    };
  }, []);

  return (
    <>
      <Text size={36} opacity={0.5}>
        you have 5 minutes to make an accusation
      </Text>
      <Timer timer={accusationTimer} setTimer={setAccusationTimer} />
    </>
  );
}
