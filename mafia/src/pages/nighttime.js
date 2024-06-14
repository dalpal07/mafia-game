import {Text} from "../components/text";
import React, {useEffect} from "react";

export default function Nighttime({moveToNighttimeTimer, firstNight}) {
    const nighttimeSeePhonesAudio = new Audio('./assets/nighttime-see-phones.mp3');
    const nighttimeAgainAudio = new Audio('./assets/nighttime-again.mp3');
    const narrationAudio = new Audio('./assets/narration.mp3');

    useEffect(() => {
        narrationAudio.play();
        if (firstNight) {
            setTimeout(() => nighttimeSeePhonesAudio.play(), 1000);

            nighttimeSeePhonesAudio.onended = () => {
                setTimeout(() => moveToNighttimeTimer(), 1000);
            }

            return () => {
                nighttimeSeePhonesAudio.pause();
                narrationAudio.pause();
            }
        }
        else {
            setTimeout(() => nighttimeAgainAudio.play(), 1000);

            nighttimeAgainAudio.onended = () => {
                setTimeout(() => moveToNighttimeTimer(), 1000);
            }

            return () => {
                nighttimeAgainAudio.pause();
                narrationAudio.pause();
            }
        }
    }, []);

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
                <path
                    d="M28.0683 0C31.2194 4.41765 33.0778 9.8 33.0778 15.6176C33.0778 30.6059 20.7715 42.7588 5.59409 42.7588C3.74755 42.7588 1.94865 42.5765 0.203369 42.2353C5.11756 48.1941 12.605 52 20.9919 52C35.794 52 47.7966 40.1471 47.7966 25.5294C47.7966 13.3294 39.4335 3.06471 28.0624 0H28.0683Z"
                    fill="#EBEBEB"/>
            </svg>
            <Text size={36} opacity={0.5}>
                look at your phone
            </Text>
        </>
    )
}