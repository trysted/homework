import { ComponentMeta, ComponentStory } from "@storybook/react-native";
import { Loader } from "./loader";
import { styled } from "@shared/ui/theme";

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.palette.background.secondary};
  justify-content: center;
  align-items: center;
`;

const Meta: ComponentMeta<typeof Loader> = {
    title: 'ui/core/common-components/loader',
    component: Loader,
    args: {
        stroke: '#FFF'
    }
} 

export default Meta;

type LoaderStory = ComponentStory<typeof Loader>;

export const Default: LoaderStory = args => (
    <Wrapper>
      <Loader {...args} />
    </Wrapper>
);