export type MessageEvents = 'chatroom:load' | 'chatrooms:loadall' | 'chatroom:loadmessages' | 'message:send' | 'message:delete'

export interface DeleteMessageEventProps {
    participantId: string
}

export interface LoadChatroomEventProps {
    participantIds: string[]
}

export interface LoadChatroomsEventProps {
    participantId: string
}

export interface LoadMessagesEventProps {
    chatroomtId: string
}

export interface SendMessageProps {
    content: string
    chatroomId: string
    senderId: string
}

export type MessageEventProps = {
    eventType: MessageEvents
    content: DeleteMessageEventProps | LoadChatroomEventProps | LoadChatroomsEventProps | LoadMessagesEventProps | SendMessageProps
}
