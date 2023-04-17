import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Resources } from 'state'

export interface Notifications extends Resources {
    results?: Notification[]
}

export interface Notification {
    id?: string
    type?: string
    message?: string
}

const Notifications = createSlice({
    initialState: null as unknown as Notifications,
    name: 'notifications',
    reducers: {
        setNotifications: (state, action: PayloadAction<Notifications>) => (state = action.payload),
    },
})

export const { setNotifications } = Notifications.actions

export default Notifications.reducer
