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

export interface InputSetting {
    name: string
    label: string
    type: 'list' | 'switch' | 'number' | 'textarea'
    optional: boolean
    placeholder?: string
    basedOn?: {
        field: string
        toBe: boolean | string
    }
}

export const Settings = {
    soccer: {
        formValues: {
            isBallProvided: false,
            isPaymentRequired: false,
            clothingColor: [],
            equipments: [],
            level: 1,
            maxPlayer: 22,
            pricePp: 0,
            rules: '',
        },
        inputs: [
            { name: 'clothingColor', label: 'Clothing color', type: 'list', optional: true },
            { name: 'equipments', label: 'Equipments', type: 'list', optional: true },
            { name: 'level', label: 'Level entry', type: 'number', optional: true },
            { name: 'maxPlayer', label: 'Max. players', type: 'number', optional: true },
            { name: 'pricePp', label: 'Price per person', type: 'number', optional: true, basedOn: { field: 'isPaymentRequired', toBe: true } },
            { name: 'rules', label: 'Rules', type: 'textarea', optional: true },
            { name: 'isBallProvided', label: 'Ball provided', type: 'switch', optional: true },
            { name: 'isPaymentRequired', label: 'Payment required', type: 'switch', optional: true },
        ] as InputSetting[]
    }
}
