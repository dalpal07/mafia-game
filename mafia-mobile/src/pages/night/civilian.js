import React, { useEffect, useState } from "react";
import { Text } from "../../components/text";
import NightTrivia from "./trivia";

export default function NightCivilian() {
  const [answeringTrivia, setAnsweringTrivia] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnsweringTrivia(true);
    }, 3000);
  }, []);

  if (answeringTrivia) {
    return <NightTrivia />;
  }

  return (
    <>
      <Text>trivia</Text>
      <Text size={18} opacity={0.5}>
        answer your trivia questions or
      </Text>
      <Text weight={700} color={"var(--Main-Red)"}>
        you could risk death
      </Text>
    </>
  );
}
