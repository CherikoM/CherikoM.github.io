// 获取画布
var canvas = document.querySelector("canvas");
// 获取画笔
var ctx = canvas.getContext("2d");
// 设置画布宽高
canvas.width = screen.availWidth; // 可视区的宽度
canvas.height = screen.availHeight; // 可视区的高度
// 代码雨中的文字
var str = "01".split("");
// 用数组维护代码雨的高度
// 每列宽10px，所以总共有canvas.withd/10列，把数组先填充0
var arr = Array(Math.ceil(canvas.width / 10)).fill(0);
var rain = function () {
    // 绘制背景
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 绘制文字
    ctx.fillStyle = "#0f0";
    arr.forEach(function (item, index) {
        // 在str中随机选取某个字，绘制到canvas上
        ctx.fillText(str[Math.floor(Math.random() * str.length)], index * 10, item + 10);
        // 如果超出canvas的高度，就重新走一列，否则接着向下走
        // 再给一个随机数值，让文字有概率不落在底端也重新走，从而出现凌乱的效果
        arr[index] = (item > canvas.height || item > 10000 * Math.random()) ? 0 : item + 10;
    });
};
setInterval(rain, 40);