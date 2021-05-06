import {
  Directive,
  ElementRef,
  HostListener
} from '@angular/core'

@Directive({
  selector: '[appInvalidControlFocus]',
})
export class InvalidControlFocusDirective {
  constructor(
    private elementRef: ElementRef,
  ) { }

  @HostListener('submit')
  onFormSubmit(): void {
    const selectors = [
      'app-textarea.ng-invalid textarea',
      'app-input.ng-invalid input',
      'app-input-autocomplete.ng-invalid input',
      'app-input-autocomplete .error:not(.disabled) input',
      'app-select.ng-invalid',
    ]

    const invalidControl = this.elementRef.nativeElement.querySelector(
      selectors.join(','),
    )

    if (invalidControl) {
      invalidControl.scrollIntoView({ block: 'center' })
      invalidControl.focus()
    }

  }

}
