import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Bracket } from '../models/Bracket';
import { IIncome, InfoService } from './info.service';

const JointBracketsArray = [
  [Number.MAX_VALUE, 37],
  [622050, 35],
  [414700, 32],
  [326600, 24],
  [171050, 22],
  [80250, 12],
  [19750, 10],
];
@Injectable({
  providedIn: 'root',
})
export class TaxService {
  private jointTaxBrackets2021: Bracket[] =
    this.createBracketArray(JointBracketsArray);
  constructor(private readonly infoService: InfoService) {}
  public TotalTax$ = this.infoService.incomes$.pipe(
    map((x: IIncome): number =>
      this.calculateTotalTax(this.jointTaxBrackets2021, x.primary + x.secondary)
    )
  );

  private createBracketArray(brackets: number[][]): Bracket[] {
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

  private calculateTotalTax(brackets: Bracket[], grossIncome: number): number {
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
}
