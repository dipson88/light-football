import {
  MatchResultTypes,
  MatchTotalTypes,
  MatchTotalValueTypes
} from '@/utils/enums'

const resultTNames = new Map([
  [MatchResultTypes.WinP1, 'w1'],
  [MatchResultTypes.Draw, 'x'],
  [MatchResultTypes.WinP2, 'w2']
])

const totalTypeTNames = new Map([
  [MatchTotalTypes.Less, 'less'],
  [MatchTotalTypes.More, 'more']
])

const totalNames = new Map([
  [MatchTotalValueTypes.HalfAndZero, '0.5'],
  [MatchTotalValueTypes.HalfAndOne, '1.5'],
  [MatchTotalValueTypes.HalfAndTwo, '2.5']
])

export default {
  resultTNames,
  totalTypeTNames,
  totalNames
}

export {
  resultTNames,
  totalTypeTNames,
  totalNames
}
