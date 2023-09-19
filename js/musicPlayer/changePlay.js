/**
 * 音乐/模式切换时发起事件~
 */

import changeBlockStyle from "./changeBlockStyle.js"
import changePlayerStyle from "./changePlayerStyle.js"
import changeOnThemeSwitch from "../Tools/changeOnThemeSwitch.js"

export default () => {
  const ap = window.fixedap
  // 更改播放时刷新样式
  ap.on("canplay", () => {
    const hueKey = changePlayerStyle()
  })

  // 点击夜晚模式按钮时刷新样式
  changeOnThemeSwitch(changePlayerStyle)
  changeOnThemeSwitch(changeBlockStyle)
}