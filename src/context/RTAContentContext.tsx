import { FC, createContext } from 'react'
import { Socket, io } from 'socket.io-client'

interface RTAContentContextProps {
	socket: Socket | null
}

const Context = createContext<RTAContentContextProps>({ socket: null })

export const RTAContentProvider: FC<any> = ({ children }) => {
	const socket: Socket = io(import.meta.env.VITE_APP_API_BASE_URL)

	//const connectedUser = useSelector((state: AppState) => state.user)

	return <Context.Provider value={{ socket }}>{children}</Context.Provider>
}

export default Context
