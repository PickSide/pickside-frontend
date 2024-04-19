import { AppState, setChatrooms } from '@state'
import { FC, ReactNode, createContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MessageEventProps } from '@types'
import { loadChatroomMessages } from '@state/messages'
import { useLocalStorage } from 'usehooks-ts'

interface MessagingContextProps {
    children?: ReactNode
    connection?: WebSocket
}

const MessagingContext = createContext<MessagingContextProps>({})

export const MessagingProvider: FC<any> = ({ children }) => {
    const dispatch = useDispatch()
    const [bearer] = useLocalStorage("my-bearer-token", null)

    const me = useSelector((state: AppState) => state.user)

    const [connection, setConnection] = useState<WebSocket>()

    useEffect(() => {
        if (!bearer || !me) {
            return
        }

        const socketUrl = `${import.meta.env.VITE_APP_MESSAGE_SERVICE_SOCKET_URL}?token=${bearer}`
        const socket = new WebSocket(socketUrl)


        socket.onopen = () => {
            socket.send(JSON.stringify({
                eventType: 'chatrooms:loadall',
                content: {
                    participantId: me.id
                }
            }))
        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            switch (data.eventType) {
                case 'chatrooms:loadall':
                    dispatch(setChatrooms(data.content))
                    break
                case 'chatroom:loadmessages':
                    dispatch(loadChatroomMessages(data.content))
                    break
            }
        };

        socket.onclose = () => console.log("Connection closed by the server");
        socket.onerror = (error) => console.error("WebSocket error:", error);

        setConnection(socket)

        return () => {
            socket.close()
        }
    }, [bearer, dispatch, me])

    useEffect(() => {
        console.log('connection changed', connection)
    }, [connection])

    return (
        <MessagingContext.Provider value={{ connection }}>
            {children}
        </MessagingContext.Provider>
    )
}

export default MessagingContext
