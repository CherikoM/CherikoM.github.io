/**
 * 配合标签外挂music食用~
 */

import useSnackbar from "../Tools/useSnackbar.js"
import addCoverColor from "./addCoverColor.js"

// 播放事件委托（
window.addEventListener("click", async (event) => {
  const target = event.target
  const tagName = target.tagName

  const dataset = target.dataset

  // 参数有误
  if (dataset.server == "undefined" || dataset.type == "undefined" || dataset.id == "undefined") {
    return
  }

  // 点击操作按钮
  if (tagName.toUpperCase() == "BUTTON" && target.classList.contains("music-play-btn")) {
   
    // 获得音乐列表
    const res = await getMusicList({
      server: dataset.server,
      type: dataset.type,
      id: dataset.id,
    })

    const ap = window.fixedap
    ap.options.order = dataset.order

    if (ap) {
      if (target.classList.contains("play-album")) {
        // debugger
        // 清空并添加
        ap.list.clear()
        ap.list.add(res)
        ap.setMode("normal")
        ap.play()
        useSnackbar("让你见识见识我珍藏已久的好曲子（〃｀ 3′〃）")
      } else if (target.classList.contains("add-album")) {
        // 目前的播放列表
        const nowList = ap.list.audios
        // 去重
        const res2 = res.filter(r => {
          return !nowList.some(n => {
            return n.url === r.url
          })
        })

        // 全是重复
        if (res2.length === 0) {
          useSnackbar("添加过的就不要再加啦w(ﾟДﾟ)w")
          return
        }

        // 添加
        ap.list.add(res2)
        ap.setMode("normal")

        // 滚动音乐列表
        const apDOM = ap.options.container
        const apolDOM = apDOM.querySelector("ol")
        const scrollHeight = apolDOM.scrollHeight
        apolDOM.scrollTo({ top: scrollHeight, behavior: "smooth" })

        useSnackbar("加到播放列表里啦，慢慢听ᕕ( ᐛ )ᕗ")
      }
    } else {
      return
    }
  }

  // 点击标题
  else if (target.classList.contains("music-to-site")) {
    let href

    switch (dataset.server) {
      case ("netease"):
        href = `https://music.163.com/#/${dataset.type}?id=${dataset.id}`
        break
      case ("tencent"):
        let type
        if (dataset.type === "song") {
          type = "songDetail"
        } else if (dataset.type === "album") {
          type = "albumDetail"
        } else type = "playlist"

        href = `https://y.qq.com/n/ryqq/${type}/${dataset.id}`
        break
    }

    if (href) {
      window.open(href)
    }
  }
}, true)

// 获得音乐列表
const getMusicList = async (options) => {
  if (typeof (options) !== "object") {
    return
  }

  let api
  let result

  //初始化
  init()
  await parse()

  function init() {
    api =
      options.api ||
      window.meting_api ||
      'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&auth=:auth&r=:r'

    if (options.auto) _parse_link()

    function _parse_link() {
      let rules = [
        ['music.163.com.*song.*id=(\\d+)', 'netease', 'song'],
        ['music.163.com.*album.*id=(\\d+)', 'netease', 'album'],
        ['music.163.com.*artist.*id=(\\d+)', 'netease', 'artist'],
        ['music.163.com.*playlist.*id=(\\d+)', 'netease', 'playlist'],
        ['music.163.com.*discover/toplist.*id=(\\d+)', 'netease', 'playlist'],
        ['y.qq.com.*song/(\\w+).html', 'tencent', 'song'],
        ['y.qq.com.*album/(\\w+).html', 'tencent', 'album'],
        ['y.qq.com.*singer/(\\w+).html', 'tencent', 'artist'],
        ['y.qq.com.*playsquare/(\\w+).html', 'tencent', 'playlist'],
        ['y.qq.com.*playlist/(\\w+).html', 'tencent', 'playlist'],
        ['xiami.com.*song/(\\w+)', 'xiami', 'song'],
        ['xiami.com.*album/(\\w+)', 'xiami', 'album'],
        ['xiami.com.*artist/(\\w+)', 'xiami', 'artist'],
        ['xiami.com.*collect/(\\w+)', 'xiami', 'playlist'],
      ]

      for (let rule of rules) {
        // 返回匹配
        // eg: "https://y.qq.com/n/yqq/song/001RGrEX3ija5X.html"
        // ["y.qq.com/n/yqq/song/001RGrEX3ija5X.html", "001RGrEX3ija5X"]
        let patt = new RegExp(rule[0])
        let res = patt.exec(options.auto)

        if (res !== null) {
          options.server = rule[1]
          options.type = rule[2]
          options.id = res[1]
          return
        }
      }
    }
  }

  async function parse() {
    if (options.url) {
      // 直接构建 APlayer 配置并加载 APlayer
      let res = {
        name: options.name || options.title || 'Audio name',
        artist: options.artist || options.author || 'Audio artist',
        url: options.url,
        cover: options.cover || options.pic,
        lrc: options.lrc || options.lyric || '',
        type: options.type || 'auto',
      }

      try {
        result = await addCoverColor(res)
      } catch {

      }

      return
    }

    // // 1. 通过 meta 拼凑接口参数获得完整接口 （_init 中存放的默认 api）
    // // 2. 请求接口，得到播放列表数据
    // // 3. 加载 APlayer
    let url = api
      .replace(':server', options.server)
      .replace(':type', options.type)
      .replace(':id', options.id)
      .replace(':auth', options.auth)
      .replace(':r', Math.random())

    const r = await fetch(url)
    const res = await r.json()

    result = res
  }

  try {
    await addCoverColor(result)
  } catch {

  }

  return result
}
