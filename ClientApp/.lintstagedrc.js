module.exports = {
  "src/**/**.{js,json,ts,vue}": ["eslint --max-warnings=0", "vue-tsc --noEmit"],
  "src/**/**.{scss,vue}": ["stylelint"]

}
