export default {
    build: {
        outDir: 'dist',
        assetsDir: ''  // build all assets in outDir
    },
    // set a proxy to minio server for the dev server
    server: {
        allowedHosts: ['localhost','bim-app.laptop','bim-app.server'],
        proxy: {
          '/models': 'http://minio:9000'
        }
    }
    
};