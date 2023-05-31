/**
 * 音乐切换时发起事件~
 */

import changeBlockStyle from "./changeBlockStyle.js"
import changePlayerStyle from "./changePlayerStyle.js"

export default () => {
  const ap = window.fixedap
  // 更改播放时刷新样式
  ap.on("canplay", () => {
    changePlayerStyle()
  })

  // 点击夜晚模式按钮时刷新样式
  document.addEventListener("click", (e) => {
    const target = e.target
    const btn = document.getElementById("darkmode")
    if (target === btn || target.parentNode === btn) {
      changePlayerStyle()
      changeBlockStyle()
    }
  })
}