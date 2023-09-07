import setTheme from "../Tools/setTheme.js"

/**
 * musicBlock标签外挂 按钮的夜晚/白天样式
 */

export default ()=> {
  const htmlEl = document.documentElement

  // let darkChange = mode==="dark"

  // 判断夜晚模式
  if (htmlEl.dataset.theme !== "dark") {
    // htmlEl.style.setProperty("--music-item-bg", "white")
    // htmlEl.style.setProperty("--music-item-words", "black")
    // htmlEl.style.setProperty("--music-item-shadow", "rgba(0,0,0,0.1)")
    // htmlEl.style.setProperty("--music-item-hover-shadow-1", "rgba(50,50,93,0.25)")
    // htmlEl.style.setProperty("--music-item-hover-shadow-2", "rgba(255,255,255,0.4)")
    setTheme({
      "--music-item-bg": "white",
      "--music-item-words": "black",
      "--music-item-shadow": "rgba(0,0,0,0.1)",
      "--music-item-hover-shadow-1": "rgba(50,50,93,0.25)",
      "--music-item-hover-shadow-2": "rgba(255,255,255,0.4)"
    })
  } else {
    // htmlEl.style.setProperty("--music-item-bg", "#444444")
    // htmlEl.style.setProperty("--music-item-words", "white")
    // htmlEl.style.setProperty("--music-item-shadow", "rgba(255,255,255,0.1)")
    // htmlEl.style.setProperty("--music-item-hover-shadow-1", "rgba(50,50,93,0.25)")
    // htmlEl.style.setProperty("--music-item-hover-shadow-2", "rgba(255,255,255,0.4)")
    setTheme({
      "--music-item-bg": "#444444",
      "--music-item-words": "white",
      "--music-item-shadow": "rgba(255,255,255,0.1)",
      "--music-item-hover-shadow-1": "rgba(50,50,93,0.25)",
      "--music-item-hover-shadow-2": "rgba(255,255,255,0.4)"
    })
  }
}