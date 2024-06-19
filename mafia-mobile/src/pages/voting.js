import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import { ConstrainedBox } from "../components/boxes";
import { Text } from "../components/text";
import { NameButton, TheButton } from "../components/button";
import { VariableContext } from "../contexts/variables";
import { ActionContext } from "../contexts/actions";

export default function Voting() {
  const { self, recentlyAccused } = useContext(VariableContext);
  const { handleLifeDeathSelection, handleLifeDeathVote } =
    useContext(ActionContext);

  const [vote, setVote] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmission = () => {
    setSubmitted(true);
    handleLifeDeathVote(vote);
  };

  if (self.gamername === recentlyAccused?.gamername) {
    return (
      <>
        <ConstrainedBox width={289}>
          <Text size={18} opacity={0.75}>
            a decision is being made about your life. you cannot vote
          </Text>
        </ConstrainedBox>
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <Text size={18}>your vote has been submitted</Text>
        <Text size={18} opacity={0.75}>
          see the main screen for the results
        </Text>
      </>
    );
  }

  return (
    <>
      <Text>should {recentlyAccused?.realname} live or die?</Text>
      <Text size={18} opacity={0.75}>
        post your vote
      </Text>
      <NameButton
        onClick={() => {
          handleLifeDeathSelection("live");
          if (vote === "live") {
            setVote(null);
            return;
          }
          setVote("live");
        }}
        selected={vote === "live"}
      >
        <Text
          size={18}
          weight={700}
          color={vote === "live" ? "var(--Main-Black)" : "var(--Main-White)"}
        >
          live
        </Text>
      </NameButton>
      <NameButton
        onClick={() => {
          handleLifeDeathSelection("die");
          if (vote === "die") {
            setVote(null);
            return;
          }
          setVote("die");
        }}
        selected={vote === "die"}
      >
        <Text
          size={18}
          weight={700}
          color={vote === "die" ? "var(--Main-Black)" : "var(--Main-White)"}
        >
          die
        </Text>
      </NameButton>
      <Box style={{ flex: 1 }} />
      <TheButton disabled={vote === null} onClick={handleSubmission}>
        <Text size={18} weight={700}>
          submit vote
        </Text>
      </TheButton>
    </>
  );
}
