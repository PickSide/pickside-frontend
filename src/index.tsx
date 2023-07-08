import './index.css'

import React, { Suspense } from 'react'

import App from './App'
import { I18nextProvider } from 'react-i18next'
import ReactDOM from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import i18n from './i18n'
import reportWebVitals from './reportWebVitals'
import { store } from './store'

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('./sw.js')
		.then((registration) => {
			console.log('SW Registered!')
			console.log(registration)
		})
		.catch((error) => {
			console.warn('SW Registration Failed!')
			console.warn(error)
		})
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<StoreProvider store={store}>
		<I18nextProvider i18n={i18n}>
			<App />
		</I18nextProvider>
	</StoreProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
