const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cw = window.innerWidth;
let ch = window.innerHeight;

let charArr = [
  "顾",
  "家",
  "飞",
  "家",
  "飞",
  "爱",
  "爱",
  "❤️",
  "爱",
  "陈",
  "露",
  "露",
  "露",
  "露",
  "L",
  "V",
  "O",
  "E",
]
// let charArr = [
//   "a",
//   "b",
//   "c",
//   "d",
//   "e",
//   "f",
//   "g",
//   "h",
//   "i",
//   "j",
//   "k",
//   "l",
//   "m",
//   "n",
//   "o",
//   "p",
//   "q",
//   "r",
//   "s",
//   "t",
//   "u",
//   "v",
//   "w",
//   "x",
//   "y",
//   "z",
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
//   "А",
//   "В",
//   "Г",
//   "Д",
//   "Є",
//   "Ѕ",
//   "З",
//   "И",
//   "Ѳ",
//   "І",
//   "К",
//   "Л",
//   "М",
//   "Н",
//   "Ѯ",
//   "Ѻ",
//   "П",
//   "Ч",
//   "Р",
//   "С",
//   "Т",
//   "Ѵ",
//   "Ф",
//   "Х",
//   "Ѱ",
//   "Ѿ",
//   "Ц",
// ];

let maxCharCount = 188;
let fallingCharArr = [];
let fontSize = 24;
let maxColumns = cw / fontSize;
canvas.width = cw;
canvas.height = ch;

let frames = 0;

let fallSpeed = 5
let valueChangeSpeed = 5 //  control change speed
let distanceOfValue = 36

class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    this.value =
      charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase();
    this.speed = (Math.random() * fontSize * 3) / fallSpeed + (fontSize * 3) / fallSpeed;

    // 字体颜色
    let red = Math.random()*1000 % 255;
    let green = Math.random()*1000 % 255;
    let blue = Math.random()*1000 % 255;

    ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + ")";
    ctx.font = fontSize + "px KaiTi";

    ctx.fillText(this.value, this.x, this.y);
    this.y += this.speed + distanceOfValue;

    if (this.y > ch) {
      this.y = (Math.random() * ch) / 2 - 50;
      this.x = Math.floor(Math.random() * maxColumns) * fontSize;
      this.speed = (-Math.random() * fontSize * 3) / fallSpeed + (fontSize * 3) / fallSpeed;
    }
  }
}

let update = () => {
  if (fallingCharArr.length < maxCharCount) {
    let fallingChar = new FallingChar(
      Math.floor(Math.random() * maxColumns) * fontSize,
      (Math.random() * ch) / 2 - 100
    );
    fallingCharArr.push(fallingChar);
  }
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.fillRect(0, 0, cw, ch);
  // frames % valueChangeSpeed == 0 control change speed
  for (let i = 0; i < fallingCharArr.length && frames % valueChangeSpeed == 0; i++) {
    fallingCharArr[i].draw(ctx);
  }

  requestAnimationFrame(update);
  frames++;
};

update();
