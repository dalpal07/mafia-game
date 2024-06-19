import React, { useEffect, useRef, useState, useContext } from "react";
import { HeaderBox, Line, SpaceBetweenRowBox } from "./boxes";
import { Box } from "@mui/material";
import { Text } from "./text";
import Lottie from "react-lottie-player";
import lottieJson from "../assets/moon-sun.json";
import lottieJsonHeaven from "../assets/moon-sun-heaven.json";
import { VariableContext } from "../contexts/variables";

export default function Header({ time, color = "var(--Main-White)" }) {
  const { self } = useContext(VariableContext);

  const [currentTime, setCurrentTime] = useState("night");
  const animationRef = useRef(null);
  const [enteredHeaven, setEnteredHeaven] = useState(false);

  useEffect(() => {
    if (!enteredHeaven && color === "var(--Main-Black)") {
      setEnteredHeaven(true);
      animationRef.current.goToAndStop(59, true);
    }
    if (time && time !== currentTime) {
      setCurrentTime(time);
      if (time === "day") {
        animationRef.current.playSegments([0, 59], true);
      } else {
        animationRef.current.playSegments([59, 0], true);
      }
    }
  }, [time, color]);

  return (
    <HeaderBox>
      <Box style={{ height: 50 }} />
      <SpaceBetweenRowBox>
        <Text
          color={color}
          size={18}
          style={{
            width: "45%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {self.realname}
        </Text>
        {time ? (
          <Lottie
            loop={false}
            animationData={
              color === "var(--Main-White)" ? lottieJson : lottieJsonHeaven
            }
            play={false}
            ref={animationRef}
            style={{ maxWidth: 24 }}
          />
        ) : null}
        <Text
          color={color}
          size={18}
          style={{ width: "45%", display: "flex", justifyContent: "flex-end" }}
        >
          role: {self.role}
        </Text>
      </SpaceBetweenRowBox>
      <Line color={color} />
      <Box style={{ height: 12 }} />
    </HeaderBox>
  );
}
