import { AppState, setActiveChatroom } from '@state'
import { Icon, IconButton, InputField } from '@components'
import { LoadMessagesEventProps, MessageEventProps } from '@types'
import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '@components/Avatar'
import { MessagingContext } from '@context'
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
	const recipient = chatroom?.participants?.find((x) => x.id !== me?.id)

	useEffect(() => {
		if (connection?.readyState === 1) {
			const message: MessageEventProps = {
				eventType: 'chatroom:loadmessages',
				content: {
					chatroomtId: chatroom.id
				}
			}
			connection.send(JSON.stringify(message))
			connection.addEventListener("message", event => {
				const response = JSON.parse(event.data)
				console.log(response)
			})
		}
	}, [chatroom, connection])

	return chatroom ? (
		<motion.div
			initial={{ height: 0, scale: 0.5 }}
			animate={{ height: 600, scale: 1 }}
			transition={{ type: 'tween', ease: 'easeInOut', duration: 0.1 }}
			id="chatroom"
			className="border-2 rounded-t-lg bg-white shadow-sm max-w-screen-md max-h-[600px] w-80 focus-visible:bg-ocean mr-2"
		>
			<div className="relative flex flex-col h-full">
				<header className="border-b-2 flex items-center justify-between p-2">
					<div className="inline-flex items-center gap-x-2">
						<Avatar
							src={recipient?.avatar}
							size="sm"
						/>
						<p className="text-md text-ocean font-semibold">{chatroom?.name || recipient.fullName}</p>
					</div>
					<div className="inline-flex items-center gap-x-2">

						<IconButton size="sm" onClick={() => dispatch(setActiveChatroom(chatroom))}>
							<Icon icon="close" />
						</IconButton>
					</div>
				</header>
				<div className='h-full flex items-center justify-center'>
					<span className='text-cool-gray-3'>{t('No messages')}</span>
				</div>
				<div className="flex-grow overflow-y-auto">
				</div>
				<div className='flex items-center mx-3 gap-x-2'>
					<InputField
						fullWidth
						placeholder="Aa"
						startContent={
							<IconButton size="sm">
								<Icon icon="mood" />
							</IconButton>
						}
					/>
					<IconButton type="submit" disabled>
						<Icon icon="send" />
					</IconButton>
				</div>

			</div>
		</motion.div >
	) : null
}

export default ActiveChatrooms
