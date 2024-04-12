import Select from "@components/shared/Select"
import { useFetchSports } from "@hooks"
import { useTranslation } from "react-i18next"

const SportSelector = ({ ...props }) => {
    const { sports, isLoading } = useFetchSports()
    const { t } = useTranslation()

    const defaultSport = sports?.data.results?.find(sport => sport.featureAvailable === true)

    return (
        <Select
            {...props}
            isDisabled={isLoading}
            label={t('Sport')}
            placeholder={t('Select sport')}
            options={sports?.data.results}
            value={defaultSport}
            formatOptionLabel={(option) => <span className='capitalize'>{option.name}</span>}
            getOptionLabel={(option) => option?.name}
            getOptionValue={(option) => option?.id}
            isOptionDisabled={(option) => !option?.featureAvailable}
        />
    )
}

export default SportSelector