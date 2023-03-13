import { styled } from "@shared/ui/theme"
import { Images } from "../../../../assets"
import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StackParamList } from "@entities/common/models/types"
import { useStore } from "effector-react"
import { $attempts, initialAttemptsCount, resetAttempts, decrimentAttempts, setGuestToken } from "@entities/auth/models"
import { setAuthData, $authData, $phone } from "@entities/auth/models"
import { usePostConfirm, usePostPhone } from "@entities/auth/hooks"
import { Loader, SafeAreaFlex1, Flex1, Typography } from "@shared/ui/core"
import { useTheme } from "styled-components"

type PinCodeProps = NativeStackScreenProps<StackParamList, 'pinCode'>

type RepeatButtonTextProps = {
    theme: any
    isAvailable: boolean
}

type InputTextProps = {
    isFailedValidation: boolean
}

const MainConteiner = styled(SafeAreaFlex1)`
    background-color: ${ ({theme}) => theme.palette.background.primary };
    padding: ${ ({theme}) => theme.spacing(2) }px;
`

const NumberKeyboardButtonText = styled(Typography)`
    text-align: center;
`
const DeleteTextImage = styled.Image`
    width: ${ ({theme}) => theme.spacing(3) }px;
    height: ${ ({theme}) => theme.spacing(3) }px;
`

const RepeatButtonText = styled(Typography)<RepeatButtonTextProps>`
    color: ${ ({theme, isAvailable}) => isAvailable ? theme.palette.text.primary : theme.palette.text.secondary };
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

const Title = styled(Typography)`
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

const InputText = styled(Typography)<InputTextProps>`
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
const ErrorText = styled(Typography)`
    text-align: center;
    margin-top: ${ ({theme}) => theme.spacing(1) }px;
    color: ${ ({theme}) => theme.palette.indicator.error };
`

const LoaderContainer = styled(Flex1)`
    justify-content: center;
    align-self: center;
`

export const PinCode = ({ navigation }: PinCodeProps) => {
    const [code, setCode] = useState('')
    const attempts = useStore($attempts)
    const authData = useStore($authData)
    const phone = useStore($phone)
    const [isFailedValidation, setIsFailedValidation] = useState(false)
    const { mutateAsync: postPhoneConfirm, isLoading } = usePostConfirm()
    const errorString = `Неверный код. Осталось ${attempts} попытки`
    const [seconds, setSeconds] = useState(180)
    const theme = useTheme()

    useEffect(() => {
        if (seconds > 0) {
            const interval = setInterval(() => {
                setSeconds(seconds - 1)
            },1000);
            return () => clearInterval(interval);
        }
        }, [seconds])

    useEffect(() => {
        if (code.length < 4) {
            setIsFailedValidation(false)
            return
        }
        if (code !== authData?.otpCode) {
            setIsFailedValidation(true)
            decrimentAttempts()
            return
        }
        if (phone) {
            postPhoneConfirm({otpId: authData.otpId, pinCode: authData.otpCode, phone: phone}, {
                onSuccess: (data) => {
                    setGuestToken(data)
                    navigation.push('passwordScreen')
                },
                onError: () => {
                    handleError()
                }
            })
        }
    }, [code])

    const handleRepeat = () => {
        if (phone) {
            usePostPhone().mutateAsync(phone, {
                onSuccess: (data) => {
                    setAuthData(data)
                },
                onError: () => {
                    handleError()
                }
            })
        }
        setSeconds(180)
    }

    const getInputContainer = (text: string) => {
        return (
            <InputContainer>
                <InputText variant = 'subtitle1' isFailedValidation = { isFailedValidation }>{text}</InputText>
                { text === '' ? <Flex1 /> : null }
                { text === '' ? <InputLine /> : null }
            </InputContainer>
        )
    }

    const getNumberKeyboardButton = (text: string) => {
        return (
            <NumberKeyboardButton activeOpacity = { 0.7 } onPress = {() => {
                if (code.length < 4) {
                    setCode(code + text)
                }
            }}>
                <NumberKeyboardButtonText variant = 'title'>{text}</NumberKeyboardButtonText>
            </NumberKeyboardButton>
        )
    }

    const getRepeatButtonText = () => {
        if (seconds === 0) {
            return 'Выслать код повторно'
        }
        const minutes = Math.floor(seconds / 60)
        const secondsInMinute = seconds - minutes * 60
        const secondsString = (secondsInMinute < 10 ? '0' : '') + secondsInMinute
        return `Повторить через\n${minutes}:${secondsString}`
    }

    const handleError = () => {
        navigation.push('errorScreen')
    }

    useEffect(() => {
        if (attempts < 0) {
            resetAttempts()
            errorAlert()
        }
    }, [attempts])

    const errorAlert = () => {
        Alert.alert(
            'Вы ввели неверно код 5 раз',
            'Данная сессия авторизации будет сброшена!',
            [
                {
                    text: 'Выход',
                    onPress: navigation.popToTop,
                    style: "default"
                }
            ]
            )
    }

    if (isLoading) {
        return (
            <MainConteiner>
                <LoaderContainer>
                    <Loader stroke = { theme.palette.accent.tertiary } />
                </LoaderContainer>
            </MainConteiner>
        )
    }

    return (
        <MainConteiner>
            <Title variant = 'body15Regular'>На ваш номер отправлено SMS с кодом подтверждения.</Title>

            <PinCodeContainer>
                { getInputContainer(code.charAt(0)) }
                { getInputContainer(code.charAt(1)) }
                <DeviderView />
                { getInputContainer(code.charAt(2)) }
                { getInputContainer(code.charAt(3)) }
            </PinCodeContainer>
            { attempts < initialAttemptsCount ? <ErrorText variant = 'caption2'>{errorString}</ErrorText> : null }

            <Flex1 />
            <ButtonsStack>
                {getNumberKeyboardButton('1')}
                {getNumberKeyboardButton('2')}
                {getNumberKeyboardButton('3')}
            </ButtonsStack>

            <ButtonsStack>
                {getNumberKeyboardButton('4')}
                {getNumberKeyboardButton('5')}
                {getNumberKeyboardButton('6')}
            </ButtonsStack>

            <ButtonsStack>
                {getNumberKeyboardButton('7')}
                {getNumberKeyboardButton('8')}
                {getNumberKeyboardButton('9')}
            </ButtonsStack>

            <ButtonsStack>
                <NumberKeyboardButton activeOpacity = { 0.7 } disabled = { seconds !== 0 } onPress = { handleRepeat }>
                    <RepeatButtonText variant = 'caption1' isAvailable = { seconds === 0 }>{getRepeatButtonText()}</RepeatButtonText>
                </NumberKeyboardButton>
                {getNumberKeyboardButton('0')}
                <NumberKeyboardButton activeOpacity = { 0.7 } onPress = { () => {
                    setCode(code.slice(0, -1))
                }}>
                    <DeleteTextImage source = {Images.deleteText} />
                </NumberKeyboardButton>
            </ButtonsStack>
        </MainConteiner>
    )
}