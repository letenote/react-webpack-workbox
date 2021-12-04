const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
// const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const commonPaths = require("./paths");
const MediaQuerySplittingPlugin = require("media-query-splitting-plugin");

module.exports = {
  mode: "production",
  output: {
    filename: `${commonPaths.jsFolder}/[name].[hash].js`,
    path: commonPaths.outputPath_prod,
    publicPath: '/',
    chunkFilename: `${commonPaths.jsFolder}/[name].[chunkhash].js`,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          zindex: false,
        },
        canPrint: true,
      }),
    ],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    // https://stackoverflow.com/questions/48985780/webpack-4-create-vendor-chunk
    // https://dev.to/nikhilkumaran/webpack-optimizations-production-ready-react-app-1jl3
    // https://github.com/ant-design/babel-plugin-import/issues/190
    splitChunks: {
      // add in des 2019
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: "vendors",
      //     chunks: "initial",
      //   },
      //   async: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: "async",
      //     chunks: "async",
      //     minChunks: 4,
      //   },
      // },
      // update in oct 2020 :: split vendor chunk
      cacheGroups: {
        antd: {
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
          name: "antd",
          chunks: "all",
        },
        core: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "core",
          chunks: "all",
        },
        utilVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
          name: "utilVendor",
          chunks: "all",
        },
        vendors: {
          test: /[\\/]node_modules[\\/](!antd)(!react)(!react-dom)(!lodash)(!moment)(!moment-timezone)[\\/]/,
          name: "vendors",
          chunks: "initial",
        },
        async: {
          test: /[\\/]node_modules[\\/](!antd)(!react)(!react-dom)(!lodash)(!moment)(!moment-timezone)[\\/]/,
          name: "async",
          chunks: "async",
          minChunks: 4,
        },
      },
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // add in des 2019
    // runtimeChunk: true,
    // update in oct 2020
    runtimeChunk: {
      name: "chunk",
    },
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              sourceMap: false,
            }
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
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              localsConvention: "camelCase",
              // modules: {
              //   localIdentName: "[local]___[hash:base64:5]",
              // },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: commonPaths.imagesFolder,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${commonPaths.cssFolder}/[name].css`,
      chunkFilename: `${commonPaths.cssFolder}/[name].css`,
    }),
    new MediaQuerySplittingPlugin({
      // This is default config (optional)
      media: {
        mobileEnd: 568,
        tabletPortraitEnd: 768,
        tabletLandscapeEnd: 1024,
      },
      splitTablet: true,
      minify: true,
      units: "px",
    }),
    new ManifestPlugin({
      fileName: commonPaths.assetManifest, // Not to confuse with manifest.json
    }),
    // migration to workbox
    // reff : https://dev.to/divyansh7924/customizing-workbox-with-create-react-app-1ada
    // new SWPrecacheWebpackPlugin({
    //   // By default, a cache-busting query parameter is appended to requests
    //   // used to populate the caches, to ensure the responses are fresh.
    //   // If a URL is already hashed by Webpack, then there is no concern
    //   // about it being stale, and the cache-busting can be skipped.
    //   cacheId: "dash-letedev-xyz-000",
    //   dontCacheBustUrlsMatching: /\.\w{8}\./,
    //   filename: "service-worker.js",
    //   logger(message) {
    //     if (message.indexOf("Total precache size is") === 0) {
    //       // This message occurs for every build and is a bit too noisy.
    //       return;
    //     }
    //     if (message.indexOf("Skipping static resource") === 0) {
    //       // This message obscures real errors so we ignore it.
    //       // https://github.com/facebookincubator/create-react-app/issues/2612
    //       return;
    //     }
    //     console.log(message);
    //   },
    //   minify: true,
    //   // For unknown URLs, fallback to the index page
    //   navigateFallback: "/index.html",
    //   // Ignores URLs starting from /__ (useful for Firebase):
    //   // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
    //   navigateFallbackWhitelist: [/^(?!\/__).*/],
    //   // Don't precache sourcemaps (they're large) and build asset manifest:
    //   staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    // }),
    new CopyWebpackPlugin([
      { from: commonPaths.manifest, to: commonPaths.outputPath_prod },
      { from: commonPaths._redirects, to: commonPaths.outputPath_prod },
    ]),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      // test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 8192,
      minRatio: 0.8,
      cache: true,
    }),
    // Brotli is a compression algorithm originally developed by Google, and offers compression superior to gzip.
    // backend https://nodejs.org/api/zlib.html#zlib_for_brotli_based_streams
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7,
    }),
  ],
  devtool: false,
  // devtool: "source-map",
  performance: {
    hints: "warning",
    // Calculates sizes of gziped bundles.
    assetFilter(assetFilename) {
      return assetFilename.endsWith(".js.gz");
    },
  },
};