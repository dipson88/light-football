export interface ILoginUserInput {
  name: string
  email: string
  password: string
  repeatPassword: string
}

export interface IPostInput {
  matchId: number,
  content: string,
  title: string
}
