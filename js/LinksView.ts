import p5 from "p5";
import TextView from "./TextView";
import View from "./View";
import Align from "./Align";
import LinearAnimationValue from "./animation/LinearAnimationValue";
import {lightenColor, stringToRGB} from "./colorUtils";
import SinAnimationValue from "./animation/SinAnimationValue";
import {randomNegative} from "./math/mathUtils";
import {MouseSpeed} from "./utils/MouseSpeed";

class LinksView extends View {

  id?: string;
  align?: Align;
  parent?: View;

  projectsToTags: Map<TextView, TextView[]>
  tagsToProjects: Map<TextView, TextView[]>

  links: Link[] = []

  hoveredProject: string = "";
  hoveredTag: string = "";

  highlightRoot(
    rootId: string,
    hovered: boolean,
    roots: Map<TextView, TextView[]>,
    leaves: Map<TextView, TextView[]>,
  ) {
    const leavesToShow = []

    roots.forEach((leaves, root) => {
      if (root.id === rootId && hovered) {
        root.setAlpha(255, 30, true)

        leaves.forEach(tagView => {
          leavesToShow.push(tagView.id)
        })

      } else {
        root.setAlpha(50, 1, true)
      }
    })

    leaves.forEach((roots, leaf) => {
      if (leavesToShow.indexOf(leaf.id) !== -1) {
        leaf.setAlpha(255, 30, true)
      } else {
        leaf.setAlpha(50, 5, true)
      }
    })
  }

  onProjectHover(id: string, hovered: boolean) {
    if (!hovered) return
    if (hovered) {
      if (this.hoveredProject == id) return
      this.hoveredProject = id;
    }

    this.links.forEach(link => {
      link.setSelected(link.projectView.id === this.hoveredProject)
    })

    this.highlightRoot(id, hovered, this.projectsToTags, this.tagsToProjects)
  }

  onTagHover(id: string, hovered: boolean) {
    if (!hovered) return
    if (hovered) {
      if (this.hoveredTag == id) return
      this.hoveredTag = id;
    }

    this.links.forEach(link => {
      link.setSelected(link.tagView.id === this.hoveredTag)
    })

    this.highlightRoot(id, hovered, this.tagsToProjects, this.projectsToTags)
  }

  onNoHover() {

    if (this.hoveredProject == "" && this.hoveredTag == "") return

    this.hoveredProject = ""
    this.hoveredTag = ""

    this.tagsToProjects.forEach((projectsViews, tagView) => {
      tagView.setAlpha(255, 5, true)
    })

    this.projectsToTags.forEach((tagsViews, projectView) => {
      projectView.setAlpha(255, 5, true)
    })

    this.links.forEach(link => {
      link.setSelected(false)
    });
  }

  getWidth(p: p5): number {
    throw new Error("getWidth not implemented.");
  }

  getHeight(p: p5): number {
    throw new Error("getHeight not implemented.");
  }

  onHoverIn(p: p5): void {

  }

  onHoverOut(p: p5): void {

  }

  contains(x: number, mouseY: number, p: p5): boolean {
    return false
  }

  setMaps(tagsToProjects: Map<TextView, TextView[]>, projectsToTags: Map<TextView, TextView[]>) {
    this.projectsToTags = projectsToTags
    this.tagsToProjects = tagsToProjects

    this.projectsToTags.forEach((tags, projectView) => {

      tags.forEach(tagView => {
        this.links.push(new Link(projectView, tagView))
      })


    })
  }

  render(p: p5): void {
    p.push();


    this.links.forEach(link => {
      link.render(p)
    })

    p.pop()
  }
}

class Link {

  projectView: TextView
  tagView: TextView

  minAlpha = 20

  maxBouns = 25

  mouseSpeed = new MouseSpeed()

  alpha: LinearAnimationValue = new LinearAnimationValue(this.minAlpha, 1, 0, 255)
  bouns: SinAnimationValue = new SinAnimationValue(this.maxBouns, 0.1)
  color: [number, number, number]

  selected: boolean = false;

  constructor(projectView: TextView, tagView: TextView) {
    this.projectView = projectView
    this.tagView = tagView
    this.color = lightenColor(stringToRGB(tagView.title))
  }

  setSelected(selected: boolean) {
    if (selected) {
      this.selected = true
      this.alpha.setTarget(255, 50);
      this.bouns.setTarget(this.maxBouns);
    } else {
      this.selected = false
      this.alpha.setTarget(this.minAlpha, 5);
      //this.bouns.setTarget(0);
    }
  }

  render(p: p5) {

    let projectX = this.projectView.getX() + this.projectView.getWidth(p);
    let projectY = this.projectView.getY() + this.projectView.getHeight(p);
    let tagX = this.tagView.getX();
    let tagY = this.tagView.getY() + this.tagView.getHeight(p);

    //p.stroke(255, 0, 0, this.alpha.calculate());
    p.stroke(this.color[0], this.color[1], this.color[2], this.alpha.calculate());
    p.noFill();
    this.mouseSpeed.render(p)
    let mspeed = this.mouseSpeed.speed / 1000
    let mDirection = this.mouseSpeed.direction


    let bounsCalc = this.bouns.calculate();
    const bv = bounsCalc
    for (let i = -5; i < 5; i++) {
      let bounsValue = bv * i;
      p.bezier(
        projectX,
        projectY,
        projectX + bounsValue + 50 + i * 10,
        projectY + bounsValue,
        tagX + bounsValue - 50 - i * 10,
        tagY + bounsValue,
        tagX,
        tagY
      );
    }
  }
}

export default LinksView;
