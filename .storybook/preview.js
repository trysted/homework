import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';

export const decorators = [withBackgrounds];
export const parameters = {
  backgrounds: [
    { name: 'primary', value: '#FFFFFF' },
    { name: 'gray', value: '#F8F8F8' },
    { name: 'black', value: '#000000', default: true },
  ],
};
