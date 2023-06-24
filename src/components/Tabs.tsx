import React, { FC, ReactNode, cloneElement, forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { motion } from 'framer-motion'
import { fadeIn } from 'utils'
import { Spinner } from 'components'
import { useDebounce } from 'hooks'

export interface TabProps {
	children?: ReactNode
}

const Tab = ({ children }: TabProps, ref) => {
	return <div className="w-64 p-2">{children}</div>
}

export const Tabs = ({ children }, ref) => {
	const [selected, setSelected] = useState<TabProps>()

	return (
		<div className="block p-2">
			<div className="flex flex-nowrap overflow-x-auto" role="tablist">
				{React.Children.map(children, (child, idx) => cloneElement(child, { key: idx, ref }))}
			</div>
		</div>
	)
}

export default forwardRef(Tab)
