import View from "./View";
import p5 from "p5";

const alphaStep = 25;
const maxAlpha = 200;

class TextView extends View {

  public title: string;
  public bgAlpha: number = 0;

  constructor(title: string)
  constructor(title: string, id: string)
  constructor(title: string, id: string, hoverHandler: (id: string, hovered: boolean, p: p5) => void)
  constructor(...args: any[]) {
    super()
    if (args.length === 1) {
      this.title = args[0];
    } else if (args.length === 2) {
      this.title = args[0];
      this.id = args[1];
    } else {
      this.title = args[0];
      this.id = args[1];
      this.hoverHandler = args[2];
    }
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

  public render(p: p5) {

    if (this.bgAlpha > 0) {
      p.noStroke()
      p.fill(200, this.bgAlpha)
      p.rect(this.x, this.y, this.getWidth(p), this.getHeight(p))
    }

    if (this.hover) this.bgAlpha = p.min(this.bgAlpha + alphaStep, maxAlpha);
    else this.bgAlpha = p.max(this.bgAlpha - alphaStep, 0);

    p.fill(255, this.alpha.calculate());
    p.text(this.title, this.x, this.y + this.getHeight(p));
  }

  getWidth(p: p5): number {
    return p.textWidth(this.title);
  }

  getHeight(p: p5): number {
    return p.textAscent() + p.textDescent();
  }

  public onHoverIn(p: p5) {
    super.onHoverIn(p);
    this.hover = true;

  }

  public onHoverOut(p: p5) {
    super.onHoverOut(p);
    this.hover = false;
  }
}



export default TextView;
