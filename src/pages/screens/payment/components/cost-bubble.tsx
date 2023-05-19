import { Typography } from "@shared/ui/core";
import { styled } from "@shared/ui/theme";

export type CostBubbleProps = {
    value: string,
    onClick: (value: string) => void
};

const Container = styled.TouchableOpacity`
    background-color: ${ ({theme}) => theme.palette.content.secondary };
    border-radius: 14px;
    margin-right: ${ ({theme}) => theme.spacing(2) }px;
    margin-bottom: ${ ({theme}) => theme.spacing(2) }px;
    height: 28px;
`

const PriceText = styled(Typography)`
    color: ${ ({theme}) => theme.palette.text.secondary };
    padding: ${ ({theme}) => theme.spacing(1) }px ${ ({theme}) => theme.spacing(2) }px;
`

export const CostBubble = ({value, onClick}: CostBubbleProps) => {
    return (
        <Container onPress = {() => {
            onClick(value + ' ₽')
        }}>
            <PriceText variant = 'caption1'>{value} ₽</PriceText>
        </Container>
    );
}
