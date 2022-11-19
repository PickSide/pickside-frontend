import { useRoutes } from 'react-router-dom'

import HomePage from '../pages/Home/HomePage'

const useAppRoutes = (): { routes } => {
	const routes = useRoutes([
		{
			path: '/',
			element: <HomePage />,
		},
	])

	return { routes }
}

export default useAppRoutes
