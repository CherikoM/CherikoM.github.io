/**
 * 为切换夜晚模式按钮添加事件
 */
export default (fn) => {
  const html = document.documentElement

  // 观察器的配置（需要观察什么变动）
  const config = { attributes: true };

  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList, observer) {
    if(mutationsList[0].attributeName == "data-theme") {
      fn()

    }
  }

  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback)

  // 以上述配置开始观察目标节点
  observer.observe(html, config)
}