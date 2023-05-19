import { View } from "react-native";
import { TitleView } from "./title-view";
import { Images } from "../../../../../assets";
import { styled } from "@shared/ui/theme";
import { Typography } from "@shared/ui/core";

const ContentContainer = styled.View`
    background-color: ${ ({theme}) => theme.palette.background.secondary };
    padding: ${ ({theme}) => theme.spacing(2) }px;
    flex-direction: row;
`
const VisaImage = styled.Image`
    width: 40px;
    height: 28px;
`
const TextContainer = styled.View`
    justify-content: 'space-between';
    padding-left: ${ ({theme}) => theme.spacing(2) }px;
    padding-right: ${ ({theme}) => theme.spacing(2) }px;
    flex-grow: ${ ({theme}) => theme.spacing(2) };
`

const Icon = styled.Image`
    width: 24px;
    height: 24px;
    align-self: center;
`

export const CardSelection = () => {
    return (
        <View>
            <TitleView title = 'Карта для оплаты' />
                <View>
                    <ContentContainer>
                        <VisaImage source = { Images.visa }/>
                        <TextContainer>
                            <Typography variant = 'body15Regular'>Карта зарплатная</Typography>
                            <Typography variant = 'caption1'>457 334,00 ₽</Typography>
                        </TextContainer>
                        <Icon source= { Images.arrowDown }/>
                    </ContentContainer>
                </View>
        </View>
    );
}