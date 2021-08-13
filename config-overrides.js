const {
  override,
  addDecoratorsLegacy,
  addWebpackAlias,
  fixBabelImports,
  addLessLoader,
  useEslintRc,
  disableEsLint,
} = require('customize-cra')

const path = require('path')
function pathResolve(pathUrl) {
  return path.join(__dirname, pathUrl)
}

module.exports = override(
  // 配置装饰器
  addDecoratorsLegacy(),
  // 配置目录别名
  addWebpackAlias({
    '@': pathResolve('./src'),
  }),
  // antd组件css样式全局引入
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      relativeUrls: false,
      modifyVars: { '@primary-color': '#A80000' },
      // cssModules: {
      //   // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
      //   localIdentName: "[path][name]__[local]--[hash:base64:5]",
      // }
    },
  }),
  // 注意，一定要用 path.resolve 引入eslint的配置文件，否则不生效
  // useEslintRc(pathResolve("./.eslintrc.json"))
  disableEsLint()
)
