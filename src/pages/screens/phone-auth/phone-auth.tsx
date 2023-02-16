import { styled } from "@shared/ui/theme";
import { KeyboardListener } from "@shared/types/useKeyboardVisible";
import { Images } from "../../../../assets";
import { MaskedPhoneInput } from "@shared/ui/core";
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { ErrorAlert } from "@shared/ui/core";
import { usePostPhone } from "./api/usePostPhone";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@shared/types/types";
import { setAuthData } from "./model";

type PhoneAuthProps = NativeStackScreenProps<StackParamList, 'phoneAuth'>

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
    margin-top: ${ ({isKeyboardVisiable, theme}) => theme.spacing(isKeyboardVisiable ? 7 : 9)}px;
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

export const PhoneAuth = ({navigation}: PhoneAuthProps) => {
    const isKeyboardVisible = KeyboardListener().isKeyboardVisible;
    const [phone, setPhone] = useState('')
    const [isFailedValidationPhone, setIsFailedValidationPhone]= useState(false)
    const [errorString, setErrorString] = useState<string | undefined>(undefined)
    const { mutateAsync: postPhoneMutation, isLoading, isError } = usePostPhone()

    const handleLogin = () => {
        const numbers = phone.match(/\d/g)?.join('') ?? '';
        setIsFailedValidationPhone(false)

        if (numbers.length <= 10) {
            setErrorString('Пожалуйста, убедитесь, что вы правильно ввели номер телефона')
            setIsFailedValidationPhone(true)
        } else {
            const numbersString = '+' + numbers
            postPhoneMutation(numbersString).then((data) => {
                setAuthData(data)
                setPhone(numbersString)
                navigation.push('pinCode')
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
                    <Logo isKeyboardVisiable = {isKeyboardVisible} source={Images.logo} />
                    <LogoText isKeyboardVisiable = {isKeyboardVisible}>Digital Bank</LogoText>
                    <MaskedPhoneInput
                        imageSource = {Images.phoneAuthIc}
                        onValueChanged = {setPhone}
                        isFailedValidation = { isFailedValidationPhone }
                        paddingMultiplier= { 3 }
                        placeholder = {'Телефон'}
                        isNeedToUpdateColor = { true }
                        clearButtonMode = 'never'
                        isLoading = { isLoading }
                        laoderColor = '#6C78E6'
                    />
                    <Flex1/>
                    <Button activeOpacity={ 0.7 } onPress={ handleLogin } disabled = { isLoading }>
                        <ButtonTitle>Войти</ButtonTitle>
                    </Button>
                </SafeAreaContainer>
            </TouchableWithoutFeedback>
        </MainContainer>
    );
}