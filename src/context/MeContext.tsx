import { FC, ReactNode, createContext } from 'react'

import { useFetchMe } from '@hooks'

export interface MeContextProps {
    children?: ReactNode
    amILoading?: boolean
}

const MeContext = createContext<MeContextProps>({
    amILoading: false,
})

export const MeProvider: FC<any> = ({ children }) => {
    const { isLoading: meLoading } = useFetchMe()

    return (
        <MeContext.Provider value={{ amILoading: meLoading }}>
            {children}
        </MeContext.Provider>
    )
}

export default MeContext
