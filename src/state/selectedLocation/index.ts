import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const SelectedLocation = createSlice({
    initialState: '',
    name: 'selectedLocation',
    reducers: {
        setSelectedLocation: (state, action: PayloadAction<any>) => (state = action.payload),
    },
})

export const { setSelectedLocation } = SelectedLocation.actions

export default SelectedLocation.reducer
