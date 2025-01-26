export interface IRegisterRequest {
	username: string;
	email: string;
	password: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
}
