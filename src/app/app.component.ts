import { Component } from '@angular/core';
import { combineLatest } from "rxjs";
import {map} from "rxjs/operators"
import { InfoService } from "./services/info.service";
import { JointService } from "./services/joint.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public vm$ = combineLatest([this.infoService.incomes$]).pipe(map(([incomes])=>({incomes: incomes})));
  constructor(private readonly infoService: InfoService, private readonly jointService: JointService) {}
}
