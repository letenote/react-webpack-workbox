const path = require("path");

module.exports = {
  root: path.resolve(__dirname, "../"),
  outputPath_dev: path.resolve(__dirname, "../", "public"),
  outputPath_prod: path.resolve(__dirname, "../", "build"),
  entryPath: path.resolve(__dirname, "../", "src/index.js"),
  templatePath: path.resolve(__dirname, "../", "public/index.html"),
  imagesFolder: "assets/images",
  fontsFolder: "assets/fonts",
  cssFolder: "assets/css",
  jsFolder: "assets/js",
  favIco: path.resolve(__dirname, "../", "public/assets/images/favicon.ico"),
  appleIcon: path.resolve(
    __dirname,
    "../",
    "public/assets/images/logo512.png"
  ),
  assetManifest: path.resolve(__dirname, "../", "public/asset-manifest.json"),
  manifest: path.resolve(__dirname, "../", "public/manifest.json"),
  _redirects: path.resolve(__dirname, "../", "public/_redirects"),
  antdModifyVar: {
    "primary-color": "#1DA57A",
    "link-color": "#1DA57A",
    "border-radius-base": "2px",
    "font-size-base": "14px",
  }
};
