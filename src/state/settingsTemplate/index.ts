import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Resources } from 'state'
import { SportSettings } from 'utils'

export interface SettingsTemplate extends Resources {
    results?: SettingTemplate[]
}

export interface SettingTemplate {
    [keys: string]: SportSettings // TODO:  | BasketSettings | AmericanFootballSettings | TennisSettings 
}

const SettingTemplate = createSlice({
    initialState: null as unknown as SettingsTemplate,
    name: 'settingsTemplate',
    reducers: {
        setSettingsTemplate: (state, action: PayloadAction<SettingsTemplate>) => (state = action.payload),
    },
})

export const { setSettingsTemplate } = SettingTemplate.actions

export default SettingTemplate.reducer
