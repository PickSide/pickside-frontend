import { AppState, setChatrooms } from '@state'
import { FC, ReactNode, createContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MessageEventProps } from '@types'
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


        socket.addEventListener("open", event => {
            const message: MessageEventProps = {
                eventType: 'chatrooms:loadall',
                content: {
                    participantId: me.id
                }
            }
            socket.send(JSON.stringify(message))
        })

        socket.addEventListener("message", event => {
            const response = JSON.parse(event.data)
            dispatch(setChatrooms(response))
        })
        socket.addEventListener('close', event => {
            console.log('Connection closed by server.')
        })
        socket.addEventListener('error', event => {
            console.error('WebSocket error:', event)
        })

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
