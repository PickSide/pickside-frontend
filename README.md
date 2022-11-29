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
    activities?: Activity[]
	appConfig?: AppConfig
	connectedUser?: User
	markers?: MarkerActivity[]
	selectedActivity?: MarkerActivity
	sports?: SportType[]
}

// An activity event
export interface ActivityEvent {
	type?: ActivityEventType
	free?: boolean
	pricePerUnit?: number
	address?: Address
}

// An activity
export interface Activity extends ActivityEvent {
    id?: string
	levelRequired?: any
	maxPlayersCapacity: number
	numberOfRegisteredPlayers: number
	organiser?: User
	registeredUserIds?: string[]
	title?: string
}

// Application configuration 
export interface AppConfig {
	darkModeOn?: boolean
	language?: string
	currentConfiguredLocation?: Coordinates
}

// Marker that will display on the map linked to the activity
export interface MarkerActivity extends google.maps.LatLng {
	activityId: string
}

// A sport object 
export interface SportType {
	id?: string
	name?: string
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