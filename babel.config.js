module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@shared': './src/shared',
            '@entities': './src/entities',
            '@features': './src/features',
            '@widgets': './src/widgets',
            '@pages': './src/pages',
            '@processes': './src/processes',
            '@app': './src/app',
          },
        },
      ],
    ],
  };
};