import React, { useContext, useEffect, useState } from "react";
import {
  VerticalLine,
  VoteListColumnBox,
  VoteListRowBox,
  VotesBox,
  VotesContainer,
} from "../components/boxes";
import { Text } from "../components/text";
import Timer from "../components/timer";
import { VariableContext } from "../contexts/variables";

export default function VotingTimer() {
  const {
    currentLifeDeathSelections,
    currentLifeDeathVotes,
    votingTimer,
    setVotingTimer,
  } = useContext(VariableContext);

  const [liveVotes, setLiveVotes] = useState([]);
  const first4LiveVotes = liveVotes.slice(0, 4);
  const second4LiveVotes = liveVotes.slice(4, 8);
  const third4LiveVotes = liveVotes.slice(8, 12);
  const fourth4LiveVotes = liveVotes.slice(12, 16);
  const fifth4LiveVotes = liveVotes.slice(16, 20);
  const [dieVotes, setDieVotes] = useState([]);
  const first4DieVotes = dieVotes.slice(0, 4);
  const second4DieVotes = dieVotes.slice(4, 8);
  const third4DieVotes = dieVotes.slice(8, 12);
  const fourth4DieVotes = dieVotes.slice(12, 16);
  const fifth4DieVotes = dieVotes.slice(16, 20);

  useEffect(() => {
    const newLiveVotes = [];
    const newDieVotes = [];
    currentLifeDeathVotes.forEach((vote) => {
      if (vote.vote === "live") {
        newLiveVotes.push({
          realname: vote.player.realname,
          voteSubmitted: true,
        });
      } else {
        newDieVotes.push({
          realname: vote.player.realname,
          voteSubmitted: true,
        });
      }
    });
    currentLifeDeathSelections.forEach((selection) => {
      if (selection.vote === "live") {
        newLiveVotes.push({
          realname: selection.player.realname,
          voteSubmitted: false,
        });
      } else {
        newDieVotes.push({
          realname: selection.player.realname,
          voteSubmitted: false,
        });
      }
    });
    setLiveVotes(newLiveVotes);
    setDieVotes(newDieVotes);
  }, [currentLifeDeathSelections, currentLifeDeathVotes]);

  return (
    <>
      <Timer timer={votingTimer} setTimer={setVotingTimer} />
      <Text size={56} opacity={0.75}>
        what will {"accused person"}'s fate be?
      </Text>
      <VotesContainer>
        <VotesBox>
          <Text size={42} weight={700}>
            live
          </Text>
          <VoteListRowBox>
            <VoteListColumnBox>
              {first4LiveVotes.map((player) => (
                <Text
                  key={player.realname}
                  size={36}
                  opacity={player.voteSubmitted ? 1 : 0.5}
                  weight={player.voteSubmitted ? 600 : 300}
                >
                  {player.realname}
                </Text>
              ))}
            </VoteListColumnBox>
            <VoteListColumnBox>
              {second4LiveVotes.map((player) => (
                <Text
                  key={player.realname}
                  size={36}
                  opacity={player.voteSubmitted ? 1 : 0.5}
                  weight={player.voteSubmitted ? 600 : 300}
                >
                  {player.realname}
                </Text>
              ))}
            </VoteListColumnBox>
            <VoteListColumnBox>
              {third4LiveVotes.map((player) => (
                <Text
                  key={player.realname}
                  size={36}
                  opacity={player.voteSubmitted ? 1 : 0.5}
                  weight={player.voteSubmitted ? 600 : 300}
                >
                  {player.realname}
                </Text>
              ))}
            </VoteListColumnBox>
            <VoteListColumnBox>
              {fourth4LiveVotes.map((player) => (
                <Text
                  key={player.realname}
                  size={36}
                  opacity={player.voteSubmitted ? 1 : 0.5}
                  weight={player.voteSubmitted ? 600 : 300}
                >
                  {player.realname}
                </Text>
              ))}
            </VoteListColumnBox>
            <VoteListColumnBox>
              {fifth4LiveVotes.map((player) => (
                <Text
                  key={player.realname}
                  size={36}
                  opacity={player.voteSubmitted ? 1 : 0.5}
                  weight={player.voteSubmitted ? 600 : 300}
                >
                  {player.realname}
                </Text>
              ))}
            </VoteListColumnBox>
          </VoteListRowBox>
        </VotesBox>
        <VerticalLine />
        <VotesBox>
          <Text size={42} weight={700} color={"var(--Main-Red)"}>
            die
          </Text>
          <VoteListRowBox>
            <VoteListColumnBox>
              {first4DieVotes.map((player) => (
                <Text
                  key={player.realname}
                  size={36}
                  opacity={player.voteSubmitted ? 1 : 0.5}
                  weight={player.voteSubmitted ? 600 : 300}
                >
                  {player.realname}
                </Text>
              ))}
            </VoteListColumnBox>
            <VoteListColumnBox>
              {second4DieVotes.map((player) => (
                <Text
                  key={player.realname}
                  size={36}
                  opacity={player.voteSubmitted ? 1 : 0.5}
                  weight={player.voteSubmitted ? 600 : 300}
                >
                  {player.realname}
                </Text>
              ))}
            </VoteListColumnBox>
            <VoteListColumnBox>
              {third4DieVotes.map((player) => (
                <Text
                  key={player.realname}
                  size={36}
                  opacity={player.voteSubmitted ? 1 : 0.5}
                  weight={player.voteSubmitted ? 600 : 300}
                >
                  {player.realname}
                </Text>
              ))}
            </VoteListColumnBox>
            <VoteListColumnBox>
              {fourth4DieVotes.map((player) => (
                <Text
                  key={player.realname}
                  size={36}
                  opacity={player.voteSubmitted ? 1 : 0.5}
                  weight={player.voteSubmitted ? 600 : 300}
                >
                  {player.realname}
                </Text>
              ))}
            </VoteListColumnBox>
            <VoteListColumnBox>
              {fifth4DieVotes.map((player) => (
                <Text
                  key={player.realname}
                  size={36}
                  opacity={player.voteSubmitted ? 1 : 0.5}
                  weight={player.voteSubmitted ? 600 : 300}
                >
                  {player.realname}
                </Text>
              ))}
            </VoteListColumnBox>
          </VoteListRowBox>
        </VotesBox>
      </VotesContainer>
    </>
  );
}
