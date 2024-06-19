import { Button, styled } from "@mui/material";

export const TheButton = styled(Button)(({ color = "var(--Main-Red)" }) => ({
  backgroundColor: color,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
  padding: "12px 24px",
  width: "calc(100% - 48px)",
  textTransform: "none",
  "&:disabled": {
    opacity: 0.5,
  },
  "&:hover": {
    backgroundColor: color,
  },
}));

export const NameButton = styled(TheButton)(
  ({
    selected = false,
    selectedColor = "var(--Main-White)",
    borderColor = "var(--Main-White)",
  }) => ({
    backgroundColor: selected ? selectedColor : "transparent",
    border: `1px solid ${borderColor}`,
    "&:hover": {
      backgroundColor: selected ? selectedColor : "transparent",
    },
  }),
);
