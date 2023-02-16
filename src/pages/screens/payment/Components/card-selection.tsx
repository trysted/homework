import { View } from "react-native";
import { TitleView } from "./title-view";
import { Images } from "../../../../../assets";
import { styled } from "@shared/ui/theme";

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
const BigText = styled.Text`
    letter-scaping: ${ ({theme}) => theme.typography.body15Regular.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.body15Regular.fontFamily };
    font-size: ${ ({theme}) => theme.typography.body15Regular.size };
    color: white;
`
const SmallText = styled.Text`
    letter-scaping: ${ ({theme}) => theme.typography.caption1.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.caption1.fontFamily };
    font-size: ${ ({theme}) => theme.typography.caption1.size };
    color: white;
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
                            <BigText>Карта зарплатная</BigText>
                            <SmallText>457 334,00 ₽</SmallText>
                        </TextContainer>
                        <Icon source= { Images.arrowDown }/>
                    </ContentContainer>
                </View>
        </View>
    );
}