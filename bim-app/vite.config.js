export default {
    build: {
        outDir: 'dist',
        assetsDir: ''  // build all assets in outDir
    },
    // set a proxy to minio server for the dev server
    server: {
        proxy: {
          '/models': 'http://minio:9000'
        }
    }
};