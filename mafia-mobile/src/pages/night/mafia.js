import React, { useContext, useEffect } from "react";
import { ScrollableFlexColumnBox } from "../../components/boxes";
import { Text } from "../../components/text";
import { NameButton, TheButton } from "../../components/button";
import { useState } from "react";
import { Box } from "@mui/material";
import { Skull } from "../../components/icons";
import { VariableContext } from "../../contexts/variables";
import { ActionContext } from "../../contexts/actions";

export default function NightMafia() {
  const { players, self, currentMafiaSelections, currentMafiaVotes } =
    useContext(VariableContext);
  const { handleMafiaSelection, handleMafiaVote } = useContext(ActionContext);

  const [mySelection, setMySelection] = useState(null);
  const [otherSelectionsAndVotes, setOtherSelectionsAndVotes] = useState([]);
  const [myVote, setMyVote] = useState(null);
  const playersToList = players.filter((player) => player.isAlive);

  const handleConfirmation = () => {
    if (mySelection === null) return;
    handleMafiaVote(mySelection.gamername);
  };

  useEffect(() => {
    const mySelection = currentMafiaSelections.find(
      (selection) => selection.player.gamername === self.gamername,
    );
    if (mySelection) {
      setMySelection(mySelection.target);
    } else {
      setMySelection(null);
    }
    const myVote = currentMafiaVotes.find(
      (vote) => vote.player.gamername === self.gamername,
    );
    if (myVote) {
      setMyVote(myVote.target);
    } else {
      setMyVote(null);
    }
    const otherSelections = currentMafiaSelections.filter(
      (selection) => selection.player.gamername !== self.gamername,
    );
    const otherVotes = currentMafiaVotes.filter(
      (vote) => vote.player.gamername !== self.gamername,
    );
    const otherSelectionsTargets = otherSelections.map(
      (selection) => selection.target,
    );
    const otherVotesTargets = otherVotes.map((vote) => vote.target);
    setOtherSelectionsAndVotes([
      ...otherSelectionsTargets,
      ...otherVotesTargets,
    ]);
  }, [currentMafiaSelections, currentMafiaVotes]);

  return (
    <>
      <Text>who will die tonight?</Text>
      <Text size={18} opacity={0.5}>
        each mafia has 1 vote
      </Text>
      <ScrollableFlexColumnBox>
        {playersToList.map((player, index) => {
          const iVoted =
            mySelection?.gamername === player.gamername ||
            myVote?.gamername === player.gamername;
          const otherKillVotes = otherSelectionsAndVotes.filter(
            (target) => target.gamername === player.gamername,
          ).length;
          return (
            <NameButton
              key={index}
              disabled={player.role === "mafia" || myVote !== null}
              onClick={() => handleMafiaSelection(player.gamername)}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                  position: "absolute",
                  right: 15,
                }}
              >
                {otherKillVotes > 0 ? (
                  <Box
                    style={{
                      width: 30.158,
                      height: 30.158,
                      borderRadius: "50%",
                      backgroundColor: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      opacity: 0.5,
                    }}
                  >
                    <Skull />
                    {otherKillVotes > 1 ? (
                      <Text
                        size={18}
                        style={{ position: "absolute", right: -17, bottom: -2 }}
                      >
                        x{otherKillVotes}
                      </Text>
                    ) : null}
                  </Box>
                ) : null}
                {otherKillVotes > 1 ? <Box style={{ width: 17 }} /> : null}
                {iVoted ? (
                  <Box
                    style={{
                      width: 30.158,
                      height: 30.158,
                      borderRadius: "50%",
                      backgroundColor: "var(--Main-Red)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Skull />
                  </Box>
                ) : null}
              </Box>
              <Text size={18}>
                {player.realname}
                {player.role === "mafia" ? " (mafia)" : null}
              </Text>
            </NameButton>
          );
        })}
      </ScrollableFlexColumnBox>
      <Box style={{ flex: 1 }} />
      <TheButton
        disabled={mySelection === null || myVote !== null}
        onClick={handleConfirmation}
        style={{ position: "relative" }}
      >
        <Text size={18} weight={700}>
          {myVote === null ? "confirm vote" : "vote confirmed"}
        </Text>
      </TheButton>
    </>
  );
}
