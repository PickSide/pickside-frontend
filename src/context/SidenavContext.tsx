import { AnimatePresence, motion } from 'framer-motion'
import { FC, ReactNode, createContext, useContext, useReducer } from 'react'
import { Icon, IconButton } from '@components'
import { cn, slideIn } from '@utils'

export const SidenavContext = createContext<any>(null)
export const SidenavDispatchContext = createContext<any>(null)

interface SidenavProps {
	opened?: boolean
	content?: ReactNode
	title?: string
}

function sidenavReducers(state, action) {
	switch (action.type) {
		case 'open': {
			return { ...state, ...action, opened: true }
		}
		case 'close': {
			return { ...state, ...action, opened: false }
		}
	}
}

export function useSidenav() {
	return useContext(SidenavContext)
}

export function useSidenavDispatch() {
	return useContext(SidenavDispatchContext)
}

export const SidenavProvider: FC<any> = ({ children }) => {
	const [state, dispatch] = useReducer(sidenavReducers, { opened: false, content: <></>, title: '' })
	console.log(state, dispatch)
	return (
		<SidenavContext.Provider value={state}>
			<SidenavDispatchContext.Provider value={dispatch}>
				<AnimatePresence>
					{state.opened && (
						<motion.div
							initial="hidden"
							animate="show"
							exit="exit"
							variants={slideIn('right')}
							className={cn(`fixed w-[500px] right-0 h-screen z-100 bg-white shadow-md`)}
						>
							<div className="h-[80px] border-b flex items-center justify-between px-6">
								<span className="uppercase text-[27px] font-semibold">{state.title}</span>
								<IconButton onClick={() => dispatch({ type: 'close', content: <></>, title: '' })}>
									<Icon icon="close" />
								</IconButton>
							</div>
							<div className="block p-6">{state.content}</div>
						</motion.div>
					)}
				</AnimatePresence>
				{children}
			</SidenavDispatchContext.Provider>
		</SidenavContext.Provider>
	)
}
