import { Text } from "../components/text";
import React, { useEffect, useContext } from "react";
import { ActionContext } from "../contexts/actions";

export default function NightOver() {
  const { handleProgressToStoryPage } = useContext(ActionContext);

  const nightOverAudio = new Audio("./assets/night-over.mp3");
  const narrationAudio = new Audio("./assets/narration.mp3");
  narrationAudio.volume = 0.5;

  useEffect(() => {
    narrationAudio.play();
    setTimeout(() => nightOverAudio.play(), 1000);

    nightOverAudio.addEventListener("ended", () => {
      setTimeout(() => handleProgressToStoryPage(), 1000);
    });

    return () => {
      nightOverAudio.pause();
      narrationAudio.pause();
    };
  }, []);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="82"
        height="82"
        viewBox="0 0 82 82"
        fill="none"
      >
        <path
          d="M41 63.5001C53.4264 63.5001 63.5 53.4265 63.5 41.0001C63.5 28.5736 53.4264 18.5 41 18.5C28.5736 18.5 18.5 28.5736 18.5 41.0001C18.5 53.4265 28.5736 63.5001 41 63.5001Z"
          fill="#EBEBEB"
        />
        <path
          d="M54.2649 17.4852C58.5449 19.9053 62.0949 23.4553 64.5149 27.7353L69.6399 12.3652L54.2699 17.4902L54.2649 17.4852Z"
          fill="#EBEBEB"
        />
        <path
          d="M40.9999 67.9998C38.4899 67.9998 36.0599 67.6498 33.7549 67.0098L40.9999 81.4998L48.2449 67.0098C45.9399 67.6498 43.5099 67.9998 40.9999 67.9998Z"
          fill="#EBEBEB"
        />
        <path
          d="M17.49 54.2648L12.365 69.6348L27.735 64.5098C23.455 62.0898 19.905 58.5398 17.485 54.2598L17.49 54.2648Z"
          fill="#EBEBEB"
        />
        <path
          d="M14 40.9999C14 38.4899 14.35 36.0599 14.99 33.7549L0.5 40.9999L14.99 48.2449C14.35 45.9399 14 43.5099 14 40.9999Z"
          fill="#EBEBEB"
        />
        <path
          d="M27.735 17.4849L12.365 12.3599L17.49 27.7299C19.91 23.4499 23.46 19.8999 27.74 17.4799L27.735 17.4849Z"
          fill="#EBEBEB"
        />
        <path
          d="M40.9999 14C43.5099 14 45.9399 14.35 48.2449 14.99L40.9999 0.5L33.7549 14.99C36.0599 14.35 38.4899 14 40.9999 14Z"
          fill="#EBEBEB"
        />
        <path
          d="M81.5 40.9999L67.01 33.7549C67.65 36.0599 68 38.4899 68 40.9999C68 43.5099 67.65 45.9399 67.01 48.2449L81.5 40.9999Z"
          fill="#EBEBEB"
        />
        <path
          d="M64.5149 54.2651C62.0949 58.5451 58.5449 62.0952 54.2649 64.5152L69.6349 69.6402L64.5099 54.2701L64.5149 54.2651Z"
          fill="#EBEBEB"
        />
      </svg>
      <Text size={36} opacity={0.5}>
        the night is over
      </Text>
    </>
  );
}
