import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Toast {
    type?: 'info' | 'warning' | 'error' | 'success'
    message?: string
}

const Toast = createSlice({
    initialState: null as unknown as Toast,
    name: 'toast',
    reducers: {
        toastMessage: (state, action: PayloadAction<Toast | any>) => (state = action.payload),
    },
})

export const { toastMessage } = Toast.actions

export default Toast.reducer
