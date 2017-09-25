const merge = require('lodash').merge
const path = require('path')

// Default configuations applied to all environments
const defaultConfig = {
  env: process.env.NODE_ENV,
  get envs() {
    return {
      test: process.env.NODE_ENV === 'test',
      development: process.env.NODE_ENV === 'development',
      production: process.env.NODE_ENV === 'production'
    }
  },
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 4567,
  ip: process.env.IP || '0.0.0.0',
  logging: {
    level: 'debug'
  },
}

// Environment specific overrides
const environmentConfigs = {
  development: {},
  test: {
    port: 5678,
  },
  production: {}
}

// Recursively merge configurations
module.exports = merge(defaultConfig, environmentConfigs[process.env.NODE_ENV] || {})
