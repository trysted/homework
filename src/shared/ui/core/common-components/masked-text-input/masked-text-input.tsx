import { ImageSourcePropType } from "react-native";
import { styled } from "@shared/ui/theme";
import { useState } from "react";
import { Flex1 } from "../flex1";
import { Loader } from "../loader";
import { phoneFormat } from "@shared/libs/phone-formatting";

export type MaskedPhoneInputProps = {
    imageSource?: ImageSourcePropType
    onValueChanged: (value: string) => void
    isFailedValidation: boolean
    isNeedToUpdateColor: boolean
    paddingMultiplier: number
    placeholder: string
    clearButtonMode?: "never" | "while-editing" | "unless-editing" | "always"
    isLoading: boolean,
    loaderColor?: string
};

type PhoneTextInputProps = {
    theme: any
    isFailedValidation: boolean
};

type PhoneViewProps = {
    theme: any
    paddingMultiplier: number
};

type IconProps = {
    theme: any
    isFailedValidation: boolean
};

const ContentContainer = styled.View`
    background-color: ${ ({theme}) => theme.palette.background.secondary };
    padding: ${ ({theme}) => theme.spacing(2) }px;
    flex-direction: row;
    margin-top: ${ ({theme}) => theme.spacing(2) }px;
`

const Icon = styled.Image<IconProps>`
    width: 24px;
    height: 24px;
    align-self: center;
`

const FailableIcon = styled(Icon)`
    tint-color: ${ ({theme, isFailedValidation}) => isFailedValidation ? theme.palette.indicator.error : theme.palette.accent.primary };
`

const PhoneView = styled(Flex1)<PhoneViewProps>`
    background-color: ${ ({theme}) => theme.palette.content.primary };
    border-radius: 26px;
    height: 52px;
    padding: ${ ({theme}) => theme.spacing(2)}px ${ ({theme, paddingMultiplier}) => theme.spacing(paddingMultiplier) }px;
    flex-direction: row;
`
const PhoneTextInput = styled.TextInput<PhoneTextInputProps>`
    letter-scaping: ${ ({theme}) => theme.typography.body15Regular.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.body15Regular.fontFamily };
    font-size: ${ ({theme}) => theme.typography.body15Regular.size };
    flex-grow: ${ ({theme}) => theme.spacing(2) };
    margin-left: ${ ({theme}) => theme.spacing(2) }px;
    color: ${ ({isFailedValidation, theme}) => isFailedValidation ? theme.palette.indicator.error : theme.palette.text.primary };
`

export const MaskedPhoneInput = ({ 
    imageSource,
    onValueChanged,
    isFailedValidation,
    paddingMultiplier, 
    placeholder, 
    isNeedToUpdateColor,
    clearButtonMode,
    isLoading,
    loaderColor
    }: MaskedPhoneInputProps) => {
    const [phone, setPhone] = useState('')
    const phoneMask = "+# (###) ### ## ##"
    const onChangeTextHandler = (text: string) => {
        const phoneText = phoneFormat(text, phoneMask)
        setPhone(phoneText)
        onValueChanged(phoneText)
    }

    return (
        <ContentContainer>
            <PhoneView paddingMultiplier = { paddingMultiplier }>
            { isNeedToUpdateColor ?
            <FailableIcon isFailedValidation = { isFailedValidation } source = {imageSource} /> :
            <Icon isFailedValidation = { false } source = {imageSource} /> }
            <PhoneTextInput isFailedValidation = { isFailedValidation }
            placeholder = { placeholder }
            clearButtonMode = {clearButtonMode}
            placeholderTextColor = { isFailedValidation ? '#FB6176' : '#706D76' }
            keyboardType = 'decimal-pad'
            maxLength = { phoneMask.length }
            onChangeText = { onChangeTextHandler }
            keyboardAppearance = 'dark'
            value = { phone }
            onFocus = { () => {
                setPhone(phone.length == 0 ? '+7 ' : phone)
            }}
            />
            { isLoading ? <Loader stroke = { loaderColor ?? '' } /> : null }          
            </PhoneView>
        </ContentContainer>
    );
}