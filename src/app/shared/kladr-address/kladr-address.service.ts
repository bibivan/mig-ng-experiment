import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { ClassificatorSelectOptions } from '../../helpers/classificator-select-options'
import { ClassificatorValidateRules } from '../../helpers/classificator-validate-rules'
import { ApiService } from '../../services/api.service'
import { getMockup } from '../../services/get-mockup'
import { autocompleteListType } from '../input-autocomplete/input-autocomplete.model'
import { selectOptionsType } from '../select/select.model'
import { KladrAddressMockup } from './kladr-address.mockup'
import { KladrAddressInterface, kladrAddressType } from './kladr-address.model'

@Injectable({
  providedIn: 'root'
})
export class KladrAddressService {

  constructor(
    private api: ApiService,
    private fb: FormBuilder
  ) { }

  getKladrFormGroup(type: kladrAddressType): FormGroup {
    const validators = ClassificatorValidateRules.kladrAddress()
    return this.fb.group({
      type: [type],
      region: ['', validators.region],
      punkt: ['', validators.punkt],
      punktCode: ['', validators.punktCode],
      street: ['', validators.street],
      streetCode: ['', validators.streetCode],
      home: ['', validators.home],
      flat: ['', validators.flat],
      korp: ['', validators.korp],
      str: ['', validators.str],
    })
  }

  getKladrFields(): Array<string> {
    return ['region', 'punkt', 'punktCode', 'street', 'streetCode', 'home', 'flat', 'korp', 'str']
  }

  getCity(region: string, text: string): Observable<autocompleteListType> {
    const body = { region, text }
    const mockupData = getMockup('/kladr/getCity', KladrAddressMockup.getCity(text), body)

    const requestData = {
      path: '/kladr/getCity',
      body,
      mockupData,
    }

    return this.api.post(requestData)
  }

  getStreet(region: string, city: string, text: string): Observable<autocompleteListType> {
    const body = { region, city, text }
    const mockupData = getMockup('/kladr/getStreet', KladrAddressMockup.getStreet(text), body)

    const requestData = {
      path: '/kladr/getStreet',
      body,
      mockupData,
    }

    return this.api.post(requestData)
  }

  setKladrAddressValues(addressGroup: FormGroup, data: KladrAddressInterface): void {
    if (!data) { return }

    const {
      region = '',
      punkt = '',
      punktCode = '',
      street = '',
      streetCode = '',
      home = '',
      flat = '',
      korp = '',
      str = '',
    } = data

    addressGroup.get('region').setValue(region)
    addressGroup.get('punkt').setValue(punkt)
    addressGroup.get('punktCode').setValue(punktCode)
    addressGroup.get('street').setValue(street)
    addressGroup.get('streetCode').setValue(streetCode)
    addressGroup.get('home').setValue(home)
    addressGroup.get('flat').setValue(flat)
    addressGroup.get('korp').setValue(korp)
    addressGroup.get('str').setValue(str)
  }

  get regions(): selectOptionsType {
    return ClassificatorSelectOptions.regions
  }
}
