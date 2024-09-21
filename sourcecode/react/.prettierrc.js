module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'lf',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html',
      },
    },
  ],
  plugins: ["@serverless-guru/prettier-plugin-import-order"],
  importOrder: [
    "<TYPE_IMPORTS>",            // 将所有 type 导入放在最前面
    "^react$",                // 然后是 react
    "^react-dom$",            // 接下来是 react-dom
    "^lodash$",               // 然后是 lodash
    "^ahooks$",               // 然后是 lodash
    "^antd",                  // 然后是 antd
    "^@ant-design",           // 接下来是 @ant-design
    "^@umijs",                // 然后是 @umijs
    "<TYPE_PARTY_MODULES>",   // 其他未配置的第三方模块
    "^@/services",            // 接下来是 @/services
    "^@/utils",               // 然后是 @/utils
    "^@/",                    // 接下来是根目录的模块
    "^[../]",                   // 然后是父级模块
    "^[./]",                    // 最后是同级模块
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: false,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ["typescript", "jsx"]
};
