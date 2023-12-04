import { AppState, User } from '@state'
import { Button, Icon, IconButton, TextAreaField } from '@components'
import { Controller, useForm } from 'react-hook-form'
import { FC, useContext, useEffect, useState } from 'react'

import { SidenavDispatchContext } from '@context'
import UsersAutocomplete from './UsersAutocomplete'
import useFetchChatrooms from '../hooks/useFetchChatrooms'
import { useSelector } from 'react-redux'
import useSendMessage from '../hooks/useSendMessage'
import { useTranslation } from 'react-i18next'

//import useFetchMessages from '../hooks/useFetchMessages'

const MessageMenu: FC<any> = ({ ...rest }) => {
	const sidenavDispatch = useContext(SidenavDispatchContext)
	// const { messages, isLoading: isMessagesLoading, refetch } = useFetchMessages()
	const { chatrooms, isLoading: isChatroomsLoading, refetch: refetchChatrooms } = useFetchChatrooms()
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.user)

	const [recipient, setRecipient] = useState<User>()

	const ChatroomsListing = () => (
		<>
			<UsersAutocomplete onSelectAction={(value: User) => setRecipient(value)} />
			<div className="flex flex-col mt-4">
				{chatrooms?.results?.map((chatroom, idx) => (
					<div key={idx} className="flex items-center px-3 py-4 gap-x-4 rounded-md cursor-pointer hover:bg-slate-300">
						{chatroom.participants
							.filter((participant) => participant.id !== connectedUser?.id)
							.map((participant) => (
								<div className="w-14 h-14 flex justify-center items-center rounded-full bg-primary">
									{participant.avatar ? (
										<img className="rounded-full" src={participant.avatar} alt="" />
									) : (
										<svg width="16" height="16" viewBox="0 0 24 24" fill="primary" xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M4.49579 23.3299C4.45167 23.7418 4.08202 24.0399 3.67016 23.9957C3.25831 23.9516 2.9602 23.582 3.00433 23.1701C3.50157 18.5292 7.32488 15 12.0001 15C16.6752 15 20.4986 18.5292 20.9958 23.1701C21.0399 23.582 20.7418 23.9516 20.33 23.9957C19.9181 24.0399 19.5485 23.7418 19.5043 23.3299C19.0878 19.4427 15.8999 16.5 12.0001 16.5C8.10025 16.5 4.91228 19.4427 4.49579 23.3299ZM12.0001 13.5C8.68635 13.5 6.00006 10.8137 6.00006 7.5C6.00006 4.18629 8.68635 1.5 12.0001 1.5C15.3138 1.5 18.0001 4.18629 18.0001 7.5C18.0001 10.8137 15.3138 13.5 12.0001 13.5ZM12.0001 12C14.4853 12 16.5001 9.98528 16.5001 7.5C16.5001 5.01472 14.4853 3 12.0001 3C9.51478 3 7.50006 5.01472 7.50006 7.5C7.50006 9.98528 9.51478 12 12.0001 12Z"
												fill="white"
											/>
										</svg>
									)}
								</div>
							))}
						{chatroom.title}
					</div>
				))}
			</div>
		</>
	)

	useEffect(() => {
		if (recipient) {
			sidenavDispatch({
				type: 'open',
				title: `${t('Chat with')}  ${recipient.fullName}`,
				content: <Chatroom recipient={recipient} c />,
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recipient])

	return (
		<IconButton
			className="text-grey-600"
			onClick={() =>
				sidenavDispatch({
					type: 'open',
					title: t('Messages'),
					content: <ChatroomsListing />,
				})
			}
		>
			<Icon icon="chat_bubble_outline" />
		</IconButton>
	)
}

const Chatroom = ({ recipient, chatroomId, currentUser }) => {
	const { t } = useTranslation()

	const { control, handleSubmit, watch } = useForm({
		defaultValues: {
			message: '',
		},
	})

	const { sendMessage, isLoading, error } = useSendMessage()

	const message = watch('message')

	const onSubmit = (message) => {
		const data = {
			chatroomId,
			currentUser,
			message,
		}
	}

	return (
		<div className="h-full">
			<div className="h-3/4 p-1"></div>
			<form className="h-1/4 block space-y-2" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name="message"
					render={({ field }) => <TextAreaField {...field} rows={3} fullWidth placeholder={t('Enter message...')} />}
				/>
				<Button type="submit" disabled={!message}>
					{t('Send message')}
				</Button>
			</form>
		</div>
	)
}

export default MessageMenu
