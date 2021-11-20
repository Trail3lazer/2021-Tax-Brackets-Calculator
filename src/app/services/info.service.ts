import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  private readonly incomes$$ = new BehaviorSubject<IIncome>({
    primary: 0,
    secondary: 0,
  });
  public incomes$ = this.incomes$$.asObservable();
  constructor() {}
  public set nextIncome(value: IIncome) {
    this.incomes$$.next(value);
  }
}

export interface IIncome {
  primary: number;
  secondary: number
}
