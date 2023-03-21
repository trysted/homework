import { ComponentMeta, ComponentStory } from "@storybook/react-native";
import { Placeholder } from "./placeholder";

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

type PlaceholderStory = ComponentStory<typeof Placeholder>;

export const Default: PlaceholderStory = args => (
    <Placeholder {...args} />
);