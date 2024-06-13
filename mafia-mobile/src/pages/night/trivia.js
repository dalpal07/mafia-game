import React, {useEffect, useState} from "react";
import {Text} from "../../components/text";
import {ScrollableFlexColumnBox} from "../../components/boxes";
import {NameButton, TheButton} from "../../components/button";
import {Box} from "@mui/material";
import {getTriviaQuestions} from "../../trivia";

export default function NightTrivia({sendMessageToParent, name}) {
    const [questions, setQuestions] = useState(getTriviaQuestions(3));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const [answer, setAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted) {
            if (currentQuestion === questions.length - 1) {
                if (sendMessageToParent !== undefined) {
                    sendMessageToParent({name: 'finishedNight', player: name});
                }
            }
            setTimeout(() => {
                handleNextQuestion();
            }, 1500);
        }
    }, [submitted]);

    const handleSubmission = () => {
        setSubmitted(true);
        if (answer === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
    }

    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setSubmitted(false);
        setAnswer(null);
    }

    const handlePlayAgain = () => {
        setQuestions(getTriviaQuestions(5));
        setCurrentQuestion(0);
        setScore(0);
        setAnswer(null);
        setSubmitted(false);
    }

    if (currentQuestion === questions.length) {
        return (
            <>
                <Text opacity={0.75}>
                    final results
                </Text>
                <Text weight={700} opacity={0.75}>
                    {score}/{currentQuestion}
                </Text>
                <Box style={{flex: 1}}/>
                <TheButton onClick={handlePlayAgain}>
                    <Text size={18} weight={700}>
                        play again
                    </Text>
                </TheButton>
            </>
        )
    }

    return (
        <>
            <Text>
                {questions[currentQuestion].question}
            </Text>
            <ScrollableFlexColumnBox>
                {
                    questions[currentQuestion].options.map((option, index) => {
                        return (
                            <NameButton
                                key={index}
                                selected={answer === option}
                                onClick={() => setAnswer(option)}
                                disabled={submitted}
                            >
                                <Text size={18} color={answer === option ? 'var(--Main-Black)' : 'var(--Main-White)'}>
                                    {option}
                                </Text>
                            </NameButton>
                        )
                    })
                }
            </ScrollableFlexColumnBox>
            {
                submitted ?
                    <>
                        <Box style={{height: 12}}/>
                        <Text size={28} weight={700} color={answer === questions[currentQuestion].answer ? 'var(--Main-White)' : 'var(--Main-Red)'}>
                            {answer === questions[currentQuestion].answer ? 'correct' : 'incorrect'}
                        </Text>
                        <Text weight={700} opacity={0.75}>
                            {score}/{currentQuestion + 1}
                        </Text>
                    </>
                    :
                    null
            }
            <Box style={{flex: 1}}/>
            {
                submitted ?
                    null
                    :
                    <TheButton disabled={answer === null} onClick={handleSubmission}>
                        <Text size={18} weight={700}>
                            submit
                        </Text>
                    </TheButton>
            }
        </>
    )
}