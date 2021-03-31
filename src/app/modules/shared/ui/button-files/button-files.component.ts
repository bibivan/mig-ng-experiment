import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-button-files',
  templateUrl: './button-files.component.html',
  styleUrls: ['./button-files.component.scss'],
})
export class ButtonFilesComponent {
  @Input() url: string
}
