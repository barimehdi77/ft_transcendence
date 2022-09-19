
export class ReadProfile {
	status: string;
	played_games: number;
	user_points: number;
	wins: number;
	losses: number;
}


export class ReadProfileLayout {
	user_name: string;
	image_url: string;
}

export class playerMatch {
	name: string;
	score: number;
	// isWin: boolean;
}

export class matchDetails {
	player_one: playerMatch;
	player_two: playerMatch;
	winner: string;
}

export enum winner {
	PLAYER_ONE = "player_one",
	PLAYER_TWO = "player_two"
}
