

window.addEventListener("click", async (event) => {
  const target = event.target
  const tagName = target.tagName
  if (tagName.toUpperCase() == "BUTTON" && target.classList.contains("music-play-btn")) {

    const dataset = target.dataset

    if (dataset.server == "undefined" || dataset.type == "undefined" || dataset.id == "undefined") {
      console.log("param err")
      return
    }

    const res = await getMusicList({
      server: dataset.server,
      type: dataset.type,
      id: dataset.id
    })

    let vol = 0.7
    const metingStr = localStorage.getItem("metingjs")
    const metingjs = JSON.parse(metingStr)
    if (metingjs && typeof (metingjs.volume) == "number") {
      vol = metingjs.volume
    }
    const ap = new APlayer({
      container: document.getElementById("bottom-aplayer"),
      volume: vol
    })

    if (ap) {
      ap.list.clear()
      ap.list.add(res)
      ap.setMode("normal")
      ap.play()
    } else {
      return
    }
  }
}, true)


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
      'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r'

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

      result = res

      // if (!res.lrc) {
      //   options.lrcType = 0
      // }

      // this._loadPlayer([result])

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
    // res.artist=res.author
    // res.cover=res.pic
    // res.name=res.title

    result = res
  }

  return result
}