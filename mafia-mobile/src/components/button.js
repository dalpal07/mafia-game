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
    selectedcolor = "var(--Main-White)",
    bordercolor = "var(--Main-White)",
  }) => ({
    backgroundColor: selected ? selectedcolor : "transparent",
    border: `1px solid ${bordercolor}`,
    "&:hover": {
      backgroundColor: selected ? selectedcolor : "transparent",
    },
  }),
);
