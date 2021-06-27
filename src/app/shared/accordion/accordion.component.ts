import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit, OnChanges {
  @Input() opened: boolean = false
  @Input() caption: string = ''

  isOpen: boolean = false

  ngOnInit() {
    this.isOpen = this.opened || false
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.opened) {
      this.isOpen = changes.opened.currentValue
    }
  }


  toggle(): void {
    this.isOpen = !this.isOpen
  }

}
