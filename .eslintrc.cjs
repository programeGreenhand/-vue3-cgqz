/*
 * @Author: li.yunhao
 * @Date: 2023-05-17 22:36:27
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2023-05-17 22:37:40
 * @FilePath: /evaluation-frontend/.eslintrc.cjs
 * @Description: 
 */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "no-irregular-whitespace": "error",
    "no-unused-vars": "error"
  }
}
