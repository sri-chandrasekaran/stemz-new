const path = require('path');
const BrowserifyLegacyNodeSupport = require('browserify-legacy-node-support');

module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      // "net": BrowserifyLegacyNodeSupport.set('net', require.resolve('net-browserify')),
      // "dns": BrowserifyLegacyNodeSupport.set('dns', require.resolve('dns-browserify'))
      "net": require.resolve('net-browserify'),
      "dns": require.resolve('dns-browserify'),
    }
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // Add any plugins you need here
  ],
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   compress: true,
  //   port: 9000
  // }
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Replaces contentBase
    },
    compress: true,
    port: 9000,
    setupMiddlewares: (middlewares, devServer) => {
      // Add custom middleware here if needed
      console.log('Setting up middlewares');
      return middlewares;
    },
  }
};
