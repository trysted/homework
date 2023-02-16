import { styled } from "@shared/ui/theme";
import { KeyboardListener } from "@shared/types/useKeyboardVisible";
import { Images } from "../../../../assets";
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { ErrorAlert } from "@shared/ui/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@shared/types/types";
import { usePostPassword } from "./api/usePostPassword";
import { $guestToken } from "../pin-code/model";
import { useStore } from "effector-react";
import { setAuthTokens } from './model'

type PasswordScreenProps = NativeStackScreenProps<StackParamList, 'passwordScreen'>

type LogoProps = {
    theme: any,
    isKeyboardVisiable: boolean
}

const MainContainer = styled.KeyboardAvoidingView`
    background-color: ${({theme}) => theme.palette.background.secondary };
    flex: 1;
`

const SafeAreaContainer = styled.SafeAreaView`
    flex: 1;
`

const Logo = styled.Image<LogoProps>`
    height: ${ ({isKeyboardVisiable}) => isKeyboardVisiable ? 11 : 18 }px;
    width: ${ ({isKeyboardVisiable}) => isKeyboardVisiable ? 52 : 88 }px;
    margin-top: ${ ({isKeyboardVisiable, theme}) => theme.spacing(isKeyboardVisiable ? 0 : 2)}px;
    align-self: center;
`

const LogoText = styled.Text<LogoProps>`
    font-size: ${ ({isKeyboardVisiable, theme}) => isKeyboardVisiable ? theme.typography.caption4.size : theme.typography.caption3.size };
    font-family: ${ ({isKeyboardVisiable, theme}) => isKeyboardVisiable ? theme.typography.caption4.fontFamily : theme.typography.caption3.fontFamily };
    letter-spacing: ${ ({isKeyboardVisiable, theme}) => isKeyboardVisiable ? theme.typography.caption4.letterSpacing : theme.typography.caption3.letterSpacing };
    margin-top: ${ ({isKeyboardVisiable, theme}) => theme.spacing(isKeyboardVisiable ? 0.5 : 1)}px;
    color: ${ ({theme}) => theme.palette.text.primary };
    text-align: center;
`
const Flex1 = styled.View`
    flex: 1;
`

const HorizontalFlex1 = styled(Flex1)`
    flex-direction: row;
`

const Button = styled.TouchableOpacity`
    background-color: ${ ({theme}) => theme.palette.button.primary };
    height: 52px;
    border-radius: 26px;
    margin: ${ ({theme}) => theme.spacing(2) }px;
    justify-content: center;
    bottom: 16px;
`
const ButtonTitle = styled.Text`
    align-self: center;
    color: ${ ({theme}) => theme.palette.text.primary };
    font-size: ${ ({theme}) => theme.typography.button.size };
    font-family: ${ ({theme}) => theme.typography.button.fontFamily };
    letter-spacing: ${ ({theme}) => theme.typography.button.letterSpacing };
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

const PhoneView = styled.View`
    background-color: ${ ({theme}) => theme.palette.content.primary };
    border-radius: 26px;
    height: 52px;
    padding: ${ ({theme}) => theme.spacing(2)}px ${({theme}) => theme.spacing(3)}px;
    flex-direction: row;
    flex: 1;
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
const CloseButton = styled.TouchableOpacity`
    width: ${ ({theme}) => theme.spacing(3) }px;
    height: ${ ({theme}) => theme.spacing(3) }px;
    margin-top: ${ ({theme}) => theme.spacing(1.5) }px;
    margin-left: ${ ({theme}) => theme.spacing(2) }px;
    tint-color: ${ ({theme}) => theme.palette.button.secondary };
`
const CloseIcon = styled.Image`
    width: ${ ({theme}) => theme.spacing(3) }px;
    height: ${ ({theme}) => theme.spacing(3) }px;
    tint-color: ${ ({theme}) => theme.palette.button.secondary };
`

const ActivityIndicatorContainer = styled.ActivityIndicator`
    flex: 1;
    justify-self: center;
    align-self: center;
`

export const PasswordScreen = ({navigation}: PasswordScreenProps) => {
    const isKeyboardVisible = KeyboardListener().isKeyboardVisible;
    const [password, setPassword] = useState('')
    const [errorString, setErrorString] = useState<string | undefined>(undefined)
    const [isPassowrdHidden, setIsPassowrdHidden] = useState(true)
    const { mutateAsync: postPssword, isLoading, isError } = usePostPassword()
    const guestToken = useStore($guestToken)

    const handleLogin = () => {
        const specialChars = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;`
        const isSpecialCharsPresent = specialChars.split('').some(char => 
            password.includes(char))

        if (password.length < 5) {
            setErrorString('Длина пароля должна быть не менее 5 символов')
        } else if (isSpecialCharsPresent) {
            setErrorString('Пароль может содержать только цифры и буквы')
        } else {
            postPssword({guestToken: guestToken ?? '', password: password})
                .then((data) => {
                    setAuthTokens(data)
                    navigation.push('successScreen')
            })
        }
    }

    useEffect(() => {
        if (isError) {
            navigation.push('errorScreen')
        }
    }, [isError])

    const handleCloseAlert = () => {
        setErrorString(undefined)
    }

    const onTextChange = (text: string) => {
        setPassword(text)
    }

    const showAlert = () => {
        Alert.alert(
            'Вы точно хотите выйти?',
            undefined,
            [
                {
                    text: 'Отмена',
                    onPress: (_) => {},
                    style: 'cancel'
                },
                {
                    text: 'Выйти',
                    onPress: (_) => {
                        navigation.popToTop()
                    },
                    style: "default"
                }
            ]
            )
    }

    if (isLoading) {
        return (
            <MainContainer>
                <ActivityIndicatorContainer />
            </MainContainer>
        )
    }

    return (
        <MainContainer behavior = 'padding'>
            <ErrorAlert 
                isVisiable = { errorString !== undefined } 
                title = { errorString ?? "" }
                onClose = { handleCloseAlert }
                timeToDismiss = { 2000 }
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaContainer>
                    <CloseButton onPress = { showAlert }>
                        <CloseIcon source = {Images.close}  />
                    </CloseButton>
                    <Logo isKeyboardVisiable = {isKeyboardVisible} source={Images.logo} />
                    <LogoText isKeyboardVisiable = {isKeyboardVisible}>Digital Bank</LogoText>
                    <PassowrdContentContaier>
                    <PhoneView>
                    <Icon source = {Images.lockIc} />
                    <HorizontalFlex1>
                        <PhoneTextInput
                            clearButtonMode = {'never'}
                            keyboardAppearance = 'dark'
                            secureTextEntry = { isPassowrdHidden }
                            onChangeText = { onTextChange }
                            returnKeyType = 'done'
                            autoFocus
                        />
                    </HorizontalFlex1>
                    <TouchableWithoutFeedback onPress = { () => { setIsPassowrdHidden(!isPassowrdHidden) } }>
                        <Icon source = {isPassowrdHidden ? Images.unvisiablePasswordIc : Images.visiablePasswordIc} />
                    </TouchableWithoutFeedback>
            </PhoneView>
        </PassowrdContentContaier>
                    <Flex1/>
                    <Button activeOpacity={ 0.7 } onPress={ handleLogin }>
                        <ButtonTitle>Войти</ButtonTitle>
                    </Button>
                </SafeAreaContainer>
            </TouchableWithoutFeedback>
        </MainContainer>
    );
}