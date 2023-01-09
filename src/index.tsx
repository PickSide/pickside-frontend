import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import { store } from './store'
import { Grid, CircularProgress } from '@mui/material'
import App from './App'
import i18n from './i18n'
import reportWebVitals from './reportWebVitals'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const Loading = (): JSX.Element => (
	<Grid
		container
		spacing={0}
		direction="column"
		alignContent="center"
		justifyContent="center"
		style={{
			minHeight: '100vh',
		}}
	>
		<Grid item xs={3}>
			<CircularProgress />
		</Grid>
	</Grid>
)
root.render(
	<Suspense fallback={<Loading />}>
		<React.StrictMode>
			<Provider store={store}>
				<I18nextProvider i18n={i18n}>
					<App />
				</I18nextProvider>
			</Provider>
		</React.StrictMode>
	</Suspense>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
