export type formProgressStepsType = 'anketa' | 'passport' | 'employment_and_income' | 'personal_info'

export type StepInfoInterface = {
  num: number,
  minPercent: number,
  maxPercent: number,
  nextStepPercent: number
}
