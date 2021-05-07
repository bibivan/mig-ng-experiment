import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-insurance-info-hint',
  templateUrl: './insurance-info-hint.component.html',
  styleUrls: ['./insurance-info-hint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsuranceInfoHintComponent {
  @Output() clickedButton: EventEmitter<any> = new EventEmitter<any>()

}
