import { styled } from "@shared/ui/theme"
import { Images } from "../../../../assets"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StackParamList } from "@shared/types/types"
import { Button, Flex1, SafeAreaFlex1, Typography, CloseButton } from "@shared/ui/core"

type ErrorScreenProps = NativeStackScreenProps<StackParamList, 'errorScreen'>

const MainContainer = styled(SafeAreaFlex1)`
    background-color: ${ ({theme}) => theme.palette.background.secondary };
`

const ErrorIcon = styled.Image`
    width: 148px;
    height: 148px;
    margin-top: ${ ({theme}) => theme.spacing(10) }px;
    align-self: center;
`

const TitleText = styled(Typography)`
    margin: ${ ({theme}) => theme.spacing(4) }px ${ ({theme}) => theme.spacing(2) }px ${ ({theme}) => theme.spacing(2) }px;
    color: ${ ({theme}) => theme.palette.text.primary };
    text-align: center;
`

const SubtitleText = styled(Typography)`
    margin: ${ ({theme}) => theme.spacing(0) }px ${ ({theme}) => theme.spacing(2) }px;
    color: ${ ({theme}) => theme.palette.text.primary };
    text-align: center;
`

const RetryButton = styled(Button)`
    bottom: 24px;
`

export const ErrorScreen = ({navigation, route}: ErrorScreenProps) => {
    const handleClose = () => {
        navigation.pop()
    }

    return (
        <MainContainer>
            <CloseButton onPress = { handleClose } />
            <ErrorIcon source = { Images.errorIc }/>
            <TitleText variant = 'subtitle2'>Внимание</TitleText>
            <SubtitleText variant = 'body15Regular'>Сервер временно недоступен. Пожалуйста, повторите попытку позднее</SubtitleText>
            <Flex1 />
            <RetryButton onPress = { handleClose } title = { 'Повторить' } disabled = { false }/>
        </MainContainer>
    )
}