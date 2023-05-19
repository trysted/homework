import { ComponentMeta, ComponentStory } from "@storybook/react-native";
import { TitledImageItem } from "./titled-image-item";
import { styled } from "@shared/ui/theme";
import { Flex1 } from "../flex1";

const Wrapper = styled(Flex1)`
  justify-content: center;
`;

const Meta: ComponentMeta<typeof TitledImageItem> = {
    title: 'ui/core/common-components/titled-image-item',
    component: TitledImageItem,
    args: {
        isSmallImage: true,
        title: 'МТС',
        source: 'https://github.com/kode-frontend/files/raw/main/MTS.png',
        onClick: () => {}
    }
}

export default Meta;

type TitledImageItemStory = ComponentStory<typeof TitledImageItem>;

export const Default: TitledImageItemStory = args => (
    <Wrapper>
      <TitledImageItem {...args} />
    </Wrapper>
  );