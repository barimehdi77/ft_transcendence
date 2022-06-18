export class FindStudentResponseDto{
	id: string;
	name: string;
	teacher: string
}

export class StudentResponseDto{
	id: string;
	name: string;
	teacher: string
}

export class createStudentDto {
	"name" : string;
	"login" : string
}

export class UpdateStudentDto{
	"name" : string;
	"login" : string
}