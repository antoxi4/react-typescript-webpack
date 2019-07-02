const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

const entryPath = path.resolve('src/index.tsx')
const outputPath = path.resolve('dist/')
const outputFileName = 'static/js/[name].[hash].bundle.js'
const htmlFilePath = path.resolve('src/public/index.html')

const progressPlugin = new webpack.ProgressPlugin()
const htmlPlugin = new HtmlWebpackPlugin({
  template: htmlFilePath,
  favicon: path.resolve('src/public/assets/images/favicon.png'),
})
const environmentsPlugin = (options) => new webpack.DefinePlugin({
  'process.env': {
    MODE: JSON.stringify(options.mode)
  }
})

module.exports = (env, options) => ({
  entry: entryPath,
  output: {
    path: outputPath,
    filename: outputFileName,
    chunkFilename: outputFileName,
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      {
        test: /\.(css|scss)$/i,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: true,
              reloadAll: true,
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                context: path.resolve(__dirname, 'src'),
              },
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/assets/images',
              name: '[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(otf|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/assets/fonts',
              name: '[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve('src/')
    },
    modules: [path.resolve('src/'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
  },
  optimization: {
    namedChunks: true,
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendors: {
          reuseExistingChunk: true,
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module.identifier().split('/').reduceRight(item => item);
            return `${cacheGroupKey}-${moduleFileName}`;
          },
          enforce: true
        },
      },
    }
  },
  plugins: [progressPlugin, htmlPlugin, environmentsPlugin(options), new ExtractCssChunks(
    {
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/assets/css/[name].css',
      chunkFilename: 'static/assets/css/[id].css',
      orderWarning: true, // Disable to remove warnings about conflicting order between imports
    }
  ),]
})