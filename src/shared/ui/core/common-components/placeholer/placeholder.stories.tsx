import { ComponentMeta, ComponentStory } from "@storybook/react-native";
import { Placeholder } from "./placeholder";
import { styled } from "@shared/ui/theme";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

const Meta: ComponentMeta<typeof Placeholder> = {
    title: 'ui/core/common-components/placeholder',
    component: Placeholder,
    args: {
        message: 'Не загрузилось',
        action: {
            title: 'Повторить',
            actionHandler: () => {}
        }
    }
}

export default Meta;

type PlaceholderStyory = ComponentStory<typeof Placeholder>;

export const Default: PlaceholderStyory = args => (
    <Placeholder {...args} />
  );