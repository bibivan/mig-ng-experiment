import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { timer } from 'rxjs'

@Component({
  selector: 'app-input-code',
  templateUrl: './input-code.component.html',
  styleUrls: ['./input-code.component.scss'],
})
export class InputCodeComponent implements OnInit {
  @Input() codeLength = 4
  @Input() code: string
  @Output() codeCompleted: EventEmitter<string> = new EventEmitter<string>()

  error = ''

  ngOnInit(): void {
    if (this.code) {
      this.error = 'Укажите корректный код'
    }
  }

  onClick(): void {
    this.error = ''
    this.code = ''
  }
}
