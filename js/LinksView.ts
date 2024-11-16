import p5 from "p5";
import TextView from "./TextView";
import View from "./View";
import Align from "./Align";
import AnimationValue from "./AnimationValue";
import {lightenColor, stringToRGB} from "./colorUtils";

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
        console.log("hightlight root", root.id)
        root.setAlpha(255, 30, true)

        leaves.forEach(tagView => {
          leavesToShow.push(tagView.id)
        })

      } else {
        console.log("dim root", root.id)
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
    if(!hovered) return
    if (hovered) {
      if(this.hoveredProject == id) return
      this.hoveredProject = id;
    }

    console.log("onProjectHover: " + id)

    this.links.forEach(link => {
      link.setSelected(link.projectView.id === this.hoveredProject)
    })

    this.highlightRoot(id, hovered, this.projectsToTags, this.tagsToProjects)
  }

  onTagHover(id: string, hovered: boolean) {
    if(!hovered) return
    if (hovered) {
      if(this.hoveredTag == id) return
      this.hoveredTag = id;
    }

    this.links.forEach(link => {
      link.setSelected(link.tagView.id === this.hoveredTag)
    })

    this.highlightRoot(id, hovered, this.tagsToProjects, this.projectsToTags)
  }

  onNoHover() {

    if(this.hoveredProject == "" && this.hoveredTag == "") return

    console.log("no hover")
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

  alpha: AnimationValue = new AnimationValue(50, 1, 0, 255)
  color:[number, number, number]

  constructor(projectView: TextView, tagView: TextView) {
    this.projectView = projectView
    this.tagView = tagView
    this.color = lightenColor(stringToRGB(tagView.title))
  }

  setSelected(selected: boolean) {
    if (selected) {
      this.alpha.setTarget(255, 50);
    } else {
      this.alpha.setTarget(50, 5);
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

    p.bezier(
      projectX,
      projectY,
      projectX + 100,
      projectY - 50,
      tagX - 100,
      tagY + 50,
      tagX,
      tagY
    );
  }
}

export default LinksView;
