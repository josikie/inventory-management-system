const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  env: {
    apiKey: "AIzaSyC-4mngdpLzaeiUw8mGOLh5TMGvAMT9aRg",
    authDomain: "ims-new-40075.firebaseapp.com",
    projectId: "ims-new-40075",
    storageBucket: "ims-new-40075.appspot.com",
    messagingSenderId: "164135573297",
    appId: "1:222111447867:web:13dfe4db4d8d1fc813951e"
  },
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
