import { Sport } from "@state"

export type CreateGroupProps = {
    description?: string
    members: any[]
    name: string
    organizerId: number
    requireApproval: boolean
    sport: Sport
    visibility: 'public' | 'private'
}