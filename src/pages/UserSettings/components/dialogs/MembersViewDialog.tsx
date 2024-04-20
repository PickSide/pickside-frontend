import { FC } from "react"
import { User } from "@state"

interface MembersViewDialogProps {
    members?: User[]
    onClose?: () => void
}

const MembersViewDialog: FC<MembersViewDialogProps> = ({ members }) => {

    return (
        <div className="flex flex-col">
            {members?.map((member, idx) => (
                <span key={idx} className="inline-flex items-center space-x-4">
                    {member.fullName}
                    {member.displayName}
                    {member.email}
                </span>
            ))}
        </div>
    )
}

export default MembersViewDialog