import { styled } from "@shared/ui/theme"

export const Separator = styled.View`
    border-radius: 0.5px;
    background-color: ${ ({ theme }) => theme.palette.content.secondary };
    height: 1px;
    margin-right: ${ ({theme}) => theme.spacing(2) }px;
    margin-left: ${ ({theme}) => theme.spacing(9) }px
`