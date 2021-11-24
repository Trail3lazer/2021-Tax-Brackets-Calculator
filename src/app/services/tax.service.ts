import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Bracket } from '../models/Bracket';
import { InfoService } from './info.service';
import { IIncome } from '../models/IIncome';
import { JointData } from '../models/JointData';
import { SingleData } from '../models/SingleData';
import { combineLatest } from 'rxjs';
import { FilingStatus } from '../models/FilingStatus';

@Injectable({
  providedIn: 'root',
})
export class TaxService {
  private jointTaxBrackets2021: Bracket[] = this.createBracketArray(JointData);
  private singleTaxBrackets2021: Bracket[] =
    this.createBracketArray(SingleData);
  constructor(private readonly infoService: InfoService) {}
  public TotalTax$ = combineLatest([
    this.infoService.incomes$,
    this.infoService.filingStatus$,
  ]).pipe(
    map(([income, status]: [IIncome, FilingStatus]): number => {
      const brackets =
        status === 'joint'
          ? this.jointTaxBrackets2021
          : this.singleTaxBrackets2021;
      return this.calculateTotalTax(
        brackets,
        income.primary + income.secondary
      );
    })
  );

  private createBracketArray(data: number[][]): Bracket[] {
    const newBrackets: Bracket[] = [];
    for (let i = 0; i < data.length; i++) {
      const current = data[i];
      const next = data[i + 1];
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
