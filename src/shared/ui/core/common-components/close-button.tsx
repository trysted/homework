import { styled } from "@shared/ui/theme"
import { Images } from "../../../../../assets"

type CloseButtonProps = {
    onPress: () => void
}

const CloseButtonContainer = styled.TouchableOpacity`
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

export const CloseButton = ({onPress}: CloseButtonProps) => {
    return (
        <CloseButtonContainer activeOpacity = { 0.7 } onPress = { onPress }>
            <CloseIcon source={Images.close}/>
        </CloseButtonContainer>
    )
}