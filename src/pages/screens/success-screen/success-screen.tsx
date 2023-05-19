import { styled } from "@shared/ui/theme"
import { Images } from "../../../../assets"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StackParamList } from "@entities/auth/models/types"
import { SafeAreaFlex1, Flex1, Typography, Button } from "@shared/ui/core"

type SuccessScreenProps = NativeStackScreenProps<StackParamList, 'successScreen'>

const MainContainer = styled(SafeAreaFlex1)`
    background-color: ${ ({theme}) => theme.palette.background.secondary };
`

const SuccessIcon = styled.Image`
    width: 148px;
    height: 148px;
    margin-top: ${ ({theme}) => theme.spacing(14) }px;
    align-self: center;
`

const TitleText = styled(Typography)`
    margin: ${ ({theme}) => theme.spacing(4) }px ${ ({theme}) => theme.spacing(2) }px ${ ({theme}) => theme.spacing(2) }px;
    text-align: center;
`

const SubtitleText = styled(Typography)`
    margin: ${ ({theme}) => theme.spacing(0) }px ${ ({theme}) => theme.spacing(2) }px;
    text-align: center;
`

const ContinueButton = styled(Button)`
    bottom: 24px;
`

export const SuccessScreen = ({navigation}: SuccessScreenProps) => {
    const handleContinue = () => {
        navigation.push('mainTabBarScreen')
    }

    return (
        <MainContainer>
            <SuccessIcon source = { Images.successAuthIc }/>
            <TitleText variant = 'subtitle2'>Все готово</TitleText>
            <SubtitleText variant = 'body15Regular'>Теперь вы можете использовать мобильное приложение Kode bank</SubtitleText>
            <Flex1 />
            <ContinueButton onPress = { handleContinue } title = 'Продолжить' disabled = { false }/>
        </MainContainer>
    )
}