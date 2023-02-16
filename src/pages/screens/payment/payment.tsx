import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@shared/types/types";
import { useEffect, useState } from "react";
import { CardSelection, CostView } from "./Components";
import { ErrorAlert } from "@shared/ui/core";
import { styled } from "@shared/ui/theme";
import { Alert, Platform, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { MaskedPhoneInput } from "@shared/ui/core";

const SafeAreaContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${ ({theme}) => theme.palette.background.primary };
`

const MainContainer = styled.KeyboardAvoidingView`
    background-color: ${ ({theme}) => theme.palette.background.primary };
`

const Button = styled.TouchableOpacity`
    background-color: ${ ({theme}) => theme.palette.button.primary };
    height: 52px;
    border-radius: 26px;
    margin: ${ ({theme}) => theme.spacing(2) }px;
    justify-content: center;
`
const ButtonTitle = styled.Text`
    align-self: center;
    color: ${ ({theme}) => theme.palette.text.primary };
    font-size: ${ ({theme}) => theme.typography.button.size };
    font-family: ${ ({theme}) => theme.typography.button.fontFamily };
    letter-spacing: ${ ({theme}) => theme.typography.button.letterSpacing };
`

const Flex1 = styled.View`
    flex: 1;
`

type PaymentScreenProps = NativeStackScreenProps<StackParamList, 'payment'>

export const Payment = ({route, navigation}: PaymentScreenProps) => {
    const [phone, setPhone] = useState('')
    const [cost, setCost] = useState('')
    const [isFailedValidationPhone, setIsFailedValidationPhone] = useState(false)
    const [isFailedValidationCost, setIsFailedValidationCost] = useState(false)
    const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false)
    const [errors, setErrors] = useState<string[]>([])
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        navigation.setOptions({ title: route.params.service.serviceName })
    }, [])

    useEffect(() => {
        setIsErrorAlertVisible(errors.length != 0)
    }, [errors])

    const validateValues = () => {
        let alertTitle = 'Успех'
        setIsFailedValidationPhone(false)
        setIsFailedValidationCost(false)
        const phoneWithoutEmptySpaces = phone.replace(' ', '')
        let previousErros = errors 
        if (phone.length === 0) {
            previousErros = [
                ...previousErros,
                'Телефон должен быть заполнен'
            ]
            setIsFailedValidationPhone(true)
        } else if (phoneWithoutEmptySpaces.length < 12) {
            previousErros = [
                ...previousErros,
                'Некорректно введён номер телефона'
            ]
            setIsFailedValidationPhone(true)
        }

        if (cost.length === 0) {
            previousErros = [
                ...previousErros,
                'Сумма должна быть заполнена'
            ]
            setIsFailedValidationCost(true)
        } else if (Number(cost) < 1 || Number(cost) > 20000) {
            previousErros = [
                ...previousErros,
                'Ввдёная сумма должна быть в интервале от 1 до 20 000'
            ]
            setIsFailedValidationCost(true)
        }

        if (previousErros.length  > 0) {
            setIsErrorAlertVisible(true)
            setErrors(previousErros)
        } else {
            Alert.alert(alertTitle, undefined, [{text: 'OK'}])
        }
    }

    const handleAlertClosed = () => {
        setIsErrorAlertVisible(false)
        if (errors.length > 0) {
            const copyArr = [...errors];
            copyArr.pop();
            setErrors(copyArr)
        }
    }

    return (
        <SafeAreaContainer>
            <ErrorAlert 
                isVisiable = { isErrorAlertVisible } 
                title = { errors[errors.length - 1] ?? "" }
                onClose = { handleAlertClosed }
                timeToDismiss = { 2000 }
                />
            <MainContainer 
            keyboardVerticalOffset={headerHeight}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <CardSelection/>
                        <MaskedPhoneInput
                            imageSource = {{uri: route.params.service.serviceIcon}}
                            onValueChanged = {setPhone}
                            isFailedValidation = { isFailedValidationPhone }
                            paddingMultiplier= { 2 }
                            placeholder = {'Номер телефона'}
                            isNeedToUpdateColor = { false }
                            clearButtonMode = 'while-editing'
                            isLoading = { false }
                        />
                        <CostView
                            onValueChanged = {setCost}
                            isFailedOnValidation = { isFailedValidationCost }
                        />
                    </View>
                </TouchableWithoutFeedback>
            </MainContainer>
            <Flex1 />
            <Button activeOpacity = { 0.7 } onPress = { validateValues }>
                <ButtonTitle>Продолжить</ButtonTitle>
            </Button>
        </SafeAreaContainer>
        

    );
}