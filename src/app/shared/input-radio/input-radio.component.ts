import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subscription } from 'rxjs'
import { inputRadioButtonListType } from './input-radio.model'

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true
    }
  ]
})

export class InputRadioComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() items!: inputRadioButtonListType
  @Input() errorMessage: string = ''

  value: any = ''

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

  writeValue(obj: any): void {
    if (obj) {
      this.onTouched()
    }

    this.formControl.setValue(obj, { emitEvent: false })
  }

}
