import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AppService } from '../../../services/app.service'

@Component({
  selector: 'app-sum-loan-hint',
  templateUrl: './sum-loan-hint.component.html',
  styleUrls: ['./sum-loan-hint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SumLoanHintComponent {
  @Input() sum: number
  @Output() clickedButton: EventEmitter<any> = new EventEmitter<any>()

}
