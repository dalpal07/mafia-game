import React, { useEffect, useContext } from "react";
import { Text } from "../components/text";
import { ActionContext } from "../contexts/actions";

export default function PostStory2() {
  const { handleProgressToAccusationTimerPage } = useContext(ActionContext);

  const invitationToLieAudio = new Audio("./assets/invitation-to-lie.mp3");

  useEffect(() => {
    setTimeout(() => invitationToLieAudio.play(), 1000);

    invitationToLieAudio.onended = () => {
      setTimeout(() => handleProgressToAccusationTimerPage(), 1000);
    };

    return () => invitationToLieAudio.pause();
  }, []);

  return (
    <>
      <Text size={56} opacity={0.75}>
        you can lie as much as you’d like
      </Text>
    </>
  );
}
