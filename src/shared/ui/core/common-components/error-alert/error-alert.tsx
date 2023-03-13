import { TouchableWithoutFeedback } from "react-native";
import { Images } from "../../../../../../assets";
import { useEffect, useState } from "react";
import { styled } from "@shared/ui/theme";
import Modal from "react-native-modal";
import { Flex1, SafeAreaFlex1 } from "../flex1";
import { Typography } from "../../typography";

type ErrorAlertProps = {
    isVisiable: boolean,
    title: string,
    onClose: () => void,
    timeToDismiss?: number
};

const TouchableContainer = styled.TouchableOpacity`
    flex: 1;
`

const MainContainer = styled(SafeAreaFlex1)`
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    zIndex: 1;
`

const ContentContainer = styled.View`
    flex-direction: row;
    background-color: ${ ({theme}) => theme.palette.indicator.error };
    border-radius: 13px;
    padding: ${ ({theme}) => theme.spacing(2) }px;
    justify-content: space-between;
`

const CloseIcon = styled.Image`
    width: 16px;
    height: 16px;
    tint-color: ${ ({theme}) => theme.palette.text.primary };
`

const CloseContainer = styled.TouchableOpacity`
    padding-left: 16px;
    justify-content: center;
`

export const ErrorAlert = ({ isVisiable, title, onClose, timeToDismiss }: ErrorAlertProps) => {
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined)
    const [visible, setVisiable] = useState(isVisiable)

    const handleClose = () => {
        clearInterval(timer)
        setTimer(undefined)
        setVisiable(false)
        onClose()
    }

    const handleStart = () => {
        if (timeToDismiss) {
            const timer = setTimeout(() => { handleClose() }, timeToDismiss)
            setTimer(timer)
        }
    }

    useEffect(() => {
        setVisiable(isVisiable)
        if (isVisiable) {
            handleStart()
        }
    }, [isVisiable])

    return (
        <Modal isVisible = { visible } animationIn = { 'slideInDown' } animationOut = { 'slideOutUp' } hasBackdrop = { false }>
            <MainContainer>
                <TouchableContainer onPress = { handleClose } activeOpacity = { 1 }>
                    <TouchableWithoutFeedback>
                        <ContentContainer>
                            <Flex1>
                                <Typography variant = 'body15Regular'>{title}</Typography>
                            </Flex1>
                            <CloseContainer onPress = { handleClose }>
                                <CloseIcon source= { Images.close }/>
                            </CloseContainer>
                        </ContentContainer>
                    </TouchableWithoutFeedback>
                </TouchableContainer>
            </MainContainer>
        </Modal>
    );
}
