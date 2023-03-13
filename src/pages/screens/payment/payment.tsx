import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@entities/common/models/types";
import { useEffect, useState } from "react";
import { CardSelection, CostView } from "./components";
import { styled } from "@shared/ui/theme";
import { Alert, Platform, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { MaskedPhoneInput, Flex1, ErrorAlert, SafeAreaFlex1, Typography, Button } from "@shared/ui/core";

const SafeAreaContainer = styled(SafeAreaFlex1)`
    background-color: ${ ({theme}) => theme.palette.background.primary };
`

const MainContainer = styled.KeyboardAvoidingView`
    background-color: ${ ({theme}) => theme.palette.background.primary };
`

type PaymentScreenProps = NativeStackScreenProps<StackParamList, 'payment'>

const phoneMustBeFilledError = 'Телефон должен быть заполнен'
const phoneLengthIsShortError = 'Некорректно введён номер телефона'

const costMustBeFilledError = 'Телефон должен быть заполнен'
const invalidConstError = 'Ввдёная сумма должна быть в интервале от 1 до 20 000'

const maxCost = 20000
const phoneNumberCorrectLength = 12

export const Payment = ({route, navigation}: PaymentScreenProps) => {
    const [phone, setPhone] = useState('')
    const [cost, setCost] = useState('')
    const [isFailedValidationPhone, setIsFailedValidationPhone] = useState(false)
    const [isFailedValidationCost, setIsFailedValidationCost] = useState(false)
    const [errors, setErrors] = useState<string[]>([])
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        navigation.setOptions({ title: route.params.service.serviceName })
    }, [])

    const validateValues = () => {
        let alertTitle = 'Успех'
        setIsFailedValidationPhone(false)
        setIsFailedValidationCost(false)

        const phoneErrors = validatePhone()
        const costErrors = validateCost()
        const previousErros = [
            ...errors,
            ...phoneErrors,
            ...costErrors
        ]

        if (previousErros.length  > 0) {
            setErrors(previousErros)
        } else {
            Alert.alert(alertTitle, undefined, [{text: 'OK'}])
        }
    }

    const validatePhone = () => {
        let errors: string[] = []
        const phoneWithoutEmptySpaces = phone.replace(' ', '')

        if (phone.length === 0) {
            errors = [
                ...errors,
                phoneMustBeFilledError
            ]
            setIsFailedValidationPhone(true)
        } else if (phoneWithoutEmptySpaces.length < phoneNumberCorrectLength) {
            errors = [
                ...errors,
                phoneLengthIsShortError
            ]
            setIsFailedValidationPhone(true)
        }

        return errors
    }

    const validateCost = () => {
        let errors: string[] = []

        if (cost.length === 0) {
            errors = [
                ...errors,
                costMustBeFilledError
            ]
            setIsFailedValidationCost(true)
        } else if (Number(cost) < 1 || Number(cost) > maxCost) {
            errors = [
                ...errors,
                invalidConstError
            ]
            setIsFailedValidationCost(true)
        }

        return errors
    }

    const handleAlertClosed = () => {
        if (!errors.length) {
            return
        }

        const copyArr = [...errors];
        copyArr.pop();
        setErrors(copyArr)
    }

    return (
        <SafeAreaContainer>
            <ErrorAlert 
                isVisiable = { Boolean(errors.length) } 
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
                            placeholder = 'Номер телефона'
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
            <Button title = 'Продолжить' onPress = { validateValues } disabled = { false } />
        </SafeAreaContainer>
        

    );
}