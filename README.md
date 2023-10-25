# Soccer app (placeholder name)

This application is going to be a PWA which will be available on most platforms, exploiting the best and latest features from each devices to bring the best and smoothest user experience. Its concept is simple, enable location services on the device, and let the app do the work for you.

## Installation

```bash
git clone https://github.com/thenoobgrammer/soccer-app.git

cd /soccer-app

npm i

npm run start
```

## Current AppState

```typescript
// Global app state
export interface AppState {
	appConfig?: UserConfig
	connectedUser?: User
	eventLocations?: EventLocations
	selectedEvent?: EventLocation
	sports?: Sports
	sportEvents?: SportEvents
}

export interface UserConfig {
	darkModeEnabled?: boolean
	locale?: string
	connectedUserLocation?: Coordinates
}

export interface EventLocation {
	id?: string
	sportEventId: string
	location: google.maps.LatLng
}

export interface RegionEvent {
	id?: string
	description?: string
	events: SportEvents
}

export interface Sport {
	id?: string
	value?: string
	description?: string
}

export interface SportEvent {
	id?: string
	address?: Address
	free?: boolean
	levelRequired?: any
	locations: google.maps.LatLng
	maxPlayersCapacity: number
	numberOfRegisteredPlayers: number
	organizer?: User
	pricePerUnit?: number
	registeredUserIds?: string[]
	title?: string
	type?: Sport
}

// State of a user
export interface User {
	id?: string
	firstName?: string
	lastName?: string
	email?: string
	sexe?: 'male' | 'female'
	level?: number
	reliability?: number
	matchPlayed?: number
	matchOrganized?: number
	location?: Coordinates
}
```

## Way to receive an and array from the backend

#### Example for SportEvents

```typescript
export interface SportEvents {
	results: SportEvent[]
	/*
		It's to allow for generic use of pagination in case we need it later
	*/
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
