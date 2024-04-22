import { AppState } from '@state'
import ChatBox from './ChatBox'
import { useSelector } from 'react-redux'

const ActiveChatrooms = () => {
	const activeChatrooms = useSelector((state: AppState) => state.activeChatrooms)
	return (
		<div className="fixed bottom-0 z-20 right-0 flex flex-row-reverse w-full">
			{activeChatrooms?.map((chatroom, idx) => <ChatBox chatroom={chatroom} key={idx} />)}
		</div>
	)
}



export default ActiveChatrooms
