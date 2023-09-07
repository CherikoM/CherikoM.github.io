export default (fn,wait)=> {
  var timer = null
  return ()=> {
      if(timer !== null){
          clearTimeout(timer)
      }
      timer = setTimeout(fn,wait)
  }
}
