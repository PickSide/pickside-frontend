import { ActivityCard, Spinner } from '@components'

import { Activity } from '@state'
import { useFetchFavorites } from '@hooks'
import { useTranslation } from 'react-i18next'

const Favorites = () => {
	const { favorites, isLoading } = useFetchFavorites()
	const { t } = useTranslation()

	return (
		<div className="w-full inline">
			{isLoading ? (
				<Spinner text={t('Loading favorites')} />
			) : (
				(favorites?.data?.result as Activity[])?.map((activity, idx) => <ActivityCard key={idx} activity={activity} />)
			)}
		</div>
	)
}

export default Favorites
