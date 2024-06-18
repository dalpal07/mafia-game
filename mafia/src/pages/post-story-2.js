import React, { useEffect, useContext } from "react";
import { Text } from "../components/text";

export default function PostStory2() {
  const invitationToLieAudio = new Audio("./assets/invitation-to-lie.mp3");

  useEffect(() => {
    setTimeout(() => invitationToLieAudio.play(), 1000);

    invitationToLieAudio.onended = () => {
      setTimeout(() => () => {}, 1000);
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
