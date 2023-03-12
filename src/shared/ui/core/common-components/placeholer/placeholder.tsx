import { styled } from "@shared/ui/theme"
import { Flex1 } from "../flex1";
import { Typography } from "../../typography";
import { Button } from "../button";

export type PlaceholderProps = {
    message: string,
    action?: {
        title: string,
        actionHandler: () => void
    }
}

const ErrorContainer = styled(Flex1)`
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.palette.background.secondary };
`;

const ErrorText = styled(Typography)`
    text-align: center;
    margin: 0px ${ ({theme}) => theme.spacing(2) }px;
`

export const Placeholder = ({ message, action }: PlaceholderProps) => {
    return (
        <ErrorContainer>
            <ErrorText variant = 'body20'>{message}</ErrorText>
            { action ? <Button onPress = { action.actionHandler } title = { action.title } disabled = { Boolean(action) } /> : null }
        </ErrorContainer>
    )
}