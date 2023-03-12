import { Typography } from "@shared/ui/core";
import { styled } from "@shared/ui/theme";

export type CostBubleProps = {
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

export const CostBuble = ({value, onClick}: CostBubleProps) => {
    return (
        <Container onPress = {() => {
            onClick(value + ' ₽')
        }}>
            <PriceText variant = 'caption1'>{value} ₽</PriceText>
        </Container>
    );
}
