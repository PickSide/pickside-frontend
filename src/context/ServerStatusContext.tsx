import { Banner, Dialog, Icon } from '@components'
import { FC, ReactNode, createContext, useState } from 'react'

import useFetchServicesHealth from '@hooks/services/useFetchServicesHealth'
import { useTranslation } from 'react-i18next'

export interface ServerStatusContextProps {
    children?: ReactNode
}

const ServerStatusContext = createContext<ServerStatusContextProps>({})

export const ServerStatusProvider: FC<any> = ({ children }) => {
    const { services, isAtLeastOneErrored } = useFetchServicesHealth()
    const { t } = useTranslation()

    const [openHealthCheckDialog, setOpenHealthCheckDialog] = useState<boolean>(false)

    const HealthChecks = () => services?.map(({ isServiceON, name }, idx) => (
        isServiceON ? (
            <p key={idx} className='flex items-center gap-x-2 text-success'>
                <Icon icon='check_circle' />
                <span>{t(`${name} service is up and running`)}</span>
            </p>
        ) : (
            <p key={idx} className='flex items-center gap-x-2 text-error font-semibold'>
                <Icon icon='block' />
                <span>{t(`${name} service is down`)}</span>
            </p>
        )
    ))

    return (
        <ServerStatusContext.Provider value={{}}>
            <Dialog
                open={openHealthCheckDialog}
                onClose={() => setOpenHealthCheckDialog(false)}
                title={t('System status')}
            >
                <div className='flex flex-col items-start justify-center gap-y-3'>
                    <HealthChecks />
                </div>
            </Dialog>
            {isAtLeastOneErrored && (
                <Banner icon='block' severity='error'>
                    <div className='flex items-center'>
                        <span>{t('Some services are temporary running into issues.')}</span>&nbsp;
                        <span className='link' onClick={() => setOpenHealthCheckDialog(true)}>{t(`Click here`)}</span>&nbsp;
                        <span>{t(`to see what's wrong`)}</span>
                    </div>
                </Banner>
            )}
            {children}
        </ServerStatusContext.Provider>
    )
}

export default ServerStatusContext
