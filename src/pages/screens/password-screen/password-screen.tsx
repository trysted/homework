import { styled } from "@shared/ui/theme";
import { KeyboardListener } from "@shared/types/useKeyboardVisible";
import { Images } from "../../../../assets";
import { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from "react-native";
import { ErrorAlert, KeyboardAvoadingViewFlex1, SafeAreaFlex1, Flex1, Typography, Button, CloseButton } from "@shared/ui/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@shared/types/types";
import { usePostPassword } from "../../../entities/auth/hooks";
import { $guestToken } from "@entities/auth/models";
import { useStore } from "effector-react";
import { setAuthTokensData } from "@entities/auth/models";

type PasswordScreenProps = NativeStackScreenProps<StackParamList, 'passwordScreen'>

type LogoProps = {
    isKeyboardVisiable: boolean
}

const MainContainer = styled(KeyboardAvoadingViewFlex1)`
    background-color: ${({theme}) => theme.palette.background.secondary };
`

const Logo = styled.Image<LogoProps>`
    height: ${ ({isKeyboardVisiable}) => isKeyboardVisiable ? 11 : 18 }px;
    width: ${ ({isKeyboardVisiable}) => isKeyboardVisiable ? 52 : 88 }px;
    margin-top: ${ ({isKeyboardVisiable, theme}) => theme.spacing(isKeyboardVisiable ? 0 : 2)}px;
    align-self: center;
`

const LogoText = styled(Typography)<LogoProps>`
    margin-top: ${ ({isKeyboardVisiable, theme}) => theme.spacing(isKeyboardVisiable ? 0.5 : 1)}px;
    text-align: center;
`

const HorizontalFlex1 = styled(Flex1)`
    flex-direction: row;
`

const LoginButton = styled(Button)`
    bottom: 16px;
`

const PassowrdContentContaier = styled.View`
    background-color: ${ ({theme}) => theme.palette.background.secondary };
    padding: ${ ({theme}) => theme.spacing(2) }px;
    flex-direction: row;
    margin-top: ${ ({theme}) => theme.spacing(2) }px;
`

const Icon = styled.Image`
    width: 24px;
    height: 24px;
    align-self: center;
`

const PhoneView = styled(Flex1)`
    background-color: ${ ({theme}) => theme.palette.content.primary };
    border-radius: 26px;
    height: 52px;
    padding: ${ ({theme}) => theme.spacing(2)}px ${({theme}) => theme.spacing(3)}px;
    flex-direction: row;
`
const PhoneTextInput = styled.TextInput`
    letter-scaping: ${ ({theme}) => theme.typography.body15Regular.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.body15Regular.fontFamily };
    font-size: ${ ({theme}) => theme.typography.body15Regular.size };
    flex-grow: ${ ({theme}) => theme.spacing(2) };
    margin-left: ${ ({theme}) => theme.spacing(2) }px;
    color: ${ ({theme}) => theme.palette.text.primary };
    padding-right: 16px;
`

const ActivityIndicatorContainer = styled(Flex1)`
    justify-content: center;
    align-content: center;
`
const EnterPasswordText = styled(Typography)`
    margin-top: ${ ({theme}) => theme.spacing(10) }px;
    text-align: center;
`

const invalidPasswordLengthError = 'Длина пароля должна быть не менее 5 символов'
const invalidErrorPassword = 'Пароль может содержать только цифры и буквы'

export const PasswordScreen = ({navigation}: PasswordScreenProps) => {
    const isKeyboardVisible = KeyboardListener().isKeyboardVisible;
    const [password, setPassword] = useState('')
    const [errorString, setErrorString] = useState<string | null>(null)
    const [isPassowrdHidden, setIsPassowrdHidden] = useState(true)
    const { mutateAsync: postPassword, isLoading } = usePostPassword()
    const guestToken = useStore($guestToken)

    const validatePasswordLengh = () => {
        if (password.length < 5) {
            setErrorString(invalidPasswordLengthError)
            return false
        }
        return true
    }

    const validatePasswordIncludingSpecialSymbols = () => {
        const specialChars = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;`
        const isSpecialCharsPresent = specialChars.split('').some(char => password.includes(char))

        if (isSpecialCharsPresent) {
            setErrorString(invalidErrorPassword)
            return false
        }
        return true
    }

    const handleLogin = () => {
        if (!validatePasswordLengh()) {
            return
        }

        if (!validatePasswordIncludingSpecialSymbols()) {
            return
        }

        if (guestToken) {
            postPassword({guestToken: guestToken, password: password}, {
                onSuccess: (data) => {
                   setAuthTokensData(data)
                   navigation.push('successScreen')
                },
                onError: () => {
                    navigation.push('errorScreen')
                }
            })
        }
    }

    const handleCloseAlert = () => {
        setErrorString(null)
    }

    const showAlert = () => {
        Alert.alert(
            'Вы точно хотите выйти?',
            undefined,
            [
                {
                    text: 'Отмена',
                    style: 'cancel'
                },
                {
                    text: 'Выйти',
                    onPress: navigation.popToTop,
                    style: "default"
                }
            ]
            )
    }

    if (isLoading) {
        return (
            <MainContainer>
                <ActivityIndicatorContainer>
                    <ActivityIndicator />
                </ActivityIndicatorContainer>
            </MainContainer>
        )
    }

    return (
        <MainContainer behavior = 'padding'>
            <ErrorAlert 
                isVisiable = { Boolean(errorString) }
                title = { errorString ?? "" }
                onClose = { handleCloseAlert }
                timeToDismiss = { 2000 }
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaFlex1>
                    <CloseButton onPress = { showAlert } />
                    <Logo isKeyboardVisiable = {isKeyboardVisible} source={Images.logo} />
                    <LogoText isKeyboardVisiable = {isKeyboardVisible} variant = {isKeyboardVisible ? 'caption4' : 'caption3' }>Digital Bank</LogoText>
                    <EnterPasswordText variant = 'body15Regular'>Введите пароль</EnterPasswordText>
                    <PassowrdContentContaier>
                    <PhoneView>
                    <Icon source = {Images.lockIc} />
                    <HorizontalFlex1>
                        <PhoneTextInput
                            clearButtonMode = 'never'
                            keyboardAppearance = 'dark'
                            secureTextEntry = { isPassowrdHidden }
                            onChangeText = { setPassword }
                            returnKeyType = 'done'
                            autoFocus
                        />
                    </HorizontalFlex1>
                    <TouchableWithoutFeedback onPress = { () => { setIsPassowrdHidden(prevIsPassowrdHidden => !prevIsPassowrdHidden) } }>
                        <Icon source = {isPassowrdHidden ? Images.unvisiablePasswordIc : Images.visiablePasswordIc} />
                    </TouchableWithoutFeedback>
                    </PhoneView>
                    </PassowrdContentContaier>
                    <Flex1/>
                    <LoginButton title = 'Войти' onPress = { handleLogin } disabled = { false }></LoginButton>
                </SafeAreaFlex1>
            </TouchableWithoutFeedback>
        </MainContainer>
    );
}