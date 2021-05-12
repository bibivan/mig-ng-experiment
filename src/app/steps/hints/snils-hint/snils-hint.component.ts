import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-snils-hint',
  templateUrl: './snils-hint.component.html',
  styleUrls: ['./snils-hint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnilsHintComponent {
  @Output() clickedButton: EventEmitter<any> = new EventEmitter<any>()
}
