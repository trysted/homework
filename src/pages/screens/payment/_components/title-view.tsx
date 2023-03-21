import { Typography } from "@shared/ui/core";
import { styled } from "@shared/ui/theme";

export type TitleViewProps = {
    title: string
}

const Container = styled.View`
    height: 52px;
    background-color: ${ ({theme}) => theme.palette.background.secondary };
`

const Title = styled(Typography)`
    margin: 16px;
    color: ${ ({theme}) => theme.palette.text.tertiary };
`

export const TitleView = ({title}: TitleViewProps) => {
    return (
        <Container>
            <Title variant = 'body15Semibold'>{title}</Title>
        </Container>
    );
}