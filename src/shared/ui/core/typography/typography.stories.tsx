import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { styled } from '@shared/ui/theme';

import { Typography as TypographyComponent } from './typography';

const TypographyWithPadding = styled(TypographyComponent)`
  padding: ${({ theme }) => theme.spacing(1.5)}px
    ${({ theme }) => theme.spacing(2)}px;
`;

const Meta = {
  title: 'ui/atoms/Typography',
};

export default Meta;

export const Typography = () => (
  <View>
    <TypographyWithPadding variant="title">Title 34 bold</TypographyWithPadding>
    <TypographyWithPadding variant="largeTitle">
      Large title 28 medium
    </TypographyWithPadding>
    <TypographyWithPadding variant="subtitle1">
      Subtitle 1 20 semibold
    </TypographyWithPadding>
    <TypographyWithPadding variant="subtitle2">
      Subtitle 2 17 semibold
    </TypographyWithPadding>
    <TypographyWithPadding variant="body20">
      Body 20 regular
    </TypographyWithPadding>
    <TypographyWithPadding variant="body17Medium">
      Body 17 medium
    </TypographyWithPadding>
    <TypographyWithPadding variant="body17Regular">
      Body 1 17 regular
    </TypographyWithPadding>
    <TypographyWithPadding variant="body15Regular">
      Body 2 15 regular
    </TypographyWithPadding>
    <TypographyWithPadding variant="body15Semibold">
      Body 15 semibold
    </TypographyWithPadding>
    <TypographyWithPadding variant="caption1">
      Caption 1 13
    </TypographyWithPadding>
    <TypographyWithPadding variant="caption2">
      Caption 2 11
    </TypographyWithPadding>
    <TypographyWithPadding variant="button">Button</TypographyWithPadding>
  </View>
);
