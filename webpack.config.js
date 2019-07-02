const merge = require('webpack-merge')

const configFilePaths = {
  common: './webpack-configs/common',
  production: './webpack-configs/prod',
  development: './webpack-configs/dev'
}

module.exports = (env, options) => {
  const { mode } = options
  const modeConfigPath = configFilePaths[mode]
  const modeConfig = require(modeConfigPath)
  const commonConfig = require(configFilePaths.common)

  return merge(commonConfig(env, options), modeConfig(env, options))
}