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

const tags = [
  new Tag("js"),
  new Tag("kotlin"),
  new Tag("kmp")
]

function setup(p) {
  p.createCanvas(p.windowWidth, p.windowHeight);
  p.textSize(32);
}

function draw(p) {
  p.background(0);

  projectsGroup.draw(p)

  if (projectsGroup.contains(p.mouseX, p.mouseY, p)) {
    p.cursor('pointer');
  } else {
    p.cursor('default');
  }
}


const sketch = (p) => {
  p.setup = () => setup(p);
  p.draw = () => draw(p);
  p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
};

new p5(sketch);
