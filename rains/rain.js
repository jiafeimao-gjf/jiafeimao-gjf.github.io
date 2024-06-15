class Rain {
    constructor(width, height, direction, posX, posY, speed, color) {
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.color = color;
    }

    move() {
        this.posX += Math.sin((this.direction * Math.PI) / 2) * this.speed;
        this.posY += Math.cos((this.direction * Math.PI) / 2) * this.speed;
    }

    draw() {
        canvasContext.rotate(-this.direction);
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.posX, this.posY, this.width, this.height);
        canvasContext.rotate(+this.direction);
    }
}

let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};

let allRains = [];
let defaultRainWidth = 2;
let defaultRainHeight = 16;
let maximumRainCount = 520;

let maximumRainInitializationInOneFrame = 5;

let fps = 60;
let gameLoop = () => {
    setInterval(show, 1000 / fps);
};

let backgroundLoop = () => {
    setInterval(updateBg, 1000 / fps);
}

// let StanAutio = () => {
//     let res = confirm("播放音乐？")
//     if (res) {
//         // 获取audio元素
//         var audio = document.getElementById("stanAudio");
//         // 尝试播放音频
//         audio.play();
        
//     }
// }

let color = "#c537E6";
let backgroundColor = "#FFFFFF";

let generateSingleShadeColor = (value) => {
    let hexValue = value.toString(16); // 将十进制转换为十六进制
    return `#${hexValue}${hexValue}${hexValue}`; // 返回#RRGGBB格式的颜色值
}

let colorInt = 0;
let dire = 1;
let show = () => {
    update();
    draw();
};

let updateBg = () => {
    colorInt = 0;
    // if (colorInt >= 128) {
    //     dire = -0.8;
    // }
    // if (colorInt <= 10) {
    //     dire = 0.8;
    //     colorInt = 10;
    // }

    backgroundColor = generateSingleShadeColor(colorInt);
    document.body.style.backgroundColor = backgroundColor;
}

let speedMultiplier = 12;
let update = () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    let rainInitCountInThisFrame = 0;
    while (
        allRains.length < maximumRainCount &&
        maximumRainInitializationInOneFrame > rainInitCountInThisFrame
    ) {
        let distanceFromCam = Math.random();
        let red = Math.random() * 1000 % 255;
        let green = Math.random() * 1000 % 255;
        let blue = Math.random() * 1000 % 255;
        let c =
            "rgba(" + red + "," + green + "," + blue + "," + (1 - distanceFromCam) + ")";
        let rain = new Rain(
            defaultRainWidth * (2 - distanceFromCam),
            defaultRainHeight * (2 - distanceFromCam),
            Math.random() / 20,
            Math.random() * canvas.width,
            -100,
            ((2 - distanceFromCam) * 8 * speedMultiplier) / 10,
            c
        );
        allRains.push(rain);
        rainInitCountInThisFrame++;
    }

    for (let i = 0; i < allRains.length; i++) {
        allRains[i].move();
        if (allRains[i].posY > canvas.height || allRains[i].posX > canvas.width) {
            allRains.splice(i, 1);
        }
    }
};

let draw = () => {
    allRains.forEach((rain) => {
        rain.draw();
    });
};

gameLoop();
// backgroundLoop();
// StanAutio();
let setCanvasSizeAndVariables = () => {
    canvas.width = window.visualViewport.width;
    canvas.height = window.visualViewport.height;
};
window.addEventListener("resize", setCanvasSizeAndVariables);

setCanvasSizeAndVariables();
let changeCount = (e) => {
    maximumRainCount = e;
};
let changeDropWidth = (e) => {
    defaultRainWidth = e;
};

let changeDropHeight = (e) => {
    defaultRainHeight = e;
};
let changeGravity = (e) => {
    speedMultiplier = e;
};
// document.getElementById("color").addEventListener("input", () => {
//     color = document.getElementById("color").value;
//     console.log(color);
//     let tds = document.querySelectorAll("td");
//     tds.forEach((el) => {
//         el.style.cssText += "color:" + color + " !important";
//     });
//     let footer = document.querySelectorAll("footer");
//     footer.forEach((el) => {
//         el.style.cssText += "color:" + color + " !important";
//     });
//     document.getElementById("name").style.cssText +=
//         "color:" + color + " !important";
// });
// document.getElementById("backgroundColor").addEventListener("input", () => {
//     backgroundColor = document.getElementById("backgroundColor").value;
//     document.body.style.backgroundColor = backgroundColor;
// });
