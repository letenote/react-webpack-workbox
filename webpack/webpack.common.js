const webpack = require("webpack");
const convert = require("koa-connect");
const history = require("connect-history-api-fallback");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const commonPaths = require("./paths");

module.exports = {
  entry: ["babel-polyfill", commonPaths.entryPath],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              [
                "import",
                {
                  libraryName: "antd",
                  libraryDirectory: "lib", // lib works better than es
                  style: true, // used when importing less or modifying theme variables
                },
                "antd",
              ],
              [
                // only need if also using ant-design icons
                "import",
                {
                  // this was the best combination
                  libraryName: "@ant-design/icons",
                  libraryDirectory: "",
                  camel2DashComponentName: false,
                },
                "@ant-design/icons",
              ],
            ],
          },
        },
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: commonPaths.fontsFolder,
            },
          },
        ],
      },
    ],
  },
  serve: {
    add: (app) => {
      app.use(convert(history()));
    },
    content: commonPaths.entryPath,
    dev: {
      publicPath: commonPaths.outputPath,
    },
    open: true,
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".css", ".scss"],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "async",
    }),
    new CopyWebpackPlugin([
      { from: commonPaths.favIco, to: commonPaths.imagesFolder },
      { from: commonPaths.appleIcon, to: commonPaths.imagesFolder },
    ]),
  ],
};