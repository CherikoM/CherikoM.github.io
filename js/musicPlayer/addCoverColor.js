/**
 * 给歌曲加颜色值
 */

import getColor from "../Tools/getColor.js"
import rgbToShl from "../Tools/rgbToHsl.js"

// 缓存封面的颜色值
window.coverCacheMap = new Map()

export default async (audios) => {
  for (let i = 0; i < audios.length; i++) {
    const cover = audios[i].cover || audios[i].pic
    if (cover && !audios[i].theme) {
      const cache = window.coverCacheMap.get(cover)
      if (cache) {
        audios[i].theme = cache
      } else {
          const rgba = await getColor(cover)
          const hsl = rgbToShl(rgba[0], rgba[1], rgba[2])
          audios[i].theme = hsl
          // 缓存颜色值
          window.coverCacheMap.set(cover, hsl)
      }
    }
  }
}