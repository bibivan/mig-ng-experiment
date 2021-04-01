import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { inputType, MaskConfigInterface } from './input-slider.model'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-input-slider',
  templateUrl: './input-slider.component.html',
  styleUrls: ['./input-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSliderComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSliderComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder = ''
  @Input() min: number
  @Input() max: number
  @Input() unit: Array<string>

  value: any = ''
  focused = false
  isPassword: boolean
  maskConfig: MaskConfigInterface
  disabled: boolean

  currencyConfig = null

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
