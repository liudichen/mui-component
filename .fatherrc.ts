/*
 * @Description: 
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-14 11:01:55
 * @LastEditTime: 2022-04-14 16:30:04
 */
export default {
  esm: 'babel',
  cjs: 'babel',
  extraBabelPresets:[
    // '@babel/preset-env',
  ],
  extraBabelPlugins: [
    "@babel/plugin-transform-runtime",
  ]
};
