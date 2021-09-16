import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent implements OnInit {
  private form!: FormGroup;

  constructor(private readonly builder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      primary: this.builder.control(0),
      secondary: this.builder.control(0),
    });
  }
}
