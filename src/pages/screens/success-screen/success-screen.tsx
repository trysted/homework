import { styled } from "@shared/ui/theme"
import { Images } from "../../../../assets"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StackParamList } from "@shared/types/types"

type SuccessScreenProps = NativeStackScreenProps<StackParamList, 'successScreen'>

const Flex1 = styled.View`
    flex: 1;
`

const MainContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${ ({theme}) => theme.palette.background.secondary };
`

const SuccessIcon = styled.Image`
    width: 148px;
    height: 148px;
    margin-top: ${ ({theme}) => theme.spacing(14) }px;
    align-self: center;
`

const TitleText = styled.Text`
    margin: ${ ({theme}) => theme.spacing(4) }px ${ ({theme}) => theme.spacing(2) }px ${ ({theme}) => theme.spacing(2) }px;
    color: ${ ({theme}) => theme.palette.text.primary };
    letter-scaping: ${ ({theme}) => theme.typography.subtitle2.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.subtitle2.fontFamily };
    font-size: ${ ({theme}) => theme.typography.subtitle2.size };
    text-align: center;
`

const SubtitleText = styled.Text`
    margin: ${ ({theme}) => theme.spacing(0) }px ${ ({theme}) => theme.spacing(2) }px;
    color: ${ ({theme}) => theme.palette.text.primary };
    letter-scaping: ${ ({theme}) => theme.typography.body15Regular.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.body15Regular.fontFamily };
    font-size: ${ ({theme}) => theme.typography.body15Regular.size };
    text-align: center;
`

const Button = styled.TouchableOpacity`
    background-color: ${ ({theme}) => theme.palette.button.primary };
    height: 52px;
    border-radius: 26px;
    margin: ${ ({theme}) => theme.spacing(2) }px;
    justify-content: center;
    bottom: 24px;
`
const ButtonTitle = styled.Text`
    align-self: center;
    color: ${ ({theme}) => theme.palette.text.primary };
    font-size: ${ ({theme}) => theme.typography.button.size };
    font-family: ${ ({theme}) => theme.typography.button.fontFamily };
    letter-spacing: ${ ({theme}) => theme.typography.button.letterSpacing };
`

export const SuccessScreen = ({navigation}: SuccessScreenProps) => {
    const handleContinue = () => {
        navigation.push('mainTabBarScreen')
    }

    return (
        <MainContainer>
            <SuccessIcon source = { Images.successAuthIc }/>
            <TitleText>Все готово</TitleText>
            <SubtitleText>Теперь вы можете использовать мобильное приложение Kode bank</SubtitleText>
            <Flex1 />
            <Button activeOpacity = { 0.7 } onPress={ handleContinue }>
                <ButtonTitle>Продолжить</ButtonTitle>
            </Button>
        </MainContainer>
    )
}