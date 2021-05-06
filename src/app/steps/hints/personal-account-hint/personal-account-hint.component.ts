import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-personal-account-hint',
  templateUrl: './personal-account-hint.component.html',
  styleUrls: ['./personal-account-hint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalAccountHintComponent {
  @Output() clickedButton: EventEmitter<any> = new EventEmitter<any>()
}
