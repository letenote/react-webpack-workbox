const workboxBuild = require('workbox-build');
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  workboxBuild.injectManifest({
      // this is your sw template file
      swSrc: 'workbox/sw-template.js',
      // this will be created in the build step
      swDest: 'build/service-worker.js',
      globDirectory: 'build',
      // precaching jpg files
      globPatterns: ["**/*.{css,js,html,ttf,jpg,jpeg,png,ico,webp}"],
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    })
    .catch(console.error);
};
buildSW();