import { FC, ReactNode, createContext, useEffect, useState } from 'react'

import { Alert, } from '@components'
import { AnimatePresence } from 'framer-motion'
import { AppState } from '@state'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export interface EmailVerificationContextProps {
    children?: ReactNode
}

const EmailVerificationContext = createContext<EmailVerificationContextProps>({})

export const EmailVerificationProvider: FC<any> = ({ children }) => {
    const { t } = useTranslation()
    const connectedUser = useSelector((state: AppState) => state.user)

    const [showAlert, setShowAlert] = useState<boolean>(false)

    useEffect(() => {
        if (connectedUser && !connectedUser?.emailVerified) {
            setShowAlert(true)
        }
    }, [])

    return <EmailVerificationContext.Provider value={{}}>
        {showAlert && <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>

            <div className="fixed z-50 w-full xl:w-fit xl:left-1/2 xl:-translate-x-1/2">
                <Alert
                    severity='info'
                    alertIcon='info'
                    onClose={() => setShowAlert(false)}
                >
                    <span>{t('Your email needs to be verified')}</span>
                </Alert>
            </div>

        </AnimatePresence>}
        {children}</EmailVerificationContext.Provider>
}

export default EmailVerificationContext
