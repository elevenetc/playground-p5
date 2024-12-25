import View from "./View";
import Align from "./Align";
import p5 from "p5";
import {handleChildrenHover} from "./utils/viewUtils";

class Free extends View {
  parent?: View;
  private children: View[] = [];

  addChild(child: View): void {
    this.children.push(child);
    child.parent = this;
  }

  getX(): number {
    return 0
  }

  getY(): number {
    return 0
  }

  setX(x: number): void {
    throw new Error("Free is fills the whole screen");
  }

  setY(y: number): void {
    throw new Error("Free is fills the whole screen");
  }

  getWidth(p: import("p5")): number {
    return p.windowWidth
  }

  getHeight(p: import("p5")): number {
    return p.windowHeight
  }

  render(p: import("p5")): void {


    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const align = child.align ?? Align.LEFT_TOP
      if (align === Align.LEFT_TOP) {
        child.setX(this.getX())
        child.setY(this.getY())
      } else if (align === Align.RIGHT_TOP) {
        child.setX(this.getWidth(p) - child.getWidth(p))
        child.setY(this.getY())
      } else {
        throw new Error("Unknown align at Free: " + align)
      }

      child.render(p)
    }
  }

  handleHover(mouseX: number, mouseY: number, p: p5): boolean {
    return handleChildrenHover(this.children, mouseX, mouseY, p)
  }

  contains(x: number, y: number, p: import("p5")): boolean {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.contains(x, y, p)) {
        return true
      }
    }
    return false;
  }

  onHoverIn(p: import("p5")): void {

  }

  onHoverOut(p: import("p5")): void {

  }

}

export default Free;
