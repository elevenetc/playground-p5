import p5 from "p5";
import TextView from "./TextView";
import View from "./View";
import Align from "./Align";

class LinksView extends View {

  id?: string;
  align?: Align;
  parent?: View;

  projectsToTags: Map<TextView, TextView[]>
  tagsToProjects: Map<TextView, TextView[]>

  links: Link[] = []

  setX(x: number): void {

  }

  setY(y: number): void {

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
    p.stroke(255, 0, 0, 50);
    p.noFill();

    this.links.forEach(link => {
      link.render(p)
    })

    p.pop()
  }
}

class Link {
  projectView: TextView
  tagView: TextView

  constructor(projectView: TextView, tagView: TextView) {
    this.projectView = projectView
    this.tagView = tagView
  }

  render(p: p5) {
    let projectX = this.projectView.getX() + this.projectView.getWidth(p);
    let projectY = this.projectView.getY() + this.projectView.getHeight(p);
    let tagX = this.tagView.getX();
    let tagY = this.tagView.getY() + this.tagView.getHeight(p);
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
