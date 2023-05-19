import { ComponentMeta, ComponentStory } from "@storybook/react-native";
import { MaskedPhoneInput } from './masked-text-input'
import { styled } from "@shared/ui/theme";
import { Flex1 } from "../flex1";
import { Images } from "../../../../../../assets";

const Wrapper = styled(Flex1)`
  justify-content: center;
`;

const Meta: ComponentMeta<typeof MaskedPhoneInput> = {
    title: 'ui/core/common-components/masked-text-input',
    component: MaskedPhoneInput,
    args: {
        clearButtonMode: 'while-editing',
        imageSource: Images.phoneAuthIc,
        onValueChanged: () => {},
        isFailedValidation: false ,
        paddingMultiplier: 3 ,
        placeholder: 'Телефон',
        isNeedToUpdateColor: true,
        isLoading: false,
        loaderColor: 'FFF',
    }
}

export default Meta;

type MaskedPhoneInputStory = ComponentStory<typeof MaskedPhoneInput>;

export const Default: MaskedPhoneInputStory = args => (
    <Wrapper>
      <MaskedPhoneInput {...args} />
    </Wrapper>
  );