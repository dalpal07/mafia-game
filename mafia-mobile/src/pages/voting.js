import React, {useState} from "react";
import {Box} from "@mui/material";
import {ConstrainedBox} from "../components/boxes";
import {Text} from "../components/text";
import {NameButton, TheButton} from "../components/button";

export default function Voting({name, playerBeingVotedOn, votingActive, sendMessageToParent}) {
    const [vote, setVote] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmission = () => {
        setSubmitted(true);
        sendMessageToParent({name: 'voteSubmitted', player: name});
    }

    if (name === playerBeingVotedOn?.name) {
        return (
            <>
                <ConstrainedBox width={289}>
                    <Text size={18} opacity={0.75}>
                        a decision is being made about your life. you cannot vote
                    </Text>
                </ConstrainedBox>
            </>
        )
    }

    if (submitted) {
        return (
            <>
                <Text size={18}>
                    your vote has been submitted
                </Text>
                <Text size={18} opacity={0.75}>
                    see the main screen for the results
                </Text>
            </>
        )
    }

    return (
        <>
            <Text>
                should {playerBeingVotedOn?.realName} live or die?
            </Text>
            <Text size={18} opacity={0.75}>
                post your vote
            </Text>
            <NameButton
                onClick={() => {
                    sendMessageToParent({name: 'vote', vote: 'live', player: name});
                    setVote('live')
                }}
                selected={vote === 'live'}
            >
                <Text size={18} weight={700} color={vote === 'live' ? 'var(--Main-Black)' : 'var(--Main-White)'}>
                    live
                </Text>
            </NameButton>
            <NameButton
                onClick={() => {
                    sendMessageToParent({name: 'vote', vote: 'die', player: name});
                    setVote('die')
                }}
                selected={vote === 'die'}
            >
                <Text size={18} weight={700} color={vote === 'die' ? 'var(--Main-Black)' : 'var(--Main-White)'}>
                    die
                </Text>
            </NameButton>
            <Box style={{flex: 1}}/>
            <TheButton disabled={vote === null || !votingActive} onClick={handleSubmission}>
                <Text size={18} weight={700}>
                    submit vote
                </Text>
            </TheButton>
        </>
    )
}