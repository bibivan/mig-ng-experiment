import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { formProgressStepsType, StepInfoInterface } from './form-progress.model'
import { FormProgressService } from './form-progress.service'

@Component({
  selector: 'app-form-progress',
  templateUrl: './form-progress.component.html',
  styleUrls: ['./form-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormProgressComponent implements OnInit {
  @Input() stepPercent: number
  @Input() stepId: formProgressStepsType

  stepInfo: StepInfoInterface

  constructor(
    private formProgress: FormProgressService
  ) {}

  ngOnInit(): void {
    this.stepInfo = this.formProgress.getStepInfo(this.stepId)
  }

  get percent(): number {
    return this.stepInfo.minPercent + this.stepPercent
  }

}
