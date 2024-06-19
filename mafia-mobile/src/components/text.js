import { styled, Typography } from "@mui/material";

export const Text = styled(Typography)(
  ({ color = "var(--Main-White)", size = 24, opacity = 1, weight = 400 }) => ({
    color,
    fontSize: size,
    opacity,
    fontWeight: weight,
    fontFamily: "American Typewriter",
    lineHeight: "1",
    textAlign: "center",
  }),
);
