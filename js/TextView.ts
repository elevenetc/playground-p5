import View from "./View";
import p5 from "p5";

const alphaStep = 25;
const maxAlpha = 200;

class TextView implements View {

  public x: number;
  public y: number;
  public parent: View;

  public title: string;

  public hover: boolean = false;
  public bgAlpha: number = 0;

  constructor(title: string) {
    this.title = title;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  public getX(): number {
    return this.x + (this.parent?.getX() ?? 0);
  }

  public getY(): number {
    return this.y + (this.parent?.getY() ?? 0);
  }

  public contains(x: number, mouseY: number, p: p5): boolean {
    const w = this.getWidth(p);
    const h = this.getHeight(p);
    const thisX = this.getX()
    const thisY = this.getY()
    return x >= thisX && x <= thisX + w &&
      mouseY >= thisY && mouseY <= thisY + h;
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
