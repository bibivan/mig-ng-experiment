import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-form-progress',
  templateUrl: './form-progress.component.html',
  styleUrls: ['./form-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormProgressComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
