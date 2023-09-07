import debounce from "../Tools/debounce.js"

export default (canvas, audio) => {

  if (/(iPhone|iPod|iOSAndroid)/i.test(navigator.userAgent)) {
    return
  }


  const FFT = 512

  // 实例化AudioContext音频上下文对象
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

  // 创建AnalyserNode节点
  const analyser = audioCtx.createAnalyser()
  // 减小fft的大小（使每个频率条有宽度
  analyser.fftSize = FFT

  // 将AnalyserNode节点和声源连接
  const audioSrc = audioCtx.createMediaElementSource(audio) //从audio中获取声音源文件
  audioSrc.connect(analyser)
  analyser.connect(audioCtx.destination)

  // AnalyserNode数据解析，获得瞬时音频数据
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  analyser.getByteFrequencyData(dataArray)

  // -------------------------------------

  const canvasResize = ()=> {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  
  canvasResize()
  window.addEventListener("resize", debounce(canvasResize,100))

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const draw = () => {
      requestAnimationFrame(draw)

      analyser.getByteFrequencyData(dataArray)

      // 给背景着色
      // ctx.fillStyle = 'rgb(0, 0, 0)';
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 设置条的宽度
      const barWidth = (canvas.width / bufferLength)
      let barHeight
      // 记录条当前位置
      let x = 0

      for (var i = 0; i < bufferLength; i++) {
        barHeight = ((dataArray[i] * 3) / (FFT)) * canvas.height

        ctx.fillStyle = `hsl(${120 + (x / canvas.width) * 120},${10 + (barHeight / canvas.height) * 90}%,60%)`

        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight)

        x += barWidth + 3
      }
    }
    draw()
  }
}

