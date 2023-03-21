import { Flex1 } from "@shared/ui/core";
import { styled } from "@shared/ui/theme";
import { CategoriesList } from "../categories-list";
import { PaymentsHeader } from "../header";
import { ComponentProps } from "react";

const Container = styled(Flex1)`
    background-color: ${ ({theme}) => theme.palette.background.secondary };
`
const ActivityIndicatorContainer = styled(Container)`
    justify-content: center;
    align-self: center;
`

type PaymentsProps = {
    header: ComponentProps<typeof PaymentsHeader>;
    categories: ComponentProps<typeof CategoriesList>;
};

export const PaymentsTemplate = ({header, categories}: PaymentsProps) => {
    return (
        <Container>
            <PaymentsHeader {...header}/>
            <CategoriesList {...categories} />
        </Container>
    )
}