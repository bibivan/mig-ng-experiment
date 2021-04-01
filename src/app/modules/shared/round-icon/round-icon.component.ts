import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-round-icon',
  templateUrl: './round-icon.component.html',
  styleUrls: ['./round-icon.component.scss']
})
export class RoundIconComponent {
  @Input() name: string
  @Input() theme: 'primary' | 'error' | 'success' = 'primary'
}
