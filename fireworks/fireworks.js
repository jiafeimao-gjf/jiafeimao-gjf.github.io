let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");
let createRect = (x, y, width, height, color) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
};

let gravity = -0.1;
let fps = 60;

let fireworks = [];
let subFireworks = [];
let countMultiplier = 10;

class Firework {
  constructor(x, y, radius, velocityX, velocityY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.color = color;
    this.opacity = 1;
  }

  update() {
    this.draw();
    this.velocityY -= gravity;
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.opacity -= 0.006;
    if (this.opacity < 0) this.opacity = 0;
  }

  draw() {
    canvasContext.save();
    canvasContext.globalAlpha = this.opacity;
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = this.color;
    canvasContext.fill();
    canvasContext.closePath();
    canvasContext.restore();
  }
}

let animate = () => {
  requestAnimationFrame(animate);
  update();
  draw();
};

let colors = [
    "aqua",
    "black",
    "blue",
    "fuchsia",
    "gray",
    "green",
    "lime",
    "maroon",
    "navy",
    "olive",
    "orange",
    "purple",
    "red",
    "silver",
    "teal",
    "white",
    "yellow",
    "aliceblue",
    "antiquewhite",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "blanchedalmond",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "greenyellow",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightsteelblue",
    "lightyellow",
    "limegreen",
    "linen",
    "magenta",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "oldlace",
    "olivedrab",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "skyblue",
    "slateblue",
    "slategray",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "whitesmoke",
    "yellowgreen"
  ]

let initializeCount = 0;
let maximumInitialize = 10;
let initDelay = 1000;
let fireworkRadius = 3;
let particleCount = 36;
let speedMultiplier = 7;

let update = () => {
  canvasContext.fillStyle = "rgba(0,0,0,0.1)";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  if (initializeCount < maximumInitialize) {
    let firework = new Firework(
      Math.random() * canvas.width,
      canvas.height + Math.random() * 70,
      fireworkRadius,
      3 * (Math.random() - 0.5),
      -12,
      colors[Math.floor(Math.random() * colors.length)]
    );
    fireworks.push(firework);
    setTimeout(() => {
      initializeCount--;
    }, initDelay);
    initializeCount++;
  }

  fireworks.forEach((firework, i) => {
    if (firework.opacity <= 0.1) {
      let fireworkDelete = fireworks.splice(i, 1);
      fireworkDelete = null;
      createSubFireworks(
        firework.x,
        firework.y,
        particleCount,
        firework.color,
        speedMultiplier
      );
      i--;
    } else {
      firework.update();
    }
  });

  subFireworks.forEach((firework, i) => {
    if (firework.opacity < 0) {
      let fireworkDelete = subFireworks.splice(i, 1);
      fireworkDelete = null;
      i--;
    } else {
      firework.update();
    }
  });
};

let createSubFireworks = (x, y, count, color, speedMultiplier) => {
  let created = 0;
  let radians = (Math.PI * 2) / count;

  while (created < count) {
    let firework = new Firework(
      x,
      y,
      fireworkRadius,
      Math.cos(radians * created) * Math.random() * speedMultiplier,
      Math.sin(radians * created) * Math.random() * speedMultiplier,
      color
    );
    subFireworks.push(firework);
    created++;
  }
};

let draw = () => {
  fireworks.forEach((firework) => {
    firework.draw();
  });
  subFireworks.forEach((firework) => {
    firework.draw();
  });
};

animate();

let setCanvasSizeAndVariables = () => {
  canvas.width = window.visualViewport.width;
  canvas.height = window.visualViewport.height;
};
window.addEventListener("resize", setCanvasSizeAndVariables);

setCanvasSizeAndVariables();

let changeCountMultiplier = (e) => {
  particleCount = e;
};

let changeFireworkCount = (e) => {
  maximumInitialize = e;
};

let changeRadius = (e) => {
  fireworkRadius = e;
};
