import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-security-message',
  templateUrl: './security-message.component.html',
  styleUrls: ['./security-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityMessageComponent {

}
