import useActivityHandlers from './useActivityHandlers'
import useConnectedUserPosition from './useConnectedUserPosition'
import useCreateActivity from './services/useCreateActivity'
import useCreateGroups from './services/useCreateGroups'
import useDeactivateAccount from './services/useDeactivateAccount'
import useDebounce from './useDebounce'
import useDeleteGroup from './services/useDeleteGroup'
import useDevice from './useDevice'
import useEnvVariables from './useEnvVariables'
import useFetchActivities from './services/useFetchActivities'
import useFetchActivity from './services/useFetchActivity'
import useFetchFavorites from './services/useFetchFavorites'
import useFetchGroup from './services/useFetchGroup'
import useFetchGroups from './services/useFetchGroups'
import useFetchLocales from './services/useFetchLocales'
import useFetchNotifications from './services/useFetchNotifications'
import useFetchUsers from './services/useFetchUsers'
import useGeolocation from './useGeolocation'
import useLocaleSwitcher from './useLocaleSwitcher'
import useLogout from './services/useLogout'
import useMapStyles from './useMapStyles'
import useMultistepForm from './useMultistepForm'
import useOnScreen from './useOnScreen'
import useReactivateAccount from './services/useReactivateAccount'
import useReadNotification from './services/useReadNotification'
import useRefreshToken from './services/useRefreshToken'
import useRegisterSelfToActivity from './services/useRegisterSelfToActivity'
import useResetDb from '../pages/Home/hooks/useResetDb'
import useUnregisterSelfFromActivity from './services/useUnregisterSelfFromActivity'
import useUpdateFavorite from './services/useUpdateFavorite'
import useUpdateSetting from './services/useUpdateSetting'

export {
	useActivityHandlers,
	useConnectedUserPosition,
	useDebounce,
	useEnvVariables,
	useFetchActivities,
	useFetchFavorites,
	useGeolocation,
	useDevice,
	useDeleteGroup,
	useLocaleSwitcher,
	useMapStyles,
	useMultistepForm,
	useOnScreen,
	useRefreshToken,
	useUpdateSetting,
	useCreateActivity,
	useDeactivateAccount,
	useFetchActivity,
	useFetchLocales,
	useFetchNotifications,
	useFetchUsers,
	useReactivateAccount,
	useReadNotification,
	useUnregisterSelfFromActivity,
	useRegisterSelfToActivity,
	useResetDb,
	useUpdateFavorite,
	useLogout,
	useCreateGroups,
	useFetchGroup,
	useFetchGroups,
}
