export enum OptionType {
  Call = 'Call',
  Put = 'Put'
}

export enum PositionType {
  Long = 'Long',
  Short = 'Short'
}

export interface Option {
  strike_price: number
  type: OptionType
  bid: number
  ask: number
  position: PositionType
  expiration_date: string
}
