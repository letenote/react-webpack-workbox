const webpack = require("webpack");
const commonPaths = require("./paths");

module.exports = {
  mode: "development",
  output: {
    filename: "[name].js",
    path: commonPaths.outputPath_dev,
    publicPath: '/',
    chunkFilename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: {
                  "primary-color": commonPaths.antdModifyVar["primary-color"],
                  "link-color": commonPaths.antdModifyVar["link-color"],
                  "border-radius-base": commonPaths.antdModifyVar["border-radius-base"],
                  "font-size-base": commonPaths.antdModifyVar["font-size-base"],
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              localsConvention: "camelCase",
              // modules: {
              //   localIdentName: "[local]___[hash:base64:5]",
              // },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    contentBase: commonPaths.outputPath_dev,
    compress: true,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};