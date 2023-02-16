import { TouchableWithoutFeedback } from "react-native";
import { styled } from "@shared/ui/theme";

type TitledImageItemProps = {
    isSmallImage: boolean
    title: string,
    source: string,
    onClick: () => void
}

const Container = styled.View`
    background-color: ${ ({theme}) => theme.palette.background.secondary };
    flex-direction: row;
    align-items: center;
    padding: ${ ({theme}) => theme.spacing(2) }px;
`

const BigImage = styled.Image`
    width: ${ ({theme}) => theme.spacing(5) }px;
    height: ${ ({theme}) => theme.spacing(5) }px;
    border-radius: 20px;
`

const SmallImage = styled.Image`
    width: ${ ({theme}) => theme.spacing(3) }px;
    height: ${ ({theme}) => theme.spacing(3) }px;
`

const ImageContainer = styled.View`
    background-color: ${ ({theme}) => theme.palette.content.secondary };
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: ${ ({theme}) => theme.spacing(5) }px;
    height: ${ ({theme}) => theme.spacing(5) }px;
`

const WhiteText = styled.Text`
    color: white;
    letter-scaping: ${ ({theme}) => theme.typography.body15Regular.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.body15Regular.fontFamily };
    font-size: ${ ({theme}) => theme.typography.body15Regular.size };
    padding-left: ${ ({theme}) => theme.spacing(2) }px;
`

export const TitledImageItem = ({ isSmallImage, title, source, onClick }: TitledImageItemProps) => {
    return (
        <TouchableWithoutFeedback onPress={ onClick }>
        <Container>
            <ImageContainer>
                { !isSmallImage &&  <BigImage source= {{uri: source}} /> }
                { isSmallImage &&  <SmallImage source= {{uri: source}} /> }
            </ImageContainer>
            <WhiteText>{title}</WhiteText>
        </Container>
        </TouchableWithoutFeedback>
    );
}