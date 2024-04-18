import { AppThemeProvider } from '@context/AppThemeContext'
import { AxiosProvider } from '@context/AxiosContext'
import ChatroomContainer from '@components/global/ChatroomContainer'
import { EmailVerificationProvider } from '@context/EmailVerificationContext'
import { IdleTimeOutProvider } from '@context/IdleTimeOutContext'
import { InitialAppStateProvider } from '@context/InitialAppStateContext'
import { MeProvider } from '@context/MeContext'
import { MessageProvider } from '@context/MessageContext'
import PicksideRoutes from './Routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { ServerStatusProvider } from '@context/ServerStatusContext'
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
						<ServerStatusProvider>
							<IdleTimeOutProvider>
								<MeProvider>
									<MessageProvider>
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
									</MessageProvider>
								</MeProvider>
							</IdleTimeOutProvider>
						</ServerStatusProvider>
					</EmailVerificationProvider>
				</InitialAppStateProvider>
			</QueryClientProvider>
		</AxiosProvider>
	)
}

export default App
