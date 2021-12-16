//const path = require('path');

module.exports = {
    //outputDir: path.resolve(__dirname, 'test_build'),
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'service-worker.js',
            // ...other Workbox options...
            exclude: [/\.htaccess/, /\/.+\.map/]
        }
    }
};