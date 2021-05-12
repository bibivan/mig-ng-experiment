import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { openExternalLink } from '../../../helpers/helper'

@Component({
  selector: 'app-insurance-term-hint',
  templateUrl: './insurance-term-hint.component.html',
  styleUrls: ['./insurance-term-hint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsuranceTermHintComponent {
  @Output() clickedButton: EventEmitter<any> = new EventEmitter<any>()


  openLink(url: string): void {
    openExternalLink(url + '?d=' + Math.random())
  }
}
