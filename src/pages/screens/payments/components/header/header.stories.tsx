import { ComponentMeta, ComponentStory } from "@storybook/react-native";
import { PaymentsHeader } from "./header";
import styled from "styled-components";
import { Flex1 } from "@shared/ui/core";

const Wrapper = styled(Flex1)`
    background-color: ${ ({theme}) => theme.palette.background.secondary };
`;

const Meta: ComponentMeta<typeof PaymentsHeader> = {
    title: 'pages/screens/payments/components/header',
    component: PaymentsHeader,
    args: {
        title: 'Платежи'
    }
}

export default Meta;

type PaymentsHeaderStyory = ComponentStory<typeof PaymentsHeader>;

export const Default: PaymentsHeaderStyory = args => (
    <Wrapper>
        <PaymentsHeader {...args} />
    </Wrapper>
);