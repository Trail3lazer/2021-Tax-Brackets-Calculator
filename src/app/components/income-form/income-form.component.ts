import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent implements OnInit {
  public primaryControl = this.builder.control(0);
  public secondaryControl = this.builder.control(0);
  public form: FormGroup = this.builder.group({
    primary: this.primaryControl,
    secondary: this.secondaryControl,
  });

  constructor(private readonly builder: FormBuilder) {}

  ngOnInit(): void {}
}
