/**
 * 批量设置全局变量
 */
export default (options)=> {

  if(Object.prototype.toString.call(options) !== '[object Object]') {
    return
  }


  Object.keys(options).forEach(key=> {
    document.documentElement.style.setProperty(key, options[key])
  })

}