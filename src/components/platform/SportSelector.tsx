import Select from "@components/shared/Select"
import { useFetchSports } from "@hooks"
import { useTranslation } from "react-i18next"

const SportSelector = ({ ...props }) => {
    const { sports, isLoading } = useFetchSports()
    const { t } = useTranslation()

    return (
        <Select
            {...props}
            isDisabled={isLoading}
            label={t('Sport')}
            placeholder={t('Select sport')}
            options={sports?.data.results}
            formatOptionLabel={(option) => <span className='capitalize'>{option.name}</span>}
            getOptionLabel={(option) => option?.name}
            getOptionValue={(option) => option?.id}
            isOptionDisabled={(option) => !option?.featureAvailable}
        />
    )
}

export default SportSelector