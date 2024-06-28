import ActiveChatrooms from '@pages/Appbar/components/chatroom/ActiveChatrooms'
import { AppThemeProvider } from '@context/AppThemeContext'
import { AxiosProvider } from '@context/AxiosContext'
import { EmailVerificationProvider } from '@context/EmailVerificationContext'
import { I18nProvider } from '@context/I18nAppContext'
import { InitialAppStateProvider } from '@context/InitialAppStateContext'
import { MeProvider } from '@context/MeContext'
import { MessagingProvider } from '@context/MessageServiceContext'
import { NotificationProvider } from '@context/NotificationContext'
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
							<MeProvider>
								<NotificationProvider>
									<MessagingProvider>
										<AppThemeProvider>
											<I18nProvider>
												<ActiveChatrooms />
												<WindowProvider>
													<SidenavProvider>
														<ToastProvider>
															<PicksideRoutes />
														</ToastProvider>
													</SidenavProvider>
												</WindowProvider>
											</I18nProvider>
										</AppThemeProvider>
									</MessagingProvider>
								</NotificationProvider>
							</MeProvider>
						</ServerStatusProvider>
					</EmailVerificationProvider>
				</InitialAppStateProvider>
			</QueryClientProvider>
		</AxiosProvider>
	)
}

export default App
