import { FlatList, FlatListProps } from "react-native";
import { TitleView } from "./title-view"; 
import { useState } from "react";
import { CostBuble } from "./cost-buble";
import { Separator } from "@shared/ui/core";
import { styled } from "@shared/ui/theme";

export type CostViewProps = {
    onValueChanged: (value: string) => void,
    isFailedOnValidation: boolean
};

type SeparatorLineProps = {
    theme: any,
    isActive: boolean,
    isFailedOnValidation: boolean
}

const MainContainer = styled.View`
    background-color: ${ ({theme}) => theme.palette.background.secondary };
    margin-top: ${ ({theme}) => theme.spacing(2) }px;
`
const CostInput = styled.TextInput`
    color: ${ ({theme}) => theme.palette.text.primary };
    letter-scaping: ${ ({theme}) => theme.typography.largeTitle.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.largeTitle.fontFamily };
    font-size: ${ ({theme}) => theme.typography.largeTitle.size };
    padding: ${ ({theme}) => theme.spacing(1) }px ${ ({theme}) => theme.spacing(2) }px 0px;
    background-color: ${ ({theme}) => theme.palette.background.secondary };
`
const SeparatorLine = styled(Separator)<SeparatorLineProps>`
    margin: ${ ({theme}) => theme.spacing(2) }px ${ ({theme}) => theme.spacing(2) }px 0px;
    background-color: ${ ({ theme, isActive, isFailedOnValidation }) => isFailedOnValidation ? theme.palette.indicator.error : (isActive ? theme.palette.accent.primary : theme.palette.content.secondary) };
`
const CostsFlatList = styled(FlatList as new (props: FlatListProps<string>) => FlatList<string>)`
    margin: ${ ({theme}) => theme.spacing(2) }px ${ ({theme}) => theme.spacing(2) }px 0px;
`
const CashbackText = styled.Text`
    margin: ${ ({theme}) => theme.spacing(2) }px ${ ({theme}) => theme.spacing(2) }px ${ ({theme}) => theme.spacing(2.5) }px;
    color: ${ ({theme}) => theme.palette.text.secondary };
    letter-scaping: ${ ({theme}) => theme.typography.caption1.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.caption1.fontFamily };
    font-size: ${ ({theme}) => theme.typography.caption1.size };
`

export const CostView = ({onValueChanged, isFailedOnValidation}: CostViewProps) => {
    const [isActive, setActive] = useState(false)
    const [cost, setCost] = useState('0 ₽')
    const costs = ['100', '500', '1000', '2500', '5000']

    const costNumberWithRub = (text: string) => {
        return Number(text.replace(' ₽', ''))
    }

    const onChangeText = (text: string) => {
        setCost(text)
        onValueChanged(String(costNumberWithRub(text)))
    }

    return (
        <MainContainer>
            <TitleView title = 'Сумма' />
            <CostInput 
                value = { cost }
                onChangeText = { onChangeText }
                onResponderStart = { () => setActive(true) }
                onEndEditing = { () => setActive(false) }
                returnKeyType = 'done'
                keyboardType= 'decimal-pad'
            />
            <SeparatorLine isActive = { isActive } isFailedOnValidation = { isFailedOnValidation } />
            {costNumberWithRub(cost) == 0 && 
            <CostsFlatList
                horizontal
                data = {costs}
                renderItem = {(item) =>
                    <CostBuble value = {item.item} onClick = {(value) => {
                        onChangeText(value)
                    }} />
                }
            />}
            {costNumberWithRub(cost) != 0 &&
                <CashbackText>Ваш кешбек составит 10% -  {costNumberWithRub(cost) / 10} ₽</CashbackText>
            }
        </MainContainer>
    );
}