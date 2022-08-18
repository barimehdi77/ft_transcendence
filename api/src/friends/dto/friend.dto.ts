

export class FriendRequest {
	from: number;
	to: number;
	status: string;
}
export class CreateFriendRequestDto {
	to: number;
}

export class GetFriendRequestDto {
	// id: Number; TBD
	to: UserInfo;
	status: string;
}


export class UserInfo {
	user_name: string;
	image_url: string;
}
