import {ChangeDetectionStrategy, Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {inputType, MaskConfigInterface, maskType} from "./input.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {
  @Input() load: boolean
  @Input() disabled: boolean
  @Input() readonly: boolean
  @Input() mandatory: boolean
  @Input() placeholder = ''
  @Input() type: inputType = 'text'
  @Input() maxlength = 256
  @Input() errorMessage = ''
  @Input() errorMessageHidden = false
  @Input() mask: maskType

  value: any = ''
  focused = false
  maskConfig: MaskConfigInterface

  currencyConfig = {
    align: 'left',
    allowNegative: false,
    prefix: '',
    thousands: ' ',
    decimal: ',',
    suffix: ' ₽',
    max: 1000000
  }
  formControl = new FormControl('')
  private sub = new Subscription()

  registerOnChange = (fn: (value: any) => {}) => this.onChange = fn

  registerOnTouched = (fn: () => {}) => this.onTouched = fn

  ngOnInit(): void {
    this.sub = this.formControl.valueChanges.subscribe(value => {
      this.onTouched()
      this.onChange(value)

      this.value = value
    })

    this.maskConfig = this.getMaskConfig(this.mask)
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

  getMaskConfig(type: maskType): MaskConfigInterface {
    if (type === 'phone') {
      return {mask: '000 000 00 00', prefix: '+7 '}
    }

    if (type === 'date') {
      return {mask: '00.00.0000'}
    }

    return {mask: '', prefix: '', suffix: '', thousandSeparator: ''}
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

    this.formControl.setValue(obj, {emitEvent: false})
  }

  onBlur(): void {
    this.focused = false
  }

  onFocus(): void {
    this.focused = true
  }

  private onChange = (value: any) => {
  }

  private onTouched = () => {
  }

}
