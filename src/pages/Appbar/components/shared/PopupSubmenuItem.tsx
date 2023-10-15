import { Children, ComponentPropsWithRef, cloneElement, forwardRef, useState } from 'react'

import { Icon } from '@components'
import { motion } from 'framer-motion'
import { popUpSubmMenu } from '@utils'
import { useDebounce } from 'usehooks-ts'

interface PopupSubmenuItemProps extends ComponentPropsWithRef<'div'> {
	active?: boolean
	title?: string
}

const PopupSubmenuItem = forwardRef<any, PopupSubmenuItemProps>(
	({ active, children, className, title, ...rest }, ref) => {
		const [open, setOpen] = useState<boolean>(false)

		const debouncedOpen = useDebounce(open, open ? 150 : 100)

		const onMouseEnter = () => setOpen(true)
		const onMouseLeave = () => setOpen(false)

		return (
			<div className="relative" ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				<div className="flex justify-between items-center cursor-pointer">
					<span className="text-lg text-charcoal-black text-ellipsis">{title}</span>
					<Icon icon="keyboard_arrow_right" size="lg" />
				</div>

				{debouncedOpen && (
					<>
						<motion.div
							initial="closed"
							animate="open"
							exit="exit"
							variants={popUpSubmMenu}
							className="absolute right-full z-20 -translate-x-[15%] min-w-[300px] min-h-[30px] w-fit p-[30px] bg-cloud rounded-[15px] shadow-menu"
						>
							{Children.map(children, (child: any, idx) => cloneElement(child, { key: idx, ...rest }))}
						</motion.div>
					</>
				)}
			</div>
		)
	},
)

export default PopupSubmenuItem
