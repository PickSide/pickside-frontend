import Select from "@components/shared/Select"
import { forwardRef } from 'react'
import { useFetchLocales } from "@hooks"
import { useTranslation } from "react-i18next"

interface LanguageSelectorProps {
    label?: string
    value?: string
    [key: string]: any
}

const LanguageSelector = forwardRef<HTMLDivElement, LanguageSelectorProps>(({ ...props }, ref) => {
    const { locales, isLoading } = useFetchLocales()
    const { t } = useTranslation()

    return (
        <Select
            {...props}
            ref={ref}
            isDisabled={isLoading}
            label={props.label || t('Language')}
            placeholder={t('Select language')}
            options={locales?.data.result}
            value={locales?.data.result.find(x => x.value === props.value)}
            formatOptionLabel={(option) => <span className='capitalize'>{option.name}</span>}
            getOptionLabel={(option) => option?.name}
            getOptionValue={(option) => option?.value}
        />
    )
})

export default LanguageSelector

