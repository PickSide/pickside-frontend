import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Resources } from 'state'

export interface Playables extends Resources {
    results?: Playable[]
}

export interface Playable {
    id?: string
    districtCode: string
    type: string
    coords: any
    fieldName: string
    schedules: any[]
    available: boolean
    unavailabilityReason: any
}

const Playables = createSlice({
    initialState: null as unknown as Playables,
    name: 'playables',
    reducers: {
        setPlayables: (state, action: PayloadAction<Playables>) => (state = action.payload),
    },
})

export const { setPlayables } = Playables.actions

export default Playables.reducer
