import { FC, createContext, useState } from 'react'

export interface ChatroomContextProps {}

const ChatroomContext = createContext<ChatroomContextProps>({})

export const ChatroomProvider: FC<any> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(false)
	return (
		<ChatroomContext.Provider value={{}}>
			{open && <div className="fixed bottom-0 h-96"></div>}
		</ChatroomContext.Provider>
	)
}

export default ChatroomContext
