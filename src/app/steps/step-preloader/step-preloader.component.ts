import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-step-preloader',
  templateUrl: './step-preloader.component.html',
  styleUrls: ['./step-preloader.component.scss']
})
export class StepPreloaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.scrollTop = 0
  }

}
