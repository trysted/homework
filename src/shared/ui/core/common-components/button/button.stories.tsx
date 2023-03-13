import { ComponentMeta, ComponentStory } from "@storybook/react-native";
import { Button } from './button'
import { styled } from "@shared/ui/theme";
import { Flex1 } from "../flex1";

const Wrapper = styled(Flex1)`
  justify-content: center;
`;

const Meta: ComponentMeta<typeof Button> = {
    title: 'ui/core/common-components/button',
    component: Button,
    args: {
        disabled: false,
        onPress: () => {},
        title: 'Продолжить'
    }
}

export default Meta;

type ButtonStory = ComponentStory<typeof Button>;

export const Default: ButtonStory = args => (
    <Wrapper>
      <Button {...args} />
    </Wrapper>
  );