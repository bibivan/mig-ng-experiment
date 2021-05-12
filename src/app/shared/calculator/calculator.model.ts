export type termUnitType = 'Week' | 'Day' | 'Month'
export type termUnitIdType = 'Day' | 'weekShort' | 'weekFull'

export interface CalculatorDataInterface {
  [key: string]: number
}

export interface TermLoanInterface {
  value: number,
  termUnit: termUnitType
}

export interface CalculatorStateInterface {
  isLoading: boolean,
  sum: number,
  sumMin: number,
  sumMax: number,
  sumStep: number,
  term: TermLoanInterface,
  termMin: number,
  termMax: number,
  termStep: number,
  termSliderValue: number,
  termSliderLabel: string,
  termInputValueMin: number,
  termInputValueMax: number,
  isDiscount: boolean,
  results: {
    sumReturn: number,
    deadline: Date
  }
}

export interface CalculatorSliderInterface {
  min: number,
  max: number,
  value: number,
  step: number
}

export interface CalculatorTermSettingsInterface {
  id: termUnitIdType,
  sumMin: number,
  sumMax: number,
  termUnit: termUnitType,
  values: Array<number>,
  defaultValue: number
}

export interface CalculatorInitSettingsInterface {
  sum?: number,
  term?: TermLoanInterface,
  sumMin?: number,
  sumMax?: number
}

export interface CalculatorValueInterface {
  sum?: number,
  term?: TermLoanInterface
}
