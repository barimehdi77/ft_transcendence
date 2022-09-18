

export class FriendRequest {
	id: number;
	from: number;
	to: number;
	status: string;
}
export class CreateFriendRequestDto {
	to: number;
}

export class GetFriendRequestDto {
	id: number;
	to: UserInfo;
	status: string;
}

export class UserInfo {
	user_name: string;
	image_url: string;
}

export class UpdateFriendRequest {
	status: string;
}
