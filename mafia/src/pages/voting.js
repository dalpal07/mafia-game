import React, { useEffect, useContext } from "react";
import { Text } from "../components/text";
import { VariableContext } from "../contexts/variables";
import { ActionContext } from "../contexts/actions";

export default function Voting() {
  const { recentlyAccused } = useContext(VariableContext);
  const { handleProgressToVotingTimerPage } = useContext(ActionContext);
  const liveOrDieAudio = new Audio("./assets/live-or-die.mp3");

  useEffect(() => {
    liveOrDieAudio.play();

    liveOrDieAudio.onended = () => handleProgressToVotingTimerPage();

    return () => liveOrDieAudio.pause();
  }, []);

  return (
    <>
      <Text size={56} opacity={0.75}>
        will {recentlyAccused?.realname} live or die?
      </Text>
    </>
  );
}
