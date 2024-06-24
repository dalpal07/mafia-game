import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import {
  ConstrainedBox,
  ScrollableFlexColumnBox,
} from "../../components/boxes";
import { Text } from "../../components/text";
import { NameButton, TheButton } from "../../components/button";
import { Skull } from "../../components/icons";
import { VariableContext } from "../../contexts/variables";

export default function HeavenNight() {
  const { players, currentAngelProtection, currentDetectiveIdentification, currentMafiaSelections, currentMafiaVotes } = useContext(VariableContext);

  const [selected, setSelected] = useState(null); // angel, detective, mafia
  const [actionsFollowing, setActionsFollowing] = useState(null);
  const [followingName, setFollowingName] = useState(null);
  const [followingTarget, setFollowingTarget] = useState(null);
  const [followingTargetRole, setFollowingTargetRole] = useState(null);

  const playersToList = players.filter((player) => player.isAlive);

  useEffect(() => {
    if (actionsFollowing === "angel") {
      if (currentAngelProtection) {
        setFollowingTarget(currentAngelProtection.target.realname);
      }
    }
    if (actionsFollowing === "detective") {
      if (currentDetectiveIdentification) {
        setFollowingTarget(currentDetectiveIdentification.target.realname);
        setFollowingTargetRole(currentDetectiveIdentification.target.role);
      }
    }
  }, [currentAngelProtection, currentDetectiveIdentification, actionsFollowing]);

  const handleFollow = () => {
    setActionsFollowing(selected);
    const followingName = players.find(
      (player) => player.role === selected,
    )?.realname;
    setFollowingName(followingName);
  };

  if (actionsFollowing === "angel" || actionsFollowing === "detective") {
    return (
      <>
        {followingTarget === null ? (
          <>
            <Text color={"var(--Main-Black)"} opacity={0.75}>
              {followingName}
            </Text>
            <Text color={"var(--Main-Black)"} size={18} opacity={0.5}>
              is making a selection...
            </Text>
          </>
        ) : (
          <>
            <Text color={"var(--Main-Black)"} opacity={0.75}>
              {followingTarget}
              {actionsFollowing === "detective"
                ? ` (${followingTargetRole})`
                : null}
            </Text>
            <Text color={"var(--Main-Black)"} size={18} opacity={0.5}>
              {actionsFollowing === "detective"
                ? "was identified by"
                : "was saved by"}
            </Text>
            <Text color={"var(--Main-Black)"} opacity={0.75}>
              {followingName}
            </Text>
          </>
        )}
      </>
    );
  } else if (actionsFollowing === "mafia") {
    return (
      <>
        <ScrollableFlexColumnBox>
          {playersToList.map((player, index) => {
            let votes = 0;
            currentMafiaVotes.forEach((vote) => {
              if (vote.target.gamername === player.gamername) {
                votes++;
              }
            });
            currentMafiaSelections.forEach((selection) => {
              if (selection.target.gamername === player.gamername) {
                votes++;
              }
            });

            return (
              <NameButton
                key={index}
                disabled={player.role === "mafia"}
                bordercolor={"var(--Main-Black)"}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                    position: "absolute",
                    right: 15,
                  }}
                >
                  {votes > 0 ? (
                    <Box
                      style={{
                        width: 30.158,
                        height: 30.158,
                        borderRadius: "50%",
                        backgroundColor: "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        opacity: 0.5,
                      }}
                    >
                      <Skull color={"var(--Main-Black)"} />
                      {votes > 1 ? (
                        <Text
                          size={18}
                          style={{
                            position: "absolute",
                            right: -17,
                            bottom: -2,
                          }}
                          color={"var(--Main-Black)"}
                        >
                          x{votes}
                        </Text>
                      ) : null}
                    </Box>
                  ) : null}
                  {votes > 1 ? (
                    <Box style={{ width: 17 }} />
                  ) : null}
                </Box>
                <Text size={18} color={"var(--Main-Black)"}>
                  {player.realname}
                  {player.role === "mafia" ? " (mafia)" : null}
                </Text>
              </NameButton>
            );
          })}
        </ScrollableFlexColumnBox>
      </>
    );
  }

  return (
    <>
      <ConstrainedBox width={289}>
        <Text color={"var(--Main-Black)"} opacity={0.75}>
          who’s actions would you like to follow tonight?
        </Text>
      </ConstrainedBox>
      <NameButton
        bordercolor={"var(--Main-Black)"}
        selectedcolor={"var(--Main-Yellow)"}
        selected={selected === "angel"}
        onClick={() => setSelected("angel")}
        disabled={!players.find((player) => player.role === "angel")?.isAlive}
      >
        <Text color={"var(--Main-Black)"} size={18}>
          the angel
          {!players.find((player) => player.role === "angel")?.isAlive
            ? " (dead)"
            : null}
        </Text>
      </NameButton>
      <NameButton
        bordercolor={"var(--Main-Black)"}
        selectedcolor={"var(--Main-Blue)"}
        selected={selected === "detective"}
        onClick={() => setSelected("detective")}
        disabled={
          !players.find((player) => player.role === "detective")?.isAlive
        }
      >
        <Text
          color={
            selected === "detective" ? "var(--Main-White)" : "var(--Main-Black)"
          }
          size={18}
        >
          the detective
          {!players.find((player) => player.role === "detective")?.isAlive
            ? " (dead)"
            : null}
        </Text>
      </NameButton>
      <NameButton
        bordercolor={"var(--Main-Black)"}
        selectedcolor={"var(--Main-Red)"}
        selected={selected === "mafia"}
        onClick={() => setSelected("mafia")}
      >
        <Text
          color={
            selected === "mafia" ? "var(--Main-White)" : "var(--Main-Black)"
          }
          size={18}
        >
          the mafia
        </Text>
      </NameButton>
      <Box style={{ flex: 1 }} />
      <TheButton disabled={selected === null} onClick={handleFollow}>
        <Text size={18} weight={700}>
          follow
        </Text>
      </TheButton>
    </>
  );
}
