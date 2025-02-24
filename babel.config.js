module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './assets',
            '@components': './components',
            '@constants': './constants',
            '@shared': './shared',
            '@api': './api',
            '@storage': './storage',
          },
        },
      ],
    ],
  };
};
