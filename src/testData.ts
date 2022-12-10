import { Location } from 'types'
import { Sports } from 'state/sport'
import { SportEvents } from 'state/sportEvent'
import { User } from 'state/user'
import { AppConfig } from 'state/config'
import { v4 as uuidv4 } from 'uuid'

const location1 = {
	streetName: '1856 Rue de Tripoli',
	city: 'Laval',
	zipCode: 'H7M 4M5',
	place_id: '"ChIJy4wGGoEhyUwRk4otlwqlAlM"',
	coords: {
		lat: 45.5790972,
		lng: -73.719133,
	},
} as Location

const location2 = {
	streetName: '45 Bd Cartier O',
	city: 'Laval',
	place_id: 'ChIJg3TGJAkiyUwR_cDAufwz5A4',
	coords: {
		lat: 45.5586144,
		lng: -73.6885578,
	},
} as Location

const location3 = {
	streetName: '350 Rue Sauvé E',
	city: 'Montréal',
	zipCode: 'H3L 1H4',
	place_id: '"ChIJl4MCQ8AYyUwRPGDjNcsejUw"',
	coords: {
		lat: 45.5490424,
		lng: -73.6573323,
	},
} as Location

export const connectedUser = {
	id: '284190751071057130',
	firstName: 'Antoine',
	lastName: 'Hakim',
	sexe: 'male',
	level: 5,
	locatedRegion: '',
	localeRegion: 'montreal',
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

export const sportEvents = {
	results: [
		{
			id: '32u4892y1491y481',
			title: 'Soccer game',
			type: 'soccer',
			organiser: randomUsers[0],
			levelRequired: 3,
			numberOfRegisteredPlayers: Math.floor(Math.random() * 16) + 1,
			maxPlayersCapacity: 16,
			location: location1,
		},
		{
			id: '8329058230jf09',
			title: 'Bball street',
			type: 'basketball',
			organiser: randomUsers[1],
			levelRequired: 2,
			numberOfRegisteredPlayers: Math.floor(Math.random() * 16) + 1,
			maxPlayersCapacity: 16,
			location: location2,
		},
		{
			id: 'fm032ut20u4',
			title: 'Tennis tournament!!',
			type: 'tennis',
			organiser: randomUsers[2],
			levelRequired: 4,
			numberOfRegisteredPlayers: Math.floor(Math.random() * 16) + 1,
			maxPlayersCapacity: 16,
			location: location3,
		},
		{
			id: '8123fjm1301j',
			title: 'AF game',
			type: 'american_football',
			organiser: randomUsers[4],
			levelRequired: 5,
			numberOfRegisteredPlayers: Math.floor(Math.random() * 16) + 1,
			maxPlayersCapacity: 16,
			location: location3,
		},
	],
} as SportEvents

export const sports = {
	results: [
		{
			id: uuidv4(),
			value: 'soccer',
			description: 'Soccer',
		},
		{
			id: uuidv4(),
			value: 'basketball',
			description: 'Basketball',
		},
		{
			id: uuidv4(),
			value: 'afootball',
			description: 'American Football',
		},
		{
			id: uuidv4(),
			value: 'tennis',
			description: 'Tennis',
		},
	],
} as Sports
