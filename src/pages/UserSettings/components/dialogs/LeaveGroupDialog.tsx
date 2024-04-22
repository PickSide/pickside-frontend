import { Button, DialogCTA } from "@components"

import { FC } from "react"
import { useLeaveGroup } from "@hooks"
import { useTranslation } from "react-i18next"

interface LeaveGroupDialogProps {
    groupId: string
    onClose: () => void
}
const LeaveGroupDialog: FC<LeaveGroupDialogProps> = ({ groupId, onClose }) => {
    const { leaveGroup, isLoading } = useLeaveGroup()

    const { t } = useTranslation()

    return (
        <>
            <p>{t('Are you sure you want to leave the group ? You would need to be invited again.')}</p>
            <DialogCTA>
                <Button variant="tertiary" onClick={onClose}>
                    {t('Cancel')}
                </Button>
                <Button
                    variant="danger"
                    isLoading={isLoading}
                    onClick={() => {
                        leaveGroup(groupId)
                        onClose()
                    }}
                >
                    {t('Leave')}
                </Button>
            </DialogCTA>
        </>
    )
}

export default LeaveGroupDialog