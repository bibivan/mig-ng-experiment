import { animate, style, transition, trigger } from '@angular/animations'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('.4s ease', style({
          opacity: 1,
          transform: 'translateX(0%)'
        })),
      ]),
      transition(':leave', [
        animate('.4s ease', style({
          opacity: 0,
          transform: 'translateY(-100%)'
        })),
      ]),
    ])
  ]
})


export class ToastComponent {
  @Input() caption: string
  @Input() text: string
}
