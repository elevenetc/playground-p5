import p5 from "p5";

interface View {
  parent?: View;
  getX(): number;
  getY(): number;
  setX(x: number): void;
  setY(y: number): void;
  getWidth(p: p5): number;
  getHeight(p: p5): number;
  draw(p:p5): void;
  onHoverIn(p: p5): void;
  onHoverOut(p: p5): void;
}

export default View;
