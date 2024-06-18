import React from "react";
import { Box } from "@mui/material";
import { Text } from "./text";

export default function Coin({ name, isHost }) {
  if (name === null || name === undefined) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="163"
        height="163"
        viewBox="0 0 163 163"
        fill="none"
      >
        <circle
          cx="81.5"
          cy="81.5"
          r="79"
          stroke="#545454"
          strokeWidth="5"
          strokeDasharray="5 5"
        />
      </svg>
    );
  }
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 163,
        height: 163,
        borderRadius: 163,
        backgroundColor: "var(--Main-Red)",
        boxShadow:
          "2px 1px 0px 0px rgba(255, 255, 255, 0.50) inset, -2px -1px 0px 0px #792D2D inset",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 130,
          height: 130,
          borderRadius: 130,
          backgroundColor: "var(--Main-Red)",
          boxShadow:
            "-2px -1px 0px 0px rgba(255, 255, 255, 0.50) inset, 2px 1px 0px 0px #792D2D inset",
          position: "relative",
        }}
      >
        <Text size={name.length < 9 ? 24 : name.length < 12 ? 18 : 12}>
          {name}
        </Text>
        {isHost ? (
          <Text
            size={18}
            style={{
              position: "absolute",
              bottom: 30,
            }}
          >
            (host)
          </Text>
        ) : null}
      </Box>
    </Box>
  );
}
