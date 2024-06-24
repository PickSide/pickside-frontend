import { FC, ReactNode, createContext, useEffect, useState } from 'react'

import { AnimatePresence } from 'framer-motion'
import { AppState } from '@state'
import { Banner, } from '@components'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export interface EmailVerificationContextProps {
    children?: ReactNode
}

const EmailVerificationContext = createContext<EmailVerificationContextProps>({})

export const EmailVerificationProvider: FC<any> = ({ children }) => {
    const { t } = useTranslation()
    const me = useSelector((state: AppState) => state.user)

    const [showAlert, setShowAlert] = useState<boolean>(false)

    useEffect(() => {
        if (me && !me?.emailVerified) {
            setShowAlert(true)
        }
    }, [])

    return <EmailVerificationContext.Provider value={{}}>
        {showAlert && <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>

            <div className="z-50 w-full">
                <Banner
                    severity='info'
                    icon='info'
                    onClose={() => setShowAlert(false)}
                >
                    <span>{t('Your email needs to be verified')}</span>
                </Banner>
            </div>

        </AnimatePresence>}
        {children}</EmailVerificationContext.Provider>
}

export default EmailVerificationContext
