import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const SelectedActivityReducer = createSlice({
	initialState: null,
	name: 'selectedActivity',
	reducers: {
		setSelectedActivity: (state, action: PayloadAction<any>) => (state = action.payload),
	},
})

export const { setSelectedActivity } = SelectedActivityReducer.actions

export default SelectedActivityReducer.reducer
