import { AppState, setSelectedChatroom } from '@state'
import { Controller, useForm } from 'react-hook-form'
import { Icon, IconButton, InputField, StatusBadge } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchMessagesForChatroom, useFetchOnlineUsers } from '@hooks'
import { useMemo, useState } from 'react'

import Avatar from '@components/Avatar'
import ChatBubble from './ChatBubble'
import { isEmpty } from 'lodash'
import { motion } from 'framer-motion'
import useSendMessage from '@pages/Appbar/hooks/useSendMessage'

const Chatroom = () => {
	const dispatch = useDispatch()
	const { onlineUsers } = useFetchOnlineUsers()
	const { messages, isLoading: isMessagesLoading } = useFetchMessagesForChatroom()
	const { sendMessage } = useSendMessage()
	const { control, watch, handleSubmit, reset } = useForm({
		defaultValues: {
			message: '',
		},
	})

	const connectedUser = useSelector((state: AppState) => state.user)
	const chatroom = useSelector((state: AppState) => state.selectedChatroom)
	const recipient = chatroom?.participants?.find((x) => x.id !== connectedUser?.id)
	const canSend = !!watch('message')

	const isRecipientOnline = useMemo(
		() => onlineUsers?.results?.some((u) => u.id === recipient?.id),
		[onlineUsers, recipient],
	)

	const [isMinimized, setIsMinimized] = useState<boolean>(false)

	const onSubmit = async (values) => {
		await sendMessage({ message: values.message, chatroom })
		reset()
	}

	return !isEmpty(chatroom) ? (
		<motion.div
			initial={{ height: 0, scale: 0.5 }}
			animate={{ height: 600, scale: 1 }}
			transition={{ type: 'tween', ease: 'easeInOut', duration: 0.1 }}
			id="chatroom"
			className="fixed bottom-0 z-20 right-10 border-2 rounded-t-lg bg-white shadow-sm max-w-screen-md max-h-[600px] w-80 focus-visible:bg-primary"
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
							<IconButton size="sm" onClick={() => dispatch(setSelectedChatroom({}))}>
								<Icon icon="remove" />
							</IconButton>
							<IconButton size="sm" onClick={() => dispatch(setSelectedChatroom({}))}>
								<Icon icon="close" />
							</IconButton>
						</div>
					</header>
					<div className="flex-grow overflow-y-auto">
						{messages?.results?.map(({ message, type }, idx) => (
							<ChatBubble key={idx} type={type}>
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
						<IconButton type="submit" disabled={!canSend} onClick={onSubmit}>
							<Icon icon="send" />
						</IconButton>
					</form>
				</div>
			)}
		</motion.div>
	) : null
}
export default Chatroom
