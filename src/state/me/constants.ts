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
	MANAGE_ACTIVITIES = 'MANAGE_ACTIVITIES',
	MANAGE_GROUPS = 'MANAGE_GROUPS',
	MANAGE_TEAMS = 'MANAGE_TEAMS',
	REGISTER = 'REGISTER',
}

export enum GROUP_ROLES {
	OWNER = 'owner',
	ADMIN = 'admin',
	MEMBER = 'member',
}
