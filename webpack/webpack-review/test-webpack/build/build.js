const webpack = require('webpack');
const webpackDllConfig = require('../config/webpack.dll.conf.js');

function buildDll () {
  return new Promise((resolve, reject) => {
    webpack(webpackDllConfig, (err, stats) => {
      if (err) throw err;
      if (stats.hasErrors()) {
        console.log('Build dll failed with errors.');
        reject();
        process.exit(1);
      }
      resolve();
    })
  });
}

function buildProject () {
  const webpackProdConfig = require('../config/webpack.prod.conf.js');
  webpack(webpackProdConfig, (err, stats) => {
    if (err) throw err;
    if (stats.hasErrors()) {
      console.log('Build project failed with errors.');
      process.exit(1);
    }
    console.log('Build project compalate.')
  });
}

buildDll().then(() => {
  console.log('Build dll compalate.');
  buildProject();
}).catch(err => {
  console.log('Error:', err);
});