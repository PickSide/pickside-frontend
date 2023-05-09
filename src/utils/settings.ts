export type SportSettings = SoccerSettings

export interface SoccerSettings {
    isPositionRequired: boolean
    isBallProvided: boolean
    isPaymentRequired: boolean
    maxPlayers: number
    pricePp: number
    level: number
    playTime: number
    rules: string
    clothingColor: string[]
    equipments: string[]
    matchMode: 4 | 5 | 6 | 7 | 8 | 9 | 11
}
