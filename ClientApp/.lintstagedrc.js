module.exports = {
  "src/**/**.{js,json,ts,vue}": ["eslint", "vue-tsc --noEmit"],
  "src/**/**.{scss,vue}": ["stylelint"]

}
