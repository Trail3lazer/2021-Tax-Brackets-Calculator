import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilingStatus } from '../models/FilingStatus';
import { IIncome } from '../models/IIncome';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  private readonly incomes$$ = new BehaviorSubject<IIncome>({
    primary: 0,
    secondary: 0,
  });
  private readonly filingStatus$$ = new BehaviorSubject<FilingStatus>('joint');
  public filingStatus$ = this.filingStatus$$.asObservable();
  public incomes$ = combineLatest([this.incomes$$, this.filingStatus$]).pipe(
    map(([income, status]: [IIncome, FilingStatus]) => ({
      primary: income.primary,
      secondary: status === 'joint' ? income.secondary : 0,
    }))
  );

  public set nextIncome(value: IIncome) {
    this.incomes$$.next(value);
  }
  public set nextFilingStatus(value: FilingStatus) {
    this.filingStatus$$.next(value);
  }
}
