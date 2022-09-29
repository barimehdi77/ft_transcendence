import { FriendStatus } from "@prisma/client";
import { ReadProfile } from "src/profile/dto/read-profile.dto";

export class SetupUser {
	intra_id: number;
	login: string;
	user_name: string;
	profile_done: boolean;
	isTwoFactorAuthenticationEnabled: boolean;
	token: string;
}

export class UserProfile {
	user_name: string;
	first_name: string;
	last_name: string;
	intra_id: number;
	login: string;
	image_url: string;
	email: string;
	profile: ReadProfile;
	isFriends: FriendStatus;
}


export class CreateJwt {
	intra_id: number;
	email: string;
	login: string;
	profile_done: boolean;
}

export class UserDecoder {
	intra_id: number;
	login: string;
	email: string;
}

export class UserAuth {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	login: string;
	image_url: string;
	profile_done: boolean;
	isTwoFactorAuthenticationEnabled: boolean;
	twoFactorAuthenticationSecret: string;
	blockedUsers: number[];
}
