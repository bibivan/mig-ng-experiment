import {Component, forwardRef, Input} from '@angular/core'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckboxComponent),
      multi: true
    }
  ]
})
export class InputCheckboxComponent implements ControlValueAccessor {
  @Input() disabled: boolean

  @Input('value') _value = false

  get value(): boolean {
    return this._value
  }

  set value(val) {
    this._value = val
    this.onChange(val)
    this.onTouched()
  }

  onChange: any = () => {
  }

  onTouched: any = () => {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  writeValue(value): void {
    if (value) {
      this.value = value
    }
  }

  registerOnTouched(fn): void {
    this.onTouched = fn
  }

  switch(): void {
    this.value = !this.value
  }
}
