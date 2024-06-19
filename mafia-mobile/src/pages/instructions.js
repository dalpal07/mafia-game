import React, { useState, useContext } from "react";
import { Text } from "../components/text";
import { TheButton } from "../components/button";
import { VariableContext } from "../contexts/variables";
import { ActionContext } from "../contexts/actions";

export default function Instructions() {
  const { self } = useContext(VariableContext);
  const { handleHostSkip } = useContext(ActionContext);
  const [skipPressed, setSkipPressed] = useState(false);
  const handleSkip = () => {
    setSkipPressed(true);
    handleHostSkip();
  };

  return (
    <>
      <Text size={18} opacity={0.5}>
        see screen for instructions
      </Text>
      {self.isHost ? (
        <TheButton onClick={handleSkip} disabled={skipPressed}>
          <Text size={18} weight={700}>
            skip
          </Text>
        </TheButton>
      ) : null}
    </>
  );
}
