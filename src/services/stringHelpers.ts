import _ from 'lodash'
import { smartPunctuationPairs } from '../constants/constants'

export const toTitleCase = (str: string | undefined) => {
  return _.toLower(str)
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

export const replaceSmartPunctuation = (str: string) => {
  if (!_.isString(str)) {
    return str
  }

  smartPunctuationPairs.forEach(pair => {
    str = str.replace(pair.from, pair.to)
  })

  return str
}
