import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppStatus {
    status?: 'success' | 'info' | 'warning' | 'error'
    message?: string
}

const AppStatus = createSlice({
    initialState: null as unknown as AppStatus | null,
    name: 'appStatus',
    reducers: {
        setStatus: (state, action: PayloadAction<AppStatus | null>) => (state = action.payload),
    },
})

export const { setStatus } = AppStatus.actions

export default AppStatus.reducer
