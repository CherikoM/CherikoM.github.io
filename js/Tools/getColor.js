/**
 * 计算专辑图片的平均色值（rgb）
 */

// js创建一个canvas元素
const canvas = document.createElement('canvas')

// 表示绘制一个2d图
const context = canvas.getContext("2d",{willReadFrequently:true})

export default (src) => {
  // 创建图片元素用来加载图片地址        
  const img = new Image()

  // 将图片地址传给nimg
  img.src = src
  img.crossOrigin = ""

  try {
    return new Promise((resolve, reject) => {
      img.onload = function () {

        // 获取图片的大小
        const width = img.width
        const height = img.height

        // 设置canvas的大小
        canvas.width = width
        canvas.height = height

        // rgba值
        let r = 0
        let g = 0
        let b = 0
        let a = 0
        const fxs = width * height

        // 设置要绘制的图片
        context.drawImage(img, 0, 0)

        // 获取图片的像素信息，并.data获得数组
        const data = context.getImageData(0, 0, width, height).data

        // 获取所有的rgba的和
        for (let i = 0; i < data.length / 4; i++) {
          r += data[i * 4]
          g += data[i * 4 + 1]
          b += data[i * 4 + 2]
          a += data[i * 4 + 3]
        }

        // 获得平均值
        const rgba = [parseInt(r / fxs), parseInt(g / fxs), parseInt(b / fxs), parseInt(a / fxs)]
        resolve(rgba)
      }
    })
  } catch(e) {
    throw e
  }
}