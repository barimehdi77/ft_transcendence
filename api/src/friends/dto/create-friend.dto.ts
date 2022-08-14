export class CreateFriendRequestDto {
	to: number;
}

export class GetFriendRequestDto {
	from: number;
	to: number;
	status: string;
}
