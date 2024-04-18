import { FC, ReactNode, createContext, useEffect, useRef } from 'react'

import { useLocalStorage } from 'usehooks-ts'

export interface MessageContextProps {
    children?: ReactNode
    connection?: WebSocket | undefined
}

const MessageContext = createContext<MessageContextProps>({

})

export const MessageProvider: FC<any> = ({ children }) => {
    const connection = useRef<WebSocket | undefined>()
    const [bearer] = useLocalStorage("my-bearer-token", null)

    useEffect(() => {
        if (!bearer) {
            return
        }

        const socket = new WebSocket(import.meta.env.VITE_APP_MESSAGE_SERVICE_SOCKET_URL + `?token=${bearer}`)

        socket.addEventListener("open", event => {
            socket.send(JSON.stringify({
                "message": "bitch"
            }))
        })
        socket.addEventListener("message", event => {
            console.log("Message from server ", event.data)
        })

        connection.current = socket

        return () => connection.current?.close()
    }, [bearer])

    return (
        <MessageContext.Provider value={{ connection: connection.current }}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContext
