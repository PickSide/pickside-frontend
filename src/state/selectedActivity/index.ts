import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const SelectedActivity = createSlice({
    initialState: null,
    name: 'selectedActivity',
    reducers: {
        setSelectedActivity: (state, action: PayloadAction<any>) => (state = action.payload),
    },
})

export const { setSelectedActivity } = SelectedActivity.actions

export default SelectedActivity.reducer
