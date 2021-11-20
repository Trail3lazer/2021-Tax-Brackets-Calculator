export class Bracket {
  public max: number;
  public min: number;
  public taxPercent: number;
  constructor(max: number, tax: number, min: number) {
    this.max = max;
    this.taxPercent = tax;
    this.min = min;
  }
  public get total(): number {
    return this.max * (this.taxPercent * 0.01);
  }
}
