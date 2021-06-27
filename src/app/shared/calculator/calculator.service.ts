import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { declOfNum, getDeadlineDate } from '../../helpers/helper'
import { CalculatorApiService } from './calculator-api.service'
import {
  CalculatorDataInterface,
  CalculatorStateInterface,
  CalculatorTermSettingsInterface,
  CalculatorValueInterface,
  termUnitIdType
} from './calculator.model'

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private calculatorData: CalculatorDataInterface = {}

  private state: CalculatorStateInterface = {
    isLoading: true,
    sum: 5000,
    sumMin: 3000,
    sumMax: 14000,
    sumStep: 1000,
    term: {
      value: 10,
      termUnit: 'Day',
    },
    termMin: 0,
    termMax: 0,
    termStep: 1,
    termSliderValue: 0,
    termSliderLabel: '',
    termInputValueMin: 0,
    termInputValueMax: 0,
    isDiscount: false,
    results: {
      sumReturn: 0,
      deadline: new Date(),
    },
  }
  state$: Subject<CalculatorStateInterface> = new Subject<CalculatorStateInterface>()

  private currentTermUnitId!: termUnitIdType

  private termSettings = {
    day: {
      id: 'Day',
      sumMin: 3000,
      sumMax: 14000,
      termUnit: 'Day',
      values: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      defaultValue: 7,
    },
    weekShort: {
      id: 'weekShort',
      sumMin: 15000,
      sumMax: 30000,
      termUnit: 'Week',
      values: [10, 12, 16, 20, 24],
      defaultValue: 2,
    },
    weekFull: {
      id: 'weekFull',
      sumMin: 31000,
      sumMax: 100000,
      termUnit: 'Week',
      values: [10, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48],
      defaultValue: 3,
    },
  }

  constructor(
    private api: CalculatorApiService,
  ) {}

  init(value: CalculatorValueInterface): void {
    const currentTermSettings = this.getTermSettings()
    this.setTermSettings(currentTermSettings)
    if (value.sum && value.term) {
      this.setCalculatorValue(value)
    }

    if (!this.calculatorData || !Object.keys(this.calculatorData).length) {
      this.getCalculatorData()

    } else {
      this.initCalculator()
    }
  }

  changeSum(sum: number): void {
    this.state.sum = sum

    const currentTermSettings = this.getTermSettings()
    if (!currentTermSettings) { return }
    if (this.currentTermUnitId !== currentTermSettings.id) {
      this.setTermSettings(currentTermSettings)
    }

    this.updateDiscount()
    this.setResults()
    this.refreshState()
  }

  changeTerm(term: number): void {
    const currentTermSettings = this.getTermSettings()
    const values = currentTermSettings.values || []
    this.state.term = {
      value: values[term],
      termUnit: this.state.term.termUnit,
    }
    this.state.termSliderValue = term
    this.updateTermSliderLabel(+values[term])

    this.updateDiscount()
    this.setResults()
    this.refreshState()
  }

  changeTermFromInput(term: number): void {
    this.state.term = {
      value: term,
      termUnit: this.state.term.termUnit,
    }
    this.state.termSliderValue = term
    this.updateTermSliderLabel(term)

    this.setResults()
    this.refreshState()
  }

  getCalculatorValue(): CalculatorValueInterface {
    return {
      sum: this.state.sum,
      term: Object.assign({}, this.state.term)
    }
  }

  setCalculatorValue(value: CalculatorValueInterface): void {
    this.state.sum = value.sum || 10000
    this.state.term = Object.assign({}, value.term)
  }

  private getTermSettings(): CalculatorTermSettingsInterface {
    let result: CalculatorTermSettingsInterface

    // @ts-ignore
    Object.values(this.termSettings).filter((item: CalculatorTermSettingsInterface) => {
      if (this.state.sum >= item.sumMin && this.state.sum <= item.sumMax) {
        result = item
      }

    })

    // @ts-ignore
    return result
  }

  private setTermSettings(settings: CalculatorTermSettingsInterface): void {
    const {
      id,
      termUnit,
      values,
      defaultValue,
    } = settings
    this.state.termMin = 0
    this.state.termMax = values.length - 1
    this.state.termSliderValue = defaultValue

    const termValue = +values[defaultValue]

    this.updateTermSliderLabel(termValue)

    this.state.termInputValueMin = +values[0]
    this.state.termInputValueMax = +values[values.length - 1]

    this.state.term = {
      value: termValue,
      termUnit,
    }

    this.currentTermUnitId = id
  }

  private initCalculator(): void {
    this.state.isLoading = false
    this.setResults()
    this.updateDiscount()
    this.refreshState()
  }

  private setResults(): void {
    const sumReturn = this.calculatorData[`${ this.state.sum }_${ this.state.term.value }`]
    const deadline = getDeadlineDate(this.state.term)

    this.state.results = {
      sumReturn, deadline,
    }
  }

  private getCalculatorData(): void {
    this.api.getCalculator().subscribe(
      (data: CalculatorDataInterface) => {
        this.calculatorData = Object.assign({}, data)
        this.initCalculator()
      },
    )
  }

  private updateTermSliderLabel(termValue: number = 0): void {
    const termLabels = this.state.term.termUnit === 'Week' ? ['неделя', 'недели', 'недель'] : ['день', 'дня', 'дней']
    this.state.termSliderLabel = ' ' + declOfNum(termValue, termLabels)
  }

  private updateDiscount(): void {
    let isDiscount = false
    if (this.state.sum <= 5000 && this.state.term.value <= 10) {
      isDiscount = true
    }
    this.state.isDiscount = isDiscount
  }

  private refreshState(): void {
    this.state$.next(this.state)
  }
}
