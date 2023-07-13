import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const DeactivatedAccount = createSlice({
    initialState: false,
    name: 'deactivate',
    reducers: {
        deactivate: (state) => (state = true),
    },
})

export const { deactivate } = DeactivatedAccount.actions

export default DeactivatedAccount.reducer
