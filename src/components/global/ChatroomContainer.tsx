import { AppState, Resources, openChatroom } from '@state'
import { Controller, useForm } from 'react-hook-form'
import { Icon, IconButton, InputField, StatusBadge } from '@components'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery } from '@tanstack/react-query'

import Avatar from '@components/Avatar'
import { AxiosContext } from '@context'
import { AxiosResponse } from 'axios'
import ChatBubble from './ChatBubble'
import { ListPayloadResponseProps } from '@utils/responseTypes'
import { RTAContentContext } from '@context'
import { motion } from 'framer-motion'
import { useFetchOnlineUsers } from '@hooks'
import useSendMessage from '@pages/Appbar/hooks/useSendMessage'

interface Messages extends Resources {
	results?: Message[]
}

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
			{chatrooms?.map((chatroom, idx) => (
				<Chatroom chatroom={chatroom} key={idx} />
			))}
		</div>
	)
}

export const Chatroom = ({ chatroom, minimize = false }) => {
	const { axiosInstance } = useContext(AxiosContext)
	const { socket } = useContext(RTAContentContext)
	const dispatch = useDispatch()
	const { onlineUsers } = useFetchOnlineUsers()
	const { sendMessage } = useSendMessage()
	const connectedUser = useSelector((state: AppState) => state.user)
	const { control, watch, handleSubmit, reset } = useForm({
		defaultValues: {
			chatroomId: chatroom?.id,
			message: '',
		},
	})
	const recipient = chatroom?.participants?.find((x) => x.id !== connectedUser?.id)
	const canSend = !!watch('message')

	const isRecipientOnline = useMemo(
		() => onlineUsers?.results?.some((u) => u.id === recipient?.id),
		[onlineUsers, recipient],
	)

	const [isMinimized, setIsMinimized] = useState<boolean>(minimize)
	const [messages, setMessages] = useState<Message[]>()

	const { mutateAsync: fetchMessages } = useMutation<AxiosResponse<ListPayloadResponseProps<Message>>>(
		['fetch-messages'],
		async () => {
			return await axiosInstance.get(`/messages/${chatroom?.id}`)
		},
		{
			onSuccess: ({ data }) => setMessages(data.results),
			onError: () => {},
		},
	)
	const onSubmit = async (values) => {
		await sendMessage(values)
	}

	useEffect(() => {
		socket?.on('message:incoming', fetchMessages)
		return () => {
			socket?.off('message:incoming', console.log)
		}
	}, [axiosInstance, chatroom])

	return chatroom ? (
		<motion.div
			initial={{ height: 0, scale: 0.5 }}
			animate={{ height: 600, scale: 1 }}
			transition={{ type: 'tween', ease: 'easeInOut', duration: 0.1 }}
			id="chatroom"
			className="border-2 rounded-t-lg bg-white shadow-sm max-w-screen-md max-h-[600px] w-80 focus-visible:bg-primary mr-2"
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
							<p className="text-md text-primary font-semibold">{chatroom?.name}</p>
						</div>
						<div className="inline-flex items-center gap-x-2">
							<IconButton size="sm" onClick={() => setIsMinimized(true)}>
								<Icon icon="remove" />
							</IconButton>
							<IconButton size="sm" onClick={() => dispatch(openChatroom(chatroom))}>
								<Icon icon="close" />
							</IconButton>
						</div>
					</header>
					<div className="flex-grow overflow-y-auto">
						{messages?.map(({ message, sender }, idx) => (
							<ChatBubble key={idx} type={sender === connectedUser?.id ? 'outgoing' : 'incoming'}>
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
