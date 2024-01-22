import { AppState, openChatroom } from '@state'
import { Controller, useForm } from 'react-hook-form'
import { Icon, IconButton, InputField, StatusBadge } from '@components'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '@components/Avatar'
import { AxiosContext } from '@context'
import ChatBubble from './ChatBubble'
import { RTAContentContext } from '@context'
import { motion } from 'framer-motion'
import { useEffectOnce } from 'usehooks-ts'
import { useFetchOnlineUsers } from '@hooks'

interface Message {
	message?: string
	chatroomId?: string
	sender?: string
	delivered?: boolean
	type?: 'incoming' | 'outgoing'
}

const ChatroomContainer = () => {
	const chatrooms = useSelector((state: AppState) => state.chatrooms)
	return (
		<div className="fixed bottom-0 z-20 right-0 flex flex-row-reverse w-full">
			{chatrooms?.map((chatroom, idx) => <Chatroom chatroom={chatroom} key={idx} />)}
		</div>
	)
}

export const Chatroom = ({ chatroom, minimize = false }) => {
	const { axiosInstance } = useContext(AxiosContext)
	const { chatroomsSocket } = useContext(RTAContentContext)
	const dispatch = useDispatch()
	const { onlineUsers } = useFetchOnlineUsers()
	const me = useSelector((state: AppState) => state.user)
	const { control, watch, handleSubmit, reset } = useForm({
		defaultValues: {
			chatroomId: chatroom?.id,
			message: '',
		},
	})
	const recipient = chatroom?.participants?.find((x) => x.id !== me?.id)
	const canSend = !!watch('message')

	const isRecipientOnline = useMemo(
		() => onlineUsers?.results?.some((u) => u.id === recipient?.id),
		[onlineUsers, recipient],
	)

	const [isMinimized, setIsMinimized] = useState<boolean>(minimize)
	const [messages, setMessages] = useState<Message[]>([])

	const fetchMessages = async () => {
		await axiosInstance.get(`/messages/${chatroom?.id}`).then((response) => setMessages(response.data.results))
	}

	const handleMessage = (payload: Message) => {
		setMessages((prev) => [...prev, payload])
	}

	const onSubmit = async (values) => {
		chatroomsSocket.emit('chatroom:sending-message', { ...values, sender: me?.id })
		reset()
	}

	useEffect(() => {
		chatroomsSocket.emit('chatroom:open', chatroom)
		chatroomsSocket.on('chatroom:message-registered', handleMessage)

		return () => {
			chatroomsSocket.off('chatroom:message-registered', console.log)
		}
	}, [])

	useEffectOnce(() => {
		fetchMessages()
	})

	return chatroom ? (
		<motion.div
			initial={{ height: 0, scale: 0.5 }}
			animate={{ height: 600, scale: 1 }}
			transition={{ type: 'tween', ease: 'easeInOut', duration: 0.1 }}
			id="chatroom"
			className="border-2 rounded-t-lg bg-white shadow-sm max-w-screen-md max-h-[600px] w-80 focus-visible:bg-ocean mr-2"
		>
			{!isMinimized && (
				<div className="relative flex flex-col h-full">
					<header className="border-b-2 flex items-center justify-between p-2">
						<div className="inline-flex items-center gap-x-2">
							<Avatar
								src={recipient?.avatar}
								size="sm"
								badge={<StatusBadge variant={isRecipientOnline ? 'online' : 'offline'} />}
							/>
							<p className="text-md text-ocean font-semibold">{chatroom?.name || recipient.fullName}</p>
						</div>
						<div className="inline-flex items-center gap-x-2">
							{/* <IconButton size="sm" onClick={() => setIsMinimized(true)}>
								<Icon icon="remove" />
							</IconButton> */}
							<IconButton size="sm" onClick={() => dispatch(openChatroom(chatroom))}>
								<Icon icon="close" />
							</IconButton>
						</div>
					</header>
					<div className="flex-grow overflow-y-auto">
						{messages?.map(({ message, sender }, idx) => (
							<ChatBubble key={idx} type={sender === me?.id ? 'outgoing' : 'incoming'}>
								{message}
							</ChatBubble>
						))}
					</div>
					<form className="flex items-center mx-3 gap-x-2" onSubmit={handleSubmit(onSubmit)}>
						<Controller
							control={control}
							name="message"
							render={({ field }) => (
								<InputField
									{...field}
									fullWidth
									placeholder="Aa"
									startContent={
										<IconButton size="sm">
											<Icon icon="mood" />
										</IconButton>
									}
								/>
							)}
						/>
						<IconButton type="submit" disabled={!canSend}>
							<Icon icon="send" />
						</IconButton>
					</form>
				</div>
			)}
		</motion.div>
	) : null
}

export default ChatroomContainer
