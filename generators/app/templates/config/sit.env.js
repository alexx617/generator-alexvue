var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"sit"',
  BASE_API: '"https://www.xxx.com"'
})
