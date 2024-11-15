import p5 from 'p5';
import TextView from './TextView.ts';
import Tag from "./Tag";
import Vertical from "./Vertical";
import Align from "./Align";
import Free from "./Free";

const startX = 0;
const startY = 0;

const root = new Free()

const projectsGroup = new Vertical()
projectsGroup.align = Align.LEFT_TOP;
projectsGroup.alignContent = Align.LEFT;
projectsGroup.addChild(new TextView("03.2021 Mobile sync node js tool"));
projectsGroup.addChild(new TextView("01.2021 Yo momma KMP app"));
projectsGroup.addChild(new TextView("04.2020 Objective-C diff tool"));

const tagsGroup = new Vertical()
tagsGroup.align = Align.RIGHT_TOP;
tagsGroup.alignContent = Align.RIGHT;
tagsGroup.addChild(new TextView("kotlin"));
tagsGroup.addChild(new TextView("kmp"));
tagsGroup.addChild(new TextView("art"));

root.addChild(projectsGroup)
root.addChild(tagsGroup)

function setup(p) {
  p.createCanvas(p.windowWidth, p.windowHeight);
  p.textSize(32);
}

function draw(p) {
  p.background(0);

  root.draw(p)

  if (root.contains(p.mouseX, p.mouseY, p)) {
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
