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
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100vh',
    maxWidth: 400,
    gap: 18,
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