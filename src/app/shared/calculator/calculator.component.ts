import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'
import { CalculatorStateInterface, CalculatorValueInterface } from './calculator.model'
import { CalculatorService } from './calculator.service'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  @Input() defaultValue!: CalculatorValueInterface

  state!: CalculatorStateInterface
  stateSub!: Subscription

  sumControl: FormControl = new FormControl('')
  termControl: FormControl = new FormControl('')

  constructor(
    private calculator: CalculatorService
  ) { }

  ngOnInit(): void {
    this.init(this.defaultValue)
  }

  ngOnDestroy(): void {
    this.stateSub?.unsubscribe()
  }

  init(value: CalculatorValueInterface): void {
    this.stateSub = this.calculator.state$.subscribe(this.refreshState.bind(this))
    this.calculator.init(value)
  }

  onChangeSum(sum: number): void {
    this.calculator.changeSum(sum)
    this.sumControl.setValue(sum)
  }

  onChangeTerm(term: number): void {
    this.calculator.changeTerm(term)
  }

  refreshState(data: CalculatorStateInterface): void {
    this.state = Object.assign({}, data)

    this.sumControl.setValue(data.sum)
    this.termControl.setValue(data.term.value)
  }

  onChangeSumControl(): void {
    const value = +this.sumControl.value

    const { sumMin, sumMax } = this.state
    let sum = value
    const sumStep = this.state?.sumStep || 1000
    const sumStepMiddle = sumStep / 2

    const ost = sum % sumStep

    if (ost > 0) {
      if (ost >= sumStepMiddle) {
        sum = Math.ceil(sum / sumStep) * sumStep
      } else if (ost < 500) {
        sum = Math.round(sum / sumStep) * sumStep
      }
    }

    if (sum > sumMax) { sum = sumMax }
    if (sum < sumMin) { sum = sumMin }

    if (sum !== value) {
      this.sumControl.setValue(sum)
    }

    this.calculator.changeSum(sum)
  }

  onChangeTermControl(): void {
    const value = +this.termControl.value
    let term = value

    const { termInputValueMin, termInputValueMax } = this.state
    if (term < termInputValueMin) { term = termInputValueMin }
    if (term > termInputValueMax) { term = termInputValueMax }

    if (term !== value) {
      this.termControl.setValue(term)
    }

    this.calculator.changeTermFromInput(term)
  }
}
