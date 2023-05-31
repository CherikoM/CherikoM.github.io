/**
 * 随时使用snackbar
 */

export default (str) => {
  // window.onload = () => {
  // 使用提示框（如果有进行配置的话）
  // window.useSnackbar = (str) => {
  if (GLOBAL_CONFIG.Snackbar) {
    // snackbar配置对象
    const snackbar = GLOBAL_CONFIG.Snackbar
    // 页面的亮度模式
    const dark = document.documentElement.getAttribute('data-theme')
    let bgc
    if (dark === "light") {
      bgc = snackbar.bgLight
    } else if (dark === "dark") {
      bgc = snackbar.bgDark
    } else {
      return
    }

    window.Snackbar.show({
      backgroundColor: bgc,
      text: str,
      actionText: null,
      pos: snackbar.position
    })
  }
}

