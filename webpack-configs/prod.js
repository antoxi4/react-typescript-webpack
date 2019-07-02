const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const cleanDistFolderPlugin = new CleanWebpackPlugin()

module.exports = (env, options) => ({
  plugins: [cleanDistFolderPlugin]
})