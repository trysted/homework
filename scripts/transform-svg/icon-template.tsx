import { TemplateFunc } from '@svgr/core';

export const IconTemplate: TemplateFunc = (
  { template },
  _,
  { imports, componentName, jsx },
) => {
  const typeScriptTpl = template.smart({ plugins: ['typescript', 'jsx'] });

  return typeScriptTpl.ast`
    ${imports[1]}

    import { TBaseIconProps } from './types';

    export const ${componentName} = ({size, color}: TBaseIconProps) => {
      return(${jsx});
    };
  `;
};
