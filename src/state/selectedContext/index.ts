import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SelectedContexts {
	[contextId: string]: {
		[key: string]: boolean
	}
}

const SelectedContext = createSlice({
	initialState: {} as unknown as SelectedContexts,
	name: 'selectedContexts',
	reducers: {
		setSelectedContext: (state, action: PayloadAction<SelectedContexts>) => (state = { ...state, ...action.payload }),
	},
})

export const { setSelectedContext } = SelectedContext.actions

export default SelectedContext.reducer
