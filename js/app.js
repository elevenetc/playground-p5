import p5 from 'p5';
import TextView from './TextView.ts';
import Tag from "./Tag";
import Group from "./Group";

const startX = 0;
const startY = 0;

const projectsGroup = new Group(startX, startY)
projectsGroup.addChild(new TextView("03.2021 Mobile sync node js tool"));
projectsGroup.addChild(new TextView("01.2021 Yo momma KMP app"));
projectsGroup.addChild(new TextView("04.2020 Objective-C diff tool"));

// const projects = [
//   new TextView("03.2021 Mobile sync node js tool"),
//   new TextView("01.2021 Yo momma KMP app"),
//   new TextView("04.2020 Objective-C diff tool"),
// ];

const tags = [
  new Tag("js"),
  new Tag("kotlin"),
  new Tag("kmp")
]


const textItemVerticalGap = 30;
const maxAlpha = 200;
const alphaStep = 25;



function setup(p) {
  p.createCanvas(p.windowWidth, p.windowHeight);
  p.textSize(32);
}

function draw(p) {
  p.background(0);

  projectsGroup.draw(p)

  //for (let i = 0; i < projects.length; i++) {
  for (let i = 0; i < 10; i++) {
    const y = startY + i * textItemVerticalGap;
    //const button = projects[i];
    //const textStr = button.title;
    //const textWidth = p.textWidth(textStr);
    //const textHeight = p.textAscent() + p.textDescent();

    const textWidth = 0
    const textHeight = 0

    if (
      p.mouseX >= startX &&
      p.mouseX <= startX + textWidth &&
      p.mouseY >= y - textHeight &&
      p.mouseY <= y
    ) {
      //button.onHoverIn(p);
      // button.hover = true;
      // button.bgAlpha = p.min(button.bgAlpha + alphaStep, maxAlpha);
    } else {
      //button.onHoverOut(p);
      // button.hover = false;
      // button.bgAlpha = p.max(button.bgAlpha - alphaStep, 0);
    }

    //button.draw(startX, y, p);

    // if (button.bgAlpha > 0) {
    //   p.noStroke()
    //   p.fill(200, button.bgAlpha);
    //   p.rect(startX, y - textHeight, textWidth, textHeight);
    // }
    //
    // p.fill(255);
    // p.text(textStr, startX, y);
  }

  //const hasHoveredButton = projects.some(button => button.hover === true);

  //if (hasHoveredButton) p.cursor('pointer'); else p.cursor('default');
}



const sketch = (p) => {
  p.setup = () => setup(p);
  p.draw = () => draw(p);
  p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
};

new p5(sketch);
