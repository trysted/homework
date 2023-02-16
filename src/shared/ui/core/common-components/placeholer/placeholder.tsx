import { styled } from "@shared/ui/theme"

export type PlaceholderProps = {
    message: string,
    action?: {
        title: string,
        actionHandler: () => void
    }
}

const ErrorContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.palette.background.secondary };
`;

const ErrorText = styled.Text`
    text-align: center;
    margin: 0px ${ ({theme}) => theme.spacing(2) }px;
    color: white;
    letter-scaping: ${ ({theme}) => theme.typography.body20.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.body20.fontFamily };
    font-size: ${ ({theme}) => theme.typography.body20.size };
`

const Button = styled.TouchableOpacity`
    background-color: #6C78E6;
    height: 52px;
    border-radius: 26px;
    margin-top: ${ ({theme}) => theme.spacing(2) }px;
`
const ButtonText = styled.Text`
    color: white;
    letter-scaping: ${ ({theme}) => theme.typography.body15Semibold.letterSpacing }px;
    font-family: ${ ({theme}) => theme.typography.body15Semibold.fontFamily };
    font-size: ${ ({theme}) => theme.typography.body15Semibold.size };
    margin: ${ ({theme}) => theme.spacing(2) }px;
`

export const Placeholder = ({ message, action }: PlaceholderProps) => {
    return (
        <ErrorContainer>
            <ErrorText>{message}</ErrorText>
            { action && 
            <Button onPress = { action.actionHandler } activeOpacity = { 0.7 }>
                <ButtonText>{action.title}</ButtonText>
            </Button>}
        </ErrorContainer>
    )
}