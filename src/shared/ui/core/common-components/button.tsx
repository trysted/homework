import { TouchableOpacity } from "react-native"
import { styled } from "../../theme"
import { Typography } from "../typography"

type ButtonProps = {
    title: string
    onPress: () => void
    disabled: boolean
}

const Container = styled.TouchableOpacity`
    background-color: ${ ({theme}) => theme.palette.button.primary };
    height: 52px;
    border-radius: 26px;
    margin: ${ ({theme}) => theme.spacing(2) }px;
    justify-content: center;
`

const ButtonTitle = styled(Typography)`
    text-align: center;
    margin-left: 16px;
    margin-right: 16px;
`

export const Button = ({title, onPress, disabled}: ButtonProps) => {
    return (
        <Container activeOpacity = { 0.7 } onPress = { onPress } disabled = { disabled }>
            <ButtonTitle variant = 'button'>{title}</ButtonTitle>
        </Container>
    )
}