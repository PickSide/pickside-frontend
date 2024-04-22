import { AppState, setActiveChatroom } from '@state'
import { Icon, IconButton, InputField } from '@components'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '@components/Avatar'
import { MessageServiceContext } from '@context'
import moment from 'moment'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const ChatBox = ({ chatroom }) => {
    const { connection } = useContext(MessageServiceContext)
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
                    {!messages || !chatroom.id || !messages[chatroom.id] ?
                        (
                            <div className='h-full flex items-center justify-center'>
                                <span className='text-cool-gray-3'>{t('No messages')}</span>
                            </div>
                        )
                        : messages[chatroom.id]?.map((m, idx) => (
                            m.senderId === me?.id ?
                                <div key={idx} className='flex flex-col items-end px-4 mb-2 '>
                                    <span className='bg-ocean-2 rounded-md text-cloud px-2 py-1 break-words max-w-[80%]'>{m.content}</span>
                                    <span className='text-sm text-cool-gray-2 my-1'>{t('Sent') + " " + moment(new Date(m.sentAt)).format('ll')}</span>
                                </div>
                                :
                                <div key={idx} className='flex flex-col items-start px-4 mb-2 '>
                                    <span className='bg-cool-gray-1 rounded-md px-2 py-1 break-words max-w-[80%]'>{m.content}</span>
                                    <span className='text-sm text-cool-gray-2 my-1'>{t('Sent') + " " + moment(new Date(m.sentAt)).format('ll')}</span>
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
                        onPressEnterKey={sendMessage}
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

export default ChatBox