import react, { FC, useState } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Grid } from '@mui/material'

import './App.css'
import Dialog from '../src/components/Dialog'
import Navbar from './components/Navbar'
import Authentication from './components/authentication/section/Authentication'
import AppContainer from './pages/AppContainer'
import { reducers } from 'state'

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
			<Grid container spacing={2} direction="column">
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
				<Grid item>
					<Navbar setOpenAuthenticationDialog={setOpenAuthenticationDialog} />
				</Grid>
				<Grid item>
					<AppContainer />
				</Grid>
			</Grid>
		</Provider>
	)
}

export default App
