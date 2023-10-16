import { AnimatePresence, motion } from 'framer-motion'

import Button from './shared/Button'
import { fadeIn } from '@utils'
import { useTranslation } from 'react-i18next'

const BottomDrawer = ({ show = false, onReset }) => {
	const { t } = useTranslation()

	return show ? (
		<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
			<motion.div
				variants={fadeIn('bottom', 0.1, 1.2)}
				initial="hidden"
				animate="show"
				exit="exit"
				className="fixed left-0 bottom-0 h-16 bg-slate-100 border-t-2 w-screen flex items-center justify-end z-50 pe-4"
			>
				<div className="block space-x-4">
					<Button type="reset" variant="tertiary" onClick={onReset}>
						{t('Discard')}
					</Button>
					<Button type="submit">{t('Save')}</Button>
				</div>
			</motion.div>
		</AnimatePresence>
	) : null
}

export default BottomDrawer
