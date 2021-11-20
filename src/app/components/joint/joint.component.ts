import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-joint',
  templateUrl: './joint.component.html',
  styleUrls: ['./joint.component.scss'],
})
export class JointComponent {
  @Input() public vm: any;
}
