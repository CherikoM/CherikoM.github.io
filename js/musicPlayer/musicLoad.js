import changePlay from "./changePlay.js"
import addCoverColor from "./addCoverColor.js"
import changePlayerStyle from "./changePlayerStyle.js"
import changeBlockStyle from "./changeBlockStyle.js"

// 保存所有aplayer实例到全局上（butterfly本身为什么切换页面就失去window.aplayers了？）
window.onload = async () => {
  const aps = window.aplayers
  // 获得全局吸底aplayer（有fixed配置的那个）

  await new Promise(resolve=> {
    let timer1 = setInterval(() => {
      aps.some(a => {
        if (a.options.fixed) {
          window.fixedap = a
          return true
        }
        return false
      })
      if(window.fixedap) {
        clearInterval(timer1)
        resolve()
      }
    }, 500)
  })

  let timer2 = setInterval(async () => {
    // 为初始播放列表增加配色
    if(window.fixedap.list?.audios?.length>0) {
      await addCoverColor(window.fixedap.list.audios)

      // 初始化播放器样式
      changePlayerStyle()   
      
      // 绑定使播放器样式变化的事件
      changePlay()

      clearInterval(timer2)
    }
  },500)

  // 初始化音乐卡样式
  changeBlockStyle()
}