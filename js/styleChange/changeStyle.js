import setTheme from "../Tools/setTheme.js"

export default ()=> {
  const theme = document.documentElement.dataset.theme
  // 是否为夜晚模式
  let darkChange = (theme === "dark")

  if(darkChange) {
    // 夜晚模式
    setTheme({
      "--card-bg": "rgba(0,0,0,.5)",
      "--scrollbar-color": "#267677"
    })
  } else {
    // 白天模式
    setTheme({
      "--card-bg": "rgba(255,255,255,.5)",
      "--scrollbar-color": "#00ced1"
    })
  }
}