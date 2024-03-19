import Select from "@components/shared/Select"
import { useFetchGroups } from "@hooks"
import { useTranslation } from "react-i18next"

const GroupSelector = ({ ...props }) => {
    const { groups, isLoading } = useFetchGroups()
    const { t } = useTranslation()

    return (
        <Select
            {...props}
            isDisabled={isLoading}
            label={t('Language')}
            placeholder={t('Select language')}
            options={groups?.data.results}
            formatOptionLabel={(option) => <span className='capitalize'>{option.name}</span>}
            getOptionLabel={(option) => option?.name}
            getOptionValue={(option) => option?.id}

        />
    )
}

export default GroupSelector