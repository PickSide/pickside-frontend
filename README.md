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
	appConfig?: AppConfig
	connectedUser?: User
	eventLocations?: EventLocations
	selectedEvent?: EventLocation
	sports?: Sports
	sportEvents?: SportEvents
}

export interface AppConfig {
	darkModeOn?: boolean
	language?: string
	currentConfiguredLocation?: Coordinates
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
	organiser?: User
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

## License

[MIT](https://choosealicense.com/licenses/mit/)
