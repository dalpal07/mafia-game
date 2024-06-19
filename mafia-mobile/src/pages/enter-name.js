import React, { useContext, useState } from "react";
import { Box, Input, styled } from "@mui/material";
import { FullLogo } from "../components/icons";
import { TheButton } from "../components/button";
import { Text } from "../components/text";
import { VariableContext } from "../contexts/variables";
import { ActionContext } from "../contexts/actions";

const InputBox = styled(Input)({
  padding: "12px 24px",
  width: "calc(100% - 48px)",
  borderRadius: 10,
  backgroundColor: "var(--Main-White)",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  fontFamily: "American Typewriter",
  fontSize: 18,
  fontWeight: 400,
  color: "var(--Main-Black)",
});

export default function EnterName() {
  const { self } = useContext(VariableContext);
  const { handleSetRealname } = useContext(ActionContext);
  const [realName, setRealName] = useState(self.gamername || "");
  const [fitsRequiredLength, setFitsRequiredLength] = useState(true);

  const handleSubmit = () => {
    if (realName.length < 1 || realName.length > 13) {
      setFitsRequiredLength(false);
      return;
    }
    handleSetRealname(realName);
  };

  return (
    <>
      <Box style={{ height: 50 }} />
      <FullLogo />
      <Box style={{ height: 25 }} />
      <Text size={24} weight={400}>
        Enter your Mafia name
      </Text>
      <InputBox
        placeholder={"Mafia name"}
        value={realName}
        onChange={(e) => setRealName(e.target.value)}
        disableUnderline={true}
      />
      {!fitsRequiredLength ? (
        <Text size={12} color={"var(--Main-Red)"}>
          name must be between 1-13 characters
        </Text>
      ) : null}
      <TheButton onClick={handleSubmit} disabled={realName.length === 0}>
        <Text size={18} weight={600} color={"var(--Main-White)"}>
          join
        </Text>
      </TheButton>
    </>
  );
}
