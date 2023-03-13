import React from 'react';
import { View } from 'react-native';
import { getStorybookUI } from '@storybook/react-native';

import './storybook.requires';

export const StorybookUiRoot = getStorybookUI();

export const Storybook = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <StorybookUiRoot />
    </View>
  );
};
