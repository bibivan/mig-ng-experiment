import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'

import { Subscription } from 'rxjs'

import { selectOptionsType } from './select.model'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() disabled: boolean
  @Input() readonly: boolean
  @Input() mandatory: boolean
  @Input() placeholder: ''
  @Input() errorMessage = ''
  @Input() options: selectOptionsType

  value: any = ''
  focused: boolean

  private sub = new Subscription()
  formControl = new FormControl('')

  private onChange = (value: any) => { }
  private onTouched = () => { }
  registerOnChange = (fn: (value: any) => {}) => this.onChange = fn
  registerOnTouched = (fn: () => {}) => this.onTouched = fn

  ngOnInit(): void {
    this.sub = this.formControl.valueChanges.subscribe(this.onValueChanges.bind(this))

    console.log(this.formControl)
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

  private onValueChanges(value: any): void {
    this.onTouched()
    this.onChange(value)
    this.value = value
  }
}
