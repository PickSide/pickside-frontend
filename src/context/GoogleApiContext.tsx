import { FC, ReactNode, createContext, useEffect } from 'react'
import { useFetchActivities, useFetchLocales, useFetchMe, useFetchSports } from '@hooks'

export interface GoogleApiContextProps {
    children?: ReactNode
    loading?: boolean
}

const GoogleApiContext = createContext<GoogleApiContextProps>({
    loading: false,
})

export const InitialAppStateProvider: FC<any> = ({ children }) => {
    const { isLoading: activitiesLoading } = useFetchActivities()
    const { isLoading: localesLoading } = useFetchLocales()
    const { isLoading: sportsLoading } = useFetchSports()
    const { isLoading: meLoading } = useFetchMe()

    useEffect(() => {

    }, [])


    return (
        <GoogleApiContext.Provider value={{ loading: activitiesLoading || localesLoading || sportsLoading || meLoading }}>
            {children}
        </GoogleApiContext.Provider>
    )
}

export default GoogleApiContext
