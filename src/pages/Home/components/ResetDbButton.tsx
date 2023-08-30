import { AiOutlineSync } from 'react-icons/ai'
import { IconButton } from '@components'
import { cn } from '@utils'
import useResetDb from '../hooks/useResetDb'

const ResetDbButton = () => {
	const { resetDb, isLoading } = useResetDb()

	return (
		<div className={cn('fixed bottom-4 left-4', isLoading ? 'animate-spin' : '')}>
			<IconButton icon={<AiOutlineSync size={25} />} onClick={resetDb} />
		</div>
	)
}

export default ResetDbButton
