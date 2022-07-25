export class SetupUser {
	intra_id: number;
	// first_name: string;
	// last_name: string;
	login: string;
	user_name: string;
	// email: string;
	// ProfileDone: boolean;
	token: string;
}

export class UserProfile {
	user_name: string;
	bio: string;
	status: string;
	wins: number;
	losses: number;
	image_url: string;
	rank: number;
}

export class CreateJwt {
	intra_id: number;
	email: string;
	login: string;
}
