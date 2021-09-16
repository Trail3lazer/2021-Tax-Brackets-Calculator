import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private readonly incomes$$ = new BehaviorSubject<IIncome>({primary: 0, secondary: 0});
  public incomes$ = this.incomes$$.asObservable();
  constructor() { }
}

export interface IIncome {
  primary: number;
  secondary: number
}
