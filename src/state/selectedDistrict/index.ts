import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const SelectedDistrict = createSlice({
    initialState: '',
    name: 'selectedDistrict',
    reducers: {
        setSelectedDistrict: (state, action: PayloadAction<any>) => (state = action.payload),
    },
})

export const { setSelectedDistrict } = SelectedDistrict.actions

export default SelectedDistrict.reducer
