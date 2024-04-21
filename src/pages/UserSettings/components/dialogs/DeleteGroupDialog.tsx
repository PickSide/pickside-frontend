import { Button, DialogCTA } from "@components"

import { FC } from "react"
import { useDeleteGroup } from "@hooks"
import { useTranslation } from "react-i18next"

interface DeleteGroupDialogProps {
    groupId: string
    onClose: () => void
}
const DeleteGroupDialog: FC<DeleteGroupDialogProps> = ({ groupId, onClose }) => {
    const { deleteGroup, isLoading } = useDeleteGroup()

    const { t } = useTranslation()

    return (
        <>
            <p>{t('Are you sure you want to delete group ?')}</p>
            <DialogCTA>
                <Button variant="tertiary" onClick={onClose}>
                    {t('Cancel')}
                </Button>
                <Button
                    variant="danger"
                    isLoading={isLoading}
                    onClick={() => {
                        deleteGroup(groupId)
                        onClose()
                    }}
                >
                    {t('Delete')}
                </Button>
            </DialogCTA>
        </>
    )
}

export default DeleteGroupDialog