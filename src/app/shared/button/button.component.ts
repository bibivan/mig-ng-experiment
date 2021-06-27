import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button'
  @Input() theme: 'default' | 'primary' | 'get-money' | 'cancel' | 'return' = 'primary'
  @Input() inline: boolean = false
  @Input() disabled: boolean = false

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>()
}
