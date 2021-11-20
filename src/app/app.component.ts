import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilingStatus } from './models/FilingStatus';
import { InfoService } from './services/info.service';
import { TaxService } from './services/tax.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private filingStatus$$ = new BehaviorSubject<FilingStatus>('joint');
  public vm$ = combineLatest([
    this.infoService.incomes$,
    this.taxService.TotalTax$,
    this.filingStatus$$,
  ]).pipe(
    map(([incomes, totals, status]) => ({
      incomes,
      totals,
      status,
    }))
  );
  constructor(
    private readonly infoService: InfoService,
    private readonly taxService: TaxService
  ) {}

  public changeStatus(status: FilingStatus) {
    this.filingStatus$$.next(status);
  }
}
