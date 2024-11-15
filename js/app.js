// Import p5
import p5 from 'p5';

const items = ["1. aaa", "2. bbb", "3. ccc"];
const startX = 50;
const startY = 50;
const textItemVerticalGap = 50;
const bgAlphas = [];
const hoverState = [];
const maxAlpha = 200;
const alphaStep = 25;

function setup(p) {
  p.createCanvas(400, 200);
  p.textSize(32);
  for (let i = 0; i < items.length; i++) {
    bgAlphas[i] = 0;
    hoverState[i] = false;
  }
}

function draw(p) {
  p.background(255);

  for (let i = 0; i < items.length; i++) {
    const y = startY + i * textItemVerticalGap;
    const textStr = items[i];
    const textWidthVal = p.textWidth(textStr);
    const textHeight = p.textAscent() + p.textDescent();

    if (
      p.mouseX >= startX &&
      p.mouseX <= startX + textWidthVal &&
      p.mouseY >= y - textHeight &&
      p.mouseY <= y
    ) {
      bgAlphas[i] = p.min(bgAlphas[i] + alphaStep, maxAlpha);
      hoverState[i] = true;
    } else {
      bgAlphas[i] = p.max(bgAlphas[i] - alphaStep, 0);
      hoverState[i] = false;
    }

    if (bgAlphas[i] > 0) {
      p.noStroke()
      p.fill(200, bgAlphas[i]);
      p.rect(startX, y - textHeight, textWidthVal, textHeight);
    }

    p.fill(0);
    p.text(textStr, startX, y);
  }


  if (hoverState.includes(true)) {
    p.cursor('pointer'); // Change cursor to pointer when over text
  } else {
    p.cursor('default'); // Default cursor when not over text
  }
}


const sketch = (p) => {
  p.setup = () => setup(p);
  p.draw = () => draw(p);
};

new p5(sketch);
