import { styled } from "@shared/ui/theme";

export type TitleViewProps = {
    title: string
}

const Container = styled.View`
    height: 52px;
    background-color: ${ ({theme}) => theme.palette.background.secondary };
`

const Title = styled.Text`
    margin: 16px;
    color: ${ ({theme}) => theme.palette.text.tertiary };
    letter-scaping: ${ ({theme}) => theme.typography.body15Semibold.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.body15Semibold.fontFamily };
    font-size: ${ ({theme}) => theme.typography.body15Semibold.size };
`

export const TitleView = ({title}: TitleViewProps) => {
    return (
        <Container>
            <Title>{title}</Title>
        </Container>
    );
}