class SinAnimationValue {
  private angle: number = 0;
  private step: number = Math.PI / 20; // Default step for animation speed
  private target: number = 0;
  private cycles: number = 1;
  private active: boolean = false;

  constructor(target: number, step: number) {
    this.target = target;
    this.step = step;
  }

  setTarget(
    target: number,
    step: number = this.step,
    cycles: number = 1
  ) {
    if(this.active) return;
    this.target = target;
    this.step = step;
    this.cycles = cycles;
    this.angle = 0;
    this.active = true;
  }

  calculate(): number {
    if (!this.active) {
      return 0;
    }

    const value = this.target * Math.sin(this.angle);
    this.angle += this.step;

    // Check if the animation has completed one full spike
    //if (this.angle >= Math.PI) {
    if (this.angle >= Math.PI * 2) {
      this.active = false;
      this.target = 0;
      this.angle = 0; // Reset angle for potential future animations
    }

    // Ensure that we return zero if the sine value is negative
    //return value > 0 ? value : 0;
    return value;
  }
}

export default SinAnimationValue;
