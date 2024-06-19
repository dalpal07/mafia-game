import React, { useContext } from "react";
import { VariableContext } from "../../contexts/variables";
import NightMafia from "./mafia";
import NightDetective from "./detective";
import NightAngel from "./angel";
import NightCivilian from "./civilian";

export default function Night({ timerStarted = false }) {
  const { self } = useContext(VariableContext);

  if (!timerStarted) return null;
  if (self.role === "mafia") return <NightMafia />;
  if (self.role === "detective") return <NightDetective />;
  if (self.role === "angel") return <NightAngel />;
  return <NightCivilian />;
}
