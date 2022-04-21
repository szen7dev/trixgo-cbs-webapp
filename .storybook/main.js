const path = require("path");

async function supportCssModules(config) {
  // console.log('1=================================')
  // console.log('>>>config', config.module.rules)
  // console.log('1=================================')

  config.module.rules.find((rule) => rule.test.toString() === "/\\.css$/").exclude =
    /\.module\.css$/;

  config.module.rules.push({
    test: /\.module\.css$/,
    use: [
      {
        loader: "style-loader",
        options: { injectType: "styleTag", modules: { namedExport: true } },
      },
      {
        loader: "css-loader",
        ident: "[name]_[local]_[hash:base64:5]",
        options: {
          importLoaders: 1,
          modules: true,
        },
      },
			config.module.rules.find((rule) => rule.test.toString() === "/\\.css$/").use[2]
    ],
    include: path.resolve(__dirname, "../"),
  });

  return config;
}
module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  webpackFinal: supportCssModules,
};
