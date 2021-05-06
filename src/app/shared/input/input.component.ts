import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, Output,
  SimpleChanges
} from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CurrencyMaskInputMode } from 'ngx-currency'
import { inputType, MaskConfigInterface, maskType } from './input.model'
import { Subscription } from 'rxjs'

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
export class InputComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
  @Input() readonly: boolean
  @Input() mandatory: boolean
  @Input() placeholder = ''
  @Input() type: inputType = 'text'
  @Input() maxlength = 256
  @Input() errorMessage = ''
  @Input() errorMessageHidden = false
  @Input() mask: maskType
  @Input() matAutocomplete: string
  @Input() currencyPrecision = 2
  @Input() currencySuffix = ' ₽'
  @Input() currencyMax = 1000000
  @Input() currencyMin = 0
  @Input() currencyThousands = ' '
  @Input() currencyInputModeNatural = false
  @Input() inputSlider = false
  @Output() blurEvent: EventEmitter<any> = new EventEmitter<any>()
  @Output() focusEvent: EventEmitter<any> = new EventEmitter<any>()

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
    this.currencyConfig = {
      align: 'left',
      allowNegative: false,
      prefix: '',
      thousands: this.currencyThousands,
      decimal: ',',
      suffix: this.currencySuffix,
      min: this.currencyMin,
      max: this.currencyMax,
      precision: this.currencyPrecision,
      nullable: true,
      inputMode: this.currencyInputModeNatural ? CurrencyMaskInputMode.NATURAL : CurrencyMaskInputMode.FINANCIAL
    }

    this.sub = this.formControl.valueChanges.subscribe(value => {
      this.onTouched()
      this.onChange(value)

      this.value = value
    })

    this.isPassword = this.type === 'password'
    this.maskConfig = this.getMaskConfig(this.mask)
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currencySuffix && this.currencyConfig) {
      this.currencyConfig.suffix = changes.currencySuffix.currentValue
    }
  }

  getMaskConfig(type: maskType): MaskConfigInterface {
    if (type === 'phone') {
      return { mask: '(000) 000-00-00', prefix: '+7 ' }
    }

    if (type === 'stacPhone') {
      return { mask: '0000000000', prefix: '+7 ' }
    }

    if (type === 'date') {
      return { mask: '00.00.0000' }
    }

    if (type === 'dateMonthYear') {
      return { mask: '00.0000' }
    }

    if (type === 'serialNumberPassport') {
      return { mask: '0000 000000' }
    }

    if (type === 'codePassport') {
      return { mask: '000-000' }
    }

    if (type === 'snils') {
      return { mask: '000-000-000 00' }
    }

    return { mask: '', prefix: '', suffix: '', thousandSeparator: '' }
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
    this.blurEvent.emit(this.value)
  }

  onFocus(): void {
    this.focused = true
    this.focusEvent.emit(this.value)
  }

  togglePassword(): void {
    if (this.type === 'password') {
      this.type = 'text'
    } else {
      this.type = 'password'
    }
  }
}
