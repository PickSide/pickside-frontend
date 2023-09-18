import useConnectedUserPosition from './useConnectedUserPosition'
import useCreateActivity from './services/useCreateActivity'
import useDeactivateAccount from './services/useDeactivateAccount'
import useDebounce from './useDebounce'
import useDevice from './useDevice'
import useEnvVariables from './useEnvVariables'
import useFetchActivities from './services/useFetchActivities'
import useFetchActivity from './services/useFetchActivity'
import useFetchLocales from './services/useFetchLocales'
import useFetchNotifications from './services/useFetchNotifications'
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
	useConnectedUserPosition,
	useDebounce,
	useEnvVariables,
	useFetchActivities,
	useGeolocation,
	useDevice,
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
	useReactivateAccount,
	useReadNotification,
	useUnregisterSelfFromActivity,
	useRegisterSelfToActivity,
	useResetDb,
	useUpdateFavorite,
	useLogout,
}
