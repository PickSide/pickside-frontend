import { Icon, IconButton } from '@components'

import { cn } from '@utils'
import useResetDb from '../hooks/useResetDb'

const ResetDbButton = () => {
	const { resetDb, isLoading } = useResetDb()

	return (
		<div className={cn('fixed bottom-4 left-4', isLoading ? 'animate-spin' : '')}>
			<IconButton onClick={resetDb}>
				<Icon icon="sync" />
			</IconButton>
		</div>
	)
}

export default ResetDbButton
