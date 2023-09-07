import makeVisual from "./makeVisual.js"

window.addEventListener("load", ()=> {

  const timer = setInterval(() => {
    if(window.fixedap) {
      const audio = window.fixedap.audio
      const canvas = document.getElementById("music-visualization")

      const canplay = ()=> {
        makeVisual(canvas,audio)
        window.removeEventListener("click", canplay)
      }
      window.addEventListener("click", canplay)
      clearInterval(timer)
    }
  }, 500)
})