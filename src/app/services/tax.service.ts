import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import {
  Bracket,
  calculateTotalTax,
  createBracketArray,
} from '../models/Bracket';
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
    createBracketArray(JointBracketsArray);
  constructor(private readonly infoService: InfoService) {}
  public TotalTax$ = this.infoService.incomes$.pipe(
    map(
      (x: IIncome): number =>
        calculateTotalTax(this.jointTaxBrackets2021, x.primary) +
        calculateTotalTax(this.jointTaxBrackets2021, x.secondary)
    )
  );
}
