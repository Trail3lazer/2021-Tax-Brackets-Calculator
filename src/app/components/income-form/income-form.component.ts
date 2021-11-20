import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinct } from 'rxjs/operators';
import { FilingStatus } from 'src/app/models/FilingStatus';
import { IIncome, InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent implements OnInit, OnDestroy {
  @Input() status: FilingStatus;
  private changesSub: Subscription;
  public form: FormGroup;
  constructor(
    private readonly builder: FormBuilder,
    private readonly infoService: InfoService
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      primary: this.builder.control(0),
      secondary: this.builder.control(0),
    });

    this.changesSub = this.form.valueChanges
      .pipe()
      .subscribe((changes: any) => {
        this.infoService.nextIncome = changes as IIncome;
      });
  }

  ngOnDestroy() {
    this.changesSub.unsubscribe();
  }
}
