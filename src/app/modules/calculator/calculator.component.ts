import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'
import { CalculatorStateInterface } from './calculator.model'
import { CalculatorService } from './calculator.service'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  state: CalculatorStateInterface
  stateSub: Subscription

  sumControl: FormControl = new FormControl('')
  termControl: FormControl = new FormControl('')

  constructor(
    private calculator: CalculatorService
  ) { }

  ngOnInit(): void {
    this.init()

    this.sumControl.valueChanges.subscribe(this.onChangeSumControl.bind(this))
    this.termControl.valueChanges.subscribe(this.onChangeTermControl.bind(this))
  }

  ngOnDestroy(): void {
    this.stateSub?.unsubscribe()
  }

  init(): void {
    this.stateSub = this.calculator.state$.subscribe(this.refreshState.bind(this))

    this.calculator.init()
  }

  onChangeSum(sum: number): void {
    this.calculator.changeSum(sum)
    this.sumControl.setValue(sum)
  }

  onChangeTerm(term: number): void {
    this.calculator.changeTerm(term)
    this.termControl.setValue(term)
  }

  refreshState(data: CalculatorStateInterface): void {
    this.state = Object.assign({}, data)

    if (!this.sumControl.value) {
      this.sumControl.setValue(data.sum)
    }

    if (!this.termControl.value) {
      this.termControl.setValue(data.term.value)
    }
  }

  private onChangeSumControl(value): void {
    let sum = +value
    const sumStep = this.state?.sumStep || 1000

    const ost = sum % sumStep
    const ostMiddle = ost / 2

    if (ost > 0) {
      if (ost >= ostMiddle) {
        sum = Math.ceil(sum / ostMiddle) * ostMiddle
      } else if (ost < 500) {
        sum = Math.round(sum / ostMiddle) * ostMiddle
      }
    }

    this.calculator.changeSum(sum)
  }

  private onChangeTermControl(value): void {
    let term = +value

    const { termInputValueMin, termInputValueMax } = this.state
    if (term < termInputValueMin) { term = termInputValueMin }
    if (term > termInputValueMax) { term = termInputValueMax }

    this.calculator.changeTermFromInput(term)
  }
}
