import Select from "@components/shared/Select"
import { useFetchLocales } from "@hooks"
import { useTranslation } from "react-i18next"

const LanguageSelector = ({ ...props }) => {
    const { locales, isLoading } = useFetchLocales()
    const { t } = useTranslation()

    return (
        <Select
            {...props}
            isDisabled={isLoading}
            label={props.label || t('Language')}
            placeholder={t('Select language')}
            options={locales?.data.results}
            value={locales?.data.results.find(x => x.value === props.value)}
            formatOptionLabel={(option) => <span className='capitalize'>{option.name}</span>}
            getOptionLabel={(option) => option?.name}
            getOptionValue={(option) => option?.value}
        />
    )
}

export default LanguageSelector