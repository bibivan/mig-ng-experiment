import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() disabled: boolean = false
  @Input() readonly: boolean = false
  @Input() mandatory: boolean = false
  @Input() placeholder: string = ''
  @Input() errorMessage: string = ''
  @Input() errorMessageHidden: boolean = false

  value: any = ''
  focused = false

  private sub = new Subscription()
  formControl = new FormControl('')

  private onChange = (value: any) => { }
  private onTouched = () => { }
  registerOnChange = (fn: (value: any) => {}) => this.onChange = fn
  registerOnTouched = (fn: () => {}) => this.onTouched = fn

  ngOnInit(): void {
    this.sub = this.formControl.valueChanges.subscribe(value => {
      this.onTouched()
      this.onChange(value)

      this.value = value
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable()
    } else {
      this.formControl.enable()
    }
    this.disabled = isDisabled
  }

  writeValue(obj: any): void {
    if (obj) {
      this.onTouched()
    }

    this.formControl.setValue(obj, { emitEvent: false })
  }

  onBlur(): void {
    this.focused = false
  }

  onFocus(): void {
    this.focused = true
  }
}
