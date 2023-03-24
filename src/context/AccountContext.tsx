import { createContext, useContext } from 'react'
import { Account } from 'state/account'

export interface AccountContext {
	user?: Account
	preferredTheme?: string | null
	isPremium?: boolean
}

const context = createContext<AccountContext>({})
export const useAccountContext = () => useContext(context)
export default context
