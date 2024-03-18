export enum Status {
	Ok = 200,
	Created = 201,
	Accepted = 202,
	NoContent = 204,

	BadRequest = 400,
	Unauthorized = 401,
	PaymentRequired = 402,
	Forbidden = 403,
	NotFound = 404,
	MethodNotAllowed = 405,
	RequestTimeout = 408,
	Conflict = 409,

	InternalServerError = 500,
	NotImplemented = 501,
	BadGateway = 502,
	ServiceUnavailable = 503,
	NetworkAuthenticationRequired = 511,
}

export enum AppContext {
	Activity = 'Activity',
	Chatroom = 'Chatroom',
	DB = 'DB',
	Email = 'Email',
	Group = 'Group',
	Locale = 'Locale',
	Message = 'Message',
	Notification = 'Notification',
	Schedule = 'Schedule',
	Sport = 'Sport',
	Token = 'Token',
	User = 'User',
}

export enum JobType {
	SendMessage = 'sendmessage',
	InitializeChatroom = 'initializechatroom',
	GetChatroom = 'getchatroom',
	UpdateChatroom = 'updatechatroom',
	DeleteChatroom = 'deletechatroom',
	ResetDb = 'resetdb',
	Login = 'login',
	Logout = 'logout',
	Register = 'register',
	GetAccessToken = 'getaccesstoken',
	GetGroupForUser = 'getgroupforuser',
	UpdateUser = 'updateuser',
	DeleteGroup = 'deletegroup',
	VerifyEmail = 'vertifyemail',
	DeactivateAccount = 'deactivateaccount',
	ReactivateAccount = 'deactivateaccount',
	ActivityFavorite = 'addactivitytofavorites',
	ActivityRegister = 'registerusertoactivity',
}

export enum FailReason {
	DbResetFailed = 'dbresetfailed',
	TokenExpired = 'tokenexpired',
	TokenError = 'tokenerror',
	TokenInvalid = 'tokeninvalid',
	BadPayload = 'wrongpayload',
	BadParams = 'wrongparams',
	ChatRoomNotFoundError = 'chatroomnotfoundrror',
	ChatroomInitializationError = 'chatroominitializationerror',
	GroupCreationError = 'groupcreationerror',
	GroupDeletionError = 'groupdeletionerror',
	UserDeactivateAccount = 'userdeactivateaccount',
	UserReactivateAccount = 'userreactivateaccount',
	UserInactive = 'userinactive',
	UserExists = 'userexists',
	UserFailedToUpdate = 'userfailtoupdate',
	UserWrongCredentials = 'userbadcredentials',
	UserLogout = 'userlogout',
	UserNotFound = 'usernotfound',
	UserAlreadyRegisteredToActivity = 'useralreadyregisteredtoactivity',
	UserNotRegisteredToActivity = 'usernotregisteredtoactivity',
	ActivityNotFound = 'activitynotfound',
}

export const DefaultServerResponseMap = {
	200: `Ok.`,
	201: `Ressource was successfully created.`,
	202: `Accepted`,
	204: `No content`,

	400: `Bad request`,
	401: `Unauthorized action`,
	402: `Payment required`,
	403: `Forbidden action`,
	404: `Ressource not found`,
	405: `Method not allowed`,
	408: `Request timeout`,
	409: `Conflict. Ressource already exists`,

	500: `Internal server error.`,
	501: `Endpoint not implemented.`,
	502: `Bad gateway.`,
	503: `Service is currently unavailable.`,
	511: `Network authentication is required.`,
}

export interface MessageReponseProps {
	callback?: string
	context?: AppContext
	extra?: any
	failReason?: FailReason
	jobStatus?: 'FAILED' | 'COMPLETED'
	jobType?: JobType
	message?: string
	status: Status
	timeStamp?: Date
	payload?: any
	redirectUri?: string
}

export type PayloadResponseProps<T> = MessageReponseProps & { payload: T }
export type ListPayloadResponseProps<T> = MessageReponseProps & { results: T[] }
export type ResponseMessageProps = MessageReponseProps
