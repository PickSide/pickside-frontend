import { AppState, setActiveChatroom } from '@state'
import { Icon, IconButton, InputField } from '@components'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '@components/Avatar'
import { MessagingContext } from '@context'
import moment from 'moment'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const ActiveChatrooms = () => {
	const activeChatrooms = useSelector((state: AppState) => state.activeChatrooms)
	return (
		<div className="fixed bottom-0 z-20 right-0 flex flex-row-reverse w-full">
			{activeChatrooms?.map((chatroom, idx) => <Chatroom chatroom={chatroom} key={idx} />)}
		</div>
	)
}

export const Chatroom = ({ chatroom }) => {
	const { connection } = useContext(MessagingContext)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const me = useSelector((state: AppState) => state.user)
	const messages = useSelector((state: AppState) => state.messages)
	const participants = chatroom?.participants?.filter((x) => x.id !== me?.id)

	const [message, setMessage] = useState<string>('')

	const handleMessage = (e) => {
		setMessage(e.target.value)
	}

	const sendMessage = () => {
		if (connection?.readyState === WebSocket.OPEN && me?.id) {
			connection.send(JSON.stringify({
				eventType: 'message:send',
				content: {
					content: message,
					chatroomId: chatroom.id,
					senderId: me.id
				}
			}))
			setMessage('')
		}
	}

	useEffect(() => {
		if (connection?.readyState === WebSocket.OPEN) {
			connection.send(JSON.stringify({
				eventType: 'chatroom:loadmessages',
				content: {
					chatroomId: chatroom.id
				}
			}))
		}
	}, [chatroom, connection, dispatch])

	return chatroom ? (
		<motion.div
			initial={{ height: 0, scale: 0.5 }}
			animate={{ height: 600, scale: 1 }}
			transition={{ type: 'tween', ease: 'easeInOut', duration: 0.1 }}
			id="chatroom"
			className="border-2 rounded-t-lg bg-white shadow-sm max-w-screen-md max-h-[600px] w-80 focus-visible:bg-ocean mr-2"
		>
			<div className="relative flex flex-col h-full">
				<header className="flex items-center justify-between border-b-2 p-2">
					<div className="flex items-center gap-x-2">
						<Avatar
							src={participants?.avatar}
							size="sm"
						/>
						<p className="text-md text-ocean font-semibold truncate max-w-[80%] capitalize">
							{chatroom?.name || participants.map(p => p.displayName).join(', ')}
						</p>
					</div>
					<div>
						<IconButton size="sm" onClick={() => dispatch(setActiveChatroom(chatroom))}>
							<Icon icon="close" />
						</IconButton>
					</div>
				</header>
				<div className="flex-grow overflow-y-auto">
					{!messages || !messages[chatroom.id] ?
						(
							<div className='h-full flex items-center justify-center'>
								<span className='text-cool-gray-3'>{t('No messages')}</span>
							</div>
						)
						: messages[chatroom.id]?.map((m, idx) => (
							m.senderId === me?.id ?
								<div key={idx} className='flex flex-col items-end pr-4 my-2'>
									<span className='bg-ocean rounded-md px-2 py-1 text-cloud'>{m.content}</span>
									<span className='text-sm text-cool-gray-2 my-1'>{t('Sent') + " " + moment(new Date(m.sentAt)).format('ll')}</span>
								</div>
								:
								<div key={idx} className='flex justify-start w-full pl-4 mb-2'>
									<span className='bg-cool-gray-3 rounded-md px-2 py-1 '>{m.content}</span>
								</div>
						))
					}
				</div>
				<div className='flex items-center mx-3 gap-x-2'>
					<InputField
						fullWidth
						placeholder="Aa"
						value={message}
						onChange={handleMessage}
						onPressEnterKey={handleMessage}
						startContent={
							<IconButton size="sm">
								<Icon icon="mood" />
							</IconButton>
						}
					/>
					<IconButton type="submit" disabled={!message} onClick={sendMessage}>
						<Icon icon="send" />
					</IconButton>
				</div>

			</div>
		</motion.div >
	) : null
}

export default ActiveChatrooms
