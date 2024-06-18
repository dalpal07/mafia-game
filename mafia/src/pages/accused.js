import React, { useEffect, useContext } from "react";
import { Text } from "../components/text";

export default function Accused() {
  const haveAccusationAudio = new Audio("./assets/have-accusation.mp3");

  useEffect(() => {
    setTimeout(() => haveAccusationAudio.play(), 1000);

    haveAccusationAudio.onended = () => {
      setTimeout(() => () => {}, 1000);
    };

    return () => haveAccusationAudio.pause();
  }, []);

  return (
    <>
      <Text size={56}>{"accused person"}</Text>
      <Text size={36} opacity={0.5}>
        has been accused by
      </Text>
      <Text size={56} opacity={0.75}>
        {"accuser1"} and {"accuser2"}
      </Text>
    </>
  );
}
