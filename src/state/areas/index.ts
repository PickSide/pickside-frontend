import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Resources } from '@state'

export interface Areas extends Resources {
    results: Area[]
}

export interface Area {
    id?: string
    country?: string
    state?: string
    city?: string
    district?: string[]
    districtCode?: string
    coords?: number[]
}

const Areas = createSlice({
    initialState: null as unknown as Areas | null,
    name: 'areas',
    reducers: {
        setAreas: (state, action: PayloadAction<Areas>) => (state = action.payload),
    },
})

export const { setAreas } = Areas.actions

export default Areas.reducer
