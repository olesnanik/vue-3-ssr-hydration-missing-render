const ManifestPlugin = require('webpack-manifest-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    resolve: { mainFields: ['main', 'module'] }
  },

  chainWebpack: webpackConfig => {
    const isSSR = process.env.SSR
    webpackConfig
      .entry('app')
      .clear()
      .add(isSSR ? './src/entry-server.ts' : './src/entry-client.ts')

    webpackConfig.plugin('manifest').use(new ManifestPlugin({ fileName: 'manifest.json' }))

    if (!isSSR) {
      return
    }

    webpackConfig.target('node')
    webpackConfig.output.libraryTarget('commonjs2')

    webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }))

    webpackConfig.optimization.splitChunks(false).minimize(false)

    webpackConfig.plugins.delete('hmr')
    webpackConfig.plugins.delete('preload')
    webpackConfig.plugins.delete('prefetch')
    webpackConfig.plugins.delete('progress')
    webpackConfig.plugin('limit').use(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    )
  }
}
