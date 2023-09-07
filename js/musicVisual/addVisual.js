import makeVisual from "./makeVisual.js"

window.addEventListener("load", ()=> {

  const timer = setInterval(() => {
    if(window.fixedap) {
      const audio = window.fixedap.audio
      const canvas = document.getElementById("music-visualization")
      makeVisual(canvas,audio)
      clearInterval(timer)
    }
  }, 500)
})