import { Typography } from "@shared/ui/core"
import { styled } from "@shared/ui/theme"
import { View } from "react-native"

const Header = styled.View`
    background-color: ${ ({theme}) => theme.palette.background.primary };
    height: 116px;
    justify-content: flex-end;
`
const HeaderText = styled(Typography)`
    margin: 0px ${ ({theme}) => theme.spacing(2) }px;
`

type PaymentsHeaderProps = {
    title: string
}

export const PaymentsHeader = ({title}: PaymentsHeaderProps) => {
    return (
        <View>
            <Header>
                <HeaderText variant = 'title'>{title}</HeaderText>
            </Header>
        </View>
    )
}