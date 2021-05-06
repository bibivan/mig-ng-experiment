import { FormControl } from '@angular/forms'

export type formProgressStepsType = 'anketa' | 'passport' | 'employment_and_income' | 'personal_info'

export interface StepInfoInterface {
  num: number,
  minPercent: number,
  maxPercent: number,
  nextStepPercent: number
}

export type formProgressControlListInterface = Array<FormProgressControlInterface>

export interface FormProgressControlInterface {
  control: FormControl,
  id: string
}
