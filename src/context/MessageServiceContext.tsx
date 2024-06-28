// import { AppState, newMessage, setActiveChatroom, setChatroom, setChatrooms, setMessages } from '@state'
import { FC, ReactNode, createContext /*  useCallback, useEffect, useState */ } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import { uniq } from 'lodash'
// import { useLocalStorage } from 'usehooks-ts'

interface MessagingContextProps {
	children?: ReactNode
	connection?: WebSocket
}

const MessageServiceContext = createContext<MessagingContextProps>({})

export const MessagingProvider: FC<any> = ({ children }) => {
	// const dispatch = useDispatch()
	// const [bearer] = useLocalStorage('my-bearer-token', null)

	// const me = useSelector((state: AppState) => state.user)

	// const [connection, setConnection] = useState<WebSocket>()
	// const [shouldReconnect, setShouldReconnect] = useState<boolean>(true)

	// const connectToWebSocket = useCallback(() => {
	// 	if (!bearer || !me) {
	// 		return
	// 	}

	// 	const socketUrl = `${import.meta.env.VITE_APP_MESSAGE_SERVICE_SOCKET_URL}?token=${bearer}`
	// 	const socket = new WebSocket(socketUrl)

	// 	socket.onopen = () => {
	// 		console.info('Connected to messaging server')
	// 		socket.send(
	// 			JSON.stringify({
	// 				eventType: 'chatrooms:getall',
	// 				content: {
	// 					participantId: me.id,
	// 				},
	// 			}),
	// 		)
	// 	}

	// 	socket.onmessage = (event) => {
	// 		const data = JSON.parse(event.data)
	// 		switch (data.eventType) {
	// 			case 'chatroom:opened':
	// 				dispatch(setChatroom(data.result))
	// 				dispatch(setActiveChatroom(data.result))
	// 				break
	// 			case 'chatrooms:fetched':
	// 				dispatch(setChatrooms(data.result))
	// 				break
	// 			case 'chatroom:messages':
	// 				const chatroomId = uniq(data.result.map((r) => r.chatroomId) || [])
	// 				dispatch(setMessages({ chatroomId: chatroomId[0], messages: data.result }))
	// 				break
	// 			case 'message:received':
	// 				dispatch(newMessage({ chatroomId: data.result.chatroomId, message: data.result }))
	// 				break
	// 		}
	// 	}

	// 	socket.onclose = () => {
	// 		console.info('Connection closed by the messaging server')
	// 		if (shouldReconnect) {
	// 			console.info('Attempting to reconnect...')
	// 			setTimeout(() => {
	// 				connectToWebSocket()
	// 			}, 5000)
	// 		}
	// 	}
	// 	socket.onerror = (error) => {
	// 		console.error('WebSocket error:', error)
	// 		socket.close()
	// 	}

	// 	setConnection(socket)

	// 	return socket
	// }, [me?.id])

	// TODO: Reimplement it

	// useEffect(() => {
	//     const socket = connectToWebSocket()

	//     return () => {
	//         setShouldReconnect(false)
	//         if (socket) {
	//             socket.close()
	//         }
	//     }
	// }, [connectToWebSocket])
	return <MessageServiceContext.Provider value={{}}>{children}</MessageServiceContext.Provider>
}

export default MessageServiceContext
