import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'


export interface StepInfoInterface {
  min: number,
  max: number,
  num: number
}

@Component({
  selector: 'app-form-progress',
  templateUrl: './form-progress.component.html',
  styleUrls: ['./form-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormProgressComponent implements OnInit {
  @Input() currentPercent: number // текущий процент
  @Input() stepInfo: StepInfoInterface

  constructor() {
  }

  ngOnInit(): void {
  }

}
