import Align from "./Align";
import p5 from "p5";
import {notImplementedError} from "./errorUtils";

class View {

  id?: string;

  align?: Align

  parent?: View;

  x: number;
  y: number;

  hoverHandler: (id: string, hovered: boolean) => void;

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  getWidth(p: p5): number {
    throw new Error("getWidth not implemented.");
  }

  getHeight(p: p5): number {
    throw new Error("getHeight not implemented.");
  }

  render(p: p5): void {
    throw new Error("draw not implemented.");
  }

  onHoverIn(p: p5): void {
    this.hoverHandler?.call(this.id, true)
  }

  onHoverOut(p: p5): void {
    this.hoverHandler?.call(this.id, false)
  }

  contains(x: number, mouseY: number, p: p5): boolean {
    throw new Error(`${this.constructor.name}.contains not implemented.`);
  }

  handleHover(mouseX: number, mouseY: number, p: p5): boolean {
    let result = false;
    if (this.contains(mouseX, mouseY, p)) {
      this.onHoverIn(p);
      result = true;
    } else {
      this.onHoverOut(p);
    }
    return result;
  }
}

export default View;
