import { Sport } from "@state"

export type CreateGroupProps = {
    description?: string
    members: any[]
    name: string
    organizerId: number
    sport: Sport
    visibility: 'public' | 'private'
}