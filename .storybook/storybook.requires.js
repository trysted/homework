/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
} from "@storybook/react-native";

import "@storybook/addon-ondevice-notes/register";
import "@storybook/addon-ondevice-controls/register";
import "@storybook/addon-ondevice-backgrounds/register";
import "@storybook/addon-ondevice-actions/register";

import { argsEnhancers } from "@storybook/addon-actions/dist/modern/preset/addArgs";

import { decorators, parameters } from "./preview";

if (decorators) {
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

argsEnhancers.forEach((enhancer) => addArgsEnhancer(enhancer));

const getStories = () => {
  return [
    require("../src/shared/ui/core/common-components/placeholer/placeholder.stories.tsx"),
    require("../src/shared/ui/core/common-components/titled-image-item/titled-image-item.stories.tsx"),
    require("../src/shared/ui/core/common-components/loader/loader.stories.tsx"),
    require("../src/shared/ui/core/common-components/error-alert/error-alert.stories.tsx"),
    require("../src/pages/screens/payments/components/categories-list/categories-list.stories.tsx"),
    require("../src/pages/screens/payments/components/header/header.stories.tsx"),
    require("../src/pages/screens/payments/components/payments-template/payments-template.stories.tsx"),
    require("../src/shared/ui/core/typography/typography.stories.tsx"),
  ];
};

configure(getStories, module, false);
