import useSnackbar from "../Tools/useSnackbar.js"
import setTheme from "../Tools/setTheme.js"

/**
 * 播放器颜色自适应
 */

// 缓存当前的颜色
window.hueColors = new Map()
// 当前使用的缓存key
window.nowHue

export default () => {
  const ap = window.fixedap
  if (ap) {
    // 获取当前播放的样式
    const playList = ap.list
    const playIndex = playList.index
    const nowStyle = playList.audios[playIndex].theme
    if(nowStyle) {
      changeStyle(nowStyle)
    } else {
      new Promise((resolve)=> {
        setTimeout(() => {
          useSnackbar("因不可抗力因素没得到封面颜色w(ﾟДﾟ)w，但至少不影响你收听啦.....((/- -)/")
          resolve()
        }, 3000)
      })
    }
  }
}

const hslToStr = (hsl) => {
  return `hsl(${hsl[0] * 360},${hsl[1] * 100}%,${hsl[2] * 100}%)`
}

const changeStyle = (hsl) => {
  const mode = document.documentElement.dataset.theme

  const hue = hsl[0]

  // 每4为一个取色点（总共(25+1)*2色），如果太黑了就直接gray
  const hueKey = Math.round(hue * 25) / 25

  let keyName
  if (hsl[1] < 0.05) {
    keyName = "gray"
  } else {
    keyName = hueKey
  }

  // 是否为夜晚模式
  let darkChange = (mode === "dark")

  // 判断夜晚模式
  if (darkChange) {
    // htmlEl.style.setProperty("--music-border-color", "hsl(0, 0%, 20%)")
    // htmlEl.style.setProperty("--music-console-border-color", "hsl(0, 0%, 40%)")

    setTheme({
      "--music-border-color": "hsl(0, 0%, 20%)",
      "--music-console-border-color": "hsl(0, 0%, 40%)"
    })
    keyName = mode + keyName
  } else {
    // htmlEl.style.setProperty("--music-border-color", "hsl(0, 0%, 93%)")
    // htmlEl.style.setProperty("--music-console-border-color", "hsl(0, 0%, 91%)")
    setTheme({
      "--music-border-color": "hsl(0, 0%, 93%)",
      "--music-console-border-color": "hsl(0, 0%, 91%)"
    })
  }

  // 切换的key和上一首的key一样，那就不调整样式了
  if (window.nowHue === keyName) {
    return
  } else {
    // 从缓存中获取样式
    let colors = window.hueColors.get(keyName)
    // 缓存中没有样式，生成
    if (!colors) {
      // 夜晚模式
      if (darkChange) {
        // 灰色配色
        if (keyName === "gray" || keyName === "darkgray") {
          colors = {
            bgColor: hslToStr([0, 0, 0.1]),
            bgColorChoose: hslToStr([0, 0, 0.2]),
            scrollBarBgColor: hslToStr([0, 0, 0.4]),
            scrollBarBgColorHover: hslToStr([0, 0, 0.5]),
            musicListCurColor: hslToStr([0, 0, 0.6]),
            musicWordsColor: hslToStr([0, 0, 1]),
            musicWordsColorLighter: hslToStr([0, 0, 0.8]),
            musicWordsColorLightest: hslToStr([0, 0, 0.7]),
            musicIconColorHover: hslToStr([0, 0, 1]),
            musicPlayerBar: hslToStr([0, 0, 0.75]),
            musicPlayerBarLoad: hslToStr([0, 0, 0.9]),
            musicPlayerBarPlayed: hslToStr([0, 0, 0.1])
          }

          // 彩色配色
        } else {
          colors = {
            bgColor: hslToStr([hueKey, 0.3, 0.1]),
            bgColorChoose: hslToStr([hueKey, 0.5, 0.2]),
            scrollBarBgColor: hslToStr([hueKey, 0.25, 0.4]),
            scrollBarBgColorHover: hslToStr([hueKey, 0.4, 0.5]),
            musicListCurColor: hslToStr([hueKey, 0.9, 0.6]),
            musicWordsColor: hslToStr([hueKey, 0, 1]),
            musicWordsColorLighter: hslToStr([hueKey, 0.05, 0.8]),
            musicWordsColorLightest: hslToStr([hueKey, 0.05, 0.7]),
            musicIconColorHover: hslToStr([hueKey, 0.01, 1]),
            musicPlayerBar: hslToStr([hueKey, 0.05, 0.75]),
            musicPlayerBarLoad: hslToStr([hueKey, 0.05, 0.9]),
            musicPlayerBarPlayed: hslToStr([hueKey, 1, 0.44])
          }
        }
        // 白天模式
      } else {
        // 灰色配色
        if (keyName === "gray") {
          colors = {
            bgColor: hslToStr([0, 0, 0.99]),
            bgColorChoose: hslToStr([0, 0, 0.95]),
            scrollBarBgColor: hslToStr([0, 0, 0.9]),
            scrollBarBgColorHover: hslToStr([0, 0, 0.8]),
            musicListCurColor: hslToStr([0, 0, 0.6]),
            musicWordsColor: hslToStr([0, 0., 0.29]),
            musicWordsColorLighter: hslToStr([0, 0, 0.4]),
            musicWordsColorLightest: hslToStr([0, 0, 0.6]),
            musicIconColorHover: hslToStr([0, 0, 0.2]),
            musicPlayerBar: hslToStr([0, 0, 0.8]),
            musicPlayerBarLoad: hslToStr([0, 0, 0.67]),
            musicPlayerBarPlayed: hslToStr([0, 0, 0.44])
          }

          // 彩色配色
        } else {
          colors = {
            bgColor: hslToStr([hueKey, 1, 0.99]),
            bgColorChoose: hslToStr([hueKey, 0.5, 0.95]),
            scrollBarBgColor: hslToStr([hueKey, 0.4, 0.9]),
            scrollBarBgColorHover: hslToStr([hueKey, 0.25, 0.8]),
            musicListCurColor: hslToStr([hueKey, 0.9, 0.6]),
            musicWordsColor: hslToStr([hueKey, 0.03, 0.29]),
            musicWordsColorLighter: hslToStr([0, 0, 0.4]),
            musicWordsColorLightest: hslToStr([0, 0, 0.6]),
            musicIconColorHover: hslToStr([hueKey, 0.01, 0.2]),
            musicPlayerBar: hslToStr([0, 0, 0.8]),
            musicPlayerBarLoad: hslToStr([0, 0, 0.67]),
            musicPlayerBarPlayed: hslToStr([hueKey, 0.64, 0.44])
          }
        }
      }
      // 把新颜色值存入缓存
      window.hueColors.set(keyName, colors)
    }

    // 更改css变量从而改变配色
    // htmlEl.style.setProperty("--bg-color", colors.bgColor)
    // htmlEl.style.setProperty("--bg-color-choose", colors.bgColorChoose)
    // htmlEl.style.setProperty("--scroll-bar-bg-color", colors.scrollBarBgColor)
    // htmlEl.style.setProperty("--scroll-bar-bg-color-hover", colors.scrollBarBgColorHover)
    // htmlEl.style.setProperty("--music-list-cur-color", colors.musicListCurColor)
    // htmlEl.style.setProperty("--music-words-color", colors.musicWordsColor)
    // htmlEl.style.setProperty("--music-words-color-lighter", colors.musicWordsColorLighter)
    // htmlEl.style.setProperty("--music-words-color-lightest", colors.musicWordsColorLightest)
    // htmlEl.style.setProperty("--music-icon-color-hover", colors.musicIconColorHover)
    // htmlEl.style.setProperty("--music-player-bar", colors.musicPlayerBar)
    // htmlEl.style.setProperty("--music-player-bar-load", colors.musicPlayerBarLoad)
    // htmlEl.style.setProperty("--music-player-bar-played", colors.musicPlayerBarPlayed)
    setTheme({
      "--bg-color": colors.bgColor,
      "--bg-color-choose": colors.bgColorChoose,
      "--scroll-bar-bg-color": colors.scrollBarBgColor,
      "--scroll-bar-bg-color-hover": colors.scrollBarBgColorHover,
      "--music-list-cur-color": colors.musicListCurColor,
      "--music-words-color": colors.musicWordsColor,
      "--music-words-color-lighter": colors.musicWordsColorLighter,
      "--music-words-color-lightest": colors.musicWordsColorLightest,
      "--music-icon-color-hover": colors.musicIconColorHover,
      "--music-player-bar": colors.musicPlayerBar,
      "--music-player-bar-load": colors.musicPlayerBarLoad,
      "--music-player-bar-played": colors.musicPlayerBarPlayed
    })

    // 某几个DOM被设了行内样式，所以得这么改
    const apDOM = window.fixedap.container
    const dot = apDOM.querySelector(".aplayer-thumb")
    const bar = apDOM.querySelector(".aplayer-played")
    const vol = apDOM.querySelector(".aplayer-volume")
    dot.style.backgroundColor = colors.musicPlayerBarPlayed
    bar.style.backgroundColor = colors.musicPlayerBarPlayed
    vol.style.backgroundColor = colors.musicPlayerBarPlayed

    // 保存当前使用key
    window.nowHue = keyName
  }
}