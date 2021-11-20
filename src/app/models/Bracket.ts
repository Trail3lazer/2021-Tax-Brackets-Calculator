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

export function createBracketArray(brackets: number[][]): Bracket[] {
  const newBrackets: Bracket[] = [];

  for (let i = 0; i < brackets.length; i++) {
    const current = brackets[i];
    const next = brackets[i + 1];
    let min = 0;

    if (next) {
      min = next[0] + 0.01;
    }

    newBrackets.push(new Bracket(current[0], current[1], min));
  }

  return newBrackets;
}

export function calculateTotalTax(
  brackets: Bracket[],
  grossIncome: number
): number {
  if (!grossIncome) {
    return 0;
  }
  const filtered = brackets.filter((x) => {
    console.log(x.min, grossIncome);
    return x.min <= grossIncome;
  });
  console.log(filtered);
  const total = filtered.reduce((sum, cur) => {
    if (cur.max < grossIncome) {
      sum += cur.total;
      console.log(cur.total);
    } else {
      sum += cur.taxPercent * 0.01 * (grossIncome - cur.min + 0.01);
    }
    return sum;
  }, 0);
  return total;
}
