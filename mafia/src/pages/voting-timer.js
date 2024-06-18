import React, {useEffect, useState} from "react";
import {
    VerticalLine, VoteListColumnBox,
    VoteListRowBox,
    VotesBox,
    VotesContainer
} from "../components/boxes";
import {Text} from "../components/text";
import Timer from "../components/timer";

export default function VotingTimer() {
    const liveVotes = [] // players.filter(player => player.vote === 'live');
    const first4LiveVotes = liveVotes.slice(0, 4);
    const second4LiveVotes = liveVotes.slice(4, 8);
    const third4LiveVotes = liveVotes.slice(8, 12);
    const fourth4LiveVotes = liveVotes.slice(12, 16);
    const fifth4LiveVotes = liveVotes.slice(16, 20);
    const dieVotes = [] // players.filter(player => player.vote === 'die');
    const first4DieVotes = dieVotes.slice(0, 4);
    const second4DieVotes = dieVotes.slice(4, 8);
    const third4DieVotes = dieVotes.slice(8, 12);
    const fourth4DieVotes = dieVotes.slice(12, 16);
    const fifth4DieVotes = dieVotes.slice(16, 20);

    return (
        <>
            <Timer/>
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
                            {
                                first4LiveVotes.map(player => (
                                    <Text key={player.realName} size={36} opacity={player.voteSubmitted ? 1 : 0.5} weight={player.voteSubmitted ? 600 : 300}>
                                        {player.realName}
                                    </Text>
                                ))
                            }
                        </VoteListColumnBox>
                        <VoteListColumnBox>
                            {
                                second4LiveVotes.map(player => (
                                    <Text key={player.realName} size={36} opacity={player.voteSubmitted ? 1 : 0.5} weight={player.voteSubmitted ? 600 : 300}>
                                        {player.realName}
                                    </Text>
                                ))
                            }
                        </VoteListColumnBox>
                        <VoteListColumnBox>
                            {
                                third4LiveVotes.map(player => (
                                    <Text key={player.realName} size={36} opacity={player.voteSubmitted ? 1 : 0.5} weight={player.voteSubmitted ? 600 : 300}>
                                        {player.realName}
                                    </Text>
                                ))
                            }
                        </VoteListColumnBox>
                        <VoteListColumnBox>
                            {
                                fourth4LiveVotes.map(player => (
                                    <Text key={player.realName} size={36} opacity={player.voteSubmitted ? 1 : 0.5} weight={player.voteSubmitted ? 600 : 300}>
                                        {player.realName}
                                    </Text>
                                ))
                            }
                        </VoteListColumnBox>
                        <VoteListColumnBox>
                            {
                                fifth4LiveVotes.map(player => (
                                    <Text key={player.realName} size={36} opacity={player.voteSubmitted ? 1 : 0.5} weight={player.voteSubmitted ? 600 : 300}>
                                        {player.realName}
                                    </Text>
                                ))
                            }
                        </VoteListColumnBox>
                    </VoteListRowBox>
                </VotesBox>
                <VerticalLine/>
                <VotesBox>
                    <Text size={42} weight={700} color={'var(--Main-Red)'}>
                        die
                    </Text>
                    <VoteListRowBox>
                        <VoteListColumnBox>
                            {
                                first4DieVotes.map(player => (
                                    <Text key={player.realName} size={36} opacity={player.voteSubmitted ? 1 : 0.5} weight={player.voteSubmitted ? 600 : 300}>
                                        {player.realName}
                                    </Text>
                                ))
                            }
                        </VoteListColumnBox>
                        <VoteListColumnBox>
                            {
                                second4DieVotes.map(player => (
                                    <Text key={player.realName} size={36} opacity={player.voteSubmitted ? 1 : 0.5} weight={player.voteSubmitted ? 600 : 300}>
                                        {player.realName}
                                    </Text>
                                ))
                            }
                        </VoteListColumnBox>
                        <VoteListColumnBox>
                            {
                                third4DieVotes.map(player => (
                                    <Text key={player.realName} size={36} opacity={player.voteSubmitted ? 1 : 0.5} weight={player.voteSubmitted ? 600 : 300}>
                                        {player.realName}
                                    </Text>
                                ))
                            }
                        </VoteListColumnBox>
                        <VoteListColumnBox>
                            {
                                fourth4DieVotes.map(player => (
                                    <Text key={player.realName} size={36} opacity={player.voteSubmitted ? 1 : 0.5} weight={player.voteSubmitted ? 600 : 300}>
                                        {player.realName}
                                    </Text>
                                ))
                            }
                        </VoteListColumnBox>
                        <VoteListColumnBox>
                            {
                                fifth4DieVotes.map(player => (
                                    <Text key={player.realName} size={36} opacity={player.voteSubmitted ? 1 : 0.5} weight={player.voteSubmitted ? 600 : 300}>
                                        {player.realName}
                                    </Text>
                                ))
                            }
                        </VoteListColumnBox>
                    </VoteListRowBox>
                </VotesBox>
            </VotesContainer>
        </>
    )
}