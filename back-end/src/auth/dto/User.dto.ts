import { ReadProfile } from "src/profile/dto/read-profile.dto";

export class SetupUser {
	intra_id: number;
	// first_name: string;
	// last_name: string;
	login: string;
	user_name: string;
	// email: string;
	ProfileDone: boolean;
	token: string;
}

export class UserProfile {
	user_name: string;
	first_name: string;
	last_name: string;
	login: string;
	image_url: string;
	email: string;
	profile: ReadProfile;
}

export class CreateJwt {
	intra_id: number;
	email: string;
	login: string;
	ProfileDone: boolean;
}
