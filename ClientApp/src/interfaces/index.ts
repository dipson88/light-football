import {
  MatchTotalTypes,
  MatchTotalValueTypes,
  MatchResultTypes
} from '@/utils/enums'

export interface ILoginUserInput {
  name: string
  email: string
  password: string
  repeatPassword: string
}

export interface IPostInput {
  matchId: number,
  content: string,
  result: MatchResultTypes,
  total: MatchTotalValueTypes,
  totalType: MatchTotalTypes
}

export interface IPostEditInput extends IPostInput {
  id: string
}

export interface IUserInfo {
  name: string,
  id: string
}
