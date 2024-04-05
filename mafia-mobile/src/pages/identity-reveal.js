import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {Text} from "../components/text";

export default function IdentityReveal({screenHeight, role}) {
    const [yourRole, setYourRole] = useState(false);
    const [yourGoalIntro, setYourGoalIntro] = useState(false);
    const [yourGoal, setYourGoal] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setYourRole(true);
            setTimeout(() => {
                setYourGoalIntro(true);
                setTimeout(() => {
                    setYourGoal(true);
                }, 5000);
            }, 5000);
        }, 0);
    }, []);

    return (
        <>
            <Box style={{height: screenHeight / 2 - 55}}/>
            <Text style={{
                opacity: yourRole ? 1 : 0,
                transition: 'opacity 2s ease',
            }}>
                you're a{role === 'angel' ? 'n' : null}
            </Text>
            <Text size={42} weight={700} color={
                role === 'mafia' ? 'var(--Main-Red)' :
                    role === 'detective' ? 'var(--Main-Blue)' :
                        role === 'angel' ? 'var(--Main-Yellow)' :
                            'var(--Main-White)'
            } style={{
                opacity: yourRole ? 1 : 0,
                transition: 'opacity 2s ease',
            }}>
                {role}
            </Text>
            {
                yourGoalIntro ?
                    <Text size={18} opacity={0.5} style={{
                        opacity: yourGoalIntro ? 1 : 0,
                        transition: 'opacity 1s ease',
                    }}>
                        your goal:
                    </Text>
                    : null
            }
            {
                yourGoal ?
                    <Text size={24} style={{
                        opacity: yourGoal ? 1 : 0,
                        transition: 'opacity 1s ease',
                    }}>
                        {role === 'mafia' ? 'kill' :
                            role === 'detective' ? 'find the mafia' :
                                role === 'angel' ? 'protect' :
                                    'survive'}
                    </Text>
                    : null
            }
        </>
    )
}