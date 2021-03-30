import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button'
  @Input() theme: 'default' | 'primary' | 'get-money' | 'cancel' | 'return' = 'primary'
  @Input() inline: boolean
  @Input() disabled: boolean

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>()
}
