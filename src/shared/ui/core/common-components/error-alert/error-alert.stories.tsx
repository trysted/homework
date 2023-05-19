import { ComponentMeta, ComponentStory } from "@storybook/react-native";
import { ErrorAlert } from "./error-alert";
import { styled } from "@shared/ui/theme";

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.palette.background.secondary};
`;

const Meta: ComponentMeta<typeof ErrorAlert> = {
    title: 'ui/core/common-components/error-alert',
    component: ErrorAlert,
    args: {
        isVisible: false,
        title: 'Ошибка!',
        timeToDismiss: 2000,
        onClose: () => {}
    }
} 

export default Meta;

type ErrorAlertStory = ComponentStory<typeof ErrorAlert>;

export const Default: ErrorAlertStory = args => (
    <Wrapper>
      <ErrorAlert {...args} />
    </Wrapper>
);