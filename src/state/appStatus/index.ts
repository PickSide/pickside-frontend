import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/lab'

export interface AppStatus {
    status?: AlertColor
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
