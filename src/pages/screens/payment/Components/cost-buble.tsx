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

const PriceText = styled.Text`
    color: ${ ({theme}) => theme.palette.text.secondary };
    letter-scaping: ${ ({theme}) => theme.typography.caption1.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.caption1.fontFamily };
    font-size: ${ ({theme}) => theme.typography.caption1.size };
    padding: ${ ({theme}) => theme.spacing(1) }px ${ ({theme}) => theme.spacing(2) }px;
`

export const CostBuble = ({value, onClick}: CostBubleProps) => {
    return (
        <Container onPress = {() => {
            onClick(value + ' ₽')
        }}>
            <PriceText>{value} ₽</PriceText>
        </Container>
    );
}
