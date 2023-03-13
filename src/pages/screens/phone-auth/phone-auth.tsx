import { styled } from "@shared/ui/theme";
import { KeyboardListener } from "@entities/common/hooks/use-keyboard-visible";
import { Images } from "../../../../assets";
import { Button, KeyboardAvoadingViewFlex1, MaskedPhoneInput, Typography } from "@shared/ui/core";
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { ErrorAlert, Flex1, SafeAreaFlex1 } from "@shared/ui/core";
import { usePostPhone } from "../../../entities/auth/hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@entities/common/models/types";
import { resetAttempts, setAuthData, resetAuthData, resetPhone, resetAuthTokensData, resetGuestToken, setPhone } from "@entities/auth/models";
import { useTheme } from "styled-components";

type PhoneAuthProps = NativeStackScreenProps<StackParamList, 'phoneAuth'>

type LogoProps = {
    isKeyboardVisiable: boolean
}

const MainContainer = styled(KeyboardAvoadingViewFlex1)`
    background-color: ${({theme}) => theme.palette.background.secondary };
`

const Logo = styled.Image<LogoProps>`
    height: ${ ({isKeyboardVisiable}) => isKeyboardVisiable ? 11 : 18 }px;
    width: ${ ({isKeyboardVisiable}) => isKeyboardVisiable ? 52 : 88 }px;
    margin-top: ${ ({isKeyboardVisiable, theme}) => theme.spacing(isKeyboardVisiable ? 7 : 9)}px;
    align-self: center;
`

const LogoText = styled(Typography)<LogoProps>`
    margin-top: ${ ({isKeyboardVisiable, theme}) => theme.spacing(isKeyboardVisiable ? 0.5 : 1)}px;
    color: ${ ({theme}) => theme.palette.text.primary };
    text-align: center;
`

const ContinueButton = styled(Button)`
    bottom: 16px;
`

export const PhoneAuth = ({navigation}: PhoneAuthProps) => {
    const isKeyboardVisible = KeyboardListener().isKeyboardVisible;
    const [phoneString, setPhoneString] = useState('')
    const [isFailedValidationPhone, setIsFailedValidationPhone]= useState(false)
    const [errorString, setErrorString] = useState<string | null>(null)
    const { mutateAsync: postPhoneMutation, isLoading } = usePostPhone()
    const theme = useTheme()

    const handleLogin = () => {
        const numbers = phoneString.match(/\d/g)?.join('') ?? '';
        setIsFailedValidationPhone(false)

        if (numbers.length <= 10) {
            setErrorString('Пожалуйста, убедитесь, что вы правильно ввели номер телефона')
            setIsFailedValidationPhone(true)
        } else {
            const numbersString = '+' + numbers
            postPhoneMutation(numbersString, {
                onSuccess: (data) => {
                    setAuthData(data)
                    setPhone(numbersString)
                    navigation.push('pinCode')
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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            resetAuthData()
            resetPhone()
            resetAttempts()
            resetAuthTokensData()
            resetGuestToken()
        });
    
        return unsubscribe;
    }, [navigation]);

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
                    <Logo isKeyboardVisiable = {isKeyboardVisible} source={Images.logo} />
                    <LogoText variant = {isKeyboardVisible ? 'caption4' : 'caption3' } isKeyboardVisiable = {isKeyboardVisible}>Digital Bank</LogoText>
                    <MaskedPhoneInput
                        imageSource = {Images.phoneAuthIc}
                        onValueChanged = {setPhoneString}
                        isFailedValidation = { isFailedValidationPhone }
                        paddingMultiplier= { 3 }
                        placeholder = 'Телефон'
                        isNeedToUpdateColor = { true }
                        clearButtonMode = 'never'
                        isLoading = { isLoading }
                        laoderColor = { theme.palette.accent.primary }
                    />
                    <Flex1/>
                    <ContinueButton title = { 'Войти' } onPress = { handleLogin } disabled = { isLoading } />
                </SafeAreaFlex1>
            </TouchableWithoutFeedback>
        </MainContainer>
    );
}