import {Box, styled} from "@mui/material";

export const SpaceBetweenRowBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
});

export const StandardPageBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100vw',
    height: '100vh',
    padding: '56px 72px',
    position: 'relative',
    gap: 32,
});

export const HeaderBox = styled(StandardPageBox)({
    paddingLeft: 24,
    paddingRight: 24,
    height: 'fit-content',
    opacity: 0.75,
});

export const ConstrainedBox = styled(Box)(({width = '100%', height = '100%'}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: width,
    maxHeight: height,
}));

export const Line = styled(Box)(({color = 'var(--Main-White)'}) => ({
    width: '100%',
    height: 0.5,
    backgroundColor: color,
}));

export const ScrollableFlexColumnBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    overflowY: 'scroll',
    gap: 18,
});

export const CoinColumnBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 24,
});

export const CoinRowBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
});

export const InnerPageBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    width: '100%',
    height: '100%',
});

export const VotesContainer = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    gap: 30,
});

export const VotesBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
});

export const VoteListRowBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    gap: 15
});

export const VoteListColumnBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
});

export const VerticalLine = styled(Box)({
    width: 0.5,
    height: "100%",
    backgroundColor: 'var(--Main-White)',
    opacity: 0.75,
});