import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type Toast = {
	type?: 'info' | 'warning' | 'error' | 'success'
	message?: string
}

const ToastReducer = createSlice({
	initialState: null as unknown as Toast,
	name: 'toast',
	reducers: {
		toastMessage: (state, action: PayloadAction<Toast | any>) => (state = action.payload),
	},
})

export const { toastMessage } = ToastReducer.actions

export default ToastReducer.reducer
