import { getRandomIntegerInclusive } from '../../helpers/helper'
import { autocompleteListType } from '../input-autocomplete/input-autocomplete.model'

export class KladrAddressMockup {
  static getCity(text: string): autocompleteListType {
    return generateMockup(text)
  }

  static getStreet(text: string): autocompleteListType {
    return generateMockup(text)
  }
}

function generateMockup(text): autocompleteListType {
  const result = []
  const max = 20 - text.length


  for (let i = 0; i <= getRandomIntegerInclusive(1, max || 1); i++) {
    if (i === 0) {
      result.push({
        value: text,
        name: text,
      })
    } else {
      result.push({
        value: i,
        name: `${ text } ${ i }`,
      })
    }
  }
  return result
}
