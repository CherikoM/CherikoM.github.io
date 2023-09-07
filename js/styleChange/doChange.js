import changeStyle from "./changeStyle.js"
import changeOnThemeSwitch from "../Tools/changeOnThemeSwitch.js"

// changeBoxStyle()
window.addEventListener("load", ()=> {
  changeStyle()
})
changeOnThemeSwitch(changeStyle)