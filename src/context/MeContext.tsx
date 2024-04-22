import { FC, ReactNode, createContext, useEffect } from 'react'
import { useFetchMe, useFetchNotifications } from '@hooks'

export interface MeContextProps {
    children?: ReactNode
    amILoading?: boolean
}

const MeContext = createContext<MeContextProps>({
    amILoading: false,
})

export const MeProvider: FC<any> = ({ children }) => {
    const { isLoading: meLoading, me } = useFetchMe()
    const { refetch: fetchNotifications } = useFetchNotifications()

    useEffect(() => {
        if (!meLoading && me) {
            fetchNotifications()
        }
    }, [fetchNotifications, me, meLoading])

    return (
        <MeContext.Provider value={{ amILoading: meLoading }}>
            {children}
        </MeContext.Provider>
    )
}

export default MeContext
