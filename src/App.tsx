import react, { FC, useState } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Grid } from '@mui/material'

import './App.css'
import Dialog from '../src/components/Dialog'
import Navbar from './components/Navbar'
import Authentication from './components/Authentication/Authentication'
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
			<Navbar setOpenAuthenticationDialog={setOpenAuthenticationDialog} />
			<AppContainer />
		</Provider>
	)
}

export default App
