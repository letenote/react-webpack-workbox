const workboxBuild = require('workbox-build');
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  workboxBuild
    .injectManifest({
      swSrc: 'workbox/sw-template.js', // this is your sw template file
      swDest: 'build/service-worker.js', // this will be created in the build step
      globDirectory: 'build',
      globPatterns: ["**/*.{css,js,html,jpg,jpeg,png,ico,webp}"], // precaching jpg files
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    })
    .catch(console.error);
};
buildSW();