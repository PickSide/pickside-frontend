import { Children, ReactNode, cloneElement, forwardRef } from 'react'

export interface TabProps {
	children?: ReactNode
}

const Tab = ({ children }: TabProps, ref) => {
	return <div className="w-64 p-2">{children}</div>
}

export const Tabs = ({ children }, ref) => {
	return (
		<div className="block p-2">
			<div className="flex flex-nowrap overflow-x-auto" role="tablist">
				{Children.map(children, (child, idx) => cloneElement(child, { key: idx, ref }))}
			</div>
		</div>
	)
}

export default forwardRef(Tab)
