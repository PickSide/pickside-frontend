import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface SelectedContexts {
	[contextId: string]: {
		[key: string]: boolean
	}
}

const SelectedContextReducer = createSlice({
	initialState: {} as unknown as SelectedContexts,
	name: 'selectedContexts',
	reducers: {
		setSelectedContext: (state, action: PayloadAction<SelectedContexts>) => (state = { ...state, ...action.payload }),
	},
})

export const { setSelectedContext } = SelectedContextReducer.actions

export default SelectedContextReducer.reducer
