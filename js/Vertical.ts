import p5 from 'p5';
import View from "./View";
import Align from "./Align"

class Vertical implements View {

  align?: Align
  public x: number;
  public y: number;
  public alignContent: Align = Align.LEFT
  children: View[] = [];

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  getHeight(p: p5): number {
    let h = 0;
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      h += child.getHeight(p)
    }
    return h;
  }

  getWidth(p: p5): number {
    let w = 0;
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      w = Math.max(child.getWidth(p), w)
    }
    return w;
  }


  public addChild(child: View) {
    this.children.push(child);
    child.parent = this;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public contains(x: number, y: number, p: p5): boolean {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.contains(x, y, p)) {
        return true
      }
    }
    return false;
  }

  public draw(p: p5) {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const y = this.y + i * child.getHeight(p);
      if (this.alignContent === Align.LEFT) {
        child.setX(this.x)
        child.setY(y)
      } else if (this.alignContent == Align.RIGHT) {
        const maxChildWidth = this.getWidth(p)
        child.setX(this.x + maxChildWidth - child.getWidth(p))
        child.setY(y)
      } else {
        throw new Error("Unknown alignContent: " + this.alignContent)
      }
      child.draw(p);
    }

    let c: p5.Color;
    c = p.color(0, 204, 0, 30)

    p.fill(c);
    p.rect(this.x, this.y, this.getWidth(p), this.getHeight(p));
  }

  public onHoverIn(p: p5) {

  }

  public onHoverOut(p: p5) {

  }
}

export default Vertical;
