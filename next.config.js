const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  env: {
    apiKey: "AIzaSyCloj41veMk6Umx8QkxihzofFzu0-gFjig",
    authDomain: "inventory-management-sys-dc576.firebaseapp.com",
    projectId: "inventory-management-sys-dc576",
    storageBucket: "inventory-management-sys-dc576.appspot.com",
    messagingSenderId: "222111447867",
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
