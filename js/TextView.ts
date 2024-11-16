import View from "./View";
import p5 from "p5";

const alphaStep = 25;
const maxAlpha = 200;

class TextView implements View {

  id?: string;
  public x: number;
  public y: number;
  public parent: View;

  public title: string;

  public hover: boolean = false;
  public bgAlpha: number = 0;

  constructor(title: string)
  constructor(title: string, id: string)
  constructor(...args: any[]) {
    if (args.length === 1) {
      this.title = args[0];
    } else {
      this.title = args[0];
      this.id = args[1];
    }
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public contains(x: number, mouseY: number, p: p5): boolean {
    const w = this.getWidth(p);
    const h = this.getHeight(p);
    const thisX = this.getX()
    const thisY = this.getY()
    let result = x >= thisX && x <= thisX + w &&
      mouseY >= thisY && mouseY <= thisY + h;
    return result;
  }

  public draw(p: p5) {

    if (this.contains(p.mouseX, p.mouseY, p)) {
      this.onHoverIn(p);
    } else {
      this.onHoverOut(p);
    }

    if (this.bgAlpha > 0) {
      p.noStroke()
      p.fill(200, this.bgAlpha)
      p.rect(this.x, this.y, this.getWidth(p), this.getHeight(p))
    }

    p.fill(255);
    p.text(this.title, this.x, this.y + this.getHeight(p));
  }

  getWidth(p: p5): number {
    return p.textWidth(this.title);
  }

  getHeight(p: p5): number {
    return p.textAscent() + p.textDescent();
  }

  public onHoverIn(p: p5) {
    this.hover = true;
    this.bgAlpha = p.min(this.bgAlpha + alphaStep, maxAlpha);
  }

  public onHoverOut(p: p5) {
    this.hover = false;
    this.bgAlpha = p.max(this.bgAlpha - alphaStep, 0);
  }
}

export default TextView;
