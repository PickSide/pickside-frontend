import { createContext } from 'react'
import { User } from 'state/user'

const AppContext = createContext<User>({})

export default AppContext
