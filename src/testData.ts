import { Address } from 'types'
import { Activity } from 'state/activity'
import { User } from 'state/user'
import { AppConfig } from 'state/config'

const address: Address = {
	streetName: '1856 Rue tripoli',
	city: 'Laval',
	zipCode: 'h7m 4m5',
} as Address
export const connectedUser = { firstName: 'Antoine', lastName: 'Hakim', sexe: 'male', level: 5 } as User
export const appConfig = {
	darkModeOn: true,
	language: 'en_US',
	location: { lat: 45.508888, lng: -73.561668 },
} as AppConfig
export const randomUsers = [
	{
		firstName: 'Jean',
		lastName: 'Dubois',
		sexe: 'male',
		level: 3,
	},
	{
		firstName: 'Marcus',
		lastName: 'Le grand',
		sexe: 'male',
		level: 2,
	},
	{
		firstName: 'Philippe',
		lastName: 'Le convictionner',
		sexe: 'male',
		level: 5,
	},
	{
		firstName: 'Mehdi',
		lastName: 'Zimmerman',
		sexe: 'male',
		level: 5,
	},
] as User[]
export const activities = [
	{
		title: 'Soccer game',
		type: 'soccer',
		organiser: randomUsers[0],
		levelRequired: 3,
		registeredPlayers: Math.floor(Math.random() * 16) + 1,
		maxPlayersCapacity: 16,
		location: address,
	},
	{
		title: 'Bball street',
		type: 'basketball',
		organiser: randomUsers[1],
		levelRequired: 2,
		registeredPlayers: Math.floor(Math.random() * 16) + 1,
		maxPlayersCapacity: 16,
		location: address,
	},
	{
		title: 'Tennis tournament!!',
		type: 'tennis',
		organiser: randomUsers[2],
		levelRequired: 4,
		registeredPlayers: Math.floor(Math.random() * 16) + 1,
		maxPlayersCapacity: 16,
		location: address,
	},
	{
		title: 'AF game',
		type: 'american_football',
		organiser: randomUsers[4],
		levelRequired: 5,
		registeredPlayers: Math.floor(Math.random() * 16) + 1,
		maxPlayersCapacity: 16,
		location: address,
	},
] as Activity[]
