import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { OrderInterface } from '../../services/app.model'

@Component({
  selector: 'app-step-preloader',
  templateUrl: './step-preloader.component.html',
  styleUrls: ['./step-preloader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepPreloaderComponent {
  @Input() order!: OrderInterface | null
  @Input() preloaderRequest = ''
}
