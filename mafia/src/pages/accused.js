import React, { useEffect, useContext } from "react";
import { Text } from "../components/text";
import { VariableContext } from "../contexts/variables";
import { ActionContext } from "../contexts/actions";

export default function Accused() {
  const { recentlyAccused, currentAccusations } = useContext(VariableContext);
  const { handleProgressToVotingPage } = useContext(ActionContext);

  const accusers = currentAccusations.filter(
    (accusation) => accusation.target.gamername === recentlyAccused.gamername,
  );

  const haveAccusationAudio = new Audio("./assets/have-accusation.mp3");

  useEffect(() => {
    setTimeout(() => haveAccusationAudio.play(), 1000);

    haveAccusationAudio.onended = () => {
      setTimeout(() => handleProgressToVotingPage(), 1000);
    };

    return () => haveAccusationAudio.pause();
  }, []);

  return (
    <>
      <Text size={56}>{recentlyAccused?.realname}</Text>
      <Text size={36} opacity={0.5}>
        has been accused by
      </Text>
      <Text size={56} opacity={0.75}>
        {accusers[0]?.player.realname} and {accusers[1]?.player.realname}
      </Text>
    </>
  );
}
