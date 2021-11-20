import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { IncomeFormComponent } from './components/income-form/income-form.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { JointComponent } from './components/joint/joint.component';
import { SingleComponent } from './components/single/single.component';

@NgModule({
  declarations: [
    AppComponent,
    IncomeFormComponent,
    TooltipComponent,
    JointComponent,
    SingleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
