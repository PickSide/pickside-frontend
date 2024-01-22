export enum ACCOUNT_TYPE {
	GOOGLE = 'google',
	FACEBOOK = 'facebook',
	APPLE = 'apple',
	DEFAULT = 'default',
	GUEST = 'guest',
}

export enum ROLES {
	ADMIN = 'admin',
	USER = 'user',
}

export enum USER_PERMISSIONS {
	ACTIVITIES_VIEW = 'activities-view',
	ACTIVITIES_CREATE = 'activities-create',
	ACTIVITIES_DELETE = 'activities-delete',
	ACTIVITIES_REGISTER = 'activities-register',
	GROUP_CREATE = 'group-create',
	GROUP_DELETE = 'group-delete',
	GROUP_SEARCH = 'group-search',
	USERS_VIEW_ALL = 'see-all-users',
	USERS_VIEW_DETAIL = 'see-detail-users',
	SEND_MESSAGES = 'send-messages',
	NOTIFICATIONS_RECEIVE = 'notifications-receive',
	GOOGLE_SEARCH = 'google-search',
	MAP_VIEW = 'map-view',
}

export enum GROUP_ROLES {
	OWNER = 'owner',
	ADMIN = 'admin',
	MEMBER = 'member',
}
