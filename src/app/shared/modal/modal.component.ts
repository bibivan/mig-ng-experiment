import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() small: boolean = false
  @Input() caption: string = ''
  @Input() centered: boolean = true
  @Input() bottomMobile: boolean = false
  @Output() closed: EventEmitter<void> = new EventEmitter<void>()

  close(): void {
    this.closed.emit()
  }
}
