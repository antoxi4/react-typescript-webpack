const path = require('path')

module.exports = (env, options) => ({
  devtool: 'source-map',
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  devServer: {
    contentBase: path.resolve('dist'),
    port: process.env.PORT || 3000,
    hot: true,
    host: '0.0.0.0',
    proxy: {
      '/api': process.env.BE_URL || 'http://localhost:3001'
    }
  }
})