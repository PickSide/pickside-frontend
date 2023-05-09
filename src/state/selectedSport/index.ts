import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const SelectedSport = createSlice({
    initialState: '',
    name: 'selectedSport',
    reducers: {
        setSelectedSport: (state, action: PayloadAction<any>) => (state = action.payload),
    },
})

export const { setSelectedSport } = SelectedSport.actions

export default SelectedSport.reducer
