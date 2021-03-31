import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core'
import {
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'

import { Subscription } from 'rxjs'

import { MaskConfigInterface } from '../input/input.model'
import { autocompleteListType } from './input-autocomplete.model'

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAutocompleteComponent),
      multi: true,
    },
  ],
})
export class InputAutocompleteComponent implements OnInit, OnDestroy {
  @Input() readonly: boolean
  @Input() mandatory: boolean
  @Input() placeholder = ''
  @Input() errorMessage = ''
  @Input() errorMessageHidden = false
  @Input() isLoading: boolean
  @Input() autocompleteList: autocompleteListType
  @Output() valueSelected: EventEmitter<string> = new EventEmitter<string>()

  value: any = ''
  focused = false
  isPassword: boolean
  maskConfig: MaskConfigInterface
  disabled: boolean

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

  onSelected($event: MatAutocompleteSelectedEvent): void {
    this.valueSelected.emit($event.option.id)
  }

}
