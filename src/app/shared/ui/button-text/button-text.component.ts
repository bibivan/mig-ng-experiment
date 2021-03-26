import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-button-text',
  templateUrl: './button-text.component.html',
  styleUrls: ['./button-text.component.scss'],
})
export class ButtonTextComponent {
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>()

}
