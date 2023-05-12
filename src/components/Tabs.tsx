import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from 'utils/variants'
import { Spinner } from 'components'
import { useDebounce } from 'hooks'

export interface TabProps {
	title?: string
	path?: string
	icon?: ReactNode
	content?: ReactNode
	selected?: boolean
	disabled?: boolean
}

export interface TabsProps {
	tabs: TabProps[]
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
	const [selected, setSelected] = useState<TabProps>()
	const [currentIdx, setCurrentIdx] = useState<number>()
	const [isSwitchingTab, setIsSwitchingTab] = useState<boolean>()

	const _onSelectTab = useCallback((tab) => setSelected(tab), [])
	const debouncedValue = useDebounce(selected, 500)

	useEffect(() => {
		const defaultSelected = tabs.find((tab) => tab.selected)

		if (!!defaultSelected) {
			setSelected(defaultSelected)
			setCurrentIdx(tabs.indexOf(defaultSelected))
		}
	}, [])

	useEffect(() => {
		if (selected !== debouncedValue) {
			setIsSwitchingTab(true)
		} else {
			setIsSwitchingTab(false)
		}
	}, [selected, debouncedValue])

	return (
		!!tabs && (
			<div className="flex flex-col gap-y-10">
				<ul className="flex flex-wrap justify-center -mb-px text-sm font-medium text-center">
					{tabs.map((tab, idx) => (
						<li key={idx} className="mr-2">
							<div
								className={`inline-flex p-4 border-transparent rounded-t-lg ${
									tab.path === selected?.path ? 'active-tab' : ''
								} tab`}
								onClick={() => _onSelectTab(tab)}
							>
								<span className="w-5 h-5 mr-2">{tab.icon}</span>
								{tab.title}
							</div>
						</li>
					))}
				</ul>
				{!isSwitchingTab ? (
					<motion.div variants={fadeIn('right', 0, 0.1)} initial="hidden" whileInView={'show'} className="h-fit">
						{selected?.content}
					</motion.div>
				) : (
					<div className="flex items-center m-auto min-h-[200px]">
						<Spinner />
					</div>
				)}
			</div>
		)
	)
}

export default Tabs
