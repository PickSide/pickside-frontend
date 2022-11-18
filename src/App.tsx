import React, { FC, useState } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Grid } from '@mui/material'

import { reducers } from 'state'
import { Dialog, FilterToolbar, Navbar } from 'components'
import { AppContainer, Authentication } from 'components'

const middleware = [...getDefaultMiddleware()]

export const store = configureStore({
	reducer: reducers,
	middleware,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

const App = () => {
	const [openAuthenticationDialog, setOpenAuthenticationDialog] = useState<boolean>(false)

	return (
		<Provider store={store}>
			<Dialog
				open={openAuthenticationDialog}
				onClose={() => setOpenAuthenticationDialog(false)}
				title="Authentication"
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				size="sm"
			>
				<Authentication />
			</Dialog>
			<Grid container direction="column" style={{ overflow: 'none' }}>
				<Grid item>
					<Navbar setOpenAuthenticationDialog={setOpenAuthenticationDialog} />
				</Grid>
				<Grid item>
					<FilterToolbar />
				</Grid>
				<Grid item>
					<AppContainer />
				</Grid>
			</Grid>
		</Provider>
	)
}

export default App
