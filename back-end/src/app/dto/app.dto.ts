export class OneSessionResponseDto {
	readonly start: number;
	readonly end: number;
	isReserved: boolean;
	reserver: string;
}

export class SessionsResponseDto {
	First: OneSessionResponseDto;
	Second: OneSessionResponseDto;
	Third: OneSessionResponseDto;
}

export class WeekResponseDto {
	DayName: string;
	TimeZone: SessionsResponseDto;
}


export class ReservaitonRequestDro {
	DayName: string;
	ReservedTime: string;
	Reserver: string;
}
