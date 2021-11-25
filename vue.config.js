module.exports = {
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'service-worker.js',
            // ...other Workbox options...
        }
    }
};