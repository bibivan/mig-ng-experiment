import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-final-icon',
  templateUrl: './final-icon.component.html',
  styleUrls: ['./final-icon.component.scss']
})
export class FinalIconComponent {
  @Input() theme: 'success' | 'warning' | 'refuse' | 'sad' | 'technical_work' | 'wait' = 'success'
}
