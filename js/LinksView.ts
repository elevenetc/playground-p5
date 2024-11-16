import p5 from "p5";
import TextView from "./TextView";
import View from "./View";
import Align from "./Align";

class LinksView implements View {

  id?: string;
  align?: Align;
  parent?: View;

  projectsToTags: Map<TextView, TextView[]>
  tagsToProjects: Map<TextView, TextView[]>

  getX(): number {
      throw new Error("getX not implemented.");
  }
  getY(): number {
      throw new Error("getY not implemented.");
  }
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
      throw new Error("onHoverIn not implemented.");
  }
  onHoverOut(p: p5): void {
      throw new Error("onHoverOut not implemented.");
  }
  contains(x: number, mouseY: number, p: p5): boolean {
      return false
  }

  setMaps(tagsToProjects: Map<TextView, TextView[]>, projectsToTags: Map<TextView, TextView[]>){
    this.projectsToTags = projectsToTags
    this.tagsToProjects = tagsToProjects
  }

  draw(p: p5): void {
    p.stroke(255, 0, 0);
    p.noFill();


    this.projectsToTags.forEach((tags, project) => {

      tags.forEach(tag => {
        //console.log(tag)

        let projectX = project.getX() + project.getWidth(p);
        let projectY = project.getY() + project.getHeight(p);
        let tagX = tag.getX();
        let tagY = tag.getY() + tag.getHeight(p);
        p.bezier(
          projectX,
          projectY,
          projectX + 100,
          projectY,
          tagX - 100,
          tagY,
          tagX,
          tagY
        );
      })


    })

    p.stroke(0)
  }
}

export default LinksView;
