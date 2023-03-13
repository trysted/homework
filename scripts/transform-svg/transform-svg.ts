import fs from 'fs';
import path from 'path';
import svgr, { SvgrOpts, TemplateData } from '@svgr/core';
import { format, Options } from 'prettier';

import { IconTemplate } from './icon-template';

const PRETTIER_CONFIG: Options = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  parser: 'babel',
};

const SVGR_ICON_OPTIONS: SvgrOpts = {
  typescript: true,
  filenameCase: 'kebab',
  expandProps: false,
  native: true,
  template: IconTemplate,
};

type IconFile = {
  data: string;
  filename: string;
};

const INPUT_PATH = path.join(__dirname, 'input');
const OUTPUT_PATH = path.join(__dirname, '../../src/shared/ui/icons');
const ICON_INDEX_PATH = path.join(
  __dirname,
  '../../src/shared/ui/icons/index.ts',
);

const getAllIconPathsInDirectory = (iconPath: string) => {
  const dirContent = fs.readdirSync(iconPath, { withFileTypes: true });

  const allSVGFiles: string[] = dirContent.reduce<string[]>((acc, item) => {
    const itemPath = path.resolve(iconPath, item.name);

    if (item.isDirectory()) {
      return [...acc, ...getAllIconPathsInDirectory(itemPath)];
    }

    if (item.name.includes('.svg')) {
      return [...acc, itemPath];
    }

    return acc;
  }, []);

  return allSVGFiles;
};

const transformIcons = () => {
  if (!fs.existsSync(INPUT_PATH)) {
    fs.mkdirSync(INPUT_PATH);
    console.log(
      '\x1b[33m%s\x1b[0m',
      '⚠️  Input folder was not defined. Add icons and try again',
    );
    return;
  }

  const dirFiles = getAllIconPathsInDirectory(INPUT_PATH);

  if (dirFiles.length === 0) {
    console.log('\x1b[33m%s\x1b[0m', '⚠️  Input folder is empty');
    return;
  }

  const iconFiles: IconFile[] = dirFiles.map(file => {
    const loadedFile = fs.readFileSync(file, { encoding: 'utf8' });
    const filename = path.basename(file, '.svg');
    return {
      data: loadedFile,
      filename,
    };
  });

  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH);
  }

  iconFiles.forEach(file => {
    const iconName =
      'Icon' +
      file.filename.replace(/^\w|-.|_.|\s./g, x => {
        return x.length === 1 ? x.toUpperCase() : x[1].toUpperCase();
      });

    const iconTemplateData: TemplateData = {
      componentName: iconName,
    };

    const icon = svgr.sync(file.data, SVGR_ICON_OPTIONS, iconTemplateData);
    let newIcon = icon.replace(/fillOpacity={0.54}/g, '');
    newIcon = newIcon.replace(/width=\{(.*?)\}/, 'width={size ?? $1}');
    newIcon = newIcon.replace(/height=\{(.*?)\}/, 'height={size ?? $1}');
    newIcon = newIcon.replace(
      /fill=(?!"none")(.*?)\s/gm,
      "fill={color ?? 'rgba(0, 0, 0, 0.54)'} ",
    );
    newIcon = newIcon.replace(/xmlns="(.*?)"/gm, '');
    const formattedIcon = format(newIcon, PRETTIER_CONFIG);
    const formattedFileName = `icon-${file.filename
      .replace(/_|\s/g, '-')
      .toLowerCase()}`;

    fs.writeFileSync(OUTPUT_PATH + `/${formattedFileName}.tsx`, formattedIcon, {
      encoding: 'utf8',
    });

    if (!fs.existsSync(ICON_INDEX_PATH)) {
      fs.writeFileSync(ICON_INDEX_PATH, '', { encoding: 'utf-8' });
    }

    const indexContent = fs.readFileSync(ICON_INDEX_PATH, {
      encoding: 'utf-8',
    });
    const indexIconExport = `export { ${iconName} } from './${formattedFileName}';\n`;

    if (!indexContent.includes(indexIconExport)) {
      fs.writeFileSync(ICON_INDEX_PATH, indexContent + indexIconExport, {
        encoding: 'utf-8',
      });
    }
  });

  console.log('\x1b[32m%s\x1b[0m', '✅  Succefuly added .tsx icons!');
};

// Run script!
transformIcons();
