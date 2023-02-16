import { styled } from "@shared/ui/theme"
import { Images } from "../../../../assets"
import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StackParamList } from "@shared/types/types"
import { useStore } from "effector-react"
import { $attempts, initialAttemptsCount, resetAttempts, updateAttempts, setGuestToken } from './model'
import { setAuthData, $authData, $phone } from "../phone-auth/model"
import { usePostConfirm } from "./api/usePostConfirm"
import { usePostPhone } from "../phone-auth/api/usePostPhone"
import { Loader } from "@shared/ui/core"

type PinCodeProps = NativeStackScreenProps<StackParamList, 'pinCode'>

type RepeatButtonTextProps = {
    theme: any
    isAvailable: boolean
}

type InputTextProps = {
    theme: any,
    isFailedValidation: boolean
}

const MainConteiner = styled.SafeAreaView`
    flex: 1;
    background-color: ${ ({theme}) => theme.palette.background.primary };
    padding: ${ ({theme}) => theme.spacing(2) }px;
`

const Flex1 = styled.View`
    flex: 1;
`

const WhteText = styled.Text`
    color: ${ ({theme}) => theme.palette.text.primary };
`

const NumberKeyboardButtonText = styled(WhteText)`
    letter-scaping: ${ ({theme}) => theme.typography.title.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.title.fontFamily };
    font-size: ${ ({theme}) => theme.typography.title.size };
    text-align: center;
`
const DeleteTextImage = styled.Image`
    width: ${ ({theme}) => theme.spacing(3) }px;
    height: ${ ({theme}) => theme.spacing(3) }px;
`

const RepeatButtonText = styled.Text<RepeatButtonTextProps>`
    color: ${ ({theme, isAvailable}) => isAvailable ? theme.palette.text.primary : theme.palette.text.secondary };
    letter-scaping: ${ ({theme}) => theme.typography.caption1.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.caption1.fontFamily };
    font-size: ${ ({theme}) => theme.typography.caption1.size };
    text-align: center;
`

const NumberKeyboardButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 68px;
`

const ButtonsStack = styled.View`
    flex-direction: row;
`

const Title = styled(WhteText)`
    letter-scaping: ${ ({theme}) => theme.typography.body15Regular.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.body15Regular.fontFamily };
    font-size: ${ ({theme}) => theme.typography.body15Regular.size };
    text-align: center;
    margin: ${ ({theme}) => theme.spacing(17.5) }px ${ ({theme}) => theme.spacing(2) }px ${ ({theme}) => theme.spacing(3) }px;
`

const PinCodeContainer = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: center;
    height: ${ ({theme}) => theme.spacing(6) }px;
`

const InputContainer = styled.View`
    width: ${ ({theme}) => theme.spacing(5) }px;
    height: ${ ({theme}) => theme.spacing(6) }px;
    border-radius: 12px;
    background-color: ${ ({theme}) => theme.palette.content.secondary };
    margin: 0px 3px;
    justify-content: center;
`

const InputText = styled.Text<InputTextProps>`
    letter-scaping: ${ ({theme}) => theme.typography.subtitle1.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.subtitle1.fontFamily };
    font-size: ${ ({theme}) => theme.typography.subtitle1.size };
    text-align: center;
    color: ${ ({theme, isFailedValidation}) => isFailedValidation ? theme.palette.indicator.error : theme.palette.text.primary };
`

const InputLine = styled.View`
    width: ${ ({theme}) => theme.spacing(3) }px;
    height: 1px;
    background-color: ${ ({theme}) => theme.palette.accent.primary };
    margin-bottom: 10px;
    margin-left: ${ ({theme}) => theme.spacing(1) }px;
    margin-right: ${ ({theme}) => theme.spacing(1) }px;
`
const DeviderView = styled.View`
    width: 10px;
    height: 2px;
    background-color: ${ ({theme}) => theme.palette.content.tertiary };
    margin: 0px 3px;
`
const ErrorText = styled.Text`
    letter-scaping: ${ ({theme}) => theme.typography.caption2.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.caption2.fontFamily };
    font-size: ${ ({theme}) => theme.typography.caption2.size };
    text-align: center;
    margin-top: ${ ({theme}) => theme.spacing(1) }px;
    color: ${ ({theme}) => theme.palette.indicator.error };
`

const LoaderContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-self: center;
`

export const PinCode = ({ navigation }: PinCodeProps) => {
    const [code, setCode] = useState('')
    const attempts = useStore($attempts)
    const authData = useStore($authData)
    const phone = useStore($phone)
    const [isFailedValidation, setIsFailedValidation] = useState(false)
    const { mutateAsync: postPhoneConfirm, isLoading, isError } = usePostConfirm()
    const { mutateAsync: postPhoneMutation, isError: isPostPhoneError } = usePostPhone()
    const errorString = `Неверный код. Осталось ${attempts} попытки`
    const [timer, setTimer] = useState()
    const [seconds, setSeconds] = useState(180)

    useEffect(() => {
        if (seconds > 0) {
            const interval = setInterval(() => {
                setSeconds(seconds - 1)
            },1000);
            return () => clearInterval(interval);
        }
        }, [seconds])

    useEffect(() => {
        if (code.length === 4) {
            if (code !== authData?.otpCode) {
                setIsFailedValidation(true)
                updateAttempts()
            } else {
                postPhoneConfirm({otpId: authData.otpId, pinCode: authData.otpCode, phone: phone ?? ''}).then((data) => {
                    setGuestToken(data)
                    navigation.push('passwordScreen')
                })
            }
        } else {
            setIsFailedValidation(false)
        }
    }, [code])

    const numberKeyboardButton = (text: string) => {
        return (
            <NumberKeyboardButton activeOpacity = { 0.7 } onPress = {() => {
                if (code.length < 4) {
                    setCode(code + text)
                }
            }}>
                <NumberKeyboardButtonText>{text}</NumberKeyboardButtonText>
            </NumberKeyboardButton>
        )
    }

    const handleRepeat = () => {
        postPhoneMutation(phone ?? '').then((data) => {
            setAuthData(data)
        })
        setSeconds(180)
    }

    const inputContainer = (text: string) => {
        return (
            <InputContainer>
                <InputText isFailedValidation = { isFailedValidation }>{text}</InputText>
                { text === '' && <Flex1 /> }
                { text === '' && <InputLine /> }
            </InputContainer>
        )
    }

    const repeatButtonText = () => {
        if (seconds === 0) {
            return 'Выслать код повторно'
        } else {
            const minutes = Math.floor(seconds / 60)
            const secondsInMinute = seconds - minutes * 60
            const secondsString = (secondsInMinute < 10 ? '0' : '') + secondsInMinute
            return `Повторить через\n${minutes}:${secondsString}`
        }
    }

    useEffect(() => {
        if (attempts < 0) {
            resetAttempts()
            errorAlert()
        }
    }, [attempts])

    useEffect(() => {
        if (isError || isPostPhoneError) {
            navigation.push('errorScreen')
        }
    }, [isError, isPostPhoneError])

    const errorAlert = () => {
        Alert.alert(
            'Вы ввели неверно код 5 раз',
            'Данная сессия авторизации будет сброшена!',
            [
                {
                    text: 'Выход',
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
            <MainConteiner>
                <LoaderContainer>
                    <Loader stroke = {'#FFFFFF'} />
                </LoaderContainer>
            </MainConteiner>
        )
    }

    return (
        <MainConteiner>
            <Title>На ваш номер отправлено SMS с кодом подтверждения.</Title>

            <PinCodeContainer>
                { inputContainer(code.charAt(0)) }
                { inputContainer(code.charAt(1)) }
                <DeviderView />
                { inputContainer(code.charAt(2)) }
                { inputContainer(code.charAt(3)) }
            </PinCodeContainer>
            { attempts < initialAttemptsCount && <ErrorText>{errorString}</ErrorText> }

            <Flex1 />
            <ButtonsStack>
                {numberKeyboardButton('1')}
                {numberKeyboardButton('2')}
                {numberKeyboardButton('3')}
            </ButtonsStack>

            <ButtonsStack>
                {numberKeyboardButton('4')}
                {numberKeyboardButton('5')}
                {numberKeyboardButton('6')}
            </ButtonsStack>

            <ButtonsStack>
                {numberKeyboardButton('7')}
                {numberKeyboardButton('8')}
                {numberKeyboardButton('9')}
            </ButtonsStack>

            <ButtonsStack>
                <NumberKeyboardButton activeOpacity = { 0.7 } disabled = { seconds !== 0 } onPress = { handleRepeat }>
                    <RepeatButtonText  isAvailable = { seconds === 0 }>{repeatButtonText()}</RepeatButtonText>
                </NumberKeyboardButton>
                {numberKeyboardButton('0')}
                <NumberKeyboardButton activeOpacity = { 0.7 } onPress = { () => {
                    setCode(code.slice(0, -1))
                }}>
                    <DeleteTextImage source = {Images.deleteText} />
                </NumberKeyboardButton>
            </ButtonsStack>
        </MainConteiner>
    )
}