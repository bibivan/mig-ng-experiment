// генерируем мокап в связи с ОГРОМНЫЕ колвом данных для расчетов
const calculatorDataMockup = {}

const sumDayMin = 3000
const sumDayMax = 14000
const dayMin = 3
const dayMax = 30

for (let i = sumDayMin; i <= sumDayMax; i += 1000) {
  for (let j = dayMin; j <= dayMax; j++) {
    const key = i + '_' + j
    calculatorDataMockup[key] = i + i * j * 0.05
  }
}

// const weeks = [10, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48]
// const sumWeekMin = 15000
// const sumWeekMax = 100000
//
// for (let w = sumWeekMin; w <= sumWeekMax; w += 1000) {
//   const weekMax = w > 30000 ? weeks.length - 1 : 4
//   for (let y = 0; y <= weekMax; y++) {
//     const key = w + '_' + weeks[y]
//     calculatorDataMockup[key] = Math.round(w / (54 - weeks[y]) * 5)
//   }
// }

export class CalculatorMockup {
  static getCalculator = {
    success: { ...calculatorDataMockup },
    error: null,
  }
}
