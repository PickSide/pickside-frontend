import { AnimatePresence, motion } from 'framer-motion'
import { FC, ReactNode, createContext, useReducer } from 'react'
import { Icon, IconButton } from '@components'

import { slideIn } from '@utils'

declare type SidenavState = {
	opened: boolean
	content: ReactNode
	title: ReactNode | string
	prevState?: SidenavState
}

export const SidenavContext = createContext<any>(null)
export const SidenavDispatchContext = createContext<any>(null)

const defaultState = {
	opened: false,
	content: <></>,
	title: '',
	prevState: null,
}

function sidenavReducers(state: SidenavState, action) {
	switch (action.type) {
		case 'open':
			return { ...state, ...action, opened: true, prevState: state }
		case 'close':
			return defaultState
		case 'previous':
			return state.prevState
		default:
			return defaultState
	}
}

export const SidenavProvider: FC<any> = ({ children }) => {
	const [state, dispatch] = useReducer(sidenavReducers, defaultState)

	const handlePrevious = () => dispatch({ type: 'previous' })

	const clearState = () => dispatch({ type: 'close' })

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
							className="fixed w-[400px] right-0 h-screen z-100 bg-white shadow-md"
						>
							<div className="h-16 border-b flex items-center justify-between px-6">
								<span className="flex justify-center items-center capitalize text-lg font-medium">
									{state.prevState ? (
										<IconButton onClick={handlePrevious}>
											<Icon icon="keyboard_arrow_left" />
										</IconButton>
									) : null}
									{state.title}
								</span>
								<IconButton onClick={clearState}>
									<Icon icon="close" />
								</IconButton>
							</div>
							<div className="h-full p-6 overflow-clip">{state.content}</div>
						</motion.div>
					)}
				</AnimatePresence>
				{children}
			</SidenavDispatchContext.Provider>
		</SidenavContext.Provider>
	)
}
