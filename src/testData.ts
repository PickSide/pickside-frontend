import { Address } from 'types'
import { Activity } from 'state/activity'
import { User } from 'state/user'
import { AppConfig } from 'state/config'
import { SportType } from 'state/sport'

const address1: Address = {
	streetName: '1856 Rue de Tripoli',
	city: 'Laval',
	zipCode: 'H7M 4M5',
} as Address
const address2: Address = {
	streetName: '45 Bd Cartier O',
	city: 'Laval',
} as Address
const address3: Address = {
	streetName: '350 Rue Sauvé E',
	city: 'Montréal',
	zipCode: 'H3L 1H4',
} as Address
export const connectedUser = {
	id: '284190751071057130',
	firstName: 'Antoine',
	lastName: 'Hakim',
	sexe: 'male',
	level: 5,
	location: { lat: 45.508888, lng: -73.561668 },
} as User
export const appConfig = {
	darkModeOn: false,
	language: 'en_US',
	currentConfiguredLocation: { lat: 45.508888, lng: -73.561668 },
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
		id: '32u4892y1491y481',
		title: 'Soccer game',
		type: 'soccer',
		organiser: randomUsers[0],
		levelRequired: 3,
		numberOfRegisteredPlayers: Math.floor(Math.random() * 16) + 1,
		maxPlayersCapacity: 16,
		location: address1,
	},
	{
		id: '83290-58230jf09',
		title: 'Bball street',
		type: 'basketball',
		organiser: randomUsers[1],
		levelRequired: 2,
		numberOfRegisteredPlayers: Math.floor(Math.random() * 16) + 1,
		maxPlayersCapacity: 16,
		location: address2,
	},
	{
		id: 'fm032ut20u4',
		title: 'Tennis tournament!!',
		type: 'tennis',
		organiser: randomUsers[2],
		levelRequired: 4,
		numberOfRegisteredPlayers: Math.floor(Math.random() * 16) + 1,
		maxPlayersCapacity: 16,
		location: address3,
	},
	{
		id: '8123fjm1301j',
		title: 'AF game',
		type: 'american_football',
		organiser: randomUsers[4],
		levelRequired: 5,
		numberOfRegisteredPlayers: Math.floor(Math.random() * 16) + 1,
		maxPlayersCapacity: 16,
		location: address3,
	},
] as Activity[]
export const sports = [
	{
		id: '213214',
		name: 'basketball',
	},
	{
		id: '213414214',
		name: 'tennis',
	},
	{
		id: '213232114',
		name: 'american_football',
	},
	{
		id: '21324414',
		name: 'soccer',
	},
	{
		id: '2132231314',
		name: 'running',
	},
	{
		id: '213226714',
		name: 'boxing',
	},
	{
		id: '21325514',
		name: 'squash',
	},
	{
		id: '2132117994',
		name: 'handball',
	},
] as SportType[]
