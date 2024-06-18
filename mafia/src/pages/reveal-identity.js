import React, { useEffect, useContext } from "react";
import { Text } from "../components/text";
import { ActionContext } from "../contexts/actions";

export default function RevealIdentity() {
  const { handleProgressToInstructionsPage } = useContext(ActionContext);

  const identityAudio = new Audio("./assets/identity.mp3");

  useEffect(() => {
    setTimeout(() => identityAudio.play(), 1000);

    setTimeout(() => {
      handleProgressToInstructionsPage();
    }, 19000);
    return () => identityAudio.pause();
  }, []);

  return (
    <>
      <Text size={56} opacity={0.75}>
        look at your phone
      </Text>
      <Text size={42} color={"var(--Main-Red)"} weight={700}>
        don’t tell anyone
      </Text>
    </>
  );
}
