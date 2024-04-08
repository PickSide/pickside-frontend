import { AppThemeProvider } from '@context/AppThemeContext'
import { AxiosProvider } from '@context/AxiosContext'
import ChatroomContainer from '@components/global/ChatroomContainer'
import { EmailVerificationProvider } from '@context/EmailVerificationContext'
import { IdleTimeOutProvider } from '@context/IdleTimeOutContext'
import { InitialAppStateProvider } from '@context/InitialAppStateContext'
import PicksideRoutes from './Routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { SidenavProvider } from '@context/SidenavContext'
import { ToastProvider } from '@context/ToastContext'
import { WindowProvider } from '@context/WindowContext'
import queryClient from '@client'

const App = () => {
	return (
		<AxiosProvider>
			<QueryClientProvider client={queryClient}>
				<InitialAppStateProvider>
					<EmailVerificationProvider>
						<IdleTimeOutProvider>
							<AppThemeProvider>
								<ChatroomContainer />
								<WindowProvider>
									<SidenavProvider>
										<ToastProvider>
											<PicksideRoutes />
										</ToastProvider>
									</SidenavProvider>
								</WindowProvider>
							</AppThemeProvider>
						</IdleTimeOutProvider>
					</EmailVerificationProvider>
				</InitialAppStateProvider>
			</QueryClientProvider>
		</AxiosProvider>
	)
}

export default App
